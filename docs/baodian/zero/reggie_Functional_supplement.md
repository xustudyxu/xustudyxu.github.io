---
title: 瑞吉外卖-功能补充
date: 2022-07-14 23:08:14
permalink: /pages/68f7f1/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-功能补充

[[toc]]

## 菜品起售和停售

前端发过来的请求（使用的是post方式）：http://localhost:8080/dish/status/1?ids=1516568538387079169

后端接受的请求：

```java
    /**
     * 对菜品进行停售或者是起售
     * @return
     */
    @PostMapping("/status/{status}")
    public R<String> status(@PathVariable("status") Integer status,Long ids){
        log.info("status:{}",status);
        log.info("ids:{}",ids);
        Dish dish = dishService.getById(ids);
        if (dish != null){
            dish.setStatus(status);
            dishService.updateById(dish);
            return R.success("开始启售");
        }
        return R.error("售卖状态设置异常");
    }
```

## 菜品批量启售和批量停售

把上面对单个菜品的售卖状态的方法进行修改;

```java
    /**
     * 对菜品批量或者是单个 进行停售或者是起售
     *
     * @return
     */
    @PostMapping("/status/{status}")
    //这个参数这里一定记得加注解才能获取到参数，否则这里非常容易出问题
    public R<String> status(@PathVariable("status") Integer status, @RequestParam List<Long> ids) {
        //log.info("status:{}",status);
        //log.info("ids:{}",ids);
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper();
        queryWrapper.in(ids != null, Dish::getId, ids);
        //根据数据进行批量查询
        List<Dish> list = dishService.list(queryWrapper);

        for (Dish dish : list) {
            if (dish != null) {
                dish.setStatus(status);
                dishService.updateById(dish);
            }
        }
        return R.success("售卖状态修改成功");
    }
```

> **注意：controller层的代码是不可以直接写业务的，建议把它抽离到service层，controller调用一下service的方法就行；**下面的批量删除功能是抽离的，controller没有写业务代码；

+ 功能测试

批量起售米饭和宫保鸡丁

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220714/image.4mlup2f5a080.webp)