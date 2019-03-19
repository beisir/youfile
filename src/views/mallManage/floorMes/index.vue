<template>
  <div class="bodyCont">
    <el-form :inline="true" class="demo-form-inline border-form">
      <el-button type="primary" @click="onSubmit">添加楼层</el-button>
      <el-button type="warning" @click="onBindFloor">绑定店铺</el-button>
    </el-form>
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      border
      highlight-current-row
      max-height="800"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.childList" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.childList" border style="width: 100%">
                  <el-table-column label="区域名称" prop="name" align="center"/>
                  <el-table-column label="排序" prop="sort" align="center"/>
                  <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="editCode(scope.$index, scope.row )"
                      >编辑</el-button>
                      <el-button
                        size="mini"
                        type="warning"
                        @click="removeCode(scope.$index, scope.row )"
                      >删除</el-button>
                      <el-button
                        size="mini"
                        type="warning"
                        @click="getStoreList(scope.$index,scope.row)"
                      >店铺列表</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="楼层名称" prop="name" align="center"/>
            <el-table-column label="楼层" prop="floorNum" align="center">
              <template slot-scope="scope">{{ scope.row.floorNum==0?"": scope.row.floorNum }}</template>
            </el-table-column>
            <el-table-column label="排序" prop="sort" align="center"/>
            <el-table-column label="操作" width="250" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editCode(scope.$index, scope.row )">编辑</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="removeCode(scope.$index, scope.row )"
                >删除</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="getStoreList(scope.$index,scope.row)"
                >店铺列表</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="楼座名称" prop="name" align="center"/>
      <el-table-column label="楼层" prop="floorNum" align="center">
        <template slot-scope="scope">{{ scope.row.floorNum==0?"": scope.row.floorNum }}</template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center"/>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editCode(scope.$index, scope.row )">编辑</el-button>
          <el-button size="mini" type="warning" @click="removeCode(scope.$index, scope.row )">删除</el-button>
          <el-button size="mini" type="warning" @click="getStoreList(scope.$index,scope.row)">店铺列表</el-button>
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
        <el-row v-if="headerClass">
          <el-form-item label="添加项" prop="type">
            <el-radio-group v-model="formData.type" @change="clickitem">
              <el-radio label="1">楼座</el-radio>
              <el-radio label="2">楼层</el-radio>
              <el-radio label="3">区域</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-form-item
          v-if="headerClass"
          :label-width="formLabelWidth"
          label="商贸云编码"
          prop="mallCode"
        >
          <el-input v-model="mallCode" disabled="disabled"/>
        </el-form-item>
        <el-form-item v-if="oneClass" label="选择楼座" prop="rootCode">
          <el-select
            :label-width="formLabelWidth"
            v-model="formData.rootCode"
            placeholder="请选择"
            @change="changeOneClass($event)"
          >
            <el-option
              v-for="item in tableData"
              :label="item.name"
              :value="item.code"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="twoClass" label="选择楼层" prop="parentCode">
          <el-select
            :label-width="formLabelWidth"
            v-model="formData.parentCode"
            placeholder="请选择"
            @change="changeTwoClass($event)"
          >
            <el-option
              v-for="item in childList"
              :label="item.floorNum"
              :value="item.code"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="twoshowClass" :label-width="formLabelWidth" label="楼层" prop="floorNum">
          <el-input v-model="formData.floorNum"/>
        </el-form-item>
        <el-form-item
          v-if="formData.floorNum!=0 && editShowFloor"
          :label-width="formLabelWidth"
          label="楼层"
          prop="floorNum"
        >
          <el-input v-model="formData.floorNum" disabled="disabled"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="名称" prop="name">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="排序" prop="sort">
          <el-input v-model="formData.sort" type="number"/>
        </el-form-item>
      </el-form>
      <el-row class="submit-btn">
        <el-button type="primary" @click="addClass">确 定</el-button>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="storeNameShow" title="绑定店铺">
      <el-form :inline="true" :model="storeInfo" :label-width="formLabelWidth" class="storeInfo">
        <el-form-item :label-width="formLabelWidth" label="店铺名称：" required>
          <el-input v-model="storeName"/>
        </el-form-item>
        <div v-if="storeInfoShow">
          <el-form-item :label-width="formLabelWidth" label="店铺名称">
            <el-input v-model="storeInfo.name" disabled="disabled"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="手机号：">
            <el-input v-model="storeInfo.phone" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="店铺性质：">
            <el-select v-model="storeInfo.storeNature" placeholder="请选择" disabled="disabled">
              <el-option label="请选择" value>请选择</el-option>
              <el-option label="新批零" value="1">新批零</el-option>
              <el-option label="新零售" value="2">新零售</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="店铺logo：">
            <img :src="imageUrl+storeInfo.logo" width="40" height="40" class="head_pic">
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="经营范围：">
            <el-input v-model="storeInfo.businessScope" disabled="disabled"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="店铺地址：">
            <el-input v-model="storeInfo.address" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="楼座：">
            <el-select
              :label-width="formLabelWidth"
              v-model="floorInfo.balconyCode"
              placeholder="请选择"
              @change="changeOneClass($event)"
            >
              <el-option label="暂无选择" value="0">暂无选择</el-option>
              <el-option
                v-for="item in tableData"
                :label="item.name"
                :value="item.code"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="楼层：">
            <el-select
              :label-width="formLabelWidth"
              v-model="floorInfo.floorCode"
              placeholder="请选择"
              @change="changeTwoClass($event)"
            >
              <el-option label="暂无选择" value="0">暂无选择</el-option>
              <el-option
                v-for="item in childList"
                :label="item.floorNum"
                :value="item.code"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="区域：">
            <el-select
              :label-width="formLabelWidth"
              v-model="floorInfo.floorAreaCode"
              placeholder="请选择"
              @change="changeFloorArea($event,true)"
            >
              <el-option label="暂无选择" value="0">暂无选择</el-option>
              <el-option
                v-for="item in childAreaList"
                :label="item.name"
                :value="item.code"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="门牌号：">
            <el-input v-model="floorInfo.storeDoorNum"/>
          </el-form-item>
        </div>
      </el-form>
      <el-row class="submit-btn">
        <el-button type="primary" @click="bindStore">确 定</el-button>
        <el-button v-if="bindStoreShow" type="primary" @click="editStoreFloor">保存</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  getFloorList,
  saveFloor,
  getFloorDetails,
  updateloor,
  deteleFloor,
  getFloorInfo,
  editStoreFloor
} from '@/api/mall'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      mallCode: '',
      title: '添加楼层',
      bindStoreShow: false,
      addClassData: false,
      className: '',
      sort: '0',
      dialogShow: false,
      formLabelWidth: '130px',
      listLoading: false,
      tableData: [],
      childList: [],
      oneClass: true,
      headerClass: true,
      twoClass: true,
      twoshowClass: true,
      defaultProps: {
        children: 'childList',
        label: 'name'
      },
      formData: {
        type: '',
        name: '',
        parentCode: '',
        mallCode: '',
        sort: ''
      },
      rules: {
        name: [
          { required: true, message: '楼层名称不能为空', trigger: 'blur' }
        ],
        floorNum: [
          { required: true, message: '楼层名称不能为空', trigger: 'blur' }
        ],
        sort: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '添加项不能为空', trigger: 'blur' }],
        rootCode: [
          { required: true, message: '楼座信息不能为空', trigger: 'blur' }
        ],
        parentCode: [
          { required: true, message: '楼层信息不能为空', trigger: 'blur' }
        ],
        mallCode: [
          { required: true, message: '商贸云编码不能为空', trigger: 'blur' }
        ]
      },
      storeName: '',
      storeNameShow: false,
      floorInfo: {},

      storeInfo: {},
      storeInfoShow: false,
      childAreaList: [],
      editShowFloor: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unix2CurrentTime,
    handleNodeClick(data) {},
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      this.mallCode = this.$route.query.mallCode
      getFloorList(this.mallCode).then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    removeCode(index, row) {
      var code = row.code
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deteleFloor(code).then(response => {
            this.getList()
            this.$message({
              type: 'success',
              message: response.msg
            })
          })
        })
        .catch(() => {})
    },
    // 查看店铺列表
    getStoreList(index, row) {
      var code = row.code
      this.$router.push({
        path: '/floorMes/floorStoreList',
        query: {
          floorCode: code
        }
      })
    },
    // 绑定店铺
    onBindFloor() {
      this.storeNameShow = true
      this.storeInfoShow = false
      this.bindStoreShow = false
    },
    bindStore() {
      const storeName = this.storeName
      this.bindStoreShow = true
      if (storeName) {
        const data = { name: storeName }
        getFloorInfo(data).then(response => {
          const floorInfo = response.data.floorInfo
          this.storeInfo = response.data.store
          this.storeInfoShow = true
          if (floorInfo) {
            this.floorInfo = response.data.floorInfo
            const eventCode = floorInfo.balconyCode
            const floorCode = floorInfo.floorCode
            this.changeFloor(eventCode)
            this.changeTwoClass(floorCode, false)
          } else {
            this.floorInfo = {
              balconyCode: '0',
              floorCode: '0',
              floorAreaCode: '0',
              storeDoorNum: '',
              mallCode: this.mallCode,
              storeId: response.data.store.id
            }
          }
        })
      } else {
        this.$message({
          message: '请输入店铺名称！',
          type: 'warning'
        })
      }
    },
    editStoreFloor() {
      const floorInfo = this.floorInfo
      floorInfo.mallCode = this.mallCode
      editStoreFloor(floorInfo).then(response => {
        this.$message({
          type: 'success',
          message: response.msg
        })
        this.getList()
        this.storeNameShow = false
        this.floorInfo = {}
        this.storeInfo = {}
      })
    },
    // 编辑分类
    editCode(index, row) {
      var code = row.code
      this.headerClass = false
      this.oneClass = false
      this.twoClass = false
      this.initFormData()
      this.title = '编辑楼层'
      this.addClassData = true
      this.editShowFloor = true
      this.twoshowClass = false
      getFloorDetails(code).then(response => {
        this.formData = response.data
        this.dialogShow = true
      })
    },
    initFormData() {
      this.formData = {
        type: '',
        name: '',
        parentCode: '',
        sort: '',
        mallCode: ''
      }
    },
    // 添加楼层
    onSubmit() {
      this.addClassData = false
      this.dialogShow = true
      this.title = '添加楼层'
      this.editShowFloor = false
      this.isShowAdd = true
      this.headerClass = true
      this.initFormData()
    },
    addClass() {
      this.formData.mallCode = this.mallCode
      const formData = this.formData
      const type = formData.type
      const isShowAdd = this.addClassData
      this.$refs[formData].validate(valid => {
        if (valid) {
          var params
          if (isShowAdd) {
            params = formData
          } else {
            params = {
              type: type,
              name: formData.name,
              sort: formData.sort,
              mallCode: formData.mallCode
            }
          }
          if (type === '1') {
            params.parentCode = '0'
          } else if (type === '2') {
            params.parentCode = formData.rootCode
            params.floorNum = formData.floorNum
          } else {
            params.parentCode = formData.parentCode
          }
          delete params['rootCode']
          if (isShowAdd) {
            updateloor(params).then(response => {
              this.getList()
              this.dialogShow = false
              this.$message({
                type: 'success',
                message: '编辑成功!'
              })
            })
          } else {
            saveFloor(params).then(response => {
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
      if (e === '1') {
        this.oneClass = false
        this.twoClass = false
        this.twoshowClass = false
      } else if (e === '2') {
        this.oneClass = true
        this.twoClass = false
        this.twoshowClass = true
      } else {
        this.oneClass = true
        this.twoshowClass = false
        this.twoClass = true
      }
      this.formData.type = e
    },
    // change楼座 信息
    changeFloor(event) {
      const tableData = this.tableData
      for (var i = 0; i < tableData.length; i++) {
        if (tableData[i].code === event) {
          this.childList = tableData[i].childList
        }
      }
    },
    changeOneClass(event) {
      this.formData.rootCode = event
      this.changeFloor(event)
      this.floorInfo.balconyCode = event
      this.floorInfo.floorCode = '0'
      this.floorInfo.floorAreaCode = '0'
    },
    changeTwoClass(event, isNotInit) {
      this.formData.parentCode = event
      const childList = this.childList
      for (var i = 0; i < childList.length; i++) {
        if (childList[i].code === event) {
          this.childAreaList = this.childList[i].childList
        }
      }
      this.floorInfo.floorCode = event
      if (isNotInit) {
        this.floorInfo.floorAreaCode = '0'
      }
    },
    changeFloorArea(event) {
      this.floorInfo.floorAreaCode = event
    }
  }
}
</script>
<style>
.custom-tree-node td {
  width: 240px;
  border: 1px solid #ebeef5;
  border-right: 0;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-bottom: 0;
}
.el-tree-node:focus > .el-tree-node__content {
  background: #fff;
}
.custom-tree-node > td {
  background: #ebeef5;
}
.el-tree-node__content {
  height: 50px;
}
.custom-tree-node tr:hover {
  background-color: #f5f7fa;
}
.custom-tree-node tr td:last-child {
  border-right: 1px solid #ebeef5;
}
.el-tree-node__content > .el-tree-node__expand-icon {
  padding: 19px 10px;
  border-top: 1px solid #ebeef5;
}
.tree-header tr td {
  font-weight: bold;
  font-size: 14px;
  color: #909399;
}
.el-tree-node__content:hover,
.el-tree-node is-focusable {
  background: #fff;
}
.bodyCont {
  margin: 30px;
  border: 1px solid #ebeef5;
  border-top: 0;
  border-right: 0;
}
.storeInfo .el-form-item--medium .el-form-item__content,
.storeInfo .el-form-item--medium .el-form-item__label {
  width: 200px;
}
</style>

