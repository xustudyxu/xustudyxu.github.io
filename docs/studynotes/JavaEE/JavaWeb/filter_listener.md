---
title: 过滤器|监听器
date: 2022-04-25 23:19:05
permalink: /pages/f883e2/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# 过滤器|监听器

[[toc]]

## 什么是过滤器

过滤器可以对 Web 服务资源进行过滤，过滤静态资源如静态 HTML、CSS、JS、IMG 等，过滤动态资源如 JSP、Servlet 等，从而实现一些特殊的需求，比如 URL 访问权限设置，过滤敏感词汇，压缩响应信息。

## 自定义过滤器

1. 定义一个过滤器实现 Filter 接口，重写三个方法。

+ init() ：该方法在容器启动初始化过滤器时被调用，它在 Filter 的整个生命周期只会被调用一次。注意：这个方法必须执行成功，否则过滤器会不起作用。
+ doFilter() ：容器中的每一次请求都会调用该方法， FilterChain 用来调用下一个过滤器 Filter。
+ destroy()： 当容器销毁 过滤器实例时调用该方法，一般在方法中销毁或关闭资源，在过滤器 Filter 的整个生命周期也只会被调用一次

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/25  23:24
 */
@Slf4j
public class WebMvcFilter implements Filter {


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        String encoding = filterConfig.getInitParameter("encoding");
        log.info("-1-----encoding: {} ----->", encoding);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        log.info("0-----doFilter----->");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        log.info("5-----destroy----->");
    }
}
```

2. 定义一个配置类注册过滤器并定义规则。

```java
@Configuration
public class WebFilterConfiguration {
    @Bean
    public FilterRegistrationBean getWebMvcFilter(){
        FilterRegistrationBean<Filter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
        WebMvcFilter webMvcFilter = new WebMvcFilter();
        filterFilterRegistrationBean.setFilter(webMvcFilter);
        filterFilterRegistrationBean.addUrlPatterns("/api/*");
        filterFilterRegistrationBean.setName("WebMvcFilter");
        filterFilterRegistrationBean.addInitParameter("encoding", "GBK");
        filterFilterRegistrationBean.setOrder(1);
        return filterFilterRegistrationBean;
    }
}
```

## 拦截器和过滤器的区别

1. 过滤器依赖 Servlet 容器，拦截器不依赖 Servlet 容器。
2. 过滤器基于容器的函数回调，拦截器基于 Java 的反射机制。
3. 过滤器几乎可以过滤所有的请求，包括静态和动态资源。拦截器只能拦截 Controller 层定义的路由请求，不处理静态资源。
4. 过滤器只能在容器初始化的时候调用一次，拦截器可以多次调用。
5. 拦截器可以访问 Controller 层中的方法和上下文，可以获取 IOC 容器中的各种 Bean 并根据需求进行处理。过滤器不支持访问且不能获取。

## 什么是监听器

作用：监听器可以监听 Web 中特定的事件。

方式：监听器监听的是拥有作用域的对象，如 ServletContext、HttpSession 等。这些作用域对象分别都有相同的方法，如 setAttribute、getAttribute、removeAttribute，只要调用这几个方法就会进入到监听器对应的方法中处理相应的逻辑。

场景：初始化上下文（Spring 容器的初始化，文件的解析）、会话的监听（在线人数），监听干预用户信息（用户资源倾斜）。

### 监听ServletContext 的 application 对象

1. 定义一个监听器实现 ApplicationListener 接口，重写 onApplicationEvent 方法，获取 applicationContext 上下文中的 Bean 对象，执行相应方法后将结果放到 ServletContext 的作用域对象 application 中。

```java
@Component
public class ServletContextListener implements ApplicationListener<ContextRefreshedEvent> {
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() == null) {
            ApplicationContext applicationContext = event.getApplicationContext();
            UserService userService = applicationContext.getBean(UserService.class);
            User user = userService.getUser();
            ServletContext application = applicationContext.getBean(ServletContext.class);
            application.setAttribute("user", user);
        }
    }
}
```

2. 定义测试接口

```java
@RestController
@Slf4j
public class UserController {
    @GetMapping("/api/getUser")
    public User getUser(HttpServletRequest request) {
        ServletContext servletContext = request.getServletContext();
        User user = (User) servletContext.getAttribute("user");
        log.info("user: {}", user);
        return user;
    }
}
```

3. 测试结果

```java
2021-12-28 10:55:56.472  INFO 10820 --- [nio-8080-exec-1] com.xpy.controller.UserController        : user: User(id=1, nickname=PlanMak1r, password=123456)
```

### 监听 HttpSession的 session 对象

1. 定义一个监听器实现 HttpSessionListener 接口，重写两个方法，获取 session 会话对象，并将数据放到 HttpSession 的作用域对象 session 中。

```java
@Component
@Slf4j
public class LoginSessionListener implements HttpSessionListener {
    public static Integer count = 0;
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        log.info("新用户上线...");
        count++;
        se.getSession().getServletContext().setAttribute("personCount", count);
    }
    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        log.info("用户下线了...");
        count--;
        se.getSession().getServletContext().setAttribute("personCount", count);
    }
}
```

2. 定义测试接口

```java
@RestController
@Slf4j
public class LoginController {
    @GetMapping("/getOnlineUser")
    public String getOnlineUser(HttpServletRequest request) {
        Integer personCount = (Integer) request.getServletContext().getAttribute("personCount");
        log.info("登录的人数是: {}", (personCount == null ? 0 : personCount));
        return "登录的人数是：" + (personCount == null ? 0 : personCount);
    }
    @GetMapping("logined")
    public String logined(HttpSession session) {
        session.setAttribute("user", new User(1L, "PlanMak1r", "123456"));
        log.info("登录成功...");
        return "success";
    }
    @GetMapping("logout")
    public String logout(HttpSession session) {
        session.invalidate();
        log.info("退出成功...");
        return "success";
    }
}
```

3. 测试结果

```java
2021-12-28 11:28:23.420  INFO 8232 --- [nio-8080-exec-1] com.xpy.controller.LoginController       : 登录的人数是: 0
2021-12-28 11:28:29.436  INFO 8232 --- [nio-8080-exec-2] c.x.c.listener.LoginSessionListener      : 新用户上线...
2021-12-28 11:28:29.450  INFO 8232 --- [nio-8080-exec-2] com.xpy.controller.LoginController       : 登录成功...
2021-12-28 11:28:39.832  INFO 8232 --- [nio-8080-exec-3] com.xpy.controller.LoginController       : 登录的人数是: 1
2021-12-28 11:28:49.381  INFO 8232 --- [nio-8080-exec-5] c.x.c.listener.LoginSessionListener      : 用户下线了...
2021-12-28 11:28:49.381  INFO 8232 --- [nio-8080-exec-5] com.xpy.controller.LoginController       : 退出成功...
2021-12-28 11:28:51.167  INFO 8232 --- [nio-8080-exec-6] com.xpy.controller.LoginController       : 登录的人数是: 0
```

## 参考链接

+ https://www.kuangstudy.com/bbs/1476002779104722945

