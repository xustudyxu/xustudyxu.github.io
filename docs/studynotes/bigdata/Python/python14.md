---
title: Python 文件
date: 2021-12-20 18:44:19
permalink: /pages/fc4de7/
categories:
  - Python
tags:
  - Python
---
# Python 文件

## 编码格式的介绍

+ 常见的字符编码格式
  + **Python的解释器使用的是Unicode(内存)**
  + **py文件在磁盘上使用UTF-8存储(外存)**

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/14/01.png)

+ 指定编码格式

  + 在程序的第一行写上#encoding=gbk

  ```python
  #encoding=gbk
  ```

## 文件操作

### 文件的读写原理

+ 文件的读写俗称"IO操作"
+ 文件读写操作流程
+ 操作原理

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/14/02.png)

### 文件的读写操作

+ 内置函数open()创建文件对象

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/14/03.png)

+ 语法规则

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/14/04.png)

1. 创建一个file文件 

   ```dockerfile
   中国
   美丽
   ```

2. 读取

   ```python
   """
   @Author :frx
   @Time   :2021/11/2 19:41
   @Version    :1.0
   """
   file=open('a.txt','r')
   print(file.readlines())  #结果是 一个列表  #['中国\n', '美丽']
   file.close()
   ```

### 常用的文件打开模式

+ 文件的类型
  + 按文件中数据的组织形式,文件分为以下两大类
    + <font color=#DC4040 size=4 face="黑体">文本文件</font>:**存储的是普通"字符"文本,默认为unicode字符集,可以使用记事本程序打开**
    + <font color=#DC4040 size=4 face="黑体">二进制文件</font>:**把数据内容用"字节"进行存储,无法用记事本打开，必须使用专用的软件打开，举例:mp3音频文件，jpg图片.doc文档等**

| 打开模式 | 描述                                                         |
| :------: | ------------------------------------------------------------ |
|    r     | 以只读模式打开文件,文件的指针将会放在文件的开头              |
|    w     | 以只写模式打开文件，如果文件不存在则创建，如果文件存在，则覆盖原有内容，文件指针在文件开头 |
|    a     | 以追加模式打开文件，如果文件不存在则创建，文件指针在文件开头，如果文件存在，则在文件末尾追加内容，文件指针在原文件末尾 |
|    b     | 以二进制方式打开文件，不能单独使用，需要与共它模式一起使用,rb或者wb |
|    +     | 以读写方式打开文件，不能单独使用，需要与其他模式一起使用，a+ |

```python
"""
@Author :frx
@Time   :2021/11/2 19:41
@Version    :1.0
"""
#打开模式w
file=open('b.txt','w')
# file.write('Hello World')
file.write('Python')   #可以发现b.txt的Hello World 变成了 Python
file.close()
```

```python
"""
@Author :frx
@Time   :2021/11/2 19:41
@Version    :1.0
"""
#打开模式a
file=open('b.txt','a')
# file.write('Hello World')
file.write('Python')      #运行两次 你将会看到三个Python(追加了两次)
file.close()
```

```python
"""
@Author :frx
@Time   :2021/11/2 19:41
@Version    :1.0
"""
#打开模式rb
src_file=open('logo.png','rb')
target_file=open('copylogo.png','wb')
print(target_file.write(src_file.read()))
target_file.close()
```

## 文件对象的常用方法

+ 文件对象的常用方法

| 方法名                | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| read([size])          | 从文件中读取size个字节或字符的内容返回,若省略[size]，则读取到文件末尾，即一次读取文件所有内容 |
| readline()            | 从文本文件中读取一行内容                                     |
| readlines()           | 把文本文件中每一行都作为独立的字符串对象，并将这些对象放入列表返回 |
| write(str)            | 将字符串str内容写入文件                                      |
| writelines(s_list)    | 将字符串列表s_list写入文本文件,不添加换行符                  |
| seek(offset[,whence]) | 把文件指针移动到新的位置，offset表示相对于whence的位置:                                  offset:为正往结束方向移动,为负往开始方向移动                                                          whence不同的值代表不同含义:                                                                                        0:从文件开头计算(默认值)                                                                                                    1:从当前位置开始计算                                                                                                        2:从文件尾开始计算 |
| tell()                | 返回文件指针的当前位置                                       |
| flush()               | 把缓冲区的内容写入文件，但不关闭文件                         |
| close()               | 把缓冲区的内容写入文件，同时关闭文件，释放文件对象相关的资源 |

```python
#读
"""
@Author :frx
@Time   :2021/11/2 19:41
@Version    :1.0
"""
file=open('a.txt','r')
# print(file.read())  #读全部
# print(file.readline())  #读一行
print(file.readlines()) #读的内容返回列表返回
file.close()
```

```python
#写
"""
@Author :frx
@Time   :2021/11/2 19:41
@Version    :1.0
"""
file=open('c.txt','a') #追加
# file.write('hello')
lst=['java','go','python']
file.writelines(lst)
file.close()
```

```python
"""
@Author :frx
@Time   :2021/11/2 19:41
@Version    :1.0
"""
file=open('c.txt','r')
file.seek(2)        #文件指针移动到位置2
print(file.read())  #llojavagopython
print(file.tell())  #17
file.close()
```

```python
#flush和close
"""
@Author :frx
@Time   :2021/11/3 22:52
@Version    :1.0
"""
file=open('d.txt','a')
file.write('hello')
file.flush()  #flush 之后可以继续 写入
file.write('World')
file.close() #close之后就不能 继续写代码了
```

## with语句(上下文管理器)

+ **with语句可以自动管理上下文资源,不论什么原因跳出with块,都能确保文件正确的关闭,以此来达到释放资源的目的**

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/14/05.png)

```python
"""
@Author :frx
@Time   :2021/11/3 23:25
@Version    :1.0
"""
print(type(open('a.txt','r')))
with open('a.txt','r') as file:
    print(file.read())

'''
MyContentMgr实现了特殊方法__enter__(),__exit__()称为该类对象遵守了上下文管理器协议
该类对象的实例对象，称为上下文管理器
MyContentMgr()'''
class MyContentMgr(object):
    def __enter__(self):
        print('enter方法被调用执行了...')  #1
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print('exit方法被调用执行了...')   #3

    def show(self):
        print('show方法被调用执行了...')   #2

with MyContentMgr() as file:  #相当于file等于 MyContentMgr()对象
    file.show()
```

```python
"""
@Author :frx
@Time   :2021/11/3 23:37
@Version    :1.0
"""
#文件的复制
with open('logo.png','rb') as src_file:
    with open('copy2logo.png','wb') as target_file:
        target_file.write(src_file.read())
```

## 目录操作

+ **os模块是Python内置的与操作系统功能和文件系统相关的模块，该模块中的语句的执行结果通常与操作系统有关,在不同的操作系统上运行,得到的结果可能不一样**
+ **os模块与os.path模块用于对目录或文件进行操作**

```python
"""
@Author :frx
@Time   :2021/11/3 23:42
@Version    :1.0
"""
#os模块系统相关的一个模块
import os
# os.system('notepad.exe') #记事本
# os.system('calc.exe')    #计算器
# #直接调用可执行文件
os.startfile('D:\\Program Files (x86)\\Tencent\\QQ\\Bin\\QQ.exe') #打开QQ

```

### os模块操作目录相关函数

| 函数                            | 说明                           |
| ------------------------------- | ------------------------------ |
| getcwd()                        | 返回当前的工作目录             |
| listdir(path)                   | 返回指定路径下的文件和目录信息 |
| mkdir(path[,mode])              | 创建目录                       |
| makedirs(path1/path2...[,mode]) | 创建多级目录                   |
| rmdir(path)                     | 删除目录                       |
| removedirs(path1/path2.......)  | 删除多级目录                   |
| chdir(path)                     | 将path设置为当前工作目录       |

```python
"""
@Author :frx
@Time   :2021/11/3 23:48
@Version    :1.0
"""
import os
print(os.getcwd())  #F:\pythonStudy\chapter14
lst=os.listdir('../chapter14') #['a.txt', 'b.txt', 'c.txt', 'copylogo.png', 'demo1.py', 'demo10.py', 'demo12.py', 'demo14.py', 'demo15.py', 'demo16.py', 'demo2.py', 'demo3.py', 'demo4.py', 'demo6.py', 'demo7.py', 'demo8.py', 'demo9.py', 'logo.png', '__init__.py']

print(lst)
# os.mkdir('newdir2')
# os.makedirs('A/B/C')
# os.rmdir('newdir2')
# os.removedirs('A/B/C')
os.chdir('F:\\pythonStudy\\chapter14')
print(os.getcwd())
```

### os.path模块操作目录相关函数

| 函数            | 说明                                                      |
| --------------- | --------------------------------------------------------- |
| abspath(path)   | 用于获取文件或目录的绝对路径                              |
| exists(path)    | 用于判断文件或目录是否存在,如果存在返回True,否则返回False |
| join(path,name) | 将目录与目录或者文件名拼接起来                            |
| splitext()      | 分离文件名和扩展名                                        |
| basename(path)  | 从一个目录中提取文件名                                    |
| dirname(path)   | 从一个路径中提取文件路径,不包括文件名                     |
| isdir(path)     | 用于判断是否为路径                                        |

```python
"""
@Author :frx
@Time   :2021/11/4 0:03
@Version    :1.0
"""
import os.path
print(os.path.abspath('demo17.py')) #F:\pythonStudy\chapter14\demo17.py
print(os.path.exists('demo18.py'))  #False
print(os.path.join('E:\\','demo17.py')) #E:\demo17.py
print(os.path.split('F:\pythonStudy\chapter14\demo17.py')) #('F:\\pythonStudy\\chapter14', 'demo17.py')
print(os.path.splitext('F:\pythonStudy\chapter14\demo17.py')) #('F:\\pythonStudy\\chapter14\\demo17', '.py')
print(os.path.basename('F:\pythonStudy\chapter14\demo17.py')) #demo17.py
print(os.path.dirname('F:\pythonStudy\chapter14\demo17.py'))  #F:\pythonStudy\chapter14
print(os.path.isdir('F:\pythonStudy\chapter14\demo17.py')) #False

```

### 课堂练习

1. 获取指定目录下的所有.py文件

```python
"""
@Author :frx
@Time   :2021/11/4 0:09
@Version    :1.0
"""
#获取指定目录下的所有.py文件
import os
path=os.getcwd()
lst=os.listdir(path)
for filename in lst:
    if filename.endswith('.py'):
        print(filename)

```

2. 获取当前目录下所有的文件以及目录

```python
"""
@Author :frx
@Time   :2021/11/4 0:16
@Version    :1.0
"""
import os
path=os.getcwd()
lst_files=os.walk(path)  #遍历所有的文件以及目录
for dirpath,dirname,filename in lst_files:
  '''  print(dirpath)
    print(dirname)
    print(filename)
    print('-------------------------------------')'''
  for dir in dirname:
      print(os.path.join(dirpath,dir))
  for file in filename:
      print(os.path.join(dirpath,file))
  print('------------------------------------')
```

