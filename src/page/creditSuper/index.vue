<template>
  <div>
    <div>
      <el-form label-width="100px" :model="creditSuper" ref="creditSuper" :inline="true">
        <el-form-item label="上架位置：" prop="location">
          <el-button v-for="(item,index) in locationAll" :key="index" :value="item" :type="item.isSelect?'primary':''" @click="onLocation(item,index,locationAll)">{{item.name}}</el-button>
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
      <el-button type="primary" @click="addNewProduct">添加新产品</el-button>
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
              <el-button type="text" class="delete" @click="deletedRow(scope.row)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur.pageNumber" :page-sizes="[10, 20, 50, 100]" :page-size="cur.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
    <!-- 新增产品 -->
    <div v-if="close">
      <div class="box animation">
        <div class="header">新增产品<span @click="shutDown">X</span></div>
        <div class="content">
          <el-form :model="ruleForm" :rules="rules" ref="rules" label-width="100px" class="demo-ruleForm">
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
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span>支持jpg，png图片，分辨率140*140，大小30kb以下</span>
            </el-form-item>
            <el-form-item label="上架位置" prop="location">
              <el-checkbox-group v-model="location">
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
          </el-form>
        </div>
      </div>
    </div>
    <!-- 修改列表 -->
    <div v-if="change">
      <div class="box animation">
        <div class="header">修改产品<span @click="shutDown">X</span></div>
        <div class="content">
          <el-form :model="ruleForm" :rules="rules" ref="rules" label-width="100px" class="demo-ruleForm">
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
                <el-option v-for="(item,index) in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单价：" prop="uniquePrice">
              <el-input v-model="ruleForm.uniquePrice" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="productSort">
              <el-input v-model="ruleForm.productSort" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="添加图标：" prop="productLogo">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="changeImageUrl" :src="changeImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
              <el-button type="primary" @click="changeSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { serialize } from '@/utils';
  export default {
    data() {
      return {
        imageUrl: '',
        close: false,
        change: false,
        creditSuper: {},
        locationAll: [
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
        totalCount: 10,
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {},
        location: [],
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
          location: [
            { required: true, message: '请勾选上架位置', trigger: 'blur' }
          ]

        },
        editLocation: [],
        changeImageUrl: ''

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

      // 删除
      deletedRow(row) {
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
      },
      deleted() {
      },
      addNewProduct() {
        this.close = true
      },
      shutDown() {
        this.close = false;
        this.change = false
      },
      // 修改列表
      modify(row) {
        this.productId = row.productId;
        this.change = true;
        this.changeImageUrl = row.productLogo;
        this.ruleForm = {
          productName: row.productName,
          productUrl: row.productUrl,
          description: row.description,
          limitMin: row.limit.split('-')[0],
          limitMax: row.limit.split('-')[1],
          deadlineMin: row.deadline.split('-')[0],
          deadlineMax: row.deadline.split('-')[1],
          yearRate: row.yearRate,
          pricingMode: row.pricingMode,
          uniquePrice: row.uniquePrice,
          productSort: row.productSort,
          productLogo: row.productLogo,
          editLocation: row.location
        },
          this.editLocation = row.location.split(',');
        this.ruleForm.editLocation = this.editLocation;
      },
      // 新增提交
      submit() {
        if(this.location.length) {
          this.ruleForm.location = this.location.join(',');
        } else {
          this.ruleForm.location = ''
        }
        this.$refs.rules.validate((valid) => {
          if(valid) {
            axios.post("http://192.168.1.3:8888/risk/addProduct", {
              header: { token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1" },
              body: {
                ...this.ruleForm
              }
            }).then(res => {
              this.ruleForm = {
                pricingMode: 'CPA'
              },
                this.close = false;
              this.location = [];
              this.initData();
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
            })
          } else {
            return false;
          }
        })
      },
      changeSubmit() {
        if(this.editLocation.length) {
          this.ruleForm.editLocation = this.editLocation.join(',');
        } else {
          this.ruleForm.editLocation = ''
        }
        this.$refs.rules.validate((valid) => {
          if(valid) {
            axios.post("api/updateProduct", {
              header: { token: "d4d735a292a82278a91e5fdc56dae185", employeeId: "979113750200131584", orgId: "1" },
              body: {
                ...this.ruleForm
              }
            }).then(res => {
              this.change = false;
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            })
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/jpg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 < 30;
        if(!isJPG && !isPNG) {
          this.$toast('上传图片必须是JPG/PNG/ 格式!');
        }
        if(!isLt2M) {
          this.$toast('上传图片大小不能超过 30kb!');
        }
        return (isJPG || isPNG) && isLt2M;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .animation {
    animation: change 0.4s;
  }
  @keyframes change {
    0% {
      transform: translate(100%);
    }
    100% {
      transform: translate(0);
    }
  }
</style>


