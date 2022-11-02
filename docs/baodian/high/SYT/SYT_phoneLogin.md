---
title: 尚医通-手机登录
date: 2022-11-02 23:09:57
permalink: /high/SYT/SYT_phoneLogin
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-手机登录

[[toc]]

## 登录效果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221102/image.38u79gt33ag0.webp)

## 登录需求

1. 登录采取弹出层的形式
2. 登录方式
   1. 手机号码+手机验证码
   2. 微信扫描
3. 无注册界面，第一次登录根据手机号判断系统是否存在，如果不存在则自动注册
4. 微信扫描登录成功必须绑定手机号码，即：第一次扫描成功后绑定手机号，以后登录扫描直接登录成功
5. 网关统一判断登录状态，如何需要登录，页面弹出登录层

## 登录

### 搭建 service-user 模块

1. 修改pom.xml配置文件

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

    <artifactId>service_user</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>service-cmn-client</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>

</project>
```

2. 添加配置文件application.properties

```properties
# 服务端口
server.port=8203
# 服务名
spring.application.name=service-user

# 环境设置：dev、test、prod
spring.profiles.active=dev

# mysql数据库连接
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/yygh_user?characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=hsp

#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8

# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848

#配置mapper xml文件的路径
mybatis-plus.mapper-locations=classpath:com/atguigu/yygh/user/mapper/xml/*.xml
```

### 启动类

```java
@SpringBootApplication
@ComponentScan(basePackages = "com.frx01")
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.frx01")
public class ServiceUser {
    public static void main(String[] args) {
        SpringApplication.run(ServiceUser.class,args);
    }
}
```

### 配置网关

```properties
#设置路由id
spring.cloud.gateway.routes[2].id=service-user
#设置路由的uri
spring.cloud.gateway.routes[2].uri=lb://service-user
#设置路由断言,代理servicerId为auth-service的/auth/路径
spring.cloud.gateway.routes[2].predicates= Path=/*/user/**
```

### 添加Mapper

1. 添加com.frx01.yygh.=UserInfoMapper

```java
public interface UserInfoMapper extends BaseMapper<UserInfo> {
}
```

2. 添加UserInfoMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.frx01.yygh.mapper.UserInfoMapper">
</mapper>
```

### 添加service接口及实现类

1. 添加com.frx01.yygh.user.service.UserInfoService接口

```java
public interface UserInfoService extends IService<UserInfo> {
}
```

2. 添加com.frx01.yygh.service.impl.UserInfoServiceImpl接口实现

```java
@Service
public class UserInfoServiceImpl extends ServiceImpl<UserInfoMapper, UserInfo> implements UserInfoService {
}
```

### 添加controller

```java
@RestController
@RequestMapping("/api/user")
public class UserInfoApiController {

    @Autowired
    private UserInfoService userInfoService;

}
```

### 添加配置类

```java
@MapperScan(basePackages = "com.frx01.yygh.mapper")
@Configuration
public class UserConfig {
}
```

## 登录 api 接口

### 添加 service 接口与实现

1. 在UserInfoService类添加接口

```java
     @Override
    public Map<String, Object> loginUser(LoginVo loginVo) {

        //1.从LoginVo获取到输入的手机号和验证码
        String phone = loginVo.getPhone();
        String code = loginVo.getCode();

        //2.判断手机号和验证码是否为空
        if(StringUtils.isEmpty(phone)||!StringUtils.isEmpty(code)){
            throw  new YyghException(ResultCodeEnum.PARAM_ERROR);
        }

        //TODO 3.判断收验证码和输入的验证码是否一致

        //4.判断是否是第一次登录:根据手机号查询表，如果不存在，就是第一次登录
        QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("phone",phone);
        UserInfo userInfo = baseMapper.selectOne(queryWrapper);
        if(StringUtils.isEmpty(userInfo)) { //第一次使用手机号登录
            //添加信息到数据库中
            userInfo = new UserInfo();
            userInfo.setName("");
            userInfo.setPhone(phone);
            userInfo.setStatus(1);
            baseMapper.insert(userInfo);
        }

        //5.不是第一次，直接登录
        if(userInfo.getStatus()==0){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }

        //6.返回登录信息，返回登录用户名，返回token信息
        HashMap<String, Object> map = new HashMap<>();
        String name = userInfo.getName();
        if(!StringUtils.isEmpty(name)){
            name = userInfo.getNickName();
        }
        map.put("name",name);
        //TODO token的生成
        map.put("token",null);
        return map;
    }
```

说明：

1. 验证码先注释，后续校验
2. 登录成功生成token，后续讲解

