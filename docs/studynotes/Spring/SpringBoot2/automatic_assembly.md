---
title: 了解自动装配原理
date: 2022-03-16 18:13:40
permalink: /pages/2f4dd2/
categories:
  - SpringBoot2
tags:
  - SpringBoot2
---
# 了解自动装配原理

[[toc]]

## SpringBoot特点

### 依赖管理

+ 依赖管理

```xml
  	<!--依赖管理-->
	<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
    </parent>
	<!--它的父项目-->
	<parent>
    	<groupId>org.springframework.boot</groupId>
    	<artifactId>spring-boot-dependencies</artifactId>
    	<version>2.3.4.RELEASE</version>
    </parent>
	<!--几乎声明了所有开发中几乎常用的jar的版本号，自动版本仲裁机制-->
```

+ 开发导入starter场景启动器

1. 见到很多spring-boot-starter-*:\*就是某种场景
2. 只要引入starter,**这个场景的所有常规需要的依赖**我们都会自动引入

3. SpringBoot所有支持的[场景](https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter)
4. 见到的  *-spring-boot-starter： 第三方为我们提供的简化开发的场景启动器。
5. 所有场景启动器最底层的依赖

```xml
  	<dependency>
      	<groupId>org.springframework.boot</groupId>
      	<artifactId>spring-boot-starter</artifactId>
      	<version>2.3.4.RELEASE</version>
      	<scope>compile</scope>
    </dependency>
```

+ 查看spring-boot-starter-web的分析依赖树

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/01.png)

+ 无需关注版本号，**自动版本仲裁**

1. 引入依赖默认都可以不写版本
2. 引入非版本仲裁的jar,一定要写版本号

+ 可以修改版本号

1. 查看spring-boot-dependencies里面规定当前依赖版本用的key
2. 在当前项目里面重写配置

```xml
 	<properties>
        <mysql.version>5.1.43</mysql.version>
    </properties>
```

### 自动配置

+ 自动配好Tomcat
  + 引入Tmocat依赖
  + 配置Tomcat

```xml
  	<dependency>
      	<groupId>org.springframework.boot</groupId>
      	<artifactId>spring-boot-starter</artifactId>
      	<version>2.3.4.RELEASE</version>
      	<scope>compile</scope>
    </dependency>
```

+ **自动配好SpringMVC**

  + 引入SpringMVC全套组件
  + 自动配好SpringMVC常用组件(功能)

+ **自动配好Web常见功能**，如:字符编码问题

  + SpringBoot帮我们配置好了所有web开发的常见场景

+ 默认的包结构

  + **主程序所在包及其下面的所有子包里面的组件**都会被默认扫描进来

  + 无需以前的包扫描

  + 如果想要改变扫描路径,

    + @SpringBootApplication(scanBasePackages = "com.frx01")

    + 或者@ComponentScan指定扫描路径

    + 

      ```java
      @SpringBootConfiguration
      @EnableAutoConfiguration
      @ComponentScan("com.frx01")
      ```

+ **各种配置拥有默认值**
  + 默认配置最终都是映射到MultipartProperties
  + 配置文件的值最终会绑定每个类上，这个类会在容器中创建对象
+ **按需加载所有自动配置项**
  + 非常多的starter
  + 引入了哪些场景这个场景的自动配置才会开启
  + SpringBoot所有的自动配置功能都在spring-boot-autoconfigure包里面

## 容器功能

### 组件添加

#### @Configuration

+ 基本使用
+ Full模式与Lite模式
  + 示例
  + 最佳实践
    + 配置类组件之间无依赖关系用Lite模式加速容器启动过程，减少判断
    + 配置类组件之间有依赖关系，方法会被调用得到之前单实例组件，用Full模式

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/3/17  14:56
 */

/**
 * #############################Configuration使用示例######################################################
 * 1.配置类里面可以使用@Bean标注在方法上给容器注册组件，默认也是单实例的
 * 2.配置类本身也是组件
 * 3.proxyBeanMethods：代理bean的方法
 *          Full(proxyBeanMethods = true)、【保证每个@Bean方法被调用多少次返回的组件都是单实例的】
 *          Lite(proxyBeanMethods = false)【每个@Bean方法被调用多少次返回的组件都是新创建的】
 *          组件依赖必须使用Full模式默认。其他默认是否Lite模式
 */
@Configuration(proxyBeanMethods = false)//告诉SpringBoot这是一个配置类 == 配置文件
public class MyConfig {

    /**
     * Full:外部无论对配置类中的这个组件注册方法调用多少次获取到都是之前注册容器中的单实例对象
     * @return
     */
    @Bean //给容器中添加组件。以方法名作为组件id。返回类型:就是组件类型。返回的值，就是组件中在容器中的实例
    public User user01(){
        User zhangsan = new User("zhangsan", 18);
        //User组件依赖了Pet组件
        zhangsan.setPet(tomcatPet());
        return new User("zhangsan",18);
    }

    @Bean("tom") //自定义组件名
    public Pet tomcatPet(){
        return new Pet("tomcat");

    }

}
```

+ 测试代码

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.frx01")
public class MainApplication {

    public static void main(String[] args) {

        //1.返回我们的IOC容器
        ConfigurableApplicationContext run= SpringApplication.run(MainApplication.class,args);

        //2.查看容器里面的组件
        String[] names = run.getBeanDefinitionNames();
        for (String name : names) {
            System.out.println(name);
        }

        //3.从容器中获得组件

        Pet tom01 = run.getBean("tom", Pet.class);

        Pet tom02 = run.getBean("tom", Pet.class);

        System.out.println("组件: "+(tom01==tom02));

        //com.frx01.boot.config.MyConfig$$EnhancerBySpringCGLIB$$dd2d6a55@6bfdb014
        MyConfig bean = run.getBean(MyConfig.class);
        System.out.println(bean);

        //如果@Configuration(proxyBeanMethods=true)代理对象调用方法。SpringBoot总会检查这个组件是否在容器中有
        //也就是，保持组件单实例
        User user=bean.user01();
        User user1=bean.user01();
        System.out.println(user==user1);

        User user01 = run.getBean("user01", User.class);
        Pet tom = run.getBean("tom", Pet.class);
        System.out.println("用户的宠物是不是容器中的宠物:"+(user01.getPet()==tom));


    }
}
```

+ 控制台输出

::: details

```java
org.springframework.context.annotation.internalConfigurationAnnotationProcessor
org.springframework.context.annotation.internalAutowiredAnnotationProcessor
org.springframework.context.annotation.internalCommonAnnotationProcessor
org.springframework.context.event.internalEventListenerProcessor
org.springframework.context.event.internalEventListenerFactory
mainApplication
org.springframework.boot.autoconfigure.internalCachingMetadataReaderFactory
worldController
myConfig
helloController
tom22
user01
org.springframework.boot.autoconfigure.AutoConfigurationPackages
org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration
propertySourcesPlaceholderConfigurer
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration$TomcatWebSocketConfiguration
websocketServletWebServerCustomizer
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryConfiguration$EmbeddedTomcat
tomcatServletWebServerFactory
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration
servletWebServerFactoryCustomizer
tomcatServletWebServerFactoryCustomizer
org.springframework.boot.context.properties.ConfigurationPropertiesBindingPostProcessor
org.springframework.boot.context.internalConfigurationPropertiesBinderFactory
org.springframework.boot.context.internalConfigurationPropertiesBinder
org.springframework.boot.context.properties.BoundConfigurationProperties
org.springframework.boot.context.properties.ConfigurationBeanFactoryMetadata
server-org.springframework.boot.autoconfigure.web.ServerProperties
webServerFactoryCustomizerBeanPostProcessor
errorPageRegistrarBeanPostProcessor
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration$DispatcherServletConfiguration
dispatcherServlet
spring.mvc-org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration$DispatcherServletRegistrationConfiguration
dispatcherServletRegistration
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration
org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration
taskExecutorBuilder
applicationTaskExecutor
spring.task.execution-org.springframework.boot.autoconfigure.task.TaskExecutionProperties
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration$WhitelabelErrorViewConfiguration
error
beanNameViewResolver
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration$DefaultErrorViewResolverConfiguration
conventionErrorViewResolver
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration
errorAttributes
basicErrorController
errorPageCustomizer
preserveErrorControllerTargetClassPostProcessor
spring.resources-org.springframework.boot.autoconfigure.web.ResourceProperties
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration$EnableWebMvcConfiguration
requestMappingHandlerAdapter
requestMappingHandlerMapping
welcomePageHandlerMapping
mvcConversionService
mvcValidator
mvcContentNegotiationManager
mvcPathMatcher
mvcUrlPathHelper
viewControllerHandlerMapping
beanNameHandlerMapping
routerFunctionMapping
resourceHandlerMapping
mvcResourceUrlProvider
defaultServletHandlerMapping
handlerFunctionAdapter
mvcUriComponentsContributor
httpRequestHandlerAdapter
simpleControllerHandlerAdapter
handlerExceptionResolver
mvcViewResolver
mvcHandlerMappingIntrospector
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration$WebMvcAutoConfigurationAdapter
defaultViewResolver
viewResolver
requestContextFilter
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration
formContentFilter
org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration
mbeanExporter
objectNamingStrategy
mbeanServer
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration
springApplicationAdminRegistrar
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration$ClassProxyingConfiguration
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration
org.springframework.boot.autoconfigure.availability.ApplicationAvailabilityAutoConfiguration
applicationAvailability
org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration
org.springframework.boot.autoconfigure.context.LifecycleAutoConfiguration
lifecycleProcessor
spring.lifecycle-org.springframework.boot.autoconfigure.context.LifecycleProperties
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration$Jackson2ObjectMapperBuilderCustomizerConfiguration
standardJacksonObjectMapperBuilderCustomizer
spring.jackson-org.springframework.boot.autoconfigure.jackson.JacksonProperties
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration$JacksonObjectMapperBuilderConfiguration
jacksonObjectMapperBuilder
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration$ParameterNamesModuleConfiguration
parameterNamesModule
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration$JacksonObjectMapperConfiguration
jacksonObjectMapper
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration
jsonComponentModule
org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration$StringHttpMessageConverterConfiguration
stringHttpMessageConverter
org.springframework.boot.autoconfigure.http.JacksonHttpMessageConvertersConfiguration$MappingJackson2HttpMessageConverterConfiguration
mappingJackson2HttpMessageConverter
org.springframework.boot.autoconfigure.http.JacksonHttpMessageConvertersConfiguration
org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration
messageConverters
org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration
spring.info-org.springframework.boot.autoconfigure.info.ProjectInfoProperties
org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration
taskSchedulerBuilder
spring.task.scheduling-org.springframework.boot.autoconfigure.task.TaskSchedulingProperties
org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration
restTemplateBuilder
org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration$TomcatWebServerFactoryCustomizerConfiguration
tomcatWebServerFactoryCustomizer
org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration
org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration
characterEncodingFilter
localeCharsetMappingsCustomizer
org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration
multipartConfigElement
multipartResolver
spring.servlet.multipart-org.springframework.boot.autoconfigure.web.servlet.MultipartProperties
org.springframework.aop.config.internalAutoProxyCreator
组件: true
com.frx01.boot.config.MyConfig$$EnhancerBySpringCGLIB$$eb877df3@5b69d40d
true
用户的宠物是不是容器中的宠物:false
```

:::

#### @Bean、@Component、@Controller、@Service、@Repository

@Controller 控制层类，

@Service 业务层类，

@Repository 持久层类，

@Component 无法归类到前3种

使用@Component注解在一个类上，表示将此类标记为Spring容器中的一个Bean。

#### @ComponentScan、@Import

@ComponentScan默认是扫描的路径是同级路径及同级路径的子目录

@ComponentScan：扫描包

@Import：自动从类中的**无参构造函数**创建一个实例注册到 IOC 容器中

【注意】@Import所创建的实例在 IOC 容器中**默认的id名为类的全限定名**，如 User 类就是：com.frx01.bean.User

#### @Conditional

条件装配：满足Conditional指定的条件，则进行组件注入

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/02.png)

> 例如:测试@ConditionalOnBean和@ConditionalOnMissingBean

```java
//@ConditionalOnBean(name="tom") //容器中有tom的时候 添加组件user01
@ConditionalOnMissingBean(name="tom")//容器中没有tom的时候 添加组件user01
@Configuration(proxyBeanMethods = true)//告诉SpringBoot这是一个配置类 == 配置文件
public class MyConfig {

    @Bean("tom22") //自定义组件名
    public Pet tomcatPet(){
        return new Pet("tomcat");

    }

    /**
     * 外部无论对配置类中的这个组件注册方法调用多少次获取到都是之前注册容器中的单实例对象
     * @return
     */
//    @ConditionalOnBean(name="tom")//容器中有tom的时候 添加组件user01
    @Bean //给容器中添加组件。以方法名作为组件id。返回类型:就是组件类型。返回的值，就是组件中在容器中的实例
    public User user01(){
        User zhangsan = new User("zhangsan", 18);
        //User组件依赖了Pet组件
        zhangsan.setPet(tomcatPet());
        return new User("zhangsan",18);
    }
}
```

+ 测试

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.frx01")
public class MainApplication {

    public static void main(String[] args) {

        //1.返回我们的IOC容器
        ConfigurableApplicationContext run= SpringApplication.run(MainApplication.class,args);

        //2.查看容器里面的组件
        String[] names = run.getBeanDefinitionNames();
        for (String name : names) {
            System.out.println(name);
        }
        
        boolean user01 = run.containsBean("user01");
        System.out.println("容器中user01组件:"+user01);

        boolean tom22 = run.containsBean("tom22");
        System.out.println("容器中tom22组件:"+tom22);

    }
}
```

+ 控制台输出

```java
...
容器中user01组件:true
容器中tom22组件:true
```

### 原生配置文件引入

#### @ImportResource

导入Spring配置文件，让它生效

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="frx" class="com.frx01.boot.bean.User">
        <property name="name" value="zhangsan"></property>
        <property name="age" value="18"></property>
    </bean>

    <bean id="cat" class="com.frx01.boot.bean.Pet">
        <property name="name" value="tomcat"></property>
    </bean>
</beans>
```

+ 配置

```java
@ImportResource("classpath:beans.xml")
public class MyConfig {
}
```

+ 测试

```java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.frx01")
public class MainApplication {

    public static void main(String[] args) {
       //1.返回我们的IOC容器
        ConfigurableApplicationContext run= SpringApplication.run(MainApplication.class,args);

        //2.查看容器里面的组件
        String[] names = run.getBeanDefinitionNames();
        for (String name : names) {
            System.out.println(name);
        }
        
		boolean frx = run.containsBean("frx");
        System.out.println("容器中frx组件:"+frx);

        boolean cat = run.containsBean("cat");
        System.out.println("容器中cat组件:"+cat);

    }
}
```

+ 控制台输出

```java
...
容器中frx组件:true
容器中cat组件:true
```

### 配置绑定

如何使用Java读取到properties文件中的内容，并且把它封装到JavaBean中，以供随时使用；

```java
public class getProperties {
     public static void main(String[] args) throws FileNotFoundException, IOException {
         Properties pps = new Properties();
         pps.load(new FileInputStream("a.properties"));
         Enumeration enum1 = pps.propertyNames();//得到配置文件的名字
         while(enum1.hasMoreElements()) {
             String strKey = (String) enum1.nextElement();
             String strValue = pps.getProperty(strKey);
             System.out.println(strKey + "=" + strValue);
             //封装到JavaBean。
         }
     }
 }
```

#### @Component+@ConfigurationProperties

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/3/19  23:50
 * 只有在容器的组件，才会拥有SpringBoot提供的强大功能
 */
@Component
@ConfigurationProperties(prefix = "mycar")
public class Car {

    private String brand;
    private Integer price;

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Car{" +
                "brand='" + brand + '\'' +
                ", price=" + price +
                '}';
    }
}
```

```properties
mycar.brand=BYD
mycar.price=100000
```

+ 测试

```java
@RestController  //@ResponseBody与@Controller的合体
public class HelloController {

    @Autowired
    Car car;

    @RequestMapping("/car")
    private Car car(){
        return car;
    }
}
```

+ 访问URL

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/03.png)

#### @EnableConfigurationProperties + @ConfigurationProperties

```java
@ConfigurationProperties(prefix = "mycar") //没有@Component注解
public class Car {
    ...
}
```

+ +

```java
@EnableConfigurationProperties(Car.class)
//1.开启Car配置绑定功能
//2.把这个Car组件自动注册到容器中
public class MyConfig {
    ...
}
```

## 自动配置原理入门

### 引导加载自动配置类

```java {2}
@SpringBootConfiguration
@EnableAutoConfiguration //重点
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {}
```

#### @SpringBootConfiguration

@Configuration。代表当前是一个配置类

#### @ComponentScan

指定扫描那些，Spring注解

#### @EnableAutoConfiguration

+ 也是一个合成注解，相当于`@AutoConfigurationPackage`与`@Import({AutoConfigurationImportSelector.class})`注解的合成

```java {1-2}
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {}
```

1. **@AutoConfigurationPackage**

   自动配置包

```java
@Import(AutoConfigurationPackage.Registrar.class)\\给容器中导入一个组件 这个组件叫AutoConfigurationPackage.Registrar
public @interface AutoConfigurationPackage {}。
```

```java {7}
//查看Registrar,有两个方法，//利用Registrar给容器中导入一系列组件
	static class Registrar implements ImportBeanDefinitionRegistrar, DeterminableImports {

		@Override
		public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
            //批量注册，批量注册什么
			register(registry, new PackageImports(metadata).getPackageNames().toArray(new String[0]));//断点打在这里
		}

		@Override
		public Set<Object> determineImports(AnnotationMetadata metadata) {
			return Collections.singleton(new PackageImports(metadata));
		}

	}
```

+ 批量注册，批量注册什么，断点打在第7行，这个方法有两个参数：`AnnotationMetadata`:注解元信息，指的是`AutoConfigurationPackage`，代表注解的位置(标在哪里),属性值是什么
+ 注解标在MainApplication这个类上，因为是`@SpringBootApplication`注解下面的`@EnableAutoConfiguration`注解
  + `@EnableAutoConfiguration`是一个合成注解，相当于`@AutoConfigurationPackage`与`@Import({AutoConfigurationImportSelector.class})`注解的合成
+ `new PackageImports(metadata).getPackageNames()`把注解元信息拿来，获取到包名,计算一下，获取到的包名是什么？

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220826/image.7b8vq9b5hq80.webp)

+ 就是`com.frx01.boot`,也就是主程序所在的包名,就是把主程序下的所有组件批量注入

2. **@Import({AutoConfigurationImportSelector.class})**

   1. 利用`getAutoConfigurationEntry(AnnotationMetadata annotationMetadata)`;给容器中批量导入一些组件

   2. 调用`List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);`获取到所有需要导入到容器中的配置类
   3. 利用工厂加载`Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader);`得到所有的组件
   4. 从`META-INF/spring.factories`位置来加载一个文件。默认扫描当前系统里面所有的`META-INF/spring.factories`位置的文件

spring-boot-autoconfigure-2.3.4.RELEASE.jar包里面也有META-INF/spring.factories

+ 文件写死了，spring-boot一启动就要给容器中加载的所有配置类

::: details

```java
#spring-boot-autoconfigure-2.3.4.RELEASE.jar/META-INF/spring.factories
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration,\
org.springframework.boot.autoconfigure.context.LifecycleAutoConfiguration,\
org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration,\
org.springframework.boot.autoconfigure.couchbase.CouchbaseAutoConfiguration,\
org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ReactiveElasticsearchRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ReactiveElasticsearchRestClientAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jdbc.JdbcRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.ldap.LdapRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.solr.SolrRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration,\
org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchRestClientAutoConfiguration,\
org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration,\
org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration,\
org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.h2.H2ConsoleAutoConfiguration,\
org.springframework.boot.autoconfigure.hateoas.HypermediaAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastJpaDependencyAutoConfiguration,\
org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration,\
org.springframework.boot.autoconfigure.http.codec.CodecsAutoConfiguration,\
org.springframework.boot.autoconfigure.influx.InfluxDbAutoConfiguration,\
org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration,\
org.springframework.boot.autoconfigure.integration.IntegrationAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JndiDataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JmsAutoConfiguration,\
org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JndiConnectionFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.activemq.ActiveMQAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.artemis.ArtemisAutoConfiguration,\
org.springframework.boot.autoconfigure.jersey.JerseyAutoConfiguration,\
org.springframework.boot.autoconfigure.jooq.JooqAutoConfiguration,\
org.springframework.boot.autoconfigure.jsonb.JsonbAutoConfiguration,\
org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration,\
org.springframework.boot.autoconfigure.availability.ApplicationAvailabilityAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.embedded.EmbeddedLdapAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.LdapAutoConfiguration,\
org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderValidatorAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.mustache.MustacheAutoConfiguration,\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\
org.springframework.boot.autoconfigure.quartz.QuartzAutoConfiguration,\
org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketRequesterAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketServerAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketStrategiesAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.rsocket.RSocketSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.saml2.Saml2RelyingPartyAutoConfiguration,\
org.springframework.boot.autoconfigure.sendgrid.SendGridAutoConfiguration,\
org.springframework.boot.autoconfigure.session.SessionAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.reactive.ReactiveOAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.resource.reactive.ReactiveOAuth2ResourceServerAutoConfiguration,\
org.springframework.boot.autoconfigure.solr.SolrAutoConfiguration,\
org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration,\
org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration,\
org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.jta.JtaAutoConfiguration,\
org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration,\
org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.HttpHandlerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.ReactiveWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.WebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.error.ErrorWebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.ClientHttpConnectorAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.reactive.WebSocketReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.client.WebServiceTemplateAutoConfiguration
```

:::

::: details 源码

``` java {6}
 protected AutoConfigurationImportSelector.AutoConfigurationEntry getAutoConfigurationEntry(AnnotationMetadata annotationMetadata) {
        if (!this.isEnabled(annotationMetadata)) {
            return EMPTY_ENTRY;
        } else {
            AnnotationAttributes attributes = this.getAttributes(annotationMetadata);
            List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);//获取所有候选的配置
            configurations = this.removeDuplicates(configurations);//先移除一些重复的
            Set<String> exclusions = this.getExclusions(annotationMetadata, attributes);
            this.checkExcludedClasses(configurations, exclusions);//排除一些东西
            configurations.removeAll(exclusions);
            configurations = this.getConfigurationClassFilter().filter(configurations);
            this.fireAutoConfigurationImportEvents(configurations, exclusions);
            return new AutoConfigurationImportSelector.AutoConfigurationEntry(configurations, exclusions);
        }
    }
```

```java {2}
  protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
        List<String> configurations = SpringFactoriesLoader.loadFactoryNames(this.getSpringFactoriesLoaderFactoryClass(), this.getBeanClassLoader());
        Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you are using a custom packaging, make sure that file is correct.");
        return configurations;
    }
```

```java {3}
   public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
        String factoryTypeName = factoryType.getName();
        return (List)loadSpringFactories(classLoader).getOrDefault(factoryTypeName, Collections.emptyList());
    }
```

```java {7}
    private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
        MultiValueMap<String, String> result = (MultiValueMap)cache.get(classLoader);
        if (result != null) {
            return result;
        } else {
            try {
                Enumeration<URL> urls = classLoader != null ? classLoader.getResources("META-INF/spring.factories") : ClassLoader.getSystemResources("META-INF/spring.factories");//获取资源文件
                LinkedMultiValueMap result = new LinkedMultiValueMap();

                while(urls.hasMoreElements()) {
                    URL url = (URL)urls.nextElement();
                    UrlResource resource = new UrlResource(url);
                    Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                    Iterator var6 = properties.entrySet().iterator();

                    while(var6.hasNext()) {
                        Entry<?, ?> entry = (Entry)var6.next();
                        String factoryTypeName = ((String)entry.getKey()).trim();
                        String[] var9 = StringUtils.commaDelimitedListToStringArray((String)entry.getValue());
                        int var10 = var9.length;

                        for(int var11 = 0; var11 < var10; ++var11) {
                            String factoryImplementationName = var9[var11];
                            result.add(factoryTypeName, factoryImplementationName.trim());
                        }
                    }
                }

                cache.put(classLoader, result);
                return result;
            } catch (IOException var13) {
                throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var13);
            }
        }
    }
```

:::

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/04.png)

### 按需开启自动配置项

1. 虽然我们127个场景自动配置启动的时候默认全部加载。
2. 按照条件装配规则(@Conditional)，最终会按需配置。

> 比如：导入相关的包，相关的包中有类，`@ConditionalOnClass`只有这些类，这些自动配置类才能生效

```java
package org.springframework.boot.autoconfigure.aop;

import org.aspectj.weaver.Advice;//爆红，没有代入相关的包

import org.springframework.aop.config.AopConfigUtils;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
@Configuration(proxyBeanMethods = false)
@ConditionalOnProperty(prefix = "spring.aop", name = "auto", havingValue = "true", matchIfMissing = true)//如果是true开启，没有配置，默认配置也是true，开启,生效
public class AopAutoConfiguration {

	@Configuration(proxyBeanMethods = false)
	@ConditionalOnClass(Advice.class)//有这个类才生效 爆红 ,所以下面这个静态类不生效
	static class AspectJAutoProxyingConfiguration {

		@Configuration(proxyBeanMethods = false)
		@EnableAspectJAutoProxy(proxyTargetClass = false)
		@ConditionalOnProperty(prefix = "spring.aop", name = "proxy-target-class", havingValue = "false",
				matchIfMissing = false)
		static class JdkDynamicAutoProxyConfiguration {

		}

		@Configuration(proxyBeanMethods = false)
		@EnableAspectJAutoProxy(proxyTargetClass = true)
		@ConditionalOnProperty(prefix = "spring.aop", name = "proxy-target-class", havingValue = "true",
				matchIfMissing = true)
		static class CglibAutoProxyConfiguration {

		}

	}
	//生效
	@Configuration(proxyBeanMethods = false)
	@ConditionalOnMissingClass("org.aspectj.weaver.Advice")//没有这个类的时候，生效
	@ConditionalOnProperty(prefix = "spring.aop", name = "proxy-target-class", havingValue = "true",
			matchIfMissing = true)//默认开启
	static class ClassProxyingConfiguration {
		//有接口，又实现类 ，就能开启AOP，默认jdk动态代理
		ClassProxyingConfiguration(BeanFactory beanFactory) {
			if (beanFactory instanceof BeanDefinitionRegistry) {
				BeanDefinitionRegistry registry = (BeanDefinitionRegistry) beanFactory;
				AopConfigUtils.registerAutoProxyCreatorIfNecessary(registry);
				AopConfigUtils.forceAutoProxyCreatorToUseClassProxying(registry);
			}
		}

	}

}
```

### 分析DispatcherServletAutoConfiguration

```java
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)//优先配置
@Configuration(proxyBeanMethods = false)//配置类
@ConditionalOnWebApplication(type = Type.SERVLET)//判断是否是servlet应用，是否SERVLET类型
@ConditionalOnClass(DispatcherServlet.class)//有这个类才生效
@AutoConfigureAfter(ServletWebServerFactoryAutoConfiguration.class)//ServletWebServerFactoryAutoConfiguration配置完后才生效
public class DispatcherServletAutoConfiguration {
    
    public static final String DEFAULT_DISPATCHER_SERVLET_BEAN_NAME = "dispatcherServlet";
    
    public static final String DEFAULT_DISPATCHER_SERVLET_REGISTRATION_BEAN_NAME = "dispatcherServletRegistration";

    
    @Configuration(proxyBeanMethods = false)//配置类
	@Conditional(DefaultDispatcherServletCondition.class)//默认生效
	@ConditionalOnClass(ServletRegistration.class)//有这个类才生效，导入web开发场景就生效了
	@EnableConfigurationProperties(WebMvcProperties.class)//与这个类配置绑定
	protected static class DispatcherServletConfiguration {

        //注册组件
		@Bean(name = DEFAULT_DISPATCHER_SERVLET_BEAN_NAME)//dispatcherServlet
		public DispatcherServlet dispatcherServlet(WebMvcProperties webMvcProperties) {
			DispatcherServlet dispatcherServlet = new DispatcherServlet();
			dispatcherServlet.setDispatchOptionsRequest(webMvcProperties.isDispatchOptionsRequest());
			dispatcherServlet.setDispatchTraceRequest(webMvcProperties.isDispatchTraceRequest());
			dispatcherServlet.setThrowExceptionIfNoHandlerFound(webMvcProperties.isThrowExceptionIfNoHandlerFound());
			dispatcherServlet.setPublishEvents(webMvcProperties.isPublishRequestHandledEvents());
			dispatcherServlet.setEnableLoggingRequestDetails(webMvcProperties.isLogRequestDetails());
			return dispatcherServlet;
		}
        //默认配文件上传解析器
        @Bean
		@ConditionalOnBean(MultipartResolver.class)
		@ConditionalOnMissingBean(name = DispatcherServlet.MULTIPART_RESOLVER_BEAN_NAME)
		public MultipartResolver multipartResolver(MultipartResolver resolver) {
			// Detect if the user has created a MultipartResolver but named it incorrectly
			return resolver;
		}

}
```

```java
@ConfigurationProperties(prefix = "spring.mvc")//与配置文件spring.mvc进行绑定 
public class WebMvcProperties {}//配置属性被这个类封装
```

### 修改默认配置

```java
///给容器中加入了文件上传解析器；		
		@Bean
		@ConditionalOnBean(MultipartResolver.class)  //容器中有这个类型组件
		@ConditionalOnMissingBean(name = DispatcherServlet.MULTIPART_RESOLVER_BEAN_NAME) //容器中没有这个名字 multipartResolver 的组件
		public MultipartResolver multipartResolver(MultipartResolver resolver) {
            //给@Bean标注的方法传入了对象参数，这个参数的值就会从容器中找。
            //SpringMVC multipartResolver。防止有些用户配置的文件上传解析器不符合规范
			// Detect if the user has created a MultipartResolver but named it incorrectly
			return resolver;
		}

```

SpringBoot默认会在底层配好所有的组件。但是如果用户自己配置了，以用户的优先

```java
	@Bean
	@ConditionalOnMissingBean
	public CharacterEncodingFilter characterEncodingFilter() {
    }
```

`总结`:

> - SpringBoot先加载所有的自动配置类 xxxxAutoConfiguration
> - 每个自动配置类按照条件进行生效，默认都会绑定配置文件指定的值,xxxxProperties里面拿。xxxxProperties和配置文件进行绑定
> - 生效的配置类就会给容器中装配很多的组件
> - 只要容器中有这些组件，相当于这些功能就有了
> - 只要用户有自己配置的，就以用户的优先
> - 定制化
>   - 用户直接自己@Bean替换底层的组件
>   - 用户去看组件是获取的配置文件什么值就去修改
>
> ```properties
> #例如
> server.servlet.encoding.charset=GBK 
> ```
>
> xxxxAutoConfiguration----->组件----->xxxxProperties里面拿值---->application.properties

### 最佳实践

+ 引入场景依赖
  + [场景](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)
+ 查看自动配置了哪些（选做）
  + 自己分析，引入场景对应的自动配置一般都生效了
  + 配置文件中debug=true开启自动配置报告。Negative（不生效）\Positive（生效）

+ 是否需要修改
  + 参照文档修改配置项
    + [参照文档](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties)
    + 自己分析。xxxProperties绑定了配置文件的哪些
  + 自定义加入或者替换组件
    + @Bean、@Componet...
  + 自定义器 **XXXXCustomizer**;
  + ...

## 开发小技巧

### Lombok

简化javabean开发

```xml
      <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
```

搜索插件lombok

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/05.png)

**@Data**注解:包括下面所有方法除了有参构造方法

**@ToString**注解:tostring方法

**@Slf4j**注解:日志

**@EqualsAndHashCode**注解:equals和hashcode方法

**@NoArgsConstructor**:无参构造器

**@AllArgsConstructor**:全参构造器

简化JavaBean开发

```java
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@EqualsAndHashCode
public class User {
    private String name;
    private Integer age;
    private Pet pet;

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}
```

简化日志开发

```java
@Slf4j
@RestController  //@ResponseBody与@Controller的合体
public class HelloController {

    @Autowired
    Car car;

    @RequestMapping("/car")
    private Car car(){
        return car;
    }

    @RequestMapping("/hello") //映射请求
    public String handle01(){

        log.info("请求进来了...");
        return "Hello,SpringBoot2"+"你好"; //向浏览器返回
    }
}
```

### dev-tools

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>
```

项目或者页面修改以后：Ctrl+F9；就能实时生效 //JRebel

### Spring Initailizr（项目初始化向导）

#### 选择我们需要的开发场景

File->New Project

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/06.png)

Next

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/07.png)

Next

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/08.png)

想要什么选择就行

#### 自动依赖引入

```xml
  <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.10</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.frx01.boot</groupId>
    <artifactId>springboot-helloworld</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>springboot-helloworld</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
```

#### 自动构建项目结构

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/03/09.png)

#### 自动编写好主配置类

```java
@SpringBootApplication
public class SpringbootHelloworldApplication {

    public static void main(String[] args) {
       SpringApplication.run(SpringbootHelloworldApplication.class, args);
    }
}
```

​	