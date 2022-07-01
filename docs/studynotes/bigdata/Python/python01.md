---
title: Python 基础篇(一)
date: 2021-12-20 18:44:19
permalink: /pages/b9268d/
categories:
  - Python
tags:
  - Python
---
# Python 基础篇(一)

[学习视频地址](https://www.bilibili.com/video/BV1wD4y1o7AS?from=search&seid=3699907135172980455&spm_id_from=333.337.0.0)

## Python中的输出函数

### print()函数

+ 我里面有一个你可以直接使用的函数叫print()，可以将你想展示的东东在IDLE或标准的控制台上显示

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/01/01.png)

### print()的函数的使用

+ print()函数可以输出那些内容?
  1. print()函数输出的内容可以是**数字**
  2. print()函数输出的内容可以是**字符串**
  3. print()函数输出的内容可以是**含有运算符的表达式**
+ print()函数可以将内容输出的目的地
  1. **显示器**
  2. **文件**
+ print()函数的输出形式
  1. **换行**
  2. **不换行**

```python
"""
@Author :frx
@Time   :2021/9/30 20:58
@Version    :1.0
"""
##可以输出数字
print(520)
print(666.666)

##可以输出字符串
print('HelloWorld')
print("HelloWorld")

##含有运算符的表达式
print(3+1) #3和1是操作数 +是运算符

#将数据输出文件中,注意点：
##1.所指定的盘存在
##2.使用file=XX
fp=open('E:/test.txt','a+')##如果文件不存在就创建，存在就在文件内容的后面继续追加
print('HelloWorld',file=fp)
fp.close()

## 不进行换行输出 (输出内容在一行当中)
print('Hello','World','Python')
```

## 转义字符

### 什么是转义字符

+ 就是反斜杠+想要实现的转义功能首字母

### 为什么需要转义字符

+ **当字符串中包含反斜杠、单引号和双引号等有特殊用途的字符时，必须使用反斜杠对这些字符进行转义（转换一个含义)**

  反斜杠:\\\

  单引号:\\'

  双引号:\\"

+ **当字符串中包含换行、回车，水平制表符或退格等无法直接表示的特殊字符时，也可以使用转义字符当字符串中包含换行、回车，水平制表符或退格等无法直接表示的特殊字符时，也可以使用转义字符**

  换行:\n
  
  回车:\r
  
  水平制表符:\t
  
  退格:\b

```python
"""
@Author :frx
@Time   :2021/9/30 21:21
@Version    :1.0
"""
# 转义字符
print('Hello\nWorld') #\ +转义功能的首字母  n-->newLine的首字母表示换行  光标移动到下一行的开头
print('Hello\tWorld')                          #Hello	World
print('Hellooo\tWorld') #四个字符是一个制表位     #Helloooooo World   tab键
print('Hello\rWorld')  #World将Hello进行了覆盖  #World    r-->return光标移动到本行的开头
print('Hello\bWorld')  #\b是退一格，将o干掉了    #HellWorld    b-->键盘上backspace键，回退一个字符

print('http:\\\\www.baidu.com')
print('老师说\‘大家好\’')

#元字符,不希望字符串中的转义字符起作用，就使用原字符，就是在字符串之前加上r或R
print(r'Hello\nWorld')
#注意事项，最后一个字符不能是反斜线
# print(r'Hello\nWorld') 报错
print(r'Hello\nWorld\\')
```

