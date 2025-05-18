---
title: Java 多用户即时通信系统
date: 2021-12-20 18:44:12
permalink: /pages/13e019/
categories:
  - java
tags:
  - java
---
# Java 多用户即时通信系统

## 涉及到Java各个方面的技术

+ 项目框架设计
+ java面向对象编程
+ 网络编程
+ 多线程
+ IO流
+ Mysql/使用集合充当内存数据库

### 需求分析

1. 用户登录
2. 拉取在线用户列表
3. 无异常退出(客户端、服务端)
4. 私聊
5. 群聊
6. 发文件
7. 服务器推送新闻

## 界面设计

![01](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/01.png)

## 功能实现-用户登录

![02](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/02.png)

## 功能实现-拉取在线用户列表

![03](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/03.png)

## 功能实现-无异常退出

![04](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/04.png)

## 功能实现-私聊

![05](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/05.png)

![06](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/06.png)

![12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/07.png)

## 功能实现-群聊

![12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/08.png)

![12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/09.png)

## 功能实现-发文件

![12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/10.png)

![12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/11.png)

## 功能实现-服务器推送新闻

![12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/12.png)

![12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/13.png)

![12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting@master/studynotes/java/images/Users/14.png)

## 代码实现

+ 服务端:

```java
package com.qqcommon;

import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  16:32
 * 表示客户端和服务端通信时的消息对象
 */
public class Message implements Serializable {
    private static final long serialVersionUID=1L;

    private String sender;//发送者
    private String getter;//接收者
    private String content;//消息内容
    private String sendTime;//发送时间
    private String MesType;//消息类型[可以在接口定义消息类型]


    //进行扩展和文件相关的成员
    private byte[] fileBytes;
    private int fileLen=0;
    private String dest;//将文件传输到哪里
    private String src;//源文件路径

    public byte[] getFileBytes() {
        return fileBytes;
    }

    public void setFileBytes(byte[] fileBytes) {
        this.fileBytes = fileBytes;
    }

    public int getFileLen() {
        return fileLen;
    }

    public void setFileLen(int fileLen) {
        this.fileLen = fileLen;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getGetter() {
        return getter;
    }

    public void setGetter(String getter) {
        this.getter = getter;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSendTime() {
        return sendTime;
    }

    public void setSendTime(String sendTime) {
        this.sendTime = sendTime;
    }

    public String getMesType() {
        return MesType;
    }

    public void setMesType(String mesType) {
        MesType = mesType;
    }
}

```

```java
package com.qqcommon;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  16:47
 */
public interface MessageType {
    //1.在接口中定义了一些常量
    //2.不同的常量的值，表示不同的消息类型。
    String MESSAGE_LOGIN_SUCCEED="1";//表示登陆成功
    String MESSAGE_LOGIN_FAIL="2";//表示登陆失败
    String MESSAGE_COME_MES="3";//普通信息包
    String MESSAGE_GET_ONLINE_FRIEND="4";//要求返回在线用户列表
    String MESSAGE_RET_ONLINE_FRIEND="5";//返回在线用户列表
    String MESSAGE_CLIENT_EXIT="6";//客户端请求退出
    String MESSAGE_TO_ALL_MES="7";//群发消息包
    String MESSAGE_FILE_MES="8";//文件消息(发送文件)


}

```

```java
package com.qqcommon;

import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  16:32
 * 表示一个用户信息
 */
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String userId;//用户ID/用户名
    private String passwd;//用户密码

    public User(String userId, String passwd) {
        this.userId = userId;
        this.passwd = passwd;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}

```

```java
package com.qqserver.service;

import java.util.HashMap;
import java.util.Iterator;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  20:38
 * 该类用于管理和客户端通信的线程
 */
public class ManageClientThread {
    private static HashMap<String, ServerConnectClientThread> hm = new HashMap<>();

    //返回
    public static HashMap<String, ServerConnectClientThread> getHm() {
        return hm;
    }

    //添加线程对象到 hm 集合
    public static void addClientThread(String userId, ServerConnectClientThread serverConnectClientThread) {
        hm.put(userId, serverConnectClientThread);


    }

    //根据userId 返回serverConnectClientThread线程
    public static ServerConnectClientThread getServerConnectClientThread(String userId) {
        return hm.get(userId);

    }

    //增加一个方法，从集合中，移除掉某个线程对象
    public static void removeServerConnectClientThread(String userId) {
        hm.remove(userId);
    }

    //编写方法，可以返回在线用户列表
    public static String getOnlineUser() {
        //集合遍历,遍历hashmap 的key
        Iterator<String> iterator = hm.keySet().iterator();
        String onlineUserList = "";
        while (iterator.hasNext()) {
            onlineUserList += iterator.next().toString() + " ";

        }
        return onlineUserList;
    }
}

```

```java
package com.qqserver.service;

import com.qqcommon.Message;
import com.qqcommon.MessageType;
import com.qqcommon.User;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  20:04
 * 这是服务器，在监听9999，等待客户端的连接，并保持通信
 */
public class QQServer {


    private ServerSocket ss=null;
    //创建一个集合，存放多个用户，如果是这些用户登录，就认为是合法
    //这里我们也可以使用 ConcurrentHashMap,可以处理并发的集合，没有线程安全
    //HashMap 没有处理线程安全 因此在多线程情况下是不安全
    //ConcurrentHashMap 处理的线程安全，即线程同步处理，在多线程情况下是安全


    private static ConcurrentHashMap<String,User> validUsers=new ConcurrentHashMap<>();
    private static ConcurrentHashMap<String, ArrayList<Message>> offLineDb=new ConcurrentHashMap<>();


    static {//在静态代码块初始化 validUsers

        validUsers.put("100",new User("100","123456"));
        validUsers.put("200",new User("200","123456"));
        validUsers.put("300",new User("300","123456"));
        validUsers.put("至尊宝",new User("至尊宝","123456"));
        validUsers.put("紫霞仙子",new User("紫霞仙子","123456"));
        validUsers.put("菩提老祖",new User("菩提老祖","123456"));

    }



    //验证用户是否有效的方法
    private boolean checkUser(String userid,String passwd){

        User user = validUsers.get(userid);
        //过关的验证方式
        if(user==null){//说明userid没有存在validUsers 的key中
            return false;

        }
        if(!user.getPasswd().equals(passwd)){//userId正确，但是密码错误
            return false;

        }
        return true;

    }



    public QQServer(){
        //注意：端口可以写在配置文件
        try {
            System.out.println("服务器在9996端口监听...");
            //启动推送服务线程
            new Thread(new SendNewsToAllService()).start();
            ss=new ServerSocket(9996);
            while (true) {//当和某个客户端连接后，会继续监听，因此while
                Socket socket = ss.accept();//如果没有客户端连接，就会阻塞在这里

                //得到socket关联的对象输入流
                ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());

                //得到socket关联的对象输出流
                ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
                User u=(User) ois.readObject();//读取客户端发送的User对象
                //创建一个Message对象，准备回复客户端
                Message message = new Message();
                //验证
                if(checkUser(u.getUserId(),u.getPasswd())){//登陆通过
                    message.setMesType(MessageType.MESSAGE_LOGIN_SUCCEED);
                    //将message对象回复
                    oos.writeObject(message);
                    //创建一个线程，和客户端保持通信,该线程需要持有socket对象
                    ServerConnectClientThread serverConnectClientThread =
                            new ServerConnectClientThread(socket, u.getUserId());
                    //启动该线程
                    serverConnectClientThread.start();
                    //把该线程对象，放入到一个集合中，进行管理。
                    ManageClientThread.addClientThread(u.getUserId(),serverConnectClientThread);


                }else {//登陆失败
                    System.out.println("用户 id="+ u.getUserId()+" pwd="+u.getPasswd()+"验证失败");
                    message.setMesType(MessageType.MESSAGE_LOGIN_FAIL);
                    oos.writeObject(message);
                    //关闭socket
                    socket.close();

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //如果服务器退出了while,说明服务器端不在监听，因此关闭ServerSocket
            try {
                ss.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```

```java
package com.qqserver.service;

import com.qqcommon.Message;
import com.qqcommon.MessageType;
import com.utils.Utility;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/10  18:06
 */
public class SendNewsToAllService implements Runnable {

    @Override
    public void run() {

        //为了可以推送多次新闻使用while循环
        while (true) {
            System.out.println("请输入服务器要推送的新闻/消息[输入exit表示退出推送服务]");
            String news = Utility.readString(100);
            if("exit".equals(news)){
                break;
            }
            //构建一个消息，群发消息
            Message message = new Message();
            message.setSender("服务器");
            message.setMesType(MessageType.MESSAGE_TO_ALL_MES);
            message.setContent(news);
            message.setSendTime(new Date().toString());
            System.out.println("服务器推送消息给所有人说：" + news);

            //遍历当前所有的通信线程，得到socket，并发送message

            HashMap<String, ServerConnectClientThread> hm = ManageClientThread.getHm();
            Iterator<String> iterator = hm.keySet().iterator();
            while (iterator.hasNext()) {
                String onLineUserId = iterator.next().toString();
                try {
                    ObjectOutputStream oos = new ObjectOutputStream(hm.get(onLineUserId).getSocket().getOutputStream());
                    oos.writeObject(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }


            }
        }
    }
}

```

```java
package com.qqserver.service;

import com.qqcommon.Message;
import com.qqcommon.MessageType;
import com.sun.org.apache.bcel.internal.generic.NEW;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.HashMap;
import java.util.Iterator;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  20:23
 * 该类对应的对象和某个客户端保持通信
 */
public class ServerConnectClientThread extends Thread {
    private Socket socket;
    private String userId;//连接到服务端的用户id

    public ServerConnectClientThread(Socket socket, String userId) {
        this.socket = socket;
        this.userId = userId;
    }

    public Socket getSocket() {
        return socket;
    }

    @Override
    public void run() {//这里线程处于run的状态，可以发送/接收消息
        while (true) {
            try {
                System.out.println("服务端和客户端" + userId + "保持通信，读取数据...");
                ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
                Message message = (Message) ois.readObject();
                //后面会使用message,根据message的类型，做相应的业务处理
                if (message.getMesType().equals(MessageType.MESSAGE_GET_ONLINE_FRIEND)) {
                    //客户端要在线用户列表
                    /*
                    在线用户列表形式 100 200 紫霞仙子
                     */
                    System.out.println(message.getSender() + "要在线用户列表");
                    String onlineUser = ManageClientThread.getOnlineUser();
                    //返回message
                    //构建一个Message 对象，返回给客户端
                    Message message2 = new Message();
                    message2.setMesType(MessageType.MESSAGE_RET_ONLINE_FRIEND);
                    message2.setContent(onlineUser);
                    message2.setGetter(message.getSender());
                    //返回给客户端
                    ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
                    oos.writeObject(message2);
                }else if(message.getMesType().equals(MessageType.MESSAGE_COME_MES)){
                    //根据message获取getterId,然后在得到对应线程
                    ServerConnectClientThread serverConnectClientThread =
                            ManageClientThread.getServerConnectClientThread(message.getGetter());
                    //在得到对应socket的对象输出流 ，将message对象转发给指定的客户端
                    ObjectOutputStream oos =
                            new ObjectOutputStream(serverConnectClientThread.getSocket().getOutputStream());
                    oos.writeObject(message);//转发，提示如果客户不在线，可以保存到数据库,这样就可以实现离线留言
                } else if(message.getMesType().equals(MessageType.MESSAGE_TO_ALL_MES)){
                    //需要遍历 管理线程的集合，把所有的线程的socket都得到,然后把message进行转发即可
                    HashMap<String, ServerConnectClientThread> hm = ManageClientThread.getHm();


                    Iterator<String> iterator = hm.keySet().iterator();
                    while (iterator.hasNext()){
                        //取出在线用户的Id
                        String onLineUserId= iterator.next().toString();
                        if(!onLineUserId.equals(message.getSender())){//排除群发消息的用户

                            //进行转发message
                            ObjectOutputStream oos =
                                    new ObjectOutputStream(hm.get(onLineUserId).getSocket().getOutputStream());
                            oos.writeObject(message);




                        }

                    }

                }else if(message.getMesType().equals(MessageType.MESSAGE_FILE_MES)){
                    //根据getterId 获取对应的线程，将message对象转发
                    ObjectOutputStream oos = new ObjectOutputStream(ManageClientThread.getServerConnectClientThread(message.getGetter()).getSocket().getOutputStream());
                    oos.writeObject(message);

                }
                else if (message.getMesType().equals(MessageType.MESSAGE_CLIENT_EXIT)) {//客户端退出

                    System.out.println(message.getSender() + "退出");
                    //将这个客户端对应线程，从集合删除
                    ManageClientThread.removeServerConnectClientThread(message.getSender());
                    socket.close();//关闭连接
                    //退出线程
                    break;
                } else {
                    System.out.println("其他类型的message,暂时不处理");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }


    }
}

```

```java
package com.utils;



/**
 工具类的作用:
 处理各种情况的用户输入，并且能够按照程序员的需求，得到用户的控制台输入。
 */

import java.util.*;
/**


 */
public class Utility {
    //静态属性。。。
    private static Scanner scanner = new Scanner(System.in);


    /**
     * 功能：读取键盘输入的一个菜单选项，值：1——5的范围
     * @return 1——5
     */
    public static char readMenuSelection() {
        char c;
        for (; ; ) {
            String str = readKeyBoard(1, false);//包含一个字符的字符串
            c = str.charAt(0);//将字符串转换成字符char类型
            if (c != '1' && c != '2' &&
                    c != '3' && c != '4' && c != '5') {
                System.out.print("选择错误，请重新输入：");
            } else break;
        }
        return c;
    }

    /**
     * 功能：读取键盘输入的一个字符
     * @return 一个字符
     */
    public static char readChar() {
        String str = readKeyBoard(1, false);//就是一个字符
        return str.charAt(0);
    }
    /**
     * 功能：读取键盘输入的一个字符，如果直接按回车，则返回指定的默认值；否则返回输入的那个字符
     * @param defaultValue 指定的默认值
     * @return 默认值或输入的字符
     */

    public static char readChar(char defaultValue) {
        String str = readKeyBoard(1, true);//要么是空字符串，要么是一个字符
        return (str.length() == 0) ? defaultValue : str.charAt(0);
    }

    /**
     * 功能：读取键盘输入的整型，长度小于2位
     * @return 整数
     */
    public static int readInt() {
        int n;
        for (; ; ) {
            String str = readKeyBoard(10, false);//一个整数，长度<=10位
            try {
                n = Integer.parseInt(str);//将字符串转换成整数
                break;
            } catch (NumberFormatException e) {
                System.out.print("数字输入错误，请重新输入：");
            }
        }
        return n;
    }
    /**
     * 功能：读取键盘输入的 整数或默认值，如果直接回车，则返回默认值，否则返回输入的整数
     * @param defaultValue 指定的默认值
     * @return 整数或默认值
     */
    public static int readInt(int defaultValue) {
        int n;
        for (; ; ) {
            String str = readKeyBoard(10, true);
            if (str.equals("")) {
                return defaultValue;
            }

            //异常处理...
            try {
                n = Integer.parseInt(str);
                break;
            } catch (NumberFormatException e) {
                System.out.print("数字输入错误，请重新输入：");
            }
        }
        return n;
    }

    /**
     * 功能：读取键盘输入的指定长度的字符串
     * @param limit 限制的长度
     * @return 指定长度的字符串
     */

    public static String readString(int limit) {
        return readKeyBoard(limit, false);
    }

    /**
     * 功能：读取键盘输入的指定长度的字符串或默认值，如果直接回车，返回默认值，否则返回字符串
     * @param limit 限制的长度
     * @param defaultValue 指定的默认值
     * @return 指定长度的字符串
     */

    public static String readString(int limit, String defaultValue) {
        String str = readKeyBoard(limit, true);
        return str.equals("")? defaultValue : str;
    }


    /**
     * 功能：读取键盘输入的确认选项，Y或N
     * 将小的功能，封装到一个方法中.
     * @return Y或N
     */
    public static char readConfirmSelection() {
        System.out.println("请输入你的选择(Y/N): 请小心选择");
        char c;
        for (; ; ) {//无限循环
            //在这里，将接受到字符，转成了大写字母
            //y => Y n=>N
            String str = readKeyBoard(1, false).toUpperCase();
            c = str.charAt(0);
            if (c == 'Y' || c == 'N') {
                break;
            } else {
                System.out.print("选择错误，请重新输入：");
            }
        }
        return c;
    }

    /**
     * 功能： 读取一个字符串
     * @param limit 读取的长度
     * @param blankReturn 如果为true ,表示 可以读空字符串。
     * 					  如果为false表示 不能读空字符串。
     *
     *	如果输入为空，或者输入大于limit的长度，就会提示重新输入。
     * @return
     */
    private static String readKeyBoard(int limit, boolean blankReturn) {

        //定义了字符串
        String line = "";

        //scanner.hasNextLine() 判断有没有下一行
        while (scanner.hasNextLine()) {
            line = scanner.nextLine();//读取这一行

            //如果line.length=0, 即用户没有输入任何内容，直接回车
            if (line.length() == 0) {
                if (blankReturn) return line;//如果blankReturn=true,可以返回空串
                else continue; //如果blankReturn=false,不接受空串，必须输入内容
            }

            //如果用户输入的内容大于了 limit，就提示重写输入
            //如果用户如的内容 >0 <= limit ,我就接受
            if (line.length() < 1 || line.length() > limit) {
                System.out.print("输入长度（不能大于" + limit + "）错误，请重新输入：");
                continue;
            }
            break;
        }

        return line;
    }
}

```

+ 客户端：

```java
package com.qqcommon;

import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  16:32
 * 表示客户端和服务端通信时的消息对象
 */
public class Message implements Serializable {
    private static final long serialVersionUID=1L;

    private String sender;//发送者
    private String getter;//接收者
    private String content;//消息内容
    private String sendTime;//发送时间
    private String MesType;//消息类型[可以在接口定义消息类型]


    //进行扩展和文件相关的成员
    private byte[] fileBytes;
    private int fileLen=0;
    private String dest;//将文件传输到哪里
    private String src;//源文件路径

    public byte[] getFileBytes() {
        return fileBytes;
    }

    public void setFileBytes(byte[] fileBytes) {
        this.fileBytes = fileBytes;
    }

    public int getFileLen() {
        return fileLen;
    }

    public void setFileLen(int fileLen) {
        this.fileLen = fileLen;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getGetter() {
        return getter;
    }

    public void setGetter(String getter) {
        this.getter = getter;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSendTime() {
        return sendTime;
    }

    public void setSendTime(String sendTime) {
        this.sendTime = sendTime;
    }

    public String getMesType() {
        return MesType;
    }

    public void setMesType(String mesType) {
        MesType = mesType;
    }
}

```

```java
package com.qqcommon;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  16:47
 */
public interface MessageType {
    //1.在接口中定义了一些常量
    //2.不同的常量的值，表示不同的消息类型。
    String MESSAGE_LOGIN_SUCCEED="1";//表示登陆成功
    String MESSAGE_LOGIN_FAIL="2";//表示登陆失败
    String MESSAGE_COME_MES="3";//普通信息包
    String MESSAGE_GET_ONLINE_FRIEND="4";//要求返回在线用户列表
    String MESSAGE_RET_ONLINE_FRIEND="5";//返回在线用户列表
    String MESSAGE_CLIENT_EXIT="6";//客户端请求退出
    String MESSAGE_TO_ALL_MES="7";//群发消息包
    String MESSAGE_FILE_MES="8";//文件消息(发送文件)


}

```

```java
package com.qqcommon;

import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  16:32
 * 表示一个用户信息
 */
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String userId;//用户ID/用户名
    private String passwd;//用户密码

    public User(String userId, String passwd) {
        this.userId = userId;
        this.passwd = passwd;
    }
    public User(){}

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}

```

```java
package com.qqcommon.qqclient.service;

import com.qqcommon.Message;
import com.qqcommon.MessageType;

import java.awt.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.net.Socket;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  18:20
 */
public class ClientConnectServerThread extends Thread {
    //该线程需要持有Socket
    private Socket socket;
    //构造器可以接受一个Socket对象
    public ClientConnectServerThread(Socket socket){
        this.socket=socket;
    }

    @Override
    public void run() {
        //因为Thread需要在后台和服务器通信，因此我们while循环
        while (true){
            try {
                System.out.println("客户端线程，等待从读取从服务器发送的消息");
                ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
                //如果服务器没有发送Message对象，线程会阻塞在这里
                Message message =(Message) ois.readObject();
                //注意，后面我们需要使用message
                //判断message类型，然后做相应的业务处理
                //如果是读取的是服务端返回的在线用户列表
                if(message.getMesType().equals(MessageType.MESSAGE_RET_ONLINE_FRIEND)){
                    //取出在线列表信息，并显示
                    //规定
                    String[] onlineUsers = message.getContent().split(" ");
                    System.out.println("\n=========当前在线用户列表如下=========");
                    for (int i = 0; i < onlineUsers.length; i++) {
                        System.out.println("用户："+onlineUsers[i]);
                    }

                }else if(message.getMesType().equals(MessageType.MESSAGE_COME_MES)){//普通的聊天消息
                    //把从服务器端转发的消息，显示到控制台即可
                    System.out.println("\n"+message.getSender()+" 对 "+message.getGetter()+" 说："+message.getContent());


                }else if(message.getMesType().equals(MessageType.MESSAGE_TO_ALL_MES)){
                    //显示在客户端的控制台
                    System.out.println("\n"+message.getSender()+" 对大家说: "+message.getContent());


                }else if(message.getMesType().equals(MessageType.MESSAGE_FILE_MES)){//如果是文件消息
                    System.out.println("\n"+message.getSender()+" 给 "+message.getGetter()
                    + "发文件："+message.getSrc()+" 到我的电脑目录 "+message.getDest());

                    //取出message的字节数组，通过文件输出流写出到磁盘
                    FileOutputStream fileOutputStream = new FileOutputStream(message.getDest());
                    fileOutputStream.write(message.getFileBytes());
                    fileOutputStream.close();
                    System.out.println("\n 保存文件成功");

                } else{
                    System.out.println("是其他类型的message,暂时不处理..");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

    //为了方便得到Socket
    public Socket getSocket(){
        return socket;
    }
}

```

```java
package com.qqcommon.qqclient.service;

import com.qqcommon.Message;
import com.qqcommon.MessageType;

import java.io.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/10  16:46
 * 该类完成文件传输服务
 */
public class FileClientService {
    /**
     *
     * @param src 源文件
     * @param dest  把该文件传输到对方分哪个目录
     * @param senderId  发送用户id
     * @param getterId  接受用户id
     */

    public void sendFileToOne(String src,String dest,String senderId,String getterId) throws IOException {

        //读取src文件 -->message
        Message message = new Message();
        message.setMesType(MessageType.MESSAGE_FILE_MES);
        message.setSender(senderId);
        message.setGetter(getterId);
        message.setSrc(src);
        message.setDest(dest);

        //需要将文件读取
        FileInputStream fileInputStream=null;
        byte[] fileBytes=new byte[(int)new File(src).length()];

        try {
            fileInputStream = new FileInputStream(src);
            fileInputStream.read(fileBytes);//将src文件读入到程序的字节数组
            //将文件对应的字节数组设置message
            message.setFileBytes(fileBytes);
       } catch (Exception e) {
            e.printStackTrace();
        }finally {
            //关闭
            if(fileInputStream!=null){
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
        //提示信息
        System.out.println("\n"+senderId+" 给 "+getterId+"发送文件："+src+" 到对方的电脑目录 "+dest);
        //发送
        ObjectOutputStream oos = new ObjectOutputStream(ManageClientConnectServerThread.getClientConnectServerThread(senderId).getSocket().getOutputStream());
        oos.writeObject(message);


    }
}

```

```java
package com.qqcommon.qqclient.service;

import java.util.HashMap;
import java.util.HashSet;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  19:41
 * 该类管理客户端连接到服务器端的线程的类
 */
public class ManageClientConnectServerThread {
    //我们把多个线程放入一个HashMap的集合中，key就是用户的id,value  就是线程
    private static HashMap<String,ClientConnectServerThread> hm=new HashMap<>();

    //将某个线程加入到集合中
    public static void addClientConnectServerThread(String userId,ClientConnectServerThread clientConnectServerThread){
        hm.put(userId,clientConnectServerThread);
    }

    //通过userId，可以得到对应的线程
    public static ClientConnectServerThread getClientConnectServerThread(String userId){
        return hm.get(userId);
    }




}

```

```java
package com.qqcommon.qqclient.service;

import com.qqcommon.Message;
import com.qqcommon.MessageType;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Date;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/10  11:14
 * 该类/对象，提供和消息相关的服务方法
 */
public class MessageClientService {
    /**
     *
     * @param content 内容
     * @param senderId 发送者
     */

    public void  sendMessageToAll(String content,String senderId){
        Message message = new Message();
        message.setMesType(MessageType.MESSAGE_TO_ALL_MES);//群发消息这种类型
        message.setSender(senderId);
        message.setContent(content);
        message.setSendTime(new Date().toString());//发送时间设置到message对象
        System.out.println(senderId+" 对大家说 "+content);
        //发送给服务端

        try {
            ObjectOutputStream oos = new ObjectOutputStream(ManageClientConnectServerThread.getClientConnectServerThread(senderId).getSocket().getOutputStream());
            oos.writeObject(message);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    /**
     *
     * @param content 内容
     * @param senderId 发送用户Id
     * @param getterId 接受用户Id
     */

    public void sendMessageToOne(String content,String senderId,String getterId){
        //构建message
        Message message = new Message();
        message.setMesType(MessageType.MESSAGE_COME_MES);//普通的聊天消息
        message.setSender(senderId);
        message.setGetter(getterId);
        message.setContent(content);
        message.setSendTime(new Date().toString());//发送时间设置到message对象
        System.out.println(senderId+" 对 "+getterId+" 说 "+content);
        //发送给服务端

        try {
            ObjectOutputStream oos =
                    new ObjectOutputStream(ManageClientConnectServerThread.getClientConnectServerThread(senderId).getSocket().getOutputStream());
            oos.writeObject(message);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}

```

```java
package com.qqcommon.qqclient.service;

import com.qqcommon.Message;
import com.qqcommon.MessageType;
import com.qqcommon.User;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  17:54
 * 该类完成用户登陆验证和用户注册等功能
 */
public class UserClientService {
    //因为我们可能在其他地方使用user信息，因此作出成员属性
    private User u = new User();
    //根据userId 和 pwd 到服务器验证该用户是否合法
    private Socket socket;

    //根据userId 和 pwd 到服务验证该用户是否合法
    public boolean checkUser(String userId, String pwd) throws Exception {

        boolean b = false;
        //创建User对象
        u.setUserId(userId);
        u.setPasswd(pwd);

        //连接服务器，发送u对象

        socket = new Socket(InetAddress.getByName("127.0.0.1"), 9996);
        //得到ObjectOutputStream对象
        ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
        oos.writeObject(u);//发送User对象

        //读取从服务器回复的Message对象
        ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
        Message ms = (Message) ois.readObject();

        if (ms.getMesType().equals(MessageType.MESSAGE_LOGIN_SUCCEED)) {//登陆成功


            //创建一个 和服务器端保持通信的线程 ->创建一个类 ClientConnectServerThread
            //等待...

            ClientConnectServerThread clientConnectServerThread = new ClientConnectServerThread(socket);
            //启动客户端的线程
            clientConnectServerThread.start();
            //这里为了后面客户端的扩展，我们将线程放入到集合管理
            ManageClientConnectServerThread.addClientConnectServerThread(userId, clientConnectServerThread);

            b = true;


        } else {
            //如果登陆失败,我们就不能启动和服务器通信的线程，关闭socket
            socket.close();

        }
        return b;


    }

    //向服务器端请求在线用户列表
    public void onlineFriendList() {

        //发送一个Message,类型MESSAGE_GET_ONLINE_FRIEND
        Message message = new Message();
        message.setMesType(MessageType.MESSAGE_GET_ONLINE_FRIEND);
        message.setSender(u.getUserId());
        //发给服务器

        try {
            //从管理线程的集合中，通过userId,得到这个线程对象
            ClientConnectServerThread clientConnectServerThread =
                    ManageClientConnectServerThread.getClientConnectServerThread(u.getUserId());
            //得到这个线程得到关联的socket
            Socket socket = clientConnectServerThread.getSocket();
            //应该得到当前线程的Socket 对应的ObjectOutputStream对象
            ObjectOutputStream oos =
                    new ObjectOutputStream(socket.getOutputStream());
            oos.writeObject(message);//发送一个message对象，像服务器要求在线用户列表
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    //编写方法，退出客户端，并给服务端发送一个退出系统的message对象
    public void logout() {
        Message message = new Message();
        message.setMesType(MessageType.MESSAGE_CLIENT_EXIT);
        message.setSender(u.getUserId());//一定要指定是哪个客户端

        //发送message
        try {
            //ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
            ObjectOutputStream oos = new ObjectOutputStream(ManageClientConnectServerThread.getClientConnectServerThread(u.getUserId()).getSocket().getOutputStream());
            oos.writeObject(message);
            System.out.println(u.getUserId() + "退出了系统..");
            System.exit(0);//结束进程
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

```java
package com.qqcommon.qqclient.utils;



/**
 工具类的作用:
 处理各种情况的用户输入，并且能够按照程序员的需求，得到用户的控制台输入。
 */

        import java.util.*;
/**


 */
public class Utility {
    //静态属性。。。
    private static Scanner scanner = new Scanner(System.in);


    /**
     * 功能：读取键盘输入的一个菜单选项，值：1——5的范围
     * @return 1——5
     */
    public static char readMenuSelection() {
        char c;
        for (; ; ) {
            String str = readKeyBoard(1, false);//包含一个字符的字符串
            c = str.charAt(0);//将字符串转换成字符char类型
            if (c != '1' && c != '2' &&
                    c != '3' && c != '4' && c != '5') {
                System.out.print("选择错误，请重新输入：");
            } else break;
        }
        return c;
    }

    /**
     * 功能：读取键盘输入的一个字符
     * @return 一个字符
     */
    public static char readChar() {
        String str = readKeyBoard(1, false);//就是一个字符
        return str.charAt(0);
    }
    /**
     * 功能：读取键盘输入的一个字符，如果直接按回车，则返回指定的默认值；否则返回输入的那个字符
     * @param defaultValue 指定的默认值
     * @return 默认值或输入的字符
     */

    public static char readChar(char defaultValue) {
        String str = readKeyBoard(1, true);//要么是空字符串，要么是一个字符
        return (str.length() == 0) ? defaultValue : str.charAt(0);
    }

    /**
     * 功能：读取键盘输入的整型，长度小于2位
     * @return 整数
     */
    public static int readInt() {
        int n;
        for (; ; ) {
            String str = readKeyBoard(10, false);//一个整数，长度<=10位
            try {
                n = Integer.parseInt(str);//将字符串转换成整数
                break;
            } catch (NumberFormatException e) {
                System.out.print("数字输入错误，请重新输入：");
            }
        }
        return n;
    }
    /**
     * 功能：读取键盘输入的 整数或默认值，如果直接回车，则返回默认值，否则返回输入的整数
     * @param defaultValue 指定的默认值
     * @return 整数或默认值
     */
    public static int readInt(int defaultValue) {
        int n;
        for (; ; ) {
            String str = readKeyBoard(10, true);
            if (str.equals("")) {
                return defaultValue;
            }

            //异常处理...
            try {
                n = Integer.parseInt(str);
                break;
            } catch (NumberFormatException e) {
                System.out.print("数字输入错误，请重新输入：");
            }
        }
        return n;
    }

    /**
     * 功能：读取键盘输入的指定长度的字符串
     * @param limit 限制的长度
     * @return 指定长度的字符串
     */

    public static String readString(int limit) {
        return readKeyBoard(limit, false);
    }

    /**
     * 功能：读取键盘输入的指定长度的字符串或默认值，如果直接回车，返回默认值，否则返回字符串
     * @param limit 限制的长度
     * @param defaultValue 指定的默认值
     * @return 指定长度的字符串
     */

    public static String readString(int limit, String defaultValue) {
        String str = readKeyBoard(limit, true);
        return str.equals("")? defaultValue : str;
    }


    /**
     * 功能：读取键盘输入的确认选项，Y或N
     * 将小的功能，封装到一个方法中.
     * @return Y或N
     */
    public static char readConfirmSelection() {
        System.out.println("请输入你的选择(Y/N): 请小心选择");
        char c;
        for (; ; ) {//无限循环
            //在这里，将接受到字符，转成了大写字母
            //y => Y n=>N
            String str = readKeyBoard(1, false).toUpperCase();
            c = str.charAt(0);
            if (c == 'Y' || c == 'N') {
                break;
            } else {
                System.out.print("选择错误，请重新输入：");
            }
        }
        return c;
    }

    /**
     * 功能： 读取一个字符串
     * @param limit 读取的长度
     * @param blankReturn 如果为true ,表示 可以读空字符串。
     * 					  如果为false表示 不能读空字符串。
     *
     *	如果输入为空，或者输入大于limit的长度，就会提示重新输入。
     * @return
     */
    private static String readKeyBoard(int limit, boolean blankReturn) {

        //定义了字符串
        String line = "";

        //scanner.hasNextLine() 判断有没有下一行
        while (scanner.hasNextLine()) {
            line = scanner.nextLine();//读取这一行

            //如果line.length=0, 即用户没有输入任何内容，直接回车
            if (line.length() == 0) {
                if (blankReturn) return line;//如果blankReturn=true,可以返回空串
                else continue; //如果blankReturn=false,不接受空串，必须输入内容
            }

            //如果用户输入的内容大于了 limit，就提示重写输入
            //如果用户如的内容 >0 <= limit ,我就接受
            if (line.length() < 1 || line.length() > limit) {
                System.out.print("输入长度（不能大于" + limit + "）错误，请重新输入：");
                continue;
            }
            break;
        }

        return line;
    }
}

```

```java
package com.qqcommon.qqclient.view;

import com.qqcommon.MessageType;
import com.qqcommon.qqclient.service.FileClientService;
import com.qqcommon.qqclient.service.MessageClientService;
import com.qqcommon.qqclient.service.UserClientService;
import com.qqcommon.qqclient.utils.Utility;

import java.io.IOException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/7  17:13
 * 客户端的菜单界面
 */
@SuppressWarnings({"all"})
public class QQView {


    private boolean loop = true;//控制是否显示菜单
    private String key = "";//接受用户
    private UserClientService userClientService=new UserClientService();//对象是用于登陆服务器
    private MessageClientService messageClientService=new MessageClientService();//对象用户私聊
    private FileClientService fileClientService=new FileClientService();//该对象用于传输文件

    public static void main(String[] args) throws Exception {
        new QQView().mainMenu();
    }

    //显示主菜单
    private void mainMenu() throws Exception {
        while (loop) {
            System.out.println("==============欢迎登陆网络通信系统=================");
            System.out.println("\t\t 1 登陆系统");
            System.out.println("\t\t 9 退出系统");
            System.out.print("请输入你的选择：");
            key = Utility.readString(1);
            //根据用户的输入，来处理不同的逻辑
            switch (key) {
                case "1":
                    System.out.print("请输入用户号：");
                    String userId=Utility.readString(50);
                    System.out.print("请输入密  码：");
                    String pwd=Utility.readString(50);
                    //需要到服务端去验证该用户是否合法

                    if(userClientService.checkUser(userId,pwd)){
                        System.out.println("================欢迎(用户"+userId+"登陆成功)===================");
                        //进入到二级菜单
                        while (loop){
                            System.out.println("\n============网络通信系统二级菜单(用户"+userId+")==========");
                            System.out.println("\t\t 1 显示在线用户列表");
                            System.out.println("\t\t 2 群发消息");
                            System.out.println("\t\t 3 私聊消息");
                            System.out.println("\t\t 4 发送文件");
                            System.out.println("\t\t 9 退出系统");
                            System.out.print("请输入你的选择：");
                            key=Utility.readString(1);
                            switch (key){
                                case "1":
                                    //这里老师准备写一个方法，来获取在线用户列表
                                    userClientService.onlineFriendList();
                                    break;
                                case "2":
                                    System.out.println("请输入想对大家说的话：");
                                    String s = Utility.readString(100);
                                    //调用一个方法，将消息封装成message对象
                                    messageClientService.sendMessageToAll(s,userId);
                                    break;
                                case "3":
                                    System.out.print("请输入想聊天的用户号(在线)：");
                                    String getterId = Utility.readString(50);
                                    System.out.println("请输入想说的话：");
                                    String content = Utility.readString(100);
                                    //编写一个方法，将消息发送给服务端
                                    messageClientService.sendMessageToOne(content,userId,getterId);

                                    break;
                                case "4":
                                    System.out.print("请输入你想把文件发送给的用户(在线用户):");
                                    getterId = Utility.readString(50);
                                    System.out.print("请输入发送文件的路径(形式 d:\\xx.jpg)");
                                    String src = Utility.readString(100);
                                    System.out.print("请输入把文件发送到对应的路径(形式 d:\\yy.jpg)");
                                    String dest  = Utility.readString(100);
                                    fileClientService.sendFileToOne(src,dest,userId,getterId);


                                    break;
                                case "9":
                                    //调用方法，给服务器发送一个退出系统的message
                                    userClientService.logout();
                                    loop=false;
                                    break;
                            }


                        }

                    }else {//登录服务器失败
                        System.out.println("=========登陆失败=========");


                    }

                    break;
                case "9":
                    loop=false;
                    break;

            }
        }

    }
}

```

