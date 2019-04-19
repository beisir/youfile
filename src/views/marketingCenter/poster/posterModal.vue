<template>
  <div class="body-cont">
    <el-container style="padding-top:30px;">
      <el-header>
        <el-button type="success" @click="createNew">新增模板</el-button>
      </el-header>
      <el-table v-loading.body="listLoading" :data="tableData" border style="width: 100%">
        <el-table-column prop="posterName" label="名称" width="180"/>
        <el-table-column label="示例图">
          <template slot-scope="scope">
            <img :src="uploadImgUrl + scope.row.posterExamplePath" alt="" style="width: 75px;height:160px">
          </template>
        </el-table-column>
        <el-table-column prop="usingCount" label="使用次数"/>
        <el-table-column prop="posterConfig" label="模板字符"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" round @click="delTag(scope.row)">删除</el-button>
            <el-button type="info" size="mini" round @click="updateTag(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
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
    <el-dialog :visible.sync="dialogFormVisible" title="模板">
      <el-form :model="nowItem">
        <el-form-item label="名称">
          <el-input v-model="nowItem.name"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="nowItem.sort"/>
        </el-form-item>
        <el-form-item label="模板字符串">
          <el-input v-model="nowItem.str" type="textarea"/>
        </el-form-item>
        <el-form-item label="展示图">
          <el-upload
            :limit="1"
            :on-success="handleSuccess"
            :action="uploadImgUrl+'/base/image?type=OTHER'"
            list-type="picture-card"
          >
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <img :src="dialogImageUrl" width="100%" alt>
          </el-dialog>
        </el-form-item>
        <el-row>
          <el-col :span="24" class="padding-bottom">{{ dialogShowPic }}</el-col>
        </el-row>
        <el-form-item label="背景图">
          <el-upload
            :limit="1"
            :on-success="handleSuccessBack"
            :action="uploadImgUrl+'/base/image?type=OTHER'"
            list-type="picture-card"
          >
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <img :src="dialogImageUrl" width="100%" alt>
          </el-dialog>
        </el-form-item>
        <el-row>
          <el-col :span="24" class="padding-bottom">{{ dialogShowPicBack }}</el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadModule">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPosterList, delPosterTag } from '@/api/poster'
export default {
  data() {
    return {
      uploadImgUrl: process.env.IMAGE_UPLOAD_API,
      tableData: [{}],
      dialogFormVisible: true,

      dialogImageUrl: '',
      dialogVisible: false,
      // 模板
      nowItem: {},
      // 列表
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      total: 0,
      listLoading: false,
      // 模态框
      dialogShowPic: '',
      dialogShowPicBack: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 更新
    updateTag() {

    },
    // 新建
    createNew() {
      this.dialogFormVisible = true
      this.nowItem = {}
    },
    // 删除模板
    delTag(row) {
      console.log(row)
      delPosterTag().thne(res => {

      })
    },
    getList() {
      this.listLoading = true
      getPosterList(this.listQuery).then(res => {
        this.listLoading = false
        console.log(res)
        this.total = res.obj.totalCount
        this.tableData = res.obj.result
      }).catch(e => {
        this.listLoading = false
        console.log(e)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadModule() {

    },
    handleSuccess(response, file, fileList) {
      if (response.obj) {
        this.dialogShowPic = response.obj
      }
      console.log(response, file, fileList)
    },
    handleSuccessBack(response, file, fileList) {
      if (response.obj) {
        this.dialogShowPicBack = response.obj
      }
      console.log(response, file, fileList)
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
.padding-bottom{padding-bottom: 20px;}
</style>

