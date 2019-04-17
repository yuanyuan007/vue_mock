<template>
  <div>
    home
    <div>
      <ul v-for="(item,index) in imgLists" :key="index">
        <li>
          <img :src="item.url" class="img">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgLists: [
          { value: 0, url: require('@/assets/background1.jpeg') },
          { value: 1, url: require('@/assets/background2.png') },
          { value: 2, url: require('@/assets/background3.jpeg') },
          { value: 3, url: require('@/assets/background4.jpg') }
        ]
      }
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>
  ul {
    li {
      .img {
        width: 300px;
        height: 200px;
      }
    }
  }
</style>