---
title: 项目中的 SQL 优化
date: 2023-02-19 22:15:49
permalink: /about/project_sql_optimization
categories:
  - 关于
tags:
  - 关于
---
# 项目中的 SQL 优化

[[toc]]

## 索引失效

我在河南航天金穗电子有限公司实习(2023/2/19)，组长让我完成销项看板和运营看板的可视化。

其中项目中有一些查询条件，比如说查询本年累计红冲金额：

刚开始我写的SQL如下：

```sql
    <select id="queryBnljkp" resultType="net.htjs.swgxpt.vo.billboard.xsyykb.KpCountAndAmountVo">
        SELECT COUNT(*) AS KpCount,SUM(jshj) AS KpAmount FROM swgx_xx_fpkj,swgx_xt_qyxx
        WHERE ((xhdwdm = QYSH AND tspz &lt;&gt; '02') OR (ghdwdm = QYSH AND tspz='02'))
        AND swgx_xx_fpkj.fpzt IN ('00','01')
        AND YEAR(kprq2) = YEAR(NOW())
        AND SSBK = '运营';
    </select>
```

+ 此时使用MySQL命令`explain`查看这条SQL语句的执行计划

```sql {3,4}
    id  select_type  table         partitions  type    possible_keys  key     key_len  ref       rows  filtered  Extra                                               
------  -----------  ------------  ----------  ------  -------------  ------  -------  ------  ------  --------  ----------------------------------------------------
     1  SIMPLE       swgx_xt_qyxx  (NULL)      ALL     (NULL)         (NULL)  (NULL)   (NULL)      66     10.00  Using where                                         
     1  SIMPLE       swgx_xx_fpkj  (NULL)      ALL     idx_kj_xhdwdm  (NULL)  (NULL)   (NULL)    1687      1.98  Using where; Using join buffer (Block Nested Loop)  
```

发现`kprq2`走的是全表扫描，没有使用索引，通过网上查资料得知，**在索引列上使用函数使得索引失效**。

+ 那么如何`kprq2`不使用函数呢

```sql
    <select id="queryBnljkp" resultType="net.htjs.swgxpt.vo.billboard.xsyykb.KpCountAndAmountVo">
        SELECT COUNT(*) AS KpCount,SUM(a.jshj) AS KpAmount FROM swgx_xx_fpkj a,swgx_xt_qyxx b
        WHERE a.xhdwdm = b.QYSH
        AND a.fpzt IN ('00','01')
        AND a.kprq2>=DATE(concat(DATE_FORMAT(CURDATE(),'%Y'),'-1-1'))
        <![CDATA[
          AND a.kprq2<DATE(DATE_SUB(CURDATE(),INTERVAL -1 DAY))
        ]]>
        AND SSBK = '运营';
    </select>
```

+ 此时经过MySQL命令`explain`查看这条SQL语句的执行计划

```sql {3,4}
    id  select_type  table   partitions  type    possible_keys                               key              key_len  ref                     rows  filtered  Extra                               
------  -----------  ------  ----------  ------  ------------------------------------------  ---------------  -------  --------------------  ------  --------  ------------------------------------
     1  SIMPLE       a       (NULL)      range   idx_kj_xhdwdm,idx_fpkj_fpzt,idx_fpkj_kprq2  idx_fpkj_kprq2   4        (NULL)                  1164     56.20  Using index condition; Using where  
     1  SIMPLE       b       (NULL)      eq_ref  idx_xt_smd_qysh                             idx_xt_smd_qysh  68       swgxpt_test.a.xhdwdm       1     10.00  Using index condition; Using where
```

> 我们发现此条SQL语句使用到了`idx_fpkj_kprq2`和`idx_xt_smd_qysh`这两条索引，类型分别为`range`和`eq_ref`。

+ [Explain的使用以及每个字段的含义](/database/MySQL/MySQL_Advanced_index/#explain)

