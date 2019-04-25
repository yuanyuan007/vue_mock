<template>
  <div>
    <div>
      <el-form label-width="100px" :model="creditSuper" ref="creditSuper" :inline="true">
        <el-form-item label="上架位置：" prop="location">
          <el-button v-for="(item,index) in location" :key="index" :value="item" :type="item.isSelect?'primary':''" @click="onLocation(item,index,location)">{{item.name}}</el-button>
        </el-form-item>
        <el-form-item label="状态：" prop="productStatus">
          <el-button v-for="(item,index) in state" :key="index" :value="item" :type="item.isSelect?'primary':''" @click="modifyTheState(item,index,state)">{{item.name}}</el-button>
        </el-form-item>
        <el-form-item label="产品名称：" prop="productName">
          <el-input v-model="creditSuper.productName" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary">添加新产品</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'productSort', order: 'ascending'}">
        <el-table-column prop="productSort" label="排序" sortable align="center">
        </el-table-column>
        <el-table-column prop="productLogo" label="logo" align="center">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.productLogo" class="image-size">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="甲方名称" align="center">
        </el-table-column>
        <el-table-column prop="location" label="位置" align="center" width="200px">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.location" :key="index" class="location-margin">{{(setLoanName[item])}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="limit" label="额度" align="center">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.limit}}元</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="deadline" label="期限" align="center">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.deadline}}天</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="yearRate" label="费率" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.yearRate}}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="productStatus" label="状态" align="center">
          <template slot-scope="scope">
            <div>
              <el-switch :active-value='1' :inactive-value="0" v-model="scope.row.productStatus" @change="productStatus(scope.row)" active-color="#13ce66"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pricingMode" label="计价方式" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.pricingMode === 0">UV</span>
            <span v-if="scope.row.pricingMode === 1">CPA</span>
            <span v-if="scope.row.pricingMode === 2">CPS</span>
          </template>
        </el-table-column>
        <el-table-column prop="uniquePrice" label="单价" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.uniquePrice}}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="运营" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="150px">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span>
              <el-button type="text" @click="modify(scope.row,scope.$index)">修改</el-button>
              <el-button type="text" class="delete" @click="deleted(scope.row)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur.pageNumber" :page-sizes="[10, 20, 50, 100]" :page-size="cur.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { serialize } from '@/utils';
  export default {
    data() {
      return {
        creditSuper: {},
        location: [
          { name: '全部', type: '', isSelect: false },
          { name: '首页', type: '', isSelect: false },
          { name: '人气推荐', type: '', isSelect: false },
          { name: '还款', type: '', isSelect: false },
          { name: '更多推荐', type: '', isSelect: false }
        ],
        state: [
          { name: '全部', type: '', isSelect: false },
          { name: '上架', type: '', isSelect: false },
          { name: '下架', type: '', isSelect: false }
        ],
        setLoanName: {
          0: '首页',
          1: '人气推荐',
          2: '还款',
          3: '更多推荐'
        },
        tableData: [],
        cur: {
          pageSize: 10,
          pageNumber: 1
        },
        totalCount: 10
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        axios.post("api/findProduct", {
          header: {
            token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1"
          },
          body: {
            ...this.cur,
            ...this.creditSuper,

          }
        }).then(res => {
          this.tableData = res.data.data.wrapperLoanSuperList;
          this.totalCount = res.data.data.totalCount;
          this.cur = {
            pageSize: res.data.data.pageSize,
            pageNumber: res.data.data.pageNumber
          }
        })
      },
      handleSizeChange(val) {
        this.cur.pageSize = val;
        this.initData()
      },
      handleCurrentChange(val) {
        this.cur.pageNumber = val;
        this.initData()
      },
      // 修改状态
      productStatus(row) {
        let title = "";
        let message = "";
        if(row.productStatus) {
          title = `是否将"${row.productName}"改为上架`;
          message = "已上架";
        } else {
          title = `是否将"${row.productName}"改为下架`;
          message = "已下架";
        }
        this.$confirm(title, "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
          axios.post("api/updateProductStatus", {
            header: { token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1" },
            body: {
              ...this.productId
            }
          }).then(res => {
            this.initData();
            this.$message({
              type: 'success',
              message: (message)
            })
          })
        }).catch(() => {
          this.initData();
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      // 查询
      query() {
        this.$refs.creditSuper.validate((valid) => {
          if(valid) {
            this.creditSuper = serialize(this.creditSuper);
            this.cur.pageNumber = 1;
            this.initData()
          } else {
            return false;
          }
        })
      },
      // 修改
      modify(row, index) {

      },
      // 删除
      deleted(row) {
        this.$confirm(`是否删除"${row.productName}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post("api/deleteLoan", { productId: row.productId }).then(res => {
            this.initData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      //  上架位置
      onLocation(val, index, all) {
        this.cur.pageNumber = 1;
        all.forEach(element => {
          element.isSelect = false;
        });
        switch(val.name) {
          case "全部":
            val.isSelect = true;
            this.creditSuper.location = '';
            break;
          case "首页":
            val.isSelect = true;
            this.creditSuper.location = 0;
            break;
          case "人气推荐":
            val.isSelect = true;
            this.creditSuper.location = 1;
            break;
          case "还款":
            val.isSelect = true;
            this.creditSuper.location = 2;
            break;
          case "更多推荐":
            val.isSelect = true;
            this.creditSuper.location = 3;
            break;
          default:
            break;
        }
      },
      modifyTheState(val, index, all) {
        this.cur.pageNumber = 1;
        all.forEach(item => {
          item.isSelect = false
        })
        switch(val.name) {
          case "全部":
            val.isSelect = true;
            this.creditSuper.productStatus = ''
            break;
          case "上架":
            val.isSelect = true;
            this.creditSuper.productStatus = 1;
            break;
          case "下架":
            val.isSelect = true;
            this.creditSuper.productStatus = 0;
            break;
          default:
            break;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .block {
    text-align: center;
    margin-top: 30px;
  }
  .image-size {
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }
  .delete {
    color: red;
  }
  .location-margin {
    margin-right: 2px;
  }
</style>


