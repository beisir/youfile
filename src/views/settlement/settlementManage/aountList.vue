<template >
  <div style="padding:30px;">
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      highlight-current-row
      border
      max-height="800"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="merchantNumber" label="商户编号" align="center"/>
      <el-table-column prop="accountNumber" label="账户编号" align="center"/>
      <el-table-column prop="goodsName" label="商品名称" align="center"/>
      <el-table-column prop="paymentNumber" width="180" label="交易单号" align="center"/>
      <el-table-column prop="amount" label="收款总金额(元)" align="center"/>
      <el-table-column label="入账时间" width="180" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.inAccountDate!=null"> {{ unix2CurrentTime(scope.row.inAccountDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="changeType" label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.changeType=='in'">收入</span>
          <span v-if="scope.row.changeType=='out'">支出</span>
        </template>
      </el-table-column>
      <el-table-column label="业务类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.businessType=='sales'">销售</span>
          <span v-if="scope.row.businessType=='sale_fee'">手续费</span>
          <span v-if="scope.row.businessType=='settle'">结算</span>
          <span v-if="scope.row.businessType=='divide'">分帐</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listQuery.page"
      :page-size="listQuery.size"
      :total="total"
      :page-sizes="[10, 30, 50, 100]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { getAccountList } from '@/api/settlement'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      listLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unix2CurrentTime,
    /**
     * 改变每页数量
     * @param size 页大小
     */
    handleSizeChange(size) {
      this.listQuery.pageSize = size
      this.listQuery.pageNum = 1
      this.getList()
    },
    /**
     * 改变页码
     * @param page 页号
     */
    handleCurrentChange(page) {
      this.listQuery.pageNum = page
      this.getList()
    },
    // 获取列表
    getList() {
      this.listLoading = true
      const merchantNumber = this.$route.query.merchantNumber
      this.listQuery.merchantNumber = merchantNumber
      getAccountList(this.listQuery).then(response => {
        this.tableData = response.data == null ? [] : response.data.result
        this.listLoading = false
        this.total = response.data == null ? 0 : response.data.totalCount
      })
    }
  }
}
</script>

