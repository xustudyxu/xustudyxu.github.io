(window.webpackJsonp=window.webpackJsonp||[]).push([[284],{633:function(s,a,t){"use strict";t.r(a);var e=t(10),n=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"redis-概述安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis-概述安装"}},[s._v("#")]),s._v(" Redis 概述安装")]),s._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#应用场景"}},[s._v("应用场景")]),a("ul",[a("li",[a("a",{attrs:{href:"#配合关系型数据库做高速缓存"}},[s._v("配合关系型数据库做高速缓存")])]),a("li",[a("a",{attrs:{href:"#多样的数据结构存储持久化数据"}},[s._v("多样的数据结构存储持久化数据")])])])]),a("li",[a("a",{attrs:{href:"#redis-安装"}},[s._v("Redis 安装")]),a("ul",[a("li",[a("a",{attrs:{href:"#安装版本"}},[s._v("安装版本")])]),a("li",[a("a",{attrs:{href:"#安装步骤"}},[s._v("安装步骤")])]),a("li",[a("a",{attrs:{href:"#后台启动-推荐"}},[s._v("后台启动(推荐)")])]),a("li",[a("a",{attrs:{href:"#前台启动"}},[s._v("前台启动")])])])]),a("li",[a("a",{attrs:{href:"#redis介绍相关知识"}},[s._v("Redis介绍相关知识")])])])]),a("p"),s._v(" "),a("ul",[a("li",[s._v("Redis是一个"),a("code",[s._v("开源")]),s._v("的"),a("code",[s._v("key-value")]),s._v("存储系统。")]),s._v(" "),a("li",[s._v("和Memcached类似，它支持存储的value类型相对更多，包括"),a("code",[s._v("string")]),s._v("(字符串)、"),a("code",[s._v("list")]),s._v("(链表)、"),a("code",[s._v("set")]),s._v("(集合)、"),a("code",[s._v("zset")]),s._v("(sorted set --有序集合)和"),a("code",[s._v("hash")]),s._v("（哈希类型）。")]),s._v(" "),a("li",[s._v("这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是"),a("code",[s._v("原子性")]),s._v("的。")]),s._v(" "),a("li",[s._v("在此基础上，Redis支持各种不同方式的"),a("code",[s._v("排序")]),s._v("。")]),s._v(" "),a("li",[s._v("与memcached一样，为了保证效率，数据都是"),a("code",[s._v("缓存在内存")]),s._v("中。")]),s._v(" "),a("li",[s._v("区别的是Redis会"),a("code",[s._v("周期性")]),s._v("的把更新的"),a("code",[s._v("数据写入磁盘")]),s._v("或者把修改操作写入追加的记录文件。")]),s._v(" "),a("li",[s._v("并且在此基础上实现了"),a("code",[s._v("master-slave(主从)")]),s._v("同步。")])]),s._v(" "),a("h2",{attrs:{id:"应用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[s._v("#")]),s._v(" 应用场景")]),s._v(" "),a("h3",{attrs:{id:"配合关系型数据库做高速缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配合关系型数据库做高速缓存"}},[s._v("#")]),s._v(" 配合关系型数据库做高速缓存")]),s._v(" "),a("ul",[a("li",[s._v("高频次，热门访问的数据，降低数据库IO")]),s._v(" "),a("li",[s._v("分布式架构，做session共享")])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220610/image.vf65bnc1ctc.jpg",alt:"image"}})]),s._v(" "),a("h3",{attrs:{id:"多样的数据结构存储持久化数据"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多样的数据结构存储持久化数据"}},[s._v("#")]),s._v(" "),a("strong",[s._v("多样的数据结构存储持久化数据")])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220610/image.1i2uh69ynf9c.jpg",alt:"image"}})]),s._v(" "),a("h2",{attrs:{id:"redis-安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis-安装"}},[s._v("#")]),s._v(" Redis 安装")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://redis.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Redis官方网站"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"http://redis.cn/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Redis中文官方网站"),a("OutboundLink")],1)])]),s._v(" "),a("h3",{attrs:{id:"安装版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装版本"}},[s._v("#")]),s._v(" 安装版本")]),s._v(" "),a("p",[s._v("for Linux("),a("code",[s._v("redis-6.2.1.tar.gz")]),s._v(")")]),s._v(" "),a("p",[s._v("不用考虑在windows环境下对Redis的支持")]),s._v(" "),a("h3",{attrs:{id:"安装步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装步骤"}},[s._v("#")]),s._v(" 安装步骤")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("准备工作:下载安装最新版的gcc编译器")])]),s._v(" "),a("li",[a("p",[s._v("使用XFTP工具将redis压缩包上传到Linux系统中")])])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /opt/redis\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220610/image.3bkgvfqxogy0.jpg",alt:"image"}})]),s._v(" "),a("ul",[a("li",[s._v("安装C 语言的编译环境")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("yum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" centos-release-scl scl-utils-build\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("yum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-y")]),s._v(" devtoolset-8-toolchain\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("scl "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" devtoolset-8 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ul",[a("li",[s._v("测试gcc版本"),a("code",[s._v("gcc --version")])])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gcc --version")]),s._v("\ngcc "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("GCC"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.3")]),s._v(".1 "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("20190311")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Red Hat "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.3")]),s._v(".1-3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nCopyright "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("C"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2018")]),s._v(" Free Software Foundation, Inc.\nThis is "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("free")]),s._v(" software"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" see the "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" copying conditions.  There is NO\nwarranty"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" not even "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("ul",[a("li",[s._v("解压文件")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /opt/redis\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-zxvf")]),s._v(" redis-6.2.1.tar.gz\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("ul",[a("li",[s._v("解压完进入目录")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cd redis-6.2.1/")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis-6.2.1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ls")]),s._v("\n00-RELEASENOTES  CONDUCT       COPYING  INSTALL   MANIFESTO  redis.conf  runtest-cluster    runtest-sentinel  src    TLS.md\nBUGS             CONTRIBUTING  deps     Makefile  README.md  runtest     runtest-moduleapi  sentinel.conf     tests  utils\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("ul",[a("li",[s._v("在redis-6.2.1目录下再次执行make命令")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis-6.2.1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# make")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" src "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" all\nmake"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(": 进入目录“/opt/redis/redis-6.2.1/src”\n    CC Makefile.dep\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-rf")]),s._v(" redis-server redis-sentinel redis-cli redis-benchmark redis-check-rdb redis-check-aof *.o *.gcda *.gcno *.gcov redis.info lcov-html Makefile.dep dict-benchmark\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("ul",[a("li",[s._v("执行make install")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis-6.2.1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# make install")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" src "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\nmake"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(": 进入目录“/opt/redis/redis-6.2.1/src”\n    CC Makefile.dep\n\nHint: It"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'s a good idea to run '")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" test' "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    INSTALL "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n    INSTALL "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n    INSTALL "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\nmake"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(": 离开目录“/opt/redis/redis-6.2.1/src”\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("ul",[a("li",[s._v("切换到/usr/local/bin，并查看")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br")]),a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis-6.2.1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cd /usr/local/bin")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master bin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ls")]),s._v("\nredis-benchmark  redis-check-aof  redis-check-rdb  redis-cli  redis-sentinel  redis-server\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"后台启动-推荐"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#后台启动-推荐"}},[s._v("#")]),s._v(" 后台启动(推荐)")]),s._v(" "),a("ul",[a("li",[s._v("拷贝一份redis.conf到其它目录")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("div",{staticClass:"highlight-lines"},[a("div",{staticClass:"highlighted"},[s._v(" ")]),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br"),a("br"),a("div",{staticClass:"highlighted"},[s._v(" ")]),a("br")]),a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis-6.2.1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cd /opt/redis/redis-6.2.1/")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis-6.2.1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ls")]),s._v("\n00-RELEASENOTES  CONDUCT       COPYING  INSTALL   MANIFESTO  redis.conf  runtest-cluster    runtest-sentinel  src    TLS.md\nBUGS             CONTRIBUTING  deps     Makefile  README.md  runtest     runtest-moduleapi  sentinel.conf     tests  utils\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis-6.2.1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cp redis.conf /etc/redis.conf")]),s._v("\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("ul",[a("li",[s._v("修改etc目录下的redis.conff(247行)文件将里面的"),a("code",[s._v("daemonize no")]),s._v(" 改成 "),a("code",[s._v("daemonize yes")]),s._v("，让服务在后台启动")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master redis-6.2.1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cd /etc/")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master etc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vim redis.conf")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("ul",[a("li",[s._v("切换到/usr/local/bin,使用启动命令"),a("code",[s._v("redis-server /etc/redis.conf")])])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master etc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cd /usr/local/bin/")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master bin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# redis-server /etc/redis.conf")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("ul",[a("li",[s._v("查看关于redis线程状态")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master bin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ps -ef|grep redis")]),s._v("\nroot       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7174")]),s._v("      "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(":30 ?        00:00:00 redis-server "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:6379\nroot       "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7191")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2210")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(":32 pts/0    00:00:00 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--color")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("auto redis\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h4",{attrs:{id:"客户端访问redis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#客户端访问redis"}},[s._v("#")]),s._v(" 客户端访问redis")]),s._v(" "),a("ul",[a("li",[s._v("使用命令"),a("code",[s._v("redis-cli")]),s._v(",使用"),a("code",[s._v("ping")]),s._v("查看链接状态")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master bin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# redis-cli")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:637"),a("span",{pre:!0,attrs:{class:"token operator"}},[a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("9")]),s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ping")]),s._v("\nPONG\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("ul",[a("li",[s._v("关闭redis,使用命令"),a("code",[s._v("shutdown")])])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1:637"),a("span",{pre:!0,attrs:{class:"token operator"}},[a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("9")]),s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("shutdown")]),s._v("\nnot connected"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("blockquote",[a("p",[s._v("多实例关闭，指定端口关闭：redis-cli -p 6379 shutdown")]),s._v(" "),a("p",[s._v("也可以通过杀进程关闭kill -9 进程号")])]),s._v(" "),a("h3",{attrs:{id:"前台启动"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前台启动"}},[s._v("#")]),s._v(" 前台启动")]),s._v(" "),a("p",[s._v("使用命令"),a("code",[s._v("redis-server")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@master bin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# redis-server")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6970")]),s._v(":C "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" Jun "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2022")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(":19:08.451 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6970")]),s._v(":C "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" Jun "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2022")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(":19:08.451 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Redis version=6.2.1, bits=64, commit=00000000, modified=0, pid=6970, just started")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6970")]),s._v(":C "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" Jun "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2022")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(":19:08.451 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6970")]),s._v(":M "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" Jun "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2022")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(":19:08.451 * Increased maximum number of "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("open")]),s._v(" files to "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10032")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("it was originally "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" to "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(".\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6970")]),s._v(":M "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" Jun "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2022")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(":19:08.451 * monotonic clock: POSIX clock_gettime\n                _._\n           _.-`"),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("__ "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("-._\n      _.-"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("_.  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("-._           Redis "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6.2")]),s._v(".1 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("00000000/0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),s._v(" bit\n  .-"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v(" .-"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("`"),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("`"),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("/    _.,_ "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v("-._\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("    '      ,       .-"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v(",    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("     Running "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" standalone mode\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("-._"),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".-"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v(" __"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".-.`"),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-._"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("'"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v(" _.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'|     Port: 6379\n |    `-._   `._    /     _.-'")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("     PID: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6970")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-._    "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("-._  "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-./  _.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'    _.-'")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("-._"),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-._    "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("-.__.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'    _.-'")]),s._v("_.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'|\n |    `-._`-._        _.-'")]),s._v("_.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'    |           http://redis.io\n  `-._    `-._`-.__.-'")]),s._v("_.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'    _.-'")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-._"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("-._    "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-.__.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'    _.-'")]),s._v("_.-'"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("-._"),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-._        _.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'_.-'")]),s._v("    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("-._    "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),s._v("-._"),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("-.__.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'_.-'")]),s._v("    _.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'\n      `-._    `-.__.-'")]),s._v("    _.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'\n          `-._        _.-'")]),s._v("\n              `-.__.-"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'\n\n6970:M 10 Jun 2022 11:19:08.452 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.\n6970:M 10 Jun 2022 11:19:08.452 # Server initialized\n6970:M 10 Jun 2022 11:19:08.452 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add '")]),s._v("vm.overcommit_memory "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("' to /etc/sysctl.conf and then reboot or run the command '")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sysctl")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("vm.overcommit_memory")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("' "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" this to take effect.\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6970")]),s._v(":M "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" Jun "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2022")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(":19:08.452 * Ready to accept connections\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br")])]),a("blockquote",[a("p",[s._v("这个窗口就不能再做其他操作了，不推荐")])]),s._v(" "),a("h2",{attrs:{id:"redis介绍相关知识"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis介绍相关知识"}},[s._v("#")]),s._v(" "),a("strong",[s._v("Redis介绍相关知识")])]),s._v(" "),a("p",[s._v("端口6379从何而来")]),s._v(" "),a("p",[s._v("Alessia  Merz")]),s._v(" "),a("p",[s._v("默认16个数据库，类似数组下标从0开始，初始"),a("code",[s._v("默认使用0号库")])]),s._v(" "),a("p",[s._v("使用命令 select   <dbid> 来切换数据库。如: select 8")]),s._v(" "),a("p",[s._v("统一密码管理，所有库同样密码。")]),s._v(" "),a("p",[a("code",[s._v("dbsize")]),s._v("  查看当前数据库的key的数量")]),s._v(" "),a("p",[a("code",[s._v("flushdb")]),s._v(" 清空当前库")]),s._v(" "),a("p",[a("code",[s._v("flushall")]),s._v(" 通杀全部库")]),s._v(" "),a("p",[s._v("Redis是单线程+多路IO复用技术")]),s._v(" "),a("p",[s._v("多路复用是指使用一个线程来检查多个文件描述符（Socket）的就绪状态，比如调用select和poll函数，传入多个文件描述符，如果有一个文件描述符就绪，则返回，否则阻塞直到超时。得到就绪状态后进行真正的操作可以在同一个线程里执行，也可以启动线程执行（比如使用线程池）")]),s._v(" "),a("p",[a("code",[s._v("串行 vs 多线程+锁（memcached） vs 单线程+多路IO复用(Redis)")])]),s._v(" "),a("p",[s._v("（与Memcache三点不同: 支持多数据类型，支持持久化，单线程+多路IO复用）")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220610/image.3aetgolac1s0.webp",alt:"image"}})])])}),[],!1,null,null,null);a.default=n.exports}}]);