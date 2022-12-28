---
title: 递归
date: 2022-12-28 23:11:33
permalink: /Computer/dataStructure/recursion
categories:
  - 数据结构
tags:
  - 数据结构
---
# 递归

[[toc]]

## 递归应用场景

 看个实际应用场景，迷宫问题(回溯)，递归(Recursion)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/11.png)

## 递归的概念

简单的说:**递归就是方法自己调用自己**,每次调用时**传入不同的变量**.递归有助于编程者解决复杂的问题,同时可以让代码变得简洁。

## 递归调用机制

我列举两个小案例,来帮助大家理解递归，部分学员已经学习过递归了，这里在给大家回顾一下递归调用机制

1. 打印问题
2. 阶乘问题
3. 使用图解方式说明了递归的调用机制

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221228/image.3soy9snzr6g0.webp)

4. 代码演示

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/28  18:38
 * desc:打印问题和迷宫问题
 */
public class RecursionTest {
    public static void main(String[] args) {
        test(4);
        int res = factorial(4);
        System.out.println("res=" + res);
    }

    public static void test(int n) {
        if (n > 2) {
            test(n - 1);
        }
        System.out.println("n=" + n);

        /*if (n > 2) {
            test(n - 1);
        } else {
            System.out.println("n=" + n);
        }*/ //只会输出一个n=2
    }

    public static int factorial(int n) {
        if (n == 1) {
            return n;
        }
        return factorial(n - 1) * n;
    }
}
```

+ 结果

```java
n=2
n=3
n=4
res=24

Process finished with exit code 0
```

## 递归能解决什么问题

递归用于解决什么样的问题

1. 各种数学问题如:8皇后问题﹐汉诺塔,阶乘问题，迷宫问题,球和篮子的问题(google编程大赛)
2. 各种算法中也会使用到递归，比如快排，归并排序，二分查找，分治算法等.
3. 将用栈解决的问题-->第归代码比较简洁

## 递归需要遵守的重要规则

递归需要遵守的重要规则

1. 执行一个方法时，就创建一个新的受保护的独立空间(栈空间)
2. 方法的局部变量是独立的，不会相互影响,比如n变量
3. 如果方法中使用的是引用类型变量(比如数组)，就会共享该引用类型的数据.
4. 递归**必须向退出递归的条件逼近**，否则就是无限递归,出现StackOverflowError，死龟了:)
5. 当一个方法执行完毕，或者遇到return，就会返回，**遵守谁调用，就将结果返回给谁**，同时当方法执行完毕或者返回时，该方法也就执行完毕

## 递归-迷宫问题

### 迷宫问题

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/11.png)

### 代码实现

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/28  20:07
 * desc:迷宫问题
 */
public class MiGong {
    public static void main(String[] args) {
        //先创建一个二维数组，模拟迷宫
        //地图
        int[][] map = new int[8][7];
        //使用1 表示墙
        //上下全部置为1
        for (int i = 0; i < 7; i++) {
            map[0][i] = 1;
            map[7][i] = 1;
        }

        //把左右全部置为1
        for (int i = 0; i < 8; i++) {
            map[i][0] = 1;
            map[i][6] = 1;
        }

        //设置挡板，1表示
        map[3][1] = 1;
        map[3][2] = 1;

        //输出地图
        System.out.println("地图的情况：");
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 7; j++) {
                System.out.print(map[i][j] + " ");
            }
            System.out.println();
        }

        //使用递归回溯给小球找路
        setWay(map, 1, 1);

        //输出新的地图，小球走过，标识过得地图
        System.out.println("小球走过并标识过的地图：");
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 7; j++) {
                System.out.print(map[i][j] + " ");
            }
            System.out.println();
        }
    }

    //使用递归回溯来给小球找路
    //说明
    //1. map表示地图
    //2. i，j表示从地图的哪个位置开始
    //3. 如果小球能到map[6][5]，说明通路找到
    //4. 约定：当地图map[i][j]为0时，表示该点没有走过，当为1的时候表示墙，2表示通路可以走，3表示该位置已经走过，但是走不通
    //5. 在走迷宫时，需要确定一个策略(方法)  下->右->上->左，如果该点走不通再回溯

    /**
     * @param map 表示地图
     * @param i   从哪个位置开始找
     * @param j
     * @return 如果找到通路，就返回true，否则返回false
     */
    public static boolean setWay(int[][] map, int i, int j) {
        if (map[6][5] == 2) { //通路已经找到
            return true;
        } else {
            if (map[i][j] == 0) { //如果当前这个点 还没有走过
                //按照策略 下->右->上->左 走
                map[i][j] = 2;//假定这个点是可以走通的
                if (setWay(map, i + 1, j)) {  //向下走
                    return true;
                } else if (setWay(map, i, j + 1)) { //向右走
                    return true;
                } else if (setWay(map, i - 1, j)) { //向上走
                    return true;
                } else if (setWay(map, i, j - 1)) { //向左走
                    return true;
                } else {
                    //说明该点走不通
                    map[i][j] = 3;
                    return false;
                }
            } else { //如果map[i][j] != 0,可能是1,2,3
                return false;
            }
        }
    }
}
```

+ 测试

```java
地图的情况：
1 1 1 1 1 1 1 
1 0 0 0 0 0 1 
1 0 0 0 0 0 1 
1 1 1 0 0 0 1 
1 0 0 0 0 0 1 
1 0 0 0 0 0 1 
1 0 0 0 0 0 1 
1 1 1 1 1 1 1 
小球走过并标识过的地图：
1 1 1 1 1 1 1 
1 2 0 0 0 0 1 
1 2 2 2 0 0 1 
1 1 1 2 0 0 1 
1 0 0 2 0 0 1 
1 0 0 2 0 0 1 
1 0 0 2 2 2 1 
1 1 1 1 1 1 1 

Process finished with exit code 0
```

## 递归-八皇后问题

### 八皇后问题介绍

八皇后问题，是一个古老而著名的问题，是回溯算法的典型案例。该问题是国际西洋棋棋手马克斯·贝瑟尔于1848年提出:在8×8格的国际象棋上摆放八个皇后，使其不能互相攻击，即:**任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法**(92)。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221228/image.36gxjtykeni0.webp)

### 八皇后问题算法思路分析

1. 第一个皇后先放第一行第一列
2. 第二个皇后放在第二行第一列、然后判断是否OK，如果不OK，继续放在第二列、第三列、依次把所有列都放完，找到一个合适
3. 继续第三个皇后，还是第一列、第二列……直到第8个皇后也能放在一个不冲突的位置，算是找到了一个正确解
4. 当得到一个正确解时，在栈回退到上一个栈时，就会开始回溯，即将第一个皇后，放到第一列的所有正确解，全部得到.
5. 然后回头继续第一个皇后放第二列，后面继续循环执行1,2,3,4的步骤
6. 示意图:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221228/image.2u5943qb6500.webp)

### 代码实现

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/28  22:30
 * desc:八皇后问题
 */
public class Queue8 {

    //先定义一个max表示有多少个皇后
    int max = 8;
    //定义数组array，保存皇后放置位置的结果，比如arr = {0,4,7,5,2,6,1,3}
    int[] array = new int[max];
    static int count = 0;

    public static void main(String[] args) {
        //测试一把，8皇后是否正确
        Queue8 queue8 = new Queue8();
        queue8.check(0);
        System.out.printf("一共有%d解法", count);
    }

    //编写一个方法，放置第n个皇后
    //特别注意：check是每一次递归时，进入到check中都有 for(int i = 0; i < max; i++)
    public void check(int n) {
        if (n == max) { //n = 8，其实8个皇后依然放好
            print();
            return;
        }
        //依次放入皇后，并判断是否冲突
        for (int i = 0; i < max; i++) {
            //先把当前皇后n,放到该行的第一列
            array[n] = i;
            //判断当放置第n个皇后到i列时，是否冲突
            if (judge(n)) { //不冲突
                //接着放n+1个皇后
                check(n + 1);
            }
            //如果冲突，就继续执行 array[n] = i; 即将第n个皇后放置在本行后移的一个位置
        }
    }

    //查看当我们放置第n个皇后时，就去检测该皇后是否和前面已经摆放的皇后冲突

    /**
     * @param n 表示第n个皇后
     * @return
     */
    private boolean judge(int n) {
        for (int i = 0; i < n; i++) {
            //说明
            //1.array[i] == array[n] 表示判断 第n个皇后是否和前面的n-1个皇后在同一列
            //2.Math.abs(n-i) == Math.abs(array[n]-array[i]) 表示判断第n个皇后是否和第i个皇后是否在同一斜线
            //3. 不需要判断是否在同一行，n在递增
            if (array[i] == array[n] || Math.abs(n - i) == Math.abs(array[n] - array[i])) {
                return false;
            }
        }
        return true;
    }

    //写一个方法，可以将皇后摆放的位置输出
    private void print() {
        count++;
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
        System.out.println();
    }
}
```

+ 结果

```java
0 4 7 5 2 6 1 3 
0 5 7 2 6 3 1 4 
0 6 3 5 7 1 4 2 
0 6 4 7 1 3 5 2 
1 3 5 7 2 0 6 4 
1 4 6 0 2 7 5 3 
1 4 6 3 0 7 5 2 
1 5 0 6 3 7 2 4 
1 5 7 2 0 3 6 4 
1 6 2 5 7 4 0 3 
1 6 4 7 0 3 5 2 
1 7 5 0 2 4 6 3 
2 0 6 4 7 1 3 5 
2 4 1 7 0 6 3 5 
2 4 1 7 5 3 6 0 
2 4 6 0 3 1 7 5 
2 4 7 3 0 6 1 5 
2 5 1 4 7 0 6 3 
2 5 1 6 0 3 7 4 
2 5 1 6 4 0 7 3 
2 5 3 0 7 4 6 1 
2 5 3 1 7 4 6 0 
2 5 7 0 3 6 4 1 
2 5 7 0 4 6 1 3 
2 5 7 1 3 0 6 4 
2 6 1 7 4 0 3 5 
2 6 1 7 5 3 0 4 
2 7 3 6 0 5 1 4 
3 0 4 7 1 6 2 5 
3 0 4 7 5 2 6 1 
3 1 4 7 5 0 2 6 
3 1 6 2 5 7 0 4 
3 1 6 2 5 7 4 0 
3 1 6 4 0 7 5 2 
3 1 7 4 6 0 2 5 
3 1 7 5 0 2 4 6 
3 5 0 4 1 7 2 6 
3 5 7 1 6 0 2 4 
3 5 7 2 0 6 4 1 
3 6 0 7 4 1 5 2 
3 6 2 7 1 4 0 5 
3 6 4 1 5 0 2 7 
3 6 4 2 0 5 7 1 
3 7 0 2 5 1 6 4 
3 7 0 4 6 1 5 2 
3 7 4 2 0 6 1 5 
4 0 3 5 7 1 6 2 
4 0 7 3 1 6 2 5 
4 0 7 5 2 6 1 3 
4 1 3 5 7 2 0 6 
4 1 3 6 2 7 5 0 
4 1 5 0 6 3 7 2 
4 1 7 0 3 6 2 5 
4 2 0 5 7 1 3 6 
4 2 0 6 1 7 5 3 
4 2 7 3 6 0 5 1 
4 6 0 2 7 5 3 1 
4 6 0 3 1 7 5 2 
4 6 1 3 7 0 2 5 
4 6 1 5 2 0 3 7 
4 6 1 5 2 0 7 3 
4 6 3 0 2 7 5 1 
4 7 3 0 2 5 1 6 
4 7 3 0 6 1 5 2 
5 0 4 1 7 2 6 3 
5 1 6 0 2 4 7 3 
5 1 6 0 3 7 4 2 
5 2 0 6 4 7 1 3 
5 2 0 7 3 1 6 4 
5 2 0 7 4 1 3 6 
5 2 4 6 0 3 1 7 
5 2 4 7 0 3 1 6 
5 2 6 1 3 7 0 4 
5 2 6 1 7 4 0 3 
5 2 6 3 0 7 1 4 
5 3 0 4 7 1 6 2 
5 3 1 7 4 6 0 2 
5 3 6 0 2 4 1 7 
5 3 6 0 7 1 4 2 
5 7 1 3 0 6 4 2 
6 0 2 7 5 3 1 4 
6 1 3 0 7 4 2 5 
6 1 5 2 0 3 7 4 
6 2 0 5 7 4 1 3 
6 2 7 1 4 0 5 3 
6 3 1 4 7 0 2 5 
6 3 1 7 5 0 2 4 
6 4 2 0 5 7 1 3 
7 1 3 0 6 4 2 5 
7 1 4 2 0 6 3 5 
7 2 0 5 1 4 6 3 
7 3 0 2 5 1 6 4 
一共有92解法
Process finished with exit code 0
```

