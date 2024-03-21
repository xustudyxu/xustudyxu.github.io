(window.webpackJsonp=window.webpackJsonp||[]).push([[336],{686:function(r,t,e){"use strict";e.r(t);var v=e(10),a=Object(v.a)({},(function(){var r=this,t=r._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[t("h1",{attrs:{id:"docker-简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker-简介"}},[r._v("#")]),r._v(" Docker 简介")]),r._v(" "),t("p",[t("a",{attrs:{href:"https://www.bilibili.com/video/BV1gr4y1U7CY?spm_id_from=333.337.search-card.all.click&vd_source=6aafd031757cd8c1dbbb98344fb3d363",target:"_blank",rel:"noopener noreferrer"}},[r._v("学习视频地址"),t("OutboundLink")],1)]),r._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#什么是虚拟化技术"}},[r._v("什么是虚拟化技术")]),t("ul",[t("li",[t("a",{attrs:{href:"#什么是虚拟化"}},[r._v("什么是虚拟化")])]),t("li",[t("a",{attrs:{href:"#虚拟化技术分类"}},[r._v("虚拟化技术分类")])]),t("li",[t("a",{attrs:{href:"#几种虚拟化技术"}},[r._v("几种虚拟化技术")])])])]),t("li",[t("a",{attrs:{href:"#为什么会有docker出现"}},[r._v("为什么会有Docker出现")])]),t("li",[t("a",{attrs:{href:"#docker理念"}},[r._v("Docker理念")]),t("ul",[t("li",[t("a",{attrs:{href:"#什么是docker"}},[r._v("什么是Docker")])]),t("li",[t("a",{attrs:{href:"#docker起源"}},[r._v("Docker起源")])])])]),t("li",[t("a",{attrs:{href:"#容器与虚拟机比较"}},[r._v("容器与虚拟机比较")])]),t("li",[t("a",{attrs:{href:"#docker能干嘛"}},[r._v("Docker能干嘛")])]),t("li",[t("a",{attrs:{href:"#docker应用场景"}},[r._v("Docker应用场景")])]),t("li",[t("a",{attrs:{href:"#docker去哪下"}},[r._v("Docker去哪下")])])])]),t("p"),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.4xkoym4mgts0.webp",alt:"image"}})]),r._v(" "),t("h2",{attrs:{id:"什么是虚拟化技术"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是虚拟化技术"}},[r._v("#")]),r._v(" 什么是虚拟化技术")]),r._v(" "),t("h3",{attrs:{id:"什么是虚拟化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是虚拟化"}},[r._v("#")]),r._v(" 什么是虚拟化")]),r._v(" "),t("p",[r._v("在计算机技术中，虚拟化（Virtualization）是一种资源管理技术。它是将计算机的各种实体资源，如：服务器、网络、内存及存储等，予以抽象、转换后呈现出来，打破实体结构间的不可切割的障碍，使用户可以用更好的方式来利用这些资源。")]),r._v(" "),t("p",[r._v("虚拟化的目的是为了在同一个主机上运行多个系统或应用，从而提高系统资源的利用率，并带来降低成本、方便管理和容错容灾等好处。")]),r._v(" "),t("h3",{attrs:{id:"虚拟化技术分类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#虚拟化技术分类"}},[r._v("#")]),r._v(" 虚拟化技术分类")]),r._v(" "),t("p",[r._v("从实现形式来分，虚拟化技术可分为基于硬件的虚拟化和基于软件的虚拟化。")]),r._v(" "),t("h4",{attrs:{id:"硬件虚拟化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#硬件虚拟化"}},[r._v("#")]),r._v(" 硬件虚拟化")]),r._v(" "),t("p",[r._v("硬件虚拟化就是硬件物理平台本身提供了对特殊指令的截获和重定向的支持。支持虚拟化的硬件，也是一些基于硬件实现软件虚拟化技术的关键。在基于硬件实现软件虚拟化的技术中，在硬件是实现虚拟化的基础，硬件(主要是CPU)会为虚拟化软件提供支持，从而实现硬件资源的虚拟化。")]),r._v(" "),t("p",[r._v("支持虚拟化的硬件有：")]),r._v(" "),t("ul",[t("li",[t("strong",[r._v("Intel-VT-(Intel Virtualization Technology)")]),r._v("，Intel 公司为解决纯软件虚拟化解决方案在可靠性、安全性和性能上的不足而引进的技术。它可以让一个CPU工作起来像多个CPU在并行运行，从而使得在一部电脑内同时运行多个操作系统成为可能")]),r._v(" "),t("li",[t("strong",[r._v("AMD-V-(AMD Virtualization)")]),r._v("，是 AMD 公司的虚拟化技术。它是对 x86 处理器系统架构的一组硬件扩展和硬件辅助虚拟化技术，可以简化纯软件的虚拟化解决方案，改进 VMM（虚拟机监视器）的设计，更充分地利用硬件资源，提高服务器和数据中心的虚拟化效率")])]),r._v(" "),t("h4",{attrs:{id:"软件虚拟化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#软件虚拟化"}},[r._v("#")]),r._v(" 软件虚拟化")]),r._v(" "),t("p",[r._v("软件虚拟化就是利用软件技术，在现有的物理平台上实现对物理平台访问的截获和模拟。在软件虚拟化技术中，有些技术不需要硬件支持，如：QEMU；而有些软件虚拟化技术，则依赖硬件支持，如：VMware、KVM。")]),r._v(" "),t("p",[r._v("对软件虚拟化进行细分，又可以分为以下几类：")]),r._v(" "),t("ul",[t("li",[t("strong",[r._v("完全虚拟化")]),r._v("：（Full Virtualization）虚拟机模拟完整的底层硬件环境和特权指令的执行过程，使客户机操作系统可以独立运行。支持完全虚拟化的软件有：Parallels Workstation、VirtualBox、Virtual Iron、Oracle VM、Virtual PC、Virtual Server、Hyper-V、VMware Workstation、QEMU等")]),r._v(" "),t("li",[t("strong",[r._v("硬件辅助虚拟化")]),r._v("：（Hardware-assisted Virtualization）是指通过硬件辅助支持模拟运行环境，使客户机操作系统可以独立运行，实现完全虚拟化的功能。支持硬件辅助虚拟化的软件有：Linux KVM、VMware Workstation、VMware Fusion、Virtual PC、Xen、VirtualBox、Parallels Workstation等")]),r._v(" "),t("li",[t("strong",[r._v("部分虚拟化")]),r._v("：（Partial Virtualization）只针对部分硬件资源进行虚拟化，虚拟机模拟部分底层硬件环境，特别是地址空间。这样的环境支持资源共享和线程独立，但是不允许建立独立的客户机操作系统。")]),r._v(" "),t("li",[t("strong",[r._v("平行虚拟化")]),r._v("：（Para-Virtualization）虚拟机不需要模拟硬件，而是将部分硬件接口以软件的形式提供给客户机操作系统。如：早期的 Xen。")]),r._v(" "),t("li",[t("strong",[r._v("操作系统层虚拟化")]),r._v("：（OS-level virtualization）这种技术将操作系统内核虚拟化，可以允许使用者空间软件实例被分割成几个独立的单元，在内核中运行，而不是只有一个单一实例运行。这个软件实例，也被称为是一个容器（containers）、虚拟引擎（Virtualization engine）、虚拟专用服务器（virtual private servers）。每个容器的进程是独立的，对于使用者来说，就像是在使用自己的专用服务器。 Docker 容器技术就是属于操作系统层虚拟化的范畴。")])]),r._v(" "),t("h3",{attrs:{id:"几种虚拟化技术"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#几种虚拟化技术"}},[r._v("#")]),r._v(" 几种虚拟化技术")]),r._v(" "),t("p",[r._v("虚拟化是通过软件的方式模拟实体服务器，其初衷是为了解决「一种应用占用一台服务器」模式所带来的服务器数量剧增的问题，从而降低数据中心复杂度，简化管理难度。在虚拟化的发展过程中，出现过以下主要虚拟化技术或产品：")]),r._v(" "),t("ul",[t("li",[r._v("Xen - 由剑桥大学开发的，一款开源的虚拟机监视器。采用 ICA 协议，它通过一种叫做准虚拟化的技术来获取高性能，甚至在一些与传统虚拟技术极度不友好的架构上（如：x86），Xen 也有极佳的表现。Xen 属于半虚拟化的技术，所以其性能损失非常小。Xen 没有指令翻译，其或者使用使能理解和翻译虚拟操作系统发出的未修改指令的 CPU（即：完全虚拟化）；或者修改操作系统，使它发出的指令最优化，便于在虚拟化环境中执行（即：准虚拟化）。")]),r._v(" "),t("li",[t("strong",[r._v("KVM")]),r._v(" - "),t("strong",[r._v("KVM 是一个 Linux kernel 模块，可以使用 modprobe 来加载 KVM，加载后还需要通过其他工具创建虚拟机。KVM 是一个全虚拟化的解决方案，但需要 CPU 支持虚拟化功能。相比 Xen 来说，KVM 可以更加方便的整合进 Linux 内核，但它还需要其它虚拟化软件（如：QEMU）才能实现虚拟化功能")]),r._v("。")]),r._v(" "),t("li",[t("strong",[r._v("LXC")]),r._v(" - 即："),t("strong",[r._v("Linux Container，Linux 容器，是一种轻量级的虚拟化的手段。它可以提供轻量级的虚拟化，以隔离进程和资源，而且不需要提供指令解释机制以及全虚拟化的其他复杂性。容器会有效地将由单个操作系统管理的资源划分到孤立的组中，以更好地在孤立的组之间平衡有冲突的资源使用需求。")])]),r._v(" "),t("li",[t("strong",[r._v("OpenVZ")]),r._v(" - 是 SWsoft 公司开发的开源软件，是该公司 Virtuozzo 软件的基础产品，是基于 Linux 平台的操作系统级服务器虚拟化解决方案。通过OpenVZ，可以在单个物理服务器上创建多个相互隔离的虚拟专用服务器(VPS)并以最大的效率共享硬件和管理资源。其上运行虚拟服务器被称为 VPS（Virtual Private Serve），每个 VPS 的运行环境和独立服务器完全一致。OpenVZ 基于 Linux 系统内核及作业系统提供操作系统级虚拟化，在虚拟化过程中资源消耗非常小，官方宣称约 1-2%。")]),r._v(" "),t("li",[t("strong",[r._v("Hyper-V")]),r._v(" - "),t("strong",[r._v("是微软件推出的一种虚拟化技术，可以采用半虚拟化或全虚拟的方式创建虚拟机。虽然它可以创建 Windows 或 Linux 操作系统，但其本身只能运行在 Windows 系统下，使用范围较为有限")]),r._v("。")]),r._v(" "),t("li",[t("strong",[r._v("Oracle VM")]),r._v(" - Oracle 推出的服务器虚拟化软件，基于开源的 Xen 技术，包括 Oracle VM Server 和 Oracle VM Manager 两部分。")]),r._v(" "),t("li",[t("strong",[r._v("VMWare")]),r._v(" - 是一家非常出名虚拟化软件公司，其产品涵盖服务器、桌面等各种虚拟化领域，如："),t("strong",[r._v("VMware Workstation")]),r._v(" - 是一款桌面虚拟机软件，可以在一台实体机器上模拟完整的网络环境，并可运行多个 Windows、DOS、Linux 或 Mac 系统，是非常好的开发、测试、部署解决方案。从技术角度来说，VMware Workstation 是一款完全虚拟化产品，可借助硬件辅助在不修改用户操作系统的情况下完整虚拟化操作系统。")]),r._v(" "),t("li",[t("strong",[r._v("VMware ESX Server")]),r._v(" - 是一款适用于任何系统环境的企业级的虚拟机软件，可以认为是 VMware Server 的升级版。相比 VMware Workstation 来说，其功能更加强大，可以用于构建高伸缩和高可靠企业级服务器，并可实现远程管理、高级资源管理控制等高级功能。")])]),r._v(" "),t("h2",{attrs:{id:"为什么会有docker出现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么会有docker出现"}},[r._v("#")]),r._v(" 为什么会有Docker出现")]),r._v(" "),t("p",[r._v("假定您在开发一个尚硅谷的谷粒商城，您使用的是一台笔记本电脑而且您的开发环境具有特定的配置。其他开发人员身处的环境配置也各有不同。您正在开发的应用依赖于您当前的配置且还要依赖于某些配置文件。此外，您的企业还拥有标准化的测试和生产环境，且具有自身的配置和一系列支持文件。您希望尽可能多在本地模拟这些环境而不产生重新创建服务器环境的开销。请问？")]),r._v(" "),t("p",[r._v("您要如何确保应用能够在这些环境中运行和通过质量检测？并且在部署过程中不出现令人头疼的版本、配置问题，也无需重新编写代码和进行故障修复？")]),r._v(" "),t("p",[r._v("答案就是使用容器。Docker之所以发展如此迅速，也是因为它对此给出了一个标准化的解决方案-----"),t("mark",[r._v("系统平滑移植，容器虚拟化技术")]),r._v("。")]),r._v(" "),t("p",[r._v("环境配置相当麻烦，换一台机器，就要重来一次，费力费时。很多人想到，能不能从根本上解决问题，"),t("strong",[r._v("软件可以带环境安装")]),r._v("？也就是说，"),t("mark",[r._v("安装的时候，把原始环境一模一样地复制过来。开发人员利用 Docker 可以消除协作编码时“在我的机器上可正常工作”的问题")]),r._v("。")]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.50gkmh7ylm40.webp",alt:"image"}})]),r._v(" "),t("p",[r._v("之前在服务器配置一个应用的运行环境，要安装各种软件，就拿尚硅谷电商项目的环境来说，Java/RabbitMQ/MySQL/JDBC驱动包等。安装和配置这些东西有多麻烦就不说了，它还不能跨平台。假如我们是在 Windows 上安装的这些环境，到了 Linux 又得重新装。况且就算不跨操作系统，换另一台同样操作系统的服务器，要"),t("strong",[r._v("移植")]),r._v("应用也是非常麻烦的。")]),r._v(" "),t("p",[r._v("传统上认为，软件编码开发/测试结束后，所产出的成果即是程序或是能够编译执行的二进制字节码等(java为例)。而为了让这些程序可以顺利执行，开发团队也得准备完整的部署文件，让维运团队得以部署应用程式，"),t("strong",[r._v("开发需要清楚的告诉运维部署团队，用的全部配置文件+所有软件环境。不过，即便如此，仍然常常发生部署失败的状况")]),r._v("。Docker的出现"),t("mark",[r._v("使得Docker得以打破过去「程序即应用」的观念。透过镜像(images)将作业系统核心除外，运作应用程式所需要的系统环境，由下而上打包，达到应用程式跨平台间的无缝接轨运作")]),r._v("。")]),r._v(" "),t("h2",{attrs:{id:"docker理念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker理念"}},[r._v("#")]),r._v(" Docker理念")]),r._v(" "),t("h3",{attrs:{id:"什么是docker"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是docker"}},[r._v("#")]),r._v(" 什么是Docker")]),r._v(" "),t("p",[r._v("Docker 是一个开源的应用容器引擎，它让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到安装了任何 Linux 发行版本的机器上。Docker 基于 LXC 来实现类似 VM 的功能，可以在更有限的硬件资源上提供给用户更多的计算资源。与同 VM 等虚拟化的方式不同，LXC 不属于全虚拟化、部分虚拟化或半虚拟化中的任何一个分类，而是一个操作系统级虚拟化。")]),r._v(" "),t("p",[r._v("Docker 是直接运行在宿主操作系统之上的一个容器，使用沙箱机制完全虚拟出一个完整的操作，容器之间不会有任何接口，从而让容器与宿主机之间、容器与容器之间隔离的更加彻底。每个容器会有自己的权限管理，独立的网络与存储栈，及自己的资源管理能，使同一台宿主机上可以友好的共存多个容器。")]),r._v(" "),t("p",[r._v("Docker 借助 Linux 的内核特性，如：控制组（Control Group）、命名空间（Namespace）等，并直接调用操作系统的系统调用接口。从而降低每个容器的系统开销，并实现降低容器复杂度、启动快、资源占用小等特征。")]),r._v(" "),t("h3",{attrs:{id:"docker起源"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker起源"}},[r._v("#")]),r._v(" Docker起源")]),r._v(" "),t("blockquote",[t("p",[t("strong",[r._v("Docker 历史")])])]),r._v(" "),t("p",[r._v("2010 年，几个搞 IT 的年轻人，在美国旧金山成立了一家名叫「dotCloud」的公司。")]),r._v(" "),t("p",[r._v("这家公司主要提供基于 PaaS 的云计算技术服务。具体来说，是和 LXC 有关的容器技术。")]),r._v(" "),t("p",[r._v("后来，dotCloud 公司将自己的容器技术进行了简化和标准化，并命名为 Docker。")]),r._v(" "),t("p",[r._v("Docker 技术诞生之后，并没有引起行业的关注。而 dotCloud 公司，作为一家小型创业企业，在激烈的竞争之下，也步履维艰。")]),r._v(" "),t("p",[r._v("正当他们快要坚持不下去的时候，脑子里蹦出了「开源」的想法。")]),r._v(" "),t("p",[r._v("什么是开源？开源，就是开放源代码。也就是将原来内部保密的程序源代码开放给所有人，然后让大家一起参与进来，贡献代码和意见。")]),r._v(" "),t("p",[r._v("有的软件是一开始就开源的。也有的软件，是混不下去，创造者又不想放弃，所以选择开源。自己养不活，就吃「百家饭」嘛。")]),r._v(" "),t("p",[r._v("2013 年 3 月，dotCloud 公司的创始人之一，Docker 之父，28岁的 Solomon Hykes 正式决定，将 Docker 项目开源。 不开则已，一开惊人。")]),r._v(" "),t("p",[r._v("越来越多的IT工程师发现了 Docker 的优点，然后蜂拥而至，加入 Docker 开源社区。")]),r._v(" "),t("p",[r._v("Docker 的人气迅速攀升，速度之快，令人瞠目结舌。")]),r._v(" "),t("p",[r._v("开源当月，Docker 0.1 版本发布。此后的每一个月，Docker 都会发布一个版本。到 2014 年 6 月 9 日，Docker 1.0 版本正式发布。")]),r._v(" "),t("p",[r._v("此时的 Docker，已经成为行业里人气最火爆的开源技术，没有之一。甚至像 Google、微软、Amazon、VMware 这样的巨头，都对它青睐有加，表示将全力支持。")]),r._v(" "),t("p",[r._v("Docker 和容器技术为什么会这么火爆？说白了，就是因为它「轻」。")]),r._v(" "),t("p",[r._v("在容器技术之前，业界的网红是虚拟机。虚拟机技术的代表，是 VMWare 和 OpenStack。")]),r._v(" "),t("p",[r._v("相信很多人都用过虚拟机。虚拟机，就是在你的操作系统里面，装一个软件，然后通过这个软件，再模拟一台甚至多台「子电脑」出来。")]),r._v(" "),t("p",[r._v("在「子电脑」里，你可以和正常电脑一样运行程序，例如开 QQ。如果你愿意，你可以变出好几个「子电脑」，里面都开上 QQ。「子电脑」和「子电脑」之间，是相互隔离的，互不影响。")]),r._v(" "),t("p",[r._v("虚拟机属于虚拟化技术。而 Docker 这样的容器技术，也是虚拟化技术，属于轻量级的虚拟化。")]),r._v(" "),t("p",[r._v("虚拟机虽然可以隔离出很多「子电脑」，但占用空间更大，启动更慢，虚拟机软件可能还要花钱（例如 VMWare）。")]),r._v(" "),t("p",[r._v("而容器技术恰好没有这些缺点。它不需要虚拟出整个操作系统，只需要虚拟一个小规模的环境（类似「沙箱」）。")]),r._v(" "),t("p",[r._v("它启动时间很快，几秒钟就能完成。而且，它对资源的利用率很高（一台主机可以同时运行几千个 Docker 容器）。此外，它占的空间很小，虚拟机一般要几 GB 到几十 GB 的空间，而容器只需要 MB 级甚至 KB 级。")]),r._v(" "),t("p",[r._v("正因为如此，容器技术受到了热烈的欢迎和追捧，发展迅速。")]),r._v(" "),t("p",[t("mark",[r._v("Docker是基于Go语言实现的云开源项目")]),r._v("。")]),r._v(" "),t("p",[r._v("Docker的主要目标是“Build，Ship and Run Any App,Anywhere”，也就是通过对应用组件的封装、分发、部署、运行等生命周期的管理，使用户的APP（可以是一个WEB应用或数据库应用等等）及其运行环境能够做到“"),t("mark",[r._v("一次镜像，处处运行")]),r._v("”。")]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.24ur8bklcyyo.webp",alt:"image"}})]),r._v(" "),t("p",[t("strong",[r._v("Linux容器技术的出现就解决了这样一个问题，而 Docker 就是在它的基础上发展过来的")]),r._v("。将应用打成镜像，通过镜像成为运行在Docker容器上面的实例，而 Docker容器在任何操作系统上都是一致的，这就实现了跨平台、跨服务器。"),t("mark",[r._v("只需要一次配置好环境，换到别的机子上就可以一键部署好，大大简化了操作")]),r._v("。")]),r._v(" "),t("ul",[t("li",[r._v("一句话")])]),r._v(" "),t("p",[r._v("解决了"),t("mark",[r._v("运行环境和配置问题")]),r._v("的"),t("mark",[r._v("软件容器")]),r._v("， 方便做持续集成并有助于整体发布的容器虚拟化技术。")]),r._v(" "),t("h2",{attrs:{id:"容器与虚拟机比较"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#容器与虚拟机比较"}},[r._v("#")]),r._v(" 容器与虚拟机比较")]),r._v(" "),t("ul",[t("li",[r._v("容器发展简史")])]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.21qlt9t32ebk.webp",alt:"image"}})]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.7cxtwgd9ems0.webp",alt:"image"}})]),r._v(" "),t("ul",[t("li",[r._v("传统虚拟机技术")])]),r._v(" "),t("p",[r._v("虚拟机（virtual machine）就是带环境安装的一种解决方案。")]),r._v(" "),t("p",[r._v("它可以在一种操作系统里面运行另一种操作系统，比如在Windows10系统里面运行Linux系统CentOS7。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。这类虚拟机完美的运行了另一套系统，能够使应用程序，操作系统和硬件三者之间的逻辑不变。")]),r._v(" "),t("table",[t("thead",[t("tr",[t("th",[r._v("Win10")]),r._v(" "),t("th",[r._v("VMWare")]),r._v(" "),t("th",[r._v("Centos7")]),r._v(" "),t("th",[r._v("各种cpu、内存网络额配置+各种软件")]),r._v(" "),t("th",[r._v("虚拟机实例")])])]),r._v(" "),t("tbody",[t("tr",[t("td"),r._v(" "),t("td"),r._v(" "),t("td"),r._v(" "),t("td"),r._v(" "),t("td")])])]),r._v(" "),t("p",[t("strong",[r._v("传统虚拟机技术基于安装在主操作系统上的虚拟机管理系统(如:VirtualBox和VMWare等)，创建虚拟机(虚拟出各种硬件)，在虚拟机上安装从操作系统，在从操作系统中安装部署各种应用。")])]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.5qzk2axr1kg.webp",alt:"image"}})]),r._v(" "),t("ul",[t("li",[r._v("虚拟机的缺点：")])]),r._v(" "),t("ol",[t("li",[r._v("资源占用多")]),r._v(" "),t("li",[r._v("冗余步骤多")]),r._v(" "),t("li",[r._v("启动慢")])]),r._v(" "),t("ul",[t("li",[r._v("容器虚拟化技术")])]),r._v(" "),t("p",[r._v("由于前面虚拟机存在某些缺点，Linux发展出了另一种虚拟化技术：")]),r._v(" "),t("p",[t("strong",[r._v("Linux容器(Linux Containers，缩写为 LXC)")])]),r._v(" "),t("p",[r._v("Linux容器是与系统其他部分隔离开的一系列进程，从另一个镜像运行，并由该镜像提供支持进程所需的全部文件。容器提供的镜像包含了应用的所有依赖项，因而在从开发到测试再到生产的整个过程中，它都具有可移植性和一致性。")]),r._v(" "),t("p",[t("mark",[r._v("Linux 容器不是模拟一个完整的操作系统")]),r._v("而是对进程进行隔离。有了容器，就可以将软件运行所需的所有资源打包到一个隔离的容器中。"),t("strong",[r._v("容器与虚拟机不同，不需要捆绑一整套操作系统")]),r._v("，只需要软件工作所需的库资源和设置。系统因此而变得高效轻量并保证部署在任何环境中的软件都能始终如一地运行。")]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.2k3leu2j7220.webp",alt:"image"}})]),r._v(" "),t("p",[t("strong",[r._v("Docker容器是在操作系统层面上实现虚拟化，直接复用本地主机的操作系统，而传统虚拟机则是在硬件层面实现虚拟化。与传统的虚拟机相比，Docker优势体现为启动速度快、占用体积小。")])]),r._v(" "),t("ul",[t("li",[t("p",[r._v("对比")]),r._v(" "),t("p",[r._v("关系:对比-指向"),t("strong",[r._v("底层原理")])])])]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.grlmiuj89ig.webp",alt:"image"}})]),r._v(" "),t("p",[r._v("比较了 Docker 和传统虚拟化方式的不同之处：")]),r._v(" "),t("blockquote",[t("p",[r._v("传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；")]),r._v(" "),t("p",[r._v("容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核"),t("mark",[r._v("且也没有进行硬件虚拟")]),r._v("。因此容器要比传统虚拟机更为轻便。")]),r._v(" "),t("p",[r._v("每个容器之间互相隔离，每个容器有自己的文件系统 ，容器之间进程不会相互影响，能区分计算资源。")])]),r._v(" "),t("h2",{attrs:{id:"docker能干嘛"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker能干嘛"}},[r._v("#")]),r._v(" Docker能干嘛")]),r._v(" "),t("ul",[t("li",[t("p",[r._v("技术职级变化")]),r._v(" "),t("ul",[t("li",[r._v("coder")]),r._v(" "),t("li",[r._v("programmer")]),r._v(" "),t("li",[r._v("software engineer")]),r._v(" "),t("li",[r._v("DevOps engineer")])])]),r._v(" "),t("li",[t("p",[r._v("开发/运维（DevOps）新一代开发工程师")])]),r._v(" "),t("li",[t("p",[r._v("一次构建、随处运行")])]),r._v(" "),t("li",[t("p",[r._v("更快速的应用交付和部署")])])]),r._v(" "),t("p",[r._v("传统的应用开发完成后，需要提供一堆安装程序和配置说明文档，安装部署后需根据配置文档进行繁杂的配置才能正常运行。Docker化之后只需要交付少量容器镜像文件，在正式生产环境加载镜像并运行即可，应用安装配置在镜像里已经内置好，大大节省部署配置和测试验证时间。")]),r._v(" "),t("ul",[t("li",[r._v("更便捷的升级和扩缩容")])]),r._v(" "),t("p",[r._v("随着微服务架构和Docker的发展，大量的应用会通过微服务方式架构，应用的开发构建将变成搭乐高积木一样，每个Docker容器将变成一块“积木”，应用的升级将变得非常容易。当现有的容器不足以支撑业务处理时，可通过镜像运行新的容器进行快速扩容，使应用系统的扩容从原先的天级变成分钟级甚至秒级。")]),r._v(" "),t("ul",[t("li",[r._v("更简单的系统运维")])]),r._v(" "),t("p",[r._v("应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。")]),r._v(" "),t("ul",[t("li",[r._v("更高效的计算资源利用")])]),r._v(" "),t("p",[r._v("Docker是"),t("mark",[r._v("内核级虚拟化")]),r._v("，其不像传统的虚拟化技术一样需要额外的Hypervisor支持，所以在一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。")]),r._v(" "),t("h2",{attrs:{id:"docker应用场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker应用场景"}},[r._v("#")]),r._v(" Docker应用场景")]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.14d1sdq1zk0w.webp",alt:"image"}})]),r._v(" "),t("ul",[t("li",[t("p",[r._v("哪些企业在使用")])]),r._v(" "),t("li",[t("p",[r._v("新浪")])])]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.y1hz6acpzgw.webp",alt:"image"}})]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.wouw5m7r1bk.webp",alt:"image"}})]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.5jk5akd0ka00.webp",alt:"image"}})]),r._v(" "),t("ul",[t("li",[r._v("美团")])]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.47bmw2u4u7g0.webp",alt:"image"}})]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.3uzygclvkhu0.webp",alt:"image"}})]),r._v(" "),t("ul",[t("li",[r._v("蘑菇街")])]),r._v(" "),t("p",[t("img",{attrs:{src:"https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20220903/image.7am4wi9y6vg0.webp",alt:"image"}})]),r._v(" "),t("h2",{attrs:{id:"docker去哪下"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker去哪下"}},[r._v("#")]),r._v(" Docker去哪下")]),r._v(" "),t("ul",[t("li",[t("p",[r._v("官网")]),r._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"http://www.docker.com",target:"_blank",rel:"noopener noreferrer"}},[r._v("Docker 官网"),t("OutboundLink")],1)])])]),r._v(" "),t("li",[t("p",[r._v("仓库")]),r._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[r._v("Docker Hub 官网"),t("OutboundLink")],1)])])]),r._v(" "),t("li",[t("p",[r._v("相关官网")]),r._v(" "),t("ul",[t("li",[r._v("Docker 官方主页: "),t("a",{attrs:{href:"https://www.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[r._v("https://www.docker.com"),t("OutboundLink")],1)]),r._v(" "),t("li",[r._v("Docker 官方博客: "),t("a",{attrs:{href:"https://blog.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[r._v("https://blog.docker.com"),t("OutboundLink")],1)]),r._v(" "),t("li",[r._v("Docker 官方文档: "),t("a",{attrs:{href:"https://docs.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[r._v("https://docs.docker.com"),t("OutboundLink")],1)]),r._v(" "),t("li",[r._v("Docker 安装文档："),t("a",{attrs:{href:"https://docs.docker.com/engine/install",target:"_blank",rel:"noopener noreferrer"}},[r._v("https://docs.docker.com/engine/install"),t("OutboundLink")],1)]),r._v(" "),t("li",[r._v("Docker Store: "),t("a",{attrs:{href:"https://store.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[r._v("https://store.docker.com"),t("OutboundLink")],1)]),r._v(" "),t("li",[r._v("Docker Cloud: "),t("a",{attrs:{href:"https://cloud.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[r._v("https://cloud.docker.com"),t("OutboundLink")],1)]),r._v(" "),t("li",[r._v("Docker Hub: "),t("a",{attrs:{href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"}},[r._v("https://hub.docker.com"),t("OutboundLink")],1)]),r._v(" "),t("li",[r._v("Docker 中文文档：https://vuepress.mirror.docker-practice.com/")])])])])])}),[],!1,null,null,null);t.default=a.exports}}]);