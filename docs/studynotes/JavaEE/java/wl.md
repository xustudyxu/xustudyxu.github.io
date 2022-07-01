---
title: Java 网络编程
date: 2021-12-20 18:44:12
permalink: /pages/c5fffc/
categories:
  - java
tags:
  - java
---
# Java 网络编程

## 网络的相关概念

### 网络通信

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/01.png)

### 网络

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/02.png)

### 地址

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/03.png)

### ipv4 地址分类

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/04.png)

### 域名

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/06.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/05.png)

### 网络通信协议

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/07.png)

+ TCP/IP

**TCP/IP (Transmission Control Protocol/Internet Protocol)的简写,中文译名为传输控制协议/因特网互联协议,又叫网络通讯协议,这个协议是lnternet最基本的协议、Internet国际互联网络的基础,简单地说，就是由网络层的IP协议和传输层的TCP协议组成的。**[示意图]

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/09.png)

### 网络通信协议的相关概念

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/08.png)

### TCP和UDP

+ **TCP协议：传输控制协议**

1. <font color=#0099ff size=4 face="黑体">使用TCP协议前,须先建立TCP连接,形成传输数据通道</font>
2. <font color=#0099ff size=3 face="黑体">传输前,采用"三次握手"方式</font>，**是可靠的**
3. <font color=#0099ff size=3 face="黑体">TCP协议进行通信的两个应用进程:客户端、服务端</font>
4. <font color=#0099ff size=3 face="黑体">在连接中可进行大数据量的传输</font>
5. <font color=#0099ff size=3 face="黑体">传输完毕,需释放已建立的连接</font>,**效率低**

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/01.gif)

+ **UDP协议：用户数据协议**

1. <font color=#0099ff size=3 face="黑体">将数据、源、目的封装成数据包,不需要建立连接</font>

2. <font color=#0099ff size=3 face="黑体">每个数据报的大小限制在64K内,不适合传输大量数据</font>

3. <font color=#0099ff size=3 face="黑体">因无需连接</font>，**故是不可靠的**

4. <font color=#0099ff size=3 face="黑体">发送数据结束时无需释放资源(因为不是面向连接的)，速度快</font>

5. 举例:厕所通知:发短信


![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/10.png)

## InetAddress 类

### 相关方法

1. **获取本机InetAddress对象getLocalHost**
2. **根据指定主机名/域名获取ip地址对象getByName**
3. **获取InetAddress对象的主机名getHostName**
4. **获取InetAddress对象的地址 getHostAddress**

### 应用案例

+ 代码演示:

```java
package com.study;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/2  10:24
 * 演示InetAddress 类的使用
 */
@SuppressWarnings({"all"})
public class API_ {
    public static void main(String[] args) throws UnknownHostException {

        //1.获取本机的InetAddress 对象
        InetAddress localHost = InetAddress.getLocalHost();
        System.out.println(localHost);//FRXcomputer/169.254.32.235

        //2.根据指定的主机名，获取 InetAddress对象
        InetAddress host1 = InetAddress.getByName("FRXcomputer");
        System.out.println("host1="+host1);//host1=FRXcomputer/169.254.32.235

        //3.根据一个域名返回 InetAddress对象，比如 www.baidu.com 对应
        InetAddress host2 = InetAddress.getByName("www.baidu.com");
        System.out.println("host2"+host2);//www.baidu.com 110.242.68.4


        //4.通过 InetAddress 对象，获取对应的地址
        String hostAddress=host2.getHostAddress();
        System.out.println("host对应的ip="+hostAddress);//110.242.68.4

        //5.通过 InetAddress 对象，获取对应的主机名/或者的域名
        String hostHome=host2.getHostName();
        System.out.println("host2对应的主机名/域名="+hostHome);//www.baidu.com


    }
}

```

## Socket

### 基本介绍

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/11.png)

+ 示意图:

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/12.png)

## TCP 网络通信编程

### 基本介绍

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/13.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/14.png)

### 应用案例 1(使用字节流)

1. 编写一个服务器端，和一个客户端
2. 服务器端在9999端口接听
3. 客户端连接到服务器端，发送"hello,server",然后退出
4. 服务器端接收到客户端发送给的信息，输出，并退出

+ 代码演示:

```java
package com.study.socket;

import javax.xml.ws.Service;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/2  21:45
 */
public class SocketTCP01Server {
    public static void main(String[] args) throws IOException {

        //思路
        //1.在本机的9999端口监听，等待连接
        //细节：要求在本机没有其他服务在监听9999
        //细节：这个ServerSocket 可以通过accept() 返回多个Socket[多个客户端连接服务器的并发]
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端，在9999端口监听，等待连接..");

        //2.当没有客户端连接9999端口时，程序会 阻塞，等待连接
        //如果有客户端连接，则会返回Socket对象，程序继续
        Socket socket = serverSocket.accept();

        System.out.println("服务端socket="+socket.getClass());

        //3.通过socket.getInputStream() 读取客户端写入到数据通道的数据，显示
        InputStream inputStream = socket.getInputStream();

        //IO读取
        byte[] buf=new byte[1024];
        int readLen=0;
        while ((readLen=inputStream.read(buf))!=-1){
            System.out.println(new String(buf,0,readLen));//根据读取到的实际长度，显示内容。

        }

        //5.关闭流和socket
        inputStream.close();
        socket.close();
        serverSocket.close();
    }
}

```

```java
package com.study.socket;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/3  9:54
 */
public class SocketTCP01Client {
    public static void main(String[] args) throws IOException {

        //思路
        //1.连接服务器(ip,端口)
        //解读：连接本机的9999端口，如果连接成功，返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(),9999);
        System.out.println("客户端socket返回="+socket.getClass());
        //2.当没有客户端连接9999端口时，程序会阻塞，等待连接
        // 得到和 socket对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();
        //3.通过输出流，写入数据到数据通道
        outputStream.write("hello,server".getBytes());
        //4.关闭流对象和socket，必须关闭
        outputStream.close();
        socket.close();
        System.out.println("客户端退出了.....");
    }
}

```

### 应用案例 2(使用字节流) 

1. 编写一个服务器端，和一个客户端
2. 服务器端在9999端口接听
3. 客户端连接到服务器端，发送"hello,server",并接收到服务器端回发的"hello,client",在退出
4. 服务器端接收到客户端发送给的信息，输出，并发送"hello,client",再退出

+ 代码演示：

```java
package com.study.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/2  21:45
 */
@SuppressWarnings({"all"})
public class SocketTCP02Server {
    public static void main(String[] args) throws IOException {

        //思路
        //1.在本机的9999端口监听，等待连接
        //细节：要求在本机没有其他服务在监听9999
        //细节：这个ServerSocket 可以通过accept() 返回多个Socket[多个客户端连接服务器的并发]
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端，在9999端口监听，等待连接..");

        //2.当没有客户端连接9999端口时，程序会 阻塞，等待连接
        //如果有客户端连接，则会返回Socket对象，程序继续
        Socket socket = serverSocket.accept();

        System.out.println("服务端socket="+socket.getClass());

        //3.通过socket.getInputStream() 读取客户端写入到数据通道的数据，显示
        InputStream inputStream = socket.getInputStream();

        //IO读取
        byte[] buf=new byte[1024];
        int readLen=0;
        while ((readLen=inputStream.read(buf))!=-1){
            System.out.println(new String(buf,0,readLen));//根据读取到的实际长度，显示内容。

        }
        //5.获取socket相关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello,client".getBytes());
        // 设置写入标记
        socket.shutdownOutput();

        //6.关闭流和socket
        outputStream.close();
        inputStream.close();
        socket.close();
        serverSocket.close();
    }
}

```

```java
package com.study.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/3  9:54
 */
@SuppressWarnings({"all"})
public class SocketTCP02Client {
    public static void main(String[] args) throws IOException {

        //思路
        //1.连接服务器(ip,端口)
        //解读：连接本机的9999端口，如果连接成功，返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(),9999);
        System.out.println("客户端socket返回="+socket.getClass());
        //2.当没有客户端连接9999端口时，程序会阻塞，等待连接
        // 得到和 socket对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();
        //3.通过输出流，写入数据到数据通道
        outputStream.write("hello,server".getBytes());
        // 设置结束标记
        socket.shutdownOutput();

        //4.获取和socket相关联的输入流。读取数据(字节)，并显示
        InputStream inputStream = socket.getInputStream();

        byte[] buf=new byte[1024];
        int readLen=0;
        while ((readLen=inputStream.read(buf))!=-1){
            System.out.println(new String(buf,0,readLen));
        }
        //5.关闭流对象和socket，必须关闭
        outputStream.close();
        socket.close();
        System.out.println("客户端退出了.....");
    }
}

```

### 应用案例 3(使用字符流)

1. 编写一个服务器端，和一个客户端
2. 服务器端在9999端口接听
3. 客户端连接到服务器端，发送"hello,server",并接收到服务器端回发的"hello,client",在退出
4. 服务器端接收到客户端发送给的信息，输出，并发送"hello,client",再退出

+ 代码演示:

```java
package com.study.socket;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/2  21:45
 * //使用字符流方式读写
 */
@SuppressWarnings({"all"})
public class SocketTCP03Server {
    public static void main(String[] args) throws IOException {

        //思路
        //1.在本机的9999端口监听，等待连接
        //细节：要求在本机没有其他服务在监听9999
        //细节：这个ServerSocket 可以通过accept() 返回多个Socket[多个客户端连接服务器的并发]
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端，在9999端口监听，等待连接..");

        //2.当没有客户端连接9999端口时，程序会 阻塞，等待连接
        //如果有客户端连接，则会返回Socket对象，程序继续
        Socket socket = serverSocket.accept();

        System.out.println("服务端socket="+socket.getClass());

        //3.通过socket.getInputStream() 读取客户端写入到数据通道的数据，显示
        InputStream inputStream = socket.getInputStream();
        //IO读取 使用字符流读取
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String s=bufferedReader.readLine();
        System.out.println(s);//输出

        //5.获取socket相关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        // 使用字符输出流的方式回复信息
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
        bufferedWriter.write("hello client 字符流");
        bufferedWriter.newLine();//插入一个换行符，表示回复内容的结束
        bufferedWriter.flush();//注意需要手动刷新


        //6.关闭流和socket
        bufferedReader.close();
        bufferedWriter.close();
        socket.close();
        serverSocket.close();
    }
}

```

```java
package com.study.socket;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/3  9:54
 * //使用字符流方式读写
 */
@SuppressWarnings({"all"})
public class SocketTCP03Client {
    public static void main(String[] args) throws IOException {

        //思路
        //1.连接服务器(ip,端口)
        //解读：连接本机的9999端口，如果连接成功，返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        System.out.println("客户端socket返回=" + socket.getClass());
        //2.当没有客户端连接9999端口时，程序会阻塞，等待连接
        // 得到和 socket对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();
        //3.通过输出流，写入数据到数据通道，使用字符流
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
        bufferedWriter.write("hello,server 字符流");
        bufferedWriter.newLine();//插入一个换行符，表示写入的内容结束，注意，要求对方使用readLine()!!!!
        bufferedWriter.flush();//如果使用的字符流，需要手动刷新，否则数据不会写入数据通道


        // 设置结束标记
        socket.shutdownOutput();

        //4.获取和socket相关联的输入流。读取数据(字节)，并显示
        InputStream inputStream = socket.getInputStream();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String s= bufferedReader.readLine();
        System.out.println(s);
        //5.关闭流对象和socket，必须关闭
        bufferedReader.close();

        bufferedWriter.close();
        socket.close();
        System.out.println("客户端退出了.....");
    }
}

```

### 应用案例 4

1. 编写一个服务端,和一个客户端
2. 服务器端在8888端口监听
3. 客户端连接到服务端，发送一张图片e:\\\qq.png
4. 服务器端接收到客户端发送的图片，保存到 src下,发送"收到图片”再退出
5. 客户端接收到服务端发送的“收到图片”，再退出
6. 该程序要求使用StreamUtils.java,我们直接使用

+ 代码演示:

```java
package com.study.upload;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * 此类用于演示关于流的读写方法
 *
 */
public class StreamUtils {
	/**
	 * 功能：将输入流转换成byte[]， 即可以把文件的内容读入到byte[]
	 * @param is
	 * @return
	 * @throws Exception
	 */
	public static byte[] streamToByteArray(InputStream is) throws Exception{
		ByteArrayOutputStream bos = new ByteArrayOutputStream();//创建输出流对象
		byte[] b = new byte[1024];//字节数组
		int len;
		while((len=is.read(b))!=-1){//循环读取
			bos.write(b, 0, len);//把读取到的数据，写入bos	
		}
		byte[] array = bos.toByteArray();//然后将bos 转成字节数组
		bos.close();
		return array;
	}
	/**
	 * 功能：将InputStream转换成String
	 * @param is
	 * @return
	 * @throws Exception
	 */
	
	public static String streamToString(InputStream is) throws Exception{
		BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		StringBuilder builder= new StringBuilder();
		String line;
		while((line=reader.readLine())!=null){
			builder.append(line+"\r\n");
		}
		return builder.toString();
		
	}

}

```

```java
package com.study.upload;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/3  14:37
 */
public class TCPFileUploadServer {
    public static void main(String[] args) throws Exception {

        //1.服务端在本机监听8888端口
        ServerSocket serverSocket = new ServerSocket(8888);
        System.out.println("服务端在8888端口监听....");
        //2.等待连接
        Socket socket = serverSocket.accept();


        //3.读取客户端发送的数据
        //  通过Socket得到输入流
        BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
        byte[] bytes=StreamUtils.streamToByteArray(bis);
        //4.将得到 bytes 数组，写入到指定的路径，就得到一个文件了
        String destFilePath="src\\qq2.png";
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(destFilePath));
        bos.write(bytes);
        bos.close();

        //向客户端回复"收到图片"
        //通过socket 获取到输出流(字符)
        BufferedWriter br = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        br.write("收到图片");
        br.flush();//把内容刷新到数据通道
        socket.shutdownOutput();//设置写入结束标记




        //关闭其他资源
        bis.close();
        socket.close();
        serverSocket.close();



    }
}

```

```java
package com.study.upload;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/3  14:38
 */
public class TCPFileUploadClient {
    public static void main(String[] args) throws Exception {

        //客户端连接服务器端 8888，得到Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 8888);
        //创建读取磁盘文件的输入流
        String filePath="e:\\qq.png";
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(filePath));

        //bytes就是filePath对应的字节数组

        byte[] bytes = StreamUtils.streamToByteArray(bis);

        //通过socket获取到输出流，将bytes数据发送给服务端
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());
        bos.write(bytes);//将对应的字节数组的内容，写入到数据通道
        bis.close();
        socket.shutdownOutput();//设置写入数据的结束标记

        //=======接受从服务端回复的消息

        InputStream inputStream = socket.getInputStream();
        //使用StreamUtils的方法，直接将InputStream 读取到的内容 转成字符串
        String s = StreamUtils.streamToString(inputStream);
        System.out.println(s);


        //关闭相关的流
        socket.close();
        bos.close();


    }
}

```

### netstat 指令

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/15.png)

### TCP 网络通讯不为人知的秘密

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/16.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/17.png)

## UDP 网络通信编程[了解]

### 基本介绍

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/18.png)

### 基本流程

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/19.png)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/20.png)

### 应用案例

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/21.png)

+ 代码演示:

```java
package com.study.udp;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/4  9:38
 */
public class UDPReceiverA {
    public static void main(String[] args) throws IOException {

        //1.创建一个DatagramSocket 对象，准备在9999接收数据
        DatagramSocket socket = new DatagramSocket(9999);
        //2.构建一个 DatagramPacket 对象，准备接收数据
        byte[] buf=new byte[1024];
        DatagramPacket packet = new DatagramPacket(buf, buf.length);
        //3.调用 接收方法，将通过网络传输的 DatagramPacket 对象
        //   填充到 packet对象
        //当有数据包发送到 本机的9999端口时，就会接收到数据
        //如果没有数据包发送到 本机的9999端口，就会堵塞等待.
        System.out.println("接收端A 等待接收数据..");
        socket.receive(packet);

        //4.可以把packet 进行拆包，取出数据，并显示。
        int length=packet.getLength();//实际接收到的数据长度
        byte[] data = packet.getData();

        String s = new String(data, 0, length);
        System.out.println(s);
        //===回复信息给B端
        //将需要发送的数据，封装到 DatagramPacket 对象
        data="好的，明天见~".getBytes();
        //说明：封装的 DatagramPacket 对象data 内容字节数组，data.length ,主机(IP)，端口
         packet = new DatagramPacket(data, data.length, InetAddress.getByName("192.168.43.179"), 9998);
        socket.send(packet);

        //5.关闭资源
        socket.close();
        System.out.println("A端退出");


    }
}

```

```java
package com.study.udp;

import java.io.IOException;
import java.net.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/4  9:38
 * 发送端B====>也可以接收数据
 */
@SuppressWarnings({"all"})
public class UDPSenderB {
    public static void main(String[] args) throws IOException {
        //1.创建 DatagramSocket 对象，准备在9998端口 接收数据
        DatagramSocket socket = new DatagramSocket(9998);

        //2.将需要发送的数据，封装到 DatagramPacket 对象
        byte[] data="hello 明天吃火锅~".getBytes();
        //说明：封装的 DatagramPacket 对象data 内容字节数组，data.length ,主机(IP)，端口
        DatagramPacket packet = new DatagramPacket(data, data.length, InetAddress.getByName("192.168.43.179"), 9999);
        socket.send(packet);

        //3.===接受从A端回复的信息
        //(1)构建一个 DatagramPacket 对象，准备接收数据
        byte[] buf=new byte[1024];
        packet = new DatagramPacket(buf, buf.length);
        //(2)调用 接收方法，将通过网络传输的 DatagramPacket 对象
        //   填充到 packet对象
        //当有数据包发送到 本机的9998端口时，就会接收到数据
        //如果没有数据包发送到 本机的9998端口，就会堵塞等待.
        socket.receive(packet);

        //(3)可以把packet 进行拆包，取出数据，并显示。
        int length=packet.getLength();//实际接收到的数据长度
        data = packet.getData();
        String s = new String(data, 0, length);
        System.out.println(s);


        //关闭资源
        socket.close();
        System.out.println("B端退出");



    }
}

```

## 本章作业

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/wl/22.png)

+ 代码演示：

```java
package com.study.homework;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * 此类用于演示关于流的读写方法
 *
 */
public class StreamUtils {
	/**
	 * 功能：将输入流转换成byte[]， 即可以把文件的内容读入到byte[]
	 * @param is
	 * @return
	 * @throws Exception
	 */
	public static byte[] streamToByteArray(InputStream is) throws Exception{
		ByteArrayOutputStream bos = new ByteArrayOutputStream();//创建输出流对象
		byte[] b = new byte[1024];//字节数组
		int len;
		while((len=is.read(b))!=-1){//循环读取
			bos.write(b, 0, len);//把读取到的数据，写入bos	
		}
		byte[] array = bos.toByteArray();//然后将bos 转成字节数组
		bos.close();
		return array;
	}
	/**
	 * 功能：将InputStream转换成String
	 * @param is
	 * @return
	 * @throws Exception
	 */
	
	public static String streamToString(InputStream is) throws Exception{
		BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		StringBuilder builder= new StringBuilder();
		String line;
		while((line=reader.readLine())!=null){
			builder.append(line+"\r\n");
		}
		return builder.toString();
		
	}

}

```

```java
package com.study.homework;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/4  10:41
 * 先写文件下载的服务端
 */
public class Homework01Server {
    public static void main(String[] args) throws Exception {

        //1. 监听 9999端口
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端，在9999端口监听，等待下载文件..");
        //2.等待客户端连接
        Socket socket = serverSocket.accept();
        //3.读取 客户端发送要下载的文件名
        //这里使用循环读取文件名，是考虑将来客户端发送的数据文件名较大的情况
        InputStream inputStream = socket.getInputStream();
        byte[] b = new byte[1024];
        int len = 0;
        String downloadFileName = "";
        while ((len = inputStream.read(b)) != -1) {
            downloadFileName += new String(b, 0, len);

        }
        System.out.println("客户端希望下载的文件名=" + downloadFileName);

        //在服务器上有两个文件， 接受客户端输入 发如雪  如果客户端输入其他信息 下载最长的电影

        String resFileName = "";
        if ("发如雪".equals(downloadFileName)) {
            resFileName = "src\\发如雪.mgg";
        } else {
            resFileName = "src\\最长的电影.mgg";
        }

        //4.创建一个输入流，读取文件
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(resFileName));


        //5.使用工具类StreamUtils，读取文件到一个字节数组

        byte[] bytes = StreamUtils.streamToByteArray(bis);
        //6.得到Socket关联的输出流
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());

        //7.写入到数据通道
        bos.write(bytes);
        socket.shutdownOutput();

        //8.关闭相关的资源
        bis.close();
        inputStream.close();
        socket.close();
        serverSocket.close();
    }
}

```

```java
package com.study.homework;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/4  11:10
 * 文件下载的客户端
 */
public class Homework01Client {
    public static void main(String[] args) throws Exception {

        //1.接受用户的输入，指定下载文件名
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入下载文件名");
        String downloadFileName=scanner.next();

        //2.客户端连接服务器，准备发送
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);

        //3.获取和Socked关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write(downloadFileName.getBytes());
        //设置写入结束的标志
        socket.shutdownOutput();

        //4.读取服务端返回的文件(字节数据)
        BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());

        byte[] bytes = StreamUtils.streamToByteArray(bis);

        //5.得到一个输出流，准备将bytes写入到磁盘文件

        String filePath="d:\\"+downloadFileName+".mgg";
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
        bos.write(bytes);

        //6.关闭相关的资源
        bos.close();
        bis.close();
        outputStream.close();
        socket.close();

        System.out.println("客户端下载完毕，正确退出...");


    }
}
```

:smile:









