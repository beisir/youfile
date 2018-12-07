<template>
  <div style="padding:30px;">
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"/>
      <el-table-column
        prop="name"
        label="商贸云名称"
        align="center"/>
      <el-table-column
        prop="code"
        label="code"
        align="center"/>
      <el-table-column
        prop="logo"
        label="logo"
        align="center">
        <template slot-scope="scope">
          <img :src="imageUrl+scope.row.logo" width="40" height="40" class="head_pic">
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList } from '@/api/mall'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      listLoading: false,
      total: 0,
      listQuery: '',
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.listQuery = this.formInline
      this.getList()
    },
    /**
       * 获取列表
       */
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log(response)
        this.tableData = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
