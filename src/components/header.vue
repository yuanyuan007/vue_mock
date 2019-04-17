<template>
  <div class="header">
    <div>
      <i class="el-icon-menu"></i>
      首页<span class="error-log">/  错误日志</span>
    </div>
    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" class="tag">
      {{tag}}
    </el-tag>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dynamicTags: ['首页', '文档', '页面权限', '图标'],
        inputVisible: false,
        inputValue: ''
      }
    },
    computed: {

    },
    watch: {

    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
    }
  }
</script>
<style scoped lang="less">
  .error-log {
    color: darkgray;
    padding: 10px;
  }
  .tag {
    margin: 3px;
  }
</style>
