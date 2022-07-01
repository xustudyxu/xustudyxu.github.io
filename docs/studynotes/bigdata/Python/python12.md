---
title: Python 面向对象
date: 2021-12-20 18:44:19
permalink: /pages/117f6e/
categories:
  - Python
tags:
  - Python
---
# Python 面向对象

## 编程思想

+ 编程届的两大阵营

|        | 面向过程                                                     | 面向对象                                 |
| ------ | ------------------------------------------------------------ | ---------------------------------------- |
| 区别   | 实物比较简单，可以用线性的思想去解决                         | 事物比较复杂，使用简单的线性思维无法解决 |
| 共同点 | 面向过程和面向对象都是解决实际问题的一种思维方式             |                                          |
|        | 二者相辅相成，并不是对立的,解决复杂问题，通过面向对象方式便于我们从宏观上把握事物之间的复杂的关系。方便我们分析整个系统，具体到微观操作，任然使用面向过程方式来处理 |                                          |

## 类与对象

+ 类
  + 类别，分门别类，物以类聚，人类，鸟类，动物类，植物类...
+ <font color=#DC4040 size=4 face="黑体">类是多个类似事物组成的群体的统称。能够帮助我们快速理解和判断事物的性质。</font>
+ 数据类型
  + **不同的数据类型属于不同的类**
  + **使用内置函数type()查看数据类型**

+ 对象
  + <font color=#DC4040 size=4 face="黑体">100、99、520都是int类之下包含的相似的不同个例,这个个例专业数语称为实例或对象。</font>

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/01.png)

## 类的创建

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/02.png)

```python
"""
@Author :frx
@Time   :2021/10/31 9:38
@Version    :1.0
"""
class Student: #Student是类的名称 简称类名 有一个或多个单词组成，每个单词的首字母大写，其余小写
    pass
#Python中一切皆对象Studnet是对象吗 内存有开空间吗
print(id(Student))  #2901610634544
print(type(Student)) #<class 'type'>
print(Student)     #<class '__main__.Student'>
```

```python
"""
@Author :frx
@Time   :2021/10/31 9:45
@Version    :1.0
"""

class Student:
    native_pace='河南' #直接写在类里面的变量，称为类属性
    def __init__(self,name,age):
        self.name=name  #self.name  称为实例属性，进行了一个赋值的操作，将局部变量的name的值赋给实体属性
        self.age=age
    #实例方法
    def eat(self):
        print('学生在吃饭....')

    #静态方法
    @staticmethod
    def method():
        print('我使用了staticmethod进行修饰，所以我是静态方法')
	
    #类方法
    @classmethod
    def cm(cls):
        print('我是类方法，使用了classmethod进行修饰')



    #在类之外定义的称为函数，再类之外定义的称为方法
def drink():
    print('喝水')

```

## 对象的创建

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/03.png)

```python
#创建Student对象
stu1=Student('张三',20)
print(id(stu1)) #2163139596928
print(type(stu1)) #<class '__main__.Student'>
print(stu1) #<__main__.Student object at 0x000001F7A52AD280>

print(id(Student)) #Student类的名称  #2163177385152
print(type(Student))  #<class 'type'>
print(Student)   #<class '__main__.Student'>
```

```python
stu1=Student('张三',20)
stu1.eat()         #对象.方法名()
print(stu1.name) #张三
print(stu1.age)  #20

print('-------使用实例方法---------')
Student.eat(stu1)  #与上面的eat方法代码功能相同，都是调用Student中的eat方法
                   #类名.方法名(类的对象) -->实际上就是方法定义处的self
```

```python
#类属性的使用方式
# print(Student.native_pace)
stu1=Student('张三',20)
stu2=Student('李四',30)
print(stu1.native_pace)  #河南
print(stu1.native_pace)  #河南
Student.native_pace='天津'
print(stu1.native_pace)  #天津
print(stu2.native_pace)  #天津
print('----------类方法的使用方式-------------')
Student.cm()
print('----------静态方法的使用方式------------')
Student.method()
```

## 动态绑定属性和方法

+ **Python是动态语言,在创建对象之后，可以动态地绑定属性和方法**

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/04.png)

```python
stu1=Student('张三',20)
stu2=Student('李四',30)
print(id(stu1))  #1937924321776
print(id(stu2))  #1937922380224
print('----------------为stu2动态绑定性别属性---------------------')
stu1.gender='女'
print(stu1.name,stu1.age,stu1.gender) #张三 20 女
print(stu2.name,stu2.age) #李四 30 


print('----------------------------------------')
stu1.eat()
stu2.eat()

def show():
    print('定义在类之外，称函数')
stu1.show=show  #stu1绑定show方法
stu1.show()
```

## 面向对象的三大特征

### 封装

+ 封装:**提高代码的安全性**
  + <font color=#DC4040 size=4 face="黑体">将数据(属性)和行为(方法)包装到类对象中。在方法内部对属性进行操作,在类对象的外部调用方法。这样,无需关心方法内部的具体实现细节，从而隔离了复杂度。</font>
  + <font color=#DC4040 size=4 face="黑体">在python中没有专门的修饰符用于属性的私有,如果该属性不希望在类对象外部被访问，前面使用两个"_"。</font>

```python
class Student:
    def __init__(self,name,age):
        self.name=name
        self.__age=age #年龄不希望在类的外部被使用，所以加了两个_
    def show(self):
        print(self.name,self.__age)

stu=Student('张三',20)
stu.show()
#在类的外部使用name与age
print(stu.name)
print(dir(stu))
print(stu.__Student__age) #在类的外部可以通过 __Student__age 进行访问
```

### 继承

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/05.png)

```python
"""
@Author :frx
@Time   :2021/10/31 21:24
@Version    :1.0
"""
class Person(object): #Person 继承Object类
    def __init__(self,name,age):
        self.name=name
        self.age=age
    def info(self):
        print(self.name,self.age)

class Student(Person):
        def __init__(self,name,age,stu_no):
            super().__init__(name,age)
            self.stu_no=stu_no

class Teacher(Person):
        def __init__(self,name,age,teachofyear):
            super().__init__(name,age)
            self.teachofyear=teachofyear

stu=Student('张三',20,'1001')
teacher=Teacher('李四',34,10)

stu.info()          #张三 20
teacher.info()      #李四 34

class A(object):
    pass
class B(object):
    pass
class C(A,B):  #多继承
    pass
```

### 方法重写

+ 方法重写
  + <font color=#DC4040 size=4 face="黑体">如果子类对继承自父类的某个属性或方法不满意,可以在子类中对其(方法体)进行重写编写</font>
  + <font color=#DC4040 size=4 face="黑体">子类重写后的方法中可以通过super().xxx()调用父类中被重写的方法</font>

```python
class Person(object): #Person 继承Object类
    def __init__(self,name,age):
        self.name=name
        self.age=age
    def info(self):
        print(self.name,self.age)

class Student(Person):
        def __init__(self,name,age,stu_no):
            super().__init__(name,age)
            self.stu_no=stu_no
        def info(self): #重写info
            super().info() #调用父类方法
            print(self.stu_no)

class Teacher(Person):
        def __init__(self,name,age,teachofyear):
            super().__init__(name,age)
            self.teachofyear=teachofyear
        def info(self): #重写info
            super().info()
            print(self.teachofyear)

stu=Student('张三',20,'1001')
teacher=Teacher('李四',34,10)

stu.info()          #张三 20
                    #1001
print('------------------------')
teacher.info()      #李四 34
                    #10

```

### object类

+ object类
  + <font color=#DC4040 size=4 face="黑体">object类是所以类的父类，因此所有类都有object类的属性和方法</font>
  + <font color=#DC4040 size=4 face="黑体">内置函数dir()可以查看指定对象所有属性</font>
  + <font color=#DC4040 size=4 face="黑体">object有一个\_str\_()方法,用于返回一个对于'对象的描述'，对应于内置函数str()经常用于print()方法,帮我们查看对象的信息,所以我们经常会对str()方法进行重写</font>

```python
"""
@Author :frx
@Time   :2021/10/31 22:24
@Version    :1.0
"""
class Student:
    def __init__(self,name,age):
        self.name=name
        self.age=age
    def __str__(self):
        return '我的名字是{0},今年{1}岁了'.format(self.name,self.age)
stu=Student('张三',20)
print(dir(Student))
print(stu) #我的名字是张三,今年20岁了  默认调用__str__()这样的方法      
print(type(stu))
```

### 多态

+ 多态
  + <font color=#DC4040 size=4 face="黑体">简单地说，多态就是"具有多种形态"，它指的是:即便不知道一个变量所引用的对象到底是什么类型，仍然可以通过这个变量调用方法，在运行过程中根据变量所引用对象的类型，动态决定调用哪个对象中的方法。</font>

```python
"""
@Author :frx
@Time   :2021/10/31 22:45
@Version    :1.0
"""
class Animal(object):
    def eat(self):
        print('动物吃...')

class Dog(Animal):
    def eat(self):
        print('狗吃骨头...')
class Cat(Animal):
    def eat(self):
        print('猫吃鱼.....')



class Person:
    def eat(self):
        print('人吃五谷杂粮...')

#定义一个函数
def fun(obj):
    obj.eat()

#开始调用函数
fun(Cat())     #猫吃鱼.....
fun(Dog())     #狗吃骨头...
fun(Animal())  #动物吃...
print('-------------------------')
fun(Person())  #人吃五谷杂粮...
```

### 静态语言和动态语言

+ 静态语言和动态语言的三个必要条件
  + <font color=#DC4040 size=4 face="黑体">继承</font>
  + <font color=#DC4040 size=4 face="黑体">方法重写</font>
  + <font color=#DC4040 size=4 face="黑体">父类引用指向子类对象</font>
+ <font color=#DC4040 size=4 face="黑体">动态语言的多态崇尚"鸭子类型"当看到一只鸟走起来像鸭子、游泳起来像鸭子、收起来也像鸭子，那么这只鸟就可以被称为鸭子。在鸭子类型中,不需要关心对象是什么类型,到底是不是鸭子，只关心对象的行为。</font>

## 特殊属性和方法

|          | 名称       | 描述                                                         |
| -------- | ---------- | ------------------------------------------------------------ |
| 特殊属性 | \__dict__  | 获得类对象或实例对象所绑定的所以属性和方法的字典             |
| 特殊方法 | \__len__() | 通过重写\__len__()方法,让内置函数len()的参数可以是自定义类型 |
|          | \__add__() | 通过重写\__add__()方法,可使用自定义对象具有"+"功能           |
|          | \__new__() | 用于创建对象                                                 |
|          | \__int__() | 对创建的对象进行初始化                                       |

+ 特殊属性

```python
"""
@Author :frx
@Time   :2021/10/31 23:08
@Version    :1.0
"""
class A:
    pass
class B:
    pass
class C(A,B):
    def __init__(self,name,age):
        self.name=name
        self.age=age

#创建C类的对象
x=C('Jack',20)   #x是C类型的一个实例对象
print(x.__dict__) #实例对象的属性字典 #{'name': 'Jack', 'age': 20}
print(C.__dict__)
print('---------------------------')
print(x.__class__) #<class '__main__.C'>
print(C.__bases__) #(<class '__main__.A'>, <class '__main__.B'>)   #C类的父类类型的元组
print(C.__base__)  #<class '__main__.A'>  #里C类近的父类
print(C.__mro__)   #(<class '__main__.C'>, <class '__main__.A'>, <class '__main__.B'>, <class 'object'>)  #类的层次结构
print(A.__subclasses__()) #[<class '__main__.C'>] 查看A的子类   子类的类表
```

+ 特殊方法

```python
"""
@Author :frx
@Time   :2021/10/31 23:34
@Version    :1.0
"""
a=20
b=100
c=a+b  #两个整数类型的相加操作
d=a.__add__(b)

print(c)
print(d)

class Student:
    def __init__(self,name):
        self.name=name

    def __add__(self, other):
        return self.name+other.name

    def __len__(self):
        return len(self.name)

stu1=Student('张三')
stu2=Student('李四')

s=stu1+stu2 #实现了两个对象的加法运算(因为在Student类中,编写__add__()特殊的方法)
print(s)  #张三李四
s=stu1.__add__(stu2)
print(s)  #张三李四
print('----------------------------------------------')
lst=[11,22,33,44]
print(len(lst))  #len是内置函数len  #4
print(lst.__len__()) #4
print(len(stu1)) #2
```

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/06.png)

```python
"""
@Author :frx
@Time   :2021/10/31 23:45
@Version    :1.0
"""
class Person(object):

    def __new__(cls, *args, **kwargs):
        print('__new__被调用执行了，cls的id值为{0}'.format(id(cls)))
        obj=super().__new__(cls)
        print('创建的对象的id为:{0}'.format(id(obj)))
        return obj

    def __init__(self, name, age):
        print('__init__被调用了,self的id值为:{0}'.format(id(self)))
        self.name = name
        self.age = age

print('object类对象的id为:{0}'.format(id(object)))
print('object类对象的id为:{0}'.format(id(Person)))

#创建Person类的实例对象
p1=Person('张三',20)
print('p1这个Person类的实例对象的id:{0}'.format(id(p1)))

```

## 类的浅拷贝与深拷贝

+ 变量的赋值操作
  + <font color=#DC4040 size=4 face="黑体">只是形成两个变量,实际上还是指向同一个对象</font>

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/07.png)

```python
"""
@Author :frx
@Time   :2021/11/1 0:14
@Version    :1.0
"""
class CPU:
    pass
class Disk:
    pass
class Computer:
    def __init__(self,cpu,disk):
        self.cpu=cpu
        self.disk=disk


#(1)变量的赋值
cpu1=CPU()
cpu2=CPU()
print(cpu1,id(cpu1)) #<__main__.CPU object at 0x000002B9AE8D71F0> 2996520710640
print(cpu2,id(cpu2)) #<__main__.CPU object at 0x000002B9AE8BB8B0> 2996520597680
```

- 浅拷贝
  - <font color=#DC4040 size=4 face="黑体">Python拷贝一般都是浅拷贝，拷贝时，对象包含的子对象内容不拷贝，因此，源对象与拷贝对象会引用同一个子对象</font>

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/08.png)

```python
#(2)类有浅拷贝
print('------------------')
disk=Disk()
computer=Computer(cpu1,disk)  #创建一个计算机类的对象

#浅拷贝
import copy
print(disk)
computer2=copy.copy(computer)
print(computer,computer.cpu,computer.disk)      #<__main__.Computer object at 0x0000020837F6D340> <__main__.CPU object at 0x00000208381471F0> <__main__.Disk object at 0x0000020837F6D0A0>
print(computer2,computer2.cpu,computer2.disk)   #<__main__.Computer object at 0x0000020837F6D340> <__main__.CPU object at 0x00000208381471F0> <__main__.Disk object at 0x0000020837F6D0A0>
```

+ 深拷贝
  + <font color=#DC4040 size=4 face="黑体">使用copy模块的deepcopy函数,递归拷贝对象中包含的子对象,源对象和拷贝对象所有的子对象也不相同</font>

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/09.png)

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/12/10.png)

```python
#深拷贝
print('--------------------------------------------------------')
computer3=copy.deepcopy(computer)
print(computer,computer.cpu,computer.disk)      #<__main__.Computer object at 0x000002C046E1D340> <__main__.CPU object at 0x000002C046FF71F0> <__main__.Disk object at 0x000002C046E1D0A0>
print(computer3,computer3.cpu,computer3.disk)   #<__main__.Computer object at 0x000002C0468E95E0> <__main__.CPU object at 0x000002C049A4EEB0> <__main__.Disk object at 0x000002C049A4EF10>
```

:kissing_smiling_eyes:

