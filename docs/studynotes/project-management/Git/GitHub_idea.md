---
title: IDEA 集成 GitHub
date: 2022-01-29 16:46:33
permalink: /pages/03bcc4/
categories:
  - Git
tags:
  - Git
---
# IDEA 集成 GitHub

## 设置 GitHub 账号

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/01.png)

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/02.png)

## 分享工程到 GitHub

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/03.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/04.png)

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/05.png)

来到 GitHub 中发现已经帮我们创建好了 Git-Test 的远程仓库。

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/06.png)

## push 推送本地库到远程库

右键点击项目，可以将当前分支的内容 push 到 GitHub 的远程仓库中。

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/07.png)

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/08.png)

define Remote：在这里可以创建远程链接的别名

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/09.png)

Name:在这里指定远程连接的别名

URL：在这里指定要push的远程仓库的地址

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/10.png)

::: tip

push 是将本地库代码推送到远程库，如果本地库代码跟远程库代码版本不一致，push 的操作是会被拒绝的。也就是说，要想 push 成功，一定要保证本地库的版本要比远程库的版本高！**因此一个成熟的程序员在动手改本地代码之前，一定会先检查下远程库跟本地代码的区别！如果本地的代码版本已经落后，切记要先 pull 拉取一下远程库的代码，将本地代码更新到最新以后，然后再修改，提交，推送！**

:::

## pull 拉取远程库到本地库

右键点击项目，可以将远程仓库的内容 pull 到本地仓库。

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/11.png)

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/12.png)

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/13.png)

::: tip

pull 是拉取远端仓库代码到本地，如果远程库代码和本地库代码不一致，会自动合并，如果自动合并失败，还会涉及到手动解决冲突的问题。

:::

## clone 克隆远程库到本地

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/14.png)

+ 填写要clone项目的ssh

![15](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/15.png)

+ 结果

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/07/16.png)

