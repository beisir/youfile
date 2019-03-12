<template >
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="商户编号">
        <el-input v-model="formInline.merchantNumber" placeholder="请输入商户编号"/>
      </el-form-item>
      <el-form-item label="结算记录号">
        <el-input v-model="formInline.settleRecordNumber" placeholder="请输入结算记录号"/>
      </el-form-item>
      <el-form-item label="结算渠道">
        <el-select v-model="formInline.channel" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="易宝支付" value="yeepay">易宝支付</el-option>
        </el-select>
      </el-form-item>
      <el-date-picker
        v-model="value11"
        type="date"
        placeholder="结算日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      />
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
      <el-table-column prop="merchantNumber" label="商户编号" align="center"/>
      <el-table-column prop="settleRecordNumber" width="200" label=" 结算记录号" align="center"/>
      <el-table-column prop="channel" label="结算渠道" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.channel=='wx_pay'">微信支付</span>
          <span v-if="scope.row.channel=='yeepay'">易宝支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="settleAmount" label="结算金额" align="center"/>
      <el-table-column prop="actualSettleAmoun" width="160" label="实际结算金额" align="center"/>
      <el-table-column prop="settleDate" label="结算时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.settleDate?unix2CurrentTime(scope.row.settleDate):'' }}</span>
        </template>
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
import { getSettleList } from '@/api/listData'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      value6: '',
      value11: '',
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
    unix2CurrentTime,
    onSubmit() {
      this.listQuery = Object.assign(this.listQuery, this.formInline)
      this.listQuery.pageNum = 1
      const arrData = this.value6
      const settleDay = this.value11
      if (settleDay) {
        this.listQuery.settleDay = settleDay.toString()
      } else {
        this.listQuery.settleDay = ''
      }
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
      getSettleList(this.listQuery).then(response => {
        this.tableData = response.data == null ? [] : response.data.result
        this.listLoading = false
        this.total = response.data == null ? 0 : response.data.totalCount
      })
    }
  }
}
</script>

