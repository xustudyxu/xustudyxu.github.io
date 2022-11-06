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
        if(StringUtils.isEmpty(phone)||StringUtils.isEmpty(code)){
            throw  new YyghException(ResultCodeEnum.PARAM_ERROR);
        }

        //3.判断收验证码和输入的验证码是否一致
        String redisCode = redisTemplate.opsForValue().get(phone);
        if(!code.equals(redisCode)){
            throw new YyghException(ResultCodeEnum.CODE_ERROR);
        }

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

## 生成 token

### JWT 介绍

JWT工具

JWT（Json Web Token）是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准。

JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。

JWT最重要的作用就是对 token信息的**防伪**作用。

JWT的原理

一个JWT由三个部分组成：公共部分、私有部分、签名部分。最后由这三者组合进行base64编码得到JWT。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.7i5i3xvx2qo0.webp)

1. 公共部分

主要是该JWT的相关配置参数，比如签名的加密算法、格式类型、过期时间等等。

Key=ATGUIGU

2. 私有部分

用户自定义的内容，根据实际需要真正要封装的信息。

userInfo{用户的Id，用户的昵称nickName}

3. 签名部分

SaltiP: 当前服务器的Ip地址!{linux 中配置代理服务器的ip}

主要用户对JWT生成字符串的时候，进行加密{盐值}

最终组成 key+salt+userInfo -> token!

base64编码，并不是加密，只是把明文信息变成了不可见的字符串。但是其实只要用一些工具就可以把base64编码解成明文，所以不要在JWT中放入涉及私密的信息。

### 集成 JWT

1. 在common-util模块pom.xml添加依赖

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
</dependency>
```

版本已在yygh-parent父模块pom.xml添加

2. 在common-util模块编写JwtHelper类

```java
public class JwtHelper {

    //token过期时间
    private static long tokenExpiration = 24*60*60*1000;
    //token签名密钥
    private static String tokenSignKey = "123456";

    //根据字符串生成token
    public static String createToken(Long userId, String userName) {
        String token = Jwts.builder()
                .setSubject("YYGH-USER")
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpiration))
                .claim("userId", userId)
                .claim("userName", userName)
                .signWith(SignatureAlgorithm.HS512, tokenSignKey)
                .compressWith(CompressionCodecs.GZIP)
                .compact();
        return token;
    }
    //根据token得到用户Id
    public static Long getUserId(String token) {
        if(StringUtils.isEmpty(token)) return null;
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        Integer userId = (Integer)claims.get("userId");
        return userId.longValue();
    }
    //根据token字符串得到用户名称
    public static String getUserName(String token) {
        if(StringUtils.isEmpty(token)) return "";
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        return (String)claims.get("userName");
    }
    public static void main(String[] args) {
        String token = JwtHelper.createToken(1L, "55");
        System.out.println(token);
        System.out.println(JwtHelper.getUserId(token));
        System.out.println(JwtHelper.getUserName(token));
    }
}
```

+ 结果

```java
//头部信息
eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.
    //主体信息
H4sIAAAAAAAAAKtWKi5NUrJSiox099ANDXYNUtJRSq0oULIyNDMzNzUyMjIw1VEqLU4t8kwBikGYfom5qUAtpqZKtQBM6rW2PwAAAA.
    //签名hash
    hnZxc8TsPBHvPghCh0cL5XHg1eS2zxRiC1gEEOnZuNmgW97mdCq0-RQzWipKNPFYXEI2_diP3ZIBBH3oaPgAOQ
1
55

Process finished with exit code 0
```

### 完善登录 service 接口

修改UserInfoServiceImpl类登录方法

```java
@Service
public class UserInfoServiceImpl extends ServiceImpl<UserInfoMapper, UserInfo> implements UserInfoService {

    	...
        //jwt 生成 token字符串
        String token = JwtHelper.createToken(userInfo.getId(), name);
        map.put("token",token);
        return map;
    }
}
```

###  使用Swagger测试接口

测试多次，第一次注册，以后直接登录

请求参数：

```json
{
    "code":"123456",
    "phone":"15970422332"
}
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.6siayoihzng0.webp)

## 阿里云短信

### 阿里云短信介绍

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.7ktzx3qi9pk0.webp)

### 开通阿里云短信服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.1ihwtkd6yjq8.webp)

#### 添加签名管理与模板管理

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.1qutfqjz5r0g.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.5drw8uw479w0.webp)

注：审批通过后方可使用

#### 获取用户AccessKey

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.2tvstjm4k1k0.webp)

## 搭建 service-msm 模块

### 修改配置

1. 修改pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>com.aliyun</groupId>
        <artifactId>aliyun-java-sdk-core</artifactId>
    </dependency>
</dependencies>
```

2. 添加配置文件application.properties

```properties
# 服务端口
server.port=8204
# 服务名
spring.application.name=service-msm

#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8

spring.redis.host=192.168.44.165
spring.redis.port=6379
spring.redis.database= 0
spring.redis.timeout=1800000
spring.redis.lettuce.pool.max-active=20
spring.redis.lettuce.pool.max-wait=-1
#最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-idle=5
spring.redis.lettuce.pool.min-idle=0

# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
        
aliyun.sms.regionId=default
aliyun.sms.accessKeyId=LTAI5tPcTiq8WZ2qzisnabcd
aliyun.sms.secret=JlUoZaupyMCZL1GCMMWNAENjHssKgO
```

### 启动类

```java
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class) //取消数据源自动配置
@EnableDiscoveryClient
public class ServiceMsmApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceMsmApplication.class, args);
    }

}
```

### 配置网关

```properties
#设置路由id
spring.cloud.gateway.routes[3].id=service-msm
#设置路由的uri
spring.cloud.gateway.routes[3].uri=lb://service-msm
#设置路由断言,代理servicerId为auth-service的/auth/路径
spring.cloud.gateway.routes[3].predicates= Path=/*/msm/**
```

### 封装注册短信验证码接口

#### 添加配置类

```java
@Component
public class ConstantPropertiesUtils implements InitializingBean {

    @Value("${aliyun.sms.regionId}")
    private String regionId;

    @Value("${aliyun.sms.accessKeyId}")
    private String accessKeyId;

    @Value("${aliyun.sms.secret}")
    private String secret;

    public static String REGION_Id;
    public static String ACCESS_KEY_ID;
    public static String SECRECT;

    @Override
    public void afterPropertiesSet() throws Exception {
        REGION_Id=regionId;
        ACCESS_KEY_ID=accessKeyId;
        SECRECT=secret;
    }
}
```

#### 封装service接口和实现类

```java
public interface MsmService {

    //发送手机验证码
    boolean send(String phone, String code);
}
```

```java
@Service
public class MsmServiceImpl implements MsmService {


    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    //发送手机验证码
    @Override
    public boolean send(String phone, String code) {

        //判断手机号是否为null
        if(StringUtils.isEmpty(phone)){
            return false;
        }

        //判断手机验证码和输入的验证码是否一致
        String redisCode = redisTemplate.opsForValue().get(phone);
        if(code.equals(redisCode)){
            throw new YyghException(ResultCodeEnum.CODE_ERROR);
        }
        //整合阿里云
        DefaultProfile profile = DefaultProfile.
                getProfile(ConstantPropertiesUtils.REGION_Id,
                        ConstantPropertiesUtils.ACCESS_KEY_ID,
                        ConstantPropertiesUtils.SECRECT);
        IAcsClient client = new DefaultAcsClient(profile);
        CommonRequest request = new CommonRequest();
        //request.setProtocol(ProtocolType.HTTPS);
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");

        //手机号
        request.putQueryParameter("PhoneNumbers", phone);
        //签名名称
        request.putQueryParameter("SignName", "阿里云短信测试");
        //模板code
        request.putQueryParameter("TemplateCode", "SMS_154950909");
        //验证码  使用json格式   {"code":"123456"}
        Map<String,Object> param = new HashMap();
        param.put("code",code);
        request.putQueryParameter("TemplateParam", JSONObject.toJSONString(param));

        //调用方法进行短信发送
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
            return response.getHttpResponse().isSuccess();
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
        return false;
    }
}
```

#### 编写Controller

```java
@RestController
@RequestMapping("/api/msm")
public class MsmApiController {

    @Autowired
    private MsmService msmService;

    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    //发送手机验证码
    @GetMapping("/send/{phone}")
    public Result sendCode(@PathVariable String phone){
        //从redis获取验证码,如果获取到，返回ok
        //redis的key是我们的手机号
        //redis的value是我们的验证码
        String code = redisTemplate.opsForValue().get("phone");
        if(!StringUtils.isEmpty(code)){
            return Result.ok();
        }

        //如果从redis获取不到，
        // 生成验证码，通过整合短信服务进行发送
        code= RandomUtil.getSixBitRandom();
        //调用service方法实现
        System.out.println("短信验证码为:"+code);
        boolean isSend = msmService.send(phone,code);
        //生成验证码放到redis里面，设置有效时间
        if(isSend){
            redisTemplate.opsForValue().set(phone,code,2, TimeUnit.MINUTES);
            return Result.ok();
        }else {
            return Result.fail("发送短信失败");
        }

    }
}
```

+ 使用swagger测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.3zh1lb92zuc0.webp)

+ 控制台输出

```java
{"Message":"OK","RequestId":"48E20937-3A87-5177-8709-BD0E7EBE9BC3","Code":"OK","BizId":"996611767444023293^0"}
```

+ 短信截屏

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221103/image.2mj4nm398to0.webp)

+ 查看redis

```sh
127.0.0.1:6379> get 183**986812 #个人手机号
"957374"
```

## 用户认证与网管整合

思路：

1. 所有请求都会经过服务网关，服务网关对外暴露服务，在网关进行统一用户认证；
2. 既然要在网关进行用户认证，网关得知道对哪些url进行认证，所以我们得对ur制定规则
3. Api接口异步请求的，我们采取url规则匹配，如：/api/**/auth/**，如凡是满足该规则的都必须用户认证

### 调整 server-gateway 模块

#### 在服务网关添加 fillter

```java
@Component
public class AuthGlobalFilter implements GlobalFilter, Ordered {

    private AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();
        System.out.println("==="+path);

        //内部服务接口，不允许外部访问
        if(antPathMatcher.match("/**/inner/**", path)) {
            ServerHttpResponse response = exchange.getResponse();
            return out(response, ResultCodeEnum.PERMISSION);
        }

        Long userId = this.getUserId(request);
        //api接口，异步请求，校验用户必须登录
        if(antPathMatcher.match("/api/**/auth/**", path)) {
            if(StringUtils.isEmpty(userId)) {
                ServerHttpResponse response = exchange.getResponse();
                return out(response, ResultCodeEnum.LOGIN_AUTH);
            }
        }
        return chain.filter(exchange);
    }


    @Override
    public int getOrder() {
        return 0;
    }

    /**
     * api接口鉴权失败返回数据
     * @param response
     * @return
     */
    private Mono<Void> out(ServerHttpResponse response, ResultCodeEnum resultCodeEnum) {
        Result result = Result.build(null, resultCodeEnum);
        byte[] bits = JSONObject.toJSONString(result).getBytes(StandardCharsets.UTF_8);
        DataBuffer buffer = response.bufferFactory().wrap(bits);
        //指定编码，否则在浏览器中会中文乱码
        response.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
        return response.writeWith(Mono.just(buffer));
    }

    /**
     * 获取当前登录用户id
     * @param request
     * @return
     */
    private Long getUserId(ServerHttpRequest request) {
        String token = "";
        List<String> tokenList = request.getHeaders().get("token");
        if(null  != tokenList) {
            token = tokenList.get(0);
        }
        if(!StringUtils.isEmpty(token)) {
            return JwtHelper.getUserId(token);
        }
        return null;
    }

}
```

