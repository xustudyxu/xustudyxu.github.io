---
title: 动态SQL
date: 2022-02-14 15:12:48
permalink: /pages/72d6fc/
categories:
  - MyBatis
tags:
  - MyBatis
---
# 动态SQL

[[toc]]

## 简介&环境搭建

动态 SQL 是 MyBatis 的强大特性之一。如果你使用过 JDBC 或其它类似的框架，你应该能理解根据不同条件拼接 SQL 语句有多痛苦，例如拼接时要确保不能忘记添加必要的空格，还要注意去掉列表最后一个列名的逗号。利用动态 SQL，可以彻底摆脱这种痛苦。

使用动态 SQL 并非一件易事，但借助可用于任何 SQL 映射语句中的强大的动态 SQL 语言，MyBatis 显著地提升了这一特性的易用性。

如果你之前用过 JSTL 或任何基于类 XML 语言的文本处理器，你对动态 SQL 元素可能会感觉似曾相识。在 MyBatis 之前的版本中，需要花时间了解大量的元素。借助功能强大的基于 OGNL 的表达式，MyBatis 3 替换了之前的大部分元素，大大精简了元素种类，现在要学习的元素种类比原来的一半还要少。

- if

- choose (when, otherwise):分支选择；带了break的swtich-case

  如果带了id就用id查，如果带了lastName就用lastName查；只会进入其中一个

- trim 字符串截取(where(封装查询条件), set(封装修改条件))

- foreach

EmployeeMapperDynamicSQL.java

```java
	public interface EmployeeMapperDynamicSQL {
}
```

EmployeeMapperDynamicSQL.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.frx01.mybatis.dao.EmployeeMapperDynamicSQL">
</mapper>
```

## if-判断&OGNL

EmployeeMapperDynamicSQL.java

```java
public interface EmployeeMapperDynamicSQL {

    //携带了哪个字段查询条件就带上这个字段的值
    public List<Employee> getEmpsByConditionIf(Employee employee);

}
```

EmployeeMapperDynamicSQL.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.frx01.mybatis.dao.EmployeeMapperDynamicSQL">
    <!-- 查询员工，要求，携带了哪个字段查询条件就带上这个字段的值 -->
    <!-- public List<Employee> getEmpsByConditionIf(Employee employee); -->
    <select id="getEmpsByConditionIf" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee where
        <!-- test：判断表达式（OGNL）
        OGNL参照PPT或者官方文档。
               c:if  test
        从参数中取值进行判断

        遇见特殊符号应该去写转义字符：
        &&：
        -->
        <if test="id!=null">
            id=#{id}
        </if>
        <if test="lastName!=null &amp;&amp; lastName!=&quot;&quot;">
            and last_name like #{lastName}
        </if>
        <if test="email!=null and email.trim()!=&quot;&quot;">
            and email=#{email}
        </if>
        <!-- ognl会进行字符串与数字的转换判断  "0"==0 -->
        <if test="gender==0 or gender==1">
            and gender=#{gender}
        </if>
    </select>
</mapper>
```

MyBasicTest.java

```java
public class MyBasicTest {

    public SqlSessionFactory getSqlSessionFactory() throws IOException{
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        return new SqlSessionFactoryBuilder().build(inputStream);

    }

    @Test
    public void testDynamicSql() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
    try {
        EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
        Employee employee = new Employee(3, "%e%", "jerry@123.com", null);
        List<Employee> emps = mapper.getEmpsByConditionIf(employee);
        for (Employee emp : emps) {
            System.out.println(emp);
        }
    }finally {
        openSession.close();
    }
    }
}
```

### OGNL

[OGNL官方文档](http://commons.apache.org/proper/commons-ognl/language-guide.html)

OGNL（ Object Graph Navigation Language ）对象图导航语言， 这是一种强大的表达式语言，通过它可以非常方便的来操作对象属性。 类似于我们的EL， SpEL等。

+ 访问对象属性： person.name
+ 调用方法： person.getName()
+ 调用静态属性/方法： @java.lang.Math@PI、@java.util.UUID@randomUUID()
+ 调用构造方法： new com.lun.Person(‘admin’).name
+ 运算符： +, -*, /, %
+ 逻辑运算符： in, not in, >, >=, <, <=, ==, !=

**注意**： xml中特殊符号如”,>,<等这些都需要使用转义字符

访问集合伪属性：

| 类型             | 伪属性         | 伪属性对应的 Java 方法                     |
| ---------------- | -------------- | ------------------------------------------ |
| List、 Set、 Map | size、 isEmpty | List/Set/Map.size(),List/Set/Map.isEmpty() |
| List、 Set       | iterator       | List.iterator()、 Set.iterator()           |
| Map              | keys、 values  | Map.keySet()、 Map.values()                |
| Iterator         | next、 hasNext | Iterator.next()、 Iterator.hasNext()       |

## where-查询条件

查询的时候如果某些条件没带可能sql拼装会有问题

1. 给where后面加上1=1，以后的条件都and xxx。
2. mybatis使用where标签来将所有的查询条件包括在内。mybatis就会将where标签中拼装的sql，多出来的and或者or去掉（where只会去掉第一个多出来的and或者or，但最后一个多出来的and或者or则不会去掉）。

EmployeeMapperDynamicSQL.xml

```xml
<select id="getEmpsByConditionIf" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee
        <!--where-->
            <where>
        <!-- test：判断表达式（OGNL）
        OGNL参照PPT或者官方文档。
               c:if  test
        从参数中取值进行判断

        遇见特殊符号应该去写转义字符：
        &&：
        -->
        <if test="id!=null">
            and id=#{id}
        </if>
        <if test="lastName!=null &amp;&amp; lastName!=&quot;&quot;">
            and last_name like #{lastName}
        </if>
        <if test="email!=null and email.trim()!=&quot;&quot;">
            and email=#{email}
        </if>
        <!-- ognl会进行字符串与数字的转换判断  "0"==0 -->
        <if test="gender==0 or gender==1">
            and gender=#{gender}
        </if>
            </where>
    </select>
```

EmployeeMapperDynamicSQL.java

```java
public interface EmployeeMapperDynamicSQL {

    public List<Employee> getEmpsByConditionIfWhere(Employee employee);
}
```

MyBasicTest.java

```java
  @Test
    public void testGetEmpsByConditionIfWithWhere() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
            Employee employee = new Employee(null, "%e%", "jerry@123.com", null);
            List<Employee> emps = mapper.getEmpsByConditionIfWhere(employee);
            for (Employee emp : emps) {
                System.out.println(emp);
            }
        }finally {
            openSession.close();
        }
    }
```

## trim-自定义字符串截取

后面多出的and或者or where标签不能解决

+ prefix="":前缀：trim标签体中是整个字符串拼串后的结果。

  +  prefix给拼串后的整个字符串加一个前缀
+ prefixOverrides="":
    + 前缀覆盖： 去掉整个字符串前面多余的字符
+ suffix="":后缀
    + suffix给拼串后的整个字符串加一个后缀
+ suffixOverrides=""
                + 后缀覆盖：去掉整个字符串后面多余的字符

EmployeeMapperDynamicSQL.java

```java
public interface EmployeeMapperDynamicSQL {

    public List<Employee> getEmpsByConditionTrim(Employee employee);
}
```

EmployeeMapperDynamicSQL.xml

```xml
<!--public List<Employee> getEmpsByConditionTrim(Employee employee);-->
    <select id="getEmpsByConditionTrim" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee
        <!--后面多出的and或者or  where标签不能解决-->
        <!-- 自定义字符串的截取规则 -->
        <trim prefix="where" suffixOverrides="and">
            <if test="id!=null">
                 id=#{id} and
            </if>
            <if test="lastName!=null &amp;&amp; lastName!=&quot;&quot;">
                 last_name like #{lastName} and
            </if>
            <if test="email!=null and email.trim()!=&quot;&quot;">
                email=#{email} and
            </if>
            <!-- ognl会进行字符串与数字的转换判断  "0"==0 -->
            <if test="gender==0 or gender==1">
                gender=#{gender}
            </if>
        </trim>
    </select>
```

MyBasicTest.java

```java
    @Test
    public void testGetEmpsByConditionTrim() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
            Employee employee = new Employee(null, "%e%", "jerry@123.com", null);
            List<Employee> emps = mapper.getEmpsByConditionTrim(employee);
            for (Employee emp : emps) {
                System.out.println(emp);
            }
        }finally {
            openSession.close();
        }
    }
```

## choose-分支选择

EmployeeMapperDynamicSQL.java

```java
public interface EmployeeMapperDynamicSQL {

    public List<Employee> getEmpsByConditionChoose(Employee employee);
}
```

EmployeeMapperDynamicSQL.xml

```xml
 <!--public List<Employee> getEmpsByConditionChoose(Employee employee);-->
    <select id="getEmpsByConditionChoose" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee
        <where>
            <!--如果带了id就用id差，如果带了lastName就用lastName差；只会进入其中一个-->
            <choose>
                <when test="id!=null">
                    id=#{id}
                </when>
                <when test="lastName!=null">
                    last_Name like #{lastName}
                </when>
                <when test="email!=null">
                    email=#{email}
                </when>
                <otherwise>
                    gender=0
                </otherwise>
            </choose>
        </where>
    </select>
```

MyBasicTest.java

```java
 @Test
    public void testGetEmpsByConditionChoose() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
            Employee employee = new Employee(null, "%e%", "jerry@123.com", null);
            List<Employee> emps = mapper.getEmpsByConditionChoose(employee);
            for (Employee emp : emps) {
                System.out.println(emp);
            }
        }finally {
            openSession.close();
        }
    }
```

## set-与if结合的动态更新

EmployeeMapperDynamicSQL.java

```java
public interface EmployeeMapperDynamicSQL {

    public void updateEmp(Employee employee);
}
```

EmployeeMapperDynamicSQL.xml

```xml
    <!--public void updateEmp(Employee employee);-->
    <update id="updateEmp">
        update tbl_employee
        <!--set标签的使用-->
        <set>
        <if test="lastName!=null">
            last_name=#{lastName},
        </if>
        <if test="email!=null">
            email=#{email},
        </if>
        <if test="gender!=gender">
            gender=#{gender}
        </if>
        </set>
        where id=#{id}
        <!--trim标签的使用-->
        <!--<trim prefix="set" suffixOverrides=",">-->
        <!--    <if test="lastName!=null">-->
        <!--        last_name=#{lastName},-->
        <!--    </if>-->
        <!--    <if test="email!=null">-->
        <!--        email=#{email},-->
        <!--    </if>-->
        <!--    <if test="gender!=gender">-->
        <!--        gender=#{gender}-->
        <!--    </if>-->
        <!--</trim>-->
        <!--where id=#{id}-->
    </update>
```

MyBasicTest.java

```java
    @Test
    public void testGetEmpsByConditionSet() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
            Employee employee = new Employee(1, "admin", null, null);
            mapper.updateEmp(employee);
        }finally {
            openSession.close();
        }
    }
```

## foreach-遍历集合

+ collection：指定要遍历的集合：
  + list类型的参数会特殊处理封装在map中，map的key就叫list
+ item：将当前遍历出的元素赋值给指定的变量

+ separator:每个元素之间的分隔符

+ open：遍历出所有结果拼接一个开始的字符

+ close:遍历出所有结果拼接一个结束的字符

+ index:索引。遍历list的时候是index就是索引，item就是当前值

- 遍历map的时候index表示的就是map的key，item就是map的值

+ ` #{变量名}`就能取出变量的值也就是当前遍历出的元素

EmployeeMapperDynamicSQL.java

```java
public interface EmployeeMapperDynamicSQL {
	//查询员工id在给定集合中
    public List<Employee> getEmpsByConditionForeach(List<Integer> ids);
}
```

EmployeeMapperDynamicSQL.xml

```xml
 <!--public List<Employee> getEmpsByCon  ditionForeach(List<Integer> ids);-->
    <select id="getEmpsByConditionForeach" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee where id in
        <foreach collection="list" item="item_id" separator=","
                 open="(" close=")" >
            #{item_id}
        </foreach>
    </select>
```

MyBasicTest.java

```java
  @Test
    public void testGetEmpsByConditionForeach() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
            Employee employee = new Employee(1, "admin", null, null);
            List<Employee> empsByConditionForeach = mapper.getEmpsByConditionForeach(Arrays.asList(1, 2, 3, 4));
            for (Employee employee1 : empsByConditionForeach) {
                System.out.println(employee1);
            }
        }finally {
            openSession.close();
        }
    }
```

## foreach-mysql下foreach批量插入的两种方式

EmployeeMapperDynamicSQL.java

```java
public interface EmployeeMapperDynamicSQL {

    public void addEmps(@Param("emps") List<Employee> emps);
    public void addEmps2(@Param("emps2") List<Employee> emps);
}
```

EmployeeMapperDynamicSQL.xml

```xml
 <!--批量保存-->
    <!--public void addEmps(@Param("emps") List<Employee> emps);-->
    <!--MySQL下批量保存：可以foreach遍历 mysql支持values(),()语法-->
    <insert id="addEmps">
        insert into tbl_employee (last_name,email,gender,d_id)
        values
        <foreach collection="emps"  item="emp" separator=",">
            (#{emp.lastName},#{emp.email},#{emp.gender},#{emp.dept.id})
        </foreach>
    </insert>

    <!-- 这种方式需要数据库连接属性allowMultiQueries=true；
        这种分号分隔多个sql可以用于其他的批量操作（删除，修改） -->
    <insert id="addEmps2">
    <foreach collection="emps2" item="emp" separator=";">
        insert into tbl_employee (last_name,email,gender,d_id)
        values(#{emp.lastName},#{emp.email},#{emp.gender},#{emp.dept.id})
    </foreach>
    </insert>
```

**注意**，MySQL数据库连接属性allowMultiQueries=true，才能批量删除，修改数据。（在连接MySQL的URL后添加参数）。

MyBasicTest.java

```java
    @Test
    public void testaddEmps() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
            ArrayList<Employee> employees = new ArrayList<>();
            employees.add(new Employee(null,"smith","smith@athome.com","1",new Department(1)));
            employees.add(new Employee(null,"allen","allen@athome.com","0",new Department(1)));
            mapper.addEmps(employees);
        }finally {
            openSession.close();
        }
    }

    @Test
    public void testaddEmps2() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapperDynamicSQL mapper = openSession.getMapper(EmployeeMapperDynamicSQL.class);
            ArrayList<Employee> employees = new ArrayList<>();
            employees.add(new Employee(null,"smith","smith@athome.com","1",new Department(1)));
            employees.add(new Employee(null,"allen","allen@athome.com","0",new Department(1)));
            mapper.addEmps2(employees);
        }finally {
            openSession.close();
        }
    }
```

## foreach-oracle下foreach批量插入两种方式

Oracle数据库批量保存：

- Oracle不支持values(),(),()

Oracle支持的批量方式:

1. 多个insert放在begin - end里面
2. 利用中间表

```sql
# 多个insert放在begin - end里面
begin
    insert into employees(employee_id,last_name,email) 
    values(employees_seq.nextval,'test_001','test_001@atguigu.com');
    insert into employees(employee_id,last_name,email) 
    values(employees_seq.nextval,'test_002','test_002@atguigu.com');
end;

# 利用中间表
insert into employees(employee_id,last_name,email)
   select employees_seq.nextval,lastName,email from(
          select 'test_a_01' lastName,'test_a_e01' email from dual
          union
          select 'test_a_02' lastName,'test_a_e02' email from dual
          union
          select 'test_a_03' lastName,'test_a_e03' email from dual
   );
```

## foreach-oracle下foreach批量保存两种方式

```xml
<insert id="addEmps" databaseId="oracle">
	<!-- oracle第一种批量方式 -->
	<!--
	<foreach collection="emps" item="emp" open="begin" close="end;">
		insert into employees(employee_id,last_name,email) 
	    values(employees_seq.nextval,#{emp.lastName},#{emp.email});
	</foreach> 
	-->
	
	<!-- oracle第二种批量方式  -->
	insert into employees(employee_id,last_name,email)
	<foreach collection="emps" item="emp" separator="union"
		open="select employees_seq.nextval,lastName,email from("
		close=")">
		select #{emp.lastName} lastName,#{emp.email} email from dual
	</foreach>
</insert>
```

## 内置参数 _parameter & _databaseId

不只是方法传递过来的参数可以被用来判断，

mybatis默认还有**两个内置参数**：

1. _parameter:代表整个参数    

   1. 单个参数：_parameter就是这个参数\
   2. 多个参数：参数会被封装为一个map；_parameter就是代表这个map
2. **_databaseId**:如果配置了databaseIdProvider标签。  
   1. _databaseId就是代表当前数据库的别名oracle

EmployeeMapperDynamicSQL.java

```java
public interface EmployeeMapperDynamicSQL {

    public List<Employee> getEmpsTestInnerParameter(Employee employee);
}
```

EmployeeMapperDynamicSQL.xml

```xml
  <!--public List<Employee> getEmpsTestInnerParameter(Employee employee);-->
    <select id="getEmpsTestInnerParameter" resultType="com.frx01.mybatis.bean.Employee">
        <if test="_databaseId=='mysql'">
        select * from tbl_employee
            <if test="_parameter!=null">
                where last_name=#{_parameter.lastName}
            </if>
        </if>

        <if test="databaseId=='oracle'" >
        select * from employees
            <if test="_parameter!=null">
                where last_name=#{_parameter.lastName}
            </if>
        </if>
    </select>
```

## bind-绑定

bind 元素可以从 OGNL 表达式中创建一个变量并将其绑定到上下文。

EmployeeMapperDynamicSQL.xml

```xml
   <!--public List<Employee> getEmpsTestInnerParameter(Employee employee);-->
    <select id="getEmpsTestInnerParameter" resultType="com.frx01.mybatis.bean.Employee">
        <!--bind:可以将OGNL表达式的值绑定到一个变量中，方便后来引用这个变量的值-->
        <bind name="" value="'_'+lastName+'%'"/>  <!-- '_'+lastName+'%' -->
        <if test="_databaseId=='mysql'">
        select * from tbl_employee
            <if test="_parameter!=null">
                where last_name like #{lastName}
            </if>
        </if>

        <if test="databaseId=='oracle'" >
        select * from employees
            <if test="_parameter!=null">
                where last_name=#{_parameter.lastName}
            </if>
        </if>
    </select>
```

## sql-抽取可重用的sql片段

抽取可重用的sql片段。方便后面引用：

1. sql抽取：经常将要查询的列名，或者插入用的列名抽取出来方便引用
2. include来引用已经抽取的sql：
3. include还可以自定义一些property，sql标签内部就能使用自定义的属性    
   - include-property：取值的正确方式${prop},
   - 不能使用`#{}`，而使用`${}`

```xml
<sql id="userColumns"> ${alias}.id,${alias}.username,${alias}.password </sql>

<select id="selectUsers" resultType="map">
	select
		<include refid="userColumns"><property name="alias" value="t1"/></include>,
		<include refid="userColumns"><property name="alias" value="t2"/></include>
	from some_table t1
		cross join some_table t2
</select>
```

```xml
<sql id="insertColumn">
	<if test="_databaseId=='oracle'">
		employee_id,last_name,email
	</if>
	<if test="_databaseId=='mysql'">
		last_name,email,gender,d_id
	</if>
</sql>

<insert id="addEmps">
	insert into tbl_employee(
		<include refid="insertColumn"></include><!-- 使用地方 -->
	) 
	values
	<foreach collection="emps" item="emp" separator=",">
		(#{emp.lastName},#{emp.email},#{emp.gender},#{emp.dept.id})
	</foreach>
 </insert>
```

