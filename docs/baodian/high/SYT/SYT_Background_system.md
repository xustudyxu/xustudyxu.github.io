---
title: 尚医通-后台系统
date: 2022-10-28 00:40:09
permalink: /high/SYT/SYT_Background_system
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-后台系统

[[toc]]

## 医院管理

目前我们把医院、科室和排班都上传到了平台，那么管理平台就应该把他们管理起来，在我们的管理平台能够直观的查看这些信息。

### 医院管理效果展示

1. 列表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.26a20uns1grk.webp)

2. 详情

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.2l9fwv8udho0.webp)

## 注册中心与服务调用

目前在医院列表中需要医院的信息和等级信息,而两段信息属于不同的的模块,service-hosp和service-cmn，所以我们需要使用到远程调用。

### Nacos 概述

#### 什么是Nacos

Nacos 是阿里巴巴推出来的一个新开源项目，这是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

Nacos 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。

Nacos 帮助您更敏捷和容易地构建、交付和管理微服务平台。 Nacos 是构建以“服务”为中心的现代应用架构
(例如微服务范式、云原生范式) 的服务基础设施

#### 常见的注册中心

1. Eureka（原生，2.0遇到瓶颈，停止维护）
2. Zookeeper（支持，专业的独立产品。例如：dubbo）
3. Consul（原生，GO语言开发）
4. Nacos

相对于 Spring Cloud Eureka 来说，Nacos 更强大。

Nacos = Spring Cloud Eureka + Spring Cloud Config

Nacos 可以与 Spring, Spring Boot, Spring Cloud 集成，并能代替 Spring Cloud Eureka, Spring Cloud Config。

+ 通过 Nacos Server 和 spring-cloud-starter-alibaba-nacos-config 实现配置的动态变更。

+ 通过 Nacos Server 和 spring-cloud-starter-alibaba-nacos-discovery 实现服务的注册与发现。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.463pyd91m060.webp)

#### Nacos 下载与安装

+ [下载安装步骤](/Spring/SpringCloud/Nacos_/#nacos安装)

### 注册服务

#### Nacos注册service-hosp

**第一步：在service模块pom文件引入依赖**

```xml
       <!-- 服务注册 -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
```

**第二步：在service-hosp的配置文件添加nacos服务地址**

```properties
# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
```

**第三步：在service-hosp的启动类添加注解**

```java {3}
@SpringBootApplication
@ComponentScan("com.frx01")
@EnableDiscoveryClient
public class ServiceHospApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceHospApplication.class, args);
    }
}
```

**启动service-hosp服务，在Nacos管理界面的服务列表中可以看到注册的服务**

service-cmn注册过程和service-hosp相同（省略）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.7a0rpc61wfw0.webp)

## 医院管理实现

### 医院列表 api 接口

#### 添加service分页接口与实现

1. 在HospitalService类添加分页接口

```java
    //条件查询分页
    Page<Hospital> selectHospPage(Integer page, Integer limit, HospitalQueryVo hospitalQueryVo);
```

2. HospitalServiceImpl类实现分页

```java
    @Override
    public Page<Hospital> selectHospPage(Integer page, Integer limit, HospitalQueryVo hospitalQueryVo) {
        //创建Pageable对象
        Pageable pageable = PageRequest.of(page-1,limit);
        //创建条件匹配器
        ExampleMatcher matching = ExampleMatcher.matching()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)
                .withIgnoreCase(true);
        //hospitalQueryVo转换成Hospital对象
        Hospital hospital = new Hospital();
        BeanUtils.copyProperties(hospitalQueryVo,hospital);
        //创建Example 对象
        Example<Hospital> example = Example.of(hospital);
        //调用方法来实现查询操作
        Page<Hospital> hospitalPage = hospitalRepository.findAll(example, pageable);
        return hospitalPage;

    }
```

#### 添加 Controller 方法

```java
@RestController
@RequestMapping("/admin/hosp/hospital")
@CrossOrigin
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    //医院的列表方法(条件查询分页)
    @GetMapping("/list/{page}/{limit}")
    public Result listHosp(@PathVariable Integer page,
                           @PathVariable Integer limit,
                           HospitalQueryVo hospitalQueryVo){
        Page<Hospital> pageModel = hospitalService.selectHospPage(page,limit,hospitalQueryVo);
        return Result.ok(pageModel);
    }
}
```

### service-cmn模块提供接口

由于我们的医院等级、省市区地址都是取的数据字典value值，因此我们在列表显示医院等级与医院地址时要根据数据字典value值获取数据字典名称

通过学习数据字典我们知道，根据上级编码与value值可以获取对应的数据字典名称，如果value值能够保持唯一（不一定唯一），我们也可以直接通过value值获取数据字典名称，目前省市区三级数据我们使用的是国家统计局的数据，数据编码我们就是数据字典的id与value，所以value能够唯一确定一条数据字典，如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.1jrsnijy1vmo.webp)

#### 添加service接口与实现

在DictService类添加接口

```java
    String getDictName(String dictCode, String value);
```

DictServiceImpl类实现

```java
    @Override
    public String getDictName(String dictCode, String value) {

        //如果dictCode为空，直接根据value查询
        if(StringUtils.isEmpty(dictCode)){
            QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("value",value);
            Dict dict = baseMapper.selectOne(queryWrapper);
            return dict.getName();
        } else {
            //如果不为空,根据dictCode和value查询
            //根据dictcode查询dict的id值
            Dict codeDict = this.getDictByDictCode(dictCode);
            Long parentId = codeDict.getId();
            //根据parentId和value值进行查询
            Dict findDict = baseMapper.selectOne(new QueryWrapper<Dict>()
                    .eq("parent_id", parentId)
                    .eq("value", value));
            return findDict.getName();

        }

    }

    private Dict getDictByDictCode(String dictCode){
        QueryWrapper<Dict> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("dict_code",dictCode);
        Dict codeDict = baseMapper.selectOne(queryWrapper);
        return codeDict;
    }
```

#### 添加 controller 方法

```java
    //根据dictcode和value查询
    @GetMapping("/getName/{dictCode}/{value}")
    public String getName(@PathVariable String dictCode,
                          @PathVariable String value){
        String dictName = dictService.getDictName(dictCode,value);
        return dictName;

    }
    //根据value查询
    @GetMapping("/getName/{value}")
    public String getName(@PathVariable String value){
        String dictName = dictService.getDictName("",value);
        return dictName;
    }
```

### 封装Feign服务调用

#### 搭建service-client父模块

修改pom.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.frx01</groupId>
        <artifactId>yygh_parent</artifactId>
        <version>0.0.1-SNAPSHOT</version>

        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.frx01</groupId>
    <artifactId>service_client</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>service_client</name>
    <packaging>pom</packaging>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>common-util</artifactId>
            <version>1.0</version>
            <scope>provided </scope>
        </dependency>

        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>model</artifactId>
            <version>1.0</version>
            <scope>provided </scope>
        </dependency>

        <dependency>
         <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <scope>provided </scope>
        </dependency>

        <!-- 服务调用feign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
            <scope>provided </scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

#### 搭建service-cmn-client模块

修改pom.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.frx01</groupId>
        <artifactId>service-client</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
    <groupId>com.frx01</groupId>
    <artifactId>service-cmn-client</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>service-cmn-client</name>
    <description>Demo project for Spring Boot</description>

</project>
```

#### 添加Feign接口类

```java
@FeignClient("service_cmn")
@Service
public interface DictFeignClient {

    //根据dictcode和value查询
    @GetMapping("/admin/cmn/dict/getName/{dictCode}/{value}")
    public String getName(@PathVariable("dictCode") String dictCode,
                          @PathVariable("value") String value);


    //根据value查询
    @GetMapping("/admin/cmn/dict/getName/{value}")
    public String getName(@PathVariable("value") String value);
    
}
```

### 医院接口远程调用数据字典

#### service模块引入依赖

在pom.xml添加依赖

```xml
<!-- 服务调用feign -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

#### 在service-hosp添加依赖

```xml
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>service-cmn-client</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
```

#### 启动类开启服务调用

```java {3-4}
@SpringBootApplication
@ComponentScan("com.frx01")
@EnableDiscoveryClient
@EnableFeignClients("com.frx01")
public class ServiceHospApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceHospApplication.class, args);
    }
}
```

#### 调整 service 方法

修改HospitalServiceImpl类实现分页

```java
    @Autowired
    private DictFeignClient dictFeignClient;
	
    @Override
    public Page<Hospital> selectHospPage(Integer page, Integer limit, HospitalQueryVo hospitalQueryVo) {
        //创建Pageable对象
        Pageable pageable = PageRequest.of(page-1,limit);
        //创建条件匹配器
        ExampleMatcher matching = ExampleMatcher.matching()
                .withStringM
            atcher(ExampleMatcher.StringMatcher.CONTAINING)
                .withIgnoreCase(true);
        //hospitalQueryVo转换成Hospital对象
        Hospital hospital = new Hospital();
        BeanUtils.copyProperties(hospitalQueryVo,hospital);
        //创建Example 对象
        Example<Hospital> example = Example.of(hospital);
        //调用方法来实现查询操作
        Page<Hospital> hospitalPage = hospitalRepository.findAll(example, pageable);
        //获取查询list集合，遍历进行医院等级的封装
        hospitalPage.getContent().stream().forEach(item -> {
            this.setHospitalHosType(item);

        });
        return hospitalPage;

    }

	//获取查询list集合，遍历进行医院等级的封装
    private Hospital setHospitalHosType(Hospital hospital) {
        //根据 dictCode 和 value 获取医院等级的名称
        String hostypeString = dictFeignClient.getName("Hostype", hospital.getHostype());
        //查询省 市 地区
        String provinceString = dictFeignClient.getName(hospital.getProvinceCode());
        String cityString = dictFeignClient.getName(hospital.getCityCode());
        String districtString = dictFeignClient.getName(hospital.getDistrictCode());

        hospital.getParam().put("fullAddress",provinceString+cityString+districtString);
        hospital.getParam().put("hostypeString",hostypeString);
        return hospital;
    }
```

+ 测试,[使用Swagger发送GET请求](http://localhost:8201/swagger-ui.html#!/hospital45controller/listHospUsingGET)

page为1，limit为3，测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221027/image.1qrrju9o3e2o.webp)

### 添加数据字典显示接口

#### 编写 Controller 

根据dicode查询下层节点

```java
    //根据dictCode获取下级节点
    @ApiOperation(value = "根据dictCode获取下级节点")
    @GetMapping("/findByDictCode/{dictCode}")
    public Result findByDictCode(@PathVariable String dictCode) {
        List<Dict> list = dictService.findByDictCode(dictCode);
        return Result.ok(list);

    }
```

#### 编写 Service

Service

```java
    //根据dictCode获取下级节点
    List<Dict> findByDictCode(String dictCode);
```

ServiceImpl

```java
    @Override
    public List<Dict> findByDictCode(String dictCode) {

        //根据dictCode获取对应的Id
        Dict dict = this.getDictByDictCode(dictCode);
        //根据Id获取下层的子节点
        List<Dict> childData = this.findChildData(dict.getId());
        return childData;
    }
```

+ 测试，[使用Swagger测试](http://localhost:8202/swagger-ui.html#!/dict45controller/findByDictCodeUsingGET)

+ 传入参数Province

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221029/image.iji51w7w6a0.webp)

### 更新医院上线状态

#### 添加service接口

在HospitalService类添加接口

```java
    //更新医院的上线状态
    void updateStatus(String id, Integer status);
```

HospitalServiceImpl类实现

```java
    @Override
    public void updateStatus(String id, Integer status) {
        //根据id查询医院信息
        Hospital hospital = hospitalRepository.findById(id).get();
        //设置修改的值
        hospital.setStatus(status);
        hospital.setUpdateTime(new Date());
        hospitalRepository.save(hospital);

    }
```

#### 添加controller方法

```java
    //更新医院的上线状态
    @ApiOperation(value = "更新医院的上线状态")
    @GetMapping("/updateHospStatus/{id}/{status}")
    public Result updateHospStatus(@PathVariable String id,
                                   @PathVariable Integer status){
        hospitalService.updateStatus(id,status);
        return Result.ok();

    }
```

+ 测试，将协和医院上线

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221029/image.4dwu329mego0.webp)

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221029/image.54kgrs6bsxs0.webp)

### 医院详情

#### 添加 service 接口

在HospitalService类添加接口

```java
    //医院的详情信息
    Map<String,Object> getHospById(String id);
```

HospitalServiceImpl类实现

```java
    @Override
    public Map<String,Object> getHospById(String id) {
        Map<String, Object> map = new HashMap<>();
        Hospital hospital = this.setHospitalHosType(hospitalRepository.findById(id).get());
        //医院的基本信息 包含医院的等级
        map.put("hospital",hospital);
        map.put("bookingRule",hospital.getBookingRule());
        //不需要重复返回
        hospital.setBookingRule(null);
        return map;

    }
```

#### 添加 controller 方法

```java
    //医院的详情信息
    @ApiOperation(value = "医院的详情信息")
    @GetMapping("/showHospDetail/{id}")
    public Result showHospDetail(@PathVariable String id){
        Map<String, Object> hospMap = hospitalService.getHospById(id);
        return Result.ok(hospMap);
    }
```

+ 测试,点击北京协和医院的查看按钮

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221029/image.4c6hp8muepc.webp)

## 医院排班

### 医院效果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221030/image.309t8zbdkiu0.webp)

排班分成三部分显示：

1. 科室信息（大科室与小科室树形展示）
2. 排班日期，分页显示，根据上传排班数据聚合统计产生
3. 排班日期对应的就诊医生信息

### 接口分析

1. 科室数据使用Element-ui el-tree组件渲染展示，需要将医院上传的科室数据封装成两层父子级数据；
2. 聚合所有排班数据，按日期分页展示，并统计号源数据展示；
3. 根据排班日期获取排班详情数据；

### 实现分析

虽然是一个页面展示所有内容，但是页面相对复杂，我们分步骤实现

1. 先实现左侧科室树形展示；
2. 其次排班日期分页展示
3. 最后根据排班日期获取排班详情数据

## 排班管理实现

### 科室列表

#### 添加 service 接口以及实现

在DepartmentService类添加接口

```java
    //根据医院的编号，查询医院科室的列表
    List<DepartmentVo> findDeptTree(String hoscode);
```

在DepartmentServiceImpl类实现接口

```java
    //根据医院的编号，查询医院科室的列表
    @Override
    public List<DepartmentVo> findDeptTree(String hoscode) {

        //创建List集合，用于最终数据封装
        List<DepartmentVo> result = new ArrayList<>();

        //根据医院编号，查询医院所有的科室的信息
        Department departmentQuery = new Department();
        departmentQuery.setHoscode(hoscode);
        Example<Department> example = Example.of(departmentQuery);
        List<Department> departmentList = departmentRepository.findAll(example);

        //根据大科室编号 bigcode 分组，获取大科室里面下级子科室
        Map<String, List<Department>> departmentMap =
                departmentList.stream().collect(Collectors.groupingBy(Department::getBigcode));
        //遍历map集合
        for(Map.Entry<String,List<Department>> entry : departmentMap.entrySet()){
            //大科室编号
            String bigCode = entry.getKey();
            //大科室编号对应的全部数据
            List<Department> departmentList1 = entry.getValue();

            //封装大科室
            DepartmentVo departmentVo1 = new DepartmentVo();
            departmentVo1.setDepcode(bigCode);
            departmentVo1.setDepname(departmentList1.get(0).getBigname());

            //封装小科室
            List<DepartmentVo> children = new ArrayList<>();
            for (Department department : departmentList1) {
                DepartmentVo departmentVo2 = new DepartmentVo();
                departmentVo2.setDepcode(department.getDepcode());
                departmentVo2.setDepname(department.getDepname());
                //封装到list集合
                children.add(departmentVo2);
            }

            //把小科室list集合放到大科室的children里面去
            departmentVo1.setChildren(children);

            //放到最终的result里面去
            result.add(departmentVo1);
        }
        //返回结果
        return result;
    }
```

#### 添加 Controller 接口

```java
    //根据医院的编号，查询医院科室的列表
    @ApiOperation(value = "查询医院科室的列表")
    @GetMapping("/getDeptList/{hoscode}")
    public Result getDeptList(@PathVariable String hoscode){

       List<DepartmentVo> list = departmentService.findDeptTree(hoscode);
       return Result.ok(list);
    }
```

+ 使用Swagger测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221030/image.5qzo98b1wx80.webp)

### 排班日期分页列表

#### 添加service接口与实现

在ScheduleService类添加接口

```java
    //根据 医院编号和科室编号 查询排班规则数据
    Map<String, Object> getRlueSchedule(long page, long limit, String hoscode, String depcode);
```

在ScheduleServiceImpl类实现接口

```java
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private HospitalService hospitalService;
    //根据 医院编号和科室编号 查询排班规则数据
    @Override
    public Map<String, Object> getRlueSchedule(long page, long limit, String hoscode, String depcode) {

        //1.根据医院编号 和 科室编号 查询
        Criteria criteria = Criteria.where("hoscode").is(hoscode).and("depcode").is(depcode);

        //2.根据工作日期wordDate进行分组
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(criteria),//匹配条件
                Aggregation.group("workDate") //分组字段
                        .first("workDate").as("workDate")
                        //3.统计号源数量
                        .count().as("docCount")
                        .sum("reservedNumber").as("reservedNumber")
                        .sum("availableNumber").as("availableNumber"),
                //排序
                Aggregation.sort(Sort.Direction.DESC, "workDate"),
                //4.实现分页
                Aggregation.skip((page - 1) * limit),
                Aggregation.limit(limit)

        );

        //调用方法 最终执行
        AggregationResults<BookingScheduleRuleVo> aggResults =
                mongoTemplate.aggregate(aggregation, Schedule.class, BookingScheduleRuleVo.class);
        List<BookingScheduleRuleVo> bookingScheduleRuleVoList = aggResults.getMappedResults();

        //分组查询之后总的记录数
        Aggregation totalAgg = Aggregation.newAggregation(
                Aggregation.match(criteria),
                Aggregation.group("workDate")
        );
        AggregationResults<BookingScheduleRuleVo> totalAggResults =
                mongoTemplate.aggregate(totalAgg, Schedule.class, BookingScheduleRuleVo.class);
        int total = totalAggResults.getMappedResults().size();

        //把日期对应的星期获取
        for (BookingScheduleRuleVo bookingScheduleRuleVo : bookingScheduleRuleVoList) {
            Date workDate = bookingScheduleRuleVo.getWorkDate();
            String dayOfWeek = this.getDayOfWeek(new DateTime(workDate));
            bookingScheduleRuleVo.setDayOfWeek(dayOfWeek);
        }

        //设置最终数据，返回
        HashMap<String, Object> result = new HashMap<>();
        result.put("bookingScheduleRuleVoList",bookingScheduleRuleVoList);
        result.put("total",total);

        //获取医院名称
        String hosName = hospitalService.getHospName(hoscode);
        //其他基础数据
        HashMap<String, String> baseMap = new HashMap<>();
        baseMap.put("hosname",hosName);
        result.put("baseMap",baseMap);
        return result;
    }

    /**
     * 根据日期获取周几数据
     *
     * @param dateTime
     * @return
     */
    private String getDayOfWeek(DateTime dateTime) {
        String dayOfWeek = "";
        switch (dateTime.getDayOfWeek()) {
            case DateTimeConstants.SUNDAY:
                dayOfWeek = "周日";
                break;
            case DateTimeConstants.MONDAY:
                dayOfWeek = "周一";
                break;
            case DateTimeConstants.TUESDAY:
                dayOfWeek = "周二";
                break;
            case DateTimeConstants.WEDNESDAY:
                dayOfWeek = "周三";
                break;
            case DateTimeConstants.THURSDAY:
                dayOfWeek = "周四";
                break;
            case DateTimeConstants.FRIDAY:
                dayOfWeek = "周五";
                break;
            case DateTimeConstants.SATURDAY:
                dayOfWeek = "周六";
            default:
                break;
        }
        return dayOfWeek;
    }
```

#### 添加根据医院编号获取医院名称接口

在HospitalService类添加接口

```java
    //根据医院编号，获取医院名称
    String getHospName(String hoscode);
```

在HospitalServiceImpl类实现接口

```java
    //获取医院名称
    @Override
    public String getHospName(String hoscode) {
        Hospital hospital = hospitalRepository.getHospitalByHoscode(hoscode);
        if(hospital!=null){
            return hospital.getHosname();
        }
        return null;
    }
```

#### 添加 Controller 接口

```java
    //根据 医院编号和科室编号 查询排班规则数据
    @ApiOperation(value = "查询排班规则数据")
    @GetMapping("/getScheduleRule/{page}/{limit}/{hoscode}/{depcode}")
    public Result getScheduleRule(@PathVariable long page,
                                  @PathVariable long limit,
                                  @PathVariable String hoscode,
                                  @PathVariable String depcode){
        Map<String,Object> map = scheduleService.getRlueSchedule(page,limit,hoscode,depcode);
        return Result.ok(map);
    }
```

+ 使用Swagger测试接口

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221030/image.4j1cuzgsmum0.webp)

### 根据排班日期获取排班详情列表

#### 添加repository接口

在ScheduleRepository类添加接口

```java
    //根据医院编号、科室编号和工作日期，查询排班详细信息
    List<Schedule> findScheduleByHoscodeAndDepcodeAndWorkDate(String hoscode, String depcode, Date dateTime);
```

在ScheduleServiceImpl类实现接口

```java
    //根据医院编号、科室编号和工作日期，查询排班详细信息
    @Override
    public List<Schedule> getDetailSchedule(String hoscode, String depcode, String workDate) {
        List<Schedule> scheduleList =
                scheduleRepository.findScheduleByHoscodeAndDepcodeAndWorkDate(hoscode,depcode,new DateTime(workDate).toDate());
        //把得到list集合遍历，设置其他值，医院名称，科室名称，日期对应星期
        scheduleList.stream().forEach(item -> {
            this.packageSchedule(item);
        });
        return scheduleList;
    }

    //封装排班的详情里面其他的值  医院名称，科室名称，日期对应星期
    private void packageSchedule(Schedule schedule) {
        //设置医院的名称 根据医院编号 得到医院名称
        schedule.getParam().put("hosname",hospitalService.getHospName(schedule.getHoscode()));
        //设置科室名称
        schedule.getParam().put("depname",departmentService.getDepName(schedule.getHoscode(),schedule.getDepcode()));
        //设置日期对应星期
        schedule.getParam().put("dayOfWeek",this.getDayOfWeek(new DateTime(schedule.getWorkDate())));

    }
```

#### 添加根据部门编码获取部门名称

1. 在DepartmentService类添加接口

```java
    //根据科室的编号 医院的编号 查询科室的名称
    String getDepName(String hoscode, String depcode);
```

2. 在DepartmentService类添加接口实现

```java
    @Override
    public String getDepName(String hoscode, String depcode) {
        Department departemnt =
                departmentRepository.getDepartemntByHoscodeAndDepcode(hoscode, depcode);
        if(departemnt != null){
            return departemnt.getDepname();
        }
        return null;
    }
```

#### 添加controller

```java
    //根据医院编号、科室编号和工作日期，查询排班详细信息
    @ApiOperation(value = "查询排班详细信息")
    @GetMapping("getScheduleDetail/{hoscode}/{depcode}/{workDate}")
    public Result getScheduleDetail( @PathVariable String hoscode,
                                     @PathVariable String depcode,
                                     @PathVariable String workDate){
        List<Schedule> list = scheduleService.getDetailSchedule(hoscode,depcode,workDate);
        return Result.ok(list);
    }
```

+ 使用swagger测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221030/image.76qbfalaxsg0.webp)

+ 前端访问

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221030/image.5wrmo6d5dxk0.webp)