<template>
  <v-app class="component-base-layout">
    <v-app-bar
      app
      fixed
      elevate-on-scroll
    >
      <v-container class="d-flex align-center">
        <v-toolbar-title
          class="mr-auto d-flex align-center"
          style="cursor:pointer"
          @click="navigate('/')"
        >
          <div v-html="$themeConfig.titleHtml" class="site-title" />
        </v-toolbar-title>
        <v-btn
          class="d-block d-md-none"
          icon
          @click="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      fixed
      id="drawer"
      class="py-3"
    >
      <v-btn
        fab
        depressed
        x-small
        fixed
        right
        color="grey"
        @click="drawer = !drawer"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <Sidebar />
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <div class="d-md-flex">
          <div id="content">
            <slot name="content" /><!-- content here -->
          </div>
          <aside id="sidebar" class="d-none d-md-block">
            <Sidebar />
            <div id="sticky">
              <slot name="sticky" /><!-- sticky here -->
            </div>
          </aside>
        </div>
      </v-container>
    </v-content>

    <Footer />

  </v-app>
</template>

<script>
  import Sidebar from '@theme/components/Sidebar'
  import Footer from '@theme/components/Footer'

  export default {
    components: {
      Sidebar,
      Footer,
    },
    mounted() {
      window.addEventListener('resize', e => {
        if (!(e instanceof UIEvent)) {
          this.drawer = false
        }
      })
    },
    data: () => ({
      drawer: false,
    }),
    methods: {
      navigate(path) {
        this.$router.push(path).catch(e => {
          if (e.name !== 'NavigationDuplicated') {
            throw e
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/index';

  .component-base-layout {
    .site-title {
      color: $color-app-bar-title;
      i {
        color: $color-app-bar-title !important;
      }
    }
  }
</style>
