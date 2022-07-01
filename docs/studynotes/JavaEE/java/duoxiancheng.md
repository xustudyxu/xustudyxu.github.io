---
title: Java 多线程
date: 2021-12-20 18:44:12
permalink: /pages/005d24/
categories:
  - java
tags:
  - java
---
# Java 多线程

## 线程的相关概念

### 程序

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/01.png)

### 进程

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/02.png)

### 什么是线程

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/03.png)

### 其他相关概念

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/04.png)

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/05.png)

## 线程的基本使用

### 创建线程的两种方式

+ 在java中线程来使用有两种方式

1. **继承Thread类，重写run方法**。
2. **实现Runnable接口，重写run方法**。

### 线程应用案例 1-继承 Thread 类

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/06.png)

+ 代码演示：

```java
package study.threaduse;

public class Thread01 {
    public static void main(String[] args) throws InterruptedException{
        //创建一个Cat 对象 当成一个线程使用
        Cat cat = new Cat();
        cat.start();//启动线程  run方法就是一个普通方法 并没有真正启动多线程，就会把 run方法执行完毕 才向下执行
        //说明：当main线程启动一个子线程 Thread-0 主线程不会阻塞 会继续执行
        System.out.println("主线程继续执行"+Thread.currentThread().getName());
        for (int i = 0; i < 10; i++) {
            System.out.println("主线程i"+i);
            //让主线程休眠
            Thread.sleep(1000);
        }

    }

}
//1.当一个类继承了Thread类 该类就可以当做线程使用
//2.我们会重写run方法 写上自己的业务代码
//3. run Thread类 实现了Runnable接口的run方法
//@Override
//public void run() {//重写run方法 写上自己的业务逻辑
//
//    super.run();
//}
class Cat extends Thread{
        int times=0;
        public void run(){
        //该线程每隔一秒 在控制台输出 “喵喵，我是小喵咪”
        while(true){
        System.out.println("喵喵，我是小喵咪"+(++times)+" 线程名"+Thread.currentThread().getName());
        try {
            Thread.sleep(1000);//毫秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if(times==8){
            break;//当times==8 退出while,这时线程也就退出
        }
    }
    }

}
```

### 线程应用案例 2-实现 Runnable 接口

+ 说明：

1. java是单继承的，在某些情况下一个类可能已经继承了某个父类,这时在用继承Thread类方法来创建线程显然不可能了。
2. java设计者们提供了另外一个方式创建线程，就是通过**实现Runnable接口**来创建线程。

+ 应用案例

请编写程序,该程序可以每隔1秒。在控制台输出“hi!”,当输出10次后，自动退出。请使用实现Runnable接口的方式实现。Thread02.java，这里底层使用了设计模式[代理模式=>代码模拟实现Runnable接口开发线程的机制

+ 代码演示：

```java
package study.threaduse;

public class Thread02 {
    public static void main(String[] args) throws InterruptedException {
//        Dod dod = new Dod();
//        //创建了Thread对象，把 dog对象（实现Runnable接口）,放入Thread
//        Thread thread = new Thread(dod);
//        thread.start();
        Tiger tiger = new Tiger();
        ThreadProxy threadProxy = new ThreadProxy(tiger);
        threadProxy.start();
    }
    
}
class Animal{}
class Tiger extends Animal implements Runnable{

    @Override
    public void run() {
        System.out.println("老虎嗷嗷叫");
    }
}
//线程代理类
class ThreadProxy implements Runnable{//你可以吧Proxy类 当做ThreadProxy
    private Runnable target=null;//属性 类型是Runnable

    @Override
    public void run() {
        if(target!=null){
            target.run();//动态绑定 运行类型Tiger
        }
    }

    public ThreadProxy(Runnable target) {
        this.target = target;
    }
    public void start(){
        start0();//这个方法真正实现多线程
    }
    public void start0(){
        run();
    }
}


class Dod implements Runnable {//通过实现Runnable接口 来开发线程

    int count = 0;

    @Override
    public void run() {
        while (true) {
            System.out.println("小狗汪汪叫" + (++count) + Thread.currentThread().getName());
            //休眠一秒
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (count == 10) {
                break;
            }
        }
    }
}
```

### 线程使用应用案例-多线程执行

请编写一个程序,创建两个线程,一个线程每隔1秒输出“hello,world”,输出10次，退出，一个线程每隔1秒输出“hi”，输出5次退出.Thread03.java

+ 代码演示：

```java
package study.threaduse;

public class Thread03 {
    public static void main(String[] args) {
        T1 t1 = new T1();
        new Thread(t1).start();
        T2 t2 = new T2();
        new Thread(t2).start();
        new Thread(t2).start();//多个线程 共享一个资源的情况


    }
}

class T1 implements Runnable {
    int count = 0;

    @Override
    public void run() {
        //每隔一秒钟输出 hello world 输出十次
        while (true) {
            System.out.println("Hello,world" + (++count));
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (count == 100)
                break;

        }

    }
}

class T2 implements Runnable {
    int count = 0;

    @Override
    public void run() {
        //每隔一秒钟输出 hi 输出5次
        while (true) {
            System.out.println("Hi" + (++count));
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (count == 50)
                break;

        }

    }
}
```

### 线程如何理解

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/07.png)

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/08.png)

## 继承 Thread vs 实现 Runnable 的区别

1. **从java的设计来看，通过继承Thread或者实现Runnable接口来创建线程本质上没有区别,从jdk帮助文档我们可以看到Thread类本身就实现了Runnable接口**。

2. **实现Runnable接口方式更加适合多个线程共享一个资源的情况，并且避免了单继承的限制,建议使用Runnable。**

+ 3．[售票系统]，编程模拟三个售票窗口售票100，分别使用继承 Thread和实现 Runnable方式,并分析有什么问题?

+ 代码实现

```java

package study.threaduse.ticket.synchronized_;

public class SellTicket {
    public static void main(String[] args) {
//        new SellTicket01().start();
//        new SellTicket01().start();
//        new SellTicket01().start();
        //出现 超卖
        SellTicket02 sellTicket02 = new SellTicket02();
        new Thread(sellTicket02).start();
        new Thread(sellTicket02).start();
        new Thread(sellTicket02).start();
    }
}
//使用extends Thread
//class SellTicket01 extends Thread {
//    private static int tickNum = 100;//让多个线程共享ticketNum
//
//    @Override
//    public void run() {
//        while (true) {
//            if (tickNum <= 0) {
//                System.out.println("售票结束...");
//                break;
//            }
//            //休眠 五十 毫秒
//            try {
//                Thread.sleep(50);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//            System.out.println("窗口线程名称" + Thread.currentThread().getName() + "售出一张票" + "剩余票数为" + (--tickNum));
//        }
//    }
//}

class SellTicket02 implements Runnable {
    private  int tickNum = 100;
        @Override
        public void run() {
          while (true) {
            if (tickNum <= 0) {
                System.out.println("售票结束...");
                break;
            }
            //休眠 五十 毫秒
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("窗口线程名称" + Thread.currentThread().getName() + "售出一张票" + "剩余票数为" + (--tickNum));

    }
}

}
```

## 线程终止

### 基本说明

1. 当线程完成任务后，会自动退出。
2. 还可以通过**使用变量**来控制run方法退出的方式停止线程，即**通知方式**。

### 应用案列

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/09.png)

+ 代码实现

```java
package study.threaduse.exit_;

public class ThreadExit_ {
    public static void main(String[] args) throws InterruptedException {
        T t = new T();
        t.start();
        //如果希望main线程 去控制t1.线程的终止，就必须可以修改loop
        //让t1退出run方法 从而终止t1线程->通知方式
        //让线程休眠十秒 再通知退出
        System.out.println("主线程休眠10秒");
        Thread.sleep(10*1000);
        t.setLoop(false);

    }
}
class T extends Thread{
    int count=0;
    //设置一个控制变量
    private boolean loop=true;
    @Override
    public void run() {
        while (loop){
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("T 运行中..."+count++);
        }
    }

    public void setLoop(boolean loop) {
        this.loop = loop;
    }

}
```

## 线程常用方法

### 常用方法第一组

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/10.png)

### 注意事项和细节

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/11.png)

### 应用案例

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/12.png)

+ 代码演示：

```java
package study.threaduse.method_;

public class ThreadMethod01 {
    public static void main(String[] args) throws InterruptedException {
        //测试方法
        T t = new T();
        t.setName("frx");
        t.setPriority(Thread.MIN_PRIORITY);
        t.start();//启动子线程
        for (int i = 0; i < 5; i++) {
            Thread.sleep(1000);
            System.out.println("hi"+i);
        }
        System.out.println(t.getName()+"程序的优先级是"+t.getPriority());//1
        t.interrupt();//本来要等20秒的 提前中断休眠

    }
}
class T extends Thread{//自定义的线程类


    @Override
    public void run() {
        while (true) {
            for (int i = 0; i < 100; i++) {
                System.out.println(Thread.currentThread().getName() + "吃包子..");
            }
            System.out.println(Thread.currentThread().getName() + "休眠中...");
            try {
                Thread.sleep(20000);
            } catch (InterruptedException e) {
                //当线程执行到一个interrupt方法时， 就会catch一个异常 可以加入自己的业务逻辑
                //InterruptedException 捕获到的一个中断异常
                System.out.println(Thread.currentThread().getName() + "被 interrupt了");
            }
        }
    }
}
```

### 方法第二组

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/13.png)

### 应用案例

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/14.png)

+ 代码测试yield和join方法

```java
package study.threaduse.method_;

public class ThreadMethod02 {
    public static void main(String[] args) throws InterruptedException {
        T2 t2 = new T2();
        t2.start();
        for (int i = 0; i <=20; i++) {
            Thread.sleep(1000);
            System.out.println("主线程(小弟）吃了"+i+"个包子");
            if(i==5){
                System.out.println("主线程让子线程 全部吃完");
              //  t2.join();//这里想当于 当t2子线程 先执行完毕 主再继续执行   插队
                Thread.yield();//礼让 不一定成功

            }
        }

    }
}
class T2 extends Thread{
    @Override
    public void run() {
        for (int i = 0; i <=20; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("子线程（大哥）吃了"+i+"个包子");
        }
    }
}
```

### 课堂练习

![15](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/15.png)

+ 代码演示：

```java
package study.threaduse.method_;

public class ThreadMethodExercise {
    public static void main(String[] args) throws InterruptedException {
        T3 t3 = new T3();
        Thread thread = new Thread(t3);
        for (int i = 0; i <=10; i++) {
            Thread.sleep(1000);
            System.out.println("hi"+i);
            if(i==5){
                thread.start();
                thread.join();
            }
        }
        System.out.println("主线程结束...");

    }
}
class T3 implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i <=10; i++) {
            System.out.println("hello"+i);

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }


        }
        System.out.println("子线程结束..");
    }
}
```

### 用户线程和守护线程

1. **用户线程:也叫工作线程，当线程的任务执行完或通知方式结束。**
2. **守护线程:一般是为工作线程服务的，当所有的用户线程结束，守护线程自动结束。**
3. **常见的守护线程:垃圾回收机制。**

### 应用案例 ThreadMethod03.java

下面我们测试如何将一个线程设置成守护线程

+ 代码演示：

```java
package study.threaduse.method_;

public class ThreadMethod03 {
    public static void main(String[] args) throws InterruptedException {
        MyDaemonThread myDaemonThread = new MyDaemonThread();
        //如果我们希望当main线程结束后，子线程可以自动退出
        //只需将子线程 设为守护线程即可
        myDaemonThread.setDaemon(true);
        myDaemonThread.start();
        for (int i = 0; i <=10; i++) {
            System.out.println("小可爱"+i);
            Thread.sleep(1000);


        }

    }
}
class MyDaemonThread extends Thread{
    @Override
    public void run() {
        while (true){
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("ok");
        }
    }
}
```

## 线程的生命周期

### JDK 中用 Thread.State 枚举表示了线程的几种状态

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/16.png)

### 线程状态转换图

![17](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/17.png)

### 写程序查看线程状态 

+ 代码演示：

```java
package study.threaduse.state_;

public class ThreadState_ {
    public static void main(String[] args) throws InterruptedException {
        T t = new T();
        System.out.println(t.getName() + " 状态 " + t.getState());
        t.start();
        while (Thread.State.TERMINATED != t.getState()) {
            System.out.println(t.getName() + " 状态 " + t.getState());
            Thread.sleep(500);

        }
        System.out.println(t.getName() + " 状态 " + t.getState());
    }
}

class T extends Thread {
    @Override
    public void run() {
        while (true) {
            for (int i = 0; i < 10; i++) {
                System.out.println("hi" + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
            break;

        }
    }


}
```

## 线程的同步

### 先看一个问题

![18](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/18.png)

## Synchronized

### 线程同步机制

1. 在多线程编程，一些敏感数据不允许被多个线程同时访问，此时就使用同步访问技术，保证数据在任何同一时刻，最多有一个线程访问，以保证数据的完整性。也可以这里理解:
2. **线程同步，即当有一个线程在对内存进行操作时，其他线程都不可以对这个内存地址进行操作，直到该线程完成操作,其他线程才能对该内存地址进行操作。**

### 同步具体方法

![19](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/19.png)

## 析同步原理

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/duoxiancheng/20.png)

## 互斥锁

### 基本介绍

1. **Java语言中，引入了对象互斥锁的概念，来保证共享数据操作的完整性。**

2. **每个对象都对应于一个可称为“互斥锁”的标记，这个标记用来保证在任一时刻，只能有一个线程访问该对象。**

3. **关键字synchronized来与对象的互斥锁联系。当某个对象用synchronized修饰时,表明该对象在任一时刻只能由一个线程访问。**

4. **同步的局限性:导致程序的执行效率要降低。**

5. **同步方法(非静态的)的锁可以是this,也可以是其他对象(要求是同一个对象)。**

6. **同步方法(静态的)的锁为当前类本身。**

### 使用互斥锁来解决售票问题

+ 代码演示：

```java
package study.threaduse.ticket.synchronized_;

public class SellTicket {
    public static void main(String[] args) {
//        new SellTicket01().start();
//        new SellTicket01().start();
//        new SellTicket01().start();
        //出现 超卖
        SellTicket02 sellTicket02 = new SellTicket02();
        new Thread(sellTicket02).start();
        new Thread(sellTicket02).start();
        new Thread(sellTicket02).start();
    }
}
//使用extends Thread
//class SellTicket01 extends Thread {
//    private static int tickNum = 100;//让多个线程共享ticketNum
//
//    @Override
//    public void run() {
//        while (true) {
//            if (tickNum <= 0) {
//                System.out.println("售票结束...");
//                break;
//            }
//            //休眠 五十 毫秒
//            try {
//                Thread.sleep(50);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//            System.out.println("窗口线程名称" + Thread.currentThread().getName() + "售出一张票" + "剩余票数为" + (--tickNum));
//        }
//    }
//}
//实现接口方式,使用synchronized实现 线程同步
class SellTicket02 implements Runnable {
    private  int tickNum = 100;
    private boolean loop = true;//控制run方法变量
    Object object =new Object();
    //同步方法 为静态 的锁为当前类本身
    //1.public synchronized static void m1() 锁加在SellTicket03.class
    //2.如果在静态方法中，实现一个同步代码块


  /*  public synchronized static void m1(){

    }
    public static void m2(){
        synchronized (SellTicket02.class){
            System.out.println("m2");
        }
    } */


    //1.public synchronized void sell()就是一个同步方法
    //2.这时锁在 this对象
    //3.也可以在代码块上 写synchronize 同步代码块 互斥锁还是在this对象

    public /*synchronized*/ void sell() {//同步方法 在同一时刻 只能改有一个线程 执行该方法
        synchronized (this) {
            if (tickNum <= 0) {
                System.out.println("售票结束...");
                loop = false;
                return;
            }
            //休眠 五十 毫秒
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("窗口线程名称" + Thread.currentThread().getName() + "售出一张票" + "剩余票数为" + (--tickNum));
        }
    }
        @Override
        public void run() {
            while (loop) {
                sell();//同步方法
            }

    }
}


```

### 注意事项和细节

1. **同步方法如果没有使用static修饰:默认锁对象为this**。

2. **如果方法使用static修饰,默认锁对象:当前类**.class。

3. 实现的落地步骤:

+ **需要先分析上锁的代码选择同步代码块或同步方法**。
+ **要求多个线程的锁对象为同一个即可**!

## 线程的死锁

### 基本介绍

+ **多个线程都占用了对方的锁资源，但不肯相让，导致了死锁,在编程是一定要避免死锁的发生.**

### 应用案列

+ 妈妈：你先完成作业，才让你玩手机。

+ 小明：你先让我玩手机，我才完成作业。

### 应用案例  DeadLock_.java

+ 代码演示：

```java
package study.threaduse.ticket.synchronized_;

public class DeadLock_ {
    public static void main(String[] args) {
        //模拟死锁现象
        DeadLockDemo A = new DeadLockDemo(true);
        A.setName("A线程");
        DeadLockDemo B = new DeadLockDemo(false);
        B.setName("B线程");
        A.start();
        B.start();

    }
}
class DeadLockDemo extends Thread{
    static Object o1=new Object();
    static Object o2=new Object();
    boolean flag;

    public DeadLockDemo(boolean flag) {
        this.flag = flag;
    }

    @Override
    public void run() {
        //1.如果flag为T 线程A会先得到 o1对象锁 然后尝试获取o2对象锁
        //2.线程A 得不到 o2对象锁 ，就会Blocked
        //3.如果flag为 F 线程B 会先得到 o2对象锁 然后尝试获取 o1对象锁
        //4.如果线程 B得不到 o1对象锁，就会 Blocked
        if(flag){
            synchronized (o1) {//对象互斥锁 下面就是同步代码
                System.out.println(Thread.currentThread().getName() + "进入1");
                synchronized (o2) {
                    System.out.println(Thread.currentThread().getName() + "进入2");
                }
            }
        }
        else {
            synchronized (o2) {
                System.out.println(Thread.currentThread().getName() + "进入3");
                synchronized (o1) {
                    System.out.println(Thread.currentThread().getName() + "进入4");
                }
            }
        }
    }
}
```

## 释放锁

### 下面操作会释放锁

1. **当前线程的同步方法、同步代码块执行结束**
   + 案例:上厕所，完事出来。
2. **当前线程在同步代码块、同步方法中遇到break.return。**
   + 案例:没有正常的完事，经理叫他修改bug，不得已出来。
3. **当前线程在同步代码块、同步方法中出现了未处理的Error或Exception，导致异常结束**
   + 案例:没有正常的完事,发现忘带纸，不得已出来。
4. **当前线程在同步代码块、同步方法中执行了线程对象的wait()方法，当前线程暂停，并释放锁。**
   + 案例:没有正常完事，觉得需要酝酿下，所以出来等会再进去。

### 下面操作不会释放锁

1. 线程执行同步代码块或同步方法时,程序调用Thread.sleep(),Thread.yield()方
   法暂停当前线程的执行,不会释放锁。
   + 案例:上厕所，太困了，在坑位上眯了一会。
2. 线程执行同步代码块时，其他线程调用了该线程的suspend()方法将该线程挂起，
   该线程不会释放锁。
   + 提示;应尽量避免使用suspend()和resume()来控制线程，方法不再推荐使用

## 本章作业

1. 在main()方法中启动两个线程。

2. 第1个线程循环随机打印100以内的整数。

3. 直到第2个线程从键盘读取了”Q“命令。

+ 代码演示：

```java
package study.threaduse.homework;


import java.util.Scanner;

public class Homework01 {
    public static void main(String[] args) {
        A a = new A();
        B b = new B(a);//一定要注意.
        a.start();
        b.start();
    }
}

//创建A线程类
class A extends Thread {
    private boolean loop = true;

    @Override
    public void run() {
        //输出1-100数字
        while (loop) {
            System.out.println((int)(Math.random() * 100 + 1));
            //休眠
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("a线程退出...");

    }

    public void setLoop(boolean loop) {//可以修改loop变量
        this.loop = loop;
    }
}

//直到第2个线程从键盘读取了“Q”命令
class B extends Thread {
    private A a;
    private Scanner scanner = new Scanner(System.in);

    public B(A a) {//构造器中，直接传入A类对象
        this.a = a;
    }

    @Override
    public void run() {
        while (true) {
            //接收到用户的输入
            System.out.println("请输入你指令(Q)表示退出:");
            char key = scanner.next().toUpperCase().charAt(0);
            if(key == 'Q') {
                //以通知的方式结束a线程
                a.setLoop(false);
                System.out.println("b线程退出.");
                break;
            }
        }
    }
}

```

1. 有两个用户分别从同一个卡上取钱(总额：10000).
2. 每次都取1000，当余额不足时，就不能取款了。
3. 不能出现超取现象->线程同步问题。

+ 代码实现：

```java
package study.threaduse.homework;

public class Homework02 {
    public static void main(String[] args) {
        T t = new T();
        Thread  thread= new Thread(t);
        Thread thread1 = new Thread(t);
        thread.setName("T1");
        thread1.setName("T2");
        thread.start();
        thread1.start();


    }
}
//编写 取款的线程
//因为这是涉及到多个线程 共享的问题 用实现Runnable的方式
class T implements Runnable{
    private int money=10000;
    @Override
    public void run() {
        while (true) {
            //1.这里使用synchronized 实现了线程同步
            //2.当多个线程 执行这里时，就回去争夺this对象
            //3.哪个线程 获取到 this对象(t) 就执行synchronized代码块 执行完后 会执行this对象锁
            //4.争夺不到 this对象锁的 就blocked，准备继续争夺
            //5.this对象锁是非公平锁
         synchronized (this) {
             //判断余额是否够
             if (money < 1000) {
                 System.out.println("余额不足");
                 break;
             }
             money -= 1000;
             System.out.println(Thread.currentThread().getName() + "取出了1000块 当前余额=" + money);
         }  try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

