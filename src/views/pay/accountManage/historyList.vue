<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="支付编号">
        <el-input v-model="formInline.paymentNumber" placeholder="请输入支付编号"/>
      </el-form-item>
      <el-form-item label="账户收入">
        <el-select v-model="formInline.changeType" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="账户收入" value="in">账户收入</el-option>
          <el-option label="账户支出" value="out">账户支出</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型">
        <el-select v-model="formInline.businessType" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="销售" value="sales">销售</el-option>
          <el-option label="结算" value="settle">结算</el-option>
          <el-option label="手续费" value="sale_fee">手续费</el-option>
          <el-option label="分帐" value="divide">分帐</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算批次号">
        <el-input v-model="formInline.settleBatchNumber" placeholder="请输入结算批次号"/>
      </el-form-item>
      <el-date-picker
        v-model="value6"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
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
      <el-table-column prop="accountNumber" label="账户编号" align="center"/>
      <el-table-column prop="merchantNumber" label="商户编号" align="center"/>
      <!-- <el-table-column prop="accountBalance" label="账户余额" align="center">
        <template slot-scope="scope">{{ scope.row.accountBalance }}元</template>
      </el-table-column>-->
      <el-table-column prop="amount" label="金额" align="center">
        <template slot-scope="scope">{{ scope.row.amount }}元</template>
      </el-table-column>
      <el-table-column prop="paymentNumber" label="支付编号" align="center"/>
      <el-table-column prop="changeType" label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.changeType=='in'" style="color: #E6A23C">账户收入</span>
          <span v-if="scope.row.changeType=='out'" style="color: #67C23A">账户支出</span>
        </template>
      </el-table-column>
      <el-table-column prop="businessType" label="业务类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.businessType=='sales'" style="color: #E6A23C">销售</span>
          <span v-if="scope.row.businessType=='settle'" style="color: #67C23A">结算</span>
          <span v-if="scope.row.businessType=='sale_fee'" style="color: #43E0D6">手续费</span>
          <span v-if="scope.row.businessType=='divide'" style="color: #670ACE">分帐</span>
        </template>
      </el-table-column>
      <el-table-column prop="settleBatchNumber" label="结算批次号" align="center"/>
      <el-table-column prop="inAccountDate" label="时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.inAccountDate!=null">{{ unix2CurrentTime(scope.row.inAccountDate) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="remark" label="备注" align="center"/> -->
      <!-- <el-table-column prop="goodsName" label="商品名称" align="center"/>
      <el-table-column prop="canSettle" label="是否可结算" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.canSettle=='0'">否</span>
          <span v-if="scope.row.canSettle=='1'">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="hasSettle" label="是否已结算" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.hasSettle=='0'">否</span>
          <span v-if="scope.row.hasSettle=='1'">是</span>
        </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
      :current-page="listQuery.page"
      :page-size="listQuery.size"
      :total="total"
      :page-sizes="[10, 30, 50, 100]"
      value-format="timestamp"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { getHistoryList } from '@/api/pay'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      formInline: {
        changeType: '',
        inAccountDateStart: '',
        inAccountDateEnd: ''
      },
      listLoading: false,
      total: 0,
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      tableData: [],
      value6: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unix2CurrentTime,
    onSubmit() {
      const formInline = this.formInline
      const arrData = this.value6
      this.listQuery = Object.assign(this.listQuery, formInline)
      if (arrData) {
        this.listQuery.inAccountDateStart = arrData[0]
        this.listQuery.inAccountDateEnd = arrData[1]
      } else {
        this.listQuery.inAccountDateStart = ''
        this.listQuery.inAccountDateEnd = ''
      }
      this.listQuery.pageNum = 1
      this.getList()
    },
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      const accountNumber = this.$route.query.accountNumber
      const params = this.listQuery
      params.accountNumber = accountNumber
      getHistoryList(params).then(response => {
        this.tableData = response.data.result
        this.listLoading = false
        this.total = response.data.totalCount
      })
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
    }
  }
}
</script>
<style>
.el-date-editor .el-range-separator {
  padding: 0;
}
</style>

