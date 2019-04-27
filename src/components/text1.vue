<template>
  <div>
    <span>button值改变text的值随之改变</span>
    <el-button v-for="(item,index) in button" :key="index" @click="change(item.type)">{{item.text}}</el-button>
    {{getCount}}
    <img :src="getVal" class="img">
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        button: [
          { text: 'a', type: 'fill' },
          { text: 'b', type: 'contain' },
          { text: 'c', type: 'cover' },
          { text: 'd', type: 'none' },
          { text: 'e', type: 'scale-down' }
        ],
      }
    },
    computed: {
      ...mapGetters(['getCount', 'getVal'])
    },
    created() {
    },
    methods: {
      ...mapMutations(['setbround', 'setVal']),
      change(item) {
        this.setbround(item);

      }
    }
  }
</script>
<style lang="less" scoped>
  .img {
    width: 300px;
    height: 200px;
  }
</style>

