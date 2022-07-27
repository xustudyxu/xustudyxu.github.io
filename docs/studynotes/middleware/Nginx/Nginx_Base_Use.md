---
title: Nginx 基本使用
date: 2022-07-27 21:45:47
permalink: /middleware/Nginx/Nginx_Base_Use
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 基本使用

[[toc]]

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.7e2zl4ci9t40.webp)

## 目录结构

进入Nginx的主目录我们可以看到这些文件夹

```sh
[root@master /]# cd /usr/local/nginx/
[root@master nginx]# ll
总用量 0
drwx------ 2 nobody root   6 7月  27 20:35 client_body_temp
drwxr-xr-x 2 root   root 333 7月  27 20:31 conf
drwx------ 2 nobody root   6 7月  27 20:35 fastcgi_temp
drwxr-xr-x 2 root   root  40 7月  27 20:31 html
drwxr-xr-x 2 root   root  58 7月  27 20:35 logs
drwx------ 2 nobody root   6 7月  27 20:35 proxy_temp
drwxr-xr-x 2 root   root  36 7月  27 20:33 sbin
drwx------ 2 nobody root   6 7月  27 20:35 scgi_temp
drwx------ 2 nobody root   6 7月  27 20:35 uwsgi_temp
```

其中这几个文件夹在刚安装后是没有的，主要用来存放运行过程中的临时文件

```sh
client_body_temp fastcgi_temp proxy_temp scgi_temp
```

+ 主要目录说明

| 目录 | 说明                                   |
| ---- | -------------------------------------- |
| conf | 用来存放配置文件相关                   |
| html | 用来存放静态文件的默认目录 html、css等 |
| sbin | nginx的主程序                          |

## 基本运行原理

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.5klrdamfdsg0.webp)

