<template>
  <div style="padding:30px;">
    <el-alert v-if="signHide" :closable="false" class="title" title="编辑商户信息" />
    <el-alert v-if="!signHide" :closable="false" class="title" title="查看商户详情" />
    <div class="block">
      <div class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form :inline="true" :model="merchantRetail" class="demo-form-inline">
        <el-form-item :label-width="formLabelWidth" label="联系人">
          <el-input :readonly="readonly" v-model="merchantRetail.linkman"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="店铺名称">
          <el-input :readonly="readonly" v-model="merchantRetail.merchantName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商户简称">
          <el-input :readonly="readonly" v-model="merchantRetail.merchantAbbre"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系电话">
          <el-input :readonly="readonly" v-model="merchantRetail.linkmanPhone"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系人邮箱">
          <el-input :readonly="readonly" v-model="merchantRetail.linkmanEmail"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商户编号">
          <el-input :readonly="readonly" v-model="merchantRetail.merchantNumber"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商户经营范围">
          <el-input :readonly="readonly" v-model="merchantRetail.merchantScope"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商户一级分类">
          <el-input :readonly="readonly" v-model="merchantRetail.fCategory"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商户二级分类">
          <el-input :readonly="readonly" v-model="merchantRetail.sCategory"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商户类型">
          <el-select v-model="merchantRetail.merchantType" placeholder="请选择" @change="merchantType($event)">
            <el-option label="新批零" value="1">新批零</el-option>
            <el-option label="新零售" value="2">新零售</el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商户性质">
          <el-select v-model="merchantRetail.merchantCharacter" placeholder="请选择" @change="merchantCharacter($event)">
            <el-option label="个人" value="1">个人</el-option>
            <el-option label="个体" value="2">个体</el-option>
            <el-option label="企业" value="3">企业</el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item :label-width="formLabelWidth" label="省份">
            <el-select v-model="merchantRetail.province" placeholder="请选择" @change="onSelectedDrug($event)">
              <el-option v-for="item in areaData" :label="item.name" :value="item.code" :key="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="市">
            <el-select v-model="merchantRetail.city" placeholder="请选择" @change="onSelectedCity($event)">
              <el-option v-for="item in areaCityData" :label="item.name" :value="item.code" :key="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="区县">
            <el-select v-model="merchantRetail.county" placeholder="请选择" @change="onSelectedCounty($event)">
              <el-option v-for="item in areaCountyData" :label="item.name" :value="item.code" :key="item.id"/>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="block">
      <div class="clearfix">
        <span>商户资质</span>
      </div>
      <el-form :inline="true" :model="merchantQualificationVO" class="demo-form-inline">
        <div>
          <el-form-item :label-width="formLabelWidth" label="营业执照">
            <el-upload
              :before-upload="beforeupload"
              :on-change="handleChange()"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              list-type="picture-card"
              action="">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.businessLicenseUrl"></el-input> -->
          </el-form-item>
        </div>
        <el-form-item :label-width="formLabelWidth" label="营业执照编号">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.businessLicenseNo"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="法人姓名">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.legalPerson"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="法人电话">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.legalPhone"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="法人身份证号" >
          <el-input :readonly="readonly" v-model="merchantQualificationVO.legalIdCard"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="税务登记证编号">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.taxCertificateNo"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="组织机构代码证">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.organCertificateNo"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="开户许可证编号">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.openCertificateNo"/>
        </el-form-item>
        <el-form-item label="组织机构代码证是否长期有效">
          <el-radio-group v-model="merchantQualificationVO.organType">
            <el-radio label="是" value="true"/>
            <el-radio label="否" value="false"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="组织机构代码有效期至">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.organExpireEndDate"/>
        </el-form-item>
        <div>
          <el-form-item :label-width="formLabelWidth" label="法人身份证正面url">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.idCardFaceUrl"></el-input> -->
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="法人身份证反面">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.idCardConUrl"></el-input> -->
          </el-form-item>
        </div>
        <div>
          <el-form-item :label-width="formLabelWidth" label="统一社会信用代码证">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.unifiedCertificateUrl"></el-input> -->
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="税务登记证">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.taxRegisterCertificateUrl"></el-input> -->
          </el-form-item>
        </div>
        <div>
          <el-form-item :label-width="formLabelWidth" label="组织机构代码证">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.organCodeCertificateUrl"></el-input> -->
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="银行开户许可证">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.bankOrganUrl"></el-input> -->
          </el-form-item>
        </div>
        <div>
          <el-form-item :label-width="formLabelWidth" label="经营场所门头照">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.storePhotoUrl"></el-input> -->
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="收银台场景照">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.scenePhoneUrl"></el-input> -->
          </el-form-item>
        </div>
        <div>
          <el-form-item :label-width="formLabelWidth" label="行业许可证">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.industryLicenseUrl"></el-input> -->
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="block">
      <div class="clearfix">
        <span>商户结算信息</span>
      </div>
      <el-form :inline="true" :model="merchantSettleVO" class="demo-form-inline">
        <el-form-item :label-width="formLabelWidth" label="银行账户">
          <el-input :readonly="readonly" v-model="merchantSettleVO.bankCard"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="开户银行总行">
          <el-input :readonly="readonly" v-model="merchantSettleVO.headBankCode" @input="changeInput"/>
          <div v-if="showModel" class="ser-sel">
            <el-table
              :data="bankData"
              style="width: 100%">
              <el-table-column
                prop="bankName"
                width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="alertBank(scope.$index, scope.row)">{{ scope.row.bankName }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="开户银行省份">
          <el-select v-model="merchantSettleVO.bankProvince" placeholder="请选择" @change="onSelectedBank($event)">
            <el-option v-for="item in areaData" :label="item.name" :value="item.code" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="开户行城市">
          <el-select v-model="merchantSettleVO.bankCity" placeholder="请选择" @change="onSelectedCityBank($event)">
            <el-option v-for="item in bankCityData" :label="item.name" :value="item.code" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="开户行支行">
          <el-select v-model="merchantSettleVO.subBankCode" placeholder="请选择">
            <el-option v-for="item in smallBankData" :label="item.name" :value="item.code" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="结算方式">
          <!-- v-model="merchantRetail.settleType" -->
          <!-- <el-select placeholder="请选择"> -->
          <!-- <el-option label="自助结算"   value=1>自助结算</el-option>
              <el-option label="手动结算"   value=2>手动结算</el-option> -->
          <!-- </el-select> -->
        </el-form-item>
        <div>
          <el-form-item :label-width="formLabelWidth" label="结算银行卡url">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <!-- <el-input :readonly="readonly" v-model="merchantQualificationVO.settlementCardUrl"></el-input> -->
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-row class="submit-btn">
      <el-button v-if="signHide" type="primary" @click="eidthData()">确定</el-button>
    </el-row>
  </div>
</template>
<script>
import { getHeadbankList, getMerchantRetail, editMerchantRetail, getProvinceList, getCityChildList, uploadImgUrl } from '@/api/merchant'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      readonly: false,
      merchantRetail: {},
      merchantQualificationVO: {},
      merchantSettleVO: {},
      merchantNumber: '',
      signHide: false,
      showModel: true,
      formLabelWidth: '150px',
      idCardFaceUrl: '',
      settlementCardUrl: '',
      param: '',
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 50 // 每页数量
      },
      listCityQuery: {
        pageNum: 1,
        pageSize: 50
      },
      areaType: 'province',
      areaData: [],
      areaCityData: [],
      areaCountyData: [],
      bankData: [],
      bankCityData: [],
      smallBankData: []
    }
  },
  created() {
    this.getParams()
    this.getProvinceListData()
  },
  methods: {
    // 选择城市
    getProvinceListData() {
      getProvinceList(this.listQuery).then(response => {
        this.areaData = response.data.obj.result
      })
    },
    onSelectedDrug(event) {
      this.listQuery.parentCode = event
      this.merchantRetail.provinceCode = event
      getCityChildList(this.listQuery).then(response => {
        this.areaCityData = response.data.obj.result
      })
    },
    onSelectedCity(event) {
      this.listQuery.parentCode = event
      this.merchantRetail.cityCode = event
      getCityChildList(this.listQuery).then(response => {
        this.areaCountyData = response.data.obj.result
      })
    },
    onSelectedCounty(event) {
      this.merchantRetail.countyCode = event
    },
    onSelectedBank(event) {
      this.merchantSettleVO.bankProvinceCode = event
      this.listQuery.parentCode = event
      getCityChildList(this.listQuery).then(response => {
        this.bankCityData = response.data.obj.result
      })
    },
    onSelectedCityBank(event) {
      this.merchantSettleVO.bankCityCode = event
    },
    // 模糊搜索
    changeInput() {
      const bankName = this.merchantSettleVO.headBankCode
      if (bankName) {
        this.listQuery.bankName = bankName
        getHeadbankList(this.listQuery).then(response => {
          console.log(response.data.obj)
          this.bankData = response.data.obj
        })
      }
    },
    // 商户性质
    merchantType(event) {
      this.merchantRetail.merchantType = event
    },
    merchantCharacter(event) {
      this.merchantRetail.merchantCharacter = event
    },
    handleRemove(file, fileList) {
      this.param = new FormData()
      this.param.append('file', file, file.name)
      uploadImgUrl(this.param).then(response => {
        console.log(response)
      })
    },
    alertBank(index, row) {
      this.merchantSettleVO.headBankCode = row.bankCode
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange() {
      // return (file, fileList) => {
      //   const reader = new FileReader()
      //   const that = this
      //   this.param = new FormData()
      //   this.param.append('file', file, file.name)
      //   uploadImgUrl(this.param).then(response => {
      //     console.log(response)
      //   })
      // }
    },
    beforeupload(file) {
      console.log(file)
    },
    getParams() {
      const routerParams = this.$route.query.merchantNo
      this.signHide = this.$route.query.sign
      getMerchantRetail(routerParams).then(response => {
        this.merchantRetail = response.data.obj.merchantVO
        const merchantQualificationVO = response.data.obj.merchantQualificationVO
        const merchantSettleVO = response.data.obj.merchantSettleVO
        if (merchantQualificationVO) {
          this.merchantQualificationVO = response.data.obj.merchantQualificationVO
        }
        if (merchantSettleVO) {
          this.merchantSettleVO = response.data.obj.merchantSettleVO
        }
        this.merchantNumber = response.data.obj.merchantNumber
      })
    },
    eidthData() {
      const merchantQualificationVO = this.merchantQualificationVO
      merchantQualificationVO.merchantNumber = this.merchantNumber
      delete (merchantQualificationVO['createTime'])
      delete (merchantQualificationVO['updateTime'])
      const merchantSettleVO = this.merchantSettleVO
      merchantSettleVO.merchantNumber = this.merchantNumber
      delete (merchantSettleVO['createDate'])
      delete (merchantSettleVO['updateTime'])
      const merchantRetail = this.merchantRetail
      delete (merchantRetail['createDate'])
      delete (merchantRetail['updateTime'])
      const merchantDetail = { merchantNumber: this.merchantNumber, merchantQualificationVO: merchantQualificationVO, merchantSettleVO: this.merchantSettleVO, merchantVO: this.merchantRetail }
      editMerchantRetail(merchantDetail).then(response => {
        this.$message({
          message: '修改成功！',
          type: 'success'
        })
        this.$router.push({
          path: '/retailList/index'
        })
      })
        .catch(response => {
          this.$message.error('修改失败！')
        })
    }
  }
}
</script>
<style>
.el-alert--info{
  margin-bottom: 20px;
}
.block{
  border: 1px solid #ededde;margin-top: 20px
}
.block .demo-form-inline{
  padding: 20px 20px 0 20px;
}
.block .clearfix{
  border-bottom: 1px solid #ededde;
  padding: 10px 20px;
  font-weight: bold
}
.submit-btn{
  text-align: center;padding:20px;
}
.ser-sel{
  position: absolute;background: #fff;max-height:250px;overflow:hidden;overflow:auto;width: 100%;z-index:100;border:1px solid #dcdfe6
}
</style>

