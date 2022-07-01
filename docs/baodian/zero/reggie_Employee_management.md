---
title: 瑞吉外卖-员工管理
date: 2022-05-04 00:25:18
permalink: /pages/f5d63e/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-员工管理

[[toc]]

## 完善登录功能

### 问题分析

> 前面我们已经完成了后台系统的员工登录功能开发，但是还存在一个问题:用户如果不登录，直接访问系统首页面，照样可以正常访问。
>
> 这种设计并不合理，我们希望看到的效果应该是，只有登录成功后才可以访问系统中的页面，如果没有登录则跳转到登录页面。
>
> 那么，具体应该怎么实现呢?
>
> 答案就是使用过滤器或者拦截器，在过滤器或者拦截器中判断用户是否已经完成登录，如果没有登录则跳转到登录页面。

### 代码开发

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

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.kf1svgdigpo.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.h9118ipujl4.webp)

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

- 测试未登录直接访问index页面

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.3m6lv9yahcy0.webp)

## 新增员工

### 需求分析

后台系统中可以管理员工信息，通过新增员工来添加后台系统用户。点击[添加员工]按钮跳转到新增页面，如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.7ob0wlo3spc.webp)

### 数据模型

新增员工，其实就是将我们新增页面录入的员工数据插入到employee表。需要注意，employee表中对username字段加入了唯一约束，因为username是员工的登录账号，必须是唯一的

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.v139523rze8.webp)

employee表中的status字段已经设置了默认值1，表示状态正常。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.32fegy1e7ys0.webp)

### 代码开发

在开发代码之前，需要梳理一下整个程序的执行过程:

1. 页面发送ajax请求，将新增员工页面中输入的数据以json的形式提交到服务端
2. 服务端Controller接收页面提交的数据并调用Service将数据进行保存
3. Service调用Mapper操作数据库，保存数据

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.x2n5bomhveo.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.74bo2v369180.webp)

- 编写处理器

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

- 测试

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

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.2hzz2pq29680.webp)

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
>      try {
>          employeeService.save(employee);
>      } catch (Exception e) {
>          R.error("新增员工失败");
>      }
>      return R.success("新增员工成功");
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
@ControllerAdvice(annotations = {RestController.class,Controller.class})  //拦截类上面加了RestController注解或者Controller注解的controller
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

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.2whfttupru80.webp)

### 小结

::: tip 小结

1. 根据产品原型明确业务需求
2. 重点分析数据的流转过程和数据格式
3. 通过debug断点调试跟踪程序执行过程

:::

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.6jzl7cma1wk0.webp)

## 员工信息分页显示

### 需求分析

系统中的员工很多的时候，如果在一个页面中全部展示出来会显得比较乱，不便于查看，所以一般的系统中都会以分页的方式来展示列表数据。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.5c671konoi00.webp)

### 代码开发

在开发代码之前，需要梳理一下整个程序的执行过程：

1. 页面发送ajax请求，将分页查询参数(page、pageSize、name)提交到服务端
2. 服务端Controller接收页面提交的数据并调用Service查询数据
3. Service调用Mapper操作数据库，查询分页数据
4. Controller将查询到的分页数据响应给页面
5. 页面接收到分页数据并通过ElementUl的Table组件展示到页面上

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.15qobcscm14w.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.f85ybkxqfgw.webp)

- 配置分页插件

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/5/1  16:59
 * desc:配置MP的分页插件
 */
@Configuration
public class MyBatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        mybatisPlusInterceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return mybatisPlusInterceptor;
    }
}
```

- 编写处理器

```java
    /**
     * 员工信息的分页查询
     * @param page
     * @param pageSize
     * @return
     */
    @GetMapping("/page")
    public R<Page> page(int page,int pageSize,String name){
        log.info("page={},pageSize={},name={}",page,pageSize,name);

        //构造分页构造器
        Page pageInfo=new Page(page,pageSize);

        //构造条件构造器
        LambdaQueryWrapper<Employee> queryWrapper=new LambdaQueryWrapper();
        //添加过滤条件
        queryWrapper.like(StringUtils.isNotEmpty(name),Employee::getName,name);
        //排序条件
        queryWrapper.orderByDesc(Employee::getUpdateTime);

        //执行查询
        employeeService.page(pageInfo,queryWrapper);

        return R.success(pageInfo);
    }
```

- 测试，查看服务端响应的json

```json
{
	"code": 1,
	"msg": null,
	"data": {
		"records": [{
			"id": 1520694192883232769,
			"username": "lisi12",
			"name": "李四",
			"password": "e10adc3949ba59abbe56e057f20f883e",
			"phone": "18339976721",
			"sex": "1",
			"idNumber": "123456789123456789",
			"status": 1,
			"createTime": [2022, 5, 1, 17, 18, 43],
			"updateTime": [2022, 5, 1, 17, 18, 43],
			"createUser": 1,
			"updateUser": 1
		}, {
			"id": 1520694004332429315,
			"username": "lisi",
			"name": "李四",
			"password": "e10adc3949ba59abbe56e057f20f883e",
			"phone": "18339976721",
			"sex": "1",
			"idNumber": "123456789987654321",
			"status": 1,
			"createTime": [2022, 5, 1, 17, 17, 58],
			"updateTime": [2022, 5, 1, 17, 17, 58],
			"createUser": 1,
			"updateUser": 1
		}, {
			"id": 1519950622798766082,
			"username": "zhangsan",
			"name": "张三",
			"password": "e10adc3949ba59abbe56e057f20f883e",
			"phone": "18339981812",
			"sex": "1",
			"idNumber": "123456789987654321",
			"status": 1,
			"createTime": [2022, 4, 29, 16, 3, 54],
			"updateTime": [2022, 4, 29, 16, 3, 55],
			"createUser": 1,
			"updateUser": 1
		}, {
			"id": 1,
			"username": "admin",
			"name": "管理员",
			"password": "e10adc3949ba59abbe56e057f20f883e",
			"phone": "13812312312",
			"sex": "1",
			"idNumber": "110101199001010047",
			"status": 1,
			"createTime": [2021, 5, 6, 17, 20, 7],
			"updateTime": [2021, 5, 10, 2, 24, 9],
			"createUser": 1,
			"updateUser": 1
		}],
		"total": 0,
		"size": 10,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"hitCount": false,
		"countId": null,
		"maxLimit": null,
		"searchCount": true,
		"pages": 0
	},
	"map": {}
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.6xpydt42gnk.webp)

> 账号状态响应的是1，为什么页面显示正常？
>
> ```html
>      <el-table-column label="账号状态">
>        <template slot-scope="scope">
>          {{ String(scope.row.status) === '0' ? '已禁用' : '正常' }}
>        </template>
>      </el-table-column>
> ```

## 启用、禁用员工账号

### 需求分析

在员工管理列表页面，可以对某个员工账号进行启用或者禁用操作。账号禁用的员工不能登录系统，启用后的员工可以正常登录。

需要注意，只有管理员（admin用户）可以对其他普通用户进行启用、禁用操作，所以普通用户登录系统后启用、禁用按钮不显示。

如果某个员工账号状态为正常，则按钮显示为“禁用”，如果员工账号状态为已禁用，则按钮显示为“启用”。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.68eldra6u100.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.5xnc26ppcu40.webp)

### 代码开发

页面是怎么做到只有管理员admin能够看到启用，禁用按钮的?

```html {3}
		created() {
          this.init()
          if(localStorage.getItem('userInfo')!=null) {
            //获取当前登录员工的账号，并赋值给模型数据user
            this.user = JSON.parse(localStorage.getItem('userInfo')).username
          }
        },
```

```html {9}
            </el-button>
            <el-button
              type="text"
              size="small"
              class="delBut non"
              @click="statusHandle(scope.row)"
              v-if="user === 'admin'"
            >
              {{ scope.row.status == '1' ? '禁用' : '启用' }}
            </el-button>
```

在开发代码之前，需要梳理一下整个程序的执行过程：

1. 页面发送ajax请求，将参数(id、status)提交到服务端
2. 服务端Controller接收页面提交的数据并调用Service更新数据
3. Service调用Mapper操作数据库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.1y3cpvdor0f4.webp)

页面中的ajax请求是如何发送的呢

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.7jmo8s9xyuo0.webp)

- 编写处理器

```java
    /**
     * 根据id修改员工信息
     * @param employee
     * @return
     */
    @PutMapping
    public R<String> update(HttpServletRequest request,@RequestBody Employee employee){
        log.info(employee.toString());

        Long empId = (Long) request.getSession().getAttribute("employee");
        employee.setUpdateTime(LocalDateTime.now());
        employee.setUpdateUser(empId);
        employeeService.updateById(employee);
        return R.success("员工信息修改成功");
    }
```

> 测试过程没有报错，但是功能并没有实现，查看数据库中的数据也没有变化。
>
> 观察控制台输出的SQL：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.1efldv8seqo0.webp)

SQL执行的结果是更新的数据行数为0，仔细观察id的值，和数据库中对应记录的id值并不相同

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.4xrs6cljb1s0.webp)

### 代码修复

通过观察控制台输出的5QL发现页面传递过来的员工id的值和数据库中的id值不一致，这是怎么回事呢?

分页查询时服务端响应给页面的数据中id的值为19位数字，类型为long

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.3vz7gcxpamo0.webp)

页面中js处理long型数字只能精确到前16位，所以最终通过ajax请求提交给服务器的时候id变为了1520694192883232<font color=##dd0000>800</font>

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.b3dwlex8n2g.webp)

前面我们已经发现了问题的原因，即js对long型数据进行处理时丢失精度，导致提交的id和数据库中的id不一致。

如何解决这个问题？

我们可以在服务器给页面响应json数据时进行处理，将`long型数据统一转为String字符串`

具体实现步骤:

1. 提供对象转换器lacksonObjectMapper,基于lackson进行java对象到json数据的转换
2. 在WebMvcConfig配置类中扩展Spring mvc的消息转换器，在此消息转换器中使用提供的对象转换器进行Java对象到json数据的转换

```java
    /**
     * 扩展mvc框架的消息转换器
     * @param converters
     */
    @Override
    protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {

        log.info("扩展消息转换器...");
        //创建消息转换器对象
        MappingJackson2CborHttpMessageConverter messageConverter=new MappingJackson2CborHttpMessageConverter();
        //设置对象转换器，底层使用Jackson将Java对象转为json
        messageConverter.setObjectMapper(new JacksonObjectMapper());
        //将上面的消息转换器对象追加到mvc框架的转换器容器集合中
        converters.add(0,messageConverter);
    }
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.6vo139weyz00.webp)

### 功能测试

```java
==>  Preparing: UPDATE employee SET status=?, update_time=?, update_user=? WHERE id=?
==> Parameters: 0(Integer), 2022-05-01T20:46:06.772(LocalDateTime), 1(Long), 1520694192883232769(Long)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@299d2b9]
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.axkrn5nmpyg.webp)

## 编辑员工信息

### 需求分析

在员工管理列表页面点击编辑按钮，跳转到编辑页面，在编辑页面回显员工信息并进行修改，最后点击保存按钮完成编辑操作

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.5pchvta5dms0.webp)

### 代码开发

在开发代码之前需要梳理一下操作过程和对应的程序的执行流程：

1. 点击编辑按钮时，页面跳转到add.html，并在url中携带参数[员工id]
2. 在add.html页面获取url中的参数[员工id]
3. 发送ajax请求，请求服务端，同时提交员工id参数
4. 服务端接收请求，根据员工id查询员工信息，将员工信息以json形式响应给页面
5. 页面接收服务端响应的json数据，通过VUE的数据绑定进行员工信息回显
6. 点击保存按钮，发送ajax请求，将页面中的员工信息以json方式提交给服务端
7. 服务端接收员工信息，并进行处理，完成后给页面响应
8. 页面接收到服务端响应信息后进行相应处理

`注意`:**add.html页面为公共页面，新增员工和编辑员工都是在此页面操作**

- 编写处理器

```java
    /**
     * 根据id查询员工信息
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public R<Employee> getById(@PathVariable Long id){
        log.info("根据id查询信息...");
        Employee employee = employeeService.getById(id);
        if(employee!=null){
            return R.success(employee);
        }
        return R.error("没有查询到对应员工信息");
    }
```

### 功能测试

将张三账号修改为Zhangsan

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.4ue2x72kfy00.webp)

- 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.20tbp6d3wvc0.webp)

