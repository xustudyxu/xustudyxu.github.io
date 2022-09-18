---
title: Docker 常用命令
date: 2022-09-08 23:14:54
permalink: /project-management/Docker/Docker_Command
categories:
  - Docker
tags:
  - Docker
---
# Docker 常用命令

[[toc]]

## Docker运行流程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220908/image.6xr5pco2z9c0.webp)

## Docker帮助命令

查看 docker 信息（版本、结构等）

```sh
docker info
```

查看 docker 版本

```sh
docker version
```

查看 docker 所有命令

```sh
docker --help
```

可以看出 docker 执行命令格式： `docker [options] command（具体命令）`

查看 docker run 命令

```sh
docker run --help
```

查看其他类似命令

```sh
docker xxx --help
```

## Docker镜像命令

当运行容器时，使用的镜像如果在本地中不存在，docker 就会自动从 docker 镜像仓库中下载，默认是从 Docker Hub 公共镜像源下载。

::: tip 注意

镜像的唯一标识是 id 和 tag（版本）。（大部分情况下）能以 id 操作镜像，则也能以 tag 操作镜像，反之亦然。

下面的例子可能只写一个标识如 id，忽略另一个，但请记住，两者使用任意一个标识都可以。

:::

指令语法标签介绍：

- [xxx]：xxx 是可选的
- \<xxx>：xxx 是必选的
- |：或者
- &：和

### 镜像本机

查看本机中所有镜像命令格式：`docker images [options] [镜像名]`

```sh
# 列出所有本地镜像格式
docker images [options] [镜像名]

# 列出所有镜像（包含中间映像层）
docker iamges -a

# 只显示出镜像 id
docker iamges -q

# 专门查询某个镜像
docker images <镜像名>
```

> **例子 1：查询全部镜像**

```sh {2}
# 执行命令
[root@master ~]# docker images

REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   11 months ago   13.3kB
```

>  **例子 2：查询 hello-world 镜像**

```sh {1}
[root@master ~]# docker images hello-world
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   11 months ago   13.3kB
```

各个选项说明:

- REPOSITORY：镜像的仓库源
- TAG：镜像的标签，同一仓库源可以有多个 TAG，代表这个仓库源的不同个版本。**唯一**
- IMAGE ID：镜像 ID。**唯一**
- CREATED：镜像的创建时间
- SIZE：镜像的大小

### 镜像搜索

> **Docker Hub 网页搜索镜像**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220908/image.2pl4371jjmc0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220908/image.6yr72dghxoc0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220908/image.5fb8d91n1o40.webp)

> **命令搜索镜像**

去 Docker Hub 上查询镜像命令格式：`docker search [options] <镜像名>[:TAG]`

```sh
# 查询指定的镜像格式
docker search [options] <镜像名>[:TAG]

# 列出收藏数不少于指定值的镜像
docker search -s <收藏数/指定值> <镜像名>

# 显示完整的镜像信息
docker search --no-trunc <镜像名>
```

通过命令无法列出版本，只能指定查询某个版本是否存在，所以建议还是去 Docker Hub 查看版本号

```sh
docker search <镜像名:版本号>
```

> **例子 1：查询 MySQL**

```sh {1}
[root@master ~]# docker search mysql
NAME                            DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                           MySQL is a widely used, open-source relation…   13151     [OK]
mariadb                         MariaDB Server is a high performing open sou…   5024      [OK]
phpmyadmin                      phpMyAdmin - A web interface for MySQL and M…   622       [OK]
percona                         Percona Server is a fork of the MySQL relati…   584       [OK]
bitnami/mysql                   Bitnami MySQL Docker Image                      76                   [OK]
databack/mysql-backup           Back up mysql databases to... anywhere!         66
linuxserver/mysql-workbench                                                     43
linuxserver/mysql               A Mysql container, brought to you by LinuxSe…   37
ubuntu/mysql                    MySQL open source fast, stable, multi-thread…   36
circleci/mysql                  MySQL is a widely used, open-source relation…   27
google/mysql                    MySQL server for Google Compute Engine          21                   [OK]
rapidfort/mysql                 RapidFort optimized, hardened image for MySQL   13
bitnami/mysqld-er                                                         3
ibmcom/mysql-s390x              Docker image for mysql-s390x                    2
vitess/mysqlctld                vitess/mysqlctld                                1                    [OK]
newrelic/mysql-plugin           New Relic Plugin for monitoring MySQL databa…   1                    [OK]
hashicorp/mysql-portworx-demo                                                   0
mirantis/mysql                                                                  0
docksal/mysql                   MySQL service images for Docksal - https://d…   0
cimg/mysql                                                                      0
drud/mysql                                                                      0
silintl/mysql-backup-restore    Simple docker image to perform mysql backups…   0                    [OK]
corpusops/mysql                 https://github.com/corpusops/docker-images/     0
drud/mysql-local-57             ddev mysql local container                      0
drud/mysql-docker-local-57      This repo has been deprecated, new tags are …   0
```

- NAME: 镜像仓库源的名称
- DESCRIPTION: 镜像的描述
- OFFICIAL: 是否为官方发布，OK 代表是官方发布，空白代表是个人发布
- STARS: 类似 Github 里面的 star，表示点赞、喜欢的意思
- AUTOMATED: 是否自动构建

### 镜像下载

从远程仓库下载镜像命令格式：`docker pull <镜像名>[:TAG | @DIGEST]`

- TAG：版本号、标签
- DIGEST：摘要

推荐通过「版本号」下载镜像，如果不指定版本，默认最新版 `latest`

```sh
# 下载镜像格式
docker pull <镜像名>[:TAG | @DIGEST]

# 通过「版本号」下载镜像
docker pull <镜像名:TAG>

# 通过「摘要」下载镜像
docker pull <镜像名:@DIGEST>
```

> **查看摘要**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220908/image.6r4ofi9v9r80.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220908/image.mo6n44962u8.webp)

> **例子 1：通过「版本」下载 MySQL 的 latest 版本**

```sh {2,5}
# 执行命令
docker pull mysql:latest

# 不指定版本号，默认下载 latest 版本
docker pull mysql

# 返回结果
latest: Pulling from library/mysql
a10c77af2613: Pull complete 
b76a7eb51ffd: Pull complete 
258223f927e4: Pull complete 
2d2c75386df9: Pull complete 
63e92e4046c9: Pull complete 
f5845c731544: Pull complete 
bd0401123a9b: Pull complete 
3ef07ec35f1a: Pull complete 
c93a31315089: Pull complete 
3349ed800d44: Pull complete 
6d01857ca4c1: Pull complete 
4cc13890eda8: Pull complete 
Digest: sha256:aeecae58035f3868bf4f00e5fc623630d8b438db9d05f4d8c6538deb14d4c31b
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest
```

> **例子 2：通过「摘要」下载 MySQL 的 latest 版本**

```sh {2}
# 执行命令
docker pull mysql:sha256:1ea233722275afb6bf54bdb53bcb162bdb9f3ceed69c64836250f72bc641f63a

# 返回结果
latest: Pulling from library/mysql
a10c77af2613: Pull complete 
b76a7eb51ffd: Pull complete 
258223f927e4: Pull complete 
2d2c75386df9: Pull complete 
63e92e4046c9: Pull complete 
f5845c731544: Pull complete 
bd0401123a9b: Pull complete 
3ef07ec35f1a: Pull complete 
c93a31315089: Pull complete 
3349ed800d44: Pull complete 
6d01857ca4c1: Pull complete 
4cc13890eda8: Pull complete 
Digest: sha256:aeecae58035f3868bf4f00e5fc623630d8b438db9d05f4d8c6538deb14d4c31b
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest
```

### 查看镜像/容器/数据卷所占的空间

```sh {1}
[root@master ~]# docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          3         1         177MB     177MB (99%)
Containers      2         0         0B        0B
Local Volumes   0         0         0B        0B
Build Cache     0         0         0B        0B
```

+ 镜像，容器，本地卷，构建的缓存

### 镜像删除

在本地仓库删除镜像命令格式：

- 完整：`docker image rm [options] <镜像名>[:TAG | IMAGE ID]`
- 简写： `docker rmi [options] <镜像名>[:TAG | IMAGE ID]`

`i` 指的是 image

```sh
# 删除镜像 完整格式
docker image rm [options] <镜像名>[:TAG | IMAGE ID]

# 删除镜像 简写格式
docker rmi [options] <镜像名>[:TAG | IMAGE ID]

# 强制删除镜像
docker image rm -f <镜像名>
docker rmi -f <镜像名>

# 通过「版本号」删除镜像
docker rmi <镜像名>:TAG

# 通过「镜像 id」删除镜像
docker rmi <镜像名>:IMAGE ID
```

> **例子 1：直接删除 hello-world 镜像**

```sh {2,4}
# 完整格式
docker image rm hello-world
# 简写格式
docker rmi hello-world

# 返回结果
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container 2be48e124757 is using its referenced image feb5d9fea6a5
```

返回结果报错了，原因有两点，要么是容器（container）曾经运行过（类似于 Windows 里运行的软件无法删除），要么存在镜像依赖。

两种解决方案：

- 使用强制删除镜像命令

```sh
docker rmi -f hello-world
```

这将会让它产生的历史容器也被删除。

::: tip 注意

正在运行容器的镜像无法删除，先停止运行的容器才可以强制删除对应镜像。

:::

+ 报错的结果已经给了容器的 id，先删除容器 id，再重新删除 hello-world 镜像

```sh
docker rm feb5d9fea6a5
docker rmi hello-world
```

删除容器id不需要 `i`

> **例子 2：通过 hello-world 镜像的唯一标识符(tag、id)进行删除**

```sh
[root@master ~]# docker images hello-world
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   11 months ago   13.3kB
```

删除 hello-world 镜像

```sh
docker rmi hello-world:latest
# 或者
docker rmi hello-world:feb5d9fea6a5
```

> **例子 3：删除全部镜像**

如果不强制删除，需要先删除容器id（如果容器存在）

```sh
docker rmi -f $(docker images -q)
```

`$()` 类似于 Linux 的管道符号 `|`，先执行括号里的命令，再执行外面的命令。

### docker虚悬镜像是什么？

仓库名、标签都是`<none>`的镜像，被称为虚悬镜像。

### 镜像命名

如果你觉得下载的镜像名或者镜像 TAG 太长，可以进行重命名。

我们可以手动新增镜像的版本，也就是设置 TAG，并改名，格式为：`docker tag <ID> | <镜像名:原来 TAG> <镜像名>:<新的 TAG>`

```sh
# 手动新增镜像的 TAG
docker tag <ID> | <镜像名:原来 TAG> <镜像名>:<新的 TAG>
```

> **例子 1：新增 hello-world 的版本 TAG 为 1.0**

```sh
# 执行命令
docker tag feb5d9fea6a5 hello-world:v1.0

# 返回结果
REPOSITORY    TAG       IMAGE ID       CREATED       SIZE
hello-world   latest    feb5d9fea6a5   8 weeks ago   13.3kB
hello-world   v1.0      feb5d9fea6a5   8 weeks ago   13.3kB
```

> **例子 2：下载的镜像名和版本名太长，可以新增一个短的版本，并修改镜像名，再删除掉长的版本**

我刚下载了 Tomcat 镜像，因为版本太长，可以先新增一个短的版本名，再删除掉长的版本名，将 `8.5.73-jre8-temurin-focal` 改为 `8.5.73`，顺便把 tomcat 改为 tom

```sh
# 执行命令
docker images tomcat

# 返回结果
REPOSITORY    TAG                         IMAGE ID       CREATED        SIZE
tomcat        8.5.73-jre8-temurin-focal   7ec084df520c   24 hours ago   249MB

# 新增短版本
docker tag 7ec084df520c tom:8.5.73
# 删除长版本
docker rmi tomcat:8.5.73-jre8-temurin-focal

# 查询查看镜像
docker images tom

# 返回结果
REPOSITORY    TAG                         IMAGE ID       CREATED        SIZE
tom        	  8.5.73                      7ec084df520c   24 hours ago   249MB
```

### 镜像打包

利用 `save` 可以打包镜像，格式有两个，分别为：

- `docker save > <名称.tar> <镜像 ID>`
- `docker save <镜像名>[:TAG | ID] -o <名称.tar>`

```sh
docker save > <名称.tar> <镜像 ID>
# 或者
docker save <镜像名>[:TAG | ID] -o <名称.tar>
```

**这里的镜像 ID 不能修改为镜像版本 TAG。**

> **例子 1：打包 hello-world 镜像为 myHelloWorld.tar**

```sh
# 执行命令
docker images

# 返回结果
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
tomcat        8.5.73    7ec084df520c   24 hours ago   249MB
mysql         latest    b05128b000dd   2 days ago     516MB
hello-world   latest    feb5d9fea6a5   8 weeks ago    13.3kB

# 打包命令
docker save > myHelloWorld.tar feb5d9fea6a5
# 或者
docker save hello-world -o myHelloWorld.tar
```

### 镜像载入

利用 `load` 可以导入镜像，格式为：`docker load -i <名称.tar>`

```sh
docker load -i <名称.tar>
```

> **例子 1：解压 myHelloWorl.tar**

进入镜像包目录下执行命令：

```sh
docker load -i myHelloWorld.tar
# 或者
docker load < myHelloWorld.tar
```

`-i` 或者 `<` 表示从文件输入。会成功导入镜像及相关元数据，包括 tag 信息

### 镜像信息

镜像是由一层一层的文件系统组成，在下载镜像的时候就发现，下载了很多文件，那么如何查看这些文件信息呢？

在 Windows 系统，如果查看文件夹的信息，**右键 -> 属性** 即可查看文件夹里的文件个数、创建时间等信息。镜像也可以查看自己的信息。

查看镜像信息的命令格式：`docker images inspect <镜像名>[:TAG | ID]`

```sh
docker images inspect <镜像名>[:TAG | ID]

# 可以简写
docker inspect <镜像名>[:TAG | ID]
```

> **例子 1：查看 tomcat 的组成文件**

```sh
# 执行命令
docker images

# 返回结果
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
tomcat        8.5.73    7ec084df520c   24 hours ago   249MB
mysql         latest    b05128b000dd   2 days ago     516MB
hello-world   latest    feb5d9fea6a5   8 weeks ago    13.3kB

# 查看 tomcat 的组成文件
docker image inspect tomcat:8.5.73

# 返回结果太长，自行实践
......
```

## Docker容器命令

::: tip 切记

容器的唯一标识是 id 和 names（名字）。（大部分情况下）能以 id 操作容器，则也能以 name 操作容器，反之亦然。

内容例子可能只写一个标识如 id，忽略另一个，但请记住，两者使用任意一个标识都可以。

:::

### 容器启动

启动容器内容比较长，大纲如下：

- 概念
- 简单启动，不涉及后台启动，端口映射。外界无法访问该容器
- 宿主机端口与容器端口映射
- 后台启动
- 指定名称启动

> **概念**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220908/image.4ecsbpz8cro0.webp)

首先我们要知道，Docker 启动一个容器，这个容器与操作系统是隔离的，比如 Tomcat 容器的端口是 8080，操作系统的 IP 是 `http://192.168.199.27`，则访问 Tomcat 的界面 `http://192.168.199.27:8080` 是失败的，这就是容器的隔离效果。你访问的是操作系统的 8080 端口，不是容器的 8080 端口。所以 **我们在启动容器时要将容器的端口和操作系统的端口进行绑定（映射）**，这样，外界访问操作系统的端口，就会转发给容器的端口。

通过镜像启动一个容器，格式为：`docker run [options] <镜像名[:tag | 镜像 id]>`

```sh
docker run [options] <镜像名[:tag | 镜像 id]>
			-p       # 指定端口号，将容器的端口和操作系统端口进行绑定
			-d       # 启动守护式容器，在后台启动容器
			--name   # 为容器起一个别名
			-it      # 打开窗口以交互模式启动容器，进入容器进程内容会有讲解
			--restart=always     # 固定格式，容器一旦关闭就会自启动，一般用于经常发生意外而宕机的容器
			--rm     # 容器启动成功并进入容器，再退出来后，容器自动停止并删除，一般在测试情况下使用

# 完整格式
docker run -p 系统端口:容器端口 -p 系统端口:容器端口 ... -d --name 容器别名 镜像名:tag | 镜像 id
```

其中 tag（TAG） 或者容器 id（IMAGE ID）选一个即可。

**options 常用参数说明：**

| 参数       | 说明                                                         |
| :--------- | ------------------------------------------------------------ |
| -d         | 启动守护式容器，在后台启动容器，并返回容器的id！             |
| -i         | 以交互(interactive)模式运行容器，通过和 -t 一起使用          |
| -t         | 给容器重新分配一个终端(tty)，通常和 -i 一起使用              |
| -P         | 随机端口映射（大写）                                         |
| -p         | 指定端口映射（小写），将容器的端口和操作系统端口进行绑定（映射），多个 `-p` 可以指定多个端口号 |
| --name="x" | 给容器指定一个名字，如果不设置别名，启动容器会自动给该容器取一个名字 |

> **简单启动**

简单启动一个容器，不涉及后台启动，端口映射，外界无法访问该容器。

```sh
# 执行命令
docker images tomcat

# 返回结果
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
tomcat       8.5.73    7ec084df520c   24 hours ago   249MB

# 启动命令 1，默认启动 latest 版本
docker run tomcat

# 启动命令 2，启动 8.5.73 版本
docker run hello-world:8.5.73

# 启动命令 3，启动 id 为 7ec084df520c 的镜像
docker run hello-world:7ec084df520c
```

> **宿主机端口与容器端口映射**

如果想外界访问容器，比如容器启动了 Tomcat，外界想访问 Tomcat，则需要将 Tomcat 容器和操作系统端口进行绑定（映射），这样，访问操作系统端口就会转发到容器端口。

用 `-p` 进行映射。

```sh
docker run -p 8080:8080 tomcat:8.5.73

# 如果想多个映射
docker run -p 8080:8080 -p 8081:8080 tomcat:8.5.73
```

8080/8080 中前面的 8080 是操作系统的端口，后面的 8080 端口是容器的端口，操作系统的端口只要不占用，随便写，但是容器的端口是固定的。

此时启动还是前台启动。

> **后台启动**

前台启动导致无法操作界面，只能看控制台输出发呆，所以需要后台启动

```sh
docker run -p 8080:8080 -d tomcat:8.5.73
```

> **指定名称启动**

**如何精确找到并操作某一个 Docker 容器？**

- 容器 id
- 容器名称

可以通过 id 操作容器，但是启动容器时会自动生成随机的 id，很难记住，不可能每次想操作容器都要查看一下容器的 id，所以容器的名称非常重要，默认启动容器会自动生成随机的名称，我们也可以指定名称，通过 `--name` 选项

```sh{2,5,8}
# 启动 tomcat
docker run -d --name tomcat01 tomcat:8.5.73

# 查看容器运行状态，后面有讲解
docker ps

# 返回容器运行状态
[root@master ~]# docker ps
CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS          PORTS                                       NAMES
e323fce921be   tomcat:8.5.73   "catalina.sh run"   5 seconds ago    Up 4 seconds    8080/tcp                                    tomcat01
```

> **交互模式启动容器**

在启动容器的时候，我们可以启动完成后 **直接进入容器内部**。使用 `-it` 即可实现，需要指定的容器内部使用窗口如 shell 窗口、bash 窗口。

```sh {2}
# 执行命令
[root@master ~]# docker run -it tomcat:8.5.73 bash
# 此时已经进入了 Tomcat 容器内部，长什么样子呢？和 Windows 下的根目录类似
root@8d9ffc09a8e8:/usr/local/tomcat# ls
BUILDING.txt     LICENSE  README.md      RUNNING.txt  conf  logs            temp     webapps.dist
CONTRIBUTING.md  NOTICE   RELEASE-NOTES  bin          lib   native-jni-lib  webapps  work
```

::: warning

交互模式启动容器，不能加入 `-d`，否则启动后无法进入容器。

:::

上面的例子都是单独针对某个选项而言，实际使用，我们需要将它们组合在一起，如：

```sh
docker run -d  --name tomcat01 -p 8080:8080 tomcat:8.5.73
```

### 容器查看

容器查看的格式：`docker ps [options]`

**options 常用参数说明：**

| 参数 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| -a   | 表示 all，所有的，列出当前所有正在运行的容器 + 历史运行过的容器 |
| -l   | 显示最近创建的容器                                           |
| -n=? | 显示最近n个创建的容器                                        |
| -q   | 静默模式，返回正在运行的容器 id。                            |

```sh {2,7,18}
# 查看正在运行的容器
[root@master ~]# docker ps
CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS          PORTS      NAMES
e323fce921be   tomcat:8.5.73   "catalina.sh run"   12 minutes ago   Up 12 minutes   8080/tcp   tomcat01

# 查看所有容器，包括历史运行的容器
[root@master ~]# docker ps -a
CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS                        PORTS      NAMES
8d9ffc09a8e8   tomcat:8.5.73   "bash"              10 minutes ago   Exited (0) 9 minutes ago                 nifty_goldstine
e323fce921be   tomcat:8.5.73   "catalina.sh run"   12 minutes ago   Up 12 minutes                 8080/tcp   tomcat01
42e9b9dfa967   tomcat:8.5.73   "catalina.sh run"   13 minutes ago   Exited (143) 6 minutes ago               elegant_hawking
9c5812be9efd   tomcat:8.5.73   "catalina.sh run"   13 minutes ago   Exited (130) 13 minutes ago              dazzling_herschel
fb74a2687495   tomcat:8.5.73   "catalina.sh run"   14 minutes ago   Exited (130) 14 minutes ago              reverent_curran
f27f7f59368f   feb5d9fea6a5    "/hello"            3 days ago       Exited (0) 3 days ago                    happy_mayer
c7b6f05514ea   feb5d9fea6a5    "/hello"            3 days ago       Exited (0) 3 days ago                    hopeful_lalande

# 查看所有容器的 ID，包括历史运行的容器
[root@master ~]# docker ps -aq
8d9ffc09a8e8
e323fce921be
42e9b9dfa967
9c5812be9efd
fb74a2687495
f27f7f59368f
c7b6f05514ea
```

返回结果参数名：

- CONTAINER ID：容器 id（唯一）
- IMAGE：生成容器的镜像名
- COMMAND：容器启动后，内部执行的命令
- CREATED：创建时间
- STATUS：当前状态
- PORTS：容器监听的端口
- NAMES：容器的别名

### 容器退出

| 指令     | 说明           |
| -------- | -------------- |
| exit     | 容器停止退出   |
| ctrl+P+Q | 容器不停止退出 |

### 容器再启动

容器再启动命令格式：`docker start <容器 id | 容器名>`

```sh
docker start <容器 id | 容器名>
```

首先查看历史运行的容器 id 或者名称，再启动历史运行的容器

```sh {2,15}
# 查看所有容器，包括曾经运行的容器
[root@master ~]# docker ps -a
CONTAINER ID   IMAGE           COMMAND             CREATED              STATUS                        PORTS      NAMES
5d3f5ce66c6f   ubuntu          "/bin/bash"         About a minute ago   Up About a minute                        nifty_brown
e86b30e440cb   ubuntu          "/bin/bash"         11 minutes ago       Exited (130) 8 minutes ago               hungry_poincare
8d9ffc09a8e8   tomcat:8.5.73   "bash"              50 minutes ago       Exited (0) 48 minutes ago                nifty_goldstine
e323fce921be   tomcat:8.5.73   "catalina.sh run"   51 minutes ago       Up 51 minutes                 8080/tcp   tomcat01
42e9b9dfa967   tomcat:8.5.73   "catalina.sh run"   52 minutes ago       Exited (143) 46 minutes ago              elegant_hawking
9c5812be9efd   tomcat:8.5.73   "catalina.sh run"   52 minutes ago       Exited (130) 52 minutes ago              dazzling_herschel
fb74a2687495   tomcat:8.5.73   "catalina.sh run"   53 minutes ago       Exited (130) 53 minutes ago              reverent_curran
f27f7f59368f   feb5d9fea6a5    "/hello"            3 days ago           Exited (0) 3 days ago                    happy_mayer
c7b6f05514ea   feb5d9fea6a5    "/hello"            3 days ago           Exited (0) 3 days ago                    hopeful_lalande

# 再启动容器
[root@master ~]# docker start 8d9ffc09a8e8
```

### 容器停止和重启

容器正常停止命令格式：`docker stop <容器 id | 容器名>`

容器立即停止命令格式：`docker kill <容器 id | 容器名>`

容器重启命令格式：`docker restart <容器 id | 容器名>`

先正常停止 Tomcat 容器，再启动 Tomcat 容器，然后重启 Tomcat 容器，最后立即停止 Tomcat 容器。（这里演示 id，其实 name 也可以）

```sh
# 查看历史运行的容器
[root@master ~]# docker ps -a
CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS                        PORTS      NAMES
5d3f5ce66c6f   ubuntu          "/bin/bash"         6 minutes ago    Up 6 minutes                             nifty_brown
e86b30e440cb   ubuntu          "/bin/bash"         16 minutes ago   Exited (130) 13 minutes ago              hungry_poincare
8d9ffc09a8e8   tomcat:8.5.73   "bash"              55 minutes ago   Up 3 minutes                  8080/tcp   nifty_goldstine
e323fce921be   tomcat:8.5.73   "catalina.sh run"   56 minutes ago   Up 7 seconds                  8080/tcp   tomcat01
42e9b9dfa967   tomcat:8.5.73   "catalina.sh run"   57 minutes ago   Exited (143) 51 minutes ago              elegant_hawking
9c5812be9efd   tomcat:8.5.73   "catalina.sh run"   57 minutes ago   Exited (130) 57 minutes ago              dazzling_herschel
fb74a2687495   tomcat:8.5.73   "catalina.sh run"   58 minutes ago   Exited (130) 58 minutes ago              reverent_curran
f27f7f59368f   feb5d9fea6a5    "/hello"            3 days ago       Exited (0) 3 days ago                    happy_mayer
c7b6f05514ea   feb5d9fea6a5    "/hello"            3 days ago       Exited (0) 3 days ago                    hopeful_lalande

# 正常停止容器
[root@master ~]# docker stop tomcat01
tomcat01

# 启动 Tomcat 容器
[root@master ~]# docker start tomcat01
tomcat01

# 重启容器
[root@master ~]# docker restart tomcat01
tomcat01

# 立即停止容器
[root@master ~]# docker kill tomcat01
tomcat01
```

如果容器处于特殊状态，立即停止 `kill` 命令可能造成严重后果。

### 容器删除和清除

容器删除命令格式：`docker rm [options] <容器 id | 容器名>`

容器清除命令格式：`docker container prune`

```sh
# 删除命令格式
docker rm [options] <容器 id | 容器名>

# 强制删除
docker rm -f <容器 id | 容器名>
```

例子：删除Tomcat的历史容器

```sh
# 查看历史运行容器
[root@master ~]# docker ps -a
CONTAINER ID   IMAGE           COMMAND             CREATED             STATUS                           PORTS      NAMES
5d3f5ce66c6f   ubuntu          "/bin/bash"         11 minutes ago      Up 11 minutes                               nifty_brown
e86b30e440cb   ubuntu          "/bin/bash"         21 minutes ago      Exited (130) 18 minutes ago                 hungry_poincare
8d9ffc09a8e8   tomcat:8.5.73   "bash"              About an hour ago   Up 9 minutes                     8080/tcp   nifty_goldstine
42e9b9dfa967   tomcat:8.5.73   "catalina.sh run"   About an hour ago   Exited (143) 56 minutes ago                 elegant_hawking
9c5812be9efd   tomcat:8.5.73   "catalina.sh run"   About an hour ago   Exited (130) About an hour ago              dazzling_herschel
fb74a2687495   tomcat:8.5.73   "catalina.sh run"   About an hour ago   Exited (130) About an hour ago              reverent_curran
f27f7f59368f   feb5d9fea6a5    "/hello"            3 days ago          Exited (0) 3 days ago                       happy_mayer
c7b6f05514ea   feb5d9fea6a5    "/hello"            3 days ago          Exited (0) 3 days ago                       hopeful_lalande
# 删除
[root@master ~]# docker rm 42e9b9dfa967 9c5812be9efd fb74a2687495 f27f7f59368f c7b6f05514ea
```

> 只是演示

有时候删除会报错，原因在于它处于运行状态，Windows 里正在运行的进程也不能删除。

**那么如何删除一个正在运行的容器呢？**

我们可以使用强制删除命令 `-f`

```sh
[root@master ~]# docker ps -a
CONTAINER ID   IMAGE           COMMAND       CREATED             STATUS                        PORTS      NAMES
5d3f5ce66c6f   ubuntu          "/bin/bash"   13 minutes ago      Up 13 minutes                            nifty_brown
e86b30e440cb   ubuntu          "/bin/bash"   23 minutes ago      Exited (130) 20 minutes ago              hungry_poincare
8d9ffc09a8e8   tomcat:8.5.73   "bash"        About an hour ago   Up 11 minutes                 8080/tcp   nifty_goldstine
[root@master ~]# docker rm -f 8d9ffc09a8e8
```

**如何删除所有的历史容器呢？**

别忘了，之前提到过的 `$()`，按照数学运算符号优先级来说，括号的执行优先级很高。

```sh
docker rm -f $(docker ps -qa)
```

也有专门的清除历史容器命令：`docker container prune`

```sh {2,7}
# 执行命令
docker container prune

# 返回结果
WARNING! This will remove all stopped containers.
# 输入 y 确定清除
Are you sure you want to continue? [y/N] y

# 查询查看历史容器
docker ps -a

# 返回结果
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

删除容器并不会删除它的镜像，此时可以理解镜像是安装包，容器是安装后的软件，只要保存好镜像（安装包），容器（软件）删除了可以再通过镜像（安装包） `run` 出来。

### 查看容器进程

查看容器进程命令格式：`docker top <容器 id | 容器名>`

```sh
docker top <容器 id | 容器名>
```

> **查看 Tomcat 容器的进程**

```sh
# 执行命令
[root@master ~]# docker ps

# 返回结果
CONTAINER ID   IMAGE     COMMAND             CREATED          STATUS          PORTS      NAMES
0c6e3fc4a28d   tomcat    "catalina.sh run"   11 seconds ago   Up 10 seconds   8080/tcp   tomcat01
5d3f5ce66c6f   ubuntu    "/bin/bash"         46 minutes ago   Up 46 minutes              nifty_brown

# 查看进程
[root@master ~]# docker top 0c6e3fc4a28d

# 返回结果
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                8573                8554                7                   23:20               ?                   00:00:02            /usr/local/openjdk-11/bin/java -Djava.util.logging.config.file=/usr/local/tomcat/conf/logging.properties -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Djdk.tls.ephemeralDHKeySize=2048 -Djava.protocol.handler.pkgs=org.apache.catalina.webresources -Dorg.apache.catalina.security.SecurityListener.UMASK=0027 -Dignore.endorsed.dirs= -classpath /usr/local/tomcat/bin/bootstrap.jar:/usr/local/tomcat/bin/tomcat-juli.jar -Dcatalina.base=/usr/local/tomcat -Dcatalina.home=/usr/local/tomcat -Djava.io.tmpdir=/usr/local/tomcat/temp org.apache.catalina.startup.Bootstrap start

```

可以查看容器的一些进程信息，如 UID，已经运行时间等。

### 查看容器细节

这个命令还是很常用的，要求容器必须运行起来。

查看容器内部细节命令格式：`docker inspect <容器 id | 容器名>`

```sh
docker inspect <容器 id | 容器名>
```

> **查看 Tomcat 容器的内部细节**

首先查看 Tomcat 容器的 id 或者 names（名字）

```sh
# 执行命令
docker ps

# 返回结果
CONTAINER ID   IMAGE           COMMAND             CREATED             STATUS          PORTS                                       NAMES
1365f332be6b   tomcat:8.5.73   "catalina.sh run"   About an hour ago   Up 12 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   tomcat01
```

接着查看 Tomcat 容器的内部细节

```sh
# 执行命令
docker inspect 1365f332be6b

# 返回结果（部分内容）
[
    {
        "Id": "70983c5ab3c77ce3bbc8c341e3debc866e5c797bdf6d18cbfb89fa0def4e79cb",
        "Created": "2022-09-08T15:26:42.214308916Z",
        "Path": "catalina.sh",
        "Args": [
            "run"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 8842,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-09-08T15:26:42.504365515Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
			"Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "88ffcfc688e0d2e932751871441b70c7cc7ebf3b44aa4d087879328e97a7587f",
                    "EndpointID": "a18572b17e13c83d569c771694b26c4c0240a4963b9631c381ae26e019a190c5",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.3",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:03",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

只截取一部分内容，可以看出有容器的状态，和操作系统绑定的端口等等信息。

### 查询运行日志

查询容器的 **运行** 日志命令格式：`docker logs [options] <容器 id | 容器名>`

```sh
# 查询容器的运行日志命令格式
docker logs [options] <容器 id | 容器名>

# 加入时间戳
docker logs -t <容器 id | 容器名>

# 监听日志的输出，一旦日志更新，显示在控制台上
docker logs -f <容器 id | 容器名>

# 显示日志的最后多少条数据，取决于数字
docker logs --tail 数字 <容器 id | 容器名>
```

| 参数     | 说明                                 |
| -------- | ------------------------------------ |
| -t       | 显示时间戳                           |
| -f       | 监听日志，一旦更新，立即打印在控制台 |
| --tail N | 显示日志的最后 N 条数据              |

> **例子 1：查看容器的日志(显示时间戳)**

```sh
# 执行命令
docker ps

# 返回结果
CONTAINER ID   IMAGE           COMMAND             CREATED        STATUS         PORTS                                       NAMES
1365f332be6b   tomcat:8.5.73   "catalina.sh run"   13 hours ago   Up 5 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   tomcat01

# 查看容器日志(显示时间戳)
docker logs -t 1365f332be6b
```

> **例子 2：实时监听容器的日志**

要求：先运行容器才能实时监听容器的日志

```sh
# 执行命令
docker ps

# 返回结果
CONTAINER ID   IMAGE           COMMAND             CREATED        STATUS         PORTS                                       NAMES
1365f332be6b   tomcat:8.5.73   "catalina.sh run"   13 hours ago   Up 5 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   tomcat01

# 查看容器日志(显示时间戳)
docker logs -tf 1365f332be6b
```

> **例子 3：查看日志的最后 5 行记录**

```sh
# 执行命令
docker ps

# 返回结果
CONTAINER ID   IMAGE           COMMAND             CREATED        STATUS         PORTS                                       NAMES
1365f332be6b   tomcat:8.5.73   "catalina.sh run"   13 hours ago   Up 5 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   tomcat01

# 查看容器日志(显示时间戳)
docker logs -t --tail 5 1365f332be6b

# 返回结果
2021-11-20T04:11:38.947501511Z 20-Nov-2021 04:11:38.947 INFO [main] org.apache.catalina.startup.Catalina.load Initialization processed in 2190 ms
2021-11-20T04:11:39.030048052Z 20-Nov-2021 04:11:39.029 INFO [main] org.apache.catalina.core.StandardService.startInternal Starting service [Catalina]
2021-11-20T04:11:39.030143031Z 20-Nov-2021 04:11:39.029 INFO [main] org.apache.catalina.core.StandardEngine.startInternal Starting Servlet engine: [Apache Tomcat/8.5.73]
2021-11-20T04:11:39.069039566Z 20-Nov-2021 04:11:39.068 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
2021-11-20T04:11:39.080909086Z 20-Nov-2021 04:11:39.080 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 133 ms
```

### 进入容器进程

先启动 Tomcat

```sh
# 执行命令
docker ps -a

# 返回结果
CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS                        PORTS     NAMES
1365f332be6b   tomcat:8.5.73   "catalina.sh run"   39 minutes ago   Exited (143) 34 minutes ago             tomcat01
156e574bee6a   hello-world     "/hello"            3 hours ago      Exited (0) 2 hours ago                  sweet_kare

# 启动 Tomcat
docker start 1365f332be6b
```

- 第一种命令：`docker attach`

```sh
# 执行命令
docker ps

# 返回结果
CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS          PORTS                                       NAMES
1365f332be6b   tomcat:8.5.73   "catalina.sh run"   42 minutes ago   Up 20 seconds   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   tomcat01

# 进入容器内
docker attach 1365f332be6b

# 退出
exit
```

  可以看出，该命令进入容器后，如果退出容器，容器自动结束运行。

- 第二种命令：`docker exec`，格式为：`docker exec [options] <容器 id> <容器使用的终端窗口>`

```sh
docker exec [options] <容器 id> <容器使用的终端窗口>

# 以交互模式运行容器，通常与 -t 一起使用
docker exec -i <容器 id> <容器使用的终端窗口>

#分配一个伪终端，如 shell窗口、base 窗口
docker exec -t <容器 id> <容器使用的终端窗口>

#建议一起使用
docker exec -it <容器 id> <容器使用的终端窗口>
```

  `-i`：以交互模式运行容器，通常与 -t 一起使用

  `-t`：分配一个伪终端，如 shell窗口、base 窗口

  > **进入 Tomcat 容器内部**

  ```sh {1,9}
  # 执行命令
  docker exec -it 1365f332be6b bash
  
  # 进入容器内部，查看容器内部
  root@1365f332be6b:/usr/local/tomcat# ls
bin  BUILDING.txt  conf  CONTRIBUTING.md  lib  LICENSE  logs  native-jni-lib  NOTICE  README.md  RELEASE-NOTES  RUNNING.txt  temp  webapps  webapps.dist  work
  
# 从容器内部退出
  root@1365f332be6b:/usr/local/tomcat# exit

  # 查看容器是否停止运行
  docker ps
  
  # 返回结果
  CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS          PORTS                                       NAMES
  1365f332be6b   tomcat:8.5.73   "catalina.sh run"   51 minutes ago   Up 26 seconds   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   tomcat01
  ```

- 第 6 行是不是很熟悉，就是 Tomcat 的根目录，这就是 Tomcat 容器的根目录。

  `exit` 退出容器后，Docker 不会停止运行容器

**区别：**

使用 `docker attach` 进入容器后，exit 退出来便容器也停止运行了。而 `docker exec` 则不会这样操作导致停止运行容器。

推荐使用 `docker exec` 命令，因为该命令退出容器终端，不会导致容器的停止。

### 宿主机文件 > 容器

将宿主机的文件拷贝到容器里命令格式：`docker cp <宿主机文件 | 目录> <容器 id:容器路径>`

```sh
docker cp <宿主机文件 | 目录> <容器 id:容器路径>
```

> **将宿主机的 杂文.txt 文件拷贝到 Tomcat 容器里**

杂文.txt 文件在 /opt 目录下

```sh
cd /opt
ls

# 返回结果
activemq  containerd  dump.rdb  jdk  mysql  README.md  redis  rh  tomcat 杂文.txt
```

Tomcat 容器的 id是 1365f332be6b，拷贝到的路径是 /usr/local/tomcat/

```sh
docker cp 杂文.txt 1365f332be6b:/usr/local/tomcat/

# 进入容器
docker exec -it 1365f332be6b bash

# 查看当前路径内容
oot@1365f332be6b:/usr/local/tomcat# ls

# 返回结果
bin           conf             lib      logs            NOTICE     RELEASE-NOTES  temp     webapps.dist  杂文.txt
BUILDING.txt  CONTRIBUTING.md  LICENSE  native-jni-lib  README.md  RUNNING.txt    webapps  work
```

### 容器导入/导出

+ 导入和导出容器

+ export 导出容器的内容留作为一个tar归档文件[对应import命令]

+ import 从tar包中的内容创建一个新的文件系统再导入为镜像[对应export]

+ 命令

```sh
docker export 容器ID > 文件名.tar
```

```sh
cat 文件名.tar | docker import - 镜像用户/镜像名:镜像版本号
```

+ 案例

```sh {5,14}
[root@master ~]# docker ps -a
CONTAINER ID   IMAGE     COMMAND             CREATED             STATUS             PORTS                                         NAMES
70983c5ab3c7   tomcat    "catalina.sh run"   35 minutes ago      Up 18 minutes      0.0.0.0:49154->8080/tcp, :::49154->8080/tcp   tomcat01
5d3f5ce66c6f   ubuntu    "/bin/bash"         About an hour ago   Up About an hour                                                 nifty_brown
[root@master ~]# docker export 70983c5ab3c7 > ABCD.tar
[root@master ~]# ls
          anaconda-ks.cfg  BUILDING.txt  initial-setup-ks.cfg  nodes-6379.conf  公共  视频  文档  音乐
ABCD.tar  appendonly.aof   dump.rdb      lua_demo              postfile         模板  图片  下载  桌面

# 删除
docker rm -f tomcat01

# 从tar包中的内容创建一个新的文件系统再导入为镜像
[root@frx01 ~]# cat ABCD.tar | docker import - frx01/tomcat02:8.5.27
sha256:bc554c9488cc1b4ff0649eaeb9cd6fa0ffc763f4a48a6796499fc05cb37eaf6b
```

## 常用命令总结

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.33l1vukec220.webp)

| 命令    | 官方说明                                                     | 解释                                                         |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| attach  | Attach local standard input, output, and error streams to a running container | 当前 shell 下 attach 连接指定运行镜像                        |
| build   | Build an image from a Dockerfile                             | 通过 Dockerfile 定制镜像                                     |
| commit  | Create a new image from a container's changes                | 提交当前容器为新的镜像                                       |
| cp      | Copy files/folders between a container and the local filesystem | 从容器中拷贝指定文件或者目录到宿主机中                       |
| create  | Create a new container                                       | 创建一个新的容器，同 run，但不启动容器                       |
| diff    | Inspect changes to files or directories on a container's filesystem | 查看 docker 容器变化                                         |
| events  | Get real time events from the server                         | 从 docker 服务获取容 器实时事件                              |
| exec    | Run a command in a running container                         | 在已存在的容器上运行命令                                     |
| export  | Export a container's filesystem as a tar archive             | 导出容器的内 容流作为一个 tar 归档文件[对应 import ]         |
| history | Show the history of an image                                 | 展示一个镜像形成历史                                         |
| images  | List images                                                  | 列出系统当前镜像                                             |
| import  | Import the contents from a tarball to create a filesystem image | 从 tar包中的内容创建一个新的文件系统映像[对应export]         |
| info    | Display system-wide information                              | 显示系统相关信息                                             |
| inspect | Return low-level information on Docker objects               | 查看容器详细信息                                             |
| kill    | Kill one or more running containers                          | 杀掉 指定 docker 容器                                        |
| load    | Load an image from a tar archive or STDIN                    | 从一个 tar 包中加载一 个镜像[对应 save]                      |
| login   | Log in to a Docker registry                                  | 登陆一个 docker 源服务器                                     |
| logout  | Log out from a Docker registry                               | 从当前 Docker registry 退出                                  |
| logs    | Fetch the logs of a container                                | 输出当前容器日志信息                                         |
| pause   | Pause all processes within one or more containers            | 暂停容器                                                     |
| port    | List port mappings or a specific mapping for the container   | 查看映射端口对应的容器内部源端口                             |
| ps      | List containers                                              | 列出容器列表                                                 |
| pull    | Pull an image or a repository from a registry                | 从docker镜像源服务器拉取指定镜像或者库镜像                   |
| push    | Push an image or a repository to a registry                  | 推送指定镜像或者库镜像至docker源服务器                       |
| rename  | Rename a container                                           | 给一个容器改名                                               |
| restart | Restart one or more containers                               | 重启运行的容器                                               |
| rm      | Remove one or more containers                                | 移除一个或者多个容器                                         |
| rmi     | Remove one or more images                                    | 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除] |
| run     | Run a command in a new container                             | 创建一个新的容器并运行 一个命令                              |
| save    | Save one or more images to a tar archive (streamed to STDOUT by default) | 保存一个镜像为一个 tar 包[对应 load]                         |
| search  | Search the Docker Hub for images                             | 在 docker hub 中搜 索镜像                                    |
| start   | Start one or more stopped containers                         | 启动容器                                                     |
| stats   | Display a live stream of container(s) resource usage statistics | 显示容器资源使用统计信息的实时信息                           |
| stop    | Stop one or more running containers                          | 停止容器                                                     |
| tag     | Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE        | 给源中镜像打标签                                             |
| top     | Display the running processes of a container                 | 查看容器中运行的进程信 息                                    |
| unpause | Unpause all processes within one or more containers          | 取消暂停容器                                                 |
| update  | Update configuration of one or more containers               | 更新容器配置                                                 |
| version | Show the Docker version information                          | 查看 docker 版本号                                           |
| wait    | Block until one or more containers stop, then print their exit codes | 截取容器停止时的退出状态值                                   |

## 总结图片

如果觉得内容过于繁多或者复杂，这里提供图片形式的命令

来源：[https://www.bilibili.com/video/BV1ZT4y1K75K](https://www.bilibili.com/video/BV1ZT4y1K75K)

### 镜像命令图片

![image-20211120172453603](https://cdn.staticaly.com/gh/Kele-Bingtang/static@master/img/Docker/20211120172455.png)

![image-20211120172716950](https://cdn.staticaly.com/gh/Kele-Bingtang/static@master/img/Docker/20211120172720.png)

### 容器命令图片

![image-20211120172301522](https://cdn.staticaly.com/gh/Kele-Bingtang/static@master/img/Docker/20211120172307.png)

![image-20211120172319882](https://cdn.staticaly.com/gh/Kele-Bingtang/static@master/img/Docker/20211120172327.png)

![image-20211120172737409](https://cdn.staticaly.com/gh/Kele-Bingtang/static@master/img/Docker/20211120172738.png)

![image-20211120172743635](https://cdn.staticaly.com/gh/Kele-Bingtang/static@master/img/Docker/20211120172745.png)