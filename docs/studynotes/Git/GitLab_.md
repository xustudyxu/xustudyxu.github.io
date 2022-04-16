---
title: 自建代码托管平台-GitLab
date: 2022-01-30 21:20:57
permalink: /pages/68b3e1/
categories:
  - Git
tags:
  - Git
---
# 自建代码托管平台-GitLab

## GitLab 简介

GitLab 是由 GitLabInc.开发，使用 MIT 许可证的基于网络的 Git 仓库管理工具，且具有wiki 和 issue 跟踪功能。使用 Git 作为代码管理工具，并在此基础上搭建起来的 web 服务。GitLab 由乌克兰程序员 DmitriyZaporozhets 和 ValerySizov 开发，它使用 Ruby 语言写成。后来，一些部分用 Go 语言重写。截止 2018 年 5 月，该公司约有 290 名团队成员，以及 2000 多名开源贡献者。GitLab 被 IBM，Sony，JülichResearchCenter，NASA，Alibaba，Invincea，O’ReillyMedia，Leibniz-Rechenzentrum(LRZ)，CERN，SpaceX 等组织使用。

## GitLab 官网地址

[官网地址](https://about.gitlab.com/)

[安装说明](https://about.gitlab.com/installation/)

## GitLab 安装

### 服务器准备

准备一个系统为 CentOS7 以上版本的服务器，要求内存 4G，磁盘 50G。

关闭防火墙，并且配置好主机名和 IP，保证服务器可以上网。

此教程使用虚拟机：主机名：frx01 IP 地址：192.168.88.135

###  安装包准备

Yum 在线安装 gitlab- ce 时，需要下载几百 M 的安装文件，非常耗时，所以最好提前把所需 RPM 包下载到本地，然后使用离线 rpm 的方式安装。

下载地址：

```http
https://packages.gitlab.com/gitlab/gitlab-ce/packages/el/7/gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm
```

注：资料里提供了此 rpm 包，直接将此包上传到服务器/opt/module 目录下即可。

###  编写安装脚本

安装 gitlab 步骤比较繁琐，因此我们可以参考官网编写 gitlab 的安装脚本。

```shell
[root@frx01 module]# vim gitlab-install.sh
sudo rpm -ivh /opt/module/gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm
sudo yum install -y curl policycoreutils-python openssh-server cronie
sudo lokkit -s http -s ssh
sudo yum install -y postfix
sudo service postfix start
sudo chkconfig postfix on
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
sudo EXTERNAL_URL="http://gitlab.example.com" yum -y install gitlab-ce
```

+ 给脚本增加权限

```shell
[root@frx01 module]# chmod +x gitlab-install.sh 
[root@frx01 module]# ls
gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm  gitlab-install.sh
```

+ 然后执行该脚本，开始安装 gitlab-ce。注意一定要保证服务器可以上网。

```shell
[root@frx01 module]# ./gitlab-install.sh 
警告：/opt/module/gitlab-ce-13.10.2-ce.0.el7.x86_64.rpm: 头V4 RSA/SHA1 Signature, 密钥 ID f27eab47: NOKEY
错误：依赖检测失败：
	policycoreutils-python 被 gitlab-ce-13.10.2-ce.0.el7.x86_64 需要
上次元数据过期检查：0:00:22 前，执行于 2022年01月30日 星期日 19时14分24秒。
```

### 初始化 GitLab 服务

执行以下命令初始化 GitLab 服务，过程大概需要几分钟，耐心等待…

```shell
[root@frx01 module]# gitlab-ctl reconfigure
Starting Chef Infra Client, version 15.17.4
...

```

###  启动 GitLab 服务

执行以下命令启动 GitLab 服务，如需停止，执行 gitlab-ctl stop

```shell
[root@frx01 module]# gitlab-ctl start
ok: run: alertmanager: (pid 45311) 228s
ok: run: gitaly: (pid 45129) 311s
ok: run: gitlab-exporter: (pid 45243) 276s
ok: run: gitlab-workhorse: (pid 45229) 293s
ok: run: logrotate: (pid 42972) 1833s
ok: run: nginx: (pid 43625) 1695s
ok: run: node-exporter: (pid 45237) 287s
ok: run: postgres-exporter: (pid 45319) 227s
ok: run: postgresql: (pid 43161) 1811s
ok: run: prometheus: (pid 45281) 255s
ok: run: puma: (pid 43484) 1724s
ok: run: redis: (pid 43026) 1828s
ok: run: redis-exporter: (pid 45259) 262s
ok: run: sidekiq: (pid 43512) 1713s
```

### 使用浏览器访问 GitLab

使用主机名或者 IP 地址即可访问 GitLab 服务。需要提前配一下 windows 的 hosts 文件。

 没访问成功。。。



