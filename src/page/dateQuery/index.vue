|<template>
  <div>
    <el-form :model="operation" ref="operation" :inline="true">
      <el-form-item label="名称：" prop="productName" label-width="100px">
        <el-input placeholder="请输入名称" v-model="operation.productName"></el-input>
      </el-form-item>
      <el-form-item label="时间：" label-width="90px">
        <el-date-picker v-model="times" type="daterange" range-separator="至" start-placeholder="年/月/日" end-placeholder="年/月/日" format="yyyy-MM-dd" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="text" v-for="(item,index) in timesList" :key="index" :class="item.id === selectId?'':'textColor'" @click="getToday(item.num,item)">{{item.text}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="select">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe border cell-class-name="center" header-cell-class-name="center">
      <el-table-column prop="statisticsDate" label="日期" align="center"></el-table-column>
      <el-table-column prop="productName" label="甲方名称" align="center"></el-table-column>
      <el-table-column prop="totalAmount" label="UV值" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import axios from 'axios';
  import { serialize } from '@/utils';
  export default {
    data() {
      return {
        operation: {
          productName: ''
        },
        tableData: [],
        times: [],
        selectId: '',
        timesList: [
          {
            num: 0,
            text: '今天',
            id: 0
          },
          {
            num: 1,
            text: '昨天',
            id: 1
          },
          {
            num: 7,
            text: '最近7天',
            id: 2
          },
          {
            num: 30,
            text: '最近30天',
            id: 3
          }
        ]
      }
    },
    created() {
      // this.initData()
      this.timeListData()
    },
    methods: {
      initData() {
        axios.post("api/findProductReg", {
          header: {
            token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1"
          },
          body: {
            ...this.tableData,
            ...this.operation
          }
        }).then(res => {
          this.tableData = res.data.data.loanSupermarketCountList
        })
      },
      getToday(val, item) {
        if(val === 1) {
          this.times = [this.getDay(1), this.getEndDay(1)];
        } else {
          this.times = [this.getDay(val), this.getEndDay(0)];
        }
        this.operation.createTimeLeftRange = Number(this.times[0].toString().substr(0, 10));
        this.operation.createTimeRightRange = Number(this.times[1].toString().substr(0, 10));
        this.selectId = item.id;
        this.initData();
      },
      timeListData() {
        this.selectId = 0;
        this.operation.createTimeLeftRange = Number(this.getDay(0).toString().substr(0, 10));
        this.operation.createTimeRightRange = Number(this.getEndDay(0).toString().substr(0, 10));
        this.times = [this.getDay(0), this.getEndDay(0)];
        this.initData()
      },
      select() {
        this.$refs.operation.validate((valid) => {
          if(valid) {
            this.operation = serialize(this.operation);
            this.initData()
          } else {
            return false
          }
        })
      },
      getDay(num) {
        var day1 = new Date(new Date(new Date().toLocaleDateString()).getTime());
        day1.setDate(day1.getDate() - num);
        var s1 = day1.getTime();
        return s1;
      },
      getEndDay(num) {
        var day1 = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
        day1.setDate(day1.getDate() - num);
        var s1 = day1.getTime();
        return s1;
      }
    },
    watch: {
      times(val) {
        if(val) {
          this.operation.createTimeLeftRange = Number(val[0].toString().substr(0, 10));
          this.operation.createTimeRightRange = Number(val[1].toString().substr(0, 10));
        } else {
          this.operation.createTimeLeftRange = '';
          this.operation.createTimeRightRange = '';
          this.selectIds = '';
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .textColor {
    color: darkgray;
  }
</style>

