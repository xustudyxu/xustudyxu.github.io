---
title: SpringSecurity 跨域
date: 2022-10-17 21:00:42
permalink: /Spring/SpringSecurity/SpringSecurity_Cross_domain
categories:
  - SpringSecurity
tags:
  - SpringSecurity
---
# SpringSecurity 跨域

[[toc]]

​	浏览器出于安全的考虑，使用 XMLHttpRequest对象发起 HTTP请求时必须遵守同源策略，否则就是跨域的HTTP请求，默认情况下是被禁止的。 同源策略要求源相同才能正常进行通信，即协议、域名、端口号都完全一致。 

​	前后端分离项目，前端项目和后端项目一般都不是同源的，所以肯定会存在跨域请求的问题。

​	所以我们就要处理一下，让前端能进行跨域请求。

+ 先对SpringBoot配置，运行跨域请求

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 设置允许跨域的路径
        registry.addMapping("/**")
                // 设置允许跨域请求的域名
                .allowedOrigins("*")
                // 是否允许cookie
                .allowCredentials(true)
                // 设置允许的请求方式
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                // 设置允许的header属性
                .allowedHeaders("*")
                // 跨域允许时间
                .maxAge(3600);
    }
}
```

+ 开启SpringSecurity的跨域访问

  由于我们的资源都会收到SpringSecurity的保护，所以想要跨域访问还要让SpringSecurity运行跨域访问。

```java {25}
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();

        //把token校验过滤器添加到过滤器链中
        http.addFilterBefore(jwtAuthenticationTokenFilter,UsernamePasswordAuthenticationFilter.class);

        //配置异常处理器
        //配置认证失败处理器
        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
        //配置授权失败处理器
        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler);

        //配置跨域
        http.cors();
    }
```

