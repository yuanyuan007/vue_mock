<template>
  <div>
    <!-- 新增渠道 -->
    <div class="box">
      <div class="header">添加渠道<span @click="close">X</span></div>
      <div class="content">
        <el-form label-width="120px" :model="addChannel" ref="rules" :rules="rules">
          <el-form-item label="是否开启：">
            <el-select v-model="addChannel.channleStatus" class="input-width">
              <el-option v-for="(item,index) in open" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否结算：">
            <el-select v-model="addChannel.isSettling" class="input-width">
              <el-option v-for="(item,index) in settlement" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="“停止结算”是一个标签，如果已经停止结算，还希望渠道继续请选择正常" placement="bottom">
              <i class="el-icon-question color"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="渠道名称：">
            <el-input v-model="addChannel.channelName" class="input-width" placeholder="请输入渠道名称"></el-input>
          </el-form-item>
          <el-form-item label="渠道编码：" :rules="[
            { required: true, message: '请输入渠道名称', trigger: 'blur' }
          ]">
            <el-input v-model="addChannel.channelCode" class="input-width" placeholder="请输入渠道编码"></el-input>
            <el-tooltip class="item" effect="dark" content="为防止渠道编码重复，系统在渠道编码前增加前缀，不影响使用和数据统计" placement="bottom">
              <i class="el-icon-question color"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="登录密码：">
            <el-input v-model="addChannel.password" class="input-width" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item label="计算方式：">
            <el-select v-model="addChannel.pricingMode" class="input-width">
              <el-option v-for="(item,index) in billingWay" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价：">
            <el-input v-model="addChannel.unitPrice" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="是否展示贷超：">
            <el-select v-model="addChannel.isDisplay" class="input-width">
              <el-option v-for="(item,index) in display" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="button" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { checkCharacters, checkEnACharac, benAndNumber, rightNumber } from "@/utils/rules";
  export default {
    data() {
      return {
        addChannel: {
          channleStatus: 1,
          isSettling: '',
          channelName: '',
          channelCode: '',
          password: '',
          pricingMode: 0,
          unitPrice: '',
          isDisplay: ''
        },
        billingWay: [{
          label: "CPA",
          value: 0
        },
        {
          label: "CPS",
          value: 1
        },
        {
          label: "UV",
          value: 2
        }
        ],
        open: [
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
        display: [
          {
            label: "不展示",
            value: 1
          },
          {
            label: "展示",
            value: 0
          }
        ],
        rules: {
          channleStatus: [
            { required: true, message: '请选择开启状态', trigger: 'blur' }
          ],
          isSettling: [
            { required: true, message: '请选择结算状态', trigger: 'blur' }
          ],
          channelName: [
            { required: true, message: '请输入渠道名称', trigger: 'blur' },
            { validator: checkCharacters, trigger: 'blur' }
          ],
          channelCode: [
            { required: true, message: '请输入渠道编码', trigger: 'blur' },
            { validator: benAndNumber, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: benAndNumber, trigger: 'blur' }
          ],
          pricingMode: [
            { required: true, message: '请选择计算方式', trigger: 'blur' }
          ],
          unitPrice: [
            { required: true, message: '请输入单价', trigger: 'blur' },
            { validator: rightNumber, trigger: 'blur' }
          ],
          isDisplay: [
            { required: true, message: '请选择贷超状态', trigger: 'blur' }
          ]
        },
      }
    },
    created() {
    },
    methods: {
      submit() {
        this.$refs.rules.validate((valid) => {
          if(valid) {
            axios.post("http://192.168.1.3:8888/risk/addChannel", {
              header: { token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1" },
              body: {
                ...this.addChannel
              }
            }).then(res => {
              console.log(res)
            })
          } else {
            return false;
          }
        })
        this.$emit('submit')
      },
      close() {
        this.$emit('rightModel');
      }
    }
  }
</script>
<style lang="less" scoped>
  .box {
    width: 460px;
    height: 800px;
    border: 1px solid black;
    position: absolute;
    right: 0;
    top: 0;
    background: white;
    .header {
      height: 40px;
      background: rgb(148, 148, 148);
      text-align: center;
      line-height: 40px;
      color: white;
      span {
        float: right;
        color: rgb(64, 158, 255);
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .input-width {
      width: 250px;
    }
    .content {
      margin-top: 20px;
    }
    .color {
      color: rgb(64, 158, 255);
      cursor: pointer;
    }
    .button {
      margin: 10% 44%;
    }
  }
</style>


