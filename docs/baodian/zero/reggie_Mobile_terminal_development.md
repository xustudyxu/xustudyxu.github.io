---
title: 瑞吉外卖-移动端开发
date: 2022-05-14 22:19:07
permalink: /pages/684cf3/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-移动端开发

[[toc]]

## 短信发送

### 短信发送介绍

目前市面上有很多第三方提供的短信服务，这些第三方短信服务会和各个运营商（移动、联通、电信）对接，我们只需要注册成为会员并且按照提供的开发文档进行调用就可以发送短信。需要说明的是，这些短信服务一般都是收费服务。

常用短信服务：

+ 阿里云
+ 华为云
+ 腾讯云
+ 京东
+ 梦网
+ 乐信

### 腾讯云短信服务-介绍

腾讯云短信（Short Message Service，SMS）可为广大企业级用户提供稳定可靠，安全合规的短信触达服务。用户可快速接入，调用 API / SDK 或者通过控制台即可发送，支持发送验证码、通知类短信和营销短信。国内验证短信秒级触达，99%到达率；国际/港澳台短信覆盖全球200+国家/地区，全球多服务站点，稳定可靠。

应用场景:

+ 验证码
+ 短信通知
+ 推广短信

![OcbcIU.png](https://s1.ax1x.com/2022/05/14/OcbcIU.png)

### 腾讯云短信服务-注册账号

+ 腾讯云官网:https://cloud.tencent.com/
+ 点击官网页面注册按钮，跳转到如下注册页面：

![OcHxET.png](https://s1.ax1x.com/2022/05/14/OcHxET.png)

### 腾讯云短信服务-创建签名

+ 搜索产品中的短信服务

> 创建签名，自用必须有网站、APP、公众号、小程序等

![OcbQxA.png](https://s1.ax1x.com/2022/05/14/OcbQxA.png)

> 待审核

### 腾讯云短信服务-创建正文模板

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.3r0aq6q44bg0.webp)

### 腾讯云短信服务-发送短信

![XuYuWV.png](https://s1.ax1x.com/2022/05/28/XuYuWV.png)

## 手机验证码登录

### 需求分析

为了方便用户登录，移动端通常都会提供通过手机验证码登录的功能。

手机验证码登录的优点：

+ 方便快捷，无需注册，直接登录。
+ 使用短信验证码作为登录凭证，无需记忆密码
+ 安全

登录流程：

输入手机号>获取验证码>输入验证码>点击登录>登陆成功

注意：通过手机验证码登录，手机号是区分不同用户的标识。

### 数据模型

通过手机验证码登录时，涉及到的表为user表，即用户表。结构如下:

![XlvWJx.png](https://s1.ax1x.com/2022/05/30/XlvWJx.png)

### 代码开发

#### 梳理交互过程

在开发代码之前，需要梳理一下登录时前端页面和服务端的交互过程:

1. 在登录页面(front/page/login.html)输入手机号，点击【获取验证码】按钮，页面发送ajax请求，在服务端调用短信服务API给指定手机号发送验证码短信
2. 在登录页面输入验证码，点击【登录】按钮，发送ajax请求，在服务端处理登录请求

开发手机验证码登录功能，其实就是在服务端编写代码去处理前端页面发送的这2次请求即可。

#### 准备工作

在开发业务之前，先将需要用到的类和接口基本结构创建好：

+ 实体类User

```java
/**
 * 用户信息
 */
@Data
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    //姓名
    private String name;
    
    //手机号
    private String phone;
    
    //性别 0 女 1 男
    private String sex;

    //身份证号
    private String idNumber;

    //头像
    private String avatar;

    //状态 0:禁用，1:正常
    private Integer status;
}
```

+ Mapper接口UserMapper

```java
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
```

+ 业务层接口UserService

```java
public interface UserService extends IService<User> {
}
```

+ 业务层实现类UserServicelmpl

```java
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
```

+ 控制层UserController

```java
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;
}
```

#### 修改LoginCheckFilter

前面我们已经完成了LoginCheckFilter过滤器的开发，此过滤器用于检查用户的登录状态。我们在进行手机验证码登录时，发送的请求需要在此过滤器处理时直接放行。

```java
        //1.1定义不需要处理的请求路径
        String[] urls = new String[]{
                "/employee/login",//登录 放行
                "/employee/logout",
                "/backend/**",  //后端静态资源
                "/front/**",     //前端静态资源
                "/common/**",
                "/user/sendMsg",//移动端发送短息
                "/user/login"   //移动端登录
        };
```

在LoginCheckFilter过滤器中扩展逻辑，判断移动端用户登录状态:

```java
        //4-2.判断登录状态，如果已登录，则直接放行
        if(request.getSession().getAttribute("user")!=null){
            log.info("用户已登录，用户id为；{}",request.getSession().getAttribute("user"));

            //获取Id
            Long userId= (Long) request.getSession().getAttribute("user");
            BaseContext.setCurrentId(userId);

            filterChain.doFilter(request,response);
            return;
        }
```

> 因为手机号涉及到个人隐私问题，我并没有真正的发送短信，而是生成四位随机验证码，打印输出到控制台，偷偷的看一下

+ 编写处理器

```java
    /**
     * 发送手机短信验证码
     * @param user
     * @param session
     * @return
     */
    @PostMapping("/sendMsg")
    public R<String> sendMsg(@RequestBody User user, HttpSession session){
        //获取手机号
        String phone=user.getPhone();

        if(StringUtils.isNotEmpty(phone)){
            //生成随机四位验证码
            String code = ValidateCodeUtils.generateValidateCode(4).toString();
            log.info("code={}",code);

            //需要将生成的验证码保存到Session
            session.setAttribute(phone,code);

            return R.success("手机验证码短信发送成功");

        }

        return R.error("短信发送失败");
    }
```

+ 编写处理器

```java
    /**
     * 移动端用户登录
     * @param map
     * @param session
     */
    @PostMapping("/login")
    public R<User> login(@RequestBody Map map,HttpSession session){

        log.info(map.toString());

        //获取手机号
        String phone = map.get("phone").toString();

        //获取验证码
        String code = map.get("code").toString();

        //从Session中获取保存的验证码
        Object codeInSession = session.getAttribute(phone);

        //进行验证码的比对(页面提交的验证码和Session中保存的验证码比对)
        if(codeInSession!=null&&codeInSession.equals(code)) {
            //判断当前手机号对应的用户是否为新用户，如果是新用户就自动完成注册
            LambdaQueryWrapper<User> queryWrapper=new LambdaQueryWrapper<>();
            queryWrapper.eq(User::getPhone,phone);
            User user = userService.getOne(queryWrapper);
            if(user==null){
                //判断当前手机号对应的用户是否为新用户，如果是新用户就自动完成注册
                user=new User();
                user.setPhone(phone);
                user.setStatus(1);
                userService.save(user);
            }
            session.setAttribute("user",user.getId());
            return R.success(user);
        }

        return R.error("登录失败");
    }
```

### 功能测试

+ 移动端

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220601/image.1porudi2g4qo.webp)

+ 数据库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220601/image.5j5vb3tkeiw0.webp)

