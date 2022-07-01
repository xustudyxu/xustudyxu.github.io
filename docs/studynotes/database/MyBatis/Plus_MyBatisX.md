---
title: MyBatisX插件
date: 2022-04-21 00:39:18
permalink: /pages/8457cc/
categories:
  - MyBatis-Plus
tags:
  - MyBatis-Plus
---
# MyBatisX插件

[[toc]]

> MyBatis-Plus为我们提供了强大的mapper和service模板，能够大大的提高开发效率
>
> 但是在真正开发过程中，MyBatis-Plus并不能为我们解决所有问题，例如一些复杂的SQL，多表联查，我们就需要自己去编写代码和SQL语句，我们该如何快速的解决这个问题呢，这个时候可以使用MyBatisX插件
>
> MyBatisX一款基于 IDEA 的快速开发插件，为效率而生。

MyBatisX插件用法：[MybatisX快速开发插件 | MyBatis-Plus](https://baomidou.com/pages/ba5b24/)

## 安装MyBatisX插件

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/08/01.png)

设置Database

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/08/02.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/08/03.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/08/04.png)

Next

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/08/05.png)

Finish

## 使用结果

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/08/06.png)

```java
@TableName(value ="t_user")
@Data
public class User implements Serializable {
    /**
     * 
     */
    @TableId(type = IdType.AUTO)
    private Long uid;

    /**
     * 
     */
    private String userName;

    /**
     * 年龄
     */
    private Integer age;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 逻辑删除
     */
    private Integer isDeleted;

    /**
     * 
     */
    private Integer sex;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
```

+ UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.frx01.mybatisx.mapper.UserMapper">

    <resultMap id="BaseResultMap" type="com.frx01.mybatisx.pojo.User">
            <id property="uid" column="uid" jdbcType="BIGINT"/>
            <result property="userName" column="user_name" jdbcType="VARCHAR"/>
            <result property="age" column="age" jdbcType="INTEGER"/>
            <result property="email" column="email" jdbcType="VARCHAR"/>
            <result property="isDeleted" column="is_deleted" jdbcType="INTEGER"/>
            <result property="sex" column="sex" jdbcType="INTEGER"/>
    </resultMap>

    <sql id="Base_Column_List">
        uid,user_name,age,
        email,is_deleted,sex
    </sql>
</mapper>
```

## 生成自定义功能

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/08/07.png)

+ 自动生成方法

```java
	public interface UserMapper<selectAgeAndSexByAgeBetween, selectAllOrderByAgeDesc> extends BaseMapper<User> {

    int insertSelective(User user);

    int deleteByUidAndAgeAndUserName(@Param("uid") Long uid, @Param("age") Integer age, @Param("userName") String userName);

    int updateAgeAndSexByUid(@Param("age") Integer age, @Param("sex") Integer sex, @Param("uid") Long uid);

    List<User> selectAgeAndSexByAgeBetween(@Param("beginAge") Integer beginAge, @Param("endAge") Integer endAge);

    List<User> selectAllOrderByAgeDesc();
}
```

+ 自动生成sql语句

```xml
 <insert id="insertSelective">
        insert into t_user
        <trim prefix="(" suffix=")" suffixOverrides=",">
            <if test="uid != null">uid,</if>
            <if test="userName != null">user_name,</if>
            <if test="age != null">age,</if>
            <if test="email != null">email,</if>
            <if test="isDeleted != null">is_deleted,</if>
            <if test="sex != null">sex,</if>
        </trim>
        values
        <trim prefix="(" suffix=")" suffixOverrides=",">
            <if test="uid != null">#{uid,jdbcType=BIGINT},</if>
            <if test="userName != null">#{userName,jdbcType=VARCHAR},</if>
            <if test="age != null">#{age,jdbcType=INTEGER},</if>
            <if test="email != null">#{email,jdbcType=VARCHAR},</if>
            <if test="isDeleted != null">#{isDeleted,jdbcType=INTEGER},</if>
            <if test="sex != null">#{sex,jdbcType=INTEGER},</if>
        </trim>
    </insert>
    <delete id="deleteByUidAndAgeAndUserName">
        delete
        from t_user
        where uid = #{uid,jdbcType=NUMERIC}
          AND age = #{age,jdbcType=NUMERIC}
          AND user_name = #{userName,jdbcType=VARCHAR}
    </delete>
    <update id="updateAgeAndSexByUid">
        update t_user
        set age = #{age,jdbcType=NUMERIC},
            sex = #{sex,jdbcType=NUMERIC}
        where uid = #{uid,jdbcType=NUMERIC}
    </update>
    <select id="selectAgeAndSexByAgeBetween" resultMap="BaseResultMap">
        select age, sex
        from t_user
        where age between #{beginAge,jdbcType=INTEGER} and #{endAge,jdbcType=INTEGER}
    </select>
    <select id="selectAllOrderByAgeDesc" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List"/>
        from t_user
        order by age desc
    </select>
```

