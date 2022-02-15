<template>
  <div
    class="note-sidebar-group"
    :class="[{collapsable, 'is-sub-group': depth !== 0}, `depth-${depth}`]"
  >
    <RouterLink
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{open, 'active': isActive($route, item.path)}"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{item.title}}</span>
      <span v-if="collapsable" class="arrow" :class="open? 'down': right">icon</span>
    </RouterLink>
    <p v-else class="sidebar-heading" :class="{open}" @click="$emit('toggle')">
      <span>{{item.title}}</span>
      <span v-if="collapsable" class="arrow" :class="open? 'down': 'right'">icon</span>
    </p>
    <DropdownTransition>
      <SidebarLinks
        v-if="open || !collapsable"
        class="sidebar-group-items"
        :items="item.children"
        :sidebar-depth="item.sidebarDepth"
        :depth="depth + 1"
      />
    </DropdownTransition>
  </div>
</template>

<script>
import DropdownTransition from "@theme/components/DropdownTransition.vue";
import { isActive } from "../util";
export default {
  name: "SidebarGroup",
  props: ["item", "open", "collapsable", "depth"],
  components:{
      DropdownTransition
  },
  beforeCreate() {
    this.$options.components.SidebarLinks = require("@theme/components/SidebarLinks.vue").default;
  },
  methods: {
    isActive
  }
};
</script>