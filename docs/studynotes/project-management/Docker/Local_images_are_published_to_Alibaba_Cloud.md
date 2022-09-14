---
title: 本地镜像发布到阿里云
date: 2022-09-14 23:27:23
permalink: /project-management/Docker/Local_images_are_published_to_Alibaba_Cloud
categories:
  - Docker
tags:
  - Docker
---
# 本地镜像发布到阿里云

[[toc]]

## 流程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.nzg3lx1r7y8.webp)

## 镜像的生成方法

+ 第一种：基于当前容器创建一个新的镜像，新功能增强
  + [具体步骤](/project-management/Docker/Docker_images_principle/#docker镜像commit操作案例)

+ 第二种：DockerFile章节

## 将本地镜像推送到阿里云

### 本地镜像原型

```sh {3}
[root@frx01 ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
frx01/myubuntu      1.3                 64df8ffb7faf        3 days ago          179MB
ubuntu              latest              ba6acccedd29        11 months ago       72.8MB
centos              latest              5d0da3dc9764        12 months ago       231MB
tomcat              8.5.27              a92c139758db        4 years ago         558MB
```

+ 阿里云开发者平台:[https://promotion.aliyun.com/ntms/act/kubernetes.html](https://promotion.aliyun.com/ntms/act/kubernetes.html)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.26vtegy9iack.webp)

+ 选择控制台，进入容器镜像服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.3ggtfvzruxk0.webp)

+ 进入个人实例

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.6x8g7kynigk0.webp)

+ 创建命名空间

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.x9xgkhb2rgw.webp)

+ 创建镜像仓库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.2qchilnl2di0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.104ml4c0mzn4.webp)

+ 进入管理页面获得脚本

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.5a1l9nfogv00.webp)

## 将镜像推送到阿里云

+ 将镜像推送到阿里云registy
+ 管理页面脚本

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.1t4n31w3b82o.webp)

+ 执行3的命令

```sh
docker login --username=冯荣旭 registry.cn-shenzhen.aliyuncs.com
docker tag [ImageId] registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3:[镜像版本号]
docker push registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3:[镜像版本号]
```

> 密码是自己容器镜像下面的访问凭证设置的密码

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.x8qx98px48w.webp)

> 设置image id和版本号

+ 在阿里云上面查看结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220914/image.ogz22mouas0.webp)

## 将阿里云的镜像下载到本地

```sh
[root@frx01 ~]# docker images
REPOSITORY                                            TAG                 IMAGE ID            CREATED             SIZE
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                 64df8ffb7faf        3 days ago          179MB
frx01/myubuntu                                        1.3                 64df8ffb7faf        3 days ago          179MB
ubuntu                                                latest              ba6acccedd29        11 months ago       72.8MB
centos                                                latest              5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27              a92c139758db        4 years ago         558MB
[root@frx01 ~]# docker rmi -f 64df8ffb7faf
Untagged: frx01/myubuntu:1.3
Untagged: registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3:1.3
Untagged: registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3@sha256:76bc84ede8beac0565b660ce31f588d6d2a1bcbc02f34b6c5b0563023f9b537e
Deleted: sha256:64df8ffb7faf445aa2c8e0e69e67819c4abe549dae7f6ddea943b1a62588b190
Deleted: sha256:7d5069718116e4d0a0329ef44838cda33f59aefae7e97e6e403185db6d3a9a80
```

```sh {6}
[root@frx01 ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              ba6acccedd29        11 months ago       72.8MB
centos              latest              5d0da3dc9764        12 months ago       231MB
tomcat              8.5.27              a92c139758db        4 years ago         558MB
[root@frx01 ~]# docker pull registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3:1.3
1.3: Pulling from frx01/myubuntu1.3
7b1a6ab2e44d: Already exists
bc4c9551ae8d: Pull complete
Digest: sha256:76bc84ede8beac0565b660ce31f588d6d2a1bcbc02f34b6c5b0563023f9b537e
Status: Downloaded newer image for registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3:1.3
[root@frx01 ~]# docker images
REPOSITORY                                            TAG                 IMAGE ID            CREATED             SIZE
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                 64df8ffb7faf        3 days ago          179MB
ubuntu                                                latest              ba6acccedd29        11 months ago       72.8MB
centos                                                latest              5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27              a92c139758db        4 years ago         558MB
[root@frx01 ~]# docker run -it 64df8ffb7faf /bin/bash
root@a7795849ec26:/# vim a.text
```

