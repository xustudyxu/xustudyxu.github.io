<template>
  <div class="note-dropdown" @mouseenter="onDpOver($event)" @mouseleave="onDpOut($event)">
    <span>{{item.text}}</span>
    <DropdownTransition>
      <ul class="dropdown-items" v-show="open">
        <li
          v-for="(subItem, index) in item.items"
          :key="subItem.link || index"
          class="dropdown-item"
        >
          <h4 v-if="subItem.type === 'links'">{{subItem.text}}</h4>
          <ul v-if="subItem.type === 'links'" class="dropdown-subitem-wrapper">
            <li
              v-for="childSubItem in subItem.items"
              :key="childSubItem.link"
              class="dropdown-subitem"
              @click="onLiClick(item)"
            >
              <NavLink :item="childSubItem" />
            </li>
          </ul>
          <NavLink v-else :item="subItem" />
        </li>
      </ul>
    </DropdownTransition>
  </div>
  <!-- <button
      class="dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @mouseover="setOpen(!open)"
      @mouseout="setOpen(false)"
    >
      <span>{{item.text}}</span>
      <DropdownTransition>
        <ul v-show="open" class="nav-dropdown">
          <li
            v-for="(subItem, index) in item.items"
            :key="subItem.link || index"
            class="dropdown-item"
          >
            <h4 v-if="subItem.type === 'links'">{{subItem.text}}</h4>
            <ul v-if="subItem.type === 'links'" class="dropdown-subitem-wrapper">
              <li
                v-for="childSubItem in subItem.items"
                :key="childSubItem.link"
                class="dropdown-subitem"
              >
                <NavLink
                  :item="childSubItem"
                  @focusout="
                  isLastItemOfArray(childSubItem, subItem.items) &&
                    isLastItemOfArray(subItem, item.items) &&
                    setOpen(false)
                "
                />
              </li>
            </ul>
            <NavLink
              v-else
              :item="subItem"
              @focusout="isLastItemOfArray(subItem, item.items) && setOpen(false)"
            />
          </li>
        </ul>
      </DropdownTransition>
    </button>
  </div>-->
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import DropdownTransition from "@theme/components/DropdownTransition.vue";

import last from "lodash/last";

export default {
  name: "DropdownLink",
  props: {
    item: {
      required: true
    }
  },
  components: {
    NavLink,
    DropdownTransition
  },
  data() {
    return {
      open: false,
      active: ""
    };
  },
  directives: {
    dpl: {
      bind(el) {
        el.style.display = "none";
      }
    }
  },
  methods: {
    isLastItemOfArray(item, array) {
      return last(array) === item;
    },
    setOpen(value) {
      this.open = value;
    },
    onDpOver(e) {
      this.open = true;
    },
    onDpOut(e) {
      this.open = false;
    },
    onLiClick(item) {
      this.open = false
      let path = event.path || (event.composedPath && event.composedPath()); //兼容火狐和safari
      path[1].style.display = "none";
    }
  },
  computed: {}
};
</script>
