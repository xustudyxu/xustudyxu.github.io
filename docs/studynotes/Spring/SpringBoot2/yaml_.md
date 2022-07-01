---
title: 配置文件
date: 2022-03-22 18:33:23
permalink: /pages/4225cc/
categories:
  - SpringBoot2
tags:
  - SpringBoot2
---
# 配置文件

[[toc]]

## 文件类型

### properties

同以前的properties用法

### yaml-简介

YAML 是 "YAML Ain't Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。 

非常适合用来做**以数据为中心**的配置文件

我在使用github actions的时候,就是配置了一个[yaml文件](https://github.com/xustudyxu/VuepressBlog/blob/master/.github/workflows/deploy.yml)

### yaml-基本语法

- **key: value**；kv之间有空格
- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释
- 字符串无需加引号，如果要加，''与""表示字符串内容 会被 **转义/不转义**

### yaml-数据类型

- 字面量：单个的、不可再分的值。date、boolean、string、number、null

```yaml
k: v
```

+ 对象：键值对的集合。map、hash、set、object 

  + 行内写法

    ```yaml
    k: {k1:v1,k2:v2,k3:v3}
    ```

  + 或

    ```yaml
    k:
      k1: v1
      k2: v2
      k3: v3
    ```

+ 数组:一组按次序排列的值。array、list、queue
  + 行内写法

    ```yaml
    k: [v1,v2,v3]
    ```

  + 或

    ```yaml
    k:
      - v1
      - v2
      - v3
    ```

### 示例

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/3/22  17:36
 */
@ConfigurationProperties(prefix = "person")
@Component
@ToString
@Data
public class Person {
    private String userName;
    private Boolean boss;
    private Date birth;
    private Integer age;
    private Pet pet;
    private String[] interests;
    private List<String> animal;
    private Map<String, Object> score;
    private Set<Double> salaries;
    private Map<String, List<Pet>> allPets;
}
```

```java
@ToString
@Data
public class Pet {
    private String name;
    private Double weight;
}
```

+ 配置yaml文件

```yaml
person:
  userName: lucy
  boss: true
  birth: 2019/12/9
  age: 18
#  interests: [篮球，足球]
  interests:
    - 篮球
    - 足球
    - 18
  animal: [阿猫，阿狗]
#  score:
#    english: 80
#    math: 90
  score: {english:80,math:90}
  salaries:
    - 9999.98
    - 9999.99
  pet:
    name: 阿狗
    weight: 99.99
  allPets:
    sick:
      - {name: 阿狗,weight: 99.99}
      - name: 阿猫
        weight: 88.88
      - name: 阿龙
        weight: 77.77
    health:
      - {name: 阿花,weight: 299.99}
      - {name: 阿明,weight: 199.99}
```

+ 测试

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/04/01.png)

::: tip 提示

```yaml
userName: "张三\n李四"
#单引号会将\n作为字符串输出 双引号会将\n 作为换行输出
#双引号不会转义，单引号会转义
```

::: 

## 配置提示

自定义的类和配置文件绑定一般没有提示。

> 为了有提示，更方便，就是输入的时候有提示，可以选择补全

​	引入依赖和插件

```xml
     <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>
<!--打包的时候将它排除掉-->
 <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

