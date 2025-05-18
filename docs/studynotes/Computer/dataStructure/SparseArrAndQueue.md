---
title: 稀疏数组和队列
date: 2022-12-16 13:06:41
permalink: /Computer/dataStructure/SparseArrAndQueue
categories:
  - 数据结构
tags:
  - 数据结构
---
# 稀疏数组和队列

[[toc]]

## 稀疏 sparsearray 数组

### 先看一个实际的需求

+ 编写的五子棋程序中，有存盘退出和续上盘的功能。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221216/image.zahwreqpwhs.webp)

+ 分析问题

因为该二维数组的很多值是默认值0，因此记录了**很多没有意义的数据.->稀疏数组**。

### 稀疏数组基本介绍

当一个数组中大部分元素为0，或者为同一个值的数组时，可以使用稀疏数组来保存该数组。

稀疏数组的处理方法是:

1. 记录数组**一共有几行几列，有多少个不同**的值
2. 把具有不同值的元素的行列及值记录在一个小规模的数组中，从而**缩小程序**的规模

+ 稀疏数组举例说明

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221216/image.804ea5g46m0.webp)

### 应用案例

1. 使用稀疏数组，来保留类似前面的二维数组(棋盘、地图等等)
2. 把稀疏数组存盘，并且可以从新恢复原来的二维数组数
3. 整体思路分析

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221216/image.6txpat47wxc0.webp)

### 代码实现

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/16  10:25
 */
public class SparseArray {
    public static void main(String[] args) {
        //创建一个原始的二维数组 11 * 11
        //0:表示没有棋子，1:表示黑子，2:表示蓝子
        int chessArr1[][] = new int[11][11];
        chessArr1[1][2] = 1;
        chessArr1[2][3] = 2;
        System.out.println("原始的二维数组：");
        //输出
        for (int[] row : chessArr1) {
            for (int data : row) {
                System.out.printf("%d\t",data);
            }
            System.out.println();
        }

        //将二维数组 转 稀疏数组
        //1. 先遍历二维数组得到非0数据个数
        int sum = 0;
        for (int i = 0; i < chessArr1.length; i++) {
            for (int j = 0; j < chessArr1[i].length; j++) {
                if(chessArr1[i][j] != 0){
                    sum++;
                }
            }
        }
        System.out.println("sum="+sum);
        //2.创建对应的稀疏数组
        int sparseArr[][] = new int[sum+1][3];
        //给稀疏数组赋值
        sparseArr[0][0] = 11;
        sparseArr[0][1] = 11;
        sparseArr[0][2] = sum;

        //遍历二维数组，将非0的值存放到稀疏数组中
        int count = 0;//count 用来记录是第几个非零数据
        for (int i = 0; i < chessArr1.length; i++) {
            for (int j = 0; j < chessArr1[i].length; j++) {
                if(chessArr1[i][j] != 0){
                    count++;
                    sparseArr[count][0] = i;
                    sparseArr[count][1] = j;
                    sparseArr[count][2] = chessArr1[i][j];
                }
            }
        }

        //输出稀疏数组的形式
        System.out.println("得到的稀疏数组为:");
        for (int i = 0; i < sparseArr.length; i++) {
            System.out.printf("%d\t%d\t%d\t\n",sparseArr[i][0],sparseArr[i][1],sparseArr[i][2]);
        }

        //将稀疏数组转为二维数组
        //1.先读取稀疏数组的第一行，根据第一行的数据，创建原始的二维数组，比如上面的chessArr2 =int[11][11]

        int chessArr2[][] = new int[sparseArr[0][0]][sparseArr[0][1]];
        System.out.println("恢复后的数组：");
        //2.在读取稀疏教组第二行的数据,并赋给原始的二维数组即可.
        for (int i = 1; i <= sparseArr[0][2 ];i++) {
            chessArr2[sparseArr[i][0]][sparseArr[i][1]] = sparseArr[i][2];
        }
        //输出原始数组
        for (int[] row : chessArr2) {
            for (int data : row) {
                System.out.printf("%d\t",data);
            }
            System.out.println();
        }
    }
}
```

+ 输出

```java
原始的二维数组：
0	0	0	0	0	0	0	0	0	0	0	
0	0	1	0	0	0	0	0	0	0	0	
0	0	0	2	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
sum=2
得到的稀疏数组为:
11	11	2	
1	2	1	
2	3	2	
恢复后的数组：
0	0	0	0	0	0	0	0	0	0	0	
0	0	1	0	0	0	0	0	0	0	0	
0	0	0	2	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	
0	0	0	0	0	0	0	0	0	0	0	

Process finished with exit code 0
```

### 课后作业

1. 在前面的基础上，将稀疏数组保存到磁盘上，比如map.data.txt
2. 恢复原来的数组时，读取map.data进行恢复

> 说下我的思路：
>
> 1. 使用输出流把稀疏数组写入到磁盘（我是使用把稀疏数组元素遍历的方式把元素一个一个写入到文件，并在每个元素后面拼接/）
> 2. 使用输入流读取稀疏数组（一行一行的读取，使用split方法进行分割，这样就得到字符串数组，遍历字符串数组得到每个元素）-------->转为一维数组
> 3. 一维数组的前三个元素分别是行，列，非零元素总数，从第二行开始分别是元素的行，列，值，这样就可以初始化稀疏数组

```java
        ...
		String filePath = "e:\\map.data.txt";
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));
            for (int[] row : sparseArr) {
                for (int i : row) {
                    writer.write(new Integer(i).toString()+"\\");
                }
                writer.newLine();
            }
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath));
            String line;
            System.out.println("读取的内容为：");
            while ((line=bufferedReader.readLine())!= null){
                String[] endLine = line.split("\\\\");
                for (int i = 0; i < endLine.length; i++) {
                    System.out.print(endLine[i]+"\t");
                }
            }
            bufferedReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
		...
```

## 队列

### 队列的一个使用场景

银行排队的案例:

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221216/image.sp030e86cvk.webp)

### 队列介绍

1. 队列是一个**有序列表**，可以用**数组**或是**链表**来实现。
2. 遵循**先入先出**的原则。即:**先存入队列的数据，要先取出。后存入的要后取出**
3. 示意图:(使用数组模拟队列示意图)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221216/image.1hx1cfjail5s.webp)

### 数组模拟队列思路

+ 队列本身是有序列表，若使用数组的结构来存储队列的数据，则队列数组的声明如下图，其中 maxSize是该队列的最大容量。
+ 因为队列的输出、输入是分别从前后端来处理，因此需要两个变量front 及 rear分别记录队列前后端的下标，front会随着数据输出而改变，而rear 则是随着数据输入而改变，如图所示:

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221216/image.4stuwiabzyg0.webp)

+ 当我们将数据存入队列时称为”addQueue”,addQueue的处理需要有两个步骤:思路分析
  1. 将尾指针往后移:rear+1，当front == rear【空】
  2. 若尾指针 rear 小于队列的最大下标 maxSize-1,则将数据存入rear所指的数组元素中,否则无法存入数据。rear==maxSize - 1[队列满]

### 代码演示

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/16  20:14
 */
public class ArrayQueueDemo {
    public static void main(String[] args) {
        //创建一个队列
        ArrayQueue arrayQueue = new ArrayQueue(3);
        char key = ' ';//接受用户的输入
        Scanner scanner = new Scanner(System.in);
        boolean loop = true;
        //输出一个菜单
        while (loop){
            System.out.println("s(show)：显示队列");
            System.out.println("e(exit)：退出程序");
            System.out.println("a(add)：添加数据到队列");
            System.out.println("g(get)：从队列里面取数据");
            System.out.println("h(head)：查看队列头的数据");
            key = scanner.next().charAt(0);//接受一个字符
            switch (key){
                case 's':
                    arrayQueue.showQueue();
                    break;
                case 'a':
                    System.out.println("输入一个数：");
                    int value = scanner.nextInt();
                    arrayQueue.addQueue(value);
                    break;
                case 'g':
                    try {
                        int res = arrayQueue.getQueue();
                        System.out.printf("取出的数据是%d\n",res);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'h':
                    try {
                        int res = arrayQueue.headQueue();
                        System.out.printf("队列头的数据是%d\n",res);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'e':
                    scanner.close();
                    loop = false;
                    break;
                default:
                    break;
            }

        }
        System.out.println("程序退出.............");
    }
}

//使用数组模拟队列-编写一个叫做ArrayQueue类
class ArrayQueue {
    private int maxSize;//表示数组的最大容量
    private int front;//队列头
    private int rear;//队列尾
    private int[] arr;//该数组用于存放数据

    //创建队列构造器
    public ArrayQueue(int maxSize) {
        this.maxSize = maxSize;
        arr = new int[maxSize];
        front = -1;//指向队列头部，分析出front是指向队列的前一个位置
        rear = -1;//指向队列尾部，指向队列尾的数据（即就是队列最后一个数据）
    }

    //判断队列是否满
    public boolean isFull() {
        return rear == maxSize - 1;
    }

    //判断队列是否为空
    public boolean isEmpty() {
        return rear == front;
    }

    //添加数据到队列
    public void addQueue(int n) {
        //判断队列是否满
        if (isFull()) {
            System.out.println("队列满，不能加入数据");
            return;
        }
        rear++; // 让rear后移
        arr[rear] = n;
    }

    //获取队列的数据，出队列
    public int getQueue() {
        //判断队列是否为空
        if (isEmpty()) {
            //通过抛出异常处理
            throw new RuntimeException("队列空，不能取数据");
        }
        front++;//让front后移
        return arr[front];

    }

    //显示队列的所有数据
    public void showQueue() {
        //遍历
        if (isEmpty()) {
            System.out.println("队列空的，没有数据");
            return;
        }
        for (int i = 0; i < arr.length; i++) {
            System.out.printf("arr[%d]=%d\n", i, arr[i]);
        }
    }

    //显示队列的头数据，注意不是取出数据
    public int headQueue() {
        //判断
        if (isEmpty()) {
            throw new RuntimeException("队列空的，没有数据~");
        }
        return arr[front + 1];
    }
}
```

+ 测试

```java
s(show)：显示队列
e(exit)：退出程序
a(add)：添加数据到队列
g(get)：从队列里面取数据
h(head)：查看队列头的数据
s
队列空的，没有数据

a
输入一个数：
10

a
输入一个数：
20

a
输入一个数：
30

a
输入一个数：
40
队列满，不能加入数据

s
arr[0]=10
arr[1]=20
arr[2]=30

h
队列头的数据是10

g
取出的数据是10

g
取出的数据是20

g
取出的数据是30

s
队列空的，没有数据

a
输入一个数：
10
队列满，不能加入数据

e
程序退出.............

Process finished with exit code 0
```

> 出现问题，数据虽然取出了，但是队列不能再进行添加数据，不能达到复用的效果

### 数组模拟环形队列

对前面的数组模拟队列的优化，充分利用数组.因此将数组看做是一个环形的。(通过**取模的方式来实现**即可)

+ 分析说明

1. 尾索引的下一个为头索引时表示队列满，即将队列容量空出一个作为约定,这个在做判断队列满的时候需要注意`(rear + 1) % maxSize == front` 满]
2. `rear == front` [空]
3. 分析示意图:

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221217/image.4ncmuzcbeak0.webp)

思路如下：

1. front变量的含义做一个调整:**front就指向队列的第一个元素**，也就是说arr[front]就是队列的第一个元素front的初始值=0
2. rear变量的含义做一个调整:**rear指向队列的最后一个元素的后一个位置**。因为希望空出一个空间做为约定rear的初始值=0
3. 当队列满时，条件是`(rear +1) % maxsize = front`【满】
4. 对队列为空的条件，`rear == front`空
5. 当我们这样分析，<mark>队列中有效的数据的个数</mark>`(rear+ maxSize - front) % maxSize` // rear=16.我们就可以在原来的队列上修改得到，一个环形队列

### 代码实现

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/17  11:18
 */
@SuppressWarnings("{all}")
public class CircleArrayQueue {
    public static void main(String[] args) {
        System.out.println("测试数组模拟环形队列:");
        //创建一个环形队列
        CircleArray queue = new CircleArray(4);//说明设置4，其队列的有效最大数据是3
        char key = ' ';//接受用户的输入
        Scanner scanner = new Scanner(System.in);
        boolean loop = true;
        //输出一个菜单
        while (loop){
            System.out.println("s(show)：显示队列");
            System.out.println("e(exit)：退出程序");
            System.out.println("a(add)：添加数据到队列");
            System.out.println("g(get)：从队列里面取数据");
            System.out.println("h(head)：查看队列头的数据");
            key = scanner.next().charAt(0);//接受一个字符
            switch (key){
                case 's':
                    queue.showQueue();
                    break;
                case 'a':
                    System.out.println("输入一个数：");
                    int value = scanner.nextInt();
                    queue.addQueue(value);
                    break;
                case 'g':
                    try {
                        int res = queue.getQueue();
                        System.out.printf("取出的数据是%d\n",res);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'h':
                    try {
                        int res = queue.headQueue();
                        System.out.printf("队列头的数据是%d\n",res);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'e':
                    scanner.close();
                    loop = false;
                    break;
                default:
                    break;
            }

        }
        System.out.println("程序退出~");
    }
}

class CircleArray {
    private int maxSize;//表示数组的最大容量
    private int front;//队列头
    private int rear;//指向队列最后一个元素的后一个位置
    private int[] arr;//该数组用于存放数据

    public CircleArray(int arrMaxSize) {
        maxSize = arrMaxSize;
        arr = new int[maxSize];
    }

    //判断队列是否满
    public boolean isFull() {
        return (rear + 1) % maxSize == front;
    }

    //判断队列是否为空
    public boolean isEmpty() {
        return rear == front;
    }

    //添加数据到队列
    public void addQueue(int n) {
        //判断队列是否满
        if (isFull()) {
            System.out.println("队列满，不能加入数据");
            return;
        }
        arr[rear] = n;
        // 让rear后移，必须考虑取模
        rear = (rear + 1) % maxSize;
    }

    //获取队列的数据，出队列
    public int getQueue() {
        //判断队列是否为空
        if (isEmpty()) {
            //通过抛出异常处理
            throw new RuntimeException("队列空，不能取数据");
        }
        //这里需要分析出 front 是指向队列的第一个元素
        //1.先把 front 对应的值保存到一个临时变量
        //2.将 front 后移，考虑取模
        //3.将临时保存的变量返回
        int value = arr[front];
        front = (front + 1) % maxSize;
        return value;
    }

    //显示队列的所有数据
    public void showQueue() {
        //遍历
        if (isEmpty()) {
            System.out.println("队列空的，没有数据");
            return;
        }
        //思路：从front开始遍历，遍历多少个元素
        //
        for (int i = front; i < front + size(); i++) {
            System.out.printf("arr[%d]=%d\n", i % maxSize, arr[i % maxSize]);
        }
    }

    //求出当前队列有效数据的个数
    public int size() {
        //rear = 1
        //front = 0
        //maxSize = 3
        return (rear + maxSize - front) % maxSize;
    }

    //显示队列的头数据，注意不是取出数据
    public int headQueue() {
        //判断
        if (isEmpty()) {
            throw new RuntimeException("队列空的，没有数据~");
        }
        return arr[front];
    }
}
```

+ 测试

```java
测试数组模拟环形队列:
s(show)：显示队列
e(exit)：退出程序
a(add)：添加数据到队列
g(get)：从队列里面取数据
h(head)：查看队列头的数据
s
队列空的，没有数据

a
输入一个数：
10

a
输入一个数：
20

a
输入一个数：
30

a
输入一个数：
40
队列满，不能加入数据

s
arr[0]=10
arr[1]=20
arr[2]=30

g
取出的数据是10

s
arr[1]=20
arr[2]=30

a
输入一个数：
40

s
arr[1]=20
arr[2]=30
arr[3]=40

h
队列头的数据是20

g
取出的数据是20

g
取出的数据是30

g
取出的数据是40

s
队列空的，没有数据

a
输入一个数：
50

a
输入一个数：
60

s
arr[0]=50
arr[1]=60

a
输入一个数：
70

a
输入一个数：
80
队列满，不能加入数据

s

arr[0]=50
arr[1]=60
arr[2]=70

e
程序退出~

Process finished with exit code 0
```

