<template>
  <div class="body-cont">
    <el-button size="small" class="addTal" type="primary" @click="addTab(editableTabsValue2)">添加精选商品</el-button>
    <el-tabs
      v-model="editableTabsValue2"
      type="border-card"
      closable
      @tab-click="clickTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="(item) in tableData"
        :key="item.name"
        :label="item.name"
        :name="item.name"
      >
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="item.name"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="item.desc"/>
          </el-form-item>
        </el-form>
        <el-table
          v-loading.body="listLoading"
          :data="item.goodsList"
          highlight-current-row
          border
          style="width: 100%;"
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
          <el-table-column prop="onlinePay" fixed="right" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="removeData(scope.$index, scope.row )">删除</el-button>
              <el-button size="mini" type="warning" @click="addData(scope.$index, scope.row )">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-row class="submit-btn">
      <el-button type="primary" @click="editMes()">确定修改</el-button>
    </el-row>
    <el-dialog :visible.sync="dialogShow" class="el-dialog1" title="添加好物">
      <el-form v-if="isAddShow" :inline="true" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="fName"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="fDesc"/>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline border-form">
        <el-form-item label="商品名称">
          <el-input v-model="formInline.name" placeholder="请输入商品名称"/>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
        <el-table-column prop="wholesalePrice" label="批发价" align="center"/>
        <el-table-column prop="sellPrice" label="零售价" align="center"/>
        <el-table-column prop="status" label="状态" align="center">
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
        <el-button v-if="isAddShow" type="primary" @click="addgoodsMes()">确定添加</el-button>
        <el-button v-if="!isAddShow" type="primary" @click="editgoodsMes()">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { chosenGoodsList, updateSale } from '@/api/youlife'
import { unix2CurrentTime } from '@/utils'
import { getGoodsList } from '@/api/goods'
export default {
  data() {
    return {
      owner: this.Const.owner,
      imageUrl: this.Const.imageUrl,
      tableData2: [],
      fName: '',
      fDesc: '',
      isAddShow: false,
      editableTabsValue2: '0',
      tabIndex: 1,
      tabChangeIndex: '0',
      logoUrlListShow: false,
      listQuery: {
        status: 1,
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      formInline: {
        name: ''
      },
      title: '',
      formLabelWidth: '130px',
      dialogShow: false,
      listLoading: false,
      total: 0,
      tableData: [],
      formData: {},
      dataData: {},
      selectData: [],
      addIndex: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unix2CurrentTime,
    onSubmit() {
      this.listQuery = Object.assign(this.listQuery, this.formInline)
      this.listQuery.pageNum = 1
      this.getGoodsList()
    },
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      chosenGoodsList(this.owner).then(response => {
        var datas = response.data
        this.dataData = datas.data
        this.tableData = datas.show
        this.editableTabsValue2 = datas.show[0].name
        this.listLoading = false
      })
    },
    // 获取商品列表
    getGoodsList() {
      getGoodsList(this.listQuery).then(response => {
        this.total = response.data.totalCount
        this.tableData2 = response.data.result
        this.listLoading = false
      })
    },
    // 添加tab 好物
    addTab(targetName) {
      this.isAddShow = true
      this.dialogShow = true
      this.getGoodsList()
    },
    addgoodsMes() {
      const selectData = this.selectData
      const tableData = this.tableData
      tableData.push({
        name: this.fName,
        desc: this.fDesc,
        goodsList: selectData
      })
      this.tableData = tableData
      this.dialogShow = false
    },
    // 删除tab
    removeTab(targetName) {
      const tabs = this.tableData
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue2 = activeName
      this.tableData = tabs.filter(tab => tab.name !== targetName)
    },
    // 点击tab
    clickTab(tab, event) {
      this.tabChangeIndex = tab.index
      // console.log(event)
    },
    // 编辑信息
    editData(index, row) {
      this.dialogShow = true
      this.getGoodsList()
    },
    // 添加
    addData(index, row) {
      this.isAddShow = false
      this.dialogShow = true
      this.getGoodsList()
      this.addIndex = index
    },
    // 操作复选框
    handleSelectionChange(val) {
      this.selectData = val
    },
    // 删除
    removeData(index, row) {
      const tabChangeIndex = this.tabChangeIndex
      const tableData = this.tableData
      const goodsData = tableData[tabChangeIndex].goodsList
      const goodsId = tableData[tabChangeIndex].goodsList[index].id
      const goodsIds = tableData[tabChangeIndex].goodsIds
      if (goodsIds.indexOf(goodsId) >= 0) {
        goodsIds.splice(goodsIds.indexOf(goodsId), 1)
      }
      goodsData.splice(index, 1)
      tableData[tabChangeIndex].goodsIds = goodsIds
      tableData[tabChangeIndex].goodsList = goodsData
      this.tableData = tableData
    },
    // 确定添加商品
    editgoodsMes() {
      const tabChangeIndex = this.tabChangeIndex
      const selectData = this.selectData
      const addIndex = this.addIndex + 1
      const tableData = this.tableData
      const goodsList = tableData[tabChangeIndex].goodsList
      for (var i = 0; i < selectData.length; i++) {
        goodsList.splice(addIndex + i, 0, selectData[i])
      }
      tableData[tabChangeIndex].goodsList = goodsList
      this.tableData = tableData
      this.dialogShow = false
    },
    // 编辑
    editMes() {
      var data = this.dataData
      var tableData = this.tableData
      for (var i = 0; i < tableData.length; i++) {
        var goodsListData = tableData[i].goodsList
        var goodsIds = []
        for (var j = 0; j < goodsListData.length; j++) {
          goodsIds.push(goodsListData[j].id)
        }
        tableData[i].goodsIds = goodsIds
        delete tableData[i].goodsList
      }
      data.attrValue = JSON.stringify(tableData)
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
    }
  }
}
</script>

