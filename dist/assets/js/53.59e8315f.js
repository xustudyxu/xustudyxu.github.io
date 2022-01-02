(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{1109:function(a,e,v){"use strict";v.r(e);var s=v(59),t=Object(s.a)({},(function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"环境搭建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#环境搭建"}},[a._v("#")]),a._v(" 环境搭建")]),a._v(" "),s("h2",{attrs:{id:"python版本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#python版本"}},[a._v("#")]),a._v(" Python版本")]),a._v(" "),s("p",[a._v("本课程用到的Python版本都是3.x。要有一定的Python基础，知道列表、字符串、函数等的用法。")]),a._v(" "),s("hr"),a._v(" "),s("h2",{attrs:{id:"anaconda"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#anaconda"}},[a._v("#")]),a._v(" Anaconda")]),a._v(" "),s("p",[s("code",[a._v("Anaconda（水蟒）")]),a._v("是一个捆绑了"),s("code",[a._v("Python")]),a._v("、"),s("code",[a._v("conda")]),a._v("、其他相关依赖包的一个软件。包含了180多个可学计算包及其依赖。"),s("code",[a._v("Anaconda3")]),a._v("是集成了"),s("code",[a._v("Python3")]),a._v("的环境，"),s("code",[a._v("Anaconda2")]),a._v("是集成了"),s("code",[a._v("Python2")]),a._v("的环境。"),s("code",[a._v("Anaconda")]),a._v("默认集成的包，是属于内置的"),s("code",[a._v("Python")]),a._v("的包。并且支持绝大部分操作系统（比如：Windows、Mac、Linux等）。下载地址如下："),s("code",[a._v("https://www.anaconda.com/distribution/")]),a._v("（如果官网下载太慢，可以在清华大学开源软件站中下载："),s("code",[a._v("https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/")]),a._v("）。根据自己的操作系统，下载相应的版本，因为"),s("code",[a._v("Anaconda")]),a._v("内置了许多的包，所以安装过程需要耗费相当长的时间，大家在安装的时候需要耐心等待。在安装完成后，会有以下几个模块："),s("code",[a._v("Anaconda prompt")]),a._v("、"),s("code",[a._v("Anaconda Navigator")]),a._v("、"),s("code",[a._v("Spyder")]),a._v("、"),s("code",[a._v("jupyter notebook")]),a._v("，以下分别做一些介绍。")]),a._v(" "),s("h3",{attrs:{id:"anaconda-prompt"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#anaconda-prompt"}},[a._v("#")]),a._v(" Anaconda prompt")]),a._v(" "),s("p",[s("code",[a._v("Anaconda prompt")]),a._v("是专门用来操作"),s("code",[a._v("anaconda")]),a._v("的终端。如果你安装完"),s("code",[a._v("Anaconda")]),a._v("后没有在环境变量的"),s("code",[a._v("PATH")]),a._v("中添加相关的环境变量，那么以后你想在终端使用"),s("code",[a._v("anaconda")]),a._v("相关的命令，则必须要在"),s("code",[a._v("Anaconda prompt")]),a._v("中完成。"),s("br"),a._v(" "),s("img",{attrs:{src:v(851),alt:"1636551744920"}})]),a._v(" "),s("h3",{attrs:{id:"anaconda-navigator"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#anaconda-navigator"}},[a._v("#")]),a._v(" Anaconda Navigator")]),a._v(" "),s("p",[a._v("这个相当于是一个导航面板，上面组织了"),s("code",[a._v("Anaconda")]),a._v("相关的软件。")]),a._v(" "),s("h3",{attrs:{id:"spyder"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#spyder"}},[a._v("#")]),a._v(" Spyder")]),a._v(" "),s("p",[a._v("一个专门开发"),s("code",[a._v("Python")]),a._v("的软件，熟悉"),s("code",[a._v("MATLAB")]),a._v("的同学会比较有亲切感，但在后期的学习过程中，我们将不会使用这个工具写代码，因为还有更好的可替代的工具。"),s("br"),a._v(" "),s("img",{attrs:{src:v(852),alt:"1636551784398"}})]),a._v(" "),s("h3",{attrs:{id:"jupyter-notebook"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jupyter-notebook"}},[a._v("#")]),a._v(" jupyter notebook")]),a._v(" "),s("p",[a._v("一个Python编辑环境，可以实时的查看代码的运行效果。")]),a._v(" "),s("p",[s("img",{attrs:{src:v(853),alt:"1636551817299"}})]),a._v(" "),s("h2",{attrs:{id:"使用jupyter-notebook的方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用jupyter-notebook的方式"}},[a._v("#")]),a._v(" 使用jupyter notebook的方式")]),a._v(" "),s("ol",[s("li",[a._v("先打开"),s("code",[a._v("Anaconda Prompt")]),a._v("，然后进入到项目所在的目录。")]),a._v(" "),s("li",[a._v("输入命令"),s("code",[a._v("jupyter notebook")]),a._v("打开"),s("code",[a._v("jupyter notebook")]),a._v("浏览器。")])]),a._v(" "),s("h2",{attrs:{id:"conda基本使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#conda基本使用"}},[a._v("#")]),a._v(" conda基本使用")]),a._v(" "),s("p",[s("code",[a._v("conda")]),a._v("伴随着"),s("code",[a._v("Anaconda")]),a._v("安装而自动安装的。"),s("code",[a._v("conda")]),a._v("可以跟"),s("code",[a._v("virtualenv")]),a._v("一样管理不同的环境，也可以跟"),s("code",[a._v("pip")]),a._v("一样管理某个环境下的包。以下来看看两个功能的用法。")]),a._v(" "),s("h3",{attrs:{id:"环境管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#环境管理"}},[a._v("#")]),a._v(" 环境管理")]),a._v(" "),s("p",[s("code",[a._v("conda")]),a._v("能跟"),s("code",[a._v("virtualenv")]),a._v("一样管理不同的"),s("code",[a._v("Python")]),a._v("环境，不同的环境之间是互相隔离，互不影响的。为什么需要创建不同的环境呢？原因是有时候项目比较多，但是项目依赖的包不一样，比如"),s("code",[a._v("A")]),a._v("项目用的是"),s("code",[a._v("Python2")]),a._v("开发的，而"),s("code",[a._v("B")]),a._v("项目用的是"),s("code",[a._v("Python3")]),a._v("开发的，那么我们在同一台电脑上就需要两套不同的环境来支撑他们运行了。创建环境的基本命令如下：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# conda create --name [环境名称] 比如以下：")]),a._v("\nconda create --name da-env\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("这样将创建一个叫做"),s("code",[a._v("da-env")]),a._v("的环境，这个环境的"),s("code",[a._v("python")]),a._v("解释器根据"),s("code",[a._v("anaconda")]),a._v("来，如果"),s("code",[a._v("anaconda")]),a._v("为"),s("code",[a._v("3.7")]),a._v("，那么将默认使用"),s("code",[a._v("3.7")]),a._v("的环境，如果"),s("code",[a._v("anaconda")]),a._v("内置的是"),s("code",[a._v("2.7")]),a._v("，那么将默认使用"),s("code",[a._v("2.7")]),a._v("的环境。然后你就可以使用"),s("code",[a._v("conda install numpy")]),a._v("的方式来安装包了，并且这样安装进来的包，只会安装在当前环境中。有的同学可能有想问，如果想要装一个"),s("code",[a._v("Python2.7")]),a._v("的环境，"),s("code",[a._v("anaconda")]),a._v("中没有内置"),s("code",[a._v("Python2.7")]),a._v("，那么该怎么实现呢？。实际上，我们只需要在安装的时候指定"),s("code",[a._v("python")]),a._v("的版本，如果这个版本现在不存在，那么"),s("code",[a._v("anaconda")]),a._v("会自动的给我们下载。所以安装"),s("code",[a._v("Python2.7")]),a._v("的环境，使用以下代码即可实现：")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v("conda create --name xxx "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("python")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2.7")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("以下再列出"),s("code",[a._v("conda")]),a._v("管理环境的其他命令：")]),a._v(" "),s("ol",[s("li",[s("p",[a._v("创建的时候指定需要安装的包：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" conda create --name xxx numpy pandas\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("创建的时候既需要指定包，也需要指定python环境：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" conda create --name xxx "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("python")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3.7")]),a._v(" numpy pandas\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("进入到某个环境")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" windows: activate xxx\n mac/linux: "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("source")]),a._v(" activate xxx\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("退出环境：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" deactivate\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("列出当前所有的环境：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" conda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("env")]),a._v(" list\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("移除某个环境：")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v(" conda remove --name xxx --all\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("环境下的包导出和导入：")]),a._v(" "),s("ul",[s("li",[a._v("导出："),s("code",[a._v("conda env export > environment.yml")]),a._v("。")]),a._v(" "),s("li",[a._v("导入："),s("code",[a._v("conda env create --name xxx -f environment.yml")]),a._v("。")])])])]),a._v(" "),s("h3",{attrs:{id:"包管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#包管理"}},[a._v("#")]),a._v(" 包管理")]),a._v(" "),s("p",[s("code",[a._v("conda")]),a._v("也可以用来管理包。比如我们创建完一个新的环境后，想要在这个环境中安装包（比如numpy），那么可以通过以下代码来实现：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("activate xxx\nconda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" numpy\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("以下再介绍一些包管理常用的命令：")]),a._v(" "),s("ol",[s("li",[s("p",[a._v("在不进入某个环境下直接给这个环境安装包：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("conda "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("包名"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" -n "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("环境名"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("列出该环境下所有的包：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" conda list\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("卸载某个包：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" conda remove "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("包名"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("设置安装包的源：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/\n conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/\n conda config --set show_channel_urls "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("yes")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])])])]),a._v(" "),s("h1",{attrs:{id:"jupyter-notebook使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jupyter-notebook使用"}},[a._v("#")]),a._v(" Jupyter notebook使用")]),a._v(" "),s("h2",{attrs:{id:"常用快捷键"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用快捷键"}},[a._v("#")]),a._v(" 常用快捷键")]),a._v(" "),s("h3",{attrs:{id:"命令模式-按esc键"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命令模式-按esc键"}},[a._v("#")]),a._v(" 命令模式（按Esc键）")]),a._v(" "),s("ol",[s("li",[a._v("Enter：转入编辑模式")]),a._v(" "),s("li",[a._v("Shift-Enter：运行本单元，选中下个单元")]),a._v(" "),s("li",[a._v("Ctrl-Enter：运行本单元")]),a._v(" "),s("li",[a._v("Alt-Enter：运行本单元，在其下插入新单元")]),a._v(" "),s("li",[a._v("Y：单元转入代码状态")]),a._v(" "),s("li",[a._v("M：单元转入markdown状态")]),a._v(" "),s("li",[a._v("R：单元转入raw状态")]),a._v(" "),s("li",[a._v("1：设定 1 级标题")]),a._v(" "),s("li",[a._v("2：设定 2 级标题")]),a._v(" "),s("li",[a._v("3：设定 3 级标题")]),a._v(" "),s("li",[a._v("4：设定 4 级标题")]),a._v(" "),s("li",[a._v("5：设定 5 级标题")]),a._v(" "),s("li",[a._v("6：设定 6 级标题")]),a._v(" "),s("li",[a._v("Up：选中上方单元")]),a._v(" "),s("li",[a._v("K：选中上方单元")]),a._v(" "),s("li",[a._v("Down：选中下方单元")]),a._v(" "),s("li",[a._v("J：选中下方单元")]),a._v(" "),s("li",[a._v("Shift-K：扩大选中上方单元")]),a._v(" "),s("li",[a._v("Shift-J：扩大选中下方单元")]),a._v(" "),s("li",[a._v("A：在上方插入新单元")]),a._v(" "),s("li",[a._v("B：在下方插入新单元")]),a._v(" "),s("li",[a._v("X：剪切选中的单元")]),a._v(" "),s("li",[a._v("C：复制选中的单元")]),a._v(" "),s("li",[a._v("Shift-V：粘贴到上方单元")]),a._v(" "),s("li",[a._v("V：粘贴到下方单元")]),a._v(" "),s("li",[a._v("Z：恢复删除的最后一个单元")]),a._v(" "),s("li",[a._v("D,D：删除选中的单元")]),a._v(" "),s("li",[a._v("Shift-M：合并选中的单元")]),a._v(" "),s("li",[a._v("Ctrl-S：文件存盘")]),a._v(" "),s("li",[a._v("S：文件存盘")]),a._v(" "),s("li",[a._v("L：转换行号")]),a._v(" "),s("li",[a._v("O：转换输出")]),a._v(" "),s("li",[a._v("Shift-O：转换输出滚动")]),a._v(" "),s("li",[a._v("Esc：关闭页面")]),a._v(" "),s("li",[a._v("Q：关闭页面")]),a._v(" "),s("li",[a._v("H：显示快捷键帮助")]),a._v(" "),s("li",[a._v("I,I：中断Notebook内核")]),a._v(" "),s("li",[a._v("0,0：重启Notebook内核")]),a._v(" "),s("li",[a._v("Shift：忽略")]),a._v(" "),s("li",[a._v("Shift-Space：向上滚动")]),a._v(" "),s("li",[a._v("Space：向下滚动")])]),a._v(" "),s("h3",{attrs:{id:"编辑模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#编辑模式"}},[a._v("#")]),a._v(" 编辑模式")]),a._v(" "),s("ol",[s("li",[a._v("Tab : 代码补全或缩进")]),a._v(" "),s("li",[a._v("Shift-Tab : 提示")]),a._v(" "),s("li",[a._v("Ctrl-] : 缩进")]),a._v(" "),s("li",[a._v("Ctrl-[ : 解除缩进")]),a._v(" "),s("li",[a._v("Ctrl-A : 全选")]),a._v(" "),s("li",[a._v("Ctrl-Z : 复原")]),a._v(" "),s("li",[a._v("Ctrl-Shift-Z : 再做")]),a._v(" "),s("li",[a._v("Ctrl-Y : 再做")]),a._v(" "),s("li",[a._v("Ctrl-Home : 跳到单元开头")]),a._v(" "),s("li",[a._v("Ctrl-Up : 跳到单元开头")]),a._v(" "),s("li",[a._v("Ctrl-End : 跳到单元末尾")]),a._v(" "),s("li",[a._v("Ctrl-Down : 跳到单元末尾")]),a._v(" "),s("li",[a._v("Ctrl-Left : 跳到左边一个字首")]),a._v(" "),s("li",[a._v("Ctrl-Right : 跳到右边一个字首")]),a._v(" "),s("li",[a._v("Ctrl-Backspace : 删除前面一个字")]),a._v(" "),s("li",[a._v("Ctrl-Delete : 删除后面一个字")]),a._v(" "),s("li",[a._v("Esc : 进入命令模式")]),a._v(" "),s("li",[a._v("Ctrl-M : 进入命令模式")]),a._v(" "),s("li",[a._v("Shift-Enter : 运行本单元，选中下一单元")]),a._v(" "),s("li",[a._v("Ctrl-Enter : 运行本单元")]),a._v(" "),s("li",[a._v("Alt-Enter : 运行本单元，在下面插入一单元")]),a._v(" "),s("li",[a._v("Ctrl-Shift-- : 分割单元")]),a._v(" "),s("li",[a._v("Ctrl-Shift-Subtract : 分割单元")]),a._v(" "),s("li",[a._v("Ctrl-S : 文件存盘")]),a._v(" "),s("li",[a._v("Shift : 忽略")]),a._v(" "),s("li",[a._v("Up : 光标上移或转入上一单元")]),a._v(" "),s("li",[a._v("Down :光标下移或转入下一单元")])]),a._v(" "),s("h2",{attrs:{id:"注意事项"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#注意事项"}},[a._v("#")]),a._v(" 注意事项")]),a._v(" "),s("p",[s("code",[a._v("jupyter notebook")]),a._v("每一个"),s("code",[a._v("cell")]),a._v("运行完后都会把这个"),s("code",[a._v("cell")]),a._v("中的变量保存到内存中，如果在一个"),s("code",[a._v("cell")]),a._v("中修改了之前的变量，再此运行这个"),s("code",[a._v("cell")]),a._v("的时候可能会导致一些问题产生。比如以下代码：")]),a._v(" "),s("div",{staticClass:"language-python line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 第一个cell中的代码")]),a._v("\na "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("10")]),a._v("\nb "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("20")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 第二个cell中的代码")]),a._v("\nc "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" a"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("b\nb "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br")])]),s("p",[a._v("因为第二个"),s("code",[a._v("cell")]),a._v("修改了"),s("code",[a._v("b")]),a._v("变量，此时在整个环境中"),s("code",[a._v("b")]),a._v("都是等于0的，所以以后再运行这个"),s("code",[a._v("cell")]),a._v("的时候，"),s("code",[a._v("a/b")]),a._v("这个就会出问题了。这时候可以使用"),s("code",[a._v("Kernel->Rstart&Run All")]),a._v("来重新运行整个项目。")])])}),[],!1,null,null,null);e.default=t.exports},851:function(a,e,v){a.exports=v.p+"assets/img/01.1b4d1295.png"},852:function(a,e,v){a.exports=v.p+"assets/img/02.1c17a043.png"},853:function(a,e,v){a.exports=v.p+"assets/img/03.0f8fd576.png"}}]);