<template>
  <div class="body-cont">
    <el-button size="small" class="addTal" type="primary" @click="addTab(editableTabsValue2)">添加精选店铺</el-button>
    <el-tabs
      v-model="editableTabsValue2"
      type="border-card"
      closable
      @tab-click="clickTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="(item) in tableData"
        :key="item.laberName"
        :label="item.laberName"
        :name="item.laberName"
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
          :data="item.storeGoodsList"
          highlight-current-row
          border
          style="width: 100%;"
        >
          <el-table-column type="index" width="50" label="序号" align="center"/>
          <el-table-column prop="store" label="店铺名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.store.name }}
            </template>
          </el-table-column>
          <el-table-column prop="store" label="店铺logo" align="center">
            <template slot-scope="scope">
              <img :src="imageUrl+scope.row.store.logo" width="40" height="40" class="head_pic">
            </template>
          </el-table-column>
          <el-table-column prop="store" label="店铺性质" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.store.storeNature=='2'" style="color: #E6A23C">零售店</span>
              <span v-if="scope.row.store.storeNature=='1'" style="color: #67C23A">批零店</span>
            </template>
          </el-table-column>
          <el-table-column prop="store" label="经营范围" align="center">
            <template slot-scope="scope">
              {{ scope.row.store.businessScope }}
            </template>
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
        max-height="500"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column prop="name" label="店铺名称" align="center"/>
        <el-table-column prop="phone" label="手机号" align="center"/>
        <el-table-column prop="logo" label="店铺logo" align="center">
          <template slot-scope="scope">
            <img :src="imageUrl+scope.row.logo" width="40" height="40" class="head_pic">
          </template>
        </el-table-column>
        <el-table-column prop="storeNature" label="店铺性质" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.storeNature==&quot;1&quot;">新批零</span>
            <span v-if="scope.row.storeNature==&quot;2&quot;">新零售</span>
          </template>
        </el-table-column>
        <el-table-column prop="businessScope" label="经营范围" align="center"/>
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
import { chosenStoreList, updateSale } from '@/api/youlife'
import { unix2CurrentTime } from '@/utils'
import { getList } from '@/api/store'
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
      chosenStoreList(this.owner).then(response => {
        var datas = response.data
        this.dataData = datas.data
        const tableData = datas.show
        for (var value of tableData) {
          value.laberName = value.name
        }
        this.tableData = tableData
        this.editableTabsValue2 = datas.show[0].name
        this.listLoading = false
      })
    },
    // 获取商品列表
    getGoodsList() {
      getList(this.listQuery).then(response => {
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
        storeGoodsList: selectData
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
      const goodsData = tableData[tabChangeIndex].storeGoodsList
      goodsData.splice(index, 1)
      tableData[tabChangeIndex].storeGoodsList = goodsData
      this.tableData = tableData
    },
    // 确定添加商品
    editgoodsMes() {
      const tabChangeIndex = this.tabChangeIndex
      const selectData = this.selectData
      const addIndex = this.addIndex + 1
      const tableData = this.tableData
      const storeGoodsList = tableData[tabChangeIndex].storeGoodsList
      for (var i = 0; i < selectData.length; i++) {
        storeGoodsList.splice(addIndex + i, 0, { store: selectData[i] })
      }
      tableData[tabChangeIndex].storeGoodsList = storeGoodsList
      this.tableData = tableData
      this.dialogShow = false
    },
    // 编辑
    editMes() {
      var data = this.dataData
      var tableData = this.tableData
      for (var i = 0; i < tableData.length; i++) {
        var storeGoodsListData = tableData[i].storeGoodsList
        var storeIds = []
        for (var j = 0; j < storeGoodsListData.length; j++) {
          storeIds.push(storeGoodsListData[j].store.id)
        }
        tableData[i].storeIds = storeIds
        delete tableData[i].storeGoodsList
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
