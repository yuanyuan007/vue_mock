<template>
  <div>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
    <p>{{title}}</p>
    <el-button v-for="(item,index) in options" :key="index" :type="(item.type)" @click="changed(item.value)">{{item.text}}</el-button>
    <span>button值改变text1的图片</span>
    <img :src="getVal" class="img">
    <span>text1 的button值： </span> {{getCount}}
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    data() {
      return {
        count: 0,
        options: [
          { text: 'One', value: require('@/assets/background1.jpeg'), type: 'primary' },
          { text: 'Two', value: require('@/assets/background2.png'), type: 'success' },
          { text: 'Three', value: require('@/assets/background3.jpeg'), type: 'danger' },
          { text: 'four', value: require('@/assets/background4.jpg'), type: 'info' },
          { text: 'five', value: require('@/assets/background.jpg'), type: 'warning' },
        ],
      }
    },
    computed: {
      ...mapGetters(['getVal', 'getCount'])
    },
    methods: {
      ...mapMutations(['setVal']),
      changed(item) {
        this.setVal(item)
      }
    },
    props: [
      'title'
    ]

  }
</script>
<style lang="less" scoped>
  .img {
    width: 300px;
    height: 200px;
  }
</style>

