---
title: 分页插件
date: 2022-02-28 21:46:34
permalink: /pages/ca7f77/
categories:
  - MyBatis
tags:
  - MyBatis
---
# 分页插件

[[toc]]

## 分页插件使用步骤

### 添加依赖

```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
	<groupId>com.github.pagehelper</groupId>
	<artifactId>pagehelper</artifactId>
	<version>5.2.0</version>
</dependency>
```

### 配置分页插件

在MyBatis的核心配置文件中配置插件

```xml
<plugins>
	<!--设置分页插件-->
	<plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>
```

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/2/28  23:44
 */
public class PageHelper {
    /**
     * limit index,pageSize
     * index:当前页的起始索引
     * pageSize:每页显示的条数
     * pageNum:表示当前页的页码
     * index=(pageNum-1)*pageSize
     */
    @Test
    public void testPageHelper(){
        try {
            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            SqlSession openSession = sqlSessionFactory.openSession(true);
            EmpMapper mapper = openSession.getMapper(EmpMapper.class);
            com.github.pagehelper.PageHelper.startPage(1,3);//pageNum=1 pageSize=3
            EmpExample example = new EmpExample();
            example.createCriteria().andGenderEqualTo("1");
            List<Emp> list = mapper.selectByExample(example);
            for (Emp emp : list) {
                System.out.println(emp);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

+ 输出结果

```java
DEBUG 03-01 00:03:51,018 Cache Hit Ratio [SQL_CACHE]: 0.0  (LoggingCache.java:60) 
DEBUG 03-01 00:03:51,168 ==>  Preparing: SELECT count(0) FROM tbl_employee WHERE (gender = ?)  (BaseJdbcLogger.java:137) 
DEBUG 03-01 00:03:51,188 ==> Parameters: 1(String)  (BaseJdbcLogger.java:137) 
DEBUG 03-01 00:03:51,248 <==      Total: 1  (BaseJdbcLogger.java:137) 
DEBUG 03-01 00:03:51,248 ==>  Preparing: select id, last_name, gender, email, d_id from tbl_employee WHERE ( gender = ? ) LIMIT ?  (BaseJdbcLogger.java:137) 
DEBUG 03-01 00:03:51,248 ==> Parameters: 1(String), 3(Integer)  (BaseJdbcLogger.java:137) 
DEBUG 03-01 00:03:51,278 <==      Total: 3  (BaseJdbcLogger.java:137) 
Emp{id=1, lastName='admin', gender='1', email='123@qq.com', dId=1}
Emp{id=3, lastName='jerry', gender='1', email='jerry@123.com', dId=null}
Emp{id=5, lastName='frank', gender='1', email='frank@athome.com', dId=2}

Process finished with exit code 0
```

### 分页插件的使用

+ 在查询功能之前使用PageHelper.startPage(int pageNum, int pageSize)开启分页功能

> pageNum：当前页的页码
>
> pageSize：每页显示的条数

+ 在查询获取list集合之后，使用PageInfo pageInfo = new PageInfo<>(List list, int
  navigatePages)获取分页相关数据

> list：分页之后的数据
>
> navigatePages：导航分页的页码数

+ 分页相关数据

PageInfo{
pageNum=8, pageSize=4, size=2, startRow=29, endRow=30, total=30, pages=8,
list=Page{count=true, pageNum=8, pageSize=4, startRow=28, endRow=32, total=30,
pages=8, reasonable=false, pageSizeZero=false},
prePage=7, nextPage=0, isFirstPage=false, isLastPage=true, hasPreviousPage=true,
hasNextPage=false, navigatePages=5, navigateFirstPage4, navigateLastPage8,
navigatepageNums=[4, 5, 6, 7, 8]
}

> 常用数据：
>
> pageNum：当前页的页码
>
> pageSize：每页显示的条数
>
> size：当前页显示的真实条数
>
> total：总记录数
>
> pages：总页数
>
> prePage：上一页的页码
>
> nextPage：下一页的页码
>
> isFirstPage/isLastPage：是否为第一页/最后一页
>
> hasPreviousPage/hasNextPage：是否存在上一页/下一页
>
> navigatePages：导航分页的页码数
>
> navigatepageNums：导航分页的页码，[1,2,3,4,5]

