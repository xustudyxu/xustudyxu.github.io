<template>
  <div class="note-sidebar animated fadeInLeft faster">
    <slot name="top" />
    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom"></slot>
  </div>
</template>

<script>
import SidebarLinks from "@theme/components/SidebarLinks";
import NavLinks from "@theme/components/NavLinks.vue";

export default {
  name: "Sidebar",
  components: {
    SidebarLinks,
    NavLinks
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
