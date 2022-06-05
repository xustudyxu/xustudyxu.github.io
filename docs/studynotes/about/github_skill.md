---
title: 关于-github的六个神技巧
date: 2022-06-05 00:23:38
permalink: /pages/5f0cd1/
categories:
  - 关于
tags:
  - 关于
---
# 关于-github的六个神技巧

[[toc]]

Github官方文档：https://docs.github.com/en

Github搜索官方文档：https://docs.github.com/en/search-github

## 搜索技巧

### 排序搜索结果

#### 按交互排序

|               语法               |                             例子                             |
| :------------------------------: | :----------------------------------------------------------: |
|   org:github sort:interactions   | 匹配 GitHub 拥有的存储库中的问题，按反应和评论的最高组合数排序 |
| org:github sort:interactions-asc | 匹配 GitHub 拥有的存储库中的问题，按最少的反应和评论组合数排序 |

#### 按反应排序

|              语法               |                             例子                             |
| :-----------------------------: | :----------------------------------------------------------: |
|    org:github sort:reactions    |     匹配 GitHub 拥有的存储库中的问题，按最高反应数排序。     |
|  org:github sort:reactions-asc  | 匹配 GitHub 拥有的存储库中的问题，按反应数量升序排序（从最少到最多） |
|  org:github sort:reactions-+1   |  匹配 GitHub 拥有的存储库中的问题，按最多点赞 (👍) 反应排序   |
|  org:github sort:reactions- -1  |    匹配 GitHub 拥有的存储库中的问题，按最多 (👎) 反应排序     |
| org:github sort:reactions-smile |   匹配 GitHub 拥有的存储库中的问题，按最多笑 (😄) 反应排序    |
| org:github sort:reactions-tada  | 匹配 GitHub 拥有的存储库中的问题，按大多数欢呼 (🎉) 反应排序  |
| org:github sort:reactions-heart | 匹配 GitHub 拥有的存储库中的问题，按大多数心脏 (❤️) 反应排序  |

#### 按作者日期排序

|                  语法                   |                             例子                             |
| :-------------------------------------: | :----------------------------------------------------------: |
|   org:github sort:author-date feature   | 匹配 GitHub 拥有的存储库中包含单词“feature”的提交，按作者日期降序排序 |
| org:github sort:author-date-asc feature | 匹配 GitHub 拥有的存储库中包含单词“feature”的提交，按作者日期升序排序 |

#### 按提交者日期排序

|                语法                |                             例子                             |
| :--------------------------------: | :----------------------------------------------------------: |
|   org:github sort:committer-date   | 匹配 GitHub 拥有的存储库中包含“功能”一词的提交，按提交者日期降序排序 |
| org:github sort:committer-date-asc | 匹配 GitHub 拥有的存储库中包含“功能”一词的提交，按提交者日期升序排序 |
#### 按更新日期排序

|           语法           |                       例子                        |
| :----------------------: | :-----------------------------------------------: |
|   sort:updated feature   | 匹配包含“feature”一词的存储库，按最近更新日期排序 |
| sort:updated-asc feature | 匹配包含单词“feature”的存储库，按最近更新日期排序 |

### 搜索范围

#### 搜素存储库

##### 按存储库名称、描述或 README 文件的内容搜索

|         语法          |                       例子                       |
| :-------------------: | :----------------------------------------------: |
|    in:name jquery     |      匹配存储库名称中带有“jquery”的存储库。      |
| in:description jquery |      匹配存储库描述中带有“jquery”的存储库。      |
|   in:readme jquery    | 匹配存储库的 README 文件中提到“jquery”的存储库。 |

##### 在用户或组织的仓库中搜索

|          语法           |                          例子                          |
| :---------------------: | :----------------------------------------------------: |
| user:defunkt forks:>100 | 匹配用户名为 defunkt 的具有超过 100 个 fork 的存储库。 |

##### 按存储库大小搜索

|     语法     |               例子                |
| :----------: | :-------------------------------: |
|  size:1000   |     匹配大小为 1 MB 的存储库      |
| size:>=30000 |      匹配至少 30 MB 的存储库      |
|   size:<50   |      匹配小于 50 KB 的存储库      |
| size:50…120  | 匹配 50 KB 到 120 KB 之间的存储库 |

##### 按分叉数搜索

|    语法     |                例子                |
| :---------: | :--------------------------------: |
|   forks:5   |     匹配只有五个 fork 的存储库     |
| forks:>=205 |   匹配至少有 205 个 fork 的仓库    |
|  forks:<90  |  匹配具有少于 90 个 fork 的存储库  |
| forks:10…20 | 匹配具有 10 到 20 个 fork 的存储库 |

##### 按星数搜索

|                语法                |                         例子                         |
| :--------------------------------: | :--------------------------------------------------: |
|             stars:500              |             匹配恰好有 500 颗星的存储库              |
|            stars:10…20             |       匹配小于 1000 KB 的 10 到 20 星的存储库        |
| stars:>=500 fork:true language:php | 匹配至少 500 个星的存储库，包括分叉的，用 PHP 编写的 |

##### 按创建或上次更新存储库的时间搜索

|               语法               |                             例子                             |
| :------------------------------: | :----------------------------------------------------------: |
|    webos created:<2011-01-01     |        匹配 2011 年之前创建的带有“webos”一词的存储库         |
|       css push:>2013-02-01       |      匹配 2013 年 1 月之后推送到的带有“css”一词的存储库      |
| case push:>=2013-03-06 fork:only | 匹配 2013 年 3 月 6 日或之后推送到的带有单词“case”的存储库，并且是分叉。 |

##### 按语言搜索

|           语法            |                       例子                        |
| :-----------------------: | :-----------------------------------------------: |
| rails language:javascript | 匹配使用 JavaScript 编写的带有“rails”一词的存储库 |

##### 按主题搜索

|     语法     |               例子               |
| :----------: | :------------------------------: |
| topic:jekyll | 匹配已分类为主题“jekyll”的存储库 |

##### 按主题数量搜索

|   语法    |             例子             |
| :-------: | :--------------------------: |
|  topic:5  |   匹配具有五个主题的存储库   |
| topic:> 3 | 匹配具有三个以上主题的存储库 |

##### 按许可证搜索

|        语法        |                     例子                     |
| :----------------: | :------------------------------------------: |
| license:apache-2.0 | 匹配在 Apache License 2.0 下获得许可的存储库 |

##### 按存储库可见性搜索

|         语法         |                    例子                     |
| :------------------: | :-----------------------------------------: |
| is:public org:github |        匹配 GitHub 拥有的公共存储库         |
|   is:internal test   | 匹配您可以访问并包含“test”一词的内部存储库  |
|   is:private pages   | 匹配您可以访问并包含“pages”一词的私有存储库 |

##### 根据仓库是否是镜像进行搜索

|        语法        |                 例子                  |
| :----------------: | :-----------------------------------: |
| mirror:true GNOME  | 匹配作为镜像且包含单词“GNOME”的存储库 |
| mirror:false GNOME |  匹配非镜像且包含“GNOME”一词的存储库  |

#### 搜索主题

##### 使用搜索限定符缩小搜索范围

| 语法                       | 例子                                                         |
| -------------------------- | ------------------------------------------------------------ |
| is:curated javascript      | 匹配经过策划并包含“javascript”一词的主题                     |
| is:featured javascript     | 匹配https://github.com/topics/上的特色主题并包含“javascript”一词 |
| is:not-curated javascript  | 匹配没有额外信息（例如描述或徽标）并包含“javascript”一词的主题 |
| is:not-featured javascript | 匹配https://github.com/topics/上没有特色且包含“javascript”一词的主题 |
| repositories:>5000         | 匹配具有超过 5000 个存储库的主题                             |

#### 搜索代码

| 序号 | 代码搜索的注意事项：由于搜索代码的复杂性，对搜索的执行方式有一些限制 |
| :--: | :----------------------------------------------------------: |
|  1   |  必须登录 GitHub 上的用户帐户才能在所有公共存储库中搜索代码  |
|  2   | 只有当分叉的星数多于父存储库时，分叉中的代码才可搜索。星号少于父存储库的分叉不会为代码搜索编制索引。要在搜索结果中包含星数多于父级的分叉，您需要将fork:true或添加fork:only到您的查询中。有关更多信息，请参阅“在分叉中搜索” |
|  3   |              仅对默认分支进行索引以进行代码搜索              |
|  4   |                  只能搜索小于 384 KB 的文。                  |
|  5   |             只能搜索少于 500,000 个文件的存储库              |
|  6   |      只有在去年有活动或在搜索结果中返回的存储库才可搜索      |
|  7   | 除了filename搜索之外，在搜索源代码时，您必须始终包含至少一个搜索词。例如，搜索language:javascript无效，而搜索无效amazing language:javascript |
|  8   | 搜索结果最多可以显示来自同一个文件的两个片段，但文件中可能会有更多的结果 |
|  9   | 您不能在搜索查询中使用以下通配符：. , : ; / \ ` ’ " = * ! ? # $ & + ^ |

##### 按文件内容或文件路径搜索

|      语法       |               例子                |
| :-------------: | :-------------------------------: |
| octocat in:file | 匹配文件内容中出现“octocat”的代码 |
| octocat in:path | 匹配文件路径中出现“octocat”的代码 |

##### 在用户或组织的仓库中搜索

|               语法                |                     例子                      |
| :-------------------------------: | :-------------------------------------------: |
|     user:defunkt extension:rb     |      匹配来自@defunkt 的以.rb结尾的代码       |
|      org:github extension:js      |       匹配来自 GitHub 的以.js结尾的代码       |
| repo:mozilla/shumway extension:as | 匹配@mozilla 的 shumway 项目中以.as结尾的代码 |

##### 按语言搜索

|             语法              |                            例子                             |
| :---------------------------: | :---------------------------------------------------------: |
| element language:xml size:100 | 匹配带有标记为 XML 且正好有 100 个字节的单词“element”的代码 |
|     display language:scss     |        匹配带有单词“display”的代码，它被标记为 SCSS         |
| org:mozilla language:markdown |       匹配所有@mozilla 存储库中标记为 Markdown 的代码       |

##### 按文件大小搜索

|           语法           |                  例子                  |
| :----------------------: | :------------------------------------: |
|    filename:linguist     |        匹配名为“linguist”的文件        |
| filename:.vimrc commands | 匹配带有 “commands” 一词的.vimrc文件。 |

#### 搜索用户

#### 按帐户名称、全名或公共电子邮件搜索

| 语法                    | 例子                                                         |
| ----------------------- | ------------------------------------------------------------ |
| user:octocat            | 匹配用户名为“octocat”的用户                                  |
| org:electron type:users | 匹配 Electron 组织的账户名                                   |
| kenya in:login          | 匹配用户名中包含“kenya”一词的用户                            |
| bolton in:name          | 匹配真实姓名中包含单词“bolton”的用户                         |
| fullname:Nat Friedman   | 匹配全名“Nat Friedman”的用户。注意：此搜索限定符对间距敏感。 |
| data in:email           | 将用户与电子邮件中的“data”一词匹配起来                       |

##### 按用户拥有的仓库数量搜索

|       语法       |                             例子                             |
| :--------------: | :----------------------------------------------------------: |
|   repos:>9000    |               匹配存储库数量超过 9,000 的用户                |
| bert repos:10…30 | 匹配用户名或真实姓名中包含“bert”一词且拥有 10 到 30 个存储库的用户 |

##### 按创建用户帐户的时间搜索

| 语法                                        | 例子                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| created:<2011-01-01                         | 匹配 2011 年之前加入的用户                                   |
| created:>=2013-05-11                        | 匹配在 2013 年 5 月 11 日或之后加入的用户                    |
| created:2013-03-06 location:london          | 匹配于 2013 年 3 月 6 日加入且将其位置列为伦敦的用户         |
| created:2010-01-01…2011-01-01 john in:login | 匹配在 2010 年到 2011 年之间加入且用户名中包含单词“john”的用户 |

##### 按关注者数量搜索

|         语法          |                             例子                             |
| :-------------------: | :----------------------------------------------------------: |
|   followers:>=1000    |              匹配拥有 1,000 或更多关注者的用户               |
| sparkle follower:1…10 | 匹配拥有 1 到 10 个关注者的用户，他们的名字中带有“sparkle”这个词 |

## 查找文件

1. 使用快捷键`t`实时地对仓库内所有的文件进行搜索
2. 点击某个文件后，按下`l`键就可以快速跳转到某一行
3. 点击行号，可以快速复制这行代码，生成永久链接，按`b`可以快速查看该文件的改动记录

## 键盘快捷键

> 几乎 GitHub 上的每一页都有键盘快捷键，可以更快地执行操作

### 站点快捷键

| 键盘快捷键 |                             描述                             |
| :--------: | :----------------------------------------------------------: |
| `S` 或 `/` | 聚焦于搜索栏。 更多信息请参阅“[关于在 GitHub 上搜索](https://docs.github.com/cn/search-github/getting-started-with-searching-on-github/about-searching-on-github)”。 |
|  `G`  `N`  | 转到您的通知。 更多信息请参阅“[关于通知](https://docs.github.com/cn/github/managing-subscriptions-and-notifications-on-github/about-notifications)”。 |
|   `Esc`    | 当聚焦于用户、议题或拉取请求悬停卡时，关闭悬停卡并重新聚焦于悬停卡所在的元素 |

`Command`+`K `(Mac) 或
`Ctrl`+`K` (Windows/Linux) | 打开 GitHub 命令面板。 如果要编辑 Markdown 文本，请使用 `Command`+`Option`+`K` 或 `Ctrl`+`Alt`+`K`打开命令面板。 更多信息请参阅“[GitHub 命令面板](https://docs.github.com/cn/get-started/using-github/github-command-palette)”。

### 仓库

| 键盘快捷键 |                             描述                             |
| :--------: | :----------------------------------------------------------: |
|  `G ` `C`  |                 转到 **Code（代码）**选项卡                  |
|  `G` ` I`  | 转到 **Issues（议题）**选项卡。 更多信息请参阅“[关于议题](https://docs.github.com/cn/articles/about-issues)”。 |
|  `G`  `P`  | 转到 **Pull requests（拉取请求）**选项卡。 更多信息请参阅“[关于拉取请求](https://docs.github.com/cn/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)”。 |
|  `G`  `A`  | 转到 **Actions（操作）**选项卡。 更多信息请参阅“[关于 Actions](https://docs.github.com/cn/actions/getting-started-with-github-actions/about-github-actions)”。 |
|  `G`  `B`  | 转到 **Projects（项目）**选项卡。 更多信息请参阅“[关于项目板](https://docs.github.com/cn/articles/about-project-boards)”。 |
|  `G`  `W`  | 转到 **Wiki** 选项卡。 更多信息请参阅“[关于 wiki](https://docs.github.com/cn/communities/documenting-your-project-with-wikis/about-wikis)”。 |
|  `G`  `G`  | 转到 **Discussions（讨论）**选项卡。 更多信息请参阅“[关于讨论](https://docs.github.com/cn/discussions/collaborating-with-your-community-using-discussions/about-discussions)”。 |

### 源代码编辑

|                          键盘快捷键                          |                             描述                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                             `.`                              | 在基于 Web 的编辑器中打开存储库或拉取请求。 更多信息请参阅“[基于 Web 的编辑器](https://docs.github.com/cn/codespaces/developing-in-codespaces/web-based-editor)”。 |
|      `Command`+`B` (Mac) 或 `Ctrl`+`B `(Windows/Linux)       |                插入 Markdown 格式用于粗体文本                |
|      `Command`+`I `(Mac) 或 `Ctrl`+`I `(Windows/Linux)       |                插入 Markdown 格式用于斜体文本                |
|      `Command`+`K `(Mac) 或 `Ctrl`+`K `(Windows/Linux)       |                 插入 Markdown 格式以创建链接                 |
| `Command`+`Shift`+`7` (Mac) 或 `Ctrl`+`Shift`+`7` (Windows/Linux) |                 为有序列表插入 Markdown 格式                 |
| `Command`+`Shift`+`8` (Mac) 或`Ctrl`+`Shift`+`8` (Windows/Linux) |                 为无序列表插入 Markdown 格式                 |
| `Command`+`Shift`+`.` (Mac) 或` Ctrl`+`Shift`+`.` (Windows/Linux) |                   为报价插入 Markdown 格式                   |
|                             `E`                              |      在 **Edit file（编辑文件）**选项卡中打开源代码文件      |
|      `Command`+`F` (Mac) 或 `Ctrl`+`F `(Windows/Linux)       |                    开始在文件编辑器中搜索                    |
|      `Command`+`G `(Mac) 或 `Ctrl`+`G `(Windows/Linux)       |                          查找下一个                          |
| `Command`+`Shift`+`G` (Mac) 或 `Ctrl`+`Shift`+`G `(Windows/Linux) |                          查找上一个                          |
| `Command`+`Option`+`F `(Mac) 或 `Ctrl`+`Shift`+`F (Windows/Linux)` |                             替换                             |
| `Command`+`Shift`+`Option`+`F `(Mac) 或 `Ctrl`+`Shift`+`R` (Windows/Linux) |                           全部替换                           |
|                           `Alt+G`                            |                            跳至行                            |
|      `Command`+`Z `(Mac) 或 `Ctrl`+`Z `(Windows/Linux)       |                             撤消                             |
|      `Command`+`Y `(Mac) 或 `Ctrl`+`Y `(Windows/Linux)       |                             重做                             |
|                    `Command`+`Shift`+`P`                     | 在 **Edit file（编辑文件）** 与 **Preview changes（预览更改）**选项卡之间切换 |
|      `Command`+`S` (Mac) 或 `Ctrl`+`S `(Windows/Linux)       |                         填写提交消息                         |

有关更多键盘快捷键，请参阅 [CodeMirror 文档](https://codemirror.net/doc/manual.html#commands)。

### 更多

+ https://docs.github.com/cn/get-started/using-github/keyboard-shortcuts

### 命令面板

github暗藏了一个命令面板`Ctrl`+`K`打开

+ 官方参考文档:https://docs.github.com/en/get-started/using-github/github-command-palette

## 阅读代码技巧

直接在仓库详情页按下`。`键

代码竟然在一个网页版的VScode中打开了

使用体验和本地的VSCode完全一致，不仅可以随时切换文件来阅读，享受代码高亮提示，快捷跳转，代码搜索，甚至可以安装插件来增强编辑器的功能

## 在线运行项目

在项目地址前加上`gitpod.io/#/`前缀

1. 不仅在网页编辑器中打开了项目代码，而且自动识别了项目的类别(前端/Java等)
2. 自动安装了项目依赖包
3. 可以把这个网页提供的远程服务器当做自己电脑使用
4. 执行项目，查看运行效果,一键构建Docker镜像等

## 邮件推送

在github的Explore(探索)界面中，`Get email updates`按钮-->获取邮件更新

+ 我们可以根据自己的喜好，让github定期给我们推送感兴趣的优质项目

## 参考资料

+ https://docs.github.com/en
+ https://blog.csdn.net/PaperJack/article/details/118543980
+ https://www.bilibili.com/video/BV1q54y1f7h6?spm_id_from=333.999.0.0

