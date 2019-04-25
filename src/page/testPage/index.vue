<template>
  <div>
    <div>
      <el-form :model="channelList" ref="channelList" :inline="true">
        <el-form-item label="渠道查询：" prop="channelNumberOrName" label-width="100px">
          <el-input placeholder="请输入编号" class="input-width" v-model="channelList.channelNumberOrName"></el-input>
        </el-form-item>
        <el-form-item label="渠道编码：" prop="channelCode" label-width="100px">
          <el-input placeholder="请输入渠道编码" class="input-width" v-model="channelList.channelCode"></el-input>
        </el-form-item>
        <el-form-item label="计费方式：" prop="pricingMode" label-width="100px">
          <el-select v-model="channelList.pricingMode" class="input-width">
            <el-option v-for="(item,index) in billingWaya" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开启：" prop="channelStatus" label-width="100px">
          <el-select v-model="channelList.channelStatus" class="input-width">
            <el-option v-for="(item,index) in open" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加人：" prop="createEmployeeName" label-width="100px">
          <el-input placeholder="请输入添加人姓名" class="input-width" v-model="channelList.createEmployeeName"></el-input>
        </el-form-item>
        <el-form-item label="添加日期：" label-width="100px">
          <el-date-picker v-model="times" type="daterange" range-separator="至" start-placeholder="年/月/日" end-placeholder="年/月/日" format="yyyy-MM-dd" class="input-width" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" @click="addChannel">新增渠道</el-button>
        </el-form-item>
      </el-form>
      <div class="channel-background">渠道方后台：<span>{{orgUrl}}</span></div>
      <div>
        <el-table :data="tableData" border class="table">
          <el-table-column prop="channelNumber" label="编号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="channelName" label="渠道名称" align="center">
            <template slot-scope="scope">
              <span @click="changeChannel(scope.row)">{{scope.row.channelName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="channelCode" label="渠道编码" align="center">
          </el-table-column>
          <el-table-column prop="pricingMode" label="计费方式" width="100" align="center">
            <template slot-scope="scope">
              <span>{{billingWay[scope.row.pricingMode]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="unitPrice" label="单价" width="100" align="center">
          </el-table-column>
          <el-table-column prop="channelUrl" label="渠道链接" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div class="channel-links">
                <span class="item">
                <el-tooltip  effect="dark" :content="scope.row.channelUrl" placement="top">
                  <span>{{scope.row.channelUrl}}</span>
                </el-tooltip>
                <input :id="`${scope.row}`" :value="scope.row.channelUrl">
                </span>
                <el-button type="text" @click="copy(scope.row)">复制</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="isSettling" label="是否结算" width="100" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isSettling">正常</span>
              <span v-else>停止</span>
            </template>
          </el-table-column>
          <el-table-column prop="channelStatus" label="是否开启" width="100" align="center">
            <template slot-scope="scope">
              <div>
                <div style="text-align:center" v-if="orgChannelId == scope.row.orgChannelId"></div>
                <div v-else>
                  <el-switch :active-value='1' :inactive-value="0" v-model="scope.row.channelStatus" active-color="#13ce66" @change="changeStatus(scope.row, scope.$index)"></el-switch>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createEmployeeName" label="添加人" width="100" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="添加日期" align="center">
            <template slot-scope="scope">
              <span>{{timestampToTime(scope.row.createTime)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur.pageNumber" :page-sizes="[10, 20, 50, 100]" :page-size="cur.pageSize" layout="total, sizes, prev, pager, next, jumper,slot" :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <right v-if="close" @rightModel="deleted" @submit="submit"></right>
  </div>
</template>
<script>
  import right from '@/components/right';
  import axios from 'axios';
  import { serialize } from '@/utils';
  export default {
    components: {
      right
    },
    data() {
      return {
        close: true,
        orgUrl: '',
        selectData: {},
        dataToken: '',
        channelStauts: '',
        channelList: {
          orgChannelId: '',
          channelNumberOrName: '',
          channelCode: '',
          createEmployeeName: '',
          pricingMode: '',
          channelStatus: '',
          createTimeLeftRange: '',
          createTimeRightRange: ''
        },
        tableData: [],
        value: '',
        cur: {
          pageSize: 10,
          pageNumber: 1
        },
        totalCount: 10,
        billingWaya: [{
          label: "CPA",
          value: 1
        },
        {
          label: "CPS",
          value: 2
        },
        {
          label: "UV",
          value: 0
        }
        ],
        billingWay: {
          0: "CPA",
          1: "CPS",
          2: "UV"
        },
        open: [
          {
            label: "全部",
            value: ''
          },
          {
            label: "开启",
            value: 1
          },
          {
            label: "关闭",
            value: 0
          }
        ],
        settlement: [
          {
            label: "正常",
            value: 0
          },
          {
            label: "停止",
            value: 1
          },
          {
            label: " - ",
            value: 2
          }
        ],
        times: [],
        close: false,
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        axios.post("api/findChannels", {
          header: { token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1" },
          body: {
            ...this.cur,
            ...this.channelList
          }
        }).then(res => {
          this.totalCount = res.data.data.totalCount;
          this.cur = {
            pageSize: res.data.data.pageSize,
            pageNumber: res.data.data.pageNumber
          }
          this.orgUrl = res.data.data.orgUrl
          this.tableData = res.data.data.channels
          this.orgChannelId = res.data.data.orgChannelId
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
      query() {
        this.$refs.channelList.validate((valid) => {
          if(valid) {
            this.selectData = serialize(this.channelList);
            this.cur.pageNumber = 1;
            this.initData();
          } else {
            return false;
          }
        })
      },
      timestampToTime(row) {
        var date = new Date(row);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
      },
      changeStatus(row, index) {
        let title = "";
        let message = "";
        if(row.channelStatus) {
          title = "确认要开启吗";
          message = "开启成功";
        } else {
          title = "确认要关闭吗";
          message = "关闭成功";
        }
        this.$confirm(title, "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
          axios.post("api/toggleChannelStatus", {
            header: { token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1" },
            body: {
              channelId: this.channelId,
              channelStauts: this.changeStatus,
              dataToken: this.dataToken
            }
          }).then(res => {
            this.initData();
            this.$message({
              type: 'success',
              message: (message)
            });
          })
        }).catch(() => {
          this.initData();
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      addChannel() {
        this.close = true;
      },
      deleted() {
        this.close = false
      },
      submit() {
        this.close = false;
        this.$message({
          type: 'success',
          message: '新增成功'
        });
      },
      copy(row) {
        this.$nextTick(() => {
          let url = document.getElementById(`${row}`);
          url.select();
          document.execCommand("copy");
          this.$message({
            type: 'success',
            message: '复制成功'
          });
        })
      }
    },
    watch: {
      times(val) {
        if(val) {
          this.channelList.createTimeLeftRange = Number(val[0].toString().substr(0, 10));
          this.channelList.createTimeRightRange = Number(val[1].toString().substr(0, 10));
        } else {
          this.channelList.createTimeLeftRange = null;
          this.channelList.createTimeRightRange = null;
        }
      },
    }
  }

</script>
<style lang="less" scoped>
  .channel-links {
    display: flex;
    justify-content: space-between;
    .item {
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 10px;
    }
  }
  .input-width {
    width: 250px;
  }
  .channel-background {
    background: rgba(242, 242, 242);
    width: 99%;
    padding: 5px;
  }
  .table {
    width: 99%;
    margin-top: 10px;
  }

  .block {
    text-align: center;
    margin-top: 30px;
  }
</style>


