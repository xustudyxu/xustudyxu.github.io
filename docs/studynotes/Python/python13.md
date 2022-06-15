---
title: Python 模块与包
date: 2021-12-20 18:44:19
permalink: /pages/dc61e6/
categories:
  - Python
tags:
  - Python
---
# Python 模块与包

## 什么叫模块

+ 模块

  + **模块英文为Modules**
  + 函数与模块的关系
    + **一个模块中可以包含N多个函数**
  + 在Python中一个扩展名为.py的文件就是一个模块
  + 使用模块的好处
    + <font color=#DC4040 size=4 face="黑体">方便其他程序和脚本的导入并使用</font>
    + <font color=#DC4040 size=4 face="黑体">避免函数名和变量名冲突</font>
    + <font color=#DC4040 size=4 face="黑体">提高代码的可维护性</font>
    + <font color=#DC4040 size=4 face="黑体">提高代码的可重复性</font>

## 自定义模块

+ 创建模块

  + 新建一个.py文件,名称尽量不要与Python自带的标准模块名称相同

+ 导入模块

  <font color=#DC4040 size=4 face="黑体">import</font>  **模块名称**  [as别名]

  <font color=#DC4040 size=4 face="黑体">from</font>  **模块名称** <font color=#DC4040 size=4 face="黑体">import</font> **函数/变量/类**  

```python
"""
@Author :frx
@Time   :2021/11/1 19:47
@Version    :1.0
"""
import math  #关于数学运算的模块
print(id(math))
print(type(math))
print(math)
print(math.pi)
print('-------------------------------------')
print(dir(math))
print(math.pow(2,3),type(math.pow(2,3)))  #2的3次方 8.0  float
print(math.ceil(9.001))  #最接近的最大整数 10
print(math.floor(9.999)) #最接近的最小整数 9
```

```python
"""
@Author :frx
@Time   :2021/11/1 19:54
@Version    :1.0
"""
from math import pi
import math
print(pi)
print(pow(2,3))       #如果没有导入math 结果为8
print(math.pow(2,3))  #如果没有导入math 报错  8.0
#或
#from math import pow
#print(pow(2,3))   #8.0
```

+ 自定义模块

```python
"""
@Author :frx
@Time   :2021/11/1 19:59
@Version    :1.0
"""
def add(a,b):
    return a+b
def div(a,b):
    return a/b

#如何导入自己定义的模块
```

```python
"""
@Author :frx
@Time   :2021/11/1 20:00
@Version    :1.0
"""
#在demo5中导入calc自定义模块使用
import calc
print(calc.add(10,20)) #30
print(calc.div(10,4))  #2.5

#或
#from calc import add
# print(add(10,20))
```

## 以主程序形式运行

+ 以主程序形式运行

  + <font color=#DC4040 size=4 face="黑体">在每个模块的定义中都包括一个记录模块名称的变量\_name_，程序可以检查该变量，以确定他们在哪个模块中执行。如果一个模块不是被导入到其它程序中执行，那么它可能在解释器的顶级模块中执行。顶级模块的\_name\_变量的值为\_main\_</font>

  ```python
  if __name__ = '__main__':
      pass
  ```


```python
"""
@Author :frx
@Time   :2021/11/1 22:51
@Version    :1.0
"""
def add(a,b):
    return a+b

if __name__ == '__main__':
    print(add(10,20))  #只有当点击运行calc2时，才会执行运算
```

```python
"""
@Author :frx
@Time   :2021/11/1 22:52
@Version    :1.0
"""
import calc2
print(calc2.add(100,200))
```

## Python中的包

+ Python中的包

  + <font color=#DC4040 size=4 face="黑体">包是一个分层次的目录结构,它将一组功能相近的模块组织在一个目录下</font>

  + **作用**

    + <font color=#DC4040 size=4 face="黑体">代码规范</font>
    + <font color=#DC4040 size=4 face="黑体">避免模块名称冲突</font>

  + **包与目录的区别**

    + <font color=#DC4040 size=4 face="黑体">包含\_int_.py文件的目录称为包</font>
    + <font color=#DC4040 size=4 face="黑体">目录里通常不包含\_init_.py文件</font>

  + **包的引入**

    <font color=#DC4040 size=4 face="黑体">import</font> **包名.模块名**

```python
"""
@Author :frx
@Time   :2021/11/1 23:16
@Version    :1.0
"""
#在demo8的模块中导入 package1包
import package1.module_A as ma #ma是package1.module_A这个模块的别名
# print(package1.module_A.a)
print(ma.a) #模块ma中的a
```

```python
"""
@Author :frx
@Time   :2021/11/1 23:20
@Version    :1.0
"""
#导入带有包的模块时注意事项
import package1
import calc
#在使用import导入的时候，只能跟包名或模块名

from package1 import module_A
from package1.module_A import a
#使用from...import可以导入包，模块，函数，变量
```

## Python中常用的内置函数

| 模块名   | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| sys      | 与Python解释器及其环境操作相关的标准库                       |
| time     | 提供与时间相关的各种函数的标准库                             |
| os       | 提供了访问操作系统服务功能的标准库                           |
| calendar | 提供与日期相关的各种函数的标准库                             |
| urllib   | 用于读取来自网上(服务器)的数据标准库                         |
| json     | 用于使用JSON序列化和反序列化对象                             |
| re       | 用于在字符串中执行正则表达式匹配和替换                       |
| math     | 提供标准算术运算函数的标准库                                 |
| decimal  | 用于进行精确控制运算精度、有效数位和四舍五入操作的十进制运算 |
| logging  | 提供了灵活的记录时间、错误、警告和调试信息等日志信息的功能   |

```python
"""
@Author :frx
@Time   :2021/11/1 23:33
@Version    :1.0
"""
import sys
import time
import urllib.request
import math
print(sys.getsizeof(24))     #28
print(sys.getsizeof(45))     #28
print(sys.getsizeof(True))   #28
print(sys.getsizeof(False))  #24

print(time.time())        #1635780996.9094539
print(time.localtime(time.time())) #time.struct_time(tm_year=2021, tm_mon=11, tm_mday=1, tm_hour=23, tm_min=36, tm_sec=36, tm_wday=0, tm_yday=305, tm_isdst=0)

print(urllib.request.urlopen('http://www.baidu.com').read())

print(math.pi)
```

## 第三方模块的 安装及使用

+ 第三方模块的安装

  <font color=#DC4040 size=4 face="黑体">pip install</font> **模块名**

  > pip install schedule

+ 第三方模块的使用

  <font color=#DC4040 size=4 face="黑体">import</font> **模块名**

```python
"""
@Author :frx
@Time   :2021/11/1 23:43
@Version    :1.0
"""
import time

import schedule
def job():
    print('哈哈____')

schedule.every(3).seconds.do(job) #每隔三秒执行一次job方法
while True:
    schedule.run_pending()
    time.sleep(1)
```

