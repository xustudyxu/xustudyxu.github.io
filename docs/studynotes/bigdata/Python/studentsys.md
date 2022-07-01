---
title: 学生信息管理系统
date: 2021-12-20 18:44:19
permalink: /pages/960407/
categories:
  - Python
tags:
  - Python
---
# 学生信息管理系统

## 需求分析

+ 学会管理系统应具备的功能
  + 添加学生及成绩信息
  + 将学生信息保存到文件中
  + 修改和删除学生信息
  + 查询学生信息
  + 根据学生成绩进行排序
  + 统计学生的总分

## 系统设计

### 系统功能结构	

+ 学生信息管理系统的7大模块
  + 录入学生信息模块
  + 查找学生信息模块
  + 删除学生信息模块
  + 修改学生信息模块
  + 学生成绩排名模块
  + 统计学生总人数模块
  + 显示全部学生信息模块

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/01.png)

### 系统业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/02.png)

### 系统发开必备

+ 系统开发环境
  + 操作系统:win10
  + Python解释器版本:Python3.8
  + 开发工具:PyCharm
  + Python内置模块:os,re
+ 项目目录结构
  + studentsys <font color=#DC4040 size=4 face="黑体">文件夹</font>
    + students,txt <font color=#DC4040 size=4 face="黑体">保存学生信息的文件(由系统自动创建)</font>
    + stusystem.py <font color=#DC4040 size=4 face="黑体">具体功能的Python文件 </font>

## 主函数设计

+ 系统主界面运行效果图

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/03.png)

### 主函数的业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/04.png)

### 实现主函数

| 编号 | 功能                               |
| ---- | ---------------------------------- |
| 0    | 退出系统                           |
| 1    | 录入学生信息，调用insert()函数     |
| 2    | 查找学生信息，调用search()函数     |
| 3    | 删除学生信息，调用delete()函数     |
| 4    | 修改学生信息，调用modify()函数     |
| 5    | 对学生成绩排序，调用sort()函数     |
| 6    | 统计学生总人数，调用total()函数    |
| 7    | 显示所以的学生信息，调用show()函数 |

## 录入学生信息功能

+ 实现录入学生信息功能
  + 从控制台录入学生信息，并且把它们保存到磁盘文件中

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/05.png)

+ 业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/06.png)

+ 具体实现
  + save(student)函数，用于将学生信息保存到文件
  + insert()函数，用于录入学生信息

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/07.png)

## 删除学生信息功能

+ 实现删除学生信息功能
  + 从控制台录入学生ID，到磁盘文件中找到对应的学生信息，并将其删除

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/08.png)

+ 业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/09.png)

## 修改学生信息功能

+ 实现修改学生信息功能
  + 从控制台录入学生ID，到磁盘文件中找到对应的学生信息，将其修改

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/10.png)

+ 业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/11.png)

## 查找学生信息功能

+ 实现查询学生信息功能
  + 从控制台录入学生ID或姓名，到磁盘文件中找到对应的学生信息

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/12.png)

+ 业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/13.png)

## 统计学生总人数功能

+ 实现统计学生总人数功能
  + 统计学生信息文件中保存的学生信息个数

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/14.png)

+ 业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/15.png)

## 显示所有学生信息功能

+ 实现显示所有信息功能
  + 将学生信息文件中保存的全部学生信息获取并显示

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/16.png)

+ 业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/17.png)

## 排序模块设计

+ 实现按学生成绩排序功能
  + 主要对学生信息按英语成绩、Python成绩、Java成绩、总成绩进行升序或降序排序

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/18.png)

+ 业务流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/19.png)

## 项目打包

+ 在线安装方式
  + pip install Pyinstaller

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/20.png)

+ 执行打包操作

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Python/images/15/21.png)

```python
"""
@Author :frx
@Time   :2021/11/4 20:16
@Version    :1.0
"""
import os
filename='student.txt'
def main():
    while True:
        menu()
        choice=int(input('请选择'))
        if choice in [0,1,2,3,4,5,6,7]:
            if choice==0:
                answer=input('您确定要退出系统吗?')
                if answer=='y'or answer=='Y':
                    print('谢谢您的使用')
                    break
                else:
                    continue
            elif choice==1:
                insert()#录入学生信息
            elif choice==2:
                search()#
            elif choice==3:
                delete()
            elif choice==4:
                modify()
            elif choice==5:
                sort()
            elif choice==6:
                total()
            elif choice==7:
                show()
def menu():
    print('-----------------学生信息管理系统-----------------')
    print('--------------------功能菜单---------------------')
    print('\t\t\t\t\t1.录入学生信息')
    print('\t\t\t\t\t2.查找学生信息')
    print('\t\t\t\t\t3.删除学生信息')
    print('\t\t\t\t\t4.修改学生信息')
    print('\t\t\t\t\t5.排序')
    print('\t\t\t\t\t6.统计学生总人数')
    print('\t\t\t\t\t7.显示所有学生信息')
    print('\t\t\t\t\t0.退出系统')
    print('------------------------------------------------')
def insert():
    student_list=[]
    while True:
        id=input('请输入ID(1001):')
        if not id:
            break
        name=input('请输入姓名:')
        if not name:
            break

        try:
            english=input('请输入英语成绩:')
            python=input('请输入Python成绩:')
            java=int(input('请输入Java成绩:'))
        except:
            print('输入无效，不是整数类型，请重新输入:')
            continue
        #将录入的学生信息保存到字典中
        student={'id':id,'name':name,'english':english,'python':python,'java':java}
        #将学生信息添加到列表中
        student_list.append(student)
        answer=input('是否继续添加？y/n\n')
        if answer=='y':
            continue
        else:
            break

    #调用save()函数
    save(student_list)
    print('学生信息录入完毕!!!')

def save(lst):
    try:
        stu_txt=open(filename,'a',encoding='utf-8')
    except:
        stu_txt=open(filename,'w',encoding='utf-8')
    for item in lst:
        stu_txt.write(str(item)+'\n')

def search():
    student_query=[]
    while True:
        id=''
        name=''
        if os.path.exists(filename):
            mode=input('按ID查找请输入1，按姓名查找请输入2：')
            if mode=='1':
                id=input('请输入学生ID')
            elif mode=='2':
                name=input('请输入学生的姓名')
            else:
                print('请输入有误，请重新输入')
                search()
            with open(filename,'r',encoding='utf-8') as rfile:
                student=rfile.readlines()
                for item in student:
                    d=dict(eval(item))
                    if id!='':
                        if d['id']==id:
                            student_query.append(d)
                    elif name!='':
                        if d['name']==name:
                            student_query.append(d)
            #显示查询结果
            show_student(student_query)
            #清空列表
            student_query.clear()
            answer=input('是否要继续查询:y/n\n')
            if answer=='y':
                continue
            else:
                break

        else:
            print('暂未保存学生信息')
            return

def show_student(lst):
    if len(lst)==0:
        print('没有查询到学生信息，无数据显示!!!')
        return
    #定义标题显示格式
    format_title='{:^6}\t{:^12}\t{:^8}\t{:^10}\t{:^8}\t{:^8}'
    print(format_title.format('ID','姓名','英语成绩','Python成绩','Java成绩','总成绩'))
    #定义内容的显示格式
    format_title='{:^6}\t{:^12}\t{:^8}\t{:^10}\t{:^10}\t{:^8}'
    for item in lst:
        print(format_title.format(item.get('id'),
                                  item.get('name'),
                                  item.get('english'),
                                  item.get('python'),
                                  item.get('java'),
                                  int(item.get('english'))+int(item.get('python'))+int(item.get('java'))
                                  ))

def delete():
    while True:
        student_id=input('请输入要删除的学生的ID:')
        if student_id !='':
            if os.path.exists(filename):
                with open(filename,'r',encoding='utf-8') as file:
                    student_old=file.readlines()
            else:
                student_id=[]
            flag=True #标记是否删除
            if student_id:
                with open(filename,'w',encoding='utf-8') as wfile:
                    d={}
                    for item in student_old:
                        d=dict(eval(item)) #将字符串转成字典
                        if d['id']!=student_id:
                            wfile.write(str(d)+'\n')
                        else:
                            flag=True
                    if flag:
                        print(f'id为{student_id}的学生信息被删除')
                    else:
                        print(f'没有找到ID为{student_id}的学生信息')
            else:
                print('无学生信息!!!')
                break
            show()  #删除之后要重新显示所有学生信息
            answer=input('是否继续删除?y/n\n')
            if answer=='y':
                continue
            else:
                break


def modify():
    show()
    if os.path.exists(filename):
        with open(filename,'r',encoding='utf-8') as rfile:
            student_old=rfile.readlines()
    else:
        return
    student_id=input('请输入要修改的学员的ID:')
    with open(filename,'w',encoding='utf-8') as wfile:
        for item in student_old:
            d=dict(eval(item))
            if d['id']==student_id:
                print('找到学生信息，可以修改他的相关信息')
                while True:
                    try:
                        d['name']=input('请输入姓名:')
                        d['english']=input('请输入英语成绩:')
                        d['python']=input('请输入Python成绩:')
                        d['java']=input('请输入Java成绩:')
                    except:
                        print('您的输入有误，请重新输入!!!')
                    else:
                        break
                wfile.write(str(d)+'\n')
                print('修改成功...')
            else:
                wfile.write(str(d)+'\n')
        answer=input('是否需要继续修改其他学生信息？y/n\n')
        if answer=='y':
            modify()


def sort():
    show()
    if os.path.exists(filename):
        with open(filename,'r',encoding='utf-8') as rfile:
            student_list=rfile.readlines()
        student_new=[]
        for item in student_list:
            d=dict(eval(item))
            student_new.append(d)
    else:
        return
    asc_or_desc=input('请选择(0.升序 1.降序):')
    if asc_or_desc=='0':
        asc_or_desc_bool=False
    elif asc_or_desc=='1':
        asc_or_desc_bool=True
    else:
        print('您的输入有误，请重新输入')
        sort()
    mode=input('请选择排序方式(1.按英语成绩排序 2.按Python成绩排序 3.按Java成绩排序 0.按总成绩排序):')
    if mode=='1':
        student_new.sort(key=lambda x : int(x['english']),reverse=asc_or_desc_bool)
    elif mode=='2':
        student_new.sort(key=lambda x : int(x['python']),reverse=asc_or_desc_bool)
    elif mode=='3':
        student_new.sort(key=lambda x : int(x['java']),reverse=asc_or_desc_bool)
    elif mode=='0':
        student_new.sort(key=lambda x : int(x['english'])+int(x['python'])+int(x['java']),reverse=asc_or_desc_bool)
    else:
        print('您的输入有误，请重新输入')
        sort()
    show_student(student_new)

def total():
    if os.path.exists(filename):
        with open(filename,'r',encoding='utf-8') as rfile:
            students=rfile.readlines()
            if students:
                print(f'一共有{len(students)}名学生')
            else:
                print('还没录入学生信息...')
    else:
        print('暂未保存数据信息..')

def show():
    student_lst=[]
    if os.path.exists(filename):
        with open(filename,'r',encoding='utf-8') as rfile:
            students=rfile.readlines()
            for item in students:
                student_lst.append(eval(item))
            if student_lst:
                show_student(student_lst)


if __name__ == '__main__':
    main()
```

