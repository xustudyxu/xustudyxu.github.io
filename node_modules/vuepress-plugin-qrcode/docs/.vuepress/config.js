module.exports = {
  // title: 'VuePress Plugin QRCode',
  // description: 'Just playing around',
  base: "/VuePressPluginQRCodeDemo/",
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "en-US", // 将会被设置为 <html> 的 lang 属性
      title: "VuePress Plugin QRCode",
      description:
        "Vuepress Plugin Qrcode is a Vuepress plugin that displays the QR code of the current URL for mobile devices to scan",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "VuePress二维码插件",
      description:
        "Vuepress Plugin Qrcode是一个展示当前网址二维码供移动设备扫描的Vuepress插件",
    },
  },
  plugins: [
    // Here use require to import local files, please use the plug-in name for real use: "qrcode"
    [
      require("../../index"),
      {
        //Custom configuration can be added here, of course, the default value is used when not configured
        //We provide two configurations:labelText,size
        // labelText: "Mobile Read",
        labelText: {
          "/zh/": "二维码",
          "/": "QRCode",
        },
        size:100,
        channel:true
      },
    ],
  ],

  themeConfig: {
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        ariaLabel: "Languages",
        nav: [
          { text: "Home", link: "/" },
          {
            text: "Github",
            link: "https://github.com/openHacking/vuepress-plugin-qrcode",
          },
        ],
      },
      "/zh/": {
        // 多语言下拉菜单的标题
        selectText: "选择语言",
        // 该语言在下拉菜单中的标签
        label: "简体中文",
        nav: [
          { text: "首页", link: "/" },
          {
            text: "Github",
            link: "https://github.com/openHacking/vuepress-plugin-qrcode",
          },
        ],
      },
    },
  },
};
