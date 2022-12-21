---
title: 链表
date: 2022-12-17 22:23:37
permalink: /Computer/dataStructure/linkedlist
categories:
  - 数据结构
tags:
  - 数据结构
---
# 链表

[[toc]]

## 链表介绍

链表是有序的列表，但是它在内存中是存储如下

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221217/image.5365fgj0d9o0.webp)

小结上图：

1.  链表是以节点的方式来存储,是链式存储
2. 每个节点包含 data域， next域:指向下一个节点.
3. 如图:发现链表的各个节点不一定是连续存储.
4. 链表分带头节点的链表和没有头节点的链表，根据实际的需求来确定

+ 单链表(带头结点）逻辑结构示意图如下

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221217/image.4ouowij5k4o0.webp)

## 单链表的应用案例

### 添加节点

使用带 head头的单向链表实现–水浒英雄排行榜管理完成对英雄人物的增删改查操作，注: 删除和修改
,查找

1. 第一种方法在添加英雄时，直接添加到链表的尾部

   思路分析示意图:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221217/image.7dp3scyrjcg0.webp)

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/17  21:31
 */
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        //测试
        //先创建节点
        HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
        HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
        HeroNode hero3 = new HeroNode(3, "吴用", "智多星");
        HeroNode hero4 = new HeroNode(4, "林冲", "豹子头");

        //创建一个链表
        SingleLinkedList singleLinkedList = new SingleLinkedList();
        singleLinkedList.add(hero1);
        singleLinkedList.add(hero3);
        singleLinkedList.add(hero2);
        singleLinkedList.add(hero4);
        //显示
        singleLinkedList.list();
    }
}
//定义SingleLinkedList来管理英雄
class SingleLinkedList {
    //初始化一个头结点，头结点不要动，不存放具体的数据
    private HeroNode head = new HeroNode(0,"","");

    //添加节点到单向列表
    //思路：当不考虑编号的顺序时
    //1.找到当前链表的最后节点
    //2.将最后节点的next指向新的节点
    public void add(HeroNode heroNode) {

        //因为head节点不能动，因此我们需要一个辅助变量temp
        HeroNode temp = head;
        //遍历链表，找到最后
        while (true) {
            if(temp.next == null) {
                break;
            }
            //如果没有找到最后，就将temp后移
            temp = temp.next;
        }
        //当退出while循环时，temp就指向了链表的最后
        //将最后这个节点的next 指向新的节点
        temp.next = heroNode;
    }

    //显示链表【遍历】
    public void list(){
        //判断链表是否为空
        if(head.next == null) {
            System.out.println("链表为空");
            return;
        }
        //因为头结点，不能动，因此我们需要一个辅助变量来遍历
        HeroNode temp = head.next;
        while (true) {
            //判断是否到链表最后
            if(temp == null) {
                break;
            }
            //输出节点的信息
            System.out.println(temp);
            //将next后移
            temp = temp.next;
        }
    }

}
//定义一个HeroNode，每个HeroNode对象，就是一个节点
class HeroNode {
    public int no;
    public String name;
    public String nickname;//昵称
    public HeroNode next;//指向下一个节点

    public HeroNode(int no, String name, String nickname) {
        this.no = no;
        this.name = name;
        this.nickname = nickname;
    }

    @Override
    public String toString() {
        return "HeroNode{" +
                "no=" + no +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
```

+ 控制台打印

```java
HeroNode{no=1, name='宋江', nickname='及时雨'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=4, name='林冲', nickname='豹子头'}

Process finished with exit code 0
```

2. 第二种方式在添加英雄时，根据排名将英雄插入到指定位置(如果有这个排名，则添加失败，并给出提示)

思路的分析示意图:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221217/image.30g0kf8igty0.webp)

```java
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        //测试
        //先创建节点
        HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
        HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
        HeroNode hero3 = new HeroNode(3, "吴用", "智多星");
        HeroNode hero4 = new HeroNode(4, "林冲", "豹子头");

        //创建一个链表
        SingleLinkedList singleLinkedList = new SingleLinkedList();
        
        //加入按照编号的顺序
        singleLinkedList.addByOrder(hero1);
        singleLinkedList.addByOrder(hero3);
        singleLinkedList.addByOrder(hero2);
        singleLinkedList.addByOrder(hero2);
        singleLinkedList.addByOrder(hero4);
        //显示
        singleLinkedList.list();
    }
}


    //第二种方式在添加英雄时，根据排名将英雄插入到指定位置
    //如果有这个排名，则添加失败，并给出提示
    public void addByOrder(HeroNode heroNode) {
        //因为头结点不能动，因此我们仍然通过一个辅助指针(变量)来帮助找到添加的位置
        //因此，我们找的temp是位于添加位置的前一个节点，否则插入
        HeroNode temp = head;
        boolean flag = false;//标志添加的编号是否存在，默认为false
        while (true) {
            if (temp.next == null) {//说明temp已经在链表的最后
                break;
            }
            if (temp.next.no > heroNode.no) {//位置找到，就在temp的后面
                break;
            } else if (temp.next.no == heroNode.no) { //说明希望添加的heroNode的编号已经存在
                flag = true; //说明编号存在
                break;
            }
            temp = temp.next;//后移，遍历当前链表
        }
        //判断flag的值
        if (flag) {
            System.out.printf("准备插入的英雄的编号 %d 已经存在，不能加入\n", heroNode.no);
        } else {
            //插入到链表中
            heroNode.next = temp.next;
            temp.next = heroNode;
        }
    }
```

+ 测试

```java
准备插入的英雄的编号 2 已经存在，不能加入
HeroNode{no=1, name='宋江', nickname='及时雨'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=4, name='林冲', nickname='豹子头'}

Process finished with exit code 0
```

### 修改节点

思路：

1. 先找到该节点，通过遍历

2. `temp.name = newHeroNode.name ; `

   `temp.nickname= newHeroNode.nickname`

```java
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        //测试
        //先创建节点
        HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
        HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
        HeroNode hero3 = new HeroNode(3, "吴用", "智多星");
        HeroNode hero4 = new HeroNode(4, "林冲", "豹子头");

        //创建一个链表
        SingleLinkedList singleLinkedList = new SingleLinkedList();

        System.out.println("修改前：");
        singleLinkedList.list();
        //测试修改节点的代码
        HeroNode newHeroNode = new HeroNode(2, "小卢", "玉麒麟~~");
        singleLinkedList.update(newHeroNode);
        //显示
        System.out.println("修改后：");
        singleLinkedList.list();
    }
}


    //修改节点的功能，根绝no编号来修改，即no编号不能修改
    public void update(HeroNode newHeroNode) {
        //判断是否为空
        if(head.next==null){
            System.out.println("链表为空");
            return;
        }
        //找到需要修改的节点，根据no编号
        //定义一个辅助变量
        HeroNode temp = head.next;
        boolean flag = false;//表示是否找到该节点
        while (true) {
            if (temp == null){
                break;//已经遍历完链表
            }
            if(temp.no == newHeroNode.no) {
                //找到了
                flag = true;
                break;
            }
            temp = temp.next;
        }
        //根据flag，判断是否找到要修改的节点
        if(flag) {
            temp.name = newHeroNode.name;
            temp.nickname = newHeroNode.nickname;
        } else { //没有找到
            System.out.printf("没有找到编号 %d 的节点,不能修改\n",newHeroNode.no);

        }
    }
```

+ 测试结果

```java
修改前：
HeroNode{no=1, name='宋江', nickname='及时雨'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=4, name='林冲', nickname='豹子头'}
修改后：
HeroNode{no=1, name='宋江', nickname='及时雨'}
HeroNode{no=2, name='小卢', nickname='玉麒麟~~'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=4, name='林冲', nickname='豹子头'}

Process finished with exit code 0
```

### 删除节点

思路分析的示意图:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221219/image.2k3w1s4fvx20.webp)

从单链表中删除一个节点的思路：

1. 我们先找到需要删除的这个节点的前一个节点temp
2. temp.next=temp.next.next
3. 被删除的节点，将不会有其他引用指向，会被垃圾回收机制回收

```java
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        //测试
        //先创建节点
        HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
        HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
        HeroNode hero3 = new HeroNode(3, "吴用", "智多星");
        HeroNode hero4 = new HeroNode(4, "林冲", "豹子头");

        //创建一个链表
        SingleLinkedList singleLinkedList = new SingleLinkedList();

        //加入按照编号的顺序
        singleLinkedList.addByOrder(hero1);
        singleLinkedList.addByOrder(hero3);
        singleLinkedList.addByOrder(hero2);
        singleLinkedList.addByOrder(hero4);
        
        System.out.println("删除之前的链表情况：");
        singleLinkedList.list();

        //删除一个节点
        singleLinkedList.del(1);
        singleLinkedList.del(4);
        System.out.println("删除之后的链表情况：");
        singleLinkedList.list();
    }
}


    //删除节点
    //1 head 不能动，因此我们需要一个temp辅助节点找到待删除节点的前一个节点
    //2 说明我们在比较时，是temp.next.no 和需要删除的节点的no比较

    public void del(int no) {
        HeroNode temp = head;
        boolean flag = false;//标志是否找到删除节点的前一个节点
        while (true) {
            if (temp.next == null) { //已经到链表的最后
                break;
            }
            if (temp.next.no == no) {
                //找到待删除节点的前一个节点temp
                flag = true;
                break;
            }
            temp = temp.next; //temp后移，实现遍历
        }
        //判断flag
        if (flag) { //找到
            //可以删除
            temp.next = temp.next.next;
        } else {
            System.out.printf("要删除的 %d 节点不存在\n",no);
        }
    }

```

+ 测试

```java
删除之前的链表情况：
HeroNode{no=1, name='宋江', nickname='及时雨'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=4, name='林冲', nickname='豹子头'}
删除之后的链表情况：
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=4, name='林冲', nickname='豹子头'}

Process finished with exit code 0
```

## 单链表面试题

单链表的常见面试题如下：

1. 求单链表中有效节点的个数

```java
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        //测试
        //先创建节点
        HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
        HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
        HeroNode hero3 = new HeroNode(3, "吴用", "智多星");
        HeroNode hero4 = new HeroNode(4, "林冲", "豹子头");

        //创建一个链表
        SingleLinkedList singleLinkedList = new SingleLinkedList();

        //加入按照编号的顺序
        singleLinkedList.addByOrder(hero1);
        singleLinkedList.addByOrder(hero3);
        singleLinkedList.addByOrder(hero2);
        singleLinkedList.addByOrder(hero4);

        singleLinkedList.del(1);
        singleLinkedList.del(4);
        System.out.println("有效的节点个数为："+SingleLinkedList.getLength(singleLinkedList.getHead()));
    }
} 
    //方法：获取到单链表的节点的个数(如果是带头结点的这种链表，需要不统计头结点)
    /**
     * @param head 链表的头结点
     * @return 返回的就是有效节点的个数
     */
    public static int getLength(HeroNode head) {
        if (head.next == null) { //空链表
            return 0;
        }
        int length = 0;
        //定义一个辅助的变量，这里我们没有统计头结点
        HeroNode cur = head.next;
        while (cur != null) {
            length++;
            cur = cur.next;//遍历
        }
        return length;
    }

    public HeroNode getHead() {
        return head;
    }
```

+ 测试

```java
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=3, name='吴用', nickname='智多星'}
有效的节点个数为：2

Process finished with exit code 0
```

2. 查找单链表中的倒数第k个结点

```java
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        //测试
        //先创建节点
        HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
        HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
        HeroNode hero3 = new HeroNode(3, "吴用", "智多星");
        HeroNode hero4 = new HeroNode(4, "林冲", "豹子头");

        //创建一个链表
        SingleLinkedList singleLinkedList = new SingleLinkedList();

        //加入按照编号的顺序
        singleLinkedList.addByOrder(hero1);
        singleLinkedList.addByOrder(hero3);
        singleLinkedList.addByOrder(hero2);
        singleLinkedList.addByOrder(hero4);

        singleLinkedList.list();

        System.out.println("有效的节点个数为：" + SingleLinkedList.getLength(singleLinkedList.getHead()));

        //测试一下看看是否得到了倒数第K个节点
        HeroNode result = SingleLinkedList.findLastIndexNode(singleLinkedList.getHead(), 1);
        System.out.println("result:" + result);
    }
}
    //查找单链表的倒数第k个节点【新浪面试题】
    //思路
    //1.编写一个方法，接受head节点，同时接受一个index
    //2.index 表示是倒数第index个节点
    //3.先把链表从头到尾遍历，得到链表的总的长度 getLength
    //4.得到size后，我们从链表的第一个开始遍历(size-index)个，就可以得到
    //5.如果找到了，则返回该节点，否则返回为null
    public static HeroNode findLastIndexNode(HeroNode head, int index) {
        //判断如果链表为空，返回null
        if (head.next == null) {
            return null;//没有找到
        }
        //第一次遍历得到链表的长度(节点个数)
        int size = getLength(head);
        //第二次遍历 size-index 位置，就是我们倒数的第k个节点
        //先做一个index校验
        if (index < 0 || index > size) {
            return null;
        }
        //定义辅助变量，for循环定位到倒数的index
        HeroNode current = head.next; //3 //size-1
        for (int i = 0; i < size - index; i++) {
            current = current.next;
        }
        return current;
    }
```

+ 测试

```java
HeroNode{no=1, name='宋江', nickname='及时雨'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=4, name='林冲', nickname='豹子头'}
有效的节点个数为：4
result:HeroNode{no=4, name='林冲', nickname='豹子头'}

Process finished with exit code 0
```

3. 单链表的反转

   思路解析图解

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221220/image.5za7su1gprk0.webp)

```java
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        //测试
        //先创建节点
        HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
        HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
        HeroNode hero3 = new HeroNode(3, "吴用", "智多星");
        HeroNode hero4 = new HeroNode(4, "林冲", "豹子头");

        //创建一个链表
        SingleLinkedList singleLinkedList = new SingleLinkedList();

        //加入按照编号的顺序
        singleLinkedList.addByOrder(hero1);
        singleLinkedList.addByOrder(hero3);
        singleLinkedList.addByOrder(hero2);
        singleLinkedList.addByOrder(hero4);

        //测试一下单链表的反转功能
        System.out.println("原来链表的情况：");
        singleLinkedList.list();
        SingleLinkedList.reverseList(singleLinkedList.getHead());
        System.out.println("反转过后的链表：");
        singleLinkedList.list();

    }
}
    //将单链表进行反转
    public static void reverseList(HeroNode head) {
        //如果当前链表为null,或者只有一个节点，就无需反转，直接返回
        if (head.next == null || head.next.next == null) {
            return;
        }

        //定义一个辅助的指针(变量)，帮助我们遍历原来的链表
        HeroNode current = head.next;
        HeroNode next = null;//指向当前节点[current]的下一个节点
        HeroNode reverseHead = new HeroNode(0,"","");
        //遍历原来的链表，每遍历一个节点，就将其取出，并放在新的链表 reverseHead 的最前端
        while (current != null){
            next = current.next;//先暂时保存当前节点的下一个节点，因为后面需要使用
            current.next = reverseHead.next;//将current的下一个节点指向链表的最前端
            reverseHead.next = current;//将current链接到新的链表上
            current = next; //让current后移
        }
        //将head.next指向reverseHead.next，实现单链表的反转
        head.next = reverseHead.next;
        
    }
```

+ 测试

```java
原来链表的情况：
HeroNode{no=1, name='宋江', nickname='及时雨'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=4, name='林冲', nickname='豹子头'}
反转过后的链表：
HeroNode{no=4, name='林冲', nickname='豹子头'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=1, name='宋江', nickname='及时雨'}

Process finished with exit code 0
```

4. 从头到尾打印单链表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221220/image.25cz064igv6o.webp)

思考：

1. 上面的题的要求就是逆序打印单链表.
2. 方式1:先将单链表进行反转操作,然后再遍历即可，这样做的问题是破坏原来的单链表的一个结构
3. 方式2:可以利用栈这个数据结构，将各个节点压入到栈中，然后利用栈的先进后出的特点，就实现了逆序打印对的结果

举例演示栈的使用：

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/20  22:22
 */
public class TestStack {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();
        //入栈
        stack.add("Jack");
        stack.add("Tom");
        stack.add("Smith");

        //取出
        //出栈
        while (stack.size() > 0) {
            System.out.println(stack.pop());//pop就是把栈顶的数据取出
        } 
    }
}
```

+ 结果

```java
Smith
Tom
Jack

Process finished with exit code 0
```

```java
public class SingleLinkedListDemo {
    public static void main(String[] args) {
        //测试
        //先创建节点
        HeroNode hero1 = new HeroNode(1, "宋江", "及时雨");
        HeroNode hero2 = new HeroNode(2, "卢俊义", "玉麒麟");
        HeroNode hero3 = new HeroNode(3, "吴用", "智多星");
        HeroNode hero4 = new HeroNode(4, "林冲", "豹子头");

        //创建一个链表
        SingleLinkedList singleLinkedList = new SingleLinkedList();

        //加入按照编号的顺序
        singleLinkedList.addByOrder(hero1);
        singleLinkedList.addByOrder(hero3);
        singleLinkedList.addByOrder(hero2);
        singleLinkedList.addByOrder(hero4);

        //测试一下单链表的反转功能
        System.out.println("原来链表的情况：");
        singleLinkedList.list();
        System.out.println("逆序打印的结果为，没有改变链表的结构：");
        SingleLinkedList.reservePrint(singleLinkedList.getHead());

    }
}
```

+ 测试结果

```java
原来链表的情况：
HeroNode{no=1, name='宋江', nickname='及时雨'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=4, name='林冲', nickname='豹子头'}
逆序打印的结果为：
HeroNode{no=4, name='林冲', nickname='豹子头'}
HeroNode{no=3, name='吴用', nickname='智多星'}
HeroNode{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode{no=1, name='宋江', nickname='及时雨'}

Process finished with exit code 0
```

## 双向链表应用实例

### 双向链表的操作分析和实现

使用带head头的双向链表实现–水浒英雄排行榜

+ 管理单向链表的缺点分析:

  单向链表，查找的方向只能是一个方向，而双向链表可以向前或者向后查找。

  单向链表不能自我删除，需要靠辅助节点﹐而双向链表，则可以自我删除，所以前面我们单链表删除时节点，总是找到temp,temp是待删除节点的前一个节点(认真体会)。

  分析了双向链表如何完成遍历，添加，修改和删除的思路

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221221/image.55re9imtups0.webp)

**对上图说明**：

分析双向链表的遍历，添加，修改，删除的操作思路===》代码实现

1. **遍历** 方和单链表一样，只是可以向前，也可以向后查找
2. **添加**(默认添加到双向链表的最后)
   1. 先找到双向链表的最后这个节点
   2. temp.next = newHeroNode;
   3. newHeroNode.pre = temp;
3. **修改**思路和原来的单向链表一样.
4. **删除**
   1. 因为是双向链表，因此，我们可以实现自我删除某个节点
   2. 直接找到要删除的这个节点，比如temp
   3. temp.pre.next = temp.next;
   4. temp.next.pre = temp.pre;

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/12/21  19:19
 */
public class DoubleLinkedListDemo {
    public static void main(String[] args) {
        System.out.println("双向链表的测试：");
        HeroNode2 hero1 = new HeroNode2(1, "宋江", "及时雨");
        HeroNode2 hero2 = new HeroNode2(2, "卢俊义", "玉麒麟");
        HeroNode2 hero3 = new HeroNode2(3, "吴用", "智多星");
        HeroNode2 hero4 = new HeroNode2(4, "林冲", "豹子头");
        //创建一个双向链表
        DoubleLinkedList doubleLinkedList = new DoubleLinkedList();
        doubleLinkedList.add(hero1);
        doubleLinkedList.add(hero2);
        doubleLinkedList.add(hero3);
        doubleLinkedList.add(hero4);

        //显示
        doubleLinkedList.list();

        //修改
        HeroNode2 newHeroNode = new HeroNode2(4, "公孙胜", "入云龙");
        doubleLinkedList.update(newHeroNode);
        System.out.println("修改后的链表情况：");
        doubleLinkedList.list();

        //删除
        doubleLinkedList.del(3);
        System.out.println("删除后的链表情况：");
        doubleLinkedList.list();

        //顺序添加
        //先把链表清空
        doubleLinkedList.del(1);
        doubleLinkedList.del(2);
        doubleLinkedList.del(4);
        System.out.println("按编号顺序添加到链表的情况：");
        doubleLinkedList.addByOrder(hero2);
        doubleLinkedList.addByOrder(hero3);
        doubleLinkedList.addByOrder(hero4);
        doubleLinkedList.addByOrder(hero1);
        doubleLinkedList.list();


    }
}

//创建一个双向链表的类
class DoubleLinkedList {

    //初始化一个头结点，头结点不要动，不存放具体的数据
    private HeroNode2 head = new HeroNode2(0, "", "");

    //返回头结点
    public HeroNode2 getHead() {
        return head;
    }

    //遍历双向链表的方法
    public void list() {
        //判断链表是否为空
        if (head.next == null) {
            System.out.println("链表为空");
            return;
        }
        //因为头结点，不能动，因此我们需要一个辅助变量来遍历
        HeroNode2 temp = head.next;
        while (true) {
            //判断是否到链表最后
            if (temp == null) {
                break;
            }
            //输出节点的信息
            System.out.println(temp);
            //将next后移
            temp = temp.next;
        }
    }

    //添加一个节点，到双向链表的最后
    public void add(HeroNode2 heroNode) {

        //因为head节点不能动，因此我们需要一个辅助变量temp
        HeroNode2 temp = head;
        //遍历链表，找到最后
        while (true) {
            if (temp.next == null) {
                break;
            }
            //如果没有找到最后，就将temp后移
            temp = temp.next;
        }
        //当退出while循环时，temp就指向了链表的最后
        //形成一个双向链表
        temp.next = heroNode;
        heroNode.pre = temp;
    }

    //修改一个节点的内容，可以看到双向链表的节点内容修改和单向链表一样
    //只是节点的类型改成 HeroNode2
    public void update(HeroNode2 newHeroNode) {
        //判断是否为空
        if (head.next == null) {
            System.out.println("链表为空");
            return;
        }
        //找到需要修改的节点，根据no编号
        //定义一个辅助变量
        HeroNode2 temp = head.next;
        boolean flag = false;//表示是否找到该节点
        while (true) {
            if (temp == null) {
                break;//已经遍历完链表
            }
            if (temp.no == newHeroNode.no) {
                //找到了
                flag = true;
                break;
            }
            temp = temp.next;
        }
        //根据flag，判断是否找到要修改的节点
        if (flag) {
            temp.name = newHeroNode.name;
            temp.nickname = newHeroNode.nickname;
        } else { //没有找到
            System.out.printf("没有找到编号 %d 的节点,不能修改\n", newHeroNode.no);

        }
    }

    //从双向链表删除一个节点
    //1.对于双向链表，可以直接找到要删除的这个节点
    //2.找到以后，自我删除
    public void del(int no) {

        //判断当前链表是否为空
        if (head.next == null) {
            System.out.println("链表为空，无法删除");
            return;
        }
        HeroNode2 temp = head;
        boolean flag = false;//标志是否找到删除节点的前一个节点
        while (true) {
            if (temp == null) { //已经到链表的最后节点的next
                break;
            }
            if (temp.no == no) {
                //找到待删除节点的前一个节点temp
                flag = true;
                break;
            }
            temp = temp.next; //temp后移，实现遍历
        }
        //判断flag
        if (flag) { //找到
            //可以删除
            temp.pre.next = temp.next;
            if (temp.next != null)
                //如果是最后一个节点，就不需要执行下面这行代码，否则空指针异常
                temp.next.pre = temp.pre;
        } else {
            System.out.printf("要删除的 %d 节点不存在\n", no);
        }
    }

    //顺序添加
    public void addByOrder(HeroNode2 heroNode) {
        //因为头结点不能动，因此我们仍然通过一个辅助指针(变量)来帮助找到添加的位置
        //因此，我们找的temp是位于添加位置的前一个节点，否则插入
        HeroNode2 temp = head;
        boolean flag = false;//标志添加的编号是否存在，默认为false
        while (true) {
            if (temp.next == null) {//说明temp已经在链表的最后
                break;
            }
            if (temp.next.no > heroNode.no) {//位置找到，就在temp的后面
                break;
            } else if (temp.next.no == heroNode.no) { //说明希望添加的heroNode的编号已经存在
                flag = true; //说明编号存在
                break;
            }
            temp = temp.next;//后移，遍历当前链表
        }
        //判断flag的值
        if (flag) {
            System.out.printf("准备插入的英雄的编号 %d 已经存在，不能加入\n", heroNode.no);
        } else {
            //插入到链表中
            heroNode.next = temp.next;
            temp.next = heroNode;
        }
    }
}

//定义一个HeroNode，每个HeroNode对象，就是一个节点
class HeroNode2 {
    public int no;
    public String name;
    public String nickname;//昵称
    public HeroNode2 next;//指向下一个节点
    public HeroNode2 pre;//指向前一个节点

    public HeroNode2(int no, String name, String nickname) {
        this.no = no;
        this.name = name;
        this.nickname = nickname;
    }

    @Override
    public String toString() {
        return "HeroNode2{" +
                "no=" + no +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
```

+ 测试

```java
双向链表的测试：
HeroNode2{no=1, name='宋江', nickname='及时雨'}
HeroNode2{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode2{no=3, name='吴用', nickname='智多星'}
HeroNode2{no=4, name='林冲', nickname='豹子头'}
修改后的链表情况：
HeroNode2{no=1, name='宋江', nickname='及时雨'}
HeroNode2{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode2{no=3, name='吴用', nickname='智多星'}
HeroNode2{no=4, name='公孙胜', nickname='入云龙'}
删除后的链表情况：
HeroNode2{no=1, name='宋江', nickname='及时雨'}
HeroNode2{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode2{no=4, name='公孙胜', nickname='入云龙'}
按编号顺序添加到链表的情况：
HeroNode2{no=1, name='宋江', nickname='及时雨'}
HeroNode2{no=2, name='卢俊义', nickname='玉麒麟'}
HeroNode2{no=3, name='吴用', nickname='智多星'}
HeroNode2{no=4, name='公孙胜', nickname='入云龙'}

Process finished with exit code 0

```

