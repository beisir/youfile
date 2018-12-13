<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline form-input">
      <el-form-item label="配送方式">
        <el-select v-model="formInline.orderType" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="其他" value="0">其他</el-option>
          <el-option label="门店自提" value="1">门店自提</el-option>
          <el-option label="物流配送" value="2">物流配送</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款方用户编号">
        <el-input v-model="formInline.customerUserNo" placeholder="请输入付款方用户编号"/>
      </el-form-item>
      <el-form-item label="收款方商户编号">
        <el-input v-model="formInline.receiveMerchantNumber" placeholder="请输入收款方商户编号"/>
      </el-form-item>
      <div>
        <el-form-item label="订单编号">
          <el-input v-model="formInline.orderNumber" placeholder="请输入订单编号"/>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="formInline.expressNumber" placeholder="请输入快递单号"/>
        </el-form-item>
        <el-form-item label="店铺ID">
          <el-input v-model="formInline.storeId" placeholder="请输入店铺ID"/>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </div>
    </el-form>
    <el-table v-loading.body="listLoading" :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="orderNumber" label="订单编号" align="center"/>
      <el-table-column prop="expressNumber" label="快递编号" align="center"/>
      <el-table-column prop="userInfo" label="付款方用户编号" align="center">
        <template slot-scope="scope">{{ scope.row.userInfo.userId }}</template>
      </el-table-column>
      <el-table-column prop="receiveMerchant" label="收款方商户编号" align="center">
        <template slot-scope="scope">{{ scope.row.receiveMerchant.merchantNumber }}</template>
      </el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" align="center"/>
      <el-table-column prop="orderType" label="配送方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType=='0'">其他</span>
          <span v-if="scope.row.orderType=='1'">门店自提</span>
          <span v-if="scope.row.orderType=='2'">物流配送</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderCategory" label="订单分类" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderCategory=='1'">进货单</span>
          <span v-if="scope.row.orderCategory=='2'">小云店订单</span>
          <span v-if="scope.row.orderCategory=='3'">普通订单</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus=='unpaid'" style="color: #E6A23C">待支付</span>
          <span v-if="scope.row.orderStatus=='paid'" style="color: #67C23A">已支付/待发货/待取货</span>
          <span v-if="scope.row.orderStatus=='shipped'" style="color: #43E0D6">已发货</span>
          <span v-if="scope.row.orderStatus=='cancelled'" style="color: #670ACE">订单取消</span>
          <span v-if="scope.row.orderStatus=='closed'" style="color: #E73E48">订单关闭</span>
          <span v-if="scope.row.orderStatus=='finish'" style="color: #AF0FB2">已收货_已完成</span>
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
import { getOrderList } from '@/api/order'
export default {
  data() {
    return {
      data: '',
      imageUrl: this.Const.imageUrl,
      formInline: {
        storeId: '',
        orderType: '',
        customerUserNo: '',
        expressNumber: '',
        orderNumber: '',
        // payDateBegin:'',
        // payDateEnd:'',
        receiveMerchantNumber: ''
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
    onSubmit() {
      this.listQuery = Object.assign(this.listQuery, this.formInline)
      this.listQuery.pageNum = 1
      this.getList()
    },
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      getOrderList(this.listQuery).then(response => {
        this.tableData = response.data == null ? [] : response.data.result
        this.listLoading = false
        this.total = response.data == null ? 0 : response.data.totalCount
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
