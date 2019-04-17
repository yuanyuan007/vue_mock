<template>
  <div>
    <template>
      <el-table v-for="(item,index) in tableData" :key="index" height="250" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.initDate();
    },
    methods: {
      initDate() {
        axios.get("http://mockjs.com/api/posts", {
        }).then(function(data) {
          console.log(data.data.data)
          // this.title = data.data
        }).catch(function(err) {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>