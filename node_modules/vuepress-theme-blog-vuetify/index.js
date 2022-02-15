const Path = require('path')
const Fs = require('fs')
const removeMd = require('remove-markdown')
const pick = require('lodash/pick')
const defaultsDeep = require('lodash/defaultsDeep')

module.exports = (option, ctx) => {

  let { themeConfig, siteConfig, sourceDir, writeTemp } = ctx

  /**
   * Default theme configuration
   */

  themeConfig = defaultsDeep(themeConfig, {

    // @see https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#directory-classifier
    // @see https://vuepress-theme-blog.ulivz.com/config/#directories
    directories: [
      {
        id: 'post',
        dirname: '_posts',
        path: '/',
        title: '',
        frontmatter: {
          home: true,
        },
      },
    ],

    // @see https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#frontmatter-classifier
    // @see https://vuepress-theme-blog.ulivz.com/config/#frontmatters
    frontmatters: [
      // id: 'tag' and id: 'author' are required
      {
        id: 'tag',
        keys: ['tags'],
        path: '/tag/',
      },
      {
        id: 'author',
        keys: ['author'],
        path: '/author/',
      },
    ],

    // @see https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#pagination
    // @see https://vuepress-plugin-blog.ulivz.com/pagination/
    // @see https://vuepress-theme-blog.ulivz.com/config/#globalpagination
    globalPagination: {
      sorter: (prev, next) => {
        const dayjs = require('dayjs')
        const prevTime = prev.frontmatter.date ? dayjs(prev.frontmatter.date) : dayjs(0)
        const nextTime = next.frontmatter.date ? dayjs(next.frontmatter.date) : dayjs(0)
        return nextTime - prevTime > 0 ? 1 : -1
      },
      lengthPerPage: 10,
    },

    titleHtml: `<strong>${siteConfig.title}</strong>`,

    sidebar: {
      directoryIds: ['post'],
      profile: {
        avatarUrl: '',
        name: '',
        subTitle: '',
        descriptionHtml: '',
      },
      hotTags: 10,
      recentPosts: 5,
      additionalBlocks: [
        // {
        //   title: 'Pages',
        //   links: [
        //     { label: 'About', path: '/about' },
        //     { label: 'Contact', path: '/contact' },
        //     { label: 'External Page', url: 'https://example.com'}
        //   ],
        // },
      ],
    },

    footer: {
      links: [
        // { label: 'About', path: '/about' },
        // { label: 'Contact', path: '/contact' },
        // { label: 'External Page', url: 'https://example.com'}
      ],
    },

    sns: {
      twitter: '',
      facebook: '',
      instagram: '',
      github: '',
      youtube: '',
      feed: '/rss.xml',
      order: [
        'twitter',
        'facebook',
        'instagram',
        'github',
        'youtube',
        'feed',
      ],
    },

    seo: {
      baseUrl: '',
      author: '',
      image: '',
      fbAdmins: '',
      fbAppId: '',
      twitterSite: '',
      twitterCreator: '',
      articleDirectoryNames: [
        '_posts',
      ],
    },

    sitemap: true,

    feed: {
      rss: true,
      atom: false,
      json: false,
    },

    ga: '',

    showThumbnail: true,

    summary: 200,

    dateFormat: 'YYYY-MM-DD',

    components: {
      pagination: 'VuetifyPagination',
      beforeSidebar: 'DefaultBeforeSidebar',
      afterSidebar: 'DefaultAfterSidebar',
      beforeSticky: 'DefaultBeforeSticky',
      afterSticky: 'DefaultAfterSticky',
      beforePageList: 'DefaultBeforePageList',
      beforePagination: 'DefaultBeforePagination',
      afterPageList: 'DefaultAfterPageList',
      beforePage: 'DefaultBeforePage',
      beforePageSection: 'DefaultBeforePageSection',
      afterPage: 'DefaultAfterPage',
      afterFooter: 'DefaultAfterFooter',
    },
  })

  // this enables to access to global computed $themeConfig
  // @see https://vuepress.vuejs.org/guide/global-computed.html#themeconfig
  siteConfig.themeConfig = themeConfig

  /**
   * Configure vuepress-plugin-sitemap installed via @vuepress/plugin-blog
   *
   * @see https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#sitemap
   * @see https://vuepress-theme-blog.ulivz.com/config/#sitemap
   */

  const sitemapPluginOptions = themeConfig.sitemap ? {
    hostname: themeConfig.seo.baseUrl,
  } : {}

  /**
   * Configure vuepress-plugin-feed installed via @vuepress/plugin-blog
   *
   * @see https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#feed
   * @see https://vuepress-theme-blog.ulivz.com/config/#feed
   */

  let resolvedFeedOptions

  if (themeConfig.feed.rss || themeConfig.feed.atom || themeConfig.feed.json) {
    const {
      rss,
      atom,
      json,
      ...feedOptions
    } = themeConfig.feed

    resolvedFeedOptions = Object.assign({}, feedOptions, {
      canonical_base: themeConfig.seo.baseUrl,
      feeds: {
        rss2: {enable: rss},
        atom1: {enable: atom},
        json1: {enable: json},
      },
    })
  } else {
    resolvedFeedOptions = {}
  }

  /**
   * Configure @vuepress/plugin-blog
   */

  let defaultBlogPluginOptions = {
    directories: themeConfig.directories,
    frontmatters: themeConfig.frontmatters,
    globalPagination: themeConfig.globalPagination,
    sitemap: sitemapPluginOptions,
    feed: resolvedFeedOptions,
  }

  /**
   * Finish configuring @vuepress/plugin-blog
   */

  const blogPluginRelatedProperties = [
    'directories',
    'frontmatters',
    'globalPagination',
  ]
  const themeConfigPluginOptions = {
    ...pick(themeConfig, blogPluginRelatedProperties),
  }

  const blogPluginOptions = defaultsDeep(themeConfigPluginOptions, defaultBlogPluginOptions)

  /**
   * Configure @vuepress/plugin-search
   *
   * @see https://vuepress.vuejs.org/plugin/official/plugin-search.html
   */

  const searchPluginOptions = {
    searchMaxSuggestions: themeConfig.searchMaxSuggestions || 10,
    test: themeConfig.test || null,
    searchHotkeys: themeConfig.searchHotkeys || ['s', '/'],
  }

  /**
   * Configure vuepress-plugin-seo
   *
   * @see https://github.com/lorisleiva/vuepress-plugin-seo
   */

  const seoPluginOptions = {
    siteTitle: (_, $site) => $site.title,
    title: $page => $page.title,
    description: $page => $page.frontmatter.description,
    author: (_, $site) => $site.themeConfig.seo.author,
    tags: $page => $page.frontmatter.tags,
    twitterCard: _ => 'summary_large_image',
    type: ($page, $site) => $site.themeConfig.seo.articleDirectoryNames.some(directoryName => $page.regularPath.startsWith('/' + directoryName)) ? 'article' : 'website',
    url: (_, $site, path) => $site.themeConfig.seo.baseUrl + path,
    image: ($page, $site) => $page.frontmatter.image || $site.themeConfig.seo.image,
    publishedAt: $page => {
      const dayjs = require('dayjs')
      return $page.frontmatter.date && dayjs($page.frontmatter.date)
    },
    modifiedAt: $page => {
      const dayjs = require('dayjs')
      return $page.frontmatter.update && dayjs($page.frontmatter.update)
    },
    customMeta: (add, context) => {
      const {
        $site, $page, siteTitle, title, description, author, tags, twitterCard, type, url, image, publishedAt, modifiedAt,
      } = context
      if ($site.themeConfig.seo.fbAdmins) {
        add('fb:admins', $site.themeConfig.seo.fbAdmins, 'property')
      }
      if ($site.themeConfig.seo.fbAppId) {
        add('fb:app_id', $site.themeConfig.seo.fbAppId, 'property')
      }
      if ($site.themeConfig.seo.twitterSite) {
        add('twitter:site', $site.themeConfig.seo.twitterSite)
      }
      if ($site.themeConfig.seo.twitterCreator) {
        add('twitter:creator', $site.themeConfig.seo.twitterCreator)
      }
    },
  }

  /**
   * Integrate plugins
   */

  let plugins = [
    ['@vuepress/blog', blogPluginOptions],
    '@vuepress/nprogress',
    ['@vuepress/medium-zoom', {
      selector: '#content article section :not(a) > img',
    }],
    ['@vuepress/search', searchPluginOptions],
    ['seo', seoPluginOptions],
    ['container', {type: 'tip'}],
    ['container', {type: 'warning'}],
    ['container', {type: 'danger'}],
    ['container', {
      type: 'details',
      before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
      after: () => '</details>\n'
    }],
  ]

  if (themeConfig.ga) {
    plugins.push(['@vuepress/google-analytics', {
      ga: themeConfig.ga,
    }])
  }

  /**
   * Apply user variables.scss
   */

  validUserVariablesScssFileNames = ['variables.scss', '_variables.scss', 'palette.scss']

  writeTemp('_variables.scss', '')

  for (fileName of validUserVariablesScssFileNames) {
    userVariablesScssFilePath = Path.resolve(sourceDir, `.vuepress/styles/${fileName}`)
    if (Fs.existsSync(userVariablesScssFilePath)) {
      writeTemp('_variables.scss', Fs.readFileSync(userVariablesScssFilePath))
      break
    }
  }

  /**
   * Extend page data
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#extendpagedata
   */

  const pageDataExtender = page => {

    /**
     * Generate page summary
     */

    if (themeConfig.summary > 0) {
      let content = page._strippedContent
      if (!content) {
        return
      }

      if (page.excerpt) {
        content = content.replace(/([^]*)<!-- *more *-->[^]*/ig, "$1")
      }

      let summary = removeMd(content
        .trim()
        .replace(/:::.*(\n|\r|$)/g, '') // remove custom container sign
        .replace(/\[\[toc\]\]/ig, '') // remove [[toc]]
        .replace(/(\|\s*:?-+:?\s*)+\|/g, '') // remove table border
      ).replace(/\s+/g, ' ')

      if (page.excerpt) {
        page.summary = summary + ' ...'
      } else {
        const postfix = summary.length > themeConfig.summary ? ' ...' : ''
        page.summary = summary.slice(0, themeConfig.summary) + postfix
      }

      page.frontmatter.description = page.frontmatter.summary || page.summary
    }

    /**
     * Resolve tags
     */

    let tags = page.frontmatter.tags
    if (!tags) {
      page.frontmatter.tags = []
    } else if (!Array.isArray(tags)) {
      page.frontmatter.tags = tags.split(/ +/)
    }

    /**
     * Reduce toc header levels
     */

    if (page.headers) {
      let minimumLevel = 6
      page.headers.forEach(header => {
        if (header.level < minimumLevel) {
          minimumLevel = header.level
        }
      })
      page.headers.forEach(header => {
        header.reducedLevel = header.level - minimumLevel
      })
    }

    /**
     * Render some html tags in page title
     */

    page.title = page.frontmatter.title && page.frontmatter.title.replace(/<([^>]*)>/g, "<$1>")
  }

  /**
   * Finish configuration
   *
   * @see https://vuepress.vuejs.org/config/
   */

  return {
    plugins,
    extendPageData: pageDataExtender,
  }
}
