---
title: 瑞吉外卖-套餐管理业务开发
date: 2022-05-12 17:15:21
permalink: /pages/fcadd4/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-套餐管理业务开发

[[toc]]

## 效果展示

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.105t4alndguo.webp)

## 新增套餐

### 需求分析

套餐就是菜品的集合。

后台系统中可以管理套餐信息，通过新增套餐功能来添加一个新的套餐，在添加套餐时需要选择当前套餐所属的套餐分类和包含的菜品，并且需要上传套餐对应的图片，在移动端会按照套餐分类来展示对应的套餐。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220512/image.vo164su4ghs.webp)

### 数据模型

新增套餐，其实就是将新增页面录入的套餐信息插入到setmeal表，还需要向setmeal_dish表插入套餐和菜品关联数据。所以在新增套餐时，涉及到两个表：

+ setmeal 套餐表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220512/image.28a173my4qo0.webp)

### 代码开发

#### 准备工作

在开发业务功能前，先将需要用到的类和接口基本结构创建好:

+ 实体类SetmealDish 

```java
/**
 * 套餐菜品关系
 */
@Data
public class SetmealDish implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    //套餐id
    private Long setmealId;

    //菜品id
    private Long dishId;

    //菜品名称 （冗余字段）
    private String name;

    //菜品原价
    private BigDecimal price;

    //份数
    private Integer copies;

    //排序
    private Integer sort;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    @TableField(fill = FieldFill.INSERT)
    private Long createUser;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateUser;

    //是否删除
    private Integer isDeleted;
}
```

+ DTO SetmealDto

```java
@Data
public class SetmealDto extends Setmeal {

    private List<SetmealDish> setmealDishes;

    private String categoryName;
}
```

+ Mapper接口SetmealDishMapper

```java
public interface SetmealDishMapper extends BaseMapper<SetmealDish> {
}
```

+ 业务层接口SetmealDishService

```java
public interface SetmealDishService extends IService<SetmealDish> {
}
```

+ 业务层实现类SetmealDishServicelmpl

```java
@Service
@Slf4j
public class SetmealDishServiceImpl extends ServiceImpl<SetmealDishMapper, SetmealDish> implements SetmealDishService{
}
```

+ 控制层SetmealController

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/5/12  18:16
 * 套餐管理
 */
@RestController
@RequestMapping("/setmeal")
@Slf4j
public class SetmealController {

    @Autowired
    private SetmealService setmealService;

    @Autowired
    private SetmealDishService setmealDishService;
}
```

#### 梳理交互过程

在开发代码之前，需要梳理一下新增套餐时前端页面和服务端的交互过程：

1. 页面(backend/page/combo/add.html)发送ajax请求，请求服务器获取**套餐分类**数据并展示到下拉框中
2. 页面发送ajax请求，请求服务端获取**菜品分类**数据并展示到添加菜品窗口中
3. 页面发送ajax请求，请求服务端，根据菜品分类查询对应的**菜品**数据并展示到添加菜品窗口中
4. 页面发送请求进行**图片上传**，请求服务端将图片保存到服务器
5. 页面发送请求进行**图片下载**，将上传的图片进行回显
6. 点击保存按钮，发送ajax请求，将**套餐**相关数据以json形式提交到服务端

开发新增套餐功能，其实就是在服务端编写代码去处理前端页面发送的这6次请求即可。

+ 编写控制器

```java
    /**
     *根据条件查询对应的菜品数据
     * @param dish
     * @return
     */
    @GetMapping("/list")
    public R<List<Dish>> list(Dish dish){

        //构造查询条件
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(dish.getCategoryId()!=null,Dish::getCategoryId,dish.getCategoryId());

        //添加排序条件
        queryWrapper.orderByAsc(Dish::getSort).orderByDesc(Dish::getUpdateTime);
        List<Dish> list = dishService.list(queryWrapper);

        return R.success(list);
    }
```

+ 新增套餐分析

![OB7aQS.png](https://s1.ax1x.com/2022/05/12/OB7aQS.png)

+ SermelService.java

```java
public interface SetmealService extends IService<Setmeal> {

    /**
     * 新增套餐，同时需要保存套餐和菜品的关系
     * @param setmealDto
     */
    public void saveWithDish(SetmealDto setmealDto);
}
```

+ SermealServiceImpl.java

```java
@Service
@Slf4j
public class SermealServiceImpl extends ServiceImpl<SetmealMapper, Setmeal> implements SetmealService {


    @Autowired
    private SetmealDishService setmealDishService;

    //新增套餐，同时需要保存套餐和菜品的关系
    @Transactional
    @Override
    public void saveWithDish(SetmealDto setmealDto) {
        //保存套餐的基本信息,操作setmeal表，执行insert操作

        this.save(setmealDto);

        List<SetmealDish> setmealDishes = setmealDto.getSetmealDishes();
        setmealDishes.stream().map((item) ->{
            item.setSetmealId(setmealDto.getId());
            return item;
        }).collect(Collectors.toList());
        //保存套餐和菜品的关联信息,操作setmeal_dish,执行insert操作
        setmealDishService.saveBatch(setmealDishes);
    }
}
```

+ 编写控制器

```java
    /**
     * 新增套餐
     * @param setmealDto
     * @return
     */
    @PostMapping
    public R<String> save(@RequestBody SetmealDto setmealDto){
        log.info("套餐信息:{}",setmealDto);
        setmealService.saveWithDish(setmealDto);
        return null;
    }
```

### 功能测试

![OBj2NQ.png](https://s1.ax1x.com/2022/05/12/OBj2NQ.png)

::: details 控制台输出

```java
2022-05-12 23:04:21.743  INFO 15836 --- [nio-8088-exec-5] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/setmeal
2022-05-12 23:04:21.743  INFO 15836 --- [nio-8088-exec-5] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1
2022-05-12 23:04:21.743  INFO 15836 --- [nio-8088-exec-5] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:44
2022-05-12 23:04:21.786  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.controller.SetmealController  : 套餐信息:SetmealDto(setmealDishes=[SetmealDish(id=null, setmealId=null, dishId=1397851370462687234, name=邵阳猪血丸子, price=13800, copies=1, sort=null, createTime=null, updateTime=null, createUser=null, updateUser=null, isDeleted=null), SetmealDish(id=null, setmealId=null, dishId=1397850140982161409, name=毛氏红烧肉, price=6800, copies=1, sort=null, createTime=null, updateTime=null, createUser=null, updateUser=null, isDeleted=null), SetmealDish(id=null, setmealId=null, dishId=1413384757047271425, name=王老吉, price=500, copies=1, sort=null, createTime=null, updateTime=null, createUser=null, updateUser=null, isDeleted=null), SetmealDish(id=null, setmealId=null, dishId=1413385247889891330, name=米饭, price=200, copies=1, sort=null, createTime=null, updateTime=null, createUser=null, updateUser=null, isDeleted=null)], categoryName=null)
2022-05-12 23:04:21.793 ERROR 15836 --- [nio-8088-exec-5] c.a.druid.pool.DruidAbstractDataSource   : discard long time none received connection. , jdbcUrl : jdbc:mysql://localhost:3306/reggie?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true, jdbcUrl : jdbc:mysql://localhost:3306/reggie?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true, lastPacketReceivedIdleMillis : 135644
2022-05-12 23:04:21.795 ERROR 15836 --- [nio-8088-exec-5] c.a.druid.pool.DruidAbstractDataSource   : discard long time none received connection. , jdbcUrl : jdbc:mysql://localhost:3306/reggie?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true, jdbcUrl : jdbc:mysql://localhost:3306/reggie?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true, lastPacketReceivedIdleMillis : 170782
Creating a new SqlSession
Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4f8b98c0]
2022-05-12 23:04:21.865  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : 公共字段自动填充[insert]...
2022-05-12 23:04:21.865  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : org.apache.ibatis.reflection.MetaObject@74564133
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@76ddf8da] will be managed by Spring
==>  Preparing: INSERT INTO setmeal ( id, category_id, name, price, status, code, description, image, create_time, update_time, create_user, update_user ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
==> Parameters: 1524767442772692993(Long), 1413342269393674242(Long), 商务套餐-B套餐(String), 30000(BigDecimal), 1(Integer), (String), 无(String), 23a8e88a-e9b7-4d42-bf62-e289b4ad4f50.jpg(String), 2022-05-12T23:04:21.865(LocalDateTime), 2022-05-12T23:04:21.865(LocalDateTime), 1(Long), 1(Long)
<==    Updates: 1
Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4f8b98c0]
2022-05-12 23:04:22.275  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : 公共字段自动填充[insert]...
2022-05-12 23:04:22.275  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : org.apache.ibatis.reflection.MetaObject@7be389ad
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@76ddf8da] will be managed by Spring
==>  Preparing: INSERT INTO setmeal_dish ( id, setmeal_id, dish_id, name, price, copies, create_time, update_time, create_user, update_user ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
==> Parameters: 1524767444664324097(Long), 1524767442772692993(Long), 1397851370462687234(Long), 邵阳猪血丸子(String), 13800(BigDecimal), 1(Integer), 2022-05-12T23:04:22.275(LocalDateTime), 2022-05-12T23:04:22.275(LocalDateTime), 1(Long), 1(Long)
2022-05-12 23:04:22.276  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : 公共字段自动填充[insert]...
2022-05-12 23:04:22.276  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : org.apache.ibatis.reflection.MetaObject@5ca54c0d
==> Parameters: 1524767444664324098(Long), 1524767442772692993(Long), 1397850140982161409(Long), 毛氏红烧肉(String), 6800(BigDecimal), 1(Integer), 2022-05-12T23:04:22.276(LocalDateTime), 2022-05-12T23:04:22.276(LocalDateTime), 1(Long), 1(Long)
2022-05-12 23:04:22.277  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : 公共字段自动填充[insert]...
2022-05-12 23:04:22.277  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : org.apache.ibatis.reflection.MetaObject@5f122f21
==> Parameters: 1524767444664324099(Long), 1524767442772692993(Long), 1413384757047271425(Long), 王老吉(String), 500(BigDecimal), 1(Integer), 2022-05-12T23:04:22.277(LocalDateTime), 2022-05-12T23:04:22.277(LocalDateTime), 1(Long), 1(Long)
2022-05-12 23:04:22.278  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : 公共字段自动填充[insert]...
2022-05-12 23:04:22.278  INFO 15836 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : org.apache.ibatis.reflection.MetaObject@1995267f
==> Parameters: 1524767444664324100(Long), 1524767442772692993(Long), 1413385247889891330(Long), 米饭(String), 200(BigDecimal), 1(Integer), 2022-05-12T23:04:22.278(LocalDateTime), 2022-05-12T23:04:22.278(LocalDateTime), 1(Long), 1(Long)
Transaction synchronization committing SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4f8b98c0]
Transaction synchronization deregistering SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4f8b98c0]
Transaction synchronization closing SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4f8b98c0]
2022-05-12 23:04:22.687  INFO 15836 --- [nio-8088-exec-7] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/setmeal/page
2022-05-12 23:04:22.687  INFO 15836 --- [nio-8088-exec-7] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1
2022-05-12 23:04:22.687  INFO 15836 --- [nio-8088-exec-7] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:46
2022-05-12 23:04:22.687  WARN 15836 --- [nio-8088-exec-7] o.s.web.servlet.PageNotFound             : No mapping for GET /setmeal/page
```

:::

## 套餐信息分页显示

### 需求分析

系统中的套餐数据很多的时候，如果在一个页面中全部展示出来会显得比较乱，不便于查看，所以一般的系统中都会以分页的方式来展示列表数据。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.6jjmynhlbps0.webp)

### 代码开发

#### 梳理交互过程

在开发代码之前，需要梳理一下套餐分页查询时前端页面和服务端的交互过程:

1. 页面(backend/page/combo/list.htmit)发送ajax请求，将分页查询参数(page、pageSize,name)提交到服务端，获取分页数据
2. 页面发送请求，请求服务端进行图片下载，用于页面图片展示

开发套餐信息分页查询功能，其实就是在服务端编写代码去处理前端页面发送的这2次请求即可。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220514/image.6ads7by1xew0.webp)

+ 编写处理器

```java
    /**
     * 分页显示套餐信息
     * @param page
     * @param pageSize
     * @param name
     * @return
     */
    @GetMapping("/page")
    public R<Page> page(int page,int pageSize,String name){

        //构建分页构造器对象
        Page<Setmeal> pageInfo= new Page<>(page, pageSize);
        Page<SetmealDto> dtoPage = new Page<>();

        LambdaQueryWrapper<Setmeal> queryWrapper=new LambdaQueryWrapper<>();
        //添加查询条件,根据name进行like模糊查询
        queryWrapper.like(name!=null,Setmeal::getName,name);
        //添加排序条件，根据更新时间来降序排列
        queryWrapper.orderByDesc(Setmeal::getUpdateTime);

        setmealService.page(pageInfo,queryWrapper);

        //对象拷贝
        BeanUtils.copyProperties(pageInfo,dtoPage,"records");
        List<Setmeal> records = pageInfo.getRecords();

        List<SetmealDto> list =records.stream().map((item)-> {
            SetmealDto setmealDto = new SetmealDto();
            //对象拷贝
            BeanUtils.copyProperties(item,setmealDto);
            //分类id
            Long categoryId = item.getCategoryId();
            Category category = categoryService.getById(categoryId);
            if (category != null) {
                //分类名称
                String categoryName = category.getName();
                setmealDto.setCategoryName(categoryName);
            }
            return setmealDto;
        }).collect(Collectors.toList());
        dtoPage.setRecords(list);
        return R.success(dtoPage);
    }
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220514/image.2fnhpwqlgjms.webp)

## 修改套餐状态

修改套餐状态为停售状态的

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220514/image.5z0kevipdxs0.webp)

+ 编写处理器

```java
    /**
     * 修改套餐状态
     * @param status
     * @param ids
     */
    @PostMapping("/status/{status}")
    public R<String> status(@PathVariable Integer status, @RequestParam  List<Long> ids) {
        Setmeal setmeal = new Setmeal();
        for (Long dishId : ids) {
            setmeal.setId(dishId);
            setmeal.setStatus(status);
            setmealService.updateById(setmeal);
        }
        return R.success("修改成功");
    }
```

+ 停售儿童套餐

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220514/image.5bbkn2xiwq40.webp)

## 删除套餐

### 需求分析

套餐管理列表页面点击删除按钮，可以删除对应的套餐信息。也可以通过复选框选择多个套餐，点击批量删余按钮一次删除多个套餐。注意，对于状态为售卖中的套餐不能删除，需要先停售，然后才能删除。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220514/image.191bomvyw468.webp)

#### 梳理交互过程

在开发代码之前，需要梳理一下删除套餐时前端页面和服务端的交互过程:

1. 删除单个套餐时，页面发送ajax请求，根据套餐id删除对应套餐

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220514/image.4c4car5bocw0.webp)

2. 删除多个套餐时，页面发送ajax请求，根据提交的多个套餐id删除对应套餐

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220514/image.6tfafmf57to0.webp)

开发删除套餐功能，其实就是在服务端编写代码去处理前端页面发送的这2次请求即可。

观察删除单个套餐和批量删除套餐的请求信息可以发现，两种请求的**地址**和**请求方式**都是相同的不同的则是传递的id个数，所以在服务端可以提供一个方法来统一处理。     

+  SetmealService.java

```java
    /**
     * 删除套餐，同时需要删除套餐和菜品关联的数据
     * @param ids
     */
    public void removeWithDish(List<Long> ids);
```

+ SermealServiceImpl.java

```java
    /**
     * 删除套餐，同时需要删除套餐和菜品关联的数据
     * @param ids
     */
	@Transactional
    @Override
    public void removeWithDish(List<Long> ids) {

        //select count(*) from setmeal where id in (1,2,3) and status = 1
        //查询套餐状态，确定是否可用删除
        LambdaQueryWrapper<Setmeal> queryWrapper=new LambdaQueryWrapper();
        queryWrapper.in(Setmeal::getId,ids);
        queryWrapper.eq(Setmeal::getStatus,1);
        int count = this.count(queryWrapper);
        if(count>0){
            //如果不能删除，直接抛出一个业务异常
            throw new CustomException("套餐正在售卖中，不能删除");
        }

        //如果可以删除，先删除套餐表中的数据--setmeal
        this.removeByIds(ids);

        //删除关系表中的数据--setmeal_dish
        //delete from setmeal_dish where setmeal.id in (1,2,3)
        LambdaQueryWrapper<SetmealDish> lambdaQueryWrapper=new LambdaQueryWrapper<>();
        lambdaQueryWrapper.in(SetmealDish::getSetmealId,ids);

        //删除关系表中的数据--setmeal_dish
        setmealDishService.remove(lambdaQueryWrapper);
    }
```

+ 编写处理器

```java
    /**
     * 删除套餐
     * @param ids
     * @return
     */
    @DeleteMapping
    public R<String> delete(@RequestParam List<Long> ids){
        log.info("ids:{}",ids);
        setmealService.removeWithDish(ids);
        return R.success("套餐数据删除成功");
    }
```

### 功能测试

+ 删除售卖中的

![OchVMT.png](https://s1.ax1x.com/2022/05/14/OchVMT.png)

+ 删除停售的儿童套餐

![OchJsO.png](https://s1.ax1x.com/2022/05/14/OchJsO.png)