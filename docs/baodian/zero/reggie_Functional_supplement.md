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

::: tip 注意

controller层的代码是不可以直接写业务的，建议把它抽离到service层，controller调用一下service的方法就行；下面的批量删除功能是抽离的，controller没有写业务代码；

:::

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

## 后台按条件查看和展示客户订单

点击订单明细，前端会发下面的请求：携带的数据是分页使查询用的；

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.4q5gms8wmww0.webp)

先写个controller看能不能接收到前端传过来的参数：**发现只要参数和前端传过来的参数名对应就可以拿到参数的**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.6qez9emkw6s0.webp)

主要使用到mybatis-plus动态sql语句的生成：

这里我就直接把功能直接写在controller层了，看自己需求分层；

```java
    /**
     *后台查询订单明细
     * @param page
     * @param pageSize
     * @param number
     * @param beginTime
     * @param endTime
     * @return
     */
    @GetMapping("/page")
    public R<Page> page(int page,int pageSize,String number,String beginTime,String endTime){
        //分页构造器对象
        Page<Orders> pageInfo = new Page<>(page, pageSize);
        //构造条件查询对象
        LambdaQueryWrapper<Orders> queryWrapper = new LambdaQueryWrapper<>();

        //添加 查询条件 动态sql 字符串使用StringUtils.isNotEmpty这个方法来判断
        queryWrapper.like(number!=null,Orders::getNumber,number)
                .gt(StringUtils.isNotEmpty(beginTime),Orders::getOrderTime,beginTime)
                .lt(StringUtils.isNotEmpty(endTime),Orders::getOrderTime,endTime);

        orderService.page(pageInfo,queryWrapper);
        return R.success(pageInfo);
    }
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.2dgx1psnb4e8.webp)

但是如果你**想要这个username显示用户名的话**，那么有两种办法：

方法1：就是在注册的user表中添加用户名；（实际上这个用户在注册的时候是没有填写username这个选项的，所以这里查询出来全是null，所以前端就展示不出来用户）

**方法二：（推荐使用）**

**因为我们不可能老是自己去数据库修改具体的值，所以这里我们使用用户下单的consignee来显示，数据库中也有，但是数据库中的consignee是可以为null的，所以在后台代码中帮订单添加该属性的时候要判断是否null！然后就是去修改前端代码就行:**

修改ordei下的list,把72行的userName改成**consignee就行；**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.3sf092gzvk60.webp)

测试效果：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.48iyk4xfsy60.webp)

## 手机端减少购物车中的菜品或者套餐数量

前端请求： http://localhost:8080/shoppingCart/sub

请求方式：post

携带参数可能是dish_id 也可能是 setmealId，所以我们需要实体类shoppingCart来接收;

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.4wcvkecm2zk0.webp)

+ 编写处理器

```java
    /**
     *客户端的套餐或者是菜品数量减少设置
     *没必要设置返回值
     * @param shoppingCart
     * @return
     */
    @PostMapping("/sub")
    @Transactional
    public R<ShoppingCart> sub(@RequestBody ShoppingCart shoppingCart){

        Long dishId = shoppingCart.getDishId();
        LambdaQueryWrapper<ShoppingCart> queryWrapper = new LambdaQueryWrapper<>();
        //代表数量减少的是菜品数量
        if(dishId!=null){
            //通过dishId查出购物车对象
            //这里必须要加两个条件，否则会出现用户互相修改对方与自己购物车中相同套餐或者是菜品的数量
            queryWrapper.eq(ShoppingCart::getDishId,dishId)
                    .eq(ShoppingCart::getUserId,BaseContext.getCurrentId());
            ShoppingCart cart1= shoppingCartService.getOne(queryWrapper);
            cart1.setNumber(cart1.getNumber()-1);
            Integer LatestNumber = cart1.getNumber();
            if(LatestNumber>0) {
                //对操作的数据进行更新
                shoppingCartService.updateById(cart1);
            }else if(LatestNumber==0){
                //如果购物车的菜品数量减为0，那么就把菜品从购物车删除
                shoppingCartService.removeById(cart1.getId());
            }else if(LatestNumber<0){
                return R.error("操作异常");
            }
            return R.success(cart1);

        }
        Long setmealId = shoppingCart.getSetmealId();
        if(setmealId!=null){
            //代表是套餐数量减少
            queryWrapper.eq(ShoppingCart::getSetmealId,setmealId)
                    .eq(ShoppingCart::getUserId,BaseContext.getCurrentId());
            ShoppingCart cart2 = shoppingCartService.getOne(queryWrapper);
            cart2.setNumber(cart2.getNumber()-1);
            Integer LatestNumber = cart2.getNumber();
            if(LatestNumber>0){
                //对操作数据更新
                shoppingCartService.updateById(cart2);
            }else if(LatestNumber==0){
                //如果购物车的套餐数量减为0，那么就把套餐从购物车删除
                shoppingCartService.removeById(cart2.getId());
            }else if(LatestNumber<0){
                return R.error("操作异常");
            }
            return R.success(cart2);
        }
        //如果两个大if判断都进不去
        return R.error("操作异常");

    }
```

+ 经过测试，无错误

## 用户查看自己订单

前端发送请求

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.5j69hlb9mvw0.webp)

在OrderController中添加下面的方法；

```java
    @GetMapping("/userPage")
    public R<Page> page(int page,int pageSize){

        //分页构造器对象
        Page<Orders> pageInfo = new Page<>(page, pageSize);
        //构造条件查询对象
        LambdaQueryWrapper<Orders> queryWrapper = new LambdaQueryWrapper<>();
        //添加排序条件，根据更新时间降序排列
        queryWrapper.orderByDesc(Orders::getOrderTime);
        orderService.page(pageInfo,queryWrapper);
        return R.success(pageInfo);
    }
```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.4t5vcofr2420.webp)

**其实这里还没有完善！！！下面继续完善代码；**

通过order.html这个页面我们可以发现：前端还需要下面这些数据；所以我们后端要传给它。。。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.2qvajx45xqk0.webp)

 分析前端代码: 这个item是从order.orderDetails里面 获取到的，但是orders实体类里面并没有orderDetails这个属性，而且数据库中这个order表里面也没有这个字段，所以这里我使用的是dto来封装数据给前端，这就需要使用到dto对象的分页查询了，，，，，而且离谱的是前端就是传了一个分页页面大小的数据，，，，所以我们只能从本地线程中获取用户id开始，，一路查询数据。。。。。

创建OrdersDto实体类:

```java
@Data
public class OrderDto extends Orders {

    private List<OrderDetail> orderDetails;
}
```

+ 编写处理器

```java
    //抽离的一个方法，通过订单id查询订单明细，得到一个订单明细的集合
    //这里抽离出来是为了避免在stream中遍历的时候直接使用构造条件来查询导致eq叠加，从而导致后面查询的数据都是null
    public List<OrderDetail> getOrderDetailListByOrderId(Long orderId){
        LambdaQueryWrapper<OrderDetail> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(OrderDetail::getOrderId,orderId);
        List<OrderDetail> orderDetailList = orderDetailService.list(queryWrapper);
        return orderDetailList;
    }

    /**
     * 用户端展示自己的订单分页查询
     * @param page
     * @param pageSize
     * @return
     * 正确方法:直接从分页对象中获取订单id就行，问题大大简化了
     */
    @GetMapping("/userPage")
    public R<Page> page(int page,int pageSize){
        //分页构造器对象
        Page<Orders> pageInfo = new Page<>(page, pageSize);
        Page<OrderDto> pageDto = new Page<>(page, pageSize);
        //构造条件查询对象
        LambdaQueryWrapper<Orders> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Orders::getUserId,BaseContext.getCurrentId());
        //这里是直接把当前用户分页的结果查询出来，要添加用户id作为查询条件，否则会出现用户可以查询到其他用户的订单情况
        //添加排序条件，根据更新时间排序
        queryWrapper.orderByDesc(Orders::getOrderTime);
        orderService.page(pageInfo,queryWrapper);

        //通过OrderId查询对应的OrderDetail
        LambdaQueryWrapper<OrderDetail> queryWrapper2 = new LambdaQueryWrapper<>();

        //对OrderDto进行需要的属性赋值
        List<Orders> records = pageInfo.getRecords();
        List<OrderDto> orderDtoList = records.stream().map((item) -> {
            OrderDto orderDto = new OrderDto();
            //此时的orderDto对象里面orderDetails属性还是空，下面准备为他赋值
            Long orderId = item.getId();//获取订单Id
            List<OrderDetail> orderDetailList = this.getOrderDetailListByOrderId(orderId);
            BeanUtils.copyProperties(item, orderDto);
            //对orderDto进行orderDetails属性赋值
            orderDto.setOrderDetails(orderDetailList);
            return orderDto;
        }).collect(Collectors.toList());

        BeanUtils.copyProperties(pageInfo,pageDto,"records");
        pageDto.setRecords(orderDtoList);
        return R.success(pageDto);
    }
```

+ 测试下单

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.2q6rx6wrefu0.webp)

+ **点击去支付，然后点击去查看订单：**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.4tnhur36c880.webp)

## 移动端的再来一单功能

**由于这里没有写后台的确认订单功能，所以这里通过数据库修改订单状态来完成测试！**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.2jc4frrzf080.webp)

在order.html中可以看见这样一段前端代码:

```html
  <div class="btn" v-if="order.status === 4">//状态是4才会让你点击下面这个再来一单
        <div class="btnAgain" @click="addOrderAgain(order)">再来一单</div>
  </div>
```

然后找到addOrderAgain这个方法：前端使用post请求，请求地址order/again：

```javascript
//再来一单
function orderAgainApi(data) {
  return $axios({
      'url': '/order/again',
      'method': 'post',
      data
  })
}
```

+ 编写处理器

```java

```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.3m00dj9tmes0.webp)

+ 点击再来一单

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.40l7tsznnn60.webp)

并且购物车表中也有数据：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.726dhlxuxos0.webp)

## 移动端点击套餐图片查看套餐具体菜品

点击移动端套餐的图片，发现会向后端发送一个get请求，浏览器具体请求的图片我就不放了，我在前端页面找到了对应的axios请求：

```javascript
//获取菜品分类对应的菜品
function dishListApi(data) {
    return $axios({
        'url': '/dish/list',
        'method': 'get',
        params:{...data}
    })
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.3wg8ouy1h8y0.webp)

+ 编写处理器

```java

```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.1cgzu1p480hs.webp)

## 删除地址

前端点击删除地址：然后发送删除请求到后端

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.7cqu84vwpow0.webp)

在后端使用controller接收：

```java
    /**
     * 删除地址
     * @param id
     * @return
     */
    @DeleteMapping
    public R<String> delete(@RequestParam("id") Long id){
        if(id==null){
            return R.error("请求异常");
        }
        LambdaQueryWrapper<AddressBook> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(AddressBook::getId,id).eq(AddressBook::getUserId,BaseContext.getCurrentId());
        addressBookService.remove(queryWrapper);
        //addressBookService.removeById(id);直接使用这个removeById不太严谨.....
        return R.success("删除地址成功");
    }
```

## 修改地址

点击修改符号，发现回显信息已经写好了；

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.1q0zdzdz9ctc.webp)

+ 编写处理器

```java
    /**
     * 修改地址
     * @param addressBook
     * @return
     */
    @PutMapping
    public R<String> update(@RequestBody AddressBook addressBook){

        if(addressBook==null){
            return R.error("请求异常");
        }
        addressBookService.updateById(addressBook);
        return R.success("修改成功");

    }
```

## 后台订单状态的修改

在后台订单明细中点击派送按钮：前端会发送下面的请求来：是json格式的数据；

请求地址：http://localhost:8088/order

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.e884zpstk6o.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.4916bv7pdda0.webp)

+ 编写处理器

```java
    /**
     * 修改订单状态
     * @param map
     * @return
     */
    @PutMapping
    public R<String> orderStatusChange(@RequestBody Map<String,String> map){
        String id = map.get("id");
        Long orderId = Long.parseLong(id);
        Integer status = Integer.parseInt(map.get("status"));
        if(orderId==null||status==null){
           return R.error("传入信息不合法");
        }
        Orders orders = orderService.getById(orderId);
        orders.setStatus(status);
        orderService.updateById(orders);

        return R.success("订单信息修改成功");
    }
```

+ 测试，派送6月6日的订单

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.5k9qwxvxiro0.webp)

## 移动端登陆退出功能

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220715/image.77tlrb1jkb00.webp)

+ 编写处理器

```java
    /**
     * C端用户退出功能
     * ①在controller中创建对应的处理方法来接受前端的请求，请求方式为post；
     * ②清理session中的用户id
     * ③返回结果（前端页面会进行跳转到登录页面）
     * @param request
     * @return
     */
    @PostMapping("/loginout")
    public R<String> logout(HttpServletRequest request){
        request.removeAttribute("user");
        return R.success("退出成功");
    }
```

