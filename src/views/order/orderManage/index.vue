<template>
  <div class="body-cont">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="订单编号">
        <el-input v-model="formInline.orderNumber" placeholder="订单编号"/>
      </el-form-item>
      <el-form-item label="运单号">
        <el-input v-model="formInline.expressNumber" placeholder="运单号"/>
      </el-form-item>
      <el-form-item label="店铺ID">
        <el-input v-model="formInline.storeId" placeholder="店铺ID"/>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.orderStatus" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="待付款" value="unpaid">待付款</el-option>
          <el-option label="已付款" value="paid">已付款</el-option>
          <el-option label="待发货" value="wait_deliver">待发货</el-option>
          <el-option label="已发货/待收货" value="delivered">已发货/待收货</el-option>
          <el-option label="订单已取消/订单关闭" value="canceled">订单已取消/订单关闭</el-option>
          <el-option label="已完成" value="finish">已完成</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="配送方式">
        <el-select v-model="formInline.logisticsMode" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="门店自提" value="1">门店自提</el-option>
          <el-option label="物流配送" value="2">物流配送</el-option>
        </el-select>
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
    <el-table v-loading.body="listLoading" :data="tableData" max-height="800" highlight-current-row border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="orderNumber" width="180" label="订单编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderRespVO.orderNumber }}
        </template>
      </el-table-column>
      <el-table-column prop="orderAmount" width="150" label="订单金额（元）" align="center">
        <template slot-scope="scope">
          ￥{{ scope.row.orderRespVO.orderAmount }}
        </template>
      </el-table-column>
      <el-table-column prop="num" width="120" label="商品数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderRespVO.num }}
        </template>
      </el-table-column>
      <el-table-column prop="customerUserNickName" width="120" label="买家昵称" align="center"/>
      <el-table-column prop="storeName" width="120" label="店铺名称" align="center"/>
      <el-table-column width="120" label="店铺Id" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderRespVO.storeId }}
        </template>
      </el-table-column>
      <el-table-column prop="orderStatus" width="180" label="订单状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderRespVO.orderStatus=='wait_deliver'">待发货</span>
          <span v-if="scope.row.orderRespVO.orderStatus=='unpaid'">待付款</span>
          <span v-if="scope.row.orderRespVO.orderStatus=='paid'">已付款</span>
          <span v-if="scope.row.orderRespVO.orderStatus=='delivered'">已发货/待收货</span>
          <span v-if="scope.row.orderRespVO.orderStatus=='canceled'">订单已取消/订单关闭</span>
          <span v-if="scope.row.orderRespVO.orderStatus=='finish'">已完成</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderType" width="120" label="配送方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderRespVO.logisticsMode=='0'">没有物流</span>
          <span v-if="scope.row.orderRespVO.logisticsMode=='1'">门店自提</span>
          <span v-if="scope.row.orderRespVO.logisticsMode=='2'">物流配送</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderCategory" width="120" label="支付方式" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderRespVO.payType=='offline'">其他支付方式</span>
          <span v-if="scope.row.orderRespVO.payType=='online'">在线支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" width="180" label="创建时间" align="center">
        <template slot-scope="scope">
          {{ unix2CurrentTime(scope.row.orderRespVO.createDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" width="180" label="更新时间" align="center">
        <template slot-scope="scope">
          {{ unix2CurrentTime(scope.row.orderRespVO.updateDate) }}
        </template>
      </el-table-column>
      <el-table-column label=" 操作" fixed="right" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="getOrderDetails(scope.$index, scope.row )"
          >查看详情</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="getPayList(scope.$index, scope.row )"
          >查看支付列表</el-button>
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
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      data: '',
      imageUrl: this.Const.imageUrl,
      value6: '',
      formInline: {
        orderNumber: '',
        expressNumber: '',
        storeId: '',
        logisticsMode: '',
        orderStatus: '',
        dateBegin: '',
        dateEnd: ''
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
        this.listQuery.dateBegin = arrData[0]
        this.listQuery.dateEnd = arrData[1]
      } else {
        this.listQuery.dateBegin = ''
        this.listQuery.dateEnd = ''
      }
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
     * 查看详情
     */
    getOrderDetails(index, row) {
      const orderNumber = row.orderRespVO.orderNumber
      this.$router.push({
        path: '/order/orderDetails',
        query: {
          orderNumber: orderNumber
        }
      })
    },
    /**
     * 查看支付列表
     */
    getPayList(index, row) {
      const orderNumber = row.orderRespVO.orderNumber
      this.$router.push({
        path: '/order/payManage',
        query: {
          orderNumber: orderNumber
        }
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
