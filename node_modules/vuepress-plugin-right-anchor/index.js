const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, ctx) => {
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    extendPageData($page) {
      const { rightAnchor: frontmatterOptions = {} } = $page.frontmatter

      $page.rightAnchor = {
        ...options,
        ...frontmatterOptions,
        isIgnore: Array.isArray(options.ignore) && options.ignore.includes($page.regularPath),
        expand: {
          trigger: 'hover',
          clickModeDefaultOpen: true,
          ...options.expand,
          ...frontmatterOptions.expand
        },
      }
    },
    globalUIComponents: options.disableGlobalUI ? [] : ['GlobalRightAnchor']
  }
}
