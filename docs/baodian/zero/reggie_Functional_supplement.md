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

## 菜品的批量删除

前端发来的请求:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.70vsudwh7eg0.webp)

在DishController中添加接口：

在DishFlavor实体类中，在private Integer isDeleted;字段上加上@TableLogic注解，表示删除是逻辑删除，由mybatis-plus提供的；

```java
/**
 * 套餐批量删除和单个删除
 * @return
 */
@DeleteMapping
public R<String> delete(@RequestParam("ids") List<Long> ids){
        //删除菜品  这里的删除是逻辑删除
        dishService.deleteByIds(ids);
        //删除菜品对应的口味  也是逻辑删除
        LambdaQueryWrapper<DishFlavor> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.in(DishFlavor::getDishId,ids);
        dishFlavorService.remove(queryWrapper);
        return R.success("菜品删除成功");
}
```

 DishServicez中添加相关的方法：

```java
    //根据传过来的id批量或者是单个的删除菜品
    void deleteByIds(List<Long> ids);
```

在实现类实现该方法：

```java
    /**
     *套餐批量删除和单个删除
     * @param ids
     */
    @Override
    @Transactional
    public void deleteByIds(List<Long> ids) {

        //构造条件查询器
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
        //先查询该菜品是否在售卖，如果是则抛出业务异常
        queryWrapper.in(ids!=null,Dish::getId,ids);
        List<Dish> list = this.list(queryWrapper);
        for (Dish dish : list) {
            Integer status = dish.getStatus();
            //如果不是在售卖,则可以删除
            if (status == 0){
                this.removeById(dish.getId());
            }else {
                //此时应该回滚,因为可能前面的删除了，但是后面的是正在售卖
                throw new CustomException("删除菜品中有正在售卖菜品,无法全部删除");
            }
        }

    }
```

+ 删除米饭和川菜

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.4ovdplwu0880.webp)

## 菜品删除逻辑优化

上面写的菜品的删除功能有点小简单，下面完善一下相关的逻辑；

相关的service的注入，这里就不列举出来了，代码中使用了哪个service，你就autowire就行；

**下面的代码可能会有点冗余，这里我就不进行抽离了；**

```java
    /**
     * 菜品批量删除和单个删除
     * 1.判断要删除的菜品在不在售卖的套餐中，如果在那不能删除
     * 2.要先判断要删除的菜品是否在售卖，如果在售卖也不能删除
     * @return
     */
 
    //遇到一个小问题，添加菜品后，然后再添加套餐，但是套餐可选择添加的菜品选项是没有刚刚添加的菜品的？
    //原因：redis存储的数据没有过期，不知道为什么redis没有重新刷新缓存
    // （与DishController中的@GetMapping("/list")中的缓存设置有关，目前不知道咋配置刷新缓存。。。。。
    // 解决方案，把redis中的数据手动的重新加载一遍，或者是等待缓存过期后再添加相关的套餐，或者改造成使用spring catch
    @DeleteMapping
    public R<String> delete(@RequestParam("ids") List<Long> ids){
        //根据菜品id在stemeal_dish表中查出哪些套餐包含该菜品
        LambdaQueryWrapper<SetmealDish> setmealDishLambdaQueryWrapper = new LambdaQueryWrapper<>();
        setmealDishLambdaQueryWrapper.in(SetmealDish::getDishId,ids);
        List<SetmealDish> SetmealDishList = setmealDishService.list(setmealDishLambdaQueryWrapper);
        //如果菜品没有关联套餐，直接删除就行  其实下面这个逻辑可以抽离出来，这里我就不抽离了
        if (SetmealDishList.size() == 0){
            //这个deleteByIds中已经做了菜品起售不能删除的判断力
            dishService.deleteByIds(ids);
            LambdaQueryWrapper<DishFlavor> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.in(DishFlavor::getDishId,ids);
            dishFlavorService.remove(queryWrapper);
            return R.success("菜品删除成功");
        }
 
        //如果菜品有关联套餐，并且该套餐正在售卖，那么不能删除
        //得到与删除菜品关联的套餐id
        ArrayList<Long> Setmeal_idList = new ArrayList<>();
        for (SetmealDish setmealDish : SetmealDishList) {
            Long setmealId = setmealDish.getSetmealId();
            Setmeal_idList.add(setmealId);
        }
        //查询出与删除菜品相关联的套餐
        LambdaQueryWrapper<Setmeal> setmealLambdaQueryWrapper = new LambdaQueryWrapper<>();
        setmealLambdaQueryWrapper.in(Setmeal::getId,Setmeal_idList);
        List<Setmeal> setmealList = setmealService.list(setmealLambdaQueryWrapper);
        //对拿到的所有套餐进行遍历，然后拿到套餐的售卖状态，如果有套餐正在售卖那么删除失败
        for (Setmeal setmeal : setmealList) {
            Integer status = setmeal.getStatus();
            if (status == 1){
                return R.error("删除的菜品中有关联在售套餐,删除失败！");
            }
        }
        
        //要删除的菜品关联的套餐没有在售，可以删除
        //这下面的代码并不一定会执行,因为如果前面的for循环中出现status == 1,那么下面的代码就不会再执行
        dishService.deleteByIds(ids);
        LambdaQueryWrapper<DishFlavor> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.in(DishFlavor::getDishId,ids);
        dishFlavorService.remove(queryWrapper);
        return R.success("菜品删除成功");
    }
```

## 套餐管理的修改

分为两步：数据回显示，和提交修改数据到数据库

前端点击套餐修改，前端发过来的请求：

请求方式是：get

携带的参数是：stemealId

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.59qrcjycj2w0.webp)

SetmealController 中添加下面的代码：

```java
/**
 * 回显套餐数据：根据套餐id查询套餐
 * @return
 */
@GetMapping("/{id}")
public R<SetmealDto> getData(@PathVariable Long id){
    SetmealDto setmealDto = setmealService.getDate(id);
 
    return R.success(setmealDto);
}
```

SetmealService添加下面的代码：

```java
    /**
     * 回显套餐数据：根据套餐id查询套餐
     * @return
    */
    SetmealDto getDate(Long id);
```

该方法的实现：

```java
/**
 * 回显套餐数据：根据套餐id查询套餐
 * @return
 */
@Override
public SetmealDto getDate(Long id) {
    Setmeal setmeal = this.getById(id);
    SetmealDto setmealDto = new SetmealDto();
    LambdaQueryWrapper<SetmealDish> queryWrapper = new LambdaQueryWrapper();
    //在关联表中查询，setmealdish
    queryWrapper.eq(id!=null,SetmealDish::getSetmealId,id);
 
    if (setmeal != null){
        BeanUtils.copyProperties(setmeal,setmealDto);
        List<SetmealDish> list = setmealDishService.list(queryWrapper);
        setmealDto.setSetmealDishes(list);
        return setmealDto;
    }
    return null;
}
```

测试：数据回显成功：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.3xm6qfw5i7a0.webp)

但是这样我们再点击添加菜品会发现，右边只展示菜品的价格并没有展示菜品对应的名称：

**已选菜品中的菜品并没有展示对应的菜品名；**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.6jfi34l3wzo0.webp)

 修改后的运行情况展示：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.5hhiemeuiu40.webp)

修改具体的前端代码：把backend/combo/add.html中的335行修改为下面的代码；

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.2awgkjbwp3b4.webp)

 因为这里的item是代表dish对象，dish实体类是使用name作为菜品名称的；

修改完成后，点击保存，我们发现前端发出一个put请求：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.7guc6xuids40.webp)

 携带的参数为：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.3pwwuihfci00.webp)

 根据前端传过来的数据和需要的返回值，我们就可以知道controller层方法的返回值和用什么参数来接收前端传给我们的数据；**注意这个套餐里面的菜品也要保存修改：需要把setealDish保存到seteal_dish表中；**

击修改后的保存，后端会接收到下面的数据：发现setmealId == null，所以这里需要自己单独填充；

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.4b3bhpf84d40.webp)

controller层代码：

为了不把问题复杂化，先把相关的setmealDish内容移除然后再重新添加，这样就可以不用考虑dish重复的问题和哪些修改哪些没修改；

```java
@PutMapping
public R<String> edit(@RequestBody SetmealDto setmealDto){
 
    if (setmealDto==null){
            return R.error("请求异常");
        }
 
        if (setmealDto.getSetmealDishes()==null){
            return R.error("套餐没有菜品,请添加套餐");
        }
        List<SetmealDish> setmealDishes = setmealDto.getSetmealDishes();
        Long setmealId = setmealDto.getId();
 
        LambdaQueryWrapper<SetmealDish> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SetmealDish::getSetmealId,setmealId);
        setmealDishService.remove(queryWrapper);
 
        //为setmeal_dish表填充相关的属性
        for (SetmealDish setmealDish : setmealDishes) {
            setmealDish.setSetmealId(setmealId);
        }
        //批量把setmealDish保存到setmeal_dish表
        setmealDishService.saveBatch(setmealDishes);
        setmealService.updateById(setmealDto);
 
        return R.success("套餐修改成功");
}
```

测试，将套餐名称改为豪华商务套餐：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.2lkv3fqm6s00.webp)

