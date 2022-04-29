---
title: 瑞吉外卖
date: 2022-04-26 23:41:51
permalink: /pages/6de3d6/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖

[[toc]]

## 软件开发整体介绍

### 软件开发流程

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.1grz72p44vts.webp)

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

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.2uyec76zuui0.webp)

+ 移动端

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.77n7clzkmwk0.webp)

### 产品原型展示

**产品原型**,就是一款产品成型之前的一个简单的框架，就是将页面的排版布局展现出来，使产品的初步构思有一个可视化的展示。通过原型展示，可以更加直观的了解项目的需求和提供的功能。

> 产品原型主要用于展示项目的功能，并不是最终的页面效果。

### 技术选型

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.4cwspu3w36w0.webp)

### 功能架构

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.1pwy1wt8rusg.webp)

### 角色

+ 后台系统管理员：登录后台管理系统，拥有后台系统中的所有操作权限
+ 后台系统普通员工：登录后台管理系统，对菜品、套餐、订单等进行管理
+ C端用户：登录移动端用户，可以浏览菜品、添加购物车、设置地址、在线下单等

## 开发环境搭建

### 数据库环境搭建

```sql
CREATE DATABASE reggie CHARACTER SET utf8 COLLATE utf8_bin
#创建一个使用utf8字符集 校对规则 utf8_bin 区分大小
```

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.2eelc0y98n8k.webp)

::: warning

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

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.7fbe8u3ik5g0.webp)

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

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.65evh4h3wz80.webp)

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

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220427/image.468u9up5a1i0.webp)

2. 登录页面展示(页面位置:项目/resources/backend/page/login/login.html)

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220427/image.36h13663fcu0.webp)

3. 查看

   通过浏览器调试工具(F12)，可以发现，点击登录按钮时，页面会发送请求(请求地址为http://localhost:8088/employee/login)并提交参数(username和password)

   此时报404，是因为我们的后台系统还没有响应此请求的处理器，所以我们需要创建相关类来处理登录请求

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220427/image.4z63iq175o40.webp)

4. 数据模型(employee表)

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220427/image.6rid5252k1c0.webp)

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

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220427/image.3w8d40vqvi40.webp)

4. 在Controller中创建登录方法

+ 处理逻辑如下:
  + 将页面提交的密码password进行md5加密处理
  + 根据页面提交的用户名username查询数据库
  + 如果没有查询到则返回登录失败结果
  + 密码比对，如果不一致则返回登录失败结果
  + 查看员工状态，如果为已禁用状态，则返回员工已禁用结果登录
  + 成功，将员工id存入Session并返回登录成功结果

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220427/image.s541nyod1nk.webp)

+ 编写控制器

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

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.2zc4ydmy9uy0.webp)

如果员工需要退出系统，直接点击右侧的退出按钮即可退出系统，退出系统后页面应跳转回登录页面

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.1c4zdmatrbog.webp)

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

## 完善登录功能

### 问题分析

> 前面我们已经完成了后台系统的员工登录功能开发，但是还存在一个问题:用户如果不登录，直接访问系统首页面，照样可以正常访问。
>
> 这种设计并不合理，我们希望看到的效果应该是，只有登录成功后才可以访问系统中的页面，如果没有登录则跳转到登录页面。
>
> 那么，具体应该怎么实现呢?
>
> 答案就是使用过滤器或者拦截器，在过滤器或者拦截器中判断用户是否已经完成登录，如果没有登录则跳转到登录页面。

### 代码实现

实现步骤:

1. 创建自定义过滤器LoginCheckFilter
2. 在启动类上加入注解`@ServletComponentScan`
3. 完善过滤器的处理逻辑

过滤器具体的处理逻辑如下：

1. 获取本次请求的URL
2. 判断本次请求是否需要处理
3. 如果不需要处理，则直接放行
4. 判断登录状态，如果已登录，则直接放行
5. 如果未登录则返回未登录结果

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.7da0nnlnot4.webp)

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.h9118ipujl4.webp)

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/28  9:32
 *检查用户是否已经完成登录
 */
@WebFilter(filterName = "LoginCheckFilter",urlPatterns = "/*")
@Slf4j
public class LoginCheckFilter implements Filter {

    //路径匹配器，支持通配符
    public static final AntPathMatcher PATH_MATCHER=new AntPathMatcher();

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request=(HttpServletRequest) servletRequest;
        HttpServletResponse response=(HttpServletResponse) servletResponse;

        //1.获取本次请求的URI
        String requestURI = request.getRequestURI();
        log.info("拦截到请求:{}",requestURI);



        //1.1定义不需要处理的请求路径
        String[] urls = new String[]{
                "/employee/login",//登录 放行
                "/employee/logout",
                "/backend/**",  //后端静态资源
                "/front/**"     //前端静态资源
        };
        //2.判断本次请求是否需要处理
        boolean check = check(urls, requestURI);

        //3.如果不需要处理，则直接放行
        if(check){
            log.info("本次请求{}不需要处理",requestURI);
            filterChain.doFilter(request,response);
            return;
        }

        //4.判断登录状态，如果已登录，则直接放行
        if(request.getSession().getAttribute("employee")!=null){
            log.info("用户已登录，用户id为；{}",request.getSession().getAttribute("employee"));
            filterChain.doFilter(request,response);
            return;
        }

        log.info("用户未登录");
        //5.如果未登录则返回未登录结果，通过输出流方式向客户端页面响应数据
        response.getWriter().write(JSON.toJSONString(R.error("NOTLOGIN")));
        return;
    }

    /**
     * 路径匹配，检查本次请求是否需要放行
     * @param urls
     * @param requestURI
     * @return
     */
    public boolean check(String[] urls,String requestURI){
        for (String url : urls) {
            boolean match = PATH_MATCHER.match(url, requestURI);
            if(match){
                return true;
            }
        }
        return false;
    }
}
```

### 功能测试

+ 测试未登录直接访问index页面

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.3m6lv9yahcy0.webp)

## 新增员工

### 需求分析

后台系统中可以管理员工信息，通过新增员工来添加后台系统用户。点击[添加员工]按钮跳转到新增页面，如下：

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.7ob0wlo3spc.webp)

### 数据模型

新增员工，其实就是将我们新增页面录入的员工数据插入到employee表。需要注意，employee表中对username字段加入了唯一约束，因为username是员工的登录账号，必须是唯一的

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.v139523rze8.webp)

employee表中的status字段已经设置了默认值1，表示状态正常。

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.32fegy1e7ys0.webp)

### 代码开发

在开发代码之前，需要梳理一下整个程序的执行过程:

1. 页面发送ajax请求，将新增员工页面中输入的数据以json的形式提交到服务端
2. 服务端Controller接收页面提交的数据并调用Service将数据进行保存
3. Service调用Mapper操作数据库，保存数据

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.x2n5bomhveo.webp)

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.74bo2v369180.webp)

```java
    /**
     * 新增员工
     * @param employee
     * @return
     */
    @PostMapping
    public R<String> save(HttpServletRequest request,@RequestBody Employee employee){
        log.info("新增员工，员工信息:{}",employee.toString());

        //设置初始密码123456，需要进行md5 加密处理
        employee.setPassword(DigestUtils.md5DigestAsHex("123456".getBytes()));
        employee.setCreateTime(LocalDateTime.now());
        employee.setUpdateTime(LocalDateTime.now());

        //获得当前登录用户的Id
        Long empId = (Long) request.getSession().getAttribute("employee");

        employee.setCreateUser(empId);
        employee.setUpdateUser(empId);

        employeeService.save(employee);

        return R.success("新增员工成功");
    }
```

+ 测试

```java
2022-04-29 16:02:28.657  INFO 796 --- [nio-8088-exec-7] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1
2022-04-29 16:02:42.761  INFO 796 --- [nio-8088-exec-7] c.f.r.controller.EmployeeController      : 新增员工，员工信息:Employee(id=null, username=zhangsan, name=张三, password=null, phone=18339981812, sex=1, idNumber=123456789987654321, status=null, createTime=null, updateTime=null, createUser=null, updateUser=null)
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6a83e3ef] was not registered for synchronization because synchronization is not active
2022-04-29 16:04:02.546 ERROR 796 --- [nio-8088-exec-7] c.a.druid.pool.DruidAbstractDataSource   : discard long time none received connection. , jdbcUrl : jdbc:mysql://localhost:3306/reggie?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true, jdbcUrl : jdbc:mysql://localhost:3306/reggie?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true, lastPacketReceivedIdleMillis : 127717
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@6da4076d] will not be managed by Spring
==>  Preparing: INSERT INTO employee ( id, username, name, password, phone, sex, id_number, create_time, update_time, create_user, update_user ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
==> Parameters: 1519950622798766082(Long), zhangsan(String), 张三(String), e10adc3949ba59abbe56e057f20f883e(String), 18339981812(String), 1(String), 123456789987654321(String), 2022-04-29T16:03:54.404(LocalDateTime), 2022-04-29T16:03:54.806(LocalDateTime), 1(Long), 1(Long)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6a83e3ef]
```

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.2hzz2pq29680.webp)

### 全局异常捕获

> 前面的程序还存在一个问题，就是当我们在新增员工时输入的账号已经存在，由于employee表中对该字段加入了唯一约束，此时程序会抛出异常:
>
> `java. sql.SQLIntegrityConstraintViolationException: Duplicate entry 'zhangsan’for key 'idx_username`
>
> 此时需要我们的程序进行异常捕获，通常有两种处理方式:
>
> 1. 在Controller方法中加入try、catch进行异常捕获  //不推荐
>
> ```java
>         try {
>             employeeService.save(employee);
>         } catch (Exception e) {
>             R.error("新增员工失败");
>         }
>         return R.success("新增员工成功");
> ```
>
> 2. 使用异常处理器进行全局捕获

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/29  16:20
 * desc:全局异常处理
 */
@ControllerAdvice(annotations = {RestController.class,Controller.class})  //拦截类上面加了RestController注解或者Controller的controller\
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 异常处理方法
     * @return
     */
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public R<String> exceptionHandler(SQLIntegrityConstraintViolationException ex){
        log.error(ex.getMessage());

        if(ex.getMessage().contains("Duplicate entry")){
            String[] split = ex.getMessage().split(" ");
            String msg=split[2]+"已存在";
            return  R.error(msg);
        }
        return R.error("未知错误");
    }
}
```

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.2whfttupru80.webp)

### 小结

::: tip 小结

1. 根据产品原型明确业务需求
2. 重点分析数据的流转过程和数据格式
3. 通过debug断点调试跟踪程序执行过程

:::

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.6jzl7cma1wk0.webp)