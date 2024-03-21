(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{466:function(a,s,t){"use strict";t.r(s);var e=t(10),r=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"mvc-三层架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mvc-三层架构"}},[a._v("#")]),a._v(" MVC 三层架构")]),a._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#mvc-设计模式的由来"}},[a._v("MVC 设计模式的由来")])]),s("li",[s("a",{attrs:{href:"#mvc-三层架构"}},[a._v("MVC 三层架构")]),s("ul",[s("li",[s("a",{attrs:{href:"#早些年"}},[a._v("早些年")])]),s("li",[s("a",{attrs:{href:"#如今"}},[a._v("如今")])])])])])]),s("p"),a._v(" "),s("h2",{attrs:{id:"mvc-设计模式的由来"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mvc-设计模式的由来"}},[a._v("#")]),a._v(" MVC 设计模式的由来")]),a._v(" "),s("p",[a._v("MVC 模式的概念：")]),a._v(" "),s("p",[a._v("MVC 模式并不是 JavaWeb 项目中独有的，MVC 是一种软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller），是一种软件设计的典范。")]),a._v(" "),s("p",[a._v("MVC 模式的详解:")]),a._v(" "),s("ul",[s("li",[a._v("控制器 Controller：控制请求的处理逻辑，对请求进行处理，负责请求转发，")]),a._v(" "),s("li",[a._v("视图 View：用户看到并与之交互的界面，比如 HTML（静态资源），JSP（动态资源）等等。")]),a._v(" "),s("li",[a._v("模型 Model：一种企业规范，也就是业务流程、状态的处理以及业务规则的规定。业务流程的处理过程对其他层来说是不透明的，模型接受视图数据的请求，并返回最终的处理结果。业务模型的设计可以说是 MVC 的核心。")])]),a._v(" "),s("p",[a._v("MVC 模式的应用：")]),a._v(" "),s("p",[a._v("MVC 模式被广泛用于 Java 的各种框架中，比如早期的 Struts2 框架和目前市面上主流的 SpringMVC 框架都用到了这种思想。")]),a._v(" "),s("h2",{attrs:{id:"mvc-三层架构-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mvc-三层架构-2"}},[a._v("#")]),a._v(" MVC 三层架构")]),a._v(" "),s("p",[a._v("Model View Controller 模型、视图、控制器")]),a._v(" "),s("h3",{attrs:{id:"早些年"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#早些年"}},[a._v("#")]),a._v(" 早些年")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.5danx0e3lhw0.webp",alt:"image"}})]),a._v(" "),s("p",[a._v("用户直接访问控制层，控制层就可以直接操作数据库")]),a._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[a._v("serclet"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("CRUD")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("数据库\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("弊端:程序十分臃肿，不利于维护")]),a._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[a._v("servlet的代码中：处理请求、响应、视图跳转、处理"),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("JDBC")]),a._v("、处理业务代码、处理逻辑代码\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("架构:没有什么是加一层解决不了的!")]),a._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[a._v("程序员调用jdbc\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v("\njdbc\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("MySQL")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Oracle")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("SqlServer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br")])]),s("h3",{attrs:{id:"如今"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如今"}},[a._v("#")]),a._v(" 如今")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220423/image.4itz02rhe2g0.webp",alt:"image"}})]),a._v(" "),s("p",[a._v("Model")]),a._v(" "),s("ul",[s("li",[a._v("业务处理：业务逻辑（Service）")]),a._v(" "),s("li",[a._v("数据持久层：CRUD （Dao）")])]),a._v(" "),s("p",[a._v("View")]),a._v(" "),s("ul",[s("li",[a._v("展示数据")]),a._v(" "),s("li",[a._v("提供链接发起Servlet请求（a，form，img…）")])]),a._v(" "),s("p",[a._v("Controller（Servlet）")]),a._v(" "),s("ul",[s("li",[a._v("接受用户的请求：（req：请求参数、Session信息…）")]),a._v(" "),s("li",[a._v("交给业务层处理对应的代码")]),a._v(" "),s("li",[a._v("控制视图的跳转")])]),a._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[a._v("登录"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("接受用户的登陆请求"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("处理用户的请求"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("获取用户登录的参数，username"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("password"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("交给业务层处理登陆业务"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("判断用户名密码是否正确"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v("事务"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Dao")]),a._v("层查询用户名和密码是否正确"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("数据库\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])])}),[],!1,null,null,null);s.default=r.exports}}]);