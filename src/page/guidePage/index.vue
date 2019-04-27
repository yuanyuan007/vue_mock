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
    <text title="guidePage调用text" />
  </div>
</template>
<script>
  import text from '@/components/text.vue';
  import { setSen, getSen } from '@/utils';
  export default {
    components: {
      text
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