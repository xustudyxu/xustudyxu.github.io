<template>
  <article :key="page.key" class="component-page">
    <component :is="beforePageComponent" />

    <header class="mb-12">
      <div class="metadata">
        <div class="d-flex">
          <div v-if="page.frontmatter.date" class="published-at">
            <i class="fa fa-clock"></i>
            <time :datetime="page.frontmatter.date">
              {{ resolvePostDate(page.frontmatter.date) }}
            </time>
          </div>
          <div v-if="page.frontmatter.update" class="updated-at ml-3">
            <i class="fa fa-sync-alt"></i>
            <time :datetime="page.frontmatter.update">
              {{ resolvePostDate(page.frontmatter.update) }}
            </time>
          </div>
          <div v-if="page.frontmatter.author" class="author ml-3">
            <span class="name">
              <i class="fa fa-user"></i>
              <router-link :to="`/author/${page.frontmatter.author}`">{{ page.frontmatter.author }}</router-link>
            </span>
            <span v-if="page.frontmatter.location" class="location">
              in {{ page.frontmatter.location }}
            </span>
          </div>
        </div>
      </div>

      <h1 class="mt-2 mb-3">{{ page.title }}</h1>

      <div v-if="this.tags.length" class="tags">
        <v-chip
          v-for="tag in this.tags"
          small
          :key="tag.key"
          :to="tag.path"
          class="unstyled mr-1 mb-1"
        >
          {{ tag.key }}
        </v-chip>
      </div>

      <div v-if="page.frontmatter.showThumbnail || ($themeConfig.showThumbnail && page.frontmatter.showThumbnail === undefined) && page.frontmatter.image" class="mt-4 thumbnail">
        <img :src="page.frontmatter.image" :alt="page.title">
      </div>
    </header>

    <component :is="beforePageSectionComponent" />

    <section>
      <Content :page-key="page.key" />
    </section>

    <component :is="afterPageComponent" />
  </article>
</template>

<script>
  import Vue from 'vue'
  import dayjs from 'dayjs'
  import TagResolver from '@theme/mixins/TagResolver'

  export default {
    mixins: [
      TagResolver,
    ],
    props: {
      page: Object,
    },
    created() {
      this.beforePageComponent = Vue.component(this.$themeConfig.components.beforePage)
      this.beforePageSectionComponent = Vue.component(this.$themeConfig.components.beforePageSection)
      this.afterPageComponent = Vue.component(this.$themeConfig.components.afterPage)
    },
    computed: {
      tags() {
        return this.resolveTags(this.page.frontmatter.tags, this.$tag._metaMap)
      },
    },
    data: () => ({
      beforePageComponent: null,
      beforePageSectionComponent: null,
      afterPageComponent: null,
    }),
    methods: {
      resolvePostDate(date) {
        return dayjs(date).format(this.$themeConfig.dateFormat || 'YYYY/MM/DD')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/variables';

  .component-page {
    header {
      h1 {
        font-size: 2.5rem;
      }
      .metadata {
        font-size: 0.9rem;
        color: $color-grey;
      }
      .tags {
        font-size: 0.9rem;
      }
    }
  }
</style>
