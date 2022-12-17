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