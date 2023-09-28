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

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221224/image.vkonnxelp5s.webp)

请问:计算机底层是如何运算得到结果的?注意不是简单的把算式列出运算,因为我们看这个算式7*2*2-5，但是计算机怎么理解这个算式的(对计算机而言，它接收到的就是一个字符串)，我们讨论的是这个问题。->**栈**

## 栈的介绍

1. 栈的英文为(stack)
2. 栈是一个**先入后出(FILO-First In Last Out)**的有序列表。
3. 栈(stack)是限制线性表中元素的插入和删除只能在线性表的同一端进行的一种特殊线性表。允许插入和删除的一端，为**变化的一端，称为栈顶(Top)**，另一端为**固定的一端，称为栈底(Bottom)**。
4. 根据栈的定义可知，最先放入栈中元素在栈底，最后放入的元素在栈顶，而删除元素刚好相反，最后放入的元素最先删除，最先放入的元素最后删除
5. 图解方式说明出栈(pop)和入栈(push)的概念

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221225/image.3hun2bxs54o0.webp)

## 栈的应用场景

1. 子程序的调用:在跳往子程序前，会先将下个指令的地址存到堆栈中，直到子程序执行完后再将地址取出，以回到原来的程序中。
2. 处理递归调用:和子程序的调用类似，只是除了储存下一个指令的地址外，也将参数、区域变量等数据存入堆栈中。
3. 表达式的转换[中缀表达式转后缀表达式]与求值(实际解决)。
4. 二叉树的遍历。
5. 图形的深度优先(depth 一 first)搜索法。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221225/image.7882u26g3680.webp)

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

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221225/image.6qcincp50xs0.webp)

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
 * desc:后缀表达式求值
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

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221226/image.80ikqbajhcc.webp)

+ 代码实现

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/27  19:04
 * desc:中缀转后缀表达式
 */
public class InfixToSuffix {
    public static void main(String[] args) {

        //完成将一个中缀表达式转换成后缀表达式
        //说明
        //1. 1+((2+3)×4)-5 ===>  1 2 3 + 4 × + 5 -
        //2. 因为直接对字符串操作不方便，先将字符串 "1+((2+3)×4)-5" ===> 中缀的表达式List
        //   即 "1+((2+3)×4)-5" ===> ArrayList [1,+,(,(,2,+,3,),×,4,),-,5]
        //3. 将得到的中缀表达式对应的list ===> 后缀表达式对应的list
        //   即 [1,+,(,(,2,+,3,),×,4,),-,5] ===> ArrayList [1,2,3,+,4,×,+,5,-]
        //

        String expression = "1+((2+3)×4)-5";
        List<String> infixExpressionList = toInfixExpressionList(expression);
        System.out.println("中缀表达式对应的List="+infixExpressionList);
        List<String> parseSuffixExpressionList = parseSuffixExpressionList(infixExpressionList);
        System.out.println("后缀表达式对应的List="+parseSuffixExpressionList);
        System.out.println("计算的结果为："+calculate(parseSuffixExpressionList));
    }

    //方法：将中缀表达式转成对应的List
    // s ===> "1+((2+3)×4)-5"
    public static List<String> toInfixExpressionList(String s) {
        //定义一个List，存放中缀表达式对应的数据
        List<String> ls = new ArrayList<>();
        int i = 0;//这是一个指针，用于遍历 中缀表达式字符串
        String str; //多多位数做拼接工作
        char c;// 每遍历到一个字符，放入到c
        do {
            //如果c是一个非数字，就需要加入到ls
            if ((c = s.charAt(i)) < 48 || (c = s.charAt(i)) > 57) {
                ls.add("" + c);
                i++;
            } else {  //如果是一个数
                str = "";//先将str置成空串
                while (i < s.length() && (c = s.charAt(i)) >= 48 && (c = s.charAt(i)) <= 57) {
                    str += c;
                    i++;
                }
                ls.add(str);
            }
        } while (i < s.length());
        return ls;
    }

    //即 [1,+,(,(,2,+,3,),×,4,),-,5] ===> ArrayList [1,2,3,+,4,×,+,5,-]
    public static List<String> parseSuffixExpressionList(List<String> ls) {
        //定义两个栈
        Stack<String> s1 = new Stack<>(); //符号栈
        //说明：因为 s2 这个栈，在整个转换的过程中，没有pop操作，而且后面我们还需要逆序输出
        //     因此比较麻烦，这里我们不使用stack，使用List<String> s2
        List<String> s2 = new ArrayList<>();//存储中间结果的栈

        //遍历ls
        for (String item : ls) {
            //如果是一个数，加入到s2
            if (item.matches("\\d+")) {
                s2.add(item);
            } else if (item.equals("(")) {
                s1.push(item);
            } else if (item.equals(")")) {
                // 如果是右括号“)”，则依次弹出sl栈顶的运算符，并压入s2，
                // 直到遇到左括号为止，此时将这一对括号丢弃
                while (!s1.peek().equals("(")) {
                    s2.add(s1.pop());
                }
                s1.pop();//将 ( 弹出s1这个栈，消除小括号
            } else {
                //当item优先级小于等于s1栈顶运算符的优先级
                //将sl栈顶的运算符弹出并压入到s2中
                while (s1.size() != 0 && Operation.getValue(s1.peek()) >= Operation.getValue(item)) {
                    s2.add(s1.pop());
                }
                //还需要将item压入栈中
                s1.push(item);
            }
        }

        //将s1中剩余的运算符依次弹出并加入s2
        while (s1.size() != 0) {
            s2.add(s1.pop());
        }
        return s2;//因为是存放到list中，因此按顺序输出就是后缀表达式对应的list
    }
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

//编写一个类，可以返回一个运算符对应的优先级
class Operation {
    private static int ADD = 1;
    private static int SUB = 1;
    private static int MUL = 2;
    private static int DIV = 2;

    //写一个方法，返回对应的优先级数字
    public static int getValue(String operation) {
        int result = 0;
        switch (operation) {
            case "+":
                result = ADD;
                break;
            case "-":
                result = SUB;
                break;
            case "×":
                result = MUL;
                break;
            case "/":
                result = DIV;
                break;
            default:
                System.out.println("不存在该运算符");
                break;
        }
        return result;
    }
}
```

+ 测试

```java
中缀表达式对应的List=[1, +, (, (, 2, +, 3, ), ×, 4, ), -, 5]
不存在该运算符
不存在该运算符
后缀表达式对应的List=[1, 2, 3, +, 4, ×, +, 5, -]
计算的结果为：16

Process finished with exit code 0
```

## 逆波兰计算器完整版

```java
package com.atguigu.reversepolishcal;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Stack;
import java.util.regex.Pattern;

public class ReversePolishMultiCalc {

    /**
     * 匹配 + - * / ( ) 运算符
     */
    static final String SYMBOL = "\\+|-|\\*|/|\\(|\\)";

    static final String LEFT = "(";
    static final String RIGHT = ")";
    static final String ADD = "+";
    static final String MINUS= "-";
    static final String TIMES = "*";
    static final String DIVISION = "/";

    /**
     * 加減 + -
     */
    static final int LEVEL_01 = 1;
    /**
     * 乘除 * /
     */
    static final int LEVEL_02 = 2;

    /**
     * 括号
     */
    static final int LEVEL_HIGH = Integer.MAX_VALUE;


    static Stack<String> stack = new Stack<>();
    static List<String> data = Collections.synchronizedList(new ArrayList<String>());

    /**
     * 去除所有空白符
     * @param s
     * @return
     */
    public static String replaceAllBlank(String s ){
        // \\s+ 匹配任何空白字符，包括空格、制表符、换页符等等, 等价于[ \f\n\r\t\v]
        return s.replaceAll("\\s+","");
    }

    /**
     * 判断是不是数字 int double long float
     * @param s
     * @return
     */
    public static boolean isNumber(String s){
        Pattern pattern = Pattern.compile("^[-\\+]?[.\\d]*$");
        return pattern.matcher(s).matches();
    }

    /**
     * 判断是不是运算符
     * @param s
     * @return
     */
    public static boolean isSymbol(String s){
        return s.matches(SYMBOL);
    }

    /**
     * 匹配运算等级
     * @param s
     * @return
     */
    public static int calcLevel(String s){
        if("+".equals(s) || "-".equals(s)){
            return LEVEL_01;
        } else if("*".equals(s) || "/".equals(s)){
            return LEVEL_02;
        }
        return LEVEL_HIGH;
    }

    /**
     * 匹配
     * @param s
     * @throws Exception
     */
    public static List<String> doMatch (String s) throws Exception{
        if(s == null || "".equals(s.trim())) throw new RuntimeException("data is empty");
        if(!isNumber(s.charAt(0)+"")) throw new RuntimeException("data illeagle,start not with a number");

        s = replaceAllBlank(s);

        String each;
        int start = 0;

        for (int i = 0; i < s.length(); i++) {
            if(isSymbol(s.charAt(i)+"")){
                each = s.charAt(i)+"";
                //栈为空，(操作符，或者 操作符优先级大于栈顶优先级 && 操作符优先级不是( )的优先级 及是 ) 不能直接入栈
                if(stack.isEmpty() || LEFT.equals(each)
                        || ((calcLevel(each) > calcLevel(stack.peek())) && calcLevel(each) < LEVEL_HIGH)){
                    stack.push(each);
                }else if( !stack.isEmpty() && calcLevel(each) <= calcLevel(stack.peek())){
                    //栈非空，操作符优先级小于等于栈顶优先级时出栈入列，直到栈为空，或者遇到了(，最后操作符入栈
                    while (!stack.isEmpty() && calcLevel(each) <= calcLevel(stack.peek()) ){
                        if(calcLevel(stack.peek()) == LEVEL_HIGH){
                            break;
                        }
                        data.add(stack.pop());
                    }
                    stack.push(each);
                }else if(RIGHT.equals(each)){
                    // ) 操作符，依次出栈入列直到空栈或者遇到了第一个)操作符，此时)出栈
                    while (!stack.isEmpty() && LEVEL_HIGH >= calcLevel(stack.peek())){
                        if(LEVEL_HIGH == calcLevel(stack.peek())){
                            stack.pop();
                            break;
                        }
                        data.add(stack.pop());
                    }
                }
                start = i ;    //前一个运算符的位置
            }else if( i == s.length()-1 || isSymbol(s.charAt(i+1)+"") ){
                each = start == 0 ? s.substring(start,i+1) : s.substring(start+1,i+1);
                if(isNumber(each)) {
                    data.add(each);
                    continue;
                }
                throw new RuntimeException("data not match number");
            }
        }
        //如果栈里还有元素，此时元素需要依次出栈入列，可以想象栈里剩下栈顶为/，栈底为+，应该依次出栈入列，可以直接翻转整个stack 添加到队列
        Collections.reverse(stack);
        data.addAll(new ArrayList<>(stack));

        System.out.println(data);
        return data;
    }

    /**
     * 算出结果
     * @param list
     * @return
     */
    public static Double doCalc(List<String> list){
        Double d = 0d;
        if(list == null || list.isEmpty()){
            return null;
        }
        if (list.size() == 1){
            System.out.println(list);
            d = Double.valueOf(list.get(0));
            return d;
        }
        ArrayList<String> list1 = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            list1.add(list.get(i));
            if(isSymbol(list.get(i))){
                Double d1 = doTheMath(list.get(i - 2), list.get(i - 1), list.get(i));
                list1.remove(i);
                list1.remove(i-1);
                list1.set(i-2,d1+"");
                list1.addAll(list.subList(i+1,list.size()));
                break;
            }
        }
        doCalc(list1);
        return d;
    }

    /**
     * 运算
     * @param s1
     * @param s2
     * @param symbol
     * @return
     */
    public static Double doTheMath(String s1,String s2,String symbol){
        Double result ;
        switch (symbol){
            case ADD : result = Double.valueOf(s1) + Double.valueOf(s2); break;
            case MINUS : result = Double.valueOf(s1) - Double.valueOf(s2); break;
            case TIMES : result = Double.valueOf(s1) * Double.valueOf(s2); break;
            case DIVISION : result = Double.valueOf(s1) / Double.valueOf(s2); break;
            default : result = null;
        }
        return result;

    }

    public static void main(String[] args) {
        //String math = "9+(3-1)*3+10/2";
        String math = "12.8 + (2 - 3.55)*4+10/5.0";
        try {
            doCalc(doMatch(math));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
```

