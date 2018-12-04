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
        width="100"
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
          <span v-if="scope.row.merchantCharacter=='1'">个人</span>
          <span v-if="scope.row.merchantCharacter=='2'">个体</span>
          <span v-if="scope.row.merchantCharacter=='3'">企业</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="merchantType"
        label="店铺性质"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantType=='1'">新批零</span>
          <span v-if="scope.row.merchantType=='2'">新零售</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleLook(scope.$index, scope.row)">查看</el-button>
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
    <el-dialog :visible.sync="dialogTableVisible" title="查看详情">
      <el-form :model="merchantRetail">
        <el-form-item :label-width="formLabelWidth" label="联系人">
          <el-input :readonly="readonly" v-model="merchantRetail.linkman"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="店铺名称">
          <el-input :readonly="readonly" v-model="merchantRetail.merchantName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系电话">
          <el-input :readonly="readonly" v-model="merchantRetail.linkmanPhone"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="地址">
          <el-input :readonly="readonly" v-model="merchantRetail.address"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="店铺性质">
          <template slot-scope="scope">
            <el-input v-if="merchantRetail.merchantType=='1'" :readonly="readonly" v-model="merchantRetail.merchantType">新批零</el-input>
            <el-input v-if="merchantRetail.merchantType=='2'" :readonly="readonly" v-model="merchantRetail.merchantType">新零售</el-input>
          </template>
        </el-form-item>
      </el-form>
      <!-- <el-table :data="merchantQualificationVO">
        <el-table-column property="merchantNumber" label="商户编号" width="150"></el-table-column>
        <el-table-column property="businessLicenseUrl" label="营业执照" width="200"></el-table-column>
        <el-table-column property="legalPerson" label="法人姓名"></el-table-column>
        <el-table-column property="legalPhone" label="法人电话"></el-table-column>
        <el-table-column property="legalIdCard" label="法人身份证号"></el-table-column>
        <el-table-column property="taxCertificateNo" label="税务登记证编号"></el-table-column>
        <el-table-column property="openCertificateNo" label="开户许可证编号"></el-table-column>
        <el-table-column property="organCertificateNo" label="组织机构代码证"></el-table-column>
        <el-table-column property="organExpireEndDate" label="组织机构代码有效期至"></el-table-column>
        <el-table-column property="organType" label="组织机构代码证是否长期有效"></el-table-column>
        <el-table-column property="idCardFaceUrl" label="法人身份证正面url"></el-table-column>
        <el-table-column property="unifiedCertificateUrl" label="统一社会信用代码证"></el-table-column>
        <el-table-column property="taxRegisterCertificateUrl" label="税务登记证"></el-table-column>
        <el-table-column property="organCodeCertificateUrl" label="组织机构代码证"></el-table-column>
        <el-table-column property="organCodeCertificateUrl" label="组织机构代码证"></el-table-column>
      </el-table> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getList, getMerchantRetail } from '@/api/merchant'
export default {
  data() {
    return {
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
      readonly: true,
      tableData: [],
      merchantRetail: '',
      merchantQualificationVO: [],
      formLabelWidth: '120px',
      dialogTableVisible: false
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
    },
    handleLook(index, row) {
      getMerchantRetail(row.merchantNo).then(response => {
        this.merchantRetail = response.data.obj.merchantVO
        const merchantQualificationVO = response.data.obj.merchantQualificationVO
        console.log(merchantQualificationVO)
        this.merchantQualificationVO.push()
        this.dialogTableVisible = true
        // console.log(response)
      })
    }
  }
}
</script>
