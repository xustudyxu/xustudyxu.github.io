---
title: SSM-CRUD
date: 2022-03-06 17:22:37
permalink: /pages/98f56c/
categories:
  - 初级开发篇
  - SSM整合
tags:
  - SSM整合
---
# SSM-CRUD

[[toc]]

## 功能点

1. 分页
2. 数据校验
   + jquery前端校验+JSR303后端校验
3. ajax
4. Rest风格的URI；使用HTTP协议请求方式的动词，来表示对资源的操作（GET（查询），POST（新增），PUT（修改），DELETE（删除））

## 技术点

1. 基础框架-ssm（SpringMVC+Spring+MyBatis）
2. 数据库-MySQL
3. 前端框架-bootstrap快速搭建简洁美观的界面
4. 项目的依赖管理-Maven
5. 分页-pagehelper
6. 逆向工程-MyBatis Generator

## 基础环境搭建

1. 创建一个maven工程

2. 引入项目依赖的jar包
   + spring
   + springmvc
   + mybatis
   + 数据库连接池
   + • 其他（jstl，servlet-api，junit）
3. 引入bootstrap前端框架
4. 编写ssm整合的关键配置文件
   + web.xml，spring,springmvc,mybatis，使用mybatis的逆向工程生成对应的bean以及mapper
5. 测试mapper

### 配置pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

  <modelVersion>4.0.0</modelVersion>
  <packaging>war</packaging>

  <name>SSM-CRUD</name>
  <groupId>com.frx01</groupId>
  <artifactId>SSM-CRUD</artifactId>
  <version>1.0-SNAPSHOT</version>

  <!--引入项目依赖的jar包-->
  <!--SpringMVC、Spring、-->
  <dependencies>
    <!--引入分页插件-->
    <dependency>
      <groupId>com.github.pagehelper</groupId>
      <artifactId>pagehelper</artifactId>
      <version>5.2.0</version>
    </dependency>
    <!--  MBG  -->
    <dependency>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-core</artifactId>
      <version>1.3.0</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!--  返回json字符串的支持  -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.8.8</version>
    </dependency>
    <!-- JSR303数据校验支持；tomcat7及以上的服务器，
            tomcat7以下的服务器：el表达式。额外给服务器的lib包中替换新的标准的el
             -->
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-validator</artifactId>
      <version>5.4.1.Final</version>
    </dependency>
    <!--  Spring-Jdbc  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!-- Spring-test  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!--  Spring面向切面编程  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!-- MyBatis  -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.4.2</version>
    </dependency>
    <!--  MyBatis整合Spring的适配包  -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.1</version>
    </dependency>
    <!--  数据库连接池、驱动  -->
    <dependency>
      <groupId>c3p0</groupId>
      <artifactId>c3p0</artifactId>
      <version>0.9.1</version>
    </dependency>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.41</version>
    </dependency>
    <!--  （jstl，servlet-api，junit）  -->
    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.0.1</version>
      <scope>provided</scope>
    </dependency>
    <!--  junit  -->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
    </dependency>
  </dependencies>
</project>
```

### 配置dbconfig.properties

```properties
jdbc.jdbcUrl=jdbc:mysql://localhost:3306/SSM_CRUD
jdbc.driverClass=com.mysql.jdbc.Driver
jdbc.user=root
jdbc.password=hsp
```

### 配置web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.4"
         xmlns="http://java.sun.com/xml/ns/j2ee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">
    <!--1.启动Spring的容器-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>

    <!--  Bootstraps the root web application context before servlet initialization  -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!--2.springmvc的前端控制器-->
    <!--  The front controller of this Spring Web application, responsible for handling all application requests  -->
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!--  Map all requests to the DispatcherServlet for handling  -->
    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!--3.字符编码过滤器-->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceRequestEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>forceResponseEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--4.使用Rest风格的URI 将页面普通的post请求 转为指定的delete或者put请求-->
    <filter>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

</web-app>
        
```

### 配置dispatcherServlet-servlet.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-4.3.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd">

        <!--SpringMVC的配置文件，包含网站跳转逻辑的控制，配置-->
        <context:component-scan base-package="com.frx01" use-default-filters="false">
                <!--只扫描控制器-->
                <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
        </context:component-scan>

        <!--配置视图解析器-->
        <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
                <property name="prefix" value="/WEB-INF/views/"></property>
                <property name="suffix" value=".jsp"></property>
        </bean>

        <!--两个标准配置-->
        <!--将SpringMVC不能处理的资源交给Tomcat-->
        <mvc:default-servlet-handler/>
                <!--支持springmvc更高级的一些功能,JSR303校验，快捷的ajax 映射动态请求-->
        <mvc:annotation-driven/>
</beans>
```

### 配置applicationContext.xml

```xml
?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
		http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.3.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd">

    <!--扫描-->
    <context:component-scan base-package="com.frx01">
       <!-- <context:exclude-filter type="annotation"
                                expression="org.springframework.stereotype.Controller"/>
-->
    </context:component-scan>

    <!--Spring的配置文件,这里主要配置和业务主要逻辑有关的-->
    <!--=======================数据源,事务控制===========================-->
    <context:property-placeholder location="classpath:dbconfig.properties"/>
    <bean id="pooledDataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="jdbcUrl" value="${jdbc.jdbcUrl}"></property>
        <property name="driverClass" value="${jdbc.driverClass}"></property>
        <property name="user" value="${jdbc.user}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>

    <!-- ======================配置和Mybatis的整合=====================-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--指定mybatis全局配置文件的位置-->
        <property name="configLocation" value="classpath:mybatis-config.xml"></property>
        <property name="dataSource" ref="pooledDataSource"></property>
        <!--指定mybatis，mapper文件的位置-->
        <property name="mapperLocations" value="classpath:mapper/*.xml"></property>
    </bean>

    <!--配置扫描器。将mybatis接口的实现加入到ioc容器中-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <!--扫描所有dao接口的实现，加入到ioc容器中-->
        <property name="basePackage" value="com.frx01.crud"></property>
    </bean>

    <!-- 配置一个可以执行批量的sqlSession -->
    <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
        <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory"></constructor-arg>
        <constructor-arg name="executorType" value="BATCH"></constructor-arg>
    </bean>

    <!--========================事务控制的配置========================-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--控制数据源-->
        <property name="dataSource" ref="pooledDataSource"></property>
    </bean>
        <!--开启基于注解的事务，使用xml配置形式的事务(必须主要的都是使用配置式)-->
        <aop:config>
            <!--切入点表达式-->
            <aop:pointcut  expression="execution(* com.frx01.crud.service..*(..))" id="txPoint"/>
            <!--配置事务增强-->
            <aop:advisor advice-ref="txAdvice" pointcut-ref="txPoint"/>
        </aop:config>

    <!--配置事务增强,配置事务如何切入-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <!--所有方法都是事务方法-->
            <tx:method name="*"/>
            <!--以get开始的所有方法-->
            <tx:method name="get*" read-only="true"/>
        </tx:attributes>
    </tx:advice>

    <!--Spring配置文件的核心点(数据源、与mybatis整合，事务控制)-->

</beans>
```

### 创建表

```sql
CREATE DATABASE ssm_CRUD
CREATE TABLE tbl_emp(
	emp_id INT(11) PRIMARY KEY AUTO_INCREMENT,
	emp_name VARCHAR(255) NOT NULL,
	gender CHAR(1),
	email VARCHAR(255),
	d_id INT(11),
	FOREIGN KEY (d_id) REFERENCES tbl_dept(dept_id))
CREATE TABLE tbl_dept(
	dept_id INT(11) PRIMARY KEY AUTO_INCREMENT,
	dept_name VARCHAR(255) NOT NULL)
```

### 配置mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--驼峰命名法-->
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
    <!--指定javabean包名-->
    <typeAliases>
        <package name="com.frx01.crud.bean"/>
    </typeAliases>
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>
</configuration>
```

### mybatis逆向工程

+  使用mybatis逆向工程生成
  + Java实体类
  + Mapper接口
  + Mapper映射文件

`generatorConfig.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--
            targetRuntime: 执行生成的逆向工程的版本
                    MyBatis3Simple: 生成基本的CRUD（清新简洁版）
                    MyBatis3: 生成带条件的CRUD（奢华尊享版）
     -->
    <context id="DB2Tables" targetRuntime="MyBatis3">

        <!--禁用注释-->
     	<commentGenerator>
			<property name="suppressAllComments" value="true" />
		</commentGenerator>

        <!-- 数据库的连接信息 -->
        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/SSM_CRUD"
                        userId="root"
                        password="hsp">

        </jdbcConnection>
        <!-- javaBean的生成策略-->
        <javaModelGenerator targetPackage="com.frx01.crud.bean" targetProject="SSM-CRUD\src\main\java">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>

        <!-- SQL映射文件的生成策略 -->
        <sqlMapGenerator targetPackage="com.frx01.crud.mapper"  targetProject="SSM-CRUD\src\main\resources">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>

        <!-- Mapper接口的生成策略 -->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.frx01.crud.mapper"  targetProject="SSM-CRUD\src\main\java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>

        <!-- 逆向分析的表 -->
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="tbl_emp" domainObjectName="Employee"/>
        <table tableName="tbl_dept" domainObjectName="Department"/>
    </context>
</generatorConfiguration>
```

### 修改逆向工程生成的EmployeeMapper.xml

+ 向Employee添加department属性，并提供set和get方法
+ 在Employyee接口中添加两个方法

```java
	List<Employee> selectByExampleWithDept(EmployeeExample example);

    Employee selectByPrimaryKeyWithDept(Integer empId);
```

+ 向EmployeeMapper.xml中添加

```xml
<resultMap type="com.frx01.crud.bean.Employee" id="WithDeptResultMap">
    <id column="emp_id" jdbcType="INTEGER" property="empId" />
    <result column="emp_name" jdbcType="VARCHAR" property="empName" />
    <result column="gender" jdbcType="CHAR" property="gender" />
    <result column="email" jdbcType="VARCHAR" property="email" />
    <result column="d_id" jdbcType="INTEGER" property="dId" />
    <!-- 指定联合查询出的部门字段的封装 -->
    <association property="department" javaType="com.frx01.crud.bean.Department">
      <id column="dept_id" property="deptId"/>
      <result column="dept_name" property="deptName"/>
    </association>
  </resultMap>

<!--   List<Employee> selectByExampleWithDept(EmployeeExample example);
   Employee selectByPrimaryKeyWithDept(Integer empId);
   -->
  <!-- 根据条件查询员工同时带部门信息 -->
  <select id="selectByExampleWithDept" resultMap="WithDeptResultMap">
    select
    <if test="distinct">
      distinct
    </if>
    <include refid="WithDept_Column_List" />
    FROM tbl_emp e
    left join tbl_dept d on e.`d_id`=d.`dept_id`
    <if test="_parameter != null">
      <include refid="Example_Where_Clause" />
    </if>
    <if test="orderByClause != null">
      order by ${orderByClause}
    </if>
  </select>
	<!--根据主键查询员工同时带部门信息 -->
  <select id="selectByPrimaryKeyWithDept" resultMap="WithDeptResultMap">
    select
    <include refid="WithDept_Column_List" />
    FROM tbl_emp e
    left join tbl_dept d on e.`d_id`=d.`dept_id`
    where emp_id = #{empId,jdbcType=INTEGER}
  </select>
```

+ 测试

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/3/7  22:04
 * 测试dao层的工作
 * 推荐Spring的项目就可以使用Spring单元测试,可以自动注入需要的组件
 * 1.导入SpringTest模块
 * 2.@ContextConfiguration指定Spring配置文件的位置
 * 3.直接autowired要使用的组件即可
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"}) //指定Spring配置文件的位置
public class MapperTest {

    @Autowired
    DepartmentMapper departmentMapper;

    @Autowired
    EmployeeMapper employeeMapper;

    @Autowired
    SqlSession sqlSession;
    /**
     * 测试DepartmentMapper
     */
    @Test
    public void testCRUD(){
        //1.创建SpringIOC容器
        // ApplicationContext ioc=new ClassPathXmlApplicationContext("applicationContext.xml");
        //2.从容器中获取Mapper
        //DepartmentMapper bean = ioc.getBean(DepartmentMapper.class);
        System.out.println(departmentMapper);

        //1.插入几个部门
        //departmentMapper.insertSelective(new Department(null,"开发部"));
        //departmentMapper.insertSelective(new Department(null,"测试部"));

        //2.生成员工数据，测试员工插入
        employeeMapper.insertSelective(new Employee(null,"冯荣旭","M","abc@qq.com",1));

        //3.批量插入多个员工;批量插入：使用可以执行批量操作的SqlSession
        //for (){
        //    employeeMapper.insertSelective(new Employee(null,"冯荣旭","M","abc@qq.com",1));
        //}
        EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
        for(int i=0;i<1000;i++){
            String uid = UUID.randomUUID().toString().substring(0, 5)+""+i;
            mapper.insert(new Employee(null,"uid","M",uid+"@qq.com",1));

        }
        System.out.println("批量完成");
    }
}

```

+ 结果

```java
org.apache.ibatis.binding.MapperProxy@3c01cfa1
批量完成
Process finished with exit code 0
```

## CRUD-查询

![OLpGlV.png](https://s1.ax1x.com/2022/05/20/OLpGlV.png)

1. 访问index.jsp页面
2. index.jsp页面发送出查询员工列表请求
3. EmployeeController来接受请求，查出员工数据
4. 来到list.jsp页面进行展示

`index.jsp`

```js
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>员工列表</title>
</head>
<body>

</body>
</html>
```

`EmployeeService.java`

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/3/9  16:13
 */
@Service
public class EmployeeService {

    @Autowired
    EmployeeMapper employeeMapper;

    /**
     * 查询所有员工
     * @return
     */
    public List<Employee> getAll() {
        return employeeMapper.selectByExampleWithDept(null);
    }
}
```

`EmployeeController.java`

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/3/9  16:10
 * 处理员工CRUD请求
 */
@Controller
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;
    /**
     * 查询员工数据
     * @return
     */
    @RequestMapping("/emps")
    public String getEmps(
            @RequestParam(value = "pn", defaultValue = "1") Integer pn,
            Model model) {
        // 这不是一个分页查询；
        // 引入PageHelper分页插件
        // 在查询之前只需要调用，传入页码，以及每页的大小
        PageHelper.startPage(pn, 5);
        // startPage后面紧跟的这个查询就是一个分页查询
        List<Employee> emps = employeeService.getAll();
        // 使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
        // 封装了详细的分页信息,包括有我们查询出来的数据，传入连续显示的页数
        PageInfo page = new PageInfo(emps, 5);
        model.addAttribute("pageInfo", page);

        return "list";
    }
}
```

`MVC_Test.java`

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/3/9  17:38
 * 使用Spring测试供的测试请求功能，测试curd请求的正确性
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = {"classpath:applicationContext.xml",
        "file:F:\\SSM-CRUD\\src\\main\\webapp\\WEB-INF\\dispatcherServlet-servlet.xml"})
public class MVC_Test {

    // 传入Springmvc的ioc
    @Autowired
    WebApplicationContext context;
    // 虚拟mvc请求，获取到处理结果。
    MockMvc mockMvc;

    @Before
    public void initMokcMvc() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void testPage() throws Exception {
        //模拟请求拿到返回值
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/emps").param("pn", "5")).andReturn();
        //请求成功以后，请求域中会有pageInfo；我们可以取出pageInfo进行验证
        MockHttpServletRequest request = result.getRequest();
        PageInfo pi =(PageInfo) request.getAttribute("pageInfo");

        System.out.println("当前页码：" + pi.getPageNum());
        System.out.println("总页码：" + pi.getPages());
        System.out.println("总记录数：" + pi.getTotal());
        System.out.println("在页面需要连续显示的页码");
        int[] nums = pi.getNavigatepageNums();
        for (int i : nums) {
            System.out.print(" " + i);
        }

        //获取员工数据
        List<Employee> list = pi.getList();
        for (Employee employee : list) {
            System.out.println("ID：" + employee.getEmpId() + "==>Name:" + employee.getEmpName());
        }

    }

}
```

+ 结果

```java
当前页码：5
总页码：401
总记录数：2003
在页面需要连续显示的页码
 3 4 5 6 7ID：1023==>Name:41b6b19
ID：1024==>Name:fcd9920
ID：1025==>Name:9b04621
ID：1026==>Name:f776422
ID：1027==>Name:f8a9523

Process finished with exit code 0
```







