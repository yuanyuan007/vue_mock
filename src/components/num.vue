<template>
  <div>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
    <p>{{title}}</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    props: [
      'title'
    ]

  }
</script>
<style lang="less" scoped>
</style>

