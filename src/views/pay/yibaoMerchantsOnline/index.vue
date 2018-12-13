<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商户编号">
        <el-input v-model="formInline.merchantNumber" placeholder="请输入商户编号"/>
      </el-form-item>
      <el-form-item label="入网状态">
        <el-select v-model="formInline.registerStatus" placeholder="请选择">
          <el-option label="全部" value>全部商品</el-option>
          <el-option label="入网失败" value="0">入网失败</el-option>
          <el-option label="入网成功" value="1">入网成功</el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="addData">添加分账方</el-button>
    </el-form>
    <el-table v-loading.body="listLoading" :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="tInnerNumber" label="第三方支付内部流水号" align="center"/>
      <el-table-column prop="requestNumber" label="入网请求编号" align="center"/>
      <el-table-column prop="merchantNumber" label="商户编号" align="center"/>
      <el-table-column prop="tpMerchantNumber" label="第三方支付父商户编号" align="center"/>
      <el-table-column prop="tMerchantNumber" label="第三方支付商户编号" align="center"/>
      <el-table-column prop="tMerchantRole" label="第三方支付商户角色" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.tMerchantRole=='SUB_MERCHANT'" style="color: #E73E48">子商户</span>
          <span v-if="scope.row.tMerchantRole=='LEDGER_MERCHANT'" style="color: #E6A23C">分账方</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerStatus" label="入网状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.registerStatus=='UNKNOWN'" style="color: #E73E48">未知</span>
          <span v-if="scope.row.registerStatus=='INIT'" style="color: #E6A23C">初始化</span>
          <span v-if="scope.row.registerStatus=='REGIST_FAIL'" style="color: #67C23A">注册失败</span>
          <span v-if="scope.row.registerStatus=='REGIST_SUCCESS'" style="color: #43E0D6">注册成功</span>
          <span v-if="scope.row.registerStatus=='REGIST_PROCESSING'" style="color: #670ACE">审核中</span>
        </template>
      </el-table-column>
      <el-table-column prop="registerChannel" label="入网渠道" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.registerChannel=='WX_PAY'" style="color: #E73E48">微信支付</span>
          <span v-if="scope.row.registerChannel=='YEEPAY'" style="color: #E6A23C">易宝支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="onlinePay" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getDetails(scope.$index, scope.row )">详情</el-button>
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
    <el-dialog :visible.sync="merchantSignShow" title="商户编号">
      <el-form :model="formData" :rules="rules" :ref="formData">
        <el-form-item :label-width="formLabelWidth" prop="merchantSign" label="商户编号">
          <el-input v-model="formData.merchantSign" placeholder="请输入商户编号"/>
        </el-form-item>
        <el-form-item align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="getDetailsData">确定</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogTableVisible" title="商户信息">
      <!-- <el-form :model="rowData" >
        <el-form-item :label-width="formLabelWidth"  label="入网请求编号">
          <el-input v-model="rowData.requestNumber" placeholder=""/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth"  label="第三方支付内部流水号">
          <el-input v-model="rowData.tInnerNumber" placeholder=""/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth"  label="商户编号">
          <el-input v-model="rowData.merchantNumber" placeholder="商户编号"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth"  label="第三方支付父商户编号">
          <el-input v-model="rowData.tpMerchantNumber" placeholder=""/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth"  label="第三方支付商户编号">
          <el-input v-model="rowData.tMerchantNumber" placeholder=""/>
        </el-form-item>
         <el-form-item :label-width="formLabelWidth"  label="第三方支付商户角色">
          <el-input v-model="rowData.tMerchantRole" placeholder=""/>
          <template slot-scope="scope">
            <span v-if="scope.row.tMerchantRole=='SUB_MERCHANT'" style="color: #E73E48">子商户</span>
            <span v-if="scope.row.tMerchantRole=='LEDGER_MERCHANT'" style="color: #E6A23C">分账方</span>
          </template>
        </el-form-item>
      </el-form> -->
      <div>商户资质信息：{{ certificationInfo }}</div>
      <div>商户资质图片信息：{{ pictureInfo }}</div>
      <div>商户结算信息：{{ settleInfo }}</div>
      <div>商户支付产品信：{{ productInfo }}</div>
    </el-dialog>
  </div>
</template>
<script>
import { getMerchantList, getMerchantDetails } from '@/api/pay'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      formInline: {
        merchantNumber: '',
        registerStatus: ''
      },
      formData: {
        merchantSign: ''
      },
      rules: {
        merchantSign: [
          { required: true, message: '商户编号不能为空', trigger: 'blur' }
        ]
      },
      listLoading: false,
      merchantSignShow: false,
      total: 0,
      formLabelWidth: '180px',
      dialogTableVisible: false,
      listQuery: {
        registerChannel: 'YEEPAY',
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      tableData: [],
      merchantMes: '',
      certificationInfo: '',
      settleInfo: '',
      pictureInfo: '',
      rowData: {},
      productInfo: ''
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
      getMerchantList(this.listQuery).then(response => {
        const data = response.data
        if (data) {
          this.tableData = response.data.result
        }
        this.listLoading = false
        this.total = response.data.totalCount
      })
    },
    addData() {
      this.merchantSignShow = true
    },
    getDetailsData(index, row, sign) {
      const formData = this.formData
      this.$refs[formData].validate(valid => {
        if (valid) {
          const merchantSign = this.formData.merchantSign
          this.$router.push({
            path: '/pay/yibaoOnlineDetails',
            query: {
              merchantNo: merchantSign
            }
          })
        }
      })
    },
    getDetails(index, row) {
      const requestNumber = row.requestNumber
      this.rowData = row
      getMerchantDetails(requestNumber).then(response => {
        const data = response.data
        if (data) {
          this.merchantMes = response.data.baseInfo
          this.certificationInfo = response.data.certificationInfo
          this.settleInfo = response.data.settleInfo
          this.productInfo = response.data.productInfo
          this.pictureInfo = response.data.pictureInfo
          // console.log(eval ("(" + response.data.baseInfo + ")"))
        }
        this.dialogTableVisible = true
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
<style>
.el-dialog .el-dialog__body {
  overflow-x: auto;
}
.el-dialog .el-dialog__body input {
  width: 350px;
}
</style>

