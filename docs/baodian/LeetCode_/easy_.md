# LeetCode 算法题

::: tip

每天一道

:::

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

+  能不能想出一个小于 时间复杂度的算法？`O(n2) `

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] indexs = new int[2];
        
        // 建立k-v ，一一对应的哈希表
        HashMap<Integer,Integer> hashmap = new HashMap<Integer,Integer>();
        for(int i = 0; i < nums.length; i++){
            if(hashmap.containsKey(nums[i])){  //这个nums[i]的值等于i
                indexs[0] = i;
                indexs[1] = hashmap.get(nums[i]);
                return indexs;
            }
            // 将数据存入 key为补数 ，value为下标
            hashmap.put(target-nums[i],i);
        }
            return indexs;
    }
}
```

> containsKey(Object key) 方法的规范中写道：“当且仅当此映射包含针对满足 (key\==null ? k==null : key.equals(k)) 的键 k 的映射关系时，返回 true”。

