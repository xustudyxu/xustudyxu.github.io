---
title: 瑞吉外卖-菜品管理业务开发
date: 2022-05-06 23:02:14
permalink: /pages/f8dc6e/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-菜品管理业务开发

[[toc]]

## 文件上传下载

### 文件上传介绍

文件上传，也称为upload，是指将本地图片、视频、音频等文件上传到服务器上，可以供其他用户浏览或下载的过程。文件上传在项目中应用非常广泛，我们经常发微博、发微信朋友圈都用到了文件上传功能。

文件上传时，对页面的form表单有如下要求:

+ method="post"                                              
  + 采用post方式提交数据
+ enctype="multipart/form-data"                  
  + 采用multipart格式上传文件
+ type="file"                                                       
  + 采用input的file控件上传

举例:

```html
<form method="post" action="/common/upload" entype="multipart/form-data">
    <input name="myFile" type="file"/>
    <input type="submit" value="提交"/>
</form>
```

目前一些前端组件库也提供了相应的上传组件，但是底层原理还是基于form表单的文件上传。例如ElementUI中提供的upload上传组件:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.7c889w396l00.webp)

服务端要接收客户端页面上传的文件，通常都会使用Apache的两个组件:

+ commons-fileupload
+ commons-io

Spring框架在spring-web包中对文件上传进行了封装，大大简化了服务端代码，我们只需要在Controller的方法中声明一个MultipartFile类型的参数即可接收上传的文件，例如:

```java
@PostMapping(value="/upload")
public R<String> upload(MultipartFile file){
    System.out.println(file);
    return null;
}
```

### 文件下载介绍

文件下载，也称为download，是指将文件从服务器传输到本地计算机的过程。

通过浏览器进行文件下载，通常有两中表现形式:

+ 以附件形式下载，弹出保存对话框，将文件保存到指定磁盘目录
+ 直接在浏览器中打开

通过浏览器进行文件下载，本质上就是服务端将文件以流的形式写回浏览器的过程。

### 文件上传代码实现

文件上传，页面端可以使用ElementUI提供的上传组件。

可以直接使用资料中提供的上传页面，位置:资料/文件上传下载页面/upload.html

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.43g0hvzynem0.webp)

+ 配置yml

```yaml
reggie:
  path: D:\img\
```

+ 编写controller

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/5/6  21:20
 * 文件上传和下载
 */
@RestController
@RequestMapping("/common")
@Slf4j
public class CommonController {

    @Value("${reggie.path}")
    private String basePath;

    /**
     * 文件上传
     * @param file 参数有要求
     * @return
     */
    @PostMapping("/upload")
    public R<String> upload(MultipartFile file){
        //file是一个临时文件，需要转存到指定位置，否则本次请求完成后临时文件会删除
        log.info(file.toString());

        //原始文件名
        String originalFilename = file.getOriginalFilename();
        String suffix=originalFilename.substring(originalFilename.lastIndexOf("."));

        //使用UUID重新生成文件名，防止文件名重复造成重复覆盖
        String fileName = UUID.randomUUID().toString()+suffix;

        //创建一个目录对象
        File dir = new File(basePath);
        //判断当前目录是否存在
        if(!dir.exists()){
            //目录不存在
            dir.mkdirs();
        }

        try {
            //将临时文件转存到指定位置
            file.transferTo(new File(basePath+originalFilename));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return R.success(fileName);
    }
}
```

### 文件下载代码实现

```html
<img v-if="imageUrl" :src="imageUrl" class="avatar"></img>
```

+ 编写处理器

```java
/**
     * 文件下载
     * @param name
     * @param response
     */
    @GetMapping("/download")
    public void download(String name, HttpServletResponse response){

        try {
            //输入流，通过输入流读取文件内容
            FileInputStream fileInputStream = new FileInputStream(new File(basePath+name));

            //输出流，通过输出流将文件写会浏览器，在浏览器展示图片了
            ServletOutputStream outputStream = response.getOutputStream();

            response.setContentType("image/jpeg");

            int len=0;
            byte[] bytes = new byte[1024];
            while ((len=fileInputStream.read(bytes))!=-1){
                outputStream.write(bytes,0,len);
                outputStream.flush();
            }
            //关闭资源
            outputStream.close();
            fileInputStream.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.46mizk8tizq0.webp)

## 新增菜品

### 需求分析

后台系统中可以管理菜品信息，通过新增功能来添加一个新的菜品，在添加菜品时需要选择当前菜品所属的菜品分类，并且需要上传菜品图片，在移动端会按照菜品分类来展示对应的菜品信息。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.2382l0rlbmyo.webp)

### 数据模型

新增菜品，其实就是将新增页面录入的菜品信息插入到dish表，如果添加了口味做法，还需要向dish_flavor表插入数据。所以在新增菜品时，涉及到两个表:

+ dish：菜品表
+ dish_flavor：菜品口味表

#### 数据模型-dish

菜品表dish:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.5j6ur6bf6g00.webp)

#### 数据模型-dish_flavor

口味表dish_flavor:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.5vctlk83oyw0.webp)

### 代码开发

#### 准备工作

在开发业务功能前，先将需要用到的类和接口基本结构创建好:

+ 实体类DishFlavor

```java
/**
菜品口味
 */
@Data
public class DishFlavor implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    //菜品id
    private Long dishId;

    //口味名称
    private String name;

    //口味数据list
    private String value;

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

+ Mapper接口DishFlavorMapper

```java
@Mapper
public interface DishFlavorMapper extends BaseMapper<DishFlavor> {
}
```

+ 业务层接口DishFlavorService

```java
public interface DishFlavorService extends IService<DishFlavor> {
}
```

+ 业务层实现类 DishFlavorServicelmpl

```java
@Service
public class DishFlavorServiceImpl extends ServiceImpl<DishFlavorMapper, DishFlavor> implements DishFlavorService {
}
```

+ 控制层DishController

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/5/10  22:53
 * 菜品管理
 */
@RestController
@RequestMapping("/dish")
public class DishController {

    @Autowired
    private DishService dishService;

    @Autowired
    private DishFlavorService dishFlavorService;
}
```

#### 梳理交互过程

在开发代码之前，需要梳理一下新增菜品时前端页面和服务端的交互过程:

1. 页面(backend/page/food/add.html)发送ajax请求，请求服务端获取菜品分类数据并展示到下拉框中
2. 页面发送请求进行图片上传，请求服务端将图片保存到服务器(前面已经实现)
3. 页面发送请求进行图片下载，将上传的图片进行回显(前面已经实现)
4. 点击保存按钮，发送ajax请求，将菜品相关数据以json形式提交到服务端

开发新增菜品功能，其实就是在服务端编写代码去处理前端页面发送的这4次请求即可。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.2aa7gr2w151c.webp)

+ 编写处理器

```java
    /**
     * 根据条件查询分类数据
     * @param category
     * @return
     */
    @GetMapping("/list")
    public R<List<Category>> list(Category category){

        //条件构造器
        LambdaQueryWrapper<Category> queryWrapper = new LambdaQueryWrapper<>();
        //添加条件
        queryWrapper.eq(category.getType() != null, Category::getType, category.getType());
        //添加排序条件
        queryWrapper.orderByAsc(Category::getSort).orderByDesc(Category::getUpdateTime);

        List<Category> list = categoryService.list(queryWrapper);

        return R.success(list);
    }
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.5z3tdz9z8k80.webp)

#### 接受页面提交的数据

+ 填写信息

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.5ojudi0jva40.webp)

+ 保存

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.3piqep175940.webp)

> 2000是2000分钱

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.64ch1hrj61w0.webp)

#### 导入DTO

> 传输的数据与实体类的属性并不是一一对应的

编写DTO，用于封装页面提交的数据

```java
@Data
public class DishDto extends Dish {

    private List<DishFlavor> flavors = new ArrayList<>();

    private String categoryName;

    private Integer copies;
}
```

::: tip 注意事项

DTO,全程Data Transfer Object,即数据传输对象，一般用于展示层与服务层之间的数据传输。

:::

> 测试参数能否正确封装

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220510/image.1nawuzxpo0bk.webp)

#### 保存数据到菜品表和菜品口味表

+ DishService.java

```java
public interface DishService extends IService<Dish> {

    //新增菜品，同时插入菜品对应的口味数据，需要操作两张表：dish，dish_flavor
    public void saveWithFlavor(DishDto dishDto);
}
```

+ DishServiceImpl.java

```java
@Service
@Slf4j
@EnableTransactionManagement
public class DishServiceImpl extends ServiceImpl<DishMapper, Dish> implements DishService {


    @Autowired
    private DishFlavorService dishFlavorService;

    /**
     *新增菜品，同时保存对应的口味数据
     * @param dishDto
     */
    @Transactional //加入事务控制，保证数据一致性
    @Override
    public void saveWithFlavor(DishDto dishDto) {
        //保存菜品的基本信息到菜品表dish
        this.save(dishDto);

        Long dishId = dishDto.getId();

        //菜品口味
        List<DishFlavor> flavors = dishDto.getFlavors();
        flavors.stream().map(item->{
            item.setDishId(dishId);
            return item;
        }).collect(Collectors.toList());
        //保存菜品口味数据到菜品口味表dish_flavor
        dishFlavorService.saveBatch(flavors);
    }
}
```

+ 编写处理器

```java
    /**
     * 新增菜品
     * @param dishDto
     * @return
     */
    @PostMapping
    public R<String> save(@RequestBody DishDto dishDto){
        log.info(dishDto.toString());
        dishService.saveWithFlavor(dishDto);
        return R.success("新增菜品成功");

    }
```

### 功能测试

+ 添加菜品

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220511/image.5logfon9p5k0.webp)

+ 查询数据库中的菜品表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.6kgmfs3g40s0.webp)

+ 查询数据库中的口味表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.5ssratixkhs0.webp)

## 菜品信息分页显示

### 需求分析

系统中的菜品数据很多的时候，如果在一个页面中全部展示出来会显得比较乱，不便于查看，所以一般的系统中
心都会以分页的方式来展示列表数据。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220511/image.7epfrytxn800.webp)

### 代码开发

#### 梳理交互过程

在开发代码之前，需要梳理一下菜品分页查询时前端页面和服务端的交互过程:

1. 页面(backend/page/food/list.html)发送ajax请求，将分页查询参数(page、pageSize、name)提交到服务器，获取分页数据
2. 页面发送请求，请求服务器进行图片下载，用于页面图片展示

开发菜品信息分页查询功能，其实就是在服务器编写代码去处理前端页面发送的这2次请求。

+ 编写处理器

```java
    /**
     * 菜品信息的分页
     * @param page
     * @param pageSize
     * @param name
     * @return
     */
    @GetMapping("/page")
    public R<Page> page(int page,int pageSize,String name){

        //构造分页构造器对象
        Page<Dish> pageInfo = new Page<>(page,pageSize);
        Page<DishDto> dishDtoPage = new Page<>();


        //条件构造器
        LambdaQueryWrapper<Dish> queryWrapper = new LambdaQueryWrapper<>();
        //添加过滤条件
        queryWrapper.like(name!=null,Dish::getName,name);
        //添加排序条件
        queryWrapper.orderByDesc(Dish::getUpdateTime);

        //执行分页查询
        dishService.page(pageInfo,queryWrapper);

        //对象拷贝
        BeanUtils.copyProperties(pageInfo,dishDtoPage,"records");
        List<Dish> records = pageInfo.getRecords();
        List<DishDto> list = records.stream().map((item)->{
            DishDto dishDto =new DishDto();

            BeanUtils.copyProperties(item,dishDto);
            Long categoryId = item.getCategoryId();//分类Id
            //根据id查询分类对象
            Category category = categoryService.getById(categoryId);
            String categoryName = category.getName();
            dishDto.setCategoryName(categoryName);

            return dishDto;
        }).collect(Collectors.toList());
        dishDtoPage.setRecords(list);
        return R.success(dishDtoPage);
    }
```

### 功能测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220511/image.6em3uzq25tc0.webp)

## 修改菜品

### 需求分析

在菜品管理列表页面点击修改按钮，跳转到修改菜品页面，在修改页面回显菜品相关信息并进行修改，最后点击确定按钮完成操作

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220511/image.3km37iui29a0.webp)

### 代码开发

#### 梳理交互过程

在开发代码之前，需要梳理一下修改菜品时前端页面(add.html)和服务端的交互过程:

1. 页面发送ajax请求，请求服务端获取分类数据，用于菜品分类下拉框中数据展示
2. 页面发送ajax请求，请求服务端，根据id查询当前菜品信息，用于菜品信息回显
3. 页面发送请求，请求服务端进行图片下载，用于页图片回显
4. 点击保存按钮，页面发送ajax请求，将修改后的菜品相关数据以json形式提交到服务端

开发修改菜品功能，其实就是在服务端编写代码去处理前端页面发送的这4次请求即可。

> 根据id查询菜品信息和对应的口味信息

+ DishService.java

```java
    //根据id查询菜品信息和对应口味信息
    public DishDto getByIdWithFlavor(Long id);
```

+ DishServiceImpl.java

```java
    /**
     * 根据id查询菜品信息和对应的口味信息
     * @param id
     * @return
     */
    @Override
    public DishDto getByIdWithFlavor(Long id) {
        //查询 菜品基本信息 ，从dish表查询
        Dish dish = this.getById(id);

        DishDto dishDto = new DishDto();
        BeanUtils.copyProperties(dish,dishDto);

        //查询当前菜品对应的口味信息，从dish_flavor表查询
        LambdaQueryWrapper<DishFlavor> queryWrapper=new LambdaQueryWrapper<>();
        queryWrapper.eq(DishFlavor::getDishId,dish.getId());
        List<DishFlavor> flavors = dishFlavorService.list(queryWrapper);
        dishDto.setFlavors(flavors);

        return dishDto;
    }
```

+ 编写处理器，调用getByIdWithFlavor方法

```java
    /**
     * 根据id查询菜品信息和对应的口味信息
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public R<DishDto> get(@PathVariable("id") Long id){
        DishDto dishDto = dishService.getByIdWithFlavor(id);
        return R.success(dishDto);
    }
```

> 修改菜品信息和口味信息

+ DishService.java

```java
	//更新菜品信息，同时更新对应的口味信息
    public void updateWithFlavor(DishDto dishDto);
```

+ DishServiceImpl.java

```java
    @Override
	@Transactional
    public void updateWithFlavor(DishDto dishDto) {
        //更新dish表的基本信息
        this.updateById(dishDto);

        //清理当前菜品对应的口味数据--dish_flavor表的delete操作
        LambdaQueryWrapper<DishFlavor> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(DishFlavor::getDishId,dishDto.getId());

        dishFlavorService.remove(queryWrapper);

        //添加当前提交过来的口味数据--dish_flavor表进行insert操作
        List<DishFlavor> flavors = dishDto.getFlavors();
        flavors.stream().map(item->{
            item.setDishId(dishDto.getId());
            return item;
        }).collect(Collectors.toList());
        dishFlavorService.saveBatch(flavors);

    }
```

+ 编写处理器，调用updateWithFlavor方法

```java
    /**
     * 修改菜品
     * @param dishDto
     * @return
     */
    @PutMapping
    public R<String> update(@RequestBody DishDto dishDto){
        log.info(dishDto.toString());
        dishService.updateWithFlavor(dishDto);
        return R.success("修改菜品成功");

    }
```

### 功能测试

+ 宫爆鸡丁价格修改为15

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220511/image.jthifi8ioo0.webp)