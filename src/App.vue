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
      // axios.post('http://mockjs.com/api/content', { a: 1 }).then(res => {
      //   console.log(res);
      // })
    }  }
</script>

<style>
</style>
