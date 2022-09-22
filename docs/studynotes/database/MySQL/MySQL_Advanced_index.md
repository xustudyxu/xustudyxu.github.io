# MySQL 索引

[[toc]]

## 在Linux系统上安装MySQL8.0

1. 准备一台Linux服务器

Linux的版本为CentOS7

2. 下载Linux版MySQL安装包

+ [地址](https://downloads.mysql.com/archives/community/)

![image-20211031230239760](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image-20211031230239760.4lltc4efppk0.webp)

3. 下载完成后，上传MySQL安装包

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.7b1siexp8yw0.webp)

4. 加压tar文件

```sh
cd /opt/mysql8.0
mkdir mysql
tar -xvf mysql-8.0.26-1.el7.x86_64.rpm-bundle.tar -C ./mysql
```

5. 安装mysql的安装包

```sh
cd mysql

rpm -ivh mysql-community-common-8.0.26-1.el7.x86_64.rpm 

rpm -ivh mysql-community-client-plugins-8.0.26-1.el7.x86_64.rpm 

rpm -ivh mysql-community-libs-8.0.26-1.el7.x86_64.rpm 

rpm -ivh mysql-community-libs-compat-8.0.26-1.el7.x86_64.rpm

yum install openssl-devel

rpm -ivh  mysql-community-devel-8.0.26-1.el7.x86_64.rpm

rpm -ivh mysql-community-client-8.0.26-1.el7.x86_64.rpm

rpm -ivh  mysql-community-server-8.0.26-1.el7.x86_64.rpm
```

> 如果执行报依赖检测失败，在命令后面加` --nodeps --force`

6. MySQL服务

+ 启动

```sh
systemctl start mysqld
```

+ 重启

```sh
systemctl restart mysqld
```

+ 关闭

```sh
systemctl stop mysqld
```

7. 查询自动生成的root用户密码

```sh
grep 'temporary password' /var/log/mysqld.log
```

```sh
mysql -u root -p
```

> 输入密码

8. 修改root用户密码

登录到MySQL之后，需要将自动生成的不便记忆的密码修改了，修改成自己熟悉的便于记忆的密码。

```sh
ALTER  USER  'root'@'localhost'  IDENTIFIED BY '123456';
```

执行上述的SQL会报错，原因是因为设置的密码太简单，密码复杂度不够。我们可以设置密码的复杂度为简单类型，密码长度为6。

```sh
set global validate_password.policy = 0;
set global validate_password.length = 6;
```

降低密码的校验规则之后，再次执行上述修改密码的指令。

9. 创建用户

默认的root用户只能当前节点localhost访问，是无法远程访问的，我们还需要创建一个root账户，用户远程访问

```sh
create user 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```

10. 并给root用户分配权限

```sh
grant all on *.* to 'root'@'%';
```

11. 重新连接MySQL

```sh
mysql -u root -p
```

> 输入密码，登录成功

12. 使用Navicat远程连接MySQL

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.5trm4of7da80.webp)

## 索引介绍

索引（index）是帮助MySQL**高效获取数据**的**数据结构**(**有序**)。在数据之外，数据库系统还维护着满足
特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据， 这样就可以在这些数据结构
上实现高级查找算法，这种数据结构就是索引。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.4ceabfxp7o20.webp)

优缺点：

优点：

- 提高数据检索效率，降低数据库的IO成本
- 通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗

缺点：

- 索引列也是要占用空间的
- 索引大大提高了查询效率，但降低了更新的速度，比如 INSERT、UPDATE、DELETE

## 索引结构

| 索引结构                      | 描述                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| <font color=red>B+Tree</font> | <font color=red>最常见的索引类型，大部分引擎都支持B+树索引</font> |
| Hash                          | 底层数据结构是用哈希表实现，只有精确匹配索引列的查询才有效，不支持范围查询 |
| R-Tree(空间索引)              | 空间索引是 MyISAM 引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少 |
| Full-Text(全文索引)           | 是一种通过建立倒排索引，快速匹配文档的方式，类似于 Lucene, Solr, ES |

+ 上述是MySQL中所支持的所有的索引结构，接下来，我们再来看看不同的存储引擎对于索引结构的支持
  情况。

| 索引       | InnoDB          | MyISAM | Memory |
| :--------- | :-------------- | :----- | :----- |
| B+Tree索引 | 支持            | 支持   | 支持   |
| Hash索引   | 不支持          | 不支持 | 支持   |
| R-Tree索引 | 不支持          | 支持   | 不支持 |
| Full-text  | 5.6版本之后支持 | 支持   | 不支持 |

> 注意： 我们平常所说的索引，如果没有特别指明，都是指B+树结构组织的索引。

### 二叉树

假如说MySQL的索引结构采用二叉树的数据结构，比较理想的结构如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.2x5ygpv62bc0.webp)

如果主键是顺序插入的，则会形成一个单向链表，结构如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.11jj75v1pmvk.webp)

所以，如果选择二叉树作为索引结构，会存在以下缺点：

+ 顺序插入时，会形成一个链表，查询性能大大降低。
+ 大数据量情况下，层级较深，检索速度慢。

此时大家可能会想到，我们可以选择红黑树，红黑树是一颗自平衡二叉树，那这样即使是顺序插入数据，最终形成的数据结构也是一颗平衡的二叉树,结构如下:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.3gnt45t33c80.webp)

但是，即使如此，由于红黑树也是一颗二叉树，所以也会存在一个缺点：

+ 大数据量情况下，层级较深，检索速度慢。

所以，在MySQL的索引结构中，并没有选择二叉树或者红黑树，而选择的是B+Tree，那么什么是B+Tree呢？在详解B+Tree之前，先来介绍一个B-Tree。

### B-Tree

B-Tree，B树是一种**多路**衡查找树，相对于二叉树，B树每个节点可以有多个分支，即多叉。以一颗最大度数（max-degree）为5(5阶)的b-tree为例，那这个B树每个节点最多存储4个key，5个指针：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.502an5672xg0.webp)

> 树的度数指的是一个节点的子节点个数。

我们可以通过一个数据结构可视化的网站来简单演示一下。[B-Tree Visualization (usfca.edu)](https://www.cs.usfca.edu/~galles/visualization/BTree.html)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.3ejefb0tmlk0.webp)

插入一组数据： 100 65 169 368 900 556 780 35 215 1200 234 888 158 90 1000 88
120 268 250 。然后观察一些数据插入过程中，节点的变化情况。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220922/image.57f9fwicq8c0.webp)

特点：

+ 5阶的B树，每一个节点最多存储4个key，对应5个指针。
+ 一旦节点存储的key数量到达5，就会裂变，中间元素向上分裂。
+ 在B树中，非叶子节点和叶子节点都会存放数据。

