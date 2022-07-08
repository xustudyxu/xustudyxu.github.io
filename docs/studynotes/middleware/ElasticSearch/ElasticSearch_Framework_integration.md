---
title: ElasticSearch 多框架集成
date: 2022-07-08 21:40:43
permalink: /middleware/ElasticSearch/ElasticSearch_Framework_integration
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 多框架集成

[[toc]]

## Spring Data框架集成

Spring Data 是一个用于简化数据库、非关系型数据库、索引库访问，并支持云服务的开源框架。其主要目标是使得对数据的访问变得方便快捷，并支持 map-reduce 框架和云计 算数据服务。Spring Data 可以极大的简化 JPA（Elasticsearch ......）的写法，可以在几乎不用写实现的情况下，实现对数据的访问和操作。除了 CRUD 外，还包括如分页、排序等一些常用的功能。

Spring Data 的官网：https://spring.io/projects/spring-data

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220708/image.4kyks8co88e0.webp)

Spring Data 常用的功能模块如下:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220708/image.4kgd0i31uq00.webp)

### Spring Data Elasticsearch介绍

Spring Data Elasticsearch 基于 spring data API 简化 Elasticsearch 操作，将原始操作 Elasticsearch 的客户端 API 进行封装。Spring Data 为 Elasticsearch 项目提供集成搜索引擎。Spring Data Elasticsearch POJO 的关键功能区域为中心的模型与 Elastichsearch 交互文档和轻松地编写一个存储索引库数据访问层。

官方网站: [https://spring.io/projects/spring-data-elasticsearch]()

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220708/image.5zeco8tnalw0.webp)

### Spring Data Elasticsearch版本对比

选择兼容的版本非常重要，我经常因为版本冲突而花费了大量时间调试。

版本对比以官网为主，查看地址：[https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#preface.versions]()

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220708/image.4riecmglz300.webp)

我的elasticSearch版本是7.8.0，所以所有版本选择如下：

![image](https://img.shields.io/badge/ElasticSearch-7.8.0-green)

![image](https://img.shields.io/badge/SpringBoot-2.3.4-brightgreen)

### 框架搭建

- 创建一个 Maven 项目
- 修改 pom.xml 文件，添加依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.6.RELEASE</version>
        <relativePath/>
    </parent>

    <groupId>com.frx01.es</groupId>
    <artifactId>SpringDataWithES</artifactId>
    <version>1.0.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-test</artifactId>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
    </dependencies>
</project>
```

+ 添加配置文件，在 resources 目录中增加 application.yml 文件

```yaml
spring:
  application:
    name: es-service
```

> 新版的 ip 地址和端口号可以在「配置类」里进行配置，无需在配置文件进行配置

旧版的配置文件：

```yaml
spring:
  application:
    name: es-service
  data:
    elasticsearch:
      cluster-nodes: 127.0.0.1:9200  # ES 服务器位置
```

+ Spring Boot 启动类

```java
@SpringBootApplication
public class ESApplication {

    public static void main(String[] args) {
        SpringApplication.run(ESApplication.class, args);
    }

}
```

+ 添加 ES 配置类，进行地址和端口的配置

ElasticsearchRestTemplate是spring-data-elasticsearch项目中的一个类,和其他spring项目中的 template类似。

在新版的spring-data-elasticsearch 中，ElasticsearchRestTemplate 代替了原来的ElasticsearchTemplate。

原因是ElasticsearchTemplate基于TransportClient，TransportClient即将在8.x 以后的版本中移除。所以，我们推荐使用ElasticsearchRestTemplate。

ElasticsearchRestTemplate基于RestHighLevelClient客户端的。需要自定义配置类，继承AbstractElasticsearchConfiguration，并实现elasticsearchClient()抽象方法，创建RestHighLevelClient对象。

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"

::: tab 原始模板

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/8  19:24
 * desc:elasticSearch原始模板配置类
 */
@Configuration
public class ElasticSearchConfig extends AbstractElasticsearchConfiguration {
    
	@Override
    @Bean
    public RestHighLevelClient elasticsearchClient() {

        RestClientBuilder builder = RestClient.builder(new HttpHost("127.0.0.1", 9200, "http"));
        return new RestHighLevelClient(builder);

        // 如果集群有多个地址
        // HttpHost[] httpHosts = new HttpHost[]{
        //        new HttpHost("127.2.0.1", 9200,"http"),
        //        new HttpHost("127.2.0.2", 9200,"http"),
        //        new HttpHost("127.2.0.3", 9200,"http")};
        // RestClientBuilder builder = RestClient.builder(httpHosts);
        // return new RestHighLevelClient(builder);
    }
}
```

:::

::: tab 最新模板

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/8  19:24
 * desc:elasticSearch最新模板配置类
 */
@Configuration
public class ElasticSearchConfig extends AbstractElasticsearchConfiguration {

    @Override
    @Bean
    public RestHighLevelClient elasticsearchClient() {

        final ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo("localhost:9200")  // 多个地址用逗号隔开
                .build();

        return RestClients.create(clientConfiguration).rest();
    }
}
```

:::

::::

+ 实体类

  Spring Data ES支持两种实体映射方案：

  + Jackson Object Mapping
  + Meta Model Object Mapping

早期的版本默认使用的是 jackson 的方案，但是在 `4.x` 之后 Meta Model 就上位了，而前者已经不再被支持。所以这里使用第二种方案。我们先定义一个实体类，并通过注解来表明它跟 ES 实体之间的映射关系。

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(indexName = "product",shards = 3, replicas = 1)
public class Product {
    @Id
    private Integer id; // 商品唯一标识
    /**
     * type: 字段数据类型
     * analyzer: 分词器类型
     * index: 是否索引(默认:true)
     * Keyword: 短语,不进行分词
     */
    @Field(name = "title", type = FieldType.Text)
    private String title; // 商品名称
    @Field(type = FieldType.Keyword)
    private String category; // 分类名称
    @Field(type = FieldType.Double)
    private Double price; // 商品价格
    @Field(type = FieldType.Keyword, index = false)
    private String images; // 图片地址
}
```

+ DAO数据访问对象

```java
//Product：索引的实体类
//Long：主键 ID 类型
@Repository
public interface ProductDao  extends ElasticsearchRepository<Product,Long> {

}
```

### 集成测试-索引操作

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ESApplicationTest {

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;

    //创建索引并增加映射配置
    @Test
    public void createIndex(){
        //创建索引，系统初始化会自动创建索引
        System.out.println("创建索引");
    }

    @Test
    public void deleteIndex(){
        //创建索引，系统初始化会自动创建索引
        boolean flg = elasticsearchRestTemplate.deleteIndex(Product.class);
        System.out.println("删除索引 = " + flg);
    }

}
```

### 集成测试-文档操作

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ESProductRepositoryTest {

    @Autowired
    private ProductDao productDao;

    /**
     * 新增
     */
    @Test
    public void save(){
        Product product = new Product();
        product.setId(1);
        product.setTitle("华为手机");
        product.setCategory("手机");
        product.setPrice(2999.0);
        product.setImages("http://www.atguigu/hw.jpg");
        productDao.save(product);
    }

    /**
     * 修改
     */
    @Test
    public void update(){
        Product product = new Product();
        product.setId(1);
        product.setTitle("小米 2 手机");
        product.setCategory("手机");
        product.setPrice(9999.0);
        product.setImages("");
        productDao.save(product);
    }

    /**
     * 根据 id 查询
     */
    @Test
    public void findById(){
        Product product = productDao.findById(1L).get();
        System.out.println(product);
    }

    /**
     * 查询所有
     */
    @Test
    public void findAll(){
        Iterable<Product> products = productDao.findAll();
        for (Product product : products) {
            System.out.println(product);
        }
    }

    /**
     * 删除
     */
    @Test
    public void delete(){
        Product product = new Product();
        product.setId(1);
        productDao.delete(product);
    }
    /**
     * 批量新增
     */
    @Test
    public void saveAll(){
        List<Product> productList = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Product product = new Product();
            product.setId(i);
            product.setTitle("["+i+"]小米手机");
            product.setCategory("手机");
            product.setPrice(1999.0+i);
            product.setImages("http://www.atguigu/hw.jpg");
            productList.add(product);
        }
        productDao.saveAll(productList);
    }

    /**
     * 分页查询
     */
    @Test
    public void findByPageable(){
        //设置排序(排序方式，正序还是倒序，排序的 id)
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        int currentPage = 0;  //当前页，第一页从 0 开始，1 表示第二页
        int pageSize = 5;  //每页显示多少条
        //设置查询分页
        PageRequest pageRequest = PageRequest.of(currentPage, pageSize,sort);
        //分页查询
        Page<Product> productPage = productDao.findAll(pageRequest);
        for (Product Product : productPage.getContent()) {
            System.out.println(Product);
        }
    }
}
```

### 集成测试-文档搜索

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class SpringDataESSearchTest {

    @Autowired
    private ProductDao productDao;
    /**
     * term 查询
     * search(termQueryBuilder) 调用搜索方法，参数查询构建器对象
     */
    @Test
    public void termQuery(){
        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("category", "手机");
        Iterable<Product> products = productDao.search(termQueryBuilder);
        for (Product product : products) {
            System.out.println(product);
        }
    }
    /**
     * term 查询加分页
     */
    @Test
    public void termQueryByPage(){
        int currentPage= 0 ;
        int pageSize = 5;
        //设置查询分页
        PageRequest pageRequest = PageRequest.of(currentPage, pageSize);
        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("category", "手机");
        Iterable<Product> products =
                productDao.search(termQueryBuilder,pageRequest);
        for (Product product : products) {
            System.out.println(product);
        }
    }

}
```

## Spark Streaming框架集成

### Spark Streaming框架介绍

Spark Streaming 是 Spark core API 的扩展，支持实时数据流的处理，并且具有可扩展，高吞吐量，容错的特点。数据可以从许多来源获取，如 Kafka，Flume，Kinesis 或 TCP sockets，并且可以使用复杂的算法进行处理，这些算法使用诸如 map，reduce，join 和 window 等高级函数表示。最后，处理后的数据可以推送到文件系统，数据库等。实际上，您可以将 Spark 的机器学习和图形处理算法应用于数据流。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220708/image.q7eebpwqnls.webp)

### 框架搭建

- 创建一个 Maven 项目
- 修改 pom 文件，增加依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.spark</groupId>
        <artifactId>spark-core_2.12</artifactId>
        <version>3.0.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.spark</groupId>
        <artifactId>spark-streaming_2.12</artifactId>
        <version>3.0.0</version>
    </dependency>
    <dependency>
        <groupId>org.elasticsearch</groupId>
        <artifactId>elasticsearch</artifactId>
        <version>7.15.2</version>
    </dependency>
    <!-- elasticsearch 的客户端 -->
    <dependency>
        <groupId>org.elasticsearch.client</groupId>
        <artifactId>elasticsearch-rest-high-level-client</artifactId>
        <version>7.15.2</version>
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
    <!-- <dependency>-->
        <!-- <groupId>com.fasterxml.jackson.core</groupId>-->
        <!-- <artifactId>jackson-databind</artifactId>-->
        <!-- <version>2.11.1</version>-->
        <!-- </dependency>-->
        <!-- &lt;!&ndash; junit 单元测试 &ndash;&gt;-->
        <!-- <dependency>-->
        <!-- <groupId>junit</groupId>-->
        <!-- <artifactId>junit</artifactId>-->
        <!-- <version>4.12</version>-->
    <!-- </dependency>-->
</dependencies>
```

### 功能实现

```scala
import org.apache.http.HttpHost
import org.apache.spark.SparkConf
import org.apache.spark.streaming.dstream.ReceiverInputDStream
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.elasticsearch.action.index.IndexRequest
import org.elasticsearch.client.indices.CreateIndexRequest
import org.elasticsearch.client.{RequestOptions, RestClient, 
                                 RestHighLevelClient}
import org.elasticsearch.common.xcontent.XContentType
import java.util.Date
object SparkStreamingESTest {
    def main(args: Array[String]): Unit = {
        val sparkConf = new 
        SparkConf().setMaster("local[*]").setAppName("ESTest")
        val ssc = new StreamingContext(sparkConf, Seconds(3))
        val ds: ReceiverInputDStream[String] = ssc.socketTextStream("localhost", 9999)
        ds.foreachRDD(
            rdd => {
                println("*************** " + new Date())
                rdd.foreach(
                    data => {
                        val client = new RestHighLevelClient(
                            RestClient.builder(new HttpHost("localhost", 9200, "http"))
                        );
                        // 新增文档 - 请求对象
                        val request = new IndexRequest();
                        // 设置索引及唯一性标识
                        val ss = data.split(" ")
                        println("ss = " + ss.mkString(","))
                        request.index("sparkstreaming").id(ss(0));
                        val productJson = s""" | { "data":"${ss(1)}" } |""".stripMargin;
                        // 添加文档数据，数据格式为 JSON 格式
                        request.source(productJson,XContentType.JSON);
                        // 客户端发送请求，获取响应对象
                        val response = client.index(request, RequestOptions.DEFAULT);
                        System.out.println("_index:" + response.getIndex());
                        System.out.println("_id:" + response.getId());
                        System.out.println("_result:" + response.getResult());
                        client.close()
                    }
                )
            }
        )
        ssc.start()
        ssc.awaitTermination()
    }
}
```

## Flink框架集成

### Flink框架介绍

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220708/image.1towl1ndky9.webp)

Apache Spark 是一种基于内存的快速、通用、可扩展的大数据分析计算引擎。

Apache Spark 掀开了内存计算的先河，以内存作为赌注，赢得了内存计算的飞速发展。但是在其火热的同时，开发人员发现，在 Spark 中，计算框架普遍存在的缺点和不足依然没有完全解决，而这些问题随着 5G 时代的来临以及决策者对实时数据分析结果的迫切需要而凸显的更加明显：

- 数据精准一次性处理（Exactly-Once）
- 乱序数据，迟到数据
- 低延迟，高吞吐，准确性
- 容错性

Apache Flink 是一个框架和分布式处理引擎，用于对无界和有界数据流进行有状态计算。在 Spark 火热的同时，也默默地发展自己，并尝试着解决其他计算框架的问题。

慢慢地，随着这些问题的解决，Flink 慢慢被绝大数程序员所熟知并进行大力推广，阿里公司在 2015 年改进 Flink，并创建了内部分支 Blink，目前服务于阿里集团内部搜索、推荐、广告和蚂蚁等大量核心实时业务。

### 框架搭建

- 创建一个 Maven 项目
- 修改 pom 文件，增加相关依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-scala_2.12</artifactId>
        <version>1.12.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-streaming-scala_2.12</artifactId>
        <version>1.12.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-clients_2.12</artifactId>
        <version>1.12.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-connector-elasticsearch7_2.11</artifactId>
        <version>1.12.0</version>
    </dependency>
    <!-- jackson -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.11.1</version>
    </dependency>
</dependencies>
```

### 功能实现

```java
import org.apache.flink.api.common.functions.RuntimeContext;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import 
org.apache.flink.streaming.connectors.elasticsearch.ElasticsearchSinkFunctio
n;
import org.apache.flink.streaming.connectors.elasticsearch.RequestIndexer;
import 
org.apache.flink.streaming.connectors.elasticsearch7.ElasticsearchSink;
import org.apache.http.HttpHost;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.Requests;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class FlinkElasticsearchSinkTest {
    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env = 
        StreamExecutionEnvironment.getExecutionEnvironment();
        DataStreamSource<String> source = env.socketTextStream("localhost", 
                                                               9999);
        List<HttpHost> httpHosts = new ArrayList<>();
        httpHosts.add(new HttpHost("127.0.0.1", 9200, "http"));
        //httpHosts.add(new HttpHost("10.2.3.1", 9200, "http"));
        // use a ElasticsearchSink.Builder to create an ElasticsearchSink
        ElasticsearchSink.Builder<String> esSinkBuilder = new ElasticsearchSink.Builder<>(httpHosts,
            new ElasticsearchSinkFunction<String>() {
                public IndexRequest createIndexRequest(String element) {
                    Map<String, String> json = new HashMap<>();
                    json.put("data", element);
                    return Requests.indexRequest()
                    .index("my-index")
                    //.type("my-type")
                    .source(json);
                }
                @Override
                public void process(String element, RuntimeContext ctx, RequestIndexer indexer) {
                    indexer.add(createIndexRequest(element));
                }
            }
        );
        // configuration for the bulk requests; this instructs the sink to emit after 
        every element, otherwise they would be buffered esSinkBuilder.setBulkFlushMaxActions(1);
        // provide a RestClientFactory for custom configuration on the internally created REST client
        // esSinkBuilder.setRestClientFactory(
            // restClientBuilder -> {
                // restClientBuilder.setDefaultHeaders(...)
                // restClientBuilder.setMaxRetryTimeoutMillis(...)
                // restClientBuilder.setPathPrefix(...)
                // restClientBuilder.setHttpClientConfigCallback(...)
        	// }
        // );
        source.addSink(esSinkBuilder.build());
        env.execute("flink-es");
    }
}
```

