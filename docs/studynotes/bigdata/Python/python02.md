---
title: Python 基础篇(二)
date: 2021-12-20 18:44:19
permalink: /pages/d1e311/
categories:
  - Python
tags:
  - Python
---
# Python 基础篇(二)

## 二进制与字符编码

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/02/01.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/02/02.png)

```python
"""
@Author :frx
@Time   :2021/10/1 18:25
@Version    :1.0
"""
print(chr(0b100111001011000))  #乘
print(ord('乘')) ##20056
```

## Python中的标识符和保留字

+ 我的保留字

  - 有一些单词我赋予了特定的意义，这些单词你在给你的任何对象起名字的时候都不能用

    ```python
    import keyword
    print(keyword.kwlist)
    ```

+ 我的规则你必须知道
  - 变量、函数、类、模块和其它对象的起的名字就叫标识符
  - 规则:
    + 字母、数字、下划线
    + 不能以数字开头
    + 不能是我的保留字
    + 严格区分大小写

## 变量的定义和使用

+ 变量是内存中一个带标签的盒子

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/02/03.png)

+ 变量由三部分组成
  - <font color=#DC4040 size=4 face="黑体">标识:表示对象所存储的内存地址,使用内置函数id(obj)来获取</font>
  - <font color=#DC4040 size=4 face="黑体">类型:表示的是对象的数据类型,使用内置函数type(obj)来获取</font>
  - <font color=#DC4040 size=4 face="黑体">值:表示对象所存储的具体数据， 使用print(obj)可以将值进行打印输出</font>

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/02/04.png)

+ 当多次赋值后,变量名会指向新的空间

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/02/05.png)

## 数据类型

+ 常用的数据类型
  + <font color=#DC4040 size=4 face="黑体">整数类型->int</font>
  + <font color=#DC4040 size=4 face="黑体">浮点数类型->float</font>
  + <font color=#DC4040 size=4 face="黑体">布尔类型->bool->True,False</font>
  + <font color=#DC4040 size=4 face="黑体">字符串类型->str</font>->人生苦短，我用Python:stuck_out_tongue_winking_eye:

+ 整数类型

  + 英文为integer,简写为int,可以表示正数、负数和零

  + 整数的不同进制表示方式

    + 十进制->默认的进制
    + 二进制->以0b开头
    + 八进制->以0o开头
    + 十六进制->以0x开头

    整数的进制

    |   进制   |             基本数              | 逢几进一 | 表示形式  |
    | :------: | :-----------------------------: | :------: | :-------: |
    |  十进制  |       0,1,2,3,4,5,6,7,8,9       |    10    |    118    |
    |  二进制  |               0,1               |    2     | 0b1110110 |
    |  八进制  |         0,1,2,3,4,5,6,7         |    8     |   0o166   |
    | 十六进制 | 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F |    16    |   0x76    |

  ```python
  """
  @Author :frx
  @Time   :2021/10/2 8:25
  @Version    :1.0
  """
  
  ## 整数类型
  ## 可以表示正数，负数，0
  n1=90
  n2=-76
  n3=0
  print(n1,type(n1))
  print(n2,type(n2))
  print(n3,type(n3))
  #整数可以表示为二进制，十进制，八进制，十六进制
  print('十进制',110)
  print('二进制',0b10101111)   #175
  print('八进制',0o176)        #126
  print('十六进制',0x1EAF)
  ```

+ 浮点类型

  - 浮点数由整数部分和小数部分组成

  - 浮点数存储不精确性

    + 使用浮点数进行计算时，可能会出现小数位数不确定的情况

    ```python
    print(1.1+1.2) #3.3000000000000003
    print(1.1+2.1) #3.2
    ```

    + 解决方案
      + 导入模块decimal

    ```python
    from decimal import Decimal
    print(Decimal('1.1')+Decimal('2.2')) #3.3
    ```

+  布尔类型

  + 用来表示真或假的值

  + True表示真，False表示假

  + 布尔值可以转化为整数

    + True->1
    + False->0

    ```python
    print(True+1) #2
    print(False+1)#1
    ```

```python
"""
@Author :frx
@Time   :2021/10/2 8:53
@Version    :1.0
"""
f1=True
f2=False
print(f1,type(f1))
print(f2,type(f2))


# 布尔值可以转成整数计算
print(f1+1) #2       1+1的结果为2，True表示1
print(f2+1) #1       0+1的结果为1，False表示1
```

+ 字符串类型
  + 字符串又被称为不可变的字符序列
  + 可以使用单引号''双引号""三引号'" "'或“”“ ”“”来定义
  + 单引号和双引号定义的字符串必须在一行
  + 三引号定义的字符串可以分布在连续的多行

```python
"""
@Author :frx
@Time   :2021/10/2 9:01
@Version    :1.0
"""

str1='人生苦短，我用Python'
str2="人生苦短，我用Python"
str3="""人生苦短，
        我用Python"""
str4='''人生苦短，
        我用Python'''
print(str1,type(str1))
print(str2,type(str2))
print(str3,type(str3))
print(str4,type(str4))

```

## 数据类型的转换

+ 为什么需要数据类型的转换?
  + 将不同数据类型的数据拼接在一起

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/02/06.png)

```python
"""
@Author :frx
@Time   :2021/10/2 9:12
@Version    :1.0
"""

name='张三'
age=20

print(name,type(name))
print(age,type(int)) #name与age的数据类型不相同
#print('我叫'+name+'今年'+age+'岁')  #当讲str类型与int类型进行连接时，报错，解决方案，类型转换
print('我叫'+name+'今年'+str(age)+'岁') #将int类型通过str()函数转成了str类型

print('---------------------str()将其他类型转成str类型----------------------')
a=10
b=198.8
c=False
print(type(a),type(b),type(c))
print(str(a),str(b),str(c),type(str(a)),type(str(b)),type(str(c)))

print('--------------------int()将其他的类型转int类型-----------------------')
s1='128'
f1=98.7
s2='76.77'
ff=True
s3='hello'
print(type(s1),type(f1),type(s2),type(ff),type(s3))
print(int(s1),type(int(s1)))  #将str转成int类型，字符串为数字
print(int(f1),type(int(f1)))  #将float转成int类型，截取整数部分,舍掉小数部分
#print(int(s2),type(int(s2)))  #将str转成int类型，报错，因为字符串为小数串
print(int(ff),type(int(ff)))
#print(int(s3),type(int(s3))) #将str转成int类型时,字符串必须为字串(整数),非数字串是不允许转换的


print('-------------------------float()函数,将其他类型转为float类型----------------------------')
s1='128.98'
s2='76'
ff=True
s3='hello'
i=98
print(type(s1),type(s2),type(ff),type(s3),type(i))
print(float(s1),type(float(s1)))
print(float(s2),type(float(s2)))
print(float(ff),type(float(ff))) #1.0
# print(float(s3),type(float(s3))) #字符串中的数据如果是非数字串，则不允许转换
print(float(i),type(float(i)))



```

## Python注释

+ 注释

  + 在代码中对代码的功能进行解释说明的标注性文字，可以提高代码的可读性

  + 注释的内容会被Python解释器忽略

  + 通常包括三种类型的注释

    + 单行注释->以"#"开头，直到换行结束
    + 多行注释->并没有单独的多行注释标记，将一对三引号之间的代码称为多行注释

    + 中文编码声明注释->在文件开头加上中文声明注释,用以指定源码文件的编码格式

    ```python
    #coding:gbk
    ```

