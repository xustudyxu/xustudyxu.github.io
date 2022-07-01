---
title: XML 映射文件
date: 2022-02-07 15:57:07
permalink: /pages/c86777/
categories:
  - MyBatis
tags:
  - MyBatis
---
# XML 映射文件

[[toc]]

## insert, update 和 delete

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/2/4  14:59
 */
public interface EmployeeMapper {

    public Employee getEmpById(Integer id);
    
    public void addEmp(Employee employee);

    public void updateEmp(Employee employee);

    public void deleteEmpById(Integer id);
}
```

```xml
    <!--public void addEmp(Employee employee);-->
    <insert id="addEmp" parameterType="com.frx01.mybatis.bean.Employee"
    useGeneratedKeys="true" keyProperty="id">
        insert into tbl_employee(last_name,email,gender)
        values(#{lastName},#{email},#{gender})
    </insert>

    <!--public void updateEmp(Employee employee);-->
    <update id="updateEmp">
        update tbl_employee
            set last_name=#{lastName},email=#{email},gender=#{gender}
                where id=#{id}
    </update>

    <!--public void deleteEmpById(Integer id);-->
    <delete id="deleteEmpById">
        delete from tbl_employee where id=#{id}
    </delete>
```

```java
	@Test
    public void test03() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        //1.获取到的SqlSession不会自动提交数据
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
            //测试添加
            Employee employee = new Employee(null, "jerry", "jerry@123.com", "1");
            mapper.addEmp(employee);
            System.out.println(employee.getId());

            //测试修改
//            Employee employee = new Employee(1, "Tom", "jerry@123.com", "0");
//            Boolean updateEmp = mapper.updateEmp(employee);
//            System.out.println(updateEmp);

            //测试删除
//            mapper.deleteEmpById(2);
            //2.手动提交
//            openSession.commit();
        }finally {
            openSession.close();

        }
    }
```

+ 增加结果

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/03/01.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/03/02.png)

+ 修改结果

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/03/03.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/03/04.png)

+ 测试删除

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/03/05.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/03/06.png)

### 另外

1. mybatis允许增删改直接定义以下类型返回值
   1. Integer、Long、Boolean、void
2. 我们需要手动提交数据
   1. sqlSessionFactory.openSession();===》手动提交
   2. sqlSessionFactory.openSession(true);===》自动提交

+ 测试返回值

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/03/07.png)

### insert-获取自增主键的值

- parameterType：参数类型，可以省略
- 获取自增主键的值：
  - mysql支持自增主键，自增主键值的获取，mybatis也是利用statement.getGenreatedKeys()；
  - useGeneratedKeys=“true”；使用自增主键获取主键值策略
  - keyProperty；指定对应的主键属性，也就是mybatis获取到主键值以后，将这个值封装给javaBean的哪个属性

```xml
<insert id="addEmp" parameterType="com.frx01.mybatis.bean.Employee"
    useGeneratedKeys="true" keyProperty="id">
        insert into tbl_employee(last_name,email,gender)
        values(#{lastName},#{email},#{gender})
    </insert>
```

+ 获取自增主键id的值

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/03/08.png)

官方文档:[insert、update、delete](https://mybatis.org/mybatis-3/zh/sqlmap-xml.html#insert_update_and_delete)

### insert-Oracle使用序列生成主键演示

+ Oracle不支持自增；Oracle使用序列来模拟自增；
+ 每次插入的数据的主键是从序列中拿到的值；如何获取到这个值；

```sql
#从序列获取新主键值
select employee_seq.nextval from dual;
```

### insert-获取非自增主键的值-selectKey

```xml
<insert id="addEmp" databaseId="oracle">
	<!-- 
	keyProperty:查出的主键值封装给javaBean的哪个属性
	order="BEFORE":当前sql在插入sql之前运行
		   AFTER：当前sql在插入sql之后运行
	resultType:查出的数据的返回值类型
	
	BEFORE运行顺序：
		先运行selectKey查询id的sql；查出id值封装给javaBean的id属性
		在运行插入的sql；就可以取出id属性对应的值
	AFTER运行顺序：
		先运行插入的sql（从序列中取出新值作为id）；
		再运行selectKey查询id的sql；
	 -->
	<selectKey keyProperty="id" order="BEFORE" resultType="Integer">
		<!-- 编写查询主键的sql语句 -->
		<!-- BEFORE-->
		select EMPLOYEES_SEQ.nextval from dual 
		<!-- AFTER：
		 select EMPLOYEES_SEQ.currval from dual -->
	</selectKey>
	
	<!-- 插入时的主键是从序列中拿到的 -->
	<!-- BEFORE:-->
	insert into employees(EMPLOYEE_ID,LAST_NAME,EMAIL) 
	values(#{id},#{lastName},#{email<!-- ,jdbcType=NULL -->}) 

	<!-- AFTER：
	insert into employees(EMPLOYEE_ID,LAST_NAME,EMAIL) 
	values(employees_seq.nextval,#{lastName},#{email}) -->
</insert>
```

**selectKey 元素的属性**

| 属性          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| keyProperty   | selectKey 语句结果应该被设置到的目标属性。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| keyColumn     | 返回结果集中生成列属性的列名。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| resultType    | 结果的类型。通常 MyBatis 可以推断出来，但是为了更加准确，写上也不会有什么问题。MyBatis 允许将任何简单类型用作主键的类型，包括字符串。如果生成列不止一个，则可以使用包含期望属性的 Object 或 Map。 |
| order         | 可以设置为 BEFORE 或 AFTER。如果设置为 BEFORE，那么它首先会生成主键，设置 keyProperty 再执行插入语句。如果设置为 AFTER，那么先执行插入语句，然后是 selectKey 中的语句 - 这和 Oracle 数据库的行为相似，在插入语句内部可能有嵌入索引调用。 |
| statementType | 和前面一样，MyBatis 支持 STATEMENT，PREPARED 和 CALLABLE 类型的映射语句，分别代表 Statement, PreparedStatement 和 CallableStatement 类型。 |

## 参数处理

### 单个参数&多个参数&命名参数

+ 单个参数：mybatis不会做特殊处理，    
  + `#{参数名/任意名}`：取出参数值。

+ 多个参数：mybatis会做特殊处理。    
  + 通常操作
    + 方法：public Employee getEmpByIdAndLastName(Integer id,String lastName);
    + 取值：`#{id}`,`#{lastName}`
  + 上述操作会抛出异常：`org.apache.ibatis.binding.BindingException: Parameter 'id' not found. Available parameters are [1, 0, param1, param2]`
  + 多个参数会被封装成 一个map，      
    + key：param1…paramN,或者参数的索引也可以
    + value：传入的参数值
  + `#{}`就是从map中获取指定的key的值；

+ 【命名参数】：明确指定封装参数时map的key；@Param(“id”)    
  - 多个参数会被封装成 一个map，      
    - key：使用@Param注解指定的值
    - value：参数值
  - `#{指定的key}`取出对应的参数值

```java
public interface EmployeeMapper {

    public Employee getEmpByIdAndLastName(@Param("id") Integer id, @Param("lastName") String lastName);

    public Employee getEmpByIdAndLastName02(Integer id,String lastName);
}
```

```xml
    <select id="getEmpById" resultType="com.frx01.mybatis.bean.Employee" databaseId="mysql">
        select id,last_name lastName,gender,email from tbl_employee where id=#{id}
    </select>

    <!--public Employee getEmpByIdAndLastName(@Param("id") Integer id,@Param("lastName") String lastName);-->
    <select id="getEmpByIdAndLastName" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee where id=#{id} and last_Name=#{lastName}
    </select>

    <select id="getEmpByIdAndLastName02" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee where id=#{0} and last_Name=#{1}
    </select>
```

```java
    @Test
    public void test04Parameters() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        //1.获取到的SqlSession不会自动提交数据
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
            //1.单个参数：mybatis不会做特殊处理
            //Employee empById = mapper.getEmpById(1);
            //System.out.println(empById);

            //2.多个参数:未作处理 ，mapper直用#{id},#{lastName}会抛异常
            //Employee employee = mapper.getEmpByIdAndLastName(1, "tom");
            //System.out.println(employee);
            //org.apache.ibatis.exceptions.PersistenceException:
            //### Error querying database.  Cause: org.apache.ibatis.binding.BindingException: Parameter 'id' not found. Available parameters are [0, 1, param1, param2]
            //### Cause: org.apache.ibatis.binding.BindingException: Parameter 'id' not found. Available parameters are [0, 1, param1, param2]
            
            //多个参数会被封装成 一个map
            //key：param1...paramN,或者参数的索引0, 1..也可以(这种方法的可读性较差)
            //value：传入的参数值
            System.out.println(mapper.getEmpByIdAndLastName02(1,"tom"));

            //3.
            //【命名参数】：明确指定封装参数时map的key；@Param("id")
            System.out.println(mapper.getEmpByIdAndLastName(1, "tom"));
        } finally {
            openSession.close();

        }
    }

```

### POJO&Map&TO

+ POJO：如果多个参数正好是我们业务逻辑的数据模型，我们就可以直接传入pojo；    
  + `#{属性名}`：取出传入的pojo的属性值

+ Map：如果多个参数不是业务模型中的数据，没有对应的pojo，不经常使用，为了方便，我们也可以传入map    
  - `#{key}`：取出map中对应的值
+ 如果多个参数不是业务模型中的数据，但是经常要使用，推荐来编写一个TO（Transfer Object）数据传输对象，如：

```java
Page{
	int index;
	int size;
}
```

```java
public interface EmployeeMapper {

    public Employee getEmpByMap(Map<String,Object> map);
}
```

```xml
  <!--public Employee getEmpByMap(Map<String,Object> map);-->
    <select id="getEmpByMap" resultType="com.frx01.mybatis.bean.Employee">
        select * from employee where id = #{id} and last_name=#{lastName}
    </select>
```

```java
    @Test
    public void test04Parameters() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        //1.获取到的SqlSession不会自动提交数据
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);

            //4.
            //传入map
            HashMap<String, Object> map = new HashMap<>();
            map.put("id",1);
            map.put("lastName","Tom");
            Employee empByMap = mapper.getEmpByMap(map);
            System.out.println(empByMap);
        } finally {
            openSession.close();

        }
    }
```

### 参数封装扩展思考

思考\=\=\=\=====

+ `public Employee getEmp(@Param("id")Integer id,String lastName);`
  + 取值：id\==>#{id/param1} lastName==>#{param2}
+ `public Employee getEmp(Integer id,@Param("e")Employee emp);`
  + 取值：id\==>#{param1} lastName===>#{param2.lastName/e.lastName}

+ **特别注意**：如果是Collection（List、Set）类型或者是数组，
  + 也会特殊处理。也是把传入的list或者数组封装在map中
  + key：Collection（collection）,如果是List还可以使用这个key(list)
  + `public Employee getEmpById(List<Integer> ids);`
    + 取值：取出第一个id的值： #{list[0]}

### 源码分析-参数封装map的过程

**结合源码，mybatis怎么处理参数**

+ (@Param(“id”)Integer id,@Param(“lastName”)String lastName);
+ ParamNameResolver解析参数封装map的；
+ names：{0=id, 1=lastName}；构造器的时候就确定好了

确定流程：

1. 获取每个标了param注解的参数的@Param的值：id，lastName； 赋值给name;

2. 每次解析一个参数给map中保存信息：（key：参数索引，value：name的值）

   name的值：

   标注了param注解：注解的值

   没有标注：

   1. 全局配置：useActualParamName（jdk1.8）：name=参数名
   2. name=map.size()；相当于当前元素的索引{0=id, 1=lastName,2=2}

args【1，“Tom”,‘hello’】:

```java
public Object getNamedParams(Object[] args) {
    final int paramCount = names.size();
    //1、参数为null直接返回
    if (args == null || paramCount == 0) {
      return null;
     
    //2、如果只有一个元素，并且没有Param注解；args[0]：单个参数直接返回
    } else if (!hasParamAnnotation && paramCount == 1) {
      return args[names.firstKey()];
      
    //3、多个元素或者有Param标注
    } else {
      final Map<String, Object> param = new ParamMap<Object>();
      int i = 0;
      
      //4、遍历names集合；{0=id, 1=lastName,2=2}
      for (Map.Entry<Integer, String> entry : names.entrySet()) {
      
      	//names集合的value作为key;  names集合的key又作为取值的参考args[0]:args【1，"Tom"】:
      	//eg:{id=args[0]:1,lastName=args[1]:Tom,2=args[2]}
        param.put(entry.getValue(), args[entry.getKey()]);
        
        
        // add generic param names (param1, param2, ...)param
        //额外的将每一个参数也保存到map中，使用新的key：param1...paramN
        //效果：有Param注解可以#{指定的key}，或者#{param1}
        final String genericParamName = GENERIC_NAME_PREFIX + String.valueOf(i + 1);
        // ensure not to overwrite parameter named with @Param
        if (!names.containsValue(genericParamName)) {
          param.put(genericParamName, args[entry.getKey()]);
        }
        i++;
      }
      return param;
    }
  }
}
```

**总结**：参数多时会封装map，为了不混乱，我们可以使用@Param来指定封装时使用的key；#{key}就可以取出map中的值；

### #与$取值区别

`#{}`和`${}`都可以获取map中的值或者pojo对象属性的值；

```sql
select * from tbl_employee where id=${id} and last_name=#{lastName}
#Preparing:
select * from tbl_employee where id=2 and last_name=?
```

**区别**：

+ `#{}` : 是以预编译的形式，将参数设置到sql语句中；PreparedStatement；防止sql注入
+ `${}` : 取出的值**直接拼装**在sql语句中；会有安全问题；

大多情况下，我们去参数的值都应该去使用`#{}`。

原生jdbc不支持占位符的地方我们就可以使用`${}`进行取值，比如分表、排序。。。；按照年份分表拆分

```sql
select * from ${year}_salary where xxx;
select * from tbl_employee order by ${f_name} ${order}
```

### #取值时指定参数相关规则

`#{}`:更丰富的用法：

规定参数的一些规则：

+ javaType
+ jdbcType
+ mode（存储过程）
+ numericScale
+ resultMap
+ typeHandler
+ jdbcTypeName
+ expression（未来准备支持的功能）

例如：jdbcType

jdbcType通常需要在某种特定的条件下被设置：

+ 在我们数据为null的时候，有些数据库可能不能识别mybatis对null的默认处理。比如Oracle DB（报错）；
+ JdbcType OTHER：无效的类型；因为mybatis对所有的null都映射的是原生Jdbc的OTHER类型，Oracle DB不能正确处理;

由于全局配置中：jdbcTypeForNull=OTHER，Oracle DB不支持，两种解决方法：

1. 在mapper文件中写`#{email,jdbcType=NULL}`;
2. 在全局配置文件`<setting name="jdbcTypeForNull" value="NULL"/>`

## Select

### 返回List

EmployeeMapper.java

```java
public interface EmployeeMapper {
    public List<Employee> getEmpsByLastNameLike(String LastName);
}
```

EmployeeMapper.xml

```xml
    <!--public List<Employee> getEmpsByLastNameLike(String LastName);-->
    <!--resultType:如果返回的是集合，要写集合中元素的类型-->
    <select id="getEmpsByLastNameLike" resultType="Employee">
        Select * from tbl_employee where last_name like #{lastName}
    </select>
```

EmployeeMapperTest.java


```java
    @Test
    public void testList() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
            List<Employee> empsByLastNameLike = mapper.getEmpsByLastNameLike("%e%");
            for (Employee employee : empsByLastNameLike) {
                System.out.println(employee);
            }
        }finally {
            openSession.close();
        }
    }
```

### 记录封装map

EmployeeMapper.java

```java
public interface EmployeeMapper {

    //多条记录封装一个map,Map<Integer,Employee>:键是这条记录的主键，值是记录封装后的javabean
    //@MapKey("id"):告诉mybatis,封装map的时候使用哪个属性作为map的key
    @MapKey("id")
    public Map<Integer,Employee> getEmpByLastNameLikeReturnMap(String lastName);

    //返回一条记录map,key就是列名，值就是对应的值
    public Map<String,Object> getEmpByIdReturnMap(Integer id);
}
```

EmployeeMapper.xml

```xml
<!--public Map<Integer,Employee> getEmpByLastNameLikeReturnMap(String lastName);-->
    <select id="getEmpByLastNameLikeReturnMap" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee where last_name like #{lastName}
    </select>

    <!--public Map<String,Object> getEmpByIdReturnMap(Integer id);-->
    <select id="getEmpByIdReturnMap" resultType="map">
        select * from tbl_employee where id=#{id}
    </select>
```

EmployeeMapperTest.java

```java
    @Test
    public void testMap() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        try {
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
            Map<String, Object> empByIdReturnMap = mapper.getEmpByIdReturnMap(1);
            System.out.println(empByIdReturnMap);
            openSession.commit();

            Map<Integer, Employee> empByLastNameLikeReturnMap = mapper.getEmpByLastNameLikeReturnMap("%r%");
            System.out.println(empByLastNameLikeReturnMap);
        }finally {
            openSession.close();
        }
    }

```

## resultMap

### 自定义结果映射规则

EmployeeMapperPlus.java

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/2/11  15:25
 */
public interface EmployeeMapperPlus {

    public Employee getEmpById(Integer id);
}
```

EmployeeMapperPlus.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.frx01.mybatis.dao.EmployeeMapperPlus">

    <!--自定义某个javabean的封装规则
        type:自定义规则的java类型
        id:唯一id方便引用-->
    <resultMap type="com.frx01.mybatis.bean.Employee" id="MyEmp">
        <!--指定主键列的封装规则
        id定义主键会底层优化;
        column:指定哪一列
        property:指定对应的javabean属性-->
        <id column="id" property="id"></id>
        <!--定义普通列封装规则-->
        <result column="last_name" property="lastName"/>
        <!--其他不指定的列会自动封装;我们只要写resultMap就把全部的映射规则都写上-->
    </resultMap>

    <!--resultMap:自定义结果集映射规则-->
    <!--public Employee getEmpById(Integer id);-->
    <select id="getEmpById" resultMap="MyEmp">
        select * from tbl_employee where id=#{id}

    </select>
</mapper>
```

EmployeeMapperTest.java

```java
    @Test
    public void testResultMap() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        try {
            EmployeeMapperPlus mapper = openSession.getMapper(EmployeeMapperPlus.class);
            Employee empById = mapper.getEmpById(1);
            System.out.println(empById);

        }finally {
            openSession.close();
        }
    }
```

### 关联查询-环境搭建

创建数据库表

```sql
CREATE TABLE tbl_dept(
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
	dept_name VARCHAR(255)
	)
INSERT INTO tbl_dept(dept_name)
	VALUES('开发部')
	
INSERT INTO tbl_dept(dept_name)
	VALUES('测试部')
	
SELECT * FROM tbl_dept	

ALTER TABLE tbl_employee ADD COLUMN d_id INT(11);
ALTER TABLE tbl_employee ADD CONSTRAINT fk_emp_dept
FOREIGN KEY(d_id) REFERENCES tbl_dept(id)
```

新建类Department.java

```java
public class Department {

    private Integer id;
    private String departmentName;

    public Department(Integer id, String departmentName) {
        this.id = id;
        this.departmentName = departmentName;
    }

    public Department() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    @Override
    public String toString() {
        return "Department{" +
                "id=" + id +
                ", departmentName='" + departmentName + '\'' +
                '}';
    }
}
```

### 关联查询-级联属性封装结果

EmployeeMapperPlus.java

```java
public interface EmployeeMapperPlus {

    public Employee getEmpAndDept(Integer id);
}
```

EmployeeMapperPlus.xml

```xml
    <!--
        场景一:
            查询Employee的同时查询员工对应的部门
            Employee===Department
            一个员工有之对应的部门信息:
            id last_name gender email d_id dept_name
            -->
    <!--
        联合查询:级联属性进行封装结果集-->
    <resultMap id="MyDifEmp" type="com.frx01.mybatis.bean.Employee">
        <id column="tbl_employee.id" property="id"/>
        <result column="last_name" property="lastName"/>
        <result column="gender" property="gender"/>
        <result column="d_id" property="dept.id"/>
        <result column="dept_name" property="dept.departmentName"/>

    </resultMap>
    <!--public Employee getEmpAndDept(Integer id);-->
    <select id="getEmpAndDept" resultMap="MyDifEmp">
        SELECT tbl_employee.id,last_name,gender,tbl_employee.d_id,dept_name FROM tbl_employee LEFT JOIN tbl_dept ON tbl_employee.id=tbl_dept.id
            WHERE tbl_employee.id=tbl_dept.id AND tbl_employee.id=#{id}
    </select>
```

EmployeeMapperTest.java

```java
    @Test
    public void testResultMapAssociation() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        try{
            EmployeeMapperPlus mapper = openSession.getMapper(EmployeeMapperPlus.class);
            Employee empAndDept = mapper.getEmpAndDept(1);
            System.out.println(empAndDept);
            System.out.println(empAndDept.getDept());
        }finally {

        }
    }
```

### 关联查询-association定义关联对象封装规则

EmployeeMapperPlus.java

```java
public interface EmployeeMapperPlus {

    //联合查询：级联属性封装结果集
    public Employee getEmpAndDept2(Integer id);
```

EmployeeMapperPlus.xml

```xml
    <!--使用association定义单个对象的封装规则：-->
    </resultMap>
    <resultMap id="MyDifEmp2" type="com.frx01.mybatis.bean.Employee">
        <id column="tbl_employee.id" property="id"/>
        <result column="last_name" property="lastName"/>
        <result column="gender" property="gender"/>

        <!--association可以指定联合的javabean对象
            property="dept" 指定哪个属性是联合的对象
            javaType:指定这个属性对象的类型[不能省略]-->
        <association property="dept" javaType="com.frx01.mybatis.bean.Department">
            <id column="d_id" property="id"/>
            <result column="dept_name" property="departmentName"></result>
        </association>
    <!--public Employee getEmpAndDept2(Integer id);-->
    <select id="getEmpAndDept2" resultMap="MyDifEmp2">
        SELECT tbl_employee.id,last_name,gender,tbl_employee.d_id,dept_name FROM tbl_employee LEFT JOIN tbl_dept ON tbl_employee.id=tbl_dept.id
            WHERE tbl_employee.id=tbl_dept.id AND tbl_employee.id=#{id}
    </select>
```

EmployeeMapperTest.java

```java
    @Test
    public void testResultMapAssociation02() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        try{
            EmployeeMapperPlus mapper = openSession.getMapper(EmployeeMapperPlus.class);
            Employee empAndDept = mapper.getEmpAndDept2(1);
            System.out.println(empAndDept);
            System.out.println(empAndDept.getDept());
        }finally {
            openSession.close();
        }
    }
```

### 关联查询-association分步查询

DepartmentMapper.java

```java
public interface DepartmentMapper {

    public Department getDeptById(Integer id);
}
```

EmployeeMapperPlus.java

```java
public interface EmployeeMapperPlus {

    public Employee getEmpByIdStep(Integer id);
}
```

DepartmentMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.frx01.mybatis.dao.DepartmentMapper">

    <!--public Department getDeptById(Integer id);-->
    <select id="getDeptById" resultType="com.frx01.mybatis.bean.Department">
        select id,dept_name departmentName from tbl_dept where id=#{id}
    </select>
</mapper>
```

EmployeeMapperPlus.xml

```xml
   <!--使用association进行分布查询:
        1.先按照员工ID查询员工信息
        2.根据查询员工信息中的d_id值去部门表查出部门信息
        3.部门设置到员工；-->
    <!--    id  last_name  gender  email    d_id  -->
    <resultMap id="MyEmpByStep" type="com.frx01.mybatis.bean.Employee">
        <id column="id" property="id"/>
        <result column="last_name" property="lastName"></result>
        <result column="email" property="email"></result>
        <result column="gender" property="gender"></result>
        <!--association定义关联的对象的封装规则
            select:表明当前属性调用select指定的方法查出的结果
            columnL:指定将哪一列的值传给这个方法
            流程:使用select指定的方法(传入column指定的这列参数的值)查出对象，并封装给property属性
            -->
        <association property="dept" select="com.frx01.mybatis.dao.DepartmentMapper.getDeptById"
                column="d_id">
        </association>
    </resultMap>
    <!--public Employee getEmpByIdStep(Integer id);-->
    <select id="getEmpByIdStep" resultMap="MyEmpByStep">
        select * from tbl_employee where id=#{id}
    </select>
```

EmployeeMapperTest.java

```java
    @Test
    public void testResultMapAssociation03() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        try{
            EmployeeMapperPlus mapper = openSession.getMapper(EmployeeMapperPlus.class);
            Employee empByIdStep = mapper.getEmpByIdStep(1);
            System.out.println(empByIdStep);

        }finally {
            openSession.close();
        }
    }
```

### 关联查询-分步查询&延迟加载

我们每次查询Employee对象的时候，都将一起查询出来。部门信息在我们使用的时候再去查询；分段查询的基础之上加上两个配置：

在全局配置文件中配置，实现**懒加载**

mybatis-config.xml

```xml
<configuration>
	...
	<settings>
		...
		<!--显示的指定每个我们需要更改的配置的值，即使他是默认的。防止版本更新带来的问题  -->
		<setting name="lazyLoadingEnabled" value="true"/>
		<setting name="aggressiveLazyLoading" value="false"/>
	</settings>

```

| 设置名                | **描述**                                                     | **有效值**  | **默认值**                                |
| --------------------- | ------------------------------------------------------------ | ----------- | ----------------------------------------- |
| lazyLoadingEnabled    | 延迟加载的全局开关。当开启时，所有关联对象都会延迟加载。 特定关联关系中可通过设置 `fetchType` 属性来覆盖该项的开关状态。 | true\|false | false                                     |
| aggressiveLazyLoading | 开启时，任一方法的调用都会加载该对象的所有延迟加载属性。 否则，每个延迟加载属性会按需加载（参考 `lazyLoadTriggerMethods`)。 | true\|false | false在 3.4.1 及之前的版本中默认为 true） |

### 关联查询-collection定义关联集合封装规则

DepartmentMapper.java

```java
public interface DepartmentMapper {

    public Department getDeptByIdPlus(Integer id);
}
```

DepartmentMapper.xml

```xml
<mapper namespace="com.frx01.mybatis.dao.DepartmentMapper">
    <!--
        collection嵌套结果集的方式，定义关联的集合类型元素的封装规则-->
    <!--
<!--
    public class Department {
        private Integer id;
        private String departmentName;
        private List<Employee> emps;
        }
    did  dept_name ||  eid  last_name  email   gender -->
    <resultMap id="MyDept" type="com.frx01.mybatis.bean.Department">
        <id column="did" property="id"/>
        <result column="dept_name" property="departmentName"/>
        <!--
            collection定义集合类型的属性的封装规则
            ofType:指定集合元素的类型
            -->
        <collection property="emps" ofType="com.frx01.mybatis.bean.Employee">
            <!--定义集合中元素的封装规则-->
            <id column="eid" property="id"/>
            <result column="last_name" property="lastName"/>
            <result column="email" property="email"/>
            <result column="gender" property="gender"/>
        </collection>
    </resultMap>
    <!--public Department getDeptByIdPlus(Integer id);-->
    <select id="getDeptByIdPlus" resultMap="MyDept">
        SELECT d.id AS did ,d.dept_name AS dept_name,
               e.id AS eid,e.last_name AS last_name,
               e.email AS email,e.gender AS gender
        FROM tbl_dept AS d
                 LEFT JOIN tbl_employee AS e
                           ON d.id=e.d_id
        WHERE d.id=#{id}
    </select>
```

EmployeeMapperTest.java

```java
    @Test
    public void testGetDeptByIdPlus() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            DepartmentMapper mapper = openSession.getMapper(DepartmentMapper.class);
            Department department = mapper.getDeptByIdPlus(1);
            System.out.println(department);
            System.out.println(department.getEmps());

        }finally {
            openSession.close();
        }

    }
```

### 关联查询-collection分步查询&延迟加载

DepartmentMapper.java

```java
public interface DepartmentMapper {

    public List<Employee> getEmpsByDeptId(Integer deptId);
    public Department getDeptByIdStep(Integer id);
}
```

EmployeeMapper.xml

```xml
   <!--public List<Employee> getEmpsByDeptId(Integer deptId);-->
    <select id="getEmpsByDeptId" resultType="com.frx01.mybatis.bean.Employee">
        select * from tbl_employee where d_id=#{deptId}
    </select>
```

DepartmentMapper.xml

```xml
	<!--分段查询-->
    <resultMap id="MyDeptStep" type="com.frx01.mybatis.bean.Department">
        <id column="id" property="id"/>
        <id column="dept_name" property="departmentName"/>
        <collection property="emps"
                    select="com.frx01.mybatis.dao.EmployeeMapperPlus.getEmpsByDeptId"
                    column="id"></collection>
    </resultMap>
    <!--public Department getDeptByIdStep(Integer id);-->
    <select id="getDeptByIdStep" resultMap="MyDeptStep">
        select id,dept_name departmentName from tbl_dept where id=#{id}
    </select>
```

EmployeeMapperTest.java

```java
    @Test
    public void testGetDeptByIdStep() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession(true);
        try {
            DepartmentMapper mapper = openSession.getMapper(DepartmentMapper.class);
            Department deptByIdStep = mapper.getDeptByIdStep(1);
            System.out.println(deptByIdStep);
            System.out.println(deptByIdStep.getEmps());
        }finally {
            openSession.close();
        }

    }
```

### 分步查询传递多列值&fetchType

扩展：

- 多列的值传递过去：    
  - 将多列的值封装map传递；`column="{key1=column1,key2=column2}"`
- fetchType=“lazy”：表示使用延迟加载；    
  - lazy：延迟
  - eager：立即

DepartmentMapper.xml

```xml
  <!--collection分段查询-->
    <resultMap id="MyDeptStep" type="com.frx01.mybatis.bean.Department">
        <id column="id" property="id"/>
        <id column="dept_name" property="departmentName"/>
        <collection property="emps"
                    select="com.frx01.mybatis.dao.EmployeeMapperPlus.getEmpsByDeptId"
                    column="{deptId=id}" fetchType="lazy"></collection>
    </resultMap>
    <!--public Department getDeptByIdStep(Integer id);-->
    <select id="getDeptByIdStep" resultMap="MyDeptStep">
        select id,dept_name departmentName from tbl_dept where id=#{id}
    </select>
```

### discriminator鉴别器

EmployeeMapperPlus.java

```java
public interface EmployeeMapperPlus {

    //带有鉴别器的
    public List<Employee> getEmpsWithDiscriminator();
}
```

EmployeeMapperPlus.xml

```xml
    <!--<discriminator javaType=''></discriminator>
        鉴别器:mybatis可以使用discriminator判断某列的值，然后改变某列的值改变封装行为
        封装Employee:
            如果查出的是女生:就把部门信息查询出来，否则不查询;
            如果是男生，把last_name这一列的值赋值给email;
      -->
    <resultMap id="MyEmpDis" type="com.frx01.mybatis.bean.Employee">
        <id column="id" property="id"/>
        <result column="last_name" property="lastName"></result>
        <result column="email" property="email"></result>
        <result column="gender" property="gender"></result>
        <!--column:指定要判断的列
            javaType:列值对应的java类型-->
        <discriminator javaType="string" column="gender">
            <!--女生 resultType:指定封装的结果类型 不能缺少。/resultMap -->
            <case value="0" resultType="com.frx01.mybatis.bean.Employee">
            <association property="dept"
                         select="com.frx01.mybatis.dao.DepartmentMapper.getDeptById"
                         column="d_id" fetchType="eager">
            </association>
            </case>
            <!--男生 ;把last_name这一列的值赋值给email;-->
            <case value="1" resultType="com.frx01.mybatis.bean.Employee">
                <id column="id" property="id"/>
                <result column="last_name" property="lastName"></result>
                <result column="last_name" property="email"></result>
                <result column="gender" property="gender"></result>
            </case>
        </discriminator>
        </resultMap>

    <!--public List<Employee> getEmpsWithDiscriminator();-->
    <select id="getEmpsWithDiscriminator" resultMap="MyEmpDis">
        select * from tbl_employee limit 10
    </select>
```

EmployeeMapperTest.java

```java
    @Test
    public void testGetEmpsWithDiscriminator() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        try {
            EmployeeMapperPlus mapper = openSession.getMapper(EmployeeMapperPlus.class);
            System.out.println(mapper.getEmpsWithDiscriminator());
        } finally {
            openSession.close();
        }
    }
```

