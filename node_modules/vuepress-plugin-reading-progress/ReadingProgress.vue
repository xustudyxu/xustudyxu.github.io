<template>
  <ClientOnly>
    <div v-if="$readingShow" :class="$readingShow" class="reading-progress">
      <div :style="progressStyle" class="progress"></div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: 'ReadingProgress',
  data () {
    return {
      readingTop: 0,
      readingHeight: 1,
      progressStyle: null,
      transform: undefined,
      running: false
    }
  },
  watch: {
    $readingShow () {
      this.progressStyle = this.getProgressStyle()
      this.$readingShow && window.addEventListener('scroll', this.base)
    }
  },
  mounted () {
    this.transform = this.getTransform()
    this.progressStyle = this.getProgressStyle()
    this.$readingShow && window.addEventListener('scroll', this.base)
  },
  beforeDestroy () {
    this.$readingShow && window.removeEventListener('scroll', this.base)
  },
  methods: {
    base() {
      if (!this.running) {
        this.running = true
        requestAnimationFrame(this.getReadingBase)
      }
    },
    getReadingBase () {
      this.readingHeight = this.getReadingHeight() - this.getScreenHeight()
      this.readingTop = this.getReadingTop()
      this.progressStyle = this.getProgressStyle()
      this.running = false
    },
    getReadingHeight () {
      return Math.max(document.body.scrollHeight, document.body.offsetHeight, 0)
    },
    getScreenHeight () {
      return Math.max(window.innerHeight, document.documentElement.clientHeight, 0)
    },
    getReadingTop () {
      return Math.max(window.pageYOffset, document.documentElement.scrollTop, 0)
    },
    getTransform () {
      const div = document.createElement('div')
      const transformList = ['transform', '-webkit-transform', '-moz-transform', '-o-transform', '-ms-transform']
      return transformList.find(item => item in div.style) || undefined
    },
    getProgressStyle () {
      const progress = this.readingTop / this.readingHeight
      switch (this.$readingShow) {
        case 'top':
        case 'bottom':
          if (this.transform) {
            return `${this.transform}: scaleX(${progress})`
          } else {
            return `width: ${progress * 100}%`
          }
          break
        case 'left':
        case 'right':
          if (this.transform) {
            return `${this.transform}: scaleY(${progress})`
          } else {
            return `height: ${progress * 100}%`
          }
          break
        default:
          return null
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
$readingBgColor ?= transparent
$readingZIndex ?= 1000
$readingSize ?= 3px
$readingProgressColor ?= $accentColor
$readingProgressImage ?= none

.reading-progress
  position fixed
  z-index $readingZIndex
  background $readingBgColor
  overflow hidden
  .progress
    width 100%
    height 100%
    background $readingProgressColor
    background-image $readingProgressImage
    transform-origin 0% 0%
    transition: transform .2s ease-out
.top
  top 0
  left 0
  right 0
  width 100%
  height $readingSize
.bottom
  bottom 0
  left 0
  right 0
  width 100%
  height $readingSize
.left
  left 0
  top 0
  bottom 0
  width $readingSize
  height 100%
.right
  right 0
  top 0
  bottom 0
  width $readingSize
  height 100%
</style>
