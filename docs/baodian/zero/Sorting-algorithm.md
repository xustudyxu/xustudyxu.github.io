---
title: 十大经典排序算法
date: 2022-11-20 00:05:05
permalink: /pages/eab19d/
categories:
  - 十大经典排序算法
tags:
  - 十大经典排序算法
---
# 十大经典排序算法

[[toc]]

## 介绍

排序算法是《数据结构与算法》中最基本的算法之一。

排序算法可以分为内部排序和外部排序，内部排序是数据记录在内存中进行排序，而外部排序是因排序的数据很大，一次不能容纳全部的排序记录，在排序过程中需要访问外存。常见的内部排序算法有：插入排序、希尔排序、选择排序、冒泡排序、归并排序、快速排序、堆排序、基数排序等。用一张图概括：

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221118/image.6vxkxlptjxo0.webp)

> **插帽龟**，它很稳。（稳定性：稳定）
>
> 插帽龟喜欢**选帽插**，插完就慌了。（慌了：平均时间复杂度：n^2^）
>
> **快归堆**->n老->nlogn

点击以下图片查看大图：

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221118/image.61f47p8bf2g0.webp)

## 关于时间复杂度

平方阶 (O(n2)) 排序 各类简单排序：直接插入、直接选择和冒泡排序。

线性对数阶 (O(nlog2n)) 排序 快速排序、堆排序和归并排序；

O(n1+§)) 排序，§ 是介于 0 和 1 之间的常数。 希尔排序

线性阶 (O(n)) 排序 基数排序，此外还有桶、箱排序。

关于稳定性

稳定的排序算法：冒泡排序、插入排序、归并排序和基数排序。

不是稳定的排序算法：选择排序、快速排序、希尔排序、堆排序。

名词解释：

- n：数据规模
- k："桶"的个数
- In-place：占用常数内存，不占用额外内存
- Out-place：占用额外内存
- 稳定性：排序后 2 个相等键值的顺序和排序之前它们的顺序相同

## 冒泡排序

冒泡排序（Bubble Sort）也是一种简单直观的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢"浮"到数列的顶端。

作为最简单的排序算法之一，冒泡排序给我的感觉就像 Abandon 在单词书里出现的感觉一样，每次都在第一页第一位，所以最熟悉。冒泡排序还有一种优化算法，就是立一个 flag，当在一趟序列遍历中元素没有发生交换，则证明该序列已经有序。但这种改进对于提升性能来说并没有什么太大作用。

1. **算法步骤**

比较相邻的元素。如果第一个比第二个大，就交换他们两个。

对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。

针对所有的元素重复以上的步骤，除了最后一个。

持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

2. **动画演示**

![bubbleSort](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221129/bubbleSort.60l6mgy53080.gif)

3. 代码实现

```java
public class BubbleSort {
    public static void main(String[] args) {
        int[] sourceArr = {5,4,7,8,10,-2};
        sort(sourceArr);
        for (int i = 0; i < sourceArr.length; i++) {
            System.out.println(sourceArr[i]);
        }
    }

    public static void sort(int[] arr){
        int temp = 0;
        for (int i = 0; i < arr.length ; i++) {
            for (int j = 0; j < arr.length-i-1; j++) {
                if(arr[j]>arr[j+1]){
                    temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
g        }

    }
}
```

## 插入排序

插入排序的代码实现虽然没有冒泡排序和选择排序那么简单粗暴，但它的原理应该是最容易理解的了，因为只要打过扑克牌的人都应该能够秒懂。插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入。

1. **算法步骤**

将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。

从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

2. **动图演示**

![insertionSort](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221119/insertionSort.lre9a3i98xs.gif)

3. **代码实现**

```java
public class InsertSort  {
    public static void main(String[] args) throws Exception {
        int[] sourceArray = {1, 8, 6, 9, 4, 10, 37};
        int[] ResultArray = sort(sourceArray);
        System.out.print("排序后结果: ");
        for (int i : ResultArray) {
            System.out.print(" "+i);
        }
    }

    public static int[] sort(int[] sourceArray){

        //对源数组进行copy，不改变参数内容
        int[] arr = Arrays.copyOf(sourceArray,sourceArray.length);

        //从下标为1开始选择合适位置插入，因为下标为0只有一个元素，默认是有序的
        for (int i = 1; i < arr.length; i++) {

            //记录要插入的数据
            int tmp = arr[i];

            //从已经排序的序列最右边的开始比较，找到比其小的数
            int j = i;
            //如果左边的数比右边的数大
            while (j > 0 && tmp < arr[j - 1]){
                //就交换
                arr[j] = arr[j - 1];
                //前一位
                j--;
            }

            //存在比其小的数，插入
            if(j != i){
                arr[j] = tmp;
            }
        }
        return arr;
    }

}
```

::: tip 

传入的数组为`{1, 8, 6, 9, 4, 10, 37}`

```java
        for (int i = 1; i < arr.length; i++) {
            int tmp = arr[i];
            int j = i;
            while (j > 0 && tmp < arr[j - 1]){
                arr[j] = arr[j - 1];
                j--;
            }
            if(j != i){
                arr[j] = tmp;
            }
```

第一次循环,i=1,j=1,tmp=8；while:j>0 && tmp<arr[0]:false ->false；j=i,if不成立，第一次循环resultarray:1,8

第二次循环，i=2,j=2,tmp=6；while:j>0 && tmp<arr[1]:true,进入while，arr[2]=arr[1]; //把下标为1的数8赋值给下标为2的元素

j=1;i=2;tmp=6;第二次进入while；while:j>0 && tmp<arr[0]:false -> false；j=1;i=2;if成立；arr[1] = 6

第二次循环resultarray:1,6,8

:::

> 插入排序算法简答一句话就是：从第二个元素到最后一个元素，从后面一个一个插入，插入的数和前面的数一个一个比较，如果它比右边数小，就插在这个右边数的前面。如果相等也插在后面（插在相等的数后面（why），因为后面的所有数要移动一位，插在相等的数前面，要移动后面的数加上相等的数，多移动一位）。

## 希尔排序

希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。

希尔排序是基于插入排序的以下两点性质而提出改进方法的：

- 插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；
- 但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；

希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录"基本有序"时，再对全体记录进行依次直接插入排序。

1. **算法步骤**

选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；

按增量序列个数 k，对序列进行 k 趟排序；

每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅

增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

2. **动画演示**

![Sorting_shellsort_anim](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221120/Sorting_shellsort_anim.15pe8no2r54w.gif)

3. **代码实现**

```java
public class ShellSort {
    public static void main(String[] args) {
        int sourceArray[] = new int[]{7,4,2,7,8,9,0,1};
        sort(sourceArray);
        for (int i = 0; i < sourceArray.length; i++) {
            System.out.println(i);
        }
    }
    public static void sort(int[] arr){
        int length = arr.length;
        int temp;
        for (int step = length / 2;step >= 1; step /= 2){
            for (int i = 0; i < length; i++) {
                temp = arr[i];
                int j = i - step;
                while (j >= 0 && arr[j] > temp){
                    arr[j+step] = arr[j];
                    j -= step;
                }
                arr[j+step] = temp;
            }
        }
    }
}
```

## 参考资料

[https://github.com/hustcc/JS-Sorting-Algorithm/blob/master/10.radixSort.md](https://github.com/hustcc/JS-Sorting-Algorithm/blob/master/10.radixSort.md)