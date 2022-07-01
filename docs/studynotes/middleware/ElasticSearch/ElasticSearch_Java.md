---
title: ElasticSearch Java整合
date: 2022-06-30 23:57:29
permalink: /middleware/ElasticSearch/ElasticSearch_Java
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch Java整合

[[toc]]

## 项目准备

Elasticsearch 软件是由 Java 语言开发的，所以也可以通过 Java API 的方式对 Elasticsearch 服务进行访问

### 项目配置

pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>org.elasticsearch</groupId>
        <artifactId>elasticsearch</artifactId>
        <version>7.8.0</version>
    </dependency>
    <!-- elasticsearch 的客户端 -->
    <dependency>
        <groupId>org.elasticsearch.client</groupId>
        <artifactId>elasticsearch-rest-high-level-client</artifactId>
        <version>7.8.0</version>
    </dependency>
    <!-- elasticsearch 依赖 2.x 的 log4j -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.8.2</version>
    </dependency>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.8.2</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.9.3</version>
    </dependency>
    <!-- junit 单元测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>
</dependencies>
```

elasticsearch 的两个依赖要和 elasticsearch 服务器版本一致。

### 客户端对象

建好项目，创建一个类，测试连接 ES 服务器

```java
public class ESTest_Client {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //关闭ES客户端
        esClient.close();

    }
}
```

运行后控制台如果不报错，则代表连接成功。

注意：9200 端口为 Elasticsearch 的 Web 通信端口，localhost 为启动 ES 服务的主机名。

## 索引操作

ES 服务器正常启动后，可以通过 Java API 客户端对象对 ES 索引进行操作

### 创建索引

```java
public class ESTest_Index_Create {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //创建索引
        CreateIndexRequest request = new CreateIndexRequest("user");
        CreateIndexResponse createIndexResponse =
                esClient.indices().create(request, RequestOptions.DEFAULT);

        //响应状态
        boolean acknowledged = createIndexResponse.isAcknowledged();
        System.out.println("创建索引状态: "+acknowledged);
        esClient.close();

    }
}
```

+ 结果

```java
创建索引状态: true

Process finished with exit code 0
```

### 查看索引

```java
public class ESTest_Index_Search {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //查询索引
        GetIndexRequest request = new GetIndexRequest("user");
        GetIndexResponse getIndexResponse =
                esClient.indices().get(request, RequestOptions.DEFAULT);

        //响应状态
        System.out.println(getIndexResponse.getAliases());
        System.out.println(getIndexResponse.getMappings());
        System.out.println(getIndexResponse.getSettings());
        esClient.close();

    }
}
```

+ 结果

```java
{user=[]}
{user=org.elasticsearch.cluster.metadata.MappingMetadata@89984224}
{user={"index.creation_date":"1656599701456","index.number_of_replicas":"1","index.number_of_shards":"1","index.provided_name":"user","index.uuid":"So0-k5DJRIOBWMQ0DvtsyA","index.version.created":"7080099"}}

Process finished with exit code 0
```

### 删除索引

```java
public class ESTest_Index_Delete {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //查询索引
        DeleteIndexRequest request = new DeleteIndexRequest("user");

        AcknowledgedResponse response =
                esClient.indices().delete(request, RequestOptions.DEFAULT);

        //响应状态
        System.out.println(response.isAcknowledged());
        esClient.close();

    }
}
```

+ 结果

```java
true

Process finished with exit code 0
```

### 总结

关于索引的请求，用到 `xxxIndexRequest` 以及 `.indices().xxx`，其中 xxx 代表增删查

## 文章操作

### 新增文档

首先需要创建一个实体类：User

```java
public class User {
    private String name;
    private String sex;
    private Integer age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

创建数据，添加到文档中

```java
public class ESTest_Doc_Create {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //插入数据
        IndexRequest request = new IndexRequest();
        request.index("user").id("1001");

        User user = new User();
        user.setName("zhangsan");
        user.setAge(20);
        user.setSex("男");

        //向ES插入数据，必须将数据转换为JSON格式
        ObjectMapper mapper = new ObjectMapper();
        String userJson = mapper.writeValueAsString(user);
        request.source(userJson, XContentType.JSON);


        IndexResponse response = esClient.index(request, RequestOptions.DEFAULT);
        System.out.println(response.getResult());
        esClient.close();
    }
}
```

+ 结果

```java
CREATED

Process finished with exit code 0
```

### 修改文档

```java {10,11,12}
public class ESTest_Doc_Update {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //修改数据
        UpdateRequest request = new UpdateRequest();
        request.index("user").id("1001");
        request.doc(XContentType.JSON,"sex","女");

        UpdateResponse response = esClient.update(request, RequestOptions.DEFAULT);

        System.out.println(response.getResult());

        esClient.close();
    }
}
```

+ 结果

```java
UPDATED

Process finished with exit code 0
```

### 查询文档

```java
public class ESTest_Doc_Get {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //查询数据
        GetRequest request = new GetRequest();
        request.index("user").id("1001");
        GetResponse response = esClient.get(request, RequestOptions.DEFAULT);
        System.out.println(response.getSourceAsString());

        esClient.close();
    }
}
```

+ 结果

```java
{"name":"zhangsan","sex":"女","age":20}

Process finished with exit code 0
```

### 删除文档

```java
public class ESTest_Doc_Delete {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //删除数据

        DeleteRequest request = new DeleteRequest();
        request.index("user").id("1001");
        DeleteResponse response = esClient.delete(request, RequestOptions.DEFAULT);
        System.out.println(response.toString());

        esClient.close();
    }
}
```

+ 结果

```java
DeleteResponse[index=user,type=_doc,id=1001,version=6,result=deleted,shards=ShardInfo{total=2, successful=1, failures=[]}]

Process finished with exit code 0
```

### 批量新增

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"

::: tab 非实体类批量新增

```java
public class ESTest_Doc_Insert_Batch {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //批量插入数据
        BulkRequest request = new BulkRequest();
        request.add(new IndexRequest().index("user").id("1001").source(XContentType.JSON,"name","zhangsan"));
        request.add(new IndexRequest().index("user").id("1002").source(XContentType.JSON,"name","lisi"));
        request.add(new IndexRequest().index("user").id("1003").source(XContentType.JSON,"name","wangwu"));
        request.add(new IndexRequest().index("user").id("1004").source(XContentType.JSON,"name","lucy"));


        BulkResponse response = esClient.bulk(request, RequestOptions.DEFAULT);
        System.out.println(response.getTook());
        System.out.println(response.getItems());

        esClient.close();
    }
}
```

:::

::: tab 实体类批量新增

```java
public class EsDocCreateBatch {

    public static void main(String[] args) throws IOException {
        // 连接 ES 客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http")));

        BulkRequest request = new BulkRequest();
        // 创建数据对象
        User user = new User("可乐","18","男");
        request.add(new IndexRequest().index("user").id("1001").source(XContentType.JSON, "username","可乐","age",18,"sex","男"));
        request.add(new IndexRequest().index("user").id("1002").source(XContentType.JSON, "username","冰糖","age",20,"sex","女"));
        request.add(new IndexRequest().index("user").id("1003").source(XContentType.JSON, "username","雪梨","age",22,"sex","女"));
        request.add(new IndexRequest().index("user").id("1004").source(XContentType.JSON, "username","酸橙","age",24,"sex","男"));
        request.add(new IndexRequest().index("user").id("1005").source(XContentType.JSON, "username","蜜桃","age",26,"sex","女"));
        // 客户端发送请求，获取响应对象
        BulkResponse response = esClient.bulk(request, RequestOptions.DEFAULT);
        System.out.println("响应时间：" + response.getTook());
        System.out.println("创建的内容：" + Arrays.toString(response.getItems()));


        // 关闭 ES 客户端
        esClient.close();
    }
}
```

:::
:::::

+ 结果

```java
141ms
[Lorg.elasticsearch.action.bulk.BulkItemResponse;@152aa092

Process finished with exit code 0
```

### 批量删除

```java
public class ESTest_Doc_Delete_Batch {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //批量插入数据
        BulkRequest request = new BulkRequest();
        //配置修改参数
        request.add(new DeleteRequest().index("user").id("1001"));
        request.add(new DeleteRequest().index("user").id("1002"));
        request.add(new DeleteRequest().index("user").id("1003"));
        request.add(new DeleteRequest().index("user").id("1004"));
        request.add(new DeleteRequest().index("user").id("1005"));
        //客户端发送请求，获取响应对象
        BulkResponse response = esClient.bulk(request, RequestOptions.DEFAULT);
        //打印结果信息
        System.out.println("响应时间："+response.getTook());
        esClient.close();
    }
} 
```

+ 结果

```java
响应时间：199ms

Process finished with exit code 0
```

### 总结

增删改查操作格式：

- 连接 ES 客户端
- 创建一个 `XXXRequest` 对象，其中 XXX 代表增删改查
- 给该对象设置索引和文档
- 调用 `.XXX`请求，传入参数，其中 XXX 代表增删改查

## 高级查询

### 查询准备

本内容都是查询相关，所以需要插入几条数据

```java
public class EsDocCreateBatch {

    public static void main(String[] args) throws IOException {
        // 连接 ES 客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http")));

        BulkRequest request = new BulkRequest();
        ObjectMapper objectMapper = new ObjectMapper();
        // 创建数据对象
        request.add(new IndexRequest().index("user").id("1001").source(objectMapper.writeValueAsString(new User("可乐", 18, "男")), XContentType.JSON));
        request.add(new IndexRequest().index("user").id("1002").source(objectMapper.writeValueAsString(new User("冰糖", 20, "女")), XContentType.JSON));
        request.add(new IndexRequest().index("user").id("1003").source(objectMapper.writeValueAsString(new User("雪梨", 22, "女")), XContentType.JSON));
        request.add(new IndexRequest().index("user").id("1004").source(objectMapper.writeValueAsString(new User("酸橙", 24, "男")), XContentType.JSON));
        request.add(new IndexRequest().index("user").id("1005").source(objectMapper.writeValueAsString(new User("蜜桃", 30, "女")), XContentType.JSON));
        // 客户端发送请求，获取响应对象
        BulkResponse response = esClient.bulk(request, RequestOptions.DEFAULT);
        System.out.println("响应时间：" + response.getTook());

        // 关闭 ES 客户端
        esClient.close();
    }
}
```

### 查询所有索引数据

```java {12}
public class ESTest_Doc_QueryAll {
    public static void main(String[] args) throws IOException {

        //创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http"))
        );

        //1.查询索引中全部的数据
        SearchRequest request = new SearchRequest();
        request.indices("user");
        SearchSourceBuilder query = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());
        request.source(query);
        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println("总共的查询条数:"+hits.getTotalHits());
        System.out.println("查询时间:"+response.getTook());
        System.out.println("详细数据；");
        for (SearchHit hit : hits) {
            // 输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        esClient.close();
    }
}
```

`indices(参数)` 的参数可以是多个索引。

+ 结果

```java
总共的查询条数:5 hits
查询时间:136ms
详细数据；
{"name":"可乐","sex":"男","age":18}
{"name":"冰糖","sex":"女","age":20}
{"name":"雪梨","sex":"女","age":22}
{"name":"酸橙","sex":"男","age":24}
{"name":"蜜桃","sex":"女","age":30}

Process finished with exit code 0
```

### 条件查询-term

```java {12}
public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));

        SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.termQuery("age","18"));
        SearchResponse response = esClient.search(request.source(sourceBuilder), RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("响应时间:"+response.getTook());
        System.out.println("是否超时:"+response.isTimedOut());
        System.out.println("命中数量:"+hits.getTotalHits());
        System.out.println("MaxScore:"+hits.getMaxScore());
        System.out.println("详细数据:");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }

        //关闭ES客户端
        esClient.close();
    }
}
```

+ 结果

```java
响应时间:140ms
是否超时:false
命中数量:1 hits
MaxScore:1.0
详细数据:
{"name":"可乐","sex":"男","age":18}

Process finished with exit code 0
```

### 条件查询-terms

```java {12}
public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));

        SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.termsQuery("age","18","20","23"));
        SearchResponse response = esClient.search(request.source(sourceBuilder), RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("响应时间:"+response.getTook());
        System.out.println("是否超时:"+response.isTimedOut());
        System.out.println("命中数量:"+hits.getTotalHits());
        System.out.println("MaxScore:"+hits.getMaxScore());
        System.out.println("详细数据:");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }

        //关闭ES客户端
        esClient.close();
    }
}
```

+ 结果

```java
响应时间:185ms
是否超时:false
命中数量:2 hits
MaxScore:1.0
详细数据:
{"name":"可乐","sex":"男","age":18}
{"name":"冰糖","sex":"女","age":20}

Process finished with exit code 0
```

### 分页查询

```java {11-14}
 public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));       
		//分页查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.matchAllQuery());
        sourceBuilder.from(0);
        sourceBuilder.size(2);
        SearchResponse response = esClient.search(request.source(sourceBuilder), RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("响应时间:"+response.getTook());
        System.out.println("是否超时:"+response.isTimedOut());
        System.out.println("命中数量:"+hits.getTotalHits());
        System.out.println("MaxScore:"+hits.getMaxScore());
        System.out.println("详细数据:");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }

        //关闭ES客户端
        esClient.close();
    }
}
```

结果:

```java
响应时间:2ms
是否超时:false
命中数量:5 hits
MaxScore:1.0
详细数据:
{"name":"可乐","sex":"男","age":18}
{"name":"冰糖","sex":"女","age":20}

Process finished with exit code 0
```

### 排序查询

```java {13}
public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));        
		//查询排序
        SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.matchAllQuery());
        sourceBuilder.sort("age", SortOrder.DESC);
        SearchResponse response = esClient.search(request.source(sourceBuilder), RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("响应时间:"+response.getTook());
        System.out.println("是否超时:"+response.isTimedOut());
        System.out.println("命中数量:"+hits.getTotalHits());
        System.out.println("MaxScore:"+hits.getMaxScore());
        System.out.println("详细数据:");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }

        //关闭ES客户端
        esClient.close();
    }
}
```

结果:

```java
响应时间:59ms
是否超时:false
命中数量:5 hits
MaxScore:NaN
详细数据:
{"name":"蜜桃","sex":"女","age":30}
{"name":"酸橙","sex":"男","age":24}
{"name":"雪梨","sex":"女","age":22}
{"name":"冰糖","sex":"女","age":20}
{"name":"可乐","sex":"男","age":18}

Process finished with exit code 0
```

### 过滤字段

```java {14-16}
public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));        
		//过滤字段
        SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.matchAllQuery());

        String[] excludes={"age"};
        String[] includes={"name"};
        sourceBuilder.fetchSource(includes,excludes);
        SearchResponse response = esClient.search(request.source(sourceBuilder), RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("响应时间:"+response.getTook());
        System.out.println("是否超时:"+response.isTimedOut());
        System.out.println("命中数量:"+hits.getTotalHits());
        System.out.println("MaxScore:"+hits.getMaxScore());
        System.out.println("详细数据:");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }

        //关闭ES客户端
        esClient.close();
    }
}
```

+ 结果:

```java
响应时间:3ms
是否超时:false
命中数量:5 hits
MaxScore:1.0
详细数据:
{"name":"可乐"}
{"name":"冰糖"}
{"name":"雪梨"}
{"name":"酸橙"}
{"name":"蜜桃"}

Process finished with exit code 0
```

### Bool查询

```java {13-18}
public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));       
		//组合查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        //必须包含
        boolQueryBuilder.must(QueryBuilders.matchQuery("age","30"));
        //一定不含
        boolQueryBuilder.mustNot(QueryBuilders.matchQuery("username","可乐"));
        //可能包含
        boolQueryBuilder.should(QueryBuilders.matchQuery("sex","男"));
        sourceBuilder.query(boolQueryBuilder);
        SearchResponse response = esClient.search(request.source(sourceBuilder), RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("响应时间:"+response.getTook());
        System.out.println("是否超时:"+response.isTimedOut());
        System.out.println("命中数量:"+hits.getTotalHits());
        System.out.println("MaxScore:"+hits.getMaxScore());
        System.out.println("详细数据:");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }

        //关闭ES客户端
        esClient.close();
    }
}
```

结果:

```java
响应时间:68ms
是否超时:false
命中数量:1 hits
MaxScore:1.0
详细数据:
{"name":"蜜桃","sex":"女","age":30}

Process finished with exit code 0
```

### 范围查询

```java {12-15}
public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));       
		//范围查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery("age");
        rangeQuery.gte(30);
        rangeQuery.lte(40);
        sourceBuilder.query(rangeQuery);

        request.source(sourceBuilder);
        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        for (SearchHit hit : hits) {
            // 输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        //关闭ES客户端
        esClient.close();
    }
}
```

结果:

```java
took:1ms
timeout:false
total:1 hits
MaxScore:1.0
{"name":"蜜桃","sex":"女","age":30}

Process finished with exit code 0
```

### 模糊查询

```java
public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));
        //模糊查询
		SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        QueryBuilders.fuzzyQuery("name","wangwu").fuzziness(Fuzziness.ONE);


        request.source(sourceBuilder);
        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        for (SearchHit hit : hits) {
            // 输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        //关闭ES客户端
        esClient.close();
    }
}
```

结果:

```java
took:2ms
timeout:false
total:5 hits
MaxScore:1.0
详细数据：
{"name":"可乐","sex":"男","age":18}
{"name":"冰糖","sex":"女","age":20}
{"name":"雪梨","sex":"女","age":22}
{"name":"酸橙","sex":"男","age":24}
{"name":"蜜桃","sex":"女","age":30}

Process finished with exit code 0
```

### 高亮查询

```java
public class ESTermQuery {
    public static void main(String[] args) throws IOException {
        //连接ES客户端
        RestHighLevelClient esClient =
                new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http"))); 
		//高亮查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        //构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        TermsQueryBuilder termsQueryBuilder = QueryBuilders.termsQuery("age", "18","20");

        sourceBuilder.query(termsQueryBuilder);

        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.preTags("<font color='red'>");
        highlightBuilder.postTags("</font>");
        highlightBuilder.field("age");

        request.source(sourceBuilder);
        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        //查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        System.out.println("详细数据：");
        for (SearchHit hit : hits) {
            // 输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        //关闭ES客户端
        esClient.close();
    }
}
```

结果:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220701/image.7iu4a53cmrw0.webp)

## 聚合查询

### 最大年龄

```java
public class EsArrgQuery {

    public static void main(String[] args) throws IOException {
        // 连接 ES 客户端 
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http")));

        // 高亮查询
        SearchRequest request = new SearchRequest().indices("user");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.aggregation(AggregationBuilders.max("maxAge").field("age"));
        // 3.客户端发送请求，获取响应对象
        SearchResponse response = esClient.search(request.source(sourceBuilder), RequestOptions.DEFAULT);
        // 4.打印响应结果
        System.out.println(response);

        // 关闭 ES 客户端
        esClient.close();
    }
}
```

### 分组统计

```java
public class EsArrgQuery {

    public static void main(String[] args) throws IOException {
        // 连接 ES 客户端 
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200,"http")));

        // 高亮查询
        SearchRequest request = new SearchRequest().indices("user");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.aggregation(AggregationBuilders.terms("ageGroupby").field("age"));
        // 3.客户端发送请求，获取响应对象
        SearchResponse response = esClient.search(request.source(sourceBuilder), RequestOptions.DEFAULT);
        // 4.打印响应结果
        SearchHits hits = response.getHits();
        System.out.println(response);

        // 关闭 ES 客户端
        esClient.close();
    }
}
```

