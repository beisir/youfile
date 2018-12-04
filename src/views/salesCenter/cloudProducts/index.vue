
<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="serchKey" placeholder="订单号"/>
      </el-form-item>
      <el-form-item label="订单种类">
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="yunStoreGoodsSnapshot.classifyName" label="订单" width="180" align="center"/>
      <el-table-column label="状态" width="180" align="center">
        <template scope="scope">
          <span v-if="scope.row.orderStatus==='unpaid'" style="color: #E6A23C">待付款</span>
          <span v-else-if="scope.row.orderStatus==='paid'" style="color: #67C23A">已付款</span>
          <span v-else-if="scope.row.orderStatus==='cancelled'" style="color: #909399">已取消</span>
        </template>
      </el-table-column>
      <el-table-column prop="yunStoreGoodsSnapshot.serviceReriodMonth" label="服务时间（月）" width="180" align="center"/>
      <el-table-column prop="userInfoVO.mobile" label="客户手机" align="center"/>
      <el-table-column prop="createDate" label="下单时间" width="180" align="center"/>
      <el-table-column prop="orderNumber" label="订单号" width="180" align="center"/>
      <el-table-column prop="yunStoreGoodsSnapshot.discountAmount" label="优惠码支付" width="180" align="center"/>
      <el-table-column prop="orderAmount" label="金额" width="180" align="center"/>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="toDetail(scope)">详情</el-button>
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
import { getAllList } from '@/api/cloudOrder'
export default {
  data() {
    return {
      formInline: {},
      tableData: [],
      serchKey: '',
      search: '',
      type: 'all',
      total: 0,
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      typeOptions: [{
        label: '全部',
        value: 'all'
      }, {
        label: '待支付',
        value: 'unpaid'
      }, {
        label: '已支付',
        value: 'paid'
      }, {
        label: '已取消',
        value: 'cancelled'
      }]
    }
  },
  created() {
    this.getAllList()
  },
  methods: {
    getAllList(re) {
      this.listQuery.keyWords = this.serchKey
      getAllList(this.type, this.listQuery).then(res => {
        this.tableData = res.data.result
        this.total = res.data.totalCount
      })
    },
    toDetail(d) {
      console.log(d)
      this.$router.push({ path: '/cloudProducts/detail', query: {
        id: d.row.orderNumber
      }})
    },
    onSubmit() {
      this.getAllList(true)
    },
    /**
       * 改变每页数量
       * @param size 页大小
       */
    handleSizeChange(size) {
      this.listQuery.pageSize = size
      this.listQuery.pageNum = 1
      this.getAllList(true)
    },
    /**
       * 改变页码
       * @param page 页号
       */
    handleCurrentChange(page) {
      this.listQuery.pageNum = page
      this.getAllList()
    }
  }
}
</script>
