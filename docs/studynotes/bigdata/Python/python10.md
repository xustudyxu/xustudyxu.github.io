---
title: Python 函数与变量作用域
date: 2021-12-20 18:44:19
permalink: /pages/37511a/
categories:
  - Python
tags:
  - Python
---
# Python 函数与变量作用域

## 函数的创建和调用

+ 什么是函数
  + <font color=#DC4040 size=4 face="黑体">函数就是执行特定任务和以完成特定功能的一段代码</font>
+ 为什么需要函数
  + **复用代码**
  + **隐藏实现细节**
  + **提高可维护性**
  + **提高可读性便于调试**
+ 函数的创建

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/10/01.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/10/02.png)

```python
"""
@Author :frx
@Time   :2021/10/25 17:36
@Version    :1.0
"""
def calc(a,b):
    c=a+b
    return c

result=calc(1,2)
print(result) #3

```

## 函数的参数传递

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/10/03.png)

```python
"""
@Author :frx
@Time   :2021/10/25 17:36
@Version    :1.0
"""
def calc(a,b):  #a,b称为形式参数,简称形参，形参的位置是在函数的定义处
    c=a+b
    return c

result=calc(1,2)  #1,2称为实际参数,简称实参,实参的位置是在函数的调用处
print(result) #3

res=calc(b=10,a=20)  #=左侧的变量的名称称为 关键字参数
print(res)

```

## 函数调用的参数传递内存分析

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/10/04.png)

```python
"""
@Author :frx
@Time   :2021/10/26 16:24
@Version    :1.0
"""
def fun(arg1,arg2):
    print('arg1',arg1) #arg1 11
    print('arg2',arg2) #arg2 [22,33,44]

    arg1=100
    arg2.append(10)
    print('arg1',arg1) #arg1 11
    print('arg2',arg2) #arg2 [22, 33, 44,10]
    #return


n1=11
n2=[22,33,44]
print('n1',n1) #n1 11
print('n2',n2) #n2 [22, 33, 44]
fun(n1,n2)  #叫位置传参  arg1,arg2是函数定义的形参,n1,n2是函数调用的实参  总结：实参名称和形参名称不一致
print('n1',n1)   #n1 11
print('n2',n2)   #n2 [22, 33, 44, 10]

'''
在函数调用过程中，进行参数的传递
如果是不可变对象，在函数体的修改不会影响实参的值 arg1的修改为100，不会影响n1的值
如果是可变对象，在函数体内的修改会影响到修改到实参的值  arg2的修改 append()会影响到n2的值'''

```

## 函数的返回值

### 函数返回多个值时，结果为元组

```python
"""
@Author :frx
@Time   :2021/10/26 16:47
@Version    :1.0
"""
def fun(num):
    odd=[] #奇数
    even=[] #偶数
    for i in num:
        if i%2:
            odd.append(i)
        else:
            even.append(i)
    return odd,even

#函数的调用
lst=[10,29,34,23,44,54,55]
print(fun(lst))

'''
函数的返回值
(1) 如果函数没有返回值[函数执行完毕之后，不需要给调用处提供数据] return可以省略不写
(2) 函数的返回值，如果是一个，直接返回类型
(3) 函数的返回值如果是多个,返回的结果为元组
'''

def fun1():
    print('hello')

fun1()

def fun2():
    return 'hello'

print(fun2())

def fun3():
    return 'hello','world'
print(fun3())

'''函数在定义时 是否需要返回值 视情况而定'''



```

## 函数的参数定义

 ### 函数定义默认值参数

+ 函数定义时，给形参设置默认值，只有默认值不符的时候才需要传递实参

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/10/05.png)

```python
"""
@Author :frx
@Time   :2021/10/26 17:16
@Version    :1.0
"""
def fun(a,b=10): #b称为默认值参数
    print(a,b)

#函数的调用
fun(100)
fun(20,30)

print('hello',end='\t')
print('world')

```

### 个数可变的位置参数

+ <font color=#DC4040 size=4 face="黑体">定义参数时,可能无法事先确定传递的位置参数的个数时,使用可变的位置参数</font>
+ <font color=#DC4040 size=4 face="黑体">使用*定义个数可变的位置形参</font>
+ <font color=#DC4040 size=4 face="黑体">结果为一个元组</font>

### 个数可变的关键字形参

+ <font color=#DC4040 size=4 face="黑体">函数时，无法确定传递的关键字实参的个数时，使用可变的关键字形参</font>
+ <font color=#DC4040 size=4 face="黑体">使用**定义个数可变的关键字形参</font>
+ <font color=#DC4040 size=4 face="黑体">结果为一个字典</font>

```python
"""
@Author :frx
@Time   :2021/10/26 17:23
@Version    :1.0
"""

def fun(*args):  #函数定义时 可变的位置参数
    print(args)
    #print(args[0])

fun(10)
fun(10,20,30) #结果为元组

def fun1(**args):
    print(args)  #{'a': 10}
                 #{'a': 20, 'b': 20, 'c': 30}

fun1(a=10)
fun1(a=20,b=20,c=30)


print('hello','world','java')

'''def fun2(*args,*a):   
    pass''' #会报错 个数可变的位置参数只能是一个

'''def fun2(**args,**args)
    pass''' #个数可变的关键字参数 只能是一个

def fun2(*args1,**args2):
    pass

'''def fun3(**args1,*args2):
    pass''' #在一个函数的定义过程中，既有个数可变的关键字形参，
            #也有个数可变的位置形参
            #要求:个数可变的位置形参，放在个数可变的关键字形参之前


```

+ 函数参数定义总结

```python
"""
@Author :frx
@Time   :2021/10/26 17:38
@Version    :1.0
"""
def fun(a,b,c): #a,b,c 在函数的定义处,所以是形式参数
    print('a=',a)
    print('b=',b)
    print('c=',c)

#函数的调用
fun(10,20,30)  #函数调用时的参数传递，称为位置传参
lst=[11,22,33]
fun(*lst) #在函数调用时，将列表中的每个元素都转换为位置实参传入

print('--------------------------')
fun(a=100,c=300,b=200)  #函数的调用，所以是关键字实参
dic={'a':111,'b':222,'c':333}
fun(**dic)  #在函数调用时，将字典中的键值对都转换为关键字实参传入


```

```python
"""
@Author :frx
@Time   :2021/10/26 17:47
@Version    :1.0
"""
def fun(a,b=10): #b是在函数的定义处，所以b是形参，而且进行了赋值，所以b称为默认值形参
    print('a=',a)
    print('b=',b)

def fun2(*args): #个数可变的位置形参
    print(args)

def fun3(**args2): #个数可变的关键字形参
    print(args2)

fun2(10,20,30,40) #(10,20,30,40)
fun3(a=11,b=22,c=33,d=44,e=55) #{'a': 11, 'b': 22, 'c': 33, 'd': 44, 'e': 55}

def fun4(a,b,*,c,d):  #从*之后的参数 在函数调用时，只能采用关键字参数传递
    print('a=',a)
    print('b=',b)
    print('c=',c)
    print('d=',d)


#调用fun4函数
# fun4(10,20,30,40)  #位置实参传递
fun4(a=10,b=20,c=30,d=40) #关键字实参传递
fun4(10,20,c=30,d=40)  #前两个参数采用位置实参传递，而c,d采用关键字实参传递
'''需求:c,d只能采用关键字实参传递'''

'''函数定义的形参的顺序问题'''
def fun5(a,b,*,c,d,**args):
    pass
def fun6(*args,**args2):
    pass
def fun7(a,b=10,*args,**args2):
    pass


```

## 变量的作用域

+ 变量的作用域是什么?
  + **程序代码能访问改变量的区域**
  + 根据变量的有效范围可分为
    + **局部变量**
      + <font color=#DC4040 size=4 face="黑体">在函数定义并使用的变量，只在函数内部有效，局部变量使用global声明，这个变量就成全局变量</font>
    + **全局变量**
      + <font color=#DC4040 size=4 face="黑体">函数体外定义的变量，可作用于函数内外</font>

```python
"""
@Author :frx
@Time   :2021/10/26 18:11
@Version    :1.0
"""

def fun(a,b):
    c=a+b  #c就成为局部变量，因为c在是函数体内进行定义的变量，
            # a,b为函数的形参,作用范围也是函数内部,相当于局部变量
    print(c)

#print(c) #报错 因为a,c 超出了起作用的范围(超出了作用域)
#print(a)

name='hhhh'  #name作用范围为函数的内部和外部都可以使用 称为全局变量
print(name)
def fun2():
    print(name)

fun2()

def fun3():
    global age  #函数内部定义的变量，局部变量，
    age=20      #局部变量使用global声明，这个变量实际上就变成了全局变量
    print(age)
fun3()
print(age)
```

## 递归函数

+ 什么是递归函数
  + <font color=#DC4040 size=4 face="黑体">如果在一个函数的函数体内调用了该函数本身,这个函数就称为递归函数</font>
+ 递归的组成部分
  + <font color=#DC4040 size=4 face="黑体">递归调用与递归终止条件</font>
+ 递归的调用过程
  + <font color=#DC4040 size=4 face="黑体">每递归调用一次函数,都会在栈内存分配一个栈帧</font>
  + <font color=#DC4040 size=4 face="黑体">每执行完一次函数,都会释放相应的空间</font>
+ 递归的优缺点
  + 缺点:占用内存多，效率低下
  + 优点:思路和代码简单

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/10/06.png)

```python
"""
@Author :frx
@Time   :2021/10/26 18:38
@Version    :1.0
"""

def fac(n):
    if n==1:
        return 1
    else:
        return n*fac(n-1)

print(fac(6))


```

### 斐波那契数列

```python
"""
@Author :frx
@Time   :2021/10/26 18:57
@Version    :1.0
"""

def fib(n):
    if n==1:
        return 1
    elif n==2:
        return 1
    else:
        return fib(n-1)+fib(n-2)

#斐波那契数列第6位上的数字
print(fib(6)) #8

#输出这个数列前六位上的数字

print('-----------------------')
for i in range(1,7):
    print(fib(i))

```

