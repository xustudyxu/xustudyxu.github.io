<template>
  <div class="component-toc">
    <scrollactive
      v-if="page.headers"
      v-on:itemchanged="onItemChanged"
      :offset="0"
      :duration="0"
    >
      <ul>
        <li v-for="header in page.headers" :class="`level-${header.reducedLevel}`">
          <router-link :to="`#${header.slug}`" class="scrollactive-item">{{ header.title }}</router-link>
        </li>
      </ul>
    </scrollactive>
  </div>
</template>

<script>
  export default {
    props: {
      page: Object,
    },
    methods: {
      onItemChanged(event, currentItem, lastActiveItem) {
        if (lastActiveItem) {
          lastActiveItem.parentNode.classList.remove('active')
        }
        if (currentItem) {
          currentItem.parentNode.classList.add('active')
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/variables';

  .component-toc {
    ul {
      list-style: none;
      background-color: $color-grey-very-light;
      padding: 1em 0;

      li {
        @for $i from 0 through 5 {
          &.level-#{$i} {
            padding: 0 #{$i+1}em;
          }
        }

        &.active {
          background-color: $color-grey-light;
        }

        a {
          display: block;
          padding: 0.1em 0.3em;

          @include unstyled-link;
          color: $color-grey !important;

          &:hover {
            color: $color-grey-very-dark !important;
          }
        }
      }
    }
  }
</style>
