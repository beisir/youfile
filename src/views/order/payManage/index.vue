<template>
  <div style="padding:30px;">
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      max-height="800"
      highlight-current-row
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="paymentNumber" width="150" label="支付流水号" align="center"/>
      <el-table-column prop="orderNumber" width="150" label="订单编号" align="center"/>
      <el-table-column prop="platAppId" width="150" label="平台商编号" align="center"/>
      <el-table-column prop="receiveMerchantNumber" width="150" label="收款方商户编号" align="center"/>
      <el-table-column prop="customerUserNo" width="150" label="付款方编号" align="center"/>
      <el-table-column prop="customerPhone" width="150" label="付款方手机号" align="center"/>
      <el-table-column prop="paymentIp" width="150" label="支付客户端ip" align="center"/>
      <el-table-column prop="payTime" width="170" label="支付下单时间" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.payTime) }}</template>
      </el-table-column>
      <el-table-column prop="amount" width="150" label="支付金额(元)" align="center"/>
      <el-table-column prop="payWay" width="150" label="支付方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.payWay=='wx_mini_app_pay'">小程序支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="channel" width="150" label="支付通道" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.channel=='wx_mini_app'">微信小程序支付</span>
          <span v-if="scope.row.channel=='yeepay'">易宝支付</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="支付状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='unkowon'">未知</span>
          <span v-if="scope.row.status=='refunded'">已退款</span>
          <span v-if="scope.row.status=='cancel'">已撤销</span>
          <span v-if="scope.row.status=='initial'">未支付</span>
          <span v-if="scope.row.status=='inpayment'">支付中</span>
          <span v-if="scope.row.status=='paid'">已支付</span>
          <span v-if="scope.row.status=='failure'">支付失败</span>
        </template>
      </el-table-column>
      <el-table-column prop="paidDate" width="170" label="支付完成时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.paidDate!=null"> {{ unix2CurrentTime(scope.row.paidDate) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" width="170" label="创建时间" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
      </el-table-column>
      <el-table-column prop="updateDate" width="170" label="更新时间" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
      </el-table-column>
      <el-table-column prop="fee" width="150" label="手续费" align="center"/>
      <el-table-column prop="thirdFee" width="180" label="第三方支付手续费" align="center"/>
      <el-table-column prop="hasInAccount" width="150" label="是否已入账" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.hasInAccount=='0'">否</span>
          <span v-if="scope.row.hasInAccount=='1'">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" width="150" label="商品信息" align="center"/>
      <el-table-column prop="canDivideAccount" width="150" label="是否可分账" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.canDivideAccount=='0'">否</span>
          <span v-if="scope.row.canDivideAccount=='1'">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="hasRefund" width="150" label="是否已退款" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.hasRefund==false">否</span>
          <span v-if="scope.row.hasRefund==true">是</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label=" 操作" fixed="right" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="getPayDetails(scope.$index, scope.row )"
          >查询支付状态</el-button>
        </template>
      </el-table-column> -->
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
    <!-- <el-dialog :visible.sync="dialogShow" class="el-dialog1" title="支付状态">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="支付状态">
          <el-select v-model="payStatus" placeholder="请选择">
            <el-option label="待发货" value="wait_deliver">待发货</el-option>
            <el-option label="已付款" value="paid">已付款</el-option>
            <el-option label="待付款" value="unpaid">待付款</el-option>
            <el-option label="已发货/待收货" value="delivered">已发货/待收货</el-option>
            <el-option label="订单已取消/订单关闭" value="canceled">订单已取消/订单关闭</el-option>
            <el-option label="已完成" value="finish">已完成</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row class="submit-btn">
        <el-button type="primary" @click="editMes()">确定</el-button>
      </el-row>
    </el-dialog> -->
  </div>
</template>
<script>
import { getPayList } from '@/api/order'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      data: '',
      imageUrl: this.Const.imageUrl,
      listLoading: false,
      paymentNumber: '',
      total: 0,
      payStatus: '',
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      tableData: [],
      dialogShow: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unix2CurrentTime,
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      const orderNumber = this.$route.query.orderNumber
      const listQuery = this.listQuery
      listQuery.orderNumber = orderNumber
      getPayList(listQuery).then(response => {
        this.tableData = response.data == null ? [] : response.data.result
        this.listLoading = false
        this.total = response.data == null ? 0 : response.data.totalCount
      })
    },
    // // 查看支付状态详情
    // getPayDetails(index, row) {
    //   const paymentNumber = row.paymentNumber
    //   this.paymentNumber = paymentNumber
    //   getPayDetails(paymentNumber).then(response => {
    //     this.payStatus = response.data
    //     this.dialogShow = true
    //   })
    // },
    // // 确定支付
    // editMes() {
    //   const paymentNumber = this.paymentNumber
    //   confirmPay(paymentNumber).then(response => {
    //     this.$message({
    //       type: 'success',
    //       message: response.msg
    //     })
    //     this.dialogShow = false
    //     this.getList()
    //   })
    // },
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
