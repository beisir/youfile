<template >
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="分账批次号">
        <el-input v-model="formInline.divideBatchNumber" placeholder="请输入分账批次号"/>
      </el-form-item>
      <el-form-item label="分账批次状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="未分账" value="batch_init">未分账</el-option>
          <el-option label="分账成功" value="batch_success">分账成功</el-option>
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
      <el-table-column prop="divideBatchNumber" label="分账批次号" align="center"/>
      <el-table-column prop="totalAmount" label=" 分账总金额" align="center"/>
      <el-table-column prop="totalStroke" label="分账总笔数" align="center"/>
      <el-table-column prop="totalMerchant" label="分账总商户数" align="center"/>
      <el-table-column prop="status" label="分账批次状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='batch_init'" style="color: #E73E48">未分账</span>
          <span v-if="scope.row.status=='batch_success'" style="color: #E6A23C">分账成功</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalFail" label="分账失败数字" align="center"/>
      <el-table-column prop="createDate" label="创建时间" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新时间" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
      </el-table-column>
      <el-table-column label=" 操作" fixed="right" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="lookDetails(scope.$index, scope.row )"
          >查看详情</el-button>
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
import { getBatchList } from '@/api/listData'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      tableData: [],
      value6: '',
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
      getBatchList(this.listQuery).then(response => {
        this.tableData = response.data == null ? [] : response.data.result
        this.listLoading = false
        this.total = response.data == null ? 0 : response.data.totalCount
      })
    },
    // 查看详情
    lookDetails(index, row) {
      var divideBatchNumber = row.divideBatchNumber
      this.$router.push({
        path: '/pay/menu1/batchDetails',
        query: {
          divideBatchNumber: divideBatchNumber
        }
      })
    }
  }
}
</script>

