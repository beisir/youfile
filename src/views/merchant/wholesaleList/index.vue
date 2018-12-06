<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="店铺名称">
        <el-input v-model="formInline.merchantName" placeholder="店铺名称"/>
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
        prop="merchantName"
        label="店铺名称"
        width="180"
        align="center"/>
      <el-table-column
        prop="merchantNumber"
        label="店铺编号"
        width="180"
        align="center"/>
      <el-table-column
        prop="linkman"
        label="联系人"
        width="180"
        align="center"/>
      <el-table-column
        prop="linkmanPhone"
        label="联系电话"
        width="180"
        align="center"/>
      <el-table-column
        prop="merchantCharacter"
        label="商户性质"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantCharacter==&quot;1&quot;">个人</span>
          <span v-if="scope.row.merchantCharacter==&quot;2&quot;">个体</span>
          <span v-if="scope.row.merchantCharacter==&quot;3&quot;">企业</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="merchantType"
        label="店铺性质"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantType==&quot;1&quot;">新批零</span>
          <span v-if="scope.row.merchantType==&quot;2&quot;">新零售</span>
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
import { getList } from '@/api/merchant'
export default {
  data() {
    return {
      formLabelWidth: '130px',
      merchantNumber: '',
      readonly: false,
      formInline: {
        name: '',
        merchantNumber: '',
        phone: ''
      },
      rules: {
        appId: [
          { required: true,
            message: '小程序appID不能为空',
            trigger: 'blur'
          }],
        appName: [
          { required: true,
            message: '小程序名称不能为空',
            trigger: 'blur'
          }],
        appSercret: [
          { required: true,
            message: '小程序密钥不能为空',
            trigger: 'blur'
          }]
      },
      listLoading: false,
      total: 0,
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      storeMes: {},
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
