(window.webpackJsonp=window.webpackJsonp||[]).push([[352],{703:function(t,a,Q){"use strict";Q.r(a);var s=Q(10),r=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"linux-搭建javaee环境"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linux-搭建javaee环境"}},[t._v("#")]),t._v(" Linux 搭建JavaEE环境")]),t._v(" "),a("h2",{attrs:{id:"概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" 概述")]),t._v(" "),a("p",[t._v("如果需要在Linux下进行JavaEE的开发，我们需要安装如下软件")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/Linux/images/14/01.png",alt:"01"}})]),t._v(" "),a("h2",{attrs:{id:"安装jdk"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装jdk"}},[t._v("#")]),t._v(" 安装JDK")]),t._v(" "),a("h3",{attrs:{id:"安装步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装步骤"}},[t._v("#")]),t._v(" 安装步骤")]),t._v(" "),a("ol",[a("li",[t._v("mkdir /opt/jdk")]),t._v(" "),a("li",[t._v("通过xftp6上传到/opt/jdk下")]),t._v(" "),a("li",[t._v("cd /opt/jdk")]),t._v(" "),a("li",[t._v("解压tar -zxvf jdk-8u261-linux-x64.tar.gz")]),t._v(" "),a("li",[t._v("mkdir /usr/local/java")]),t._v(" "),a("li",[t._v("mv /opt/jdk/jdk1.8.0_261  /usr/local/java")]),t._v(" "),a("li",[t._v("配置环境变量的配置文件vim /etc/profile")]),t._v(" "),a("li",[t._v("export JAVA_HOME=/usr/local/java/jdk1.8.0_261")]),t._v(" "),a("li",[t._v("export PATH="),a("mjx-container",{staticClass:"MathJax",attrs:{jax:"SVG"}},[a("svg",{staticStyle:{"vertical-align":"-0.566ex"},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"19.37ex",height:"2.262ex",viewBox:"0 -750 8561.7 1000"}},[a("g",{attrs:{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"matrix(1 0 0 -1 0 0)"}},[a("g",{attrs:{"data-mml-node":"math"}},[a("g",{attrs:{"data-mml-node":"mi"}},[a("path",{attrs:{"data-c":"4A",d:"M447 625Q447 637 354 637H329Q323 642 323 645T325 664Q329 677 335 683H352Q393 681 498 681Q541 681 568 681T605 682T619 682Q633 682 633 672Q633 670 630 658Q626 642 623 640T604 637Q552 637 545 623Q541 610 483 376Q420 128 419 127Q397 64 333 21T195 -22Q137 -22 97 8T57 88Q57 130 80 152T132 174Q177 174 182 130Q182 98 164 80T123 56Q115 54 115 53T122 44Q148 15 197 15Q235 15 271 47T324 130Q328 142 387 380T447 625Z"}})]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(633, 0)"}},[a("path",{attrs:{"data-c":"41",d:"M208 74Q208 50 254 46Q272 46 272 35Q272 34 270 22Q267 8 264 4T251 0Q249 0 239 0T205 1T141 2Q70 2 50 0H42Q35 7 35 11Q37 38 48 46H62Q132 49 164 96Q170 102 345 401T523 704Q530 716 547 716H555H572Q578 707 578 706L606 383Q634 60 636 57Q641 46 701 46Q726 46 726 36Q726 34 723 22Q720 7 718 4T704 0Q701 0 690 0T651 1T578 2Q484 2 455 0H443Q437 6 437 9T439 27Q443 40 445 43L449 46H469Q523 49 533 63L521 213H283L249 155Q208 86 208 74ZM516 260Q516 271 504 416T490 562L463 519Q447 492 400 412L310 260L413 259Q516 259 516 260Z"}})]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(1383, 0)"}},[a("path",{attrs:{"data-c":"56",d:"M52 648Q52 670 65 683H76Q118 680 181 680Q299 680 320 683H330Q336 677 336 674T334 656Q329 641 325 637H304Q282 635 274 635Q245 630 242 620Q242 618 271 369T301 118L374 235Q447 352 520 471T595 594Q599 601 599 609Q599 633 555 637Q537 637 537 648Q537 649 539 661Q542 675 545 679T558 683Q560 683 570 683T604 682T668 681Q737 681 755 683H762Q769 676 769 672Q769 655 760 640Q757 637 743 637Q730 636 719 635T698 630T682 623T670 615T660 608T652 599T645 592L452 282Q272 -9 266 -16Q263 -18 259 -21L241 -22H234Q216 -22 216 -15Q213 -9 177 305Q139 623 138 626Q133 637 76 637H59Q52 642 52 648Z"}})]),a("g",{attrs:{"data-mml-node":"msub",transform:"translate(2152, 0)"}},[a("g",{attrs:{"data-mml-node":"mi"}},[a("path",{attrs:{"data-c":"41",d:"M208 74Q208 50 254 46Q272 46 272 35Q272 34 270 22Q267 8 264 4T251 0Q249 0 239 0T205 1T141 2Q70 2 50 0H42Q35 7 35 11Q37 38 48 46H62Q132 49 164 96Q170 102 345 401T523 704Q530 716 547 716H555H572Q578 707 578 706L606 383Q634 60 636 57Q641 46 701 46Q726 46 726 36Q726 34 723 22Q720 7 718 4T704 0Q701 0 690 0T651 1T578 2Q484 2 455 0H443Q437 6 437 9T439 27Q443 40 445 43L449 46H469Q523 49 533 63L521 213H283L249 155Q208 86 208 74ZM516 260Q516 271 504 416T490 562L463 519Q447 492 400 412L310 260L413 259Q516 259 516 260Z"}})]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(750, -150) scale(0.707)"}},[a("path",{attrs:{"data-c":"48",d:"M228 637Q194 637 192 641Q191 643 191 649Q191 673 202 682Q204 683 219 683Q260 681 355 681Q389 681 418 681T463 682T483 682Q499 682 499 672Q499 670 497 658Q492 641 487 638H485Q483 638 480 638T473 638T464 637T455 637Q416 636 405 634T387 623Q384 619 355 500Q348 474 340 442T328 395L324 380Q324 378 469 378H614L615 381Q615 384 646 504Q674 619 674 627T617 637Q594 637 587 639T580 648Q580 650 582 660Q586 677 588 679T604 682Q609 682 646 681T740 680Q802 680 835 681T871 682Q888 682 888 672Q888 645 876 638H874Q872 638 869 638T862 638T853 637T844 637Q805 636 794 634T776 623Q773 618 704 340T634 58Q634 51 638 51Q646 48 692 46H723Q729 38 729 37T726 19Q722 6 716 0H701Q664 2 567 2Q533 2 504 2T458 2T437 1Q420 1 420 10Q420 15 423 24Q428 43 433 45Q437 46 448 46H454Q481 46 514 49Q520 50 522 50T528 55T534 64T540 82T547 110T558 153Q565 181 569 198Q602 330 602 331T457 332H312L279 197Q245 63 245 58Q245 51 253 49T303 46H334Q340 38 340 37T337 19Q333 6 327 0H312Q275 2 178 2Q144 2 115 2T69 2T48 1Q31 1 31 10Q31 12 34 24Q39 43 44 45Q48 46 59 46H65Q92 46 125 49Q139 52 144 61Q147 65 216 339T285 628Q285 635 228 637Z"}})])]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(3579.9, 0)"}},[a("path",{attrs:{"data-c":"4F",d:"M740 435Q740 320 676 213T511 42T304 -22Q207 -22 138 35T51 201Q50 209 50 244Q50 346 98 438T227 601Q351 704 476 704Q514 704 524 703Q621 689 680 617T740 435ZM637 476Q637 565 591 615T476 665Q396 665 322 605Q242 542 200 428T157 216Q157 126 200 73T314 19Q404 19 485 98T608 313Q637 408 637 476Z"}})]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(4342.9, 0)"}},[a("path",{attrs:{"data-c":"4D",d:"M289 629Q289 635 232 637Q208 637 201 638T194 648Q194 649 196 659Q197 662 198 666T199 671T201 676T203 679T207 681T212 683T220 683T232 684Q238 684 262 684T307 683Q386 683 398 683T414 678Q415 674 451 396L487 117L510 154Q534 190 574 254T662 394Q837 673 839 675Q840 676 842 678T846 681L852 683H948Q965 683 988 683T1017 684Q1051 684 1051 673Q1051 668 1048 656T1045 643Q1041 637 1008 637Q968 636 957 634T939 623Q936 618 867 340T797 59Q797 55 798 54T805 50T822 48T855 46H886Q892 37 892 35Q892 19 885 5Q880 0 869 0Q864 0 828 1T736 2Q675 2 644 2T609 1Q592 1 592 11Q592 13 594 25Q598 41 602 43T625 46Q652 46 685 49Q699 52 704 61Q706 65 742 207T813 490T848 631L654 322Q458 10 453 5Q451 4 449 3Q444 0 433 0Q418 0 415 7Q413 11 374 317L335 624L267 354Q200 88 200 79Q206 46 272 46H282Q288 41 289 37T286 19Q282 3 278 1Q274 0 267 0Q265 0 255 0T221 1T157 2Q127 2 95 1T58 0Q43 0 39 2T35 11Q35 13 38 25T43 40Q45 46 65 46Q135 46 154 86Q158 92 223 354T289 629Z"}})]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(5393.9, 0)"}},[a("path",{attrs:{"data-c":"45",d:"M492 213Q472 213 472 226Q472 230 477 250T482 285Q482 316 461 323T364 330H312Q311 328 277 192T243 52Q243 48 254 48T334 46Q428 46 458 48T518 61Q567 77 599 117T670 248Q680 270 683 272Q690 274 698 274Q718 274 718 261Q613 7 608 2Q605 0 322 0H133Q31 0 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H757Q764 676 764 669Q764 664 751 557T737 447Q735 440 717 440H705Q698 445 698 453L701 476Q704 500 704 528Q704 558 697 578T678 609T643 625T596 632T532 634H485Q397 633 392 631Q388 629 386 622Q385 619 355 499T324 377Q347 376 372 376H398Q464 376 489 391T534 472Q538 488 540 490T557 493Q562 493 565 493T570 492T572 491T574 487T577 483L544 351Q511 218 508 216Q505 213 492 213Z"}})]),a("g",{attrs:{"data-mml-node":"TeXAtom",transform:"translate(6131.9, 0)"}},[a("g",{attrs:{"data-mml-node":"mo"}},[a("path",{attrs:{"data-c":"2F",d:"M423 750Q432 750 438 744T444 730Q444 725 271 248T92 -240Q85 -250 75 -250Q68 -250 62 -245T56 -231Q56 -221 230 257T407 740Q411 750 423 750Z"}})])]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(6631.9, 0)"}},[a("path",{attrs:{"data-c":"62",d:"M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318 219Q336 291 336 325Z"}})]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(7060.9, 0)"}},[a("path",{attrs:{"data-c":"69",d:"M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z"}})]),a("g",{attrs:{"data-mml-node":"mi",transform:"translate(7405.9, 0)"}},[a("path",{attrs:{"data-c":"6E",d:"M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z"}})]),a("g",{attrs:{"data-mml-node":"mo",transform:"translate(8283.7, 0)"}},[a("path",{attrs:{"data-c":"3A",d:"M78 370Q78 394 95 412T138 430Q162 430 180 414T199 371Q199 346 182 328T139 310T96 327T78 370ZM78 60Q78 84 95 102T138 120Q162 120 180 104T199 61Q199 36 182 18T139 0T96 17T78 60Z"}})])])])])]),t._v("PATH")],1),t._v(" "),a("li",[t._v("source /etc/profile[让新的环境变量生效]")])]),t._v(" "),a("h3",{attrs:{id:"测试是否安装成功"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#测试是否安装成功"}},[t._v("#")]),t._v(" 测试是否安装成功")]),t._v(" "),a("p",[t._v('编写一个简单的Hello.java输出"hello, world!"')]),t._v(" "),a("h2",{attrs:{id:"tomcat的安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tomcat的安装"}},[t._v("#")]),t._v(" tomcat的安装")]),t._v(" "),a("h3",{attrs:{id:"安装步骤-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装步骤-2"}},[t._v("#")]),t._v(" 安装步骤")]),t._v(" "),a("ol",[a("li",[t._v("上传安装文件，并解压缩到/opt/tomcat")]),t._v(" "),a("li",[t._v("进入解压目录/bin，启动tomcat  ./startup.sh")]),t._v(" "),a("li",[t._v("开放端口8080，回顾firewall-cmd")])]),t._v(" "),a("h3",{attrs:{id:"测试是否安装成功-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#测试是否安装成功-2"}},[t._v("#")]),t._v(" 测试是否安装成功")]),t._v(" "),a("p",[t._v("在windows、Linux下访问http://linuxip:8080")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/Linux/images/14/02.png",alt:"01"}})]),t._v(" "),a("h2",{attrs:{id:"idea2020的安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#idea2020的安装"}},[t._v("#")]),t._v(" idea2020的安装")]),t._v(" "),a("h3",{attrs:{id:"步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#步骤"}},[t._v("#")]),t._v(" 步骤")]),t._v(" "),a("ol",[a("li",[t._v("下载地址: https://www.jetbrains.com/idealdownload/#section=windows")]),t._v(" "),a("li",[t._v("解压缩到/opt/idea")]),t._v(" "),a("li",[t._v("启动idea bin目录下/idea.sh，配置jdk")]),t._v(" "),a("li",[t._v("编写Hello world程序并测试成功!")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/Linux/images/14/03.png",alt:"01"}})]),t._v(" "),a("h3",{attrs:{id:"mysql5-7的安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mysql5-7的安装"}},[t._v("#")]),t._v(" mysql5.7的安装")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("新建文件夹/opt/mysql，并cd进去")])]),t._v(" "),a("li",[a("p",[t._v("运行wget http://dev.mysql.com/get/mysql-5.7.26-1.el7.x86_64.rpm-bundle.tar，下载mysql安装包")])])]),t._v(" "),a("p",[t._v("PS：centos7.6自带的类mysql数据库是mariadb，会跟mysql冲突，要先删除。")]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[t._v("运行tar -xvf mysql-5.7.26-1.el7.x86_64.rpm-bundle.tar")])]),t._v(" "),a("li",[a("p",[t._v("运行rpm -qa | grep mari，查询mariadb相关安装包")])]),t._v(" "),a("li",[a("p",[t._v("运行rpm -e--nodeps mariadb.libs，卸载")])]),t._v(" "),a("li",[a("p",[t._v("然后开始真正安装mxsql，依次运行以下几条")]),t._v(" "),a("p",[t._v("rpm -iwh mysql-community-common-5.7.26-1.e17.x86_64.rpm")]),t._v(" "),a("p",[t._v("rpm -ixh mysql-community-libs-5.7.26-1.e17.x86_64rpm")]),t._v(" "),a("p",[t._v("rpm-iwh mysql-community-client-5.7.26-1.e17.x86_64.rpm")]),t._v(" "),a("p",[t._v("rpm -ixh mysql-community-server-5.7.26-1.e17.x86_64.rpm")])]),t._v(" "),a("li",[a("p",[t._v("运行systemctl start mysqld.service，启动mysql")])]),t._v(" "),a("li",[a("p",[t._v('然后开始设器root用户密码,Mysql自动给root用户设置随机密码，运行 grep  "password"/var/log/mysqld.log可看到当前密码')])]),t._v(" "),a("li",[a("p",[t._v(".运行mysql -u root -p，用root用户登录，提示输入密码可用上述的，可以成功登陆进入mysql命令行")])]),t._v(" "),a("li",[a("p",[t._v("设置root密码，对于个人开发环境，如果要设比较简单的密码（生产环境服务器要设复杂密码)，可以运行set global validate_password_policy=o;提示密码设置策略\n( validate_password_policy 默认值1 ,)")])])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/Linux/images/14/04.png",alt:"04"}})]),t._v(" "),a("ol",{attrs:{start:"11"}},[a("li",[t._v("set password for 'root'@'localhost-password('frx01123');")]),t._v(" "),a("li",[t._v("运行flush privileges;使密码设置生效")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/Linux/images/14/05.png",alt:"01"}})]),t._v(" "),a("ul",[a("li",[a("p",[t._v("切换连接数据库的语法 : use new_dbname;")])]),t._v(" "),a("li",[a("p",[t._v("显示所有数据库 : show databases;")])]),t._v(" "),a("li",[a("p",[t._v("显示某个表创建时的全部信息 : show create table table_name")])]),t._v(" "),a("li",[a("p",[t._v("Describe table_name; 缩写形式 : desc table_name;")])]),t._v(" "),a("li",[a("p",[t._v("数据库创建 : Create database "),a("em",[t._v("db_name")]),t._v(";")])]),t._v(" "),a("li",[a("p",[t._v("数据库删除 : Drop database "),a("em",[t._v("db_name")]),t._v("; 删除时可先判断是否存在，写成 : drop database if exits db_name")])]),t._v(" "),a("li",[a("p",[t._v("建表 : 创建数据表的语法 : create table "),a("em",[t._v("table_name")]),t._v(" (字段1  数据类型 , 字段2  数据类型);")])])]),t._v(" "),a("p",[t._v("​        例 : create table mytable (id int , username char(20));")]),t._v(" "),a("p",[t._v("​        删表 : drop table "),a("em",[t._v("table_name")]),t._v(";")]),t._v(" "),a("p",[t._v("​\t\t例 : drop table mytable;")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("添加数据 : Insert into 表名 [(字段1 , 字段2 , ….)] values (值1 , 值2 , …..);")]),t._v(" "),a("p",[t._v("如果向表中的每个字段都插入一个值,那么前面 [ ] 括号内字段名可写也可不写")]),t._v(" "),a("p",[t._v("例 : insert into mytable (id,username) values (1,’zhangsan’);")])]),t._v(" "),a("li",[a("p",[a("a",{attrs:{href:"https://blog.csdn.net/hellocsz/article/details/80602477",target:"_blank",rel:"noopener noreferrer"}},[t._v("更多"),a("OutboundLink")],1)])])])])}),[],!1,null,null,null);a.default=r.exports}}]);