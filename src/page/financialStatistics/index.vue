<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" :height="tableHeight">
      <el-table-column prop="loanTime" label="放款日期">
      </el-table-column>
      <el-table-column prop="loanAmount" label="放款金额">
      </el-table-column>
      <el-table-column prop="firstLoanAmount" label="首贷金额">
      </el-table-column>
      <el-table-column prop="sumRepayAmount" label="总回款">
      </el-table-column>
      <el-table-column prop="sumRepayRatio" label="总回款占比">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        tableData: [],
        tableHeight: 200,
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        axios.post("api/findFinanceCount", {
          header: {
            token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1"
          },
          body: {
            ...this.tableData,
          }
        }).then(res => {
          this.tableData = res.data.data.financeCounts
        })
      },
    },
    mounted() {
      let height;
      this.$nextTick(() => {
        height = document.body.clientHeight;
        this.tableHeight = parseInt(height) - 150
      })
    }
  }
</script>
<style lang="less" scoped>
</style>


