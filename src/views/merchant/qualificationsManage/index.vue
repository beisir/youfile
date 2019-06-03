<template>
  <div class="body-cont">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="商户编号">
        <el-input v-model="formInline.merchantNumber" placeholder="请输入商户编号"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.linkmanPhone" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input v-model="formInline.merchantName" placeholder="请输入商户名称"/>
      </el-form-item>
      <el-form-item label="是否提交资质">
        <el-select v-model="formInline.completionStatus" placeholder="请选择">
          <el-option label="全部商户" value>全部商户</el-option>
          <el-option label="是" value="complete">是</el-option>
          <el-option label="否" value="incomplete">否</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="提交开始时间">
        <el-date-picker
          v-model="formInline.completeTimeBegin"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="提交结束时间">
        <el-date-picker
          v-model="formInline.completeTimeEnd"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="formInline.auditStatus" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="待审核" value="init"/>
          <el-option label="审核通过" value="success"/>
          <el-option label="审核失败" value="fail"/>
        </el-select>
      </el-form-item>
      <el-form-item label="审核开始时间">
        <el-date-picker
          v-model="formInline.auditTimeBegin"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="审核结束时间">
        <el-date-picker
          v-model="formInline.auditTimeEnd"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="商户类型">
        <el-select v-model="formInline.merchantType" placeholder="请选择">
          <el-option label="全部商户" value/>
          <el-option label="批发商" value="1"/>
          <el-option label="零售商" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="商户性质">
        <el-select v-model="formInline.merchantCharacter" placeholder="请选择">
          <el-option label="全部" value/>
          <el-option label="企业" value="3"/>
          <el-option label="个体" value="2"/>
          <el-option label="个人" value="1"/>
        </el-select>
      </el-form-item>
      <el-form-item label="是否删除">
        <el-select v-model="formInline.isDel" placeholder="请选择">
          <el-option label="全部" value>全部</el-option>
          <el-option label="未删除" value="false">未删除</el-option>
          <el-option label="已删除" value="true">已删除</el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form>
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      highlight-current-row
      border
      max-height="800"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="merchantNumber" width="160" label="商户编号" align="center"/>
      <el-table-column prop="merchantName" width="160" label="商户名称" align="center"/>
      <el-table-column prop="linkman" width="160" label="联系人" align="center"/>
      <el-table-column prop="linkmanPhone" width="160" label="联系电话" align="center"/>
      <el-table-column prop="onlinePay" width="160" label="在线支付状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.onlinePay=='0'" class="com-red-color">未开通</span>
          <span v-if="scope.row.onlinePay=='1'" class="com-green-color">已开通</span>
          <span v-if="scope.row.onlinePay=='2'" class="com-yellow-color">未设置</span>
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" width="160" label="审核状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus=='init'" class="com-yellow-color">待审核</span>
          <span v-if="scope.row.auditStatus=='success'" class="com-green-color">审核通过</span>
          <span v-if="scope.row.auditStatus=='fail'" class="com-red-color">审核失败</span>
          <span v-if="scope.row.auditStatus=='fail' && scope.row.auditRemark"><br>理由：{{ scope.row.auditRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantCharacter" width="160" label="商户性质" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantCharacter==&quot;1&quot;">个人</span>
          <span v-if="scope.row.merchantCharacter==&quot;2&quot;">个体</span>
          <span v-if="scope.row.merchantCharacter==&quot;3&quot;">企业</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantType" width="160" label="商户类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantType==&quot;1&quot;">批发商</span>
          <span v-if="scope.row.merchantType==&quot;2&quot;">零售商</span>
        </template>
      </el-table-column>
      <el-table-column prop="isDel" label="是否删除" width="160" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isDel==false">未删除</span>
          <span v-if="scope.row.isDel==true">已删除</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column prop="completeTime" label="提交时间" width="160" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.completeTime) }}</template>
      </el-table-column>
      <el-table-column prop="openPayDate" label="开通支付时间" width="160" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.openPayDate) }}</template>
      </el-table-column>
      <el-table-column prop="auditTime" label="审核时间" width="160" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.auditTime) }}</template>
      </el-table-column>
      <el-table-column label="操作" min-width="600" fixed="right" align="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.auditStatus=='init'"
            size="mini"
            type="success"
            @click="changeStatus(scope.row,'success')"
          >审核通过</el-button><el-button
            v-if="scope.row.auditStatus=='init'"
            size="mini"
            type="danger"
            data-type="danger"
            @click="dialogReject=true;rejectRemark='';rejectItem=scope.row"
          >审核失败</el-button>
          <el-button
            size="mini"
            type="info"
            @click="handleLook(scope.$index, scope.row ,true)"
          >全量资质编辑</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleLookFen(scope.$index, scope.row ,true)"
          >基本资质编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="getStoreMess(scope.$index, scope.row ,true)"
          >小程序信息编辑</el-button>
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
    <el-dialog :visible.sync="dialogTableVisible" :title="title">
      <el-form
        :inline="true"
        :label-width="formLabelWidth"
        :model="storeMes"
        :rules="rules"
        :ref="storeMes"
      >
        <el-form-item :label-width="formLabelWidth" label="商户编号">
          <el-input v-model="merchantNumber" disabled="disabled"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="平台内应用编号">
          <el-input v-model="storeMes.platAppId" disabled="disabled"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="小程序appID" prop="appId">
          <el-input :readonly="readonly" v-model="storeMes.appId"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="小程序名称" prop="appName">
          <el-input :readonly="readonly" v-model="storeMes.appName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="小程序密钥" prop="appSecret">
          <el-input :readonly="readonly" v-model="storeMes.appSecret"/>
        </el-form-item>
      </el-form>
      <div v-if="isShow" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateMes">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 驳回弹框 -->
    <el-dialog :visible.sync="dialogReject" title="资质审核失败">
      <div style="overflow:hidden;">
        <div v-for="item in rejectReason" :key="item.name" class="reject-item" @click="choseReason(item)">{{ item }}</div>
      </div>
      <el-input v-model="rejectRemark" style="margin:20px 10px 50px;" rows="3" maxlength="50" placeholder="请选择或者输入审核失败原因" type="textarea"/>
      <el-row :gutter="12" justify="end" type="flex" class="btn-box">
        <el-button type="info" @click="dialogReject=false">取消</el-button>
        <el-button type="warning" @click="changeStatus({},'fail')">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { newgetListMerchantRetail, getStoreMes, saveupdate, changeMerchantStatus } from '@/api/merchant'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      title: '小程序信息详情',
      formLabelWidth: '130px',
      merchantNumber: '',
      readonly: false,
      formInline: {
        merchantType: '',
        isDel: '',
        linkmanPhone: '',
        merchantName: ''
      },
      isShow: false,
      rules: {
        appId: [
          { required: true, message: '小程序appID不能为空', trigger: 'blur' }
        ],
        appName: [
          { required: true, message: '小程序名称不能为空', trigger: 'blur' }
        ],
        appSecret: [
          { required: true, message: '小程序密钥不能为空', trigger: 'blur' }
        ]
      },
      listLoading: false,
      total: 0,
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      storeMes: {},
      tableData: [],
      dialogTableVisible: false,
      // 驳回弹框
      dialogReject: false,
      rejectReason: ['商户身份证上传有误', '商户银行卡上传有误', '商户邮箱信息填写有误', '商户营业执照上传有误', '商户法人名称与银行卡不一致'],
      rejectRemark: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    choseReason(text) {
      const tt = this.rejectRemark + text
      if (tt.length > 50) { return }
      this.rejectRemark += text
    },
    changeStatus(row, type) {
      let obj = {}
      if (type === 'fail') {
        if (!this.rejectRemark) {
          this.$message.error('请填写失败原因')
          return
        }
        obj = {
          merchantNumber: this.rejectItem.merchantNumber,
          auditStatus: type,
          remark: this.rejectRemark
        }
      } else {
        obj = {
          merchantNumber: row.merchantNumber,
          auditStatus: type
        }
      }
      changeMerchantStatus(obj).then(res => {
        this.dialogReject = false
        this.getList()
      })
    },
    unix2CurrentTime,
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
      newgetListMerchantRetail(this.listQuery).then(response => {
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
    },
    addMerchant(index, row, sign) {
      const merchantNo = row.merchantNo
      this.$router.push({
        path: '/addMerchant/index',
        query: {
          merchantNo: merchantNo
        }
      })
    },
    // 小程序信息
    getStoreMess(index, row, sign) {
      this.storeMes = {}
      if (sign) {
        this.isShow = true
        this.title = '小程序信息编辑'
      } else {
        this.isShow = false
        this.title = '小程序信息详情'
      }
      this.dialogTableVisible = true
      const merchantNumber = row.merchantNumber
      this.merchantNumber = merchantNumber
      getStoreMes(merchantNumber).then(response => {
        const storeMes = response.data
        if (storeMes) {
          this.storeMes = storeMes[0]
        }
      })
    },
    updateMes(index, row) {
      const formData = this.storeMes
      this.$refs[formData].validate(valid => {
        if (valid) {
          const dataMes = this.storeMes
          const merchantNumber = this.merchantNumber
          delete dataMes['createTime']
          delete dataMes['updateTime']
          dataMes.merchantNumber = merchantNumber
          saveupdate(dataMes).then(response => {
            this.dialogTableVisible = false
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
          })
        }
      })
    },
    handleLookFen(index, row, sign) {
      const merchantNo = row.merchantNo
      this.$router.push({
        path: '/merchantDetails/indexFen',
        query: {
          merchantNo: merchantNo,
          sign: sign
        }
      })
    },
    handleLook(index, row, sign) {
      const merchantNo = row.merchantNo
      this.$router.push({
        path: '/merchantDetails/index',
        query: {
          merchantNo: merchantNo,
          sign: sign
        }
      })
    }
  }
}
</script>
<style>
.reject-item{float: left;padding:5px 20px;margin:8px 10px;border-radius: 10px;border:1px solid #ddd;}
.btn-box{border-top: 1px solid #ededed;padding-top: 30px;}
</style>
