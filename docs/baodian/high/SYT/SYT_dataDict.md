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

