---
title: SpringMVC 获取请求参数
date: 2022-01-17 19:55:43
permalink: /pages/e7b000/
categories:
  - SpringMVC
tags:
  - SpringMVC
---
# SpringMVC 获取请求参数

[[toc]]

## 通过servletAPI获取

将HttpServletRequest作为控制器方法的形参，此时HttpServletRequest类型的参数表示封装了当前请求的请求报文的对象

```java
@RequestMapping("/testParam")
public String testParam(HttpServletRequest request){
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    System.out.println("username:"+username+",password:"+password);
    return "success";
}
```

## 通过控制器方法的形参获取请求参数

在控制器方法的形参位置，**设置和请求参数同名的形参**，当浏览器发送请求，匹配到请求映射时，在DispatcherServlet中就会将请求参数赋值给相应的形参

```html
<a th:href="@{/testParam(username='admin',password=123456)}">测试获取请求参数-->/testParam</a><br>
```

```java
@RequestMapping("/testParam")
public String testParam(String username, String password){
    System.out.println("username:"+username+",password:"+password);
    return "success";
}
```

::: tip

若请求所传输的请求参数中有多个同名的请求参数，此时可以在控制器方法的形参中设置字符串数组或者字符串类型的形参接收此请求参数

若使用字符串数组类型的形参，此参数的数组中包含了每一个数据

若使用字符串类型的形参，此参数的值为每个数据中间使用逗号拼接的结果

:::

## @RequestParam

@RequestParam是将请求参数和控制器方法的形参创建映射关系

@RequestParam注解一共有三个属性：

value：指定为形参赋值的请求参数的参数名

required：设置是否必须传输此请求参数，默认值为true

若设置为**true**时，则当前请求**必须传输value所指定的请求参数**，若**没有传输该请求参数**，且**没有设置defaultValue属性**，则页面**报错400**：Required String parameter 'xxx' is not present；若**设置为false**，则当前请求不是必须传输value所指定的请求参数，若**没有传输**，则注解所标识的形参的**值为null**

defaultValue：不管required属性值为true或false，**当value所指定的请求参数没有传输或传输的值为""**时，则使用默认值为形参赋值

## @RequestHeader

@RequestHeader是将请求头信息和控制器方法的形参创建映射关系

@RequestHeader注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

## @CookieValue

@CookieValue是将cookie数据和控制器方法的形参创建映射关系

@CookieValue注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

## 通过POJO获取请求参数

可以在控制器方法的形参位置设置一个实体类类型的形参，此时若浏览器传输的请求参数的参数名和实体类中的属性名一致，那么请求参数就会为此属性赋值

```html
<form th:action="@{/testpojo}" method="post">
    用户名：<input type="text" name="username"><br>
    密码：<input type="password" name="password"><br>
    性别：<input type="radio" name="sex" value="男">男<input type="radio" name="sex" value="女">女<br>
    年龄：<input type="text" name="age"><br>
    邮箱：<input type="text" name="email"><br>
    <input type="submit">
</form>
```

```java
@RequestMapping("/testpojo")
public String testPOJO(User user){
    System.out.println(user);
    return "success";
}
//最终结果-->User{id=null, username='张三', password='123', age=23, sex='男', email='123@qq.com'}
```

## 解决获取请求参数的乱码问题

解决获取请求参数的乱码问题，可以使用SpringMVC提供的编码过滤器CharacterEncodingFilter，但是必须在web.xml中进行注册

+ 源码

```java
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String encoding = this.getEncoding();
        if (encoding != null) {
            if (this.isForceRequestEncoding() || request.getCharacterEncoding() == null) {
                request.setCharacterEncoding(encoding); //设置请求的编码
            }

            if (this.isForceResponseEncoding()) {
                response.setCharacterEncoding(encoding);//设置相应的编码
            }
        }

        filterChain.doFilter(request, response);
    }
```

+ 所以我们需要在处理编码过滤器中，使这两个if条件都成立

```xml
<!--配置springMVC的编码过滤器-->
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceResponseEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

::: tip

SpringMVC中处理编码的过滤器一定要配置到其他过滤器之前，否则无效

:::

::: details Click to view the code writen by author

```java
@Controller //要想让SpringMVC识别到控制器 需要通过@Controller注解 将它标示为控制层组件
public class TestController {

    @RequestMapping("/")
    public String index(){
        return "index";
    }

    @RequestMapping("/param")
    public String param(){
        return "test_param";
    }

}

```

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/17  15:29
 */
@Controller
public class ParamController {

    @RequestMapping("/testServletAPI")
    //形参位置的request表示当前请求
    public String testServletAPI(HttpServletRequest request){

        HttpSession session = request.getSession();
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println("username:"+username+",passwd："+password);
        return "success";
    }

    @RequestMapping("/testParam")
    public String testParam(
            //若设置为false，则当前请求不是必须传输value所指定的请求参数
            @RequestParam(value = "user_name",required = false,defaultValue = "hh")
                    String username,
            String password,
            String[] hobby,
            @RequestHeader(value = "sayHAHA",required = true,defaultValue = "haha") String host,
            @CookieValue("JSESSIONID") String JSESSIONID){

        //若请求参数中出现多个同名的请求参数，可以再控制器方法的形参位置设置字符串类型或字符串数组来接受此请求参数
        //若使用字符串类型的形参，最终结果为请求参数的每一个值之间使用逗号进行拼接的结果
        System.out.println("username:"+username+",passwd："+password+",hobby:"+ Arrays.toString(hobby));
        System.out.println("host:"+host);
        System.out.println("JSESSIONID:"+JSESSIONID);
        return "success";

    }

    @RequestMapping("/testBean")
    public String testBean(User user){
        System.out.println(user);
        return "success";

    }
}
```

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/17  18:32
 */
public class User {

    private Integer id;

    private String username;

    private String password;

    private Integer age;

    private String sex;

    private String email;

    public User(Integer id, String username, String password, Integer age, String sex, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.age = age;
        this.sex = sex;
        this.email = email;
    }

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

```

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>测试请求参数</title>
</head>
<body>
<h1>测试请求参数</h1>
<form th:action="@{/testServletAPI}"></form>
<a th:href="@{/testServletAPI(username='admin',passwd=123456)}">测试使用ServletAPI获取请求参数</a><br>
<a th:href="@{/testParam(username='admin',passwd=123456)}">测试使用控制器的形参获取请求参数</a><br>
<form th:action="@{/testParam}" method="get">
    用户名:<input type="test" name="user_name">
    密码:<input type="password" name="password">
    爱好:<input type="checkbox" name="hobby" value="a">a
    <input type="checkbox" name="hobby" value="b">b
    <input type="checkbox" name="hobby" value="c">c
    <input type="submit" value="测试使用控制器的形参获取请求参数">

</form>
<form th:action="@{/testBean}" method="post">
    用户名：<input type="text" name="username"><br>
    密码：<input type="password" name="password"><br>
    性别：<input type="radio" name="sex" value="男">男<input type="radio" name="sex" value="女">女<br>
    年龄：<input type="text" name="age"><br>
    邮箱：<input type="text" name="email"><br>
    <input type="submit">
</form>
</body>
</html>
```

:::

+ 访问URL

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringMVC/images/03/01.png)

+ 控制台

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringMVC/images/03/02.png)

