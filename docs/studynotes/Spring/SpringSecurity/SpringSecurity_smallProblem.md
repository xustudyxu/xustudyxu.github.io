---
title: SpringSecurity 遗留小问题
date: 2022-10-17 22:59:28
permalink: /Spring/SpringSecurity/SpringSecurity_smallProblem
categories:
  - SpringSecurity
tags:
  - SpringSecurity
---
# SpringSecurity 遗留小问题

[[toc]]

## 其它权限校验方法

​	我们前面都是使用@PreAuthorize注解，然后在在其中使用的是hasAuthority方法进行校验。SpringSecurity还为我们提供了其它方法例如：hasAnyAuthority，hasRole，hasAnyRole等。

​	这里我们先不急着去介绍这些方法，我们先去理解hasAuthority的原理，然后再去学习其他方法你就更容易理解，而不是死记硬背区别。并且我们也可以选择定义校验方法，实现我们自己的校验逻辑。

​	`hasAuthority`方法实际是执行到了SecurityExpressionRoot的hasAuthority，大家只要断点调试既可知道它内部的校验原理。

​	它内部其实是调用authentication的getAuthorities方法获取用户的权限列表。然后判断我们存入的方法参数数据在权限列表中。

​	`hasAnyAuthority`方法可以**传入多个权限**，只有用户<mark>有其中任意一个权限都可以访问对应资源</mark>。

```java
    @PreAuthorize("hasAnyAuthority('admin','test','system:dept:list')")
    public String hello(){
        return "hello";
    }
```

​	hasRole要求有对应的角色才可以访问，但是它内部会把我们传入的参数拼接上 **ROLE_** 后再去比较。所以这种情况下要用用户对应的权限也要有 **ROLE_** 这个前缀才可以。

```java
 	@PreAuthorize("hasRole('system:dept:list')")
    public String hello(){
        return "hello";
    }
```

hasAnyRole 有任意的角色就可以访问。它内部也会把我们传入的参数拼接上 **ROLE_** 后再去比较。所以这种情况下要用用户对应的权限也要有 **ROLE_** 这个前缀才可以。

```java
    @PreAuthorize("hasAnyRole('admin','system:dept:list')")
    public String hello(){
        return "hello";
    }
```

## 自定义权限校验方法

​	我们也可以定义自己的权限校验方法，在@PreAuthorize注解中使用我们的方法。

```java
@Component("ex")
public class SGExpressionRoot {

    public boolean hasAuthority(String authority){

        //获取当前用户的权限
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        List<String> permissions = loginUser.getPermissions();
        //判断用户权限集合中是否存在authority
        return permissions.contains(authority);

    }
}
```

 在SPEL表达式中使用 @ex相当于获取容器中bean的名字未ex的对象。然后再调用这个对象的hasAuthority方法

```java
 	@RequestMapping("/hello")
    @PreAuthorize("@ex.hasAuthority('system:dept:list')")
    public String hello(){
        return "hello";
    }
```

## 基于配置的权限控制

​	我们也可以在配置类中使用使用配置的方式对资源进行权限控制。

```java {13}
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
                //使用配置的方式
                .antMatchers("/textCors").hasAnyAuthority("system:dept:list")
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

## CSRF

​	CSRF是指跨站请求伪造（Cross-site request forgery），是web常见的攻击之一。

​	[https://blog.csdn.net/freeking101/article/details/86537087](https://blog.csdn.net/freeking101/article/details/86537087)

​	SpringSecurity去防止CSRF攻击的方式就是通过csrf_token。后端会生成一个csrf_token，前端发起请求的时候需要携带这个csrf_token,后端会有过滤器进行校验，如果没有携带或者是伪造的就不允许访问。

​	我们可以发现CSRF攻击依靠的是cookie中所携带的认证信息。但是在前后端分离的项目中我们的认证信息其实是token，而token并不是存储中cookie中，并且需要前端代码去把token设置到请求头中才可以，所以CSRF攻击也就不用担心了。

## 认证成功处理器

​	实际上在UsernamePasswordAuthenticationFilter进行登录认证的时候，如果登录成功了是会调用AuthenticationSuccessHandler的方法进行认证成功后的处理的。AuthenticationSuccessHandler就是登录成功处理器。

​	我们也可以自己去自定义成功处理器进行成功后的相应处理。

```java
@Component
public class SGSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        System.out.println("认证成功了");
    }
}
```

```java {5-6,10}
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    private AuthenticationSuccessHandler successHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin().successHandler(successHandler);
        http.authorizeRequests().anyRequest().authenticated();
        http.formLogin();
        http.httpBasic();
    }
}
```

+ 测试，控制台输出

```java
2022-10-17 22:39:08.408  INFO 13304 --- [nio-8888-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 3 ms
认证成功了
```

## 认证失败处理器

​	实际上在UsernamePasswordAuthenticationFilter进行登录认证的时候，如果认证失败了是会调用AuthenticationFailureHandler的方法进行认证失败后的处理的。AuthenticationFailureHandler就是登录失败处理器。

​	我们也可以自己去自定义失败处理器进行失败后的相应处理。

```java
@Component
public class SGFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        System.out.println("认证失败了");
    }
}
```

```java {8-9,17}
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    private AuthenticationSuccessHandler successHandler;

    @Autowired
    private AuthenticationFailureHandler failureHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
                //配置成功处理器
                .successHandler(successHandler)
                //配置失败处理器
                .failureHandler(failureHandler);

        http.authorizeRequests().anyRequest().authenticated();
        http.formLogin();
        http.httpBasic();
    }
}
```

+ 测试，控制台输出

```java
2022-10-17 22:49:41.754  INFO 25280 --- [nio-8888-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 3 ms
认证失败了
```

## 登出成功处理器

```java
@Component
public class SGLogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("注销成功");
    }
}
```

```java {12-13,22-24}
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    private AuthenticationSuccessHandler successHandler;

    @Autowired
    private AuthenticationFailureHandler failureHandler;


    @Autowired
    private LogoutSuccessHandler logoutSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
                //配置成功处理器
                .successHandler(successHandler)
                //配置失败处理器
                .failureHandler(failureHandler);
        http.logout()
                //配置注销成功处理器
                .logoutSuccessHandler(logoutSuccessHandler);
        
        http.authorizeRequests().anyRequest().authenticated();
        http.formLogin();
        http.httpBasic();
    }
}
```

+ 测试，控制台输出

```java
2022-10-17 22:58:02.189  INFO 21916 --- [nio-8888-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 4 ms
认证成功了
注销成功
```

