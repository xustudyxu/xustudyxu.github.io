---
title: Nginx 缓存集成
date: 2022-08-05 16:02:32
permalink: /middleware/Nginx/Nginx_Cache_integration
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 缓存集成

[[toc]]

## 缓存的概念

缓存就是数据交换的缓冲区（称作：Cache），当用户要获取数据的时候，会先从缓存中去查询获取数据，如果缓存中有就会直接返回给用户，如果缓存中没有，则会发请求从服务器重新查询数据，将数据返回给用户的同时将数据放入缓存，下次用户就会直接从缓存中获取数据。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220805/image.371wkgon7280.webp)

缓存其实在很多场景中都有用到，比如：

| 场景             | 作用                     |
| ---------------- | ------------------------ |
| 操作系统磁盘缓存 | 减少磁盘机械操作         |
| 数据库缓存       | 减少文件系统的IO操作     |
| 应用程序缓存     | 减少对数据库的查询       |
| Web 服务器缓存   | 减少对应用服务器请求次数 |
| 浏览器缓存       | 减少与后台的交互次数     |

缓存的优点

- 减少数据传输，节省网络流量，加快响应速度，提升用户体验
- 减轻服务器压力
- 提供服务端的高可用性

缓存的缺点

- 数据的不一致
- 增加成本

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220805/image.2itt4ge9erq0.webp)

在 [静态资源部署 - 缓存配置](/middleware/Nginx/Nginx_Static_resource_deployment/#静态资源缓存配置) 的时候，我们学习了如何在浏览器进行缓存，而本内容学习的是 Nginx。

Nginx 作为 Web 服务器，Nginx 作为 Web 缓存服务器，它介于客户端和应用服务器之间，当用户通过浏览器访问一个 URL 时，Web 缓存服务器会去应用服务器获取要展示给用户的内容，将内容缓存到自己的服务器上，当下一次请求到来时，如果访问的是同一个 URL，Web 缓存服务器就会直接将之前缓存的内容返回给客户端，而不是向应用服务器再次发送请求。Web 缓存降低了应用服务器、数据库的负载，减少了网络延迟，提高了用户访问的响应速度，增强了用户的体验。

## Web缓存服务

Nginx 是从 0.7.48 版开始提供缓存功能。Nginx 是基于 Proxy Store 来实现的，**其原理是把 URL 及相关组合当做 Key，在使用 MD5 算法对 Key 进行哈希化，得到硬盘上对应的哈希目录路径，从而将缓存内容保存在该目录中**。它可以支持任意 URL 连接，同时也支持 404/301/302 这样的非200 状态码。Nginx 即可以支持对指定 URL 或者状态码设置过期时间，也可以使用 purge 命令来手动清除指定 URL 的缓存。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220805/image.5rf186zoffg0.webp)

## 缓存设置相关指令

Nginx 的 Web 缓存服务主要是使用 `ngx_http_proxy_module` 模块相关指令集来完成，接下来我们把常用的指令来进行介绍下。

[ngx_http_proxy_module 文档地址](http://nginx.org/en/docs/http/ngx_http_proxy_module.html)

### proxy_cache_path

该指定用于设置缓存文件的存放路径。

| 语法                                                         | 默认值 | 位置 |
| ------------------------------------------------------------ | ------ | ---- |
| proxy_cache_path \<path> [levels=number]</br> \<keys_zone=zone_name:zone_size> \[inactive=time][max_size=size]; | —      | http |

`path`：缓存路径地址，如：

```sh
/usr/local/proxy_cache
```

`levels`: 指定该缓存空间 `path` 基础上新建的目录，最多可以设置 3 层，每层取 1 到 2 个字母作为目录名，格式为：

```nginx
levels=num:num:num   # 三个 num 代表三层，每层目录名分别取 num 个字母
levels=num:num       # 两个 num 代表两层，每层目录名分别取 num 个字母
levels=num           # 一个 num 代表一层，每层目录名分别取 num 个字母
```

如：

```nginx
levels=1:2   # 缓存空间有两层目录，第一层目录名取 1 个字母，第二层目录名取 2 个字母
```

字母名从 MD5 加密的值后面往前截取。

举例说明：

```nginx
# 假设 proxy_cache_key 为 kele，通过 MD5 加密以后的值为 27ce47ea65c1381dbe5175f7c77d8a3a
levels=1:2    # 最终的存储路径为 /usr/local/proxy_cache/a/a3，每层截取个数根据 1:2
levels=2:1:2  # 最终的存储路径为 /usr/local/proxy_cache/3a/a/d8，每层截取个数根据 2:1:2
levels=2:2:2  # 最终的存储路径为 /usr/local/proxy_cache/3a/8a/7d，每层截取个数根据 2:2:2
```

还不理解吗？存储路径在 `path` 目录基础上再创建新的目录，新的目录名从加密后的值的后面往前面截取。

`keys_zone`：用来为这个缓存区设置名称和指定大小，如：

```nginx
keys_zone=kele:200m  # 缓存区的名称是 kele，大小为 200M，1M 大概能存储 8000 个 keys
```

`inactive`：指定的时间内未访问的缓存数据会从缓存中删除，默认情况下，`inactive` 设置为 10 分钟。如：

```nginx
inactive=1d   # 缓存数据在 1 天内没有被访问就会被删除
```

`max_size`：设置最大缓存空间，如果缓存空间存满，默认会覆盖缓存时间最长的资源，默认单位为兆。如：

```nginx
max_size=20g    # 最大缓存空间为 20G
```

配置实例:

```nginx
http{
	proxy_cache_path /usr/local/proxy_cache keys_zone=kele:200m levels=1:2:1 inactive=1d max_size=20g;
}
```

此时重启 Nginx 配置文件，发现 `/usr/local` 目录里多出一个目录，名字叫做 proxy_cache。

### proxy_cache

该指令用来开启或关闭代理缓存，如果是开启则自定使用哪个缓存区来进行缓存。默认关闭。

| 语法                            | 默认值           | 位置                   |
| ------------------------------- | ---------------- | ---------------------- |
| proxy_cache <zone_name \| off>; | proxy_cache off; | http、server、location |

zone_name：指定使用缓存区的名称。

::: warning

缓存区的名称必须是 `proxy_cache_path` 里的 `keys_zone` 生成的缓存名。

:::

### proxy_cache_key

该指令用来设置 Web 缓存的 key 值，Nginx 会根据 key 值利用 MD5 计算处哈希值并缓存起来，作为缓存目录名的参考。

| 语法                    | 默认值                                          | 位置                   |
| ----------------------- | ----------------------------------------------- | ---------------------- |
| proxy_cache_key \<key>; | proxy_cache_key $scheme$proxy_host$request_uri; | http、server、location |

如 kele 由 MD5 计算出来是 27ce47ea65c1381dbe5175f7c77d8a3a

在哪计算出来的？ 前往 [MD5 在线加密网站](https://md5jiami.bmcx.com/)

### proxy_cache_valid

该指令用来对不同返回状态码的 URL 设置不同的缓存时间。

| 语法                                      | 默认值 | 位置                   |
| ----------------------------------------- | ------ | ---------------------- |
| proxy_cache_valid [code ...... ] \<time>; | —      | http、server、location |

如：

```nginx
proxy_cache_valid 200 302 10m; # 为 200 和 302 的响应 URL 设置 10 分钟缓存时间
proxy_cache_valid 404 1m;      # 为 404 的响应 URL 设置 1 分钟缓存时间
proxy_cache_valid any 1m;      # 对所有响应状态码的URL都设置 1 分钟缓存时间
```

### proxy_cache_min_uses

该指令用来设置资源被访问多少次后才会被缓存。默认是 1 次。

| 语法                            | 默认值                  | 位置                   |
| ------------------------------- | ----------------------- | ---------------------- |
| proxy_cache_min_uses \<number>; | proxy_cache_min_uses 1; | http、server、location |

### proxy_cache_methods

该指令是设置缓存哪些 HTTP 方法的请求资源。

| 语法                                       | 默认值                        | 位置                   |
| ------------------------------------------ | ----------------------------- | ---------------------- |
| proxy_cache_methods <GET \| HEAD \| POST>; | proxy_cache_methods GET HEAD; | http、server、location |

默认缓存 HTTP 的 GET 和 HEAD 方法的请求资源，不缓存 POST 方法的请求资源。

## 缓存设置案例

### 需求分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220805/image.4ye8ddxwbng0.webp)

### 步骤实现

**应用服务器的环境准备**

1. 在 `192.168.200.146` 服务器 A 上的 tomcat 的 webapps 下面添加一个 js 目录，并在 js 目录中添加一个 jquery.js 文件

2. 启动 tomcat

```sh
cd /usr/local/tomcat/bin
./startup.sh
```

3. 访问服务器 A 进行测试

```http
http://192.168.200.146:8080/js/jquery.js
```

**Nginx 的环境准备**

1. 准备服务器 B 完成 Nginx 的反向代理配置

```nginx
http{
	upstream backend{
		server 192.168.200.146:8080;   # 服务器 A 地址
	}
	server {
		listen       8080;
        server_name  localhost;
        location / {
        	proxy_pass http://backend/js/;
        }
	}
}
```

2. 完成 Nginx 缓存配置

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"

::: tab 有注释版

```nginx
http{
    proxy_cache_path /usr/local/proxy_cache levels=2:1 keys_zone=bing:200m inactive=1d max_size=20g;
    upstream backend{
        server 192.168.200.146:8080;   # 服务器 A 的地址
    }
    server {
        listen       8080;     			# 监听 8080 端口
        server_name  localhost; 		# 监听 localhost 的IP
        location / {					# 监听包含 / 的请求
            proxy_cache bing;    		# 开启 bing 缓存区，和第 2 行的 keys_zone 对应
            proxy_cache_key kele;  		# 缓存的 key 值，会被 MD5 解析成字符串用于生成缓存的目录
            proxy_cache_min_uses 5; 	# 资源被访问 5 次后才会被缓存
            proxy_cache_valid 200 5d;	# 为 200 响应 URL 设置 5 天缓存时间
            proxy_cache_valid 404 30s;  # 为 404 的响应 URL 设置 30 秒缓存时间
            proxy_cache_valid any 1m;	# 为除了上方的任意响应 URL 设置 1 分钟缓存时间
            add_header nginx-cache "$upstream_cache_status";  # 将缓存的状态放到请求头里
            proxy_pass http://backend/js/;  # 代理 backend，将 /js/ 追加到 backend 模块里的地址后面
        }
    }
}
```

:::

::: tab 无注释版

```nginx
http{
    proxy_cache_path /usr/local/proxy_cache levels=2:1 keys_zone=bing:200m inactive=1d max_size=20g;
    upstream backend{
        server 192.168.200.146:8080;
    }
    server {
        listen       8080;
        server_name  localhost;
        location / {
            proxy_cache bing;
            proxy_cache_key kele;
            proxy_cache_min_uses 5;
            proxy_cache_valid 200 5d;
            proxy_cache_valid 404 30s;
            proxy_cache_valid any 1m;
            add_header nginx-cache "$upstream_cache_status";
            proxy_pass http://backend/js/;
        }
    }
}
```

:::

::::

3. 测试是否缓存成功

利用 `$upstream_cache_status` 的值在控制台(F12)查看是否缓存。

第一次访问 `192.168.200.113:8080/jquery.js`，如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220805/image.3p1azxp6cdy0.webp)

因为第一次访问时，正在缓存，所以返回的请求头 MISS 是没有缓存成功。

第二次访问 `192.168.200.113:8080/jquery.js`，如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220805/image.73w7kaxo8r00.webp)

HIT 代表成功缓存。

4. 测试 404 缓存时间

测试 404 缓存时间，我们访问 `192.168.200.113:8080/jquery.js111`，它会返回 404 页面，并缓存 404 页面，当我们立即访问正确的 `192.168.200.113:8080/jquery.js`，它依然返回 404 页面，因为 `/jquery.js` 请求目前被缓存为 404，还没到 30 秒过期，等 30 秒后再访问，就成功了。

## 缓存的删除

这里介绍两种方式：

- 删除对应的缓存目录
- 使用第三方扩展模块

### 删除缓存目录

假设缓存目录是 `/usr/local/proxy_cache/`

```sh
rm -rf /usr/local/proxy_cache/......
```

如果想删除某个缓存目录，就在后面加上目录名。如果想删除整个缓存目录，直接删除 `/usr/local/proxy_cache/` 即可。

### ngx_cache_purge删除

使用第三方扩展模块 `ngx_cache_purge` 进行删除缓存。

1. 下载 `ngx_cache_purge` 模块对应的资源包，并上传到服务器的 `/root/nginx/module/` 目录下。

   这里的资源包是 ngx_cache_purge-2.3.tar.gz

2. 对资源文件进行解压缩

```sh
tar -zxf ngx_cache_purge-2.3.tar.gz
```

3. 修改文件夹名称为 `purge`，方便后期配置

```sh
mv ngx_cache_purge-2.3 purge
```

4. 查询 Nginx 的配置参数 `configure arguments`，并拷贝出来

```sh
nginx -V
```

5. 进入 Nginx 的安装包目录，使用 ./configure 进行参数配置，记得加上 `nginx -V` 查询出来的 `configure arguments` 参数

```sh
./configure --add-module=/root/nginx/module/purge  # 加上之前的 configure arguments 参数
```

6. 使用 make 进行编译

```sh
make
```

7. 将 Nginx 安装目录的 nginx 二级制可执行文件备份

```sh
mv /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.backup
```

8. 将编译后的 objs 中的 nginx 拷贝到 nginx 的 sbin 目录下

```sh
cp objs/nginx /usr/local/nginx/sbin
```

9. 使用 `make upgrade` 进行升级，记得在安装包目录下执行

```sh
cd /opt/nginx/core/nginx-1.20.2

make upgrade
```

10. 在 Nginx 配置文件中进行如下配置

```nginx
server{
    location ~/purge(/.*) {
        proxy_cache_purge bing kele;
    }
}
```

`proxy_cache_purge` 指令

| 语法                              | 默认值 | 位置                   |
| --------------------------------- | ------ | ---------------------- |
| proxy_cache_purge \<cache> \<key> | -      | http、server、location |

- `cache` 是 `proxy_cache`，详细内容看 [proxy_cache](https://notes.youngkbt.cn/nginx/cache-integration/#proxy-cache)
- `key` 是 `proxy_cache_key`，详细内容看 [proxy_cache_key](https://notes.youngkbt.cn/nginx/cache-integration/#proxy-cache-key)

## 资源不缓存

前面咱们已经完成了 Nginx 作为 Web 缓存服务器的使用。但是我们得思考一个问题，**不是所有的数据都适合进行缓存**。比如说对于一些经常发生变化的数据。如果进行缓存的话，就很容易出现用户访问到的数据不是服务器真实的数据。所以对于这些资源我们在缓存的过程中就需要进行过滤，不进行缓存。

Nginx 也提供了这块的功能设置，需要使用到如下两个指令：

- proxy_no_cache
- proxy_cache_bypass

### proxy_no_cache

该指令是用来定义不将数据进行缓存的条件，也就是不缓存指定的数据。

| 语法                              | 默认值 | 位置                   |
| --------------------------------- | ------ | ---------------------- |
| proxy_no_cache \<string> ...... ; | —      | http、server、location |

可设置多个 string。

配置实例：

```nginx
proxy_no_cache $cookie_nocache $arg_nocache $arg_comment;
```

### proxy_cache_bypass

该指令是用来设置不从缓存中获取数据的条件，也就是虽然缓存了指定的资源，但请求过来也不会去获取它，而是去服务器里获取资源。

| 语法                                  | 默认值 | 位置                   |
| ------------------------------------- | ------ | ---------------------- |
| proxy_cache_bypass \<string> ...... ; | —      | http、server、location |

可设置多个 string。

配置实例：

```nginx
proxy_cache_bypass $cookie_nocache $arg_nocache $arg_comment;
```

上述两个指令都有一个指定的条件，这个条件可以是多个，**并且多个条件中至少有一个不为空且不等于「0」，则条件满足成立。**

上面给的配置实例是从官方网站获取的，里面使用到了三个变量，分别是 `$cookie_nocache`、`$arg_nocache`、`$arg_comment`

### 常用不缓存变量

常用不缓存的三个变量分别为：

- `$cookie_nocache`
- `$arg_nocache`
- `$arg_comment`

这三个变量分别代表的含义是:

- `$cookie_nocache`：指的是当前请求的 cookie 中 key 为 nocache 的 value 值
- `$arg_nocache` 和 `$arg_comment`：指的是当前请求的参数中属性名为 nocache 和 comment 对应的属性值

案例演示:

```nginx
log_format params $cookie_nocache | $arg_nocache | $arg_comment；
server {
    listen	8081;
    server_name localhost;
    location / {
        access_log logs/access_params.log params;
        add_header Set-Cookie 'nocache=888';
        root html;
        index index.html;
    }
}
```

访问 `192.168.200.133:8081?nocache=999&comment=777`，然后去日志查看结果，如图所示：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220805/image.695kmtpob840.webp)

以后访问的某一个资源如果不想缓存，在 URL 后面加入三个变量中的任意一个或多个即可，只要它们不为空或 0。

::: warning

这三个变量推荐作为不缓存资源的条件，但并不是只能作为不缓存资源的条件。

:::

### 案例模板

设置不缓存资源的配置方案模板：

- 如果访问的是 js 文件，则不会缓存该 js 文件
- 如果 `$nocache` `$cookie_nocache` `$arg_nocache` `$arg_comment` 任意不为空或 0，则访问的资源不进行缓存

```nginx
server {
    listen	8080;
    server_name localhost;
    location / {
        if ($request_uri ~ /.*\.js$){
            set $nocache 1;
        }
        proxy_no_cache $nocache $cookie_nocache $arg_nocache $arg_comment;
        proxy_cache_bypass $nocache $cookie_nocache $arg_nocache $arg_comment;
    }
}
```

为什么不会缓存 js 文件呢，看第 5 - 6 行代码。如果访问的文件是 js 文件，则设置 `$nocache` 为 1，只要它不为 0，则触发第 8 行代码，`proxy_no_cache` 后面的参数只要有一个不为空或 0，则访问的资源不进行缓存。