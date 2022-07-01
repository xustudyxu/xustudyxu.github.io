---
title: Python 字典
date: 2021-12-20 18:44:19
permalink: /pages/c424c4/
categories:
  - Python
tags:
  - Python
---
# Python 字典

## 什么是字典

+ 字典
+ **Python内置的数据结构之一,与列表一样是一个可变序列**
+ **以键值对的方式存储数据，字典是一个**<font color=#DC4040 size=4 face="黑体">无序</font>**的序列**

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/07/01.png)

+ 字典示意图

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/07/02.png)

+ 字典的实现原理
  - **字典的实现原理与查字典类似，查字典是先根据部首或拼音查找汉字对应的页码。Python中的字典是根据key查找value所在的位置**

## 字典的创建

+ 最常用的方式:<font color=#DC4040 size=4 face="黑体">使用花括号</font>

```python
score={ '张三':100,'李四':98,'王五':45}
```

+ <font color=#DC4040 size=4 face="黑体">使用内置函数dict()</font>

```python
dict( name='jack',age=20)
```

```python
"""
@Author :frx
@Time   :2021/10/18 22:25
@Version    :1.0
"""
'''字典的创建方式'''
'''使用{}创建字典'''
scores={'张三':100,'李四':98,'王五':45}
print(scores)
print(type(scores))

'''第二种创建dict()'''
student=dict(name='jack',age=20)
print(student)

'''空字典'''
d={}
print(d)
```

   ## 字典的常用操作

### 字典中元素的获取

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/07/03.png)

### **[]如果字典中不存在指定的key,抛出keyError异常**

- **get()方法取值，如果字典中不存在指定的key,并不会抛出keyError而是返回None,可以通过参数设置默认的value，以便指定的key不存在时返回**

```python
"""
@Author :frx
@Time   :2021/10/19 19:28
@Version    :1.0
"""

'''获取字典中的值'''
scores={'张三':100,'李四':98,'王五':45}
'''第一种方式，使用[]'''
print(scores['张三']) #100
# print(scores['陈六']) #KeyError: '陈六'

'''第二种方式 使用get()方法'''
print(scores.get('张三')) #100
print(scores.get('陈六')) #None
print(scores.get('麻七',99))  #99是在查找'麻七'不存在时，提供的对应值
```

### 字典的增删改

+ key的判断

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/07/04.png)

+ 字典元素的删除

```python
del scores['张三']
```

+ 字典元素的新增

```python
scores['Jack']=90
```

```python
"""
@Author :frx
@Time   :2021/10/19 19:40
@Version    :1.0
"""
'''键的判断'''
scores={'张三':100,'李四':98,'王五':45}
print('张三' in scores) #True
print('张三' not in scores) #False

del scores['张三'] #删除指定的键值对
# scores.clear()  #清空字典的元素
print(scores)

scores['陈六']=98 # 新增元素
print(scores)

scores['陈六']=100  #修改元素
print(scores)
```

 ### 字典的视图操作

+ 获取字典视图的三个方法

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/07/05.png)

```python
"""
@Author :frx
@Time   :2021/10/19 20:17
@Version    :1.0
"""
scores={'张三':100,'李四':98,'王五':45}
#获取所有的键
keys=scores.keys()
print(keys)  #dict_keys(['张三', '李四', '王五'])
print(type(keys)) #<class 'dict_keys'>
print(list(keys)) #将所有键key 组成的视图转成类表

#获取所有的values
values=scores.values()
print(values)        #dict_values([100, 98, 45])
print(type(values))  #<class 'dict_values'>
print(list(values))

#获取所有的键值对
items=scores.items()
print(items)
print(list(items)) #元组()  转换之后的元素是由元组组成的

```

### 字典元素的遍历

```python
for item in scores:
    print(item)
```

```python
"""
@Author :frx
@Time   :2021/10/19 22:08
@Version    :1.0
"""

#字典元素的遍历
scores={'张三':100,'李四':98,'王五':45}
#字典元素的遍历
for item in scores:
    print(item,scores[item],scores.get(item))

```

## 字典的特点

+ 字典的特点
  - <font color=#DC4040 size=4 face="黑体">字典中的所有元素都是一个key-value对，key不允许重复,value可以重复</font>
  - <font color=#DC4040 size=4 face="黑体">字典中的元素都是无序的</font>
  - <font color=#DC4040 size=4 face="黑体">字典中的key必须是不可变对象</font>
  - <font color=#DC4040 size=4 face="黑体">字典也可以根据需要动态地伸缩</font>
  - <font color=#DC4040 size=4 face="黑体">字典会浪费较大的内存，是一种使用空间换时间的数据结构</font>

```python
"""
@Author :frx
@Time   :2021/10/19 22:15
@Version    :1.0
"""

d={'name':'张三','name':'李四'} #key不晕重复 会出现值覆盖
print(d)  #{'name': '李四'}

d={'name':'张三','nikename':'张三'}  #value可以重复
print(d)  #{'name': '张三', 'nikename': '张三'}

lst=[10,20,30]
lst.insert(1,100)
print(lst) #10,100,20,30

# d={lst:100} #TypeError: unhashable type: 'list' key必须是不可变对象
# print(d)

```

## 字典生成式

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/07/06.png)

+ 内置函数zip()
  - **用于将可迭代的对象作为参数,将对象中对应的元素打包成一个元祖,然后返回由这些返回由这些元组组成的列表**

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/07/07.png)

```python
"""
@Author :frx
@Time   :2021/10/19 22:28
@Version    :1.0
"""

items=['Fruits','Books','Others']
price=[96,78,85,100,120]

d={item.upper():price for item,price in zip(items,price)} #以元素少 的列 进行生成
print(d)   #{'FRUITS': 96, 'BOOKS': 78, 'OTHERS': 85}

```

