<template>
  <div>
    <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :width="width"></ve-histogram>
    <ve-pie :data="chartDataPie" :settings="chartSettingPie"></ve-pie>
  </div>
</template>
<script>
  import VeHistogram from 'v-charts/lib/histogram.common';
  import VePie from 'v-charts/lib/pie.common';
  import axios from 'axios';
  export default {
    components: {
      VeHistogram,
      VePie,
    },
    data() {
      return {
        width: '',
        chartData: {
          columns: ['repaidTime', 'repaidAmount', 'extendAmount', 'overdueAmount'],
          rows: []
        },
        chartExtend: {
          // label: { show: true, position: "top" },
          // color: ['#5E9D2C', '#3E96C7', '#DF0B03'],
          series: {
            barWidth: 30
          }
        },
        chartSettings: {
          showLine: ['repaidAmount'],
          labelMap: {
            'repaidTime': '日期',
            'repaidAmount': '正常回款',
            'extendAmount': '展期费',
            'overdueAmount': '逾期回款'
          }
        },
        chartDataPie: {
          columns: ['repaidTime', 'repaidAmount', 'extendAmount', 'overdueAmount'],
          rows: []
        },
        chartSettingPie: {
          roseType: 'radius',
          labelMap: {
            'repaidTime': '日期',
            'repaidAmount': '正常回款',
            'extendAmount': '展期费',
            'overdueAmount': '逾期回款'
          },
          offsetY: 300
        },
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        axios.post("api/findRepaidCount", {
          header: {
            token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1"
          },
          body: {
          }
        }).then(res => {
          console.log(res.data.data.innerFindRepaymentCounts)
          this.chartData.rows = res.data.data.innerFindRepaymentCounts
          this.chartDataPie.rows = res.data.data.innerFindRepaymentCounts
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>


