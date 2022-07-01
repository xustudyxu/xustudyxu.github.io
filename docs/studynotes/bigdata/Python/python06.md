---
title: Python 列表
date: 2021-12-20 18:44:19
permalink: /pages/0c3637/
categories:
  - Python
tags:
  - Python
---
# Python 列表

## 为什么需要列表

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/06/01.png)

```python
"""
@Author :frx
@Time   :2021/10/15 10:05
@Version    :1.0
"""

a=10 #变量存储的是一个对象的引用
lst=['hello','world',98]  #泪飙可以存储n多个对象的引用
print(id(lst))  #
print(type(lst))  #list
print(lst)    #['hello','world',98]

```

## 列表的创建

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/06/02.png)

```python
"""
@Author :frx
@Time   :2021/10/16 20:08
@Version    :1.0
"""
'''创建列表方式一:使用[]'''
lst=['hello','world',98]

'''创建列表的第二种方式，使用内置函数list()'''

lst2=list(['hello','world',98])

```

## 列表的特点

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/06/03.png)

```python
"""
@Author :frx
@Time   :2021/10/16 20:08
@Version    :1.0
"""
'''创建列表方式一:使用[]'''
lst=['hello','world',98,'hello']
print(lst)
print(lst[0],lst[-4])

'''创建列表的第二种方式，使用内置函数list()'''

lst2=list(['hello','world',98])

```

 ## 列表的查询操作

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/06/04.png)

```python
"""
@Author :frx
@Time   :2021/10/16 21:35
@Version    :1.0
"""
lst=['hello','world',98,'hello']
print(lst.index('hello')) #0  如果列表中有相同的元素,只返回列表中相同元素的第一个元素的索引
# print(lst.index('Python')) #ValueError: 'Python' is not in list
# print(lst.index('hello',1,3)) #ValueError: 'hello' is not in list #表示从 world 和 98 中查找hello 左闭右开
print(lst.index('hello',1,4))

```

```python
"""
@Author :frx
@Time   :2021/10/16 23:25
@Version    :1.0
"""
lst=['hello','world',98,'hello','world',234]
#获取索引为2的元素
print(lst[2])
#获取索引为-3的元素
print(lst[-3])

#获取索引为10的元素
# print(lst[10]) #IndexError: list index out of range

```

### 获取列表的多个元素

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/06/05.png)

```python
"""
@Author :frx
@Time   :2021/10/17 10:28
@Version    :1.0
"""
lst=[10,20,30,40,50,60,70,80]
#start=1,stop=6,step=1  左闭右开
print(lst[1:6:1])   #[20, 30, 40, 50, 60]
print('源列表',id(lst)) #源列表 1610198336192
lst2=lst[1:6:1]
print('切的片段',id(lst2))  #切的片段 1610198336256
print(lst[1:6]) #默认步长为1   #[20, 30, 40, 50, 60]
print(lst[1:6:])             #[20, 30, 40, 50, 60]
#start=1,stop=6,step=2 
print(lst[1:6:2])            #[20, 40, 60]
#stop=6,step=2 start采用默认
print(lst[:6:2])             #[10, 30, 50]
#start=1,step=2 stop采用默认 
print(lst[1::2])             #[20, 40, 60, 80]
print('-----------------step步长为负数---------------------')
print('源列表',lst)           #源列表 [10, 20, 30, 40, 50, 60, 70, 80]
print(lst[::-1])             #[80, 70, 60, 50, 40, 30, 20, 10]
#start=7 stop 省略 step=-1 
print(lst[7::-1])            #[80, 70, 60, 50, 40, 30, 20, 10]
# start=6,stop=0,step=-2
print(lst[6:0:-2])          #[70, 50, 30]
```

### 判断元素是否存在&&元素遍历

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/06/06.png)

```python
"""
@Author :frx
@Time   :2021/10/17 10:54
@Version    :1.0
"""
print('p'in'python')  #True
print('k' not in 'python') #True

lst=[10,20,'python','hello']
print(10 in lst)      #True
print(100 in lst)     #False
print(10 not in lst)  #False
print(100 not in lst) #True
print('------------------------------------')
for item in lst:
    print(item)
```

## 列表元素的增加操作

+ 列表元素的增加操作
  | 方法/其他 | 操作描述                         |
  | --------- | -------------------------------- |
  | append()  | 在列表的末尾中增加一个元素       |
  | extend()  | 在列表的末尾至少添加一个元素     |
  | insert()  | 在列表的任意位置添加一个元素     |
  | 切片      | 在列表的任意位置至少添加一个元素 |

```python
"""
@Author :frx
@Time   :2021/10/17 22:28
@Version    :1.0
"""
# 向列表的末尾加一个元素
lst= [10, 20, 30]
print('添加元素之前',lst,id(lst))
lst.append(100)
print('添加元素之后',lst,id(lst)) #是同一个元素
lst2=['hello','world']
lst.append(lst2)  #将lst2作为一个元素添加到列表的末尾  #[10, 20, 30, 100, ['hello', 'world']]
# lst.extend(lst2)  #向列表的末尾添加多个元素  #[10, 20, 30, 100, 'hello', 'world']
print(lst)

#在任意位置上添加一个元素
lst.insert(1,90)  #在索引为1的位置上 添加1  [10, 90, 20, 30, 100, ['hello', 'world']]
print(lst)

lst3=[True,False,'Hello']
#在任意位置上添加N多个元素
lst[1:]=lst3
print(lst) #[10, True, False, 'Hello']
```

## 列表元素的删除操作

+ 类表的删除操作

| 方法/其他 | 操作描述                           |
| --------- | ---------------------------------- |
| remove()  | 一次删除一个元素                   |
| remove()  | 重复元素只删除第一个               |
| remove()  | 元素不存在抛出ValueError           |
| pop()     | 删除一个指定索引位置上的元素       |
| pop()     | 指定索引不存在抛出IndexError       |
| pop()     | 不指定索引，删除列表中最后一个元素 |
| 切片      | 一次至少删除一个元素               |
| clear()   | 清空列表                           |
| del       | 删除列表                           |

```python
"""
@Author :frx
@Time   :2021/10/17 23:25
@Version    :1.0
"""
lst=[10,20,30,40,50,60,30]
lst.remove(30) #从列表中移出一个元素,如果有重复元素只移除第一个元素
print(lst) #[10, 20, 40, 50, 60, 30]
# lst.remove(100) #ValueError: list.remove(x): x not in list

#pop()根据索引移除元素
lst.pop(1)
print(lst) #[10, 20, 40, 50, 60, 30]
# lst.pop(5) #IndexError: pop index out of range  如果指定的索引位置不存在，将抛出异常
lst.pop()  #如果不写参数的话，会删除列表的最后一个元素 #[10, 40, 50, 60, 30]
print(lst) #[10, 40, 50, 60]

print('---------------------切片操作-删除至少一个元素,将产生一个新的列表对象-----------------')
new_lst=lst[1:3] #获取1-2
print('源列表',lst)  #源列表 [10, 40, 50, 60]
print('切片后的列表',new_lst)  #切片后的列表 [40, 50]

'''不产生新的类表对象，而是删除源列表中的内容'''
lst[1:3]=[]  #获取元素索引1和4列表
print(lst) #[10, 60]

'''清除列表中的所有元素'''
lst.clear()
print(lst) #[]

'''del语句将列表对象删除'''
del lst
# print(lst) #NameError: name 'lst' is not defined
```

## 列表元素的修改操作

+ 列表元素的修改操作
  - **为指定索引的元素赋予一个新值**
  - **为指定的切片赋予一个新值**

```python
"""
@Author :frx
@Time   :2021/10/17 23:57
@Version    :1.0
"""
lst=[10,20,30,40]
#一次修改一个值
lst[2]=100
print(lst)# [10, 20, 100, 40]
lst[1:3]=[300,400,500,600]
print(lst) #[10, 300, 400, 500, 600, 40]
```

## 列表元素的排序操作

+ 列表元素的排序操作
  + 常见的两种方式
    + **调用sort()方法，列表中的所有元素按照从小到大的顺序进行排序，可以指定reverse=True,进行降序操作**
    + **调用内置函数sorted(),可以指定reverse=True,进行降序操作，原列表不发生改变**

```python
"""
@Author :frx
@Time   :2021/10/18 0:13
@Version    :1.0
"""
lst=[20,40,10,98,54]
print('排序前的列表',lst,id(lst)) #排序前的列表 [20, 40, 10, 98, 54]
#开始排序，调用列表对象的sort方法，升序排序
lst.sort()
print('排序后的列表',lst,id(lst)) #排序后的列表 [10, 20, 40, 54, 98]

#通过指定关键字参数，将列表中的元素进行降序排序
lst.sort(reverse=True) #reverse=True 表示降序排序，reverse=False表示升序排序
print(lst) #[98, 54, 40, 20, 10]
lst.sort(reverse=False)
print(lst)


print('----------------使用内置函数sorted()对列表进行排序，将产生一个新的列表对象------------------')
lst=[20,40,10,98,54]
print('原列表',lst)  #原列表 [20, 40, 10, 98, 54]
#开始排序
new_list=sorted(lst)
print(new_list)   #[10, 20, 40, 54, 98]
#指定关键字参数,实现列表元素的降序
desc_list=sorted(lst,reverse=True)
print(desc_list) #[98, 54, 40, 20, 10]
```

## 列表生成式

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/06/07.png)

```python
"""
@Author :frx
@Time   :2021/10/18 0:26
@Version    :1.0
"""

lst=[i*i for i in range(1,10)]  #i*i 表示类表元素的表达式
print(lst) #[1, 4, 9, 16, 25, 36, 49, 64, 81]

'''列表中的元素的值为2,4,6,8,10'''
lst2=[i*2 for i in range(1,6)]
print(lst2)
```

