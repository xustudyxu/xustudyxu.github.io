(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{280:function(t,e){t.exports=function(t){return null==t}},296:function(t,e,i){},318:function(t,e,i){"use strict";i(296)},350:function(t,e,i){"use strict";i.r(e);var s=i(280),a=i.n(s),n=i(13),r={name:"PageEdit",computed:{tags(){return this.$frontmatter.tags},lastUpdated(){return this.$page.lastUpdated},lastUpdatedText(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},editLink(){const t=a()(this.$page.frontmatter.editLink)?this.$site.themeConfig.editLinks:this.$page.frontmatter.editLink,{repo:e,docsDir:i="",docsBranch:s="master",docsRepo:n=e}=this.$site.themeConfig;return t&&n&&this.$page.relativePath?this.createEditLink(e,n,i,s,this.$page.relativePath):null},editLinkText(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink(t,e,i,s,a){if(/bitbucket.org/.test(e)){return e.replace(n.b,"")+"/src"+`/${s}/`+(i?i.replace(n.b,"")+"/":"")+a+`?mode=edit&spa=0&at=${s}&fileviewer=file-view-default`}if(/gitlab.com/.test(e)){return e.replace(n.b,"")+"/-/edit"+`/${s}/`+(i?i.replace(n.b,"")+"/":"")+a}const r=/gitee.com/;if(r.test(e)){return e.replace(r,"gitee.com/-/ide/project")+"/edit"+`/${s}/-/`+(i?i.replace(n.b,"")+"/":"")+a}return(n.j.test(e)?e:"https://github.com/"+e).replace(n.b,"")+"/edit"+`/${s}/`+(i?i.replace(n.b,"")+"/":"")+a}}},d=(i(318),i(10)),o=Object(d.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"page-edit"},[t.editLink?e("div",{staticClass:"edit-link"},[e("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),e("OutboundLink")],1):t._e(),t._v(" "),!1!==t.$themeConfig.tag&&t.tags&&t.tags[0]?e("div",{staticClass:"tags"},t._l(t.tags,(function(i,s){return e("router-link",{key:s,attrs:{to:"/tags/?tag="+encodeURIComponent(i),title:"标签"}},[t._v("#"+t._s(i))])})),1):t._e(),t._v(" "),t.lastUpdated?e("div",{staticClass:"last-updated"},[e("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),e("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()])}),[],!1,null,null,null);e.default=o.exports}}]);