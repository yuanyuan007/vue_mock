<template>
  <div class="container">
    <rightSide />
    <Header />
    <router-view></router-view>

  </div>
</template>
<script>
  import rightSide from '@/components/rightSide.vue'
  import Header from '@/components/header.vue'
  export default {
    components: {
      Header,
      rightSide
    }
  }
</script>
<style lang="less" scoped>
</style>