<template>
    <div class="note-page">
        <slot name="top"></slot>

        <Content class="theme-note-content" />
        <PageEdit />

        <PageNav :sidebarItems="sidebarItems" />


        <slot name="bottom"></slot>

    </div>
</template>

<script>
import PageNav from '@theme/components/PageNav.vue'
import PageEdit from '@theme/components/PageEdit.vue'

export default {
    name: 'Page',
    components: {PageNav, PageEdit},
    props: ['sidebarItems']
}
</script>

