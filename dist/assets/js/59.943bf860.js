(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{1053:function(t,_,v){"use strict";v.r(_);var a=v(59),s=Object(a.a)({},(function(){var t=this,_=t.$createElement,a=t._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"第一章-linux基础篇"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第一章-linux基础篇"}},[t._v("#")]),t._v(" 第一章 Linux基础篇")]),t._v(" "),a("h2",{attrs:{id:"_1-1-虚拟机网络连接的三种模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-虚拟机网络连接的三种模式"}},[t._v("#")]),t._v(" 1.1 虚拟机网络连接的三种模式")]),t._v(" "),a("p",[a("img",{attrs:{src:v(443),alt:"1630465860035"}})]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("桥接模式:Linux可以和其他的系统通信。但是可能造成IP冲突。")])]),t._v(" "),a("li",[a("strong",[t._v("NAT模式:网络地址转换方式:Linux可以访问外网，不会造成IP冲突。")])]),t._v(" "),a("li",[a("strong",[t._v("主机模式:你的Linux是一个独立的主机，不能访问外网。")])])]),t._v(" "),a("h2",{attrs:{id:"_1-2-虚拟机的克隆"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-虚拟机的克隆"}},[t._v("#")]),t._v(" 1.2 虚拟机的克隆")]),t._v(" "),a("p",[t._v("如果你已经安装了一台 linux操作系统，你还想再更多的，没有必要再重新安装你只需要克隆就可以。")]),t._v(" "),a("ul",[a("li",[t._v("方式一："),a("font",{attrs:{color:"#DC4040",size:"4",face:"黑体"}},[t._v("直接拷贝一份安装好的虚拟机文件。")])],1),t._v(" "),a("li",[t._v("方式二："),a("font",{attrs:{color:"#DC4040",size:"4",face:"黑体"}},[t._v("使用vmware的克隆操作。注意：克隆时，需要先关闭Linux系统。")])],1)]),t._v(" "),a("h2",{attrs:{id:"_1-3-虚拟机快照"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-虚拟机快照"}},[t._v("#")]),t._v(" 1.3 虚拟机快照")]),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("如果你在使用虚拟机系统的时候(比如 linux)，你想回到原先的某一个状态，也就是说你担心可能有些误操作造成系统异常，需要回到原先某个正常运行的状态，vmware也提供了这样的功能，就叫快照管理。")])])]),t._v(" "),a("li",[a("p",[t._v("案列演示:")])])]),t._v(" "),a("ol",[a("li",[a("p",[t._v("进入系统，先做一个快照A")])]),t._v(" "),a("li",[a("p",[t._v("创建一个文件夹，在保存一个快照B")])]),t._v(" "),a("li",[a("p",[t._v("回到系统刚刚安装好的状态，即快照A")])]),t._v(" "),a("li",[a("p",[t._v("再回到快照B")])])]),t._v(" "),a("p",[a("img",{attrs:{src:v(444),alt:"1630469017519"}})]),t._v(" "),a("blockquote",[a("p",[t._v("我觉得很像数据库中的事务，但是快照可以从快照C回到快照A再回到B，但是事务从C回退到A，就不能回退到B，因为事务回退到A点，把A之后的保存点都删掉了。")])]),t._v(" "),a("h2",{attrs:{id:"_1-4-虚拟机迁移和删除"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-虚拟机迁移和删除"}},[t._v("#")]),t._v(" 1.4 虚拟机迁移和删除")]),t._v(" "),a("ul",[a("li",[t._v("虚拟系统安装好了，它的本质就是文件(放在文件夹的)。因此虚拟系统的迁移很方便，你可以把安装好的虚拟系统这个"),a("strong",[t._v("文件夹整体拷贝或者剪切")]),t._v("到另外位置使用。删除也很简单，用"),a("strong",[t._v("VMware进行移除")]),t._v("，再点击菜单->从磁盘删除即可，或者直接手动删除"),a("strong",[t._v("虚拟系统对应的文件夹")]),t._v("即可。")])]),t._v(" "),a("h2",{attrs:{id:"_1-5-安装vmtools"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-安装vmtools"}},[t._v("#")]),t._v(" 1.5 安装vmtools")]),t._v(" "),a("h3",{attrs:{id:"_1-5-1-介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-1-介绍"}},[t._v("#")]),t._v(" 1.5.1 介绍")]),t._v(" "),a("ol",[a("li",[t._v("vmtools安装后，可以让我们在 windows下更好的管理vm 虚拟机")]),t._v(" "),a("li",[t._v("可以设置windows和linux系统的共享文件夹")])]),t._v(" "),a("h3",{attrs:{id:"_1-5-2-安装步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-2-安装步骤"}},[t._v("#")]),t._v(" 1.5.2 安装步骤")]),t._v(" "),a("ol",[a("li",[t._v("进入linux系统")]),t._v(" "),a("li",[t._v("点击vm菜单->install vmware tools")]),t._v(" "),a("li",[t._v("linux系统会出现一个vm的安装包，xx.tar.gz")]),t._v(" "),a("li",[t._v("拷贝到 /opt")]),t._v(" "),a("li",[t._v("cd/opt[进入opt目录],使用解压命令tar -zxvf VM+tab(自动补全),得到一个安装文件")]),t._v(" "),a("li",[t._v("/opt目录下安装 ./vm+tab(自动补全) /vm+tab(自动补全)  一直enter")]),t._v(" "),a("li",[t._v("验证成功 gcc -v")])]),t._v(" "),a("h3",{attrs:{id:"_1-5-3-共享文件夹"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-3-共享文件夹"}},[t._v("#")]),t._v(" 1.5.3 共享文件夹")]),t._v(" "),a("ul",[a("li",[t._v("基本介绍")])]),t._v(" "),a("p",[t._v("为了方便我们可以设置一个共享文件夹。")]),t._v(" "),a("ul",[a("li",[t._v("操作步骤:")])]),t._v(" "),a("ol",[a("li",[t._v("在主机D盘，新建文件Myshare，写入txt文件。")]),t._v(" "),a("li",[t._v("点虚拟机设置，点选项，共享文件夹，总是启用,添加，下一步，找到D盘里的Myshare,下一步，完成，确定。")]),t._v(" "),a("li",[t._v("打开linux系统的主文件夹,点计算机，有个目录mnt,双击进入，里面有个Myshare,打开发现与主机的保持一致，修改，依然保持一致。")])]),t._v(" "),a("ul",[a("li",[t._v("注意事项:")])]),t._v(" "),a("p",[t._v("完成上面这些操作，windows 和 linux就可以共享文件了，但是在"),a("font",{attrs:{color:"#DC4040",size:"4",face:"黑体"}},[t._v("实际开发")]),t._v("中，文件的上传下载是需要使用"),a("font",{attrs:{color:"#DC4040",size:"4",face:"黑体"}},[t._v("远程方式")]),t._v("完成的。")],1)])}),[],!1,null,null,null);_.default=s.exports},443:function(t,_,v){t.exports=v.p+"assets/img/01.9db7e1c8.png"},444:function(t,_,v){t.exports=v.p+"assets/img/02.febfe569.png"}}]);