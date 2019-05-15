<template>
  <div class="bodyCont">
    <el-form :inline="true" class="demo-form-inline border-form">
      <el-button type="primary" @click="onSubmit">添加分类</el-button>
    </el-form>
    <el-table :data="tableData" :row-key="getRowKeys" :expand-row-keys="expands" highlight-current-row border max-height="800" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.subGoodsCategoryList"
            :row-key="getRowKeys"
            :expand-row-keys="expands2"
            highlight-current-row
            border
            max-height="800"
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  :data="props.row.subGoodsCategoryList"
                  highlight-current-row
                  border
                  max-height="800"
                  style="width: 100%"
                >
                  <el-table-column label="分类名称" prop="name" align="center"/>
                  <el-table-column label="分类编码" prop="categoryCode" align="center"/>
                  <el-table-column label="排序" prop="sort" align="center"/>
                  <el-table-column label="创建时间" prop="createDate" align="center">
                    <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
                  </el-table-column>
                  <el-table-column label="更新时间" prop="updateDate" align="center">
                    <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
                  </el-table-column>
                  <el-table-column label="操作" width="320" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="editCode(scope.$index,scope.row)"
                      >编辑</el-button>
                      <el-button
                        size="mini"
                        type="warning"
                        @click="removeCode(scope.$index,scope.row)"
                      >删除</el-button>
                      <el-button
                        size="mini"
                        type="info"
                        @click="bindClass(scope.$index,scope.row)"
                      >绑定</el-button>
                      <el-button
                        size="mini"
                        type="success"
                        @click="showBindList(scope.$index,scope.row)"
                      >查看绑定</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="分类名称" prop="name" align="center"/>
            <el-table-column label="分类编码" prop="categoryCode" align="center"/>
            <el-table-column label="排序" prop="sort" align="center"/>
            <el-table-column label="创建时间" prop="createDate" align="center">
              <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updateDate" align="center">
              <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editCode(scope.$index,scope.row)">编辑</el-button>
                <el-button size="mini" type="warning" @click="removeCode(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" prop="name" align="center"/>
      <el-table-column label="分类编码" prop="categoryCode" align="center"/>
      <el-table-column label="排序" prop="sort"/>
      <el-table-column label="创建时间" prop="createDate" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createDate) }}</template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateDate" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateDate) }}</template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editCode(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="removeCode(scope.$index,scope.row)">删除</el-button>
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
        <el-row>
          <el-form-item label="分类等级" prop="level">
            <el-radio-group v-model="formData.level" @change="clickitem">
              <el-radio label="ONE">一级分类</el-radio>
              <el-radio label="TWO">二级分类</el-radio>
              <el-radio label="THREE">三级分类</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-form-item :label-width="formLabelWidth" label="分类名称" prop="name">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item v-if="oneClass" label="选择一级分类" prop="rootCode">
          <el-select
            :label-width="formLabelWidth"
            v-model="formData.rootCode"
            placeholder="请选择"
            @change="changeOneClass($event)"
          >
            <el-option
              v-for="item in tableData"
              :label="item.name"
              :value="item.categoryCode"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="twoClass" label="选择二级分类" prop="parentCategoryCode">
          <el-select
            :label-width="formLabelWidth"
            v-model="formData.parentCategoryCode"
            placeholder="请选择"
            @change="changeTwoClass($event)"
          >
            <el-option
              v-for="item in subGoodsCategoryList"
              :label="item.name"
              :value="item.categoryCode"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="排序" prop="sort">
          <el-input v-model="formData.sort" type="number"/>
        </el-form-item>
        <div>
          <el-form-item label="图片" class="cove-img">
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
        <el-button type="primary" @click="addClass">确 定</el-button>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="showMall" :title="name">
      <el-form :inline="true" :label-width="formLabelWidth">
        <el-row>
          <el-form-item label="选择商贸云" required>
            <el-select :label-width="formLabelWidth" v-model="mallName" @change="alertMall($event)">
              <el-option
                v-for="item in mallList"
                :label="item.name"
                :value="item.code"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="选择一级分类">
            <el-select
              :label-width="formLabelWidth"
              v-model="mallCName"
              @change="changeClass($event)"
            >
              <el-option
                v-for="item in mallClassData"
                :label="item.name"
                :value="item"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="选择二级分类">
            <el-select
              :label-width="formLabelWidth"
              v-model="mallCtName"
              @change="changeTClass($event)"
            >
              <el-option
                v-for="item in mallTClassData"
                :label="item.name"
                :value="item"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="选择三级分类" required>
            <el-select
              :label-width="formLabelWidth"
              v-model="mallCthName"
              @change="changeThClass($event)"
            >
              <el-option
                v-for="item in mallThClassData"
                :label="item.name"
                :value="item"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="submit-btn">
          <el-button type="primary" @click="addBind">确 定</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="showBindDialog" title="绑定列表">
      <el-table
        :data="bindTableData"
        highlight-current-row
        border
        max-height="800"
        style="width: 100%"
      >
        <el-table-column label="商贸城名称" prop="mallName" align="center"/>
        <el-table-column label="商贸云编码" prop="mallCode" align="center"/>
        <el-table-column label="一级分类名称" prop="oneCategoryName" align="center"/>
        <el-table-column label="二级分类名称" prop="twoCategoryName" align="center"/>
        <el-table-column label="三级分类名称" prop="threeCategoryName" align="center"/>
        <el-table-column label="三级分类编码" prop="threeCategoryCode" align="center"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="unbind(scope.row)">解除绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import {
  getClassList,
  deteleClass,
  getClassDetails,
  saveClass,
  updateClass,
  bindClass
} from '@/api/goods'
import { unix2CurrentTime } from '@/utils'
import { getList, getClassList as getMClassList } from '@/api/mall'
import { getbindList, delbind } from '@/api/goods'
export default {
  data() {
    return {
      title: '添加分类',
      name: '绑定商贸云分类',
      showMall: false,
      mallList: [],
      mallName: '',
      mallCName: '',
      mallCtName: '',
      mallCthName: '',
      mallClassData: [],
      mallTClassData: [],
      mallThClassData: [],
      updateData: {
        mallCategoryCode: '',
        mallCode: '',
        platformCategoryCode: ''
      },
      uploadImgUrl: process.env.IMAGE_UPLOAD_API,
      logoUrlListShow: false,
      addClassData: false,
      className: '',
      logoUrl: '',
      sort: '0',
      dialogShow: false,
      formLabelWidth: '130px',
      listLoading: false,
      parentCategoryCode: 0,
      logoList: [],
      tableData: [],
      subGoodsCategoryList: [],
      oneClass: true,
      twoClass: true,
      defaultProps: {
        children: 'subGoodsCategoryList',
        label: 'name'
      },
      formData: {
        level: '',
        name: '',
        parentCategoryCode: '',
        rootCode: '',
        sort: ''
      },
      nameInit: '',
      rules: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        sort: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
        level: [
          { required: true, message: '分类等级不能为空', trigger: 'blur' }
        ],
        rootCode: [
          { required: true, message: '一级分类不能为空', trigger: 'blur' }
        ],
        parentCategoryCode: [
          { required: true, message: '二级分类不能为空', trigger: 'blur' }
        ]
      },
      // 绑定弹窗
      showBindDialog: false,
      bindTableData: [],
      // 展开行
      // 获取row的key值
      getRowKeys(row) {
        return row.categoryCode
      },
      expands: [],
      expands2: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 查看绑定
    getBindList(code) {
      var categoryCode = code
      this.listLoading = true
      getbindList(categoryCode).then(response => {
        console.log(response.data)
        var tempList = response.data ? response.data : []
        var map = {}
        var dest = []
        var tableData = []
        for (var i = 0; i < tempList.length; i++) {
          var ai = tempList[i]
          if (!map[ai.mallName]) {
            dest.push({
              initial: ai.mallName,
              busInfoList: [ai]
            })
            map[ai.mallName] = ai
          } else {
            for (var j = 0; j < dest.length; j++) {
              var dj = dest[j]
              if (dj.initial === ai.mallName) {
                dj.busInfoList.push(ai)
                break
              }
            }
          }
        }
        for (var h = 0; h < dest.length; h++) {
          Array.prototype.push.apply(tableData, dest[h].busInfoList)
        }
        console.log(tableData)
        this.bindTableData = tableData
        this.listLoading = false
        // this.rowspan()
      })
    },
    // 解除绑定
    unbind(data) {
      delbind({
        platformCategoryCode: this.unbindCode,
        mallCode: data.mallCode,
        mallCategoryCode: data.threeCategoryCode
      }).then(res => {
        // this.getList()
        this.$message({ message: res.msg, type: 'success' })
        this.showBindDialog = false
      }).catch(e => {
        console.log(e)
      })
    },
    unix2CurrentTime,
    handleNodeClick(data) {},
    handleRemove(file, fileList) {
      this.formData.logo = ''
      this.logoUrlListShow = false
    },
    handleSuccess(response) {
      const logoUrl = response.obj
      this.logoUrlListShow = true
      this.formData.imgUrl = logoUrl
    },
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      getClassList(this.parentCategoryCode).then(response => {
        this.tableData = response.data
        this.listLoading = false

        if (this.editItem) {
          if (this.editItem.level === 'THREE') {
            this.expands = [this.editItem.rootCode]
            this.expands2 = [this.editItem.parentCategoryCode]
          }
          if (this.editItem.level === 'TWO') {
            this.expands = [this.editItem.parentCategoryCode]
          }
          this.editItem = ''
        } else {
          this.expands = []
          this.expands2 = []
        }
      })
    },
    removeCode(index, row) {
      var categoryCode = row.categoryCode
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deteleClass(categoryCode).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {})
    },
    // 编辑分类
    editCode(index, row) {
      var categoryCode = row.categoryCode
      this.initFormData()
      this.title = '编辑分类'
      this.addClassData = true
      getClassDetails(categoryCode).then(response => {
        this.editItem = response.data
        const parentCategoryCode = response.data.parentCategoryCode
        this.formData = response.data
        this.nameInit = response.data.name
        this.dialogShow = true
        const fileList = []
        if (response.data.imageUrl) {
          fileList.push({ url: this.imageUrl + response.data.imageUrl })
          this.logoList = fileList
          this.logoUrlListShow = true
        }
        if (parentCategoryCode === '0') {
          this.oneClass = false
          this.twoClass = false
        } else {
          if (response.data.rootCode === '') {
            this.oneClass = true
            this.twoClass = false
            this.formData.rootCode = response.data.parentCategoryCode
          } else {
            this.oneClass = true
            this.twoClass = true
            this.formData.rootCode = response.data.rootCode
            this.changeOneClass(response.data.rootCode)
            this.formData.parentCategoryCode = response.data.parentCategoryCode
          }
        }
      })
    },
    initFormData() {
      this.formData = {
        level: '',
        name: '',
        parentCategoryCode: '',
        rootCode: '',
        sort: ''
      }
    },
    // 添加分类
    onSubmit() {
      this.dialogShow = true
      this.title = '添加分类'
      this.addClassData = false
      this.initFormData()
    },
    addClass() {
      const formData = this.formData
      const level = formData.level
      const isShowAdd = this.addClassData
      this.$refs[formData].validate(valid => {
        if (valid) {
          var params
          if (isShowAdd) {
            params = formData
          } else {
            params = {
              level: level,
              name: formData.name,
              sort: formData.sort
            }
          }
          if (level === 'ONE') {
            params.parentCategoryCode = '0'
          } else if (level === 'TWO') {
            params.parentCategoryCode = formData.rootCode
          } else {
            params.rootCode = formData.rootCode
            params.parentCategoryCode = formData.parentCategoryCode
          }
          if (isShowAdd) {
            if (params.name === this.nameInit) {
              delete params['name']
            }
            updateClass(params).then(response => {
              this.getList()
              this.dialogShow = false
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
            })
          } else {
            saveClass(params).then(response => {
              this.getList()
              this.dialogShow = false
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
            })
          }
        }
      })
    },
    clickitem(e) {
      this.formData.parentCategoryCode = ''
      this.formData.rootCode = ''
      if (e === 'ONE') {
        this.oneClass = false
        this.twoClass = false
      } else if (e === 'TWO') {
        this.oneClass = true
        this.twoClass = false
      } else {
        this.oneClass = true
        this.twoClass = true
      }
      this.formData.level = e
    },
    changeOneClass(event) {
      this.formData.rootCode = event
      const tableData = this.tableData
      for (var i = 0; i < tableData.length; i++) {
        if (tableData[i].categoryCode === event) {
          this.subGoodsCategoryList = tableData[i].subGoodsCategoryList
        }
      }
    },
    changeTwoClass(event) {
      this.formData.parentCategoryCode = event
    },
    // 绑定商贸云分类
    bindClass(index, row) {
      var categoryCode = row.categoryCode
      this.updateData.platformCategoryCode = categoryCode
      this.showMall = true
      getList().then(res => {
        this.mallList = res.data
      })
    },
    // 选择商贸云
    alertMall(e) {
      this.updateData.mallCode = e
      getMClassList(e).then(res => {
        this.mallClassData = res.data
      })
    },
    // 选择分类
    changeClass(event) {
      this.mallCName = event.name
      this.mallTClassData = event.subCategoryList
    },
    changeTClass(event) {
      this.mallCtName = event.name
      this.mallThClassData = event.subCategoryList
    },
    changeThClass(event) {
      this.mallCthName = event.name
      this.updateData.mallCategoryCode = event.categoryCode
    },
    // 初始化绑定数据
    initFromBind() {
      this.updateData.mallCategoryCode = ''
      this.mallCode.mallCategoryCode = ''
      this.platformCategoryCode.mallCategoryCode = ''
    },
    // 绑定商贸云分类
    addBind() {
      var updateData = this.updateData
      bindClass(updateData).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.showMall = false
        this.mallName = ''
        this.mallCName = ''
        this.mallCtName = ''
        this.mallCthName = ''
        this.initFromBind()
      })
    },
    // 查看绑定列表
    showBindList(index, row) {
      var categoryCode = row.categoryCode
      this.showBindDialog = true
      this.unbindCode = categoryCode
      this.getBindList(categoryCode)
      // this.$router.push({
      //   path: '/goods/bindList',
      //   query: {
      //     categoryCode: categoryCode
      //   }
      // })
    }
  }
}
</script>
<style>
.bodyCont {
  margin: 30px;
  border: 1px solid #ebeef5;
  border-top: 0;
  border-right: 0;
}
</style>

