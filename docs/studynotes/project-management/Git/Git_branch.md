---
title: Git 分支操作
date: 2022-01-27 16:47:48
permalink: /pages/8d7d1d/
categories:
  - Git
tags:
  - Git
---
# Git 分支操作

[[toc]]

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/04/02.png)

## 什么是分支

在版本控制过程中，同时推进多个任务，为每个任务，我们就可以创建每个任务的单独分支。使用分支意味着程序员可以把自己的工作从开发主线上分离开来，开发自己分支的时候，不会影响主线分支的运行。对于初学者而言，分支可以简单理解为副本，一个分支就是一个单独的副本。（**分支底层其实也是指针的引用**）

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/04/03.png)

## 分支的好处

同时并行推进多个功能开发，提高开发效率。

各个分支在开发过程中，如果某一个分支开发失败，不会对其他分支有任何影响。失败的分支删除重新开始即可。

## 分支的操作

| 命令名称                | 作用                         |
| ----------------------- | ---------------------------- |
| **git branch 分支名**   | 创建分支                     |
| **git branch -v**       | 查看分支                     |
| **git checkout 分支名** | 切换分支                     |
| **git merge 分支名**    | 把指定的分支合并到当前分支上 |

### 查看分支

1. 基本语法

<font color="##dd0000">git branch -v</font>

2. 案例实操

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ git branch -v
* master 0765edd my second commit
```

### 创建分支

1. 基本语法

<font color="##dd0000">git branch 分支名</font>

2. 案例实操

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ git branch hot-fix

DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ git branch -v
  hot-fix 0765edd my second （刚创建的新的分支，并将主分支 master的内容复制了一份）
* master  0765edd my second commit
```

### 修改分支

+ 在master分支上做修改

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ vim hello.txt
```

+ 添加暂存区

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ git add hello.txt
```

+ 提交本地库

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ git commit -m"my third commit" hello.txt
[master 019a8dd] my third commit
 1 file changed, 10 insertions(+)
```

+ 查看分支

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ git branch -v
  hot-fix 0765edd my second commit（hot-fix 分支并未做任何改变）
* master  019a8dd my third commit（当前 master 分支已更新为最新一次提交的版本）
```

+ 查看master分支上的文件内容

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ cat hello.txt
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi master分支
```

### 切换分支

1. 基本语法

<font color="##dd0000">git checkout 分支名</font>

2. 案例实操

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ git checkout hot-fix
Switched to branch 'hot-fix'
DELL@FRXcomputer MINGW64 /d/git-Space (hot-fix)
```

+ 查看 hot-fix 分支上的文件内容发现与 master 分支上的内容不同

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (hot-fix)
$ cat hello.txt
hello git! hi
```

+ 在 hot-fix 分支上做修改

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (hot-fix)
$ vim hello.txt

DELL@FRXcomputer MINGW64 /d/git-Space (hot-fix)
$ cat hello.txt
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi hot-fix 分支
```

+ 添加到暂存区

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (hot-fix)
$ git add hello.txt
```

+ 提交到本地库

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (hot-fix)
$ git commit -m"hot-fix commit" hello.txt
[hot-fix 4031a66] hot-fix commit
 1 file changed, 10 insertions(+)
```

### 合并分支

1. 基本语法

<font color="##dd0000">git merge 分支名</font>

2. 案例实操 

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master)
$ git merge hot-fix
Auto-merging hello.txt
CONFLICT (content): Merge conflict in hello.txt
Automatic merge failed; fix conflicts and then commit the result.
```

### 产生冲突

冲突产生的表现：后面状态为 **MERGING**

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master|MERGING)
$ cat hello.txt
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
<<<<<<< HEAD
hello git! hi master分支
=======
hello git! hi hot-fix 分支
>>>>>>> hot-fix
```

+ 冲突产生的原因
  + 合并分支时，两个分支在<font color="##dd0000">同一个文件的同一个位置</font>有两套完全不同的修改。Git 无法替我们决定使用哪一个。必须<font color="#dd0000">人为决定</font>新代码内容。

查看状态（检测到有文件有两处修改）

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master|MERGING)
$ git status
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   hello.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

### 解决冲突

1. 编辑有冲突的文件，删除特殊符号，决定要使用的内容

特殊符号：<font color="##dd0000"><<<<<<< HEAD</font> 当前分支的代码 <font color="##dd0000">\=\=\=====</font> 合并过来的代码 <font color="##dd0000">>>>>>>> hot-fix</font>

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master|MERGING)
$ vim hello.txt

DELL@FRXcomputer MINGW64 /d/git-Space (master|MERGING)
$ cat hello.txt
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi
hello git! hi master分支
hello git! hi hot-fix分支
```

::: tip

合并分支会修改当前的分支(例如master)，不会修改hot-fix分支

:::

2. 添加到暂存区

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master|MERGING)
$ git add hello.txt
```

3. 执行提交（注意：此时使用 git commit 命令时<font color="##dd0000">不能带文件名</font>）

```shell
DELL@FRXcomputer MINGW64 /d/git-Space (master|MERGING)
$ git commit -m"merge hot-fix"
[master 742c681] merge hot-fix

DELL@FRXcomputer MINGW64 /d/git-Space (master)
```

发现后面 MERGING 消失，变为正常

## 创建分支和切换分支图解

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Git/images/04/01.png)

master、hot-fix 其实都是指向具体版本记录的指针。当前所在的分支，其实是由 HEAD决定的。所以创建分支的本质就是多创建一个指针。

HEAD 如果指向 master，那么我们现在就在 master 分支上。

HEAD 如果执行 hotfix，那么我们现在就在 hotfix 分支上。

所以切换分支的本质就是移动 HEAD 指针。