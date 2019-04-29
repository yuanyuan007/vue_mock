<template>
  <div>
    <span>button值改变text的值随之改变</span>
    <el-button v-for="(item,index) in button" :key="index" @click="change(item.type)">{{item.text}}</el-button>
    {{getCount}}
    <img :src="getVal" class="img">
    <div>
      <!-- 计算属性 -->
      <p>输入1-3选择城市</p>
      <input v-model="num">
    城市：{{name}}
    </div>
      <div>
        <p>点击变方变圆</p>
        <!-- 对象语法 -->
        <!-- <div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }" @click="round"></div> -->
        <!-- 数组语法 -->
        <div class="static" v-bind:class="[isActive ? activeClass : errorClass]" @click="round"></div>
      </div>

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
        num: 1,
        name: '中国',
        isActive: false,
        activeClass: 'activeClass',
        errorClass: 'errorClass'
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

      },
      round() {
        this.isActive = !this.isActive;
        this.hasError = !this.hasError;
        // this.activeClass = !this.activeClass;
        // this.errorClass = !this.errorClass
      }

    },
    watch: {
      num(val) {
        switch(val) {
          case '1':
            this.name = "中国";
            break;
          case '2':
            this.name = "美国";
            break;
          case '3':
            this.name = "上海";
          default:
            break;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .img {
    width: 300px;
    height: 200px;
  }
  .static {
    background: palegoldenrod;
  }
  .activeClass {
    width: 100px;
    height: 100px;
    border: 3px solid red;
    border-radius: 50%;
  }
  .errorClass {
    width: 100px;
    height: 100px;
    border: 3px solid palegreen;
  }
</style>

