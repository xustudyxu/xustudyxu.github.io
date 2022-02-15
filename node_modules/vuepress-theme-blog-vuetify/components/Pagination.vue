<template>
  <div class="component-pagination">
    <v-pagination
      v-model="page"
      @input="navigate()"
      :length="$pagination.length"
      :total-visible="6"
      circle
      color="primary"
    />
  </div>
</template>

<script>
  export default {
    data: () => ({
      page: 1,
    }),
    methods: {
      navigate() {
        const path = this.$pagination.getSpecificPageLink(this.page - 1)
        this.$router.push(path).catch(e => {
          if (e.name !== 'NavigationDuplicated') {
            throw e
          }
        })
      }
    },
    created() {
      this.page = this.$pagination.paginationIndex + 1
    },
    watch:{
      $route(to, from) {
        if (this.$pagination && this.$pagination.paginationIndex === 0) {
          this.page = 1
        }
      }
    },
  }
</script>

<style lang="scss">
  @import '../styles/variables';

  .component-pagination {
    button {
      outline: none;

      &.primary {
        background-color: $color-brand !important;
        border-color: $color-brand !important;
      }
    }
  }
</style>
