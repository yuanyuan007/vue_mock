<template>
  <div>
    <template>
      <el-table :data="tableData" height="830px" border stripe>
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="author" label="作者">
        </el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" width="50px" height="50px">
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="danger" @click="deleted(scope.row)">删除</el-button>
            <el-button type="success" @click="changed(scope.row)">修改</el-button>
          </template>
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
        }).then(res => {
          this.tableData = res.data.posts
        })
      },

      deleted(row) {
        console.log(row);
        this.$confirm(`是否删除"${row.title}"？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('http://mockjs.com/api/content').then(res => {
            this.tableData.splice(row, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      changed(row) {
        this.$confirm(`是否修改"${row.title}"？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('http://mockjs.com/api/content').then(res => {
            alert(111)
            // this.$message({
            //   type: 'success',
            //   message: '修改成功!'
            // });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        })
      }
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
</style>