---
title: Python 字符串
date: 2021-12-20 18:44:19
permalink: /pages/0c0743/
categories:
  - Python
tags:
  - Python
---
# Python 字符串

## 字符串的驻留机制

+ 字符串

  + 在Python中字符串是基本数据类型，是一个**不可变的字符序列**

+ 什么叫字符串驻留机制呢?

  + **仅保存一份相同且不可变字符串的方法，不同的值被存放在字符串的驻留池中，Python的驻留机制对相同的字符串只保留一份拷贝，后续创建相同字符时，不会开辟空间，而是把该字符串的地址付给新创建的变量**

  ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/09/01.png)

+ 驻留机制的几种情况(交互模式)

  + **字符串的<font color=#DC4040 size=4 face="黑体">长度为0或1</font>时**
  + **<font color=#DC4040 size=4 face="黑体">符合标识符</font>的字符串**
  + **字符串只在<font color=#DC4040 size=4 face="黑体">编译</font>时进行驻留，而非运行时**
  + <font color=#DC4040 size=4 face="黑体">[-5,256]</font>**之间的整数数字**

+ **sys中的intern方法强制2个字符串指向同一个对象**
  
+ **PyCharm对字符串对字符串进行了优化处理**

```python
s1=''
s2=''
s1 is s2 #True

s1='%'
s2='%'
s1 is s2 #True

s1='abc%'  #不符合标识符(数字、字母、下划线)的字符串
s2='abc%'
s1 == s2 #True #内容
s1 is s2 #False 说明 id不同

s1='abcd'
s2='abcd'
s1 == s2 #True

s1='abc'
s2='ab'+'c'              #运行之前就已连接     进行驻留
s3=''.join(['ab','c'])   #程序运行时，通过join()方法连接   运行时 不进行驻留
s1 is s2 #True
s1 is s3 #False

a=-5
b=-5
a is b #True
```

+ **字符串驻留机制的优缺点**
  + <font color=#DC4040 size=4 face="黑体">当需要值相同的字符串时。可以直接从字符串池里拿来使用，避免频繁的创建和销毁，提升效率和节约内存，因此拼接字符串和修改字符串是会比较影响性能的。</font>、
  + <font color=#DC4040 size=4 face="黑体">在需要进行字符串拼接时建议使用str类型的join方法，而非+,因为join()方法是先计算出所有字符中的长度，然后再拷贝，只new一次对象，效率要比"+"效率高</font>

## 字符串的常用操作

### 字符串的查询操作的方法

| 功能     | 方法名称 | 作用                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| 查询方法 | index()  | 查找子串substr第一次出现的位置，如果查找的子串不存在，则抛出ValueError |
|          | rindex() | 查找子串substr最后一次出现的位置，如果查找的子串不存在，则抛出ValueError |
|          | find()   | 查找子串substr第一次出现的位置,如果查找的子串不存在时，则返回-1 |
|          | rfind()  | 查找子串substr最后一次出现的位置，如果查找的子串不存在时，则返回-1 |

```python
"""
@Author :frx
@Time   :2021/10/25 13:53
@Version    :1.0
"""
s='hello.hello'
print(s.index('lo'))  #3  #查找元素第一次出现的位置
print(s.find('lo'))   #3
print(s.rindex('lo')) #9  #查找元素最后一次出现的位置
print(s.rfind('lo'))  #9

# print(s.index('k'))   # 如果不存在 #ValueError: substring not found
print(s.find('k'))    # 如果不存在 -1
# print(s.rindex('k'))  # 如果不存在 ValueError: substring not found
print(s.rfind('k'))   # 如果不存在 -1
```

### 字符串的大小写转换操作的方法

| 功能       | 方法名称     | 作用                                                         |
| ---------- | ------------ | ------------------------------------------------------------ |
| 大小写转化 | upper()      | 把字符串中所有字符都转成大写字母                             |
|            | lower()      | 把字符串中所有字符都转成小写字母                             |
|            | swapace()    | 把字符串中所有大写字母转成小写字母,把所有小写字母都转成大写字母 |
|            | capitalize() | 把第一个字符转换成大写,把其余字符转换成小写                  |
|            | title()      | 把每个单词的第一个字符转换成大写，把每个单词的剩余单词转换成小写 |

```python
"""
@Author :frx
@Time   :2021/10/25 14:19
@Version    :1.0
"""
#字符串中的大小写转换的方法
s='hello,python'
a=s.upper()   #转成大写后，会产生一个新的字符串对象
print(a,id(a))  #HELLO,PYTHON 2608832449392
print(s,id(s))  #hello,python 2290726669104
b=s.lower()  #转换之后会产生一个新的字符串对象
print(b,id(b))   #hello,python 2290729586736
print(s,id(s))                   #hello,python 2290726669104

print(b==s)    #True
print(b is s)  #False

s2='hello,Python'
print(s2.swapcase())  #HELLO,pYTHON
print(s2.title())     #Hello,Python
```

### 字符串内容对齐操作的方法

| 功能       | 方法名称 | 作用                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| 字符串对齐 | center() | 居中对齐,第1个参数指定宽度,第2个参数指定填充符,第2个参数是可选的,默认是空格,如果设置宽度小于实际宽度则返回原字符串 |
|            | ljust()  | 左对齐,第1个参数指定宽度,第2个参数指定填充符,第2个参数是可选的,默认是空格,如果设置宽度小于实际宽度则返回原字符串 |
|            | rjust()  | 右对齐,第1个参数指定宽度,第2个参数指定填充符,第2个参数是可选的,默认是空格如果设置宽度小于实际宽度,则返回原字符串 |
|            | zfill()  | 右对齐,左边用0填充,该方法只接收一个参数,用于指定字符串的宽度,如果指定的宽度小于等于字符串的长度,返回字符串本身 |

```python
"""
@Author :frx
@Time   :2021/10/25 14:53
@Version    :1.0
"""
s='hello,Python'
'''居中对齐'''
print(s.center(20,'*')) #****hello,Python****

'''左对齐'''
print(s.ljust(20,'*'))  #hello,Python********
print(s.ljust(10)) #返回原字符串
print(s.ljust(20)) #hello,Python

'''右对齐'''
print(s.rjust(20,'*'))  #********hello,Python
print(s.rjust(20))      #        hello,Python
print(s.rjust(10))      #返回原字符

'''右对齐,使用0键填充'''
print(s.zfill(20)) #00000000hello,Python
print(s.zfill(10)) #返回原字符串
print('-8910'.zfill(8))  #-0008910

```

### 字符串劈分操作的方法

| 功能         | 方法名称 | 作用                                                         |
| ------------ | -------- | ------------------------------------------------------------ |
| 字符串的劈分 | split()  | 从字符串的左边开始劈分,默认的劈分字符是空格字符串,返回的值都是一个列表 |
|              |          | 以通过参数sep指定劈分字符串是的劈分符                        |
|              |          | 通过参数maxsplit指定劈分字符串时的最大劈分次数,在经过最大次劈分之后,剩余的子串会单独做一部分 |
|              | rsplit() | 从字符串的右边开始劈分,默认的劈分字符是空格字符串,返回的值都是一个列表 |
|              |          | 以通过参数sep指定劈分字符串是劈分符                          |
|              |          | 通过参数maxsplit指定劈分字符串时的最大劈分次数,在经过最大次劈分之后,剩余的子串对单独作为一部分 |

```python
"""
@Author :frx
@Time   :2021/10/25 15:14
@Version    :1.0
"""
s='hello world Python'
lst=s.split()
print(lst)                   #['hello', 'world', 'Python']
s1='hello|world|Python'
print(s1.split(sep='|'))     #['hello', 'world', 'Python']
print(s1.split(sep='|',maxsplit=1))  #['hello', 'world|Python']

print('----------------------------------')
'''rsplit()从右侧开始劈分'''
print(s.rsplit())  #['hello', 'world', 'Python']
print(s1.rsplit(sep='|')) ##['hello', 'world', 'Python']
print(s1.rsplit(sep='|',maxsplit=1))  #['hello|world', 'Python']
```

### 判断字符串操作的方法

| 功能             | 方法名称       | 作用                                                         |
| ---------------- | -------------- | ------------------------------------------------------------ |
| 判断字符串的方法 | isidentifier() | 判断指定的字符串是不是合法的标识符                           |
|                  | isspqce()      | 判断指定的字符串是否全部有空白字符组成(回车、换行、水平制表符) |
|                  | isalpha()      | 判断指定的字符串是否全部有字母组成                           |
|                  | isdecimal()    | 判断指定的字符串是否全部有十进制的数字组成                   |
|                  | isnumeric()    | 判断指定的字符串是否全部由数字组成                           |
|                  | isalnum()      | 判断指定字符串是否全部由字母和数字组成                       |

```python
"""
@Author :frx
@Time   :2021/10/25 15:31
@Version    :1.0
"""
s='hello,python'
print('1.',s.isidentifier()) #False
print('2.','hello'.isidentifier()) #True
print('3.','张三_'.isidentifier())  #True
print('4.','张三_123'.isidentifier())  #True

print('5.','\t'.isspace()) #True
print('6.','abc'.isalpha()) #True
print('7.','张三'.isalpha()) #True
print('8.','张三1'.isalpha()) #False

print('9.','123'.isdecimal()) #True
print('10.','123四'.isdecimal()) #False
print('11.','ⅠⅡⅢ'.isdecimal()) #False

print('12.','123'.isnumeric()) #True
print('13.','123四'.isnumeric()) #True
print('14.','ⅠⅡⅢ'.isnumeric()) #True

print('15.','abc1'.isalnum())  #True
print('16.','张三123'.isalnum()) #True
print('17.','abc~'.isalnum())   #False
```

### 字符串操作的其他方法

| 功能         | 方法名称  | 作用                                                         |
| ------------ | --------- | ------------------------------------------------------------ |
| 字符串替换   | replace() | 第1个参数指定被替换的子串,第2个参数指定替换子串的字符串,该方法返回替换后得到的字符串,替换前的字符串不发生变化,调用该方法时可以通过第3个参数指定最大替换次数 |
| 字符串的合并 | join()    | 将列表或元组的字符串合并成一个字符串                         |

```python
"""
@Author :frx
@Time   :2021/10/25 15:47
@Version    :1.0
"""
s='hello,Python'
print(s.replace('Python','Java'))  #hello,Java
s1='hello,Python,Python,Python'
print(s1.replace('Python','Java',2)) #hello,Java,Java,Python
lst=['hello','java','Python']
print('|'.join(lst)) #hello|java|Python
print(''.join(lst))  #hellojavaPython

t=('hello','java','Python')
print(''.join(t))  #hellojavaPython

print('*'.join('Python')) #P*y*t*h*o*n


```

## 字符串的比较操作									

+ 字符串的比较操作

  + 运算符:<font color=#DC4040 size=4 face="黑体">>,>=,<,<=,==,!=</font>
  + <font color=#DC4040 size=4 face="黑体">比较规则</font>:**首先比较两个字符串中的第一个字符，如果相等则继续比较下一个字符，依次比较下去，直到两个字符串中的字符不相等时，其比较结果就是两个字符串的比较结果，两个字符串中的所有后续字符将不再被比较**
  + <font color=#DC4040 size=4 face="黑体">比较原理</font>:**两上字符进行比较时，比较的是其ordinal value(原始值)调用内置函数ord可以得到指定字符的ordinal value。与内置函数ord对应的是内置函数chr,调用内置函数chr时指定ordinal value可以得到其对应的字符**

  ```python
  """
  @Author :frx
  @Time   :2021/10/25 15:58
  @Version    :1.0
  """
  
  print('apple'>'app')  #True
  print('apple'>'banana') #False
  print(ord('a'),ord('b'))
  print(ord('冯'))
  print(chr(97),chr(98))
  print(chr(20911))
  
  '''==与is的区别'''
  '''==比较的是值
      is 比较的是地址
  '''
  a=b='Python'
  c='Python'
  print(a==b)   #True
  print(a==c)   #True
  print(a is b)  #True
  print(a is c)  #True 驻留机制
  print(id(a))  #2326969553840
  print(id(b))  #2326969553840
  print(id(c))  #2326969553840
  ```
  

## 字符串的切片操作

+ **字符串是不可变类型**
  + <font color=#DC4040 size=4 face="黑体">不具备增、删、改等操作</font>
  + <font color=#DC4040 size=4 face="黑体">切片操作将产生新的对象</font>

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/09/02.png)

```python
"""
@Author :frx
@Time   :2021/10/25 16:14
@Version    :1.0
"""
s='hello,Python'
s1=s[:5] #由于没有指定起始位置，所有从0开始
s2=s[6:] #由于没有指定起始位置，所以切到字符串最后一个元素
s3='!'
newstr=s1+s3+s2
print(s1)  #hello
print(s2) #Python
print('--------------')
print(newstr) #hello!Python
print(id(s))
print(id(s1))
print(id(s2))
print(id(s3))
print(id(newstr))

print('-------------切片[start:stop:step]--------------')
print(s[1:5:1]) # 从1开始截到 5 不包括 5  步长为1 ello
print(s[::2])   #从 0开始截取 到结束 步长为2      hloPto
print(s[::-1])  #默认从字符串的最后一个元素开始 ，到字符串的 第一个元素结束 nohtyP,olleh
print(s[-6::]) #Python
```

## 格式化字符串

### 为什么需要格式化字符串

在python中我们会遇到一个问题，问题是如何输出格式化的字符串。我们经常会输出类似`'亲爱的xxx你好！你xx月的话费是xx，余额是xx'`之类的字符串，而xxx的内容都是根据变量变化的，所以，需要一种简便的格式化字符串的方式。

### 格式化字符串的两种方式

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/09/03.png)

```python
"""
@Author :frx
@Time   :2021/10/25 16:35
@Version    :1.0
"""
#格式化字符串
#(1) % 占位符
name='张三'
age=20
print('我叫%s,今年%d岁'%(name,age)) #我叫张三,今年20岁

#(2) {}
print('我叫{0},今年{1}岁'.format(name,age)) #我叫张三,今年20岁

#(3) f-string
print(f'我叫{name},今年{age}岁') #我叫张三,今年20岁
```

+ 宽度和精度

```python
"""
@Author :frx
@Time   :2021/10/25 16:41
@Version    :1.0
"""
print('%10d'% 99)  #        99     10表示的是宽度
print('hellohello')#hellohello
print('%.3f' % 3.1415926)  #3.142  .3保留三位小数

#同时表示宽度和精度
print('%10.3f'%3.1415926)  #     3.142    总宽度为10，小数点后三位
print('hellohello')        #hellohello


```

```python
"""
@Author :frx
@Time   :2021/10/25 16:48
@Version    :1.0
"""

print('{0:.3}'.format(3.1415926)) #3.14  #.3表示的是 一共是3位数

print('{0:.3f}'.format(3.1415926))  #.3f表示的是3位小数  3.142

#宽度为10，一共有3位小数
print('{0:10.3f}'.format(3.1415926))  #     3.142
print('hellohello')                   #hellohello

```

### 字符串的编码转换

+ 为什么需要编码转换

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/09/04.png)

+ 编码与解码的方式
  + 编码:将字符串转换为二进制数据(bytes)
  + 解码:将bytes类型的数据转换成字符串类型

```python
"""
@Author :frx
@Time   :2021/10/25 16:58
@Version    :1.0
"""
s='天涯共此时'
print(s.encode(encoding='GBK'))  #一个中文占两个字节
# b'\xcc\xec\xd1\xc4\xb9\xb2\xb4\xcb\xca\xb1'
print(s.encode(encoding='UTF-8')) #一个中文占三个字节
# b'\xe5\xa4\xa9\xe6\xb6\xaf\xe5\x85\xb1\xe6\xad\xa4\xe6\x97\xb6'

#解码
#byte代表就是一个二进制数据(字节类型的数据)
byte=s.encode(encoding='GBK')   #编码
print(byte.decode(encoding='GBK'))  #解码  #天涯共此时

byte=s.encode(encoding='UTF-8') #编码
print(byte.decode(encoding='UTF-8')) #解码  #天涯共此时
#用什么编码，就用什么解 

```

