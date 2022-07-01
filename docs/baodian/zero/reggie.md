---
title: 瑞吉外卖-介绍
date: 2022-04-26 23:41:51
permalink: /pages/6de3d6/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-介绍

[[toc]]

## 软件开发整体介绍

### 软件开发流程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.7l1ry1mxw0g0.webp)

### 角色分工

+ 项目经理：对整个项目负责，任务分配，把控进度
+ 产品经理：进行需求调研，输出需求调研文档、产品原型等
+ UI设计书：根据产品原型输出界面效果图
+ 架构师：项目整体架构设计、技术选型等
+ 开发工程师：代码实现
+ 测试工程师：编写测试用例，输出测试报告
+ 运维工程师：项目环境部署、项目上线

### 软件环境

+ 开发环境(development):开发人员在开发阶段使用的环境，一般外部用户无法访问
+ 测试环境(testing):专门给测试人员使用的环境，用于测试项目，一般外部用户无法访问
+ 生产环境(production):即线上环境，正式提供对外服务的环境

## 瑞吉外卖项目介绍

### 项目介绍

本项目（瑞吉外卖)是专门为餐饮企业(餐厅、饭店）定制的一款软件产品，包括系统管理后台和移动端应用两部分。其中系统管理后台主要提供给餐饮企业内部员工使用，可以对餐厅的菜品、套餐、订单等进行管理维护。移动端应用主要提供给消费者使用，可以在线浏览菜品、添加购物车、下单等。

本项目共分为3期进行开发:

第一期主要实现基本需求，其中移动端应用通过H5实现，用户可以通过手机浏览器访问。第二期主要针对移动端应用进行改进，使用微信小程序实现，用户使用起来更加方便。第三期主要针对系统进行优化升级，提高系统的访问性能。

+ 系统管理后台

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.2uyec76zuui0.webp)

+ 移动端

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.77n7clzkmwk0.webp)

### 产品原型展示

**产品原型**,就是一款产品成型之前的一个简单的框架，就是将页面的排版布局展现出来，使产品的初步构思有一个可视化的展示。通过原型展示，可以更加直观的了解项目的需求和提供的功能。

> 产品原型主要用于展示项目的功能，并不是最终的页面效果。

### 技术选型

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.4cwspu3w36w0.webp)

### 功能架构

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.1pwy1wt8rusg.webp)

### 角色

+ 后台系统管理员：登录后台管理系统，拥有后台系统中的所有操作权限
+ 后台系统普通员工：登录后台管理系统，对菜品、套餐、订单等进行管理
+ C端用户：登录移动端用户，可以浏览菜品、添加购物车、设置地址、在线下单等

### 项目功能

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.13lvg2jm9uww.webp)

## 开发环境搭建

### 数据库环境搭建

```sql
CREATE DATABASE reggie CHARACTER SET utf8 COLLATE utf8_bin
#创建一个使用utf8字符集 校对规则 utf8_bin 区分大小
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.2eelc0y98n8k.webp)

::: warning 注意

导入表结构，既可以使用上面的图形界面，也可以使用MySQL命令`source sql文件的绝对路径`通过命令导入表结构时，注意sql文件不要放在中文目录中

:::

#### 数据表

| 序号 | 表名          | 说明             |
| ---- | ------------- | ---------------- |
| 1    | employee      | 员工表           |
| 2    | category      | 菜品和套餐分类表 |
| 3    | dish          | 菜品表           |
| 4    | setmeal       | 套餐表           |
| 5    | setmeal_dish  | 套餐菜品关系表   |
| 6    | dish_flavor   | 菜品口味关系表   |
| 7    | user          | 用户表(C端)      |
| 8    | address_book  | 地址簿表         |
| 9    | shopping_cart | 购物车表         |
| 10   | orders        | 订单表           |
| 11   | order_detail  | 订单明细表       |

### maven项目搭建

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.7fbe8u3ik5g0.webp)

+ 配置pom.xml文件

```xml
 	<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.frx01</groupId>
    <artifactId>reggie_take_out</artifactId>
    <version>1.0-SNAPSHOT</version>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <scope>compile</scope>
        </dependency>

        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.76</version>
        </dependency>

        <dependency>
            <groupId>commons-lang</groupId>
            <artifactId>commons-lang</artifactId>
            <version>2.6</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.23</version>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.4.5</version>
            </plugin>
        </plugins>
    </build>
```

+ 配置Application.yml

```yaml
server:
  port: 8080
spring:
  application:
    name: reggie_take_out
  datasource:
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/reggie?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true
      username: root
      password: hsp
mybatis-plus:
  configuration:
    #在映射实体或者属性时，将数据库中表名和字段名中的下划线去掉，按照驼峰命名法映射
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      id-type: ASSIGN_ID
```

+ 编写主启动类

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/26  23:18
 */
@Slf4j
@SpringBootApplication
public class ReggieApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReggieApplication.class,args);
        log.info("项目启动成功...");
    }
}
```

+ 导入前后端静态资源

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.65evh4h3wz80.webp)

+ SpringBoot默认静态资源 called `/static` (or `/public` or `/resources` or `/META-INF/resources`
+ 设置静态资源访问路径

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/26  23:23
 */
@Slf4j
@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {

    /**
     * 设置静态资源映射
     * @param registry
     */
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.info("开始进行静态资源映射...");
        registry.addResourceHandler("/backend/**")//设置资源处理器(映射访问路径)
                .addResourceLocations("classpath:/backend/");//设置映射位置
        registry.addResourceHandler("/front/**")
                .addResourceLocations("classpath:/front/");
    }
}
```

## 后台系统登录功能

### 需求分析

1. 页面原型展示

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220427/image.468u9up5a1i0.webp)

2. 登录页面展示(页面位置:项目/resources/backend/page/login/login.html)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220427/image.36h13663fcu0.webp)

3. 查看

   通过浏览器调试工具(F12)，可以发现，点击登录按钮时，页面会发送请求(请求地址为http://localhost:8088/employee/login)并提交参数(username和password)

   此时报404，是因为我们的后台系统还没有响应此请求的处理器，所以我们需要创建相关类来处理登录请求

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220427/image.4z63iq175o40.webp)

4. 数据模型(employee表)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220427/image.6rid5252k1c0.webp)

### 代码开发

1. 创建实体类Employee和employee表进行映射

```java
/**
 * 员工实体类
 */
@Data
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    private String name;

    private String password;

    private String phone;

    private String sex;

    private String idNumber;//身份证号码

    private Integer status;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;

    @TableField(fill = FieldFill.INSERT)
    private Long createUser;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateUser;

}
```

2. 创建Controller、Service、Mapper

+ Mapper

```java
@Mapper
public interface EmployeeMapper extends BaseMapper<Employee> {
}
```

+ Service

```java
public interface EmployeeService extends IService<Employee> {
}
```

+ Impl

```java
@Service
public class EmployeeServiceImpl extends ServiceImpl<EmployeeMapper,Employee> implements EmployeeService{
}
```

+ Controller

```java
@Slf4j
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

}
```

3. 编写返回结果类

此类是一个通用结果类，服务端响应的所有结果最终都会包装成此种类型返回给前端页面

```java
/**
 * 通用返回结果，服务端响应的数据最终都会封装成此对象
 * @param <T>
 */
@Data
public class R<T> {

    private Integer code; //编码：1成功，0和其它数字为失败

    private String msg; //错误信息

    private T data; //数据

    private Map map = new HashMap(); //动态数据

    public static <T> R<T> success(T object) {
        R<T> r = new R<T>();
        r.data = object;
        r.code = 1;
        return r;
    }

    public static <T> R<T> error(String msg) {
        R r = new R();
        r.msg = msg;
        r.code = 0;
        return r;
    }

    public R<T> add(String key, Object value) {
        this.map.put(key, value);
        return this;
    }

}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220427/image.3w8d40vqvi40.webp)

4. 在Controller中创建登录方法

+ 处理逻辑如下:
  + 将页面提交的密码password进行md5加密处理
  + 根据页面提交的用户名username查询数据库
  + 如果没有查询到则返回登录失败结果
  + 密码比对，如果不一致则返回登录失败结果
  + 查看员工状态，如果为已禁用状态，则返回员工已禁用结果登录
  + 成功，将员工id存入Session并返回登录成功结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220427/image.s541nyod1nk.webp)

+ 编写处理器

```java
    /**
     * 员工登录
     * @param request
     * @param employee
     * @return
     */
    @PostMapping("/login")
    public R<Employee> login(HttpServletRequest request, @RequestBody Employee employee){

        //1.将页面提交的密码进行md5加密处理
        String password = employee.getPassword();
        password = DigestUtils.md5DigestAsHex(password.getBytes());

        //2.根据页面提交的用户名username查询数据库
        LambdaQueryWrapper<Employee> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Employee::getUsername,employee.getUsername());
        Employee emp = employeeService.getOne(queryWrapper);

        //3.如果没有查询到则返回登录失败结果
        if(emp==null){
            return R.error("登录失败");
        }

        //4.密码比对，如果不一致则返回登录失败结果
        if(!emp.getPassword().equals(password)){
            return R.error("登录失败");
        }

        //5.查看员工状态，如果为已禁用状态，则返回员工已禁用结果登录
        if(emp.getStatus()==0){
            return R.error("账号已禁用");
        }

        //6.登录成功，将员工id存入Session并返回登录成功结果
        request.getSession().setAttribute("employee",emp.getId());
        return R.success(emp);
    }
```

## 后台系统退出功能

### 需求分析

员工登录成功后，页面跳转到后台系统首页面(backend/index.html)，此时会显示当前登录用户的姓名:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.2zc4ydmy9uy0.webp)

如果员工需要退出系统，直接点击右侧的退出按钮即可退出系统，退出系统后页面应跳转回登录页面

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.1c4zdmatrbog.webp)

### 代码开发

用户点击页面中退出按钮，发送请求，请求地址为/employee/logout，请求方式为POST.

我们只需要在Controller中创建对应的处理方法即可，具体的处理逻辑:

1. 清理Session中的用户id
2. 返回结果

```java
    /**
     * 员工退出
     * @param request
     * @return
     */
    @PostMapping("/logout")
    public R<String> logout(HttpServletRequest request){
        //清理Session中保存的当前登录员工的id
        request.getSession().removeAttribute("employee");
        return R.success("退出成功");
    }
```

