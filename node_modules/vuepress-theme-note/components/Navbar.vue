<template>
  <div class="note-row">
    <div class="note-col note-navbar-left">
      <button class="sidebar-button" type="button" @click="toggleSidebar">
        <span class="sidebar-button-content">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
              class
            />
          </svg>
        </span>
      </button>
      <RouterLink :to="$localePath" class="home-link">
        <span
          v-if="$siteTitle || $site.themeConfig.title "
          ref="siteName"
          class="site-name"
        >{{$siteTitle || $site.themeConfig.title || ''}}</span>
      </RouterLink>
    </div>

    <div
      class="note-col note-navbar-right"
      :style="linksWrapMaxWidth ? {'max-width': linksWrapMaxWidth+'px'}:{}"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <div v-else class="search" :style="{'width': searchBoxWidth+'%'}">
        <SearchBox></SearchBox>
      </div>

      <div class="navlinks can-hide">
        <NavLinks />
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaSearchBox from "@AlgoliaSearchBox";
// import SearchBox from "@SearchBox";
import SearchBox from "@theme/components/SearchBox.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import { resolveSidebarItems } from "../util";

export default {
  name: "Navbar",
  components: {
    AlgoliaSearchBox,
    SearchBox,
    NavLinks
  },
  data() {
    return {
      linksWrapMaxWidth: null,
      searchBoxWidth: 30
    };
  },
  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },
    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    }
  },
  mounted() {
    const breakpont = 719;
    const navbar_vertical_padding =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinkWrapWidth = () => {
      if (document.documentElement.clientWidth < breakpont) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          navbar_vertical_padding -
          ((this.$el.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinkWrapWidth();
    window.addEventListener("resize", handleLinkWrapWidth, false);
  },
  methods: {
    focus(e) {
      this.searchBoxWidth = 50;
    },
    blur(e) {
      this.searchBoxWidth = 30;
    },
    toggleSidebar() {
      const { frontmatter } = this.$page;

      if (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems().length
      ) {
        this.$store.dispatch("global/toggleSidebar");
      }
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localPath
      );
    }
  }
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

