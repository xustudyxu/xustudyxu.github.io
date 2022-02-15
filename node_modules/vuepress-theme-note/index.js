const path = require("path");

module.exports = (options, ctx) => {
        const { sep } = path;
        // 获取上下文配置
        const { themeConfig, siteConfig, sourceDir } = ctx;

        // 是否使用algolia 搜索
        const isAlgoliaSearch =
            themeConfig.algolia ||
            Object.keys(
                (siteConfig.locales && themeConfig.locales) || {}
            ).some((base) => themeConfig.locales(base.algolia));
        // 是否允许smooth scroll
        const enableSmoothScroll = themeConfig.smoothScroll === true;

        console.log(ctx);
        return {
            chainWebpack: (config) => {
                config.module
                    .rule("scss")
                    .oneOf("normal")
                    .use("sass-loader")
                    .options({
                        sassOptions: {
                            implementation: require('sass'),
                            includePaths: [path.join(__dirname, "./style/index.scss")],
                        },
                    })
                    .end()
                    .end()
                    .oneOf("modules")
                    .use("sass-loader")
                    .options({
                        sassOptions: {
                            implementation: require('sass'),
                            includePaths: [path.join(__dirname, "./style/index.scss")],
                        },
                    });
            },
            alias() {
                return {
                    "@AlgoliaSearchBox": isAlgoliaSearch ?
                        path.resolve(__dirname, "components/AlgoliaSearchBox.vue") : path.resolve(__dirname, "noopModules.js"),
                    "@docs": `${sourceDir}${sep}.vuepress${sep}styles`,
                };
            },
            plugins: [
                    ["@vuepress/active-header-links", options.activeHeaderLinks],
                    ["@vuepress/search",
                        {
                            searchMaxSuggestions: 10,
                        },
                    ],
                    "@vuepress/plugin-nprogress",
                    "@vuepress/back-to-top", ["@vuepress/medium-zoom",
                        {
                            selector: ".theme-note-content :not(a)>img",
                            options: {
                                margin: 16,
                            },
                        },
                    ],
                    [
                        ("container", {
                            type: "tip",
                            defaultTitle: {
                                "/": "TIP",
                                "/zh/": "提示",
                            },
                        })
                    ],
                    [
                        "container",
                        {
                            type: "warning",
                            defaultTitle: {
                                "/": "WARNING",
                                "/zh/": "注意",
                            },
                        },
                    ],
                    [
                        "container",
                        {
                            type: "danger",
                            defaultTitle: {
                                "/": "WARNING",
                                "/zh/": "警告",
                            },
                        },
                    ],
                    [
                        "container",
                        {
                            type: "details",
                            before: (info) => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ""}\n`,
          after: () => "</details>\n",
        },
      ],
      ["smooth-scroll", enableSmoothScroll],
    ],
  };
};