<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="消费统计" name="first">

      </el-tab-pane>
      <el-tab-pane label="消费明细" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="充值记录" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="消费单价" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',

      };
    },
    methods: {

    }
  };
</script>

<style lang="less" scoped>
</style>

