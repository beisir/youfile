<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="店铺名称">
        <el-input v-model="formInline.name" placeholder="店铺名称"/>
      </el-form-item>
      <el-form-item label="店铺编号">
        <el-input v-model="formInline.merchantNumber" placeholder="店铺编号"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="手机号"/>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form>
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"/>
      <el-table-column
        prop="name"
        label="店铺名称"
        width="180"
        align="center"/>
      <el-table-column
        prop="merchantNumber"
        label="店铺编号"
        width="180"
        align="center"/>
      <el-table-column
        prop="storeNature"
        label="店铺性质"
        width="100"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.storeNature==&quot;1&quot;">新批零</span>
          <span v-if="scope.row.storeNature==&quot;2&quot;">新零售</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="businessScope"
        label="经营范围"
        width="180"
        align="center"/>
      <el-table-column
        prop="logo"
        label="店铺logo"
        width="100"
        align="center">
        <template slot-scope="scope">
          <img :src="imageUrl+scope.row.logo" width="40" height="40" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="店铺地址"
        align="center"/>
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
import { getListRetail } from '@/api/store'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      formInline: {
        name: '',
        merchantNumber: '',
        phone: ''
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
      getListRetail(this.listQuery).then(response => {
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
    }
  }
}
</script>
