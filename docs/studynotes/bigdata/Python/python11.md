---
title: Python 异常处理
date: 2021-12-20 18:44:19
permalink: /pages/050858/
categories:
  - Python
tags:
  - Python
---
# Python 异常处理

## Bug的由来及分类

+ Bug的由来
  + 世界上第一部万用计算机的进化版-马克2号(Mrrk ||)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/11/01.png)

+ Debug

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/11/02.png)

### Bug的常见类型

+ 粗心导致的语法错误 SybtaxError

1. 漏了<font color=#DC4040 size=4 face="黑体">末尾的冒号</font>,如if语句，循环语句,else子句等
2. <font color=#DC4040 size=4 face="黑体">缩进错误</font>，该缩进的没缩进，不该缩进的瞎缩进
3. 把<font color=#DC4040 size=4 face="黑体">英文符号</font>写成中文符号，比如说:引号、冒号、括号
4. 字符串拼接的时候，把<font color=#DC4040 size=4 face="黑体">字符串和数字</font>拼在一起
5. 没有<font color=#DC4040 size=4 face="黑体">定义变量</font>，比如说while的循环条件的变量
6. "<font color=#DC4040 size=4 face="黑体">==</font>"比较运算符和"<font color=#DC4040 size=4 face="黑体">=</font>"赋值运算符的混用

+ 知识点不熟练导致的错误

  + 1. 索引越界问题IndexError

    ```python
    lst=[11,22,33,44]
    print(lst[4])
    ```

    2. append()方法的使用掌握不熟练

    ```python
    lst=[]
    lst=append('A','B','C')
    print(lst)
    ```

+ 思路不清晰的问题解决方案

  + 1. 使用print()函数
    2. 使用"#"暂时注释部分代码

    ```python
    """
    @Author :frx
    @Time   :2021/10/27 16:54
    @Version    :1.0
    """
    lst=[{'rating':[9,7,2062397],'id':'1292052','type':['犯罪','剧情'],'title':'肖申克的救赎','actors':['蒂姆 罗宾斯','摩根 弗里曼']},
         {'rating':[9,6,2052387],'id':'1292452','type':['爱情','剧情'],'title':'霸王别姬','actors':['张国荣','张丰毅','巩俐','葛优']},
         {'rating':[9,5,2051887],'id':'1282452','type':['爱情','剧情'],'title':'阿甘正传','actors':['汤姆 汉克斯','罗宾 怀特']},]
    name=input('请输入你要查询的演员:')
    for item in lst:  # 遍历列表 item是一个又一个的字典
        actor_lst=item['actors']
        for actor in actor_lst:
            if name in actor:
                print(name,'出演了',item['title'])
    
    ```

    + 解决方案：
      + 第一层for循环遍历列表可以得到每一部电影,而每一部电影又是一个字典,只需要根据key在字典中取值即可。根据演员的键actors取出学员的列表,使用判断name在列表中是否存在，最后根据电影名称的键title取出电影的名称,进行输出

## Python的异常处理机制

### try...except 结构

+ **单个except结构**

被动掉坑:程序代码逻辑没有错误，只是因为用户错误操作或者一些"例外情况"而导致的程序崩溃

+ 例如:输入两个整数并进行除法运算

  ```python
  a=int(input('请输入第一个整数:'))
  b=int(input('请输入第二个整数:'))
  result=a/b
  print('结果为:',result)
  ```

  + 被动掉坑问题的解决方案
  + Python提供了异常处理机制,可以在异常出现时即时捕获，然后内部'消化',让程序继续运行

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/11/03.png)

```python
"""
@Author :frx
@Time   :2021/10/27 17:21
@Version    :1.0
"""
try:
    a=int(input('请输入第一个整数:'))
    b=int(input('请输入第二个整数:'))
    result=a/b
    print('结果为:',result)
except ZeroDivisionError:
 print('对不起,除数不允许为0')
print('程序结束')
```

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/11/04.png)

```python
"""
@Author :frx
@Time   :2021/10/27 17:27
@Version    :1.0
"""

try:
    a=int(input('请输入第一个整数:'))
    b=int(input('请输入第二个整数:'))
    result=a/b
    print('结果为:',result)
except ZeroDivisionError:
    print('对不起,除数不允许为0')
except ValueError:
    print('只能输入数字串')
print('程序结束')

```

### try...except...else结构

+ <font color=#DC4040 size=4 face="黑体">如果try块中没有抛出异常,则执行else块,如果try中抛出异常，则执行except块</font>

```python
"""
@Author :frx
@Time   :2021/10/27 17:31
@Version    :1.0
"""
try:
    a = int(input('请输入第一个整数:'))
    b = int(input('请输入第二个整数:'))
    result = a / b
except BaseException as e:
    print('出错了',e)
else:
    print('计算结果为:',result)


```

### try...except...else...finally结构

+ <font color=#DC4040 size=4 face="黑体">finally块无论是否发生异常都会被执行，能采用来释放try块中申请的资源</font>

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/11/05.png)

```python
"""
@Author :frx
@Time   :2021/10/27 17:40
@Version    :1.0
"""
try:
    a = int(input('请输入第一个整数:'))
    b = int(input('请输入第二个整数:'))
    result = a / b
except BaseException as e:
    print('出错了',e)
else:
    print('计算结果为:',result)
finally:
    print('谢谢您的使用')
```

## Python中常见的异常类型

| 序号 | 异常类型          | 描述                        |
| ---- | ----------------- | --------------------------- |
| 1    | ZeroDivisionError | 除(获取值)零(所以数据类型)  |
| 2    | IndexError        | 序列中没有此索引(index)     |
| 3    | KeyError          | 映射中没有这个键            |
| 4    | NameError         | 未声明/初始化对象(没有属性) |
| 5    | SyntaxError       | Python语法错误              |
| 6    | ValueError        | 传入无效的参数              |

```python
"""
@Author :frx
@Time   :2021/10/27 17:46
@Version    :1.0
"""
#(1)数学运算异常
# print(10/0) #ZeroDivisionError

lst=[11,22,33,44]
# print(lst[4]) #IndexError 索引从0开始
dic={'name':'张三','age':20}
# print(dic['gender'])  #KeyError
# print(num) #NameError

# int a=20  语法错误 #SyntaxError 语法错误

# a=int('hello') #ValueError 
```

## traceback模块

+ 使用traceback模块打印异常信息

```python
"""
@Author :frx
@Time   :2021/10/27 17:52
@Version    :1.0
"""
# print(10/0)
import traceback
try:
    print('-----------------------------')
    print(1/0)
except:
    traceback.print_exc()
```

## PyCharm开发环境的调试

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/11/06.png)

