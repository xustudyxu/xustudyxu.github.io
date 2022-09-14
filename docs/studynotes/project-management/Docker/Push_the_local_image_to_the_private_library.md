---
title: 将本地镜像推送到私有库
date: 2022-09-15 00:36:52
permalink: /project-management/Docker/Push_the_local_image_to_the_private_library
categories:
  - Docker
tags:
  - Docker
---
# 将本地镜像推送到私有库

[[toc]]

## 什么是Docker Registry

1 官方Docker Hub地址：[https://hub.docker.com/](https://hub.docker.com/)，中国大陆访问太慢了且准备被阿里云取代的趋势，不太主流。

2 Dockerhub、阿里云这样的公共镜像仓库可能不太方便，涉及机密的公司不可能提供镜像给公网，所以需要创建一个本地私人仓库供给团队使用，基于公司内部项目构建镜像。

​    Docker Registry是官方提供的工具，可以用于构建私有镜像仓库

## 将本地镜像推送到私有库案例

1. 下载镜像Docker Registry

```sh {1,14}
[root@frx01 ~]# docker pull registry
Using default tag: latest
latest: Pulling from library/registry
79e9f2f55bf5: Pull complete
0d96da54f60b: Pull complete
5b27040df4a2: Pull complete
e2ead8259a04: Pull complete
3790aef225b9: Pull complete
Digest: sha256:169211e20e2f2d5d115674681eb79d21a217b296b43374b8e39f97fcf866b375
Status: Downloaded newer image for registry:latest
[root@frx01 ~]# docker images
REPOSITORY                                            TAG                 IMAGE ID            CREATED             SIZE
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                 64df8ffb7faf        3 days ago          179MB
registry                                              latest              b8604a3fe854        10 months ago       26.2MB
ubuntu                                                latest              ba6acccedd29        11 months ago       72.8MB
centos                                                latest              5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27              a92c139758db        4 years ago         558MB
```

2. 运行私有库Registry，相当于本地有个私有库Docker Hub

```sh
docker run -d -p 5000:5000  -v /zzyyuse/myregistry/:/tmp/registry --privileged=true registry
```

默认情况，仓库被创建在容器的/var/lib/registry目录下，建议自行用容器卷映射，方便于宿主机联调

```sh {1,5}
[root@frx01 ~]# docker run -d -p 5000:5000  -v /zzyyuse/myregistry/:/tmp/registry --privileged=true registry
ac3ec6f2ef9bfc9e7293e9e962622d043a5696c49e2613d8b4dca7ef2ff75faf
[root@frx01 ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
ac3ec6f2ef9b        registry            "/entrypoint.sh /etc…"   19 seconds ago      Up 18 seconds       0.0.0.0:5000->5000/tcp   elated_stallman
```

3. 案例演示创建一个新镜像，`ubuntu`安装`ifconfig`命令

```sh {1,2,4,25,42}
[root@frx01 ~]# docker run -it ubuntu /bin/bash
root@016aba0aa47c:/# ifconfig
bash: ifconfig: command not found
root@016aba0aa47c:/# apt-get update
Get:1 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB]
Get:2 http://archive.ubuntu.com/ubuntu focal InRelease [265 kB]
Get:3 http://security.ubuntu.com/ubuntu focal-security/multiverse amd64 Packages [27.5 kB]
Get:4 http://security.ubuntu.com/ubuntu focal-security/main amd64 Packages [2133 kB]
Get:5 http://archive.ubuntu.com/ubuntu focal-updates InRelease [114 kB]
Get:6 http://archive.ubuntu.com/ubuntu focal-backports InRelease [108 kB]
Get:7 http://archive.ubuntu.com/ubuntu focal/multiverse amd64 Packages [177 kB]
Get:8 http://archive.ubuntu.com/ubuntu focal/universe amd64 Packages [11.3 MB]
Get:9 http://security.ubuntu.com/ubuntu focal-security/restricted amd64 Packages [1501 kB]
Get:10 http://security.ubuntu.com/ubuntu focal-security/universe amd64 Packages [898 kB]
Get:11 http://archive.ubuntu.com/ubuntu focal/restricted amd64 Packages [33.4 kB]
Get:12 http://archive.ubuntu.com/ubuntu focal/main amd64 Packages [1275 kB]
Get:13 http://archive.ubuntu.com/ubuntu focal-updates/restricted amd64 Packages [1613 kB]
Get:14 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 Packages [2594 kB]
Get:15 http://archive.ubuntu.com/ubuntu focal-updates/multiverse amd64 Packages [30.2 kB]
Get:16 http://archive.ubuntu.com/ubuntu focal-updates/universe amd64 Packages [1200 kB]
Get:17 http://archive.ubuntu.com/ubuntu focal-backports/universe amd64 Packages [27.4 kB]
Get:18 http://archive.ubuntu.com/ubuntu focal-backports/main amd64 Packages [55.1 kB]
Fetched 23.5 MB in 1min 40s (235 kB/s)
Reading package lists... Done
root@016aba0aa47c:/# apt-get install net-tools
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following NEW packages will be installed:
  net-tools
0 upgraded, 1 newly installed, 0 to remove and 34 not upgraded.
Need to get 196 kB of archives.
After this operation, 864 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu focal/main amd64 net-tools amd64 1.60+git20180626.aebd88e-1ubuntu1 [196 kB]
Fetched 196 kB in 3s (74.8 kB/s)
debconf: delaying package configuration, since apt-utils is not installed
Selecting previously unselected package net-tools.
(Reading database ... 4127 files and directories currently installed.)
Preparing to unpack .../net-tools_1.60+git20180626.aebd88e-1ubuntu1_amd64.deb ...
Unpacking net-tools (1.60+git20180626.aebd88e-1ubuntu1) ...
Setting up net-tools (1.60+git20180626.aebd88e-1ubuntu1) ...
root@016aba0aa47c:/# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.3  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:03  txqueuelen 0  (Ethernet)
        RX packets 8467  bytes 24172245 (24.1 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 7644  bytes 417236 (417.2 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

4. 安装完成后，commit我们自己的新镜像

公式：

```sh
docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]
```

命令：在容器外执行，记得

```sh
docker commit -m="ifconfig cmd add" -a="zzyy" a69d7c825c4f zzyyubuntu:1.2
```

```sh {1,5,7,9}
[root@frx01 ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
016aba0aa47c        ubuntu              "/bin/bash"              3 minutes ago       Up 3 minutes                                 relaxed_jackson
ac3ec6f2ef9b        registry            "/entrypoint.sh /etc…"   28 minutes ago      Up 28 minutes       0.0.0.0:5000->5000/tcp   elated_stallman
[root@frx01 ~]# docker commit -m="ifconfig cmd add" -a="zzyy" 016aba0aa47c zzyyubuntu:1.2
sha256:6581250435309a04a2ea6bf1f94f12bfeadee801e0a77e59b29cdf8d78b46194
[root@frx01 ~]# docker images
REPOSITORY                                            TAG                 IMAGE ID            CREATED             SIZE
zzyyubuntu                                            1.2                 658125043530        7 seconds ago       112MB
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                 64df8ffb7faf        3 days ago          179MB
registry                                              latest              b8604a3fe854        10 months ago       26.2MB
ubuntu                                                latest              ba6acccedd29        11 months ago       72.8MB
centos                                                latest              5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27              a92c139758db        4 years ago         558MB
```

5. 启动我们的新镜像和原来的对比

```sh {1,2}
[root@frx01 ~]# docker run -it zzyyubuntu:1.2 /bin/bash
root@3657253e6268:/# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.4  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:04  txqueuelen 0  (Ethernet)
        RX packets 6  bytes 516 (516.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

6. curl验证私服库上有什么镜像

```sh
curl -XGET http://192.168.91.166:5000/v2/_catalog
```

可以看到，目前私服库没有任何镜像上传过。。。。。。

```sh {2}
[root@frx01 ~]# curl -XGET http://192.168.91.166:5000/v2/_catalog
{"repositories":[]}
```

7. 将新镜像zzyyubuntu:1.2修改符合私服规范的Tag

按照公式： docker   tag   镜像:Tag   Host:Port/Repository:Tag

<mark>自己host主机IP地址，填写你们自己的，不要粘贴错误，O(∩_∩)O</mark>

使用命令 docker tag 将zzyyubuntu:1.2 这个镜像修改为192.168.91.166:5000/zzyyubuntu:1.2

docker tag  zzyyubuntu:1.2  192.168.91.166:5000/zzyyubuntu:1.2

```sh {4}
[root@frx01 ~]# docker tag  zzyyubuntu:1.2  192.168.91.166:5000/zzyyubuntu:1.2
[root@frx01 ~]# docker images
REPOSITORY                                            TAG                 IMAGE ID            CREATED             SIZE
192.168.91.166:5000/zzyyubuntu                        1.2                 658125043530        7 minutes ago       112MB
zzyyubuntu                                            1.2                 658125043530        7 minutes ago       112MB
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                 64df8ffb7faf        3 days ago          179MB
registry                                              latest              b8604a3fe854        10 months ago       26.2MB
ubuntu                                                latest              ba6acccedd29        11 months ago       72.8MB
centos                                                latest              5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27              a92c139758db        4 years ago         558MB
```

8. vim命令新增如下红色内容：vim /etc/docker/daemon.json

```sh
{
  "registry-mirrors": ["https://aa25jngu.mirror.aliyuncs.com"],
  "insecure-registries": ["192.168.91.166:5000"]
}
```

上述理由：docker默认不允许http方式推送镜像，通过配置选项来取消这个限制。====> 修改完后如果不生效，建议重启docker

9. 推送到私服库

```sh
[root@frx01 ~]# docker push 192.168.91.166:5000/zzyyubuntu:1.2
The push refers to repository [192.168.91.166:5000/zzyyubuntu]
fa04f996f230: Pushed
9f54eef41275: Pushed
1.2: digest: sha256:fb2ac08ef38b9ff478d209ce1912294ee3471c9ecc572adeaa9dd6cec4d4529a size: 741
```

10. curl验证私服库上有什么镜像2

```sh
[root@frx01 ~]# curl -XGET http://192.168.91.166:5000/v2/_catalog
{"repositories":["zzyyubuntu"]}
```

11. pull到本地并运行

```sh {23,31,37,38}
[root@frx01 ~]# docker images
REPOSITORY                                            TAG                 IMAGE ID            CREATED             SIZE
192.168.91.166:5000/zzyyubuntu                        1.2                 658125043530        19 minutes ago      112MB
zzyyubuntu                                            1.2                 658125043530        19 minutes ago      112MB
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                 64df8ffb7faf        3 days ago          179MB
registry                                              latest              b8604a3fe854        10 months ago       26.2MB
ubuntu                                                latest              ba6acccedd29        11 months ago       72.8MB
centos                                                latest              5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27              a92c139758db        4 years ago         558MB
[root@frx01 ~]# docker rmi -f 192.168.91.166:5000/zzyyubuntu:1.2
Untagged: 192.168.91.166:5000/zzyyubuntu:1.2
Untagged: 192.168.91.166:5000/zzyyubuntu@sha256:fb2ac08ef38b9ff478d209ce1912294ee3471c9ecc572adeaa9dd6cec4d4529a
[root@frx01 ~]# docker rmi -f zzyyubuntu:1.2
Untagged: zzyyubuntu:1.2
Deleted: sha256:6581250435309a04a2ea6bf1f94f12bfeadee801e0a77e59b29cdf8d78b46194
[root@frx01 ~]# docker images
REPOSITORY                                            TAG                 IMAGE ID            CREATED             SIZE
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                 64df8ffb7faf        3 days ago          179MB
registry                                              latest              b8604a3fe854        10 months ago       26.2MB
ubuntu                                                latest              ba6acccedd29        11 months ago       72.8MB
centos                                                latest              5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27              a92c139758db        4 years ago         558MB
[root@frx01 ~]# docker pull 192.168.91.166:5000/zzyyubuntu:1.2
1.2: Pulling from zzyyubuntu
7b1a6ab2e44d: Already exists
0c8559be87f8: Already exists
Digest: sha256:fb2ac08ef38b9ff478d209ce1912294ee3471c9ecc572adeaa9dd6cec4d4529a
Status: Downloaded newer image for 192.168.91.166:5000/zzyyubuntu:1.2
[root@frx01 ~]# docker images
REPOSITORY                                            TAG                 IMAGE ID            CREATED             SIZE
192.168.91.166:5000/zzyyubuntu                        1.2                 658125043530        22 minutes ago      112MB
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                 64df8ffb7faf        3 days ago          179MB
registry                                              latest              b8604a3fe854        10 months ago       26.2MB
ubuntu                                                latest              ba6acccedd29        11 months ago       72.8MB
centos                                                latest              5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27              a92c139758db        4 years ago         558MB
[root@frx01 ~]# docker run -it 192.168.91.166:5000/zzyyubuntu:1.2 /bin/bash
root@749c02466301:/# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.3  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:03  txqueuelen 0  (Ethernet)
        RX packets 6  bytes 516 (516.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

