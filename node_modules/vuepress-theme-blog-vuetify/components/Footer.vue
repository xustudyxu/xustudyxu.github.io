<template>
  <div>
    <v-footer class="component-footer d-flex flex-column justify-center">
      <v-container class="d-flex flex-column flex-sm-row">

        <SnsLinks font-size="1.2em" margin-size="0.7em" class="d-flex flex-column justify-center mr-0 mr-sm-5" />

        <ul class="d-flex flex-wrap mr-auto my-4 my-sm-0">
          <li v-for="link in links" class="d-flex flex-column justify-center">
            <router-link v-if="link.path" :to="link.path">{{ link.label }}</router-link>
            <a v-else-if="link.url" :href="link.url" target="link.target">{{ link.label }}</a>
          </li>
        </ul>

        <span class="d-flex flex-column justify-center">{{ $site.title }} &copy; {{ (new Date()).getFullYear() }}</span>

      </v-container>
    </v-footer>

    <component :is="afterFooterComponent" />

  </div>
</template>

<script>
  import Vue from 'vue'
  import SnsLinks from '@theme/components/SnsLinks';

  export default {
    components: {
      SnsLinks,
    },
    created() {
      this.links = this.$themeConfig.footer.links
      this.afterFooterComponent = Vue.component(this.$themeConfig.components.afterFooter)
    },
    data: () => ({
      links: {},
      afterFooterComponent: null,
    }),
  }
</script>

<style lang="scss">
  @import '../styles/variables';

  .component-footer.v-footer {
    background-color: $color-grey-very-light !important;

    ul {
      list-style: none;
      padding-left: 0 !important;

      li {
        a {
          @include unstyled-link;
          color: $color-grey-dark !important;
          &:hover {
            text-decoration: underline !important;
          }
        }

        &:not(:last-of-type) {
          margin-right: 1em;
        }
      }
    }
  }
</style>
