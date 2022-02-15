# 动态SQL

## 简介&环境搭建

动态 SQL 是 MyBatis 的强大特性之一。如果你使用过 JDBC 或其它类似的框架，你应该能理解根据不同条件拼接 SQL 语句有多痛苦，例如拼接时要确保不能忘记添加必要的空格，还要注意去掉列表最后一个列名的逗号。利用动态 SQL，可以彻底摆脱这种痛苦。

使用动态 SQL 并非一件易事，但借助可用于任何 SQL 映射语句中的强大的动态 SQL 语言，MyBatis 显著地提升了这一特性的易用性。

如果你之前用过 JSTL 或任何基于类 XML 语言的文本处理器，你对动态 SQL 元素可能会感觉似曾相识。在 MyBatis 之前的版本中，需要花时间了解大量的元素。借助功能强大的基于 OGNL 的表达式，MyBatis 3 替换了之前的大部分元素，大大精简了元素种类，现在要学习的元素种类比原来的一半还要少。

- if
- choose (when, otherwise)
- trim (where, set)
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

