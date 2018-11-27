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
        label="分类名称"
        width="180"
        align="center"/>
      <el-table-column
        prop="categoryCode"
        label="分类编码"
        width="150"
        align="center"/>
      <el-table-column
        prop="sort"
        label="排序"
        width="180"
        align="center"/>
      <el-table-column
        prop="createDate"
        label="创建时间"
        align="center">
        <template slot-scope="scope">
          {{ unix2CurrentTime(scope.row.createDate) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList } from '@/api/goods'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      listLoading: false,
      parentCategoryCode: 0,
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unix2CurrentTime,
    /**
       * 获取列表
       */
    getList() {
      this.listLoading = true
      getList(this.parentCategoryCode).then(response => {
        console.log(response.data.result)
        this.tableData = response.data.obj
        this.listLoading = false
      })
    }

  }
}
</script>
