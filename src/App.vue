<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'App',
    created() {
      // axios.get('http://mockjs.com/api/posts', { a: 1 }).then(res => {
      //   console.log(res);
      // })
    }
  }
</script>

<style>
</style>
