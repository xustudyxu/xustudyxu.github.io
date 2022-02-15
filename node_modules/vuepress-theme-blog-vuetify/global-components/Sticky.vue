<template>
  <div class="component-sticky">
    <component :is="beforeStickyComponent" />

    <Toc v-if="page" :page="page" />

    <component :is="afterStickyComponent" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import Toc from '@theme/components/Toc'

  export default {
    components: {
      Toc,
    },
    props: {
      page: Object,
      require: false,
    },
    created() {
      this.beforeStickyComponent = Vue.component(this.$themeConfig.components.beforeSticky)
      this.afterStickyComponent = Vue.component(this.$themeConfig.components.afterSticky)
    },
    data: () => ({
      beforeStickyComponent: null,
      afterStickyComponent: null,
    }),
  }
</script>

<style lang="scss">
  @import '../styles/variables';

  .component-sticky {
    padding: 0 $sidebar-padding-x;
  }
</style>
