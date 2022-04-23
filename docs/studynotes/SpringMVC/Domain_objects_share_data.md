---
title: 域对象共享数据
date: 2022-01-18 17:59:31
permalink: /pages/128a00/
categories:
  - SpringMVC
tags:
  - SpringMVC
---
# 域对象共享数据

[[toc]]

## 使用ServletAPI向request域对象共享数据

```java
@RequestMapping("/testServletAPI")
public String testServletAPI(HttpServletRequest request){
    request.setAttribute("testScope", "hello,servletAPI");
    return "success";
}
```

## 使用ModelAndView向request域对象共享数据

```java
@RequestMapping("/testModelAndView")
public ModelAndView testModelAndView(){
    /**
     * ModelAndView有Model和View的功能
     * Model主要用于向请求域共享数据
     * View主要用于设置视图，实现页面跳转
     */
    ModelAndView mav = new ModelAndView();
    //向请求域共享数据
    mav.addObject("testScope", "hello,ModelAndView");
    //设置视图，实现页面跳转
    mav.setViewName("success");
    return mav;
}
```

## 使用Model向request域对象共享数据

```java
@RequestMapping("/testModel")
public String testModel(Model model){
    model.addAttribute("testScope", "hello,Model");
    return "success";
}
```

## 使用map向request域对象共享数据

```java
@RequestMapping("/testMap")
public String testMap(Map<String, Object> map){
    map.put("testScope", "hello,Map");
    return "success";
}
```

## 使用ModelMap向request域对象共享数据

```java
@RequestMapping("/testModelMap")
public String testModelMap(ModelMap modelMap){
    modelMap.addAttribute("testScope", "hello,ModelMap");
    return "success";
}
```

## Model、ModelMap、Map的关系

**Model、ModelMap、Map**类型的参数其实**本质上都是 BindingAwareModelMap 类型***的

```java
public interface Model{} //接口
public class ModelMap extends LinkedHashMap<String, Object> {}
public class ExtendedModelMap extends ModelMap implements Model {}
public class BindingAwareModelMap extends ExtendedModelMap {}//本质
```

## 向session域共享数据

```java
@RequestMapping("/testApplication")
public String testApplication(HttpSession session){
	ServletContext application = session.getServletContext();
    application.setAttribute("testApplicationScope", "hello,application");
    return "success";
}
```

## 向application域共享数据

```java
@RequestMapping("/testApplication")
public String testApplication(HttpSession session){
	ServletContext application = session.getServletContext();
    application.setAttribute("testApplicationScope", "hello,application");
    return "success";
}
```

::: details Click to view the code writen by author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/18  13:45
 */
@Controller
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
 * @date 2022/1/18  14:42
 */
@Controller
public class ScopeController {

    //使用servletAPI向request域对象共享数据
    @RequestMapping("/testRequestByservletAPI")
    public String testRequestByServletAPI(HttpServletRequest request){
        request.setAttribute("testRequestScope","helloServletAPI");
        return "success";
    }
    @RequestMapping("/testModelAndView")
    public ModelAndView testModeAndView(){
        ModelAndView mav = new ModelAndView();
        //处理模型数据，即向请求域request共享数据
        mav.addObject("testRequestScope","hello.ModelAndView");
        //设置视图名称
        mav.setViewName("success");
        return mav;
    }

    @RequestMapping("/testModel")
    public String testModel(Model model){
        model.addAttribute("testRequestScope","hello,model");
        return "success";
    }

    @RequestMapping("/testMap")
    public String testMap(Map<String,Object> map){
        map.put("testRequestScope","hello,map");
        return "success";

    }

    @RequestMapping("/testModelMap")
    public String testModeMap(ModelMap modelMap){
        modelMap.addAttribute("testRequestScope","hello,ModelMap");
        return "success";


    }
    @RequestMapping("/testSession")
    public String testSession(HttpSession session){
        session.setAttribute("testSessionScope","Hello,Session");

        return "success";
    }

    @RequestMapping("/testApplication")
    public String testApplication(HttpSession session){
        ServletContext application = session.getServletContext();
        application.setAttribute("testSessionScope","Hello,application");
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
success<br>
<p th:text="${testRequestScope}"></p>
<p th:text="${session.testSessionScope}"></p>
</body>
</html>
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
<a th:href="@{/testRequestByservletAPI}">通过servletAPI向request域对象共享数据</a><br>
<a th:href="@{/testModelAndView}">通过ModelAndView向request域对象共享数据</a><br>
<a th:href="@{/testModel}">通过Model向request域对象共享数据</a><br>
<a th:href="@{/testMap}">通过Map向request域对象共享数据</a><br>
<a th:href="@{/testModelMap}">通过ModelMap向request域对象共享数据</a><br>
<a th:href="@{/testSession}">通过ServletAPI向Session域对象共享数据</a><br>
<a th:href="@{/testApplication}">通过Application向Session域对象共享数据</a><br>
</body>
</html>
```

:::





