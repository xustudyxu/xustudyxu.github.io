---
title: 尚医通-数据接口
date: 2022-10-26 23:07:37
permalink: /high/SYT/SYT_dataInterface
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-数据接口

[[toc]]

## 上传医院接口

### 继承mongodb

### 添加依赖

service-hosp模块pom.xml添加依赖

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

### 添加配置

在application.properties文件添加配置

```properties
spring.data.mongodb.uri=mongodb://192.168.91.166:27017/yygh_hosp
```

说明：改为自己安装mongodb的ip地址 

### 添加医院基础类

#### 添加model

说明：由于实体对象没有逻辑，我们已经统一导入

#### 添加Repository

```java
@Repository
public interface HospitalRepository extends MongoRepository<Hospital,String> {
}
```

#### 添加service接口及实现类

```java
public interface HospitalService {
    //上传医院的方法
    void save(Map<String, Object> paramMap);
}
```

```java
@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public void save(Map<String, Object> paramMap) {

        //先把参数的map集合 转换成hospital对象
        String mapString = JSONObject.toJSONString(paramMap);
        Hospital hospital = JSONObject.parseObject(mapString, Hospital.class);

        //判断是否存在相同的数据
        String hoscode = hospital.getHoscode();
        Hospital hospital1Exist = hospitalRepository.getHospitalByHoscode(hoscode);

        //如果存在，进行修改
        if(hospital1Exist!=null){
            hospital.setStatus(hospital1Exist.getStatus());
            hospital.setCreateTime(hospital1Exist.getCreateTime());
            hospital.setUpdateTime(new Date());
            hospital.setIsDeleted(0);
            hospitalRepository.save(hospital);
        } else { //如果不存在，就添加
            hospital.setStatus(0);
            hospital.setCreateTime(new Date());
            hospital.setUpdateTime(new Date());
            hospital.setIsDeleted(0);
            hospitalRepository.save(hospital);
        }
    }
}
```

#### 添加Controller

```java
@Api(tags = "医院管理api接口")
@RestController
@RequestMapping("/api/hosp")
public class ApiController {

    @Autowired
    private HospitalService hospitalService;

    //上传医院接口
    @PostMapping("/saveHospital")
    public Result saveHosp(HttpServletRequest request){
        //获取到传递过来的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);
        //调用service方法
        hospitalService.save(paramMap);
        return Result.ok();

    }
}
```

+ 接口数据测试

```json
{
  "hoscode": "1000_0",
  "hosname": "北京协和医院",
  "hostype": "1",
  "provinceCode": "110000",
  "cityCode": "110100",
  "districtCode": "110102",
  "address": "大望路",
  "intro": "北京协和...目标而继续努力。",
  "route": "东院区乘...乘车路线详见须知。",
    "logoData": "iVBORw0KGgoAAAA...NSUhEUg==",
    "bookingRule": {
    "cycle": "1",
    "releaseTime": "08:30",
    "stopTime": "11:30",
    "quitDay": "-1",
    "quitTime": "15:30",
    "rule": [
    "西院区预约号取号地点：西院区门诊楼一层大厅挂号窗口取号",
    "东院区预约号取号地点：东院区老门诊楼一层大厅挂号窗口或新门诊楼各楼层挂号/收费窗口取号"
	]
  }
}
```

说明：

1. 数据分为医院基本信息与预约规则信息
2. 医院logo转换为base64字符串
3. 预约规则信息属于医院基本信息的一个属性
4. 预约规则rule，以数组形式传递
5. 数据传递过来我们还要验证签名，只允许平台开通的医院可以上传数据，保证数据安全性

####  添加 service 接口

1. 在HospitalService 类添加接口

```java
public interface HospitalService {
    //上传医院的方法
    void save(Map<String, Object> paramMap);
}
```

说明：参数使用Map，减少对象封装，有利于签名校验，后续会体验到

2. 在HospitalServiceImpl类添加实现

```java
@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public void save(Map<String, Object> paramMap) {

        //先把参数的map集合 转换成hospital对象
        String mapString = JSONObject.toJSONString(paramMap);
        Hospital hospital = JSONObject.parseObject(mapString, Hospital.class);

        //判断是否存在相同的数据
        String hoscode = hospital.getHoscode();
        Hospital hospital1Exist = hospitalRepository.getHospitalByHoscode(hoscode);

        //如果存在，进行修改
        if(hospital1Exist!=null){
            hospital.setStatus(hospital1Exist.getStatus());
            hospital.setCreateTime(hospital1Exist.getCreateTime());
            hospital.setUpdateTime(new Date());
            hospital.setIsDeleted(0);
            hospitalRepository.save(hospital);
        } else { //如果不存在，就添加
            hospital.setStatus(0);
            hospital.setCreateTime(new Date());
            hospital.setUpdateTime(new Date());
            hospital.setIsDeleted(0);
            hospitalRepository.save(hospital);
        }
    }
}
```

说明：

```java
 Hospital hospital = JSONObject.parseObject(JSONObject.toJSONString(paramMap),Hospital.class);
```

Map转换为Hospital对象时，预约规则bookingRule为一个对象属性，rule为一个数组属性，因此在转换时我们要重新对应的set方法，不然转换不会成功

```java
@Data
@ApiModel(description = "Hospital")
@Document("Hospital")
public class Hospital extends BaseMongoEntity {
	
	private static final long serialVersionUID = 1L;
	
	@ApiModelProperty(value = "医院编号")
	@Indexed(unique = true) //唯一索引
	private String hoscode;

	@ApiModelProperty(value = "医院名称")
	@Indexed //普通索引
	private String hosname;

	@ApiModelProperty(value = "医院类型")
	private String hostype;

	@ApiModelProperty(value = "省code")
	private String provinceCode;

	@ApiModelProperty(value = "市code")
	private String cityCode;

	@ApiModelProperty(value = "区code")
	private String districtCode;

	@ApiModelProperty(value = "详情地址")
	private String address;

	@ApiModelProperty(value = "医院logo")
	private String logoData;

	@ApiModelProperty(value = "医院简介")
	private String intro;

	@ApiModelProperty(value = "坐车路线")
	private String route;

	@ApiModelProperty(value = "状态 0：未上线 1：已上线")
	private Integer status;

	//预约规则
	@ApiModelProperty(value = "预约规则")
	private BookingRule bookingRule;

	public void setBookingRule(String bookingRule) {
		this.bookingRule = JSONObject.parseObject(bookingRule, BookingRule.class);
	}

}
```

```java
@Data
@ApiModel(description = "预约规则")
@Document("BookingRule")
public class BookingRule {
	
	@ApiModelProperty(value = "预约周期")
	private Integer cycle;

	@ApiModelProperty(value = "放号时间")
	private String releaseTime;

	@ApiModelProperty(value = "停挂时间")
	private String stopTime;

	@ApiModelProperty(value = "退号截止天数（如：就诊前一天为-1，当天为0）")
	private Integer quitDay;

	@ApiModelProperty(value = "退号时间")
	private String quitTime;

	@ApiModelProperty(value = "预约规则")
	private List<String> rule;

	/**
	 *
	 * @param rule
	 */
	public void setRule(String rule) {
		if(!StringUtils.isEmpty(rule)) {
			this.rule = JSONArray.parseArray(rule, String.class);
		}
	}

}
```

#### 添加repository接口

在HospitalRepository类添加接口

```java
Hospital getHospitalByHoscode(String hoscode);
```

#### 添加Controller

在ApiController类添加接口

```java
    //上传医院接口
    @PostMapping("/saveHospital")
    public Result saveHosp(HttpServletRequest request){
        //获取到传递过来的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        hospitalService.save(paramMap);
        return Result.ok();

    }
```

#### 添加帮助类

在service-util模块添加HttpRequestHelper帮助类

#### 封装签名方法

在service-util模块HttpRequestHelper类添加方法

```java
@Slf4j
public class HttpRequestHelper {

    public static void main(String[] args) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("d", "4");
        paramMap.put("b", "2");
        paramMap.put("c", "3");
        paramMap.put("a", "1");
        paramMap.put("timestamp", getTimestamp());
        log.info(getSign(paramMap, "111111111"));
    }

    /**
     *
     * @param paramMap
     * @return
     */
    public static Map<String, Object> switchMap(Map<String, String[]> paramMap) {
        Map<String, Object> resultMap = new HashMap<>();
        for (Map.Entry<String, String[]> param : paramMap.entrySet()) {
            resultMap.put(param.getKey(), param.getValue()[0]);
        }
        return resultMap;
    }

    /**
     * 请求数据获取签名
     * @param paramMap
     * @param signKey
     * @return
     */
    public static String getSign(Map<String, Object> paramMap, String signKey) {
        if(paramMap.containsKey("sign")) {
            paramMap.remove("sign");
        }
        TreeMap<String, Object> sorted = new TreeMap<>(paramMap);
        StringBuilder str = new StringBuilder();
        for (Map.Entry<String, Object> param : sorted.entrySet()) {
            str.append(param.getValue()).append("|");
        }
        str.append(signKey);
        log.info("加密前：" + str.toString());
        String md5Str = MD5.encrypt(str.toString());
        log.info("加密后：" + md5Str);
        return md5Str;
    }

    /**
     * 签名校验
     * @param paramMap
     * @param signKey
     * @return
     */
    public static boolean isSignEquals(Map<String, Object> paramMap, String signKey) {
        String sign = (String)paramMap.get("sign");
        String md5Str = getSign(paramMap, signKey);
        if(!sign.equals(md5Str)) {
            return false;
        }
        return true;
    }

    /**
     * 获取时间戳
     * @return
     */
    public static long getTimestamp() {
        return new Date().getTime();
    }

    /**
     * 封装同步请求
     * @param paramMap
     * @param url
     * @return
     */
    public static JSONObject sendRequest(Map<String, Object> paramMap, String url){
        String result = "";
        try {
            //封装post参数
            StringBuilder postdata = new StringBuilder();
            for (Map.Entry<String, Object> param : paramMap.entrySet()) {
                postdata.append(param.getKey()).append("=")
                        .append(param.getValue()).append("&");
            }
            log.info(String.format("--> 发送请求：post data %1s", postdata));
            byte[] reqData = postdata.toString().getBytes("utf-8");
            byte[] respdata = HttpUtil.doPost(url,reqData);
            result = new String(respdata);
            log.info(String.format("--> 应答结果：result data %1s", result));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return JSONObject.parseObject(result);
    }
}
```

#### 上传医院添加签名校验

我们在医院设置的时候，为每个医院生成了医院编码与签名key，因此我在验证签名时要根据医院编码去动态获取签名key，然后再做签名校验。

#### 添加获取签名key接口

1. 在HospitalSetService类添加接口

```java
public interface HospitalSetService extends IService<HospitalSet> {
    
    String getSignKEY(String hoscode);
}
```

2. 在HospitalSetServiceImpl类实现接口

```java
@Service
public class HospitalSetServiceImpl extends ServiceImpl<HospitalSetMapper, HospitalSet> implements HospitalSetService {

    //根据传递过来医院编码，查询数据库，查询签名
    @Override
    public String getSignKEY(String hoscode) {
        QueryWrapper<HospitalSet> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("hoscode",hoscode);
        HospitalSet hospitalSet = baseMapper.selectOne(queryWrapper);
        return hospitalSet.getSignKey();
    }
}
```

#### 修改ApiController类上传医院接口

修改ApiController类上传医院接口

```java
@Api(tags = "医院管理api接口")
@RestController
@RequestMapping("/api/hosp")
public class ApiController {

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private HospitalSetService hospitalSetService;

    //上传医院接口
    @PostMapping("/saveHospital")
    public Result saveHosp(HttpServletRequest request){
        //获取到传递过来的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);

        //1.获取医院系统传递过来的签名,签名是进行了MD5的加密
        String hosplSign = (String) paramMap.get("sign");

        //2.根据传递过来医院编码，查询数据库，查询签名
        String hoscode = (String) paramMap.get("hoscode");
        //调用service方法
        String signKey = hospitalSetService.getSignKEY(hoscode);


        //3.把数据库查询签名进行MD5加密
        String signKeyMd5 = MD5.encrypt(signKey);

        //4.判断签名是否一致
        if(!hosplSign.equals(signKeyMd5)){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }
        hospitalService.save(paramMap);
        return Result.ok();

    }
}
```

+ 测试

```java
{"code":200,"message":"成功","ok":true}
```

+ 查看mongoDB

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221026/image.3gui5mudwrs0.webp)

## 图片 base64 编码

### 图片base64说明

图片的base64编码就是可以将一张图片数据编码成一串字符串，使用该字符串代替图像地址url

在前端页面中常见的base64图片的引入方式：

<img src="**data:image/png;base64,**iVBORw0..>

1. 优点
   1. base64格式的图片是文本格式，占用内存小，转换后的大小比例大概为1/3，降低了资源服务器的消耗；
   2. 网页中使用base64格式的图片时，不用再请求服务器调用图片资源，减少了服务器访问次数。
2. 缺点
   1. base64格式的文本内容较多，存储在数据库中增大了数据库服务器的压力；
   2. 网页加载图片虽然不用访问服务器了，但因为base64格式的内容太多，所以加载网页的速度会降低，可能会影响用户的体验。

说明：医院logo图片小，因此上传医院logo是可以使用base64格式保存。

### 上传医院接口修正

图片转换为base64字符串时，该字符串中包含大量的加号“+”，服务器在解析数据时会把加号当成连接符，转换为空格，因此我们要做一下特殊处理

修改ApiController类上传接口

```java {26-28}
	//上传医院接口
    @PostMapping("/saveHospital")
    public Result saveHosp(HttpServletRequest request){
        //获取到传递过来的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);

        //1.获取医院系统传递过来的签名,签名是进行了MD5的加密
        String hosplSign = (String) paramMap.get("sign");

        //2.根据传递过来医院编码，查询数据库，查询签名
        String hoscode = (String) paramMap.get("hoscode");
        //调用service方法
        String signKey = hospitalSetService.getSignKEY(hoscode);


        //3.把数据库查询签名进行MD5加密
        String signKeyMd5 = MD5.encrypt(signKey);

        //4.判断签名是否一致
        if(!hosplSign.equals(signKeyMd5)){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }

        //传输过程中“+“转换成了” “，因此我们要转换回来
        String logoData = (String) paramMap.get("logoData");
        logoData = logoData.replaceAll(" ","+");
        paramMap.put("logoData",logoData);

        //调用service方法
        hospitalService.save(paramMap);
        return Result.ok();

    }
```

+ 重新添加JSON数据后，测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221026/image.3m645ffgfj40.webp)

## 查询医院接口

### 添加 service 接口

1. 在HospitalService 类添加接口

```java
	//根据医院编号做具体查询
    Hospital getByHosCode(String hoscode);
```

2. 在HospitalServiceImpl类添加实现

```java
    @Override
    public Hospital getByHosCode(String hoscode) {
        Hospital hospital = hospitalRepository.getHospitalByHoscode(hoscode);
        return hospital;
    }
```

### 添加 Controller 接口

在ApiController类添加接口

```java
    //查询医院
    @PostMapping("/hospital/show")
    public Result getHospital(HttpServletRequest request){
        //获取传递过来医院信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);
        //获取医院编号
        String hoscode = (String) paramMap.get("hoscode");
        //1.获取医院系统传递过来的签名,签名是进行了MD5的加密
        String hosplSign = (String) paramMap.get("sign");

        //2.调用service方法
        String signKey = hospitalSetService.getSignKEY(hoscode);

        //3.把数据库查询签名进行MD5加密
        String signKeyMd5 = MD5.encrypt(signKey);

        //4.判断签名是否一致
        if(!hosplSign.equals(signKeyMd5)){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }

        //调用Service方法实现  根据医院编号查询
        Hospital hospital = hospitalService.getByHosCode(hoscode);
        return Result.ok(hospital);
    }
```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221026/image.fielw26z7ww.webp)