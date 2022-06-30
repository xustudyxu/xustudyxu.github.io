---
title: ElasticSearch Java整合
date: 2022-06-30 23:57:29
permalink: /pages/6ad554/
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

```java
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
