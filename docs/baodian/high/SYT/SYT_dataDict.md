---
title: 尚医通-数据字典
date: 2022-10-23 22:33:38
permalink: /high/SYT/SYT_dataDict
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-数据字典

[[toc]]

## 数据字典介绍

何为数据字典？数据字典就是管理系统常用的分类数据或者一些固定数据，例如：省市区三级联动数据、民族数据、行业数据、学历数据等，由于该系统大量使用这种数据，所以我们要做一个数据管理方便管理系统数据，一般系统基本都会做数据管理。

### 页面效果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221023/image.53h2w1b8cbg0.webp)

### 表设计

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221023/image.6xtf8ezuqz40.webp)

### 数据分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221023/image.3ywd7c5bvco0.webp)

parent_id：

上级id，通过id与parent_id构建上下级关系，例如：我们要获取所有行业数据，那么只需要查询parent_id=20000的数据

name：名称，例如：填写用户信息，我们要select标签选择民族，“汉族”就是数据字典的名称

value：值，例如：填写用户信息，我们要select标签选择民族，“1”（汉族的标识）就是数据字典的值

dict_code：编码，编码是我们自定义的，全局唯一，例如：我们要获取行业数据，我们可以通过parent_id获取，但是parent_id是不确定的，所以我们可以根据编码来获取行业数据

说明：系统中会使用省市区三级联动数据，该数据我们来自“国家统计局”官方数据，地址：

http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/index.html

## 数据字典开发

### 搭建 service-cmn 模块

修改pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>service</artifactId>
        <groupId>com.frx01</groupId>
        <version>1.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>service_cmn</artifactId>
    <packaging>jar</packaging>
    <name>service-cmn</name>
    <description>service-cmn</description>

    <dependencies>
    </dependencies>

    <build>
        <finalName>service-cmn</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

1. 添加配置文件application.properties

```properties
# 服务端口
server.port=8202
# 服务名
spring.application.name=service-cmn

# 环境设置：dev、test、prod
spring.profiles.active=dev

# mysql数据库连接
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/yygh_cmn?characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=hsp

#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8
```

2. 添加主启动类

```java
@SpringBootApplication
public class ServiceCmnApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceCmnApplication.class,args);
    }
}
```

## 数据字典列表

根据element组件要求，返回列表数据必须包含hasChildren字典，如图：

https://element.eleme.cn/#/zh-CN/component/table

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221023/image.1dqnzkb21g6.webp)

### 数据字典列表接口

#### model模块添加数据字典实体

在model模块查看实体：Dict

```java
@Data
@ApiModel(description = "数据字典")
@TableName("dict")
public class Dict extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "上级id")
    @TableField("parent_id")
    private Long parentId;

    @ApiModelProperty(value = "名称")
    @TableField("name")
    private String name;

    @ApiModelProperty(value = "值")
    @TableField("value")
    private String value;

    @ApiModelProperty(value = "编码")
    @TableField("dict_code")
    private String dictCode;

    @ApiModelProperty(value = "是否包含子节点")
    @TableField(exist = false)
    private boolean hasChildren;
}
```

说明：hasChildren为树形组件所需字典，标识为数据库表不存在该字段

#### 添加数据字典 mapper

```java
public interface DictMapper extends BaseMapper<Dict> {
}
```

#### 添加数据字典 service

````java
public interface DictService extends IService<Dict> {

    //根据数据id查询子数据列表
    List<Dict> findChildData(Long id);
}
````

+ 添加实现类

```java
@Service
public class DictServiceImpl extends ServiceImpl<DictMapper, Dict> implements DictService {

    @Override
    public List<Dict> findChildData(Long id) {

        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("parent_id",id);
        List<Dict> list = baseMapper.selectList(queryWrapper);
        //向list集合中每个dict对象中设置hasChildren
        for (Dict dict : list) {
            Long dictId = dict.getId();
            boolean isChild = this.isChildren(dictId);
            dict.setHasChildren(isChild);
        }
        return list;
    }

    //判断id下面是否有子数据
    private boolean isChildren(Long id){

        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("parent_id",id);
        Integer count = baseMapper.selectCount(queryWrapper);
        return count>0;
    }
}
```

#### 添加控制层Controller

```java
@Api(value = "数据字典的接口")
@RestController
@RequestMapping("/admin/cmn/dict")
public class DictController {

    @Autowired
    private DictService dictService;

    //根据数据id查询子数据列表
    @ApiOperation(value = "根据数据id查询子数据列表")
    @GetMapping("/findChildData/{id}")
    public Result findChildData(@PathVariable Long id){
        List<Dict> list = dictService.findChildData(id);
        return Result.ok(list);
    }
}
```

## EasyExcel 介绍

Java解析、生成Excel比较有名的框架有Apache poi、jxl。但他们都存在一个严重的问题就是非常的耗内存，poi有一套SAX模式的API可以一定程度的解决一些内存溢出的问题，但POI还是有一些缺陷，比如07版Excel解压缩以及解压后存储都是在内存中完成的，内存消耗依然很大。easyexcel重写了poi对07版Excel的解析，能够原本一个3M的excel用POI sax依然需要100M左右内存降低到几M，并且再大的excel不会出现内存溢出，03版依赖POI的sax模式。在上层做了模型转换的封装，让使用者更加简单方便。

EasyExcel是一个基于Java的简单、省内存的读写Excel的开源项目。在尽可能节约内存的情况下支持读写百M的Excel。

文档地址：[https://alibaba-easyexcel.github.io/index.html](https://alibaba-easyexcel.github.io/index.html)

github地址：[https://github.com/alibaba/easyexcel](https://alibaba-easyexcel.github.io/index.html)

### EasyExcel 集成

#### 添加依赖

```xml
<dependencies>
    <!-- https://mvnrepository.com/artifact/com.alibaba/easyexcel -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>easyexcel</artifactId>
        <version>2.1.1</version>
    </dependency>
</dependencies>
```

::: details Test

```java
@Data
public class UserData {

    @ExcelProperty(value = "用户编号",index = 0)
    private int uid;

    @ExcelProperty(value = "用户名称",index = 1)
    private String username;

}
```

```java
public class TestWrite {
    public static void main(String[] args) {

        //构建数据List集合
        ArrayList<Object> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            UserData data = new UserData();
            data.setUid(i);
            data.setUsername("Lucy"+i);
            list.add(data);
        }
        String fileName = "F:\\excel\\01.xlsx";

        EasyExcel.write(fileName,UserData.class).sheet("用户信息")
                .doWrite(list);
    }
}
```

测试成功

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221024/image.6nc0ds4d8xo0.webp)

:::

```java
public class ExcelListener extends AnalysisEventListener<UserData> {

    //从第二行开始,一行一行去读取Excel里面的内容
    @Override
    public void invoke(UserData userData, AnalysisContext analysisContext) {
        System.out.println(userData);
    }

    //读取第一行内容
    @Override
    public void invokeHeadMap(Map<Integer, String> headMap, AnalysisContext context) {
        System.out.println("表头信息:"+headMap);
    }

    //读取之后执行
    @Override
    public void doAfterAllAnalysed(AnalysisContext analysisContext) {
        System.out.println("读取完毕");
    }
}
```

```java
public class TestRead {
    public static void main(String[] args) {
        //读取文件路径
        String fileName = "F:\\excel\\01.xlsx";
        //调用方法实现读取操作
        EasyExcel.read(fileName,UserData.class,new ExcelListener()).sheet().doRead();
    }
}
```

+ 控制台输出

```java
表头信息:{0=用户编号, 1=用户名称}
UserData(uid=0, username=Lucy0)
UserData(uid=1, username=Lucy1)
UserData(uid=2, username=Lucy2)
UserData(uid=3, username=Lucy3)
UserData(uid=4, username=Lucy4)
UserData(uid=5, username=Lucy5)
UserData(uid=6, username=Lucy6)
UserData(uid=7, username=Lucy7)
UserData(uid=8, username=Lucy8)
UserData(uid=9, username=Lucy9)
读取完毕

Process finished with exit code 0
```

## 数据字典导出

### 导出接口封装

#### 在 model 模块添加导出实体

```java
@Data
public class DictEeVo {

	@ExcelProperty(value = "id" ,index = 0)
	private Long id;

	@ExcelProperty(value = "上级id" ,index = 1)
	private Long parentId;

	@ExcelProperty(value = "名称" ,index = 2)
	private String name;

	@ExcelProperty(value = "值" ,index = 3)
	private String value;

	@ExcelProperty(value = "编码" ,index = 4)
	private String dictCode;

}
```

#### 在service-cmn模块添加service方法

1. 在DictService类添加接口

```java
    void exportDictData(HttpServletResponse response);
```

2. 在DictServiceImpl类添加接口实现类

```java
    //导出数据字典接口
    @Override
    public void exportDictData(HttpServletResponse response) {
        //设置下载信息
        response.setContentType("application/vnd.me-excel");
        response.setCharacterEncoding("utf-8");
        //这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = "dict";
        response.setHeader("Content-disposition","attachment;filename="+fileName+".xlsx");
        //查询数据库
        List<Dict> dictList = baseMapper.selectList(null);
        //Dict --> DictEeVo
        List<DictEeVo> dictEeVoList = new ArrayList<>();
        for (DictEeVo dict: dictEeVoList) {
            DictEeVo dictEeVo = new DictEeVo();
            dictEeVo.setId(dict.getId());
            BeanUtils.copyProperties(dict,dictEeVo,DictEeVo.class);
            dictEeVoList.add(dictEeVo);
        }
        //调用方法
        try {
            EasyExcel.write(response.getOutputStream(), DictEeVo.class).sheet("dict")
                    .doWrite(dictEeVoList);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

#### 在service-cmn模块添加controller方法

```java
    //导出数据字典接口
    @GetMapping("/exportData")
    public void exportDict(HttpServletResponse response){
        dictService.exportDictData(response);
    }
```

#### 测试

直接通过浏览器导出数据：

## 数据字典导入

### 导入接口封装

#### 创建回调监听器

```java
public class DictListener extends AnalysisEventListener<DictEeVo> {

    private DictMapper dictMapper;

    public DictListener(DictMapper dictMapper) {
        this.dictMapper = dictMapper;
    }

    //从第二行，一行一行读取
    @Override
    public void invoke(DictEeVo dictEeVo, AnalysisContext analysisContext) {

        //调用方法添加数据
        Dict dict = new Dict();
        BeanUtils.copyProperties(dictEeVo,dict);
        dictMapper.insert(dict);
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext analysisContext) {

    }
}
```

#### 在service-cmn模块添加service方法

```java
    @Override
    public void importDictData(MultipartFile file) {
        try {
            EasyExcel.read(file.getInputStream(),DictEeVo.class,new DictListener(baseMapper))
                    .sheet().doRead();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

#### 在service-cmn模块添加controller方法

```java
    //导入数据字典
    @PostMapping("/importData")
    public Result importDict(MultipartFile file){
        dictService.importDictData(file);
        return Result.ok();
    }
```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221024/image.3onb27ilxv4.webp)

+ 上传后，查询数据库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221024/image.3ptrf4k2amg0.webp)

## Spring Cache + Redis 缓存数据

Spring Cache 是一个非常优秀的缓存组件。自Spring 3.1起，提供了类似于@Transactional注解事务的注解Cache支持，且提供了Cache抽象，方便切换各种底层Cache（如：redis）

使用Spring Cache的好处：

1. 提供基本的Cache抽象，方便切换各种底层Cache；
2. 通过注解Cache可以实现类似于事务一样，缓存逻辑透明的应用到我们的业务代码上，且只需要更少的代码就可以完成；
3. 提供事务回滚时也自动回滚缓存；
4. 支持比较复杂的缓存逻辑；

### 项目集成Spring Cache + Redis

因为缓存也是公共使用，所有的service模块都有可能使用缓存，所以我们把依赖与部分配置加在service-util模块，这样其他service模块都可以使用了。

#### service-util添加依赖

在service-util模块的pom.xml添加依赖

```xml
<!-- redis -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- spring2.X集成redis所需common-pool2-->
<dependency>
	<groupId>org.apache.commons</groupId>
	<artifactId>commons-pool2</artifactId>
	<version>2.6.0</version>
</dependency>
```

#### service-util添加配置类

```java
@Configuration
@EnableCaching
public class RedisConfig {

    /**
     * 自定义key规则
     *
     * @return
     */
    @Bean
    public KeyGenerator keyGenerator() {
        return new KeyGenerator() {
            @Override
            public Object generate(Object target, Method method, Object... params) {
                StringBuilder sb = new StringBuilder();
                sb.append(target.getClass().getName());
                sb.append(method.getName());
                for (Object obj : params) {
                    sb.append(obj.toString());
                }
                return sb.toString();
            }
        };
    }

    /**
     * 设置RedisTemplate规则
     *
     * @param redisConnectionFactory
     * @return
     */
    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);

        //解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        // 指定要序列化的域，field,get和set,以及修饰符范围，ANY是都有包括private和public
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 指定序列化输入的类型，类必须是非final修饰的，final修饰的类，比如String,Integer等会跑出异常
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        //序列号key value
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    /**
     * 设置CacheManager缓存规则
     *
     * @param factory
     * @return
     */
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);

        //解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        // 配置序列化（解决乱码的问题）,过期时间600秒
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(600))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
                .disableCachingNullValues();

        RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }
}
```

说明：

> @EnableCaching：标记注解 @EnableCaching，开启缓存，并配置Redis缓存管理器。[@EnableCaching](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/cache/annotation/EnableCaching.html) 注释触发后置处理器, 检查每一个Spring bean 的 public 方法是否存在缓存注解。如果找到这样的一个注释, 自动创建一个代理拦截方法调用和处理相应的缓存行为。

#### service-cmn添加redis配置

```properties
spring.redis.host=192.168.91.166
spring.redis.port=6379
spring.redis.database= 0
spring.redis.timeout=1800000

spring.redis.lettuce.pool.max-active=20
spring.redis.lettuce.pool.max-wait=-1
#最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-idle=5
spring.redis.lettuce.pool.min-idle=0
```

## 使用Spring Cache

### 常用缓存标签

#### 缓存 @Cacheable

根据方法对其返回结果进行缓存，下次请求时，如果缓存存在，则直接读取缓存数据返回；如果缓存不存在，则执行方法，并把返回的结果存入缓存中。一般用在查询方法上。

查看源码，属性值如下：

| 属性/方法名 | 解释                                             |
| ----------- | ------------------------------------------------ |
| value       | 缓存名，必填，它指定了你的缓存存放在哪块命名空间 |
| cacheNames  | 与 value 差不多，二选一即可                      |
| key         | 可选属性，可以使用 SpEL 标签自定义缓存的key      |

#### 缓存 @CachePut

使用该注解标志的方法，每次都会执行，并将结果存入指定的缓存中。其他方法可以直接从响应的缓存中读取缓存数据，而不需要再去查询数据库。一般用在新增方法上。

查看源码，属性值如下：

| 属性/方法名 | 解释                                             |
| ----------- | ------------------------------------------------ |
| value       | 缓存名，必填，它指定了你的缓存存放在哪块命名空间 |
| cacheNames  | 与 value 差不多，二选一即可                      |
| key         | 可选属性，可以使用 SpEL 标签自定义缓存的key      |

#### 缓存 @CacheEvict

使用该注解标志的方法，会清空指定的缓存。一般用在更新或者删除方法上

查看源码，属性值如下：

| 属性/方法名      | 解释                                                         |
| ---------------- | ------------------------------------------------------------ |
| value            | 缓存名，必填，它指定了你的缓存存放在哪块命名空间             |
| cacheNames       | 与 value 差不多，二选一即可                                  |
| key              | 可选属性，可以使用 SpEL 标签自定义缓存的key                  |
| allEntries       | 是否清空所有缓存，默认为   false。如果指定为 true，则方法调用后将立即清空所有的缓存 |
| beforeInvocation | 是否在方法执行前就清空，默认为false。如果指定为true，则在方法执行前就会清空缓存 |

### 数据字典应用

改造com.frx01.yygh.cmn.service.impl.DictServiceImpl类方法

```java {1,17}
    @Cacheable(value = "dict",keyGenerator = "keyGenerator")
    @Override
    public List<Dict> findChildData(Long id) {

        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("parent_id",id);
        List<Dict> list = baseMapper.selectList(queryWrapper);
        //向list集合中每个dict对象中设置hasChildren
        for (Dict dict : list) {
            Long dictId = dict.getId();
            boolean isChild = this.isChildren(dictId);
            dict.setHasChildren(isChild);
        }
        return list;
    }

    @CacheEvict(value = "dict", allEntries=true)
    @Override
    public void importDictData(MultipartFile file) {
        try {
            EasyExcel.read(file.getInputStream(),DictEeVo.class,new DictListener(baseMapper))
                    .sheet().doRead();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

+ 查看redis

```sh
127.0.0.1:6379> keys *
1) "dict::com.frx01.yygh.service.impl.DictServiceImplfindChildData1"
127.0.0.1:6379> get dict::com.frx01.yygh.service.impl.DictServiceImplfindChildData1
"[\"java.util.ArrayList\",[[\"com.frx01.yygh.model.cmn.Dict\",{\"id\":86,\"createTime\":[\"java.util.Date\",\"2019-06-10 02:43:35\"],\"updateTime\":[\"java.util.Date\",1592898228000],\"isDeleted\":0,\"param\":[\"java.util.HashMap\",{}],\"parentId\":1,\"name\":\"\xe7\x9c\x81\",\"value\":\"86\",\"dictCode\":\"Province\",\"hasChildren\":true}],[\"com.frx01.yygh.model.cmn.Dict\",{\"id\":10000,\"createTime\":[\"java.util.Date\",\"2019-06-10 02:43:32\"],\"updateTime\":[\"java.util.Date\",1592191604000],\"isDeleted\":0,\"param\":[\"java.util.HashMap\",{}],\"parentId\":1,\"name\":\"\xe5\x8c\xbb\xe9\x99\xa2\xe7\xad\x89\xe7\xba\xa7\",\"value\":null,\"dictCode\":\"Hostype\",\"hasChildren\":true}],[\"com.frx01.yygh.model.cmn.Dict\",{\"id\":20000,\"createTime\":[\"java.util.Date\",\"2019-06-10 02:43:32\"],\"updateTime\":[\"java.util.Date\",1592290377000],\"isDeleted\":0,\"param\":[\"java.util.HashMap\",{}],\"parentId\":1,\"name\":\"\xe8\xaf\x81\xe4\xbb\xb6\xe7\xb1\xbb\xe5\x9e\x8b\",\"value\":\"20000\",\"dictCode\":\"CertificatesType\",\"hasChildren\":true}],[\"com.frx01.yygh.model.cmn.Dict\",{\"id\":30000,\"createTime\":[\"java.util.Date\",\"2019-06-10 02:43:32\"],\"updateTime\":[\"java.util.Date\",1591608399000],\"isDeleted\":0,\"param\":[\"java.util.HashMap\",{}],\"parentId\":1,\"name\":\"\xe5\xad\xa6\xe5\x8e\x86\",\"value\":\"30000\",\"dictCode\":\"Education\",\"hasChildren\":true}],[\"com.frx01.yygh.model.cmn.Dict\",{\"id\":99100,\"createTime\":[\"java.util.Date\",\"2019-06-11 02:39:11\"],\"updateTime\":[\"java.util.Date\",1591608399000],\"isDeleted\":0,\"param\":[\"java.util.HashMap\",{}],\"parentId\":1,\"name\":\"\xe6\xb0\x91\xe6\x97\x8f\",\"value\":\"99100\",\"dictCode\":\"Nation\",\"hasChildren\":true}]]]"
```

## 配置Nginx

由于我们后端有很多服务模块，每个模块都有对应的访问路径与端口，为了提供统一的api接口，所以使用nginx作为反向代理服务器；

反向代理，其实客户端对代理是无感知的，因为客户端不需要任何配置就可以访问，我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址

1. 下载安装Nginx(Windows版)
2. 配置nginx

```nginx
server {
        listen       9001;
        server_name  localhost;

	location ~ /hosp/ {           
	    proxy_pass http://localhost:8201;
	}
	location ~ /cmn/ {           
	    proxy_pass http://localhost:8202;
	}
}
```

1，调整/config/dev.env.js中的BASE_API

BASE_API: 'http://localhost:9001'

说明：

1、后续我们会使用Spring Cloud Gateway网关，将替代nginx网关

