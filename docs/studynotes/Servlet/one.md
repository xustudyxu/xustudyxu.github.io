# Servlet

主要内容

![1641817852480](./images/01/001.png)

::: tip

如果8080端口被占用

第一种方法，更改tomcat端口：进入tomcat安装目录\conf文件夹，以记事本打开service.xml，指定新的端口号并重启tomcat。(推荐)

第二种方法，以管理员身份运行cmd,输入netstat -aon|findstr "8080" 然后taskkill /pid 进程号 -t -f杀死占用8080端口的进程号,重启服务器即可。

:::

<Vssue title="Vssue Demo6"/>

