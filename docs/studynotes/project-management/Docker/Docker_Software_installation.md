---
title: Docker 软件安装
date: 2022-09-20 00:26:13
permalink: /project-management/Docker/Docker_Software_installation
categories:
  - Docker
tags:
  - Docker
---
# Docker 软件安装

[[toc]]

## Tomcat安装使用

tomcat 版本网址：[https://registry.hub.docker.com/_/tomcat](https://registry.hub.docker.com/_/tomcat)

### 版本选择

tomcat 有很多的版本分支，一个版本可能有多个分支，如 `8-jre` 代表 Tomcat 8 内置 jre8 的版本、 `8-jdk8` 代表 Tomcat 8 内置 jdk8 的版本等等。所以根据需求进行版本选择。（jdk 包括了 jre，但是相对而言比较大）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220919/image.2ylgcekrxva0.webp)

### 安装修改

这里选择的是 `8.5.82-jre8-temurin-focal` 版本，先下载：

```sh
docker pull tomcat:8.5.82-jre8-temurin-jammy
```

下载的版本名太长，我们可以创建短的版本，然后删除掉长的版本

```sh
# 执行命令
[root@frx01 ~]# docker images

# 返回结果
REPOSITORY                                            TAG                         IMAGE ID            CREATED             SIZE
192.168.91.166:5000/zzyyubuntu                        1.2                         658125043530        4 days ago          112MB
registry.cn-shenzhen.aliyuncs.com/frx01/myubuntu1.3   1.3                         64df8ffb7faf        8 days ago          179MB
tomcat                                                8.5.82-jre8-temurin-jammy   0065fb7141cd        2 weeks ago         240MB
registry                                              latest                      b8604a3fe854        10 months ago       26.2MB
ubuntu                                                latest                      ba6acccedd29        11 months ago       72.8MB
centos                                                latest                      5d0da3dc9764        12 months ago       231MB
tomcat                                                8.5.27                      a92c139758db        4 years ago         558MB

# 新增短版本
[root@frx01 ~]# docker tag 0065fb7141cd tomcat:8.5.82

# 删除长版本
[root@frx01 ~]# docker rmi tomcat:8.5.82-jre8-temurin-jammy
Untagged: tomcat:8.5.82-jre8-temurin-jammy

# 查询查看镜像
[root@frx01 ~]# docker images tomcat
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
tomcat              8.5.82              0065fb7141cd        2 weeks ago         240MB
tomcat              8.5.27              a92c139758db        4 years ago         558MB
```

### 启动使用

Tomcat 的使用相比较其他还是非常简单的，Tomcat 启动后，进入容器的默认目录是 `/usr/local/tomcat`，这里提供几个启动命令：

- 命名后台启动

```sh
docker run -d --name tomcat01 -p 8080:8080 tomcat:8.5.82
```

+ webapps 启动：创建 webapps 的数据卷，在宿主机的挂载目录部署项目，就会同步到容器的 webapps 目录下

```sh
docker run -d --name tomcat01 -p 8080:8080 -v tomcat01-webapps:/usr/local/tomcat/webapps tomcat:8.5.82
```

+ 配置文件启动：创建配置文件的数据卷，在宿主机的挂载目录修改配置文件，就会同步到容器的配置文件中

```sh
docker run -d --name tomcat01 -p 8080:8080 -v tomcat01-webapps:/usr/local/tomcat/webapps -v tomcat01-conf:/usr/local/tomcat/conf tomcat:8.5.82
```

`tomcat01-webapps` 和 `tomcat01-conf` 根据需求创建数据卷名。

```sh
# 启动容器
docker run -d --name tomcat01 -p 8080:8080 -v tomcat01-webapps:/usr/local/tomcat/webapps tomcat:8.5.73

# 进入容器内部
docker exec -it tomcat01 bash
```

进入 webapps 目录，查看内容：

```sh
root@efc01854d5e1:/usr/local/tomcat# cd webapps
root@efc01854d5e1:/usr/local/tomcat/webapps# ls

#内容为空
```

会发现为空，这是因为 Tomcat 官方把所有的初始化文件放到了 webapps.dist 目录下，我们去看看：

```sh
root@efc01854d5e1:/usr/local/tomcat/webapps# cd ../webapps.dist/
root@efc01854d5e1:/usr/local/tomcat/webapps.dist# ls
# 返回结果
docs  examples  host-manager  manager  ROOT
```

所以我们需要把 webapps.dist 的内容拷贝到 webapps 目录中，为什么不删除 webapps 目录然后把 webapps.dist 重命名呢？因为容器运行期间无法删除文件，而不运行我们无法进入容器内部，所以只能一个一个拷贝过去

```sh
root@efc01854d5e1:/usr/local/tomcat/webapps.dist# cp -r docs/ ../webapps
root@efc01854d5e1:/usr/local/tomcat/webapps.dist# cp -r examples/ ../webapps
root@efc01854d5e1:/usr/local/tomcat/webapps.dist# cp -r host-manager/ ../webapps
root@efc01854d5e1:/usr/local/tomcat/webapps.dist# cp -r manager/ ../webapps
root@efc01854d5e1:/usr/local/tomcat/webapps.dist# cp -r ROOT/ ../webapps
```

此时我们进入默认目录 `/var/lib/docker/volumes/tomcat01-webapps/_data` 下查看拷贝的内容是否同步过来：

```sh
# 进入默认目录并查看内容
cd /var/lib/docker/volumes/tomcat01-webapps/_data
ls

# 返回结果
docs  examples  host-manager  manager  ROOT
```

虽然同步过来了，但是这样子会很累对吧，而且重新启动一个新的 Tomcat 容器，必须要重新执行 5 个拷贝操作，我们可以利用数据卷来同步数据。

### 挂载特性

可以利用数据卷特性：

- 默认目录挂载：
  - 当宿主机挂载目录已经存在时，双方挂载完成后，**宿主机挂载目录覆盖容器挂载目录**
  - 当宿主机挂载目录不存在时，双方挂载完成后，**容器挂载目录覆盖宿主机挂载目录**
- 具体目录挂载
  - 当宿主机挂载目录无论存不存在，双方挂载完成后，**宿主机挂载目录都会覆盖容器挂载目录**

所以我们有两种方式：

首先我们手动拷贝一份 tomcat01 的宿主机挂载目录，该目录已经将数据同步过来，目录有 webapps 的内容了

```sh
cd /var/lib/docker/volumes

# 拷贝一份 tomcat01 的宿主机挂载目录，新的目录名叫 tomcat02-webapps
cp -r tomcat01-webapps tomcat02-webapps
```

> **方式 1：默认目录挂载**

启动第二个 Tomcat 容器，利用 **默认目录挂载** 的第一个特性进行与容器的挂载

```sh
docker run -d --name tomcat02 -p 8081:8080 -v tomcat02-webapps:/usr/local/tomcat/webapps tomcat:8.5.73
```

```sh
# 进入 tomcat02 容器
docker exec -it tomcat02  bash

# 进入 webapps 目录，并查看内容
root@50edd2a86a8d:/usr/local/tomcat# cd webapps
root@50edd2a86a8d:/usr/local/tomcat/webapps# ls

# 返回结果
docs  examples  host-manager  manager  ROOT
```

说明同步成功。

> **方式 2：具体目录挂载**

启动第三个 Tomcat 容器，利用 **具体目录挂载** 方式进行与容器的挂载（缺点：指定到 _data 目录，因为该方式是从指定的目录覆盖容器的目录）

```sh
docker run -d --name tomcat03 -p 8082:8080 -v /var/lib/docker/volumes/tomcat02-webapps/_data:/usr/local/tomcat/webapps tomcat:8.5.73
```

进入容器看看，是否同步过来了

```sh
# 进入 tomcat03 容器
docker exec -it tomcat03 bash

# 进入 webapps 目录，并查看内容
root@ba7961226856:/usr/local/tomcat# cd webapps
root@ba7961226856:/usr/local/tomcat/webapps# ls

# 返回结果
docs  examples  host-manager  manager  ROOT
```

说明同步成功。

> **总结：**

推荐方式 1，因为方式 2 必须指定到 _data 目录，不灵活。而使用方式 1，必须先确保宿主机存在该目录，并且目录里有想要的内容。

Tomcat 也有配置文件，里面可以修改 8080 端口，上面的第三个启动命令就是给配置文件进行数据卷挂载，步骤和 webapps 的两个例子一样，这里不演示了。

值得注意的是：修改完配置文件的端口后，需要重新 run 一个新的 Tomcat 容器，然后该容器和宿主机修改后的配置文件目录挂载，才能真正实现端口的修改，因为第一次端口映射在 run 时是 8080:8080，无法修改为 8080:XXXX(修改的端口)，需要重新 run 才行，而 run 出来的配置文件默认端口还是 8080，所以需要利用数据卷特性，让宿主机的配置文件覆盖容器的 8080 端口配置文件。

### 相关指令

进入 Tomcat 容器

```sh
docker exec -it <容器名或 id> bash
```

查看 Tomcat 容器的日志

```sh
# 加 -f 代表实时监听日志动态
docker logs [-f] <容器名或 id>
```

## MySQL安装

MySQL 版本网址：[https://registry.hub.docker.com/_/mysql](https://registry.hub.docker.com/_/mysql)

### 安装启动

- 拉取镜像到本地

```sh
docker pull mysql:5.7
```

+ 简单运行 MySQL 服务，将需要挂载的目录拷贝出来

```sh
docker run -d --name mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7
```

密码自行修改。使用 3307 是因为宿主机可能已经安装了 MySQL，它占用了 3306 端口。

拷贝挂载的目录：

```sh
# 先创建挂载目录
mkdir -p /docker/mysql

# MySQL的相关文件同步到挂载目录
docker cp mysql:/var/lib/mysql /docker/mysql/data
docker cp mysql:/etc/mysql/conf.d /docker/mysql/conf
docker cp mysql:/var/log /docker/mysql/log
```

为什么要拷贝出来呢？因为一旦挂载成功，宿主机的挂载目录会覆盖容器的目录，所以我们确保宿主机的挂载目录不能为空，必须要有原来容器目录的文件。

+ 宿主机与容器实现挂载，保证数据安全，对应上方拷贝出来的目录

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"

::: tab 无注解版(可用)

```sh
docker run -d \
    --name mysql \
    --restart always \
    -p 3307:3306 \
    -e MYSQL_ROOT_PASSWORD=123456 \
    -v /docker/mysql/data:/var/lib/mysql \
    -v /docker/mysql/conf:/etc/mysql/conf.d \
    -v /docker/mysql/log:/var/log \
    mysql:5.7
```

:::

::: tab 有注解版(只看不用)

```sh
docker run -d \
    --name mysql \								# 容器名为 mysql
    --restart always \							# Docker 重启，容器也重启
    -p 3307:3306 \								# 将容器内部 3306 端口映射到 主机的 3306 端口
    -e MYSQL_ROOT_PASSWORD=123456 \				# 设置登陆密码为 123456，登陆用户为 root
    -v /docker/mysql/data:/var/lib/mysql \		# 将容器的「数据」挂载到主机的相应文件夹
    -v /docker/mysql/conf:/etc/mysql/conf.d \   # 将容器的「自定义配置文件夹」挂载到主机的相应文件夹
    -v /docker/mysql/log:/var/log \				# 将容器的「日志文件夹」挂载到主机的相应位置
    mysql:5.7
```

:::

::::

宿主机的挂载目录、conf.d 目录、data 数据目录、日志目录根据需求决定，包括密码。

这里说明一下：主配置文件名叫 my.cnf，位置在 `/etc/mysql`，但是不建议直接操作 my.cnf 主配置文件，官方也是如此，所以官方提供了 conf.d 目录，只要在 conf.d 目录下创建 xx.cnf 配置文件，那么该配置文件自动被引入 my.cnf 主配置文件，避免直接操作 my.cnf 引起安全问题。

my.cnf 文件里有这么一句代码：

```sh
includedir /etc/mysql/conf.d/
```

可以看出，my.cnf 会自动读取该目录下的所有 .cnf 配置文件。

::: tip 笔记

确保简单启动的密码和挂载启动的保持一致，因为启动后，密码保存在 `/var/lib/mysql` 目录下，而挂载的时候，宿主机的该目录会覆盖容器的目录，导致密码是简单启动的密码。所以确保两种启动方式密码保持一致。

:::

+ 配置 UTF-8 编码

进入宿主机的配置文件挂载目录：`/docker/mysql/conf`，有一个 mysql.cnf 配置文件，编辑它

```sh
cd /docker/mysql/conf
vim mysql.cnf
```

添加如下内容（如果文件有 `[mysql]`，必须先删除掉）：

```sh
[mysqld]
character-set-server=utf8
collation-server=utf8_general_ci

[client]
default-character-set=utf8
```

+ 进入 MySQL 容器，配置 UTF-8 编码

```sh
# 语法
docker exec -it 容器名 | 容器id bash

docker exec -it mysql bash
```

进入容器后，登录 MySQL

```sql
mysql -u root -p 123456
```

查看数据库的编码是否是 UTF-8

```sql
SHOW VARIABLES LIKE '%char%';
```

如图则代表配置成功：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220919/image.2fc62z4b02vw.webp)

+ 外部查看 MySQL 日志（可选）

```sh
docker logs 容器id | 容器名
```

### 其他命令

- 将 MySQL 数据库备份为 sql 文件
  - 导出全部数据库的数据为 sql 文件

```sh
docker exec 容器名 | 容器 id bash -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /opt/all-database.sql 
```

- 用户名要根据需求替换、`/opt/all-database` 是导出文件的路径，需要根据需求修改。密码不需要修改，它会自动获取登录的密码。
- 导出指定的数据库数据的 sql 文件

```sh
docker exec 容器名 | 容器 bash -c 'exec mysqldump --databases 库名 -uroot -p"$MYSQL_ROOT_PASSWORD"' > /opt/one-database.sql
```

+ 导出指定的数据库，但是不要数据

```sh
docker exec 容器名 | 容器 bash -c 'exec mysqldump --no-data --databases 库名 -uroot -p"$MYSQL_ROOT_PASSWORD"' > /opt/one-database.sql
```

+ 执行 sql 文件到 MySQL 中

```sh
docker exec 容器名 | 容器id bash -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /opt/xxx.sql
```

`/opt/xxx.sql` 是 sql 文件的路径。

## Redis安装

### 安装

Redis 版本网址：[https://registry.hub.docker.com/_/redis](https://registry.hub.docker.com/_/redis)

Redis 的安装还是比较简单的，这里安装 6.62 版本

```sh
docker pull redis:6.2.6

# 查看 docker 容器
docker images
```

### 启动

Redis 启动后，进入容器的默认目录是 `/data`

启动指令：

- 简单的启动，也是最快速的个人使用启动：

```sh
docker run -d --name redis -p 6379:6379 redis:6.2.6
```

+ AOP 持久化启动

  指定持久化的 .aop 文件路径，宿主机的文件路径根据需求存放，容器的文件路径默认在 `/data`

```sh
docker run -d --name redis -p 6379:6379 -v redis_data:/data redis:6.2.6 redis-server --appendonly yes
```

容器的 `/data` 是 AOP 文件的默认路径，`redis_data` 根据需求修改，是宿主机的挂载目录，而 `redis-server --appendonly yes` 是必须的，这个命令会覆盖默认的命令，默认的命令是关闭持久化。

+ 自定义配置文件启动：指定配置文件的路径和容器的 `/usr/local/etc/redis` 挂载，一旦挂载后，容器的该目录获得配置文件，然后通过 `redis-server /usr/local/etc/redis/redis.conf` 启动该配置文件 

```sh
docker run -d --name redis -p 6379:6379 -v /opt/redis.conf:/usr/local/etc/redis/redis.conf -d redis:6.2.6 redis-server /usr/local/etc/redis/redis.conf
```

`/opt/redis_conf` 是在宿主机的配置文件路径，根据需求修改。

> **注意：Redis 容器内没有 redis.conf 文件，启动的配置信息都是默认的。我们需要自己准备好一份 redis.conf 文件，然后通过数据卷传进容器内**

如何准备一份 redis.conf 文件呢？

- 去官网下载对应的 Windows 版本，然后拷贝 redis.conf 到 Linux 下，再启动配置，这样很麻烦对吧

- 直接 Linux 下创建一个 redis.conf 文件，虽然不如原生的全面，但是我们只需要加入自己的一些配置即可，其他配置 Redis 自动使用默认的

  比如：

```sh
# 根据需求指定创建路径
cd /opt
vim redis.conf

# 在 redis.conf 加入如下内容
# 限制能访问 redis 的地址，根据需求修改
bind 0.0.0.0

# 默认是 yes，开启保护模式
protected-mode no

# 配置 redis 连接密码，可选
requirepass 123456

# 以守护进程方式启动，可后台启动
daemonize no

# 更改本地 redis 数据库存放文件夹（可选）
dir ./

# AOP 持久化
appendonly yes
```

+ redis.conf常用配置

> - bind 0.0.0
>
>   限制 redis 只能本地访问，根据需求修改
>
> - protected-mode no
>
>   默认是 yes，开启保护模式，限制为本地访问
>
> - requirepass 123456
>
>   配置redis连接密码，默认是注释的
>
> - daemonize no
>
>   默认 no，改为 yes 代表以守护进程方式启动，可后台运行，除非kill进程（可选），改为 yes 会使配置文件方式启动 redis 失败
>
> - dir ./
>
>   更改本地 redis 数据库存放文件夹（可选）
>
> - appendonly yes
>
>   redis 持久化（开启了这个，redis 就不会每次重启时自动清空了）

如果不加入 `appendonly yes`，可以利用 AOP 持久化启动来指定 `appendonly yes` 启动。

### 其他

启动后进入 redis 容器

```sh
docker exec -it redis bash
```

查看 redis 的日志

```sh
# 加 -f 代表实时监听日志动态
docker logs [-f] redis
```

输入 `redis-cli` 连接 redis，如果是连接其他服务器的 redis，则需要加参数

```sh
redis-cli -h IP地址 -p 6379
```

## ElasticSearch安装

### 安装

ElasticSearch 版本网址：[https://registry.hub.docker.com/_/elasticsearch](https://registry.hub.docker.com/_/elasticsearch)

这里下载的版本是 7.14.2

```sh
docker pull elasticsearch:7.14.2
```

### 配置

如果启动报错

```sh
max virtual memory areas vm.max_map_count [65530] is too low，increase to at least [262144]
```

则需要进行配置，没有出现错误可以跳过

```sh
# 修改配置 sysctl.conf
vim /etc/stsctl.conf

# 加入配置信息
vm.max_map_count=262144

# 启用配置
sysctl -p
```

### 启动

三种启动方式：

- 简单启动

```sh
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 elasticsearch:7.14.2
```

如果报错，请看 [配置](/project-management/Docker/Docker_Software_installation#配置) 进行解决

浏览器访问的是 9200 端口

+ 持久化和配置文件启动

ES 中所有的数据都在容器中的 `/usr/share/elasticsearch/data` 目录，配置文件在 `/usr/share/elasticsearch/config`，所以需要挂载出来

```sh
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -v es_data:/usr/share/elasticsearch/data -v es_config:/usr/share/elasticsearch/config elasticsearch:7.14.2
```

挂载成功后，哪怕容器被删除了，数据还是会存在宿主机的 `/.../es_data` 目录下

- ik 分词器启动

> **方式 1：**


 首先下载好 ik 分词器，版本要和 ES 版本一致，放到 Linux 系统中，我们知道，ES 的插件目录是 `/usr/share/elasticsearch/plugins` 下，所以需要挂载出来

```sh
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -v es_data:/usr/share/elasticsearch/data -v es_config:/usr/share/elasticsearch/config -v es_plugins:/usr/share/elasticsearch/plugins elasticsearch:7.14.2
```

此时的 `es_plugins` 目录下为空，我们把下载好的 ik 分词器放到该目录下，然后重启 ES 即可

```sh
cp <ik 分词器> /var/lib/docker/volumes/es_plugins/_data

# 重启 es
docker restart elasticsearch
```

> **方式 2：**

先创建数据卷，把 ik 分词器放到数据卷里

```sh
docker volume create es_plugins

cp <ik 分词器> /var/lib/docker/volumes/es_plugins/_data
```

再启动容器进行挂载

```sh
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -v es_data:/usr/share/elasticsearch/data -v es_config:/usr/share/elasticsearch/config -v es_plugins:/usr/share/elasticsearch/plugins elasticsearch:7.14.2
```

## Kibana安装

Kibana 版本网址：[https://registry.hub.docker.com/_/kibana](https://registry.hub.docker.com/_/kibana)

下载 Kibaba 镜像，版本要和 ElasticSearch 一致。

```sh
docker pull kibana:7.14.2
```

启动

- 简单启动

  此时没有指定连接 ES

```sh
docker run -d --name kibana -p 5601:5601 kibaba:7.14.2
```

+ 连接 ES 启动

```sh
docker run -d --name kibana -p 5601:5601 -e ELASTICSEARCH_URL=http://IP地址:9200 kibaba:7.14.2
```

+ 先简单启动，后在配置文件再连接 ES，重启生效

首先知道配置文件的路径是 `/usr/share/kibana/config`，将它挂载出来

```sh
docker run -d --name kibana -p 5601:5601 -v kibana_conf:/usr/share/kibana/config kibana:7.14.2
```

启动后进入宿主机的 kibana_conf 目录或者 容器的 `/usr/share/kibana/config` 目录，这里演示前者

```sh
cd /var/lib/docker/volumes/kibana_conf/_data

vim kibana.yml
```

修改为 ES 的 IP 地址

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220919/image.4uzub0kmmoi0.webp)