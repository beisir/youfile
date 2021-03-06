
<template>
  <div class="body-cont">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyWords" placeholder="关键字"/>
      </el-form-item>
      <el-form-item label="订单种类">
        <el-select v-model="formInline.orderStatus" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="门店编号">
        <el-input v-model="formInline.storeId" placeholder="门店编号"/>
      </el-form-item>
      <el-form-item label="楼层管理员">
        <el-input v-model="formInline.floorAdminName" placeholder="楼层管理员"/>
      </el-form-item>
      <el-form-item label="商贸城">
        <el-select v-model="formInline.mallCode" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option v-for="item in mallList" :label="item.name" :value="item.code" :key="item.code">{{ item.name }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼层楼座">
        <el-input v-model="formInline.floorDescription" placeholder="楼层楼座"/>
      </el-form-item>
      <el-form-item label="门牌号">
        <el-input v-model="formInline.storeDoorNum" placeholder="门牌号"/>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="startDate"
          :picker-options="pickerOptions"
          type="date"
          placeholder="支付开始"
          value-format="timestamp"
        />
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="endDate"
          :picker-options="pickerOptions"
          type="date"
          placeholder="支付截至"
          value-format="timestamp"
        />
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="success" @click="exportExcel">导出</el-button>
    </el-form>
    <el-table id="out-table" :data="tableData" border style="width: 100%" max-height="800" highlight-current-row>
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column
        prop="classifyName"
        label="订单"
        width="180"
        align="center"
      />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus==='unpaid'" style="color: #E6A23C">待付款</span>
          <span v-else-if="scope.row.orderStatus==='paid'" style="color: #67C23A">已付款</span>
          <span v-else-if="scope.row.orderStatus==='canceled'" style="color: #909399">已取消</span>
          <span v-else-if="scope.row.orderStatus==='finish'" style="color: #909344">已完成</span>
        </template>
      </el-table-column>
      <el-table-column prop="storeName" label="店名" align="center"/>
      <el-table-column prop="storeId" label="店铺编码" width="180" align="center"/>
      <el-table-column prop="floorDescription" label="楼层楼座" width="180" align="center"/>
      <el-table-column prop="storeDoorNum" label="门牌号" width="180" align="center"/>
      <el-table-column prop="mallName" label="所属商贸云" width="180" align="center"/>
      <el-table-column prop="floorAdminName" label="管理员名称" width="180" align="center"/>
      <el-table-column prop="promotionCode" label="优惠码" align="center"/>
      <el-table-column
        prop="serviceReriodMonth"
        label="服务时间（月）"
        align="center"
      />
      <el-table-column prop="userMobile" label="客户手机" width="180" align="center"/>
      <el-table-column
        :formatter="formatTime"
        prop="createDate"
        label="下单时间"
        width="180"
        align="center"
      />
      <el-table-column prop="orderNumber" label="订单号" width="180" align="center"/>
      <el-table-column
        prop="discountAmount"
        label="优惠码支付(元)"
        width="180"
        align="center"
      />
      <el-table-column prop="orderAmount" label="订单金额(元)" width="180" align="center"/>
      <el-table-column prop="remark" label="备注" width="180" align="center"/>
      <el-table-column label="操作" width="220" align="left">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="toDetail(scope)">详情</el-button>
          <el-button size="mini" type="primary" @click="getPayList(scope.$index, scope.row )">查看支付列表</el-button>
          <el-button
            v-if="scope.row.orderStatus==='paid' && (!scope.row || !scope.row.storeId)"
            type="success"
            @click="openStore(scope)"
          >开店</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listQuery.pageNum"
      :page-size="listQuery.size"
      :total="total"
      :page-sizes="[10, 30, 50, 100, 300]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { unix2CurrentTime } from '@/utils'
import { getAllList, openStore } from '@/api/cloudOrder'
import { getList as getMallList } from '@/api/mall'
export default {
  data() {
    return {
      formInline: {},
      tableData: [],
      search: '',
      type: 'all',
      total: 0,
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      typeOptions: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '待付款',
          value: 'unpaid'
        },
        {
          label: '已付款',
          value: 'paid'
        },
        {
          label: '已取消',
          value: 'canceled'
        },
        {
          label: '已完成',
          value: 'finish'
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      startDate: '',
      endDate: '',
      mallList: []
    }
  },
  created() {
    this.getAllList()
    getMallList().then(res => {
      this.mallList = res.data ? res.data : []
    })
  },
  methods: {
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          '云产品订单.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    formatTime(row, column, cellValue) {
      return unix2CurrentTime(cellValue)
    },
    getAllList() {
      if (this.startDate) {
        this.listQuery.timeBegin = this.startDate
      } else {
        this.listQuery.timeBegin = ''
      }
      if (this.endDate) {
        this.listQuery.timeEnd = this.endDate + 86400000
      } else {
        this.listQuery.timeEnd = ''
      }
      if (this.startDate > this.endDate) {
        this.$message({
          message: '开始时间应小于截止时间',
          type: 'warning'
        })
        return
      }
      Object.assign(this.listQuery, this.formInline)
      getAllList(this.type, this.listQuery).then(res => {
        this.tableData = res.data.result
        this.total = res.data.totalCount
      })
    },
    toDetail(d) {
      this.$router.push({
        path: '/cloudProducts/detail',
        query: {
          id: d.row.orderNumber
        }
      })
    },
    openStore(d) {
      openStore(d.row.orderNumber).then(res => {
        this.$message(res.data)
        this.getAllList()
      })
    },
    onSubmit() {
      this.listQuery.pageNum = 1
      this.getAllList()
    },
    /**
     * 查看支付列表
     */
    getPayList(index, row) {
      const orderNumber = row.orderNumber
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
      this.getAllList()
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
