---
title: Java 面向对象
date: 2021-12-25 17:31:42
permalink: /pages/f3fe89/
categories:
  - java
tags:
  - java
---
# Java 面向对象

## 类与对象

### 看一个养猫猫的问题

张老太养了两只猫猫:一只名字叫小白,今年 3 岁,白色。还有一只叫小花,今年 100 岁,花色。请编写一个程序，当用户输入小猫的名字时，就显示该猫的名字，年龄，颜色。如果用户输入的小猫名错误，则显示 张老太没有这只猫

### 使用现有技术解决

1. 单独的定义变量解决
2. 使用数组解决

### 现有技术解决的缺点分析

不利于数据的管理

效率低===》 引出我们的新知识点 类与对象 

java 设计者 引入 类与对象(OOP) ，根本原因就是现有的技术，不能完美的解决新的新的需求.

```java
package day03;
public class Object01 {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		//第一只猫的信息
		String cat1Name="小白";
		int cat1Age =3;
		String cat1Color ="白色";
		//第二只猫的信息
		String cat2Name ="小花";
		int cat2Age=100;
		String cat2Color="花色";
		//用数组来表示	
		String[] cat1= {"小白","3","白色"};
		String[] cat2= {"小花","100","花色"};
    }    
}
```

### 一个程序就是一个世界，有很多世界

+ 对象
  + 属性
  + 行为

### 类与对象的关系示意图

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/01.png)

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/03.png)

 ### 快速入门

用面向对象的方式解决养猫问题

```java
public class Object01 {
public static void main(String[] args) {
		//1. new Cat()创建一个猫(猫对象)
		//2.Cat cat1=new Cat;把创建的猫赋给 cat1
	    //3.cat1就是一个对象
		Cat cat1=new Cat();
		cat1.name="小白";
		cat1.age=3;
		cat1.color ="白色";
		//创建了第二只猫，并赋给 cat2
		//cat2 也是一个对象（猫对象）
		Cat cat2=new Cat();
		cat2.name="小花";
		cat2.age=100;
		cat2.color="花色";
		//怎么访问对象的属性呢
		System.out.println("第一只猫的信息"+cat1.name+" "+cat1.age+" "+cat1.color);
		System.out.println("第二只猫的信息"+cat2.name+" "+cat2.age+" "+cat2.color);
		}
	}
	//定义一个猫类Cat->自定义的数据类型
class Cat{
	//属性
	String name;//名字
	int age;//年龄
	String color;//颜色

	}
```

### 类与对象之间的区别与联系

通过上面的案例和讲解我们可以看出:

1. 类是抽象的，概念的，代表一类事物,比如人类,猫类.., 即它是**数据类型**

2. 对象是具体的，实际的，代表一个具体事物, 即是实例

3. 类是对象的模板，对象是类的一个个体，对应一个实例

### 对象在内存中存在形式(重要)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/04.png)

### 属性/成员变量/变量

+ 基本介绍

1. 从概念或叫法上看：**成员变量 = 属性 = field(字段) (即成员变量是用来表示属性的)**

案例演示：Car(name,price,color) 

```java
package day03;

public class Object02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
class Car{
	String name;//属性，成员变量，字段field
	double peice;
	String color;
	String[] master;//属性可以是基本数据类型，也可以是引用数据类型（对象，数组)。
	
}
```

2. **属性**是类的一个组成部分,**一般是基本数据类型,也可是引用类型(对象，数组)**.比如我们前面定义猫类的int age就是属性

+  注意事项和细节说明
  1. 属性的定义语法同变量，示例：访问修饰符 属性类型 属性名
  2. 属性的定义类型可以为任意类型，包含基本类型或引用类型
  3. 属性如果不赋值，有默认值，规则和数组一致。具体说: **int 0，short 0, byte 0, long 0, float 0.0,double 0.0，char \u0000，boolean false，String null**

+ 案例演示:[Person类]

```java
package day03;

public class PropertiesDetail {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//p1 是对象名（对象引用）
		//newPerson()创建的对象空间（数据)才是真正的对象
		Person0 p1=new Person0();
		//对象得属性默认值，遵守数组规则：
		//属性如果不赋值，有默认值
		//int 0,short 0,byte 0,long 0,float 0.0,double 0.0,char \u0000,boolean
        System.out.println("\n当前这个人的信息");
        System.out.println("age="+p1.age+"name="
        		+p1.name+"sal="+p1.sal+"isPass"+p1.isPass);
	}

}
class Person0{
	int age;
	String name;
	double sal;
	boolean isPass;
	
}
```

### 如何创建对象

1. 先声明在创建

   Cat cat ; //声明对象 cat

   cat = new Cat(); //创建

2.  直接创建

   Cat cat = new Cat();

### 如何访问属性

+ 基本语法

  **对象.属性名**

+ 案例演示赋值和输出

> cat.name ;
>
> cat.age;
>
> cat.color;

+  类和对象的内存分配机制

看一个思考题

我们定义一个人类(Person)(包括 名字,年龄)。

```java
package day03;

public class Object03 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub	
		Person p1=new Person();
		p1.age=10;
		p1.name="小明";
		Person p2=p1;//p1赋值给了p2
		System.out.println(p2.age);
    }
}
class Person {
	int age;
	String name;

}

```

请问：p2.age究竟是多少?并画出内存图

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/05.png)

### 类和对象的内存分配机制

+ Java内存的结构分析
  1. **栈 一般存放基本数据类型(局部变量)**
  2. **堆： 存放对象(Cat cat , 数组等)**
  3. **方法区：常量池(常量，比如字符串)， 类加载信息**
+ Java 创建对象的流程简单分析

```java
Person p = new Person();
p.name = “jack”;
p.age = 10
```

1.  先加载 Person 类信息(属性和方法信息, 只会加载一次)
2.  在堆中分配空间, 进行默认初始化(看规则)
3.  把地址赋给 p , p 就指向对象

4.  进行指定初始化， 比如 p.name =”jack” p.age = 10

+  看一个练习题，并分析画出内存布局图，进行分析

```java
		Person a = new Person();
		a.age = 10;
		a.name = "小明";
		Person b;
		b=a;
		System.out.println(b.name);
		b.age=200;
		b=null;
		System.out.println(a.age);
		//System.out.println(b.age);//出现异常
```

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/06.png)

## 成员方法

### 基本介绍

在某些情况下，我们要需要定义成员方法(简称方法)。比如人类:除了有一些属性外( 年龄，姓名..),我们人类还有一
些行为比如:可以说话、跑步..,通过学习，还可以做算术题。这时就要用**成员方法**才能完成。现在要求对 Person 类完善。

### 成员方法快速入门

1.  添加 speak 成员方法,输出 “我是一个好人”
2.  添加 cal01 成员方法,可以计算从 1+..+1000 的结果
3.  添加 cal02 成员方法,该方法可以接收一个数 n，计算从 1+..+n 的结果
4.  添加 getSum 成员方法,可以计算两个数的和

```java
package day04;

public class Method01 {

	public static void main(String[] args) {
		// 方法使用
		// 1.方法写好后，如果不去调用，不会输出
		// 2.先创建对象，然后调用方法即可
		Person p1=new Person();
		p1.speak();//调用方法
		p1.cal01();//调用cal01
		p1.cal02(10);//调用cal02
		//调用getSum方法，同时num1=10，num2=20
		//把方法getSum返回的值，赋给变量returnRes
		int returnRes =p1.getSum(10,20);
		System.out.println("getSum方法返回的值="+returnRes);
	}	
}
class Person{
	String name;
	int age;
    
    
	//方法（成员方法）
	//添加speak 成员方法，输出“我是一个好人”
	//解读
	//1.public 表示方法是公开的
	//2.void:表示方法没有返回值
	//3.speak():speak是方法名； （）形参列表
	//4.{}方法体，可以写我们要执行的代码
	//5.System.out.println（"我是一个好人");表示我们的方法就是输出一句话
	
   public void speak() {
	   System.out.println("我是一个好人");
	   }
   //添加cal01 成员方法，可以计算从1+...+1000的结果
   public void cal01(){
	   //循环完成
	   int res =0;
	   for(int i=1;i<=1000;i++) {
		   res+=i;
	   }
	   System.out.println("计算结果="+res);
   }
    
   //添加cal02的方法，该方法可以接受一个数n，计算从1+..+n的结果
   //解读
   //1.（int n）形参列表，表示当前有一个形参n，可以接受用户输入
   public void cal02(int n){
	   int res =0;
	   for(int i=1;i<=n;i++) {
		   res+=i;
	   }
	   System.out.println("cal02的计算结果="+res);
	   
   }
    
    
   //添加getSum成员方法，可以计算两个数的和
   //解读
   //1.public表示方法是公开的
   //2.int:表示方法执行后，返回一个int值
   //3.getSum方法名
   //4.(int num1,int num2）形参列表，2个形参，可以接受用户传入的两个数
   //5.return res;表示把res的值，返回
   public int getSum(int num1,int num2){
	   int res =num1+num2;
	   return res;
	   
   }
}
   //方法调用小结
/*
 *1.当程序执行到方法时，就会开辟一个独立的空间（栈空间)
 *2.当方法执行完毕，或者执行到return语句时，就会返回；
 *3.返回到调用方法的地方
 *4.返回后，继续执行方法后面的代码
 *5.当main（）方法（栈）执行完毕，整个程序退出
 * */

```

### 方法的调用机制原理

提示：画出程序执行过程[getSum]+说明

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/07.png)

### 为什么需要成员方法

+ 看一个需求

请遍历一个数组 , 输出数组的各个元素值。

+  解决思路

1. 传统的方法，就是使用单个 for 循环，将数组输出，大家看看问题是什么？
2. 定义一个类 MyTools ,然后写一个成员方法，调用方法实现,看看效果又如何。

```java
package day04;

public class Method02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        //使用方法完成数组
        MyTools too1=new MyTools();
        too1.printArr(map);
        too1.printArr(map);
        too1.printArr(map);
        
        //遍历map数组
        //传统的解决方式就是直接执行
//        for(int i=0;i<map.length;i++) {
//        	for(int j=0;j<map[i].length;j++) {
//        		System.out.print(map[i][j]+" ");
//        	}
//        	System.out.println();
//        }
        //....
        //
        //要求再次遍历            
	}

}
//把输出的功能，写到一个类的方法中，然后调用该方法即可
class MyTools{
	//方法，接受一个二维数组
	public void printArr(int[][] map) {
		System.out.println("==============");
		//对传入的map数组进行遍历输出
		for(int i=0;i<map.length;i++) {
			for(int j=0;j<map[i].length;j++) {
				System.out.print(map[i][j]+"\t ");
			}
			System.out.println();
		}
	}
}
//方法的好处：1.提高了代码的复用性
//成员方法的定义
//public返回数据类型 方法名（形参列表..）{ //方法体
//        语句
//        return 返回值；}
/*1.参数列表：表示成员方法输入 cal（int n）
  2.数据类型（返回类型）：表示成员方法输出，void表示没有返回值
  3.方法主题：表示为了实现某一功能的代码
  4.return语句不是必须的
 */
//访问修饰符有public protected 默认 private
 

```

### 成员方法的好处

1.  提高代码的复用性
2.  可以将实现的细节封装起来，然后供其他用户来调用即可

### 成员方法的定义

**访问修饰符 返回数据类型 方法名(形参列表..) {**//方法体
	**语句；**
	**[return 返回值;]**
**}**

1. 形参列表：表示成员方法输入 cal(int n),getSum(int num1,int num2)
2. 返回数据类型：表示成员方法输出, void 表示没有返回值
3. 方法主体：表示为了实现某一功能代码块
4. return 语句不是必须的

### 注意事项和使用细节

```java
package day04;

public class MethodDetail01{

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//1.一个方法最多有一个返回值【思考，如何返回多个结果 返回数组】
			AA a=new AA();
			int res[]=a.getSumAndSub(1, 4);
			System.out.println("和="+res[0]);
			System.out.println("差="+res[1]);
			
			
			//细节：调用带参数的方法时，一定对应着参数列表传入相同类型或兼容类型 的参数
	        byte b1 =1;
	        byte b2=2;
			a.getSumAndSub(b1,b2);//byte->int
		//	a.getSumAndSub(1.1,1.8);// double ->int(x)
			//细节：实参和形参的类型要一致或兼容、个数、顺序必须一致
	    //  a.getgetSumAndSub(100);//个数不一致×
			//细节：方法不能嵌套定义
	}
}
class AA{
	public int[] getSumAndSub(int n1,int n2) {
		int[] resArr =new int[2];
		resArr[0]=n1+n2;
		resArr[1]=n1-n2;
		return resArr;
		
	}
	//2.返回类型可以为任意类型，包含基本数据类型或应用类型（数组，对象）
	// 看getSumAndSub
    
	//3.如果方法要求有返回数据类型，则方法中最后的执行语句必须为 return值
	//而且要求返回值类型必须和return的值类型一致或兼容
	//如果方法是void，则方法体中可以没有return语句，或者 只写return
}
```

+ 访问修饰符( (作用是控制 方法使用的范围)

  + 如果不写默认访问，[有四种: public, protected, 默认, private]

+  返回数据类型

  1. **一个方法最多有一个返回值** [思考，如何返回多个结果 返回数组 ]
  2. 返回类型可以为任意类型，包含基本类型或引用类型(数组，对象)
  3. 如果方法要求有返回数据类型，则方法体中最后的执行语句必须为 return 值; 而且要求返回值类型必须和 return 的值类型一致或兼容
  4. 如果方法是 void，则方法体中可以没有 return 语句，或者只写 return 

+ 方法名

  遵循驼峰命名法，最好见名知义，表达出该功能的意思即可, 比如 得到两个数的和 getSum, 开发中按照规范

+ 形参列表

  1. 一个方法可以有0个参数，也可以有多个参数，中间用逗号隔开，比如getSum(int n1,int n2)
  2. 参数类型可以为任意类型，包含基本数据类型或引用类型，比如printArr(int[] map)
  3. 调用带参数的方法，一定对应着参数列表传入相同类型或兼容类型的参数
  4. 方法定义时的参数称为形式参数，简称形参；方法调用时的传入参数称为实际参数，简称实参，实参和形参的类型要一致或兼容、个数、顺序必须一致

+ 方法体

  里面写完成功能的具体的语句，可以为输入、输出、变量、运算、分支、循环、方法调用，但里面不能再定义方法!即:方法不能嵌套定义

+ 方法调用的细节说明

  1. 同一个类中的方法调用:直接调用即可。比如print(参数)

     案例演示:A类sayOk调用print()

  2. 跨类中的方法A类调用B类方法:需要通过对象名调用。比如对象名.方法名(参数)

     案例演示:B类sayHello调用print()

  3. 特别说明一下:跨类的方法调用和方法的访问修饰符相关

### 类定义的完善

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/08.png)

### 课堂练习题

1. 编写类 AA ，有一个方法：判断一个数是奇数 odd 还是偶数，返回boolean
2. 根据行、列、字符打印 对应行数和列数的字符，比如：行：4，列：4，字符#,则打印相应的效果

```java
package day04;

import java.util.Scanner;

public class MethodExercise01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		AAA a=new AAA();
//		int n;
//		Scanner c=new Scanner(System.in);
//		n =c.nextInt();
//		boolean b=a.isOdd(n);
//		if(b=false) {
//		System.out.println("是偶数");}
//		else {
//         System.out.println("是奇数");
//	}
		//使用print方法
		Scanner c=new Scanner(System.in);
		int x1=c.nextInt();
		int x2=c.nextInt();
		char q=c.next().charAt(0);	
		a.print(x1, x2, q);
	}
}
//编写类AAA，有一个方法：判断一个数是奇数odd还是偶数，返回booolean
class AAA{
	//思路
	//1.方法的返回类型boolean
	//2.方法的名字  isOdd
	//3.方法的形参 （int number)
	//4.方法体,判断
	public boolean isOdd(int num) {
//	if(num%2!=0) {
//		return ture;	
//	}else {
//		return false;
//	}
	//return num%2!=0?true:false;
		return num%2!=0;
	}	
	//根据行、列、字符打印 对应行数和列数的字符，
	//比如：行：4，列：4，字符#，咋打印相应的效果
	/*
	 * ####
	 * ####
	 * ####
	 * ####
	 * 
	 */
	//1.方法的返回类型 void
	//2.方法的名字 printchar
	//3.方法的形参(int row，int column，char c)
	//4.方法体，循环
	public void print(int row,int col,char c) {
		for(int i=0;i<row;i++) {
			for(int j=0;j<col;j++) {//输出每一行
				System.out.print(c);
			}
			System.out.println();//换行
		}
	}
}
```

## 成员方法传参机制(非常重要)

### 基本数据类型的传参机制

1. 看一个案例，分析结果是什么?

```java
	public void swap(int a,int b) {//假如传的是10和20
		System.out.println("\na和b交换前的值a="+a+"\tb="+b);//a=10 b=20
		//完成a和b的交换
		int tmp=a;
		a=b;
		b=tmp;
		System.out.println("\na和b交换后的值a="+a+"\tb="+b);//a=20 b=10
	}
```

```java
package day04;

import java.util.Scanner;

public class MethodParameter01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
    Abc obj=new Abc();
    Scanner input =new Scanner(System.in);
    int n1=input.nextInt();
    int n2=input.nextInt();
    
    obj.swap(n1, n2);
	}

}
class Abc{
	public void swap(int a,int b) {
		System.out.println("\na和b交换前的值a="+a+"\tb="+b);
		//完成a和b的交换
		int tmp=a;
		a=b;
		b=tmp;
		System.out.println("\na和b交换后的值a="+a+"\tb="+b);
	}
}
```

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/31.png)

### 引用数据类型的传参机制

下面的代码输出什么

```java
package day04;

public class MethodParameter02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//测试
		AB b=new AB();
//		int arr[]= {1,2,3};
//		b.test100(arr);//调用方法
//		System.out.println("main的arr数组");
//		//遍历数组
//		for(int i=0;i<arr.length;i++) {
//			System.out.println(arr[i]+"\t");
//		}
//    	System.out.println();
    	//测试
    	Person02 p=new Person02();
    	p.name="jack";
    	p.age=10;
    
    	b.test200(p);
    	//测试题，如果test200执行的是p=null，下面结果为10
    	//测试题，如果test200执行的是p=new Person（）;下面结果为10
    	System.out.println("main的p.age"+p.age);
	}

}
class 	Person02{
	String name;
	int age;
	
}
class AB{
	public void test200(Person02 p) {
		//p.age=10000;//修改对象属性
		//p=null;
		p=new Person02();
		p.name="Tom";
		p.age=99;
	}	
	
	//B类中编写一个方法test100
	//可以接受一个数组，在方法中修改该数组，看看原来的数组是否发生变化
	
	public void test100(int arr[]) {
		arr[0]=200;//修改元素
		//遍历数组
		System.out.println("test100d的arr数组");
		for(int i=0;i<arr.length;i++) {
			System.out.println(arr[i]+"\t");
		}
		System.out.println();
	}
}
```

+ 结论及示意图

引用类型传递的是地址（传递也是值，但是值是地址），可以通过形参影响实参！

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/32.png)

### 成员方法返回类型是引用类型应用实例

1. 编写类 MyTools 类，编写一个方法可以打印二维数组的数据。
2. 编写一个方法 copyPerson，可以复制一个 Person 对象，返回复制的对象。克隆对象， 注意要求得到新对象和原来的对象是两个独立的对象，只是他们的属性相同

```java
package day04;

public class MethodExercise02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//编写一个方法copyPerson，可以复制一个Person对象，返回复制的对象。克隆对象，
   		//注意要求得到新对象和原来的对象是两个独立的对象，，只是他们的属性相同
		Person03 p=new Person03();
	  	p.name="milan";
	  	p.age=100;
	 	MyTools02 tools= new MyTools02();
		Person03 p2=tools.copyPerson(p);
		//到此p和p2是Person对象，但是是两个独立的对象，属性相同
		System.out.println("p的属性age"+p.age+",p的名字"+p.name);
		System.out.println("p2的属性age"+p2.age+",p的名字"+p2.name);
		//这里提示：可以通过输出对象的hashCode看看对象是否是一个
		System.out.println(p==p2);
	}

}
class Person03{
	String name;
	int age;
}
class MyTools02{
	//编写一个方法copyPerson，可以复制一个Person对象，返回复制的对象。克隆对象，
    //注意要求得到新对象和原来的对象是两个独立的对象，，只是他们的属性相同
	//1.方法的返回类型boolean
		//2.方法的名字  isOdd
		//3.方法的形参 （int number)
		//4.方法体,判断
	public Person03 copyPerson(Person03 p) {
		//创建一个新的对象
		Person03 p2=new Person03();
		p2.name=p.name; //把原来的名字赋给p2.name
		p2.age=p.age;//把原来对象的年龄赋给p2.age
		return p2;
	}
}
```

## 方法递归调用(非常非常重要)

### 基本介绍

简单地说:**递归就是方法自己调用自己**,每次调用时传入不同的变量.递归有助于编程者解决复杂问题,同时可以让代码变得简洁

### 递归能解决什么问题

1. 各种数学问题如:8皇后问题，汉诺塔，阶乘问题，迷宫问题，球和篮子的问题
2. 各种算法也会使用到递归，比如快排，归并排序，二分查找，分治算法等
3. 将用栈解决的问题-->递归代码比较简洁

### 递归举例

列举两个小案例,来帮助大家理解递归调用机制

1. 打印问题
2. 阶乘问题

```java
package day05;

public class Recursion01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
    T  t1=new T();
    t1.test(4);//输出n=2 n=n3 n=4
 int res=   t1.factorial(5);
 System.out.println("5的阶乘的结果="+res);
	}

}
class T{
	//分析
	public void test(int n) {
		if(n>2) {
			test(n-1);
		}
		System.out.println("n="+n);
		}
	//factorial阶乘
	public int factorial(int n) {
		if(n==1) {
			return 1;
		}else {
			return factorial(n-1)*n;
		}
	}
}

```

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/09.png)

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/10.png)

### 递归重要原则

1. **执行一个方法时，就创建一个新的受保护的独立空间（栈空间）**
2. **方法的局部变量是独立的，不会相互影响，比如n变量**
3. **如果方法中使用的是引用数据变量（比如数组，对象），就会共享该引用类型的数据**
4. **递归必须向退出递归的条件逼近，否则就是无限递归，出现StrackOverflowError,死归了**
5. **当一个方法执行完毕时，同时当方法执行完毕或者返回时，该方法也执行完毕**

### 课堂练习

1. 请使用递归的方式求出斐波那契数1,1,2,3,5,8,13...给你一个整数n，求出它的值是多少
2. 猴子吃桃子问题:有一堆桃子，猴子第一天吃了其中的一半，并再多吃了一个!以后每天猴子都吃其中的一半，然后再多吃一个。当到第10天时，想再吃时(即还没吃)发现只有1个桃子了。问题:最初共多少个桃子?

```java
package day05;

import java.util.Scanner;

public class RecursionExercise01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("请输入一个整数");
    	TT t1=new TT();
    	Scanner input=new Scanner(System.in);
   		// long n=input.nextInt();
   		// System.out.println("当n="+n+"时对应的斐波那契数是"+t1.fibonacci(n));
    	int day;
    	day=input.nextInt();
    	System.out.println("第"+day+"天有"+t1.peach(day)+"个桃子");
	}

}
class TT{
	/*
	 请使用递归的方式求出斐波那契数1,1,2,3,5,8,13...给你一个整数n 
	 思路分析
	 1.当n=1时，斐波那契数是1
	 2.当n=2时，斐波那契数是1
	 3.当n>=3 斐波那契数 是前两个数的和
	 4.这里就是一个递归的思路
	 */
	public int fibonacci(long n) {
		if(n>=1){
		if(n==1||n==2) {
			return 1;
		}else {	
			return fibonacci(n-1)+fibonacci(n-2);
		}
	    }else{
			System.out.println("要求输入的n>=1的整数");
		}
		return -1;
		
	}

    /*
       猴子吃桃子问题：有一堆桃子，猴子第一天吃了其中的一半，并再多吃了一个！
       以后每天猴子都吃其中的一半，然后再多吃一个。当到第10天时，
       想再吃时（即还没吃），发现只有一个桃子了。问题：最初共有多少个桃子
     
        思路分析 逆推
        1.day=10 时有1个桃子
        2.day=9  时有（day10+1）*2=4
        3.day=8  时有（day9+1）*2=10
        4.规律就是  前一天的桃子 =（后一天的桃子 +1）*2
        5.递归
        */
    public int peach(int day) {
    	if(day==10) { //第10天，只有一个桃
    		return 1;
    	}else if(day>=1&&day<=9){
        	return(peach(day+1)+1)*2;	
    	}else {
        	System.out.println("day在1-10，请重新输入");
        	return -1;
     	}
    }
}
```

### 递归调用应用实例-迷宫问题

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/11.png)

```java
public class MiGong {
	//编写一个 main 方法
	public static void main(String[] args) {
        
	//思路
	//1. 先创建迷宫，用二维数组表示 int[][] map = new int[8][7];
	//2. 先规定 map 数组的元素值: 0 表示可以走 1 表示障碍物
	int[][] map = new int[8][7];
        
	//3. 将最上面的一行和最下面的一行，全部设置为 1
	for(int i = 0; i < 7; i++) {
		map[0][i] = 1;
		map[7][i] = 1;
	}
        
	//4.将最右面的一列和最左面的一列，全部设置为 1
	for(int i = 0; i < 8;i++){
		map[i][0] = 1;
		map[i][6] = 1;
    }
        
	map[3][1] = 1;
	map[3][2] = 1;
	map[2][2] = 1; //测试回溯
	// map[2][1] = 1;
	// map[2][2] = 1;
	// map[1][2] = 1
        
    //输出当前的地图
	System.out.println("=====当前地图情况======");
	for(int i = 0; i < map.length; i++) {
		for(int j = 0; j < map[i].length; j++) {
			System.out.print(map[i][j] + " ");//输出一行
		}
		System.out.println();
	}
	//使用 findWay 给老鼠找路
	T t1 = new T();
	//下右上左
	t1.findWay(map, 1, 1);
	System.out.println("\n====找路的情况如下=====");
    for(int i = 0; i < map.length; i++) {
		for(int j = 0; j < map[i].length; j++) {
			System.out.print(map[i][j] + " ");//输出一行
		}
			System.out.println();
		}
	}
}
class T {
	//使用递归回溯的思想来解决老鼠出迷宫
    
	//解读
	//1. findWay 方法就是专门来找出迷宫的路径
	//2. 如果找到，就返回 true ,否则返回 false
	//3. map 就是二维数组，即表示迷宫
	//4. i,j 就是老鼠的位置，初始化的位置为(1,1)
	//5. 因为我们是递归的找路，所以我先规定 map 数组的各个值的含义
	// 0 表示可以走 1 表示障碍物 2 表示可以走 3 表示走过，但是走不通是死路
	//6. 当 map[6][5] =2 就说明找到通路,就可以结束，否则就继续找. 
    //7. 先确定老鼠找路策略
    public boolean findWay(int[][] map , int i, int j) {
		if(map[6][5] == 2) {//说明已经找到
			return true;
		} else {
			if(map[i][j] == 0) {//当前这个位置 0,说明表示可以走
				//我们假定可以走通
				map[i][j] = 2;
				//使用找路策略，来确定该位置是否真的可以走通
				//下->右->上->左
				if(findWay(map, i + 1, j)) {//先走下
                    return true;
				} else if(findWay(map, i, j + 1)){//右
					return true;
				} else if(findWay(map, i-1, j)) {//上
					return true;
				} else if(findWay(map, i, j-1)){//左
					return true;
				} else {
					map[i][j] = 3;
					return false;
				}
			} else { //map[i][j] = 1 , 2, 3
				return false;
			}
		}
    }
    
	//修改找路策略，看看路径是否有变化
	//下->右->上->左 ==> 上->右->下
	public boolean findWay2(int[][] map , int i, int j) {
		if(map[6][5] == 2) {//说明已经找到
			return true;
		} else {
			if(map[i][j] == 0) {//当前这个位置 0,说明表示可以走
				//我们假定可以走通
				map[i][j] = 2;
				//使用找路策略，来确定该位置是否真的可以走通
				//上->右->下->左
				if(findWay2(map, i - 1, j)) {//先走上
					return true;
				} else if(findWay2(map, i, j + 1)){//右
					return true;
				} else if(findWay2(map, i+1, j)) {//下
					return true;
				} else if(findWay2(map, i, j-1)){//左
					return true;
				} else {
					map[i][j] = 3;
					return false;
				}
			} else { //map[i][j] = 1 
				return false;
			}
		}
	}
}
```

### 递归调用应用实例-汉诺塔

+  汉诺塔传说

汉诺塔：汉诺塔（又称河内塔）问题是源于印度一个古老传说的益智玩具。大梵天创造世界的时候做了三根金刚石柱子，在一根柱子上从下往上按照大小顺序摞着 64 片圆盘。大梵天命令婆罗门把圆盘从下面开始按大小顺序重新摆放在另一根柱子上。并且规定，在小圆盘上不能放大圆盘，在三根柱子之间一次只能移动一个圆盘。

假如每秒钟移动一次，共需多长时间呢？移完这些金片需要 5845.54 亿年以上，太阳系的预期寿命据说也就是数百亿年。真的过了 5845.54 亿年，地球上的一切生命，连同梵塔、庙宇等，都早已经灰飞烟灭

+ 汉诺塔代码实现

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/12.png)

```java
package day05;

import java.util.Scanner;

public class HanoiTower {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Tower tower=new Tower();
		System.out.println("请输入汉诺塔上面要移动的盘子数");
		Scanner n1=new Scanner(System.in);
         int n=n1.nextInt();
		tower.move(n,'A','B','C');

	}

}
class Tower{
	//方法
	//num表示要移动的个数，a，b，c分别表示A塔，B塔，C塔
	public void move(int num,char a,char b,char c) {
		//如果只有一个盘num=1
		if(num==1) {
			System.out.println(a+"->"+c);
		}else {
			//如果有多个盘，可以看成两个，最下面的和上面的所有盘（num-1）
			//（1）先移动a上面的n-1个盘到b，借助c
			move(num-1,a,c,b);
			//(2)把a最下面的这个盘，移动到c
			System.out.println(a+"->"+c);
			//(3)再把b上的n-1个盘，移动到c，借助a
			move(num-1,b,a,c);
			
		}
		
	}
}

```

## 方法重载(OverLoad)

### 基本介绍

Java中允许同一个类中，多个同名方法的存在，但要求 形参列表不一致!

比如:System.out.println();  out 是 PrintStream 类

### 重载的好处

1.  减轻了起名的麻烦
2.  减轻了记名的麻烦

### 快速入门案例

案例：类：MyCalculator 方法：calculate

1.  calculate(int n1, int n2) //两个整数的和
2.  calculate(int n1, double n2) //一个整数，一个 double 的和
3.  calculate(double n2, int n1)//一个 double ,一个 Int 和
4.  calculate(int n1, int n2,int n3)//三个 int 的和

```java
package day04;

public class OverLoad {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
     MyCalculator mc=new MyCalculator();
     System.out.println(mc.calculate(1, 2));
     System.out.println(mc.calculate(1.1, 2));
	}

}
class MyCalculator{
	//下面的四个calculate方法构成了重载
	//两个整数的和
	public int calculate(int n1,int n2){
		return n1+n2;
		
	}
	//一个整数，一个double的和
	public double calculate(int n1,double n2){
		return n1+n2;
		
	}//一个double，一个int的和
	public double calculate(double n2,int n1){
		System.out.println("calculate(double n1，int n2)被调用");
		return n1+n2;
	}//三个int的和
	public int calculate(int n1,int n2,int n3){
		return n1+n2+n3;
		
	}
}
```

### 注意事项和使用细节

1. 方法名：**必须相同**
2. 形参列表：**必须不同**（形参类型或个数或顺序，至少有一样不同，参数名无要求）
3. 返回类型：无要求

### 课堂练习题

1. 编写程序，类Methods中定义三个重载方法并调用。方法名为m。三个方法分别接收一个int参数、两个int参数、一个字符串参数。分别执行平方运算并输出结果，相乘并输出结果，输出字符串信息。在主类的main ()方法中分别用参数区别调用三个方法。
2. 在Methods类，定义三个重载方法max()，第一个方法，返回两个int值中的最大值,第二个方法，返回两个double值中的最大值，第三个方法，返回三个double值中的最大值，并分别调用三个方法。

```java
package day04;

public class OverLoadExercise {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Methods method=new Methods();
         method.m(10);//100
         method.m(10,20);//200
         method.m("ok");//ok
       System.out.println( method.max(1.0, 2.0, 3.0));
	}
}
/* 
 编写程序，类Methods中定义三个重载方法并调用。方法名为m。三个方法分别接受一个int型
 、两个int型，相乘并输出结果，输出字符串信息，在主类的main（）方法中
 分别用参数区别调用三个方法
 */
/*
 定义三个重载方法max(),第一个方法，返回两个int值中的最大值，
 第二个方法，返回两个double值中的最大值，第三个方法
 返回三个double值中的最大值，并分别调用三个方法
 */
class Methods{
	//分析
	//1方法名max
	//2形参(int,int)
	//3.int
	public int max(int n1,int n2) {
		return n1>n2?n1:n2;
	}
	public double max(double n1,double n2) {
		return n1>n2?n1:n2;
	}
	public double max(double n1,double n2,double n3) {
		return (n1>n2?n1:n2)>n3?(n1>n2?n1:n2):n3;
	} 
	//不使用自动转换比 使用自动转换 优先级高
	
	
	
	//分析 
	//1方法名m
	//2形参int
	//3void
	public void m(int n) {
		System.out.println("平方="+(n*n));  
	}
	//1方法名m
		//2形参(int,int)
		//3void
	public void m(int n1,int n2) {
		System.out.println("相乘="+(n1*n2));
	}
	//1方法名m
			//2形参(String)
			//3void
	public void m(String str) {
		System.out.println("传入的str="+str);
	}
}

```

## 可变参数

### 基本概念

java 允许将同一个类中多个同名同功能但参数个数不同的方法，封装成一个方法。

就可以通过可变参数实现

### 基本语法

**访问修饰符 返回类型 方法名(数据类型... 形参名){**

**}**

### 快速入门案例

看一个案例 类 HspMethod，方法 sum【可以计算 2 个数的和，3 个数的和 ， 4.，5， 。。】

```java
package day06;

public class VarParameter01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
            HspMethod m=new HspMethod();
           System.out.println(m.sum(1,5,100));//106
           System.out.println(m.sum(1,19));//20
	}

}
class HspMethod{
	//可以计算 2个数的和，3个数的和，4,5，..
	//可以使用方法重载
//	public int sum(int n1,int n2) {//2个数的和
//		return n1+n2;
//	}
//	public int sum(int n1,int n2,int n3) {//3个数的和
//		return n1+n2+n3;
//	}
//	public int sum(int n1,int n2,int n3,int n4) {//4个数的和
//		return n1+n2+n3+n4;
	//.....
	//上面的三个方法名称相同，功能相同，参数个数不同-> 使用可变参数优化
	//1.int..表示接受的是可变参数，类型是int，既可以接受多个int（0-多）
	//2.使用可变参数时
	//3.遍历nums 求和即可
	//}
	public int sum(int...nums) {
	//	System.out.println("接受的参数个数="+nums.length);
		int res=0;
		for(int i=0;i<nums.length;i++) {
			res+=nums[i];
		}
		return res;
	}
}

```

### 注意事项和使用细节

1. **可变参数的实参可以为0个或任意多个**
2. 可变参数的**实参可以为数组**
3. 可变参数**本质就是数组**
4. 可变参数可以和普通类型的参数一起放在形参列表，但必须保证可变参数在**最后**
5. 一个形参列表只能出现**一个可变参数**

```java
package day06;

public class VarParameterDetail {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//细节：可变参数的实参可以为数组
		int arr[]= {1,2,3};
		T t1=new T();
		t1.f1(arr);

	}

}
class T{
	public void  f1(int...nums) {
		System.out.println("长度="+nums.length);
		
	}
	//细节：可变参数可以和普通类型的参数一起放在形参列表，但必须保证可变参数在最后
	public void f2(String d1,double...nums) {
		
	}
}

```

### 课堂练习

有三个方法，分别实现返回姓名和两门课成绩(总分)，返回姓名和三门课成绩(总分)，返回姓名和五门课成绩（总分）。封装成一个可变参数的方法

```java
package day06;

public class VarParameterExercise {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
        
		HspMethod01 hm=new HspMethod01();
		System.out.println(hm.showScore("milan", 90,80.0));
		System.out.println(hm.showScore("terry", 2.0,5,6,85,65));
	}

}
class HspMethod01{
	/*有三个方法，分别实现返回姓名和两门课程（总分）
	 * 返回姓名和三门课成绩（总分），返回姓名和五门课成绩（总分），
	 * 封装成一个可变参数的方法
	 */
	//分析1.方法名 showScore 2.形参(String,double...)3.返回String
	public String showScore(String name,double...scores) {
		double totalScore=0;
		for(int i=0;i<scores.length;i++) {
			totalScore +=scores[i];
		}
		return name+"有"+scores.length+"门科的成绩总分为"+totalScore;
	}
	
}

```

## 作用域

### 基本使用

1. 在java编程中,主要的变量就是属性(成员变量)和局部变量。
2. 我们说的局部变量一般是指在成员方法中定义的变量。【举例Cat类:cry】

3. java中作用域的分类
   1. 全局变量:也就是**属性**，作用域为整个类体Cat类：cry eat等方法使用属性
   2. 局部变量:也就是**除了属性之外的其他变量**，作用域为定义它的代码块中
4. **全局变量(属性)可以不赋值，直接使用，因为有默认值，局部变量必须赋值后，才能使用，因为没有默认值**。

```java
package day06;

public class VarScope01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
//1在java编程中，主要的变量就是属性
//2除了属性之外的其他变量，作用域为定义它的代码块中
//3全部变量（属性）可以不赋值，直接使用，因为有默认值，
//局部变量必须在赋值后，才能使用，因为没有默认值
//
class Cat{
	//全局变量：也就是属性，作用域为整个类体Cat类：cry eat 等方法的属性
	//属性在定义时，可以直接赋值
	
	int age =10;//指定的值是10
	double weight;//不赋值默认值是0.0
	{
		int num=100;//不是属性，在代码块里定义
	}
	public void hi() {
		//局部变量必须赋值才能使用，因为没有默认值
		//int num;×
		int num=1;
		String address ="北京的猫";
		System.out.println("address"+address);
		System.out.println("num="+num);
		System.out.println("weight"+weight);
	}
	public void cry() {
		
		//1.局部变量一般是指在成员方法中定义的变量
		//2.n和name都是局部变量
		//3.n和name的作用域在cry方法中
		int n=10;
		String name ="jack";
		
	}
	public void eat() {
		System.out.println("在eat方法中使用age="+age);
		//System.out.println("在eat方法中使用cry的变量"+name);不允许使用
	}
}
```

### 注意事项和细节使用

1. 属性和局部变量可以重名，**访问时遵循就近原则**。
2. 在同一个作用域中，比如在同一个成员方法中，两个局部变量，不能重名。
3. **属性生命周期较长**，伴随着对象的创建而创建，伴随着对象的销毁而销毁。**局部变量,生命周期较短**，伴随着它的代码块的执行而创建，伴随着代码块的结束而销毁.即在一次方法调用过程中。
4. 作用域范围不同
   1. 全局变量/属性:可以被本类使用，或其他类使用(通过对象调用)
   2. 局部变量:只能在本类中对应的方法中使用
5. 修饰符不同
   1. **全局变量/属性可以加修饰符**
   2. **局部不可以加修饰符**

```java
package day06;
public class VarScopeDetail {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Person p1=new Person();
		/*
		3.细节 属性生命周期较长，伴随着对象的创建而创建，伴随着对象的销毁而销毁
		 局部变量，生命周期较短，伴随着它的代码块的执行而创建
		 伴随着代码块的结束而销毁。即在一次方法调用过程中
		 */
		p1.say();//当执行say方法时，say方法的局部变量比如name，会创建，
		//当say执行完毕后，	
		//name局部变量被销毁，但是属性（全局变量）仍然可以使用
             T1 t1=new T1();
             t1.test();//第一种 跨类访问对象属性的方式
             t1.test2(p1);//第二种 跨类访问对象属性的方式
	}
}
class T1 {
	//4细节 全局变量（属性）：可以被本类使用，或其他类使用（通过对象调用）
	public void test() {
		Person p1=new Person();
		System.out.println(p1.name);//jack
	}
	public void test2(Person P) {
		System.out.println(P.name);//jack
	}
}
class Person{
	//5细节 属性可以在前面加修饰符(public,protected,private..)，局部不能加
	public int age=20;
	String name ="jack";
	public void say() {
		//1细节 属性和局部变量可以重名，访问时遵循就近原则
		//public String name="King"; × 不允许加修饰符
		String name="King";
		System.out.println("say()name="+name);//输出King
	}
	public void hi() {
		String address="北京";
		//String address="上海";×2细节 在一个方法中局部变量不能重名
		String name="frx";//ok的，在不同的作用域里面
	}
}
```

## 构造方法/构造器

### 看一个需求

我们来看一个需求:前面我们在创建人类的对象时，是先把一个对象创建好后，再给他的年龄和姓名属性赋值，如果现在我要求，在创建人类的对象时，就直接指定这个对象的年龄和姓名，该怎么做?这时就可以使用构造器。

### 基本语法

**[修饰符] 方法名(形参列表){**
	**方法体;**
**}**

+ 说明

1. 构造器的修饰符可以默认， 也可以是 public protected private
2. 没有返回值
3. 在创建对象时，系统会自动的调用该类的构造器完成对象的初始化

### 快速入门

现在我们就用构造方法来完成刚才提出的问题:在创建人类的对象时，就直接指定这个对象的年龄和姓名

```java
package day07;

public class Constructor01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//当我们new一个对象时，直接通过构造器指定名字的年龄
     	Person  p1= new Person("smith",80);
     	System.out.println("p1的信息如下");
     	System.out.println("p1对象name="+p1.name);//smith
     	System.out.println("p1对象age="+p1.age);//80
	}

}

//在创建人类的对象时，就直接指定这个对象的年龄和姓名
//
class Person{
	String name;
	int age;
	//构造器
	//1.构造器没有返回值，也不能写void
	//2.构造器的名称和类Person一样
	//3.（String pName，int pAge）
	public Person(String pName,int pAge) {
		System.out.println("构造器被调用-完成对象的属性初始化");
		name =pName;
		age =pAge;
		
	}
}
```

### 注意事项和使用细节

1. **一个类可以定义多个不同的构造器，即构造器重载**

   比如:我们可以再给Person类定义一个构造器,用来创建对象的时候,只指定人名,不需要指定年龄

2. 构造器要和类名相同

3. 构造器没有返回值

4. 构造器是完成对象的初始化，并不是创建对象

5. 在创建对象时，系统自动的调用该类的构造方法

6. 如果程序员没有定义构造器，系统会自动给类生成一个默认无参构造器(也叫默认构造器)

7. **一旦定义了自己的构造器，默认的构造器就覆盖了，就不能再使用默认的无参构造器，除非显示的定义一下**。即Dog(){}

```java
package day07;

public class ConstructorDetail {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
      Person1 p1= new Person1("king",40);//第一个构造器
      Person1 p2=new Person1("tom");//第二个构造器
      Dog dog1=new Dog();
	}

}
class Dog{
	//如果程序员没有定义构造器，系统会自动给类生成一个默认无参构造器（也叫默认构造器）
	//使用javap指令 反编译看看
	/*
	 默认构造器
	 Dog(){
	 
	 }
	 */
	public Dog(String dName) {
		
		
	}
	Dog(){//显示的定义一下 默认无参构造器
		
	}
}
class Person1{
	String name;
	int age;//默认0
	//第一个构造器
	public Person1(String pName,int pAge) {	
		name=pName;
		age=pAge;	
	}
	//第2个构造器，只指定人名，不指定年龄
	public Person1(String pName) {
		name=pName;
	}
	
}
```

### 课堂练习

在前面定义的 Person 类中添加两个构造器：

第一个无参构造器：利用构造器设置所有人的 age 属性初始值都为 18

第二个带 pName 和 pAge 两个参数的构造器：使得每次创建 Person 对象的同时初始化对象的 age 属性值和 name属性值

分别使用不同的构造器，创建对象.

```java
package day07;

public class ConstructorExercise {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
   		Person2 p1=new Person2();//无参构造器
   		System.out.println("p1的信息name="+p1.name+"，age="+p1.age);
   		Person2 p2=new Person2("scott",50);
   		System.out.println("p2的信息name="+p2.name+"，age="+p2.age);
	} 

}
/*
 第一个构造器：利用构造器设置所有人的age属性初始值为18
 第二个带pName和pAge两个参数的构造器：
 使得每次创建Person对象的同时初始化对象的age属性值和name属性值
 分别使用不同的构造器，创建对象
 */
class Person2{
	String name;//默认值 null
	int age;//默认值 0
	public Person2() {
		age=18;
	}
	public Person2(String pName,int pAge) {
		name=pName;
		age=pAge;
	}
	
} 
```

## 对象创建的流程分析

### 看一个案例

```java
class Person{
	int age=90;
	String name;
	Person(String n,int a){ //构造器
		name=n;
		age=a;//..	
		
	}
}
Person p=new Person("小倩",20);
//流程分析：
/*
 1.加载Person类信息（Person.class），只会加载一次
 2.在堆中分配空间（地址）
 3.完成对象初始化
 (1)默认初始化age =0 name =null
 (2)显示初始化 age=90 name =null
 (3)构造器初始化 age=0 name=小倩
 4.在对象在堆中的地址，返回给p（p是对象名，也可以理解成对象的引用）
 */

```

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/14.png)

## this关键字

### 先看一段代码，并分析问题

```java
package day07;

public class This01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
       Dog01 dog1=  new Dog01("大壮",3);
       System.out.println("dog1的hashcode="+dog1.hashCode());
       dog1.info();
       System.out.println("============");
       Dog01 dog2=new Dog01("大黄",2);
       System.out.println("dog2的hashcode="+dog2.hashCode());
       dog2.info();
	}

}
class Dog01  {
	String name;
	int age;
//	public Dog01(String dName,int dAge) {
//		name=dName;
//		age=dAge;	
//	}
	//如果我们构造器的形参，能够直接写成属性名，就更好了
	//但是出现一个问题，根据变量的作用域规则
	//构造器里的name（age），就是局部变量，不是属性
	//==>this关键字
	public Dog01(String name,int age) {
//		this.name就是当前对象的属性
		this.name=name;
		this.age=age;
		System.out.println("this的hashcode是"+this.hashCode());
	}
	public void info() {//成员方法，输出属性信息
		System.out.println("this的hashcode="+this.hashCode());
		System.out.println(name+"\t"+age+"\t");
	}
}
```

### 深入理解this

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/13.png)

```java
	public void info() {//成员方法，输出属性信息
		System.out.println("this的hashcode="+this.hashCode());
		System.out.println(name+"\t"+age+"\t");
	}
```

this小结:简单地说，哪个对象调用，this就代表哪个对象

###  this 的注意事项和使用细节

1.  this 关键字可以用来**访问本类的属性、方法、构造器**
2.  this 用于**区分当前类的属性和局部变量**
3.  访问成员方法的语法：**this.方法名(参数列表); **
4. 访问构造器语法：**this(参数列表); **注意只能在构造器中使用(即只能在构造器中访问另外一个构造器, 必须**放在第一条语句**)
5.  **this 不能在类定义的外部使用，只能在类定义的方法中使用**

```java
package day07;

public class ThisDetail {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		T t1=new T();
//		t1.f2();
       T t2=new T();
       t2.f3();
	}

}
class T{
	
	String name ="jack";
	int num=100;
	/*
	 细节：访问构造器语法：this（参数列表）；
	 注意只能在构造器中使用（即只能在构造器中访问另外一个构造器）
	 this不能在类定义的外部使用，只能在类定义的方法中使用
	 */
	public T() {
		this("jack",100);//如果有访问构造器的语法this（参数列表）
		//必须放在第一条语句
		System.out.println("T()构造器");
		//这里去访问T（String name,int age)
		
		
	}
	public T(String name,int age) {
		System.out.println("T（Sting name,int age)构造器");
			
	}
	//this关键字可以用来访问本类的属性
	public void f3() {
		String name="smith";
		//传统方式
		System.out.println("name="+name+" age="+num); 
		//也可以使用this访问属性
		System.out.println("name="+this.name+" age="+this.num);
	}
	
	//细节：访问成员方法的语法：this.方法名（形参列表）；
	public void f1() {
		//
		System.out.println("f1()方法..");
	}
    public void f2() {
	System.out.println("f2()方法..");
	//调用本类的f1
	//第一种方式
	f1();
	//第二种方式
	this.f1();	
	}
    //
}
```

###  this 的课堂案例

定义 Person 类，里面有 name、age 属性，并提供 compareTo 比较方法，用于判断是否和另一个人相等，提供测试类 TestPerson用于测试, 名字和年龄完全一样，就返回 true, 否则返回 false

```java
package day07;

public class TestPerson {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
              Person02 p1=new Person02("mary",20);
              Person02 p2=new Person02("switch",30);
              System.out.println("p1和p2比较的结果是"+p1.compareTo(p2));
	}

}
/*
 定义Person类，里面有name、age属性，并提供compareTo比较方法
 用于判断是否和另一个人相等，提供测试类TestPerson用于测试，
 名字和年龄完全一样，就返回ture，否则返回false
 */
  class Person02{
	  String name;
	  int age;
	  //构造器
	  public Person02(String name,int age) {
		  this.name=name;
		  this.age=age;
	  }
	  //compareTo比较方法
	  public boolean compareTo(Person02 p) {
//		  if(this.name.equals(p.name)&&this.age==p.age) {
//			  retunrn true;
//		  }else {
//			  return false;
//		  }
		  return this.name.equals(p.nme)&&this.age==p.age;
	  }
  }

```

## 包

### 看一个应用场景

现在有两个程序员共同开发一个java项目,程序员xiaoming希望定义一个类取名 Dog ,程序员xiaoqiang也想定义一个类也叫 Dog。两个程序员为此还吵了起来怎么办?     -》包

### 包的三大作用

1. 区分相同名字的类
2. 当类很多时，可以很好的管理类
3. 控制访问范围

### 包基本语法

**package com.frx01**

说明:

1. package 关键字,表示打包
2. com.frx01:表示包名

### 包的本质分析

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/17.png)

### 快速入门

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/18.png)

### 包的命名

+ 命名规则

只能包含数字、字母、下划线、小圆点..,但不能用数字开头，不能是关键字或保留字

> demo.class.exec1 //错误class是关键字
>
> demo.12a //错误 12a是数字开头
>
> demo.ab12.oa //对

+ 命名规范

一般是小写字母+小圆点一般是

com.公司名.项目名.业务模块名

> 比如:com.frx01.oa.model; com.frx01.oa.coltroller;
>
> 举例:
>
> com.sina.crm.user //用户模块
>
> com.sina.crm.order //订单模块
>
> com.sina.crm.utils //工具类

### 常用的包

一个包下，包含很多的类，Java中常用的有:

1. java.lang.*  //lang包是基本包，默认引入，不需要再引入
2. java.util.*   //util包，系统提供的工具包，工具类，使用Scanner
3. java.net.*  //网络包，网络开发
4. java.awt.* //是做java的界面开发，GUI

### 如何引入包

语法:**import 包;**

我们引入一个包的主要目的是要使用该包下的类

比如 import.java.util.Scanner;就只是引入一个类Scanner。

import java.util.*;//表示将java.util包所有都引入

```java
package com.study1.pkg;

import java.util.Arrays;

//注意：我们需要使用哪个类 就导入哪个类即可
//import java.util.Scanner;//表示只会引入java.util的Scanner
//import java.util.*;//表示将java.util 包下的所有类都引入（导入）
public class Import01 {
    public static void main(String[] args) {
    //使用系统提供 Arrays 完成 数组排序
        int arr[]={-1,20,2,13,3};
        //比如对其进行排序
        //传统方法是，自己编写排序（冒泡）
        //系统是提供相关的类 可以方便完成 Arrays
        Arrays.sort(arr);
        //输出排序结果
       for(int i=0;i<arr.length;i++){
           System.out.print(arr[i]+"\t");
       }
   }
}
```

### 注意事项和细节

1. package的作用是声明当前类所在的包，需要放在类的最上面，一个类中最多只有一句package
2. import指令位置放在package的下面，在类的定义前面，可以有多句且没有顺序要求

```java
//package的作用是声明当前类所在的包，需要放在类的（或者文件）的最上面，
//一个类中最多有只有一句 package
package com.study1.pkg;
import java.util.Scanner;

//import 指令 位置放在package的下面，在类定义前面，可以有多局且没有顺序
public class PkgDetail {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
    }
}

```

## 访问修饰符

### 基本介绍

java提供四种访问控制修饰符号，用于**控制方法和属性(成员变量)的访问权限**(范围):

1. 公开级别:**用public修饰，对外公开**
2. 受保护级别:**用protected修饰，对子类和同一个包中的类公开**
3. 默认级别:没有修饰符号，**向同一个包的类公开**
4. 私有级别:用private修饰，**只有类可以本身可以访问，不对外公开**

### 4种访问修饰符的访问范围

| 访问级别 | 访问控制修饰符 | 同类 | 同包 | 子类 | 不同包 |
| -------- | -------------- | ---- | ---- | ---- | ------ |
| 公开     | public         | √    | √    | √    | √      |
| 受保护   | protected      | √    | √    | √    | ×      |
| 默认     | 没有修饰符     | √    | √    | ×    | ×      |
| 私有     | private        | √    | ×    | ×    | ×      |

### 使用的注意事项

1. 修饰符可以用来修饰类中的属性，成员方法以及类
2. 只有默认的和public才能修饰类！并且遵循上述访问权限的特点
3. 成员方法的访问规则和属性完全一样

```java
package com.study1.modifier;

public class A {
    //四个属性,分别用不同的修饰符
    public int n1=100;
    protected int n2=200;
    int n3=300;
    private int n4=400;
    public void m1(){
        //在同一个类中，可以访问public protected 默认 private修饰访问的属性或方法
        System.out.println("n1="+n1+" n2="+n2+" n3="+n3+" n4="+n4);
    }
    protected void m2() {
    }
        void m3(){

        }

    private void m4(){

    }
    public void hi(){
       // 在同一类中，可以访问 private protected 默认 public
        m1();
        m2();
        m3();
        m4();


    }
}
```

```java
package com.study1.modifier;

public class B {
    public void say(){
        A a = new A();
        //在同一个包下，可以访问 public protected 和默认修饰的属性或方法，不能访问private
        System.out.println("n1="+a.n1+" n2="+a.n2+" n3="+a.n3);
        a.m1();
        a.m2();
        a.m3();
        //

    }
}

```

```java
package com.study1.modifier;

public class Test {
    public static void main(String[] args) {
        A a = new A();
        a.m1();
        B b = new B();
        b.say();


    }
}
//只有默认和public可以修饰类
```

## 面向对象编程-封装

### 基本介绍

封装(encapsulation)就是把抽象出的数据[**属性**]和对数据的操作[**方法**]封装在一起,数据被保护在内部,程序的其它部分只有通过被授权的操作[**方法**],才能对数据进行操作。

### 封装的理解和好处

1. 隐藏实现细节:方法(连接数据库) <--调用(传入参数...)
2. 可以对数据进行验证，保证安全合理

### 封装的实现步骤

1. 将属性进行私有化private【不能直接修改属性】

2. 提供一个公共的**(public)set**方法，用于**属性判断并赋值**

   public void setXxx(类型 参数名){  //Xxx表示某个属性

   ​		//加入数据验证的业务逻辑

   ​		属性=参数名;

   }

3. 提供一个公共的**(public)get**方法，用于**获取属性的值**

   public 数据类型 getXxx(){     //权限判断，Xxx某个属性

   ​		return xx;

   }

## 快速入门案例

+ 看一个案例

那么在 java 中如何实现这种类似的控制呢?

请大家看一个小程序(comstudy2encap_: Encapsulation01.java),

不能随便查看人的年龄,工资等隐私，并对设置的年龄进行合理的验证。年龄合理就设置，否则给默认年龄, 必须在 1-120, 年龄， 工资不能直接查看 ，name 的长度在 2-6 字符 之间

```java
package com.study2encap_;

public class Encapsulation01 {
    public static void main(String[] args) {
        Person person = new Person();
        person.setName("冯荣旭和冯荣旭");
        person.setAge(30);
        person.setSalary(30000);
        System.out.println(person.info());
        System.out.println(person.getSalary());
        //如果我们直接使用构造器 指定属性
        Person smith = new Person("smith", 2000, 50000);
        System.out.println("======smith的信息======");
        System.out.println(smith.info() );
    }
}
/*
不能随便查看别人的年龄，工资等隐私，名字公开
要求：年龄合理 在1-120， name在2-6字符之间
 */
class Person{
    public String name;//名字公开
    private int age; //age私有
    private double salary;//工资私有
    //构造器 alt+insert
     public Person(){
     }
     //有三个属性的构造器
    public Person(String name, int age, double salary) {
//        this.name = name;
//        this.age = age;
//        this.salary = salary;
        //我们尅将方法写在构造器中，这样仍然可以验证数据
        setName(name);
        setAge(age);
        setSalary(salary);

    }


    //自己写 setXxx和 getsetXxx 太慢 我们使用快捷键 alt+insert
    //然后根据要求 写我们的代码

    public String getName() {
        return name;
    }

    public void setName(String name) {
        //加入对数据的校验，相当于增加了业务逻辑
        if(name.length()>=2&&name.length()<=6){
            this.name=name;
        }else{
            System.out.println("名字的长度不对，需在2-6字符");
            this.name="无名人";
        }

    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        //判断
        if(age>=1&&age<=120){//如果是合理范围
            this.age=age;
        }else{
            System.out.println("你设置的年龄不对，年龄需要在1-120之间，给默认年龄18");
            this.age = 18;//给默认年龄18
        }
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        //可以这里增加对当前对象的权限判断
        this.salary = salary;
    }
//写一个方法，返回属性信息
    public String info(){
        return "信息为 name="+name+"  age="+age+" salary= "+salary;
    }

}
```

### 将构造器和setXxx结合

```java
    //有三个属性的构造器
    public Person(String name, int age, double salary) {
//        this.name = name;
//        this.age = age;
//        this.salary = salary;
        //我们尅将方法写在构造器中，这样仍然可以验证数据
        setName(name);
        setAge(age);
        setSalary(salary);

    }
```

### 课堂练习

* 创建程序,在其中定义两个类：Account 和 AccountTest 类体会 Java 的封装性。
  1. Account 类要求具有属性：姓名（长度为 2 位 3 位或 4 位）、余额(必须>20)、密码（必须是六位）, 如果不满足，则给出提示信息，并给默认值(程序员自己定)
  2. 通过 setXxx 的方法给 Account 的属性赋值。
  3. 在 AccountTest 中测试

```java
package com.study2encap_;


/*
创建程序，在其中定义两个类，Account和AccountTest类体会Java的封装性
Account类要求具有属性：姓名（长度为2位3位或4位）、余额（必须>20）
密码（必须是六位），如果不满足，则给出提示信息，并给默认值（程序员自己定）
通过setXxx的方法给Account的属性赋值。
在AccountTest中测试
 */
public class Account {
    //为了封装，将三个属性设置为private
    private String name;
    private double balance;
    private String pwd;
//提供两个构造器
    public Account() {
    }

    public Account(String name, double balance, String pwd) {
       setBalance(balance);
       setPwd(pwd);
       setName(name);

    }

    public String getName() {
        return name;
    }
//姓名（长度为2位3位4位）
    public void setName(String name) {
        if(name.length()>=2&&name.length()<=4){
            this.name = name;
        }else{
            System.out.println("名字长度为2位3位4位,默认 无名");
            this.name="无名人";
        }

    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        if(balance>20) {
            this.balance = balance;
        }else {
            System.out.println("余额不足，默认0");
        }
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        if(pwd.length()==6){
            this.pwd = pwd;
        }else{
            System.out.println("密码长度应为六位 默认为000000");
            this.pwd="000000";
        }

    }
    //显示账号信息
    public void showInfo() {
        //可以增加权限的校检
        System.out.println("账号信息="+name+" 余额="+balance+" 密码"+pwd);
//        if(){
//            System.out.println("账号信息="+name+" 余额="+balance+" 密码"+pwd);
//        }else {
//            System.out.println("你无权查看...");
//        }
    }
}

```

```java
package com.study2encap_;

public class TestAccount {
    public static void main(String[] args) {
        //创建Account
        Account account = new Account();
        account.setName("Jacksmith");
        account.setBalance(60);
        account.setPwd("123456");
        account.showInfo();
        Account account1 = new Account("smith",600,"666666");
        System.out.println("=====smith的信息======");
        account.showInfo();
    }
}

```

## 面向对象编程-继承

### 为什么需要继承

```java
package com.study3.extend_.extend01;
//大学生->模拟大学生考试的简单情况
public class Graduate {
    public String name;
    public int age;
    private double score;//成绩

    public void setScore(double score) {
        this.score = score;
    }
    public  void testing(){
        System.out.println("大学生" + name + "正在考大学数学..");
    }
    public void showInfo() {
        System.out.println("学生名"+name+"  年龄"+age+"  成绩"+score);

    }
}

```

```java
package com.study3.extend_.extend01;

//小学生-》模拟小学生考试的一个情况
public class Pupil {
    public String name;
    public int age;
    private double score;//成绩

    public void setScore(double score) {
        this.score = score;
    }

    public void testing() {
        System.out.println("小学生" + name + "正在考小学数学..");
    }

    public void showInfo() {
        System.out.println("小学生名"+name+"  年龄"+age+"  成绩"+score);

    }
}

```

我们编写了两个类，一个Pupil类(小学生)，一个是Graduate(大学毕业生).问题:两个类的属性和方法有很多是相同的，怎么办?

==>继承(代码复用性~)

### 继承基本介绍和示意图

继承可以解决代码复用,让我们的编程更加靠近人类思维.当多个类存在相同的属性(变量)和方法时,可以从这些类中
抽象出父类,在父类中定义这些相同的属性和方法，所有的子类不需要重新定义这些属性和方法，只需要通过 extends 来声明继承父类即可。画出继承的示意图

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/19.png)

### 继承的基本语法

class 子类 **extends** 父类{

}

1. 子类就会自动拥有父类定义的属性和方法
2. 父类又叫超类，基类
3. 子类又叫派生类

### 快速入门案例

我们对 Extends01.java 改进，使用继承的方法,请大家注意体会使用继承的好处

```java
import com.hspedu.extend_.Graduate;
import com.hspedu.extend_.Pupil;

public class Extends01 {
	public static void main(String[] args) {
		com.hspedu.extend_.Pupil pupil = new Pupil();
		pupil.name = "银角大王~";
		pupil.age = 11;
		pupil.testing();
		pupil.setScore(50);
		pupil.showInfo();
        
		System.out.println("=======");
		com.hspedu.extend_.Graduate graduate = new Graduate();
		graduate.name = "金角大王~";
        graduate.age = 23;
		graduate.testing();
		graduate.setScore(80);
		graduate.showInfo();
    }
}	
```

```java
//父类,是 Pupil 和 Graduate 的父类
public class Student {
//共有属性
	public String name;
	public int age;
	private double score;//成绩
	//共有的方法
	public void setScore(double score) {
		this.score = score;
	}
	public void showInfo() {
		System.out.println("学生名 " + name + " 年龄 " + age + " 成绩 " + score);
	}
}
```

```java
//让 Pupil 继承 Student 类
public class Pupil extends Student {
	public void testing() {
		System.out.println("小学生 " + name + " 正在考小学数学..");
	}
}
```

```java
public class Graduate extends Student {
	public void testing() {//和 Pupil 不一样
		System.out.println("大学生 " + name + " 正在考大学数学..");
    }
}
```

### 继承给编程带来的便利

1. 代码的复用性提高了
2. 代码的扩展性和维护性提高了

### 继承的深入讨论/细节问题

1. **子类继承了所有的属性和方法，非私有的属性和方法可以在子类直接访问, 但是私有属性和方法不能在子类直接访问，要通过父类提供公共的方法去访问**
2. **子类必须调用父类的构造器， 完成父类的初始化**
3. **当创建子类对象时，不管使用子类的哪个构造器，默认情况下总会去调用父类的无参构造器，如果父类没有提供无参构造器，则必须在子类的构造器中用 super 去指定使用父类的哪个构造器完成对父类的初始化工作，否则，编译不会通过**
4. **如果希望指定去调用父类的某个构造器，则显式的调用一下 : super(参数列表)**
5. **super 在使用时，必须放在构造器第一行(super 只能在构造器中使用)**
6. **super() 和 this() 都只能放在构造器第一行，因此这两个方法不能共存在一个构造器**
7. **java 所有类都是 Object 类的子类, Object 是所有类的基类.**
8. **父类构造器的调用不限于直接父类！将一直往上追溯直到 Object 类(顶级父类)**
9. **子类最多只能继承一个父类(指直接继承)，即 java 中是单继承机制**
10. **不能滥用继承，子类和父类之间必须满足 is-a 的逻辑关系**

```java
package com.study3.extend_.extend02;

public class ExtendDetail {
    public static void main(String[] args) {
//        System.out.println("====第一个对象====");
//        Sub sub = new Sub();//创建了子类对象
//        System.out.println("====第二个对象====");
//        Sub sub2 = new Sub("jack");
        System.out.println("====第三个对象====");
        Sub sub3 = new Sub("king",10);//先找子类的构造器



        //   sub.sayOk();
    //子类必须调用父类的构造器，完成父类的初始化
    }



}

```

```java
package com.study3.extend_.extend02;

public class TopBase  {//父类是Object
    public TopBase() {
        System.out.println("构造器TopBase被调用...");
    }
}

```

```java
package com.study3.extend_.extend02;

public class Base extends TopBase {//父类
    //四个属性
    public int n1=100;
    protected int n2=200;
    int n3=300;
    private int n4=400;

    public Base() {//无参构造器
        System.out.println("父类的构造器Base()被调用");
    }
    public Base(String name,int age){

        System.out.println("父类Base(String name,int age)被调用");
    }
    public Base(String name){

        System.out.println("父类Base(String name)被调用");
    }

    //在父类提供一个public的方法

    public int getN4() {
        return n4;
    }

    public void test100(){
        System.out.println("test100");

    }
    protected void test200(){

        System.out.println("test200");
    }
    void test300(){
        System.out.println("test300");
    }
    private void test400(){
        System.out.println("test400");
    }
    //call 调用
    public void callTest400(){
        test400();

    }
}

```

```java
package com.study3.extend_.extend02;

//可以输入ctrl+h可以看到类的继承关系
public class Sub extends Base {//子类

    public Sub() {//无参构造器
        //默认调用父类的无参构造器
         super("smith", 10);
        System.out.println("子类Sub()无参构造器被调用");
    }
    public Sub(String name,int age){
        //1.调用父类的无参构造器，如下 或者 什么都不写，默认调用super();
       // super();//父类的无参构造器
        //2.如果要调用父类的Base(String name)
        //super("frx");
        //3.调用父类的两个参数的构造器Base(String name,int age)
        super("king",20);
        //细节： super在使用时，必须放在构造器第一行
        //细节：super()和this()都只能放在构造器的第一行，
        // 因此这两个不能共存在一个构造器
        //this() 不能再使用了
        System.out.println("子类的Sub(String name,int age)被调用");
    }
    public Sub(String name){
        super("Tom",30);
        System.out.println("子类的Sub(String name)被调用");
    }
    public void  sayOk(){
        //非私有的属性和方法，可以在子类中访问
        //我们发现 除了父类的private不能访问，其他都能访问
        System.out.println(n1+" "+n2+" "+n3);
        test100();
        test200();
        test300();
        System.out.println("n4="+getN4());
        callTest400();//做中转
    }
}
```

### 继承的本质分析(重要)

我们看一个案例来分析当子类继承父类，创建子类对象时，内存中到底发生了什么?

```java
package com.study3.extend_.extend02;
/*
继承的本质
 */
public class ExtendTheory {
    public static void main(String[] args) {
      Son son=new Son();//内存的布局
        //（1）首先看子类是否有该属性
        //（2）如果子类有这个属性，并且可以访问，则返回信息
        //（3）如果子类没有这个属性，就看父类有没有这个属性（如果父类有，并且可以访问，就返回信息）
        //（4）如果父类没有这个属性，就按照（3）的规则，继续找上级父类，直到Object
        System.out.println(son.name);//返回的是大头儿子
        System.out.println(son.getAge());//返回的是39
        System.out.println(son.hobby);
    }
}
class GrandPa{//爷类
    String name="大头爷爷";
    String hobby="旅游";
}
class Father extends GrandPa{//父类
    String name="大头爸爸";
    private int age=39;

    public int getAge() {
        return age;
    }
}
class Son extends Father{//子类
    String name="大头儿子";
}
//先加载类，Object->Grandpa->Father->Son
//在堆里面分配空间，先爷类分配空间
```

### 课堂练习

```java
package com.study3.extend_.exercise;

public class Exercise01 {
    public static void main(String[] args) {
        B b = new B();

    }
}
class  A{
    A(){
        System.out.println("a");//1
    }
    A(String name){
        System.out.println("a name");
    }
}
class B extends A{
    B(){
        this("abc");
        System.out.println("b");//3
    }
    B(String name){
        //默认有super();
        System.out.println("b name");//2
    }
}
```

## super 关键字

### 基本介绍

super 代表父类的引用，用于 访问**父类的属性、方法、构造器**

### 基本语法

1. 访问父类的属性，但不能访问父类的private属性

   **super.属性名;**

2. 访问父类的方法，不能访问父类的private方法

   **super.方法名(参数列表);**

3. 访问父类的构造器

   **super(参数列表);**

   只能放在构造器的第一句，只能出现一句!

```java
package com.study3.extend_.super_;
public class Base {//父类是Object
    public int n1=999;
    public  int age=111;
    public void eat(){
        System.out.println("Base类中的eat方法...");
    }
    public void cal(){
        System.out.println("Base类中的cal方法...");
    }
}
```

   ```java
package com.study3.extend_.super_;

public class A extends Base{
    //4个属性
 //  public int n1=100;
    protected int n2=200;
    int n3=300;
    private int n4 = 400;
    public A(){

    }
    public A(String name){
    }
    public A(String name,int age){

    }
//    private void cal(){
//        System.out.println("A类的cal()方法...");
//    }  //子类不能直接访问父类私有的方法

    public void cal(){
        System.out.println("A类的cal()方法...");
    }

    public void test100() {
    }

    protected void test200() {
    }

    void test300() {
    }

    private void test400() {

    }

}

   ```

```java
package com.study3.extend_.super_;

public class B extends A{
   // public int n1=888;
    //访问父类的属性，但不能访问访问父类的private属性 super.属性名
    public void hi(){
        System.out.println(super.n1+" "+super.n2+" "+super.n3);
    }

    //访问父类的方法，但不能访问父类的private方法，super.方法名（形参列表）；
    public void ok(){
        super.test100();
        super.test200();
        super.test300();
        //test400()是private方法
    }
    //访问父类的构造器：super（形参列表）；只能放在构造器的第一句，只能出现一句
    public B(){
      //  super();
    //   super("king");
        super("king",10);

    }
    public void sum() {
        System.out.println("B类的sum()方法...");
        //希望调用父类A的cal方法
        //这时因为子类B 没有cal方法，因此我可以使用下面三种方式
        //cal();
        //(1)找cal方法，顺序是，先找本类，如果有 就调用
        //(2)如果没有,找父类（如果有，并可以调用，则调用）
        //(3)如果父类没有，则继续找父类的父类，整个规则 就是这样,直到Object类
        //提示：如果查找方法的过程中，找到了，但是不能访问，则报错
        //     如果查找方法的过程中，没有找到，则提示该方法不存在
        // this.cal();//等价 cal
        super.cal();// 找cal的顺序是直接查找父类，其他的规则一样,即使子类有cal()也不会调用
        //属性和方法一样
        System.out.println(n1);//888
        System.out.println(this.n1);//888
        System.out.println(super.n1);//100
        //this.n1和n1查找规则是一样的
    }
     //编写方法测试
    public void test(){
        //super的访问不限于直接父亲，如果爷爷类和本类中有同名的成员，
        // 也可以用Super方法访问爷爷类
        //
        System.out.println("super.n1="+super.n1);
    }


}

```

```java
package com.study3.extend_.super_;

public class Super01 {
    public static void main(String[] args) {
        B b = new B();//子类对象
    //    b.sum();
        b.test();

    }
}

```

### super给编程带来的好处

1. 调用父类的构造器的好处(分工明确,父类属性由父类初始化，子类的属性由子类初始化)
2. 当子类中有和父类中的成员(属性和方法)重名时，为了访问父类的成员，必须通过super。如果没有重名，使用super、this、直接访问是一样的效果!
3. super的访问不限于直接父类，如果爷爷类和本类中有同名的成员，也可以使用super去访问爷爷类的成员;如果多个基类(上级类)中都有同名的成员，使用super访问遵循就近原则。A->B->C,当然也需要遵守访问权限的相关规则

### super和this的比较

| 区别点     | this                                                   | super                                    |
| ---------- | ------------------------------------------------------ | ---------------------------------------- |
| 访问属性   | 访问本类中的属性，如果本类没有此属性则从父类中继续查找 | 从父类开始查找属性                       |
| 调用方法   | 访问本类中的方法，如果本类没有此方法则从弗雷继续查找   | 从父类开始查找方法                       |
| 调用构造器 | 调用本类构造器，必须放在构造器的首行                   | 调用父类构造器，必须放在子类构造器的首行 |
| 特殊       | 表示当前对象                                           | 子类中访问父类对象                       |

## 方法重写/覆盖(override)

### 基本介绍

简单地说:方法覆盖(重写)就是子类有一个方法，和父类的某个方法的名称、返回类型、参数一样，那么我们就说子类的这个方法覆盖了父类的方法

### 快速入门

```java
package com.study4.override_;

public class Animal {
    //1.因为Dog是Animals的子类
    //2.Dog的cry方法和Animals的cry定义形式一样（名称、返回类型、参数）
    //3.这时我们就说Dog的cry方法，重写了Animals的cry方法
    public void cry(){
        System.out.println("动物叫唤...");
    }
    public Object m1(){
        return null;
    }
    public String m2(){
        return null;
    }

//      public BBB m3(){
//        return null;
//      }
      private void eat(){

      }


}

```

```java
package com.study4.override_;

public class Dog extends Animal {
    public void cry() {
        System.out.println("狗叫唤...");
    }

    //细节：子类方法的返回类型和父类方法返回类型一样
    //     或者是父类返回类型的子类VT比如 父类 返回类型是Object，
    //     子类方法返回类型是String
    public String m1() {
        return null;
    }
    //这里Object不是String的子类，编译报错
//    public Object m2(){
//        return null;
//    }

    public BBB m3() {
        return null;
    }
    //细节：子类方法不能缩小父类的访问权限
    //public>protected>默认>private
    public void eat(){

    }
}
    class AAA {

    }

    class BBB extends AAA {

    }

```

```java
package com.study4.override_;

public class Override01 {
    //演示方法重写情况
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.cry();//ctrl +b定位
    }

}
```

### 注意事项和使用细节

1. 子类的方法的形参列表，方法名称,要和父类方法的形参列表,方法名称完全一样。
2. 子类方法的返回类型和父类方法返回类型一样,或者是父类返回类型的子类比如父类返回类型是Object,子类方法返回类型是String
3. **子类方法不能缩小父类方法的访问权限**

### 方法重载和方法重写的区别

| 名称           | 发生范围 | 方法名   | 形参列表                         | 返回类型                                                     | 修饰符                         |
| -------------- | -------- | -------- | -------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 重载(overload) | 本类     | 必须一样 | 类型，个数或者顺序至少有一个不同 | 无要求                                                       | 无要求                         |
| 重写(override) | 父子类   | 必须一样 | 相同                             | 子类重写的方法，返回的类型和父类返回的类型一致，或者是其子类 | 子类方法不能缩小父类的访问范围 |

## 面向对象编程-多态

### 先看一个问题

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/20.png)

+  使用传统的方法来解决（private 属性）

+ 传统的方法带来的问题是什么? 如何解决?

  问题是： 代码的复用性不高，而且不利于代码维护

  引出多态

```java
package com.study5poly_.animal;

public class Animal {
    private String name;

    public Animal(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```

```java
package com.study5poly_.animal;

public class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }
}

```

```java
package com.study5poly_.animal;

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
}

```

```java
package com.study5poly_.animal;


public class Pig extends Animal {
    public Pig(String name) {
        super(name);
    }
}

```

```java
package com.study5poly_.animal;

public class Food {
    private String name;

    public Food(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```

```java
package com.study5poly_.animal;

public class Bone extends Food {
    public Bone(String name) {
        super(name);
    }
}

```

```java
package com.study5poly_.animal;

public class Fish extends Food {
    public Fish(String name) {
        super(name);
    }
}

```

```java
package com.study5poly_.animal;

public class Rice extends Food {
    public Rice(String name) {
        super(name);
    }
}

```

```java
package com.study5poly_.animal;

public class Master {
    private String name;

    public Master(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    //使用多态机制，可以统一的管理主人喂食的问题
    //animal 编译类型是Animal ，可以指向（接受）Animal子类的对象
    //food 编译类型是Food,可以指向 food子类的对象
    public void feed(Animal animal, Food food){
        System.out.println("主人 "+name+" 给"+animal.getName()+" 喂 "+food.getName());
    }





    //主人给小狗喂骨头
//    public void feed(Dog dog,Bone bone){
//        System.out.println("主人 "+name+" 给"+dog.getName()+" 喂 "+bone.getName());
//
//    }
//    //主人给小猫喂黄花鱼
//    public void feed(Cat cat,Fish fish){
//        System.out.println("主人 "+name+" 给"+cat.getName()+" 喂 "+fish.getName());
//
//    }

}

```

```java

package com.study5poly_.animal;

public class Poly01 {
    public static void main(String[] args) {
        Master tom = new Master("Tom");
        Dog dog= new Dog("大黄");
        Bone bone = new Bone("大棒骨");
        tom.feed(dog,bone);
        Cat cat = new Cat("小花猫");
        Fish fish = new Fish("黄花鱼");
        System.out.println("=====================");
        tom.feed(cat,fish);
        //添加 给小猪喂米饭
        Pig pig = new Pig("小花猪");
        Rice rice = new Rice("米饭");
        System.out.println("=====================");
        tom.feed(pig,rice);
    }
}

```

### 多态基本介绍

方法或对象具有多种形态。是面向对象的第三大特征，多态是建立在封装和继承基础之上的

### 多态的具体表现

1. 方法的多态

   重写和重载就体现多态

```java
public class PloyMethod {
	public static void main(String[] args) {
	//方法重载体现多态
	Aa = new A();
	//这里我们传入不同的参数，就会调用不同 sum 方法，就体现多态
	System.out.println(a.sum(10, 20));
	System.out.println(a.sum(10, 20, 30));
    //方法重写体现多态
	B b = new B();
	a.say();
	b.say();
    }
}
class B { //父类
	public void say() {
		System.out.println("B say() 方法被调用...");
	}
}
class A extends B {//子类
	public int sum(int n1, int n2){//和下面 sum 构成重载
		return n1 + n2;
}
	public int sum(int n1, int n2, int n3){
		return n1 + n2 + n3;
}
	public void say() {
		System.out.println("Asay() 方法被调用...");
	}
}
```

2. 对象的多态
   1. 一个对象的编译类型和运行类型可以不一致
   2. 编译类型在定义对象时，就确定了，不能改变
   3. 运行类型是可以改变的
   4. 编译类型看定义时=号的左边，运行类型看=号的右边

```java
public class PolyObject {
    public static void main(String[] args) {
             //体验一下 对象多态的特点
        //animal 编译类型 Animal 运行类型是 Dog
            Animal animal=new Dog();
        //因为运行时，这时就执行该行时，animal运行类型是Dog，所以这个cry就是Dog的cry
            animal.cry();//小狗汪汪叫...
        //animal 编译类型 Animal 运行类型是 Cat
        animal=new Cat();
          animal.cry();//小猫喵喵叫...
    }
}

```

```java
package com.study5poly_.objectpoly_;

public class Animal {
    public void cry(){
        System.out.println("Animal cry()动物在叫...");
    }
}

```

```java
package com.study5poly_.objectpoly_;

public class Cat extends Animal {

    public void cry() {
        System.out.println("Cat cry() 小猫喵喵叫...");
    }
}

```

```java
package com.study5poly_.objectpoly_;

public class Dog extends Animal{

    public void cry() {
        System.out.println("Dog cry() 小狗汪汪叫...");
    }
}

```

### 多态的注意事项和细节讨论

+ 多态的前提是:两个对象(类)存在继承关系
+ 多态的向上转型

1. 本质:父类的引用指向子类的对象

2. 语法:父类类型 引用名=new 子类类型();

3. 特点:编译类型看左边，运行类型看右边

   可以调用父类中的所有成员(需遵守访问权限)

   不能调用子类中的特有成员

   最终运行效果看子类的具体实现

+ 多特的向下转型

1. 语法：子类类型 引用名=(子类类型) 父类引用;
2. 只能强转父类的引用，不能强转父类的对象
3. 要求父类的引用必须指向的是当前目标类型的对象
4. 当向下转型后，可以调用子类类型中的所有的成员

```java
package com.study5poly_.detail_;

public class Animal {
    String name="动物";
    int age=10;
    public void sleep(){
        System.out.println("睡");
    }
    public void run(){
        System.out.println("跑");
    }
    public void eat(){
        System.out.println("吃");
    }
    public void show(){
        System.out.println("hello.你好");
    }

}

```

```java
package com.study5poly_.detail_;

public class Cat extends Animal{
    public void eat(){//方法重写
        System.out.println("猫吃鱼");
    }
    public void catchMouse(){//Cat特有的方法
        System.out.println("猫抓老鼠");
    }
}

```

```java
package com.study5poly_.detail_;

public class Dog extends Animal{//Dog是Animal的子类
    public void sleep(){
        System.out.println("狗在睡...");
    }

}

```

```java
package com.study5poly_.detail_;

public class PolyDetail {
    public static void main(String[] args) {
        //向上转型 ：父类的引用指向了子类的对象
        //语法：父类类型引用名=new 子类类型();
        Animal animal=new Cat();
        Object pbj=new Cat();//ok
        //向上转型调用的方法的规则如下
        //可以调用父类中的所有成员（需遵守访问权限）
        //但是不能调用子类特有的成员
        //因为在编译阶段，能调用那些成员，是由编译类型来决定的
        //animal.catchMouse();//错误
        //最终运行 效果看子类的实现  即调用方法时，按照从子类开始查找方法调用
        //规则与前面我们讲的方法调用规则一致。
        animal.eat();//猫吃鱼...
        animal.run();//跑
        animal.show();//hello.你好
        animal.sleep();//睡
        //希望调用Cat的catchMouse方法
        //多态的向下转型
        //（1）语法：子类类型 引用名=（子类类型）父类引用；
        //cat的编译类型  Cat 运行类型是Cat
        Cat cat=(Cat)animal;
        cat.catchMouse();
        //（2）要求父类的引用必须指向的是当前目录类型的对象
//        Animal animal1=new Dog();
//        Dog dog=(Dog)animal1;
//        dog.sleep();
    }
}

```

+ 属性的值要看编译类型

```java
package com.study5poly_.detail_;

public class PolyDetail02 {
    public static void main(String[] args) {
         //属性没有重写之说！属性的值看编译类型
        Base base=new Sub();//向上转型
        System.out.println(base.count);//?//10
        Sub sub = new Sub();
        System.out.println(sub.count);//20


    }
}
class Base{//父类
    int count=10;//属性

}
class Sub extends Base{//子类
    int count=20;//属性
}

```

+ instanceOf 比较操作符，用于判断对象的运行类型是否为XX类型或XX类型的子类型

```java
package com.study5poly_;

public class PolyDetail03 {
    public static void main(String[] args) {
        BB bb = new BB();
        //instanceof比较操作符 ，用于判断对象的类型是否为XX类型或XX类型的子类型
        System.out.println(bb instanceof BB);//true
        System.out.println(bb instanceof AA);//true
        //aa编译类型AA  运行类型为BB
        AA aa=new BB();
        System.out.println(aa instanceof AA);//true
        System.out.println(aa instanceof BB);//true
        Object obj=new Object();
        System.out.println(obj instanceof AA);//false
        String str="hello";
      //  System.out.println(str instanceof AA);
        System.out.println(str instanceof Object);//true

    }
}
class AA{

}
class BB extends AA{

}
```

### Java的动态绑定机制

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/21.png)

   ```java
package com.study5poly_.dynamic_;

public class DynamicBinding {
    public static void main(String[] args) {
        A a=new B();
        System.out.println(a.sum());//40->30
        System.out.println(a.sum1());//30
    }
}
class A{//父类
    public int i=10;
    public int sum(){
        return getI()+10;//20+10
    }
        public int sum1(){
       return i+10;
    }
    public int getI(){//父类get1
        return i;
    }
}
class B extends A {
    public int i = 20;

//        public int sum(){
//       return i+20;
//    }
    public int getI() {//子类get1（）

        return i;
    }

//   public int sum1() {
//        return i + 10;
//    }
}
//java的动态绑定机制
//1.当调用对象方法的时候，该方法回合该对象的内存地址/运行类型绑定
//2.当调用对象属性时，没有动态绑定机制，哪里声明，哪里使用
   ```

### 多态的运用

1. 多态数组

   数组的定义类型为父类类型，里面保存的实际元素类型为子类类型

   应用实例:现有一个继承结构如下：要求创建 1 个 Person 对象、2 个 Student 对象和 2 个 Teacher 对象, 统一放在数组中，并调用每个对象say 方法.

```java
package com.study5poly_.polyarr_;

public class PloyArray {
    public static void main(String[] args) {
		//应用实例：现有一个继承机构如下：要求创建1个Person对象。
        //2个Student 对象和2个Teacher对象，统一放在数组中，并调用每个对象say方法
        Person person[] = new Person[5];
        person[0] = new Person("jack", 20);
        person[1] = new Student("mary", 18, 100);
        person[2] = new Student("smith", 19, 30.1);
        person[3] = new Teacher("scott", 30, 20000);
        person[4] = new Teacher("king", 50, 25000);
		//循环遍历多态数组，调用say()方法
        for (int i = 0; i < person.length; i++) {
            //person[i]编译类型 是Person ，运行由jvm机来判断
            //动态绑定机制
            System.out.println(person[i].say());
            //这里
            if (person[i] instanceof Student) {//判断person[i]的运行类型是不是Student
             Student student=(Student)person[i];//向下转型
                student.study();
            }else if(person[i] instanceof Teacher){
                Teacher teacher=(Teacher) person[i];
                teacher.teach();
            }else if(person[i] instanceof Person){
            }else {
                System.out.println("你的类型有误，请自己检查");
            }
        }

    }
}
```

## Object类详解

### equals方法

+ ==和equals的对比

==是一个比较运算符

1. ==:既可以判断基本类型，又可以判断引用类型
2. ==:如果判断基本类型，判断的是值是否相等。示例:int i=10;double d=10.0
3. ==:如果判断引用类型，判断的是地址是否相等，即判定是不是同一个对象
4. equals:是Object类中的方法，只能判断引用类型
5. 默认判断的是地址是否相等，子类中往往重写该方法，用于判断内容是否相等

```java
package com.study6object_;

public class Equals01 {
    public static void main(String[] args) {
        A a = new A();
        A b = a;
        A c = b;
        System.out.println(a == c);//true
        System.out.println(b == c);//true
        B bObj = a;
        System.out.println(bObj == c);//true
        int n = 10;
        double m = 10.0;
        System.out.println(n == m);
        //把光标
        "hello".equals("abc");
        //即Object类的equals方法默认就是比较对象地址是否相同
        //也就是判断两个对象是不是同一个对象
        //public boolean equals(Object obj){
        //return (this==obj);
        //}
        //从源码可以看到Integer也重写了Object的equals方法，
        /*
        public boolean equals(Object obj) {
        if (obj instanceof Integer) {
            return value == ((Integer)obj).intValue();
        }
        return false;
    }
         */
        Integer integar1 = new Integer(1000);
        Integer integer2 = new Integer(1000);
        System.out.println(integar1==integer2);//false
        System.out.println(integar1.equals(integer2));//true


        String str1=new String("frx");
        String str2=new String("frx");
        System.out.println(str1==str2);//false
        System.out.println(str1.equals(str2));//true



    }
}
class B{

}



class A extends B{

}
```

### 如何重写equals方法

+ 应用实例: 判断两个 Person 对象的内容是否相等，如果两个 Person 对象的各个属性值都一样，则返回 true，反之 false。

```java
package com.study6object_;

public class EqualsExercise01 {
    public static void main(String[] args) {
        Person person1 = new Person("jack", 10, '男');
        Person person2= new Person("jack", 10, '男');
        System.out.println(person1.equals(person2));//true
    }
}
//判断两个Person对象的内容是否相等
//如果两个Person对象的各个属性值 都一样，则返回true，反之false
class Person{//extends Object
    private String name;
    private int age;
    private char gender;

    //重写Object的equals方法
   public boolean equals(Object obj){
       //判断结果比较的两个对象是同一个对象，则直接返回true
       if(this==obj){
           return true;
       }
       //类型判断
       if(obj instanceof Person){//是Person 我们才比较
        //进行向下转型,因为我需要得到Object的各个属性
           Person p=(Person)obj;
           return this.name.equals(p.name)&&this.age==p.age&&this.gender==p.gender;


       }
       //如果不是Person，则直接返回false
       return false;
   }
    public Person(String name, int age, char gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }
}

```

### 课堂练习题

```java
package com.study6object_;

public class EqualsExercise02 {
    public static void main(String[] args) {
        Person_ p1 = new Person_();
        p1.name="frx";
        Person_ p2 = new Person_();
        p2.name="frx";
        System.out.println(p1==p2);//false
        System.out.println(p1.name.equals(p2.name));//T
        System.out.println(p1.equals(p2));//false

        String s1=new String("abc");
        String s2=new String("abc");
        System.out.println(s1.equals(s2));//T
        System.out.println(s1==s2);//F


    }
}
class Person_{
    public String name;
}





```

### hashCode方法

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/15.png)

1. 提高具有哈希结构的容器的效率
2. 两个引用，如果指向的同一个对象，则哈希值是一样的，反之，则不一样
3. 哈希值主要根据地址号来的，不能完全将哈希值等价于地址

```java
package com.study6object_;

public class HashCode_ {
    public static void main(String[] args) {
        AA aa = new AA();
        AA aa2 = new AA();
        AA aa3=aa;
        System.out.println("aa.hashcode=="+aa.hashCode());
        System.out.println("aa2.hashcode=="+aa2.hashCode());
        System.out.println("aa3.hashcode=="+aa3.hashCode());
    }

}
class AA{

}
```

### toString方法

1. 基本介绍

   默认返回:全类名+@+哈希值的十六进制，子类往往重写toString方法，用于返回对象的属性信息

2. 重写toString方法，打印对象或拼接对象时，都会自动调用该对象的toString形式

```java
package com.study6object_;

public class ToString_ {
    public static void main(String[] args) {
/*
Object toString（） 方法的源码
（1）getClass().getName()//全类名 包名加类名
（2）Integer.toHexString(hashCode()将 对象的Hashcode值转为 十六进制字符串
public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
 */


        Monster monster = new Monster("小妖怪", "巡山", 1000);
        System.out.println(monster.toString()+"\thashcode="+monster.hashCode());
        System.out.println("==当直接输出一个对象时，toString方法会被默认的调用");
        System.out.println(monster);//等价monster.toString()
    }
}
class Monster{
    String name;
    String job;
    private double sal;

    public Monster(String name, String job, double sal) {
        this.name = name;
        this.job = job;
        this.sal = sal;
    }
    //重写toString方法，输出对象的属性
    //使用快捷键即可alt+insert

    @Override
    public String toString() {//默认重写后 一般是把对象的属性输出出来
        return "Monster{" +
                "name='" + name + '\'' +
                ", job='" + job + '\'' +
                ", sal=" + sal +
                '}';
    }
}

```

### finalize方法

1. 当对象被回收时，系统自动调用该对象的 finalize 方法。子类可以重写该方法，做一些释放资源的操作
2. 什么时候被回收：当某个对象没有任何引用时，则 jvm 就认为这个对象是一个垃圾对象，就会使用垃圾回收机制来销毁该对象，在销毁该对象前，会先调用 finalize 方法。
3. 垃圾回收机制的调用，是由系统来决定(即有自己的 GC 算法), 也可以通过 System.gc() 主动触发垃圾回收机制，测试：Car [name]

```java
package com.study6object_;

public class Finalize_ {
    public static void main(String[] args) {
        Car bmw = new Car("宝马");
        bmw =null;
        System.gc();//主动调用垃圾回收器
        //这时car对象 就是一个垃圾，垃圾回收器就会回收（销毁）对象，在销毁对象前，会调用对象的finalize
        //程序员就可以在finalize中，写自己的业务逻辑代码（比如释放资源：数据库连接，或者打开文件..）
        //如果程序员不出现 finalize，那么就会调用Object的finalize方法
        //如果程序员程序员重写了finalize方法，就可以实现自己的逻辑
        System.out.println("程序退出了....");
    }
}
class Car{
    private String name;

    public Car(String name) {
        this.name = name;
    }

    @Override
    protected void finalize() throws Throwable {
        System.out.println("我们销毁汽车"+this.name);
        System.out.println("释放了某些资源");
    }
}

```

## 断电调试(debug)

### 一个实际需求

1. 在开发中，新手程序员在查找错误时,这时老程序员就会温馨提示，可以用断点调试,一步一步的看源码执行的过程,从而发现错误所在。
2. 重要提示:在断点调试过程中，是运行状态，是以对象的运行类型来执行的.

### 断点调试介绍

1. 断点调试是指在程序的某一行设置一个断点，调试时，程序运行到这一行就会停住,然后你可以一步一步往下调试，调试过程中可以看各个变量当前的值，出错的话，调试到出错的代码行即显示错误，停下。进行分析从而找到这个Bug
2. 断点调试是程序员必须掌握的技能
3. 断点调试也能帮助我们查看java底层源代码的执行过程，提高程序员的Java水平

### 断点调试的过程

F7(跳入) 	F8(跳过)	 shift+F8(跳出) 	F9(resume,执行到下一个断点)

F7：跳入方法内

F8: 逐行执行代码

shift+F8: 跳出方法

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/16.png)

## 类变量和类方法

### 提出问题

提出问题的主要目的就是让大家思考解决之道，从而引出我要讲的知识点.

说：有一群小孩在玩堆雪人,不时有新的小孩加入,请问如何知道现在共有多少人在玩?，编写程序解决。

### 传统的方法解决问题

使用我们现有的技术来解决这个问题，大家看看如何?\

+ 思路

1. 在main方法中定义一个变量count
2. 当一个小孩加入游戏后count++,最后count就记录有多少小孩玩游戏

+ 问题分析

1. count是一个独立于对象，很尴尬
2. 以后我们访问count很麻烦，没有使用到OOP
3. 因此，我们引出类变量/静态变量

### 类变量快速入门

思考: 如果,设计一个 int count 表示总人数,我们在创建一个小孩时，就把 count 加 1,并且 count 是所有对象共享的就 ok 了!，我们使用类变量来解决

```java
package com.study7static_;

public class ChildGame {
    public static void main(String[] args) {

        Child child1 = new Child("白骨精");
        child1.join();

        Child child2 = new Child("老鼠精");
        child2.join();

        Child child3 = new Child("狐狸精");
        child3.join();
        child3.count++;
        System.out.println("共有"+child1.count+"加入了游戏");


    }
}
class Child {
    //定义一个变量 count ,是一个类变量(静态变量) static 静态
    //该变量最大的特点就是会被 Child 类的所有的对象实例共享
    private String name;
    public static int count=0;

    public Child(String name) {
        this.name = name;
    }
    public void join(){
        System.out.println(name+"加入了游戏..");
    }


}
```

### 类变量和内存布局

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/33.png)

1. static变量是同一个类所有对象共享
2. static类变量，在类加载的时候就生成了

### 什么是类变量

类变量也叫静态变量/静态属性，是该类的所有对象共享的变量,任何一个该类的对象去访问它时,取到的都是相同的值,同样任何一个该类的对象去修改它时,修改的也是同一个变量。这个从前面的图也可看出来。

### 如何定义类变量

+ 定义语法

**访问修饰符 static 数据类型 变量名**

### 如何访问类变量

类名.类变量名

或者 对象.类变量名 【静态变量的访问修饰符的访问权限和范围和普通属性是一样的】

```java
package com.study7static_;

public class VisitStatic {
    public static void main(String[] args) {
        //类名.类变量名
        //说明：类变量是随着类的加载而创建，所以即使没有创建对象实例 也可以访问
        A a = new A();
        System.out.println(a.name);
        System.out.println(A.name);
    }
}
class A{
    //类变量
    //类变量必须遵守相关的访问权限
    public static String name="frx";
}
```

### 类变量使用注意事项和细节讨论

1. 什么时候需要用到类变量

   当我们需要让某个类的所有对象共享一个变量时，就可以考虑使用类变量(静态变量):比如：定义学生类，统计所有学生公交多少钱。Student(name,static fee)

2. 类变量与实例变量(普通属性)区别

   类变量是该类的所有对象共享的，而实例变量是每个对象独享的

3. 加上static称为类变量或静态变量，否则称为实例变量/普通变量/非静态变量

4. 类变量可以通过类名.类变量名 或者 对象名.类变量名来访问，但java设计者推荐我们使用类名.类变量名方式访问。【前提是 满足访问修饰符的访问权限和范围】

5. 实例变量不能通过类名.类变量名方式访问

6. 类变量是在类加载时就初始化了，也就是说，即使你没有创建对象，只要类加载了，就可以使用类变量了

7. 类变量的生命周期是随类的加载开始，随着类消亡而销毁

```java
package com.study7static_;

public class StaticDetail {
    public static void main(String[] args) {
        //静态变量是类加载的时候，就创建了，所以我们没有创建对象实例
        //也可以通过类名.类变量名来访问
        System.out.println(C.address);

    }
}
class B{
    public static int n1=100;
}
class C{
    public static String address="北京";

}
        
```

### 类方法基本介绍

类方法也叫静态方法

形式如下:

**访问修饰符 static 数据返回类型 方法名(){}**

### 类方法的调用

使用方式:类名.类方法名 或者 对象名.类方法名 【前提是 满足修饰符的访问权限】

### 类方法应用举例

```java
package com.study7static_;

public class StaticMethod {
    public static void main(String[] args) {
        Stu Tom = new Stu("Tom");
        Tom.payFee(100);
        Stu jack = new Stu("Jack");
        jack.payFee(200);
        Stu.showFee();

    }
}

class Stu {
    private String name;//普通成员
    //定义一个静态变量，来积累学生的学费
    private static double fee = 0;

    public Stu(String name) {
        this.name = name;
    }

    //1.当方法使用率static修饰后，该方法就是静态方法
    //2.静态方法就可以访问静态属性/变量
    public static void payFee(double fee) {
        Stu.fee += fee;//累计到
    }

    public static void showFee() {
        System.out.println("总学费有：" + Stu.fee);
    }

}

```

### 类方法经典的使用场景

+ 当方法中不涉及到任何和对象相关的成员，则可将方法设计成静态方法，提高开发效率

比如：工具类中的方法 utils

Math类、Arrays类、Collections 集合类看下源码:

+ 小结

在程序员实际开发，往往会将一些通用的方法，设计成静态方法，这样我们不需要创建对象就可以使用了，比如打印一维数组，冒泡排序。完成某个计算任务等

### 类方法使用注意事项和细节讨论

1. 类方法和普通方法都是随着类的加载而加载，将结构信息存储在方法区

   类方法中无this的参数

   普通方法中隐含着this的参数

2. 类方法可以通过类名调用，也可以通过对象名调用

3. 普通方法和对象有关，需要通过对象名调用，比如对象名.方法名(参数),不能通过类名调用

4. 类方法中不允许使用和对象有关的关键字，比如this和super。普通方法(成员方法)可以

5. 类方法(静态方法)中只能访问静态变量或静态方法

6. 普通成员方法，既可以访问非静态成员，也可以访问静态成员

小结:静态方法，只能访问静态的成员，非静态的方法，可以访问静态成员和非静态成员(必须遵守访问权限)

```java
package com.study7static_;

public class StaticMethodDetail {
    public static void main(String[] args) {
           D.hi();//ok
        //非静态方法，不能通过类名调用
        new D().say();
    }
}
class D{
    private int n1=200;
    private static int n2=100;
    public void say(){

    }
    public static void hi(){
        //类方法中，不允许使用和对象有关的关键字
        //比如this和super.
    }
    //静态方法中，只能访问 静态变量或静态方法
    public static void hello(){
        System.out.println(n2);
        hi();
        //say();错误
    }
    //普通成员方法，既可以访问 非静态成员 也可以访问静态成员
    public void ok(){
        //非静态成员
        System.out.println(n1);
        say();
        //静态成员
        System.out.println(n2);
        hi();

    }

}

```

## 深入理解main方法语法

### 深入理解main方法

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/22.png)

### 特别提示

1. 在 main()方法中，我们可以直接调用 main 方法所在类的静态方法或静态属性
2. 但是，不能直接访问该类中的非静态成员，必须创建该类的一个实例对象后，才能通过这个对象去访问类中的非静态成员[举例说明Main01.java]

```java
package com.study7static_;

public class Main01 {
    //静态的变量/属性

    private static String name="frx";
    private int n1=100;
    private static void hi(){
        System.out.println("Main01中的hi方法");

    }
    //非静态方法
    public void cry(){
        System.out.println("Main01中的cry方法");
    }

    public static void main(String[] args) {
        //1.静态方法main可以访问本类的静态成员
        System.out.println("name="+name);
        hi();
        //2.静态方法main不可以访问本类的非静态成员
        //cay();
        //3.静态方法main 可以先创建对象在访问非静态方法
        Main01 main01 = new Main01();
        main01.cry();
    }
}

```

## 代码块

### 基本介绍

代码化块又称为初始化块,属于类中的成员[即是类的一部分]，类似于方法，将逻辑语句封装在方法体中，通过0包围起来。

但和方法不同，没有方法名，没有返回，没有参数，只有方法体，而且不用通过对象或类显式调用，而是加载类时，或创建对象时隐式调用。

### 基本语法

**[修饰符]{**

**}**

+ 注意事项

1. 修饰符可选，要写的话，也只能写static
2. 代码块分为两类，使用static修饰的叫静态代码块，没有static修饰的，叫普通代码块/非静态代码块
3. 逻辑语句可以分为任何逻辑语句(输入、输出、方法调用、循环、判断等)
4. ;号可以写上，也可以省略

### 代码块的好处和案例演示

1. 相当于另外一种形式的构造器(对构造器的补充机制)，可以做初始化的操作
2. 场景:如果多个构造器中都有重复的语句，可以抽取到初始化块中，提高代码的复用性

```java
package com.study8codeblock_;

public class CodeBlock {
    public static void main(String[] args) {
        Move a = new Move("a");
        Move move = new Move("c", 100, "frx");


    }
}
class Move{
    private String name;
    private double price;
    private String director;
    //1 下面的三个构造器都有相同的语句
    //2  这样代码看起来比较冗余
    //3  这时我们可以吧相同的语句，放到一个代码块状中，即可
    //4  这样当我们不管调用那个构造器，创建对象，都会先调用代码块的内容
    //5  代码块 调用的顺序 优先于构造器
    {
        System.out.println("1");
        System.out.println("2");
        System.out.println("3");
    }

    public Move(String name) {
        System.out.println("Move(String name)被调用");
        this.name = name;
    }

    public Move(String name, double price) {

        this.name = name;
        this.price = price;
    }

    public Move(String name, double price, String director) {
        System.out.println("Move(String name, double price, String director)被调用");
        this.name = name;
        this.price = price;
        this.director = director;
    }

}
```

### 代码块使用注意事项和细节讨论

1. static代码块也叫静态代码块，作用就是对类进行初始化，而且它随着类的加载而执行，并且只会执行一次。如果是普通代码块，每创建一个对象，就执行。

2. 类什么时候被加载

   1. 创建对象实例时(new)
   2. 创建子类对象实例，父类也会被加载
   3. 使用类的静态成员时(静态属性，静态方法)

3. 普通代码块，在创建对象实例时，会被隐式的调用

   被创建一次，就会调用一次

   如果只是使用类的静态成员时，普通代码块并不会执行

小结:

1. static代码块是类加载时，执行，只会执行一次
2. 普通代码块是在创建对象时调用的，创建一次，调用一次
3. 累加载的3中情况需要记住

```java
package com.study8codeblock_;

public class CodeBlackDetail01 {
    public static void main(String[] args) {
        //类什么时候被加载
        //1.创建对象实例时（new)
      //  AA aa = new AA();
        //2.创建子类对象实例，父类也会加载,而且父类先加载，子类后被加载
//        BB bb=new AA();
        //3.使用类的静态成员时
//        System.out.println(Cat.n1);
         //static代码块是类加载执行，只会执行一次
//        DD dd = new DD();
//        DD dd1 = new DD();
        //普通的代码块，在创建对象实例时，会被隐式调用、
        //被创建一次 就会调用一次
        //如果只是使用类的静态成员时，普通代码块并不会执行
        System.out.println(DD.n1);//888   静态代码块会被执行
    }
}



class DD{
    public static int n1=888;
    static {
        System.out.println("DD的静态代码块1被执行");
    }
    //普通代码块 ，在new 对象时，被调用而且是创建每个对象，就调用一次
    {
        System.out.println("DD的普通代码块1被执行");

    }

}






class Cat extends Animal0 {
    public static int n1 = 99;
}
class Animal0{
    static {
        System.out.println("Animal的静态代码块1被执行");
    }


}


class AA extends BB{
    //静态代码块
    static {
        System.out.println("AA类的静态代码块1被执行...");//2
    }

}
class BB{
    static {
        System.out.println("BB类的静态代码块1被执行...");//1

    }

}
```

4. 创建一个对象，在一个类调用顺序是:
   1. 调用静态代码块和静态属性初始化(注意:静态代码块和静态属性初始化调用的优先级一样,如果有多个静态代码块和多个静态变量初始化,则按他们**定义的顺序调用**)
   2. 调用普通代码块和普通属性的初始化(注意:普通代码块和普通属性初始化调用的优先级一样,如果有多个普通代码块和多个普通属性初始化,则按**定义顺序调用**)
   3. 调用构造器

```java
package com.study8codeblock_;

public class CodeBlackDetail02 {
    public static void main(String[] args) {
        A a = new A();

    }
}
class A{

    static {
        System.out.println("A静态代码块01");
    }
    {
        System.out.println("A类普通代码块01");
    }
    private  int n2=getN2();

    private static int n1=getN1();
    public static int getN1(){
        System.out.println("getN1被调用..");
        return 100;
    }
    public int getN2(){
        System.out.println("getN2被调用..");
        return 200;
    }
}

```

5. 构造器的最前面其实隐含了super()和调用普通代码块，新写一个类演示[截图+说明],静态相关的代码块，属性初始化，在类加载时，就执行完毕，因此是优先于构造器和普通代码块执行的

```java
package com.study8codeblock_;

public class CodeBlackDetail03 {
    public static void main(String[] args) {
        new BBB();

    }
}

class AAA {
    {
        System.out.println("AAA的普通代码块..");
    }
    public AAA() {
        super();
        System.out.println("AAA() 构造器被调用");
    }


}

class BBB extends AAA {
    {
        System.out.println("BBB的普通代码块..");
    }

    public BBB() {
        //(1)  super();
        //（2）调用本类的普通代码块
        System.out.println("BBB构造器被调用..");
    }

}

```

6. 我们看一下创建一个子类对象时(继承关系)，他们的静态代码块，静态属性初始化,普通代码块,普通属性初始化,构造方法的调用顺序如下:
   1. 父类的静态代码块和静态属性(优先级一样，按定义顺序执行)
   2. 子类的静态代码块和静态属性(优先级一样，按定义顺序执行)
   3. 父类的普通代码块和普通属性初始化(优先级一样,按定义顺序执行)
   4. 父类的构造器
   5. 子类的普通代码块和普通属性初始化(优先级一样，按定义顺序执行)
   6. 子类的构造方法
7. 静态代码块只能直接调用静态成员(静态成员和静态方法)，普通代码块可以调用任意成员

```java
package com.study8codeblock_;

public class CodeBlackDetail04 {
    public static void main(String[] args) {
        A02 a02=new B02();
        //(1)先加载类
        //1.1先加载父类A02 再加载B02
    }
}
class A02{
    private static int n1=getVal01();
    static{
        System.out.println("A02的一个静态代码块...");//2
    }
    {
        System.out.println("A02的一个普通代码块....");//5
    }
    public int n3=getVal02();
    public static int getVal01(){
        System.out.println("getVal01");//1
        return 10;
    }
    public int getVal02(){
        System.out.println("getVal02");//6
        return 10;
    }
    public A02(){
        System.out.println("A02的构造器");//7
    }
}
class B02 extends A02{
    private static int n1=getVal03();
    static{
        System.out.println("B02的一个静态代码块...");//4
    }
    {
        System.out.println("B02的一个普通代码块....");//8
    }
    public int n4=getVal04();
    public static int getVal03(){
        System.out.println("getVal03");//3
        return 10;
    }
    public int getVal04(){
        System.out.println("getVal04");//9
        return 10;
    }
    public B02(){
        //隐藏了
        //super()
        //普通代码块
        System.out.println("B02的构造器");//10
    }
}
//(1)父类的静态代码块和静态属性
//(2)子类的静态代码块和静态属性
//(3)父类的普通代码块和普通属性初始化
//(4)父类的构造方法
//(5)子类的普通代码块和普通属性初始化
//(6)子类的构造方法

//静态代码块只能直接调用静态成员（静态属性和静态方法），
//普通代码可以调用任意成员
```

## 单例设计模式

### 什么是设计模式

1. 静态方法和属性的经典使用
2. 设计模式是在大量的实践中总结和理论化之后优选的代码结构、编程风格、以及解决问题的思考方式。设计模式就像是经典的棋谱，不同的棋局，我们用不同的棋谱，免去我们自己再思考和摸索

### 什么是单例模式

单例(单个的实例)

1. 所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法
2. 单例模式有两种方式
   1. 饿汉式
   2. 懒汉式

### 单例模式应用实例

步骤如下:

1. 构造器私有化 -》防止直接 new
2. 类的内部创建对象
3. 向外暴露一个静态的公共方法

+ 饿汉式

```java
package com.single_;

public class SingleTon1 {
    public static void main(String[] args) {
//通过方法获取对象
//        GirlFriend instance=GirlFriend.getInstance();
//        System.out.println(instance);
//        GirlFriend instance2=GirlFriend.getInstance();
//       on System.out.println(instance2);
//        System.out.println(instance==instance2);//T
        System.out.println(GirlFriend.n1);
    }
}
//有一个类
class GirlFriend{
    public static int n1=100;
    private String name;
    //饿汉式可能创建了对象 但没有使用
    //为了能在静态方法中，返回gf对象，需要将其修饰为static
    private static GirlFriend gf=new GirlFriend("小红");

    //如何保证我们只能创建一个GirlFriend对象
    //1.将构造器私有化
    //2.在类的内部直接创建
    //3.提供一个公共的静态方法 返回gf对象
    private GirlFriend(String name) {
        System.out.println("构造器被调用");
        this.name = name;
    }
    public static GirlFriend getInstance(){
        return gf;
    }

    @Override
    public String toString() {
        return "GirlFriend{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

+ 懒汉式

```java
package com.single_;

public class SingleTon2 {
    public static void main(String[] args) {
       // System.out.println(Cat.n1);
        Cat instance=Cat.getInstance();
        System.out.println(instance);
        //再次调用getInstance
        Cat instance2=Cat.getInstance();
        System.out.println(instance2);
        System.out.println(instance=instance2);//T
    }
}
//希望在程序运行过程中，只能创建一个Cat对象

class Cat {
    private String name;
    public static int n1=999;
    private static Cat cat;
    //1.将构造器私有化
    //2.定义一个静态属性
    //3.提供一个Public的static方法，可以返回一个Cat对象
    //4.懒汉式，只有当用户使用getInstance时，才返回Cat对象，
    //后面再次调用时，会返回上次创建的Cat对象
    //从而保证了单例
    private Cat(String name) {
        System.out.println("构造器被调用..");
        this.name = name;
    }
    public static Cat getInstance(){
        if(cat==null){
            cat=new Cat("小可爱");
        }
        return cat;
    }

    @Override
    public String toString() {
        return "Cat{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

### 饿汉式VS懒汉式

1. 二者最主要的区别在于创建对象的时机不同:饿汉式是在类加载就创建了对象实例,而懒汉式是在使用时才创建。
2. 饿汉式不存在线程安全问题，懒汉式存在线程安全问题。(后面学习线程后，会完善一把)
3. 饿汉式存在浪费资源的可能。因为如果程序员一个对象实例都没有使用，那么饿汉式创建的对象就浪费了，懒汉式是使用时才创建，就不存在这个问题。
4. 在我们javaSE标准类中，java.lang.Runtime就是经典的单例模式。

## final 关键字

### 基本介绍

final 中文意思:最后的，最终的

final 可以修饰类、属性、方法和局部变量

在某些情况下，程序员可能有以下需求，就会使用到final

1. 当不希望被继承时，可以使用final修饰
2. 当不希望父类的某个方法被子类覆盖/重写(override)时，可以用final关键字修饰
3. 当不希望类的某个属性的值被修改，可以用final修饰
4. 当不希望某个局部变量被修改，可以使用final修饰

```java
package com.study9final_;

public class Final01 {
    public static void main(String[] args) {

    }
}
//如果我们要求A类不能被其他类继承
//可以使用final修饰 A类
 final class A{
}
//class B extends A{
//  ×
//}
class C{
    //如果我们要求hi（）方法 不能被子类 重写
    public final void hi(){

    }
}
class D extends C{

//    public void hi() {
//        System.out.println("重写了C类的hi方法");
//    }
}
//当不希望类的某个属性的值被修改，可以用final修饰
class E{
    public  final double TAX_RATE=0.08;//加final的属性不能改
}
//当不希望某个局部变量被修改时，可以使用final修饰
class F{
    public void cry(){
       final double num=1;
       //num=2;×
    }

}

```

### final使用注意事项和细节讨论

1. final修饰的属性又叫常量，一般用XX_XX_XX来命名
2. final修饰的属性在定义时，必须赋初值，并且以后不能再修改，赋值可以在如下位置之一：
   1. 定义时:如 public final double TAX_RATE=0.08
   2. 在构造器中
   3. 在代码块中
3. 如果final修饰的属性是静态的，则初始化的位置只能是
   1. 定义时
   2. 在静态代码块，不能在构造器中赋值
4. final类不能继承，但是可以实例化对象
5. 如果类不是final类，但是含有final方法，则该方法虽然不能重写，但是可以被继承

```java
package com.study9final_;

public class FinalDetail01 {
    public static void main(String[] args) {
        CC cc = new CC();
         new EE().cal();
    }
}
class AA{
    //1.用final修饰的变量可以在这 （必须赋初值）
    public  final double TAX_RATE=0.08;
    public  final double TAX_RATE2;
    public  final double TAX_RATE3;
    public AA() {
        TAX_RATE2=2;//可以在构造器 里赋值
    }
    {
        TAX_RATE3=88;//可以在代码块 里赋值
    }
}
class BB{
    //如果用final修饰的属性是静态的，则初始化的位置只能是
    //1.定义时
    //2.在静态代码块 不能在构造器中赋值
    public static final double TAX_RATE=0.08;
    public static final double TAX_RATE2;
  //  public static final double TAX_RATE3;
   static  {
       TAX_RATE2=1;
    }
    public BB() {
     //  TAX_RATE3=1;×
    }
}
//final类 不能继承，但是可以实例化
final class CC{}
//如果类不是final类，但是含有final方法，则该方法不能重写，但是类可以继承
//即仍让遵守继承机制
class DD{
    public final void cal(){
        System.out.println("cal()方法");
    }
}
class EE extends DD{

}

```

5. 一般来说，如果一个类已经是final类，就没有必要再将方法修饰成final方法
6. final不能修饰构造方法
7. final和static往往搭配使用，效率更高，不会导致类加载..底层编译器做了优化处理
8. 包装类(Integer,Double,Float,Boolean等都是final),String也是final类

```java
package com.study9final_;

public class FinalDetail02 {
    public static void main(String[] args) {
        System.out.println(BBB.num);
        //包装类String是final类 不能被继承

    }
}
final class AAA{
    //一般来说，如果一个类已经是final类，就没有必要再将方法修饰成final方法
    public void cry(){

    }
    //final不能修饰构造方法
}
//final和static往往搭配使用，效率更高，不会导致类加载，底层编译器做了优化处理
class BBB{
    public final static int num=100;
    static {
        System.out.println("BBB静态代码块 被执行");
    }
}
```

## 抽象类

### 先看一个问题

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/23.png)

```java
package com.study10abstract_;

public class abstract_ {
}
abstract class Animal{
    private String name;

    public Animal(String name) {
        this.name = name;
    }
    //思考：这里eat 这里实现 没有什么意义
    //即父类方法不确定的问题
    //考虑将该方法设计为抽象方法==》abstract
    //===>所谓抽象的的方法就是没有实现
    //===>没有实现 就是没有方法体
    //===>当一个类中存在抽象方法时，需要将该类声明为abstract类
    //===>一般来说 抽象类会被继承 由子类实现抽象方法
    public abstract void eat();

}
```

### 抽象类快速入门

当父类的一些方法不能确定时，可以用abstract关键字来修饰该方法，这个方法就是抽象方法，用abstract来修饰类就是抽象类

我们看看如何把Animal做成抽象类，并让子类Cat类实现

abstract class Animal{

String name;

int age;

abstract public void cry();}

### 抽象类的介绍

1. 用abstract关键字修饰一个类时，这个类就叫抽象类

   访问修饰符 abstract 类名{

   }

2. 用abstract关键字来修饰一个方法时，这个方法就是抽象方法

   访问修饰符 abstract 返回类型 方法名(参数列表);//没有方法体

3. 抽象类的价值更多作用是在于设计，是设计者设计好后，让子类继承并实现抽象类

### 抽象类使用的注意事项和细节讨论

1. 抽象类不能被实例化
2. 抽象类不一定包含abstract方法。也就是说，抽象类可以没有abstract方法
3. 一旦包含了abstract方法，则这个类必须声明为abstract
4. abstract只能修饰类和方法，不能修饰属性和其他的

```java
package com.study10abstract_;

public class AbstractDetail01 {
    //1抽象类不能被实例化
    //new A();×
}
//2抽象类不一定还有abstract方法，也就是说，抽象类可以没有abstract方法
//还可以有实现的方法
abstract class A{
    public void hi(){
        System.out.println("hi");
    }

}
//3一旦类包含了抽象方法，则这个类必须声明为abstract类


//4abstract只能修饰类和方法，不能修饰其他的
```

5. 抽象类可以有任意成员【抽象类本质还是类】
6. 抽象方法不能有主体，既不能实现

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/24.png)

7. 如果一个类继承了抽象类，则它必须实现抽象类的所有抽象方法，除非它自己也声明为abstract类

```java
package com.study10abstract_;

public class AbstractDetail02 {
    public static void main(String[] args) {
        System.out.println("hello");

    }
}
//5抽象类的本质还是类，所以可以有类的各种成员
abstract class D{
    public int n1=10;
    public static String name="frx";
    public void hi(){
        System.out.println("hi");
    }
    public abstract void hello();
    public static void ok(){
        System.out.println("ok");
    }
}
//7如果一个类继承了抽象类，则它必须实现抽象类的所有抽象方法，
//除非他自己也声明为abstract类
abstract class E{
    public abstract void hi();//6
}
abstract class F extends E{

}
class G extends E{
    @Override
    public void hi() {//这里想等于G子类实现了父类E的抽象方法，所谓实现方法 ，就是有语法体

    }
}
//8抽象方法不能使用private,final和static来修饰，因为这些关键字都是和重写相违背的
abstract class H{
    public abstract void hi();//抽象方法
}
```

## 抽象类最佳实现-模块设计模式

### 基本介绍

抽象类体现的就是一种模板模式的设计，抽象类作为多个子类的通用模板，子类在抽象类的基础上进行扩展、改造,但子类总体上会保留抽象类的行为方式。

### 模块设计模式能解决的问题

1. 当功能内部一部分实现是确定，一部分实现是不确定的。这时可以把不确定的部分暴霞出去,让子类去实现
2. 编写一个抽象父类,父类提供了多个子类的通用方法，并把一个或多个方法留给其子类实现，就是一种模板模式.

### 最佳实践

1. 有多个类，完成不同的任务job
2. 要求统计得到各自完成任务的时间
3. 请编程实现

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/25.png)

```java
package com.study10abstract_.testtemplated;

public class TestTemplated {
    public static void main(String[] args) {
        AA aa = new AA();
        aa.calculateTime();
        BB bb = new BB();
        bb.calculateTime();
    }
}

```

```java
package com.study10abstract_.testtemplated;

 abstract public class Template {//抽象类
     public abstract void job();
     public void calculateTime() {
         long start = System.currentTimeMillis();
         job();
         long end = System.currentTimeMillis();
         System.out.println("执行时间=" + (end - start));
     }
}

```

```java
package com.study10abstract_.testtemplated;

public class AA extends Template {
    //计算任务
    //1+...10000
    public void job(){
        //得到开始时间
    //    long start=System.currentTimeMillis();
        long num=0;
        for (long i = 1; i <=1000000; i++) {
            num+=i;

        }
//        long end=System.currentTimeMillis();
//        System.out.println("执行时间="+(end-start));
    }
}

```

```java
package com.study10abstract_.testtemplated;

public class BB extends Template{
    public void job(){
        //得到开始时间
     //   long start=System.currentTimeMillis();
        long num=0;
        for (long i = 1; i <=1000000; i++) {
            num*=i;

        }
//        long end=System.currentTimeMillis();
//        System.out.println("执行时间="+(end-start));
    }
}

```

## 接口

### 为什么有接口

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/26.png)

### 接口快速入门

这样的设计需求在java编程/php/.net/go中也是会大量存在的,我曾经说过,一个程序就是一个世界,在现实世界存在的情况，在程序中也会出现。我们用程序来模拟一下

```java
package com.study11interface_.interface01;

public interface UsbInterface {//接口
    //规定接口的方法
    public void start();
    public void stop();
}

```

```java
package com.study11interface_.interface01;

public class Computer {
    //编写一个方法
    public void work(UsbInterface usbInterface){
        //通过接口 来掉方法
        usbInterface.start();
        usbInterface.stop();

    }
}

```

```java
package com.study11interface_.interface01;

public class Phone implements UsbInterface {
    @Override
    //Phone 类实现UsbInterface
    //1.Phone类需要实现UsbInterface接口 规定/声明的方法
    public void start() {
        System.out.println("手机开始工作");

    }

    @Override
    public void stop() {
        System.out.println("手机停止工作");
    }
}

```

```java
package com.study11interface_.interface01;

public class Camera implements UsbInterface {
    @Override
    public void start() {
        System.out.println("相机开始工作");
    }

    @Override
    public void stop() {
        System.out.println("相机停止工作");
    }
}

```

```java
package com.study11interface_.interface01;

public class Interface01 {
    public static void main(String[] args) {
        Camera camera = new Camera();
        Phone phone = new Phone();
        Computer computer = new Computer();
        computer.work(phone);//把手机接入到计算机
        System.out.println("=============");
        computer.work(camera);//把照相机接入计算机
    }
}

```

### 基本介绍

接口就是给出一些没有实现的方法，封装到一起，到某个类要使用的时候，再根据具体情况把这些方法写出来

语法:

**interface 接口名{**

​	//属性

​	//抽象方法

**}**

**class 类名 implements 接口{**

​	自己属性;

​	自己方法;

​	必须实现的接口的抽象方法

**}**

小结:接口是更加抽象的抽象的类，抽象类里的方法可以有方法体，接口里的所有方法都没有方法体【jdk7.0】。接口体现了程序设计的多态和高内聚低偶合的设计思想。

特别说明:Jdk8.0后接口类可以有静态方法，默认方法，也就是说接口中可以有方法的具体实现

### 接口理解

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/27.png)

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/28.png)

```java
package com.study11interface_.interface03;

public interface DBInterface {//项目经理
    public void connect();//连接方法
    public void close();//关闭方法
}

```

```java
package com.study11interface_.interface03;

public class MysqlDB implements DBInterface{
    @Override
    public void connect() {
        System.out.println("连接MySQL");

    }

    @Override
    public void close() {
        System.out.println("关闭MySQL");

    }
}

```

```java
package com.study11interface_.interface03;

public class OracleDB implements DBInterface{
    @Override
    public void connect() {
        System.out.println("连接oracle");
    }

    @Override
    public void close() {
        System.out.println("关闭close");
    }
}

```

```java
package com.study11interface_.interface03;

public class Interface03 {
    public static void main(String[] args) {
        MysqlDB mysqlDB = new MysqlDB();
        t(mysqlDB);
        OracleDB oracleDB = new OracleDB();
        t(oracleDB);
    }
    public static void t(DBInterface db){
        db.connect();
        db.close();

    }

}

```

### 注意事项和细节

1. 接口不能被实例化
2. 接口中所有的方法是public方法，接口中抽象方法，可以不用abstract修饰

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/29.png)

3. 一个普通类实现接口，就必须将该接口的所有方法都实现
4. 抽象类实现接口，可以不用实现接口的方法

```java
package com.study11interface_.detail;

public class interfaceDetail01 {
    public static void main(String[] args) {

    }
}
//1.接口不能被实例
//2.接口中所有的方法是public方法，接口中抽象方法，可以不用abstract修饰
//3.一个普通类实现接口，就必须将该接口的所有方法都实现
  interface IA{
     public abstract void say();
     void hi();
}
class Cat implements IA{
    @Override
    public void hi() {

    }

    @Override
    public void say() {

    }
}
//4.抽象类去实现方法时，可以不实现接口的抽象方法
abstract class Tiger implements IA{

}
```

5. 一个类同时可以实现多个接口

6. 接口中的属性，只能是fianl的，而且是public static final修饰符。

   比如:int a=1;实际上是public static final int a=1;

7. 接口中属性的访问形式:接口名.属性名

8. 接口不能继承其他的类，但是可以继承多个别的接口

   ```java
   interface A extends B,C{}
   ```

9. 接口的修饰符只能是public和默认，这点和类的修饰符是一样的

```java
package com.study11interface_.detail;

public class interfaceDetail02 {
    public static void main(String[] args) {
        System.out.println(IB.n1);//说明n1 就是static  //7.接口访问属性
//        IB.n1=20;//错 证明n1是final

    }
}
interface IB{
    //6.接口中的属性，只能是final的，而且是public static final 修饰符
    int n1=10;//等价 public static final int n1=10;
    void hi();

}
interface IC{
    void cry();
}
//5.一个类可以实现多个接口
class Pig implements IB,IC{


    @Override
    public void hi() {

    }

    @Override
    public void cry() {

    }
}
//8.接口不能继承其他类，但是可以继承多个别的接口
interface ID extends IB,IC{
}
//9.接口的修饰符只能是public 和默认，这点和类的修饰符是一样的
interface IE{

}
```

### 课堂练习

看看下面代码输出什么

```java
package com.study11interface_.interface04;

public class InterfaceExercise01 {
    public static void main(String[] args) {
        B b = new B();
        System.out.println(b.a);//23
        System.out.println(AA.a);//23
        System.out.println(B.a);//23
    }
}
interface AA{
    int a=23;
}
class B implements AA{

}
```

### 实现接口VS继承类

+ 接口与继承解决的问题不同

继承的价值主要在于:解决代码的复用性和可维护性

接口的价值主要在于:设计，设计好各种规范(方法)，让其他类去实现这些方法

+ 接口比继承更加灵活

接口比继承更加灵活，继承是满足is-a的关系，而接口是=只需满足like-a的关系

+ 接口在一点程度上实现代码解耦[即：接口规范性+动态绑定机制]

### 接口的多态特性

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/oop/30.png)

```java
package com.study11interface_.interface04;

public class InterfacePolyParameter {
    public static void main(String[] args) {
        //接口的多态
        //接口类型的变量if01可以指向实现了IF接口的类的对象实例
        IF if01=new Monster();
        if01=new Car();
        //继承体现的多态
        //父类类型的变量a可以指向继承AAA的子类实例
        AAA a=new BBB();
        a=new CCC();

    }
}

interface IF{

}
class Monster implements IF{

}
class Car implements IF{

}
class AAA{

}
class BBB extends AAA {}
class CCC extends AAA{}
```

+ 多态数组

```java
package com.study11interface_.interface04;

public class InterfacePolyArr {
    public static void main(String[] args) {
        //多态数组(接口类型数组
        USB usb[]=new USB[2];
        usb[0]=new Phone_();
        usb[1]=new Camera_();


        for (int i = 0; i < usb.length; i++) {
            usb[i].work();//动态绑定
            if(usb[i] instanceof Phone_){
                ( (Phone_)usb[i]).cal();
            }
        }



    }
}
interface USB{
   void work();
}
class Phone_ implements USB{



    public void cal() {
        System.out.println("手机可以打电话....");
    }

    @Override
    public void work() {
        System.out.println("手机工作中....");
    }
}
class Camera_ implements USB{

    @Override
    public void work() {
        System.out.println("相机工作中....");
    }
}
```

+ 多态传递

```java
package com.study11interface_.interface04;
/*
演示多态传递现象
 */
public class InterfacePolyPass {
    public static void main(String[] args) {
        //接口类型的变量可以指向，实现了该类的对象实例
        IG ig=new Teacher();
        //如果IG继承了IH的接口，而Teacher实现了IG接口
        //那么。实际相当于Teacher类实现了IH接口
        //这就是所谓的多态接口
        IH ih=new Teacher();

    }
}
interface IH{
    void hi();

}
interface IG extends IH{

}
class Teacher implements IG{

    @Override
    public void hi() {

    }
}
```

## 内部类

如果定义类在局部位置(方法中/代码块) :

1. 局部内部类 
2.  **匿名内部类**

定义在成员位置

1. 成员内部类
2. 静态内部类

### 基本介绍

一个类的内部又完整的嵌套了另一个类结构。被嵌套的类称为内部类(inner class),嵌套其他类的类称为外部类(outer class)。是我们类的第五大成员【思考:类的五大成员是哪些?[属性、方法、构造器、代码块、内部类]】，内部类最大的特点就是可以直接访问私有属性，并且可以体现类与类之间的包含关系，注意:内部类是学习的难点，同时也是重点,后面看底层源码时,有大量的内部类.

### 基本语法

class Outer{  //外部类

​	class Inner{   //内部类

​	}

}

class Other{  		//外部其他类

}

### 快速入门案例

```java
package com.study12.innerclass_;

public class InnerClass01 {//外部其他类
    public static void main(String[] args) {

    }
}
class Outer{//外部类
    private int n1=100;

    public Outer(int n1) {
        this.n1 = n1;
    }

    public void m1(){
        System.out.println("m1方法");
    }
    {//代码块
        System.out.println("代码块....");
    }
    class Inner{//内部类,在Outer类的内部


    }
}
```

### 内部类的分类

+ 定义在外部类局部位置上(比如方法内):

1. 局部内部类(有类名)
2. 匿名内部类(没有类名)

+ 定义在外部类的成员位置上:

1. 成员内部类(没用static修饰)
2. 静态内部类(使用static修饰)

### 局部内部类的使用

说明:局部内部类是定义在外部类的局部位置，比如方法中，并且有类名。

1. 可以直接访问外部类的所有成员,包含私有的

2. 不能添加访问修饰符,因为它的地位就是一个局部变量。局部变量是不能使用修饰符的。但是可以使用final修饰，因为局部变量也可以使用final

3. 作用域:仅仅在定义它的方法或代码块中

4. 局部内部类---访问---->外部类的成员[访问方式:直接访问]

5. 外部类---访问---->局部内部类的成员

   访问方式:创建对象,再访问(注意:必须在作用域内)

   记住:

   1. 局部内部类定义在方法中/代码块\
   2. 作用域在方法体或者代码块中
   3. 本质仍然是一个类

6. 外部其他类---不能访问----->局部内部类（因为局部内部类地位是一个局部变量)

7. 如果外部类和局部内部类的成员重名时，默认遵循就近原则，如果想访问外部类的成员，则可以使用(外部类名.this.成员)去访问

   System.out.println("外部类的n2="+外部类名.this.n2)

```java
package com.study12.innerclass_;
/*
演示局部内部类的使用
 */
public class LocalInnerClass {
    public static void main(String[] args) {
        //演示一把
        Outer2 outer2 = new Outer2();
        outer2.m1();
        System.out.println("Outer02的HashCode="+outer2.hashCode());

    }
}
class Outer2{//外部类
    private int n1=100;
    private void m2(){//私有方法
        System.out.println("Outer02 m2");
    }
    public void m1(){//方法
        //1.局部内部类是定义在外部类的局部位置上，通常在方法 或代码块中
        //3.局部内部类不能添加访问修饰符，但是可以添加final修饰
        //4.作用域：仅仅在定义它的方法或代码块中
        String name="XXX";
        class Inner02{//局部内部类(本之仍然是一个类）
            //2.可以访问外部类的所有成员，包括私有的
            private int n1=200;
            public void f1(){
                //5.局部内部类可以直接访问外部类的成员 比如 下面的n1和 m2方法
                //7.如果外部类和局部内部类的成员重名时，默认遵守就近原则，如果想访问
//                外部类的成员，则可以使用(外部类名.this.成员)去访问
                //Outer.this是外部类的一个对象，即哪个对象调用了m1，Outer02.this就指向了哪个对象
                System.out.println("n1="+n1+"   外部类的n1="+Outer2.this.n1);
                System.out.println("Outer.this hashCode="+Outer2.this.hashCode());
                m2();

            }

        }
        //6.外部类在方法中，可以创建 Inner02对象，然后调用方法
        Inner02 inner02 = new Inner02();
        inner02.f1();
        class Inner03 extends Inner02{

        }

    }
    {//代码块
         class Inner04{

         }

    }

}
```

### 匿名内部类的使用(非常重要)

1. 本质是类
2. 内部类
3. 该类没有名字
4. 同时还是一个对象

说明:匿名内部类是定义在外部类的局部位置，比如方法中，并且没有类名

1. 匿名内部类的基本语法

**new 类或接口(参数列表){**

​	类体

**};**

```java
package com.study12.innerclass_;

/*
演示匿名内部类的使用
 */
public class AnonymousInnerClass {
    public static void main(String[] args) {
        Outer04 outer04 = new Outer04();
        outer04.method();

    }
}
class Outer04{
    private int n1=10;//属性
    public void method(){//方法
        //基于接口的匿名内部类
        //1.想使用IA，并创建对象
        //2.传统方式，写一个类，实现该接口，并创建对象
        //3.需求 Tiger类只是使用一次，后面再不使用
        //4.可以使用匿名内部类来简化开发
        //5.tiger的编译类型？IA
        //5.tiger的运行类型？就是匿名内部类
//        class XXXX implements IA{
//
//            @Override
//            public void cry() {
//                System.out.println("老虎叫唤");
//            }
//        }
        //7.在jdk的底层，在创建匿名内部类 Outer04$1,立马就创建了Outer04$1的实例，并且把地址返回给
        //tiger
        //8.匿名内部类使用一次 就不能使用
        IA tiger= new IA() {
             @Override
             public void cry() {
                 System.out.println("老虎叫唤...");

             }
         };
        System.out.println("tiger的运行类型为"+tiger.getClass());
        tiger.cry();
        //        IA tiger = new Tiger();
//        tiger.cry();

        //演示基于类的匿名内部类
        //分析
        //1.father 编译类型 Father
        //2.father  运行类型为 Outer04$2
        //4.底层会创建匿名内部类
        //4.同时也返回了匿名内部类的对象
       Father father= new Father("Jack"){
           @Override
           public void Test() {
               System.out.println("匿名内部类 重写了test方法");
           }
       };
        System.out.println("father的运行类型为"+father.getClass());
        father.Test();
       //基于抽象类的匿名内部类
       Animal animal= new Animal(){
            @Override
            void eat() {
                System.out.println("小狗吃骨头....");
            }
        };
       animal.eat();


    }
}
interface IA{//接口
    public void cry();
}


//class Tiger implements IA{
//
//    @Override
//    public void cry() {
//        System.out.println("老虎叫唤...");
//    }
//}
//class Dog implements IA{
//
//    @Override
//    public void cry() {
//        System.out.println("小狗汪汪...");
//    }
//}
class Father{//类
    public Father(String name) {
        System.out.println("接收到name="+name);
    }
    public void Test(){

    }
}
abstract class Animal{
    abstract void eat();

}
```

2. 匿名内部类的语法比较奇特，请大家注意，因为匿名内部类既是一个类的定义,同时它本身也是一个对象，因此从语法上看，它既有定义类的特征，也有创建对象的特征，对前面代码分析可以看出这个特点,因此可以调用匿名内部类方法。
3. 可以直接访问外部类的所有成员,包含私有的
4. 不能添加访问修饰符,因为它的地位就是一个局部变量
5. 作用域:仅仅在定义它的方法或代码块中
6. 匿名内部类---访问---->外部类成员[访问方式:直接访问]
7. 外部其他类---不能访问----->匿名内部类（因为匿名内部类地位是一个局部变量)
8. 如果外部类和匿名内部类的成员重名时，匿名内部类访问的话，默认遵循就近原则,如果想访问外部类的成员，则可以使用(外部类名.this.成员)去访问

```java
package com.study12.innerclass_;

public class AnonymousInnerClassDetail {
    public static void main(String[] args) {
        Outer05 outer05 = new Outer05();
        outer05.f1();
        //外部其他类 不能访问匿名内部类
        System.out.println("main类 outer05的hashcode="+outer05.hashCode());

    }
}
class Outer05{
    private int n1=99;
    public void f1(){
        //创建一个基于类的匿名内部类
        //不能添加访问修饰符，因为他的地位就是一个局部变量
        //作用域 ：仅仅在定义它的方法或代码块中
         Person p=new Person(){
             private int n1=88;
            @Override
            public void hi() {
                System.out.println("匿名内部类 重写了hi()方法  n1="+
                        n1+"   外部类的n1="+Outer05.this.n1);
                //Outer05.this 就是调用f1的对象
                System.out.println("Outer05.hashCode="+Outer05.this.hashCode());
            }
        };
         p.hi();//动态绑定，运行类型是 Outer05$1
        //也可以直接调用，匿名内部类本身也是返回对象
        new Person(){
            @Override
            public void hi() {
                System.out.println("匿名内部类 重写了hi()方法 哈哈...");
            }

            @Override
            public void OK(String str) {
                System.out.println("OK");
            }
        }.OK("Jack");
    }
}
class Person{//类
    public void hi(){
        System.out.println("Person hi");
    }
    public void OK(String str){
        System.out.println("Person OK");

    }
}

```

### 匿名内部类的最佳实践

当做实参直接传递，简洁高效

```java
package com.study12.innerclass_;

public class InnerClassExercise01 {
    public static void main(String[] args) {


       f1(new IL() {//1
            @Override
            public void show() {
                System.out.println("这是一幅名画");
            }
        });
        f1(new Picture(){//2
        });

    }


    //静态方法,形参是接口类型
    public static void f1(IL il){
        il.show();


    }
}

//接口
interface IL{
    void show();
}
//类 实现IL
class Picture implements IL{//2
    @Override
    public void show() {
        System.out.println("这是一幅名画");

    }
}
```

### 匿名内部类课堂练习

1. 有一个铃声接口Bell，里面有个ring方法。
2. 有一个手机类Cellphone,具有闹钟功能alarmclock，参数是Bell类型
3. 测试手机类的闹钟功能，通过匿名内部类(对象)作为参数，打印:懒猪起床了
4. 再传入另一个匿名内部类(对象)，打印:小伙伴上课了

```java
package com.study12.innerclass_;

public class InnerClassExercise02 {
    public static void main(String[] args) {
        CellPhone cellPhone = new CellPhone();
        //1.传递的是实现了Bell 接口的匿名内部类
        //2.重写了ring方法
        //3.bell=new Bell() {
        //            @Override
        //            public void ring() {
        //                System.out.println("懒猪起床了");
        //            }
        //        });
        cellPhone.alarmClock(new Bell() {
            @Override
            public void ring() {
                System.out.println("懒猪起床了");
            }
        });
        cellPhone.alarmClock(new Bell() {
            @Override
            public void ring() {
                System.out.println("小伙伴上课");
            }
        });
    }
}

interface Bell {
    void ring();
}
class CellPhone{//类
    public void alarmClock(Bell bell){//形参Bell是接口类型
        System.out.println(bell.getClass());
        bell.ring();//动态绑定
    }

}
```

### 成员内部类的使用

说明:成员内部类是定义在外部类的成员位置，并且没有static修饰

1. 可以直接访问外部类的所有成员，包含私有的
2. 可以添加任意访问修饰符(public、protected、默认、private),因为它的地位就是一个成员
3. 作用域:和外部类的其他成员一样,为整个类体比如前面案例，在外部类的成员方法中创建成员内部类对象，再调用方法.
4. 成员内部类---访问---->外部类成员(比如:属性)[访问方式:直接访问] 
5. 外部类---访问------>成员内部类(说明)访问方式:创建对象，再访问
6. 外部其他类---访问---->成员内部类
7. 如果外部类和内部类的成员重名时，内部类访问的话，默认遵循就近原则，果想访问外部类的成员，则可以使用(外部类名.this.成员)去访问

```java
package com.study12.innerclass_;

public class MemberInnerClass {
    public static void main(String[] args) {
        Outer08 outer08 = new Outer08();
        outer08.t1();

        //外部其他类 使用成员内部类的两种方式
        //第一种方式
        //outer08.new Inner08();相当于把 new Inner08()当做是outer08的成员
        //这就是一个语法
        Outer08.Inner08 inner08 = outer08.new Inner08();
        inner08.say();
        //第二方式 在外部类中 编写一个方法 可以返回Inner08的对象
        Outer08.Inner08 inner08Instance = outer08.getInner08Instance();
        inner08Instance.say();
    }
}
class Outer08{

    private int n1=10;
    public String name="张三";
    //1.成员内部类是定义在外部类的成员位置上
    //2.可以添加任意访问修饰符(public protected默认 private)

    private  void hi(){
        System.out.println("hi方法..");
    }
    class Inner08{//成员内部类
        public double salary=99.9;
        private int n1=66;
        public void say(){
            //可以直接访问外部类的所有成员，包含私有的
            //如果成员内部类的成员 和外部类的成员重名了 遵守就近原则
            //可以通过 外部类名.this.属性 来访问外部类的成员
            System.out.println("n1="+n1+"name="+name+"外部类的n1"+Outer08.this.n1);
            hi();

        }
    }
    //方法 返回一个Inner08实例
    public Inner08 getInner08Instance(){
        return new Inner08();
    }
    //写方法
    public void t1(){
        //使用了成员内部类
        //外部类使用成员内部类 创建成员内部类的对象 然后使用相关的方法
        Inner08 inner08 = new Inner08();
        inner08.say();
        System.out.println(inner08.salary);
    }
}
```

### 静态内部类的使用

说明:静态内部类是定义在外部类的成员位置，并且有static修饰

1. 可以直接访问外部类的所有静态成员，包含私有的，但不能直接访问非静态成员
2. 可以添加任意访问修饰符(public、protected、默认、private),因为它的地位就是一个成员。
3. 作用域:同其他的成员，为整个类体
4. 静态内部类---访问---->外部类(比如:静态属性)[访问方式:直接访问所有静态成员]
5. 外部类---访问------>静态内部类访问方式:创建对象，再访问
6. 外部其他类---访问----->静态内部类
7. 如果外部类和静态内部类的成员重名时，静态内部类访问的时，默认遵循就近原则，如果想访问外部类的成员，则可以使用(外部类名.成员)去访问

```java
package com.study12.innerclass_;

public class StaticInnerClass01 {
    public static void main(String[] args) {
        Outer10 outer10 = new Outer10();
        outer10.m1();
        //外部其他类 使用静态内部类
        //方式一
        Outer10.Inner10 inner10 = new Outer10.Inner10();//考虑访问权限
        inner10.say();
        //方式二
        Outer10.Inner10 inner101 = outer10.getInner10();
        System.out.println("===============");
        inner10.say();
        Outer10.Inner10 inner102 = outer10.getInner10();
        System.out.println("===============");
        Outer10.getInner10_();
        inner102.say();

    }
}
class Outer10{//外部类
    private int n1=10;
    private static  String name="张三";
    //Inner10就是静态内部类
    //1.放在外部类的成员位置
    //2.使用static修饰
    //3.可以访问外部的类的所有静态成员，包含私有的，但不能直接访问非静态成员
    //4.可以添加任意访问修饰符(public protected 默认 private)因为他的地位就是一个成员
    //5.作用域：同其他成员，为整个类体
      static class Inner10{
        private String name="frx";
        public void say() {
            System.out.println(name+"   外部类name="+Outer10.name);
        }

    }
    public void m1(){//外部类访问内部类 创建对象 访问
        Inner10 inner10 = new Inner10();
        inner10.say();
    }
    public Inner10 getInner10(){
        return new Inner10();
    }
    public static Inner10 getInner10_(){
          return new Inner10();
    }
}
```

> 韩顺平老师告诉我们说，成功其实也不难，只要树立一个目标，不需要你是一个很强的人，不需要你很高智商，不需要你是[千里马](https://baike.baidu.com/item/千里马/1384397)，你只要像[老黄牛](https://baike.baidu.com/item/老黄牛/2963282)一样，每天哪怕做一点点，往目标前进一点点，你就会成功。可是成功又很难，因为在通往成功的路上，很少人能够坚持下来。在坚持的过程中，很多人都选择了放弃
>
> 一定要坚持下去!

