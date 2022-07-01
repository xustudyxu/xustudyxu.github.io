---
title: 拦截器
date: 2022-01-23 16:00:19
permalink: /pages/621fa7/
categories:
  - SpringMVC
tags:
  - SpringMVC
---
# 拦截器

[[toc]]

## 什么是拦截器

作用：SpringMVC 用于拦截 Controller 的路由请求。

本质：AOP 面向切面编程。

场景：权限检查（登录拦截，接口安全校验）、日志记录（推荐使用原生 AOP）、性能监控（接口访问的执行时间）、通用行为（获取 Cookie 信息，获取用户信息等）。

## 拦截器的配置

SpringMVC中的拦截器用于拦截控制器方法的执行

SpringMVC中的拦截器需要实现HandlerInterceptor

SpringMVC的拦截器必须在SpringMVC的配置文件中进行配置：

```xml
<bean class="com.atguigu.interceptor.FirstInterceptor"></bean>
<ref bean="firstInterceptor"></ref>
<!-- 以上两种配置方式都是对DispatcherServlet所处理的所有的请求进行拦截 -->
<mvc:interceptor>
    <mvc:mapping path="/**"/>
    <mvc:exclude-mapping path="/testRequestEntity"/>
    <ref bean="firstInterceptor"></ref>
</mvc:interceptor>
<!-- 
	以上配置方式可以通过ref或bean标签设置拦截器，通过mvc:mapping设置需要拦截的请求，通过mvc:exclude-mapping设置需要排除的请求，即不需要拦截的请求
-->
```

## 拦截器的三个抽象方法

SpringMVC中的拦截器有三个抽象方法：

preHandle：控制器方法执行之前执行preHandle()，其boolean类型的返回值表示是否拦截或放行，返回true为放行，即调用控制器方法；返回false表示拦截，即不调用控制器方法

postHandle：控制器方法执行之后执行postHandle()

afterCompletion：处理完视图和模型数据，渲染视图完毕之后执行afterCompletion()

## 多个拦截器的执行顺序

+ 若**每个拦截器的preHandle()都返回true**

此时多个拦截器的执行顺序和拦截器在SpringMVC的配置文件的配置顺序有关：

**preHandle()会按照配置的顺序执行**，而**postHandle()**和**afterCompletion()会按照配置的反序执行**

+ 若**某个拦截器的preHandle()返回了false**

**preHandle()返回false和它之前的拦截器的preHandle()都会执行**，postHandle()都不执行，**返回false的拦截器之前的拦截器的afterCompletion()会执行**

::: details Click to view the code writen by author

```xml
<!--配置拦截器-->
    <mvc:interceptors>
        <ref bean="firstInterceptor"></ref>
        <ref bean="secondInterceptor"></ref>
        <!--当前的拦截器默认对所有请求进行拦截-->
        <!--<bean class="com.frx01.mvc.interceptors.FirstInterceptor"></bean>-->
        <!--<ref bean="firstInterceptor"></ref>-->

        <!--自定义拦截规则-->
        <!--<mvc:interceptor>-->
        <!--    &lt;!&ndash;在拦截器里面 匹配所有请求/**&ndash;&gt;-->
        <!--    <mvc:mapping path="/*"/>-->
        <!--    &lt;!&ndash;拦截/a /b 拦截所有/**&ndash;&gt;-->
        <!--    <mvc:exclude-mapping path="/"/>-->
        <!--    <ref bean="firstInterceptor"></ref>-->
        <!--    &lt;!&ndash;主页面被排除掉了&ndash;&gt;-->
        <!--</mvc:interceptor>-->

    </mvc:interceptors>
```

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/23  14:22
 */
@Component  //普通组件
public class FirstInterceptor implements HandlerInterceptor {
    //在控制器方法执行之前执行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("FirstInterceptor--preHandle");
        return true;
    }

    //在控制器方法执行之后
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("FirstInterceptor--postHandle");
    }

    //在视图渲染之后执行
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("FirstInterceptor--afterCompletion");
    }
}
```

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/23  14:59
 */
@Component
public class SecondInterceptor implements HandlerInterceptor {
    //在控制器方法执行之前执行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("SecondInterceptor--preHandle");
        return true;
    }

    //在控制器方法执行之后
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("SecondInterceptor--postHandle");
    }

    //在视图渲染之后执行
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("SecondInterceptor--afterCompletion");
    }
}
```

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/23  14:13
 */
@Controller
public class TestController {

    @RequestMapping("/testInterceptor")
    public String testInterceptor(){
        return "success";
    }
  }

```

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>首页</h1>
<a th:href="@{/testInterceptor}">测试拦截器</a><br>
</body>
</html>`
```

```html
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

:::

+ 结果输出顺序

```java
FirstInterceptor--preHandle
SecondInterceptor--preHandle
SecondInterceptor--postHandle
FirstInterceptor--postHandle
SecondInterceptor--afterCompletion
FirstInterceptor--afterCompletion
```

+ 若FirstInterceptor-preHandle返回True,SecondInterceptor--preHandle返回False,结果为

```java
FirstInterceptor--preHandle
SecondInterceptor--preHandle
FirstInterceptor--afterCompletion
```

## 自定义拦截器

1. 定义一个自定义拦截实现 HandlerInterceptor 接口，重写三个方法。

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/25  23:05
 */
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("1-----preHandle----->");
        return true;
    }
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.info("3-----postHandle----->");
    }
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        log.info("4-----afterCompletion----->");
    }
}
```

2. 定义一个配置类实现 WebMvcConfigurer 接口，重写 addInterceptors 方法，注册拦截器并定义规则。

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/25  23:12
 */
@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
    @Bean
    public LoginInterceptor getLoginInterceptor() {
        return new LoginInterceptor();
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getLoginInterceptor()).addPathPatterns("/api/**");
    }
}
```

3. 定义测试接口。

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/25  23:13
 */
@RestController
@Slf4j
public class HelloController {
    @GetMapping("/api/hello")
    public String hello() {
        log.info("2-----hello----->");
        return "hello";
    }
}
```

4. 结果

```java
2022-04-25 23:21:05.142  INFO 19276 --- [nio-8888-exec-5] c.f.i.config.LoginInterceptor            : 1-----preHandle----->
2022-04-25 23:21:05.143  INFO 19276 --- [nio-8888-exec-5] c.f.i.controller.HelloController         : 2-----hello----->
2022-04-25 23:21:05.148  INFO 19276 --- [nio-8888-exec-5] c.f.i.config.LoginInterceptor            : 3-----postHandle----->
2022-04-25 23:21:05.148  INFO 19276 --- [nio-8888-exec-5] c.f.i.config.LoginInterceptor            : 4-----afterCompletion----->
```

## 单个拦截器执行流程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.2yt4trspxew0.webp)

## 多个拦截器的执行流程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.3ukw3z3zmk60.webp)

