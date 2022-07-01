---
title: Java 数组、排序和查找
date: 2021-12-20 18:44:12
permalink: /pages/88c216/
categories:
  - java
tags:
  - java
---
# Java 数组、排序和查找

## 为什么需要数组

一个养鸡场有 6 只鸡，它们的体重分别是 3kg,5kg,1kg,3.4kg,2kg,50kg 。请问这六只鸡的总体重是多少?平
均体重是多少? 请你编一个程序。

思路：

定义 6 个变量 , 加起来 总体重， 求出平均体重.引出 ->数组

### 数组介绍

数组可以存放多个同一类型的数据。数组也是一种数据类型，是引用类型。

即：数(数据)组(一组)就是一组数据

### 数组快速入门

比如，我们可以用数组来解决上一个问题。

```java
//数组的引出
//
public class Array01 {
	//编写一个 main 方法
	public static void main(String[] args) {
	/*
	它们的体重分别是 3kg,5kg,1kg,3.4kg,2kg,50kg 。
	请问这六只鸡的总体重是多少?平均体重是多少?
	思路分析
	1. 定义六个变量 double , 求和 得到总体重
	2. 平均体重 = 总体重 / 6
	3. 分析传统实现的方式问题. 6->600->566
	4. 引出新的技术 -> 使用数
	*/
        // double hen1 = 3;
        // double hen2 = 5;
        // double hen3 = 1;
        // double hen4 = 3.4;
        // double hen5 = 2;
        // double hen6 = 50;
        // double totalWeight = hen1 + hen2 + hen3 + hen4 + hen5 + hen6;
        // double avgWeight = totalWeight / 6;
        // System.out.println("总体重=" + totalWeight + "平均体重 + avgWeight);

       //定义一个数组
       //1. double[] 表示 是 double 类型的数组， 数组名 hens
       //2. {3, 5, 1, 3.4, 2, 50} 表示数组的值/元素,依次表示数组的	
       double[] hens = {3, 5, 1, 3.4, 2, 50, 7.8, 88.8,1.1,5.6,100};
       //遍历数组得到数组的所有元素的和， 使用 for
       //老韩解读
       //1. 我们可以通过 hens[下标] 来访问数组的元素
       // 下标是从 0 开始编号的比如第一个元素就是 hens[0]
       // 第 2 个元素就是 hens[1] , 依次类推
       //2. 通过 for 就可以循环的访问 数组的元素/值
       //3. 使用一个变量 totalWeight 将各个元素累积
       System.out.println("===使用数组解决===");
       //老师提示： 可以通过 数组名.length 得到数组的大小/长度
       //System.out.println("数组的长度=" + hens.length);
       double totalWeight = 0;
       for( int i = 0; i < hens.length; i++) {
        //System.out.println("第" + (i+1) + "个元素的值=" + hens[i]);
            totalWeight += hens[i];
        }
        System.out.println("总体重=" + totalWeight+ "平均体重=" + (totalWeight / hens.length) );
        
	}
}
```

### 数组的使用

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/01.png)

```java
public class Array02 {
	//编写一个 main 方法
	public static void main(String[] args) {
		//演示 数据类型 数组名[]=new 数据类型[大小]
		//循环输入 5 个成绩，保存到 double 数组
        //步骤
		//1. 创建一个 double 数组，大小 5
		//(1) 第一种动态分配方式
		//double scores[] = new double[5];
		//(2) 第 2 种动态分配方式， 先声明数组，再 new 分配空间
		double scores[] ; //声明数组， 这时 scores 是 null
		scores = new double[5]; // 分配内存空间，可以存放数据
		//2. 循环输入
		// scores.length 表示数组的大小/长度
		//
		Scanner myScanner = new Scanner(System.in);
		for( int i = 0; i < scores.length; i++) {
			System.out.println("请输入第"+ (i+1) +"个元素的值");
			scores[i] = myScanner.nextDouble();
		}
		//输出，遍历数组
		System.out.println("==数组的元素/值的情况如下:===");
		for( int i = 0; i < scores.length; i++) {
			System.out.println("第"+ (i+1) +"个元素的值=" + scores[i]);
		}
    }
}
```

### 使用方式 2-动态初始

+ 先声明数组

  语法:数据类型 数组名[]; 也可以 数据类型[] 数组名;

  int a[]; 或者 int[] a;

+ 创建数组

  语法: 数组名=new 数据类型[大小];

  a=new int[10]

### 使用方式 3-静态初始

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/02.png)

## 数组使用注意事项和细节

1. 数组是多个相同类型数据的组合，实现对这些数据的统一管理

2. 数组中的元素可以是任何数据类型，包括基本类型和引用类型，但是不能混用。

3. 数组创建后，如果没有赋值，有默认值

   int 0，short 0, byte 0, long 0, float 0.0,double 0.0，char \u0000，boolean false，String null

4. 使用数组的步骤 1. 声明数组并开辟空间 2 给数组各个元素赋值 3 使用数组
   
5.  数组的下标是从 0 开始的。

6. 数组下标必须在指定范围内使用，否则报：下标越界异常，比如

   int [] arr=new int[5]; 则有效下标为 0-4

7. 数组属引用类型，数组型数据是对象(object)

```java
public class ArrayDetail {
	//编写一个 main 方法
	public static void main(String[] args) {
		//1. 数组是多个相同类型数据的组合，实现对这些数据的统一管理
		//int[] arr1 = {1, 2, 3, 60,"hello"};//String ->int
		double[] arr2 = {1.1, 2.2, 3.3, 60.6, 100};//int ->double
		//2. 数组中的元素可以是任何数据类型，包括基本类型和引用类型，但是不能混用
		String[] arr3 = {"北京","jack","milan"};
		//3. 数组创建后，如果没有赋值，有默认值
		//int 0，short 0, byte 0, long 0, //float 0.0,double 0.0，char \u0000，
		//boolean false，String null
		//
		short[] arr4 = new short[3];
		System.out.println("=====数组 arr4=====");
		for(int i = 0; i < arr4.length; i++) {
			System.out.println(arr4[i]);
		}
		//6. 数组下标必须在指定范围内使用，否则报：下标越界异常，比如
		//int [] arr=new int[5]; 则有效下标为 0-4
		//即数组的下标/索引 最小 0 最大 数组长度-1(4)
		int [] arr = new int[5];
		//System.out.println(arr[5]);//数组越界
	}
}
```

## 数组应用案例

1. 创建一个 char 类型的 26 个元素的数组，分别 放置'A'-'Z'。使用 for 循环访问所有元素并打印出来。提示：char 类型数据运算 'A'+2 -> 'C' ArrayExercise01.java

```java
public class ArrayExercise01 {

	private static int i;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*
		  创建一个char类型的26个元素的数组，分别放置‘A’-‘Z’
		  使用for循环访问所有元素并打印出来
		  提示：char类型数据运算‘A’+1-》‘B’
		  思路分析
		  1.定义一个 数组 char[] chars=new char[26];
		  2.因为‘A‘+1='B'类推，所以用for来赋值
		  3.使用for循环访问所有元素并打印出来
		 */
          char[] chars =new char[26];
          for(int i=0;i<chars.length;i++) {//循环26次
        	  //chars[] 是char[]
        	  //chars[i]是char
        	  chars[i]=(char) ('A'+i);  //'A'=i是int，需强制转换  
          System.out.println(chars[i]+" ");
          
	}
	}
}
```

2. 请求出一个数组 int[]的最大值 {4,-1,9, 10,23}，并得到对应的下标。 ArrayExercise02.java

```java
public class ArrayExercise02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        //求出一个数组int[]的最大值{4,-1,9,10,23},并得到对应的下标
		//思路分析
		//1.定义一个int数组int[]arr ={4,-1,9,10,23}
		//2.假定max=arr[0]是最大值，maxIndex=0；
		//3.从下标1开始遍历arr，如果max<当前元素，说明max不是真正的最大值，
		//把当前的元素赋给max；maxIndex=当前元素下表
	    //4.当我们遍历真个数组arr后，max就是真正的最大值，maxIndex就是最大值下标
	    int[]arr= {4,-1,9,10,23};
	    int max=arr[0];//假定第一个元素就是最大值
	    int maxIndex =0;//
	    for(int i=1;i<arr.length;i++) {
	    	if(max<arr[i]) { //如果max小于当前元素
	    		max =arr[i];//把当前元素赋给max
	    		maxIndex=i;
	    	}
	    }
	
	System.out.println("max="+max+"  maxIndex"+maxIndex);
	
	}
}
```

## 数组赋值机制

1. 基本数据类型赋值，这个值就是具体的数据，而且相互不影响。

   int n1 = 2; int n2 = n;

2. 数组在默认情况下是引用传递，赋的值是地址。看一个案例，并分析数组赋值的内存图(重点, 难点. )

   int[] arr1 = {1,2,3};

   int[] arr2 =arr1;

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/03.png)

## 数组拷贝

编写代码 实现数组拷贝(内容复制) ArrayCopy.java

将 int[] arr1 = {10,20,30}; 拷贝到 arr2 数组, 要求数据空间是独立

```java
public class ArrayCopy {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        //将int arr1[]={10,20,30};拷贝到arr2数组，要求数据空间是独立的
	 int arr1[]= {10,20,30};
	    //创建一个新的数组arr2，开辟新的数据空间
	    //大小 arr.length；
	    //
	     int arr2[]=new int[arr1.length];
	     //遍历arr1，把每个元素拷贝到对应的位置
	     for(int i=0;i<arr1.length;i++) {
	    	 arr2[i]=arr1[i];
	     }
	     //修改arr2
	     arr2[0]=100;
	     //输出arr1
	     System.out.println("=======arr1的元素========");
	        for(int i=0;i<arr2.length;i++) {
	        	System.out.println(arr2[i]);//100,20,30   	
	        } 
	}
}
```

## 数组反转

要求：把数组的元素内容反转。 ArrayReverse.java

arr {11,22,33,44,55,66} {66, 55,44,33,22,11}

+ 方式一:通过找规律反转

```java
public class ArrayReverse01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        //定义数组
		int arr[]= {11,22,33,44,55,66};
		//1.把arr[0]和arr[5]进行交换{66,22，33,44,55,11}
		//2.把arr[1]和arr[4]进行交换{66,55，33,44,22,11}
		//3.把arr[2]和arr[3]进行交换{66,55，44,33,22,11}
		//4.一共要交换3次 =arr.length/2
		//5.每次交换时，对应的下标是arr[i]和arr[arr.length-1-i]
		//代码
		//优化
		int temp=0;
		
		Test test=new Test();
		test.Reverse(arr);
	}
}
class Test{
	public void Reverse(int arr1[]){
		int temp=0;
		int len=arr1.length;
		for(int i=0;i<len/2;i++) {
			temp=arr1[len-1-i];//保存
			arr1[len-1-i]=arr1[i];
			arr1[i]=temp;
		
		}
		 System.out.println("=======翻转后的数组========");
	        for(int i=0;i<arr1.length;i++) {
				System.out.print(arr1[i]+"\t");
		}
	}	

}
```

+ 方式二:使用逆序赋值方式

```java
public class ArrayExercise02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        //求出一个数组int[]的最大值{4,-1,9,10,23},并得到对应的下标
		//思路分析
		//1.定义一个int数组int[]arr ={4,-1,9,10,23}
		//2.假定max=arr[0]是最大值，maxIndex=0；
		//3.从下标1开始遍历arr，如果max<当前元素，说明max不是真正的最大值，
		//把当前的元素赋给max；maxIndex=当前元素下表
	    //4.当我们遍历真个数组arr后，max就是真正的最大值，maxIndex就是最大值下标
	    int[]arr= {4,-1,9,10,23};
	    int max=arr[0];//假定第一个元素就是最大值
	    int maxIndex =0;//
	    for(int i=1;i<arr.length;i++) {
	    	if(max<arr[i]) { //如果max小于当前元素
	    		max =arr[i];//把当前元素赋给max
	    		maxIndex=i;
	    	}
	    }
	
	System.out.println("max="+max+"  maxIndex"+maxIndex);
	
	}
}
```

## 数组添加/扩容

要求：实现动态的给数组添加元素效果，实现对数组扩容。ArrayAdd.java

1. 原始数组使用静态分配 int[] arr = {1,2,3}
2. 增加的元素 4，直接放在数组的最后 arr = {1,2,3,4}
3. 用户可以通过如下方法来决定是否继续添加，添加成功，是否继续？y/n

```java
public class ArrayAdd02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*要求：实现动态的给数组添加元素效果，实现对数组扩容。ArrayAdd.java
		 1.原始数组使用静态分配 int arr[]={1,2,3}
		 2.增加的元素4，直接放在数组的最后arr={1,2,3,4}
		 3.用户可以通过如下方法来决定是否继续添加，添加成功，是否继续？y/n
		 思路分析
		 1.定义初始数组 int arr[]={1,2,3}
		 2.定义一个新数组int arrNew[]=new int[arr.length+1]; 
		 3.遍历arr数组，依次将arr的元素拷贝到arrNew数组
		 4.将4赋给 arrNew[arr.length-1]=4;把4赋给arrNew最后一个元素
		 5.让arr指向arrNew； arr=arrNew；那么原来的arr数组就被销毁
		 6.创建一个Scanner可以接收用户输入
		 7.因为用户什么时候退出，不确定，使用do-while+break控制	
		 	 */
		Scanner myScanner=new Scanner(System.in);
		
		
		int arr[]= {1,2,3};
		do {
		int arrNew[]=new int[arr.length+1];
		for(int i=0;i<arr.length;i++) {
			arrNew[i]=arr[i];
		}
		System.out.println("请输入你要添加的元素");
		int addNum=myScanner.nextInt();
         //把addNum赋给arrNew最后一个元素
		arrNew[arrNew.length-1]=addNum;
		//让arr指向arrNew，
		arr=arrNew;
		//输出arr 看看效果
		System.out.println("=====arr扩容后元素情况=====");
		  for(int i=0;i<arr.length;i++) {
	       arrNew[i] =arr[i];
	       System.out.print(arr[i]+"\t");
		  }  
		  //问用户是否继续
		  System.out.println("是否继续添加y/n");
		  char key=myScanner.next().charAt(0);
		  if(key=='n') {//如果输入n，就结束
			  break;
		  }
		}while(true);
		System.out.println("你已退出了添加");
	}
}
```

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/04.png)

## 排序的介绍

排序是将多个数据，依指定的顺序进行排列的过程

### 内部排序

指将需要处理的所有数据都加载到内部存储器中进行排序。包括(交换式排序法、选择式排序法和插入式排序法)；

### 外部排序法

数据量过大，无法全部加载到内存中，需要借助外部存储进行排序。包括(合并排序法和直接合并排序法)。

## 冒泡排序法

冒泡排序（Bubble Sorting）的基本思想是：通过对待排序序列从后向前（从下标较大的元素开始），依次比较相邻元素的值，若发现逆序则交换，使值较大的元素逐渐从前移向后部，就象水底下的气泡一样逐渐向上冒。

冒泡排序法案例：

下面我们举一个具体的案例来说明冒泡法。我们将五个无序：24,69,80,57,13 使用冒泡排序法将其排成一个从小到大的有序数列。

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/05.png)

```java
public class BubbleSort {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
       //化繁为简
		
		/*
		  数组[24,69,80,57,13]
		  第一轮排序：目标把最大数放在后面
		  第1次比较[24,69,80,57,13]
		  第2次比较[24,69,80,57,13]
		  第3次比较[24,69,57,80,13]
		  第4次比较[24,69,57,13,80]
		 
		 */
		int arr[]= {24,69,80,57,13};
		int temp=0;//用于辅助交换的变量
		//将多轮循环使用最外层循环包括起来即可
		for(int i=0;i<arr.length-1;i++) {//外层循环是4次
			for(int j=0;j<arr.length-1-i;j++) { //内层比较4-3-2-1
				//如果前面的数>后面的数，就交换
				if(arr[j]>arr[j+1]){
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;//[400,10]			 
			}
		}
		
			System.out.println("==第"+i+"循环比较结果==");
			for(int j=0;j<arr.length;j++) {
				System.out.print(arr[j]+"\t");
				
			}
			System.out.println();
		}
		
//		System.out.println();
//		for(int j=0;j<4;j++) {//4次比较
//			//如果前面的数>后面的数，就交换
//			if(arr[j]>arr[j+1]){
//			temp=arr[j];
//			arr[j]=arr[j+1];
//			arr[j+1]=temp;//[400,10]			 
//		}
//	}
//		System.out.println("==第1轮==");
//		for(int j=0;j<arr.length;j++) {
//			System.out.print(arr[j]+"\t");
//		}
//		/*
//		 第2轮排序：目标把第二大数放在倒数第二位置
//		 第1次比较[24,69,57,13,80]
//		 第2次比较[24,57,69,13,80]
//		 第3次比较[24,57,13,69,80]
//		 */
//		System.out.println();
//		for(int j=0;j<3;j++) {//3次比较
//			//如果前面的数>后面的数，就交换
//			if(arr[j]>arr[j+1]){
//			temp=arr[j];
//			arr[j]=arr[j+1];
//			arr[j+1]=temp;			 
//		}
//	}
//		System.out.println("==第2轮==");
//		for(int j=0;j<arr.length;j++) {
//			System.out.print(arr[j]+"\t");
//		}
//		/*
//		 第3轮排序：目标把第3大数放在倒数第三的位置
//		 第1次比较[24,57,13,69,80]
//		 第2次比较[24,13,57,69,80]
//		 */
//		
//		
//		System.out.println();
//		for(int j=0;j<2;j++) {//2次比较
//			//如果前面的数>后面的数，就交换
//			if(arr[j]>arr[j+1]){
//			temp=arr[j];
//			arr[j]=arr[j+1];
//			arr[j+1]=temp;			 
//		}
//	}
//		System.out.println("==第3轮==");
//		for(int j=0;j<arr.length;j++) {
//			System.out.print(arr[j]+"\t");
//		}
//		System.out.println();
//		for(int j=0;j<1;j++) {//1次比较
//			//如果前面的数>后面的数，就交换
//			if(arr[j]>arr[j+1]){
//			temp=arr[j];
//			arr[j]=arr[j+1];
//			arr[j+1]=temp;			 
//		}
//	}
//		System.out.println("==第4轮==");
//		for(int j=0;j<arr.length;j++) {
//			System.out.print(arr[j]+"\t");	
//		}
//				 
		
		
	}	
}

```

## 查找

### 案例演示

1. 有一个数列：白眉鹰王、金毛狮王、紫衫龙王、青翼蝠王猜数游戏：从键盘中任意输入一个名称，判断数列中是否包含此名称【顺序查找】 要求: 如果找到了，就提示找到，并给出下标值。

```java
public class SeqSearch {
	//编写一个 main 方法
	public static void main(String[] args) {
		/*
		有一个数列：白眉鹰王、金毛狮王、紫衫龙王、青翼蝠王猜数游戏：
		从键盘中任意输入一个名称，判断数列中是否包含此名称【顺序查找】
		要求: 如果找到了，就提示找到，并给出下标值
		思路分析
		1. 定义一个字符串数组
		2. 接收用户输入, 遍历数组，逐一比较，如果有，则提示信息，并退出
		*/
		//定义一个字符串数组
		String[] names = {"白眉鹰王", "金毛狮王", "紫衫龙王", "青翼蝠王"};
		Scanner myScanner = new Scanner(System.in);
		System.out.println("请输入名字");
		String findName = myScanner.next();
		//遍历数组，逐一比较，如果有，则提示信息，并退出
		//这里老师给大家一个编程思想/技巧, 一个经典的方法
		int index = -1;
		for(int i = 0; i < names.length; i++) {
		//比较 字符串比较 equals, 如果要找到名字就是当前元素
			if(findName.equals(names[i])) {
				System.out.println("恭喜你找到 " + findName);
				System.out.println("下标为= " + i);
				//把 i 保存到 index
				index = i;
				break;//退出
			}
		}
		if(index == -1) { //没有找到
			System.out.println("sorry ,没有找到 " + findName);
		}
    }
}
```

## 多维数组-二维数组

多维数组我们只介绍二维数组。

二维数组的应用场景

比如我们开发一个五子棋游戏，棋盘就是需要二维数组来表示。如图：

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/06.png)

##  二维数组的使用

### 快速入门案例

请用二维数组输出如下图形

0 0 0 0 0 0
0 0 1 0 0 0
0 2 0 3 0 0
0 0 0 0 0 0

```java
public class TwoDimeensionalArray01 {
	//编写一个main方法
	public static void main(String[] args){
		/*
		 请用二维数组输出如下图形
		  0 0 0 0 0 0
		  0 0 1 0 0 0
		  0 2 0 3 0 0
		  0 0 0 0 0 0
		 */
		//什么是二维数组；
		//1.从定义形式上看 int[][]
        //2.可以这样理解，原来的一维数组的每个元素是一维数组，就会构成二维数组
		int[][] arr= {{0,0,0,0,0,0},
				      {0,0,1,0,0,0},
				      {0,2,0,3,0,0},
				      {0,0,0,0,0,0}};
		//关于二维数组的关键概念
		//(1)
		System.out.println("二维数组的元素个数=" + arr.length);
		//(2)二维数组的每个元素是一维数组，所以如果需要得到每个一维数组的值
		//  还需要再次遍历
		//（3）如果我们要访问第（i+1)个一维数组的第j+1个值 arr[i][j];
		//   举例访问3，=》他是第3个一维数组的的第4个值  arr[2][3]
		System.out.println("第3个一维数组的的第4个值"+arr[2][3]);
		
		
		//输出二维图形
		for(int i=0;i<arr.length;i++) {//遍历二维数组的每个元素
		    //遍历二维数组的每个元素（数组）
			//老韩解读
			//1.arr[i]表示 二维数组的第i+1个元素
			//2.arr[i].length 得到对应的每一个数组的长度
			for(int j =0;j<arr[i].length;j++) {
				System.out.print(arr[i][j]+" ");//输出一维数组
			}
			System.out.println();//换行
		}
	}
}
```

### 使用方式 1: 动态初始化

1. 语法: 

   ```java
   类型[][] 数组名=new 类型[大小][大小];
   ```

2. 比如: 

   ```java
   int a[][]=new int[2][3]
   ```

```java
public class TwoDimeensionalArray02 {
	//编写一个main方法
	public static void main(String[] args) {
	//	int arr[][]=new int[2][3];
		int arr[][];//声明二维数组
		arr=new int[2][3];//再开空间
		arr[1][1]=8;
		//遍历arr数组
		for(int i=0;i<arr.length;i++) {
			for(int j=0;j<arr[i].length;j++) {
				System.out.print(arr[i][j]+" ");
			}
			System.out.println();//换行
		}
	}
}
```

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/07.png)

### 使用方式 2: 动态初始化

```java
先声明：类型 数组名[][];

再定义(开辟空间) 数组名 = new 类型[大小][大小];

赋值(有默认值，比如 int 类型的就是 0)
```

### 使用方式 3: 动态初始化-列数不确定

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/08.png)

```java
public class TwoDimeensionalArray03 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*看一个需求：动态创建下面二维数组，并输出
		  i=0:1
		  i=1:2 2
		  i=2:3 3 3
		  一个有三个一维数组，每个一维数组的元素是不一样的
		 
		 */
		int[][]arr=new int[3][];//
		for(int i=0;i<arr.length;i++) {//遍历arr每一个一维数组
			//给每一个一维数组开空间 new
			//如果没有给一维数组 new，那么arr[i]就是null
			arr[i]=new int[i+1];
			//遍历一维数组，并给一维数组的每个元素赋值
			for(int j=0;j<arr[i].length;j++) {
				arr[i][j]=i+1;//赋值
			}
			
		}
		System.out.println("=======arr元素====");
        //遍历arr输出
		for(int i=0;i<arr.length;i++){
			//输出arr的每个一维数组
			for(int j=0;j<arr[i].length;j++) {
				System.out.print(arr[i][j]+" ");
			}
			
			System.out.println();//换行
		
		}
	}

}

```

### 使用方式 4: 静态初始化

```
定义类型 数组名[][] = {{值 1,值 2..},{值 1,值 2..},{值 1,值 2..}};
```

比如:

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/arr/09.png)

+ 解读

1. 定义了一个二维数组 arr
2. arr 有三个元素(每个元素都是一维数组)
3. 第一个一维数组有 3 个元素 , 第二个一维数组有 3 个元素, 第三个一维数组有 1 个元素

### 案例演示

```java
int arr[][]={{4,6},{1,4,5,7},{-2}};
```

 遍历该二维数组，并得到和

```java
public class TwoDimeensionalArray04 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*
		 * int arr[][]={{4,6},{1,4,5,7},{-2}};遍历该二维数组，并得到和
		 思路
		 1.遍历二维数组，并将各个值累计到 int sum
		 
		 */
		int arr[][]={{4,6},{1,4,5,7},{-2}};
		int sum=0;
         for(int i=0;i<arr.length;i++) {
        	 //遍历每个一维数组
        	 for(int j=0;j<arr[i].length;j++) {
        		 sum+=arr[i][j];
        	 }
         }
         System.out.println("sum="+sum);
	}
}
```

## 二维数组使用细节和注意事项

1. 一维数组的声明方式有:

   ```java
   	int[] x 或者 int x[]
   ```

2. 二维数组的声明方式有:

   ```java
   	int[][] y  或者 int y[][]
   ```

3. 二维数组实际上是由多个一维数组组成的，它的各个一维数组的长度可以相同，也可以不相同。比如： map[][] 是一个二维数组

   ```java
	int map [][] = {{1,2},{3,4,5}}
   //由 map[0] 是一个含有两个元素的一维数组 ，map[1] 是一个含有三个元素的一维数组构成，我们也称为列数不等的二维数组
   ```
   
   

