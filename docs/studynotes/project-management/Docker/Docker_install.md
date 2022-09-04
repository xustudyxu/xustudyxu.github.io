---
title: Docker 安装
date: 2022-09-05 02:46:47
permalink: /project-management/Docker/Docker_install
categories:
  - Docker
tags:
  - Docker
---
# Docker 安装

[[toc]]

## CentOS Docker安装

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220904/image.3b1ygz3skt80.webp)

**前提条件**

目前，CentOS 仅发行版本中的内核支持 Docker。**Docker 运行在CentOS 7 (64-bit)上，**

**要求系统为64位、Linux系统内核版本为 3.8以上，这里选用Centos7.x**

**查看自己的内核**

uname命令用于打印当前系统相关信息（内核版本号、硬件架构、主机名称和操作系统类型等）。

```sh
[root@master ~]# uname -a
Linux master 3.10.0-1160.el7.x86_64 #1 SMP Mon Oct 19 16:18:59 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

## Docker的基本组成

+ 镜像(image)

Docker 镜像（Image）就是一个<mark>只读</mark>的模板。镜像可以用来创建 Docker 容器，**一个镜像可以创建很多容器**。

它也相当于是一个root文件系统。比如官方镜像 centos:7 就包含了完整的一套 centos:7 最小系统的 root 文件系统。

相当于容器的“源代码”，**docker镜像文件类似于Java的类模板，而docker容器实例类似于java中new出来的实例对象**。

容器与镜像的关系类似于面向对象编程中的对象与类：

| Docker | 面向对象 |
| ------ | -------- |
| 容器   | 对象     |
| 镜像   | 类       |

+ 容器(container)

1. **从面向对象角度**

Docker 利用容器（Container）独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境，**容器是用镜像创建的运行实例**。就像是Java中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台。

2. **从镜像容器角度**

**可以把容器看做是一个简易版的** **Linux** **环境**（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

+ 仓库(repository)

仓库（Repository）是<mark>集中存放镜像</mark>文件的场所。

类似于Maven仓库，存放各种jar包的地方；github仓库，存放各种git项目的地方；Docker公司提供的官方registry被称为Docker Hub，存放各种镜像模板的地方。

仓库分为公开仓库（Public）和私有仓库（Private）两种形式。

**最大的公开仓库是 DockerHub**([https://hub.docker.com/](https://hub.docker.com/))，存放了数量庞大的镜像供用户下载。国内的公开仓库包括阿里云 、网易云等

+ 小总结

需要正确的理解仓库/镜像/容器这几个概念:

Docker 本身是一个容器运行载体或称之为管理引擎。我们把应用程序和配置依赖打包好形成一个可交付的运行环境，这个打包好的运行环境就是image镜像文件。只有通过这个镜像文件才能生成Docker容器实例(类似Java中new出来一个对象)。

image文件可以看作是容器的模板。Docker 根据image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

**镜像文件**

image 文件生成的容器实例，本身也是一个文件，称为镜像文件。

**容器实例**

一个容器运行一种服务，当我们需要的时候，就可以通过docker客户端创建一个对应的运行实例，也就是我们的容器。

**仓库**

就是放一堆镜像的地方，我们可以把镜像发布到仓库中，需要的时候再从仓库中拉下来就可以了。

## Docker平台架构图解(入门版)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220904/image.1dhfdk9cfh1c.webp)

## Docker平台架构图解(架构版)

+ 首次懵逼正常，后续深入，先有大概轮廓，混个眼熟

+ 整体架构及底层通信原理简述

Docker 是一个 C/S 模式的架构，后端是一个松耦合架构，众多模块各司其职。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220904/image.6zaea6xum9k0.webp)

Docker运行的基本流程：

1. 用户是使用Docker Client与 Docker Daemon建立通信，并发送请求给后者。
2. Docker Daemon作为Docker架构中的主体部分，首先提供Docker Server的功能使其可以接受Docker Client 的请求。
3. Docker Engine执行Docker 内部的一系列工作，每一项工作都是以一个Job的形式的存在。
4. Job的运行过程中，当需要容器镜像时，则从Docker Registry 中下载镜像，并通过镜像管理驱动Graph driver将下载镜像以Graph的形式存储。
5. 当需要为Docker创建网络环境时，通过网络管理驱动Network driver创建并配置Docker容器网络环境。
6. 当需要限制Docker容器运行资源或执行用户指令等操作时，则通过Exec driver来完成。
7. Libcontainer是一项独立的容器管理包，Network driver以及Exec driver都是通过Libcontainer来实现具体对容器进行的操作。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220904/image.7hh30r9dad40.webp)

## 操作系统要求

要安装 Docker 引擎，您需要 CentOS 7 或 8 的维护版本。不支持或测试存档版本，并且 Linux 版本 3.10.0+，包括 3.10.0。

该 `centos-extras` 库必须启用。默认情况下启用此存储库，但如果您已禁用它，则需要 [重新启用它](https://wiki.centos.org/AdditionalResources/Repositories)。

`overlay2` 推荐使用存储驱动。

## 卸载旧版本

旧版本的 Docker 被称为 `docker` 或 `docker-engine`。如果安装了这些，请卸载它们以及相关的依赖项：

```sh
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

如果 `yum` 报告没有安装这些软件包，那也没关系，只是说明曾经没安装过，不影响任何东西。

卸载并不会全部卸载，如图像、容器、卷和网络，将被保留，以及 `/var/lib/docker/` 的内容

Docker 引擎包现在被称为 `docker-ce`.

## 安装方法

保证CentOS能够正常上网。

1. yum安装gcc相关

```sh
yum -y install gcc
yum -y install gcc-c++
```

首先说明下：Docker 安装路径是 `/var/lib/docker`，安装 Docker 成功后，在该路径中有一个 image 和 containers 文件夹，分别存放镜像和实例。

您可以根据需要以不同方式安装 Docker Engine：

- 从 Docker 的存储库或者其他镜像库里下载，这是最推荐的方法
- 下载 RPM 包并手动安装并完全手动管理升级。这在某些情况下非常有用，例如在无法访问互联网的气隙系统上安装 Docker
- 便捷脚本安装 Docker，可以在测试和开发环境中安装

### 使用存储库安装

在新主机上首次安装 Docker Engine 之前，您需要设置 Docker 存储库。之后，您可以从存储库安装和更新 Docker。

> **安装软件包**

安装 `yum-utils` 包，它提供 `yum-config-manager` 实用程序

```sh
sudo yum install -y yum-utils
```

> **设置存储库**

设置稳定版本的仓库

官网（国外）

```sh
sudo yum-config-manager \
		--add-repo \
		https://download.docker.com/linux/centos/docker-ce.repo
```

阿里云（国内）

```sh
sudo yum-config-manager \
    	--add-repo \
		http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

阿里云仓库也是定期从官网仓库进行更新引用，两者仓库量无太大区别，如果配置了阿里云仓库，也要配置阿里云镜像加速，即下载速度源由官网改为阿里云。

- 最新版本安装
- 特定版本安装

安装 **最新版本** 的 Docker Engine 和 containerd：

```sh
sudo yum -y install docker-ce docker-ce-cli containerd.io
```

如果希望自己手动确认一些安装条件，则把 `-y` 去掉。

如果报如下错误：

```sh
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
No package docker-ce available.
No package docker-ce-cli available.
No package containerd.io available.
```

要么你的 Linux 版本没到达 3.10.+，要么你忽略了上方的设置存储库，请设置官方或者阿里云的存储库，否则无法找到 Docker。

还有一种可能就是你的 yum 版本太低，请更新它。

```sh
# 更新 yum
yum update

# CentOS 7 更新索引
yum makecache fast

# CentOS 8 更新索引
yum makecache
```

安装 **特定版本** 的 Docker Engine，请在 repo 中列出可用版本，然后选择并安装

首先列出可以安装的版本：

```sh
yum list docker-ce --showduplicates | sort -r

# 例子：
docker-ce.x86_643:18.09.1-3.el7			docker-ce-stable
docker-ce.x86_643:18.09.0-3.el7			docker-ce-stable
docker-ce.x86_6418.06.1.ce-3.el7		docker-ce-stable
docker-ce.x86_6418.06.e.ce-3.el7		docker-ce-stable
```

返回的列表取决于启用的存储库，并且特定于您的 CentOS 版本（e17 就是 CentOS 7.x 版本，如果是 CentOS 8.2，则是 e18）

通过完全限定的包名称安装特定版本，即包名称 (`docker-ce`) 加上从第一个冒号 (`:`)开始的版本字符串（第 2 列），直到第一个连字符，由连字符 (`-`)分隔。例如：`docker-ce-18.09.1`。

```sh
sudo yum install docker-ce-<version> docker-ce-cli-<version> containerd.io

# 例子
sudo yum install docker-ce-18.09.1 docker-ce-cli-18.09.1 containerd.io
```

此命令会安装 Docker，但不会启动 Docker。它还会创建一个 `docker` 组，但是，默认情况下它不会向该组添加任何用户。

> **启动 Docker**

```sh
sudo systemctl start docker
```

测试是否启动成功

```sh
# 执行该命令
sudo systemctl status docker
# 执行结果，出现 active (running) 代表启动成功
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
   Active: active (running) since 五 2021-11-19 15:40:03 CST; 1s ago
     Docs: https://docs.docker.com
 Main PID: 29970 (dockerd)
    Tasks: 11
   Memory: 114.0M
   CGroup: /system.slice/docker.service
           └─29970 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

其他命令：

```sh
# 查看 docker 的状态
systemctl status docker
# 重启 docker
systemctl restart docker
# 设置 docker 服务开启自启动
systemctl enable docker
```

> **验证安装**

查看 Docker 版本

```sh
docker version
```

查看 Docker 信息

```sh
docker info
```

> **测试运行**

通过运行 `hello-world` 映像验证 Docker Engine 是否已正确安装

```sh
# 执行该命令
docker run hello-world
# 执行结果
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

此命令下载测试映像并在容器中运行它。当容器运行时，它会打印一条消息并退出。

### 从包安装

如果您无法使用 Docker 的存储库来安装 Docker，您可以下载该`.rpm`版本的 文件并手动安装。每次要升级 Docker Engine 时都需要下载一个新文件。

前往 [https://download.docker.com/linux/centos/ (opens new window)](https://download.docker.com/linux/centos/)并选择您的 CentOS 版本。然后浏览 `x86_64/stable/Packages/` 并下载 `.rpm` 要安装的 Docker 版本的文件。

> **安装**

安装 Docker Engine，将下面的路径更改为您下载 Docker 包的路径。

```sh
sudo yum install /path/to/package.rpm
```

Docker 已安装但未启动。该 `docker` 组被创建，但没有用户添加到组。

> **启动 Docker**

```sh
sudo systemctl start docker
```

其他命令：

```sh
# 查看 docker 的状态
systemctl status docker
# 重启 docker
systemctl restart docker
# 设置 docker 服务开启自启动
systemctl enable docker
```

> **验证安装**

查看 Docker 版本

```sh
docker version
```

查看 Docker 信息

```sh
docker info
```

> **测试运行**

通过运行 `hello-world` 映像验证 Docker Engine 是否已正确安装

```sh
docker run hello-world
```

此命令下载测试映像并在容器中运行它。当容器运行时，它会打印一条消息并退出。

### 便利脚本安装

Docker 在 [get.docker.com (opens new window)](https://get.docker.com/)上提供了一个方便的脚本，可以快速且非交互式地将 Docker 安装到开发环境中。不建议将便捷脚本用于生产环境，但可以用作示例来创建适合您需求的配置脚本。

在本地运行之前，请务必检查从 Internet 下载的脚本。在安装之前，让自己熟悉便利脚本的潜在风险和限制：

- 脚本需要 `root` 或 `sudo` 特权才能运行。
- 该脚本会尝试检测您的 Linux 发行版和版本并为您配置包管理系统，并且不允许您自定义大多数安装参数。
- 该脚本无需确认即可安装依赖项和建议。这可能会安装大量软件包，具体取决于主机的当前配置。
- 默认情况下，该脚本会安装 Docker、containerd 和 runc 的最新稳定版本。使用此脚本配置机器时，可能会导致 Docker 的主要版本意外升级。在部署到生产系统之前，始终在测试环境中测试（主要）升级。
- 该脚本并非旨在升级现有的 Docker 安装。使用脚本更新现有安装时，依赖项可能不会更新到预期版本，从而导致使用过时的版本。

> **安装**

此示例从 [get.docker.com (opens new window)](https://get.docker.com/)下载脚本并运行它以在 Linux 上安装 Docker 的最新稳定版本，另外可以通过 `--mirror` 选项使用国内下载源进行安装：

```sh
 curl -fsSL https://get.docker.com -o get-docker.sh
 sudo sh get-docker.sh --mirror
```

> **启动 Docker**

```sh
sudo systemctl start docker
```

其他命令：

```sh
# 查看 docker 的状态
systemctl status docker
# 重启 docker
systemctl restart docker
# 设置 docker 服务开启自启动
systemctl enable docker
```

> **创建 docker 用户组**

便利脚本安装不会自动创建 docker 用户组，请手动安装

```sh
sudo groupadd docker
```

> **验证测试**

查看 Docker 版本

```sh
docker version
```

查看 Docker 信息

```sh
docker info
```

> **测试运行**

通过运行 `hello-world` 映像验证 Docker Engine 是否已正确安装

```sh
docker run hello-world
```

此命令下载测试映像并在容器中运行它。当容器运行时，它会打印一条消息并退出。

## 安装进阶

### 以非root用户管理Docker

Docker 守护进程绑定到 Unix 套接字而不是 TCP 端口。默认情况下，Unix 套接字归用户所有 `root`，其他用户只能使用 `sudo`. Docker 守护进程始终以`root` 用户身份运行。

如果您不想在 `docker` 命令前加上 `sudo`，请创建一个 `docker` 用户组并向其中添加用户。当 Docker 守护进程启动时，它会创建一个可由 `docker` 组成员访问的 Unix 套接字。

1. 创建 `docker` 组

```sh
sudo groupadd docker
```

2. 将您的用户添加到 `docker` 组中

```sh
sudo usermod -aG docker $USER
```

3. 注销并重新登录，以便重新评估您的组成员身份。

如果在虚拟机上进行测试，可能需要重新启动虚拟机以使更改生效。

在桌面 Linux 环境（例如 X Windows）上，完全注销会话，然后重新登录。

在 Linux 上，您还可以运行以下命令来激活对组的更改：

```sh
newgrp docker 
```

4. 验证您可以在`docker`没有`sudo`.

```sh
docker run hello-world
```

此命令下载测试映像并在容器中运行它。当容器运行时，它会打印一条消息并退出。

如果您 `sudo` 在将用户添加到 `docker` 组之前最初使用 Docker CLI 命令运行，您可能会看到以下错误，这表明您的 `~/.docker/` 目录由于 `sudo` 命令而使用不正确的权限创建。

```sh
WARNING: Error loading config file: /home/user/.docker/config.json -
stat /home/user/.docker/config.json: permission denied
```

要解决此问题，请删除 `~/.docker/` 目录（它会自动重新创建，但所有自定义设置都将丢失），或使用以下命令更改其所有权和权限：

```sh
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R
```

### 配置Docker开机启动

多数当前的 Linux 发行版（RHEL、CentOS、Fedora、Debian、Ubuntu 16.04 及更高版本）用于 systemd 管理系统启动时启动的服务（就是 `systemctl` 命令）。在 Debian 和 Ubuntu 上，Docker 服务默认配置为在启动时启动。要在引导时为其他发行版自动启动 Docker 和 Containerd，请使用以下命令：

```sh
# 可省略 .service
sudo systemctl enable docker.service
sudo systemctl enable containerd.servic
```

要禁用此开机启动，请改用为 `disable`。

```sh
# 可省略 .service
sudo systemctl disable docker.service
sudo systemctl disable containerd.service
```

## 仓库配置

> **Docker 安装好以后，我们就要开始为拉取镜像准备了；国内从 DockerHub 拉取镜像有时会特别慢，此时可以配置镜像加速器。**

Docker 官方和国内很多云服务商都提供了国内加速器服务，比如：

- 阿里云的加速器：https://help.aliyun.com/document_detail/60750.html
- 网易加速器：http://hub-mirror.c.163.com
- Docker 官方中国加速器：https://registry.docker-cn.com
- ustc 的镜像：https://docker.mirrors.ustc.edu.cn
- daocloud：https://www.daocloud.io/mirror#accelerator-doc（注册后使用）

### Docker 官方中国的镜像加速器

对于使用 systemd 的系统（CentOS 7.x 以上），请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）

```sh
{
	"registry-mirrors": ["https://registry.docker-cn.com"]
}
```

另一种方式

```sh
# 创建文件夹
sudo mkdir -p /etc/docker
# 下面是一个步骤，全部复制
sudo tee /etc/docker/daemon.json <<-'EOF'
	{
		"registry-mirrors": ["https://registry.docker-cn.com"]
	}
EOF
```

之后重新启动服务

```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 配置阿里云镜像加速器

- 访问阿里云登录自己的账号查看 docker 镜像加速服务：[https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors](https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220904/image.1zbgqzzakxeo.webp)

操作步骤是统一的，不存在不同用户不同的操作步骤，我已经放到下面代码块：

```sh
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://7sbpp63d.mirror.aliyuncs.com"]
}
EOF
```

之后重新启动服务

```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

验证 docker 的镜像加速器是否生效

```sh {13}
[root@master ~]# docker info
#结果
Client:
 Context:    default
 Debug Mode: false
 ...
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Registry Mirrors:
  https://7sbpp63d.mirror.aliyuncs.com/
 Live Restore Enabled: false
```

## 镜像查看和拉取

> **拉一个 docker 镜像试试吧？**

拉取 hello world

```sh
# 执行改命令
[root@master ~]# docker pull hello-world:latest
# 结果
latest: Pulling from library/hello-world
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Image is up to date for hello-world:latest
docker.io/library/hello-world:latest
```

看本地仓库是否有这个库

```sh {5}
# 执行改命令
[root@master ~]# docker images
# 结果
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    feb5d9fea6a5   11 months ago   13.3kB
```

运行这个镜像的实例，即容器

```sh
[root@master ~]# docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

> 注意, 如果你在没有镜像的时候，直接 `docker run hello-world` 也是可以的；它会先检查本地是否有这个镜像，没有的话会先从指定仓库中拉取。

+ run干了什么？

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220904/image.4fq3ksgij3g.webp)

## 为什么Docker会比VM虚拟机快

1. **docker有着比虚拟机更少的抽象层**

由于docker不需要Hypervisor(虚拟机)实现硬件资源虚拟化,运行在docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在效率上有明显优势。

2. **docker利用的是宿主机的内核,而不需要加载操作系统OS内核**

当新建一个容器时,docker不需要和虚拟机一样重新加载一个操作系统内核。进而避免引寻、加载操作系统内核返回等比较费时费资源的过程,当新建一个虚拟机时,虚拟机软件需要加载OS,返回新建过程是分钟级别的。而docker由于直接利用宿主机的操作系统,则省略了返回过程,因此新建一个docker容器只需要几秒钟。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220904/image.4xh8wae98fk0.webp)

|            | Docker容器              | 虚拟机(VM)                  |
| ---------- | ----------------------- | --------------------------- |
| 操作系统   | 与宿主机共享OS          | 宿主机OS上运行虚拟机OS      |
| 存储大小   | 镜像小，便于存储与运输  | 镜像庞大(vmdk、vdi等)       |
| 运行性能   | 几乎无额外性能损失      | 操作系统额外的CPU、内存消耗 |
| 移植性     | 轻便、灵活、适应于Linux | 笨重，与虚拟机技术耦合度高  |
| 硬件亲和性 | 面向软件开发者          | 面向硬件运维者              |
| 部署速度   | 快速，秒级              | 较慢。10s以上               |

## 卸载Docker引擎

> **卸载 Docker Engine、CLI 和 Containerd 包**

```sh
sudo yum remove docker-ce docker-ce-cli containerd.io
```

> **主机上的映像、容器、卷或自定义配置文件不会自动删除。删除所有镜像、容器和卷**

```sh
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

您必须手动删除任何已编辑的配置文件

