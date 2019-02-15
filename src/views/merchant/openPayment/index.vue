<template>
  <div class="body-cont">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="商户编号">
        <el-input v-model="formInline.merchantNumber" placeholder="请输入商户编号"/>
      </el-form-item>
      <el-form-item label="商户类型">
        <el-select v-model="formInline.merchantType" placeholder="请选择">
          <el-option label="全部商户" value>全部商户</el-option>
          <el-option label="批发商" value="1">批零商</el-option>
          <el-option label="零售商" value="2">零售商</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="在线支付状态">
        <el-select v-model="formInline.onlinePay" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="未开通" value="0">未开通</el-option>
          <el-option label="已开通" value="1">已开通</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input v-model="formInline.merchantName" placeholder="请输入商户名称"/>
      </el-form-item>
      <el-date-picker
        v-model="value6"
        type="daterange"
        range-separator="至 "
        start-placeholder="开始日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        end-placeholder="结束日期"
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
      <el-table-column prop="merchantNumber" width="160" label="商户编号" align="center"/>
      <el-table-column prop="merchantName" width="160" label="商户名称" align="center"/>
      <el-table-column prop="linkman" width="160" label="联系人" align="center"/>
      <el-table-column prop="linkmanPhone" width="160" label="联系电话" align="center"/>
      <el-table-column prop="merchantCharacter" width="160" label="商户性质" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantCharacter==&quot;1&quot;">个人</span>
          <span v-if="scope.row.merchantCharacter==&quot;2&quot;">个体</span>
          <span v-if="scope.row.merchantCharacter==&quot;3&quot;">企业</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantType" label="商户类型" width="160" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantType==&quot;1&quot;">批发商</span>
          <span v-if="scope.row.merchantType==&quot;2&quot;">零售商</span>
        </template>
      </el-table-column>
      <el-table-column prop="onlinePay" label="在线支付状态" width="160" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.onlinePay==&quot;1&quot;">已开通</span>
          <span v-if="scope.row.onlinePay==&quot;2&quot;">未开通</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="160" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateTime) }}</template>
      </el-table-column>
      <el-table-column prop="onlinePay" label="操作" width="200" fixed="right" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.onlinePay=='1'">
            <el-button size="mini" type="warning" @click="closeFun(scope.$index, scope.row )">关闭</el-button>
          </div>
          <div v-if="scope.row.onlinePay=='0'">
            <el-button
              size="mini"
              type="primary"
              @click="getDetailsFun(scope.$index, scope.row )"
            >开通</el-button>
          </div>
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
import {
  getListMerchantRetail,
  closePay,
  savePayMes,
  getPayMes
} from '@/api/merchant'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      formLabelWidth: '130px',
      merchantNumber: '',
      value6: '',
      formInline: {
        merchantType: '',
        merchantName: '',
        merchantNumber: '',
        onlinePay: ''
      },
      listLoading: false,
      total: 0,
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      tableData: []
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
        this.listQuery.openPayBeginDate = new Date(arrData[0]).getTime()
        this.listQuery.openPayEndDate = new Date(arrData[1]).getTime()
      } else {
        this.listQuery.openPayBeginDate = ''
        this.listQuery.openPayEndDate = ''
      }
      this.getList()
    },
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      getListMerchantRetail(this.listQuery).then(response => {
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
    },
    getDetailsFun(index, row) {
      var merchantNumber = row.merchantNumber
      this.merchantNumber = merchantNumber
      this.$confirm('是否开通商户在线支付?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          getPayMes(merchantNumber).then(response => {
            var data = {}
            if (response.data) {
              data = {
                merchantNumber: merchantNumber,
                onlinePay: true,
                id: response.data.id
              }
            } else {
              data = { merchantNumber: merchantNumber, onlinePay: true }
            }
            savePayMes(data).then(response => {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.getList()
            })
          })
        })
        .catch(() => {})
    },
    closeFun(index, row) {
      const merchantNumber = row.merchantNumber
      this.$confirm('是否关闭商户在线支付?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          closePay(merchantNumber).then(response => {
            this.$message({
              type: 'success',
              message: '关闭成功!'
            })
            this.getList()
          })
        })
        .catch(() => {})
    }
  }
}
</script>
