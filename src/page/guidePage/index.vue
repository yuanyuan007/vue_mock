<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="author" label="作者">
      </el-table-column>
    </el-table>
    <num title="guidePage调用num" />
  </div>
</template>
<script>
  import num from '@/components/num.vue';
  import { setSen, getSen } from '@/utils';
  export default {
    components: {
      num
    },
    data() {
      return {
        tableData: [
          { date: '', title: '', author: '' }
        ],
      }
    },
    created() {
      let value = sessionStorage.getItem('storage');
      // let val = getSen('storage');
      this.storage = JSON.parse(value);
      this.tableData = this.storage;
    }
  }
</script>
<style lang="less" scoped>
</style>