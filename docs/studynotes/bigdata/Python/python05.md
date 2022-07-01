---
title: Python 基础篇 (五)
date: 2021-12-20 18:44:19
permalink: /pages/0875e9/
categories:
  - Python
tags:
  - Python
---
# Python 基础篇 (五)

## 内置函数range()

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/01.png)

```python
"""
@Author :frx
@Time   :2021/10/13 19:50
@Version    :1.0
"""

#range() 的三种创建方式
'''第一种创建方式，只有一个参数(小括号中只给了一个数)'''
r=range(10) #[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],默认从0开始，默认相差1称为步长
print(r)  #0-10
print(list(r)) #可以查看range对象中的整数序列  ->list是列表的意思

'''第二种创建方式,给了两个参数(小括号中，给了两个数,第一个代表start,第二个代表stop)'''
r=range(1,10) #左闭右开  制定了起始值,从1开始，到10结束(不包含10),默认步长为1
print(list(r)) #[1, 2, 3, 4, 5, 6, 7, 8, 9]

'''第三种创建方式,给了三个参数(小括号中给了三个数)'''
r=range(1,10,2)
print(list(r)) #[1, 3, 5, 7, 9]

'''判定指定的整数 在序列中是否存在 in,not in'''
print(10 in r) #False，10不在当前的r这个整数序列中
print(9 in r) #True

print(10 not in r) #True
print(9 not in r) #False

print(range(1,20,1)) #[1,19]
print(range(1,101,1)) #[1...100]
```

## 循环结构

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/02.png)

```python
"""
@Author :frx
@Time   :2021/10/13 23:44
@Version    :1.0
"""
a=1
#判断条件表达式
while a<10:
    # 执行条件执行体
    print(a)
    a+=1
```

### while循环的执行流程

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/03.png)

```python
"""
@Author :frx
@Time   :2021/10/13 23:52
@Version    :1.0
"""
#计算0-4之间的累加和
'''
四步循环法
1. 初始化变量
2. 条件判断
3. 条件执行体(循环体)
4. 改变变量
总结: 初始化变量与条件判断的变量与改变的变量为同一个'''

sum=0 #存储累加
'''初始化变量为0'''
a=0
'''条件判断'''
while a<5:
    '''条件执行体(循环体)'''
    sum+=a;
    '''改变变量'''
    a+=1
print('和为:',sum)

```

```python
"""
@Author :frx
@Time   :2021/10/14 0:12
@Version    :1.0
"""
'''计算1到100之间的偶数和'''
sum=0 #用于存储偶数和
'''初始化变量'''
a=1
'''条件判断'''
while a<=100:
    '''条件判断体(求和)'''
    #条件判断是否是偶数
    if not bool(a%2):   # if a%2==0:
        sum+=a
    '''改变变量'''
    a+=1;
print('1-100的偶数和为:',sum)
```

### for-in循环

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/04.png)

```python
"""
@Author :frx
@Time   :2021/10/14 0:22
@Version    :1.0
"""
for item in 'Python':  #第一次取得值为P，将P赋值给item,将item的值输出
    print(item)

#range() 产生一个整数序列 ->>也是一个可迭代对象
for i in range(10):
    print(i)

#如果在循环体中，不需要用到使用自定义变量，可将自定义变量写为"_"
for _ in range(5):
    print('人生苦短，我用Python')

sum=0
print('使用for循环,计算1到100之间的偶数和')
for item in range(1,101):
    if item%2==0:
        sum+=item
print('1-100的偶数和为:',sum)
```

```python
"""
@Author :frx
@Time   :2021/10/14 0:29
@Version    :1.0
"""
''' 输出100到999之间的水仙花数
    举例；
    153=3*3*3+5*5*5+1*1*1'''
for item in range(100,1000):
    ge=item%10
    shi=item//10%10
    bai=item//100
    #print(ge,shi,bai)
    #判断
    if ge**3+shi**3+bai**3==item:
        print(item)
```

### 流程控制语句break

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/05.png)

```python
"""
@Author :frx
@Time   :2021/10/14 19:34
@Version    :1.0
"""
a=0
while a<3:
    '''条件执行体(循环体)'''
    pwd=input('请输入密码')
    if pwd=='8888':
        print('密码正确')
        break
    else:
        print('密码不正确')

    ''' 改变变量'''
    a+=1
```

### 流程控制语句continue

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/06.png)

```python
"""
@Author :frx
@Time   :2021/10/14 19:49
@Version    :1.0
"""

'''要求输出1-50之间所有5的倍数，5,10,15,20,25....
    5的倍数共同点:和5的余数为0的数都是5的倍数
    什么样的数不是5的倍数  1,2,3,4,6,7,8...
    要求是使用continue实现'''
for item in range(1,51):
    if item%5==0:
        print(item)
print('----------使用continue------------')
for item in range(1,51):
    if item%5!=0:
        continue
    print(item)
```

### else语句

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/07.png)

```python
"""
@Author :frx
@Time   :2021/10/14 20:23
@Version    :1.0
"""

for item in range(3):
    pwd=input('请输入密码:')
    if pwd=='8888':
        print('密码正确')
        break
    else:
        print('密码错误')
else:
    print('对不起,三次密码均输入错误')


```

```python
"""
@Author :frx
@Time   :2021/10/14 20:27
@Version    :1.0
"""

a=0
while a<3:
    pwd=input('请输入密码')
    if pwd=='8888':
        print('密码正确')
        break
    else:
        print('密码不正确')
    '''改变变量'''
    a+=1
else:
    print('对不起，三次输入密码错误')

```

### 嵌套循环

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/08.png)

```python
"""
@Author :frx
@Time   :2021/10/14 20:44
@Version    :1.0
"""

for i in range(1,10):  #行
    for j in range(1,i+1):  #列
        print(i,'*',j,'=',i*j,end='\t')
    print()
```

### 二重循环中的break和continue

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/05/09.png)

```python
"""
@Author :frx
@Time   :2021/10/14 20:51
@Version    :1.0
"""

''' 流程控制语句break与continue在二重循环中的使用'''
for i in range(5):  #代表外层循环要执行5次
    for j in range(1,11):
        if j%2==0:
            #break
            continue
        print(j,end='\t')
    print()

```

