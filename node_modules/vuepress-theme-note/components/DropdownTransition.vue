<template>
    <transition name="dropdown" >
        <slot></slot>
    </transition>
</template>

<script>
export default {
    name: 'DropdownTransition',
    methods: {
        setHeight(e) {
            console.log(e)
            e.style.height = e.scrollHeight + 'px'
        },
        unsetHeight(e) {
            e.style.height = ''
        }
    }
}
</script>

<style lang="scss">
.dropdown-enter, .dropdown-leave-to {
    height: 0 !important;
}
// .dropdown-enter{
//     height: 0 !important;
// }
.dropdown-enter-active {
  transition: height .3s linear;
  transition: opacity 1s linear;
}

</style>