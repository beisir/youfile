<template>
  <div style="padding:30px;">
    <el-tree
      :data="tableData"
      :props="defaultProps"
      :expand-on-click-node="false"
      node-key="id">
      <div slot-scope="{ node, data }" class="custom-tree-node">
        <tr>
          <td>{{ data.name }}</td>
          <td>{{ data.categoryCode }}</td>
          <td>{{ data.sort }}</td>
          <td>{{ unix2CurrentTime(data.createDate) }}</td>
        </tr>

        <!-- <div>{{ data.name }}</div>
        <div>{{ data.categoryCode }}</div>
        <div>{{ data.sort }}</div>
        <div> {{ unix2CurrentTime(data.createDate) }}</div> -->
      </div>
    </el-tree>
    <!-- <el-table
      v-loading.body="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"/>
      <el-table-column
        prop="name"
        label="分类名称"
        align="center"/>
      <el-table-column
        prop="categoryCode"
        label="分类编码"
        align="center"/>
      <el-table-column
        prop="sort"
        label="排序"
        align="center"/>
      <el-table-column
        prop="createDate"
        label="创建时间"
        align="center">
        <template slot-scope="scope">
          {{ unix2CurrentTime(scope.row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类"
        align="center">
        <template slot-scope="scope">
          <el-tree :data="scope.row.subGoodsCategoryList" :props="defaultProps" @node-click="handleNodeClick"/>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import { getClassList } from '@/api/goods'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      listLoading: false,
      parentCategoryCode: 0,
      tableData: [],
      defaultProps: {
        children: 'subGoodsCategoryList',
        label: 'name'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unix2CurrentTime,
    handleNodeClick(data) {
    },
    /**
       * 获取列表
       */
    getList() {
      this.listLoading = true
      getClassList(this.parentCategoryCode).then(response => {
        this.tableData = response.data.obj
        console.log(response.data.obj)
        this.listLoading = false
      })
    }

  }
}
</script>
<style>
.custom-tree-node td{
  width:200px;border:1px solid #ebeef5;border-right:0;height: 50px;text-align: center;line-height: 50px;border-bottom: 0
}
.el-tree-node__content{
  height:50px;
}
.custom-tree-node{
  border-right:1px solid #ebeef5;
}
.custom-tree-node tr:hover{
      background-color: #f5f7fa;
}
.el-tree-node__content>.el-tree-node__expand-icon{
  padding:58px 10px;
}
.el-tree-node__content:hover,.el-tree-node is-focusable{
  background:#fff;
}
</style>

