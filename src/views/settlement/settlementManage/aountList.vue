<template >
  <div style="padding:30px;">
    <el-tabs type="border-card" @tab-click="clickTab">
      <el-tab-pane label="收款">
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
          <el-table-column label="时间" width="180" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.inAccountDate!=null"
              >{{ unix2CurrentTime(scope.row.inAccountDate) }}</span>
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
      </el-tab-pane>
      <el-tab-pane label="结算">
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
          <el-table-column prop="settleRecordNumber" label="结算记录号" align="center"/>
          <el-table-column prop="settleAmount" label="结算金额(元)" align="center"/>
          <el-table-column prop="actualSettleAmount" width="180" label="实际结算金额(元)" align="center"/>
          <el-table-column label="结算时间" width="180" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.settleDate!=null"
              >{{ unix2CurrentTime(scope.row.settleDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="180" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.createDate!=null"
              >{{ unix2CurrentTime(scope.row.createDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新日期" width="180" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.updateDate!=null"
              >{{ unix2CurrentTime(scope.row.updateDate) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
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
    </el-tabs>
  </div>
</template>
<script>
import { getAccountList, getAccountOutList } from '@/api/settlement'
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
      listLoading: false,
      paneNameIndex: '0'
    }
  },
  created() {
    this.getList(this.paneNameIndex)
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
      this.getList(this.paneNameIndex)
    },
    /**
     * 改变页码
     * @param page 页号
     */
    handleCurrentChange(page) {
      this.listQuery.pageNum = page
      this.getList(this.paneNameIndex)
    },
    // 获取列表
    getList(index) {
      this.listLoading = true
      const merchantNumber = this.$route.query.merchantNumber
      this.listQuery.merchantNumber = merchantNumber
      if (index === '0') {
        getAccountList(this.listQuery).then(response => {
          this.tableData = response.data == null ? [] : response.data.result
          this.listLoading = false
          this.total = response.data == null ? 0 : response.data.totalCount
        })
      } else {
        getAccountOutList(this.listQuery).then(response => {
          this.tableData = response.data == null ? [] : response.data.result
          this.listLoading = false
          this.total = response.data == null ? 0 : response.data.totalCount
        })
      }
    },
    clickTab(e) {
      const paneName = e.paneName
      this.paneNameIndex = paneName
      this.listQuery.pageNum = 1
      this.getList(paneName)
    }
  }
}
</script>

