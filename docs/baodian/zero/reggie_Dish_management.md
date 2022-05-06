---
title: 瑞吉外卖-菜品管理业务开发
date: 2022-05-06 23:02:14
permalink: /pages/f8dc6e/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-菜品管理业务开发

[[toc]]

## 文件上传下载

### 文件上传介绍

文件上传，也称为uptoad，是指将本地图片、视频、音频等文件上传到服务器上，可以供其他用户浏览或下载的过程。文件上传在项目中应用非常广泛，我们经常发微博、发微信朋友圈都用到了文件上传功能。

文件上传时，对页面的form表单有如下要求:

+ method="post"                                              采用post方式提交数据
+ enctype="multipart/form-data"                  采用multipart格式上传文件
+ type="file"                                                       采用input的file控件上传

举例:

```html
<form method="post" action="/common/upload" entype="multipart/form-data">
    <input name="myFile" type="file"/>
    <input type="submit" value="提交"/>
</form>
```

目前一些前端组件库也提供了相应的上传组件，但是底层原理还是基于form表单的文件上传。例如ElementUI中提供的upload上传组件:

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.7c889w396l00.webp)

服务端要接收客户端页面上传的文件，通常都会使用Apache的两个组件:

+ commons-fileupload
+ commons-io

Spring框架在spring-web包中对文件上传进行了封装，大大简化了服务端代码，我们只需要在Controller的方法中声明一个MultipartFile类型的参数即可接收上传的文件，例如:

```java
@PostMapping(value="/upload")
public R<String> upload(MultipartFile file){
    System.out.println(file);
    return null;
}
```

### 文件下载介绍

文件下载，也称为download，是指将文件从服务器传输到本地计算机的过程。

通过浏览器进行文件下载，通常有两中表现形式:

+ 以附件形式下载，弹出保存对话框，将文件保存到指定磁盘目录
+ 直接在浏览器中打开

通过浏览器进行文件下载，本质上就是服务端将文件以流的形式写回浏览器的过程。

### 文件上传代码实现

文件上传，页面端可以使用ElementUI提供的上传组件。

可以直接使用资料中提供的上传页面，位置:资料/文件上传下载页面/upload.html

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.43g0hvzynem0.webp)

+ 配置yml

```yaml
reggie:
  path: D:\img\
```

+ 编写controller

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/5/6  21:20
 * 文件上传和下载
 */
@RestController
@RequestMapping("/common")
@Slf4j
public class CommonController {

    @Value("${reggie.path}")
    private String basePath;

    /**
     * 文件上传
     * @param file 参数有要求
     * @return
     */
    @PostMapping("/upload")
    public R<String> upload(MultipartFile file){
        //file是一个临时文件，需要转存到指定位置，否则本次请求完成后临时文件会删除
        log.info(file.toString());

        //原始文件名
        String originalFilename = file.getOriginalFilename();
        String suffix=originalFilename.substring(originalFilename.lastIndexOf("."));

        //使用UUID重新生成文件名，防止文件名重复造成重复覆盖
        String fileName = UUID.randomUUID().toString()+suffix;

        //创建一个目录对象
        File dir = new File(basePath);
        //判断当前目录是否存在
        if(!dir.exists()){
            //目录不存在
            dir.mkdirs();
        }

        try {
            //将临时文件转存到指定位置
            file.transferTo(new File(basePath+originalFilename));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return R.success(fileName);
    }
}
```

### 文件下载代码实现

```html
<img v-if="imageUrl" :src="imageUrl" class="avatar"></img>
```

+ 编写处理器

```java
/**
     * 文件下载
     * @param name
     * @param response
     */
    @GetMapping("/download")
    public void download(String name, HttpServletResponse response){

        try {
            //输入流，通过输入流读取文件内容
            FileInputStream fileInputStream = new FileInputStream(new File(basePath+name));

            //输出流，通过输出流将文件写会浏览器，在浏览器展示图片了
            ServletOutputStream outputStream = response.getOutputStream();

            response.setContentType("image/jpeg");

            int len=0;
            byte[] bytes = new byte[1024];
            while ((len=fileInputStream.read(bytes))!=-1){
                outputStream.write(bytes,0,len);
                outputStream.flush();
            }
            //关闭资源
            outputStream.close();
            fileInputStream.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

+ 结果

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.46mizk8tizq0.webp)