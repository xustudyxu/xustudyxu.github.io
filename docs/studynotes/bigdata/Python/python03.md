---
title: Python 基础篇(三)
date: 2021-12-20 18:44:19
permalink: /pages/79ec39/
categories:
  - Python
tags:
  - Python
---
# Python 基础篇(三)

## Python的输入函数input()

+ input()函数的介绍

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/01.png)

+ input()函数的基本使用

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/02.png)

```python
"""
@Author :frx
@Time   :2021/10/3 11:23
@Version    :1.0
"""
# 从键盘录入两个整数,计算两个整数的和
a=int(input('请输入一个加数:'))
# a=int(a)
b=int(input('请输入另一个加数:'))
# b=int(b)
print(type(a),type(b))
print(a+b)

```

## Python中的运算符

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/03.png)

### 算术运算符

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/04.png)

```python
"""
@Author :frx
@Time   :2021/10/3 14:27
@Version    :1.0
"""
print(1+1)  #执行加法运算
print(1-1)   # 减法运算
print(1*2)   # 乘法运算
print(1/2)   # 除法运算
print(11//2)  # 整除运算
print(11%2)   # 取余 1
print(2**2)  # 2的2次方 4
print(2**3)  # 2的3次方 8
```

| 运算符 |          表示          |         例子          | 结果 |
| :----: | :--------------------: | :-------------------: | :--: |
|   +    |           加           |          1+1          |  2   |
|   -    |           减           |          1-1          |  0   |
|   *    |           乘           |          2*4          |  8   |
|   /    |           除           |          1/2          | 0.5  |
|   %    |  取余(一正一负要公式)  |          9%4          |  1   |
|   %    |  余数=被除数-除数*商   | 9%-4      9-(-4)*(-3) |  -3  |
|   **   |         幂运算         |         2**3          |  8   |
|   //   | 整数(一正一负向下取整) |         11/2          |  5   |
|   //   | 整数(一正一负向下取整) |         9//-4         |  -3  |
|   //   | 整数(一正一负向下取整) |         -9//4         |  -3  |

```python
"""
@Author :frx
@Time   :2021/10/3 14:47
@Version    :1.0
"""

print(9//4)    #2
print(-9//-4)  #2
print(9//-4)  #-3
print(-9//4)   #-3  一正一负的整数公式，向下取整

print(9%-4)   #-3   公式: 余数=被除数-除数*商  9-(-4)*(-3)   9-12  -3
print(-9%4)  #3                            -9-4*(-3)    -9-(-12) 3
```

### 赋值运算符

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/06.png)

```python
"""
@Author :frx
@Time   :2021/10/9 14:08
@Version    :1.0
"""
# 赋值运算符 运算顺序 从右到左
i=3+4
print(i)

a=b=c=20 #链式赋值
print(a,id(a))
print(b,id(b))
print(c,id(c))
print('-----------------参数赋值---------------')
a=20
a+=30 #相当于a=a+30
print(a)   # 相当于a=1-10
a-=10
print(a)
a*=2   # 相当于  a=a*2
print(a)
a/=3
print(a)
print(type(a))
a//=2
print(a)
print(type(a))
a%=3
print(a)

print('----------------解包赋值----------------')
a,b,c=20,30,40 #值和变量个数相等
print(a,b,c)

# a,b=20,30,40 报错
print('--------------交换两个变量的值---------------')
a,b=10,20
print('交换之前:',a,b)
# 交换
a,b=b,a
print('交换之后:',a,b)

```

### 比较运算符

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/07.png)

```python
"""
@Author :frx
@Time   :2021/10/9 15:32
@Version    :1.0
"""

# 比较运算符的结果为bool类型
a,b=10,20
print('a>b',a>b)  #False
print('a<b',a<b)  # True
print('a<=b',a<=b) # True
print('a>=b',a>=b) # False
print('a==b',a==b)  # False
print('a!=b',a!=b)  # True

'''一个 =称为赋值运算符，==称为比较运算符
 一个变量有三部分组成，标识，类型，值
 == 比较的是值
 比较对象的标识 使用  is
 '''

a=10
b=10
print(a==b) # True 说明a与b的value相等
print(a is b) # True 说明a与b的id标识，相等


lst1=[11,22,33,44]
lst2=[11,22,33,44]
print(lst1==lst2) #value   True
print(lst1 is lst2) #id   False
print(id(lst1))
print(id(lst2))

print(a is not b) # False  意思是:a的id和b的id结果是不相等的
print(lst1 is not lst2) #  True
```

### 布尔运算符

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/08.png)

| 运算符 | 运算数 |       | 运算结果 | 备注                                    |
| ------ | ------ | ----- | -------- | --------------------------------------- |
| and    | True   | True  | True     | 当两个运算数都为True时,运算结果才为True |
|        | True   | False | False    |                                         |
|        | False  | True  | False    |                                         |
|        | False  | False | False    |                                         |
| or     | True   | True  | True     | 只要有一个运算符为True,运算结果就为True |
|        | True   | False | True     |                                         |
|        | False  | True  | True     |                                         |
|        | False  | False | False    |                                         |
| not    | True   |       | False    | 如果运算符为True,运算结果为False        |
|        | False  |       | True     | 如果运算符为False,运算结果为True        |

### 位运算符

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/09.png)

```python
"""
@Author :frx
@Time   :2021/10/9 21:57
@Version    :1.0
"""

a,b=1,2
print('---------------and并且-----------------')
print(a==1 and b==2) #True  True True ->True
print(a==1 and b<2) # True  False -> False
print(a!=1 and b==2) # False True -> False
print(a!=1 and b!=2) # False False -> False

print('---------------or或者------------------')
print(a==1 or b==2)  # True True ->True
print(a==1 or b<2)  # True False -> True
print(a!=1 or b==2) # False True ->True
print(a!=1 or b!=2) # False False -> False


print('----------------not取反 对bool类型操作数取反----------------')
f=True
f2=False
print(not f) #False
print(not f2) # True

print('---------------- in 与 not in --------------------')
s='HelloWorld'
print('w'in s)  #F
print('k' in s) #F
print('W' not in s) #F
print('b' not in s) #T
```

```python
"""
@Author :frx
@Time   :2021/10/10 0:09
@Version    :1.0
"""
print(4&8) #按位与& 同为1时 ，结果为1
# 000000100
# 000001000 所以结果为0
print(4|8)# 按位或|  同为0时，结果为0
# 000000100
# 000001000 所以结果为 000001100 12
print(4<<1) #向左移动一位 (移动一个位置)  想当于乘以2
print(4<<2) #向左移动2位  (移动2个位置)  相当于乘4
# 00000100 00001000 高位溢出 低位补零 00010000
print(4>>1) #向右移动1位，相当于除以2
print(4>>2)
# 00000100 00000010 高位补零 低位截断 00000010

```

### 运算符的优先级

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/03/10.png)

+ 算术运算符
  + 位运算符
    + 比较运算符
      + 布尔运算符
        + 赋值运算符

