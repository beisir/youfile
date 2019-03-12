<template >
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="商户编号">
        <el-input v-model="formInline.merchantNumber" placeholder="请输入账户编号"/>
      </el-form-item>
      <el-form-item label="支付订单号">
        <el-input v-model="formInline.paymentNumber" placeholder="请输入支付订单号"/>
      </el-form-item>
      <el-form-item label="第三方商户编号">
        <el-input v-model="formInline.thirdMerchantNumber" placeholder="请输入第三方商户编号"/>
      </el-form-item>
      <el-form-item label="分账明细状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="未知" value="unknown">未知</el-option>
          <el-option label="初始化" value="init">初始化</el-option>
          <el-option label="分账中" value="doing">分账中</el-option>
          <el-option label="分帐失败" value="fail">分帐失败</el-option>
          <el-option label="分帐成功" value="success">分帐成功</el-option>
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
      <el-table-column prop="divideBatchNumber" width="200" label="分账批次号" align="center"/>
      <el-table-column prop="divideDetailNumber" width="200" label="分账明细编号" align="center"/>
      <el-table-column prop="paymentNumber" width="200" label="支付订单号" align="center"/>
      <el-table-column prop="status" label="分账明细状态" width="150" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='unknown'">未知</span>
          <span v-if="scope.row.status=='init'">初始化</span>
          <span v-if="scope.row.status=='doing'">分账中</span>
          <span v-if="scope.row.status=='fail'">分帐失败</span>
          <span v-if="scope.row.status=='success'">分帐成功</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentAmount" width="200" label="支付金额(单位为元)" align="center"/>
      <el-table-column prop="divideAmount" width="200" label="分账金额(单位为元)" align="center"/>
      <el-table-column prop="merchantNumber" width="150" label="商户编号" align="center"/>
      <el-table-column prop="thirdMerchantNumber" width="250" label="第三方支付商户编号" align="center"/>
      <el-table-column prop="thirdOrderNo" width="180" label="第三方支付编号" align="center"/>
      <el-table-column prop="divideCompleteDate" width="180" label="分账完成时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.divideCompleteDate?unix2CurrentTime(scope.row.divideCompleteDate):'' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" width="180" label="创建时间" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
      </el-table-column>
      <el-table-column prop="updateDate" width="180" label="更新时间" align="center">
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
import { getBatchDetails } from '@/api/listData'
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
      var divideBatchNumber = this.$route.query.divideBatchNumber
      var listQuery = this.listQuery
      listQuery.divideBatchNumber = divideBatchNumber
      getBatchDetails(listQuery).then(response => {
        this.tableData = response.data == null ? [] : response.data.result
        this.listLoading = false
        this.total = response.data == null ? 0 : response.data.totalCount
      })
    }
  }
}
</script>

