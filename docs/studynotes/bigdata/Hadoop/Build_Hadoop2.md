---
title: 搭建Hadoop集群(二)
date: 2022-05-09 19:25:57
permalink: /pages/a20011/
categories:
  - Hadoop
tags:
  - Hadoop
---
# 搭建Hadoop集群(二)

[[toc]]

## 安装和配置MySQL

> 开启主节点虚拟机

1. 创建目录

```shell
mkdir /opt/mysql
```

```shell
cd /opt/mysql
```

2. 使用wget命令下载mysql

```shell
wget http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
```

3. 安装MySQL官方的Yum Repository

```shell
rpm -ivh mysql57-community-release-el7-11.noarch.rpm
```

4. 查看提供的MySQL版本

```shell
yum repolist all | grep mysql
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220509/image.71pc948s4to0.webp)

5. 安装MySQL

```shell
yum install -y mysql-community-server
```

> 在安装的过程中出现了以下问题
>
> ![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220509/image.1x7958d9kc5c.webp)
>
> 说xxx的公钥尚未安装
>
> + `解决办法`:
>
> ```shell
> rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
> ```
>
> + 再次安装，成功
>
> ```shell
> yum install mysql-server
> ```

> `再次安装中途可能需要需要你输入y`

6. 启动MySQL

```shell
systemctl start mysqld
```

+ 使用命令`systemctl status mysqld`

```shell {4}
[root@master ~]# systemctl status mysqld
● mysqld.service - MySQL Server
   Loaded: loaded (/usr/lib/systemd/system/mysqld.service; enabled; vendor preset: disabled)
   Active: active (running) since 一 2022-05-09 17:15:03 CST; 2min 5s ago
     Docs: man:mysqld(8)
           http://dev.mysql.com/doc/refman/en/using-systemd.html
  Process: 3539 ExecStart=/usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid $MYSQLD_OPTS (code=exited, status=0/SUCCESS)
  Process: 3486 ExecStartPre=/usr/bin/mysqld_pre_systemd (code=exited, status=0/SUCCESS)
 Main PID: 3542 (mysqld)
    Tasks: 27
   CGroup: /system.slice/mysqld.service
           └─3542 /usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid

5月 09 17:14:57 master systemd[1]: Starting MySQL Server...
5月 09 17:15:03 master systemd[1]: Started MySQL Server.
```

7. 测试MySQL

```shell
mysql -u root -p
```

> 密码不知道是什么,使用命令查看一下
>
> ```shell
> grep 'temporary password' /var/log/mysqld.log
> ```

> 可以看到...root@localhost:<---密码---->

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220509/image.2sasfja71cy0.webp)

> g?Uq#GAeM8YK 这就是我的临时密码

+ 使用root和初始化临时密码登录测试，输入你的临时密码

```shell
mysql -u root -p  
```

出现mysql命令行，说明登陆成功

```shell
[root@master ~]# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 5
Server version: 5.7.38

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

+ 设置root密码，对于个人开发环境，可以设置比较简单的密码

```shell
set global validate_password_policy=0;
```

+ 设置密码为12345678

```shell
set password for 'root'@'localhost'=password('12345678');
```

> 设置八位哦

+ 使用命令exit退出MySQL命令行，重新登录进行验证

+ 展示所有的数据库

```shell
show databases;
```

## 安装和配置Hive

1. 在MySQL中创建Hive所需用户和数据库并授权
   + 在MySQL中创建用户hive,密码为12345678

```shell
create user 'hive' identified by '12345678';
```

2. 创建数据库hive,使用命令

```shell
create database hive;
```

3. 将将数据库hive的所有权限授权于用户hive,使用命令

```shell
grant all privileges on hive.* to 'hive'@'localhost' identified by '12345678';
```

4. 刷新权限，使其立即生效

```shell
flush privileges;
```

5. 使用hive登录,并查看是否能看到数据库hive

```shell {1,3,17}
mysql> exit
Bye
[root@master ~]# mysql -u hive -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 14
Server version: 5.7.38 MySQL Community Server (GPL)

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| hive               |
+--------------------+
2 rows in set (0.00 sec)

```

### 下载Hive

+ [下载地址](https://dlfastly.apache.org/hive/)

+ 钉钉群里分享的有:blush:

1. 创建目录/opt/hive

```shell
mkdir /opt/hive
cd /opt/hive
```

2. 使用XFTP链接linux系统,把hive的压缩包传输到Linux系统中

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220509/image.cyqhecn7obk.webp)

3. 解压hive目录

```shell
tar -zxvf apache-hive-2.3.9-bin.tar.gz
```

4. 解压后文件名字太复杂，配置环境变量时容易写错，重命名一下

```shell
mv apache-hive-2.3.9-bin hive-2.3.9
```

5. 将解压后的文件移动到/usr/local/

```shell
mv hive-2.3.9 /usr/local
```

### 下载MySQL的JDBC驱动包

+ [下载地址](https://downloads.mysql.com/archives/c-j/)
+ 钉钉群里分享的有:blush:

1. 新建目录

```shell
mkdir /opt/mysql-connector-java
cd /opt/mysql-connector-java
```

2. 使用XFTP传输到Linux系统

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220509/image.3t5ov4mzzq80.webp)

3. 解压驱动包,

```shell
tar -zxvf mysql-connector-java-5.1.48.tar.gz
```

4. 把mysql-connector-java-5.1.48下的 mysql-connector-java-5.1.48-bin.jar移动至/usr/local/hive-2.3.9/lib下

```shell
cd mysql-connector-java-5.1.48
mv mysql-connector-java-5.1.48-bin.jar /usr/local/hive-2.3.9/lib/
```

### 配置Hive

> 解压好的文件，bin目录放核心运行文件，也就是命令
>
> conf目录放核心配置文件
>
> lib目录放依赖的jar包

```shell
[root@master conf]# cd /usr/local/hive-2.3.9/conf/
[root@master conf]# ls
beeline-log4j2.properties.template  hive-exec-log4j2.properties.template  llap-cli-log4j2.properties.template
hive-default.xml.template           hive-log4j2.properties.template       llap-daemon-log4j2.properties.template
hive-env.sh.template                ivysettings.xml                       parquet-logging.properties
```

1. 配置文件hive-env.sh

> 备份一下

```shell
cp hive-env.sh.template hive-env.sh
```

```shell
vim hive-env.sh
```

+ 指定Hadoop安装路径

> 按Esc切换到一般模式,输入`:set nu`,显示行号

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220509/image.6wlpdoizcds0.webp)

指定你的hadoop、Hive安装路径

+ 配置文件hive-default.xml

```shell
cp hive-default.xml.template hive-default.xml
```

> hive-default.xml是Hive默认加载的文件

+ 配置文件hive-site.xml

```shell
vim hive-site.xml
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
	<property>
		 <name>javax.jdo.option.ConnectionURL</name>
    		<value>jdbc:mysql://localhost:3306/hive?createDatabaseIfNotExist=true&amp;useSSL=false</value>  <!-- 连接地址 中间的数据库名字不要写错 -->
	</property>
	<property>
		 <name>javax.jdo.option.ConnectionDriverName</name>
    		<value>com.mysql.jdbc.Driver</value>  <!-- 注册驱动类-->
	</property>
	<property>
		 <name>javax.jdo.option.ConnectionUserName</name>
    		<value>hive</value>  <!-- 连接用户名 -->
	</property>
	<property>
		 <name>javax.jdo.option.ConnectionPassword</name>
    		<value>12345678</value>  <!-- 连接用户密码 -->
	</property>
</configuration>
```

> 一次复制不上去，分几次复制

+ 配置Hive的环境变量

```shell
vim /etc/profile
```

```shell
# set hive environment
export HIVE_HOME=/usr/local/hive-2.3.9
export PATH=$HIVE_HOME/bin:$PATH
```

+ 使用命令**source /etc/profile**重新加载配置文件,使配置生效

```shell
source /etc/profile
```

+ 初始化元数据

```shell
cd /usr/local/hive-2.3.9/bin
```

```shell {14}

[root@master bin]# schematool -initSchema -dbType mysql
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/usr/local/hive-2.3.9/lib/log4j-slf4j-impl-2.6.2.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/opt/hadoop/hadoop-2.10.1/share/hadoop/common/lib/slf4j-log4j12-1.7.25.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [org.apache.logging.slf4j.Log4jLoggerFactory]
Metastore connection URL:        jdbc:mysql://localhost:3306/hive?createDatabaseIfNotExist=true&useSSL=false
Metastore Connection Driver :    com.mysql.jdbc.Driver
Metastore connection User:       hive
Starting metastore schema initialization to 2.3.0
Initialization script hive-schema-2.3.0.mysql.sql
Initialization script completed
schemaTool completed
```

### 验证Hive

> 开启从节点虚拟机

+ 主节点开启集群

```shell
start-dfs.sh
```

+ 主节点启动资源管理yarn

```shell
start-yarn.sh
```

+ 三台从节点远程登录master

```shell
ssh master
```

+ 全部启动hive

```shell
hive
```

+ 主节点查看关于java线程状态

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220509/image.1nkuvjhkfv0g.webp)









