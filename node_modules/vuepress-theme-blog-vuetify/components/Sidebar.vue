<template>
  <div class="component-sidebar">
    <component :is="beforeSidebarComponent" />

    <SearchBox class="mb-5" />

    <section v-if="profile.name" class="block profile">
      <h3 class="mt-0 mb-5">Profile</h3>
      <div class="d-flex">
        <v-avatar v-if="profile.avatarUrl" class="mr-3">
          <img :src="profile.avatarUrl">
        </v-avatar>
        <div v-if="profile.name" class="d-flex flex-column justify-center">
          <p class="my-0"><strong class="name">{{ profile.name }}</strong></p>
          <p class="my-0 grey--text" style="font-size:0.9em">{{ profile.subTitle }}</p>
        </div>
      </div>
      <p v-html="profile.descriptionHtml" class="mt-4 mb-0" />

      <SnsLinks class="mt-1" />
    </section>

    <section v-if="hotTags.length" class="block tags">
      <div class="d-flex align-center mb-5">
        <h3 class="ma-0">Hot Tags</h3>
        <router-link to="/tag/" class="ml-3">See all</router-link>
      </div>
      <v-chip
        v-for="tag in hotTags"
        small
        :to="tag.path"
        class="unstyled mr-1 mb-1"
      >
        {{ tag.key }}
      </v-chip>
    </section>

    <section v-if="recentPosts.length" class="block recent-posts">
      <h3 class="mt-0 mb-5">Recent Posts</h3>
      <ul>
        <li v-for="post in recentPosts">
          <router-link :to="post.path">{{ post.title }}</router-link>
        </li>
      </ul>
    </section>

    <section v-for="block in additionalBlocks" class="block additional-block">
      <h3 class="mt-0 mb-5">{{ block.title }}</h3>
      <ul>
        <li v-for="link in block.links">
          <router-link v-if="link.path" :to="link.path">{{ link.label }}</router-link>
          <a v-else-if="link.url" :href="link.url" target="link.target">{{ link.label }}</a>
        </li>
      </ul>
    </section>

    <component :is="afterSidebarComponent" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import dayjs from 'dayjs'
  import reduce from 'lodash/reduce'
  import values from 'lodash/values'
  import sortBy from 'lodash/sortBy'
  import SearchBox from '@SearchBox'
  import SnsLinks from '@theme/components/SnsLinks'

  export default {
    components: {
      SearchBox,
      SnsLinks,
    },
    created() {
      // profile
      const profileValues = values(this.$themeConfig.sidebar.profile)
      const profileConfigExists = reduce(profileValues, (result, value) => result || !!value, false)
      if (profileConfigExists) {
        this.profile = this.$themeConfig.sidebar.profile
      }

      // hot tags
      this.hotTags = sortBy(this.$tag._metaMap, tag => tag.pages.length).reverse().slice(0, this.$themeConfig.sidebar.hotTags)

      // recent posts
      let posts = []
      this.$site.pages.forEach(page => {
        if (this.$themeConfig.sidebar.directoryIds.includes(page.id) && page.frontmatter.date) {
          posts.push(page)
        }
      })
      // order by date desc
      posts.sort((prev, next) => {
        return dayjs(next.frontmatter.date) - dayjs(prev.frontmatter.date)
      })
      this.recentPosts = posts.slice(0, this.$themeConfig.sidebar.recentPosts)

      // additional blocks
      this.additionalBlocks = this.$themeConfig.sidebar.additionalBlocks

      this.beforeSidebarComponent = Vue.component(this.$themeConfig.components.beforeSidebar)
      this.afterSidebarComponent = Vue.component(this.$themeConfig.components.afterSidebar)
    },
    data: () => ({
      profile: {},
      hotTags: [],
      recentPosts: [],
      additionalBlocks: [],
      beforeSidebarComponent: null,
      afterSidebarComponent: null,
    }),
  }
</script>

<style lang="scss">
  @import '../styles/variables';

  .component-sidebar {
    padding: 0 $sidebar-padding-x;
    font-size: 0.95rem;

    section.block:not(:last-of-type) {
      margin-bottom: 3em;
    }

    .search-box {
      $border-color: $color-grey-light;

      width: 100%;
      input {
        font-size: 16px !important; // prevent zoom-up on smart phone
        width: 100%;
        background-position-y: center; // fix icon position
        color: $base-font-color;
        &.focused {
          border-color: $border-color;
        }

        // overwrite default
        @media (max-width: 959px) {
          cursor: inherit;
          width: inherit;
          border-color: $border-color;
          position: inherit;
        }
        @media (max-width: 719px) {
          left: inherit;
        }

        // my own
        @media (max-width: 960px) { // <= md
          width: 80%;
        }
      }

      .suggestions {
        margin: -1px !important;
        z-index: 999;
        left: 0;
        a {
          @include unstyled-link;
          color: $color-link !important;
        }
        @media (max-width: 960px) { // <= md
          width: 80%;
        }
      }
    }

    .recent-posts, .additional-block {
      ul {
        list-style: none;
        padding: 0;
        li {
          &:not(:last-of-type) {
            border-bottom: 1px solid $color-grey-light;
            padding-bottom: 0.5em;
            margin-bottom: 0.5em;
          }
          a {
            @include unstyled-link;
            display: block;
            &:hover {
              color: $color-grey !important;
            }
          }
        }
      }
    }
  }
</style>
