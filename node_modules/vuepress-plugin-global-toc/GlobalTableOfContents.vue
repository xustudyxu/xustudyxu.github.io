<template>
<ul>
    <GlobalTableOfContentsItem v-for="item in items" :key="item.title || item.path" :item="item" />    
</ul>
</template>

<script>
import { resolveSidebarItems } from '@vuepress/theme-default/util/'
import GlobalTableOfContentsItem from "./GlobalTableOfContentsItem.vue";

export default {
    name: "GlobalTableOfContents",
    components: { GlobalTableOfContentsItem },
    computed:{
        items(){
            return resolveSidebarItems(
                this.$page,
                this.$page.regularPath,
                this.$site,
                this.$localePath
            )
        }
    }
}
</script>