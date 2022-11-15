---
title: 尚医通-预约挂号
date: 2022-11-11 20:23:07
permalink: /high/SYT/SYT_yygh
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-预约挂号

[[toc]]

## 预约挂号详情

### 需求分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221110/image.elwutkf0tgw.webp)

1. 接口分析
   1. 根据预约周期，展示可预约日期数据，按分页展示
   2. 选择日期展示当天可预约列表（该接口后台已经实现过）
2. 页面展示分析
   1. 分页展示可预约日期，根据有号、无号、约满等状态展示不同颜色，以示区分
   2. 可预约最后一个日期为即将放号日期，根据放号时间页面展示倒计时

### api 接口

#### 添加 service 接口以及实现类

1. 在 ScheduleService 类添加接口

```java
    //获取可预约的排版数据
    Map<String,Object> getBookingScheduleRule(Integer page, Integer limit, String hoscode, String depcode);
```

2. 在 ScheduleServiceImpl 类添加接口实现

```java
    //获取可预约的排班数据
    @Override
    public Map<String, Object> getBookingScheduleRule(Integer page, Integer limit, String hoscode, String depcode) {
        Map<String, Object> result = new HashMap<>();
        //获取预约规则
        //根据医院的编号获取预约的规则
        Hospital hospital = hospitalService.getByHosCode(hoscode);
        if(hospital==null){
            throw new YyghException(ResultCodeEnum.DATA_ERROR);
        }
        BookingRule bookingRule = hospital.getBookingRule();

        //获取可预约的日期的数据(分页)
        IPage iPage = this.getListDate(page,limit,bookingRule);
        //获取可预约的日期
        List<Date> dateList = iPage.getRecords();

        //获取可预约日期里面科室剩余预约数
        Criteria  criteria = Criteria.where("hoscode").is(hoscode).and("depcode").is(depcode)
                .and("workDate").in(dateList);

        Aggregation agg = Aggregation.newAggregation(
                Aggregation.match(criteria),
                Aggregation.group("workDate").first("workDate")
                .as("workDate")
                .count().as("docCount")
                .sum("availableNumber").as("availableNumber")
                .sum("reservedNumber").as("reservedNumber")
        );
        AggregationResults<BookingScheduleRuleVo> aggregateResult =
                mongoTemplate.aggregate(agg, Schedule.class, BookingScheduleRuleVo.class);
        List<BookingScheduleRuleVo> scheduleRuleVoList = aggregateResult.getMappedResults();

        //合并数据 map集合 key日期 value预约规则和数量信息
        Map<Date, BookingScheduleRuleVo> scheduleVoMap = new HashMap<>();
        if(!CollectionUtils.isEmpty(scheduleRuleVoList)){
            scheduleVoMap = scheduleRuleVoList.stream()
                    .collect(
                        Collectors.toMap(BookingScheduleRuleVo::getWorkDate,
                        BookingScheduleRuleVo -> BookingScheduleRuleVo));
        }
        //获取可预约排班规则
        List<BookingScheduleRuleVo> bookingScheduleRuleVoList = new ArrayList<>();
        for (int i = 0,len = dateList.size();i < len ; i++) {
            Date date = dateList.get(i);
            //从map集合中根据key日期获取value值
            BookingScheduleRuleVo bookingScheduleRuleVo = scheduleVoMap.get(date);
            //如果说当天没有判断医生
            if(bookingScheduleRuleVo == null){
                bookingScheduleRuleVo = new BookingScheduleRuleVo();
                //就诊医生人数
                bookingScheduleRuleVo.setDocCount(0);
                //科室剩余预约数 -1表示无号
                bookingScheduleRuleVo.setAvailableNumber(-1);
            }
            bookingScheduleRuleVo.setWorkDate(date);
            bookingScheduleRuleVo.setWorkDateMd(date);
            //计算当前预约日期对应星期
            String dayOfWeek = this.getDayOfWeek(new DateTime(date));
            bookingScheduleRuleVo.setDayOfWeek(dayOfWeek);

            //最后一页最后一条记录为即将预约 状态 0：正常 1：即将放号  -1：当天已停止放号
            if (i==len-1 && page == iPage.getPages()){
                bookingScheduleRuleVo.setStatus(0);
            } else {
                bookingScheduleRuleVo.setStatus(0);
            }

            //当天预约如果过了停号时间，不能预约
            if(i==0 && page == 1){
                DateTime stopTime = this.getDateTime(new Date(), bookingRule.getStopTime());
                if(stopTime.isBeforeNow()){
                    //停止预约
                    bookingScheduleRuleVo.setStatus(-1);
                }
            }

            bookingScheduleRuleVoList.add(bookingScheduleRuleVo);
        }
        //可预约日期规则数据
        result.put("bookingScheduleList", bookingScheduleRuleVoList);
        result.put("total", iPage.getTotal());
        //其他基础数据
        Map<String, String> baseMap = new HashMap<>();
        //医院名称
        baseMap.put("hosname", hospitalService.getHospName(hoscode));
        //科室
        Department department =departmentService.getDepartment(hoscode, depcode);
        //大科室名称
        baseMap.put("bigname", department.getBigname());
        //科室名称
        baseMap.put("depname", department.getDepname());
        //月
        baseMap.put("workDateString", new DateTime().toString("yyyy年MM月"));
        //放号时间
        baseMap.put("releaseTime", bookingRule.getReleaseTime());
        //停号时间
        baseMap.put("stopTime", bookingRule.getStopTime());
        result.put("baseMap", baseMap);
        return result;

    }

    //获取可预约的日志分页数据
    private IPage getListDate(Integer page, Integer limit, BookingRule bookingRule) {
        //获取当天放号的一个时间 年 月 日 小时 分钟
        DateTime releaseTime = this.getDateTime(new Date(), bookingRule.getReleaseTime());
        //获取预约周期
        Integer cycle = bookingRule.getCycle();
        //如果当天放号时间已经过去了，预约周期从后一天开始计算，周期+1
        if(releaseTime.isBeforeNow()){
             cycle += 1;
        }

        //获取可预约的所有的日期，最后一天显示即将放号
        List<Date> dateList = new ArrayList<>();
        for (int i = 0; i < cycle; i++) {
            DateTime currentDateTime = new DateTime().plusDays(i);
            String dataSting = currentDateTime.toString("yyyy-MM-dd");
            dateList.add(new DateTime(dataSting).toDate());
        }

        //因为预约周期是不同的，每页显示的日期最多七天的数据，超过七天分页
        List<Date> pageDateList = new ArrayList<>();
        int start = (page-1)*limit;
        int end = (page-1)*limit+limit;
        //如果可以显示的数据小于7，直接显示
        if(end > dateList.size()){
            end = dateList.size();
        }

        for (int i = start; i < end ; i++) {
            pageDateList.add(dateList.get(i));
        }

        //如果可以显示的数据大于7，进行分页
        IPage<Date> iPage =
                new com.baomidou.mybatisplus.extension.plugins.pagination.Page<>(page, 7, dateList.size());
        iPage.setRecords(pageDateList);

        return iPage;
    }

    /**
     * 将Date日期（yyyy-MM-dd HH:mm）转换为DateTime
     */
    private DateTime getDateTime(Date date, String timeString) {
        String dateTimeString = new DateTime(date).toString("yyyy-MM-dd") + " "+ timeString;
        DateTime dateTime = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm").parseDateTime(dateTimeString);
        return dateTime;
    }
```

### 获取科室信息

#### 添加 service 接口以及实现类

1. 在DepartmentService类添加接口

```java
    //根绝科室编号，和医院编号，查询科室
    Department getDepartment(String hoscode, String depcode);
```

2. 在DepartmentImpl类实现接口

```java
    @Override
    public Department getDepartment(String hoscode, String depcode) {
        return departmentRepository.getDepartemntByHoscodeAndDepcode(hoscode,depcode);
    }
```

#### 添加 Controller 接口

在HospitalApiController类添加方法

```java
    //获取可预约的排班数据
    @ApiOperation(value = "获取可预约排版数据")
    @GetMapping("/auth/getBookingScheduleRule/{page}/{limit}/{hoscode}/{depcode}")
    public Result getBookingScheduleRule(@PathVariable Integer page,
                                         @PathVariable Integer limit,
                                         @PathVariable String hoscode,
                                         @PathVariable String depcode){
        return Result.ok(scheduleService.getBookingScheduleRule(page,limit,hoscode,depcode));
    }

    //获取排班的具体数据
    @ApiOperation(value = "获取排班数据")
    @GetMapping("/auth/findScheduleList/{hoscode}/{depcode}/{workData}")
    public Result findScheduleList(@PathVariable String hoscode,
                                   @PathVariable String depcode,
                                   @PathVariable String workData){
        return Result.ok(scheduleService.getDetailSchedule(hoscode,depcode,workData));

    }
```

+ 前端访问结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221111/image.f4tftfyowls.webp)

## 预约确认

1. 根据排班id获取排班信息，在页面展示
2. 选择就诊人
3. 预约下单

### api 接口

### 添加 service 接口以及实现类

1. 在ScheduleService类添加接口

```java
    //根绝排班id获取排班数据
    Schedule getScheduleById(String scheduleId);
```

2. 在ScheduleServiceImpl类实现接口

```java
    //根绝排班id获取排班数据
    @Override
    public Schedule getScheduleById(String scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId).get();
        return this.packageSchedule(schedule);
    }
```

### 添加 Controller 接口

```java
    //根绝排班id获取排班数据
    @ApiOperation(value = "根绝排班id获取排班数据")
    @GetMapping("/getSchedule/{scheduleId}")
    public Result getSchedule(@PathVariable String scheduleId){
        Schedule schedule = scheduleService.getScheduleById(scheduleId);
        return Result.ok(schedule);
    }
```

+ 前端访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221112/image.3bp70uuqkjq0.webp)

## 预约下单

由于预约下单后台api接口相对复杂，我们先实现前端，前端配合调试api接口。

### 需求分析

#### 订单表结构

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221112/image.q58f24waf1s.webp)

#### 下单分析

下单参数：就诊人id与排班id

1. 下单我们要获取就诊人信息
2. 获取排班下单信息与规则信息
3. 获取医院签名信息，然后通过接口去医院预约下单
4. 下单成功更新排班信息与发送短信

### 搭建 service-order 模块

#### 修改配置

1. 修改 pom.xml,引入依赖

```xml
    <dependencies>
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>service-cmn-client</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
```

2. 添加配置文件 application.properties

```properties
# 服务端口
server.port=8206
# 服务名
spring.application.name=service-order
# 环境设置：dev、test、prod
spring.profiles.active=dev

# mysql数据库连接
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/yygh_hosp?characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=hsp

#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8

spring.data.mongodb.uri=mongodb://192.168.91.166:27017/yygh_hosp

# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
```

#### 启动类

```java
@SpringBootApplication
@ComponentScan(basePackages = {"com.frx01"})
@EnableDiscoveryClient
@EnableFeignClients(basePackages = {"com.frx01"})
public class ServiceOrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceOrderApplication.class, args);
    }

}
```

#### 配置网关

```properties
#设置路由id
spring.cloud.gateway.routes[6].id=service-order
#设置路由的uri
spring.cloud.gateway.routes[6].uri=lb://service-order
#设置路由断言,代理servicerId为auth-service的/auth/路径
spring.cloud.gateway.routes[6].predicates= Path=/*/order/**
```

### 添加订单基础类

#### 添加 model

说明：由于实体对象没有逻辑，我们已经统一导入

com.frx01.yygh.model.order.OrderInfo

#### 添加 Mapper

添加com.frx01.yygh.order.mapper.OrderInfoMapper,添加配置类，扫描mapper包

```java
public interface OrderInfoMapper extends BaseMapper<OrderInfo> {
}
```

#### 添加 service 接口及实现类

1. 添加com.frx01.yygh.order.service.OrderService接口

```java
public interface OrderService extends IService<OrderInfo> {

    //生成挂号的订单
    Long saveOrder(String scheduleId, String patientId);

}
```

2. 添加com.frx01.yygh.order.service.impl.OrderServiceImpl接口实现

```java
@Service
public class OrderServiceImpl extends ServiceImpl<OrderInfoMapper, OrderInfo> implements OrderService {

    @Override
    public Long saveOrder(String scheduleId, String patientId) {
        return null;
    }
}
```

#### 添加 Controller

```java
@RestController
@RequestMapping("/api/order/orderInfo")
public class OrderApiController {

    @Autowired
    private OrderService orderService;

    //生成挂号的订单
    @PostMapping("/auth/submitOrder/{scheduleId}/{patientId}")
    public Result saveOrders(@PathVariable String scheduleId,
                             @PathVariable String patientId){
        Long orderId = orderService.saveOrder(scheduleId,patientId);
        return Result.ok(orderId);
    }
}
```

### 封装 Feign 调用获取就诊人接口

#### 获取就诊人信息 api 接口

操作模块：service-user

在PatientApiController类添加方法

```java
    //根绝就诊人id获取就诊人信息
    @GetMapping("/inner/get/{id}")
    public Patient getPatientOrder(@PathVariable Long id){
        Patient patient = patientService.getPatientId(id);
        return patient;
    }
```

### 搭建 service-user-client 模块

#### 添加 Feign 接口类

```java
@FeignClient(value = "service-user")
@Repository
public interface PatientFeignClient {

    //根绝就诊人id获取就诊人信息
    @GetMapping("/api/user/patient/inner/get/{id}")
    public Patient getPatientOrder(@PathVariable("id") Long id);

}
```

### 封装Feign调用获取排班下单信息接口

#### 获取排班下单信息api接口

##### 添加 service 接口与实现

1. 在 ScheduleService 类添加接口

```java
    //根据排班id获取预约下单数据
    ScheduleOrderVo getScheduleOrderVo(String scheduleId);
```

2. 在ScheduleServiceImpl类 添加实现

```java
    @Override
    public ScheduleOrderVo getScheduleOrderVo(String scheduleId) {
        ScheduleOrderVo scheduleOrderVo = new ScheduleOrderVo();
        //获取排班的信息
        Schedule schedule = baseMapper.selectById(scheduleId);
        if(schedule == null){
            throw new YyghException(ResultCodeEnum.PARAM_ERROR);
        }
        //获取预约规则信息
        Hospital hospital = hospitalService.getByHosCode(schedule.getHoscode());
        if(hospital==null){
            throw new YyghException(ResultCodeEnum.PARAM_ERROR);
        }
        BookingRule bookingRule = hospital.getBookingRule();
        if(bookingRule == null){
            throw new YyghException(ResultCodeEnum.PARAM_ERROR);
        }
        //把获取数据设置到ScheduleOrderVo中去
        scheduleOrderVo.setHoscode(schedule.getHoscode());
        scheduleOrderVo.setHosname(hospitalService.getHospName(schedule.getHoscode()));
        scheduleOrderVo.setDepcode(schedule.getDepcode());
        scheduleOrderVo.setDepname(departmentService.getDepName(schedule.getHoscode(), schedule.getDepcode()));
        scheduleOrderVo.setHosScheduleId(schedule.getHosScheduleId());
        scheduleOrderVo.setAvailableNumber(schedule.getAvailableNumber());
        scheduleOrderVo.setTitle(schedule.getTitle());
        scheduleOrderVo.setReserveDate(schedule.getWorkDate());
        scheduleOrderVo.setReserveTime(schedule.getWorkTime());
        scheduleOrderVo.setAmount(schedule.getAmount());

        //退号截止天数（如：就诊前一天为-1，当天为0）
        int quitDay = bookingRule.getQuitDay();
        DateTime quitTime = this.getDateTime(new DateTime(schedule.getWorkDate()).plusDays(quitDay).toDate(), bookingRule.getQuitTime());
        scheduleOrderVo.setQuitTime(quitTime.toDate());

        //预约开始时间
        DateTime startTime = this.getDateTime(new Date(), bookingRule.getReleaseTime());
        scheduleOrderVo.setStartTime(startTime.toDate());

        //预约截止时间
        DateTime endTime = this.getDateTime(new DateTime().plusDays(bookingRule.getCycle()).toDate(), bookingRule.getStopTime());
        scheduleOrderVo.setEndTime(endTime.toDate());

        //当天停止挂号时间
        DateTime stopTime = this.getDateTime(new Date(), bookingRule.getStopTime());
        scheduleOrderVo.setStopTime(stopTime.toDate());
        return scheduleOrderVo;
    }
```

##### 添加 Controller 方法

```java
    @ApiOperation(value = "根据排班id获取预约下单数据")
    @GetMapping("/inner/getScheduleOrderVo/{scheduleId}")
    public ScheduleOrderVo getScheduleOrderVo(@PathVariable("scheduleId") String scheduleId){
        return scheduleService.getScheduleOrderVo(scheduleId);
    }
```

##### 添加 Feign 接口类

```java
@FeignClient(value = "service-hosp")
@Repository
public interface HospitalFeignClient {

    /**
     * 根据排班id获取预约下单数据
     * @param scheduleId
     * @return
     */
    @ApiOperation(value = "根据排班id获取预约下单数据")
    @GetMapping("/api/hosp/hospital/inner/getScheduleOrderVo/{scheduleId}")
    ScheduleOrderVo getScheduleOrderVo(@PathVariable("scheduleId") String scheduleId);
}
```

#### 获取下单引用签名信息接口

##### 添加 service 接口以及实现类

1. 在HospitalSetService类添加接口

```java
    //获取医院签名信息
    SignInfoVo getSignInfoVo(SignInfoVo hoscode);
```

2. 在 HospitalSetServiceImpl 类实现

```java
    //根据医院编号获取医院签名信息
    @Override
    public SignInfoVo getSignInfoVo(SignInfoVo hoscode) {
        QueryWrapper<HospitalSet> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("hoscode",hoscode);
        HospitalSet hospitalSet = baseMapper.selectOne(queryWrapper);
        if(null == hospitalSet){
            throw new YyghException(ResultCodeEnum.HOSPITAL_OPEN);
        }
        SignInfoVo signInfoVo = new SignInfoVo();
        signInfoVo.setSignKey(hospitalSet.getSignKey());
        signInfoVo.setApiUrl(hospitalSet.getApiUrl());
        return signInfoVo;

    }
```

##### 添加 Controller 方法

```java
    @ApiOperation(value = "获取医院签名信息")
    @GetMapping("/inner/getSignInfoVo/{hoscode}")
    public SignInfoVo getSignInfoVo(@PathVariable("hoscode") SignInfoVo hoscode){
        return hospitalSetService.getSignInfoVo(hoscode);
    }
```

##### 添加 Feign 接口类

```java
    /**
     * 获取医院签名信息
     * @param hoscode
     * @return
     */
    @ApiOperation(value = "获取医院签名信息")
    @GetMapping("/api/hosp/hospital/inner/getSignInfoVo/{hoscode}")
    SignInfoVo getSignInfoVo(@PathVariable("hoscode") String hoscode);
```

## 实现下单接口

操作模块：service-order

### 引入依赖

```xml
    <dependencies>
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>service-cmn-client</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>service-hosp-client</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>

        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>service-user-client</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
```

### 封装下单工具类

封装HttpRequestHelper类，添加签名请求方法

```java
@Slf4j
public class HttpRequestHelper {
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

## 预约成功后处理逻辑

预约成功后我们要更新预约数和短信提醒预约成功，为了提高下单的并发性，这部分逻辑我们就交给mq为我们完成，预约成功发送消息即可。

1. **RabbitMQ简介**

以商品订单场景为例，

如果商品服务和订单服务是两个不同的微服务，在下单的过程中订单服务需要调用商品服务进行扣库存操作。按照传统的方式，下单过程要等到调用完毕之后才能返回下单成功，如果网络产生波动等原因使得商品服务扣库存延迟或者失败，会带来较差的用户体验，如果在高并发的场景下，这样的处理显然是不合适的，那怎么进行优化呢？这就需要消息队列登场了。

消息队列提供一个异步通信机制，消息的发送者不必一直等待到消息被成功处理才返回，而是立即返回。消息中间件负责处理网络通信，如果网络连接不可用，消息被暂存于队列当中，当网络畅通的时候在将消息转发给相应的应用程序或者服务，当然前提是这些服务订阅了该队列。如果在商品服务和订单服务之间使用消息中间件，既可以提高并发量，又降低服务之间的耦合度。

RabbitMQ就是这样一款消息队列。RabbitMQ是一个开源的消息代理的队列服务器，用来通过普通协议在完全不同的应用之间共享数据。

2. **典型应用场景：**

**异步处理**。把消息放入消息中间件中，等到需要的时候再去处理。

**流量削峰**。例如秒杀活动，在短时间内访问量急剧增加，使用消息队列，当消息队列满了就拒绝响应，跳转到错误页面，这样就可以使得系统不会因为超负载而崩溃。

**日志处理**

**应用解耦**

3. 安装RabbitMQ

```sh
docker pull rabbitmq:management
docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq rabbitmq:management
```

**管理后台**：http://IP:15672

+ 访问

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221112/image.14f0on7uwxog.webp)

### rabbit-util 模块封装

由于后续可能多个模块都会使用mq，所以我们把它封装成一个模块，需要的地方直接引用即可

#### 修改 pom.xml

```xml
    <dependencies>
        <!--rabbitmq消息队列-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bus-amqp</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
        </dependency>
    </dependencies>
```

#### 封装 service 方法

```java
@Service
public class RabbitService {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * 发送消息
     * @param exchange    交换机
     * @param rootingKey  路由键
     * @param message     消息
     * @return
     */
    public boolean sendMessage(String exchange,String rootingKey,Object message){
        rabbitTemplate.convertAndSend(exchange,rootingKey,message);
        return true;
    }
}
```

#### 配置 mq 消息转换器

```java
@Configuration
public class MQconfig {

    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }
}
```

说明：默认是字符串转换器

### 封装短信接口

操作模块：service-msm

#### 引入依赖

```xml
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>rabbit-util</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
```

#### 添加配置

在resources/application.properties添加

```properties
#rabbitmq地址
spring.rabbitmq.host=192.168.91.166
spring.rabbitmq.port=15672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

#### 添加常量配置

在rabbit-util模块com.frx01.yygh.common.constant.MqConst类添加

```java
public class MqConst {

    /**
     * 预约下单
     */
    public static final String EXCHANGE_DIRECT_ORDER
            = "exchange.direct.order";
    public static final String ROUTING_ORDER = "order";
    //队列
    public static final String QUEUE_ORDER  = "queue.order";
    /**
     * 短信
     */
    public static final String EXCHANGE_DIRECT_MSM = "exchange.direct.msm";
    public static final String ROUTING_MSM_ITEM = "msm.item";
    //队列
    public static final String QUEUE_MSM_ITEM  = "queue.msm.item";

}
```

#### 在model模块封装短信实体

```java
@Data
@ApiModel(description = "短信实体")
public class MsmVo {

    @ApiModelProperty(value = "phone")
    private String phone;

    @ApiModelProperty(value = "短信模板code")
    private String templateCode;

    @ApiModelProperty(value = "短信模板参数")
    private Map<String,Object> param;
}
```

说明：已统一引入

#### 封装 service 接口

1. 在 MsmService 类添加接口

```java
boolean send(MsmVo msmVo);
```

2. 在 MsmServiceImpl 类添加接口实现

```java
    //使用mq发送短信
    @Override
    public boolean send(MsmVo msmVo) {
        if(StringUtils.isEmpty(msmVo.getPhone())){
            String code = (String) msmVo.getParam().get("code");
            boolean isSend = this.send(msmVo.getPhone(), code);
            return isSend;
        }
        return false;
    }
```

#### 封装 mq 监听器

```java
@Component
public class MsmReceiver {

    @Autowired
    private MsmService msmService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = MqConst.QUEUE_MSM_ITEM,durable = "true"),
            exchange = @Exchange(value = MqConst.EXCHANGE_DIRECT_MSM),
            key = {MqConst.ROUTING_MSM_ITEM}
    ))
    public void send(MsmVo msmVo, Message message , Channel channel){
        msmService.send(msmVo);
    }
}
```

### 封装更新排班数量

操作模块：service-hosp

#### 引入依赖

```xml
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>rabbit-util</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
```

#### 添加配置

在resources/application.properties添加

```properties
#rabbitmq地址
spring.rabbitmq.host=192.168.91.166
spring.rabbitmq.port=15672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

#### 添加常量配置

在rabbit-util模块com.frx01.yygh.common.constant.MqConst类添加

```java
/**
 * 预约下单
 */
public static final String EXCHANGE_DIRECT_ORDER = "exchange.direct.order";
public static final String ROUTING_ORDER = "order";
//队列
public static final String QUEUE_ORDER  = "queue.order";
```

#### 在model模块封装更新排班实体

```java
@Data
@ApiModel(description = "短信实体")
public class MsmVo {

    @ApiModelProperty(value = "phone")
    private String phone;

    @ApiModelProperty(value = "短信模板code")
    private String templateCode;

    @ApiModelProperty(value = "短信模板参数")
    private Map<String,Object> param;
}
```

说明：已统一引入，该对象放一个短信实体，预约下单成功后，我们发送一条消息，让mq来保证两个消息都发送成功。

#### 封装 service 接口

1. 在ScheduleService类添加接口

```java
    //更新排版数据
    void update(Schedule schedule);
```

2. 在ScheduleServiceImpl类添加接口实现

```java
    //更新排班信息,用于mq的操作
    @Override
    public void update(Schedule schedule) {
        schedule.setUpdateTime(new Date());
        scheduleRepository.save(schedule);
    }
```

#### 封装mq监听器

```java
@Component
public class HospitalReceiver {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private RabbitService rabbitService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = MqConst.QUEUE_ORDER, durable = "true"),
            exchange = @Exchange(value = MqConst.EXCHANGE_DIRECT_ORDER),
            key = {MqConst.ROUTING_ORDER}
    ))
    public void receiver(OrderMqVo orderMqVo, Message message, Channel channel) throws IOException {
        //下单成功更新预约数
        Schedule schedule = scheduleService.getScheduleById(orderMqVo.getScheduleId());
        schedule.setReservedNumber(orderMqVo.getReservedNumber());
        schedule.setAvailableNumber(orderMqVo.getAvailableNumber());
        scheduleService.update(schedule);
        //发送短信
        MsmVo msmVo = orderMqVo.getMsmVo();
        if(null != msmVo) {
            rabbitService.sendMessage(MqConst.EXCHANGE_DIRECT_MSM, MqConst.ROUTING_MSM_ITEM, msmVo);
        }
    }

}
```

### 调整下单接口

操作模块：service-order

#### 引入依赖

```xml
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>service-order</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
```

#### 添加配置

在resources/application.properties添加

```properties
#rabbitmq地址
spring.rabbitmq.host=192.168.91.166
spring.rabbitmq.port=15672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

#### 修改下单接口

```java
    //生成挂号订单
    @Override
    public Long saveOrder(String scheduleId, Long patientId) {
        //获取就诊人信息
        Patient patient = patientFeignClient.getPatientOrder(patientId);

        //获取排相关的信息
        ScheduleOrderVo scheduleOrderVo = hospitalFeignClient.getScheduleOrderVo(scheduleId);

        //判断当前是否还可以预约
        if(new DateTime(scheduleOrderVo.getStartTime()).isAfterNow()
            || new DateTime(scheduleOrderVo.getEndTime()).isBeforeNow()){
            throw new YyghException(ResultCodeEnum.TIME_NO);
        }

        //获取签名的信息
        SignInfoVo signInfoVo = hospitalFeignClient.getSignInfoVo(scheduleOrderVo.getHoscode());

        //添加到订单的表中
        OrderInfo orderInfo = new OrderInfo();
        //把 scheduleOrderVo 中的数据 复制到 orderInfo中去
        BeanUtils.copyProperties(scheduleOrderVo,orderInfo);
        // 向orderInfo设置其他的数据
        String outTradeNo = System.currentTimeMillis() + ""+ new Random().nextInt(100);
        orderInfo.setOutTradeNo(outTradeNo);
        orderInfo.setScheduleId(scheduleId);
        orderInfo.setUserId(patient.getUserId());
        orderInfo.setPatientId(patientId);
        orderInfo.setPatientName(patient.getName());
        orderInfo.setPatientPhone(patient.getPhone());
        orderInfo.setOrderStatus(OrderStatusEnum.UNPAID.getStatus());
        this.save(orderInfo);

        //调用医院的接口，实现预约挂号操作
        //设置调用医院接口需要参数，参数放到map集合

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("hoscode",orderInfo.getHoscode());
        paramMap.put("depcode",orderInfo.getDepcode());
        paramMap.put("hosScheduleId",orderInfo.getScheduleId());
        paramMap.put("reserveDate",new DateTime(orderInfo.getReserveDate()).toString("yyyy-MM-dd"));
        paramMap.put("reserveTime", orderInfo.getReserveTime());
        paramMap.put("amount",orderInfo.getAmount());
        paramMap.put("name", patient.getName());
        paramMap.put("certificatesType",patient.getCertificatesType());
        paramMap.put("certificatesNo", patient.getCertificatesNo());
        paramMap.put("sex",patient.getSex());
        paramMap.put("birthdate", patient.getBirthdate());
        paramMap.put("phone",patient.getPhone());
        paramMap.put("isMarry", patient.getIsMarry());
        paramMap.put("provinceCode",patient.getProvinceCode());
        paramMap.put("cityCode", patient.getCityCode());
        paramMap.put("districtCode",patient.getDistrictCode());
        paramMap.put("address",patient.getAddress());
        //联系人
        paramMap.put("contactsName",patient.getContactsName());
        paramMap.put("contactsCertificatesType", patient.getContactsCertificatesType());
        paramMap.put("contactsCertificatesNo",patient.getContactsCertificatesNo());
        paramMap.put("contactsPhone",patient.getContactsPhone());
        paramMap.put("timestamp", HttpRequestHelper.getTimestamp());
        String sign = HttpRequestHelper.getSign(paramMap, signInfoVo.getSignKey());
        paramMap.put("sign", sign);

        //请求医院系统接口
        JSONObject result =
                HttpRequestHelper.sendRequest(paramMap, signInfoVo.getApiUrl() + "/order/submitOrder");

        if(result.getInteger("code")==200){

            JSONObject jsonObject = result.getJSONObject("data");
            //预约记录唯一标识（医院预约记录主键）
            String hosRecordId = jsonObject.getString("hosRecordId");
            //预约序号
            Integer number = jsonObject.getInteger("number");;
            //取号时间
            String fetchTime = jsonObject.getString("fetchTime");;
            //取号地址
            String fetchAddress = jsonObject.getString("fetchAddress");;
            //更新订单
            orderInfo.setHosRecordId(hosRecordId);
            orderInfo.setNumber(number);
            orderInfo.setFetchTime(fetchTime);
            orderInfo.setFetchAddress(fetchAddress);
            baseMapper.updateById(orderInfo);

            //排班可预约数
            Integer reservedNumber = jsonObject.getInteger("reservedNumber");
            //排班剩余预约数
            Integer availableNumber = jsonObject.getInteger("availableNumber");

            //发送mq消息，号源更新和短信通知
            OrderMqVo orderMqVo = new OrderMqVo();
            orderMqVo.setScheduleId(scheduleId);
            orderMqVo.setReservedNumber(reservedNumber);
            orderMqVo.setAvailableNumber(availableNumber);

            //短息提示
            MsmVo msmVo = new MsmVo();
            msmVo.setPhone(orderInfo.getPatientPhone());
            String reserveDate =
                    new DateTime(orderInfo.getReserveDate()).toString("yyyy-MM-dd")
                            + (orderInfo.getReserveTime()==0 ? "上午": "下午");
            Map<String,Object> param = new HashMap<String,Object>(){{
                put("title", orderInfo.getHosname()+"|"+orderInfo.getDepname()+"|"+orderInfo.getTitle());
                put("amount", orderInfo.getAmount());
                put("reserveDate", reserveDate);
                put("name", orderInfo.getPatientName());
                put("quitTime", new DateTime(orderInfo.getQuitTime()).toString("yyyy-MM-dd HH:mm"));
            }};
            msmVo.setParam(param);
            orderMqVo.setMsmVo(msmVo);

            //发送
            rabbitService.sendMessage(MqConst.EXCHANGE_DIRECT_ORDER,MqConst.ROUTING_ORDER,orderMqVo);


        } else {
            throw new YyghException(result.getString("message"),ResultCodeEnum.FAIL.getCode());
        }

        return orderInfo.getId();
    }
```

+ 前端测试访问

1. 得到就诊人信息
2. 得到排班信息
3. 得到相关信息
4. 调用医院接口

```java
2022-11-13 08:48:29.151  INFO 7572 --- [nio-8206-exec-1] com.frx01.helper.HttpRequestHelper       : --> 应答结果：result data {"code":200,"message":"成功","data":{"number":12,"fetchAddress":"一层114窗口","reservedNumber":33,"availableNumber":21,"resultCode":"0000","fetchTime":"2022-11-1409:00前","hosRecordId":11,"resultMsg":"预约成功"}}
2022-11-13 08:48:29.437  INFO 7572 --- [erListUpdater-0] c.netflix.config.ChainedDynamicProperty  : Flipping property: service-user.ribbon.ActiveConnectionsLimit to use NEXT property: niws.loadbalancer.availabilityFilteringRule.activeConnectionsLimit = 2147483647
2022-11-13 08:48:29.593  INFO 7572 --- [erListUpdater-1] c.netflix.config.ChainedDynamicProperty  : Flipping property: service-hosp.ribbon.ActiveConnectionsLimit to use NEXT property: niws.loadbalancer.availabilityFilteringRule.activeConnectionsLimit = 2147483647
```

## 订单详情功能

### 添加 servcie 接口以及实现类

1. 在OrderInfoService类添加接口

```java
    //根据订单的id查询订单详情
    OrderInfo getOrder(String orderId);
```

2. 在OrderInfoServiceImpl类添加接口实现

```java
    //根据订单id查询订单详情
    @Override
    public OrderInfo getOrder(String orderId) {
        OrderInfo orderInfo = baseMapper.selectById(orderId);
        return this.packOrderInfo(orderInfo);
    }

    private OrderInfo packOrderInfo(OrderInfo orderInfo){
        orderInfo.getParam().put("orderStatusString",OrderStatusEnum.getStatusNameByStatus(orderInfo.getOrderStatus()));
        return orderInfo;
    }
```

### 添加 Controller

```java
    //根据订单的id查询订单详情
    @GetMapping("/auth/getOrders/{orderId}")
    public Result getOrders(@PathVariable String orderId){
        OrderInfo orderInfo = orderService.getOrder(orderId);
        return Result.ok(orderInfo);
    }
```

+ 前端测试访问

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221113/image.3sxtal5zwou0.webp)

## 订单列表功能

### 添加 service 接口以及实现

1. 在 OrderInfoSerice 接口及实现类

```java
    //订单列表（条件查询带分页）
    IPage<OrderInfo> selectPage(Page<OrderInfo> pageParam, OrderQueryVo orderQueryVo);
```

2. 在 OrderInfoServiceImpl 类添加接口实现

```java
    //订单列表（条件查询带分页）
    @Override
    public IPage<OrderInfo> selectPage(Page<OrderInfo> pageParam, OrderQueryVo orderQueryVo) {
        //OrderQueryVo获取条件值
        String name = orderQueryVo.getKeyword();//医院名称
        String patientName = orderQueryVo.getPatientName();//就诊人的名称
        String orderStatus = orderQueryVo.getOrderStatus();//订单的状态
        String reserveDate = orderQueryVo.getReserveDate();//安排日期
        String createTimeBegin = orderQueryVo.getCreateTimeBegin();//开始时间
        String createTimeEnd = orderQueryVo.getCreateTimeEnd();//结束时间
        //对条件值进行非空的判断
        QueryWrapper<OrderInfo> queryWrapper = new QueryWrapper<>();
        if(!StringUtils.isEmpty(name)){
            queryWrapper.like("hosname",name);
        }
        if(!StringUtils.isEmpty(patientName)){
            queryWrapper.eq("patient_name",patientName);
        }
        if(!StringUtils.isEmpty(orderStatus)){
            queryWrapper.eq("order_status",orderStatus);
        }
        if(!StringUtils.isEmpty(reserveDate)){
            queryWrapper.ge("reserce_date",reserveDate);
        }
        if(!StringUtils.isEmpty(createTimeBegin)){
            queryWrapper.ge("create_time",createTimeBegin);
        }
        if(!StringUtils.isEmpty(createTimeEnd)){
            queryWrapper.le("create_time",createTimeEnd);
        }
        //调用mapper的方法
        Page<OrderInfo>  pages = baseMapper.selectPage(pageParam, queryWrapper);
        pages.getRecords().stream().forEach(item -> {
            this.packOrderInfo(item);
        });
        return pages;
    }

    private OrderInfo packOrderInfo(OrderInfo orderInfo){
        orderInfo.getParam().put("orderStatusString",OrderStatusEnum.getStatusNameByStatus(orderInfo.getOrderStatus()));
        return orderInfo;
    }
```

### 添加 Controller 

```java
    //订单列表（条件查询带分页）
    @GetMapping("/auth/{page}/{limit}")
    public Result list(@PathVariable Long page,
                       @PathVariable Long limit,
                       OrderQueryVo orderQueryVo,
                       HttpServletRequest request){
        //设置当前用户的id值
        orderQueryVo.setUserId(AuthContextHolder.getUserId(request));
        Page<OrderInfo> pageParam = new Page<>(page, limit);
        IPage<OrderInfo> pageModel = orderService.selectPage(pageParam,orderQueryVo);
        return Result.ok(pageModel);
    }

    //获取订单状态
    @GetMapping("/auth/getStatusList")
    public Result getStatusList(){
        return Result.ok(OrderStatusEnum.getStatusList());
    }
```

说明：订单状态我们是封装到枚举中的，页面搜索需要一个下拉列表展示，所以我们通过接口返回页面

+ 前端访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221113/image.3ubxjqw0p840.webp)

## 订单支付（生成二维码）

### 微信支付介绍

#### 微信扫码支付申请

微信扫码支付是商户系统按微信支付协议生成支付二维码，用户再用微信“扫一扫”完成支付的模式。该模式适用于PC网站支付、实体店单品或订单支付、媒体广告支付等场景。

申请步骤：（了解）

**第一步：注册公众号（类型须为：服务号）**

请根据营业执照类型选择以下主体注册：[个体工商户](http://kf.qq.com/faq/120911VrYVrA151009JB3i2Q.html)| [企业/公司](http://kf.qq.com/faq/120911VrYVrA151013MfYvYV.html)| [政府](http://kf.qq.com/faq/161220eaAJjE161220IJn6zU.html)| [媒体](http://kf.qq.com/faq/161220IFBJFv161220YnqAbQ.html)| [其他类型](http://kf.qq.com/faq/120911VrYVrA151013nYFZ7Z.html)。

**第二步：认证公众号**

公众号认证后才可申请微信支付，认证费：300元/年。

**第三步：提交资料申请微信支付**

登录公众平台，点击左侧菜单【微信支付】，开始填写资料等待审核，审核时间为1-5个工作日内。

**第四步：开户成功，登录商户平台进行验证**

资料审核通过后，请登录联系人邮箱查收商户号和密码，并登录商户平台填写财付通备付金打的小额资金数额，完成账户验证。

**第五步：在线签署协议**

本协议为线上电子协议，签署后方可进行交易及资金结算，签署完立即生效。

#### 开发文档

微信支付接口调用的整体思路：

按API要求组装参数，以XML方式发送（POST）给微信支付接口（URL）,微信支付接口也是以XML方式给予响应。程序根据返回的结果（其中包括支付URL）生成二维码或判断订单状态。

在线微信支付开发文档：

https://pay.weixin.qq.com/wiki/doc/api/index.html

1. appid：微信公众账号或开放平台APP的唯一标识
2. mch_id：商户号  (配置文件中的partner)
3. partnerkey：商户密钥
4. sign:数字签名, 根据微信官方提供的密钥和一套算法生成的一个加密信息, 就是为了保证交易的安全性

#### 微信支付SDK

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221115/image.775rxz9ipqs0.webp)

添加依赖

```xml
        <dependency>
            <groupId>com.github.wxpay</groupId>
            <artifactId>wxpay-sdk</artifactId>
            <version>0.0.3</version>
        </dependency>
```

我们主要会用到微信支付SDK的以下功能

1. 获取随机字符串

```java
WXPayUtil.generateNonceStr()
```

2. MAP转换为XML字符串（自动添加签名）

```java
WXPayUtil.generateSignedXml(param, partnerkey)
```

3. XML字符串转换为MAP

```java
WXPayUtil.xmlToMap(result)
```

### 微信支付开发

#### api 接口

场景：用户扫描商户展示在各种场景的二维码进行支付

使用案例：

线下：家乐福超市、7-11便利店、上品折扣线下店等

线上：大众点评网站、携程网站、唯品会、美丽说网站等

开发模式：

模式一：商户在后台给你生成二维码，用户打开扫一扫

模式二：商户后台系统调用微信支付【[统一下单API](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1)】生成预付交易，将接口返回的链接生成二维码，用户扫码后输入密码完成支付交易。注意：**该模式的预付单有效期为2小时，**过期后无法支付。

微信支付：生成xml发送请求

操作模块：service-order

##### 引入依赖

```xml
<dependency>
    <groupId>com.github.wxpay</groupId>
    <artifactId>wxpay-sdk</artifactId>
    <version>0.0.3</version>
</dependency>
```

##### 添加配置

在application.properties中添加商户信息

```properties
spring.redis.host=192.168.91.166
spring.redis.port=6379
spring.redis.database= 0
spring.redis.password=mima
spring.redis.timeout=1800000
spring.redis.lettuce.pool.max-active=20
spring.redis.lettuce.pool.max-wait=-1
#最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-idle=5
spring.redis.lettuce.pool.min-idle=0

#关联的公众号appid
weixin.pay.appid=wx74862e0dfcf69954
#商户号
weixin.pay.partner=1558950191
#商户key
weixin.pay.partnerkey=T6m9iK73b0kn9g5v426MKfHQH7X8rKwb
```

##### 引入工具类

```java
@Component
public class ConstantPropertiesUtils implements InitializingBean {
    
    @Value("${weixin.appid}")
    private String appid;

    @Value("${weixin.partner}")
    private String partner;

    @Value("${weixin.partnerkey}")
    private String partnerkey;

    public static String APPID;
    public static String PARTNER;
    public static String PARTNERKEY;
    @Override
    public void afterPropertiesSet() throws Exception {
        APPID = appid;
        PARTNER = partner;
        PARTNERKEY = partnerkey;
    }
}
```

```java
/**
 * http请求客户端
 */
public class HttpClient {
   private String url;
   private Map<String, String> param;
   private int statusCode;
   private String content;
   private String xmlParam;
   private boolean isHttps;
   private boolean isCert = false;
   //证书密码 微信商户号（mch_id）
   private String certPassword;
   public boolean isHttps() {
      return isHttps;
   }
   public void setHttps(boolean isHttps) {
      this.isHttps = isHttps;
   }
   public boolean isCert() {
      return isCert;
   }
   public void setCert(boolean cert) {
      isCert = cert;
   }
   public String getXmlParam() {
      return xmlParam;
   }
   public void setXmlParam(String xmlParam) {
      this.xmlParam = xmlParam;
   }
   public HttpClient(String url, Map<String, String> param) {
      this.url = url;
      this.param = param;
   }
   public HttpClient(String url) {
      this.url = url;
   }
   public String getCertPassword() {
      return certPassword;
   }
   public void setCertPassword(String certPassword) {
      this.certPassword = certPassword;
   }
   public void setParameter(Map<String, String> map) {
      param = map;
   }
   public void addParameter(String key, String value) {
      if (param == null)
         param = new HashMap<String, String>();
      param.put(key, value);
   }
   public void post() throws ClientProtocolException, IOException {
      HttpPost http = new HttpPost(url);
      setEntity(http);
      execute(http);
   }
   public void put() throws ClientProtocolException, IOException {
      HttpPut http = new HttpPut(url);
      setEntity(http);
      execute(http);
   }
   public void get() throws ClientProtocolException, IOException {
      if (param != null) {
         StringBuilder url = new StringBuilder(this.url);
         boolean isFirst = true;
         for (String key : param.keySet()) {
            if (isFirst)
               url.append("?");
            else
               url.append("&");
            url.append(key).append("=").append(param.get(key));
         }
         this.url = url.toString();
      }
      HttpGet http = new HttpGet(url);
      execute(http);
   }
   /**
    * set http post,put param
    */
   private void setEntity(HttpEntityEnclosingRequestBase http) {
      if (param != null) {
         List<NameValuePair> nvps = new LinkedList<NameValuePair>();
         for (String key : param.keySet())
            nvps.add(new BasicNameValuePair(key, param.get(key))); // 参数
         http.setEntity(new UrlEncodedFormEntity(nvps, Consts.UTF_8)); // 设置参数
      }
      if (xmlParam != null) {
         http.setEntity(new StringEntity(xmlParam, Consts.UTF_8));
      }
   }
   private void execute(HttpUriRequest http) throws ClientProtocolException,
         IOException {
      CloseableHttpClient httpClient = null;
      try {
         if (isHttps) {
            if(isCert) {
               //TODO 需要完善
               FileInputStream inputStream = new FileInputStream(new File(""));
               KeyStore keystore = KeyStore.getInstance("PKCS12");
               char[] partnerId2charArray = certPassword.toCharArray();
               keystore.load(inputStream, partnerId2charArray);
               SSLContext sslContext = SSLContexts.custom().loadKeyMaterial(keystore, partnerId2charArray).build();
               SSLConnectionSocketFactory sslsf =
                     new SSLConnectionSocketFactory(sslContext,
                           new String[] { "TLSv1" },
                           null,
                           SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
               httpClient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
            } else {
               SSLContext sslContext = new SSLContextBuilder()
                     .loadTrustMaterial(null, new TrustStrategy() {
                        // 信任所有
                        public boolean isTrusted(X509Certificate[] chain,
                                           String authType)
                              throws CertificateException {
                           return true;
                        }
                     }).build();
               SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(
                     sslContext);
               httpClient = HttpClients.custom().setSSLSocketFactory(sslsf)
                     .build();
            }
         } else {
            httpClient = HttpClients.createDefault();
         }
         CloseableHttpResponse response = httpClient.execute(http);
         try {
            if (response != null) {
               if (response.getStatusLine() != null)
                  statusCode = response.getStatusLine().getStatusCode();
               HttpEntity entity = response.getEntity();
               // 响应内容
               content = EntityUtils.toString(entity, Consts.UTF_8);
            }
         } finally {
            response.close();
         }
      } catch (Exception e) {
         e.printStackTrace();
      } finally {
         httpClient.close();
      }
   }
   public int getStatusCode() {
      return statusCode;
   }
   public String getContent() throws ParseException, IOException {
      return content;
   }
}
```

#### 添加交易记录接口

##### 添加 Mapper

```java
public interface PaymentMapper extends BaseMapper<PaymentInfo> {
}
```

##### 添加service接口与实现

1. 添加PaymentService 类

```java
public interface PaymentService extends IService<PaymentInfo> {

    //向支付记录表添加信息
    void savePaymentInfo(OrderInfo orderInfo, Integer status);
}
```

2. 添加PaymentServiceImpl实现类

```java
@Service
public class PaymentServiceImpl extends ServiceImpl<PaymentMapper, PaymentInfo> implements PaymentService {

    //向支付记录表添加信息
    @Override
    public void savePaymentInfo(OrderInfo orderInfo, Integer status) {
        //根据订单id和支付类型，查询支付记录表里面是否存在相同的订单
        QueryWrapper<PaymentInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("order_id",orderInfo.getId());
        queryWrapper.eq("payment_type",status);
        Integer count = baseMapper.selectCount(queryWrapper);
        if(count>0){
            return;
        }
        //添加记录
        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setCreateTime(new Date());
        paymentInfo.setOrderId(orderInfo.getId());
        paymentInfo.setPaymentType(status);
        paymentInfo.setOutTradeNo(orderInfo.getOutTradeNo());
        paymentInfo.setPaymentStatus(PaymentStatusEnum.UNPAID.getStatus());
        String subject = new DateTime(orderInfo.getReserveDate()).toString("yyyy-MM-dd")+"|"+orderInfo.getHosname()+"|"+orderInfo.getDepname()+"|"+orderInfo.getTitle();
        paymentInfo.setSubject(subject);
        paymentInfo.setTotalAmount(orderInfo.getAmount());
        baseMapper.insert(paymentInfo);

    }
}
```

#### 添加支付service接口与实现

1. 添加com.frx01.yygh.order.service.WeixinService类

```java
public interface WeiXinService {

    //生成微信支付扫描的二维码
    Map createNative(Long orderId);
}
```

2. 添加com.frx01.yygh.order.service.impl.WeixinServiceImpl类

```java
@Service
public class WeiXinServiceImpl implements WeiXinService {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private RedisTemplate redisTemplate;

    //生成微信支付扫描的二维码
    @Override
    public Map createNative(Long orderId) {
        //1.根据orderId获取订单信息
        OrderInfo orderInfo = orderService.getById(orderId);
        //2.向支付记录表添加信息
        paymentService.savePaymentInfo(orderInfo, PaymentTypeEnum.WEIXIN.getStatus());
        try {
            //从redis获取数据
            Map payMap = (Map)redisTemplate.opsForValue().get(orderId.toString());
            if(payMap!=null){
                return payMap;
            }
            //3.设置参数，调用微信生成二维码的接口
            //把参数转换成xml格式，使用商户key进行加密
            Map paramMap = new HashMap();
            paramMap.put("appid", ConstantPropertiesUtils.APPID);
            paramMap.put("mch_id", ConstantPropertiesUtils.PARTNER);
            paramMap.put("nonce_str", WXPayUtil.generateNonceStr());
            String body = orderInfo.getReserveDate() + "就诊" + orderInfo.getDepname();
            paramMap.put("body", body);
            paramMap.put("out_trade_no", orderInfo.getOutTradeNo());
            //paramMap.put("total_fee", order.getAmount().multiply(new BigDecimal("100")).longValue()+"");
            paramMap.put("total_fee", "1");
            paramMap.put("spbill_create_ip", "127.0.0.1");
            paramMap.put("notify_url", "http://guli.shop/api/order/weixinPay/weixinNotify");
            paramMap.put("trade_type", "NATIVE");
            //4.调用微信生成二维码的接口
            HttpClient client = new HttpClient("https://api.mch.weixin.qq.com/pay/unifiedorder");
            //设置map参数
            client.setXmlParam(WXPayUtil.generateSignedXml(paramMap, ConstantPropertiesUtils.PARTNERKEY));
            client.setHttps(true);
            client.post();
            //5.返回相关的数据
            String xml = client.getContent();
            //转换成map集合
            Map<String, String> resultMap = WXPayUtil.xmlToMap(xml);
            System.out.println("resultMap=:" + resultMap);
            //6.封装返回结果集
            Map map = new HashMap<>();
            map.put("orderId", orderId);
            map.put("totalFee", orderInfo.getAmount());
            map.put("resultCode", resultMap.get("result_code"));
            map.put("codeUrl", resultMap.get("code_url"));//二维码地址

            if(resultMap.get("result_code")!=null){
                redisTemplate.opsForValue().set(orderId.toString(),map,120, TimeUnit.MINUTES);
            }
            return map;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

#### 添加 Controller 方法

```java
@Api(tags = "微信支付接口")
@RestController
@RequestMapping("/api/order/weixin")
public class WeiXinController {

    @Autowired
    private WeiXinService weiXinService;

    //生成微信支付扫描的二维码
    @GetMapping("/createNative/{orderId}")
    public Result createNative(@PathVariable Long orderId){
        Map map = weiXinService.createNative(orderId);
        return Result.ok(map);
    }
}
```

+ 前端支付测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221115/image.29zrqdawt91c.webp)

### 处理支付结果

#### 添加 service 接口以及实现

1. 在PaymentService类添加接口

```java
    //更新订单状态
    void paySucess(String out_trade_no, Map<String, String> resultMap);
```

2. 在PaymentServiceImpl类添加实现

```java
    //更新订单状态
    @Override
    public void paySucess(String out_trade_no, Map<String, String> resultMap) {

        //1.根据订单编号得到支付记录
        QueryWrapper<PaymentInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("out_trade_no",out_trade_no);
        queryWrapper.eq("payment_type", PaymentTypeEnum.WEIXIN.getStatus());
        PaymentInfo paymentInfo = baseMapper.selectOne(queryWrapper);

        //2.更新支付记录信息
        paymentInfo.setPaymentStatus(PaymentStatusEnum.PAID.getStatus());
        paymentInfo.setCallbackTime(new Date());
        paymentInfo.setTradeNo(resultMap.get("transaction_id"));
        paymentInfo.setCallbackContent(resultMap.toString());
        baseMapper.updateById(paymentInfo);

        //3.根据订单号得到订单信息
        //4.更新订单信息
        OrderInfo orderInfo = orderService.getById(paymentInfo.getOrderId());
        orderInfo.setOrderStatus(OrderStatusEnum.PAID.getStatus());
        orderService.updateById(orderInfo);

        //5.调用医院接口，更新订单支付信息
    }
```

#### 更新医院支付状态

```java
        //5.调用医院接口，更新订单支付信息
        SignInfoVo signInfoVo = hospitalFeignClient.getSignInfoVo(orderInfo.getHoscode());
        Map<String,Object> reqMap = new HashMap<>();
        reqMap.put("hoscode",orderInfo.getHoscode());
        reqMap.put("hosRecordId",orderInfo.getHosRecordId());
        reqMap.put("timestamp", HttpRequestHelper.getTimestamp());
        String sign = HttpRequestHelper.getSign(reqMap, signInfoVo.getSignKey());
        reqMap.put("sign", sign);

        JSONObject result
                = HttpRequestHelper.sendRequest(reqMap, signInfoVo.getApiUrl() + "/order/updatePayStatus");
```

+ 前端访问测试
  + 查看控制台

```java
支付状态resultMap:{transaction_id=4200001670202211168362613899, nonce_str=mDMDU1ap2Lqlg9QR, trade_state=SUCCESS, bank_type=OTHERS, openid=oHwsHuL_t99-ri2ZsWbBVi4CNGXI, sign=6BB001DF5E713892D5D5142615D56718, return_msg=OK, fee_type=CNY, mch_id=1558950191, cash_fee=1, out_trade_no=16685284490991, cash_fee_type=CNY, appid=wx74862e0dfcf69954, total_fee=1, trade_state_desc=支付成功, trade_type=NATIVE, result_code=SUCCESS, attach=, time_end=20221116000748, is_subscribe=N, return_code=SUCCESS}
```

+ 查看数据库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221116/image.75ob63plui80.webp)