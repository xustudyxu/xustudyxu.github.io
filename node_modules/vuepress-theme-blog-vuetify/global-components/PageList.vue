<template>
  <div class="component-page-list pb-12">
    <component :is="beforePageListComponent" />

    <div v-for="page in pages">
      <PageSummary :page="page" class="page-summary" />
    </div>

    <component :is="beforePaginationComponent" />

    <component
      :is="paginationComponent"
      v-if="this.pagination.length > 1 && paginationComponent"
      :pagination-component-name="paginationComponentName"
      class="d-flex justify-center mt-12"
    />

    <component :is="afterPageListComponent" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import PageSummary from '@theme/components/PageSummary'

  export default {
    components: {
      PageSummary,
    },
    props: {
      pagination: Object,
    },
    created() {
      this.paginationComponentName = this.$themeConfig.components.pagination
      this.paginationComponent = Vue.component(this.$themeConfig.components.pagination)
      this.beforePageListComponent = Vue.component(this.$themeConfig.components.beforePageList)
      this.beforePaginationComponent = Vue.component(this.$themeConfig.components.beforePagination)
      this.afterPageListComponent = Vue.component(this.$themeConfig.components.afterPageList)
    },
    computed: {
      pages() {
        return this.pagination.pages
      },
    },
    data: () => ({
      paginationComponentName: '', // just for correct styling
      paginationComponent: null,
      beforePageListComponent: null,
      beforePaginationComponent: null,
      afterPageListComponent: null,
    }),
  }
</script>

<style lang="scss">
  @import '../styles/variables';

  .component-page-list {
    .page-summary {
      border-bottom: 1px solid $color-grey-light;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }
    .page {
      border-bottom: 1px solid $color-grey-light;
      margin-bottom: 3rem;
      padding-bottom: 0;
    }

    .component-pagination[pagination-component-name="VuetifyPagination"] {
    }

    .pagination[pagination-component-name="Pagination"] {
      margin: 0;
      padding: 0;

      li {
        &.disabled {
          color: $color-grey;
        }
        &.active {
          a {
            background-color: $color-brand;
            border-color: $color-brand;
          }
        }
        a {
          @include unstyled-link;
        }
      }
    }

    .pagination[pagination-component-name="SimplePagination"] {
      margin: 0;
      width: 100%;
      text-align: center;

      a {
        @include unstyled-link;
        color: $color-link !important;
        &:hover {
          background: none;
          text-decoration: underline !important;
        }

        // resize
        border: none;
        border-radius: 0;
        line-height: 1;
        height: auto;
        padding: 0;
        &:first-of-type {
          margin-right: 1em;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
</style>
