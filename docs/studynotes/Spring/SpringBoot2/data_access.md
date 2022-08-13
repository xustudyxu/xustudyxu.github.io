---
title: 数据访问
date: 2022-04-08 20:23:52
permalink: /pages/3f7351/
categories:
  - SpringBoot2
tags:
  - SpringBoot2
---
# 数据访问

[[toc]]

## SQL

### 数据源的自动配置-**HikariDataSource**

#### 导入JDBC场景

```xml
   <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jdbc</artifactId>
        </dependency>
```

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/01.png)

数据库驱动？

为什么导入JDBC场景，官方不导入驱动？官方不知道我们接下要操作什么数据库。

数据库版本和驱动版本对应

```xml
<!-- 默认版本：<mysql.version>8.0.22</mysql.version> -->

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
<!--            <version>5.1.49</version>-->
        </dependency>
```

想要修改版本

1. 直接依赖引入具体版本（maven的就近依赖原则）
2. 重新声明版本（maven的属性的就近优先原则）

```xml
 	<properties>
        <java.version>1.8</java.version>
        <mysql.version>5.1.49</mysql.version>
    </properties>
```

#### 分析自动配置

**自动配置的类**

+ DataSourceAutoConfiguration:数据源的自动配置
  + 修改数据源相关的配置:**spring.datasource**
  + 数据库连接池的配置,是自己容器中没有DataSource才自动配置
  + 底层配置好的连接池是:**HikariDataSource**

```java
	@Configuration(proxyBeanMethods = false)
	@Conditional(PooledDataSourceCondition.class)
	@ConditionalOnMissingBean({ DataSource.class, XADataSource.class })
	@Import({ DataSourceConfiguration.Hikari.class, DataSourceConfiguration.Tomcat.class,
			DataSourceConfiguration.Dbcp2.class, DataSourceConfiguration.OracleUcp.class,
			DataSourceConfiguration.Generic.class, DataSourceJmxConfiguration.class })
	protected static class PooledDataSourceConfiguration
```

+ DataSourceTransactionManagerAutoConfiguration： 事务管理器的自动配置
+ jdbcTemplateAutoConfiguration： **JdbcTemplate的自动配置，可以来对数据库进行crud**
  + 可以修改这个配置项@ConfigurationProperties(prefix = **"spring.jdbc"**)来修改JdbcTemplate
  + @Bean@Primary    JdbcTemplate；容器中有这个组件
+ JndiDataSourceAutoConfiguration： jndi的自动配置
+ XADataSourceAutoConfiguration： 分布式事务相关的

#### 修改配置项

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/maven
    username: root
    password: hsp
    driver-class-name: com.mysql.jdbc.Driver
```

#### 测试

```java
@Slf4j
@SpringBootTest
class Boot05WebAdminApplicationTests {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {

        Long aLong = jdbcTemplate.queryForObject("select count(*) from user", Long.class);
        log.info("记录总数:{}",aLong);
    }

}
```

+ 输出

```java
...
2022-04-09 18:07:11.268  INFO 11752 --- [           main] c.f.a.Boot05WebAdminApplicationTests     : 记录总数:1
2022-04-09 18:07:11.289  INFO 11752 --- [extShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-09 18:07:11.353  INFO 11752 --- [extShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.
2022-04-09 18:07:11.354  INFO 11752 --- [extShutdownHook] o.s.s.concurrent.ThreadPoolTaskExecutor  : Shutting down ExecutorService 'applicationTaskExecutor'

Process finished with exit code 0
```

## 使用Druid数据源

### druid官方github地址

https://github.com/alibaba/druid

整合第三方技术的两种方式

+ 自定义
+ 找starter

### 自定义方式

#### 创建数据源

```xml
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.16</version>
        </dependency>
```

#### StatViewServlet

> StatViewServlet的用途包括：
>
> + 提供监控信息展示的html页面
> + 提供监控信息的JSON API

```xml
	<servlet>
		<servlet-name>DruidStatView</servlet-name>
		<servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>DruidStatView</servlet-name>
		<url-pattern>/druid/*</url-pattern>
	</servlet-mapping>
```

#### StatFilter

> 用于统计监控信息；如SQL监控、URI监控

```xml
需要给数据源中配置如下属性；可以允许多个filter，多个用，分割；如：

<property name="filters" value="stat,slf4j" />
```

系统中所有filter:

| 别名          | Filter类名                                              |
| ------------- | ------------------------------------------------------- |
| default       | com.alibaba.druid.filter.stat.StatFilter                |
| stat          | com.alibaba.druid.filter.stat.StatFilter                |
| mergeStat     | com.alibaba.druid.filter.stat.MergeStatFilter           |
| encoding      | com.alibaba.druid.filter.encoding.EncodingConvertFilter |
| log4j         | com.alibaba.druid.filter.logging.Log4jFilter            |
| log4j2        | com.alibaba.druid.filter.logging.Log4j2Filter           |
| slf4j         | com.alibaba.druid.filter.logging.Slf4jLogFilter         |
| commonlogging | com.alibaba.druid.filter.logging.CommonsLogFilter       |

**慢SQL记录配置**

```xml
<bean id="stat-filter" class="com.alibaba.druid.filter.stat.StatFilter">
    <property name="slowSqlMillis" value="10000" />
    <property name="logSlowSql" value="true" />
</bean>

使用 slowSqlMillis 定义慢SQL的时长
```

### 使用官方starter方式

#### 引入druid-starter

```xml
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.17</version>
        </dependency>
```

#### 分析自动配置

- 扩展配置项 **spring.datasource.druid**
- DruidSpringAopConfiguration.**class**,   监控SpringBean的；配置项：**spring.datasource.druid.aop-patterns**
- DruidStatViewServletConfiguration.**class**, 监控页的配置：**spring.datasource.druid.stat-view-servlet；默认开启**
-  DruidWebStatFilterConfiguration.**class**, web监控配置；**spring.datasource.druid.web-stat-filter；默认开启**
- DruidFilterConfiguration.**class**}) 所有Druid自己filter的配置

```java
    private static final String FILTER_STAT_PREFIX = "spring.datasource.druid.filter.stat";
    private static final String FILTER_CONFIG_PREFIX = "spring.datasource.druid.filter.config";
    private static final String FILTER_ENCODING_PREFIX = "spring.datasource.druid.filter.encoding";
    private static final String FILTER_SLF4J_PREFIX = "spring.datasource.druid.filter.slf4j";
    private static final String FILTER_LOG4J_PREFIX = "spring.datasource.druid.filter.log4j";
    private static final String FILTER_LOG4J2_PREFIX = "spring.datasource.druid.filter.log4j2";
    private static final String FILTER_COMMONS_LOG_PREFIX = "spring.datasource.druid.filter.commons-log";
    private static final String FILTER_WALL_PREFIX = "spring.datasource.druid.filter.wall";
```

#### 配置示例

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/maven
    username: root
    password: hsp
    driver-class-name: com.mysql.jdbc.Driver

    druid:
      filters: stat,wall               #底层开启功能，stat（sql监控），wall（防火墙）

      filter: 
        stat:                          #对上面filters里面的stat的详细配置
          slow-sql-millis: 1000
          logSlowSql: true
        wall:
          enabled: true
          config:
            drop-table-allow: false

      aop-patterns: com.frx01.admin.*  #监控SpringBean
      stat-view-servlet:               #配置监控页功能
        enabled: true
        login-username: admin
        login-password: 123456
        reset-enable: false

      web-stat-filter:                 # 监控web
        enabled: true
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'
```

SpringBoot配置示例

https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter

配置项列表[https://github.com/alibaba/druid/wiki/DruidDataSource%E9%85%8D%E7%BD%AE%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8](https://github.com/alibaba/druid/wiki/DruidDataSource配置属性列表)

## 整合MyBatis操作

https://github.com/mybatis

starter

SpringBoot官方的Starter：spring-boot-starter-*

第三方的： *-spring-boot-starter

```xml
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.4</version>
        </dependency>
```

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/02.png)

### 配置模式

+ 全局配置文件
+ SqlSessionFactory: 自动配置好了
+ SqlSession：自动配置了 **SqlSessionTemplate 组合了SqlSession**
+ @Import(**AutoConfiguredMapperScannerRegistrar**.**class**)；
+ Mapper： 只要我们写的操作MyBatis的接口标注了 **@Mapper 就会被自动扫描进来**

```java
@EnableConfigurationProperties(MybatisProperties.class) ： MyBatis配置项绑定类。
@AutoConfigureAfter({ DataSourceAutoConfiguration.class, MybatisLanguageDriverAutoConfiguration.class })
public class MybatisAutoConfiguration{}

@ConfigurationProperties(prefix = "mybatis")
public class MybatisProperties
```

可以修改配置文件中 mybatis 开始的所有；

#配置mybatis规则mybatis:

config-location: classpath:mybatis/mybatis-config.xml  

mapper-locations: classpath:mybatis/mapper/*.xml  

configuration:    

map-underscore-to-camel-case: true

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.frx01.admin.mapper.EmployeeMapper">

    <!--public Employee getEmployee(Integer id);-->
    <select id="getEmployee" resultType="com.frx01.admin.bean.Employee">
        select * from tbl_employee where id=#{id}
    </select>
</mapper>
```

Mapper接口--->绑定xml--->操作数据库

配置 **private** Configuration **configuration**; mybatis.**configuration下面的所有，就是相当于改mybatis全局配置文件中的值**

```yaml
#配置mybatis规则
mybatis:
#  config-location: classpath:mybatis/mybatis-config.xml
  mapper-locations: classpath:mybatis/mapper/*.xml
  configuration:
    map-underscore-to-camel-case: true
#可以不写全局；配置文件，所有全局配置文件的配置都放在configuration配置项中即可
```

- 导入mybatis官方starter
- 编写mapper接口。标准@Mapper注解
- 编写sql映射文件并绑定mapper接口
- 在application.yaml中指定Mapper配置文件的位置，以及指定全局配置文件的信息 （建议；**配置在mybatis.configuration**）

### 注解模式

+ 创建表并添加数据

```sql
CREATE TABLE city(
  id      INT(11) PRIMARY KEY AUTO_INCREMENT,
  `name`    VARCHAR(30),
  state   VARCHAR(30),
  country VARCHAR(30)
);	
INSERT INTO  city(`name`,state,country) VALUES('aaa','bbb','ccc')
```

+ Mapper层

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/10  17:23
 */
@Mapper
public interface CityMapper {

    @Select("select * from city where id=#{id}")
    public City getById(Long id);
}
```

+ Bean层

```java
@Data
public class City {

    private Long id;
    private String name;
    private String state;
    private String country;
}
```

+ Service层

```java
@Service
public class CityService {

    @Autowired
    CityMapper cityMapper;

    public City getById(Long id){
        return cityMapper.getById(id);
    }
}
```

+ Controller层

```java
@Controller
public class IndexController {

    @Autowired
    CityService cityService;

    @ResponseBody
    @GetMapping("/city")
    public City getCityById(@RequestParam("id") Long id){
        return cityService.getById(id);
    }
}
```

+ 测试

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/03.png)

### 混合模式

> sql语句比较复杂

+ Mapper层

```java
@Mapper
public interface CityMapper {

    @Select("select * from city where id=#{id}")
    public City getById(Long id);

    public void insert(City city);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.frx01.admin.mapper.CityMapper">
    <!--public void insert(City city);-->
    <insert id="insert" useGeneratedKeys="true" keyProperty="id">
        insert into city(`name`,`state`,`country`) values(#{name},#{state},#{country})
    </insert>
</mapper>
```

+ Controller层

```java
    @ResponseBody
	@PostMapping("/city")
    public City saveCity(City city){
        cityService.saveCity(city);
        return city;
    }
```

+ Service层

```java
  public void saveCity(City city){
        cityMapper.insert(city);
    }
```

**最佳实战：**

- 引入mybatis-starter
- **配置application.yaml中，指定mapper-location位置即可**
- 编写Mapper接口并标注@Mapper注解
- 简单方法直接注解方式
- 复杂方法编写mapper.xml进行绑定映射
- *@MapperScan("com.atguigu.admin.mapper") 简化，其他的接口就可以不用标注@Mapper注解*

