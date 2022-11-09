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

### 就诊人管理

 ### 需求分析

预约下单需要选择就诊人，因此我们要实现就诊人管理，前端就诊人管理其实就是要实现一个完整的增删改查

### api 接口

#### 引入依赖

```xml
<dependencies>
    <dependency>
        <groupId>com.frx01</groupId>
        <artifactId>service_cmn_client</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </dependency>
</dependencies>
```

#### 添加 Mapper

添加com.frx01.user.mapper.PatientMapper

```java
public interface PatientMapper extends BaseMapper<Patient> {
}
```

#### 添加 service 接口及实现类

1. 添加PatientService接口

```java
public interface PatientService extends IService<Patient> {

    //创建就诊人的信息
    List<Patient> findAllUserId(Long userId);

    //根据id就诊人信息
    Patient getPatientId(Long id);
}
```

2. 添加接口实现类

```java
@Service
public class PatientServiceImpl extends ServiceImpl<PatientMapper,Patient> implements PatientService {

    @Autowired
    private DictFeignClient dictFeignClient;

    //获取就诊人方法
    @Override
    public List<Patient> findAllUserId(Long userId) {
        //根据userid查询所有就诊人信息列表
        QueryWrapper<Patient> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId",userId);
        List<Patient> patientList = baseMapper.selectList(queryWrapper);
        //通过远程调用，的到编码相关内容，查询数据字典表内容
        patientList.stream().forEach(item -> {
            //其他参数的封装
            this.packPatient(item);
        });
        return patientList;
    }

    //根据id就诊人信息
    @Override
    public Patient getPatientId(Long id) {
        Patient patient = baseMapper.selectById(id);
        return this.packPatient(patient);
    }

    //Patient对象里面其他参数的封装
    private Patient packPatient(Patient patient) {
        //根据证件编码，获取证件的具体值
        String certificatesTypeString =
                dictFeignClient.getName(DictEnum.CERTIFICATES_TYPE.getDictCode(), patient.getCertificatesType());
        //联系人证件类型
        String contactsCertificatesTypeString =
                dictFeignClient.getName(DictEnum.CERTIFICATES_TYPE.getDictCode(),patient.getContactsCertificatesType());
        //省
        String provinceString = dictFeignClient.getName(patient.getProvinceCode());
        //市
        String cityString = dictFeignClient.getName(patient.getCityCode());
        //区
        String districtString = dictFeignClient.getName(patient.getDistrictCode());
        patient.getParam().put("certificatesTypeString", certificatesTypeString);
        patient.getParam().put("contactsCertificatesTypeString", contactsCertificatesTypeString);
        patient.getParam().put("provinceString", provinceString);
        patient.getParam().put("cityString", cityString);
        patient.getParam().put("districtString", districtString);
        patient.getParam().put("fullAddress", provinceString + cityString + districtString + patient.getAddress());

        return patient;
    }
}
```

#### 添加 Controller

```java
@RestController
@RequestMapping("/api/user/patient")
public class PatientApiController {

    @Autowired
    private PatientService patientService;

    //获取就诊人的接口
    @GetMapping("/auth/findAll")
    public Result findAll(HttpServletRequest request){
        //获取当前登录用户id
        Long userId = AuthContextHolder.getUserId(request);
        List<Patient> list = patientService.findAllUserId(userId);
        return Result.ok(list);
    }

    //添加就诊人
    @PostMapping("/auth/save")
    public Result savePatient(@RequestBody Patient patient,HttpServletRequest request){
        //获取当前登录用户的id
        Long userId = AuthContextHolder.getUserId(request);
        patient.setUserId(userId);
        patientService.save(patient);
        return Result.ok();
    }

    //根据id获取就诊人的信息
    @GetMapping("/auth/get/{id}")
    public Result getPatient(@PathVariable Long id){
        Patient patient = patientService.getPatientId(id);
        return Result.ok(patient);
    }

    //修改就诊人
    @PostMapping("/auth/update")
    public Result updatePatient(@RequestBody Patient patient){
        patientService.updateById(patient);
        return Result.ok();
    }

    //删除就诊人的信息
    @DeleteMapping("/auth/remove")
    public Result removePatient(@PathVariable Long id){
        patientService.removeById(id);
        return Result.ok();
    }
}
```

+ 前端测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221108/image.1o2du7gg70ps.webp)

+ 数据库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221108/image.13zqoh4afws.webp)

+ 查看就诊人信息

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221108/image.6f1dan2mvtg0.webp)

## 平台用户管理

前面我们做了用户登录、用户认证与就诊人，现在我们需要把这些信息在我们的平台管理系统做一个统一管理

操作模块︰serxice-user

### 用户列表

### 添加 mapper

1. 在UserInfoService添加接口

```java
    //用户列表接口（条件查询带分页）
    IPage<UserInfo> selectPage(Page<UserInfo> userInfoPage, UserInfoQueryVo userInfoQueryVo);
```

2. 在UserInfoServiceImpl类添加实现

```java
    //用户列表接口（条件查询带分页）
    @Override
    public IPage<UserInfo> selectPage(Page<UserInfo> userInfoPage, UserInfoQueryVo userInfoQueryVo) {
        //UserInfoQueryVo获取条件值
        String name = userInfoQueryVo.getKeyword();//用户的名称
        Integer status = userInfoQueryVo.getStatus();//用户状态
        Integer authStatus = userInfoQueryVo.getAuthStatus();//认证转态
        String createTimeBegin = userInfoQueryVo.getCreateTimeBegin();//开始时间
        String createTimeEnd = userInfoQueryVo.getCreateTimeEnd();//结束时间
        //对条件值进行非空的判断
        QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
        if(!StringUtils.isEmpty(name)){
            queryWrapper.like("name",name);
        }
        if(!StringUtils.isEmpty(status)){
            queryWrapper.eq("status",status);
        }
        if(!StringUtils.isEmpty(authStatus)){
            queryWrapper.eq("auth_status",authStatus);
        }
        if(!StringUtils.isEmpty(createTimeBegin)){
            queryWrapper.ge("create_time",createTimeBegin);
        }
        if(!StringUtils.isEmpty(createTimeEnd)){
            queryWrapper.le("create_time",createTimeEnd);
        }
        //调用mapper的方法
        Page<UserInfo> pages = baseMapper.selectPage(userInfoPage, queryWrapper);
        //编号变成对应的值封装
        pages.getRecords().stream().forEach(item -> {
            this.packageUserInfo(item);
        });
        return pages;
    }

    //编号变成对应的值的封装
    private UserInfo packageUserInfo(UserInfo userInfo) {
        //处理认证状态的编码
        userInfo.getParam().put("authStatusString",AuthStatusEnum.getStatusNameByStatus(userInfo.getAuthStatus()));
        //处理用户状态 0 1
        String statusString = userInfo.getStatus().intValue() == 0 ? "锁定" : "正常";
        userInfo.getParam().put("statusString",statusString);
        return userInfo;

    }
```

### 添加 Controller 接口

添加UserController类

```java
@RestController
@RequestMapping("/admin/user")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    //用户列表接口（条件查询带分页）
    @GetMapping("/{page}/{limit}")
    public Result list(@PathVariable Long page,
                       @PathVariable Long limit,
                       UserInfoQueryVo userInfoQueryVo){
        Page<UserInfo> userInfoPage = new Page<>(page,limit);
        IPage<UserInfo> pageModule = userInfoService.selectPage(userInfoPage,userInfoQueryVo);
        return Result.ok(pageModule);

    }
}
```

+ 前端访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221109/image.6aeyquad0dg0.webp)

## 锁定

### 添加 service 接口与实现

1. 在UserInfoService类添加接口

```java
    /**
     * desc:用户锁定
     * @param userId
     * @param status 0：锁定 1：正常
     */
    void lock(Long userId,Integer status);
```

2. 在UserInfoServiceImpl类添加实现

```java
    //用户锁定
    @Override
    public void lock(Long userId, Integer status) {
        if(status.intValue()==0||status.intValue()==1){
            UserInfo userInfo = baseMapper.selectById(userId);
            userInfo.setStatus(status);
            baseMapper.updateById(userInfo);
        }
    }
```

### 添加 Controller 接口

```java
    //用户锁定
    @GetMapping("/lock/{userId}/{status}")
    public Result lock(@PathVariable Long userId,@PathVariable Integer status){
        userInfoService.lock(userId,status);
        return Result.ok();
    }
```

+ 测试锁定用户

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221109/image.3mp7tno8k440.webp)

## 详情

### 添加 service 接口与实现

1. 在UserInfoService类添加接口

```java
    /**
     * 根据用户的Id获取用户的详情信息
     * @param userId
     * @return
     */
    Map<String, Object> show(Long userId);
```

2. 在 UserInfoServiceImpl类添加实现

```java
    //用户详情
    @Override
    public Map<String, Object> show(Long userId) {

        Map<String, Object> map = new HashMap<>();

        //根据userId查询用户的基本信息
        UserInfo userInfo = this.packageUserInfo(baseMapper.selectById(userId));
        map.put("userInfo",userInfo);
        //根据userid查询就诊人的信息
        List<Patient> patientList = patientService.findAllUserId(userId);
        map.put("patientList",patientList);
        return map;
    }
```

### 添加 Controller 接口

```java
    //用户详情
    @GetMapping("/show/{userId}")
    public Result show(@PathVariable Long userId){
        Map<String,Object> map = userInfoService.show(userId);
        return Result.ok(map);
    }
```

+ 前端访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221109/image.5rjrdjrq7m40.webp)

## 用户认证审批功能

### 添加 service 接口与实现

1. 在UserInfoService类添加接口

```java
    /**
     * 认证审批
     * @param userId
     * @param authStatus
     */
    void approval(Long userId, Integer authStatus);
```

2. 在 UserInfoServiceImpl类添加实现

```java
    //认证审批 2代表审核通过 -1代表审核不通过
    @Override
    public void approval(Long userId, Integer authStatus) {
        if(authStatus.intValue()==2||authStatus.intValue()==-1){
            UserInfo userInfo = baseMapper.selectById(userId);
            userInfo.setStatus(authStatus);
            baseMapper.updateById(userInfo);
        }
    }
```

### 添加 Controller 接口

```java
    //认证审批接口
    @GetMapping("/approval/{userId}/{authStatus}")
    public Result approval(@PathVariable Long userId,@PathVariable Integer authStatus){
        userInfoService.approval(userId,authStatus);
        return Result.ok();
    }
```

+ 前端访问测试

![1668008829184](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\1668008829184.png)

+ 点击通过

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221109/image.4esxnq1jzva0.webp)

