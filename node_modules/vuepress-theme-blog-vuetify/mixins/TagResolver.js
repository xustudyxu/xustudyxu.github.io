import map from 'lodash/map'

export default {
  methods: {
    resolveTags(tagKeys, metaMap) {
        return map(tagKeys, key => {
        return metaMap[key]
      })
    }
  }
}
