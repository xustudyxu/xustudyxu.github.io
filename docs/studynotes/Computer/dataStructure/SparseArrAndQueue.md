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

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221216/image.zahwreqpwhs.webp)

+ 分析问题

因为该二维数组的很多值是默认值0，因此记录了**很多没有意义的数据.->稀疏数组**。

### 稀疏数组基本介绍

当一个数组中大部分元素为0，或者为同一个值的数组时，可以使用稀疏数组来保存该数组。

稀疏数组的处理方法是:

1. 记录数组**一共有几行几列，有多少个不同**的值
2. 把具有不同值的元素的行列及值记录在一个小规模的数组中，从而**缩小程序**的规模

+ 稀疏数组举例说明

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221216/image.804ea5g46m0.webp)

### 应用案例

1. 使用稀疏数组，来保留类似前面的二维数组(棋盘、地图等等)
2. 把稀疏数组存盘，并且可以从新恢复原来的二维数组数
3. 整体思路分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221216/image.6txpat47wxc0.webp)

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

