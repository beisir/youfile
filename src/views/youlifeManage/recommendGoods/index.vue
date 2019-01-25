<template>
  <div class="body-cont">
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      highlight-current-row
      border
      style="width: 100%;margin-top:30px"
    >
      <el-table-column type="index" width="50" label="序号" align="center"/>
      <el-table-column prop="name" width="350" label="商品名称" align="center"/>
      <el-table-column prop="mainImgUrl" label="主图" align="center">
        <template slot-scope="scope">
          <img :src="imageUrl+scope.row.mainImgUrl" width="40" height="40" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column prop="wholesalePrice" width="120" label="批发价" align="center"/>
      <el-table-column prop="sellPrice" width="120" label="零售价" align="center"/>
      <el-table-column prop="status" width="120" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0" style="color: #E6A23C">待上架</span>
          <span v-if="scope.row.status==1" style="color: #67C23A">上架中</span>
          <span v-if="scope.row.status==2" style="color: #43E0D6">已下架</span>
          <span v-if="scope.row.status==3" style="color: #670ACE">部分上架</span>
          <span v-if="scope.row.status==4" style="color: #E73E48">没有库存</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" width="170" label="创建时间" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
      </el-table-column>
      <el-table-column prop="updateDate" width="170" label="更新时间" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
      </el-table-column>
      <el-table-column prop="onlinePay" label="操作" fixed="right" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editData(scope.$index, scope.row )">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogShow" class="el-dialog1" title="编辑信息">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="fName"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="fDesc"/>
        </el-form-item>
        <div>
          <el-form-item class="cove-img" label="主 图：">
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
      <el-table
        ref="multipleTable"
        :data="tableData2"
        highlight-current-row
        border
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column prop="name" width="350" label="商品名称" align="center"/>
        <el-table-column prop="mainImgUrl" label="主图" align="center">
          <template slot-scope="scope">
            <img :src="imageUrl+scope.row.mainImgUrl" width="40" height="40" class="head_pic">
          </template>
        </el-table-column>
        <el-table-column prop="wholesalePrice" width="120" label="批发价" align="center"/>
        <el-table-column prop="sellPrice" width="120" label="零售价" align="center"/>
        <el-table-column prop="status" width="120" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0" style="color: #E6A23C">待上架</span>
            <span v-if="scope.row.status==1" style="color: #67C23A">上架中</span>
            <span v-if="scope.row.status==2" style="color: #43E0D6">已下架</span>
            <span v-if="scope.row.status==3" style="color: #670ACE">部分上架</span>
            <span v-if="scope.row.status==4" style="color: #E73E48">没有库存</span>
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
      <el-row class="submit-btn">
        <el-button type="primary" @click="editMes()">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { recommendList, updateSale } from '@/api/youlife'
import { unix2CurrentTime } from '@/utils'
import { getGoodsList } from '@/api/goods'
export default {
  data() {
    return {
      owner: this.Const.owner,
      imageUrl: this.Const.imageUrl,
      uploadImgUrl: process.env.IMAGE_UPLOAD_API,
      tableData2: [],
      logoList: [],
      logoUrlListShow: false,
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      formInline: {
        owner: '',
        ownerType: '',
        attrName: ''
      },
      title: '',
      formLabelWidth: '130px',
      dialogShow: false,
      listLoading: false,
      total: 0,
      tableData: [],
      formData: {},
      dataData: {},
      showData: [],
      selectData: [],
      fName: '',
      fDesc: ''
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
      recommendList(this.owner).then(response => {
        var datas = response.data
        this.showData = datas.show
        this.dataData = datas.data
        this.tableData = datas.show[0].goodsList
        this.listLoading = false
      })
    },
    // 获取商品列表
    getGoodsList() {
      getGoodsList(this.listQuery).then(response => {
        this.listLoading = false
        this.total = response.data.totalCount
        const tableData2 = response.data.result
        this.tableData2 = tableData2
        var dataObj = this.showData[0]['goodsList']
        var _this = this
        window.setTimeout(function() {
          for (var i = 0; i < dataObj.length; i++) {
            const goodsId = dataObj[i].id
            for (var j = 0; j < tableData2.length; j++) {
              if (goodsId === tableData2[j].goodsId) {
                _this.toggleSelection([tableData2[j]])
              }
            }
          }
        }, 500)
      })
    },
    // 选中已经选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 编辑信息
    editData(index, row) {
      this.dialogShow = true
      this.fDesc = this.showData[0].desc
      this.fName = this.showData[0].name
      const fileList = []
      var imageUrl = this.showData[0].imageUrl
      fileList.push({ url: this.imageUrl + imageUrl })
      this.logoList = fileList
      this.logoUrlListShow = true
      this.getGoodsList()
    },
    handleRemove(file, fileList) {
      this.logoUrlListShow = false
    },
    // 上传图片成功
    handleSuccess(response) {
      const logoUrl = response.obj
      this.logoUrlListShow = true
      var showData = this.showData
      showData[0].imageUrl = logoUrl
      this.showData = showData
    },
    // 操作复选框
    handleSelectionChange(val) {
      this.selectData = val
    },
    editMes() {
      var val = this.selectData
      var goodsIds = this.showData[0].goodsIds
      for (var i = 0; i < val.length; i++) {
        if (goodsIds.indexOf(val[i].goodsId) === -1) {
          goodsIds.push(val[i].goodsId)
        }
      }
      var data = this.dataData
      var showData = this.showData
      showData[0].goodsIds = goodsIds
      showData[0].desc = this.fDesc
      showData[0].name = this.fName
      delete showData[0].goodsList
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

