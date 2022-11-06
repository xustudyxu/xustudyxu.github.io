---
title: 尚医通-微信登录
date: 2022-11-06 00:37:43
permalink: /high/SYT/SYT_wechatLogin
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-微信登录

[[toc]]

## OAuth2

### OAuth2 解决什么问题

#### 开放系统间授权

照片拥有者想要在云冲印服务上打印照片，云冲印服务需要访问云存储服务上的资源

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.3qbdx7nxkw80.webp)

#### 图例

资源拥有者：照片拥有者

客户应用：云冲印

受保护的资源：照片

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.1i1db73t8sps.webp)

#### 方式一：用户名密码复制

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.pvhhq53vjw0.webp)

用户将自己的"云存储"服务的用户名和密码，告诉"云冲印"，后者就可以读取用户的照片了。这样的做法有以下几个严重的缺点。

1. "云冲印"为了后续的服务，会保存用户的密码，这样很不安全。
2. Google不得不部署密码登录，而我们知道，单纯的密码登录并不安全。
3. "云冲印"拥有了获取用户储存在Google所有资料的权力，用户没法限制"云冲印"获得授权的范围和有效期。
4. 用户只有修改密码，才能收回赋予"云冲印"的权力。但是这样做，会使得其他所有获得用户授权的第三方应用程序全部失效。
5. 只要有一个第三方应用程序被破解，就会导致用户密码泄漏，以及所有被密码保护的数据泄漏。

::: tip 总结

将受保护的资源中的用户名和密码存储在客户应用的服务器上，使用时直接使用这个用户名和密码登录

适用于同一公司内部的多个系统，不适用于不受信的第三方应用

:::

#### 方式二：通用开发者key

适用于合作商或者授信的不同业务部门之间

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.2vz4ip6q3pm0.webp)

#### 方式三：颁发令牌

接近OAuth2方式，需要考虑如何管理令牌、颁发令牌、吊销令牌，需要统一的协议，因此就有了OAuth2协议

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.2y79wpk9zuk0.webp)

**令牌类比仆从钥匙**

### OAuth2 最简向导

#### OAuth 主要角色

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.6rm0atekmmk0.webp)

### OAuth2 的应用

#### 微服务安全

现代微服务中系统微服务化以及应用的形态和设备类型增多，不能用传统的登录方式

核心的技术不是用户名和密码，而是token，由AuthServer颁发token，用户使用token进行登录

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.4tqcnjq0zoc0.webp)

#### 社交登录

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.2pslhkildns0.webp)

## 微信登录介绍

### 前期准备

1. 注册

微信开放平台：[https://open.weixin.qq.com](https://open.weixin.qq.com)

2. 邮箱激活
3. 完善开发者资料
4. 开发者资质认证

准备营业执照，1-2个工作日审批、300元

5. 创建网站应用

提交审核，7个工作日审批

6. 内网穿透

ngrok的使用

### 授权流程

参考文档：[https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=e547653f995d8f402704d5cb2945177dc8aa4e7e&lang=zh_CN](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=e547653f995d8f402704d5cb2945177dc8aa4e7e&lang=zh_CN)

**获取access_token时序图**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.ffug23frnko.webp)

第一步：请求CODE（生成授权URL）

第二步：通过code获取access_token（开发回调URL）

## 服务端开发

操作模块：service-user

说明：微信登录二维码我们是以弹出层的形式打开，不是以页面形式，所以做法是不一样的，参考如下链接，上面有相关弹出层的方式

[https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)

如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.2e58lcmi3ou8.webp)

因此我们的操作步骤为：

第一步我们通过接口把对应参数返回页面；

第二步在头部页面启动打开微信登录二维码；

第三步处理登录回调接口；

第四步回调返回页面通知微信登录层回调成功

第五步如果是第一次扫描登录，则绑定手机号码，登录成功

接下来我们根据步骤，一步一步实现

### 返回微信登录参数

#### 添加配置

在application-dev.yml添加配置

```yaml
wx.open.app_id=wxed9954c01bb89b47
wx.open.app_secret=a7482517235173ddb4083788de60b90e
wx.open.redirect_url=http://localhost:8160/api/ucenter/wx/callback
yygh.baseUrl=http://localhost:3000
```

#### 添加配置类

```java
@Component
public class ConstantWeiXinPropertiesUtils implements InitializingBean {

    @Value("${wx.open.app_id}")
    private String appId;

    @Value("${wx.open.app_secret}")
    private String appSecret;

    @Value("${wx.open.redirect_url}")
    private String redirectUrl;

    @Value("${yygh.baseUrl}")
    private String yyghBaseUrl;


    public static String WX_OPEN_APP_ID;
    public static String WX_OPEN_APP_SECRET;
    public static String WX_OPEN_REDIRECT_URL;

    public static String YYGH_BASE_URL;

    @Override
    public void afterPropertiesSet() throws Exception {
        WX_OPEN_APP_ID = appId;
        WX_OPEN_APP_SECRET = appSecret;
        WX_OPEN_REDIRECT_URL = redirectUrl;
        YYGH_BASE_URL = yyghBaseUrl;
    }
}
```

#### 添加接口

```java
@Controller
@RequestMapping("/api/ucenter/wx")
public class WeiXinApiController {

    //1.生成微信扫描的二维码
    // 返回生成二维码需要参数
    @GetMapping("/getLoginParam")
    @ResponseBody
    public Result genQrConner(){

        try {
            HashMap<Object, Object> map = new HashMap<>();
            map.put("appid", ConstantWeiXinPropertiesUtils.WX_OPEN_APP_ID);
            map.put("scope","snsapi_login");
            String wxOpenRedirectUrl = ConstantWeiXinPropertiesUtils.WX_OPEN_REDIRECT_URL;
            wxOpenRedirectUrl = URLEncoder.encode(wxOpenRedirectUrl,"utf-8");
            map.put("redirect_uri",wxOpenRedirectUrl);
            map.put("state",System.currentTimeMillis()+"");
            return Result.ok(map);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }

    //2.回调的方法，得到扫码人的信息
}
```

### 处理微信回调

#### 添加 httpclient 工具类

```java
public class HttpClientUtils {
   public static final int connTimeout=10000;
   public static final int readTimeout=10000;
   public static final String charset="UTF-8";
   private static HttpClient client = null;

   static {
      PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
      cm.setMaxTotal(128);
      cm.setDefaultMaxPerRoute(128);
      client = HttpClients.custom().setConnectionManager(cm).build();
   }

   public static String postParameters(String url, String parameterStr) throws ConnectTimeoutException, SocketTimeoutException, Exception{
      return post(url,parameterStr,"application/x-www-form-urlencoded",charset,connTimeout,readTimeout);
   }

   public static String postParameters(String url, String parameterStr,String charset, Integer connTimeout, Integer readTimeout) throws ConnectTimeoutException, SocketTimeoutException, Exception{
      return post(url,parameterStr,"application/x-www-form-urlencoded",charset,connTimeout,readTimeout);
   }

   public static String postParameters(String url, Map<String, String> params) throws ConnectTimeoutException,
           SocketTimeoutException, Exception {
      return postForm(url, params, null, connTimeout, readTimeout);
   }

   public static String postParameters(String url, Map<String, String> params, Integer connTimeout,Integer readTimeout) throws ConnectTimeoutException,
           SocketTimeoutException, Exception {
      return postForm(url, params, null, connTimeout, readTimeout);
   }

   public static String get(String url) throws Exception {
      return get(url, charset, null, null);
   }

   public static String get(String url, String charset) throws Exception {
      return get(url, charset, connTimeout, readTimeout);
   }

   /**
    * 发送一个 Post 请求, 使用指定的字符集编码.
    *
    * @param url
    * @param body RequestBody
    * @param mimeType 例如 application/xml "application/x-www-form-urlencoded" a=1&b=2&c=3
    * @param charset 编码
    * @param connTimeout 建立链接超时时间,毫秒.
    * @param readTimeout 响应超时时间,毫秒.
    * @return ResponseBody, 使用指定的字符集编码.
    * @throws ConnectTimeoutException 建立链接超时异常
    * @throws SocketTimeoutException  响应超时
    * @throws Exception
    */
   public static String post(String url, String body, String mimeType,String charset, Integer connTimeout, Integer readTimeout)
           throws ConnectTimeoutException, SocketTimeoutException, Exception {
      HttpClient client = null;
      HttpPost post = new HttpPost(url);
      String result = "";
      try {
         if (StringUtils.isNotBlank(body)) {
            HttpEntity entity = new StringEntity(body, ContentType.create(mimeType, charset));
            post.setEntity(entity);
         }
         // 设置参数
         RequestConfig.Builder customReqConf = RequestConfig.custom();
         if (connTimeout != null) {
            customReqConf.setConnectTimeout(connTimeout);
         }
         if (readTimeout != null) {
            customReqConf.setSocketTimeout(readTimeout);
         }
         post.setConfig(customReqConf.build());

         HttpResponse res;
         if (url.startsWith("https")) {
            // 执行 Https 请求.
            client = createSSLInsecureClient();
            res = client.execute(post);
         } else {
            // 执行 Http 请求.
            client = HttpClientUtils.client;
            res = client.execute(post);
         }
         result = IOUtils.toString(res.getEntity().getContent(), charset);
      } finally {
         post.releaseConnection();
         if (url.startsWith("https") && client != null&& client instanceof CloseableHttpClient) {
            ((CloseableHttpClient) client).close();
         }
      }
      return result;
   }


   /**
    * 提交form表单
    *
    * @param url
    * @param params
    * @param connTimeout
    * @param readTimeout
    * @return
    * @throws ConnectTimeoutException
    * @throws SocketTimeoutException
    * @throws Exception
    */
   public static String postForm(String url, Map<String, String> params, Map<String, String> headers, Integer connTimeout, Integer readTimeout) throws ConnectTimeoutException,
           SocketTimeoutException, Exception {

      HttpClient client = null;
      HttpPost post = new HttpPost(url);
      try {
         if (params != null && !params.isEmpty()) {
            List<NameValuePair> formParams = new ArrayList<NameValuePair>();
            Set<Map.Entry<String, String>> entrySet = params.entrySet();
            for (Map.Entry<String, String> entry : entrySet) {
               formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
            UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formParams, Consts.UTF_8);
            post.setEntity(entity);
         }

         if (headers != null && !headers.isEmpty()) {
            for (Map.Entry<String, String> entry : headers.entrySet()) {
               post.addHeader(entry.getKey(), entry.getValue());
            }
         }
         // 设置参数
         RequestConfig.Builder customReqConf = RequestConfig.custom();
         if (connTimeout != null) {
            customReqConf.setConnectTimeout(connTimeout);
         }
         if (readTimeout != null) {
            customReqConf.setSocketTimeout(readTimeout);
         }
         post.setConfig(customReqConf.build());
         HttpResponse res = null;
         if (url.startsWith("https")) {
            // 执行 Https 请求.
            client = createSSLInsecureClient();
            res = client.execute(post);
         } else {
            // 执行 Http 请求.
            client = HttpClientUtils.client;
            res = client.execute(post);
         }
         return IOUtils.toString(res.getEntity().getContent(), "UTF-8");
      } finally {
         post.releaseConnection();
         if (url.startsWith("https") && client != null
                 && client instanceof CloseableHttpClient) {
            ((CloseableHttpClient) client).close();
         }
      }
   }

   /**
    * 发送一个 GET 请求
    */
   public static String get(String url, String charset, Integer connTimeout,Integer readTimeout)
           throws ConnectTimeoutException,SocketTimeoutException, Exception {

      HttpClient client = null;
      HttpGet get = new HttpGet(url);
      String result = "";
      try {
         // 设置参数
         RequestConfig.Builder customReqConf = RequestConfig.custom();
         if (connTimeout != null) {
            customReqConf.setConnectTimeout(connTimeout);
         }
         if (readTimeout != null) {
            customReqConf.setSocketTimeout(readTimeout);
         }
         get.setConfig(customReqConf.build());

         HttpResponse res = null;

         if (url.startsWith("https")) {
            // 执行 Https 请求.
            client = createSSLInsecureClient();
            res = client.execute(get);
         } else {
            // 执行 Http 请求.
            client = HttpClientUtils.client;
            res = client.execute(get);
         }

         result = IOUtils.toString(res.getEntity().getContent(), charset);
      } finally {
         get.releaseConnection();
         if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
            ((CloseableHttpClient) client).close();
         }
      }
      return result;
   }

   /**
    * 从 response 里获取 charset
    */
   @SuppressWarnings("unused")
   private static String getCharsetFromResponse(HttpResponse ressponse) {
      // Content-Type:text/html; charset=GBK
      if (ressponse.getEntity() != null  && ressponse.getEntity().getContentType() != null && ressponse.getEntity().getContentType().getValue() != null) {
         String contentType = ressponse.getEntity().getContentType().getValue();
         if (contentType.contains("charset=")) {
            return contentType.substring(contentType.indexOf("charset=") + 8);
         }
      }
      return null;
   }

   /**
    * 创建 SSL连接
    * @return
    * @throws GeneralSecurityException
    */
   private static CloseableHttpClient createSSLInsecureClient() throws GeneralSecurityException {
      try {
         SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
            public boolean isTrusted(X509Certificate[] chain,String authType) throws CertificateException {
               return true;
            }
         }).build();

         SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext, new X509HostnameVerifier() {

            @Override
            public boolean verify(String arg0, SSLSession arg1) {
               return true;
            }

            @Override
            public void verify(String host, SSLSocket ssl)
                    throws IOException {
            }

            @Override
            public void verify(String host, X509Certificate cert)
                    throws SSLException {
            }

            @Override
            public void verify(String host, String[] cns,
                               String[] subjectAlts) throws SSLException {
            }
         });
         return HttpClients.custom().setSSLSocketFactory(sslsf).build();

      } catch (GeneralSecurityException e) {
         throw e;
      }
   }

}
```

#### 添加回调接口获取 access_token

在WeixinApiController 类添加回调方法

```java
 //2.微信扫码后，回调的方法，得到扫码人的信息
    @GetMapping("/callback")
    public String callback(String code,String state){
        //第一步 获取临时票据 code
        System.out.println("code:"+code);
        //第二步 拿着code和微信id和秘钥，请求微信固定地址,得到两个返回值
        //使用code和appid以及appscrect换取access_token
        //%s 占位符 需要传递参数
        StringBuffer baseAccessTokenUrl = new StringBuffer()
                .append("https://api.weixin.qq.com/sns/oauth2/access_token")
                .append("?appid=%s")
                .append("&secret=%s")
                .append("&code=%s")
                .append("&grant_type=authorization_code");

        String accessTokenUrl = String.format(baseAccessTokenUrl.toString(),
                ConstantWeiXinPropertiesUtils.WX_OPEN_APP_ID,
                ConstantWeiXinPropertiesUtils.WX_OPEN_APP_SECRET,
                code);
        //使用httpclient请求这个地址
        try {
            String accessTokenInfo = HttpClientUtils.get(accessTokenUrl);
            System.out.println("accessTokenInfo:"+accessTokenInfo);
            //从返回的字符串里获取两个值 openid 和 access_token
            JSONObject jsonObject = JSONObject.parseObject(accessTokenInfo);
            String access_token = jsonObject.getString("access_token");
            String openid = jsonObject.getString("openid");

            //判断数据库中是否存在微信扫码人的信息
            //根据openid判断
           
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
```

### 获取用户信息

#### 根据openid查询用户是否已注册

1. UserInfoService类添加接口

```java
    //根据openid判断
    UserInfo selectWxInfoOpenId(String openid);
```

2. UserInfoServiceImpl类添加接口实现

```java
    @Override
    public UserInfo selectWxInfoOpenId(String openid) {
        QueryWrapper<UserInfo> wrapper = new QueryWrapper<>();
        wrapper.eq("openid",openid);
        UserInfo userInfo = baseMapper.selectOne(wrapper);
        return userInfo;
```

#### 根据access_token获取用户信息

```java
 	...
	UserInfo userInfo = userInfoService.selectWxInfoOpenId(openid);
            if(userInfo==null){//表示数据库不存在userInfo信息
                //第三步 拿 openid 和 access_token 请求微信地址，最终得到扫码人的信息
                String baseUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo" +
                        "?access_token=%s" +
                        "&openid=%s";
                String userInfoUrl = String.format(baseUserInfoUrl, access_token, openid);
                String resultInfo = HttpClientUtils.get(userInfoUrl);
                System.out.println("resultInfo:"+resultInfo);
                JSONObject resultUserInfoJson= JSONObject.parseObject(resultInfo);
                //解析用户信息
                //用户昵称
                String nickname = resultUserInfoJson.getString("nickname");
                //用户头像
                String headimgurl = resultUserInfoJson.getString("headimgurl");

                //获取扫描人信息添加数据库
                userInfo = new UserInfo();
                userInfo.setNickName(nickname);
                userInfo.setOpenid(openid);
                userInfo.setStatus(1);//正常状态
                userInfoService.save(userInfo);
            }
            //返回name和token字符串
            HashMap<String, String> map = new HashMap<>();
            String name = userInfo.getName();
            if(StringUtils.isEmpty(name)) {
                name = userInfo.getNickName();
            }
            if(StringUtils.isEmpty(name)) {
                name = userInfo.getPhone();
            }
            map.put("name", name);

            //判断userInfo是否有手机号，如果说手机号为空，返回openid
            //如果手机号不为空，返回openid值是空字符串
            //前端判断：如果openid不为空，绑定手机号，如果openid为空，不需要绑定手机号
            if(StringUtils.isEmpty(userInfo.getPhone())) {
                map.put("openid", userInfo.getOpenid());
            } else {
                map.put("openid", "");
            }
            //使用Jwt生成token字符串
            String token = JwtHelper.createToken(userInfo.getId(), name);
            map.put("token",token);
            //跳转到前端页面
            return "redirect:" + ConstantWeiXinPropertiesUtils.YYGH_BASE_URL +
                    "/weixin/callback?token="+map.get("token")+"&openid="+map.get("openid")+
                    "&name="+URLEncoder.encode(map.get("name"),"utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
```

