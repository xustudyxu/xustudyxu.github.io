---
title: Python 元组和集合
date: 2021-12-20 18:44:19
permalink: /pages/c2949b/
categories:
  - Python
tags:
  - Python
---
# Python 元组和集合

## 什么是元组

+ 元组
  + Python内置的数据结构之一，是一个**不可变序列**

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/08/01.png)

+ 不可变序列与可变序列
  - 不可变序列:**字符串、元组**
    - 不变可变序列:**没有增、删、改的操作**
  - 可变序列:**列表、字典**
    - 可变序列:**可以对序列执行增、删、改操作，对象地址不发生更改**

```python
"""
@Author :frx
@Time   :2021/10/22 23:39
@Version    :1.0
"""
''' 不可变序列，可变序列'''
'''可变序列  列表，字典'''
lst=[10,20,45]
print(id(lst))  #2607077621248
lst.append(300)
print(id(lst))  #2607077621248

'''不可变序列 字符串、元组'''
s='hello'
print(id(s))   #2178033099568
s=s+' world'
print(id(s))   #2178035703344
print(s) #hello world
```

## 元组的创建方式

+ 元组的创建方式

  - <font color=#DC4040 size=4 face="黑体">直接小括号</font>

    ```python
    t=('Python','hello',90)
    ```

  + <font color=#DC4040 size=4 face="黑体">使用内置函数tuple()</font>

    ```python
    t=tuple(('Python','hello',90))
    ```

  + <font color=#DC4040 size=4 face="黑体">只包含一个元组的元素需要使用逗号和小括号</font>

    ```python
    t=(10,)
    ```

```python
"""
@Author :frx
@Time   :2021/10/22 23:48
@Version    :1.0
"""
'''元组的创建方式'''
'''第一种；使用小括号()'''
t=('Python','world',98)
print(t)         #('Python', 'world', 98)
print(type(t))   #<class 'tuple'>

#第二种创建方式，使用内置函数tuple()
t1=tuple(('Python','world',98))
print(t1)
print(type(t1))

t2='Python','world',98  #省略了小括号
print(t2)            #('Python', 'world', 98)
print(type(t2))      #<class 'tuple'>

t3='Python',     #如果元组中只有一个元素时，逗号不能省
print(t3)        #('Python',)
print(type(t3))  #<class 'tuple'>

'''空元组的创建方式'''
lst=[]        #空列表
lst1=list()   #空列表

d={}          #空字典
d2=dict()      #空字典

t4=()         #空元组
t5=tuple()    #空元组

print('空列表',lst,lst1) #空列表 [] []
print('空字典',d,d2)     #空字典 {} {}
print('空元组',t4,t5)    #空元组 () ()
```

## 为什么要将元组设计成不可变序列

+ 为什么要将元组设置成不可变序列

  + <font color=#DC4040 size=4 face="黑体">在多任务环境下,同时操作对象时不需要加锁</font>
  + <font color=#DC4040 size=4 face="黑体">因此,在程序中尽量使用不可变序列</font>

  + **注意事项**:元组中存储的是对象的引用
    + <font color=#DC4040 size=4 face="黑体">如果元组中对象本身不可变对象，则不能在引用其他对象</font>
    + <font color=#DC4040 size=4 face="黑体">如果元组中对象是可变对象，则可变对象的引用不允许改变，但数据可以改变</font>

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/08/02.png)

```python
"""
@Author :frx
@Time   :2021/10/23 0:11
@Version    :1.0
"""

t=(10,[20,30],9)
print(t)        #(10, [20, 30], 9)
print(type(t))  #<class 'tuple'>
print(t[0],type(t[0]),id(t[0]))     #10 <class 'int'> 140713469812768
print(t[1],type(t[1]),id(t[1]))     #[20, 30]  <class 'list'> 1458245322240
print(t[2],type(t[2]),id(t[2]))     #9    <class 'int'> 140713469812736

'''尝试将t[1]修改为100'''
print(id(100))
# t[1]=100  #元组是不允许修改元素的
'''由于[20,30]是列表，而类表是可变序列，所以可以向列表中添加元素,而列表的内存地址不变'''
t[1].append(100) #向类表中添加元素
print(t,id(t[1]))     #(10, [20, 30, 100], 9) 1458245322240

```

## 元组的遍历

+ 元组是可迭代对象，所以可以使用for...in进行遍历

  ```python
  t=tuple(('Python','hello',90))
  for item in t:
      print(item)
  ```

```python
"""
@Author :frx
@Time   :2021/10/23 0:25
@Version    :1.0
"""

'''元组的遍历'''
t=('Python','world',98)
'''第一种获取元组的方式，使用索引'''
print(t[0])
print(t[1])
print(t[2])

'''遍历元组'''
for item in t:
    print(item)  #Python
				 #world
				 #98
```

## 什么是集合

+ 集合
  - Python语言提供的内置数据结构
  - 与列表、字典一样都属于**可变类型的序列**
  - **集合是没有value的字典**

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/08/03.png)

## 集合的创建方式

+ 直接{}

  s={'Python','hello',90}

+ 使用内置函数set()

  ```python
  s=set(range(6))
  print(s)
  print(set(List[1,2,3]))
  print(set((1,2,3)))
  ```

```python
"""
@Author :frx
@Time   :2021/10/23 1:34
@Version    :1.0
"""

'''集合的创建方式使用{}'''
s={2,3,4,5,6,7,7}  #集合当中的元素不允许重复
print(s)   #{2, 3, 4, 5, 6, 7}


'''第二种创建方式 使用内置函数set()'''
s1=set(range(6))     #序列转集合
print(s1,type(s1))  #{0, 1, 2, 3, 4, 5} <class 'set'>
s2=set([1,2,3,4,5,6,7,8]) #列表转集合
print(s2,type(s2))  #{1, 2, 3, 4, 5, 6, 7, 8} <class 'set'>
s3=set((1,2,3,4,5,5))    #元组转集合
print(s3,type(s3))           #{1, 2, 3, 4, 5} <class 'set'>
s4=set('Python')        # 字符串转集合
print(s4,type(s4))           #{'y', 'o', 'h', 'n', 'P', 't'} <class 'set'>  #集合中的元素是无序的

s5=set({1,2,3,4,4})
print(s5,type(s5))           #{1, 2, 3, 4} <class 'set'>


#定义空集合
s6={}  #dict字典类型
print(s6,type(s6))  #{} <class 'dict'>

s7=set()
print(s7,type(s7))  #set() <class 'set'>


```

## 集合的相关操作

+ 集合元素的判断操作
  + **in**或**not in**
+ 集合元素的新增操作
  + 调用**add()**方法,**一次添中一个**元素
  + 调用**update()**方法**至少添加一个**元素
+ 集合元素的删除操作
  + 调用**remove()**方法,**一次删除一个指定元素**,如果指定的元素不存在抛出KeyError
  + 调用**discard()**方法,**一次删除一个指定元素**,如果指定的元素不存在不抛异常
  + 调用**pop()**方法,**一次只删除一个任意元素**
  + 调用**clear()**方法,**清空集合**

```python
"""
@Author :frx
@Time   :2021/10/23 1:56
@Version    :1.0
"""
'''集合的相关操作'''
s={10,20,30,40,50}
'''集合元素的判断操作'''
print(10 in s)      #True
print(100 not in s)  #False
'''集合元素的新增操作'''
s.add(80)  #add一次添加一个元素
print(s) #{40, 10, 80, 50, 20, 30}
s.update({100,200})  #update()一次至少添加一个元素
print(s)            #{100, 40, 200, 10, 80, 50, 20, 30}
s.update([300,400])
s.update((500,600))
print(s) #{100, 40, 200, 10, 300, 80, 400, 50, 20, 500, 600, 30}

'''集合元素的删除操作'''
s.remove(100)
#s.remove(1000) #KeyErrorTrue\
s.discard(500)
print(s)  #{40, 200, 10, 300, 80, 400, 50, 20, 500, 600, 30}
s.pop()   #pop任意删除一个元素 pop()不能添加参数
print(s)  #{200, 10, 300, 80, 400, 50, 20, 600, 30}
s.clear()
print(s) #set()
```

## 集合间的关系

+ **两个集合是否相等**
  + 可以使用运算符**==**或**!=**进行判断
+ **一个集合是否是另一个集合的子集**
  + 可以调用方法**issubset**进行判断
  + **B是A的子集**
+ **两个集合是否没有交集**
  + 可以调用方法**isdisjoint**进行判断

```python
"""
@Author :frx
@Time   :2021/10/23 2:13
@Version    :1.0
"""
'''两个集合是否相等'''
s={10,20,30,40}
s2={20,10,40,30}
print(s==s2) #true

'''一个集合是否是另一个集合的子集'''
s1={10,20,30,40,50,60}
s2={10,20,30,40,50}
s3={10,20,30,90}

print(s2.issubset(s1)) #True  #s2是否是s1的子集
print(s3.issubset(s1)) #False

'''一个集合是否是另一个集合的超集'''
print(s1.issuperset(s2)) #True s1是否为s2的超集

'''两个集合是否含有交集'''
print(s2.isdisjoint(s3)) #False  #有交集为False
s4={200,300}
print(s1.isdisjoint(s4)) #没有交集为True

```

## 集合的数学操作

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/08/04.png)

```python
"""
@Author :frx
@Time   :2021/10/23 2:23
@Version    :1.0
"""
#交集
s1={10,20,30,40}
s2={20,30,40,50,60,70}
print(s1.intersection(s2)) #{40, 20, 30}
print(s1 & s2)             #{40, 20, 30}

#并集
print(s1.union(s2)) #{70, 40, 10, 50, 20, 60, 30}
print(s1 | s2)      #{70, 40, 10, 50, 20, 60, 30}
print(s1)    #{40, 10, 20, 30}
print(s2)    #{70, 40, 50, 20, 60, 30}


#差集
print(s1.difference(s2)) #{10}
print(s1-s2)  #{10}

print(s1)
print(s2)

#对称差集
print(s1.symmetric_difference(s2)) #{50, 70, 10, 60}
print(s1^s2)


```

## 集合生成式

+ 用于生成集合的公式

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/08/05.png)

```python
"""
@Author :frx
@Time   :2021/10/23 2:31
@Version    :1.0
"""
#列表生成式
lst=[i*i for i in range(6)]
print(lst) #[0, 1, 4, 9, 16, 25]

#集合生成式
s={i*i for i in range(6)}
print(s)  #{0, 1, 4, 9, 16, 25}

```

## 列表、字典、元组、集合总结

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/08/06.png)

