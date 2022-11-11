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

