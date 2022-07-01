---
title: Git 团队协作机制
date: 2022-01-28 17:43:28
permalink: /pages/4c7b56/
categories:
  - Git
tags:
  - Git
---
# Git 团队协作机制

## 团队内协作机制

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/01.png)

岳：冲儿，我先把代码推送到远程库，你把代码clone到本地，自己研究一下，有发现推送到远程库，然后我再把远程库的代码拉下来。

## 跨团队协作机制

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/02.png)

岳的远程库叉(复制)一份到东方的远程库，东方克隆到本地，研究修改后，推送到远程库，东方发一个拉取请求，岳审核后，合并到远程库，拉到本地，徒弟也可以拉取。

Github网址:https://github.com/

## 创建远程仓库

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/03.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/04.png)

##  远程仓库操作

| 命令名称                               | 作用                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| git remote -v                          | 查看当前所有远程地址别名                                     |
| git remote add 别名 远程地址           | 起别名                                                       |
| **git push 别名 分支**                 | **推送本地分支上的内容到远程仓库**                           |
| **git clone 远程地址**                 | **将远程仓库的内容克隆到本地**                               |
| **git pull 远程库地址别名 远程分支名** | **将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并** |

### 创建远程仓库别名

1. 基本语法

<font color="##dd0000">git remote -v 查看当前所有远程地址别名</font>

<font color="##dd0000">git remote add 别名 远程地址</font>

2. 案例实操

```shell
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/SH0720 (master)
$ git remote -v
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/SH0720 (master)
$ git remote add ori https://github.com/atguiguyueyue/git-shTest.git
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/SH0720 (master)
$ git remote -v
ori https://github.com/atguiguyueyue/git-shTest.git (fetch)
ori https://github.com/atguiguyueyue/git-shTest.git (push)
```

https://github.com/atguiguyueyue/git-shTest.git

这个地址在创建完远程仓库后生成的连接，如图所示红框中

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/05.png)

### 推送本地分支到远程仓库

1. 基本语法

<font color="##dd0000">git push 别名 分支</font>

2. 案例实操

```shell
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/SH0720 (master)
$ git push ori master
Logon failed, use ctrl+c to cancel basic credential prompt.
Username for 'https://github.com': atguiguyueyue
Counting objects: 3, done.
Delta compression using up to 12 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 276 bytes | 276.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/atguiguyueyue/git-shTest.git
* [new branch] master -> master
```

此时发现已将我们 master 分支上的内容推送到 GitHub 创建的远程仓库。

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/06.png)

### 克隆远程仓库到本地

1. 基本语法

<font color="##dd0000">git clone 远程地址</font>

2. 案例实操

```shell
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/pro-linghuchong
$ git clone https://github.com/atguiguyueyue/git-shTest.git
Cloning into 'git-shTest'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
```

https://github.com/atguiguyueyue/git-shTest.git

这个地址为远程仓库地址，克隆结果：初始化本地仓库

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/07.png)

::: tip

clone 会做如下操作。1、拉取代码。2、初始化本地仓库。3、创建别名

:::

### 邀请加入团队

1. 选择邀请合作者

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/08.png)

2. 填入想要合作的人

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/09.png)

3. 复 制 地 址 并 通 过 微 信 钉 钉 等 方 式 发 送 给 该 用 户 ， 复 制 内 容 如 下 ：
   https://github.com/atguiguyueyue/git-shTest/invitations

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/10.png)

4. 在 atguigulinghuchong 这个账号中的地址栏复制收到邀请的链接，点击接受邀请。

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/11.png)

5. 成功之后可以在 atguigulinghuchong 这个账号上看到 git-Test 的远程仓库。

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/12.png)

6. 令狐冲可以修改内容并 push 到远程仓库。

```shell
--编辑 clone 下来的文件
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/pro-linghuchong/git-shTest(master)
$ vim hello.txt
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/pro-linghuchong/git-shTest(master)
$ cat hello.txt
hello git! hello atguigu! 2222222222222
hello git! hello atguigu! 33333333333333
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu! 我是最帅的，比岳不群还帅
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu! master test
hello git! hello atguigu! hot-fix test
--将编辑好的文件添加到暂存区
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/pro-linghuchong/git-shTest(master)
$ git add hello.txt
--将暂存区的文件上传到本地库
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/pro-linghuchong/git-shTest(master)
$ git commit -m "lhc commit" hello.txt
[master 5dabe6b] lhc commit
1 file changed, 1 insertion(+), 1 deletion(-)
--将本地库的内容 push 到远程仓库
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/pro-linghuchong/git-shTest(master)
$ git push origin master
Logon failed, use ctrl+c to cancel basic credential prompt.
Username for 'https://github.com': atguigulinghuchong
Counting objects: 3, done.
Delta compression using up to 12 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 309 bytes | 309.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/atguiguyueyue/git-shTest.git
 7cb4d02..5dabe6b master -> master
```

7. 回到 atguiguyueyue 的 GitHub 远程仓库中可以看到，最后一次是 lhc 提交的。

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/13.png)

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/14.png)

### 拉取远程库内容

1. 基本语法

<font color="##dd0000">git pull 远程库地址别名 远程分支名</font>

2. 案例实操

```shell
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/SH0720 (master)
$ git pull ori master
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
Unpacking objects: 100% (3/3), done.
From https://github.com/atguiguyueyue/git-shTest
* branch master -> FETCH_HEAD
 7cb4d02..5dabe6b master -> ori/master
Updating 7cb4d02..5dabe6b
Fast-forward
hello.txt | 2 +-
1 file changed, 1 insertion(+), 1 deletion(-)
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/SH0720 (master)
$ cat hello.txt
hello git! hello atguigu! 2222222222222
hello git! hello atguigu! 33333333333333
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu! 我是最帅的，比岳不群还帅
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu!
hello git! hello atguigu! master test
hello git! hello atguigu! hot-fix test
```

::: tip

将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并

:::

## 跨团队协作

1. 将远程仓库的地址复制发给邀请跨团队协作的人，比如东方不败。

![15](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/15.png)

2. 在东方不败的 GitHub 账号里的地址栏复制收到的链接，然后点击 Fork 将项目叉到自己的本地仓库。

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/16.png)

叉入中…

![17](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/17.png)

叉成功后可以看到当前仓库信息。

![18](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/18.png)

3. 东方不败就可以在线编辑叉取过来的文件。

![19](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/19.png)

4. 编辑完毕后，填写描述信息并点击左下角绿色按钮提交。

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/20.png)

5. 接下来点击上方的 Pull 请求，并创建一个新的请求。

![21](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/21.png)

![22](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/22.png)

![23](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/23.png)

6. 回到岳岳 GitHub 账号可以看到有一个 Pull request 请求。

![24](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/24.png)

进入到聊天室，可以讨论代码相关内容。

![25](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/25.png)

![26](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/26.png)

7. 如果代码没有问题，可以点击 Merge pull reque 合并代码。

![27](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/27.png)

## SSH 免密登录

我们可以看到远程仓库中还有一个 SSH 的地址，因此我们也可以使用 SSH 进行访问。

![28](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/28.png)

+ 具体操作如下:

```shell
--进入当前用户的家目录
Layne@LAPTOP-Layne MINGW64 /d/Git-Space/SH0720 (master)
$ cd
--删除.ssh 目录
Layne@LAPTOP-Layne MINGW64 ~
$ rm -rvf .ssh
removed '.ssh/known_hosts'
removed directory '.ssh'
--运行命令生成.ssh 秘钥目录[注意：这里-C 这个参数是大写的 C]
Layne@LAPTOP-Layne MINGW64 ~
$ ssh-keygen -t rsa -C atguiguyueyue@aliyun.com
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Layne/.ssh/id_rsa):
Created directory '/c/Users/Layne/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Layne/.ssh/id_rsa.
Your public key has been saved in /c/Users/Layne/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:7CPfRLITKcYDhaqpEDeok7Atvwh2reRmpxxOC6dkY44 
atguiguyueyue@aliyun.com
The key's randomart image is:
+---[RSA 2048]----+
| .. |
| .. |
| . .. |
|+ + o . . |
|oO . = S . |
|X . .. + = |
|+@ * .. = . |
|X.&o+. o = |
|Eo+Oo . . |
+----[SHA256]-----+
--进入.ssh 目录查看文件列表
Layne@LAPTOP-Layne MINGW64 ~
$ cd .ssh
Layne@LAPTOP-Layne MINGW64 ~/.ssh
$ ll -a
total 21
drwxr-xr-x 1 Layne 197609 0 11 月 25 19:27 ./
drwxr-xr-x 1 Layne 197609 0 11 月 25 19:27 ../
-rw-r--r-- 1 Layne 197609 1679 11 月 25 19:27 id_rsa
-rw-r--r-- 1 Layne 197609 406 11 月 25 19:27 id_rsa.pub
--查看 id_rsa.pub 文件内容
Layne@LAPTOP-Layne MINGW64 ~/.ssh
$ cat id_rsa.pub
ssh-rsa 
AAAAB3NzaC1yc2EAAAADAQABAAABAQDRXRsk9Ohtg1AXLltsuNRAGBsx3ypE1O1Rkdzpm
l1woa6y6G62lZri3XtCH0F7GQvnMvQtPISJFXXWo+jFHZmqYQa/6kOIMv2sszcoj2Qtwl
lGXTPn/4T2h/cHjSHfc+ks8OYP7OWOOefpOCbYY/7DWYrl89k7nQlfd+A1FV/vQmcsa1L
P5ihqjpjms2CoUUen8kZHbjwHBAHQHWRE+Vc371MG/dwINvCi8n7ibI86o2k0dW0+8SL+
svPV/Y0G9m+RAqgec8b9U6DcSSAMH5uq4UWfnAcUNagb/aJQLytrH0pLa8nMv3XdSGNNo
AGBFeW2+K81XrmkP27FrLI6lDef atguiguyueyue@aliyun.com
```

复制 id_rsa.pub 文件内容，登录 GitHub，点击用户头像→Settings→SSH and GPG keys

![29](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/29.png)

![30](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/30.png)

![31](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/05/31.png)

接下来再往远程仓库 push 东西的时候使用 SSH 连接就不需要登录了。

