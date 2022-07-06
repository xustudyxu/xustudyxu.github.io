---
title: ElasticSearch 多种分析器
date: 2022-07-06 22:55:26
permalink: /pages/c6a02d/
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 多种分析器

[[toc]]

## 分析原理

分析包含下面的过程：

- 将一块文本分成适合于倒排索引的独立的「词条」
- 将这些词条统一化为标准格式以提高它们的「可搜索性」，或者 recall

分析器执行上面的工作。分析器实际上是将三个功能封装到了一个包里：

- **字符过滤器**：首先，字符串按顺序通过每个字符过滤器。他们的任务是在分词前整理字符串。一个字符过滤器可以用来去掉 HTML，或者将 & 转化成 and
- **分词器**：其次，字符串被分词器分为单个的词条。一个简单的分词器遇到空格和标点的时候，可能会将文本拆分成词条
- **Token 过滤器**：最后，词条按顺序通过每个 token 过滤器。这个过程可能会改变词条（例如，小写化 Quick ），删除词条（例如，像 a，and，the 等无用词），或者增加词条（例如，像 jump 和 leap 这种同义词）

[词项意思](https://baike.baidu.com/item/词项/861117?fr=aladdin)

[词干意思](https://baike.baidu.com/item/词干/6140284?fr=aladdin)

[词根意思](https://baike.baidu.com/item/词根/6140303?fr=aladdin)

## 内置分析器

Elasticsearch 还附带了可以直接使用的预包装的分析器。接下来我们会列出最重要的分析器。为了证明它们的差异，我们看看每个分析器会从下面的字符串得到哪些词条，先给出词条例子：

Set the shape to semi-transparent by calling set_trans(5)

### 标准分析器

标准分析器是 Elasticsearch <mark>默认</mark>使用的分析器。它是分析各种语言文本最常用的选择。它根据 Unicode 联盟定义的单词边界、划分文本。删除绝大部分标点。最后，将词条小写。它会解析词条产生：

set, the, shape, to, semi, transparent, by, calling, set_trans, 5

### 简单分析器

简单分析器在<mark>任何不是字母</mark>的地方分隔文本，将词条<mark>小写</mark>。它会解析词条产生：

set, the, shape, to, semi, transparent, by, calling, set, trans

### 空格分析器

空格分析器在空格的地方划分文本。它会解析词条产生：

Set, the, shape, to, semi-transparent, by, calling, set_trans(5)

### 语言分析器

特定语言分析器可用于很多语言。它们可以考虑指定语言的特点。例如，「英语分析器」去掉一组英语无用词（常用单词，例如 and、the、to、by，因为它们对相关性没有多少影响），它们会被删除。由于理解英语语法的规则，这个分词器可以提取英语单词的词干。

**英语分词器**会产生下面的词条：

set, shape, semi, transpar, call, set_tran, 5

注意看 transparent、 calling 和 set_trans 已经变为词根格式

## 分析器使用场景

当我们「检索」一个文档，它的全文域被分析成词条以用来创建倒排索引。但是，当我们在全文域搜索的时候，我们需要将查询字符串通过相同的分析过程，以保证我们搜索的词条格式与索引中的词条格式一致。

全文查询，理解每个域是如何定义的，因此它们可以做正确的事：

- 当你查询一个「全文域」时，会对查询字符串应用相同的分析器，以产生正确的搜索词条列表
- 当你查询一个「精确值域」时，不会分析查询字符串，而是搜索你指定的精确值

## 测试分析器

有些时候很难理解分词的过程和实际被存储到索引中的词条，特别是你刚接触 Elasticsearch。为了理解发生了什么，你可以使用 analyze API 来看文本是如何被分析的。

在请求体里，指定分析器和要分析的文本：

```json
GET http://localhost:9200/_analyze
{
    "analyzer": "standard",
    "text": "Text to analyze"
}
```

返回结果中每个元素代表一个单独的词条：

```json
{
    "tokens": [
        {
            "token": "text",
            "start_offset": 0,
            "end_offset": 4,
            "type": "<ALPHANUM>",
            "position": 1
        },
        {
            "token": "to",
            "start_offset": 5,
            "end_offset": 7,
            "type": "<ALPHANUM>",
            "position": 2
        },
        {
            "token": "analyze",
            "start_offset": 8,
            "end_offset": 15,
            "type": "<ALPHANUM>",
            "position": 3
        }
    ]
}
```

token 是实际存储到索引中的词条，<mark>也就是分析器分析后的结果</mark>。position 指明词条在原始文本中出现的位置。start_offset 和 end_offset 指明字符在原始字符串中的位置。

## 指定分析器

当 Elasticsearch 在文档中检测到一个新的字符串域，它会自动设置其为一个「全文字符串域」，并使用「标准分析器」对它进行分析。但是你不希望总是这样。可能你想使用一个不同的分析器，适用于你的数据使用的语言。有时候你想要一个字符串域就是一个字符串域，即不需要进行分析，直接检索你传入的精确值，例如用户 ID 或者一个内部的状态域或标签。要做到这一点，我们必须手动指定这些域的映射。

### IK分词器

首先我们通过 Postman 发送 `GET` 请求http://localhost:9200/_analyze查询分词效果

```json
{
    "text":"测试单词"
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220706/image.2aq25x4os6v4.webp)

ES 的默认分词器无法识别中文中测试、单词这样的词汇，而是简单的<mark>将每个字拆完分为一个词</mark>，看返回结果：

```json
{
    "tokens": [
        {
            "token": "测",
            "start_offset": 0,
            "end_offset": 1,
            "type": "<IDEOGRAPHIC>",
            "position": 0
        },
        {
            "token": "试",
            "start_offset": 1,
            "end_offset": 2,
            "type": "<IDEOGRAPHIC>",
            "position": 1
        },
        {
            "token": "单",
            "start_offset": 2,
            "end_offset": 3,
            "type": "<IDEOGRAPHIC>",
            "position": 2
        },
        {
            "token": "词",
            "start_offset": 3,
            "end_offset": 4,
            "type": "<IDEOGRAPHIC>",
            "position": 3
        }
    ]
}
```

token 是实际存储到索引中的词条，<mark>也就是分析器分析后的结果</mark>。position 指明词条在原始文本中出现的位置。start_offset 和 end_offset 指明字符在原始字符串中的位置。

这样的结果显然不符合我们的使用要求，所以我们需要下载 ES 对应版本的中文分词器

IK 中文分词器，下载地址为：https://github.com/medcl/elasticsearch-analysis-ik/releases/

下载的版本和自己的 ES 版本保持一致，否则会出现兼容性问题。

下载后，进行解压，并将解压后的后的文件夹放入 ES 根目录下的 plugins 目录下，重启 ES 即可使用。

> 安装路径不能有空格，如 Program area 中间有空格导致无法启动或者无法查询出数据。

这次加入新的查询参数："analyzer": "ik_max_word"

```json
{
    "text": "测试单词",
    "analyzer": "ik_max_word"
}
```

- ik_max_word：会将文本做最细粒度的拆分
- ik_smart：会将文本做最粗粒度的拆分

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220706/image.6u9bkj6mgig0.webp)

使用中文分词后的结果为：

```json
{
    "tokens": [
        {
            "token": "测试",
            "start_offset": 0,
            "end_offset": 2,
            "type": "CN_WORD",
            "position": 0
        },
        {
            "token": "单词",
            "start_offset": 2,
            "end_offset": 4,
            "type": "CN_WORD",
            "position": 1
        }
    ]
}
```

token 是实际存储到索引中的词条，<mark>也就是分析器分析后的结果</mark>。position 指明词条在原始文本中出现的位置。start_offset 和 end_offset 指明字符在原始字符串中的位置。

ES 中也可以进行扩展词汇，首先查询

```json
{
    "text":"艾欧尼亚",
    "analyzer":"ik_max_word"
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220706/image.1r04uie0istc.webp)

仅仅可以得到每个字的分词结果

```json
{
    "tokens": [
        {
            "token": "艾",
            "start_offset": 0,
            "end_offset": 1,
            "type": "CN_CHAR",
            "position": 0
        },
        {
            "token": "欧",
            "start_offset": 1,
            "end_offset": 2,
            "type": "CN_CHAR",
            "position": 1
        },
        {
            "token": "尼亚",
            "start_offset": 2,
            "end_offset": 4,
            "type": "CN_WORD",
            "position": 2
        }
    ]
}
```

我们需要做的就是使分词器识别到「艾欧尼亚」也是一个词语

首先进入 ES 根目录中的 plugins 文件夹下的 ik 文件夹，进入 config 目录，创建 custom.dic 文件，写入艾欧尼亚。同时打开 IKAnalyzer.cfg.xml 文件，将新建的 custom.dic 配置其中，重启 ES 服务器。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220706/image.9gzwbn99es4.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220706/image.5ivxalmak0w0.webp)

服务器响应结果:

```json
{
    "tokens": [
        {
            "token": "艾欧尼亚",
            "start_offset": 0,
            "end_offset": 4,
            "type": "CN_WORD",
            "position": 0
        },
        {
            "token": "尼亚",
            "start_offset": 2,
            "end_offset": 4,
            "type": "CN_WORD",
            "position": 1
        }
    ]
}
```

## 自定义分析器

虽然 Elasticsearch 带有一些现成的分析器，然而在分析器上 Elasticsearch 真正的强大之处在于，你可以通过在一个适合你的特定数据的设置之中组合字符过滤器、分词器、词汇单元过滤器来创建自定义的分析器。在「[分析原理]())」我们说过，一个分析器就是在一个包里面组合了三种函数的一个包装器，三种函数按照顺序被执行：

### 字符过滤器

字符过滤器用来整理一个尚未被分词的字符串。例如，如果我们的文本是 HTML 格式的，它会包含像 <p> 或者 <div> 这样的 HTML 标签，这些标签是我们不想检索的。我们可以使用 HTML 「清除字符过滤器」来移除掉所有的 HTML 标签，并且像把 &Aacute; 转换为相对应的 Unicode 字符 Á 这样，转换 HTML 实体。一个分析器可能有 0 个或者多个字符过滤器。

### 分词器

一个分析器必须有一个唯一的分词器。分词器把字符串分解成单个词条或者词汇单元。「标准分析器」里使用的是把一个字符串根据单词边界分解成单个词条，并且移除掉大部分的标点符号，然而还有其他不同行为的分词器存在。例如，「关键词分词器」完整地输出接收到的同样的字符串，并不做任何分词。「空格分词 器」只根据空格分割文本。「正则分词器」根据匹配正则表达式来分割文本。

### 词单元过滤器

经过分词，作为结果的「词单元流」会按照指定的顺序通过指定的词单元过滤器。「词单元过滤器」可以修改、添加或者移除词单元。我们已经提到过 lowercase 和 stop 词过滤器 ，但是在 Elasticsearch 里面还有很多可供选择的词单元过滤器。「词干过滤器」把单词遏制为词干。「ascii_folding 过滤器」移除变音符，把一个像 "très" 这样的词转换为 "tres"。

「ngram 和 edge_ngram 词单元过滤器」可以产生适合用于部分匹配或者自动补全的词单元。

### 自定义分析器案例

接下来，我们看看如何创建自定义的分析器：

发送PUT请求: http://localhost:9200/my_index

```json
{
    "settings": {
        "analysis": { // 开启自定义分析器
            "char_filter": {  // 自定义分词器名
                "&_to_and": {  // 自定义名字，尽量和分析内容有关
                    "type": "mapping",  // 转换类型
                    "mappings": [ "&=> and "]  // 将 & 转换为 and
                }
            },
            "filter": { // 自定义分词器名
                "my_stopwords": {  // 自定义名字，尽量和分析内容有关
                    "type": "stop",  // 删除类型
                    "stopwords": [ "the", "a" ] // 把 the 和 a 删除
                }
            },
            "analyzer": {   // 实现已经做好的自定义分词器
                "my_analyzer": {  // 自定义名字
                    "type": "custom",  // 代表 自定义 类型
                    "char_filter": [ "html_strip", "&_to_and" ], // 上面做好的自定义分词器添加进来
                    "tokenizer": "standard", // 隶属于标准分词器
                    "filter": [ "lowercase", "my_stopwords" ] // 上面做好的自定义分词器添加进来
                }
            }
        }
    }
}
```

索引被创建以后，

发送`GET`请求，使用 `analyze API` 来测试这个新的分析器

```json
{
    "text":"The quick & brown fox",
    "analyzer": "my_analyzer"
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220706/image.3t129jxdbbe0.webp)

下面的缩略结果展示出分析器正在正确地运行：

```json
{
    "tokens": [
        {
            "token": "quick",
            "start_offset": 4,
            "end_offset": 9,
            "type": "<ALPHANUM>",
            "position": 1
        },
        {
            "token": "and",
            "start_offset": 10,
            "end_offset": 11,
            "type": "<ALPHANUM>",
            "position": 2
        },
        {
            "token": "brown",
            "start_offset": 12,
            "end_offset": 17,
            "type": "<ALPHANUM>",
            "position": 3
        },
        {
            "token": "fox",
            "start_offset": 18,
            "end_offset": 21,
            "type": "<ALPHANUM>",
            "position": 4
        }
    ]
}
```

