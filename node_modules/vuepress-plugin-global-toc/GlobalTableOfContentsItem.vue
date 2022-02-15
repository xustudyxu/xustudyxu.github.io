<template>
    <li>
        <template v-if="item.children">
            <!-- Sidebar group -->
            <router-link v-if="item.path" :to="item.path">{{item.title || item.path}}</router-link>
            <span v-else>{{ item.title }}</span>
            <ul>
                <GlobalTableOfContentsItem v-for="child in item.children" :key="child.title" :item="child" />
            </ul>
        </template>

        <template v-else>
            <router-link :to="item.path">{{item.title || item.path}}</router-link>
            <ul v-if="item.headers">
                <li v-for="header in item.headers" :key="header.title">
                    <router-link :to="item.path + '#' + header.slug">{{header.title}}</router-link>
                </li>
            </ul>
        </template>        
    </li>
</template>

<script>
export default {
    name: "GlobalTableOfContentsItem",
    props: ["item"]
}
</script>