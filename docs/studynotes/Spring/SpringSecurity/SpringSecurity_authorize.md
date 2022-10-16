---
title: SpringSecurity 授权
date: 2022-10-16 17:44:03
permalink: /Spring/SpringSecurity/SpringSecurity_authorize
categories:
  - SpringSecurity
tags:
  - SpringSecurity
---
# SpringSecurity 授权

[[toc]]

## 权限系统的作用

例如一个学校图书馆的管理系统，如果是普通学生登录就能看到借书还书相关的功能，不可能让他看到并且去使用添加书籍信息，删除书籍信息等功能。但是如果是一个图书馆管理员的账号登录了，应该就能看到并使用添加书籍信息，删除书籍信息等功能。

​	总结起来就是**不同的用户可以使用不同的功能**。这就是权限系统要去实现的效果。

​	我们不能只依赖前端去判断用户的权限来选择显示哪些菜单哪些按钮。因为如果只是这样，如果有人知道了对应功能的接口地址就可以不通过前端，直接去发送请求来实现相关功能操作。

​	所以我们还需要在后台进行用户权限的判断，判断当前用户是否有相应的权限，必须具有所需权限才能进行相应的操作。

## 权限的基本流程

在SpringSecurity中，会使用默认的FilterSecurityInterceptor来进行权限校验。在FilterSecurityInterceptor中会从SecurityContextHolder获取其中的Authentication，然后获取其中的权限信息。当前用户是否拥有访问当前资源所需的权限。

​	所以我们在项目中只需要把当前登录用户的权限信息也存入Authentication。

​	然后设置我们的资源所需要的权限即可。

## 权限实现

### 限制访问资源所需权限

SpringSecurity为我们提供了基于注解的权限控制方案，这也是我们项目中主要采用的方式。我们可以使用注解去指定访问对应的资源所需的权限。

但是要使用它我们需要先开启相关配置。

```java
@EnableGlobalMethodSecurity(prePostEnabled = true)
```

然后就可以使用对应的注解。`@PreAuthorize`

```java {5}
@RestController
public class HelloController {

    @RequestMapping("/hello")
    @PreAuthorize("hasAuthority('test')")
    public String hello(){
        return "hello";
    }
}
```

### 封装权限测试

我们前面在写UserDetailsServiceImpl的时候说过，在查询出用户后还要获取对应的权限信息，封装到UserDetails中返回。

​	我们先直接把权限信息写死封装到UserDetails中进行测试。

​	我们之前定义了UserDetails的实现类LoginUser，想要让其能封装权限信息就要对其进行修改。

```java {9-20,31-37}
@Data
@NoArgsConstructor
public class LoginUser implements UserDetails {

    private User user;

    private List<String> permissions;

    public LoginUser(User user, List<String> permissions) {
        this.user = user;
        this.permissions = permissions;
    }
    @JSONField(serialize = false)
    private List<SimpleGrantedAuthority> authorities;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        if(authorities!=null){
            return authorities;
        }

        //把permissions中String类型的权限信息封装成它的实现类SimpleGrantedAuthority对象

        /*authorities = new ArrayList<>();
        for (String permission : permissions) {
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(permission);
            newList.add(authority);
        }
        return newList;*/

        authorities =
                permissions.stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        return authorities;

    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
```

​		LoginUser修改完后我们就可以在UserDetailsServiceImpl中去把权限信息封装到LoginUser中了。我们写死权限进行测试，后面我们再从数据库中查询权限信息。

```java {20}
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //查询用户信息
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserName,username);
        User user = userMapper.selectOne(queryWrapper);
        //如果没有查询到用户,就抛出异常
        if(Objects.isNull(user)){
            throw new RuntimeException("用户名或者密码错误");
        }

        //TODO 查询对应的权限信息
        List<String> list = new ArrayList<>(Arrays.asList("test","admin"));

        //把数据封装成userDetails返回
        return new LoginUser(user,list);
    }
}
```

+ 先登录用户获得token，携带token测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221016/image.2hewii1ui1k0.webp)