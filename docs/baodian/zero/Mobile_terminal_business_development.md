---
title: 瑞吉外卖-移动端业务开发
date: 2022-06-01 21:26:22
permalink: /pages/93eacc/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-移动端业务开发

[[toc]]

## 用户地址薄

### 需求分析

地址簿，指的是移动端消费者用户的地址信息，用户登录成功后可以维护自己的地址信息。同一个用户可以有多个地址信息，但是只能有一个**默认地址**。

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220601/image.sttrnfhslnk.webp)

### 数据模型

用户的地址信息会存储在address_book表，即地址簿表中。具体表结构如下:

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220601/image.7fz82c69h1c0.webp)

### 开发用户地址簿功能

+ 编写实体类AddressBook

```java
/**
 * 地址簿
 */
@Data
public class AddressBook implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    //用户id
    private Long userId;
    
    //收货人
    private String consignee;
    
    //手机号
    private String phone;
    
    //性别 0 女 1 男
    private String sex;
    
    //省级区划编号
    private String provinceCode;
    
    //省级名称
    private String provinceName;
    
    //市级区划编号
    private String cityCode;
    
    //市级名称
    private String cityName;
    
    //区级区划编号
    private String districtCode;
    
    //区级名称
    private String districtName;
    
    //详细地址
    private String detail;
    
    //标签
    private String label;

    //是否默认 0 否 1是
    private Integer isDefault;

    //创建时间
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    //更新时间
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    //创建人
    @TableField(fill = FieldFill.INSERT)
    private Long createUser;
    
    //修改人
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Long updateUser;
    
    //是否删除
    private Integer isDeleted;
}
```

+ Mapper接口AddressBookMapper

```java
@Mapper
public interface AddressBookMapper extends BaseMapper<AddressBook> {
}
```

+ 业务层接口AddressBookService

```java
public interface AddressBookService extends IService<AddressBook> {
}
```

+ 业务层实现类AddressBookServiceImpl

```java
@Service
public class AddressBookServiceImpl extends ServiceImpl<AddressBookMapper, AddressBook> implements AddressBookService {
}
```

+ 控制层AddressBookController

```java
/**
 * 地址簿管理
 */
@Slf4j
@RestController
@RequestMapping("/addressBook")
public class AddressBookController {

    @Autowired
    private AddressBookService addressBookService;

    /**
     * 新增
     */
    @PostMapping
    public R<AddressBook> save(@RequestBody AddressBook addressBook) {
        addressBook.setUserId(BaseContext.getCurrentId());
        log.info("addressBook:{}", addressBook);
        addressBookService.save(addressBook);
        return R.success(addressBook);
    }

    /**
     * 设置默认地址
     */
    @PutMapping("default")
    public R<AddressBook> setDefault(@RequestBody AddressBook addressBook) {
        log.info("addressBook:{}", addressBook);
        LambdaUpdateWrapper<AddressBook> wrapper = new LambdaUpdateWrapper<>();
        wrapper.eq(AddressBook::getUserId, BaseContext.getCurrentId());
        wrapper.set(AddressBook::getIsDefault, 0);
        //SQL:update address_book set is_default = 0 where user_id = ?
        addressBookService.update(wrapper);

        addressBook.setIsDefault(1);
        //SQL:update address_book set is_default = 1 where id = ?
        addressBookService.updateById(addressBook);
        return R.success(addressBook);
    }

    /**
     * 根据id查询地址
     */
    @GetMapping("/{id}")
    public R get(@PathVariable Long id) {
        AddressBook addressBook = addressBookService.getById(id);
        if (addressBook != null) {
            return R.success(addressBook);
        } else {
            return R.error("没有找到该对象");
        }
    }

    /**
     * 删除地址
     * @param id
     * @return
     */
    @DeleteMapping
    public R<String> delete(@RequestParam("id") long id){
        addressBookService.removeById(id);
        return R.success("删除成功");
    }

    /**
     * 修改地址
     * @param addressBook
     * @return
     */
    @PutMapping
    public R<String> update(@RequestBody AddressBook addressBook){

        addressBookService.updateById(addressBook);
        return R.success("修改成功");

    }

    /**
     * 查询默认地址
     */
    @GetMapping("default")
    public R<AddressBook> getDefault() {
        LambdaQueryWrapper<AddressBook> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(AddressBook::getUserId, BaseContext.getCurrentId());
        queryWrapper.eq(AddressBook::getIsDefault, 1);

        //SQL:select * from address_book where user_id = ? and is_default = 1
        AddressBook addressBook = addressBookService.getOne(queryWrapper);

        if (null == addressBook) {
            return R.error("没有找到该对象");
        } else {
            return R.success(addressBook);
        }
    }

    /**
     * 查询指定用户的全部地址
     */
    @GetMapping("/list")
    public R<List<AddressBook>> list(AddressBook addressBook) {
        addressBook.setUserId(BaseContext.getCurrentId());
        log.info("addressBook:{}", addressBook);

        //条件构造器
        LambdaQueryWrapper<AddressBook> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(null != addressBook.getUserId(), AddressBook::getUserId, addressBook.getUserId());
        queryWrapper.orderByDesc(AddressBook::getUpdateTime);

        //SQL:select * from address_book where user_id = ? order by update_time desc
        return R.success(addressBookService.list(queryWrapper));
    }
}
```

### 功能测试

+ 添加地址信息

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220601/image.3egxsy4bhuw0.webp)

+ 数据库

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220601/image.78gg4mkvmss0.webp)

## 菜品展示

### 需求分析

用户登陆成功后跳转到系统首页面，在首页需要根据分类来显示菜品和套餐。如果菜品设置了口味信息，需要展示`选择规格`按钮，否则显示`+`按钮。

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220602/image.ufiyqazbv80.webp)

### 代码开发

#### 梳理交互过程

在开发代码之前，需要梳理一下前端页面和服务端的交互过程:

1. 页面(front/index.html)发送ajax请求，获取分类数据（菜品分类和套餐分类)
2. 页面发送ajax请求，获取第一个分类下的菜品或者套餐

开发菜品展示功能，其实就是在服务端编写代码去处理前端页面发送的这2次请求即可。

注意:首页加载完成后还发送了一次ajax请求用于加载购物车数据，此处可以将这次请求的地址暂时修改一下，从静态json文件获取数据，等后续开发购物车功能时再修改回来，如下:

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220602/image.214ufi4n3tk0.webp)

#### 修改DishController中的list处理器

> 经过上面修改，发现原来的list只有菜品信息，需要我们添加口味信息

```java
    /**
     *根据条件查询对应的菜品数据
     * @param dish
     * @return
     */
    @GetMapping("/list")
    public R<List<DishDto>> list(Dish dish){

        //构造查询条件
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(dish.getCategoryId()!=null,Dish::getCategoryId,dish.getCategoryId());

        //添加条件，查询条件为1(起售)
        queryWrapper.eq(Dish:: getStatus,1);

        //添加排序条件
        queryWrapper.orderByAsc(Dish::getSort).orderByDesc(Dish::getUpdateTime);
        List<Dish> list = dishService.list(queryWrapper);

        List<DishDto> dishDtoList = list.stream().map((item)->{
            DishDto dishDto =new DishDto();

            BeanUtils.copyProperties(item,dishDto);
            Long categoryId = item.getCategoryId();//分类Id
            //根据id查询分类对象
            Category category = categoryService.getById(categoryId);
            if(category!=null) {
                String categoryName = category.getName();
                dishDto.setCategoryName(categoryName);
            }
            //当前菜品Id
            Long dishId = item.getId();

            LambdaQueryWrapper<DishFlavor> lambdaQueryWrapper=new LambdaQueryWrapper<>();
            lambdaQueryWrapper.eq(DishFlavor::getDishId,dishId);
            //SQL:select * from dish_flavor where dish_id = ?
            List<DishFlavor> dishFlavorList = dishFlavorService.list(lambdaQueryWrapper);
            dishDto.setFlavors(dishFlavorList);
            return dishDto;
        }).collect(Collectors.toList());

        return R.success(dishDtoList);
    }

```

> 经过测试，分类菜品的信息都能够正常显示，但是套餐菜品信息报404错误

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220602/image.5776rt9eybs0.webp)

+ 编写处理器

```java
    /**
     * 根据条件查询套餐数据
     * @param setmeal
     * @return
     */
    @GetMapping("/list")
    public R<List<Setmeal>> list(@RequestBody Setmeal setmeal){

        LambdaQueryWrapper<Setmeal> queryWrapper=new LambdaQueryWrapper<>();
        queryWrapper.eq(setmeal.getCategoryId()!=null,Setmeal::getCategoryId,setmeal.getCategoryId());
        queryWrapper.eq(setmeal.getStatus()!=null,Setmeal::getStatus,setmeal.getStatus());
        queryWrapper.orderByDesc(Setmeal::getUpdateTime);
        List<Setmeal> list = setmealService.list(queryWrapper);
        return R.success(list);
        
    }
```

## 购物车

### 需求分析

移动端用户可以将菜品或者套餐添加到购物车。对于菜品来说，如果设置了口味信息，则需要选择规格后才能
加入购物车;对于套餐来说，可以直接点击`+`将当前套餐加入购物车。在购物车中可以修改菜品和套餐的数量，也可以清空购物车。

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220604/image.45vudgknce40.jpg)

