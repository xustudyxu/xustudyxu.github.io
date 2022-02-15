<template>
  <BaseLayout>
    <template #content>
      <Page :page="$page" />
    </template>
    <template #sticky>
      <Sticky :page="$page" />
    </template>
  </BaseLayout>
</template>

<script>
  export default {
    data: () => ({
      trackingTags: [],
      excludeTrackingTagLabels: [],
    }),
    created() {
      this.trackingTags = this.$themeConfig.trackingTags
    },
  }
</script>
