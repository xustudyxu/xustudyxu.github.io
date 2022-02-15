const path = require('path')

function checkRegularPath(regularPath, readingDir, fixed) {
  if (readingDir === null) {
    return fixed
  } else if (typeof readingDir === 'string') {
    return setConfig(regularPath, readingDir, fixed)
  } else if (Array.isArray(readingDir)) {
    for (let i = 0; i < readingDir.length; i++) {
      const item = readingDir[i]
      const isShow = setConfig(regularPath, item, fixed)
      if (isShow) return fixed
    }
    return false
  } else if (readingDir.constructor === RegExp) {
    return readingDir.test(regularPath) ? fixed : false
  } else {
    for (const key in readingDir) {
      const item = readingDir[key]
      const isShow = setConfig(regularPath, key, item)
      if (isShow) return item
    }
    return false
  }
}

function setConfig(regularPath, dir, fixed) {
  return regularPath.includes(dir) ? fixed : false
}

module.exports = options => {
  const {
    readingDir = null,
    fixed = 'top'
  } = options

  return {
    extendPageData($page) {
      const { regularPath, frontmatter: { readingShow }} = $page
      let type = fixed

      if (readingShow !== undefined) {
        type =  typeof readingShow === 'boolean' && readingShow
          ? fixed
          : readingShow
      } else if (regularPath) {
        type = checkRegularPath(regularPath, readingDir, fixed)
      } else {
        type = false
      }

      $page.frontmatter.readingShow = type
    },
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    globalUIComponents: 'ReadingProgress'
  }
}
