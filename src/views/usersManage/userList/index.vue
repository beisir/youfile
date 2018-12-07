<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="formInline.userName" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickName" placeholder="请输入昵称"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="请输入手机号"/>
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
        prop="userName"
        label="用户名称"
        align="center"/>
      <el-table-column
        prop="headPic"
        label="用户头像"
        align="center">
        <template slot-scope="scope">
          <img :src="imageUrl+scope.row.headPic" width="40" height="40" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        align="center"/>
      <el-table-column
        prop="gender"
        label="性别"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.gender==&quot;0&quot;">未知</span>
          <span v-if="scope.row.gender==&quot;1&quot;">男</span>
          <span v-if="scope.row.gender==&quot;2&quot;">女</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="微信昵称"
        align="center"/>
      <el-table-column
        prop="weixinNumber"
        label="微信号"
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
import { getList } from '@/api/users'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      formInline: {
        userName: '',
        nickName: '',
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
      getList(this.listQuery).then(response => {
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
