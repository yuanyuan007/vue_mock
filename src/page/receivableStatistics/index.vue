<template>
  <div class="receivableStatistics">
    <el-tabs type="border-card" style="box-shadow: none;">
      <el-tab-pane label="统计图">
        <el-form :model="statisticalFigure" :inline="true">
          <el-form-item label="统计时间：">
            <el-date-picker v-model="statisticalFigureTimes" type="daterange" range-separator="至" start-placeholder="年/月/日" end-placeholder="年/月/日" format="yyyy-MM-dd" value-format="timestamp"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="text" v-for="(item,index) in FigureTimesList" :key="index" :class="item.id === selectIds?'':'text-color'" @click="getTodayFigure(item.num,item)">{{item.text}}</el-button>
          </el-form-item>
          <el-form-item class="button-query">
            <el-button type="primary" @click="statisticalFigureSelect" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
        <template>
          <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :width="width"></ve-histogram>
        </template>
      </el-tab-pane>
      <el-tab-pane label="列表">
        <el-form :model="list" :inline="true">
          <el-form-item label="统计时间：">
            <el-date-picker v-model="listTimes" type="daterange" range-separator="至" start-placeholder="年/月/日" end-placeholder="年/月/日" format="yyyy-MM-dd" value-format="timestamp"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button v-for="(item, index) in buttonList" type="text" :key="index" :class="item.id === selectId?'':'text-color'" @click="getTodayLists(item.num, item)">{{item.text}}</el-button>
          </el-form-item>
          <el-form-item class="button-query">
            <el-button type="primary" @click="listSelect" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
        <template>
          <el-table :data="tableData" stripe border cell-class-name="center" header-cell-class-name="center" style="width:100%" height="700px">
            <el-table-column prop="repaidTime" label="日期"></el-table-column>
            <el-table-column prop="repaidAmount" label="正常回款"></el-table-column>
            <el-table-column prop="extendAmount" label="展期费"></el-table-column>
            <el-table-column prop="overdueAmount" label="逾期回款"></el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import axios from 'axios';
  import VeHistogram from 'v-charts/lib/histogram.common';
  export default {
    components: {
      VeHistogram
    },
    data() {
      return {
        buttonList: [
          {
            num: 15,
            text: '最近15天',
            id: 1
          },
          {
            num: 30,
            text: '最近30天',
            id: 2
          }
        ],
        selectId: Number,
        selectIds: Number,
        FigureTimesList: [
          {
            num: 15,
            text: '最近15天',
            id: 1
          },
          {
            num: 30,
            text: '最近30天',
            id: 2
          }
        ],
        statisticalFigure: {
          repaidStartTime: '',
          repaidEndTime: ''
        },
        width: '',
        statisticalFigureTimes: [],
        chartData: {
          columns: ['repaidTime', 'repaidAmount', 'extendAmount', 'overdueAmount'],
          rows: [],
        },
        chartSettings: {
          labelMap: {
            'repaidTime': '日期',
            'repaidAmount': '正常回款',
            'extendAmount': '展期费',
            'overdueAmount': '逾期回款'
          }
        },
        chartExtend: {
          color: ['#5E9D2C', '#3E96C7', '#DF0B03'],
          series: {
            barWidth: 25
          }
        },
        //列表
        list: {
          repaidStartTime: '',
          repaidEndTime: ''
        },
        listTimes: [],
        tableData: [],
      };
    },
    created() {
      this.getTodayFigure(15, this.FigureTimesList[0]);
      this.getTodayLists(15, this.buttonList[0]);
    },
    mounted() {

    },
    watch: {
      statisticalFigureTimes(val) {
        if(val) {
          this.statisticalFigure.repaidStartTime = Number(val[0].toString().substr(0, 10));
          this.statisticalFigure.repaidEndTime = Number(val[1].toString().substr(0, 10));
        } else {
          this.statisticalFigure.repaidStartTime = '';
          this.statisticalFigure.repaidEndTime = '';
        }
      },
      listTimes(val) {
        if(val) {
          this.list.repaidStartTime = Number(val[0].toString().substr(0, 10));
          this.list.repaidEndTime = Number(val[1].toString().substr(0, 10));
        } else {
          this.list.repaidStartTime = '';
          this.list.repaidEndTime = '';
        }
      }
    },
    methods: {
      // createDataList() {
      //   this.selectId = 1;
      //   this.list.startTime = Number(this.getDay(0).toString().substr(0, 10));
      //   this.list.endTime = Number(this.getDay(0).toString().substr(0, 10));
      //   this.listTimes = [this.getDay(0), this.getEndDay(0)];
      //   this.initDataList();
      // },
      getTodayLists(val, item) {
        if(val === 1) {
          this.listTimes = [this.getDay(1), this.getEndDay(1)];
        } else {
          this.listTimes = [this.getDay(val), this.getEndDay(0)];
        }
        this.list.startTime = Number(this.listTimes[0].toString().substr(0, 10));
        this.list.endTime = Number(this.listTimes[1].toString().substr(0, 10));
        this.selectId = item.id;
        this.$nextTick(() => {
          this.initDataList();
        })
      },
      // createData() {
      //   this.selectIds = 1;
      //   this.statisticalFigure.repaidStartTime = Number(this.getDay(0).toString().substr(0, 10));
      //   this.statisticalFigure.repaidEndTime = Number(this.getDay(0).toString().substr(0, 10));
      //   this.statisticalFigureTimes = [this.getDay(0), this.getEndDay(0)];
      //   this.initData();
      // },
      initData() {
        axios.post('api/findRepaidCount', {
          header: {
            token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1"
          },
          body: {
            ...this.statisticalFigure
          }
        }).then(res => {
          this.chartData.rows = this.setCharData(res.data.data.innerFindRepaymentCounts);
          // this.chartData.rows = res.data.data.innerFindRepaymentCounts;
          this.$nextTick(() => {
            this.width = '100%';
          })
        })
      },
      initDataList() {
        axios.post('api/findRepaidCount', {
          header: {
            token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1"
          },
          body: {
            ...this.list
          }
        }).then(res => {
          this.tableData = res.data.data.innerFindRepaymentCounts;
          this.$nextTick(() => {
            this.width = '100%';
          })
        })
      },
      setCharData(arr) {
        let data = [];
        let obj = {};
        arr.forEach(item => {
          obj = {
            repaidTime: item.repaidTime,
            repaidAmount: item.repaidAmount,
            extendAmount: item.extendAmount,
            overdueAmount: item.overdueAmount
          }
          data.unshift(obj);
        })
        return data;
      },
      //统计图
      statisticalFigureSelect() {
        this.initData();
      },
      getTodayFigure(val, item) {
        if(val === 1) {
          this.statisticalFigureTimes = [this.getDay(1), this.getEndDay(1)];
        } else {
          this.statisticalFigureTimes = [this.getDay(val), this.getEndDay(0)];
        }
        this.statisticalFigure.repaidStartTime = Number(this.statisticalFigureTimes[0].toString().substr(0, 10));
        this.statisticalFigure.repaidEndTime = Number(this.statisticalFigureTimes[1].toString().substr(0, 10));
        this.selectIds = item.id;
        this.initData();
      },
      getDay(num) {
        //num为天数
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
      },
      //列表
      listSelect() {
        this.initDataList();
      },
    }
  };
</script>
<style scope>
  .text-color {
    color: #c0c4cc !important;
  }
</style>

