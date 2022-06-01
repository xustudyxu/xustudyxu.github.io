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