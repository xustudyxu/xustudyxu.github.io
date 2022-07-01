---
title: MyBatis-Plus 代码生成器
date: 2022-04-20 19:28:55
permalink: /pages/b0e3b4/
categories:
  - MyBatis-Plus
tags:
  - MyBatis-Plus
---
# MyBatis-Plus 代码生成器

[[toc]]

## 引入依赖

```xml
        <!--代码生成器-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.5.1</version>
        </dependency>
        <dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
            <version>2.3.31</version>
        </dependency>
```

## 急速生成

```java
public class FastAutoGeneratorTest {
    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://127.0.0.1:3306/mybatis_plus?" +
                "characterEncoding=utf-8&userSSL=false", "root", "hsp")
                .globalConfig(builder -> {
                    builder.author("frx01") // 设置作者
                            //.enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .outputDir("D://mybatis-plus"); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("com.frx01") // 设置父包名
                            .moduleName("mybatisplus") // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "D://mybatis-plus")); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude("t_user") // 设置需要生成的表名
                            .addTablePrefix("t_", "c_"); // 设置过滤表前缀
                })
                .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .execute();

    }
}
```

+ [官方文档](https://baomidou.com/pages/779a6e/#%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)

### 测试结果

```java
19:35:12.939 [main] DEBUG com.baomidou.mybatisplus.generator.AutoGenerator - ==========================准备生成文件...==========================
19:35:13.970 [main] DEBUG com.baomidou.mybatisplus.generator.config.querys.MySqlQuery - 执行SQL:show table status WHERE 1=1  AND NAME IN ('t_user')
19:35:14.173 [main] DEBUG com.baomidou.mybatisplus.generator.config.querys.MySqlQuery - 返回记录数:1,耗时(ms):200
19:35:14.666 [main] DEBUG com.baomidou.mybatisplus.generator.config.querys.MySqlQuery - 执行SQL:show full fields from `t_user`
19:35:14.678 [main] DEBUG com.baomidou.mybatisplus.generator.config.querys.MySqlQuery - 返回记录数:6,耗时(ms):12
19:35:15.096 [main] DEBUG com.baomidou.mybatisplus.generator.AutoGenerator - ==========================文件生成完成！！！==========================

Process finished with exit code 0
```

+ 查看文件生成结果

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/07/01.png)

+ 查看控制层

```java
/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author frx01
 * @since 2022-04-20
 */
@Controller
@RequestMapping("/mybatisplus/user")
public class UserController {

}
```

