<template>
  <div class="searchbox" :class="{'focused': focused}">
    <div class="searchbox-icon">
      <svg
        t="1587518432004"
        class="icon"
        color="rgba(0,0,0,.6)"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1873"
      >
        <path
          d="M946.155051 895.382691l-186.037067-186.032974c56.195883-67.547419 89.998757-154.376996 89.998757-249.113661 0-215.247342-174.49315-389.741515-389.746632-389.741515-215.247342 0-389.741515 174.49315-389.741515 389.741515 0 215.252459 174.49315 389.746632 389.741515 389.746632 95.768157 0 183.461405-34.540677 251.317862-91.841731l185.853895 185.853895c6.710842 6.714935 15.505136 10.067286 24.304546 10.067286 8.794293 0 17.593703-3.357468 24.307615-10.067286C959.576735 930.575214 959.576735 908.808468 946.155051 895.382691L946.155051 895.382691zM460.370109 781.233907c-43.363623 0-85.392856-8.476045-124.920104-25.195845-38.217417-16.166191-72.554456-39.321564-102.054327-68.821435-29.504988-29.504988-52.655244-63.836911-68.821435-102.054327-16.720823-39.529295-25.195845-81.561597-25.195845-124.925221 0-43.363623 8.476045-85.392856 25.195845-124.925221 16.166191-38.2123 39.316447-72.550363 68.821435-102.050234 29.499871-29.504988 63.836911-52.66036 102.054327-68.821435 39.528272-16.7198 81.556481-25.195845 124.920104-25.195845s85.395926 8.476045 124.925221 25.195845c38.217417 16.161075 72.554456 39.316447 102.054327 68.821435 29.499871 29.499871 52.655244 63.831794 68.820412 102.050234 16.721847 39.529295 25.196869 81.561597 25.196869 124.925221 0 43.363623-8.476045 85.395926-25.196869 124.925221-16.164145 38.217417-39.315424 72.550363-68.820412 102.054327-29.499871 29.499871-63.836911 52.655244-102.054327 68.821435C545.767058 772.758885 503.734756 781.233907 460.370109 781.233907L460.370109 781.233907zM460.370109 781.233907"
          p-id="1874"
        />
      </svg>
    </div>
    <div class="searchbox-content">
      <input
        type="text"
        name="search"
        :placeholder="placeholder"
        autocomplete="off"
        @focus="focus"
        @blur="blur"
        :value="query"
        @input="query = $event.target.value"
        aria-label="Search"
        @keyup.enter="go(focusIndex)"
        @keyup.up="onUp"
        @keyup.down="onDown"
        ref="input"
      />
    </div>

    <ul class="suggestions" v-if="showSuggestions" @mouseleave="unfocus">
      <li
        class="suggestion"
        v-for="(s, i) in suggestions"
        :key="i"
        :class="{focused: i===focusIndex}"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <RouterLink :to="s.path" @click.prevent>
          <span>{{s.title || s.path}}</span>
          <span v-if="s.header" class="li-header">&gt; {{s.header.title}}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      focused: false,
      query: "",
      focusIndex: -1,
      placeholder: undefined
    };
  },
  mounted() {},
  computed: {
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length;
    },
    suggestions() {
      const query = this.query.trim().toLowerCase();
      if (!query) return;
      const { pages } = this.$site;
      const max = this.$site.themeConfig.searchMaxSuggestions;
      const localePath = this.$localePath;
      const matches = item =>
        item && item.title && item.title.toLowerCase().indexOf(query) > -1;
      const res = [];

      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break;
        const p = pages[i];
        // filter out results that do not match current locale
        if (this.getPageLocalePath(p) !== localePath) {
          continue;
        }
        if (matches(p)) {
          res.push(p);
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break;
            const h = p.headers[j];
            if (matches(h)) {
              res.push(
                Object.assign({}, p, {
                  path: p.path + "#" + h.slug,
                  header: h
                })
              );
            }
          }
        }
      }
      console.log(res);
      return res;
    }
  },
  methods: {
    go(i) {
      if (!this.showSuggestions) {
        return;
      }
      if (this.$route.path !== this.suggestions[i].path) {
        this.$router.push(this.suggestions[i].path);
        this.query = "";
        this.focusIndex = 0;
      } else {
        this.query = "";
        this.focusIndex = 0;
      }
    },
    onUp(e) {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--;
        } else {
          this.focusIndex = this.suggestions.length - 1;
        }
      }
    },
    onDown(e) {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++;
        } else {
          this.focusIndex = 0;
        }
      }
    },
    focus(i) {
      this.focused = i;
    },
    unfocus() {
      this.focused = -1;
    },
    getPageLocalePath() {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== "/" && page.path.indexOf(localePath) === 0) {
          return localePath;
        }
      }
      return "/";
    },
    focus(e) {
      this.focused = true;
      this.$emit("focus");
    },
    blur(e) {
      this.focused = false;
      this.$emit("blur");
    }
  }
};
</script>
