---
title: Nginx 部署与集群
date: 2022-08-06 16:14:40
permalink: /middleware/Nginx/Nginx_Deployment_and_cluster
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 部署与集群

[[toc]]

## Nginx与Tomcat部署

前面已经将 Nginx 的大部分内容进行了讲解，我们都知道了 Nginx 在高并发场景和处理静态资源是非常高性能的，但是在实际项目中除了静态资源还有就是后台业务代码模块，一般后台业务都会被部署在 Tomcat、weblogic 或者是 websphere 等 Web 服务器上。那么如何使用 Nginx 接收用户的请求并把请求转发到后台 Web 服务器？

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.iachagf6u0g.webp)

步骤分析:

- 在服务器 A 上准备 Tomcat 环境，并在 Tomcat 上部署一个 Web 项目。这步骤在 [环境准备(Tomcat)](/middleware/Nginx/Nginx_Deployment_and_cluster/#环境准备-tomcat)
- 在服务器 B 上准备 Nginx 环境，使用 Nginx 接收请求，并把请求分发到 Tomcat 上。这步骤在 [环境准备(Nginx)](/middleware/Nginx/Nginx_Deployment_and_cluster/#环境准备-nginx)

### 环境准备(Tomcat)

本次将采用 Tomcat 作为后台 Web 服务器。

- 在 服务器 A 上准备一个 Tomcat
  - Tomcat 官网地址：[https://tomcat.apache.org/](https://tomcat.apache.org/)
- 下载 Tomcat，这里使用的是 `apache-tomcat-9.0.54.tar.gz`
- 进入上传目录，将 Tomcat 进行解压缩

```sh
mkdir /usr/local/tomcat

tar -zxf apache-tomcat-9.0.54.tar.gz -C /usr/local/tomcat
```

准备一个 Web 项目，将其打包为 War 包，这里是 demo.war

- 将写好的 War 包上传到 Tomcat 目录下的 webapps 包下
- 将 Tomcat 进行启动，进入 Tomcat 的 bin 目录下，执行命令：

```sh
./startup.sh
```

启动完成 Tomcat 后，进行访问测试

浏览器访问：

- 静态资源：`http://192.168.200.146:8080/demo/index.html`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.pln0ovd1h1c.webp)

+ 动态资源：`http://192.168.200.146:8080/demo/getAddress`

动态资源可以是端口号，此时的端口是 8080![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.31nc8e1cdee0.webp)

自此，服务器 A 的 Tomcat 部署已经实现。

**demo.war 的内容有什么呢？**

其实你可以自己制作一个 war 包，这里说明一下，demo.war 里有两个图片，和一个 index.html

index.html 文件引用了两个图片：

```html {9,18}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/jquery.min.js"></script>
    <script>
        $(function(){
           $.get('http://192.168.200.133/demo/getAddress',function(data){
               $("#msg").html(data);
           });
        });
    </script>
</head>
<body>
    <img src="images/logo.png"/>
    <h1>Nginx如何将请求转发到后端服务器</h1>
    <h3 id="msg"></h3>
    <img src="images/mv.png"/>
</body>
</html>
```

可以看出，当访问 index.html 时，它会主动去请求 `/getAddress`，这个请求返回端口号，即把 8080 当作动态资源，显示到页面上，如果是 9090 端口访问，则返回 9090 显示页面上。你也可以直接访问 `/getAddress`，直接获取端口号。

### 环境准备(Nginx)

我们已经在 Tomcat 实现了两个效果，那么现在需要把 Tomcat 的地址放到 Nginx 里，由 Nginx 帮我们代理这个 Tomcat 地址，这样我们访问 Nginx，实际上就是访问 Tomcat。

1. 使用 Nginx 的反向代理，将请求转给 Tomcat 进行处理。

```nginx
upstream webservice {
	server 192.168.200.146:8080;  # 服务器 A 的 Tomcat  地址
}
server{
    listen		80;
    server_name localhost;
    location /demo {
    	proxy_pass http://webservice;
    }
}
```

2. 启动访问服务器 B，测试是否代理到服务器 A 的 Tomcat，效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.6taygwj4nt80.webp)

学习到这，可能大家会有一个困惑，明明直接通过 Tomcat 就能访问，为什么还需要多加一个 Nginx，这样不是反而是系统的复杂度变高了么? 那接下来我们从两个方便给大家分析下这个问题，

- 第一个使用 Nginx 实现动静分离
- 第二个使用 Nginx 搭建 Tomcat 的集群

## 动静分离

**什么是动静分离？**

- 动：后台应用程序的业务处理
- 静：网站的静态资源（html，javaScript，css，images 等文件）
- 分离：将两者进行分开部署访问，提供用户进行访问。

**举例说明就是以后所有和静态资源相关的内容都交给 Nginx 来部署访问，非静态内容则交个类似于 Tomcat 的服务器来部署访问。**

**为什么要动静分离？**

前面我们介绍过 Nginx 在处理静态资源的时候，效率是非常高的，而且 Nginx 的并发访问量也是名列前茅，而 Tomcat 则相对比较弱一些，所以把静态资源交给 Nginx 后，可以减轻 Tomcat 服务器的访问压力并提高静态资源的访问速度。

动静分离以后，降低了动态资源和静态资源的耦合度。如动态资源宕机了也不影响静态资源的展示。

**如何实现动静分离?**

实现动静分离的方式很多，比如静态资源可以部署到 CDN、Nginx 等服务器上，动态资源可以部署到 Tomcat、weblogic 或者 websphere 上。这里使用 Nginx + Tomcat 来实现动静分离。

### 需求分析

如下图，因为 Nginx 处理静态资源性能高，所以我们把静态资源放在 Nginx 服务器上，然后把动态资源放到 Tomcat 服务器上。当访问 Nginx 的静态资源时，Nginx 会去访问 Tocmat 获取动态资源。实现动静分离。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.2v1uen08t3c0.webp)

### 实现步骤

- 将 demo.war 项目中的静态资源（两个图片）都删除掉，重新打包生成一个 War 包

  这时候 War 包只留下动态资源，而静态资源要放到 Nginx 上。

- 将新的 War 包部署到 Tomcat 中，把之前部署的内容删除掉

  - 进入到 tomcat 的 webapps 目录下，将之前的 demo 目录和 demo.war 包删除掉
  - 将新的 War 包复制到 webapps 下
  - 将 tomcat 启动

- 在 Nginx 所在的服务器 B 上创建如下目录，并将对应的静态资源放入指定的位置

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.3e4j68pre4k0.webp)

```sh
mkdir /usr/local/nginx/html/web/images
mkdir /usr/local/nginx/html/web/js

cp logo.png /usr/local/nginx/html/web/images
cp mv.png /usr/local/nginx/html/web/images
cp jquery.min.js /usr/local/nginx/html/web/js

vim /usr/local/nginx/html/web/index.html
```

其中 index.html 页面的内容如下:

```html {9}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/jquery.min.js"></script>
    <script>
        $(function(){
           $.get('http://192.168.200.133/demo/getAddress',function(data){
               $("#msg").html(data);
           });
        });
    </script>
</head>
<body>
    <img src="images/logo.png"/>
    <h1>Nginx如何将请求转发到后端服务器</h1>
    <h3 id="msg"></h3>
    <img src="images/mv.png"/>
</body>
</html>
```

第 9 行代码，它访问的这个地址是服务器 B 的 Nginx，通过这个地址让 Nginx 去获取服务器 A 的 Tomcat 动态资源。

+ 在配置文件配置 Nginx 的静态资源与动态资源的访问

```nginx
upstream webservice{
    server 192.168.200.146:8080;  # 服务器 A 的 Tocmat
}
server {
    listen       80;
    server_name  localhost;

    # 动态资源从 Tomcat 获取
    location /demo {     		 # index.html 第 9 行代码触发该 location
        proxy_pass http://webservice;
    }
    # 静态资源从自己身上获取
    location ~/.*\.(png|jpg|gif|js){
        root html/web;
        gzip on;
    }

    location / {
        root   html/web;
        index  index.html index.htm;
    }
}
```

+ 启动测试，访问 `http://192.168.200.133`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.2yip3al9lva0.webp)

假如某个时间点，由于某个原因导致 Tomcat 后的服务器宕机了，我们再次访问 Nginx，会得到如下效果：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.3s0ttch8r4i0.webp)

用户还是能看到页面，只是缺失 Tomcat 的动态资源，这就是前后端耦合度降低的效果，并且整个请求只和后的服务器交互了一次，js 和 images 都直接从 Nginx 服务器里返回，提供了效率，降低了后端服务器的压力。

## Tomcat集群搭建

在使用 Nginx 和 Tomcat 部署项目的时候，我们使用的是一台 Nginx 服务器和一台 Tomcat 服务器，效果图如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.4ukvicg3of80.webp)

那么问题来了，如果 Tomcat 的真的宕机了，整个系统就会不完整，所以如何解决上述问题？

一台服务器容易宕机，那就多搭建几台 Tomcat 服务器，这样的话就提升了后的服务器的可用性。这也就是我们常说的集群，搭建 Tomcat 的集群需要用到了 Nginx 的反向代理和赋值均衡的知识，具体如何来实现？

我们先来分析下原理：

用户请求到 Nginx，Nginx 使用负载均衡对三个 Tomcat 服务器进行访问，如果一个 Tomcat 服务器宕机了，那么还有两个 Tomcat 服务器可以使用。

如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.664h3o0m8y00.webp)

### 环境搭建

1. 准备 3 台 Tomcat 服务器，使用端口进行区分（实际环境应该是三台服务器），修改 Tomcat 的 server.xml，将端口修改分别修改为 8080、8180、8280

```sh
cp -r apache-tomcat-9.0.54 tomcat01
cp -r apache-tomcat-9.0.54 tomcat02
cp -r apache-tomcat-9.0.54 tomcat03
```

修改三个 Tocmat 配置文件的端口

```sh
vim tomcat01/conf/server.xml
vim tomcat02/conf/server.xml
vim tomcat03/conf/server.xml
```

修改的内容位置如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.76l3jwkc3b40.webp)

2. 在 Nginx 对应的配置文件中添加如下内容:

```nginx
upstream webservice{
    server 192.168.200.146:8080;     # tomcat01
    server 192.168.200.146:8180; 	 # tomcat02
    server 192.168.200.146:8280;	 # tomcat03
}
server{
    listen		80;
    server_name localhost;
    location /demo {
        proxy_pass http://webservice;
    }
}
```

3. 启动 Tomcat 并访问测试

```http
http://192.168.200.146:8080/demo/getAddress
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.2389oc46sdxc.webp)

```http
http://192.168.200.146:8180/demo/getAddress
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.1sjv5fphqk8w.webp)

```http
http://192.168.200.146:8280/demo/getAddress
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.6uckjob0ptc0.webp)

好了，完成了上述环境的部署，我们已经解决了 Tomcat 的高可用性，一台服务器宕机，还有其他两条对外提供服务，同时也可以实现后台服务器的不间断更新。

**但是新问题出现了，上述环境中，如果是 Nginx 宕机了呢，那么整套系统都将服务对外提供服务了，这个如何解决？**

## Nginx集群搭建

针对于上面提到的问题，我们来分析下要想解决上述问题，需要面临哪些问题？

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.664h3o0m8y00.webp)

需要两台以上的 Nginx 服务器对外提供服务，这样的话就可以解决其中一台宕机了，另外一台还能对外提供服务，但是如果是两台 Nginx 服务器的话，会有两个 IP 地址，用户该访问哪台服务器，用户怎么知道哪台是好的，哪台是宕机了的？

### Keepalived

使用 Keepalived 来解决，Keepalived 软件由 C 编写的，最初是专为 LVS 负载均衡软件设计的，Keepalived 软件主要是通过 VRRP 协议实现高可用功能。

### VRRP介绍

VRRP（Virtual Route Redundancy Protocol）协议，翻译过来为虚拟路由冗余协议。VRRP 协议将两台或多台路由器设备虚拟成一个设备，对外提供虚拟路由器 IP，而在路由器组内部，如果实际拥有这个对外 IP 的路由器如果工作正常的话就是 MASTER，MASTER 实现针对虚拟路由器IP的各种网络功能。其他设备不拥有该虚拟 IP，状态为 BACKUP，处了接收 MASTER 的 VRRP 状态通告信息以外，不执行对外的网络功能。当主机失效时，BACKUP 将接管原先 MASTER 的网络功能。

看图分析：VRRP 把两个 Nginx 分成两个路由（VRRP 路由 1 和 VRRP 路由 2），并生成一个 Virtual 路由，用户访问的是 Virtual 路由，该路由会去访问两个 Nginx 生成的 VRRP 路由。那么到底访问谁呢？VRRP 会给两个路由分配角色，一个是 Master（老大），另一个是 Backup（备份），所以访问的是 Master 角色的路由，当 Master 角色路由宕机了，才会找到 Backup 备份路由。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.zc2md5tuu0w.webp)

从上面的介绍信息获取到的内容就是 VRRP 是一种协议，那这个协议是用来干什么的？

1. 选择协议

   VRRP 可以把一个虚拟路由器的责任动态分配到局域网上的 VRRP 路由器中的一台。其中的虚拟路由即 Virtual 路由是由 VRRP 路由群组创建的一个不真实存在的路由，这个虚拟路由也是有对应的 IP 地址。而且 VRRP 路由 1 和 VRRP 路由 2 之间会有竞争选择，通过选择会产生一个 Master 路由和一个 Backup 路由。

2. 路由容错协议

   Master 路由和 Backup 路由之间会有一个心跳检测，Master 会定时告知 Backup 自己的状态，如果在指定的时间内，Backup 没有接收到这个通知内容，Backup 就会替代 Master 成为新的 Master。Master 路由有一个特权就是虚拟路由和后端服务器都是通过 Master 进行数据传递交互的，而备份节点则会直接丢弃这些请求和数据，不做处理，只是去监听 Master 的状态。

用了 Keepalived 后，解决方案如图下:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.3n6clkv1blk0.webp)

看图分析：VIP 是虚拟路由，是专门给用户发送请求。一旦用户发送请求到 VIP，VIP 就会发送给 Master（主）的 Nginx，如果 Master（主）Nginx 宕机了，才会发送给 Backup（备份） Nginx 路由。

### 环境搭建

环境准备

| VIP IP          | Nginx IP                    | 主机名      | 主/从  |
| --------------- | --------------------------- | ----------- | ------ |
|                 | 192.168.200.133（服务器 A） | keepalived1 | Master |
| 192.168.200.222 |                             |             |        |
|                 | 192.168.200.122（服务器 B） | keepalived2 | Backup |

**确保服务器 A 和服务器 B 的 Nginx 配置保持一致。**

keepalived 的安装步骤如下：

- 步骤1：从官方网站下载 keepalived，官网地址 [https://keepalived.org/](https://keepalived.org/)
- 步骤2：将下载的资源上传到服务器，这里是 `keepalived-2.0.20.tar.gz`
- 步骤3：在 `/opt` 目录下创建 keepalived 目录，方便管理资源

```sh
mkdir /opt/keepalived
```

+ 步骤4：将压缩文件进行解压缩，解压缩到指定的目录

```sh
tar -zxf keepalived-2.0.20.tar.gz -C /opt/keepalived
```

+ 步骤5：对 keepalived 进行配置，编译和安装

```sh
cd /opt/keepalived/keepalived-2.0.20

./configure --sysconf=/etc --prefix=/usr/local   # 安装到 /usr/local 目录下，可修改

make && make install
```

**两台 Nginx 服务器都要安装 keepalive。**

安装完成后，有两个文件需要我们认识下：

- `/etc/keepalived/keepalived.conf`：keepalived 的系统配置文件，我们主要操作的就是该文件

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.5hd9zg18lp80.webp)

+ `/usr/local/sbin` 目录下的 `keepalived`：这是系统配置脚本，用来启动和关闭 keepalived

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.54vzhzf4avw0.webp)

### Keepalived配置文件介绍

打开 keepalived.conf 配置文件

这里面会分三部：

- 第一部分是 global 全局配置
- 第二部分是 vrrp 相关配置
- 第三部分是 LVS 相关配置。

这里主要是使用 keepalived 实现高可用部署，没有用到 LVS，所以我们重点关注的是前两部分。

打开 keepalived.conf 文件

```sh
vim /etc/keepalived/keepalived.conf
```

文件内容部分介绍如下：

```nginx
# global全局部分
global_defs {
    
   notification_email {  # 通知邮件，当 keepalived 切换 Master 和 Backup 时需要发 email 给具体的邮箱地址
     tom@itcast.cn
     jerry@itcast.cn
   }
   notification_email_from kele@youngkbt.com   # 设置发件人的邮箱信息
   
   smtp_server 192.168.200.1   # 指定 smpt 服务地址
   
   smtp_connect_timeout 30   # 指定 smpt 服务连接超时时间
   
   router_id LVS_DEVEL   # 运行 keepalived 服务器的一个标识，可以用作发送邮件的主题信息
   
   # 默认是不跳过检查。检查收到的 VRRP 通告中的所有地址可能会比较耗时，设置此命令的意思是，如果通告与接收的上一个通告来自相同的 master 路由器，则不执行检查(跳过检查)
   vrrp_skip_check_adv_addr
   
   vrrp_strict    # 严格遵守 VRRP 协议
  
   vrrp_garp_interval 0   # 在一个接口发送的两个免费 ARP 之间的延迟。可以精确到毫秒级。默认是 0
   
   vrrp_gna_interval 0  # 在一个网卡上每组消息之间的延迟时间，默认为 0
}
```

这里需要修改的是 5、6、8 行代码。

VRRP 部分可以包含以下四个子模块：

1. vrrp_script
2. vrrp_sync_group
3. garp_group
4. vrrp_instance

我们会用到第一个（[vrrp_script](/middleware/Nginx/Nginx_Deployment_and_cluster/#vrrp-script)）和第四个（[vrrp_instance](/middleware/Nginx/Nginx_Deployment_and_cluster/#vrrp-instance)）。

### vrrp_instance

`vrrp_instance` 模块内容：

```nginx {3,5,6,7,13}
# 设置 keepalived 实例的相关信息，VI_1 为 VRRP 实例名称
vrrp_instance VI_1 {
    state MASTER  		  # 有两个值可选 MASTER 主，BACKUP 备
    interface ens33		  # vrrp 实例绑定的接口，用于发送 VRRP 包[当前服务器使用的网卡名称]
    virtual_router_id 51  # 指定 VRRP 实例 ID，范围是 0-255
    priority 100		  # 指定优先级，优先级高的将成为 MASTER
    advert_int 1		  # 指定发送 VRRP 通告的间隔，单位是秒。这里是心跳检查的时间
    authentication {	  # vrrp 之间通信的认证信息
        auth_type PASS	  # 指定认证方式。PASS 简单密码认证(推荐)
        auth_pass 1111	  # 指定认证使用的密码，最多 8 位
    }
    virtual_ipaddress {   # 虚拟 IP 地址设置虚拟 IP 地址，供用户访问使用，可设置多个，一行一个
        192.168.200.222
    }
}
```

`vrrp_instance` 模块中我们修改的是第 3、5、6、7、13 行代码。

第 3 行代码是说明当前 Nginx 服务器的角色是 Master 还是 Backup。分别在服务器 A 和 B 进行角色配置。

第 5 行代码是 VIP 的 ID，如果使用相同的虚拟路由 VIP，请保持 ID 一致。

第 6 行代码是优先级，请让 Master 服务器的优先级大于 Backup 服务器的优先级。如 100 > 90。

第 7 行代码是 Master 和 Backup 之间通信的间隔时间，如果无法通信，说明 Master 已经宕机，则切换为 Backup。

第 13 行代码是用户访问的虚拟 IP 地址，即 VIP，它会发送给 Nginx 服务器。

### 服务器配置

Keepalived 的具体配置内容如下：

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"

::: tab 服务器A

```nginx
global_defs {
   notification_email {
        tom@itcast.cn
        jerry@itcast.cn
   }
   notification_email_from zhaomin@itcast.cn
   smtp_server 192.168.200.1
   smtp_connect_timeout 30
   router_id keepalived1
   vrrp_skip_check_adv_addr
   vrrp_strict
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

vrrp_instance VI_1 {
    state MASTER
    interface ens33
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.200.222
    }
}
```

:::

::: tab 服务器B

```nginx
! Configuration File for keepalived

global_defs {
   notification_email {
        tom@itcast.cn
        jerry@itcast.cn
   }
   notification_email_from zhaomin@itcast.cn
   smtp_server 192.168.200.1
   smtp_connect_timeout 30
   router_id keepalived2
   vrrp_skip_check_adv_addr
   vrrp_strict
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

vrrp_instance VI_1 {
    state BACKUP
    interface ens33
    virtual_router_id 51
    priority 90
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.200.222
    }
}
```

:::

::::

### 访问测试

1. 启动 keepalived 之前，先使用命令 `ip a`，查看 `192.168.200.133` 和 `192.168.200.122` 这两台服务器的 IP 情况

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.4lh36tkt0kk0.webp)

2. 分别启动两台服务器的 keepalived

```sh
cd /usr/local/sbin

./keepalived
```

再次通过 `ip a` 查看 IP

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.79pu8lyco700.webp)

此时发现服务器 A 多出了 `192.168.200.222`，正是配置的虚拟路由 VIP，而服务器 B 并没有，说明服务器 A 是 Master，优先级高于服务器 B。

3. 当把 `192.168.200.133` 服务器 A 上的 keepalived 关闭后，再次查看 IP

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.qwb7iteldn4.webp)

说明当 Master 服务器 A 宕机后，服务器 B 由 Backup 晋升为 Master。

通过上述的测试，我们会发现，虚拟 IP(VIP)会在 Master 节点上，当 Master 节点上的 keepalived 出问题以后，因为 Backup 无法收到 Master 发出的 VRRP 状态通过信息，就会直接升为 Master 。VIP 也会「漂移」到新的 Master 。

**上面测试和 Nginx 有什么关系?**

我们把 `192.168.200.133` 服务器 A 的 keepalived 再次启动下，由于它的优先级高于 `192.168.200.122` 服务器 B，所有它会再次成为 Master，VIP 也会「漂移」过去。

我们通过浏览器访问：

```http
http://192.168.200.222/
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.6xosmovingw0.webp)

如果把 `192.168.200.133` 服务器 A 的 keepalived 进程关闭掉

```sh
kill keepalived 
```

再次访问相同的地址，效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.60wzzgrveak0.webp)

虽然效果成功实现了，但是此时是我们手动把服务器上的 keepalived 关闭，才让 VIP 进行切换。

**而什么时候关闭 keepalived 呢？**

应该是在 keepalived 所在服务器的 Nginx 出现问题后，把 keepalived 关闭掉，就可以让 VIP 执行另外一台服务器。**但是现在这所有的操作都是通过手动来完成的**，我们如何能让系统自动判断当前服务器的 Nginx 是否正确启动，如果没有，要能让 VIP 自动进行「漂移」，这个问题该如何解决？往下看。

### vrrp_script

keepalived 只能做到对网络故障和 keepalived 本身的监控，即当出现网络故障或者 keepalived 本身出现问题时，进行切换。但是这些还不够，我们还需要监控 keepalived 所在服务器上的其他业务，比如 Nginx，如果 Nginx 出现异常了，而 keepalived 却保持正常，是无法完成系统的正常工作的，因此需要根据业务进程的运行状态决定是否需要进行主备切换，这个时候，我们可以通过编写脚本对业务进程进行检测监控。

首先我们要知道 keepalived 的 vrrp_script 的配置模板：

```nginx
vrrp_script 脚本名称
{
    script "脚本位置"
    interval 3 # 执行时间间隔
    weight -20 # 动态调整 vrrp_instance 的优先级
}
```

实现步骤：

- 编写脚本，这里的脚本名是 `ck_nginx.sh`，位置在 `/etc/keepalived` 路径下

```shell
#!/bin/bash
num=`ps -C nginx --no-header | wc -l`  # 查询 Nginx 的进程数

if [ $num -eq 0 ];then       	       # 如果 Nginx 的进程数等于 0
/usr/local/nginx/sbin/nginx			   # 则可执行文件 nginx，启动 Nginx 服务

sleep 2								   # 阻塞 2 秒 

if [ `ps -C nginx --no-header | wc -l` -eq 0 ]; then  # 再次查询 Nginx 的进程数
killall keepalived		# 如果 Nginx 的进程数不等于 0，则杀死 keepalived 进程

fi
fi
```

- ps 命令用于显示当前进程 (process) 的状态。
- -C(command)：指定命令的所有进程
- --no-header：排除标题

命令的效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.1ypeqh0nut8g.webp)

代表目前的 num = 3。

这个脚本其实就是判断 Nginx 是否启动还是宕机了，如果没有启动，则重新启动。重新启动后再次查看 Nginx 是否启动成功，如果没有启动，说明 Nginx 宕机了，则杀死 keepalived 进程，这样，另一台服务器的 Nginx 就晋升为 Master。

- 为脚本文件设置权限

```sh
chmod 755 ck_ngi
```

+ 将脚本添加到 Master 服务器 A 的 keepalived 的配置文件里

```sh
vim /etc/keepalived/keepalived.conf
```

添加如下内容：

```nginx
vrrp_script ck_nginx {
   script "/etc/keepalived/ck_nginx.sh" # 执行脚本的位置
   interval 2		# 执行脚本的周期，秒为单位
   weight -20		# 权重的计算方式
}
vrrp_instance VI_1 {
    state MASTER
    interface ens33
    virtual_router_id 10
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.200.111
    }
    track_script {
      ck_nginx
    }
}
```

- 如果效果没有出来，可以使用 `tail -f /var/log/messages` 查看日志信息，找对应的错误信息
- 两个 Nginx 启动后，关闭 Master 的 Nginx，通过 `ip a` 查看 Backup 的 Nginx 的IP，是否晋升为 Master

**问题思考**

通常如果 Master 服务死掉后，Backup 会变成 Master，但是当原来的 Master 服务又恢复了，它会和原来的 Backup 会抢占 VIP，这样就会发生两次切换，这对业务繁忙的网站来说是不好的。所以我们要在配置文件加入 nopreempt 非抢占，但是这个参数只能用于 Backup 的服务器，所以我们在用配置的时候，最好 Master 和 Backup 的 state 都设置成 Backup，这样它们只能通过 priority 优先级来竞争。


