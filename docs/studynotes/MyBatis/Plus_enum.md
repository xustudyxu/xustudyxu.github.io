---
title: MyBatis-Plus 通用枚举
date: 2022-04-20 19:08:19
permalink: /pages/d70dfe/
categories:
  - MyBatis-Plus
tags:
  - MyBatis-Plus
---
# MyBatis-Plus 通用枚举

[[toc]]

> 表中的有些字段值是固定的，例如性别（男或女），此时我们可以使用MyBatis-Plus的通用枚举来实现

## 数据库添加字段sex

```sql
ALTER TABLE t_user ADD sex INT(11) 
```

## 创建通用枚举类型

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/20  14:08
 */
@Getter
public enum SexEnum {

    MALE(1,"男"),
    FEMALE(2,"女");


    @EnumValue //将注解所标识的属性的值存储到数据库中
    private Integer sex;

    private String sexName;


    SexEnum(Integer sex, String sexName) {
        this.sex = sex;
        this.sexName = sexName;
    }
}
```

## 配置扫描通用枚举

```yaml
#配置mybatis日志
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  #设置mybatis-plus的全局配置
  global-config:
    db-config:
      # 配置MyBatis-Plus操作表的默认前缀
      table-prefix: t_
      # 配置MyBatis-Plus的主键策略
      id-type: auto
  # 配置类型别名所对应的包
  type-aliases-package: com.frx01.mybatisplus.pojo
  # 扫描通用枚举的包
  type-enums-package: com.frx01.mybatisplus.enums
```

## 测试

```java
    @Test
    public void test(){
        User user = new User();
        user.setName("admin");
        user.setAge(33);
        user.setSex(SexEnum.MALE);
        int result = userMapper.insert(user);
        System.out.println("result:"+result);
    }
```

### 结果

```java
...
==>  Preparing: INSERT INTO t_user ( user_name, age, sex ) VALUES ( ?, ?, ? )
==> Parameters: admin(String), 33(Integer), 1(Integer)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@383864d5]
result:1
2022-04-20 19:04:27.395  INFO 4384 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-20 19:04:27.416  INFO 4384 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

