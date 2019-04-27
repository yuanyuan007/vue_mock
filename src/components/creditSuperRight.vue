<template>
  <div>
    <div class="box">
      <div class="header">新增产品<span @click="close">X</span></div>
      <div class="content">
        <!-- <el-form :model="ruleForm" :rules="rules" ref="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="甲方名称：" prop="productName">
            <el-input v-model="ruleForm.productName" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="产品链接：" prop="productUrl">
            <el-input v-model="ruleForm.productUrl" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="产品介绍：" prop="description">
            <el-input v-model="ruleForm.description" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="额度：">
            <el-col :span="7">
              <el-form-item prop="limitMin">
                <el-input v-model="ruleForm.limitMin"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">--</el-col>
            <el-col :span="7">
              <el-form-item prop="limitMax">
                <el-input v-model="ruleForm.limitMax"></el-input>
              </el-form-item>
            </el-col>
            <span class="margin">元</span>
          </el-form-item>
          <el-form-item label="期限：">
            <el-col :span="7">
              <el-form-item prop="deadlineMin">
                <el-input v-model="ruleForm.deadlineMin"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">--</el-col>
            <el-col :span="7">
              <el-form-item prop="deadlineMax">
                <el-input v-model="ruleForm.deadlineMax"></el-input>
              </el-form-item>
            </el-col>
            <span class="margin">天</span>
          </el-form-item>
          <el-form-item label="年费率：" prop="yearRate">
            <el-input v-model="ruleForm.yearRate" class="input-widtha"></el-input><span class="margin">%</span>
          </el-form-item>
          <el-form-item label="计算方式：" prop="pricingMode">
            <el-select v-model="ruleForm.pricingMode" placeholder="请选择计费方式">
              <el-option v-for="(item,index) in options" :key="index" :value="item.label">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价：" prop="uniquePrice">
            <el-input v-model="ruleForm.uniquePrice" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="productSort">
            <el-input v-model="ruleForm.productSort" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="添加图标：" prop="productLogo">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
              <span>支持jpg，png图片，分辨率140*140，大小30kb以下</span>
          </el-form-item>
          <el-form-item label="上架位置" prop="editLocation">
            <el-checkbox-group v-model="editLocation">
              <el-checkbox label="0" name="type">首页</el-checkbox>
              <el-checkbox label="1" name="type">人气推荐</el-checkbox>
              </br>
              <el-checkbox label="2" name="type">还款</el-checkbox>
              <el-checkbox label="3" name="type">更多推荐</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form> -->
        <el-form :model="ruleForm" :rules="rules" ref="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item v-for="(item, index) in formListPage" :key="index" :label="item.label">
            <el-input type="text" v-model="ruleForm[item.model]" v-if="item.type === 'input'" class="input-width"></el-input>
            <el-select v-if="item.type === 'select'" v-model="ruleForm[item.model]" class="input-width">
              <el-option v-for="(val,i) in item.options" :key="i" :value="val.label">{{val.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        options: [
          {
            value: 1,
            label: 'CPA'
          }, {
            value: 0,
            label: 'UV'
          }, {
            value: 2,
            label: 'CPS'
          }
        ],
        formListPage: [
          {
            type: 'input',
            model: 'productName',
            label: '甲方名称：',
            prop: 'productName'
          },
          {
            type: 'input',
            model: 'productUrl',
            label: '产品链接：',
            prop: 'productUrl'
          },
          {
            type: 'input',
            model: 'description',
            label: '产品介绍：',
            prop: 'description'
          },
          {
            type: 'select',
            model: 'pricingMode',
            label: '计算方式：',
            prop: 'pricingMode',
            options: [
              {
                value: 1,
                label: 'CPA'
              }, {
                value: 0,
                label: 'UV'
              }, {
                value: 2,
                label: 'CPS'
              }
            ]
          },
          {
            type: 'dbInput',
            label: '期限：'
          }
        ],
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          productName: '',
          productUrl: '',
          description: '',
          limitMin: '',
          deadlineMin: '',
          yearRate: '',
          pricingMode: '',
          uniquePrice: '',
          productSort: '',
          productLogo: '',
          editLocation: ''
        },
        editLocation: [],

        rules: {
          productName: [
            { required: true, message: '请输入甲方名称', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
          productUrl: [
            { required: true, message: '请输入产品链接', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入产品介绍', trigger: 'blur', type: 'string' }
          ],
          yearRate: [
            { required: true, message: '请输入年费率', trigger: 'blur' }
          ],
          uniquePrice: [
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          productSort: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          limitMin: [
            { required: true, message: '请输入最小额度', trigger: 'blur' }
          ],
          deadlineMin: [
            { required: true, message: '请输入最小期限', trigger: 'blur' }
          ],
        }

      }
    },
    computed: {
      ...mapGetters(['getCount'])
    },
    created() {
      this.setNumber(10)
      this.getMutations(10)
      // console.log(this.getCount)
    },
    methods: {
      ...mapMutations(['setNumber']),
      ...mapActions(['getMutations']),
      submit() {
        // this.$refs.rules.validate((valid) => {
        //   if(valid) {
        //     axios.post("http://192.168.1.3:8888/risk/addProduct", {
        //       header: { token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1" },
        //       body: {
        //         ...this.ruleForm
        //       }
        //     }).then(res => {
        //       console.log(res)
        //     })
        //   } else {
        //     return false;
        //   }
        // })
        // this.$emit('submit')
      },
      // 上传图标
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
    height: 900px;
    border: 1px solid black;
    position: absolute;
    right: 0;
    top: -30px;
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
    .input-widtha {
      width: 225px;
    }
    .content {
      margin-top: 20px;
    }
    .margin {
      margin-left: 10px;
    }
  }
</style>


