---
title: Java IO流
date: 2021-12-20 18:44:12
permalink: /pages/25d9ee/
categories:
  - java
tags:
  - java
---
# Java IO流

## 文件

### 什么是文件

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/01.png)

### 文件流

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/02.png)

## 常用的文件操作

### 创建文件对象相关构造器和方法

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/03.png)

+ 代码演示：

```java
package com.file;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;

//演示创建文件
public class FileCreate {
    public static void main(String[] args) {

    }
    //方式一 new File(String pathname)
    @Test
    public void create01() {
        String filePath = "E:\\news1.txt";
        File file = new File(filePath);
        try {
            file.createNewFile();
            System.out.println("文件创建成功");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
        //方式二 new File(File parent,String child)//根据父目录文件+子路径构建
        //e:\\news2.txt
    @Test
        public void create02() {
            File parentFile = new File("e:\\");
            String filename="news2.txt";
            //这里的file对象，在Java程序中，只是一个对象
            //只有执行了createNewFile 方法，才会真正的，在磁盘创建该文件
            File file = new File(parentFile, filename);
            try {
                file.createNewFile();
                System.out.println("创建成功~");
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        //方式三 new File(String parent,String child)//根据父目录+子路径构建
    @Test
    public void create03(){
        String parentPath="e:\\";
        String fileName="news3.txt";
        File file = new File(parentPath, fileName);
        try {
            file.createNewFile();
            System.out.println("创建成功~~");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    }


```

### 获取文件的相关信息

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/04.png)

### 应用案例演示 FileInformation.java

+ 代码演示:

```java
package com.file;

import org.junit.jupiter.api.Test;

import java.io.File;

public class FileInformation {
    public static void main(String[] args) {

    }
    //获取文件信息
    @Test
    public void info(){
        //先创建文件对象
        File file = new File("e:\\news1.txt");
        //调用相应的方法，得到对相应信息
        System.out.println("文件名字="+file.getName());
        //getName.getAbsolutePath,getParent,length,exists,isFile,isDirectory
        System.out.println("文件的绝对路径="+file.getAbsolutePath());
        System.out.println("文件父级路径="+file.getParent());
        System.out.println("文件大小(按字节)="+file.length());//14
        System.out.println("文件是否存在="+file.exists());//T
        System.out.println("是不是一个文件="+file.isFile());//T
        System.out.println("是不是一个目录="+file.isDirectory());//F
    }
}

```

### 目录的操作和文件删除

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/05.png)

### 应用案例演式

1. 判断e:\\\news1.txt是否存在，如果存在就删除
2. 判断 D:\\\demo02是否存在，存在就删除,否则提示不存在
3. 判断D:\\\demo\\\a\\\b\\\c目录是否存在，如果存在就提示已经存在，否则就创建

+ 代码演示：

```java
package com.file;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
@SuppressWarnings({"all"})
public class Directory {
    public static void main(String[] args) {

    }
    //判断d:\news1.txt 是否存在 如果存在 就删除 否则提示不存在
    @Test
    public void m1(){


        String filePath="e:\\news1.txt";
        File file = new File(filePath);
        if(file.exists()){//是否存在
           if (file.delete()){//删除 返回boolean值
               System.out.println(filePath+"删除成功");
           }else {
               System.out.println(filePath+"删除失败");
           }
        }else {
            System.out.println("该文件不存在");
        }
    }
    //判断d:\demo02 是否存在 存在就删除 否则提示不存在
    //这里我们需要体会到，在java编程中，目录也被当作文件
   @Test
    public void m2(){


       String filePath="d:\\demo02";
       File file = new File(filePath);
       if(file.exists()){//是否存在
           if (file.delete()){//删除 返回boolean值
               System.out.println(filePath+"删除成功");
           }else {
               System.out.println(filePath+"删除失败");
           }
       }else {
           System.out.println("该目录不存在");
       }
   }


    //判断D:\\demo\\a\\b\\c目录是否存在，如果存在就提示已经存在，否则就创建
    @Test
    public void m3(){


    String directoryPath="D:\\demo\\a\\b\\c";
    File file = new File(directoryPath);
       if(file.exists()){//是否存在
           System.out.println(directoryPath+"存在...");
    }else {
        if(file.mkdirs()){//mkdirs()创建多级目录
            System.out.println(directoryPath+"该目录创建成功...");
        }else {
            System.out.println(directoryPath+"该目录创建失败...");
        }
    }
}

}

```

## IO 流原理及流的分类

### Java IO 流原理

1. **I/O是Input/Output的缩写，I/O技术是非常实用的技术，用于处理数据传输。如读/写文件，网络通讯等。**
2. **Java程序中，对于数据的输入/输出操作以”流(stream)”的方式进行。**
3. **java.io包下提供了各种“流”类和接口，用以获取不同种类的数据,并通过方法输入或输出数据。**
4. **输入input:读取外部数据(磁盘、光盘等存储设备的数据)到程序(内存)中。**
5. **输出output:将程序(内存)数据输出到磁盘、光盘等存储设备中。**

### 流的分类

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/06.png)

## IO 流体系图-常用的类

### FileInputStream 介绍

1 . IO流体系图

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/07.png)

2. 文件VS流

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/08.png)


### FileInputStream 应用实例

+ 代码演示

```java
package com.inputstream_;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/18  21:00
 * 演示FileInputStream的使用(字节输入流 文件-> 程序)
 */
@SuppressWarnings({"all"})
public class FileInputStream_ {
    public static void main(String[] args) {

    }

    @Test
    //单个字节的读取
    public void readFile01() {
        String filePath = "e:\\hello.txt";
        int readData = 0;
        FileInputStream fileInputStream = null;
        try {
            //创建 FileInputStream 对象，用于读取文件
            fileInputStream = new FileInputStream(filePath);
            //从该输入流读取一个字节的数据。如果没有输入可用，此方法将阻止。
            while ((readData = fileInputStream.read()) != -1)
                //如果返回-1，表示读取完
            {
                System.out.print((char) readData);//转成char显示
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //关闭文件流，释放资源。
            try {
                fileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }

    @Test
    //使用read(byte[] b)来读取文件，提高效率
    public void readFile02() {
        String filePath = "e:\\hello.txt";
        int readData=0;
        byte[] buf=new byte[8];//一次读取八个字节，
        int readLen=0;
        FileInputStream fileInputStream = null;
        try {
            //创建 FileInputStream 对象，用于读取文件
            fileInputStream = new FileInputStream(filePath);
            //从该输入流读取最多b.length字节的数据到字节数组。
            //如果返回-1，表示读取完毕
            //如果读取正常，返回实际读取的字节数
            while ((readLen=fileInputStream.read(buf)) != -1) {
                System.out.print(new String(buf,0,readLen));//转成字符显示

            }


        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //关闭文件流，释放资源。
            try {
                fileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}

```

### FileOutputStream 介绍

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/09.png)

### FileOutputStream 应用实例

+ 代码实现:

```java
package com.outpustream_;

import org.junit.jupiter.api.Test;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/25  10:10
 * 演示使用FileOutputStream 将数据写到文件中
 * 如果该文件不存在，则创建该文件
 */
public class FileOutputStream_ {
    public static void main(String[] args) {

    }
    @Test
    public void writeFile(){

        //创建FileOutputStream对象
        String filePath="e:\\a.txt";

        FileOutputStream fileOutputStream=null;
        try {

            //1.new FileOutputStream(filePath)创建方式，当写入内容时，会覆盖原来的内容
            //2.new FileOutputStream(filePath,true)创建方式，当写入内容时，是追加到文件后面
            fileOutputStream = new FileOutputStream(filePath);

            //写入一个字节
//            fileOutputStream.write('H');

            //写入字符串
            String str="hello world!";
            //str.getBytes() 可以把字符串 -> 字节数组
//            fileOutputStream.write(str.getBytes());
//            write(byte[] b,int off,int len) 将len字节从位于偏移量 off的指定字节数组

            fileOutputStream.write(str.getBytes(),0,str.length());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fileOutputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}

```

### FileOutputStream 应用实例2

+ 代码演示:

```java
package com.outpustream_;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/25  16:46
 */
public class FileCopy {
    public static void main(String[] args) {
        //完成 文件拷贝
        //1.创建文件的输入流，将文件读入到程序
        //2.创建文件的输出流，将读取的文件数据，写入到指定的文件


        String srcFilePath="e:\\hello.txt";
        String destFilePath="d:\\hello.txt";
        FileInputStream fileInputStream=null;
        FileOutputStream fileOutputStream =null;

        try {
                fileInputStream=new FileInputStream(srcFilePath);
                fileOutputStream=new FileOutputStream(destFilePath);

                //定义一个字节数组，提高读取效果
            byte[] buf=new byte[1024];
            int readLen=0;
            while ((readLen=fileInputStream.read(buf)) !=-1){
                //读取到后，就写入到文件 通过 fileOutputStream
                // 即，是一边读，一边写
                fileOutputStream.write(buf,0,readLen);//一定要使用这个方法

            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            {
                //关闭输入流和输出流，释放资源
                if(fileInputStream!=null){
                    try {
                        fileInputStream.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}

```

### FileReader 和 FileWriter 介绍

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/10.png)

### FileReader 和 FileWriter 应用案例：

+ 代码实现：

```java
package com.read_;

import org.junit.jupiter.api.Test;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/25  17:27
 */
public class FileReader_ {
    public static void main(String[] args) {
    }
    @Test
    public void readFile01(){
        String filePath="e:\\story.txt";
        FileReader fileReader=null;
        int data=0;
        //1.创建FileReader对象
        try {
            fileReader=new FileReader(filePath);
            //循环读取 使用 read 单个字符读取
            while ((data=fileReader.read())!=-1){
                System.out.print((char) data);

            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(fileReader!=null){
                try {
                    fileReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @Test
    public void readFile02(){
        String filePath="e:\\story.txt";
        FileReader fileReader=null;
        int readLen=0;
        char buf[]=new char[8];
        //1.创建FileReader对象
        try {
            fileReader=new FileReader(filePath);
            //循环读取 使用 read(buf) 返回的是实际读取到的字符数
            //如果返回-1 说明文件结束
            while ((readLen=fileReader.read(buf))!=-1){
                System.out.print(new String(buf,0,readLen));

            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(fileReader!=null){
                try {
                    fileReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

```

+ 代码演示:

```java
package com.writer_;

import java.io.FileWriter;
import java.io.IOException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/25  17:52
 */
public class FileWriter_ {
    public static void main(String[] args) {

        String filePath="e:\\note.txt";
        //创建FileWriter对象
        FileWriter fileWriter=null;
        char chars[]={'a','b','c'};
        try {
             fileWriter = new FileWriter(filePath);//默认是覆盖
             //write(int):写入单个字符
            fileWriter.write('H');

            //write(char[]) 写入指定数组
            fileWriter.write(chars);

            //write(char[],off,len):写入指定的数组的指定部分
            fileWriter.write("hhhhhhhhhh".toCharArray(),0,3);

            //write(sting):写入整个字符串
            fileWriter.write("你好。北京~");

            //write(string,off,len); 写入字符串的指定部分
            fileWriter.write("上海天津",0,2);
            //在数据量大情况下，可以使用循环操作

        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            //对应FileWriter,一定要关闭流，或者flush 才能真正的把数据写入到文件
            /*
         private void writeBytes() throws IOException {
                this.bb.flip();
                int var1 = this.bb.limit();
                int var2 = this.bb.position();

                assert var2 <= var1;

                int var3 = var2 <= var1 ? var1 - var2 : 0;
                if (var3 > 0) {
                    if (this.ch != null) {
                        assert this.ch.write(this.bb) == var3 : var3;
                    } else {
                        this.out.write(this.bb.array(), this.bb.arrayOffset() + var2, var3);
                    }
                }

                this.bb.clear();
            }
             */
            try {
                //fileWriter.flush()
                //关闭文件流，等价 flush()+关闭
                fileWriter.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```

## 节点流和处理流

### 基本介绍

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/11.png)

### 节点流和处理流一览图

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/12.png)

### 节点流和处理流的区别和联系

1. **节点流是底层流/低级流,直接跟数据源相接**。
2. **处理流(包装流)包装节点流，既可以消除不同节点流的实现差异，也可以提供更方
   便的方法来完成输入输出。[源码理解]**
3. **处理流(也叫包装流)对节点流进行包装，使用了修饰器设计模式，不会直接与数据
   源相连[模拟修饰器设计模式=》小伙伴就会非常清楚.]**

### 处理流的功能主要体现在以下两个方面:

1. **性能的提高:主要以增加缓冲的方式来提高输入输出的效率。**
2. **操作的便捷:处理流可能提供了一系列便捷的方法来一次输入输出大批量的数据,使
   用更加灵活方便。**

### 处理流-BufferedReader 和 BufferedWriter

+ BufferedReader 和 BufferedWriter属于字符流，是按照字符来读取数据的
+ 关闭时处理流,只需要关闭外层流即可[后面看源码]

+ 代码演示:

```java
package com.read_;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/26  20:43
 */
public class BufferedReader_ {
    public static void main(String[] args) throws Exception {

        String filePath="e:\\a.java";
        //创建bufferedReader
        BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath));
        //读取
        String line;//按行读取，效率高
        //说明
        //1.bufferedReader.readLine() 是按行读取文件
        //2.当返回null时，表示文件读取完毕
        line=bufferedReader.readLine();
        while ((line=bufferedReader.readLine())!=null){
            System.out.println(line);
        }

        //关闭流,这里注意，只需要关闭BufferedReader，因为底层会自动的去关闭 节点流
        bufferedReader.close();

    }
}

```

+ 代码演示:

```java
package com.writer_;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/26  22:26
 */
public class BufferedWriter_ {
    public static void main(String[] args) throws Exception {
        String filePath="e:\\ok.txt";
        //创建BufferedWriter
        //说明：
        //1.new FileWriter(filePath,ture) 表示追加的方式写入
        //2.new FileWriter(filePath) ,表示覆盖的方式写入
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filePath));
        bufferedWriter.write("hello");
        bufferedWriter.newLine();//插入一个和系统相关的换行
        bufferedWriter.write("hello");
        bufferedWriter.newLine();//插入一个和系统相关的换行
        bufferedWriter.write("hello");
        //插入一个换行符

        //说明：关闭外层流即可，传入的new FileWriter(filePath),会在底层关闭
        bufferedWriter.close();

    }
}

```

+ 代码演示:  综合使用BufferedReader 和 BufferedWriter 完成文本文件拷贝

```java
package com.writer_;

import java.io.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  9:41
 */
public class BufferedCopy_ {
    public static void main(String[] args) {



        //说明：
        //1.BufferedReader和 BufferWriter 是按照字符操作
        //2.不要去操作二进制文件，可能造成文件的损坏

        String srcFilePath = "e:\\a.java";
        String destFilePath = "e:\\a2.java";
        BufferedReader br = null;
        BufferedWriter bw = null;
        String line;
        try {
            br = new BufferedReader(new FileReader(srcFilePath));
            bw = new BufferedWriter(new FileWriter(destFilePath));


            while ((line = br.readLine()) != null) {
                //每读取一行，就写入
                bw.write(line);
                //插入一个换行符
                bw.newLine();

            }
            System.out.println("拷贝完毕...");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //关闭流


            try {
                if (br != null) {
                    br.close();
                }
                if (bw != null) {
                    bw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }


        }
    }

}
```

### 处理流-BufferedInputStream 和 BufferedOutputStream

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/13.png)

### 介绍 BufferedOutputStream

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/14.png)

+ 代码演示：编程完成图片/音乐的拷贝	

```java
package com.outpustream_;

import java.io.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  10:15
 * 演示使用eam使用BufferedOutputStream 和 BufferedInputStream
 * 使用他们，可以完成二进制文件拷贝，
 * 思考：字节流可以操作二进制文件，可以操作文本文件吗？ OK
 */
public class BufferedCopy02 {
    public static void main(String[] args) {

        String srcFilePath="e:\\a.jpg";
        String destFilePath="e:\\b.jpg";

        //创建BufferedOutputStream 和 BufferedInputStream对象
        BufferedInputStream bis=null;
        BufferedOutputStream bos=null;

        try {
            //因为FileInputStream 是 InputStream 子类
            bis=new BufferedInputStream(new FileInputStream(srcFilePath));
            bos=new BufferedOutputStream(new FileOutputStream(destFilePath));

            //循环的读取文件，并写入到 destFilePath
            byte[] buff=new byte[1024];
            int readLen=0;
            //当返回 -1 时，就表示文件读取完毕

            while ((readLen=bis.read(buff))!=-1){
                bos.write(buff,0,readLen);

            }
            System.out.println("拷贝完毕...");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //关闭流，关闭外层的处理流即可，底层回去关闭节点流
            try {
                bis.close();
                bos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}

```

### 对象流-ObjectInputStream 和 ObjectOutputStream 

>看一个需求
>
>1. 将int num = 100这个 int数据保存到文件中,注意不是100 数字，而是int 100，并且，能够从文件中直接恢复int 100
>2. 将Dog dog = new Dog(“小黄”，3)这个 dog对象保存到文件中，并且能够从文件恢复.
>3. 上面的要求，就是能够将基本数据类型或者对象进行序列化和反序列化操作

+ **序列化和反序列化**
  1. **序列化就是在保存数据时，保存数据的值和数据类型**
  2. **反序列化就是在恢复数据时，恢复数据的值和数据类型**
  3. **需要让某个对象支持序列化机制，则必须让其类是可序列化的，为了让某个类是可序列化的，该类必须实现如下两个接口之一:**
     + **Serializable    //这是一个标记接口,没有方法**
     + **Externalizable    //该接口有方法需要实现，因此我们一般实现上面的Serializable接口**

![15](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/15.png)

### 对象流介绍

+ 功能：**提供了对基本类型或对象类型的序列化和反序列化的方法 **
+ **ObjectOutputStream 提供 序列化功能** 
+ **ObjectInputStream 提供 反序列化功能**

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/16.png)

+ 代码演示:

```java
package com.outpustream_;

import com.inputstream_.Dog;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  15:11
 * 演示ObjectOutputStream的使用，完成数据的序列化
 */
public class ObjectOutStream_ {
    public static void main(String[] args) throws Exception{
        //序列化后，保存的文件格式，不是存文本，而是按照他的格式来保存
            String filePath="e:\\data.txt";


        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));

        //序列化数据到e:\\data.txt
        oos.writeInt(100);//int ->Integer(实现了 Serializable)
        oos.writeBoolean(true); //boolean-> Boolean (实现了 Serializable)
        oos.writeChar('a');//char -> Character(实现了 Serializable)
        oos.writeDouble(10.3);//double ->Double  (实现了 Serializable)
        oos.writeUTF("frx");//String

        //保存一个dog对象
        oos.writeObject(new Dog("旺财",10,"日本","黄色"));

        oos.close();
        System.out.println("数据保存完毕(序列化形式)");

    }
}

```

```java
package com.inputstream_;

import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  15:41
 */
public class Dog implements Serializable {
    String name;
    int age;


    //序列化对象时，默认将里面所有的属性都进行序列化，但除了static和transient修饰的成员
    private static String nation;
    private transient String color;
    //SerializableUID 序列化的版本号，可以提高兼容性
    private static final long SerializableUID=1L;
    //序列化对象时，要求i面属性的类型也需要实现序列化接口
    private Master master=new Master();


    public Dog(String name, int age,String nation, String color) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.nation=nation;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", color='" + color + '\'' +
                '}'+nation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

```

```java
package com.inputstream_;

import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  15:59
 */
public class Master implements Serializable {
}

```



+ 代码演示: 使用ObejectInputStream读取data.txt

```java
package com.outpustream_;

import com.inputstream_.Dog;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  15:11
 * 演示ObjectOutputStream的使用，完成数据的序列化
 */
public class ObjectOutStream_ {
    public static void main(String[] args) throws Exception{
        //序列化后，保存的文件格式，不是存文本，而是按照他的格式来保存
            String filePath="e:\\data.txt";


        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath));

        //序列化数据到e:\\data.txt
        oos.writeInt(100);//int ->Integer(实现了 Serializable)
        oos.writeBoolean(true); //boolean-> Boolean (实现了 Serializable)
        oos.writeChar('a');//char -> Character(实现了 Serializable)
        oos.writeDouble(10.3);//double ->Double  (实现了 Serializable)
        oos.writeUTF("frx");//String

        //保存一个dog对象
        oos.writeObject(new Dog("旺财",10,"日本","黄色"));

        oos.close();
        System.out.println("数据保存完毕(序列化形式)");

    }
}

```

![17](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/17.png)

![18](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/18.png)

### 标准输入输出流

![19](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/19.png)

### 转换流-InputStreamReader 和 OutputStreamWriter

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/20.png)

+ 代码演示：

```java
package com.transformation;

import com.standrad.InputAndOutput;

import java.io.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  16:40
 * 演示使用 InputStreamReader 转换流解决中文乱码问题
 * 将字节流 FileInputStream 转成字符流 InputStreamReader,指定编码gbk/utf-8
 */
public class InputStreamReader_ {
    public static void main(String[] args) throws IOException {
        String filePath = "e:\\a.txt";
        //1. 把FileInputStream 转成 InputStreamReader
        //2. 指定编码 gbk

        //InputStreamReader isr = new InputStreamReader(new FileInputStream(filePath), "gbk");
        //3. 把 InputStreamReader 传入 BufferedReader
        //BufferedReader br = new BufferedReader(isr);

        //将2和3  合在一起
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath),"gbk"));


        //4.读取
        String s = br.readLine();
        System.out.println("读取到的内容"+s);
        br.close();



    }
}

```

+ 应用案例：把FileOutputStream 字节流，转成字符流OutputStreamWriter,对文件进行写入

```java
package com.transformation;

import java.io.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  17:05
 * 演示OutputStreamWriter的使用
 * 把FileOutputStream 字节流，转成字符流
 * 指定处理的编码gbk/utf-8/utf8
 */
public class OutputStreamWriter_ {
    public static void main(String[] args) throws IOException {
        String filePath="e:\\hsp.txt";
        String charset="utf-8";

        OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(filePath), "gbk");

        osw.write("hi,韩顺平教育");
        osw.close();
        System.out.println("按照 "+charset+"保存文件成功~");



    }
}

```

## 打印流-PrintStream 和 PrintWriter 

![21](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/21.png)

+ 代码演示:

```java
package com.printstream;

import java.io.IOException;
import java.io.PrintStream;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  17:18
 * 演示PrintStream(字节打印流)
 */
public class PrintStream_ {
    public static void main(String[] args) throws IOException {
        PrintStream out=System.out;
        //在默认情况下，PrintStream 输出数据的位置是 标准输出，即显示器

        /*
        public void print(String s) {
        if (s == null) {
            s = "null";
        }
        write(s);
    }
         */
        out.print("hello");
        //因为print底层使用的是write,所以我们可以直接调用write进行打印/输出
        out.write("hhh,hh".getBytes());

        out.close();

        //我们可以去修改打印输出流的位置/设备
        //1.输出修改成到e:\f1.txt
        //2.xxx 就会输出到e:\f1.txt
        //3. public static void setOut(PrintStream out) {
        //        checkIO();
        //        setOut0(out);//native 方法，修改了out
        //    }
        System.setOut(new PrintStream("e:\\f1.txt"));
        System.out.println("xxxX");
    }
}

```

+ 代码演示:  PrintWriter

```java
package com.printstream;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  17:31
 */
public class PrintWriter_ {
    public static void main(String[] args) throws IOException {

        //PrintWriter printWriter = new PrintWriter(System.out);
        PrintWriter printWriter = new PrintWriter(new FileWriter("e:\\f2.txt"));
        printWriter.print("hi,北京");
        printWriter.close();//flush + 关闭流 ，才会将数据写入到文件
    }
}

```

## Properties 类

### 看一个需求

> 如下一个配置文件 mysql.p'roperties
>
> ip=192.168.0.13
>
> user=root
>
> pwd=12345

> 请问编程读取ip,user和pwd的值时多少

> 分析：

> 1.传统的方法
>
> 2.使用Properties类可以方便实现

![22](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/22.png)

+ 代码演示: 传统方式

```java
package com.properties_;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  17:52
 */
public class Properties01 {
    public static void main(String[] args) throws IOException {

        //读取mysql.properties 文件，并得到ip,user和pwd
        BufferedReader br=new BufferedReader(new FileReader("src\\mysql.properties"));
        String line="";
        while ((line=br.readLine())!=null) {
            String[] split = line.split("=");
            //如果我们要求指定的ip值
            if("ip".equals(split[0])) {
                System.out.println(split[0] + "值是：" + split[1]);
            }
        }
        br.close();
    }
}

```

### 基本介绍

![23](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/io/23.png)

### 应用案例

1. 使用Properties类完成对mysql.properties的读取,看老师代码演示
2. 使用Properties类添加key-val 到新文件mysql2.properties中
3. 使用Properties类完成对mysql2.properties的读取，并修改某个key-val

+ 代码演示:

```java
package com.properties_;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  18:06
 */
public class Properties02 {
    public static void main(String[] args) throws IOException {
        //使用Properties 类来读取mysql.properties 文件

        //1.创建Properties对象
        Properties properties = new Properties();
        //2.加载指定配置文件
        properties.load(new FileReader("src\\mysql.properties"));
        //3.把k-v显示控制台
        properties.list(System.out);
        //4. 根据key 获取对应的值
        String user = properties.getProperty("user");
        String pwd = properties.getProperty("pwd");
        System.out.println("用户名="+user);
        System.out.println("密码是="+pwd);


    }
}

```

+ 代码演示: 

```java
package com.properties_;

import java.io.*;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/27  18:12
 */
public class Properties03 {
    public static void main(String[] args) throws IOException {
        //使用Properties 类来创建 配置文件，修改配置文件内容

        Properties properties = new Properties();
        //创建
        //如果该文件没有key，就是创建
        //如果该文件有key，就是修改
        /*
        Properties 父类是 Hashtable，底层就是Hashtable 核心方法
        public synchronized V put(K key, V value) {
                // Make sure the value is not null
                if (value == null) {
                    throw new NullPointerException();
                }

                // Makes sure the key is not already in the hashtable.
                Entry<?,?> tab[] = table;
                int hash = key.hashCode();
                int index = (hash & 0x7FFFFFFF) % tab.length;
                @SuppressWarnings("unchecked")
                Entry<K,V> entry = (Entry<K,V>)tab[index];
                for(; entry != null ; entry = entry.next) {
                    if ((entry.hash == hash) && entry.key.equals(key)) {
                        V old = entry.value;
                        entry.value = value;//如果key存在，就替换
                        return old;
                    }
                }

                addEntry(hash, key, value, index);//如果是新key，就addEntry
                return null;
            }
         */
        properties.setProperty("charset","utf8");
        properties.setProperty("user","汤姆");//注意保存时，是中文的 unicode值
        properties.setProperty("pwd","abc111");

        //将k-v 存储到文件中即可
        properties.store(new FileWriter("src\\mysql.properties"),null);
        System.out.println("保存配置文件成功~");




    }
}

```

