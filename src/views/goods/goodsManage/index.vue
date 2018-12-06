<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品ID">
        <el-input v-model="formInline.id" placeholder="请输入商品ID"/>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="formInline.name" placeholder="请输入商品名称"/>
      </el-form-item>
      <el-form-item label="店铺名称">
        <el-input v-model="formInline.storeName" placeholder="请输入店铺名称"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option label="全部商品" value="">全部商品</el-option>
          <el-option label="待上架" value="0">待上架</el-option>
          <el-option label="上架中" value="1">上架中</el-option>
          <el-option label="已下架" value="2">已下架</el-option>
          <el-option label="部分上架" value="3">部分上架</el-option>
          <el-option label="没有库存" value="4">没有库存</el-option>
        </el-select>
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
        label="商品名称"
        align="center"/>
      <el-table-column
        prop="goodsId"
        label="商品ID"
        align="center"/>
      <el-table-column
        prop="storeName"
        label="所属店铺"
        align="center"/>
      <el-table-column
        prop="storeId"
        label="店铺Id"
        align="center"/>
      <el-table-column
        prop="status"
        label="状态"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0" style="color: #E6A23C">待上架</span>
          <span v-if="scope.row.status==1" style="color: #67C23A">上架中</span>
          <span v-if="scope.row.status==2" style="color: #43E0D6">已下架</span>
          <span v-if="scope.row.status==3" style="color: #670ACE">部分上架</span>
          <span v-if="scope.row.status==4" style="color: #E73E48">没有库存</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="分类"
        align="center"/>
      <el-table-column
        prop="mainImgUrl"
        label="主图"
        align="center">
        <template slot-scope="scope">
          <img :src="imageUrl+scope.row.mainImgUrl" width="40" height="40" class="head_pic">
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
import { getGoodsList } from '@/api/goods'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      formInline: {
        name: '',
        id: '',
        storeName: '',
        status: ''
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
      getGoodsList(this.listQuery).then(response => {
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
