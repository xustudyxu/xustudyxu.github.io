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

## 上传科室接口

### 添加 Repository

```java
@Repository
public interface DepartmentRepository extends MongoRepository<Department,String> {
}
```

### 添加 Service 接口以及实现类

```java
public interface DepartmentService {
}
```

```java
@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;
}
```

### 上传科室

#### 接口数据分析

```json
{
	"hoscode": "1000_0",
	"depcode": "200050923",
	"depname": "门诊部核酸检测门诊(东院)",
	"intro": "门诊部核酸检测门诊(东院)",
	"bigcode": "44f162029abb45f9ff0a5f743da0650d",
	"bigname": "体检科"
}
```

说明：一个大科室下可以有多个小科室，如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.4eq6ena01wu0.webp)

#### 添加 service 接口

1. 在 DepartmentService 类添加接口

```java
//上传科室信息
void save(Map<String, Object> paramMap);
```

说明：参数使用Map，减少对象封装，有利于签名校验，后续会体验到

2. 在DepartmentServiceImpl类添加实现

```java
 //上传科室接口
    @Override
    public void save(Map<String, Object> paramMap) {

        //paramMap 转换成department对象
        String paramMapString = JSONObject.toJSONString(paramMap);
        Department department = JSONObject.parseObject(paramMapString, Department.class);

        //根据医院编号 和 科室编号查询
        Department departmentExist =
                departmentRepository.getDepartemntByHoscodeAndDepcode(department.getHoscode(),department.getDepcode());

        //判断
        if(departmentExist!=null){
            departmentExist.setUpdateTime(new Date());
            departmentExist.setIsDeleted(0);
            departmentRepository.save(departmentExist);
        } else {
            department.setCreateTime(new Date());
            department.setUpdateTime(new Date());
            department.setIsDeleted(0);
            departmentRepository.save(department);
        }
    }
```

#### 添加 Repository 接口

```java
    //查询科室信息
    Department getDepartemntByHoscodeAndDepcode(String hoscode, String depcode);
```

#### 添加controller接口

```java
    @Autowired
    private DepartmentService departmentService;
	
	//上传科室
    @PostMapping("/saveDepartment")
    public Result saveDepartment(HttpServletRequest request){

        //获取到传递过来科室的信息
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

        //调用service里面的方法
        departmentService.save(paramMap);
        return Result.ok();

    }
```

+ 测试添加

::: details JSON数据

```json
[
{"hoscode":"1000_0","depcode":"200050923","depname":"门诊部核酸检测门诊(东院)","intro":"门诊部核酸检测门诊(东院)","bigcode":"44f162029abb45f9ff0a5f743da0650d","bigname":"全部科室"},
{"hoscode":"1000_0","depcode":"200050924","depname":"国际医疗部门诊","intro":"国际医疗部门诊","bigcode":"44f162029abb45f9ff0a5f743da0650d","bigname":"全部科室"},
{"hoscode":"1000_0","depcode":"200050931","depname":"临床营养科(西院国际医疗)","intro":"临床营养科(西院国际医疗)","bigcode":"44f162029abb45f9ff0a5f743da0650d","bigname":"全部科室"},
{"hoscode":"1000_0","depcode":"200050964","depname":"内分泌科互联网诊疗","intro":"内分泌科互联网诊疗","bigcode":"44f162029abb45f9ff0a5f743da0650d","bigname":"全部科室"},
{"hoscode":"1000_0","depcode":"200051188","depname":"心内科互联网诊疗","intro":"心内科互联网诊疗","bigcode":"44f162029abb45f9ff0a5f743da0650d","bigname":"全部科室"},
{"hoscode":"1000_0","depcode":"200051469","depname":"特需心理医学科门诊2","intro":"特需心理医学科门诊2","bigcode":"44f162029abb45f9ff0a5f743da0650d","bigname":"全部科室"},
{"hoscode":"1000_0","depcode":"200041542","depname":"特需心内科门诊2","intro":"特需心内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200042374","depname":"特需消化内科门诊2","intro":"特需消化内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200040886","depname":"特需内分泌科门诊(西院)1","intro":"特需内分泌科门诊(西院)1","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200041246","depname":"特需呼吸内科门诊2","intro":"特需呼吸内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200041038","depname":"特需肾内科门诊2","intro":"特需肾内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200041244","depname":"特需血液内科门诊2","intro":"特需血液内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200044248","depname":"特需老年医学科门诊2","intro":"特需老年医学科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200040166","depname":"特需普通内科门诊1","intro":"特需普通内科门诊1","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200041666","depname":"内科门诊(西院)","intro":"内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200043118","depname":"普通内科全科门诊","intro":"普通内科全科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200045974","depname":"普通内科疑难病症门诊","intro":"普通内科疑难病症门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200048285","depname":"特需肿瘤内科门诊2","intro":"特需肿瘤内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200048369","depname":"特需普通内科门诊2","intro":"特需普通内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200048378","depname":"卫干门诊(内科)","intro":"卫干门诊(内科)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200048380","depname":"特需免疫内科门诊2","intro":"特需免疫内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200048440","depname":"特需感染内科门诊2","intro":"特需感染内科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004002","depname":"内分泌科门诊(西院)","intro":"内分泌科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004004","depname":"特需内分泌科门诊2","intro":"特需内分泌科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004020","depname":"特需普通内科门诊(西院)","intro":"特需普通内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004014","depname":"肿瘤内科门诊","intro":"肿瘤内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003975","depname":"心内科门诊","intro":"心内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003976","depname":"心内科门诊(西院)","intro":"心内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003977","depname":"心内科高血压专科门诊","intro":"心内科高血压专科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003978","depname":"特需心内科门诊","intro":"特需心内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004005","depname":"神经科门诊","intro":"神经科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004006","depname":"神经科门诊(西院)","intro":"神经科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004007","depname":"神经内科癫痫门诊","intro":"神经内科癫痫门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004010","depname":"特需神经科门诊2","intro":"特需神经科门诊2","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003997","depname":"消化内科门诊","intro":"消化内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003998","depname":"消化内科门诊(西院)","intro":"消化内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003999","depname":"早期胃癌专科门诊","intro":"早期胃癌专科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004000","depname":"特需消化内科门诊","intro":"特需消化内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004001","depname":"内分泌科门诊","intro":"内分泌科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004003","depname":"特需内分泌科门诊","intro":"特需内分泌科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003989","depname":"免疫内科门诊","intro":"免疫内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003990","depname":"免疫内科门诊(西院)","intro":"免疫内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003991","depname":"特需免疫内科门诊","intro":"特需免疫内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003992","depname":"特需免疫内科门诊(西院)","intro":"特需免疫内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003993","depname":"呼吸内科门诊","intro":"呼吸内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003994","depname":"呼吸内科门诊(西院)","intro":"呼吸内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003995","depname":"戒烟门诊","intro":"戒烟门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003996","depname":"特需呼吸内科门诊","intro":"特需呼吸内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003979","depname":"肾内科门诊","intro":"肾内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003980","depname":"肾内科门诊(西院)","intro":"肾内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003981","depname":"特需肾内科门诊","intro":"特需肾内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003982","depname":"血液科门诊","intro":"血液科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003983","depname":"血友病门诊(西院)","intro":"血友病门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003984","depname":"特需血液内科门诊","intro":"特需血液内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003985","depname":"感染内科门诊","intro":"感染内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003986","depname":"感染内科热病门诊","intro":"感染内科热病门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003987","depname":"感染内科免疫功能低下门诊","intro":"感染内科免疫功能低下门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003988","depname":"特需感染内科门诊","intro":"特需感染内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003973","depname":"老年综合门诊","intro":"老年综合门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003974","depname":"特需老年综合门诊","intro":"特需老年综合门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200003972","depname":"内科门诊","intro":"内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004018","depname":"普通内科门诊","intro":"普通内科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004019","depname":"普通内科门诊(西院)","intro":"普通内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004015","depname":"肿瘤内科门诊(西院)","intro":"肿瘤内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004016","depname":"特需肿瘤内科门诊1","intro":"特需肿瘤内科门诊1","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004017","depname":"特需肿瘤内科门诊(西院)","intro":"特需肿瘤内科门诊(西院)","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004012","depname":"重症肌无力专科门诊","intro":"重症肌无力专科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004008","depname":"头疼专科门诊","intro":"头疼专科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004009","depname":"脑血管病专科门诊","intro":"脑血管病专科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004011","depname":"痴呆与脑白质病专科门诊","intro":"痴呆与脑白质病专科门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200004134","depname":"肝炎门诊","intro":"肝炎门诊","bigcode":"1c87253ca8aa8fc966a2443eeaac0fc1","bigname":"内科"},
{"hoscode":"1000_0","depcode":"200045976","depname":"特需血管外科门诊2","intro":"特需血管外科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200040164","depname":"特需胸外科门诊2","intro":"特需胸外科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200048287","depname":"乳腺外科乳癌化疗门诊(西院)","intro":"乳腺外科乳癌化疗门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200048331","depname":"乳腺外科乳癌随访门诊(西院)","intro":"乳腺外科乳癌随访门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200048412","depname":"特需整形外科门诊2","intro":"特需整形外科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200048490","depname":"泌尿外科专项诊疗门诊","intro":"泌尿外科专项诊疗门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200048586","depname":"胸外科化疗专病门诊","intro":"胸外科化疗专病门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004041","depname":"特需神经外科门诊2","intro":"特需神经外科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004051","depname":"心外科门诊","intro":"心外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004052","depname":"心外科成人门诊","intro":"心外科成人门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004053","depname":"特需心外科门诊1","intro":"特需心外科门诊1","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004054","depname":"特需心外科门诊2","intro":"特需心外科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004049","depname":"特需泌尿外科门诊2","intro":"特需泌尿外科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004072","depname":"特需肝脏外科门诊2","intro":"特需肝脏外科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004027","depname":"特需基本外科门诊2","intro":"特需基本外科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004031","depname":"特需骨科门诊2","intro":"特需骨科门诊2","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004046","depname":"肾积水专科门诊","intro":"肾积水专科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004034","depname":"神经外科门诊","intro":"神经外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004035","depname":"神经外科门诊(西院)","intro":"神经外科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004040","depname":"特需神经外科门诊","intro":"特需神经外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004059","depname":"血管外科门诊","intro":"血管外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004060","depname":"血管外科门诊(西院)","intro":"血管外科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004061","depname":"动脉疾病专科门诊","intro":"动脉疾病专科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004062","depname":"特需血管外科门诊","intro":"特需血管外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004063","depname":"特需血管外科门诊(西院)","intro":"特需血管外科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004032","depname":"胸外科门诊","intro":"胸外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004033","depname":"特需胸外科门诊","intro":"特需胸外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004066","depname":"特需整形外科门诊(西院)","intro":"特需整形外科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004067","depname":"乳腺外科门诊","intro":"乳腺外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004068","depname":"乳腺外科门诊(西院)","intro":"乳腺外科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004069","depname":"特需乳腺外科门诊(西院)1","intro":"特需乳腺外科门诊(西院)1","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004042","depname":"泌尿外科门诊","intro":"泌尿外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004043","depname":"泌尿外科男科门诊","intro":"泌尿外科男科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004044","depname":"泌尿外科门诊(西院)","intro":"泌尿外科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004045","depname":"泌尿外科男科门诊(西院)","intro":"泌尿外科男科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004047","depname":"特需泌尿外科门诊","intro":"特需泌尿外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004070","depname":"肝脏外科门诊","intro":"肝脏外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004071","depname":"特需肝外科门诊","intro":"特需肝外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004022","depname":"外科门诊","intro":"外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004023","depname":"基本外科门诊","intro":"基本外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004025","depname":"基本外科门诊(西院)","intro":"基本外科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004026","depname":"特需基本外科门诊1","intro":"特需基本外科门诊1","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004028","depname":"骨科门诊","intro":"骨科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004029","depname":"骨科门诊(西院)","intro":"骨科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004030","depname":"特需骨科门诊","intro":"特需骨科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004064","depname":"整形美容外科门诊","intro":"整形美容外科门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004116","depname":"急诊科","intro":"急诊科","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200004065","depname":"整形美容外科门诊(西院)","intro":"整形美容外科门诊(西院)","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200039788","depname":"泌尿外科肾癌靶向治疗专病门诊","intro":"泌尿外科肾癌靶向治疗专病门诊","bigcode":"cbc348c817edeffab9599ad12205fa78","bigname":"外科"},
{"hoscode":"1000_0","depcode":"200046682","depname":"特需综合妇科门诊","intro":"特需综合妇科门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200046684","depname":"特需妇科内分泌门诊2","intro":"特需妇科内分泌门诊2","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200048276","depname":"妇泌中心(西院)","intro":"妇泌中心(西院)","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200048413","depname":"特需普通妇科门诊","intro":"特需普通妇科门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200048441","depname":"特需肿瘤妇科门诊","intro":"特需肿瘤妇科门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200048447","depname":"特需妇科计划生育门诊","intro":"特需妇科计划生育门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200048487","depname":"特需产科门诊","intro":"特需产科门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200048521","depname":"妇科计划生育门诊","intro":"妇科计划生育门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200048522","depname":"综合妇科门诊","intro":"综合妇科门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200048523","depname":"妇科肿瘤门诊","intro":"妇科肿瘤门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004078","depname":"妇产科辅助生育中心","intro":"妇产科辅助生育中心","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004073","depname":"妇科门诊","intro":"妇科门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004074","depname":"妇科门诊(西院)","intro":"妇科门诊(西院)","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004075","depname":"特需妇科门诊","intro":"特需妇科门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004076","depname":"特需妇科门诊(西院)1","intro":"特需妇科门诊(西院)1","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004080","depname":"妇科内分泌门诊","intro":"妇科内分泌门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004081","depname":"特需妇科内分泌门诊","intro":"特需妇科内分泌门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004082","depname":"特需妇科内分泌门诊(西院)","intro":"特需妇科内分泌门诊(西院)","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004077","depname":"产科门诊","intro":"产科门诊","bigcode":"17be7b5423b1782612f4a50608246fb4","bigname":"妇产科"},
{"hoscode":"1000_0","depcode":"200004084","depname":"儿科门诊","intro":"儿科门诊","bigcode":"2543ade3aecd3f5a3e2329d068c1d367","bigname":"儿科"},
{"hoscode":"1000_0","depcode":"200004085","depname":"特需儿科门诊","intro":"特需儿科门诊","bigcode":"2543ade3aecd3f5a3e2329d068c1d367","bigname":"儿科"},
{"hoscode":"1000_0","depcode":"200004094","depname":"变态反应科门诊","intro":"变态反应科门诊","bigcode":"e7391935e2070acf94e87b5b6f104f68","bigname":"变态反应科"},
{"hoscode":"1000_0","depcode":"200004095","depname":"特需变态反应科门诊","intro":"特需变态反应科门诊","bigcode":"e7391935e2070acf94e87b5b6f104f68","bigname":"变态反应科"},
{"hoscode":"1000_0","depcode":"200048325","depname":"特需皮肤科门诊2","intro":"特需皮肤科门诊2","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200048377","depname":"皮科激光中心","intro":"皮科激光中心","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200048468","depname":"普通皮科复诊","intro":"普通皮科复诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200048529","depname":"特需口腔科门诊2","intro":"特需口腔科门诊2","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004107","depname":"皮肤科白癜风副教授门诊","intro":"皮肤科白癜风副教授门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004108","depname":"皮肤科普通皮科门诊","intro":"皮肤科普通皮科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004119","depname":"美容皮肤科门诊","intro":"美容皮肤科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004086","depname":"眼科门诊","intro":"眼科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004087","depname":"眼科门诊(西院)","intro":"眼科门诊(西院)","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004088","depname":"特需眼科门诊","intro":"特需眼科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004089","depname":"眼科糖尿病视网膜病专科","intro":"眼科糖尿病视网膜病专科","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004096","depname":"口腔科门诊","intro":"口腔科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004097","depname":"口腔科门诊(西院)","intro":"口腔科门诊(西院)","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004101","depname":"口腔科住院医门诊","intro":"口腔科住院医门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004098","depname":"口腔科洁牙门诊","intro":"口腔科洁牙门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004099","depname":"特需口腔外科门诊","intro":"特需口腔外科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004100","depname":"口腔科特需门诊(西院)","intro":"口腔科特需门诊(西院)","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004090","depname":"耳鼻喉科门诊","intro":"耳鼻喉科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004091","depname":"耳鼻喉科门诊(西院)","intro":"耳鼻喉科门诊(西院)","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004093","depname":"特需耳鼻喉科门诊","intro":"特需耳鼻喉科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004102","depname":"皮科门诊","intro":"皮科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004103","depname":"皮科门诊(西院)","intro":"皮科门诊(西院)","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004104","depname":"皮肤科性病门诊","intro":"皮肤科性病门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200004106","depname":"特需皮肤科门诊","intro":"特需皮肤科门诊","bigcode":"2feb85b952a4dcd6dbf832100f6ef595","bigname":"五官"},
{"hoscode":"1000_0","depcode":"200041040","depname":"特需中医科门诊2","intro":"特需中医科门诊2","bigcode":"7dafa91626a45481feefb3d1a84c7984","bigname":"中医科"},
{"hoscode":"1000_0","depcode":"200048480","depname":"卫干门诊(中医科)","intro":"卫干门诊(中医科)","bigcode":"7dafa91626a45481feefb3d1a84c7984","bigname":"中医科"},
{"hoscode":"1000_0","depcode":"200004112","depname":"中医科针灸室(西院)","intro":"中医科针灸室(西院)","bigcode":"7dafa91626a45481feefb3d1a84c7984","bigname":"中医科"},
{"hoscode":"1000_0","depcode":"200004110","depname":"中医科针灸室","intro":"中医科针灸室","bigcode":"7dafa91626a45481feefb3d1a84c7984","bigname":"中医科"},
{"hoscode":"1000_0","depcode":"200004109","depname":"中医科门诊","intro":"中医科门诊","bigcode":"7dafa91626a45481feefb3d1a84c7984","bigname":"中医科"},
{"hoscode":"1000_0","depcode":"200004111","depname":"中医科门诊(西院)","intro":"中医科门诊(西院)","bigcode":"7dafa91626a45481feefb3d1a84c7984","bigname":"中医科"},
{"hoscode":"1000_0","depcode":"200004113","depname":"特需中医科门诊1","intro":"特需中医科门诊1","bigcode":"7dafa91626a45481feefb3d1a84c7984","bigname":"中医科"},
{"hoscode":"1000_0","depcode":"200048262","depname":"临床营养科西院门诊","intro":"临床营养科西院门诊","bigcode":"4dcb42d3a6ca39589f20bcd160903ae9","bigname":"营养科"},
{"hoscode":"1000_0","depcode":"200047302","depname":"特需营养科门诊1","intro":"特需营养科门诊1","bigcode":"4dcb42d3a6ca39589f20bcd160903ae9","bigname":"营养科"},
{"hoscode":"1000_0","depcode":"200004133","depname":"营养科咨询门诊","intro":"营养科咨询门诊","bigcode":"4dcb42d3a6ca39589f20bcd160903ae9","bigname":"营养科"},
{"hoscode":"1000_0","depcode":"200040878","depname":"多发性硬化专科门诊","intro":"多发性硬化专科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200040182","depname":"运动障碍病专科门诊","intro":"运动障碍病专科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200048482","depname":"特需病理科门诊","intro":"特需病理科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200048483","depname":"病理科门诊","intro":"病理科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004057","depname":"麻醉科门诊","intro":"麻醉科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004124","depname":"放疗科门诊","intro":"放疗科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004125","depname":"放疗科门诊(西院)","intro":"放疗科门诊(西院)","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004126","depname":"特需放疗科门诊","intro":"特需放疗科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004117","depname":"心理医学科门诊","intro":"心理医学科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004118","depname":"特需心理医学科门诊1","intro":"特需心理医学科门诊1","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004123","depname":"介入治疗门诊(放射科)","intro":"介入治疗门诊(放射科)","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004130","depname":"超声介入门诊","intro":"超声介入门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004129","depname":"物理医学康复科门诊","intro":"物理医学康复科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004127","depname":"物理医学康复科门诊(西院)","intro":"物理医学康复科门诊(西院)","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004120","depname":"肠外肠内营养科门诊","intro":"肠外肠内营养科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004122","depname":"特需肠外肠内营养科门诊","intro":"特需肠外肠内营养科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004131","depname":"核医学科门诊","intro":"核医学科门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004132","depname":"特需核医学门诊","intro":"特需核医学门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004055","depname":"麻醉科","intro":"麻醉科","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200004056","depname":"麻醉科疼痛门诊","intro":"麻醉科疼痛门诊","bigcode":"a4e171f4cf9b6816acdfb9ae62c414d7","bigname":"专科"},
{"hoscode":"1000_0","depcode":"200040142","depname":"肾内科IGA肾病专病门诊","intro":"肾内科IGA肾病专病门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200048338","depname":"检验科门诊","intro":"检验科门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200048491","depname":"门诊部疑难病会诊中心(东院)","intro":"门诊部疑难病会诊中心(东院)","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200048571","depname":"加速器治疗室(放疗科)(西院)","intro":"加速器治疗室(放疗科)(西院)","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200048575","depname":"生殖中心门诊(西院)","intro":"生殖中心门诊(西院)","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004013","depname":"帕金森专病门诊","intro":"帕金森专病门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004037","depname":"癫痫门诊","intro":"癫痫门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004021","depname":"老年医学科门诊","intro":"老年医学科门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004038","depname":"神经外科垂体专病门诊","intro":"神经外科垂体专病门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004039","depname":"神经外科脊髓疾病专科门诊","intro":"神经外科脊髓疾病专科门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004048","depname":"泌尿外科泌尿结石门诊","intro":"泌尿外科泌尿结石门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004050","depname":"泌尿外科膀胱癌专科门诊","intro":"泌尿外科膀胱癌专科门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004024","depname":"基本外科肠造口门诊","intro":"基本外科肠造口门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004092","depname":"耳聋基因筛查遗传门诊","intro":"耳聋基因筛查遗传门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004128","depname":"特需康复理疗门诊2","intro":"特需康复理疗门诊2","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004036","depname":"疼痛门诊","intro":"疼痛门诊","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004058","depname":"特需麻醉科门诊2","intro":"特需麻醉科门诊2","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004135","depname":"针灸按摩室(西院)","intro":"针灸按摩室(西院)","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200004121","depname":"肠外肠内营养科门诊(西院)","intro":"肠外肠内营养科门诊(西院)","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200041160","depname":"特需放射科门诊1","intro":"特需放射科门诊1","bigcode":"0551a547cc19d3d09f2e57bd2931b7d0","bigname":"其它"},
{"hoscode":"1000_0","depcode":"200048271","depname":"国际医疗(儿科)","intro":"国际医疗(儿科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048272","depname":"国际医疗(预防接种)","intro":"国际医疗(预防接种)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048273","depname":"国际医疗(神经科)","intro":"国际医疗(神经科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048274","depname":"国际医疗(胸外科)","intro":"国际医疗(胸外科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048278","depname":"国际医疗(内分泌科)","intro":"国际医疗(内分泌科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048279","depname":"基本外科门诊(西院国际医疗)","intro":"基本外科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048280","depname":"内分泌科门诊(西院国际医疗)","intro":"内分泌科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048281","depname":"国际医疗(消化内科)","intro":"国际医疗(消化内科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048282","depname":"国际医疗(普通内科)","intro":"国际医疗(普通内科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048283","depname":"国际医疗(皮肤科)","intro":"国际医疗(皮肤科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048286","depname":"消化内科门诊(西院国际医疗)","intro":"消化内科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048288","depname":"国际医疗(感染内科)","intro":"国际医疗(感染内科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048289","depname":"国际医疗(变态反应科)","intro":"国际医疗(变态反应科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048290","depname":"国际医疗(免疫内科)","intro":"国际医疗(免疫内科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048293","depname":"国际医疗(中医科)","intro":"国际医疗(中医科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048294","depname":"国际医疗(呼吸内科)","intro":"国际医疗(呼吸内科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048297","depname":"国际医疗(美容外科)","intro":"国际医疗(美容外科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048298","depname":"国际医疗(产科)","intro":"国际医疗(产科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048299","depname":"医学美容中心外科门诊(西院国际医疗)","intro":"医学美容中心外科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048300","depname":"国际医疗(血管外科)","intro":"国际医疗(血管外科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048301","depname":"核医学科(西院国际医疗)","intro":"核医学科(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048304","depname":"国际医疗(妇科内分泌)","intro":"国际医疗(妇科内分泌)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048308","depname":"变态（过敏）反应科门诊(西院国际医疗)","intro":"变态（过敏）反应科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048309","depname":"免疫内科门诊(西院国际医疗)","intro":"免疫内科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048310","depname":"国际医疗(骨科)","intro":"国际医疗(骨科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048311","depname":"口腔科门诊(西院国际医疗)","intro":"口腔科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048312","depname":"国际医疗(泌尿外科)","intro":"国际医疗(泌尿外科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048313","depname":"国际医疗(核医学科)","intro":"国际医疗(核医学科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048314","depname":"内分泌与生殖妇科中心门诊(西院国际医疗)","intro":"内分泌与生殖妇科中心门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048315","depname":"国际医疗(血液科)","intro":"国际医疗(血液科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048316","depname":"国际医疗(美容皮肤科)","intro":"国际医疗(美容皮肤科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048317","depname":"国际医疗(耳鼻喉科)","intro":"国际医疗(耳鼻喉科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048318","depname":"国际医疗(神经外科)","intro":"国际医疗(神经外科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048319","depname":"肿瘤内科门诊(西院国际医疗)","intro":"肿瘤内科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048320","depname":"耳鼻喉科门诊(西院国际医疗)","intro":"耳鼻喉科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048326","depname":"国际医疗(针灸按摩室)","intro":"国际医疗(针灸按摩室)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048327","depname":"国际医疗(心内科)","intro":"国际医疗(心内科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048328","depname":"国际医疗(口腔科)","intro":"国际医疗(口腔科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048329","depname":"国际医疗(麻醉科)","intro":"国际医疗(麻醉科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048330","depname":"神经科门诊(西院国际医疗)","intro":"神经科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048332","depname":"呼吸内科门诊(西院国际医疗)","intro":"呼吸内科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048333","depname":"国际医疗(物理医学康复科)","intro":"国际医疗(物理医学康复科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048334","depname":"心内科门诊(西院国际医疗)","intro":"心内科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048335","depname":"肾内科门诊(西院国际医疗)","intro":"肾内科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048346","depname":"国际医疗(基本外科)","intro":"国际医疗(基本外科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048347","depname":"乳腺外科门诊(西院国际医疗)","intro":"乳腺外科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048348","depname":"国际医疗(肾内科)","intro":"国际医疗(肾内科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048349","depname":"皮肤科门诊(西院国际医疗)","intro":"皮肤科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048350","depname":"国际医疗(眼科)","intro":"国际医疗(眼科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048352","depname":"国际医疗(肝脏外科)","intro":"国际医疗(肝脏外科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048353","depname":"眼科门诊(西院国际医疗)","intro":"眼科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048355","depname":"麻醉科(西院国际医疗)","intro":"麻醉科(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048356","depname":"国际医疗(肿瘤内科)","intro":"国际医疗(肿瘤内科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048366","depname":"国际医疗(营养科)","intro":"国际医疗(营养科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048368","depname":"国际医疗(放射治疗科)","intro":"国际医疗(放射治疗科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048379","depname":"国际医疗部特约门诊","intro":"国际医疗部特约门诊","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048465","depname":"物理医学康复科(西院国际医疗)","intro":"物理医学康复科(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048467","depname":"泌尿外科门诊(西院国际医疗)","intro":"泌尿外科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048470","depname":"国际医疗(肠外肠内营养科)","intro":"国际医疗(肠外肠内营养科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048485","depname":"国际医疗(老年医学科)","intro":"国际医疗(老年医学科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048486","depname":"普通内科门诊(西院国际医疗)","intro":"普通内科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048513","depname":"医学美容中心门诊(西院国际医疗)","intro":"医学美容中心门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048524","depname":"国际医疗(妇科肿瘤)","intro":"国际医疗(妇科肿瘤)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048525","depname":"国际医疗(综合妇科)","intro":"国际医疗(综合妇科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048526","depname":"国际医疗(妇科计划生育)","intro":"国际医疗(妇科计划生育)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048536","depname":"骨科门诊(西院国际医疗)","intro":"骨科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048559","depname":"国际医疗(放射科)","intro":"国际医疗(放射科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048585","depname":"老年医学门诊(西院国际医疗)","intro":"老年医学门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200048644","depname":"儿科门诊(西院国际医疗)","intro":"儿科门诊(西院国际医疗)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200004114","depname":"国际医疗(妇科)","intro":"国际医疗(妇科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"},
{"hoscode":"1000_0","depcode":"200004115","depname":"国际医疗(心理医学科)","intro":"国际医疗(心理医学科)","bigcode":"1e452d84823e025229c72c23d100a464","bigname":"国际医疗部"}
]
```

:::

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.19szr1my62m8.webp)

## 查询和删除科室接口

### 添加 service 接口

1. 在DepartmentService类添加接口

```java
    Page<Department> findPageDepartment(int page, int limit, DepartmentQueryVo departmentQueryVo);

    void remove(String hoscode, String depcode);
```

2. 在DepartmentServiceImpl类添加实现

```java
    /**
     * 查询科室的接口
     * @param page
     * @param limit
     * @param departmentQueryVo
     * @return
     */
    @Override
    public Page<Department> findPageDepartment(int page, int limit, DepartmentQueryVo departmentQueryVo) {

        //创建PageAble对象 设置当前页和每页的记录数
        //0是第一页
        Pageable pageable = PageRequest.of(page-1,limit);
        //创建Example对象
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
                .withIgnoreCase(true);
        Department department = new Department();
        BeanUtils.copyProperties(departmentQueryVo,department);
        department.setIsDeleted(0);
        Example<Department> example = Example.of(department,matcher);

        Page<Department> page1 = departmentRepository.findAll(example, pageable);
        return page1;
    }

    /**
     * 删除科室接口
     * @param hoscode
     * @param depcode
     */
    @Override
    public void remove(String hoscode, String depcode) {

        //根据医院编号和科室编号查询科室信息
        Department departemnt =
                departmentRepository.getDepartemntByHoscodeAndDepcode(hoscode, depcode);
        if(departemnt!=null){
            //调用方法删除
            departmentRepository.deleteById(departemnt.getId());
        }
    }
```

### 添加 Controller 接口

```java
    //删除科室接口
    @PostMapping("/department/remove")
    public Result removeDepartment(HttpServletRequest request){
        //获取到传递过来科室的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);

        //获取医院和科室编号
        String hoscode = (String) paramMap.get("hoscode");
        String depcode = (String) paramMap.get("depcode");

        //1.获取医院系统传递过来的签名,签名是进行了MD5的加密
        String hosplSign = (String) paramMap.get("sign");

        //2.根据传递过来医院编码，查询数据库，查询签名
        //调用service方法
        String signKey = hospitalSetService.getSignKEY(hoscode);


        //3.把数据库查询签名进行MD5加密
        String signKeyMd5 = MD5.encrypt(signKey);

        //4.判断签名是否一致
        if(!hosplSign.equals(signKeyMd5)){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }
        departmentService.remove(hoscode,depcode);
        return Result.ok();
    }

    //查询科室的接口
    @PostMapping("/department/list")
    public Result finDepartment(HttpServletRequest request){
        //获取到传递过来科室的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);

        //获取医院的编号
        String hoscode = (String) paramMap.get("hoscode");
        //当前页 和 每页记录数
        int page = StringUtils.isEmpty(paramMap.get("page"))
                ? 1: Integer.parseInt((String) paramMap.get("page"));

        int limit = StringUtils.isEmpty(paramMap.get("limit"))
                ? 1: Integer.parseInt((String) paramMap.get("limit"));
        
        //1.获取医院系统传递过来的签名,签名是进行了MD5的加密
        String hosplSign = (String) paramMap.get("sign");

        //2.根据传递过来医院编码，查询数据库，查询签名
        //调用service方法
        String signKey = hospitalSetService.getSignKEY(hoscode);


        //3.把数据库查询签名进行MD5加密
        String signKeyMd5 = MD5.encrypt(signKey);

        //4.判断签名是否一致
        if(!hosplSign.equals(signKeyMd5)){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }
        DepartmentQueryVo departmentQueryVo = new DepartmentQueryVo();
        departmentQueryVo.setHoscode(hoscode);
        //调用service方法
        Page<Department> pageModel =
                departmentService.findPageDepartment(page,limit,departmentQueryVo);
        return Result.ok(pageModel);


    }
```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.1s2qdhzr270g.webp)

## 上传医院排班接口

### 添加 Repository

```java
@Repository
public interface ScheduleRepository extends MongoRepository<Schedule,String> {
}
```

### 添加service接口及实现类

```java
public interface ScheduleService {
}
```

```java
@Service
public class ScheduleServiceImpl implements ScheduleService {
    
    @Autowired
    private ScheduleRepository scheduleRepository;
}
```

### 接口数据分析

```json
{
	"hoscode": "1000_0",
	"depcode": "200040878",
	"title": "医师",
	"docname": "",
	"skill": "内分泌科常见病。",
	"workDate": "2020-06-22",
	"workTime": 0,
	"reservedNumber": 33,
	"availableNumber": 22,
	"amount": "100",
	"status": 1,
	"hosScheduleId": "1"
}
```

### 添加 service 接口

1. 在ScheduleService类添加接口

```java
public interface ScheduleService {

    //医院排班
    void save(Map<String, Object> paramMap);

    Page<Schedule> findPageDepartment(int page, int limit, ScheduleQueryVo scheduleQueryVo);

    void remove(String hoscode, String hosScheduleId);
}
```

2. 在ScheduleServiceImpl类添加实现

```java
@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Override
    public void save(Map<String, Object> paramMap) {
        //先把参数的map集合 转换成hospital对象
        String paraMapString = JSONObject.toJSONString(paramMap);
        Schedule schedule = JSONObject.parseObject(paraMapString, Schedule.class);


        //判断是否存在相同的数据
        Schedule scheduleExist = scheduleRepository.getScheduleByHoscodeAndHosScheduleId(schedule.getHoscode(),schedule.getHosScheduleId());

        //如果存在，进行修改
        if(scheduleExist!=null){
            scheduleExist.setUpdateTime(new Date());
            scheduleExist.setIsDeleted(0);
            scheduleExist.setStatus(1);
            scheduleRepository.save(scheduleExist);
        } else { //如果不存在，就添加
            schedule.setCreateTime(new Date());
            schedule.setUpdateTime(new Date());
            schedule.setIsDeleted(0);
            scheduleRepository.save(schedule);
        }
    }

    @Override
    public Page<Schedule> findPageDepartment(int page, int limit, ScheduleQueryVo scheduleQueryVo) {

        //创建PageAble对象 设置当前页和每页的记录数
        //0是第一页
        Pageable pageable = PageRequest.of(page-1,limit);
        //创建Example对象
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
                .withIgnoreCase(true);
        Schedule schedule = new Schedule();
        BeanUtils.copyProperties(scheduleQueryVo,schedule);
        schedule.setIsDeleted(0);
        Example<Schedule> example = Example.of(schedule,matcher);

        Page<Schedule> page1 = scheduleRepository.findAll(example, pageable);
        return page1;
    }

    //删除排班
    @Override
    public void remove(String hoscode, String hosScheduleId) {
        //根据医院编号和排班编号查询信息
        Schedule schedule = scheduleRepository.getScheduleByHoscodeAndHosScheduleId(hoscode, hosScheduleId);
        if(schedule != null){
            scheduleRepository.deleteById(schedule.getId());
        }
    }
}
```

### 添加repository接口

```java
@Repository
public interface ScheduleRepository extends MongoRepository<Schedule,String> {
    Schedule getScheduleByHoscodeAndHosScheduleId(String hoscode, String hosScheduleId);
}
```

### 添加controller接口

```java
    //删除排班接口
    @PostMapping("/schedule/remove")
    public Result remove(HttpServletRequest request){

        //获取到传递过来科室的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);
        //获取医院编号和排班编号
        String hoscode = (String) paramMap.get("hoscode");
        String hosScheduleId = (String) paramMap.get("hosScheduleId");

        //签名的校验
        //1.获取医院系统传递过来的签名,签名是进行了MD5的加密
        String hosplSign = (String) paramMap.get("sign");

        //2.根据传递过来医院编码，查询数据库，查询签名
        //调用service方法
        String signKey = hospitalSetService.getSignKEY(hoscode);


        //3.把数据库查询签名进行MD5加密
        String signKeyMd5 = MD5.encrypt(signKey);

        //4.判断签名是否一致
        if(!hosplSign.equals(signKeyMd5)){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }
        scheduleService.remove(hoscode,hosScheduleId);
        return Result.ok();

    }
    //查询排班接口
    @PostMapping("/schedule/list")
    public Result findSchedule(HttpServletRequest request){
        //获取到传递过来科室的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);

        //获取科室的编号
        String hoscode = (String) paramMap.get("hoscode");
        String depcode = (String) paramMap.get("depcode");
        //当前页 和 每页记录数
        int page = StringUtils.isEmpty(paramMap.get("page"))
                ? 1: Integer.parseInt((String) paramMap.get("page"));

        int limit = StringUtils.isEmpty(paramMap.get("limit"))
                ? 1: Integer.parseInt((String) paramMap.get("limit"));
        //TODO 签名校验
        //1.获取医院系统传递过来的签名,签名是进行了MD5的加密
        String hosplSign = (String) paramMap.get("sign");

        //2.根据传递过来医院编码，查询数据库，查询签名
        //调用service方法
        String signKey = hospitalSetService.getSignKEY(hoscode);


        //3.把数据库查询签名进行MD5加密
        String signKeyMd5 = MD5.encrypt(signKey);

        //4.判断签名是否一致
        if(!hosplSign.equals(signKeyMd5)){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }

        ScheduleQueryVo scheduleQueryVo = new ScheduleQueryVo();
        scheduleQueryVo.setHoscode(hoscode);
        scheduleQueryVo.setDepcode(depcode);
        //调用service方法
        Page<Schedule> pageModel = scheduleService.findPageDepartment(page,limit,scheduleQueryVo);
        return Result.ok(pageModel);


    }
    //上传排班接口
    @PostMapping("/saveSchedule")
    public Result saveSchedule(HttpServletRequest request){
        //获取到传递过来科室的信息
        Map<String, String[]> requestMap = request.getParameterMap();
        Map<String, Object> paramMap = HttpRequestHelper.switchMap(requestMap);

        //获取医院和科室编号
        String hoscode = (String) paramMap.get("hoscode");
        String depcode = (String) paramMap.get("depcode");

        //1.获取医院系统传递过来的签名,签名是进行了MD5的加密
        String hosplSign = (String) paramMap.get("sign");

        //2.根据传递过来医院编码，查询数据库，查询签名
        //调用service方法
        String signKey = hospitalSetService.getSignKEY(hoscode);


        //3.把数据库查询签名进行MD5加密
        String signKeyMd5 = MD5.encrypt(signKey);

        //4.判断签名是否一致
        if(!hosplSign.equals(signKeyMd5)){
            throw new YyghException(ResultCodeEnum.SIGN_ERROR);
        }
        scheduleService.save(paramMap);
        return Result.ok();
    }
```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.1rs002ws61xc.webp)

