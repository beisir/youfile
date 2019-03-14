<template >
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="商户编号">
        <el-input v-model="formInline.merchantNumber" placeholder="请输入账户编号"/>
      </el-form-item>
      <el-form-item label="第三方商户编号">
        <el-input v-model="formInline.thirdMerchantNumber" placeholder="请输入第三方商户编号"/>
      </el-form-item>
      <el-form-item label="支付订单号">
        <el-input v-model="formInline.paymentNumber" placeholder="请输入支付订单号"/>
      </el-form-item>
      <el-form-item label="分账明细编号">
        <el-input v-model="formInline.divideDetailNumber" placeholder="请输入分账明细编号"/>
      </el-form-item>
      <el-form-item label="差错类型">
        <el-select v-model="formInline.mistakeType" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="第三方支付漏单" value="third_platform_miss">第三方支付漏单</el-option>
          <el-option label="平台漏单" value="platform_miss">平台漏单</el-option>
          <el-option label="平台短款，状态不符" value="mismatch">平台短款，状态不符</el-option>
          <el-option label="平台短款，金额不符" value="platform_short_cash_mismatch">平台短款，金额不符</el-option>
          <el-option label="平台长款，金额不符" value="platform_over_cash_mismatch">平台长款，金额不符</el-option>
          <el-option label="手续费不匹配" value="fee_mismatch">手续费不匹配</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对账类型">
        <el-select v-model="formInline.accountCheckType" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="交易" value="pay">交易</el-option>
          <el-option label="退款" value="refund">退款</el-option>
          <el-option label="分账" value="divide">分账</el-option>
        </el-select>
      </el-form-item>
      <el-date-picker
        v-model="value6"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="timestamp"
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
      <el-table-column prop="accountCheckNumber" width="160" label="对账编号" align="center"/>
      <el-table-column prop="mistakeType" width="160" label="差错类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.mistakeType=='third_platform_miss'">第三方支付漏单</span>
          <span v-if="scope.row.mistakeType=='platform_miss'">平台漏单</span>
          <span v-if="scope.row.mistakeType=='mismatch'">平台短款，状态不符</span>
          <span v-if="scope.row.mistakeType=='platform_short_cash_mismatch'">平台短款，金额不符</span>
          <span v-if="scope.row.mistakeType=='platform_over_cash_mismatch'">平台长款,金额不符</span>
          <span v-if="scope.row.mistakeType=='platform_over_status_mismatch'">平台长款,状态不符</span>
          <span v-if="scope.row.mistakeType=='fee_mismatch'">手续费不匹配</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantNumber" width="160" label="商户编号" align="center"/>
      <el-table-column prop="thirdMerchantNumber" width="160" label="第三方商户编号" align="center"/>
      <el-table-column prop="channel" width="160" label="对账渠道" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.channel=='wx_pay'">微信支付</span>
          <span v-if="scope.row.channel=='yeepay'">易宝支付</span>
        </template>
      </el-table-column>
      <el-table-column width="160" label="对账类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.accountCheckType=='pay'">交易</span>
          <span v-if="scope.row.accountCheckType=='refund'">退款</span>
          <span v-if="scope.row.accountCheckType=='divide'">分账</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentNumber" width="160" label="支付订单号" align="center"/>
      <el-table-column prop="payStatus" width="160" label="支付状态" align="center"/>
      <el-table-column prop="divideDetailNumber" width="160" label="分账明细编号" align="center"/>
      <el-table-column prop="payAmount" width="160" label="支付金额(单位为元)" align="center"/>
      <el-table-column prop="thirdPayAmount" width="200" label="第三方支付金额(单位为元)" align="center"/>
      <el-table-column prop="thirdDivideAmount" width="160" label="第三方分账金额" align="center"/>
      <el-table-column prop="thirdFee" width="200" label="平台记录的第三方手续费" align="center"/>
      <el-table-column prop="accountCheckThirdFee" width="160" label="第三方返回的手续费" align="center"/>
      <el-table-column prop="divideStatus" width="160" label="分账状态" align="center"/>
      <el-table-column prop="divideAmount" width="160" label="分账金额" align="center"/>
      <el-table-column prop="thirdPayTime" label="第三方支付下单时间" width="180" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.thirdPayTime) }}</template>
      </el-table-column>
      <el-table-column prop="thirdPaidDate" label="第三方支付完成时间" width="180" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.thirdPaidDate) }}</template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="180" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新时间" width="180" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
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
import { getList } from '@/api/listData'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      tableData: [],
      formInline: {},
      value6: '',
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
    onSubmit() {
      this.listQuery = Object.assign(this.listQuery, this.formInline)
      this.listQuery.pageNum = 1
      const arrData = this.value6
      if (arrData) {
        this.listQuery.createDateBegin = arrData[0]
        this.listQuery.createDateEnd = arrData[1]
      } else {
        this.listQuery.createDateBegin = ''
        this.listQuery.createDateEnd = ''
      }
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
    }
  }
}
</script>

