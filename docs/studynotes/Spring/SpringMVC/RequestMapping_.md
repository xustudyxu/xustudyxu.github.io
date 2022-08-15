---
title: RequestMapping注解
date: 2022-01-16 19:09:40
permalink: /pages/b0f942/
categories:
  - SpringMVC
tags:
  - SpringMVC
---
# RequestMapping注解

[[toc]]

## @RequestMapping注解的功能

从注解名称上我们可以看到，@RequestMapping注解的作用就是将请求和处理请求的控制器方法关联起来，建立映射关系。

SpringMVC 接收到指定的请求，就会来找到在映射关系中对应的控制器方法来处理这个请求。

## @RequestMapping注解的位置

@RequestMapping**标识一个类**：**设置映射请求的请求路径的初始信息**

@RequestMapping**标识一个方法**：**设置映射请求请求路径的具体信息**

```java
@Controller
@RequestMapping("/test")
public class RequestMappingController {

	//此时请求映射所映射的请求的请求路径为：/test/testRequestMapping
    @RequestMapping("/testRequestMapping")
    public String testRequestMapping(){
        return "success";
    }

}
```

## @RequestMapping注解的value属性

@RequestMapping注解的**value属性通过请求的请求地址匹配**请求映射

@RequestMapping注解的value属性是一个字符串类型的数组，表示该请求映射能够匹配多个请求地址所对应的请求

@RequestMapping注解的value属性必须设置，至少通过请求地址匹配请求映射

```html
<a th:href="@{/testRequestMapping}">测试@RequestMapping的value属性-->/testRequestMapping</a><br>
<a th:href="@{/test}">测试@RequestMapping的value属性-->/test</a><br>
```

```java
@RequestMapping(
        value = {"/testRequestMapping", "/test"}
)
public String testRequestMapping(){
    return "success";
}
```

## @RequestMapping注解的method属性

@RequestMapping注解的**method属性通过请求的请求方式（get或post）匹配**请求映射

@RequestMapping注解的method属性是一个RequestMethod类型的数组，表示该请求映射能够匹配多种请求方式的请求

若当前请求的请求地址满足请求映射的value属性，但是请求方式不满足method属性，则浏览器报错405：Request method 'POST' not supported:即请求方式不被支持

```html
<a th:href="@{/test}">测试@RequestMapping的value属性-->/test</a><br>
<form th:action="@{/test}" method="post">
    <input type="submit">
</form>
```

```java
@RequestMapping(
        value = {"/testRequestMapping", "/test"},
        method = {RequestMethod.GET, RequestMethod.POST}
)
public String testRequestMapping(){
    return "success";
}
```

::: tip

1. 对于处理指定请求方式的控制器方法，SpringMVC中提供了@RequestMapping的派生注解

   处理get请求的映射-->@GetMapping

   处理post请求的映射-->@PostMapping

   处理put请求的映射-->@PutMapping

   处理delete请求的映射-->@DeleteMapping

2. 常用的请求方式有get，post，put，delete

   但是目前浏览器只支持get和post，若在form表单提交时，为method设置了其他请求方式的字符串（put或delete），则**按照默认的请求方式get处理**

   若要发送put和delete请求，则需要通过spring提供的过滤器HiddenHttpMethodFilter，在RESTful部分会讲到

:::

## @RequestMapping注解的params属性（了解）

@RequestMapping注解的params属性通过请求的请求参数匹配请求映射

@RequestMapping注解的params属性是一个字符串类型的数组，可以通过四种表达式设置请求参数和请求映射的匹配关系

"param"：要求请求映射所匹配的请求必须携带param请求参数

"!param"：要求请求映射所匹配的请求必须不能携带param请求参数

"param=value"：要求请求映射所匹配的请求必须携带param请求参数且param=value

"param!=value"：要求请求映射所匹配的请求必须携带param请求参数但是param!=value

```html
<a th:href="@{/test(username='admin',password=123456)">测试@RequestMapping的params属性-->/test</a><br>
```

```java
@RequestMapping(
        value = {"/testRequestMapping", "/test"}
        ,method = {RequestMethod.GET, RequestMethod.POST}
        ,params = {"username","password!=123456"}
)
public String testRequestMapping(){
    return "success";
}
```

## @RequestMapping注解的headers属性（了解）

@RequestMapping注解的headers属性通过请求的请求头信息匹配请求映射

@RequestMapping注解的headers属性是一个字符串类型的数组，可以通过四种表达式设置请求头信息和请求映射的匹配关系

"header"：要求请求映射所匹配的请求必须携带header请求头信息

"!header"：要求请求映射所匹配的请求必须不能携带header请求头信息

"header=value"：要求请求映射所匹配的请求必须携带header请求头信息且header=value

"header!=value"：要求请求映射所匹配的请求必须携带header请求头信息且header!=value

若当前请求满足@RequestMapping注解的value和method属性，但是不满足headers属性，此时页面显示404错误，即资源未找到

## SpringMVC支持ant风格的路径

？：表示任意的单个字符

*：表示任意的0个或多个字符

\**：表示任意的一层或多层目录

注意：在使用\**时，只能使用/**/xxx的方式

## SpringMVC支持路径中的占位符（重点）

原始方式：/deleteUser?id=1

rest方式：/deleteUser/1

SpringMVC路径中的占位符常用于RESTful风格中，当请求路径中将某些数据通过路径的方式传输到服务器中，就可以在相应的**@RequestMapping注解的value属性中通过占位符{xxx}表示传输的数据**，在通过@**PathVariable注解，将占位符所表示的数据赋值给控制器方法的形参**

```html
<a th:href="@{/testRest/1/admin}">测试路径中的占位符-->/testRest</a><br>
```

```java
@RequestMapping("/testRest/{id}/{username}")
public String testRest(@PathVariable("id") String id, @PathVariable("username") String username){
    System.out.println("id:"+id+",username:"+username);
    return "success";
}
//最终输出的内容为-->id:1,username:admin
```

::: details Click to view the code writen by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/16  14:29
 */
@Controller //要想让SpringMVC识别到控制器 需要通过@Controller注解 将它标示为控制层组件
public class TestController {

    @RequestMapping("/")
    public String index(){
        return "index";
    }
}

```

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/16  15:44
 */
@Controller
//@RequestMapping("/hello")
public class RequestMappingController {

    @RequestMapping(
            value = {"/testRequestMapping","/test"},
            method = {RequestMethod.GET,RequestMethod.POST},
            params = {"username=admin"}
            )
    public String success(){
        return "success";
    }

    @GetMapping(value = "/testGetMapping")
    public String testGetMapping(){
        return "success";
    }

    @RequestMapping(value = "/testPut",method = RequestMethod.PUT)
    public String testPut(){
        return "success";
    }

    //了解
    @RequestMapping(
            value = "/testParamsAndHeaders",
            params = {"username","passwd=123456"},
            headers = {"Host=localhost:8081"}
    )
    public String testParamsAndHeaders(){
        return "success";
    }

//    @RequestMapping("/a?a/testAnt")//?任意一个字符 / ? 不好使
//    @RequestMapping("/a*a/testAnt")//0个多个字符 / 不好使
    @RequestMapping("/**/testAnt")//表示任意的一层或多层目录 / 好使
    public String testAnt(){
        return "success";

    }

    @RequestMapping("/testPath/{id}/{username}")//**@RequestMapping注解的value属性中通过占位符{xxx}表示传输的数据**，
    public String testPath(@PathVariable("id") Integer id,@PathVariable("username") String username){//@PathVariable注解，将占位符所表示的数据赋值给控制器方法的形参**
        System.out.println("id:"+id+",username:"+ username);
        return "success";

    }
}
```

```html
<!--success.html-->
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
success
</body>
</html>
```

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h2>首页</h2>
<a th:href="@{/hello/testRequestMapping}">测试RequestMapping注解的位置</a><br>
<a th:href="@{/hello/testRequestMapping}">测试RequestMapping注解的value属性-->/testRequestMapping</a><br>
<a th:href="@{/test}">测试RequestMapping注解的value属性-->/test</a><br>
<a th:href="@{/test}">测试RequestMapping注解的method属性-->GET</a><br>

<form th:action="@{/test}" method="post"> <!--post请求-->
    <input type="submit" value="测试RequestMapping注解的method属性-->POST">
</form>

<a th:href="@{/testGetMapping}">测试GetMapping注解--/testGetMapping</a><br>

<form th:action="@{/testPut}" method="put">
    <input type="submit" value="测试form表单是否能够发送put请求或delete请求-->POST">
</form>

<a th:href="@{/testParamsAndHeaders(username='admin',passwd=123)}">测试RequestMapping注解的paras属性-->/testParamsAndHeaders</a><br>
<a th:href="@{/a1a/testAnt}">测试@RequestMapping可以匹配ant风格的路径-->使用?</a><br>
<a th:href="@{/testPath/1/frx}">测试@RequestMapping可以支持路径中的占位符-->/testPath</a><br>

</body>
</html>
```

:::

+ 访问URL

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringMVC/images/02/01.png)

+ 点击测试

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringMVC/images/02/02.png)

+ 控制台

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringMVC/images/02/03.png)

