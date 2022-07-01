---
title: CentOS7 KVM虚拟化技术
date: 2022-04-21 17:28:20
permalink: /pages/cdeb68/
categories:
  - KVM虚拟化技术
tags:
  - KVM虚拟化技术
---
# CentOS7 KVM虚拟化技术

[[toc]]

## 虚拟化介绍

虚拟化：是指通过虚拟化技术将一台计算机虚拟为多台逻辑计算机。在一台计算机上同时运行多个逻辑计算机，每个逻辑计算机可运行不同的操作系统，并且应用程序都可以在相互独立的空间内运行而互相不影响，从而显著提高计算机的工作效率。

虚拟化层层种类：完全虚拟化、准虚拟化、系统虚拟化、桌面虚拟化

## KVM介绍

kVM 全称是 Kernel-Based Virtual Machine。也就是说 KVM 是基于 Linux 内核实现的。
KVM有一个内核模块叫 kvm.ko，只用于管理虚拟 CPU 和内存。

那 IO 的虚拟化，比如存储和网络设备则是由 Linux 内核与Qemu来实现。
作为一个 Hypervisor，KVM 本身只关注虚拟机调度和内存管理这两个方面。IO 外设的任务交给 Linux 内核和 Qemu。

KVM，是一个开源的系统虚拟化模块，自 Linux 2.6.20 之后集成在Linux的各个主要发行版本中。 它使用 Linux自身的调度器进行管理，所以相对亍Xen，其核心源码很少。KVM 目前已成为学术界的主 流 VMM(虚拟机监控器)之一。KVM的虚拟化需要硬件支持（如 Intel VT技术戒者 AMD V技术)。是基于硬件的完全虚拟化。而 Xen 早期则是基于软件模拟的 Para-Virtualization。

### KVM实际操作

::: tip

新建虚拟机，内存40G

:::

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Hadoop/images/02/01.png)

1. 查看 CPU 是否支持硬件虚拟化技术

```shell
Intel: cat /proc/cpuinfo | grep --color vmx （指的是酷睿处理器）
AMD: cat /proc/cpuinfo | grep --color svm （指的是锐龙处理器）
```

> 出现红色的`vmx`就可以继续

2. 本地yum源

```shell
vim m.repo
```

把下面内容粘进去,`:wq`保存退出

```shell
[m]
name=m
baseurl=file:///mnt
enabled=1
gpgcheck=0
```

3. 安装KVM模块、管理工具和 libvirt，命令行安装

```shell
yum -y install qemu-kvm libvirt libguestfs-tools virt-install virt-manager libvirt-python
```

解释：

qemu-kvm ： kvm 主程序， KVM虚拟化模块

virt-manager： KVM图形化管理工具

libvirt： 虚拟化服务

libguestfs-tools : 虚拟机的系统管理工具

virt-install ： 安装虚拟机的实用工具 。比如 virt-clone克隆工具就是这个包安装的

libvirt-python ： python 调用libvirt 虚拟化服务的 api 接口库文件

4. 开启并查看安装KVM后的服务

+ 开启虚拟化服务

```shell
systemctl start libvirtd
```

+ 设置 libvirtd服务开机启动

```shell
systemctl enable libvirtd
```

+ 查看正在加载kvm模块

```shell
[root@frx01 ~]# lsmod | grep kvm
kvm_intel             188740  0 
kvm                   637515  1 kvm_intel
irqbypass              13503  1 kvm
```

> lsmod——显示已载入系统的模块

```shell
lsmod 
```

5. 将kvm管理工具从英文界面，切换成中文界面

```shell
[root@frx01 ~]# echo $LANG
zh_CN.UTF-8 #中文哈
```

```shell
 LANG='zh_CN.UTF-8' #如果是英文，把英文改为中文
```

### KVM配置网络

网桥介绍: 我们经常所说的 Bridge设备其实就是网桥设备，也就相当于现在的二层交换机，用于连接 同一网段内的所有机器，所以我们的目的就是将网络设备 eth0添加到 br0，此时 br0 就成为了所谓的交 换机设备，我们物理机的 eth0也是连接在上面的。

添加桥接设备 br0： 相当于一个二层交换机

1. 安装桥设备工具

```shell
yum -y install net-tools bridge-utils
```

2. 编辑网卡桥接文件cloudbr

```shell
[root@frx01 ~]# cd /etc/sysconfig/network-scripts/
[root@frx01 network-scripts]# ls
ifcfg-ens33      ifdown-post      ifup-eth     ifup-sit
ifcfg-ens33.bak  ifdown-ppp       ifup-ib      ifup-Team
ifcfg-lo         ifdown-routes    ifup-ippp    ifup-TeamPort
ifdown           ifdown-sit       ifup-ipv6    ifup-tunnel
ifdown-bnep      ifdown-Team      ifup-isdn    ifup-wireless
ifdown-eth       ifdown-TeamPort  ifup-plip    init.ipv6-global
ifdown-ib        ifdown-tunnel    ifup-plusb   network-functions
ifdown-ippp      ifup             ifup-post    network-functions-ipv6
ifdown-ipv6      ifup-aliases     ifup-ppp
ifdown-isdn      ifup-bnep        ifup-routes
[root@frx01 network-scripts]# vim ifcfg-cloudbr0   #是零
```

添加一下内容

::: danger

网段使用你自己的网段，我的是192.168.197.1，[查看自己的网段步骤](/pages/600247/#配置网络)

:::

```shell
TYPE="Bridge"
BOOTPROTO="none"
DEVICE="cloudbr0"     
ONBOOT="yes"
IPADDR="192.168.197.188"   #需要修改
NETMASK="255.255.255.0"
GATEWAY="192.168.197.2"    #需要修改
DNS1="192.168.197.2"       #需要修改
STP="yes"
```

保存退出

3. 设置网卡文件

```shell
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

把我们原来的静态IP配置删除，添加一行`BRIDGE=cloudbr0`

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Hadoop/images/02/02.png)

保存退出

4. 重启网络服务

```shell
systemctl restart network
```

+ 测试是否可以上网

```shell
[root@frx01 network-scripts]# ping www.baidu.com
PING www.a.shifen.com (110.242.68.4) 56(84) bytes of data.
64 bytes from 110.242.68.4 (110.242.68.4): icmp_seq=1 ttl=128 time=35.8 ms
64 bytes from 110.242.68.4 (110.242.68.4): icmp_seq=2 ttl=128 time=30.9 ms
64 bytes from 110.242.68.4 (110.242.68.4): icmp_seq=3 ttl=128 time=34.3 ms
64 bytes from 110.242.68.4 (110.242.68.4): icmp_seq=4 ttl=128 time=35.8 ms
64 bytes from 110.242.68.4 (110.242.68.4): icmp_seq=5 ttl=128 time=35.8 ms
64 bytes from 110.242.68.4 (110.242.68.4): icmp_seq=6 ttl=128 time=30.0 ms
^C
--- www.a.shifen.com ping statistics ---
6 packets transmitted, 6 received, 0% packet loss, time 5007ms
rtt min/avg/max/mdev = 30.035/33.825/35.888/2.432 ms
```

5. 查询网桥信息

```shell
[root@frx01 network-scripts]# brctl show 
bridge name			bridge id		STP enabled	       interfaces
cloudbr0		8000.000c29dad62a		no				ens33
virbr0			8000.525400b1a5d4		yes				virbr0-nic
```

### 图形操作

1. 使用XFTP把最小化镜像传输到Linux系统

```shell
mkdir /opt/minmal-linux
cd /opt/minmal-linux
```

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Hadoop/images/02/03.png)

右键传输一下就OK

2. 打开创建虚拟机使用命令：

```shell
virt-manager
```

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Hadoop/images/02/04.png)

前进

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Hadoop/images/02/05.png)

前进，前进，前进

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Hadoop/images/02/06.png)

完成

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Hadoop/images/02/07.png)

继续，最小安装，取消启用KDUMP，主机名想改改，分区点击那个硬盘，完成

3. 开始安装

+ 设置root密码
+ 普通用户想创建创建

+ 安装完成，重启

### 结果

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Hadoop/images/02/08.png)

## 参考资料

+ https://blog.csdn.net/m0_50019871/article/details/109581648?spm=1001.2014.3001.5502

