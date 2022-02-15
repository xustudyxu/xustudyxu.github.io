import { findPageByKey } from '@app/util'
import tagMeta from '@dynamic/tag'
import categoryMeta from '@dynamic/category'
import listMeta from '@dynamic/list'
import pluginConfig from '@dynamic/pluginConfig'

class Classifiable {
  constructor (metaMap, pages) {
    this._metaMap = Object.assign({}, metaMap)
    Object.keys(this._metaMap).forEach(name => {
      const { pageKeys } = this._metaMap[name]
      this._metaMap[name].posts = pageKeys.map(key => findPageByKey(pages, key))
    })
  }
  get length () {
    return Object.keys(this._metaMap).length
  }
  get map () {
    return this._metaMap
  }
  get list () {
    return this.toArray()
  }
  toArray () {
    const tags = []
    Object.keys(this._metaMap).forEach(name => {
      const { posts, path } = this._metaMap[name]
      tags.push({ name, posts, path })
    })
    return tags
  }
  sliceItem (item, str, end) {
    return item.slice(str, end)
  }
  getItemByKeys (pageKey) {
    for (const dir in this._metaMap) {
      if (dir !== pluginConfig.aliasesRoot && this._metaMap.hasOwnProperty(dir)) {
        const item = this._metaMap[dir]
        const index = item.pageKeys.indexOf(pageKey)
        if (index > -1) {
          return {
            dir,
            index: index + 1,
            total: item.pageKeys.length,
            lastPost: item.posts[index - 1],
            nextPost: item.posts[index + 1]
          }
        }
      }
    }
    return {}
  }
  getItemByName (name, current) {
    const { paginationLimit, paginatioPath } = pluginConfig
    const { page, path, pageKeys, posts } = this._metaMap[name]
    const str = paginationLimit * (current - 1)
    const end = paginationLimit * current
    const pagination = page > 1
      ? Array.from(Array(page), (v, k) => {
        return k
          ? path + paginatioPath + (k + 1) + '/'
          : path
      })
      : []

    return {
      pagination,
      path,
      pageKeys: current
        ? this.sliceItem(pageKeys, str, end)
        : pageKeys,
      posts: current
        ? this.sliceItem(posts, str, end)
        : posts
    }
  }
}

export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      $pluginConfig() {
        return pluginConfig
      },
      $tags() {
        const { pages } = this.$site
        const tags = new Classifiable(tagMeta, pages)
        return tags
      },
      $categories() {
        const { pages } = this.$site
        const categories = new Classifiable(categoryMeta, pages)
        return categories
      },
      $lists() {
        const { pages } = this.$site
        const lists = new Classifiable(listMeta, pages)
        return lists
      },
      $list() {
        const tagName = this.$route.meta.tagName
        const categoryName = this.$route.meta.categoryName
        const listName = this.$route.meta.listName
        const current = this.$route.meta.current

        if (tagName) {
          return this.$tags.getItemByName(tagName, current)
        } else if (categoryName) {
          return this.$categories.getItemByName(categoryName, current)
        } else if (listName) {
          return this.$lists.getItemByName(listName, current)
        } else {
          return this.$lists.getItemByKeys(this.$page.key)
        }
      }
    }
  })
}
