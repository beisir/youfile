<template>
  <div class="bodyCont">
    <el-table :data="tableData" highlight-current-row border max-height="800" style="width: 100%">
      <el-table-column label="分类名称" prop="name" align="center"/>
      <el-table-column label="分类编码" prop="categoryCode" align="center"/>
      <el-table-column label="排序" prop="sort"/>
      <el-table-column label="创建时间" prop="createDate" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateDate" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editCode(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="removeCode(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getbindList
} from '@/api/goods'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      dialogShow: false,
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
      var categoryCode = this.$route.query.categoryCode
      this.listLoading = true
      getbindList(categoryCode).then(response => {
        console.log(response.data)
        this.tableData = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
<style>
.bodyCont {
  margin: 30px;
  border: 1px solid #ebeef5;
  border-top: 0;
  border-right: 0;
}
</style>

