<template>
  <div>
    <div class="side">
      <el-menu :default-active="this.$router.path" default-active="animation" router class="el-menu-vertical-demo" id="height" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="document">文章</el-menu-item>
            <el-menu-item index="guidePage">回收站</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="testPage">
          <i class="el-icon-menu"></i>
          <span slot="title">渠道管理</span>
        </el-menu-item>
        <el-menu-item index="creditSuper">
          <i class="el-icon-document"></i>
          <span slot="title">贷超管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>practice  Vuex</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="creditSuperRight">creditSuperRight</el-menu-item>
            <el-menu-item index="text">text</el-menu-item>
            <el-menu-item index="text1">text1</el-menu-item>
            <el-menu-item index="animation">animation</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>practice</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="text" disabled>text</el-menu-item>
            <el-menu-item index="text1" disabled>text1</el-menu-item>
            <el-menu-item index="text2" disabled>text2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">组件</span>
        </el-menu-item>
        <el-menu-item index="5" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">图表</span>
        </el-menu-item>
        <el-menu-item index="6" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">路由嵌套</span>
        </el-menu-item>
        <el-menu-item index="7" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">table</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tagsList: [
          {
            name: "home",
            path: "/home",
            title: "首页"
          },
          {
            name: "document",
            path: "/document",
            title: "文档"
          },
          {
            name: "guidePage",
            path: "/guidePage",
            title: "引导页"
          },
          {
            name: "testPage",
            path: "/testPage",
            title: "权限测试页"
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
      }
    },
    computed: {

    }
  }
</script>
<style scoped lang="less">
  #height {
    height: 969px;
    width: 200px;
  }
  .side {
    display: flex;
    float: left;
  }
</style>

