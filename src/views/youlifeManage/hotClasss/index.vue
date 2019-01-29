<template>
  <div class="body-cont">
    <!-- <el-form :inline="true" class="demo-form-inline border-form">
      <el-button type="warning" @click="addSubmit">添加推荐好物</el-button>
    </el-form>-->
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      highlight-current-row
      border
      style="width: 100%;margin-top:30px"
    >
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="name" width="270" label="分类名称" align="center"/>
      <el-table-column prop="imageUrl" label="主图" align="center">
        <template slot-scope="scope">
          <img :src="imageUrl+scope.row.imageUrl" width="40" height="40" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column prop="categoryCode" label="分类编码" align="center"/>
      <el-table-column prop="onlinePay" label="操作" fixed="right" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editData(scope.$index, scope.row )">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogShow" class="el-dialog1" title="编辑信息">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择分类：">
          <el-select
            v-model="categoryCode"
            placeholder="请选择"
            @change="handleSelectionChange($event)"
          >
            <el-option
              v-for="item in formData"
              :label="item.name"
              :value="item.categoryCode"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="图片：">
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
      </el-form>
      <el-row class="submit-btn">
        <el-button type="primary" @click="editMes()">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { hotClassList, updateSale, getClassList } from '@/api/youlife'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      owner: this.Const.owner,
      imageUrl: this.Const.imageUrl,
      uploadImgUrl: process.env.IMAGE_UPLOAD_API,
      categoryCode: '',
      cateIndex: '',
      logoList: [],
      logoUrl: '',
      logoUrlListShow: false,
      formInline: {
        owner: '',
        ownerType: '',
        attrName: ''
      },
      title: '',
      formLabelWidth: '130px',
      dialogShow: false,
      listLoading: false,
      tableData: [],
      formData: [],
      dataData: {},
      showData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unix2CurrentTime,
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      hotClassList(this.owner).then(response => {
        var datas = response.data
        this.showData = datas.show
        this.dataData = datas.data
        this.tableData = datas.show
        this.listLoading = false
      })
      // 获取分类列表
      getClassList(0).then(response => {
        this.formData = response.data
      })
    },
    // 编辑信息
    editData(index, row) {
      this.categoryCode = row.categoryCode
      this.cateIndex = index
      const fileList = []
      fileList.push({ url: this.imageUrl + row.imageUrl })
      this.logoList = fileList
      this.logoUrlListShow = true
      this.dialogShow = true
    },
    handleRemove(file, fileList) {
      this.logoUrlListShow = false
    },
    // 上传图片成功
    handleSuccess(response) {
      const logoUrl = response.obj
      this.logoUrlListShow = true
      var showData = this.showData
      var cateIndex = this.cateIndex
      showData[cateIndex].imageUrl = logoUrl
      this.showData = showData
    },
    // 下拉选择
    getDataName(arr, event) {
      let obj = {}
      obj = arr.find(item => {
        return item.categoryCode === event
      })
      return obj.name
    },
    handleSelectionChange(event) {
      const formData = this.formData
      const name = this.getDataName(formData, event)
      var showData = this.showData
      var cateIndex = this.cateIndex
      showData[cateIndex].name = name
      showData[cateIndex].categoryCode = event
      this.showData = showData
    },
    editMes() {
      var data = this.dataData
      var showData = this.showData
      data.attrValue = JSON.stringify(showData)
      updateSale(data).then(response => {
        this.$message({
          type: 'success',
          message: response.data
        })
        this.dialogShow = false
        this.getList()
      })
    },
    /**
     * 改变每页数量
     * @param size 页大小
     */
    handleSizeChange(size) {
      this.listQuery.pageSize = size
      this.listQuery.pageNum = 1
      this.getGoodsList()
    },

    /**
     * 改变页码
     * @param page 页号
     */
    handleCurrentChange(page) {
      this.listQuery.pageNum = page
      this.getGoodsList()
    },
    addSubmit() {
      this.dialogShow = true
      this.logoUrlListShow = false
      this.initData()
      this.logoList = []
      this.title = '添加配置'
    }
  }
}
</script>
<style>
.el-text .el-textarea__inner {
  width: 400px;
  min-height: 100px !important;
}
.el-dialog1 .el-dialog {
  width: 80%;
  margin-top: 10vh !important;
}
</style>

