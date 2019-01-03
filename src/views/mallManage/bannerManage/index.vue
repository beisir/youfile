<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
      <el-form-item label="商贸云编码">
        <el-input v-model="formInline.mallCode" placeholder="请输入商贸云编码"/>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="warning" @click="addSubmit">添加</el-button>
    </el-form>
    <el-table v-loading.body="listLoading" :data="tableData" highlight-current-row border style="width: 100%">
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="mallCode" label="商贸云编码" align="center"/>
      <el-table-column
        prop="imageUrl"
        label="banner图"
        align="center">
        <template slot-scope="scope">
          <img :src="imageUrl+scope.row.imageUrl" width="40" height="40" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column prop="click" label="是否可点击" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.click==false">不可点击</span>
          <span v-if="scope.row.click==true">可点击</span>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="跳转路径" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editMall(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogShow" :title="title">
      <el-form
        :inline="true"
        :label-width="formLabelWidth"
        :model="formData"
        :rules="rules"
        :ref="formData"
      >
        <el-form-item :label-width="formLabelWidth" label="商贸云编码" prop="mallCode">
          <el-input v-model="formData.mallCode"/>
        </el-form-item>
        <div>
          <el-form-item label="Banner" prop="imageUrl">
            <el-upload
              :on-remove="handleRemove"
              :limit="1"
              :class="{disabled:logoUrlListShow}"
              :file-list="logoList"
              :on-success="handleSuccess"
              :action="uploadImgUrl+'/base/image?type=OTHER'"
              list-type="picture-card"
            >
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item label="状态">
          <el-select v-model="formData.click" placeholder="是否可点击">
            <el-option label="全部" value="">全部</el-option>
            <el-option label="不可点击" value="false">不可点击</el-option>
            <el-option label="可点击" value="true">可点击</el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="跳转URL" prop="url">
          <el-input v-model="formData.url"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="描述" prop="url">
          <el-input v-model="formData.bannerDesc"/>
        </el-form-item>
        <el-row class="submit-btn">
          <el-button type="primary" @click="editMallMes()">确定</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getBannerList, getBannerMes, updateBanner, addBanner } from '@/api/mall'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      uploadImgUrl: process.env.IMAGE_UPLOAD_API,
      logoList: [],
      formInline: {
        mallCode: ''
      },
      isAddMall: true,
      logoUrl: '',
      logoUrlListShow: false,
      title: '编辑商贸云信息',
      formLabelWidth: '130px',
      dialogShow: false,
      listLoading: false,
      total: 0,
      tableData: [],
      formData: {},
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      rules: {
        mallCode: [
          { required: true, message: '商贸云编码不能为空', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: 'Banner不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.listQuery = this.formInline
      this.getList()
    },
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      getBannerList(this.listQuery).then(response => {
        this.tableData = response.data.result
        this.listLoading = false
      })
    },
    handleRemove(file, fileList) {
      this.formData.logo = ''
      this.logoUrlListShow = false
    },
    handleSuccess(response) {
      const logoUrl = response.obj
      this.logoUrlListShow = true
      this.formData.imageUrl = logoUrl
    },
    initData() {
      this.formData = { imageUrl: '', click: '', url: '', bannerDesc: '' }
    },
    // 编辑信息
    editMall(index, row) {
      const code = row.id
      this.dialogShow = true
      this.showCode = true
      this.initData()
      this.title = '编辑Banner信息'
      getBannerMes(code).then(response => {
        this.formData = response.data[0]
        const fileList = []
        if (response.data[0].imageUrl) {
          fileList.push({ url: this.imageUrl + response.data[0].imageUrl })
          this.logoList = fileList
          this.logoUrlListShow = true
        }
      })
    },
    editMallMes() {
      const formData = this.formData
      console.log(formData)
      this.$refs[formData].validate(valid => {
        if (valid) {
          if (this.title === '添加Banner') {
            addBanner(formData).then(response => {
              this.dialogShow = false
              this.getList()
              this.$message({
                message: response.data,
                type: 'success'
              })
            })
          } else {
            updateBanner(formData).then(response => {
              this.dialogShow = false
              this.getList()
              this.$message({
                message: response.data,
                type: 'success'
              })
            })
          }
        }
      })
    },
    addSubmit() {
      this.dialogShow = true
      this.logoUrlListShow = false
      this.initData()
      this.logoList = []
      this.title = '添加Banner'
    }
  }
}
</script>
