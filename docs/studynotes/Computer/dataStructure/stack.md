---
title: 栈
date: 2022-12-25 22:37:11
permalink: /Computer/dataStructure/stack
categories:
  - 数据结构
tags:
  - 数据结构
---
# 栈

[[toc]]

## 栈的一个实际需求

请输入一个表达式

计算式:[7*2*2-5+1-5+3-3]点击计算【如下图】

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221224/image.vkonnxelp5s.webp)

请问:计算机底层是如何运算得到结果的?注意不是简单的把算式列出运算,因为我们看这个算式7*2*2-5，但是计算机怎么理解这个算式的(对计算机而言，它接收到的就是一个字符串)，我们讨论的是这个问题。->**栈**

## 栈的介绍

1. 栈的英文为(stack)
2. 栈是一个**先入后出(FILO-First In Last Out)**的有序列表。
3. 栈(stack)是限制线性表中元素的插入和删除只能在线性表的同一端进行的一种特殊线性表。允许插入和删除的一端，为**变化的一端，称为栈顶(Top)**，另一端为**固定的一端，称为栈底(Bottom)**。
4. 根据栈的定义可知，最先放入栈中元素在栈底，最后放入的元素在栈顶，而删除元素刚好相反，最后放入的元素最先删除，最先放入的元素最后删除
5. 图解方式说明出栈(pop)和入栈(push)的概念

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221225/image.3hun2bxs54o0.webp)

## 栈的应用场景

1. 子程序的调用:在跳往子程序前，会先将下个指令的地址存到堆栈中，直到子程序执行完后再将地址取出，以回到原来的程序中。
2. 处理递归调用:和子程序的调用类似，只是除了储存下一个指令的地址外，也将参数、区域变量等数据存入堆栈中。
3. 表达式的转换[中缀表达式转后缀表达式]与求值(实际解决)。
4. 二叉树的遍历。
5. 图形的深度优先(depth 一 first)搜索法。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221225/image.7882u26g3680.webp)

### 代码实现

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/25  16:52
 */
public class ArrayStackDemo {
    public static void main(String[] args) {
        //测试
        ArrayStack stack = new ArrayStack(4);
        String key = "";
        boolean loop = true;//控制是否退出菜单
        Scanner scanner = new Scanner(System.in);
        while (loop) {
            System.out.println("show: 显示栈");
            System.out.println("exit: 退出程序");
            System.out.println("push: 表示添加数据到栈(入栈)");
            System.out.println("pop: 表示从栈取出数据(出栈)");
            System.out.println("请输入你的选择：");
            key = scanner.next();
            switch (key) {
                case "show":
                    stack.list();
                    break;
                case "push":
                    System.out.println("请输入一个数：");
                    int value = scanner.nextInt();
                    stack.push(value);
                    break;
                case "pop":
                    try {
                        int res = stack.pop();
                        System.out.printf("出栈的数据是 %d\n",res);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case "exit":
                    scanner.close();
                    loop = false;
                    break;
                default:
                    break;
            }
        }
        System.out.println("程序退出.........");
    }
}
//定义一个类 表示栈
class ArrayStack {
    private int maxSize; //栈的大小
    private int[] stack; //数组，数组模拟栈，数据就放在该数组中
    private int top = -1;//top表示栈顶，初始化为-1

    public ArrayStack(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[this.maxSize];
    }

    //栈满
    public boolean isFull() {
        return top == maxSize - 1;
    }

    //栈空
    public boolean isEmpty() {
        return top == -1;
    }

    //入栈-push
    public void push(int value) {
        //先判断栈是否满
        if(isFull()) {
            System.out.println("栈满");
            return;
        }
        top++;
        stack[top] = value;
    }

    //出栈-pop，将栈顶的数据返回
    public int pop() {
        //先判断栈是否空
        if(isEmpty()) {
            //抛出异常
            throw new RuntimeException("栈空，没有数据~");
        }
        int value = stack[top];
        top--;
        return value;
    }

    //显示栈的情况，遍历栈，遍历时，需要从栈顶开始显示数据
    public void list() {
        if(isEmpty()) {
            System.out.println("栈空，没有数据");
            return;
        }
        for (int i = top; i >= 0 ; i--) {
            System.out.printf("stack[%d]=%d\n",i,stack[i]);
        }

    }
}
```

+ 测试

```java
show: 显示栈
exit: 退出程序
push: 表示添加数据到栈(入栈)
pop: 表示从栈取出数据(出栈)
请输入你的选择：
show
栈空，没有数据
请输入你的选择：
push
请输入一个数：
10
请输入你的选择：
push
请输入一个数：
20
请输入你的选择：
push
请输入一个数：
30
请输入你的选择：
push
请输入一个数：
40
请输入你的选择：
push
请输入一个数：
50
栈满
请输入你的选择：
show
stack[3]=40
stack[2]=30
stack[1]=20
stack[0]=10
请输入你的选择：
pop
出栈的数据是 40
请输入你的选择：
pop
出栈的数据是 30
请输入你的选择：
pop
出栈的数据是 20
请输入你的选择：
pop
出栈的数据是 10
请输入你的选择：
pop
栈空，没有数据~
请输入你的选择：
show
栈空，没有数据
请输入你的选择：
exit
程序退出.........

Process finished with exit code 0
```

## 栈实现综合计算器

+ 使用栈来实现综合计算器

请输入一个表达式

计算式：[7\*2*2-5+1-5+3-3] 点击计算

+ 思路分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221225/image.6qcincp50xs0.webp)

+ 代码实现，【1.先实现一位数的运算。2.扩展到多位数的运算】

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/25  20:43
 */
public class Calculator {
    public static void main(String[] args) {

        String expression = "93+26*66-29";
        //创建两个栈，数栈和符号栈
        ArrayStack2 numberStack = new ArrayStack2(10);
        ArrayStack2 operStack = new ArrayStack2(10);
        //定义需要的相关变量
        int index = 0;//用于扫描
        int num1 = 0;
        int num2 = 0;
        int oper = 0;
        int res = 0;
        char ch = ' ';//将每次扫描到的char保存到ch中
        String keyNum = "";//用于拼接多位数的
        //开始while语句循环的扫描expression
        while (true) {
            //依次得到expression中的每一个字符
            ch = expression.substring(index, index + 1).charAt(0);
            //判断
            if (operStack.isOper(ch)) { //如果是运算符
                //判断当前的符号栈是否为空
                if (!operStack.isEmpty()) {
                    //处理
                    //如果符号栈有操作符，就进行比较，如果当前的操作符的优先级小于或者等于栈中的操作符，就需要从数栈中pop两个数，
                    //再从符号栈中pop出一个符号，进行运算，将得到结果，入数栈，然后将当前的操作符入符号栈
                    if (operStack.priority(ch) <= operStack.priority(operStack.peek())) {
                        //pop出两个数
                        num1 = numberStack.pop();
                        num2 = numberStack.pop();
                        oper = operStack.pop();
                        res = numberStack.cal(num1, num2, oper);
                        //把运算结果入数栈
                        numberStack.push(res);
                        //把当前的操作符入符号栈
                        operStack.push(ch);
                    } else {
                        //如果当前的操作符的优先级大于栈中的操作符，就直接如符号栈
                        operStack.push(ch);
                    }
                } else {
                    //如果为空，直接入符号栈
                    operStack.push(ch);
                }
            } else { //如果是数，则直接入数栈
                //numberStack.push(ch - 48);//? "1+3" '1'==>1
                //分析思路
                //1.当处理多位数时，不能发现是一个数就立即入栈，因为它可能是多位数
                //2.再处理数时，需要向expression表达式的index后面再看一位，如果是数就进行扫描，如果是符号才入栈
                //3.因此我们需要定义一个变量（字符串），用于拼接

                //处理多位数
                keyNum += ch;

                //如果ch已经是expression的最后一位
                if (index == expression.length() - 1) {
                    numberStack.push(Integer.parseInt(keyNum));
                } else {

                    //判断下一个字符是不是数字，就继续扫描，如果是运算符，入数栈
                    //注意是看后一位，不是index++

                    if (operStack.isOper(expression.substring(index + 1, index + 2).charAt(0))) {
                        //如果后一位是运算符，则入栈
                        numberStack.push(Integer.parseInt(keyNum));
                        //重要
                        keyNum = "";
                    }
                }
            }
            //让index + 1，并判断是否扫描到expression
            index++;
            if (index >= expression.length()) {
                break;
            }
        }
        //当表达式扫描完毕，就顺序的从数栈和符号栈中pop出相应的数和符号，并运行。
        while (true) {
            //如果符号栈为空，计算到最后的结果，数栈中只有一个数字【结果】
            if (operStack.isEmpty()) {
                break;
            }
            num1 = numberStack.pop();
            num2 = numberStack.pop();
            oper = operStack.pop();
            res = numberStack.cal(num1, num2, oper);
            numberStack.push(res);//入栈
        }
        System.out.printf("表达式是 %s = %d", expression, numberStack.pop());
    }
}

//先创建一个栈
class ArrayStack2 {
    private int maxSize; //栈的大小
    private int[] stack; //数组，数组模拟栈，数据就放在该数组中
    private int top = -1;//top表示栈顶，初始化为-1

    public ArrayStack2(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[this.maxSize];
    }

    //栈满
    public boolean isFull() {
        return top == maxSize - 1;
    }

    //栈空
    public boolean isEmpty() {
        return top == -1;
    }

    //入栈-push
    public void push(int value) {
        //先判断栈是否满
        if (isFull()) {
            System.out.println("栈满");
            return;
        }
        top++;
        stack[top] = value;
    }

    //出栈-pop，将栈顶的数据返回
    public int pop() {
        //先判断栈是否空
        if (isEmpty()) {
            //抛出异常
            throw new RuntimeException("栈空，没有数据~");
        }
        int value = stack[top];
        top--;
        return value;
    }

    //显示栈的情况，遍历栈，遍历时，需要从栈顶开始显示数据
    public void list() {
        if (isEmpty()) {
            System.out.println("栈空，没有数据");
            return;
        }
        for (int i = top; i >= 0; i--) {
            System.out.printf("stack[%d]=%d\n", i, stack[i]);
        }

    }

    //返回运算符的优先级，优先级是程序员来确定的，优先级使用数字表示
    //数字越大，则优先级越高
    public int priority(int oper) {
        if (oper == '*' || oper == '/') {
            return 1;
        } else if (oper == '+' || oper == '-') {
            return 0;
        } else {
            return -1; //假定目前的表达式只有+,-,*,/
        }
    }

    //判断是不是一个运算符
    public boolean isOper(char val) {
        return val == '+' || val == '-' || val == '*' || val == '/';
    }

    //计算方法
    public int cal(int num1, int num2, int oper) {
        int res = 0;//用于存放计算的结果
        switch (oper) {
            case '+':
                res = num1 + num2;
                break;
            case '-':
                res = num2 - num1;//注意顺序
                break;
            case '*':
                res = num1 * num2;
                break;
            case '/':
                res = num2 / num1;
                break;
        }
        return res;
    }

    //增加方法，可以放回当前栈顶的值，但是不是真正的pop
    public int peek() {
        return stack[top];
    }
}
```

+ 计算

```java
表达式是 93+26*66-29 = 1780
Process finished with exit code 0
```

## 逆波兰计算器

**前缀表达式的计算机求职**

**从右至左**扫描表达式，遇到数字时，将数字压入堆栈，遇到运算符时，弹出栈顶的两个数，用运算符对它们做相应的计算（栈顶元素和次顶元素)，并将结果入栈;重复上述过程直到表达式最左端，最后运算得出的值即为表达式的结果

例如：(3+4)×5-6对应的前缀表达式就是 **- × + 3 4 5 6** ,针对前缀表达式求值步骤如下:

1. **从右至左扫描**，将6、5、4、3压入堆栈
2. 遇到+运算符，因此弹出3和4(3为栈顶元素，4为次顶元素），计算出3+4的值，得7，再将7入栈
3. 接下来是×运算符，因此弹出7和5，计算出7×5=35，将35入栈
4. 最后是-运算符，计算出35-6的值，即29，由此得出最终结果

**中缀表达式**

1. 中缀表达式就是常见的运算表达式，如(3+4)×5-6
2. 中缀表达式的求值是我们人最熟悉的，但是对计算机来说却不好操作(前面我们讲的案例就能看的这个问题)，因此，在计算结果时，往往会将中缀表达式转成其它表达式来操作(一般转成后缀表达式.)

**后缀表达式**

1. 后缀表达式又称逆波兰表达式,与前缀表达式相似，只是运算符位于操作数之后
2. 中举例说明:(3+4)×5-6对应的后缀表达式就是**3 4 + 5 × 6 -**
3. 再比如

| 正常表达式 | 逆波兰表达式   |
| ---------- | -------------- |
| a+b        | a b +          |
| a+(b-c)    | a b c - +      |
| a+(b-c)*d  | a b c - d *  + |
| a+d*(b-c)  | a d b c - * +  |
| a=1+3      | a 1 3 + =      |

**后缀表达式的计算机求值**

**从左至右**扫描表达式，遇到数字时，将数字压入堆栈，遇到运算符时，弹出栈顶的两个数，用运算符对它们做相应的计算（次顶元素和栈顶元素），并将结果入栈;重复上述过程直到表达式最右端，最后运算得出的值即为表达式的结果

例如:(3+4)×5-6对应的盾缀表达式就是 **3 4 + 5 × 6 -** ,针对后缀表达式求值步骤如下

1. **从左至右扫描**，将3和4压入堆栈;
2. 遇到+运算符，因此弹出4和3(4为栈顶元素，3为次顶元素），计算出3+4的值，得7，再将7入栈;
3. 将5入栈;
4. 接下来是×运算符，因此弹出5和7，计算出7×5=35，将35入栈;
5. 将6入栈;
6. 最后是-运算符，计算出35-6的值，即29，由此得出最终结果

我们完成一个逆波兰计算器，要求完成如下任务:

1. 输入一个逆波兰表达式(后缀表达式)，使用栈(Stack)，计算其结果
2. 支持小括号和多位数整数，因为这里我们主要讲的是数据结构，因此计算器进行简化，只支持对**整数**的计算。
3. 思路分析
4. 代码实现

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/26  19:44
 * desc:后缀表达式求职
 */
public class PolandNotation {
    public static void main(String[] args) {
        //先定义逆波兰表达式
        //(3+4)×5-6 ==> 3 4 + 5 × 6 -
        //为了方便，逆波兰表达式中的数字和符号使用空格隔开
        String suffixExpression = "3 4 + 5 × 6 - ";
        //思路
        //1.先将 "3 4 + 5 × 6 - " 放到ArrayList中
        //2.将 ArrayList 传递给一个方法，配合栈 完成计算
        List<String> listString = getListString(suffixExpression);
        System.out.println("listString=" + listString);

        int res = calculate(listString);
        System.out.println("计算的结果是res="+res);

    }

    //将一个逆波兰表达式，依次将数据和运算符 放入到ArrayList中
    public static List<String> getListString(String suffixExpression) {
        //将 suffixExpression 分割
        String[] split = suffixExpression.split(" ");
        List<String> list = new ArrayList<>();
        for (String s : split) {
            list.add(s);
        }
        return list;
    }

    //对逆波兰表达式计算
    /*
        1. **从左至右扫描**，将3和4压入堆栈;
        2. 遇到+运算符，因此弹出4和3(4为栈顶元素，3为次顶元素），计算出3+4的值，得7，再将7入栈;
        3. 将5入栈;
        4. 接下来是×运算符，因此弹出5和7，计算出7×5=35，将35入栈;
        5. 将6入栈;
        6. 最后是-运算符，计算出35-6的值，即29，由此得出最终结果
     */
    public static int calculate(List<String> list) {
        //创建一个栈，只需要一个栈
        Stack<String> stack = new Stack<>();
        //遍历 list
        for (String s : list) {
            //这里使用正则表达式取出数
            if (s.matches("\\d+")) { //匹配多位数
                //入栈
                stack.push(s);
            } else {
                //pop出两个数并运算，再入栈
                int num2 = Integer.parseInt(stack.pop());
                int num1 = Integer.parseInt(stack.pop());
                int res = 0;
                if (s.equals("+")) {
                    res = num1 + num2;
                } else if (s.equals("-")) {
                    res = num1 - num2;
                } else if (s.equals("×")) {
                    res = num1 * num2;
                } else if (s.equals("/")) {
                    res = num1 / num2;
                } else {
                    throw new RuntimeException("运算符有误");
                }
                //把res入栈
                stack.push(res + "");
            }
        }
        //最后 留在stack中的数据 就是运算结果
        return Integer.parseInt(stack.pop());
    }
}
```

+ 结果

```java
listString=[3, 4, +, 5, ×, 6, -]
计算的结果是res=29

Process finished with exit code 0
```

## 中缀表达式转换为后缀表达式

大家看到，后缀表达式适合计算式进行运算，但是人却不太容易写出来，尤其是表达式很长的情况下，因此在开发中，我们需要将中缀表达式转成后缀表达式。

### 具体步骤如下

1. 初始化两个栈:运算符栈s1和储存中间结果的栈s2;
2. 从左至右扫描中缀表达式;
3. 遇到操作数时，将其压s2;
4. 遇到运算符时，比较其与s1栈顶运算符的优先级:

如果s1为空，或栈顶运算符为左括号“(”，则直接将此运算符入栈;

否则，若优先级比栈顶运算符的高，也将运算符压入s1;

否则，将sl栈顶的运算符弹出并压入到s2中，再次转到(4-1)与s1中新的栈顶运算符相比较;

5. 遇到括号时：
   1. 如果是左括号“(”，则直接压入s1
   2. 如果是右括号“)”，则依次弹出sl栈顶的运算符，并压入s2，直到遇到左括号为止，此时将这一对括号丢弃
6. 重复步骤⒉至5，直到表达式的最右边
7. 将s1中剩余的运算符依次弹出并压入s2
8. 依次弹出s2中的元素并输出，结果的逆序即为中缀表达式对应的后缀表达式

### 举例说明

将中缀表达式“1+((2+3)×4)-5”转换为后缀表达式的过程如下

因此结果为:"1 2 3 + 4 × + 5  -"

| 扫描到的元素 | s2(栈底->栈顶)          | s1 (栈底->栈顶) | 说明                               |
| ------------ | ----------------------- | --------------- | ---------------------------------- |
| 1            | 1                       | 空              | 数字，直接入栈                     |
| +            | 1                       | +               | s1为空，运算符直接入栈             |
| (            | 1                       | + (             | 左括号，直接入栈                   |
| (            | 1                       | + ( (           | 同上                               |
| 2            | 1 2                     | + ( (           | 数字                               |
| +            | 1 2                     | + ( ( +         | s1栈顶为左括号，运算符直接入栈     |
| 3            | 1 2 3                   | + ( ( +         | 数字                               |
| )            | 1 2 3 +                 | + (             | 右括号，弹出运算符直至遇到左括号   |
| ×            | 1 2 3 +                 | + ( ×           | s1栈顶为左括号，运算符直接入栈     |
| 4            | 1 2 3 + 4               | + ( ×           | 数字                               |
| )            | 1 2 3 + 4 ×             | +               | 右括号，弹出运算符直至遇到左括号   |
| -            | 1 2 3 + 4 × +           | -               | -与+优先级相同，因此弹出+，再压入- |
| 5            | 1 2 3 + 4 × + 5         | -               | 数字                               |
| 到达最右端   | **1   2 3 + 4 × + 5 -** | 空              | s1中剩余的运算符                   |

### 代码实现中缀表达式转为后缀表达式

+ 思路分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221226/image.80ikqbajhcc.webp)

+ 代码实现

```java

```

