(window.webpackJsonp=window.webpackJsonp||[]).push([[231],{581:function(v,_,t){"use strict";t.r(_);var o=t(10),d=Object(o.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"mongodb-相关概念"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#mongodb-相关概念"}},[v._v("#")]),v._v(" MongoDB 相关概念")]),v._v(" "),_("p",[_("a",{attrs:{href:"https://www.bilibili.com/video/BV1bJ411x7mq?p=1&vd_source=6aafd031757cd8c1dbbb98344fb3d363",target:"_blank",rel:"noopener noreferrer"}},[v._v("学习视频地址"),_("OutboundLink")],1)]),v._v(" "),_("p"),_("div",{staticClass:"table-of-contents"},[_("ul",[_("li",[_("a",{attrs:{href:"#业务应用场景"}},[v._v("业务应用场景")])]),_("li",[_("a",{attrs:{href:"#mongodb简介"}},[v._v("MongoDB简介")])]),_("li",[_("a",{attrs:{href:"#体系架构"}},[v._v("体系架构")])]),_("li",[_("a",{attrs:{href:"#数据模型"}},[v._v("数据模型")])]),_("li",[_("a",{attrs:{href:"#mongodb特点"}},[v._v("MongoDB特点")])])])]),_("p"),v._v(" "),_("h2",{attrs:{id:"业务应用场景"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#业务应用场景"}},[v._v("#")]),v._v(" 业务应用场景")]),v._v(" "),_("p",[v._v("传统的关系型数据库（如MySQL），在数据操作的“三高”需求以及应对Web2.0的网站需求面前，显得力不从心。\n解释：“三高”需求：")]),v._v(" "),_("ul",[_("li",[v._v("High performance - 对数据库高并发读写的需求。")]),v._v(" "),_("li",[v._v("Huge Storage - 对海量数据的高效率存储和访问的需求。")]),v._v(" "),_("li",[v._v("High Scalability && High Availability- 对数据库的高可扩展性和高可用性的需求。")])]),v._v(" "),_("p",[_("strong",[v._v("而MongoDB可应对“三高”需求")]),v._v("。")]),v._v(" "),_("p",[v._v("具体的应用场景如：")]),v._v(" "),_("ol",[_("li",[v._v("社交场景，使用 MongoDB 存储存储用户信息，以及用户发表的朋友圈信息，通过地理位置索引实现附近的人、地点等功能。")]),v._v(" "),_("li",[v._v("游戏场景，使用 MongoDB 存储游戏用户信息，用户的装备、积分等直接以内嵌文档的形式存储，方便查询、高效率存储和访问。")]),v._v(" "),_("li",[v._v("物流场景，使用 MongoDB 存储订单信息，订单状态在运送过程中会不断更新，以 MongoDB 内嵌数组的形式来存储，一次查询就能将订单所有的变更读取出来。")]),v._v(" "),_("li",[v._v("物联网场景，使用 MongoDB 存储所有接入的智能设备信息，以及设备汇报的日志信息，并对这些信息进行多维度的分析。")]),v._v(" "),_("li",[v._v("视频直播，使用 MongoDB 存储用户信息、点赞互动信息等。")])]),v._v(" "),_("p",[v._v("这些应用场景中，数据操作方面的共同特点是：")]),v._v(" "),_("blockquote",[_("ol",[_("li",[v._v("数据量大")]),v._v(" "),_("li",[v._v("写入操作频繁（读写都很频繁）")]),v._v(" "),_("li",[v._v("价值较低的数据，对事务性要求不高")])])]),v._v(" "),_("p",[v._v("对于这样的数据，我们更适合使用MongoDB来实现数据的存储。")]),v._v(" "),_("p",[_("strong",[v._v("什么时候选择MongoDB")])]),v._v(" "),_("p",[v._v("在架构选型上，除了上述的三个特点外，如果你还犹豫是否要选择它？可以考虑以下的一些问题：")]),v._v(" "),_("p",[v._v("应用不需要事务及复杂 join 支持")]),v._v(" "),_("p",[v._v("新应用，需求会变，数据模型无法确定，想快速迭代开发")]),v._v(" "),_("p",[v._v("应用需要2000-3000以上的读写QPS（更高也可以）")]),v._v(" "),_("p",[v._v("应用需要TB甚至 PB 级别数据存储")]),v._v(" "),_("p",[v._v("应用发展迅速，需要能快速水平扩展")]),v._v(" "),_("p",[v._v("应用要求存储的数据不丢失")]),v._v(" "),_("p",[v._v("应用需要99.999%高可用")]),v._v(" "),_("p",[v._v("应用需要大量的地理位置查询、文本查询")]),v._v(" "),_("p",[v._v("如果上述有1个符合，可以考虑 MongoDB，2个及以上的符合，选择 MongoDB 绝不会后悔。")]),v._v(" "),_("p",[v._v("思考：如果用MySQL呢？")]),v._v(" "),_("p",[v._v("答：相对MySQL，可以以更低的成本解决问题（包括学习、开发、运维等成本）")]),v._v(" "),_("h2",{attrs:{id:"mongodb简介"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#mongodb简介"}},[v._v("#")]),v._v(" MongoDB简介")]),v._v(" "),_("p",[v._v("MongoDB是一个"),_("code",[v._v("开源、高性能、无模式的文档型数据库")]),v._v("，当初的设计就是用于简化开发和方便扩展，是NoSQL数据库产品中的一种。是最像关系型数据库（MySQL）的非关系型数据库。")]),v._v(" "),_("p",[v._v("它支持的数据结构非常松散，是一种"),_("code",[v._v("类似于 JSON 的 格式叫BSON")]),v._v("，所以它"),_("code",[v._v("既可以存储比较复杂的数据类型")]),v._v("，又"),_("code",[v._v("相当的灵活")]),v._v("。")]),v._v(" "),_("p",[v._v("MongoDB中的"),_("code",[v._v("记录是一个文档")]),v._v("，它是一个"),_("code",[v._v("由字段和值对（field:value）组成")]),v._v("的数据结构。MongoDB文档类似于JSON对象，即一个文档认为就是一个对象。字段的数据类型是字符型，它的值除了使用基本的一些类型外，还可以包括其他文档、普通数组和文档数组。")]),v._v(" "),_("h2",{attrs:{id:"体系架构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#体系架构"}},[v._v("#")]),v._v(" 体系架构")]),v._v(" "),_("p",[v._v("MySQL和MongoDB对比:")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220624/image.64qge2j1t4o0.webp",alt:"image"}})]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("SQL术语/概念")]),v._v(" "),_("th",[v._v("MondoDB术语/概念")]),v._v(" "),_("th",[v._v("解释/说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("database")]),v._v(" "),_("td",[v._v("database")]),v._v(" "),_("td",[v._v("数据库")])]),v._v(" "),_("tr",[_("td",[v._v("table")]),v._v(" "),_("td",[v._v("collection")]),v._v(" "),_("td",[v._v("数据库表/集合")])]),v._v(" "),_("tr",[_("td",[v._v("row")]),v._v(" "),_("td",[v._v("document")]),v._v(" "),_("td",[v._v("数据记录行/文档")])]),v._v(" "),_("tr",[_("td",[v._v("column")]),v._v(" "),_("td",[v._v("field")]),v._v(" "),_("td",[v._v("数据字段/域")])]),v._v(" "),_("tr",[_("td",[v._v("index")]),v._v(" "),_("td",[v._v("index")]),v._v(" "),_("td",[v._v("索引")])]),v._v(" "),_("tr",[_("td",[v._v("table joins")]),v._v(" "),_("td"),v._v(" "),_("td",[v._v("表连接,MongoDB不支持")])]),v._v(" "),_("tr",[_("td"),v._v(" "),_("td",[v._v("嵌入文档")]),v._v(" "),_("td",[v._v("MongoDB通过嵌入式文档来替代多表连接")])]),v._v(" "),_("tr",[_("td",[v._v("primary key")]),v._v(" "),_("td",[v._v("primary key")]),v._v(" "),_("td",[v._v("主键,MongoDB自动将_id字段设置为主键")])])])]),v._v(" "),_("h2",{attrs:{id:"数据模型"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#数据模型"}},[v._v("#")]),v._v(" 数据模型")]),v._v(" "),_("p",[v._v("MongoDB的"),_("code",[v._v("最小存储单位就是文档(document)对象")]),v._v("。"),_("code",[v._v("文档(document)对象")]),v._v("对应于关系型数据库的"),_("code",[v._v("行")]),v._v("。数据在MongoDB中以"),_("code",[v._v("BSON（Binary-JSON）")]),v._v("文档的格式存储在磁盘上。")]),v._v(" "),_("p",[v._v("BSON（Binary Serialized Document Format）是一种类json的一种二进制形式的存储格式，简称Binary JSON。BSON和JSON一样，支持内嵌的文档对象和数组对象，但是BSON有JSON没有的一些数据类型，如Date和BinData类型。")]),v._v(" "),_("p",[v._v("BSON采用了类似于 C 语言结构体的名称、对表示方法，支持内嵌的文档对象和数组对象，具有轻量性、可遍历性、高效性的三个特点，可以有效描述非结构化数据和结构化数据。这种格式的优点是灵活性高，但它的缺点是空间利用率不是很理想。")]),v._v(" "),_("p",[v._v("Bson中，除了基本的JSON类型：string,integer,boolean,double,null,array和object，mongo还使用了特殊的数据类型。这些类型包括date,object id,binary data,regular expression 和code。每一个驱动都以特定语言的方式实现了这些类型，查看你的驱动的文档来获取详细信息。")]),v._v(" "),_("p",[v._v("BSON数据类型参考列表:")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("数据类型")]),v._v(" "),_("th",[v._v("描述")]),v._v(" "),_("th",[v._v("举例")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("字符串")]),v._v(" "),_("td",[v._v("UTF-8字符串都可表示为字符串类型的数据")]),v._v(" "),_("td",[v._v('{"x" : "foobar"}')])]),v._v(" "),_("tr",[_("td",[v._v("对象id")]),v._v(" "),_("td",[v._v("对象id是文档的12字节的唯一 ID")]),v._v(" "),_("td",[v._v('{"X" :ObjectId() }')])]),v._v(" "),_("tr",[_("td",[v._v("布尔值")]),v._v(" "),_("td",[v._v("真或者假：true或者false")]),v._v(" "),_("td",[v._v('{"x":true}+')])]),v._v(" "),_("tr",[_("td",[v._v("数组")]),v._v(" "),_("td",[v._v("值的集合或者列表可以表示成数组")]),v._v(" "),_("td",[v._v('{"x" ： ["a", "b", "c"]}')])]),v._v(" "),_("tr",[_("td",[v._v("32位整数")]),v._v(" "),_("td",[v._v("类型不可用。JavaScript仅支持64位浮点数，所以32位整数会被自动转换。")]),v._v(" "),_("td",[v._v("shell是不支持该类型的，shell中默认会转换成64位浮点数")])]),v._v(" "),_("tr",[_("td",[v._v("64位整数")]),v._v(" "),_("td",[v._v("不支持这个类型。shell会使用一个特殊的内嵌文档来显示64位整数")]),v._v(" "),_("td",[v._v("shell是不支持该类型的，shell中默认会转换成64位浮点数")])]),v._v(" "),_("tr",[_("td",[v._v("64位浮点数")]),v._v(" "),_("td",[v._v("shell中的数字就是这一种类型")]),v._v(" "),_("td",[v._v('{"x"：3.14159，"y"：3}')])]),v._v(" "),_("tr",[_("td",[v._v("null")]),v._v(" "),_("td",[v._v("表示空值或者未定义的对象")]),v._v(" "),_("td",[v._v('{"x":null}')])]),v._v(" "),_("tr",[_("td",[v._v("undefined")]),v._v(" "),_("td",[v._v("文档中也可以使用未定义类型")]),v._v(" "),_("td",[v._v('{"x":undefined}')])]),v._v(" "),_("tr",[_("td",[v._v("符号")]),v._v(" "),_("td",[v._v("shell不支持，shell会将数据库中的符号类型的数据自动转换成字符串")]),v._v(" "),_("td")]),v._v(" "),_("tr",[_("td",[v._v("正则表达式")]),v._v(" "),_("td",[v._v("文档中可以包含正则表达式，采用JavaScript的正则表达式语法")]),v._v(" "),_("td",[v._v('{"x" ： /foobar/i}')])]),v._v(" "),_("tr",[_("td",[v._v("代码")]),v._v(" "),_("td",[v._v("文档中还可以包含JavaScript代码")]),v._v(" "),_("td",[v._v('{"x" ： function() { /* …… */ }}')])]),v._v(" "),_("tr",[_("td",[v._v("二进制数据")]),v._v(" "),_("td",[v._v("二进制数据可以由任意字节的串组成，不过shell中无法使用")]),v._v(" "),_("td")]),v._v(" "),_("tr",[_("td",[v._v("最大值/最小值")]),v._v(" "),_("td",[v._v("BSON包括一个特殊类型，表示可能的最大值。shell中没有这个类型。")]),v._v(" "),_("td")])])]),v._v(" "),_("h2",{attrs:{id:"mongodb特点"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#mongodb特点"}},[v._v("#")]),v._v(" MongoDB特点")]),v._v(" "),_("p",[v._v("MongoDB主要有如下特点：")]),v._v(" "),_("ol",[_("li",[_("strong",[v._v("高性能")])])]),v._v(" "),_("p",[v._v("MongoDB提供高性能的数据持久性。特别是,对嵌入式数据模型的支持减少了数据库系统上的I/O活动。")]),v._v(" "),_("p",[v._v("索引支持更快的查询，并且可以包含来自嵌入式文档和数组的键。（文本索引解决搜索的需求、TTL索引解决历史数据自动过期的需求、地理位置索引可用于构建各种 O2O 应用）")]),v._v(" "),_("p",[v._v("mmapv1、wiredtiger、mongorocks（rocksdb）、in-memory 等多引擎支持满足各种场景需求。")]),v._v(" "),_("p",[v._v("Gridfs解决文件存储的需求。")]),v._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[_("strong",[v._v("高可用性")])])]),v._v(" "),_("p",[v._v("MongoDB的复制工具称为副本集（replica set），它可提供自动故障转移和数据冗余。")]),v._v(" "),_("ol",{attrs:{start:"3"}},[_("li",[_("strong",[v._v("高可扩展性")])])]),v._v(" "),_("p",[v._v("MongoDB提供了水平可扩展性作为其核心功能的一部分。")]),v._v(" "),_("p",[v._v("分片将数据分布在一组集群的机器上。（海量数据存储，服务能力水平扩展）")]),v._v(" "),_("p",[v._v("从3.4开始，MongoDB支持基于片键创建数据区域。在一个平衡的集群中，MongoDB将一个区域所覆盖的读写只定向到该区域内的那些片。")]),v._v(" "),_("ol",{attrs:{start:"4"}},[_("li",[_("strong",[v._v("丰富的查询支持")])])]),v._v(" "),_("p",[v._v("MongoDB支持丰富的查询语言，支持读和写操作(CRUD)，比如数据聚合、文本搜索和地理空间查询等。")]),v._v(" "),_("ol",{attrs:{start:"5"}},[_("li",[v._v("其他特点：如无模式（动态模式）、灵活的文档模型、")])])])}),[],!1,null,null,null);_.default=d.exports}}]);