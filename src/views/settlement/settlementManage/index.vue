<template >
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="账户编号">
        <el-input v-model="formInline.accountNumber" placeholder="请输入账户编号"/>
      </el-form-item>
      <el-form-item label="商户编号">
        <el-input v-model="formInline.merchantNumber" placeholder="请输入商户编号"/>
      </el-form-item>
      <el-form-item label="是否冻结">
        <el-select v-model="formInline.freeze" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="已冻结" value="true">已冻结</el-option>
          <el-option label="未冻结" value="false">未冻结</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input v-model="formInline.merchantName" placeholder="请输入商户名称"/>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form>
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      highlight-current-row
      border
      max-height="800"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="merchantNumber" width="160" label="商户编号" align="center">
        <template slot-scope="scope">{{ scope.row.account.merchantNumber }}</template>
      </el-table-column>
      <el-table-column prop="accountNumber" width="160" label="账户编号" align="center">
        <template slot-scope="scope">{{ scope.row.account.accountNumber }}</template>
      </el-table-column>
      <el-table-column width="160" label="商户名称" align="center">
        <template slot-scope="scope">{{ scope.row.account.merchantName }}</template>
      </el-table-column>
      <el-table-column width="160" label="是否冻结" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.account.freeze==true">已冻结</span>
          <span v-if="scope.row.account.freeze==false">未冻结</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="今日收款(元)" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.merchantTradeStatisticVO.todayMerchantTrade.tradeAmount }}</template>
      </el-table-column>
      <el-table-column width="160" label="今日收款笔数" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.merchantTradeStatisticVO.todayMerchantTrade.tradeCount }}</template>
      </el-table-column>
      <el-table-column width="160" label="昨日收款笔数" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.merchantTradeStatisticVO.yesterdayMerchantTrade.tradeCount }}</template>
      </el-table-column>
      <el-table-column width="160" label="总收款笔数" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.merchantTradeStatisticVO.threeMonthMerchantTrade.tradeCount }}</template>
      </el-table-column>
      <el-table-column width="160" label="收款总金额(元)" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.merchantTradeStatisticVO.threeMonthMerchantTrade.tradeAmount }}</template>
      </el-table-column>
      <el-table-column width="160" label="已结算金额(元)" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.merchantTradeStatisticVO.threeMountSettle.tradeAmount }}</template>
      </el-table-column>
      <el-table-column width="160" label="昨日收款(元)" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.merchantTradeStatisticVO.yesterdayMerchantTrade.tradeAmount }}</template>
      </el-table-column>
      <el-table-column width="160" label="待结算金额(元)" align="center">
        <template slot-scope="scope">{{ scope.row.merchantTradeStatisticVO.waitingSettleAmount }}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getDetails(scope.$index,scope.row)">查看明细</el-button>
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
import { getList } from '@/api/settlement'
export default {
  data() {
    return {
      tableData: [],
      formInline: {},
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
    onSubmit() {
      this.listQuery = Object.assign(this.listQuery, this.formInline)
      this.listQuery.pageNum1
      this.getList()
    },
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
      getList(this.listQuery).then(response => {
        this.tableData = response.data == null ? [] : response.data.result
        this.listLoading = false
        this.total = response.data == null ? 0 : response.data.totalCount
      })
    },
    // 查看明细列表
    getDetails(index, row) {
      const merchantNumber = row.account.merchantNumber
      this.$router.push({
        path: '/settlementManage/aountList',
        query: {
          merchantNumber: merchantNumber
        }
      })
    }
  }
}
</script>

