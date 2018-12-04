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
        <el-form-item :label-width="formLabelWidth" label="详细地址">
          <el-input :readonly="readonly" v-model="merchantRetail.address"/>
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
              :on-remove="handleRemove"
              :limit="1"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccess"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="businessLicenseUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
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
        <el-form-item :label-width="formLabelWidth" label="统一社会信用代码证号">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.unifiedCertificateNo"/>
        </el-form-item>
        <el-form-item label="组织机构代码证是否长期有效">
          <el-select v-model="merchantQualificationVO.organType" placeholder="请选择" @change="organTypeDataFun($event)">
            <el-option v-for="item in organTypeData" :label="item.name" :value="item.code" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="组织机构代码有效期至">
          <el-input :readonly="readonly" v-model="merchantQualificationVO.organExpireEndDate"/>
        </el-form-item>
        <div>
          <el-form-item :label-width="formLabelWidth" label="法人身份证正面url">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="idCardFaceUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessFace"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="idCardFaceUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="法人身份证反面">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="idCardConUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessFaceCon"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="idCardConUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="手持身份证">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="handIdCardUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessFaceHand"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="handIdCardUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item :label-width="formLabelWidth" label="统一社会信用代码证">
            <el-upload
              :on-remove="handleRemove"
              :file-list="unifiedCertificateUrlList"
              :on-preview="handlePictureCardPreview"
              :limit="1"
              :on-success="handleSuccessCertificate"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="unifiedCertificateUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="税务登记证">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="taxRegisterCertificateUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessRegister"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="taxRegisterCertificateUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item :label-width="formLabelWidth" label="组织机构代码证">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="organCodeCertificateUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessOrgan"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="organCodeCertificateUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="银行开户许可证">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="bankOrganUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessBank"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="bankOrganUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item :label-width="formLabelWidth" label="经营场所门头照">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="storePhotoUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessPhoto"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="bankOrganUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="收银台场景照">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="scenePhoneUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessPhone"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="scenePhoneUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item :label-width="formLabelWidth" label="行业许可证">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="industryLicenseUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccessLicense"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="industryLicenseUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
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
        <el-form-item :label-width="formLabelWidth" label="开户卡类型">
          <el-select v-model="merchantRetail.merchantCharacter" placeholder="请选择" @change="merchantCharacter($event)">
            <el-option label="未知" value="0">未知</el-option>
            <el-option label="对公" value="1">对公</el-option>
            <el-option label="对私" value="2">对私</el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="开户名">
          <el-input :readonly="readonly" v-model="merchantSettleVO.accountName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="开户银行总行">
          <el-input :readonly="readonly" v-model="merchantSettleVO.headBankName" @blur="blurInput" @input="changeInput"/>
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
          <el-select v-model="merchantSettleVO.subBankName" placeholder="请选择" @change="selectedSubBankCode($event)">
            <el-option v-for="item in smallBankData" :label="item.bankName" :value="item.bankCode" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="结算方式">
          <el-select v-model="merchantSettleVO.settleType" placeholder="请选择" @change="settleTypeFun($event)">
            <el-option label="自助结算" value="1">自助结算</el-option>
            <el-option label="手动结算" value="2">手动结算</el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item :label-width="formLabelWidth" label="结算银行卡url">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :file-list="settlementCardUrlList"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccesSettlement"
              :action="uploadImgUrl+'/base/image?type=MERCHANT_QUALIFICATION'"
              list-type="picture-card"
            >
              <el-dialog :visible.sync="dialogVisible">
                <img :src="industryLicenseUrl" width="100%" alt="">
              </el-dialog>
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
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
import { getHeadbankList, getMerchantRetail, editMerchantRetail, getProvinceList, getCityChildList, getSmallbankList, getImgUrl } from '@/api/merchant'
export default {
  data() {
    return {
      uploadImgUrl: process.env.IMAGE_UPLOAD_API,
      dialogVisible: false,
      readonly: false,
      merchantRetail: {},
      merchantQualificationVO: {},
      merchantSettleVO: {},
      merchantNumber: '',
      signHide: false,
      showModel: false,
      formLabelWidth: '150px',
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
      smallBankData: [],
      organTypeData: [{ code: true, name: '是', id: 1 }, { code: false, name: '否', id: 2 }],
      settleTypeData: [{ code: 1, name: '自助结算', id: 1 }, { code: 2, name: '手动结算', id: 2 }],
      businessLicenseUrl: '',
      idCardFaceUrl: '',
      idCardConUrl: '',
      handIdCardUrl: '',
      unifiedCertificateUrl: '',
      taxRegisterCertificateUrl: '',
      organCodeCertificateUrl: '',
      bankOrganUrl: '',
      storePhotoUrl: '',
      scenePhoneUrl: '',
      industryLicenseUrl: '',
      settlementCardUrl: '',
      fileList: [],
      idCardFaceUrlList: [],
      idCardConUrlList: [],
      handIdCardUrlList: [],
      unifiedCertificateUrlList: [],
      taxRegisterCertificateUrlList: [],
      organCodeCertificateUrlList: [],
      bankOrganUrlList: [],
      storePhotoUrlList: [],
      scenePhoneUrlList: [],
      industryLicenseUrlList: [],
      settlementCardUrlList: []
    }
  },
  created() {
    this.getParams()
    this.getProvinceListData()
  },
  methods: {
    organTypeDataFun(event) {
      this.merchantQualificationVO.organType = event
    },
    settleTypeFun(event) {
      this.merchantSettleVO.settleType = event
    },
    // 选择城市
    getProvinceListData() {
      getProvinceList(this.listQuery).then(response => {
        this.areaData = response.data.obj.result
      })
    },
    getDataName(arr, event) {
      let obj = {}
      obj = arr.find((item) => {
        return item.code === event
      })
      return obj.name
    },
    onSelectedDrug(event) {
      const name = this.getDataName(this.areaData, event)
      const listQuery = this.listQuery
      listQuery.parentCode = event
      this.merchantRetail.provinceCode = event
      this.merchantRetail.province = name
      getCityChildList(this.listQuery).then(response => {
        this.areaCityData = response.data.obj.result
      })
    },
    onSelectedCity(event) {
      const name = this.getDataName(this.areaCityData, event)
      const listQuery = this.listQuery
      listQuery.parentCode = event
      this.merchantRetail.cityCode = event
      this.merchantRetail.city = name
      getCityChildList(listQuery).then(response => {
        this.areaCountyData = response.data.obj.result
      })
    },
    onSelectedCounty(event) {
      const name = this.getDataName(this.areaCountyData, event)
      this.merchantRetail.countyCode = event
      this.merchantRetail.county = name
    },
    onSelectedBank(event) {
      const name = this.getDataName(this.areaData, event)
      this.merchantSettleVO.bankProvinceCode = event
      this.merchantSettleVO.bankProvince = name
      const listQuery = this.listQuery
      listQuery.parentCode = event
      getCityChildList(listQuery).then(response => {
        this.bankCityData = response.data.obj.result
      })
    },
    onSelectedCityBank(event) {
      const name = this.getDataName(this.bankCityData, event)
      this.merchantSettleVO.bankCityCode = event
      this.merchantSettleVO.bankCity = name
      const provinceCode = this.merchantSettleVO.bankProvinceCode
      const listQuery = this.listQuery
      listQuery.headBankCode = this.merchantSettleVO.headBankCode
      listQuery.provinceCode = provinceCode
      listQuery.cityCode = event
      getSmallbankList(listQuery).then(response => {
        this.smallBankData = response.data.obj.result
      })
    },
    getDataNankName(arr, event) {
      let obj = {}
      obj = arr.find((item) => {
        return item.bankCode === event
      })
      return obj.bankName
    },
    selectedSubBankCode(event) {
      const bankName = this.getDataNankName(this.smallBankData, event)
      this.merchantSettleVO.subBankName = bankName
      this.merchantSettleVO.subBankCode = event
    },
    // 模糊搜索
    changeInput() {
      const bankName = this.merchantSettleVO.headBankName
      if (bankName) {
        this.listQuery.bankName = bankName
        getHeadbankList(this.listQuery).then(response => {
          this.bankData = response.data.obj.result
          this.showModel = true
        })
      }
    },
    blurInput() {
      if (!this.showModel) {
        this.$message.error('未选择开户银行总行！')
      }
    },
    // 商户性质
    merchantType(event) {
      this.merchantRetail.merchantType = event
    },
    merchantCharacter(event) {
      this.merchantRetail.merchantCharacter = event
    },

    alertBank(index, row) {
      this.merchantSettleVO.headBankCode = row.bankCode
      this.merchantSettleVO.bankName = row.bankName
      this.showModel = false
    },
    // 图片上传
    handleRemove(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      // this.param = new FormData()
      // this.param.append('file', file, file.name)
      // uploadImgUrl(this.param).then(response => {
      //   console.log(response)
      // })
    },
    handleSuccess(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.businessLicenseUrl = imgUrl
    },
    handleSuccessFace(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.idCardFaceUrl = imgUrl
    },
    handleSuccessFaceCon(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.idCardConUrl = imgUrl
    },
    handleSuccessFaceHand(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.handIdCardUrl = imgUrl
    },
    handleSuccessCertificate(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.unifiedCertificateUrl = imgUrl
    },
    handleSuccessRegister(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.taxRegisterCertificateUrl = imgUrl
    },
    handleSuccessOrgan(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.organCodeCertificateUrl = imgUrl
    },
    handleSuccessBank(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.bankOrganUrl = imgUrl
    },

    handleSuccessPhoto(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.storePhotoUrl = imgUrl
    },

    handleSuccessPhone(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.scenePhoneUrl = imgUrl
    },
    handleSuccessLicense(response) {
      const imgUrl = response.obj
      this.merchantQualificationVO.industryLicenseUrl = imgUrl
    },
    handleSuccesSettlement(response) {
      const imgUrl = response.obj
      this.merchantSettleVO.settlementCardUrl = imgUrl
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true
    },
    getImageUrl(filePath, name) {
      const params = { filePath: filePath }
      getImgUrl(params).then(response => {
        const fileList = []
        fileList.push({ url: response.obj })
        if (name === 'businessLicenseUrl') {
          this.businessLicenseUrl = response.obj
          this.fileList = fileList
        }
        if (name === 'idCardFaceUrl') {
          this.idCardFaceUrl = response.obj
          this.idCardFaceUrlList = fileList
        }
        if (name === 'idCardConUrl') {
          this.idCardConUrl = response.obj
          this.idCardConUrlList = fileList
        }
        if (name === 'settlementCardUrl') {
          this.settlementCardUrl = response.obj
          this.settlementCardUrlList = fileList
        }
        if (name === 'unifiedCertificateUrl') {
          this.unifiedCertificateUrl = response.obj
          this.unifiedCertificateUrlList = fileList
        }
        if (name === 'taxRegisterCertificateUrl') {
          this.taxRegisterCertificateUrl = response.obj
          this.taxRegisterCertificateUrlList = fileList
        }
        if (name === 'organCodeCertificateUrl') {
          this.organCodeCertificateUrl = response.obj
          this.organCodeCertificateUrlList = fileList
        }
        if (name === 'bankOrganUrl') {
          this.bankOrganUrl = response.obj
          this.bankOrganUrlList = fileList
        }
        if (name === 'storePhotoUrl') {
          this.storePhotoUrl = response.obj
          this.storePhotoUrlList = fileList
        }
        if (name === 'scenePhoneUrl') {
          this.scenePhoneUrl = response.obj
          this.scenePhoneUrlList = fileList
        }
        if (name === 'industryLicenseUrl') {
          this.industryLicenseUrl = response.obj
          this.industryLicenseUrlList = fileList
        }
        if (name === 'handIdCardUrl') {
          this.handIdCardUrl = response.obj
          this.handIdCardUrlList = fileList
        }
      })
    },
    getParams() {
      const routerParams = this.$route.query.merchantNo
      this.signHide = this.$route.query.sign
      getMerchantRetail(routerParams).then(response => {
        this.merchantRetail = response.data.merchantVO
        if (response.data.merchantQualificationVO) {
          this.merchantQualificationVO = response.data.merchantQualificationVO
          const imgUrl = response.data.merchantQualificationVO.businessLicenseUrl
          const idCardFaceUrl = response.data.merchantQualificationVO.idCardFaceUrl
          const idCardConUrl = response.data.merchantQualificationVO.idCardConUrl
          const handIdCardUrl = response.data.merchantQualificationVO.handIdCardUrl
          const unifiedCertificateUrl = response.data.merchantQualificationVO.unifiedCertificateUrl
          const taxRegisterCertificateUrl = response.data.merchantQualificationVO.taxRegisterCertificateUrl
          const organCodeCertificateUrl = response.data.merchantQualificationVO.organCodeCertificateUrl
          const bankOrganUrl = response.data.merchantQualificationVO.bankOrganUrl
          const storePhotoUrl = response.data.merchantQualificationVO.storePhotoUrl
          const scenePhoneUrl = response.data.merchantQualificationVO.scenePhoneUrl
          const industryLicenseUrl = response.data.merchantQualificationVO.industryLicenseUrl
          if (unifiedCertificateUrl) {
            this.getImageUrl(unifiedCertificateUrl, 'unifiedCertificateUrl')
          }
          if (taxRegisterCertificateUrl) {
            this.getImageUrl(taxRegisterCertificateUrl, 'taxRegisterCertificateUrl')
          }
          if (organCodeCertificateUrl) {
            this.getImageUrl(organCodeCertificateUrl, 'organCodeCertificateUrl')
          }
          if (bankOrganUrl) {
            this.getImageUrl(bankOrganUrl, 'bankOrganUrl')
          }
          if (storePhotoUrl) {
            this.getImageUrl(storePhotoUrl, 'storePhotoUrl')
          }
          if (scenePhoneUrl) {
            this.getImageUrl(scenePhoneUrl, 'scenePhoneUrl')
          }
          if (industryLicenseUrl) {
            this.getImageUrl(industryLicenseUrl, 'industryLicenseUrl')
          }
          if (imgUrl) {
            this.getImageUrl(imgUrl, 'businessLicenseUrl')
          }
          if (idCardFaceUrl) {
            this.getImageUrl(idCardFaceUrl, 'idCardFaceUrl')
          }
          if (idCardConUrl) {
            this.getImageUrl(idCardConUrl, 'idCardConUrl')
          }
          if (handIdCardUrl) {
            this.getImageUrl(handIdCardUrl, 'handIdCardUrl')
          }
        }
        if (response.data.merchantSettleVO) {
          const settlementCardUrl = response.data.merchantSettleVO.settlementCardUrl
          this.merchantSettleVO = response.data.merchantSettleVO
          if (settlementCardUrl) {
            this.getImageUrl(settlementCardUrl, 'settlementCardUrl')
          }
        }

        this.merchantNumber = response.data.merchantNumber
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
.ser-sel .has-gutter{
  display: none
}
.ser-sel button{
  border: none
}
</style>

