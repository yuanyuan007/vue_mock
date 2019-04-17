<template>
  <div class="container">
    <el-row>
      <el-col :span="3">
        <rightSide />
      </el-col>
      <el-col :span="21">
        <el-row>
          <Header />
        </el-row>
        <el-row>
          <router-view></router-view>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import rightSide from '@/components/rightSide.vue'
  import Header from '@/components/header.vue'
  export default {
    components: {
      Header,
      rightSide
    }
  }
</script>
<style lang="less" scoped>
</style>