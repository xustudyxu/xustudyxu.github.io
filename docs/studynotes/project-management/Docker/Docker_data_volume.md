---
title: Docker 数据卷
date: 2022-09-17 22:55:54
permalink: /project-management/Docker/Docker_data_volume
categories:
  - Docker
tags:
  - Docker
---
# Docker 数据卷

[[toc]]

## 什么是数据卷

**数据卷** 是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性:

- **数据卷** 可以在容器之间共享和享用
- 对 **数据卷** 的修改立马生效
- 对 **数据卷** 的更新，不会影响镜像
- **数据卷** 默认会一直存在，即时容器被删除

::: tip 注意

**数据卷** 的使用，类似于 Linux 下对目录或者文件进行 mount，镜像中的被指定为挂载点的目录中的文件会复制到数据卷（仅数据卷为空时复制）

:::

## 为什么使用数据卷

- 当创建一个容器的时候，容器运行，数据能不能持久化
- 如果能够持久化，数据存储在哪？由于 docker 是隔离的，数据能不能存储在容器外
- 如果部署很多容器，每次都需要进入容器中进行配置嘛？能不能外部进行配置

docker 数据卷呈现给 docker 容器的一个形式就是目录，该目录支持多个容器间共享，修改不会影响到镜像。使用 Docker 的数据卷，类似在系统中使用 mount 挂载一个文件系统。

## 数据卷挂载操作

三种挂载数据卷格式

- 具体目录挂载：`docker run [options] -v <宿主机绝对路径:容器内的路径[:ro | rw]> <镜像名>`
- 默认目录挂载：`docker run [options] -v <任意别名:容器内的路径[:ro | rw]> <镜像名>`
- 匿名目录挂载：`docker run [options] -v <容器内的路径[:ro | rw]> <镜像名>`

默认目录挂载和匿名目录挂载的目录默认在 `/var/lib/docker/volumes/` 目录下。

宿主机挂载目录里，都会生成 `_data` 目录，该目录存放容器挂载目录下的数据。

### 具体目录挂载

自定义数据卷目录。

在用 docker run 命令的时候，使用 -v 标记来创建一个数据卷并挂载到容器里。

格式：`docker run [options] -v <宿主机绝对路径 | 任意别名:容器内的路径[:ro | rw]> <镜像名>`

```sh
docker run [options] -v <宿主机绝对路径 | 任意别名:容器内的路径:[:ro | rw]> <镜像名>
```

**宿主机路径必须是绝对路径，如果目录不存在 Docker 会自动为你创建它。**

`ro`：代表 read-only，容器的路径只允许读，不允许写。不影响宿主机的路径可读可写

`rw`：默认值，代表可读可写

> **例子 1：具名挂载**

```sh
docker run -d -p 8081:8080 --name tomcat02 -v /opt/aa:/usr/local/tomcat/webapps tomcat:8.5.73
```

**特点：宿主机的的挂载目录内容覆盖到容器的挂载目录内容**

因为 /opt/aa 目录为空，所以容器的 webapps 目录被 aa 目录覆盖，也为空。

**验证是否成功挂载**

```sh {8}
[root@frx01 ~]# docker ps
CONTAINER ID        IMAGE                                COMMAND                  CREATED             STATUS              PORTS                    NAMES
3302e930a1a8        tomcat:8.5.27                        "catalina.sh run"        42 seconds ago      Up 40 seconds       0.0.0.0:8081->8080/tcp   tomcat02
749c02466301        192.168.91.166:5000/zzyyubuntu:1.2   "/bin/bash"              3 days ago          Up 3 days                                    pedantic_gagarin
ad5ee6156b1c        registry                             "/entrypoint.sh /etc…"   3 days ago          Up 3 days           0.0.0.0:5000->5000/tcp   competent_meninsky

# 查看挂载信息
docker inspect 3302e930a1a8
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220918/image.4qmas1zt8z20.webp)

> **例子 2：测试容器和宿主机之间数据共享**

在 tomcat02 容器里创建 test.txt 文件

```sh
# 进入 tomcat02 容器
[root@frx01 ~]# docker exec -it tomcat02 bash

# 进入容器挂载目录
root@3302e930a1a8:/usr/local/tomcat# cd webapps/

# 创建 test.txt 文件
root@3302e930a1a8:/usr/local/tomcat/webapps# touch text.txt

# 查看是否创建成功
root@3302e930a1a8:/usr/local/tomcat/webapps# ls

# 返回结果
text.txt
```

在宿主机查看文件

```sh
# 进入 宿主机挂载目录
[root@frx01 ~]# cd /opt/aa

# 查看文件
[root@frx01 aa]# ls

 # 返回结果
text.txt
```

说明挂载成功，双方挂载的目录实现共享。

> **例子 3：容器停止运行，宿主机添加 test2.txt，再启动容器，文件是否同步到容器里？**

宿主机添加 test2.txt

```sh
# 进入 宿主机挂载目录
[root@frx01 aa]# cd /opt/aa

# 创建 test2.txt 文件 
[root@frx01 aa]# touch text2.txt

# 查看文件
[root@frx01 aa]# ls

# 返回结果
text2.txt  text.txt
```

启动 tomcat02 容器，查看挂载目录是否有 test2.txt

```sh
# 启动 tomcat02 容器
[root@frx01 aa]# docker start tomcat02
tomcat02

# 进入 tomcat02 容器
[root@frx01 aa]# docker exec -it tomcat02 bash

# 进入容器挂载目录
root@3302e930a1a8:/usr/local/tomcat# cd webapps/

# 查看文件
root@3302e930a1a8:/usr/local/tomcat/webapps# ls

# 返回结果
text.txt  text2.txt
```

说明数据依旧同步

> **例子 4：删除容器**

我们删除容器，看主机上数据是否会被删除

```sh {18}
# 执行命令
[root@frx01 aa]# docker ps

# 返回结果
CONTAINER ID        IMAGE                                COMMAND                  CREATED             STATUS              PORTS                    NAMES
3302e930a1a8        tomcat:8.5.27                        "catalina.sh run"        16 minutes ago      Up 16 minutes       0.0.0.0:8081->8080/tcp   tomcat02
749c02466301        192.168.91.166:5000/zzyyubuntu:1.2   "/bin/bash"              3 days ago          Up 3 days                                    pedantic_gagarin
ad5ee6156b1c        registry                             "/entrypoint.sh /etc…"   3 days ago          Up 3 days           0.0.0.0:5000->5000/tcp   competent_meninsky

# 删除容器
[root@frx01 aa]# docker rm -f 3302e930a1a8
3302e930a1a8

# 进入 aa 目录
[root@frx01 aa]# cd /opt/aa && ls

# 返回结果
text2.txt  text.txt
```

说明没有删除。

### 默认目录挂载

数据卷目录路径是固定的。

格式：`docker run [options] -v <任意别名:容器内的路径[:ro | rw]> <镜像名>`

```sh
docker run [options] -v <任意别名:容器内的路径[:ro | rw]> <镜像名>
```

任意别名是一个数据卷名字，名字可以随便写，Docker 会在 `/var/lib/docker/volumes` 目录下生成该数据卷，这是 docker 默认的数据卷目录。并且在数据卷里生成 `_data` 目录用于与容器目录同步数据。

`ro`：代表 read-only，容器的路径只允许读，不允许写。不影响宿主机的路径可读可写

`rw`：默认值，代表可读可写

> **例子 1：**

```sh
# 执行命令
[root@frx01 aa]# docker run -d -p 8080:8081 --name tomcat -v aa:/usr/local/tomcat/webapps tomcat:8.5.27

[root@frx01 aa]# find / -name aa

# 返回结果
/var/lib/docker/volumes/aa

# 进入宿主机挂载
cd /var/lib/docker/volumes/aa/_data

# 查看文件
ls

# 返回结果
docs  examples  host-manager  manager  ROOT
```

aa 代表一个数据卷名字，可以是任意，这相当于相对路径，它会在 `/var/lib/docker/volumes` 下创建 aa 目录作为数据卷。

特点：容器的挂载目录内容覆盖到宿主机的挂载目录内容

其他例子和 [具体目录挂载](/project-management/Docker/Docker_data_volume#具体目录挂载) 一样。

### 匿名目录挂载

没指定名字的挂载都是匿名挂载，-v 只写了容器内路径，并没写宿主机路径。

匿名目录挂载的目录是：`/var/lib/docker/volumes/`，它会在这个目录生成匿名数据卷目录。

格式：`docker run [options] -v <容器内的路径[:ro | rw]> <镜像名>`

```sh
docker run [options] -v <容器内的路径[:ro | rw]> <镜像名>
```

`ro`：代表 read-only，容器的路径只允许读，不允许写。不影响宿主机的路径可读可写

`rw`：默认值，代表可读可写

> **例子 1：匿名创建 tomcat3 容器，找到匿名的目录位置**

```sh
docker run -d -P 8080:8081 --name tomcat03 -v /usr/local/tomcat/webapps tomcat:8.5.27
```

创建容器时，没有指定宿主机的目录，那么它在哪呢？

```sh
[root@frx01 volumes]# cd /var/lib/docker/volumes/

[root@frx01 volumes]# ls

75b754f7602e8b946432ad871b0c4b43408dde92f06ce5574ff8352a85c39858
```

我们可以得知：没有指定宿主机目录，docker 会自动在 `/var/lib/docker/volumes` 生成很长的字符串，这是什么呢？

这里透露 docker 数据卷操作命令：`docker volume ls`，查看数据卷

```sh
# 执行命令
docker volume ls
# 返回结果
DRIVER    VOLUME NAME
local     75b754f7602e8b946432ad871b0c4b43408dde92f06ce5574ff8352a85c39858
```

可以看出匿名目录挂载生成的目录名就是 **随机生成的数据卷名字**。

### 哪个挂载方法好？

首先排除掉 **匿名目录挂载**，它的缺点是不好维护，数据卷名随机生成且太长，不清楚目录挂载的是哪个容器。

**默认目录挂载** 指定了一个默认目录，无论挂载目录有多少，都集中在默认目录下管理。但是缺点是 **不能指定文件挂载**，只能指定目录进行挂载。它和具体目录挂载的另一个区别是：第一次启动容器挂载时，**容器的挂载目录内容会覆盖宿主机的挂载目录内容**。

**具体目录挂载** 可以指定宿主机的任意位置，但是一旦挂载目录多了起来，可能目录过于分散导致无法集中管理，但是它更加灵活，而且 **能指定文件挂载**。值得注意的是：第一次启动容器挂载时，必须确保容器的挂载目录数据备份好，因为该挂载方式会将 **宿主机的挂载目录内容覆盖掉容器的挂载目录内容**。所以，有数据则备份，再挂载。

总之：**匿名目录挂载** 不推荐，根据需求选择 **默认目录挂载** 和 **具体目录挂载**，前者不能挂载文件，挂载在默认目录；后者能挂载文件，且挂载在宿主机任意位置，但是会覆盖容器的挂载目录。我喜欢 **具体目录挂载**。

### 读写权限

三个挂载方式我都提到了读写的权限，这个读写权限仅针对 **容器的挂载目录**，如果不指定权限，默认就是可读可写。

**什么时候用到呢？** 当我们希望只操作宿主机的挂载目录，然后同步给容器的挂载目录，但是不希望容器的挂载目录也能操作，影响宿主机的挂载目录。

拿默认目录挂载的命令格式来说：`docker run [options] -v <任意别名:容器内的路径[:ro | rw]> <镜像名>`

```sh
docker run [options] -v <任意别名:容器内的路径[:ro | rw]> <镜像名>
```

`ro`：代表 read-only，容器的路径只允许读，不允许写。不影响宿主机的路径可读可写

`rw`：默认值，代表可读可写

> **例子 1：启动 tomcat04 容器，挂载到 kele 数据卷里，并赋予只读权限**

为了方便，不指定端口映射，`-P`（大写）直接让 Docker 随机生成端口映射

```sh
docker run -d -P --name tomcat04 -v frx:/usr/local/tomcat/webapps:ro tomcat:8.5.27

#查看数据卷
docker volume ls

#返回结果
DRIVER              VOLUME NAME
local               75b754f7602e8b946432ad871b0c4b43408dde92f06ce5574ff8352a85c39858
local               frx
```

**宿主机操作**：找到 docker 的数据卷默认目录，进入 kele 目录下的 _data 目录，创建 test.txt 文件，测试读写权限

```sh
# 进入 frx 目录下的 _data 目录
[root@frx01 _data]# cd /var/lib/docker/volumes/frx/_data/

# 创建 test.txt 文件，测试写权限
[root@frx01 _data]# touch text.txt

# 查看文件，测试读权限
[root@frx01 _data]# ls 
docs  examples  host-manager  manager  ROOT  text.txt
```

说明宿主机可读可写。如果不可写会报错。

**容器操作：** 进入 tomcat04 容器的挂载目录，测试读写权限

```sh {17}
# 进入 tomcat04 容器
[root@frx01 _data]# docker exec -it tomcat04 bash

# 进入挂载目录
root@83d20336795b:/usr/local/tomcat# cd webapps/

# 查看文件，测试读权限
root@83d20336795b:/usr/local/tomcat/webapps# ls

# 返回结果
ROOT  docs  examples  host-manager  manager  text.txt

# 测试写权限
root@83d20336795b:/usr/local/tomcat/webapps# touch text2.txt

# 返回结果，报错
touch: cannot touch 'text2.txt': Read-only file system
```

11 和 17 行的结果告诉我们，无法执行写操作，只能执行读操作。

> **例子 2：**

```sh
# 赋予读写权限
docker run -d -P --name tomcat04 -v kele:/usr/local/tomcat/webapps:ro tomcat:8.5.27

# 不写权限，默认赋予读写权限
docker run -d -P --name tomcat04 -v kele:/usr/local/tomcat/webapps tomcat:8.5.27
```

## 数据卷操作命令

数据卷在 Docker 称为 volume，所以相关命令都要有 volume。

### 数据卷命令

看注释： 

```sh
# 执行命令
docker volume --help

# 返回结果
Usage:  docker volume COMMAND
Manage volumes
Commands:

  create      Create a volume  # 创建一个数据卷
  inspect     Display detailed information on one or more volumes  # 查看数据卷的详细信息
  ls          List volumes  # 查看所有数据卷列表
  prune       Remove all unused local volumes  # 删除所有未使用的数据卷
  rm          Remove one or more volumes   # 删除指定的数据卷
  
Run 'docker volume COMMAND --help' for more information on a command.
```

### 数据卷查看

查看数据卷的命令已经在上面透露过了。

格式：`docker volume ls`

```sh
docker volume ls
```

**例子 1：**

```sh {1}
[root@frx01 _data]# docker volume ls
DRIVER              VOLUME NAME
local               75b754f7602e8b946432ad871b0c4b43408dde92f06ce5574ff8352a85c39858
local               aa
local               frx
```

### 数据卷信息

格式：`docker volume inspect <数据卷名>`

> **例子 1：查看 frx 数据卷的具体信息**

```sh {6}
[root@frx01 _data]# docker volume ls
DRIVER              VOLUME NAME
local               75b754f7602e8b946432ad871b0c4b43408dde92f06ce5574ff8352a85c39858
local               aa
local               frx
[root@frx01 _data]# docker volume inspect frx
[
    {
        "CreatedAt": "2022-09-18T22:19:07+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/frx/_data",
        "Name": "frx",
        "Options": null,
        "Scope": "local"
    }
]
```

### 数据卷创建

如果不想在启动容器的时候利用 `-v`「被迫」创建数据卷，这个命令让你收益实用。

格式：`docker volumn create <数据卷名>`

```sh
docker volumn create <数据卷名>
```

> **例子 1：创建一个MyVolumn 数据卷**

```sh {1}
[root@frx01 _data]# docker volume create MyVolume
MyVolume
[root@frx01 _data]# docker volume ls
DRIVER              VOLUME NAME
local               75b754f7602e8b946432ad871b0c4b43408dde92f06ce5574ff8352a85c39858
local               aa
local               frx
local               MyVolume
```

创建的数据卷目录依然在 `/var/lib/docker/volumes` 下

### 数据卷删除

数据卷太多怎么办？可以删除指定名字的数据卷，也可以删除全部未被使用的数据卷。

- 删除指定名字的数据卷命令格式：`docker rm <数据卷名>`

```sh
docker rm <数据卷名>
```

- 删除全部未被使用的数据卷命令格式：`docker volume prune`

```sh
docker volume prune
```

> **例子 1：删除 620fb .... 的数据卷**

**例子 1：删除 75b .... 的数据卷**

```shell
docker volume rm -f 75b754f7602e8b946432ad871b0c4b43408dde92f06ce5574ff8352a85c39858
```

> **例子 2：删除所有未使用的数据卷**

```sh
# 执行命令
docker volume prune

# 返回结果
[root@frx01 _data]# docker volume prune
WARNING! This will remove all local volumes not used by at least one container.

# 确认 y，取消 N
Are you sure you want to continue? [y/N] y
```

## 数据卷容器

### 继承

容器1完成和宿主机的映射

```sh
docker run -it  --privileged=true -v /mydocker/u:/tmp --name u1 ubuntu
```

```sh
[root@frx01 _data]# docker run -it  --privileged=true -v /mydocker/u:/tmp --name u1 ubuntu
WARNING: IPv4 forwarding is disabled. Networking will not work.
root@a817d0f97c01:/# cd /tmp/
root@a817d0f97c01:/tmp# ls -l
total 0
root@a817d0f97c01:/tmp# touch u1_data.txt
root@a817d0f97c01:/tmp# ls -l
total 0
-rw-r--r--. 1 root root 0 Sep 18 14:58 u1_data.txt
```

```sh
[root@frx01 _data]# cd /mydocker/u/
[root@frx01 u]# pwd
/mydocker/u
[root@frx01 u]# ls -l
总用量 0
-rw-r--r--. 1 root root 0 9月  18 22:58 u1_data.txt
```

容器2继承容器1的卷规则

```sh
docker run -it  --privileged=true --volumes-from 父类 --name u2 ubuntu
```

```sh
[root@frx01 u]# docker run -it  --privileged=true --volumes-from u1 --name u2 ubuntu
root@9c23dc4755bd:/# cd /tmp/
root@9c23dc4755bd:/tmp# ls
u1_data.txt
```

```sh
[root@frx01 u]# docker run -it  --privileged=true --volumes-from u1 --name u2 ubuntu
root@9c23dc4755bd:/# cd /tmp/
root@9c23dc4755bd:/tmp# ls
u1_data.txt
root@9c23dc4755bd:/tmp# touch u2_data.txt
root@9c23dc4755bd:/tmp# exit
exit
[root@frx01 u]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
[root@frx01 u]# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
9c23dc4755bd        ubuntu              "bash"              2 minutes ago       Exited (0) 19 seconds ago                       u2
5d80a700eff5        ubuntu              "bash"              2 minutes ago       Exited (0) 2 minutes ago                        u1
[root@frx01 u]# docker start u1
u1
[root@frx01 u]# docker exec -it 5d80a700eff5 bash
root@5d80a700eff5:/# cd /tmp/
root@5d80a700eff5:/tmp# ls
u1_data.txt  u2_data.txt #u1中也有u2的
```

### 数据共享

上面讲述的是主机和容器之间共享数据，那么如何实现容器和容器之间的共享数据呢？那就是创建 **创建数据卷容器**。

命名的容器挂载数据卷，其他容器通过挂载这个（父容器）实现数据共享，挂载数据卷的容器，称之为 **数据卷容器(Data Volume Container)**。

通俗地来说，docker 容器数据卷可以看成使我们生活中常用的 U 盘，它存在于一个或多个的容器中，由 docker 挂载到容器，但不属于联合文件系统，Docker 不会在容器删除时删除其挂载的数据卷。在创建一个容器时候，使用命令绑定一个父容器，这个父容器就是 **数据卷容器**。

特点：

- 数据卷可以在容器之间共享或重用数据
- 数据卷中的更改可以直接生效
- 数据卷中的更改不会包含在镜像的更新中
- 数据卷的生命周期一直持续到没有容器使用它为止

命令格式：`docker run --volumes-from <数据卷容器名> <镜像名[:TAG | ID]>`

```sh
docker run --volumes-from <数据卷容器名> <镜像名[:TAG | ID]>
```

`--volumes-from` 可以多次使用来挂载多个容器里的多个数据卷。即该命令是 **链式** 的。

**使用 --volumes-from 参数所挂载数据卷的容器自己并不需要保持在运行状态。**

::: warning

`--volumes-from` 后的容器名才是 **数据卷容器**，并不是启动的这个容器。

:::

> **例子 1：创建三个容器 tomcat10、tomcat11、tomcat12，其中 tomcat10 是数据卷容器**

为了方便，不指定端口映射，`-P`（大写）直接让 Docker 随机生成端口映射。

创建数据卷容器的命令和创建容器的命令一样，创建 tomcat10 数据卷容器的时候指定一个数据卷。

```sh {11}
# 查看容器
docker images

# 返回结果
REPOSITORY    TAG       IMAGE ID       CREATED       SIZE
tomcat        8.5.73    7ec084df520c   2 days ago    249MB
mysql         latest    b05128b000dd   3 days ago    516MB
hello-world   latest    feb5d9fea6a5   8 weeks ago   13.3kB

# 启动镜像，创建容器
docker run -d -P --name tomcat10 -v tomcat10:/usr/local/tomcat/webapps tomcat:8.5.73

# 查看容器
docker ps

# 返回结果
CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS          PORTS                     NAMES
5516f026bf78   tomcat:8.5.73   "catalina.sh run"   29 seconds ago   Up 29 seconds   0.0.0.0:49155->8080/tcp   tomcat10
```

创建 tomcat11 和 tomcat12 容器，绑定 tomcat10 容器，也就是绑定数据卷容器

```sh {2,3}
# 执行两个命令
docker run -d -P --name tomcat11 --volumes-from tomcat10 tomcat:8.5.73
docker run -d -P --name tomcat12 --volumes-from tomcat10 tomcat:8.5.73

# 查看容器
docker ps

# 返回结果
CONTAINER ID   IMAGE           COMMAND             CREATED          STATUS          PORTS                     NAMES
2cc6944ab955   tomcat:8.5.73   "catalina.sh run"   15 seconds ago   Up 14 seconds   0.0.0.0:49157->8080/tcp   tomcat12
0bd657b306d3   tomcat:8.5.73   "catalina.sh run"   45 seconds ago   Up 44 seconds   0.0.0.0:49156->8080/tcp   tomcat11
5516f026bf78   tomcat:8.5.73   "catalina.sh run"   6 minutes ago    Up 6 minutes    0.0.0.0:49155->8080/tcp   tomcat10
```

> **例子 2：证明三个容器的数据是否共享**

**例子 1** 已经创建好三个容器，并且 tomcat10 容器的数据卷目录是 tomcat10。我们可以在 tomcat10 容器的 webapps 目录下创建一个 test.txt 文件，看看 tomcat11 容器和 tomcat12 容器的 webapps 是否同步数据。

首先进入 tomcat10 容器的 webapps 目录，创建 test.txt 文件

```sh {8}
# 进入 tomcat10 容器
docker exec -it tomcat10 bash

# 进入 webapps 目录
root@f45ea598ee8d:/usr/local/tomcat# cd webapps

# 创建 test.txt 文件
root@f45ea598ee8d:/usr/local/tomcat/webapps# touch test.txt
```

然后我们进入 tomcat11 容器，看文件是否同步过来，并且创建 test2.txt 文件

```sh {11,14}
# 进入 tomcat11 容器
docker exec -it tomcat11 bash

# 进入 webapps 目录
root@31220638e2dc:/usr/local/tomcat# cd webapps

# 创建 test.txt 文件
root@31220638e2dc:/usr/local/tomcat/webapps# ls

# 返回结果
test.txt

# 创建 test2.txt 文件
root@31220638e2dc:/usr/local/tomcat/webapps# touch test2.txt
```

然后我们进入 tomcat12 容器，看文件是否同步过来

```sh {11}
# 进入 tomcat12 容器
docker exec -it tomcat12 bash

# 进入 webapps 目录
root@31220638e2dc:/usr/local/tomcat# cd webapps

# 创建 test.txt 文件
root@31220638e2dc:/usr/local/tomcat/webapps# ls

# 返回结果
test2.txt  test.txt
```

我们可以知道，数据是实现了共享。只要 tomcat10 数据卷容器的更新内容，其他绑定的容器都会同步内容。

最后我们看看宿主机的挂载目录

```sh
# 进入宿主机挂载目录
cd /var/lib/docker/volumes/tomcat10/_data

# 查看文件
ls

# 返回结果
test2.txt  test.txt
```

说明无论是 tomcat10 容器的挂载目录，还是映射的宿主机挂载目录，只要任意一个发生改变，绑定的普通容器也会发生改变，实现共享。

::: tip 笔记

普通容器绑定数据卷容器，其实就是绑定数据卷容器的数据卷。

所以删除 tomcat10 容器后 ，tomcat11 容器修改文件后， tomcat12 容器还可以正常共享数据，因为 tomcat10 容器的数据卷没有被删除。

:::

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220918/image.2zbxvbh9y2s0.webp)

容器之间配置信息的传递，数据卷的生命周期一直持续到没有容器使用它为止。 存储在本机的文件则会一直保留。

**如果删除了挂载的容器（包括 dbdata、db1 和 db2），数据卷并不会被自动删除。如果要删除一个数据卷，必须在删除最后一个还挂载着它的容器时使用 docker rm -v 命令来指定同时删除关联的容器。这可以让用户在容器之间升级和移动数据卷。**

### 数据备份

可以利用数据卷对其中的数据进行进行备份、恢复。

数据备份命令格式：`docker run [options] --volumes-from <数据卷容器> [-v <宿主机绝对路径>:<随机路径>] <镜像名>:[TAG | ID] tar cvf <随机路径/备份名> <数据卷容器路径>`

```sh
docker run [options] --volumes-from <数据卷容器> [-v <宿主机绝对路径>:<随机路径>] <镜像名>:[TAG | ID] tar cvf <随机路径/备份名> <数据卷容器路径>
```

**两个随机路径必须保持一致**。备份路径默认在 `/var/lib/docker/overlay2/` 下的容器 ID 目录下生成。

> **例子 1：不指定宿主机挂载目录下和容器备份目录，备份 tomcat10 容器的数据卷 webapps 目录**

这里是 tomcat10 容器，这个容器已经创建，并且容器的 `/usr/local/tomcat/webapps` 有 test.txt 和 test2.txt 文件，具体步骤在 [数据共享](/project-management/Docker/Docker_data_volume#数据共享) 实现了。

```sh {8}
# 备份
docker run --name tomcat-backup --volumes-from tomcat10 tomcat:8.5.73 tar cvf /backup.tar /usr/local/tomcat/webapps

# 查找备份的文件
find / -name backup.tar

# 返回结果
/var/lib/docker/overlay2/a9ef07977088b96970d926e95650a4810acf60429f9b9ca66625b6366597ff12/diff/backup.tar
```

容器启动后，使用了 tar 命令来将容器的 /usr/local/tomcat/webapps 目录备份到宿主机里，宿主机备份的路径看第 8 行数据，备份的文件是 backup.tar。

**如果容器删除，那么该方式的备份文件也被删除，并且备份目录是容器 ID 命名，并非容器名，看一长串字符串就知道了。**

如果解决删除问题，以及想要指定的路径进行备，例子 2 方式可以解决。

> **例子 2：指定宿主机挂载目录下和容器备份目录，备份 tomcat10 容器的数据卷 webapps 目录**

**这种方式如果容器删除，备份文件不会被删除。**

```sh {8-9}
# 备份
docker run --volumes-from tomcat10 -v /opt/backup:/backup tomcat:8.5.73 tar cvf /backup/backup.tar /usr/local/tomcat/webapps

# 查找备份的文件
find / -name backup.tar

# 返回结果
/opt/backup/backup.tar
/var/lib/docker/overlay2/a9ef07977088b96970d926e95650a4810acf60429f9b9ca66625b6366597ff12/diff/backup.tar
```

容器的挂载路径要和备份的文件路径保持一致，才能指定备份路径。否则如例子 3 报错：

> **例子 3：容器挂载路径和备份文件的路径不一致情况**

```sh {2}
# 备份
docker run --volumes-from tomcat10 -v /opt/backup:/a tomcat:8.5.73 tar cvf /b/backup.tar /usr/local/tomcat/webapps

# 返回结果
tar: /b/backup.tar: Cannot open: No such file or directory
tar: Error is not recoverable: exiting now
```

容器的挂载路径是 a，但是备份的路径是 b，所以报错了，如果路径保持一致：

```sh {5}
# 删除例子 2的备份文件
rm -f /opt/backup.tar

# 备份
docker run --volumes-from tomcat10 -v /opt/backup:/a tomcat:8.5.73 tar cvf /a/backup.tar /usr/local/tomcat/webapps

# 查找备份的文件
find / -name backup.tar

# 返回结果
/opt/backup/backup.tar
/var/lib/docker/overlay2/a9ef07977088b96970d926e95650a4810acf60429f9b9ca66625b6366597ff12/diff/backup.tar
```

说明容器的挂载路径要和备份的文件路径保持一致，才能备份成功。建议使用路径 `/backup` 。

原理：首先将宿主机和容器的目录进行挂载，实现连通，接着容器内压缩成备份文件到 `/a` 目录下，实际上也会压缩到与 `/a` 挂载的 `/opt/backup` 目录下，所以这就是为什么将压缩文件的目录和宿主机的挂载目录保持一致，它们连通才能互相同步数据。

### 数据恢复

备份了数据，那么就需要进行数据恢复。

恢复命令格式：`docker run --volumes-from <恢复到哪个数据卷容器> [-v <宿主机绝对路径>:<随机路径>] <镜像名>[:TAG | ID] tar xvf <随机路径 | 路径>`

```sh
docker run --volumes-from <恢复到哪个数据卷容器> [-v <宿主机绝对路径>:<随机路径>] <镜像名>[:TAG | ID] tar xvf <随机路径 | 路径>
```

> **例子 1：数据恢复到 tomcat20 容器的数据卷里**

如果要恢复数据到 tomcat20 容器，首先创建一个带有数据卷的容器 tomcat20，因为只能恢复数据到数据卷里。

```sh
docker run -d --name tomcat20 -v tomcat20:/usr/local/tomcat/webapps tomcat:8.5.73
```

然后创建另一个容器，挂载 tomcat20 的容器，并使用 untar 解压备份文件到挂载的容器卷中。

```sh
docker run --volumes-from tomcat20 -v /opt/backup:/backup tomcat:8.5.73 tar xvf /backup/backup.tar -C /
```

`-C /` 代表解压到根目录下，因为压缩包的文件基于根目录的，否则解压的目录是基于 `/backup`。

原理：此时 tomcat20 挂载目录是 `/usr/local/tomcat/webapps`，而新的容器只要挂载了 tomcat20 容器，它们两个的 `/usr/local/tomcat/webapps` 形成关联，新的容器的这个目录发生改变，则 tomcat20 的挂载目录也会发生改变，所以解压文件到新的容器的该目录下，实际上也是解压文件到 tomcat20 的挂载目录下，也就是实现恢复数据。

## 挂载特性

关于到底是宿主机的挂载目录覆盖容器的挂载目录，还是反过来覆盖：

- 默认目录挂载：
  - 当宿主机挂载目录已经存在时，双方挂载完成后，**宿主机挂载目录覆盖容器挂载目录**
  - 当宿主机挂载目录不存在时，双方挂载完成后，**容器挂载目录覆盖宿主机挂载目录**
- 具体目录挂载
  - 当宿主机挂载目录无论存不存在，双方挂载完成后，**宿主机挂载目录都会覆盖容器挂载目录**

**默认目录挂载**

| 宿主机                       | 容器     | 运行结果                                     |
| ---------------------------- | -------- | -------------------------------------------- |
| 文件存在                     | 文件存在 | 挂载成功，**宿主机文件内容覆盖容器文件内容** |
| 目录存在                     | 目录存在 | 挂载成功，**宿主机目录内容覆盖容器目录内容** |
| ......                       | ......   | ......                                       |
| 文件不存在                   | 文件存在 | 挂载成功，**容器文件内容覆盖宿主机文件内容** |
| 目录不存在                   | 目录存在 | 挂载成功，**容器目录内容覆盖宿主机目录内容** |
| ......                       | ......   | ......                                       |
| 其他和 **具体目录挂载** 类似 |          |                                              |



**具体目录挂载**

| 宿主机     | 容器       | 运行结果                                                     |
| ---------- | ---------- | ------------------------------------------------------------ |
| 文件存在   | 文件存在   | 挂载成功，**宿主机文件内容覆盖容器文件内容**                 |
| 目录存在   | 目录存在   | 挂载成功，**宿主机目录内容覆盖容器目录内容**                 |
| ------     | ------     | ------                                                       |
| 文件不存在 | 文件存在   | 挂载成功，**宿主机创建空文件，并覆盖掉容器的文件，导致也为空** |
| 目录不存在 | 目录存在   | 挂载成功，**宿主机创建空目录，并覆盖掉容器的文件，导致也为空** |
| ------     | ------     | ------                                                       |
| 文件存在   | 文件不存在 | 挂载成功                                                     |
| 目录存在   | 目录不存在 | 挂载成功                                                     |
| ------     | ------     | ------                                                       |
| 文件存在   | 目录存在   | 容器启动失败                                                 |
| 目录存在   | 文件存在   | 容器启动失败                                                 |
| ------     | ------     | ------                                                       |
| 目录不存在 | 目录不存在 | 挂载成功，**Docker 会自动在宿主机和容器内新建目录**          |
| 目录不存在 | 文件存在   | 容器启动失败                                                 |
| 目录不存在 | 目录存在   | 挂载成功，**宿主机空目录内容覆盖容器内目录（空）**           |