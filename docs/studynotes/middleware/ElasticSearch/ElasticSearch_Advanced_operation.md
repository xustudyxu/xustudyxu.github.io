---
title: ElasticSearch  高级操作
date: 2022-06-29 20:51:41
permalink: /middleware/ElasticSearch/ElasticSearch_Advanced_operation
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch  高级操作

[[toc]]

## 数据准备

进行本内容的高级操作前，先往 ElasticSearch 插入一些数据，进行使用

先把上一个内容的 `student` 索引删除掉

在 Postman 中，向 ES 服务器发 `DELETE` 请求：`http://127.0.0.1:9200/student`

在 Postman 中，向 ES 服务器发五个 `POST` 请求：`http://127.0.0.1:9200/student/_doc/100x`，x分别是1，2，3，4，5，6,每次请求携带自己的请求体，请求体内容在下方代码块里

```json
{
    "name":"zhangsan",
    "nickname":"zhangsan",
    "sex":"男",
    "age":30
}
{
    "name":"lisi",
    "nickname":"lisi",
    "sex":"男",
    "age":20
}
{
    "name":"wangwu",
    "nickname":"wangwu",
    "sex":"女",
    "age":40
}
{
    "name":"zhangsan1",
    "nickname":"zhangsan1",
    "sex":"女",
    "age":50
}
{
    "name":"zhangsan2",
    "nickname":"zhangsan2",
    "sex":"女",
    "age":30
}
{
    "name":"zhangsan222",
    "nickname":"zhangsan222",
    "sex":"女",
    "age":30
}
```

## 高级查询

本内容基本都是对请求体进行配置，也是 ElasticSearch 的语法核心所在。

查询都是用 `GET` 请求。

### 分词查询

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "match": {
            "name": "zhangsan2"
        }
    }
}
```

查询 name 包含 `zhangsan2` 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.1dsngyd08e8w.webp)

服务器响应结果：

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.540445,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1005",
                "_score": 1.540445,
                "_source": {
                    "name": "zhangsan2",
                    "nickname": "zhangsan2",
                    "sex": "女",
                    "age": 30
                }
            }
        ]
    }
}
```

### 查询所有文档

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "match_all": {}
    }
}
# "query"：这里的 query 代表一个查询对象，里面可以有不同的查询属性
# "match_all"：查询类型，例如：match_all(代表查询所有)，match，term，range 等等
# {查询条件}：查询条件会根据类型的不同，写法也有差异
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.3v37fdvz38c0.webp)

服务器相应结果:

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1002",
                "_score": 1.0,
                "_source": {
                    "name": "lisi",
                    "nickname": "lisi",
                    "sex": "男",
                    "age": 20
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1003",
                "_score": 1.0,
                "_source": {
                    "name": "wangwu",
                    "nickname": "wangwu",
                    "sex": "女",
                    "age": 40
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1004",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan1",
                    "nickname": "zhangsan1",
                    "sex": "女",
                    "age": 50
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1005",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan2",
                    "nickname": "zhangsan2",
                    "sex": "女",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1006",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan222",
                    "nickname": "zhangsan222",
                    "sex": "女",
                    "age": 30
                }
            }
        ]
    }
}
```

### 字段匹配查询

匹配查询用到 `multi_match`

multi_match 与 match 类似，不同的是它可以在多个字段中查询。

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "multi_match": {
            "query": "zhangsan",
            "fields": ["name","nickname"]
        }
    }
}
```

查询 key 为 `name` 和 `nickname`，value 为 `zhangsan` 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.5xj3n1s9wx40.webp)

服务端响应结果:

```json
{
    "took": 19,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.540445,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.540445,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            }
        ]
    }
}
```

### 单关键字精确查询

`term` 查询，精确的关键词匹配查询，不对查询条件进行分词，即只能单关键字精确查询。

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "term": {
            "name": {
                "value": "zhangsan"
            }
        }
    }
}
```

查询 key 为 `name`，value 为 `zhangsan` 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.4yc9h5qwxjw0.webp)

服务端响应数据为:

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.540445,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.540445,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            }
        ]
    }
}
```

### 多关键字精确查询

terms 查询和 term 查询一样，但它允许你指定多值进行匹配。

如果这个字段包含了指定值中的任何一个值，那么这个文档满足条件，类似于 mysql 的 in 在

Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

```json
{
    "query": {
        "terms": {
            "name": ["zhangsan","lisi"]
        }
    }
}
```

查询 key 为 `name`，value 分别为 `zhangsan` 和 `lisi` 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.2mm2zr5t7wc0.webp)

服务器响应结果:

```json
{
    "took": 25,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1002",
                "_score": 1.0,
                "_source": {
                    "name": "lisi",
                    "nickname": "lisi",
                    "sex": "男",
                    "age": 20
                }
            }
        ]
    }
}
```

### 指定字段查询

默认情况下，Elasticsearch 在搜索的结果中，会把文档中保存在 _source 的所有字段都返回。

如果我们只想获取其中的部分字段，我们可以添加 _source 的过滤

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "_source": ["name","nickname"], 
    "query": {
        "terms": {
            "nickname": ["zhangsan"]
        }
    }
}
```

只需要查询出 key 为 `name` 和 `nickname`，value 为 `zhangsan` 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.53llxxsh7b00.webp)

服务器响应结果:

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan"
                }
            }
        ]
    }
}
```

### 过滤字段

用到的字段：

- includes：来指定想要显示的字段
- excludes：来指定不想要显示的字段

includes 使用

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "_source": {
        "includes": ["name","nickname"]
    }, 
    "query": {
        "terms": {
            "nickname": ["zhangsan"]
        }
    }
}
```

指定想要 key 为 `name` 和 `nickname`，value 为 `zhangsan` 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.3c9rv27uwt60.webp)

服务器相应结果:

```json
{
    "took": 4,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan"
                }
            }
        ]
    }
}
```

excludes 使用

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "_source": {
        "excludes": ["name","nickname"]
    }, 
    "query": {
        "terms": {
            "nickname": ["zhangsan"]
        }
    }
}
```

指定想要 key 不是 `name` 和 `nickname`，value 为 `zhangsan` 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6ouxlv0pntc.webp)

服务器响应结果:

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "sex": "男",
                    "age": 30
                }
            }
        ]
    }
}
```

### 组合查询

`bool` 把各种其它查询通过 `must`（必须，类似 and）、`must_not`（必须不，类似 not）、`should`（应该 类似 or）的方式进行组合

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "name": "zhangsan"
                    }
                }
            ],
            "must_not": [
                {
                    "match": {
                        "age": "40"
                    }
                }
            ],
            "should": [
                {
                    "match": {
                        "sex": "男"
                    }
                }
            ]
        }
    }
}
```

查询 name 必须为 `zhangsan`，age 不能是 40，sex 可以是男的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.56n3nj9nlis0.webp)

服务端响应结果:

```json
{
    "took": 109,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 2.5700645,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 2.5700645,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            }
        ]
    }
}
```

### 范围查询

range 查询找出那些落在指定区间内的数字或者时间。range 查询允许以下字符

| 操作符 | 说明        |
| ------ | ----------- |
| gt     | 大于 >      |
| gte    | 大于等于 >= |
| lt     | 小于 <      |
| lte    | 小于等于 <= |

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "range": {
            "age": {
                "gte": 30,
                "lte": 35
            }
        }
    }
}
```

查询年龄大于等于 30 小于等于 35 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.1ic04v5cc0hs.webp)

服务端响应结果:

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1005",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan2",
                    "nickname": "zhangsan2",
                    "sex": "女",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1006",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan222",
                    "nickname": "zhangsan222",
                    "sex": "女",
                    "age": 30
                }
            }
        ]
    }
}
```

### 模糊查询

返回包含与搜索字词相似的字词的文档。使用的字段是 fuzzy

编辑距离是将一个术语转换为另一个术语所需的一个字符更改的次数。这些更改可以包括：

- 更改字符（box → fox）

- 删除字符（black → lack）
- 插入字符（sic → sick）
- 转置两个相邻字符（act → cat）

为了找到相似的术语，fuzzy 查询会在指定的编辑距离内创建一组搜索词的所有可能的变体或扩展。然后查询返回每个扩展的完全匹配。

通过 fuzziness 修改编辑距离。一般使用默认值 AUTO，根据术语的长度生成编辑距离。

例子 1：在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "fuzzy": {
            "name": {
                "value": "zhangsan"
            }
        }
    }
}
```

模糊查询 name 带有 `zhangsan` 的数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.5iqwiikkl640.webp)

服务端响应结果:

```json
{
    "took": 14,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.540445,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.540445,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1004",
                "_score": 1.3478894,
                "_source": {
                    "name": "zhangsan1",
                    "nickname": "zhangsan1",
                    "sex": "女",
                    "age": 50
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1005",
                "_score": 1.3478894,
                "_source": {
                    "name": "zhangsan2",
                    "nickname": "zhangsan2",
                    "sex": "女",
                    "age": 30
                }
            }
        ]
    }
}
```

例子 2：在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "fuzzy": {
            "name": {
                "value": "zhangsan",
                "fuzziness": 2
            }
        }
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.3gdyn4rsaok0.webp)

服务器响应结果:

```json
{
    "took": 6,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.540445,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.540445,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1004",
                "_score": 1.3478894,
                "_source": {
                    "name": "zhangsan1",
                    "nickname": "zhangsan1",
                    "sex": "女",
                    "age": 50
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1005",
                "_score": 1.3478894,
                "_source": {
                    "name": "zhangsan2",
                    "nickname": "zhangsan2",
                    "sex": "女",
                    "age": 30
                }
            }
        ]
    }
}
```

### 多IDs查询

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "ids" : {
            "values" : ["1001", "1004", "1006"]
        }
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.4ix7z98wcp40.webp)

服务端响应结果:

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1004",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan1",
                    "nickname": "zhangsan1",
                    "sex": "女",
                    "age": 50
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1006",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan222",
                    "nickname": "zhangsan222",
                    "sex": "女",
                    "age": 30
                }
            }
        ]
    }
}
```

### 前缀查询

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "prefix": {
            "name": {
                "value": "zhangsan"
            }
        }
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.2zrhxi8lkkc0.webp)

服务器响应结果:

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 4,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1004",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan1",
                    "nickname": "zhangsan1",
                    "sex": "女",
                    "age": 50
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1005",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan2",
                    "nickname": "zhangsan2",
                    "sex": "女",
                    "age": 30
                }
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1006",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan222",
                    "nickname": "zhangsan222",
                    "sex": "女",
                    "age": 30
                }
            }
        ]
    }
}
```

### 单字段排序

sort 可以让我们按照不同的字段进行排序，并且通过 order 指定排序的方式。desc 降序，asc 升序。

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "match": {
            "name":"zhangsan"
        }
    },
    "sort": [{
        "age": {
            "order":"desc"
        }
    }]
}
```

查询 name 有 `zhangsan` 的数据，并对年龄进行排序

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6aeh0nbybks0.webp)

服务器响应:

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": null,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": null,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                },
                "sort": [
                    30
                ]
            }
        ]
    }
}
```

### 多字段排序

假定我们想要结合使用 age 和 _score 进行查询，并且匹配的结果首先按照年龄排序，然后按照相关性得分排序

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

```json
{
    "query": {
        "match_all": {}
    },
    "sort": [
        {
            "age": {
                "order": "desc"
            }
        },
        {
            "_score":{
                "order": "desc"
            }
        }
    ]
}
```

查询所有索引为 student 的数据，结果先按照年龄降序，然后按照相关性得分降序

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.3ojs1fiynqg0.webp)

服务器响应；

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": null,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1004",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan1",
                    "nickname": "zhangsan1",
                    "sex": "女",
                    "age": 50
                },
                "sort": [
                    50,
                    1.0
                ]
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1003",
                "_score": 1.0,
                "_source": {
                    "name": "wangwu",
                    "nickname": "wangwu",
                    "sex": "女",
                    "age": 40
                },
                "sort": [
                    40,
                    1.0
                ]
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                },
                "sort": [
                    30,
                    1.0
                ]
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1005",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan2",
                    "nickname": "zhangsan2",
                    "sex": "女",
                    "age": 30
                },
                "sort": [
                    30,
                    1.0
                ]
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1006",
                "_score": 1.0,
                "_source": {
                    "name": "zhangsan222",
                    "nickname": "zhangsan222",
                    "sex": "女",
                    "age": 30
                },
                "sort": [
                    30,
                    1.0
                ]
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1002",
                "_score": 1.0,
                "_source": {
                    "name": "lisi",
                    "nickname": "lisi",
                    "sex": "男",
                    "age": 20
                },
                "sort": [
                    20,
                    1.0
                ]
            }
        ]
    }
}
```

### 高亮查询

在进行关键字搜索时，搜索出的内容中的关键字会显示不同的颜色，称之为高亮。

如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.7exifzkoa340.webp)

Elasticsearch 可以对查询内容中的关键字部分，进行标签和样式(高亮)的设置。

在使用 match 查询的同时，加上一个 highlight 属性：

- pre_tags：前置标签
- post_tags：后置标签
- fields：需要高亮的字段
- title：这里声明 title 字段需要高亮，后面可以为这个字段设置特有配置，也可以为空

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "match": {
            "name": "zhangsan"
        }
    },
    "highlight": {
        "pre_tags": "<font color='red'>",
        "post_tags": "</font>",
        "fields": {
            "name": {}
        }
    }
}
```

分词查询 name 为 `zhangsan`，并给 `zhangsan` 高亮红色

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.7dhiu925vqw0.webp)

服务器响应结果:

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.540445,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.540445,
                "_source": {
                    "name": "zhangsan",
                    "nickname": "zhangsan",
                    "sex": "男",
                    "age": 30
                },
                "highlight": {
                    "name": [
                        "<font color='red'>zhangsan</font>" #渲染到页面，自然会高亮
                    ]
                }
            }
        ]
    }
}
```

### 分页查询

from：当前页的起始索引，默认从 0 开始。 from = (pageNum - 1) * size

size：每页显示多少条

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "query": {
        "match_all": {}
    },
    "sort": [
        {
            "age": {
                "order": "desc"
            }
        }
    ],
    "from": 0,
    "size": 2
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.7ily2k9vp580.webp)

服务器响应结果:

```json
{
    "took": 0,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": null,
        "hits": [
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1004",
                "_score": null,
                "_source": {
                    "name": "zhangsan1",
                    "nickname": "zhangsan1",
                    "sex": "女",
                    "age": 50
                },
                "sort": [
                    50
                ]
            },
            {
                "_index": "student",
                "_type": "_doc",
                "_id": "1003",
                "_score": null,
                "_source": {
                    "name": "wangwu",
                    "nickname": "wangwu",
                    "sex": "女",
                    "age": 40
                },
                "sort": [
                    40
                ]
            }
        ]
    }
}
```

## 聚合查询

聚合允许使用者对 es 文档进行统计分析，类似与关系型数据库中的 group by，当然还有很多其他的聚合，例如取最大值、平均值等等。

聚合查询 `aggs` 字段，该字段里的第一个字段是自定义名字，一个聚合/分组需要另一个聚合/分组需要用到自定义名字（嵌套查询）。第二个字段是聚合查询类型。查询结果不仅有聚合结果，也有设计到的详细数据。

结果长度 `size` 字段和 `aggs` 字段同级，代表只获取聚合结果，不获取涉及到的详细数据。

请求体内容:

```json
{
    "aggs" : {//聚合操作
        "price_group":{ //名称，随意起名
            "terms":{   //分组操作
                "field":"age" //分组字段
            }
        }

    },
    "size":0
}
```

如果想求price的平均值,将`terms`改为`avg`

服务器响应结果:

```json
{
    "took": 74,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "price_group": {
            "value": 33.333333333333336
        }
    }
}
```

### 简单聚合

- **对某个字段取最大值 max**

在 **Postman** 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "aggs":{
        "max_age":{   // 自定义名字
            "max":{"field":"age"}
        }
    },
    "size":0  // 只获取聚合结果，不获取每一个数据
}
```

- **对某个字段取最小值 min**

在 **Postman** 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "aggs":{
        "min_age":{ // 自定义名字
            "min":{"field":"age"}
        }
    },
    "size":0 // 只获取聚合结果，不获取每一个数据
}
```

- **对某个字段求和 sum**

在 **Postman** 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

请求体内容：

```json
{
    "aggs":{
        "sum_age":{ // 自定义名字
            "sum":{"field":"age"}
        }
    },
    "size":0 // 只获取聚合结果，不获取每一个数据
}
```

- **对某个字段取平均值 avg**

在 **Postman** 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

```json
{
    "aggs":{
        "avg_age":{ // 自定义名字
            "avg":{"field":"age"}
        }
    },
    "size":0 // 只获取聚合结果，不获取每一个数据
}
```

- **对某个字段的值进行去重之后再取总数**

在 **Postman** 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

```json
{
    "aggs":{
        "distinct_age":{ // 自定义名字
            "cardinality":{"field":"age"}
        }
    },
    "size":0 // 只获取聚合结果，不获取每一个数据
}
```

- **State 聚合**

stats 聚合，对某个字段一次性返回 count，max，min，avg 和 sum 五个指标

在 **Postman** 中，向 ES 服务器发 `GET` 请求 ：`http://127.0.0.1:9200/student/_search`

```json
{
    "aggs":{
        "stats_age":{ // 自定义名字a
            "stats":{"field":"age"}
        }
    },
    "size":0 // 只获取聚合结果，不获取每一个数据
}
```

### 桶聚合查询

桶聚和相当于 sql 中的 group by 语句

- **terms 聚合，分组统计**

在 **Postman** 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

```json
{
    "aggs":{
        "age_groupby":{ // 自定义名字
            "terms":{"field":"age"}
        }
    },
    "size":0 // 只获取聚合结果，不获取每一个数据
}
```

对 age 进行分组，返回的结果部分：

```json
{
    "took": 78,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "age_groupby": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
                {
                    "key": 30,
                    "doc_count": 3
                },
                {
                    "key": 20,
                    "doc_count": 1
                },
                {
                    "key": 40,
                    "doc_count": 1
                },
                {
                    "key": 50,
                    "doc_count": 1
                }
            ]
        }
    }
}
```

代表 age 为 30 的文档数据有 3 个，age 为 20、40、50 的文档数据各有 1 个。

- 嵌套查询

在 **Postman** 中，向 ES 服务器发 GET 请求 ：`http://127.0.0.1:9200/student/_search`

```json
{
    "aggs":{
        "age_groupby":{ // 自定义名字
            "terms":{
                "field": "age",
            },
            "aggs": {
                "average_age": {
                "avg": {
                    "field": "age"
                }
            }
      }
        }
    },
    "size":0 // 只获取聚合结果，不获取每一个数据
}
```

- **在 terms 分组下再进行聚合和排序**

在 **Postman** 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_search`

这里就用到了自定义的名字，如下 `average_age` 名代表对 age 去平均值，`age_groupby` 里先对 age 进行分组，再取平均值并且排序，所以需要 `average_age` 名。

```json
{
    "aggs":{
        "age_groupby":{ // 自定义名字
            "terms":{
                "field": "age",
                "order": {
                	"average_age": "desc"
                }
            },
            "aggs": {
                "average_age": {
                "avg": {
                    "field": "age"
                }
            }
      }
        }
    },
    "size":0 // 只获取聚合结果，不获取每一个数据
}
```

