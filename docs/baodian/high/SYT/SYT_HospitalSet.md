---
title: 尚医通-后台接口
date: 2022-10-21 00:37:15
permalink: /high/SYT/SYT_HospitalSet
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-后台接口

[[toc]]

## 医院设置需求

### 需求

医院设置主要是用来保存开通医院的一些基本信息，每个医院一条信息，保存了医院编号（平台分配，全局唯一）和接口调用相关的签名key等信息，是整个流程的第一步，只有开通了医院设置信息，才可以上传医院相关信息。

我们所开发的功能就是基于单表的一个CRUD、锁定/解锁和发送签名信息这些基本功能。

### 表结构

```sql
#
# Database "yygh_hosp"
#

CREATE DATABASE IF NOT EXISTS `yygh_hosp` CHARACTER SET utf8mb4;
USE `yygh_hosp`;

#
# Structure for table "hospital_set"
#

CREATE TABLE `hospital_set` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `hosname` VARCHAR(100) DEFAULT NULL COMMENT '医院名称',
  `hoscode` VARCHAR(30) DEFAULT NULL COMMENT '医院编号',
  `api_url` VARCHAR(100) DEFAULT NULL COMMENT 'api基础路径',
  `sign_key` VARCHAR(50) DEFAULT NULL COMMENT '签名秘钥',
  `contacts_name` VARCHAR(20) DEFAULT NULL COMMENT '联系人',
  `contacts_phone` VARCHAR(11) DEFAULT NULL COMMENT '联系人手机',
  `status` TINYINT(3) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT(3) NOT NULL DEFAULT '0' COMMENT '逻辑删除(1:已删除，0:未删除)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_hoscode` (`hoscode`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='医院设置表';
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.5v4gay33ivw0.webp)

| 字段名         | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| hosname        | 医院名称                                                     |
| hoscode        | 医院编号（平台分配，全局唯一，api接口必填信息）              |
| api_url        | 医院回调的基础url（如：预约下单，我们要调用该地址去医院下单） |
| sign_key       | 双方api接口调用的签名key，有平台生成                         |
| contacts_name  | 医院联系人姓名                                               |
| contacts_phone | 医院联系人手机                                               |
| status         | 状态（锁定/解锁）                                            |

## 医院模块开发

### 搭建医院模块service-hosp

1. 配置pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>service</artifactId>
        <groupId>com.frx01</groupId>
        <version>1.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>service_hosp</artifactId>
    <packaging>jar</packaging>
    <name>service-hosp</name>
    <description>service-hosp</description>
    <dependencies>
    </dependencies>
    <build>
        <finalName>service-hosp</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

2. 添加配置文件application.properties

```properties
# 服务端口
server.port=8201
# 服务名
spring.application.name=service-hosp

# 环境设置：dev、test、prod
spring.profiles.active=dev

# mysql数据库连接
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/yygh_hosp?characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=hsp

#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8

#配置mapper xml文件的路径
#mybatis-plus.mapper-locations=classpath:com/atguigu/yygh/mapper/xml/*.xml
mybatis-plus.mapper-locations=classpath:com/atguigu/yygh/mapper/xml/*.xml
# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848

#开启sentinel
feign.sentinel.enabled=true
#设置sentinel地址
spring.cloud.sentinel.transport.dashboard=http://127.0.0.1:8858

#mongodb地址
spring.data.mongodb.host=127.0.0.1
spring.data.mongodb.port=27017
spring.data.mongodb.database=yygh_hosp

#rabbitmq地址
spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

3. 添加启动类

```java
@SpringBootApplication
public class ServiceHospApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceHospApplication.class, args);
    }
}
```

### 引入实体类

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.5fcpjfrlh700.webp)

### 添加mapper

```java
@Mapper
public interface HospitalSetMapper extends BaseMapper<HospitalSet> {
}
```

在mapper/xml下添加HospitalSetMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.frx01.yygh.mapper.HospitalSetMapper">

</mapper>
```

### 添加service接口及实现类

1. 添加HospitalSetService接口

```java
public interface HospitalSetService extends IService<HospitalSet> {
}
```

2. 添加HospitalSetServiceImpl接口实现

```java
@Service
public class HospitalSetServiceImpl extends ServiceImpl<HospitalSetMapper, HospitalSet> implements HospitalSetService {
}
```

### 添加Controller

```java
@RestController
@RequestMapping("/admin/hosp/hospitalSet")
public class HospitalSetController {

    @Autowired
    private HospitalSetService hospitalSetService;
}
```

### 医院设置CRUD

由于com.baomidou.mybatisplus.extension.service.impl.ServiceImpl类已经默认实现 了单表的CRUD，分页查询也有默认实现，能够更加灵活和代码简洁把分页查询功能实现。

### 添加Controller方法

## Swagger2 介绍与集成

什么是swagger2

编写和维护接口文档是每个程序员的职责，根据Swagger2可以快速帮助我们编写最新的API接口文档，再也不用担心开会前仍忙于整理各种资料了，间接提升了团队开发的沟通效率。

常用注解

swagger通过注解表明该接口会生成文档，包括接口名、请求方法、参数、返回信息的等等。

 `@Api`：修饰整个类，描述Controller的作用

`@ApiOperation`：描述一个类的一个方法，或者说一个接口

`@ApiParam`：单个参数描述

`@ApiModel`：用对象来接收参数

`@ApiModelProperty`：用对象接收参数时，描述对象的一个字段

`@ApiImplicitParam`：一个请求参数

`@ApiImplicitParams`：多个请求参数

### 在项目中整合swagger2

在common模块pom.xml引入依赖

```xml
<!--swagger-->
<dependency>
	<groupId>io.springfox</groupId>
	<artifactId>springfox-swagger2</artifactId>
</dependency>
<dependency>
	<groupId>io.springfox</groupId>
	<artifactId>springfox-swagger-ui</artifactId>
</dependency>
```

说明：我们在yygh-parent中的pom.xml中添加了版本控制，这里不需要添加版本，已引入就忽略

### 添加swagger2配置类

在service-util模块添加配置类：

```java
@Configuration
@EnableSwagger2
public class Swagger2Config {
    @Bean
    public Docket webApiConfig(){
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("webApi")
                .apiInfo(webApiInfo())
                .select()
                //只显示api路径下的页面
                .paths(Predicates.and(PathSelectors.regex("/api/.*")))
                .build();
    }

    @Bean
    public Docket adminApiConfig(){
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("adminApi")
                .apiInfo(adminApiInfo())
                .select()
                //只显示admin路径下的页面
                .paths(Predicates.and(PathSelectors.regex("/admin/.*")))
                .build();
    }

    private ApiInfo webApiInfo(){
        return new ApiInfoBuilder()
                .title("网站-API文档")
                .description("本文档描述了网站微服务接口定义")
                .version("1.0")
                .contact(new Contact("atguigu", "http://atguigu.com", "493211102@qq.com"))
                .build();
    }

    private ApiInfo adminApiInfo(){
        return new ApiInfoBuilder()
                .title("后台管理系统-API文档")
                .description("本文档描述了后台管理系统微服务接口定义")
                .version("1.0")
                .contact(new Contact("atguigu", "http://atguigu.com", "49321112@qq.com"))
                .build();
    }

}
```

### 使用swagger2测试

+ 访问[http://localhost:8201/swagger-ui.html](http://localhost:8201/swagger-ui.html)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.5pfnbi022aw0.webp)

```java
@Api("医院设置管理")
@RestController
@RequestMapping("/admin/hosp/hospitalSet")
public class HospitalSetController {

    @Autowired
    private HospitalSetService hospitalSetService;

    //1.查询医院设置表里面的所有信息
    @ApiOperation(value = "获取所有医院设置的信息")
    @GetMapping("/findAll")
    public List<HospitalSet> findAllHospitalSet(){
        List<HospitalSet> list = hospitalSetService.list();
        return list;
    }

    //2.逻辑删除医院设置
    @ApiOperation(value = "逻辑删除医院设置")
    @DeleteMapping("{id}")
    public boolean removeHospitalSet(@PathVariable Long id){
        boolean flag = hospitalSetService.removeById(id);
        return flag;
    }
    
}
```

+ 测试删除

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.6z5v87ol3gc0.webp)

+ 数据库中的表变化

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.70jzhdeh89k0.webp)

## 统一返回结果定义

Result:API统一返回结果封装类

```java
/**
 * 全局统一返回结果类
 */
@Data
@ApiModel(value = "全局统一返回结果")
public class Result<T> {

    @ApiModelProperty(value = "返回码")
    private Integer code;

    @ApiModelProperty(value = "返回消息")
    private String message;

    @ApiModelProperty(value = "返回数据")
    private T data;

    public Result(){}

    protected static <T> Result<T> build(T data) {
        Result<T> result = new Result<T>();
        if (data != null)
            result.setData(data);
        return result;
    }

    public static <T> Result<T> build(T body, ResultCodeEnum resultCodeEnum) {
        Result<T> result = build(body);
        result.setCode(resultCodeEnum.getCode());
        result.setMessage(resultCodeEnum.getMessage());
        return result;
    }

    public static <T> Result<T> build(Integer code, String message) {
        Result<T> result = build(null);
        result.setCode(code);
        result.setMessage(message);
        return result;
    }

    public static<T> Result<T> ok(){
        return Result.ok(null);
    }

    /**
     * 操作成功
     * @param data
     * @param <T>
     * @return
     */
    public static<T> Result<T> ok(T data){
        Result<T> result = build(data);
        return build(data, ResultCodeEnum.SUCCESS);
    }

    public static<T> Result<T> fail(){
        return Result.fail(null);
    }

    /**
     * 操作失败
     * @param data
     * @param <T>
     * @return
     */
    public static<T> Result<T> fail(T data){
        Result<T> result = build(data);
        return build(data, ResultCodeEnum.FAIL);
    }

    public Result<T> message(String msg){
        this.setMessage(msg);
        return this;
    }

    public Result<T> code(Integer code){
        this.setCode(code);
        return this;
    }

    public boolean isOk() {
        if(this.getCode().intValue() == ResultCodeEnum.SUCCESS.getCode().intValue()) {
            return true;
        }
        return false;
    }
}
```

ResultCodeEnum:API统一返回结果状态信息

```java
/**
 * 统一返回结果状态信息类
 */
@Getter
public enum ResultCodeEnum {

    SUCCESS(200,"成功"),
    FAIL(201, "失败"),
    PARAM_ERROR( 202, "参数不正确"),
    SERVICE_ERROR(203, "服务异常"),
    DATA_ERROR(204, "数据异常"),
    DATA_UPDATE_ERROR(205, "数据版本异常"),

    LOGIN_AUTH(208, "未登陆"),
    PERMISSION(209, "没有权限"),

    CODE_ERROR(210, "验证码错误"),
//    LOGIN_MOBLE_ERROR(211, "账号不正确"),
    LOGIN_DISABLED_ERROR(212, "改用户已被禁用"),
    REGISTER_MOBLE_ERROR(213, "手机号已被使用"),
    LOGIN_AURH(214, "需要登录"),
    LOGIN_ACL(215, "没有权限"),

    URL_ENCODE_ERROR( 216, "URL编码失败"),
    ILLEGAL_CALLBACK_REQUEST_ERROR( 217, "非法回调请求"),
    FETCH_ACCESSTOKEN_FAILD( 218, "获取accessToken失败"),
    FETCH_USERINFO_ERROR( 219, "获取用户信息失败"),
    //LOGIN_ERROR( 23005, "登录失败"),

    PAY_RUN(220, "支付中"),
    CANCEL_ORDER_FAIL(225, "取消订单失败"),
    CANCEL_ORDER_NO(225, "不能取消预约"),

    HOSCODE_EXIST(230, "医院编号已经存在"),
    NUMBER_NO(240, "可预约号不足"),
    TIME_NO(250, "当前时间不可以预约"),

    SIGN_ERROR(300, "签名错误"),
    HOSPITAL_OPEN(310, "医院未开通，暂时不能访问"),
    HOSPITAL_LOCK(320, "医院被锁定，暂时不能访问"),
    ;

    private Integer code;
    private String message;

    private ResultCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
```

修改Controller

```java
@Api("医院设置管理")
@RestController
@RequestMapping("/admin/hosp/hospitalSet")
public class HospitalSetController {

    @Autowired
    private HospitalSetService hospitalSetService;

    //1.查询医院设置表里面的所有信息
    @ApiOperation(value = "获取所有医院设置的信息")
    @PostMapping("/findAll")
    public Result findAllHospitalSet(){
        List<HospitalSet> list = hospitalSetService.list();
        return Result.ok(list);
    }

    //2.逻辑删除医院设置
    @ApiOperation(value = "逻辑删除医院设置")
    @DeleteMapping("{id}")
    public Result removeHospitalSet(@PathVariable Long id){
        boolean flag = hospitalSetService.removeById(id);
        if(flag){
            return Result.ok(flag);
        }
        return Result.fail();
    }
}
```

### 添加条件查询分页接口

```java
    //3.条件分页查询
    @GetMapping("/findPage/{current}/{limit}")
    public Result findPageHospSet(@PathVariable long current,
                                  @PathVariable long limit,
                                  @RequestBody(required = false) HospitalSetQueryVo hospitalSetQueryVo){
        //创建page对象
        Page<HospitalSet> page = new Page<>(current, limit);
        //构建查询条件
        QueryWrapper<HospitalSet> queryWrapper = new QueryWrapper<>();
        String hoscode = hospitalSetQueryVo.getHoscode();//医院编号
        String hosname = hospitalSetQueryVo.getHosname();//医院名称
        if(!StringUtils.isEmpty(hosname))
            queryWrapper.like("hosname",hospitalSetQueryVo.getHosname());
        if(!StringUtils.isEmpty(hoscode))
            queryWrapper.eq("hoscode",hospitalSetQueryVo.getHoscode());
        //调用方法实现分页查询
        Page<HospitalSet> hospitalSetPage = hospitalSetService.page(page, queryWrapper);
        return Result.ok(hospitalSetPage);
    }
```

+ swagger测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221021/image.77rxi1zmlqc0.webp)

### 添加医院设置

```java
    //4.保存医院设置
    @PostMapping("saveHospitalSet")
    public Result saveHospitalSet(@RequestBody HospitalSet hospitalSet){

        //设置状态 1可用 0不可用
        hospitalSet.setStatus(1);
        //签名密钥
        Random random = new Random();
        hospitalSet.setSignKey(MD5.encrypt(System.currentTimeMillis()+""+random.nextInt(1000)));

        //调用service
        boolean save = hospitalSetService.save(hospitalSet);
        if(save)
            return Result.ok();
        return Result.fail();

    }
```

+ Swagger测试

```json
{
  "apiUrl": "http://localhost:9992",
  "contactsName": "张三",
  "contactsPhone": "123123456",
  "hoscode": "1000_01",
  "hosname": "北京人民医院",
  "id": 0,
  "isDeleted": 0
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221021/image.1cgzu5keo7ds.webp)

### 根据Id获取,修改,批量删除医院设置

```java
    //5.根据id获取医院设置
    @GetMapping("/getHospSet/{id}")
    public Result getHospSet(@PathVariable long id){
        HospitalSet hospitalSet = hospitalSetService.getById(id);
        return Result.ok(hospitalSet);
    }

    //6.修改医院信息
    @PostMapping("/updateHospitalSet")
    public Result updateHospitalSet(@RequestBody HospitalSet hospitalSet){
        hospitalSetService.updateById(hospitalSet);
        return Result.ok();

    }

    //7.批量删除医院设置
    @DeleteMapping("/batchRemove")
    public Result batchRemove(@RequestBody List<String> idList){
        hospitalSetService.removeByIds(idList);
        return Result.ok();
    }
```

经过swagger测试，正常使用

### 医院设置锁定和解锁

```java
    //8.医院设置锁定和解锁
    @PutMapping("/lockHospitalSet/{id}/{status}")
    public Result lockHospitalSet(@PathVariable Long id,
                                  @PathVariable Integer status){
        //先根据Id查询医院设置信息
        HospitalSet hospitalSet = hospitalSetService.getById(id);
        //设置状态
        hospitalSet.setStatus(status);
        //调用方法
        hospitalSetService.updateById(hospitalSet);
        return Result.ok();
    }

    //9.发送签名密钥
    @PutMapping("/sendKey/{id}")
    public Result lockHospitalSet(@PathVariable Long id){
        HospitalSet hospitalSet = hospitalSetService.getById(id);
        String signKey = hospitalSet.getSignKey();
        String hoscode = hospitalSet.getHoscode();
        //TODO 发送短信
        return Result.ok();
    }
```

## 全局异常处理

spring boot 默认情况下会映射到 /error 进行异常处理，但是提示并不十分友好，下面自定义异常处理，提供友好展示。

我们在搭建模块时在common-util模块已经添加了YyghException类，这里不做解释

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(Exception.class)
    public Result error(Exception e){
        e.printStackTrace();
        return Result.fail();
    }

    @ResponseBody
    @ExceptionHandler(YyghException.class)
    public Result error(YyghException e){
        e.printStackTrace();
        return Result.fail();
    }
}
```

手动在controller任意方法制造异常（int i = 1/0），添加GlobalExceptionHandler类与不添加这个类区别

## 日志

### 配置日志级别

日志记录器（Logger）的行为是分等级的。如下表所示：

分为：OFF、FATAL、ERROR、WARN、INFO、DEBUG、ALL

默认情况下，spring boot从控制台打印出来的日志级别只有INFO及以上级别，可以配置日志级别

\# 设置日志级别

logging.level.root=WARN

这种方式只能将日志打印在控制台上

### Logback日志

spring boot内部使用Logback作为日志实现的框架。

Logback和log4j非常相似，如果你对log4j很熟悉，那对logback很快就会得心应手。

### 配置日志

resources/logback-spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration  scan="true" scanPeriod="10 seconds">
    <!-- 日志级别从低到高分为TRACE < DEBUG < INFO < WARN < ERROR < FATAL，如果设置为WARN，则低于WARN的信息都不会输出 -->
    <!-- scan:当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true -->
    <!-- scanPeriod:设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。 -->
    <!-- debug:当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。 -->
    <contextName>logback</contextName>
    <!-- name的值是变量的名称，value的值时变量定义的值。通过定义的值会被插入到logger上下文中。定义变量后，可以使“${}”来使用变量。 -->
    <property name="log.path" value="D:/yygh_log/edu" />
    <!-- 彩色日志 -->
    <!-- 配置格式变量：CONSOLE_LOG_PATTERN 彩色日志格式 -->
    <!-- magenta:洋红 -->
    <!-- boldMagenta:粗红-->
    <!-- cyan:青色 -->
    <!-- white:白色 -->
    <!-- magenta:洋红 -->
    <property name="CONSOLE_LOG_PATTERN"
              value="%yellow(%date{yyyy-MM-dd HH:mm:ss}) |%highlight(%-5level) |%blue(%thread) |%blue(%file:%line) |%green(%logger) |%cyan(%msg%n)"/>
    <!--输出到控制台-->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--此日志appender是为开发使用，只配置最底级别，控制台输出的日志级别是大于或等于此级别的日志信息-->
        <!-- 例如：如果此处配置了INFO级别，则后面其他位置即使配置了DEBUG级别的日志，也不会被输出 -->
        <?xml version="1.0" encoding="UTF-8"?>
        <configuration  scan="true" scanPeriod="10 seconds">
            <!-- 日志级别从低到高分为TRACE < DEBUG < INFO < WARN < ERROR < FATAL，如果设置为WARN，则低于WARN的信息都不会输出 -->
            <!-- scan:当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true -->
            <!-- scanPeriod:设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。 -->
            <!-- debug:当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。 -->
            <contextName>logback</contextName>
            <!-- name的值是变量的名称，value的值时变量定义的值。通过定义的值会被插入到logger上下文中。定义变量后，可以使“${}”来使用变量。 -->
            <property name="log.path" value="D:/yygh_log/edu" />
            <!-- 彩色日志 -->
            <!-- 配置格式变量：CONSOLE_LOG_PATTERN 彩色日志格式 -->
            <!-- magenta:洋红 -->
            <!-- boldMagenta:粗红-->
            <!-- cyan:青色 -->
            <!-- white:白色 -->
            <!-- magenta:洋红 -->
            <property name="CONSOLE_LOG_PATTERN"
                      value="%yellow(%date{yyyy-MM-dd HH:mm:ss}) |%highlight(%-5level) |%blue(%thread) |%blue(%file:%line) |%green(%logger) |%cyan(%msg%n)"/>
            <!--输出到控制台-->
            <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
                <!--此日志appender是为开发使用，只配置最底级别，控制台输出的日志级别是大于或等于此级别的日志信息-->
                <!-- 例如：如果此处配置了INFO级别，则后面其他位置即使配置了DEBUG级别的日志，也不会被输出 -->
                <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
                    <level>INFO</level>
                </filter>
                <encoder>
                    <Pattern>${CONSOLE_LOG_PATTERN}</Pattern>
                    <!-- 设置字符集 -->
                    <charset>UTF-8</charset>
                </encoder>
            </appender>
            <!--输出到文件-->
            <!-- 时间滚动输出 level为 INFO 日志 -->
            <appender name="INFO_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
                <!-- 正在记录的日志文件的路径及文件名 -->
                <file>${log.path}/log_info.log</file>
                <!--日志文件输出格式-->
                <encoder>
                    <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
                    <charset>UTF-8</charset>
                </encoder>
                <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
                <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                    <!-- 每天日志归档路径以及格式 -->
                    <fileNamePattern>${log.path}/info/log-info-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
                    <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                        <maxFileSize>100MB</maxFileSize>
                    </timeBasedFileNamingAndTriggeringPolicy>
                    <!--日志文件保留天数-->
                    <maxHistory>15</maxHistory>
                </rollingPolicy>
                <!-- 此日志文件只记录info级别的 -->
                <filter class="ch.qos.logback.classic.filter.LevelFilter">
                    <level>INFO</level>
                    <onMatch>ACCEPT</onMatch>
                    <onMismatch>DENY</onMismatch>
                </filter>
            </appender>

            <!-- 时间滚动输出 level为 WARN 日志 -->
            <appender name="WARN_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
                <!-- 正在记录的日志文件的路径及文件名 -->
                <file>${log.path}/log_warn.log</file>
                <!--日志文件输出格式-->
                <encoder>
                    <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
                    <charset>UTF-8</charset> <!-- 此处设置字符集 -->
                </encoder>
                <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
                <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                    <fileNamePattern>${log.path}/warn/log-warn-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
                    <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                        <maxFileSize>100MB</maxFileSize>
                    </timeBasedFileNamingAndTriggeringPolicy>
                    <!--日志文件保留天数-->
                    <maxHistory>15</maxHistory>
                </rollingPolicy>
                <!-- 此日志文件只记录warn级别的 -->
                <filter class="ch.qos.logback.classic.filter.LevelFilter">
                    <level>warn</level>
                    <onMatch>ACCEPT</onMatch>
                    <onMismatch>DENY</onMismatch>
                </filter>
            </appender>


            <!-- 时间滚动输出 level为 ERROR 日志 -->
            <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
                <!-- 正在记录的日志文件的路径及文件名 -->
                <file>${log.path}/log_error.log</file>
                <!--日志文件输出格式-->
                <encoder>
                    <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
                    <charset>UTF-8</charset> <!-- 此处设置字符集 -->
                </encoder>
                <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
                <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                    <fileNamePattern>${log.path}/error/log-error-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
                    <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                        <maxFileSize>100MB</maxFileSize>
                    </timeBasedFileNamingAndTriggeringPolicy>
                    <!--日志文件保留天数-->
                    <maxHistory>15</maxHistory>
                </rollingPolicy>
                <!-- 此日志文件只记录ERROR级别的 -->
                <filter class="ch.qos.logback.classic.filter.LevelFilter">
                    <level>ERROR</level>
                    <onMatch>ACCEPT</onMatch>
                    <onMismatch>DENY</onMismatch>
                </filter>
            </appender>

            <!--
                <logger>用来设置某一个包或者具体的某一个类的日志打印级别、以及指定<appender>。
                <logger>仅有一个name属性，
                一个可选的level和一个可选的addtivity属性。
                name:用来指定受此logger约束的某一个包或者具体的某一个类。
                level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，
                      如果未设置此属性，那么当前logger将会继承上级的级别。
            -->
            <!--
                使用mybatis的时候，sql语句是debug下才会打印，而这里我们只配置了info，所以想要查看sql语句的话，有以下两种操作：
                第一种把<root level="INFO">改成<root level="DEBUG">这样就会打印sql，不过这样日志那边会出现很多其他消息
                第二种就是单独给mapper下目录配置DEBUG模式，代码如下，这样配置sql语句会打印，其他还是正常DEBUG级别：
             -->
            <!--开发环境:打印控制台-->
            <springProfile name="dev">
                <!--可以输出项目中的debug日志，包括mybatis的sql日志-->
                <logger name="com.guli" level="INFO" />

                <!--
                    root节点是必选节点，用来指定最基础的日志输出级别，只有一个level属性
                    level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，默认是DEBUG
                    可以包含零个或多个appender元素。
                -->
                <root level="INFO">
                    <appender-ref ref="CONSOLE" />
                    <appender-ref ref="INFO_FILE" />
                    <appender-ref ref="WARN_FILE" />
                    <appender-ref ref="ERROR_FILE" />
                </root>
            </springProfile>


            <!--生产环境:输出到文件-->
            <springProfile name="pro">

                <root level="INFO">
                    <appender-ref ref="CONSOLE" />
                    <appender-ref ref="DEBUG_FILE" />
                    <appender-ref ref="INFO_FILE" />
                    <appender-ref ref="ERROR_FILE" />
                    <appender-ref ref="WARN_FILE" />
                </root>
            </springProfile>
        </configuration>
    </appender>
</configuration>
```

