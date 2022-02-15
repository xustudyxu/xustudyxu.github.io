<template>
  <div class="note-home" aria-labelledby="main-title">
    <div class="hero">
      <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heorAlt || 'hero'" />
      <h1 v-if="data.heroText !== null" id="main-title">{{data.hreoText || $title }}</h1>
      <p
        v-if="data.tagline!==null"
        class="description"
      >{{data.tagline || $description || 'Welcom to you Vuepress site'}}</p>
      <p v-if="data.actions && data.actions.length"  class="action">
              <NavLink v-for="(action, index) in data.actions" :key="index"  :class="index === 0?  'actionButton': 'secondaryButton'" :item="{'link': action.link, 'text': action.text}" />
      </p>
    </div>

    <div v-if="data.features && data.features.length" class="features">
      <div v-for="(feature,index) in data.features" :key="index" class="feature">
        <h2>{{feature.title}}</h2>
        <p>{{feature.details}}</p>
      </div>
    </div>
    <Content class="theme-note-content custom" />

    <div v-if="data.footer" class="footer">{{data.footer}}</div>
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";

export default {
  name: "home",
  components: {
    NavLink
  },
  data() {
    return {};
  },
  computed: {
    data() {
      return this.$page.frontmatter;
    },
    actionLink() {
        return {
            link: this.data.actionLink,
            text: this.data.actionText
        }
    }
  },
  methods: {
    isExtLink(url) {
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(
        url
      );
    },
    link(url) {}
  }
};
</script>