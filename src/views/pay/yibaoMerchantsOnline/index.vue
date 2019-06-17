<template>
  <div class="body-cont">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="wait">待入网商户</el-menu-item>
      <el-menu-item index="already">已入网商户</el-menu-item>
    </el-menu>
    <div v-show="alreadyIn">
      <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
        <el-form-item label="商户编号">
          <el-input v-model="formInline.merchantNumber" placeholder="请输入商户编号"/>
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
        <el-button type="success" @click="exportExcel">导出</el-button>
      </el-form>
      <el-table
        v-loading.body="listLoading"
        id="success-table"
        :data="tableData"
        highlight-current-row
        border
        max-height="800"
        style="width: 100%"
      >
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column prop="requestNumber" width="200" label="入网请求编号" align="center"/>
        <el-table-column prop="merchantNumber" width="200" label="商户编号" align="center"/>
        <el-table-column
          prop="thirdParentMerchantNumber"
          width="200"
          label="第三方支付父商户编号"
          align="center"
        />
        <el-table-column prop="thirdMerchantNumber" width="200" label="第三方支付商户编号" align="center"/>
        <el-table-column prop="thirdMerchantRole" width="200" label="第三方支付商户角色" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.thirdMerchantRole=='sub_merchant'" style="color: #E73E48">子商户</span>
            <span v-if="scope.row.thirdMerchantRole=='ledger_merchant'" style="color: #E6A23C">分账方</span>
          </template>
        </el-table-column>
        <el-table-column prop="registerStatus" width="200" label="入网状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.registerStatus=='unkonown'" style="color: #E73E48">未知</span>
            <span v-if="scope.row.registerStatus=='init'" style="color: #E6A23C">初始化</span>
            <span v-if="scope.row.registerStatus=='register_fail'" style="color: #67C23A">注册失败</span>
            <span v-if="scope.row.registerStatus=='register_success'" style="color: #43E0D6">注册成功</span>
            <span v-if="scope.row.registerStatus=='register_processing'" style="color: #670ACE">审核中</span>
          </template>
        </el-table-column>
        <el-table-column prop="registerChannel" label="入网渠道" width="200" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.registerChannel=='wx_pay'" style="color: #E73E48">微信支付</span>
            <span v-if="scope.row.registerChannel=='yeepay'" style="color: #E6A23C">易宝支付</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="180" align="center">
          <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
        </el-table-column>
        <el-table-column prop="updateDate" label="更新时间" width="180" align="center">
          <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
        </el-table-column>
        <el-table-column prop="onlinePay" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="getDetails(scope.$index, scope.row )">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.pageNum"
        :page-size="listQuery.size"
        :total="total"
        :page-sizes="[10, 30, 50, 100, 500]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-show="!alreadyIn">
      <el-form :inline="true" :model="formDataOther" class="demo-form-inline border-form">
        <el-form-item label="商户编号">
          <el-input v-model="formDataOther.merchantNumber" placeholder="请输入商户编号" clearable/>
        </el-form-item>
        <el-form-item label="商户手机号">
          <el-input v-model="formDataOther.linkmanPhone" clearable/>
        </el-form-item>
        <el-form-item label="商户名称">
          <el-input v-model="formDataOther.merchantName" clearable/>
        </el-form-item>
        <el-form-item label="商贸城">
          <el-select v-model="formDataOther.mallCode" clearable>
            <el-option v-for="item in mallList" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="入网状态">
          <el-select v-model="formDataOther.registerStatus" clearable placeholder="请选择">
            <el-option label="未注册" value="unregister"/>
            <!-- <el-option label="注册成功" value="register_success"/> -->
            <el-option label="审核中" value="register_processing"/>
            <el-option label="注册失败" value="register_fail"/>
            <el-option label="初始化" value="init"/>
            <el-option label="未知" value="unkonown"/>
          </el-select>
        </el-form-item>
        <el-form-item label="提交开始时间">
          <el-date-picker
            v-model="formDataOther.completeTimeBegin"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          />
        </el-form-item>
        <el-form-item label="提交结束时间">
          <el-date-picker
            v-model="formDataOther.completeTimeEnd"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
          />
        </el-form-item>
        <el-form-item label="商户类型" prop="merchantType">
          <el-select v-model="formDataOther.merchantType" clearable>
            <el-option label="批发商" value="1">批发商</el-option>
            <el-option label="零售商" value="2">零售商</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户性质" prop="merchantCharacter">
          <el-select v-model="formDataOther.merchantCharacter" clearable>
            <el-option label="个人" value="1">个人</el-option>
            <el-option label="个体" value="2">个体</el-option>
            <el-option label="企业" value="3">企业</el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="exportExcel">导出</el-button>
      </el-form>
      <el-table
        v-loading.body="listLoading"
        id="wait-table"
        :data="tableDataOther"
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
        <el-table-column prop="merchantType" width="160" label="商户类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.merchantType=='1'">批发商</span>
            <span v-if="scope.row.merchantType=='2'">零售商</span>
          </template>
        </el-table-column>
        <el-table-column prop="merchantCharacter" width="160" label="商户性质" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.merchantCharacter=='1'">个人</span>
            <span v-if="scope.row.merchantCharacter=='2'">个体</span>
            <span v-if="scope.row.merchantCharacter=='3'">企业</span>
          </template>
        </el-table-column>
        <el-table-column prop="registerStatus" label="入网状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.registerStatus=='unregister'">未注册</span>
            <span v-if="scope.row.registerStatus=='unkonown'" style="color: #E73E48">未知</span>
            <span v-if="scope.row.registerStatus=='init'" style="color: #E6A23C">初始化</span>
            <span v-if="scope.row.registerStatus=='register_fail'" style="color: #67C23A">注册失败</span>
            <span v-if="scope.row.registerStatus=='register_success'" style="color: #43E0D6">注册成功</span>
            <span v-if="scope.row.registerStatus=='register_processing'" style="color: #670ACE">审核中</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="失败原因" align="center"/>
        <el-table-column prop="createTime" label="创建时间" width="180" align="center">
          <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column prop="completeTime" label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{ unix2CurrentTime(scope.row.completeTime) }}</template>
        </el-table-column>
        <el-table-column prop="onlinePay" label="操作" fixed="right" width="280" align="left">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="getDetailsData(scope.row)">分帐方入网</el-button>
            <el-button v-if="scope.row.registerStatus!=='unregister'" size="mini" type="primary" @click="getDetails(scope.$index, scope.row )">详情</el-button>
            <el-button
              v-if="scope.row.registerStatus=='register_processing'"
              size="mini"
              type="primary"
              @click="registerStatus(scope.$index, scope.row )"
            >确认入网</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQueryOther.pageNum"
        :page-size="listQueryOther.size"
        :total="totalOther"
        :page-sizes="[10, 30, 50, 100, 500]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="statusNewShow" title="入网状态">
      <el-form>
        <el-form-item label="入网状态">
          <el-select v-model="statusNew" disabled="disabled" placeholder="请选择">
            <el-option label="全部" value>全部</el-option>
            <el-option label="注册成功" value="register_success">注册成功</el-option>
            <el-option label="审核中" value="register_processing">审核中</el-option>
            <el-option label="初始化" value="init">初始化</el-option>
            <el-option label="未知" value="unkonown">未知</el-option>
            <el-option label="注册失败" value="register_fail">注册失败</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="statusNew=='register_success'" align="center">
          <template>
            <el-button type="primary" @click="confirmReg">确定</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- <el-dialog :visible.sync="merchantSignShow" title="商户编号">
      <el-form :model="formData" :rules="rules" :ref="formData">
        <el-form-item :label-width="formLabelWidth" prop="merchantSign" label="商户编号">
          <el-input v-model="formData.merchantSign" placeholder="请输入商户编号"/>
        </el-form-item>
        <el-form-item align="center">
          <template>
            <el-button type="primary" @click="getDetailsData">确定</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog> -->
    <el-dialog :visible.sync="dialogTableVisible" title="商户信息">
      <el-form :model="rowData">
        <el-form-item :label-width="formLabelWidth" label="入网请求编号">
          <el-input v-model="rowData.requestNumber" disabled="disabled" placeholder/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="第三方支付内部流水号">
          <el-input v-model="rowData.thirdInnerNumber" disabled="disabled" placeholder/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商户编号">
          <el-input v-model="rowData.merchantNumber" disabled="disabled" placeholder="商户编号"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="第三方支付父商户编号">
          <el-input v-model="rowData.thirdParentMerchantNumber" disabled="disabled" placeholder/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="第三方支付商户编号">
          <el-input v-model="rowData.thirdMerchantNumber" disabled="disabled" placeholder/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="第三方支付商户角色">
          <el-select v-model="rowData.thirdMerchantRole" disabled="disabled" placeholder="请选择">
            <el-option label="子商户" value="sub_merchant">子商户</el-option>
            <el-option label="分账方" value="ledger_merchant">分账方</el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="入网状态">
          <el-select v-model="rowData.registerStatus" disabled="disabled" placeholder="请选择">
            <el-option label="微信支付" value="unkonown">微信支付</el-option>
            <el-option label="初始化" value="init">初始化</el-option>
            <el-option label="注册失败" value="register_fail">注册失败</el-option>
            <el-option label="注册成功" value="register_success">注册成功</el-option>
            <el-option label="注册成功" value="register_success">注册成功</el-option>
            <el-option label="审核中" value="register_processing">审核中</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="rowData.registerStatus === 'regist_fail'" :label-width="formLabelWidth" label="入网状态">
          <el-input v-model="rowData.remark" disabled="disabled" placeholder/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="入网渠道">
          <el-select v-model="rowData.registerChannel" disabled="disabled" placeholder="请选择">
            <el-option label="微信支付" value="wx_pay">微信支付</el-option>
            <el-option label="易宝支付" value="yeepay">易宝支付</el-option>
          </el-select>
        </el-form-item>
        <!-- <json-viewer :value="jsonData"/> -->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  getMerchantList,
  getRegisterMerchantList,
  getMerchantDetails,
  registerStatus,
  confirmReg
} from '@/api/pay'
import { getList as getMallList } from '@/api/mall'
import { unix2CurrentTime } from '@/utils'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      statusNew: '',
      statusNewShow: false,
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
        thirdMerchantRole: 'ledger_merchant',
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      tableData: [],
      merchantMes: '',
      jsonData: {},
      rowData: {},
      value6: '',
      requestNumber: '',
      // 代入网
      alreadyIn: false,
      listQueryOther: {
        registerChannel: 'YEEPAY',
        thirdMerchantRole: 'ledger_merchant',
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      totalOther: 0,
      tableDataOther: [],
      formDataOther: {},
      mallList: [],
      activeIndex: 'wait'
    }
  },
  created() {
    this.getList(true)
    getMallList().then(res => {
      this.mallList = res.data
    })
  },
  methods: {
    exportExcel() {
      let id = 'wait-table'
      let title = '待入网商户.xlsx'
      if (this.alreadyIn) {
        id = 'success-table'
        title = '已入网商户.xlsx'
      }
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#' + id))
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          title
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    handleSelect(key, keyPath) {
      if (key === 'wait') {
        this.alreadyIn = false
      } else {
        this.alreadyIn = true
      }
      this.getList()
    },
    unix2CurrentTime,
    onSubmit() {
      if (this.alreadyIn) {
        this.listQuery = Object.assign(this.listQuery, this.formInline)
        this.listQuery.pageNum = 1
        const arrData = this.value6
        if (arrData) {
          this.listQuery.beginDate = arrData[0]
          this.listQuery.endDate = arrData[1]
        } else {
          this.listQuery.beginDate = ''
          this.listQuery.endDate = ''
        }
      } else {
        this.listQueryOther = Object.assign(this.listQueryOther, this.formDataOther)
        this.listQueryOther.pageNum = 1
      }
      this.getList()
    },
    /**
     * 获取列表
     */
    getList(all) {
      this.listLoading = true
      if (all) {
        this.listQuery.registerStatus = 'register_success'
        getMerchantList(this.listQuery).then(response => {
          const data = response.data
          if (data) {
            this.tableData = response.data.result
          }
          this.listLoading = false
          this.total = response.data.totalCount
        })

        getRegisterMerchantList(this.listQueryOther).then(response => {
          const data = response.data
          if (data) {
            this.tableDataOther = response.data.result
          }
          this.listLoading = false
          this.totalOther = response.data.totalCount
        })
      }
      if (this.alreadyIn) {
        this.listQuery.registerStatus = 'register_success'
        getMerchantList(this.listQuery).then(response => {
          const data = response.data
          if (data) {
            this.tableData = response.data.result
          }
          this.listLoading = false
          this.total = response.data.totalCount
        })
      } else {
        getRegisterMerchantList(this.listQueryOther).then(response => {
          const data = response.data
          if (data) {
            this.tableDataOther = response.data.result
          }
          this.listLoading = false
          this.totalOther = response.data.totalCount
        })
      }
    },
    getDetailsData(formData) {
      const merchantSign = formData.merchantNumber
      if (!merchantSign) { return }
      this.$router.push({
        path: '/pay/yibaoOnlineDetails',
        query: {
          merchantNo: merchantSign
        }
      })
    },
    // 查看入网状态
    registerStatus(index, row) {
      const requestNumber = row.requestNumber
      this.requestNumber = requestNumber
      registerStatus({ requestNumber: requestNumber }).then(response => {
        this.statusNew = response.data
        this.statusNewShow = true
      })
    },
    // 确认入网
    confirmReg() {
      this.$confirm('确定要入网吗？', '提示', {
        confirmNuttonText: '确定',
        concelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const requestNumber = this.requestNumber
          confirmReg({ requestNumber: requestNumber }).then(response => {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.statusNewShow = false
            this.getList()
          })
        })
        .catch(() => {})
    },
    getDetails(index, row) {
      const requestNumber = row.requestNumber
      if (!requestNumber) { return }
      this.rowData = row
      getMerchantDetails(requestNumber).then(response => {
        const data = response.data
        if (data) {
          this.jsonData = response.data
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
      if (this.alreadyIn) {
        this.listQuery.pageSize = size
        this.listQuery.pageNum = 1
      } else {
        this.listQueryOther.pageSize = size
        this.listQueryOther.pageNum = 1
      }
      this.getList()
    },
    /**
     * 改变页码
     * @param page 页号
     */
    handleCurrentChange(page) {
      if (this.alreadyIn) {
        this.listQuery.pageNum = page
      } else {
        this.listQueryOther.pageNum = page
      }
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

