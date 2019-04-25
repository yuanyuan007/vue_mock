<template>
  <div>
    <el-form :model="select" :inline="true" ref="select">
      <el-form-item>
        <el-button type="primary" @click="add()">新增</el-button>
      </el-form-item>
      <el-form-item prop="title">
        <el-input v-model="select.title" placeholder="请输入标题" class="title-input-width"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="750px" border stripe>
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
          <el-button type="success" @click="changed(scope.row,scope.$index)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur.pageNum" :page-sizes="[10,50,100]" :page-size="cur.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="新增内容" :visible.sync="addDialogFormVisible" width="600px">
      <el-form :model="newTableData">
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="newTableData.title" autocomplete="off" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="作者：" :label-width="formLabelWidth">
          <el-input v-model="newTableData.author" autocomplete="off" class="input-width"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改内容" :visible.sync="changeDialogFormVisible" width="600px">
      <el-form :model="changeTableData">
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="changeTableData.title" autocomplete="off" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="作者：" :label-width="formLabelWidth">
          <el-input v-model="changeTableData.author" autocomplete="off" class="input-width"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeSure()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import axios from 'axios';
  import { serialize } from '@/utils';
  export default {
    data() {
      return {
        spliceTableData: [],
        rowindex: '',
        newTableData: {
          title: '',
          author: ''
        },
        changeTableData: {
          title: '',
          author: ''
        },
        tableData: [],
        select: { title: '', author: '', date: '' },
        addDialogFormVisible: false,
        changeDialogFormVisible: false,
        formLabelWidth: "100px",
        form: {
          name: ''
        },
        cur: {
          pageNum: 1,
          pageSize: 10
        },
        total: 10,
        newData: []
      }
    },
    methods: {
      initDate() {
        axios.get("http://mockjs.com/api/posts", this.cur, {
        }).then(res => {
          this.total = res.data.posts.length;
          this.spliceTableData = res.data.posts;
          if(this.tableData.length == 0) {
            this.getTableData();
          }
        })
      },
      getTableData() {
        this.tableData = this.spliceTableData.splice(0, this.cur.pageSize);
      },
      //删除
      deleted(row) {
        this.$confirm(`是否删除"${row.title}"？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('http://mockjs.com/api/content').then(res => {
            this.deleteMemory = this.tableData.splice(row, 1);
            this.newData.push(this.deleteMemory[0]);
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
      //修改
      changed(row, index) {
        this.$confirm(`是否修改"${row.title}"？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          axios.post('http://mockjs.com/api/content').then(res => {
            this.changeDialogFormVisible = true
            this.changeTableData.title = row.title;
            this.changeTableData.author = row.author;
            this.rowindex = index;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        })
      },
      changeSure() {
        this.changeDialogFormVisible = false;
        this.tableData[this.rowindex].title = this.changeTableData.title;
        this.tableData[this.rowindex].author = this.changeTableData.author;
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      },
      //添加
      add() {
        this.addDialogFormVisible = true;
        this.newTableData.title = '';
        this.newTableData.author = '';
      },
      addSure() {
        this.addDialogFormVisible = false;
        let addTitle = this.newTableData.title;
        let addAuthor = this.newTableData.author;
        if(addAuthor.length == '' && addTitle.length == '') {
          return
        } else {
          this.tableData.unshift({ 'title': this.newTableData.title, 'author': this.newTableData.author })
        }
      },
      //每页
      handleSizeChange(val) {
        this.cur.pageSize = val;
        this.initDate();
        this.getTableData();
      },
      //第几页
      handleCurrentChange(val) {
        this.initDate();
        this.tableData = this.spliceTableData.slice((val - 1) * this.cur.pageSize, this.cur.pageSize);
      },
      search() {
        if(this.select.title) {
          this.tableData = this.tableData.filter(item => {
            return item.title.indexOf(this.select.title) != -1;
          })
        } else {
          this.initDate()
        }
      }
    },
    mounted() {
    },
    created() {
      this.initDate();
    },
    beforeUpdate() {
      sessionStorage.setItem('storage', this.newData);
      sessionStorage.setItem('storage', JSON.stringify(this.newData))
    }
  }
</script>
<style lang="less" scoped>
  .title-input-width {
    width: 200px;
  }
  .input-width {
    width: 400px;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  .sure {
    float: right;
    margin-right: 60px;
    margin-top: 20px;
  }
</style>