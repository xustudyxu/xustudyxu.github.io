---
title: SpringSecurity 登录认证详解
date: 2022-10-13 23:30:04
permalink: /Spring/SpringSecurity/SpringSecurity_Login_authentication
categories:
  - SpringSecurity
tags:
  - SpringSecurity
---
# SpringSecurity 登录认证详解

[[toc]]

## 登录校验过程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.5njlxfjl6qs0.webp)

## 原理初探

想要知道如何实现自己的登陆流程就必须要先知道入门案例中`SpringSecurity`的流程。

### SpringSecurity完整流程

`SpringSecurity`的原理其实就是一个**过滤器链**，内部包含了提供各种功能的过滤器。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.51h05zcdrr00.webp)

**图中只展示了核心过滤器**，其它的非核心过滤器并没有在图中展示。

- `UsernamePasswordAuthenticationFilter`:负责处理我们在登陆页面填写了用户名密码后的登陆请求。入门案例的认证工作主要有它负责。【判断你的用户名和密码是否正确】
- `ExceptionTranslationFilter`：处理过滤器链中抛出的任何`AccessDeniedException`和`AuthenticationException` 。【处理认证授权过程中的所有异常，方便统一处理】
- `FilterSecurityInterceptor`：负责权限校验的过滤器。【它会判断你登录成功的用户是“谁”，“你”具有什么权限，当前访问的资源需要什么权限】

可以通过Debug查看当前系统中SpringSecurity过滤器链中有哪些过滤器及它们的顺序。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.542jmv3f11o0.webp)

我们可以看到一共有15个过滤器。大概了解几个过滤器：

`DefaultLoginPageGeneratingFilter`：默认登录页就是这个过滤器显示出来的，如果不想要默认登录页，就去掉这个过滤器就可以了。

`DefaultLogoutPageGeneratingFilter`：用来显示默认注销的页面

### 认证流程详解

![image-20211214151515385](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221014/image-20211214151515385.32u2mx984b00.webp)

`UsernamePasswordAuthenticationFilter`这个过滤器来实现认证过程逻辑的。实际上不是它这一个类就实了，它还通过其他类来帮助他实现的，下图就是该过滤器内部实现大致流程。

过程详解：

当前端提交用户名和密码过来时，进入了`UsernamePasswordAuthenticationFilter`过滤器。

- 在`UsernamePasswordAuthenticationFilter`过滤器里，将传进来的用户名和密码被封装成了**Authentication**对象【这时候最多只有用户名和密码，权限还没有】，**Authentication**对象通过**ProviderManager的authenticate方法**进行认证。
- 在**ProviderManager**里面，通过调用`DaoAuthenticationProvider`的`authenticate`方法进行认证。
- 在`DaoAuthenticationProvider`里，调用**InMemoryUserDetailsManager的loadUserByUsername方法**查询用户。【传入的参数只有**用户名字符串**】
- 在**InMemoryUserDetailsManager的loadUserByUsername方法**里执行了以下操作
1. 根据用户名查询对于用户以及这个用户的权限信息【**在内存里查**】
  2. 把对应的用户信息包括权限信息封装成**UserDetails对象**。
3.  返回**UserDetails对象**。
- 返回给了`DaoAuthenticationProvider`，在这个对象里执行了以下操作

  1. 通过**PasswordEncoder**对比**UserDetails**中的密码和**Authentication**密码是否正确。【**校验密码（经过加密的）**】
  2. 如果正确就把**UserDetails**的**权限信息**设置到**Authentication**对象中。
  3. 返回**Authentication**对象。

- 又回到了过滤器里面`UsernamePasswordAuthenticationFilter`。

  1. 如果上一步返回了**Authentication**对象就使用`SecurityContextHolder.getContext().setAuthentication()`方法存储对象。**其他过滤器**会通过`SecurityContextHolder`来获取当前用户信息。【当前过滤器认证完了，后面的过滤器还需要获取用户信息，比如授权过滤器】


概念速查：

- **Authentication**接口: 它的实现类，表示当前访问系统的用户，**封装了用户的权限等相关信息。**
- **AuthenticationManager**接口：定义了认证Authentication的方法 ,实现类是**ProviderManager**
  - 它的实现类是**ProviderManager**，它的功能主要是实现**认证用户**，因为在写登录接口时，可以通过配置类的方式，注入Spring容器中来使用它的**`authenticate`方法**。
- **UserDetailsService**接口：加载用户特定数据的核心接口。里面定义了一个**根据用户名查询用户信息的方法**。
  - 原本的实现类是**InMemoryUserDetailsManager**，它是在内存中查询，因为我们需要自定义改接口。
- **UserDetails**接口：提供核心用户信息。通过**UserDetailsService**根据用户名获取处理的用户信息要封装成**UserDetails**对象返回。然后将这些信息封装到**Authentication**对象中。
  - 当我们自定义**UserDetailsService**接口时，需要我们定义一个**实体类**来实现这个接口来供**UserDetailsService**接口返回。【注意是实体类】

## 实现登录认证

### 思路分析

**登录**

![image-20211215095331510](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221014/image-20211215095331510.43d5pe7vrii0.webp)

​	①自定义登录接口  

​				调用ProviderManager的方法进行认证 如果认证通过生成jwt

​				把用户信息存入redis中

​	②自定义UserDetailsService 

​				在这个实现类中去查询数据库

**校验**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221014/image.1lobrlvzt50g.webp)

> 使用redis查询用户信息

​	 ①定义`Jwt`认证过滤器

​			 获取token

​			 解析token获取其中的`userid`

​			 从`redis`中获取用户信息【如果每次请求都查询数据库就很浪费时间】

​			 存入`SecurityContextHolder`

