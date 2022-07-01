---
title: Python 基础篇(四)
date: 2021-12-20 18:44:19
permalink: /pages/0d04ff/
categories:
  - Python
tags:
  - Python
---
# Python 基础篇(四)

## 程序的组织结构

+  1996年，计算机科学家证明了这样的事实:任何简单或复杂的算法都可以由顺序结构、选择结构和循环结构这三种基本结构组合而成。

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/04/01.png)

### 顺序结构

+ **程序从上到下顺序地执行代码，中间没有任何的判断和跳转,知道程序结束**。

```python
"""
@Author :frx
@Time   :2021/10/10 14:14
@Version    :1.0
"""
'''把大象装冰箱一共分几步'''
print('--------程序开始---------')
print('1.把冰箱门打开')
print('2.把大象放冰箱里')
print('3.把冰箱门关上')
print('--------程序结束---------')
```

### 选择结构

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/04/02.png)

+ 单分支结构

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/04/03.png)

```python
"""
@Author :frx
@Time   :2021/10/10 19:50
@Version    :1.0
"""
money=1000  #余额
s=int(input("请输入取款金额:"))  #取款金额
#判断余额是否充足
if money >=s:
    money=money-s
    print('取款成功~,余额为:',money)
```

+ 双分支结构

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/04/04.png)

```python
"""
@Author :frx
@Time   :2021/10/10 20:11
@Version    :1.0
"""
# 双分支结构if...else 二选一执行
'''从键盘录入一个整数，编写程序让计算机判断是奇数还是偶数'''
num=int(input('请输入一个整数：'))


# 条件判断
if num%2==0:
    print(num,'num是偶数')
else:
    print(num,'num是奇数')

```

+ 多分支结构

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/04/05.png)

```python
"""
@Author :frx
@Time   :2021/10/10 20:29
@Version    :1.0
"""
# 多分支结构 ，多选一执行
''' 从键盘录入一个整数 成绩
    90-100 A
    80-89  B
    70-79  C
    60-69  D
    0-59   E
    小于0大于100为非法数据(不是成绩的有限范围)
    '''
score=int(input('请输入一个成绩:'))
# 判断
if 90 <= score <= 100:
    print('A级')
elif 80 <= score <= 89:
    print('B级')
elif 70<= score<=79:
    print('C级')
elif 60<=score<=69:
    print('D级')
elif 0<=score<=59:
    print('E级')
else:
    print('对不起，成绩有误，不在成绩的有效范围')

```

+ 嵌套if

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/04/06.png)

```python
"""
@Author :frx
@Time   :2021/10/12 20:31
@Version    :1.0
"""

'''会员 >=200 8折
        >=100 9折
            不打折
    非会员 >=200 9.5折
        不打折'''
answer=input("您是会员吗？y/n")
money=float(input("输入你的购物金额:"))
#外层判断是否是会员
if answer=='y':#会员
    if money>=200:
        print('打八折,付款金额为:',money*0.8)
    elif money>=100:
        print('打九折,付款金额:',money*0.9)
    else:
        print('不打折,付款金额为:',money)
else: #非会员
    if money>=200:
        print('打九点五折,付款金额为:',money*0.95)
    else:
        print('不打折,付款金额为:',money)
```

## 对象的布尔值

+ Python一切皆对象，所有对象都有一个布尔值
  + 获取对象的布尔值
    - 使用内置函数<font color=#DC4040 size=4 face="黑体">bool()</font>

+ 以下对象的布尔值为False
  - False
  - 数值()
  - None
  - 空字符串
  - 空列表
  - 空元组
  - 空字典
  - 空集合

```python
"""
@Author :frx
@Time   :2021/10/10 19:33
@Version    :1.0
"""
print('--------------以上对象的布尔值为False----------------')
print(bool(False)) #False
print(bool(0))     #False
print(bool(0.0))   #False
print(bool(None))  #False
print(bool(''))    #False
print(bool(""))
print(bool([]))    #空列表
print(bool(list())) #空列表
print(bool(()))     #空元组
print(bool(tuple()))
print(bool({}))    # 空字典
print(bool(dict()))
print(bool(set())) #空集合


print('-------------------其他对象的布尔值均为True--------------------')
print(bool(18))
print(bool(True))
print(bool('hello world'))
```

## 条件表达式

+ 条件表达式

  + **条件表达式是if...else的简写**

+ 语法结构；

  **x** <font color=#DC4040 size=4 face="黑体">if</font> 判断条件 <font color=#DC4040 size=4 face="黑体">else</font> **y**

+ 运算规则:

  如果判断条件的布尔值为<font color=#DC4040 size=4 face="黑体">True</font>,条件表达式的返回值为<font color=#DC4040 size=4 face="黑体">x</font>,<font color=#DC4040 size=4 face="黑体">否则</font>条件表达式的返回值为<font color=#DC4040 size=4 face="黑体">False</font>

```python
"""
@Author :frx
@Time   :2021/10/12 20:43
@Version    :1.0
"""
'''从键盘录入两个整数,比较两个整数的大小'''
num_a=int(input('请输入第一个整数:'))
num_b=int(input('请输入第二个整数:'))
# 比较大小
'''if num_a >num_b:
    print(num_a,'大于等于',num_b)
else:
    print(num_a,'小于',num_b)'''
print('需要使用条件表达式:')
print(  str(num_a)+'大于等于'+str(num_b) if num_a>=num_b else str(num_a)+'小于'+str(num_b) )
```

## pass 语句

+ pass 语句

  + 语句什么都不做,只是一个占位符，用在语法上需要语句的地方

  + **什么时候使用**

    先搭建语法结构,还没想好代码怎么写的时候

  + **哪些语句一起使用**

    + if语句的条件执行体
    + for-in语句的循环体
    + 定义函数时的函数体

```python
"""
@Author :frx
@Time   :2021/10/13 19:03
@Version    :1.0
"""

# pass语句，什么都不做，
answer=input('请输入您是会员吗?')


# 判断是否为会员
if answer=='y':
    pass
else:
    pass
```



