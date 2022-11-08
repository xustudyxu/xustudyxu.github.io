---
title: 尚医通- 阿里云OSS、用户认证与就诊人
date: 2022-11-07 21:59:30
permalink: /high/SYT/SYT_SYT_ali_oos
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通- 阿里云OSS、用户认证与就诊人

[[toc]]

## 阿里云 oss

用户认证需要上传证件图片、首页轮播也需要上传图片，因此我们要做文件服务，阿里云oss是一个很好的分布式文件服务系统，所以我们只需要集成阿里云oss即可。

### 开通“对象存储OSS”服务

1. 申请阿里云账号
2. 实名认证
3. 开通“对象存储OSS”服务
4. 进入管理控制台

#### 创建 Bucket

选择：低频存储、公共读、不开通

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221107/image.2jj0kjwjl3o0.webp)

#### 上传默认头像

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221107/image.70vsuii4lug0.webp)

### 如何使用

+ [文档地址](https://help.aliyun.com/document_detail/32009.html)

## 文件服务实现

### 搭建 service-oss 模块

#### 修改配置

1. 修改 pom.xml，引入阿里云 oss 依赖

```xml
<dependencies>
    <!-- 阿里云oss依赖 -->
    <dependency>
        <groupId>com.aliyun.oss</groupId>
        <artifactId>aliyun-sdk-oss</artifactId>
    </dependency>

    <!-- 日期工具栏依赖 -->
    <dependency>
        <groupId>joda-time</groupId>
        <artifactId>joda-time</artifactId>
    </dependency>
</dependencies>
```

2. 添加配置文件 application.properties

```yaml
# 服务端口
server.port=8205
# 服务名
spring.application.name=service-oss

#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8

# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848

aliyun.oss.endpoint=oss-cn-beijing.aliyuncs.com
aliyun.oss.accessKeyId=LTAI5tPcTiq8WZ2q********
aliyun.oss.secret=JlUoZaupyMCZL1GCMMWNAEN****
aliyun.oss.bucket=gili-file-oos
```

#### 启动类

```java
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
@EnableDiscoveryClient
@ComponentScan(basePackages = {"com.frx01"})
public class ServiceOssApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceOssApplication.class, args);
    }

}
```

#### 配置网关

```yaml
#设置路由id
spring.cloud.gateway.routes[5].id=service-oss
#设置路由的uri
spring.cloud.gateway.routes[5].uri=lb://service-oss
#设置路由断言,代理servicerId为auth-service的/auth/路径
spring.cloud.gateway.routes[5].predicates= Path=/*/oss/**
```

### 测试 SDK

```java
public class OssTest {
    public static void main(String[] args) {
        // yourEndpoint填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。
        String endpoint = "https://oss-cn-beijing.aliyuncs.com";
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        String accessKeyId = "LTAI5tPcTiq8WZ2qzisnQ***";
        String accessKeySecret = "JlUoZaupyMCZL1GCMMWNAENjHss***";
        String bucketName = "yygh-testoss43";

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 创建存储空间
        ossClient.createBucket(bucketName);

        // 关闭OSSClient。
        ossClient.shutdown();
    }
}
```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221107/image.2gn1d2vleao0.webp)

#### 封装 service 接口

1. 添加接口

```java
public interface FileService {

    //获取上传的文件
    String uploadFile(MultipartFile file);
}
```

2. 创建配置类

```java
@Component
public class ConstantPropertiesUtils implements InitializingBean {

    @Value("${aliyun.oss.endpoint}")
    private String endpoint;

    @Value("${aliyun.oss.accessKeyId}")
    private String accessKeyId;

    @Value("${aliyun.oss.secret}")
    private String secret;

    @Value("${aliyun.oss.bucket}")
    private String bucket;

    public static String EDNPOINT;
    public static String ACCESS_KEY_ID;
    public static String SECRECT;
    public static String BUCKET;

    @Override
    public void afterPropertiesSet() throws Exception {
        EDNPOINT=endpoint;
        ACCESS_KEY_ID=accessKeyId;
        SECRECT=secret;
        BUCKET=bucket;
    }

}
```

3. 创建接口类实现类

```java
@Service
public class FileServiceImpl implements FileService {


    @Override
    public String uploadFile(MultipartFile file) {

        // Endpoint以华东1（杭州）为例，其它Region请按实际情况填写。
        String endpoint = ConstantPropertiesUtils.EDNPOINT;
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        String accessKeyId = ConstantPropertiesUtils.ACCESS_KEY_ID;
        String accessKeySecret = ConstantPropertiesUtils.SECRECT;
        // 填写Bucket名称，例如examplebucket。
        String bucketName = ConstantPropertiesUtils.BUCKET;

        //上传文件流
        try {

            // 创建OSSClient实例。
            OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
            InputStream inputStream = file.getInputStream();
            String fileName = file.getOriginalFilename();
            //生成随机唯一值，使用uuid，添加文件到文件名称里面
            String uuid = UUID.randomUUID().toString().replaceAll("-","");
            fileName = uuid + fileName;

            //按照当前当前日期，创建文件夹，上传到创建的文件夹 里面
            // 2022/11/08/ 02.png
            String timeUrl = new DateTime().toString("yyyy/MM/dd");
            fileName = timeUrl + "/" + fileName;

            //调用方法实现上传
            //文件名称加路径

            ossClient.putObject(bucketName,fileName,inputStream);
            //关闭OSSClient
            ossClient.shutdown();

            //上传之后文件的路径
            //https://gili-file-oos.oss-cn-beijing.aliyuncs.com/01.jpg
            String url = "https://"+bucketName+"."+endpoint+"/"+fileName;
            //返回urL
            return url;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

#### 封装 Controller 接口

```java
@RestController
@RequestMapping("/api/oss/file")
public class FileApiController {
    
    @Autowired
    private FileService fileService;

    //上传文件到阿里云oss
    @PostMapping("/fileUpload")
    public Result fileUpload(MultipartFile file){
        //获取上传的文件
        String url = fileService.uploadFile(file);
        return Result.ok(url);
    }
    
}
```

+ 使用Swagger测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221108/image.6r9sr9dsizw0.webp)

## 用户认证

### 需求分析

用户登录成功后都要进行身份认证，认证通过后才可以预约挂号

认证过程：用户填写信息（姓名、证件类型、证件号码和证件照片）==> 平台审批

用户认证设计接口：

1. 提交认证
2. 上传证件图片
3. 获取提交认证信息

### 获取当前用户工具类

在 common-util 模块添加工具类

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/11/8  12:07
 * desc:获取当前用户信息的工具类
 */
public class AuthContextHolder {

    //获取当前用户的id
    public static Long getUserId(HttpServletRequest request){
        //从header获取到token
        String token = request.getHeader("token");
        //使用jwt从token获取userid
        Long userId = JwtHelper.getUserId(token);
        return userId;
    }

    //获取当前用户的名称
    public static String getUserName(HttpServletRequest request){
        //从header获取到token
        String token = request.getHeader("token");
        //使用jwt从token获取userName
        String userName = JwtHelper.getUserName(token);
        return userName;
    }
}
```

### api 接口

操作模块:service-api

#### 添加 service 接口以及实现

1. 在UserInfoService 类添加接口

```java
    //用户认证
    void userAuth(Long userId, UserAuthVo userAuthVo);
```

2. 在UserInfoServiceImpl添加实现方法

```java
    //用户认证
    @Override
    public void userAuth(Long userId, UserAuthVo userAuthVo) {
        //第一步根据用户id查询用户信息
        UserInfo userInfo = baseMapper.selectById(userId);

        //设置用户信息
        userInfo.setName(userAuthVo.getName());
        userInfo.setCertificatesNo(userAuthVo.getCertificatesNo());
        userInfo.setCertificatesType(userAuthVo.getCertificatesType());
        userInfo.setCertificatesUrl(userAuthVo.getCertificatesUrl());
        userInfo.setAuthStatus(AuthStatusEnum.AUTH_RUN.getStatus());
        //进行信息更新
        baseMapper.updateById(userInfo);
    }
```

#### 添加 Controller 接口

```java
    //用户认证接口
    @PostMapping("/auth/userAuth")
    public Result userAuth(@RequestBody UserAuthVo userAuthVo, HttpServletRequest request){

        //在方法中传递两个参数 第一个参数用户id,第二个参数认证数据vo对象
        userInfoService.userAuth(AuthContextHolder.getUserId(request),userAuthVo);
        return Result.ok();
    }
    
    //获取用户id信息接口
    @GetMapping("/auth/getUserInfo")
    public Result getUserInfo(HttpServletRequest request){
        Long userId = AuthContextHolder.getUserId(request);
        UserInfo userInfo = userInfoService.getById(userId);
        return Result.ok(userInfo);
    }
```

+ 测试添加实名认证

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221108/image.1nphhdr8x468.webp)

+ 查询数据库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221108/image.sp766qzoc0w.webp)

