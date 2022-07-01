---
title: IDEA 集成Git
date: 2022-01-29 15:15:38
permalink: /pages/062fb4/
categories:
  - Git
tags:
  - Git
---
# IDEA 集成Git

## 配置 Git 忽略文件

1. Eclipse 特定文件

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/01.png)

2. IDEA 特定文件

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/02.png)

3. Maven 工程的 target 目录

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/03.png)

问题 1:为什么要忽略他们？

答：与项目的实际功能无关，不参与服务器上部署运行。把它们忽略掉能够屏蔽 IDE 工具之间的差异。

问题 2：怎么忽略？

创建忽略规则文件 <font color="##dd0000">xxxx.ignore（前缀名随便起，建议是 git.ignore）</font>

这个文件的存放位置原则上在哪里都可以，为了便于让~/.gitconfig 文件引用，建议也放在用户家目录下

git.ignore 文件模版内容如下：

```shell
# Compiled class file
*.class
# Log file
*.log
# BlueJ files
*.ctxt
# Mobile Tools for Java (J2ME)
.mtj.tmp/
# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar
# virtual machine crash logs, see 
http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
.classpath
.project
.settings
target
.idea
*.iml
```

2. 在.gitconfig 文件中引用忽略配置文件（此文件在 Windows 的家目录中）

```shell
[user]
name = Layne
email = Layne@atguigu.com
[core]
excludesfile = C:/Users/asus/git.ignore
注意：这里要使用“正斜线（/）”，不要使用“反斜线（\）
```

## 定位 Git 程序

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/04.png)

## 初始化本地库

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/05.png)

选择要创建 Git 本地仓库的工程。

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/06.png)

 ## 添加到暂存区

右键点击项目选择 Git -> Add 将项目添加到暂存区。

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/07.png)

##  提交到本地库

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/08.png)

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/09.png)

## 切换版本

在 IDEA 的左下角，点击 Git，然后点击 Log 查看版本

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/10.png)

右键选择要切换的版本，然后在菜单里点击 Checkout Revision。

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/11.png)

## 创建分支

选择 Git，点击 Branches 按钮。

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/12.png)

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/13.png)

然后再 IDEA 的右下角看到 hot-fix，说明分支创建成功，并且当前已经切换成 hot-fix 分支

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/14.png)

## 切换分支

在 IDEA 窗口的右下角，切换到 master 分支

![15](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/15.png)

然后在 IDEA 窗口的右下角看到了 master，说明 master 分支切换成功。

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/16.png)

## 合并分支

在 IDEA 窗口的右下角，将 hot-fix 分支合并到当前 master 分支。

![17](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/17.png)

如果代码没有冲突，分支直接合并成功，分支合并成功以后，代码自动提交，无需手动提交本地库。

![18](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/18.png)

## 解决冲突

如图所示，如果 master 分支和 hot-fix 分支都修改了代码，在合并分支的时候就会发生冲突。

![19](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/19.png)

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/20.png)

我们现在站在 master 分支上合并 hot-fix 分支，就会发生代码冲突。

![21](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/21.png)

点击 Conflicts 框里的 Merge 按钮，进行手动合并代码。

![22](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/22.png)

代码冲突解决，自动提交本地库。

![23](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/23.png)

![24](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/06/24.png)

