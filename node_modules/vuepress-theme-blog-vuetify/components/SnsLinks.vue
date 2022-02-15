<template>
  <div class="component-sns-links">
    <ul class="my-0 d-flex" :style="{'font-size': fontSize}">
      <li v-for="item in sns" :style="{'margin-right': marginSize}">
        <a :href="item.url" target="_blank"><i :class="item.class"></i></a>
      </li>
    </ul>
  </div>
</template>

<script>
  import transform from 'lodash/transform'
  import pickBy from 'lodash/pickBy'
  import sortBy from 'lodash/sortBy'

  export default {
    props: {
      fontSize: {
        type: String,
        default: '1.7rem',
      },
      marginSize: {
        type: String,
        default: '0.5em',
      },
    },
    data: () => ({
      sns: {},
    }),
    created() {
      const faClasses = {
        twitter: 'fab fa-twitter',
        facebook: 'fab fa-facebook-square',
        instagram: 'fab fa-instagram',
        github: 'fab fa-github',
        youtube: 'fab fa-youtube',
        feed: 'fa fa-rss',
      }

      const orders = this.$themeConfig.sns.order

      let sns = Object.assign({}, this.$themeConfig.sns)
      delete sns.order

      sns = transform(sns, (result, value, key) => {
        result.push({type: key, url: value, class: faClasses[key]})
      }, [])

      sns = pickBy(sns, item => !!item.url)

      this.sns = sortBy(sns, item => orders.indexOf(item.type))
    },
  }
</script>

<style lang="scss">
  @import '../styles/variables';

  .component-sns-links {
    ul {
      list-style: none;
      padding: 0;
      li {
        &:last-of-type {
          margin-right: 0 !important;
        }
      }
    }
  }
</style>
