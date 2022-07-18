---
title: 瑞吉外卖-缓存优化
date: 2022-07-16 20:30:59
permalink: /pages/908199/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-缓存优化

[[toc]]

## 缓存优化

### 问题说明

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220716/image.70oaqxdpgbc.webp)

**用户数量多，系统访问量大频繁访问数据库，系统性能下降，用户体验差**

## 使用git管理代码

+ https://github.com/xustudyxu/reggie_take_out

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220717/image.31tqmz4e17k0.webp)

## 环境搭建

### maven坐标

在项目的pom.xm1文件中导入spring data redis的maven坐标:

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 配置文件

在项目的application.yml中加入redis相关配置:

```yaml
spring
    redis:
        host: 192.168.91.200
        port: 6379
        database: 0
```

### 配置类

在项目中加入配置类RedisConfig:

```java
@Configuration
public class RedisConfig extends CachingConfigurerSupport {
    @Bean
    public RedisTemplate<Object,Object> redisTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<Object,Object> redisTemplate = new RedisTemplate<>();
        //默认的Key序列化器为: JdkSerializationRedisSerializer
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setConnectionFactory( connectionFactory) ;
        return redisTemplate;
    }
}
```

可以用StringRedisTemplate就不用配置类

## 缓存短信验证码

### 实现思路

前面我们已经实现了移动端手机验证码登录，随机生成的验证码我们是保存在HttpSession中的。现在需要改造为将验证码缓存在Redis中，具体的实现思路如下:

1、在服务端UserController中注入RedisTemplate对象，用于操作Redis

```java
    @Autowired
    private RedisTemplate redisTemplate;
```

2、在服务端UserController的sendMsg方法中，将随机生成的验证码缓存到Redis中，并设置有效期为5分钟

```java {21}
    /**
     * 发送手机短信验证码
     * @param user
     * @param session
     * @return
     */
    @PostMapping("/sendMsg")
    public R<String> sendMsg(@RequestBody User user, HttpSession session){
        //获取手机号
        String phone=user.getPhone();

        if(StringUtils.isNotEmpty(phone)){
            //生成随机四位验证码
            String code = ValidateCodeUtils.generateValidateCode(4).toString();
            log.info("code={}",code);

//            //需要将生成的验证码保存到Session
//            session.setAttribute(phone,code);

            //将生成的验证码缓存到redis中，有效期为5分钟
            redisTemplate.opsForValue().set(phone,code,5, TimeUnit.MINUTES);

            return R.success("手机验证码短信发送成功");

        }

        return R.error("短信发送失败");
    }
```

3、在服务端UserController的login方法中，从Redis中获取缓存的验证码，如果登录成功则删除Redis中的验证码

```java {20,37}
    /**
     * 移动端用户登录
     * @param map
     * @param session
     */
    @PostMapping("/login")
    public R<User> login(@RequestBody Map map,HttpSession session){

        log.info(map.toString());

        //获取手机号
        String phone = map.get("phone").toString();

        //获取验证码
        String code = map.get("code").toString();

        //从Session中获取保存的验证码
//        Object codeInSession = session.getAttribute(phone);
        //从redis中获取缓存的验证码
        Object codeInSession = redisTemplate.opsForValue().get(phone);

        //进行验证码的比对(页面提交的验证码和Session中保存的验证码比对)
        if(codeInSession!=null&&codeInSession.equals(code)) {
            //判断当前手机号对应的用户是否为新用户，如果是新用户就自动完成注册
            LambdaQueryWrapper<User> queryWrapper=new LambdaQueryWrapper<>();
            queryWrapper.eq(User::getPhone,phone);
            User user = userService.getOne(queryWrapper);
            if(user==null){
                //判断当前手机号对应的用户是否为新用户，如果是新用户就自动完成注册
                user=new User();
                user.setPhone(phone);
                user.setStatus(1);
                userService.save(user);
            }
            session.setAttribute("user",user.getId());
            //如果用户登录成功则删除Redis中缓存的验证码
            redisTemplate.delete(phone);
            return R.success(user);
        }

        return R.error("登录失败");
    }
```

## 缓存菜品数据

### 实现思路

前面我们已经实现了移动端菜品查看功能，对应的服务端方法为DishController的list方法，此方法会根据前端提交的查询条件进行数据库查询操作。在高并发的情况下，频繁查询数据库会导致系统性能下降，服务端响应时间增长。现在需要对此方法进行缓存优化，提高系统的性能。

具体的实现思路如下:

1、改造DishController的list方法，先从Redis中获取菜品数据，如果有则直接返回，无需查询数据库;如果没有则查询数据库，并将查询到的菜品数据放入Redis。

```java {10-20,56}
    /**
     * 根据条件查询对应的菜品数据
     *
     * @param dish
     * @return
     */
    @GetMapping("/list")
    public R<List<DishDto>> list(Dish dish) {
        List<DishDto> dishDtoList=null;
        //动态构造key
        String key = "dish_"+dish.getCategoryId()+"_"+dish.getStatus();//dish_12346564616163166_1

        //先从redis中获取缓存数据

        dishDtoList=(List<DishDto>) redisTemplate.opsForValue().get("key");
        //如果存在，直接返回，无需查询数据
        if(dishDtoList!=null){
            //如果存在，就直接返回，无需查询数据库
            return R.success(dishDtoList);
        }

        //构造查询条件
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(dish.getCategoryId() != null, Dish::getCategoryId, dish.getCategoryId());

        //添加条件，查询条件为1(起售)
        queryWrapper.eq(Dish::getStatus, 1);

        //添加排序条件
        queryWrapper.orderByAsc(Dish::getSort).orderByDesc(Dish::getUpdateTime);
        List<Dish> list = dishService.list(queryWrapper);

        dishDtoList = list.stream().map((item) -> {
            DishDto dishDto = new DishDto();

            BeanUtils.copyProperties(item, dishDto);
            Long categoryId = item.getCategoryId();//分类Id
            //根据id查询分类对象
            Category category = categoryService.getById(categoryId);
            if (category != null) {
                String categoryName = category.getName();
                dishDto.setCategoryName(categoryName);
            }
            //当前菜品Id
            Long dishId = item.getId();

            LambdaQueryWrapper<DishFlavor> lambdaQueryWrapper = new LambdaQueryWrapper<>();
            lambdaQueryWrapper.eq(DishFlavor::getDishId, dishId);
            //SQL:select * from dish_flavor where dish_id = ?
            List<DishFlavor> dishFlavorList = dishFlavorService.list(lambdaQueryWrapper);
            dishDto.setFlavors(dishFlavorList);
            return dishDto;
        }).collect(Collectors.toList());

        //如果不存在，需要查询数据库，将查询到的菜品数据缓存到redis
        redisTemplate.opsForValue().set(key,dishDtoList,60, TimeUnit.MINUTES);

        return R.success(dishDtoList);
    }
```

+ 测试
  + 18129035311是我登录的手机号，9294就是我的验证码，有效期五分钟，登陆成功后会清除缓存

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220717/image.s2nfir3wiuo.webp)

2、改造DishController的save和update方法，加入清理缓存的逻辑

+ save

```java {12-16}
    /**
     * 新增菜品
     *
     * @param dishDto
     * @return
     */
    @PostMapping
    public R<String> save(@RequestBody DishDto dishDto) {
        log.info(dishDto.toString());
        dishService.saveWithFlavor(dishDto);
        //清理所有菜品缓存数据
        //Set keys = redisTemplate.keys("dish_*");
        //redisTemplate.delete(keys);
        //清理某个分类下面的菜品缓存数据
        Object key = redisTemplate.opsForValue().get("dish_" + dishDto.getCategoryId() + "_" + dishDto.getStatus());
        redisTemplate.delete(key);
        return R.success("新增菜品成功");

    }
```

+ update

```java {12-16}
    /**
     * 修改菜品
     *
     * @param dishDto
     * @return
     */
    @PutMapping
    public R<String> update(@RequestBody DishDto dishDto) {
        log.info(dishDto.toString());
        dishService.updateWithFlavor(dishDto);
        //清理所有菜品缓存数据
        //Set keys = redisTemplate.keys("dish_*");
        //redisTemplate.delete(keys);
        //清理某个分类下面的菜品缓存数据
        String key="dish_"+dishDto.getCategoryId()+"_"+dishDto.getStatus();
        redisTemplate.delete(key);

        return R.success("修改菜品成功");

    }
```

## Spring Cache 框架

### Spring Cache介绍

Spring cache是一个框架，实现了基于注解的缓存功能，只需要简单地加一个注解，就能实现缓存功能。

Spring Cache提供了一层抽象，底层可以切换不同的cache实现。具体就是通过CacheManager接口来统一不同的缓存技术。

CacheManager是Spring提供的各种缓存技术抽象接口。

针对不同的缓存技术需要实现不同的CacheManager:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.5u5hxiuqxo00.webp)

### Spring Cache 常用注解

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.70nq6f8rvrc0.webp)

在spring boot项目中，使用缓存技术只需在项目中导入相关缓存技术的依赖包，并在启动类上使用@EnableCaching开启缓存支持即可。

例如，使用Redis作为缓存技术，只需要导入Spring data Redis的maven坐标即可。

### Spring Cache使用方式

在Spring Boot项目中使用Spring Cache的操作步骤(使用redis缓存技术);

1、导入maven坐标

- spring-boot-starter-data-redis、spring-boot-starter-cache

2、配置application.yml

```yaml
spring:
    cache:
        redis:
            time-to-live: 1800000#设置缓存有效期
```

3、在启动类上加入@EnableCaching注解，开启缓存注解功能

4、在Controller的方法上加入@Cacheable、@CacheEvict等注解，进行缓存操作

## 缓存套餐数据

### 实现思路

前面我们已经实现了移动端套餐查看功能，对应的服务端方法为SetmealController的list方法，此方法会根据前端提交的查询条件进行数据库查询操作。在高并发的情况下，频繁查询数据库会导致系统性能下降，服务端响应时间增长。现在需要对此方法进行缓存优化，提高系统的性能。

具体的实现思路如下:

1、导入Spring Cache和Redis相关maven坐标

2、在application.yml中配置缓存数据的过期时间

3、在启动类上加入@EnableCaching注解，开启缓存注解功能

4、在SetmealController的list方法上加入@Cacheable注解

5、在SetmealController的save和delete方法上加入CacheEvict注解

### 代码改造

在pom.xml文件中导入maven坐标:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

在application.yml中配置缓存数据过期时间:

```yaml
cache:
    redis:
        time-to-live: 1800000 #设置缓存数据过期时间
```

在启动类@EnableCaching注解

在list方法上添加注解，实现在redis里添加缓存：

```java
@Cacheable(value = "setmealCache",key = "#setmeal.categoryId+'_'+#setmeal.status")
```

在edit,save，delete方法上添加注解，清除缓存：

```java
@CacheEvict(value = "setmealCache",allEntries = true)
```

+ 验证

```sh
127.0.0.1:6379> keys *
1) "setmealCache::1413342269393674242_1"
2) "dish_1397844391040167938_1"
3) "dish_1397844263642378242_1"
```

经过测试，执行edit,save，delete方法后缓存能删掉

```sh
127.0.0.1:6379> keys *
1) "dish_1397844263642378242_1"
4) "dish_1397844391040167938_1"
```

::: warning

要让R实现Serializable接口（序列化），注解才能生效

:::

