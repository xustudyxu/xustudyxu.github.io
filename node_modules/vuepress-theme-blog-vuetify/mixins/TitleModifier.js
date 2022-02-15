export default {
  computed: {
    $title () {
      const site = this.$site
      const page = this.$page
      const siteTitle = this.$siteTitle
      const siteDescription = site.description

      if (page.frontmatter.home) {
        return `${siteTitle} | ${siteDescription}`
      }

      if (page.frontmatter.title) {

        let directoryTitles = []
        site.themeConfig.directories.forEach(directory => {
          directoryTitles.push(directory.title !== undefined ? directory.title : ucfirst(directory.id))
        })

        let frontmatterTitles = []
        site.themeConfig.frontmatters.forEach(frontmatter => {
          frontmatterTitles.push(frontmatter.title !== undefined ? frontmatter.title : ucfirst(frontmatter.id))
        })

        // frontmatters pagination sub pages
        for (const title of frontmatterTitles) {
          const match = page.frontmatter.title.match(new RegExp(String.raw`^Page (\d+) - ([^|]+) \| ?${title}$`))
          if (match && match[1] && match[2]) {
            const page = match[1]
            const value = match[2]
            return `${title} "${value}" | Page ${page} | ${siteTitle}`
          }
        }

        // frontmatters pagination entry page
        for (const title of frontmatterTitles) {
          const match = page.frontmatter.title.match(new RegExp(String.raw`^([^|]+) ?${title}$`))
          if (match && match[1]) {
            const value = match[1]
            return `${title} "${value}" | ${siteTitle}`
          }
        }

        // directories pagination sub pages
        for (const title of directoryTitles) {
          const match = page.frontmatter.title.match(new RegExp(String.raw`^Page (\d+) \| ?${title}$`))
          if (match && match[1]) {
            const page = match[1]
            if (title) {
              return `${title} | Page ${page} | ${siteTitle}`
            }
            return `Page ${page} | ${siteTitle}`
          }
        }

        // directories pagination entry page
        for (const title of directoryTitles) {
          const match = page.frontmatter.title.match(new RegExp(String.raw`^${title}$`))
          if (match) {
            return `${title} | ${siteTitle}`
          }
        }

        // fallback
        return `${page.frontmatter.title} | ${siteTitle}`
      }

      // fallback
      return page.title
    }
  }
}

function ucfirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
