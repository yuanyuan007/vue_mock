<template>
  <div>
    <el-menu :default-active="this.$router.path" default-active="consumption" router class="el-menu-vertical-demo" id="height" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item v-for="(item,index) in items" :key="index" :index="item.index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span></el-menu-item>
    </el-menu>
    <i class="el-icon-platform-eleme"></i>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        items: [
          {
            index: "home",
            title: "首页",
            icon: 'el-icon-menu'
          },
          {
            index: "document",
            title: "文章",
            icon: 'el-icon-menu'
          },
          {
            index: 'guidePage',
            title: '回收站',
            icon: 'el-icon-menu'
          },
          {
            index: 'testPage',
            title: '渠道管理',
            icon: 'el-icon-menu'
          },
          {
            index: 'creditSuper',
            title: '贷超管理',
            icon: 'el-icon-menu'
          },
          {
            index: 'financialStatistics',
            title: '财务统计',
            icon: 'el-icon-menu'
          },
          {
            index: 'vcharts',
            title: 'vcharts',
            icon: 'el-icon-menu'
          },
          {
            index: "dateQuery",
            title: "日期",
            icon: 'el-icon-menu'
          },
          {
            index: "receivableStatistics",
            title: "回款统计",
            icon: 'el-icon-menu'
          },
          {
            index: 'consumption',
            title: '数据消费',
            icon: 'el-icon-menu'
          }
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
    },

  }
</script>
<style scoped lang="less">
</style>

