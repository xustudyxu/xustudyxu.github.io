---
title: easy_
date: 2022-03-03 15:41:49
permalink: /pages/1c0747/
categories:
  - baodian
  - LeetCode
tags:
  - 
---
# LeetCode 算法题

[[toc]]

> 每天一道

## 简单

### 两数之和(3,3)

[题目地址](https://leetcode-cn.com/problems/two-sum/)

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：

输入：nums = [2,7,11,15], target = 9

输出：[0,1]

解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：

输入：nums = [3,2,4], target = 6

输出：[1,2]

示例 3：

输入：nums = [3,3], target = 6

输出：[0,1]

+ 解题思路:

+ 方法一:
  + 枚举在数组中所有的不同的两个下标的组合
  + 逐个检查它们所对应的数的和是否等于target
+ 复杂度分析:
  + 时间复杂度:O(n^2),这里n为数组的长度
  + 空间复杂度:O(1),只用到常数个临时变量

```java
class Solution {
    int arr[]=new int[2];
    public int[] twoSum(int[] nums, int target) {
        for(int i=0;i<nums.length;i++){
            for(int j=0;j<nums.length;j++){
            if((nums[i]+nums[j]==target)&&i!=j&&i>j){  
                arr[0]=j;
                arr[1]=i;    
            }
        }
    }
        return arr;    
}
}
```

+ 方法二:查找表法
  + 在遍历的同时，记录一些信息，一省去一层循环，这是“以空间换时间”的想法
  + 需要记录已经遍历过的数值和它所对应的下标，可以借助查找表实现
  + 查找表与两个常用的实现:
    + <font color=##dd0000 >哈希表</font>
    + 平衡二叉搜索树
+ 复杂度分析：
  + 时间复杂度:O(n),这里n为数组的长度
  + 空间复杂度:O(n),哈希表里最多需要存n-1个键值对

![1646297611805](./images/easy_/01.png)

::: tip

遍历nums,第一个元素6，不在哈希表中，key为6，value为0，存入哈希表；遍历元素3，与之对应的元素应该是target-3=5,5不在哈希表中，key为3，value为1，存入哈希表中;遍历到元素8，与之对应的元素应该是target-8=0,0不在哈希表中，key为8，value为2，存入哈希表中；遍历到元素2，与之对应的元素应该是target-2=6,6在哈希表中；因此6和2就是我们要找的两个元素，对应的下标分别是0,3,将数组[0,3]返回即可，算法到此结束。

:::

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
 		int len=nums.length;
        Map<Integer,Integer> hashMap=new HashMap<>(len-1);
        hashMap.put(nums[0],0);
        for(int i=1;i<len;i++){
            int another=target-nums[i];
            if(hashMap.containsKey(another)){
                return new int[]{i,hashMap.get(target-nums[i])};
            }
            hashMap.put(nums[i],i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}
```

> 使用 Map 的containsKey() 方法来检测another是否存在, 如果key存在,则返回i以及与之对应的数的下标hashMap.get(target-nums[i]，如果another不存在则将nums[i]，与之对应的下标i存入哈希表中。

 