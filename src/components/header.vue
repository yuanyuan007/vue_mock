<template>
  <div class="header">
    <div class="top">
      <div class="left">
        <i class="el-icon-menu"></i>
        首页<span class="error-log"> /  错误日志</span>
      </div>
      <div class="right">
        <i class="el-icon-search"></i>
        <i class="el-icon-rank"></i>
        <i class="el-icon-news"></i>
        <i class="el-icon-picture"></i>
        <i class="el-icon-caret-bottom"></i>
        <i class="el-icon-star-on"></i>
      </div>
    </div>
    <!-- <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" class="tag">
        {{tag}}
      </el-tag> -->
    <!-- <div class="tags">
      <ul>
        <li v-for="(item,index) in tagsList" :key="index">
          <router-link :to="item.path">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // dynamicTags: ['首页', '文档', '页面权限', '图标'],
        // inputVisible: false,
        // inputValue: '',
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
          }
        ],
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
  .top {
    height: 60px;
    line-height: 60px;
    .left {
      display: inline;
      float: left;
      cursor: pointer;
    }
    .right {
      display: inline;
      float: right;
      margin-right: 30px;
      i {
        cursor: pointer;
      }
    }
  }
  .tags {
    ul {
      display: flex;
      li {
        margin: 10px;
      }
    }
  }
  .icon {
    float: right;
  }
</style>
