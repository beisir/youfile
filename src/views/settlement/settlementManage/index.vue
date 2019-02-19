<template >
  <div style="padding:30px;">
    <el-table
      v-loading.body="listLoading"
      :data="tableData"
      highlight-current-row
      border
      max-height="800"
      style="width: 100%"
    >
      <!-- <el-table-column type="index" width="50" label="序号" align="center"/> -->
      <!-- <el-table-column prop="merchantNumber" width="160" label="商户编号" align="center"/>
      <el-table-column prop="merchantName" width="160" label="商户名称" align="center"/>
      <el-table-column prop="linkman" width="160" label="联系人" align="center"/>
      <el-table-column prop="linkmanPhone" width="160" label="联系电话" align="center"/>
      <el-table-column prop="merchantCharacter" width="160" label="商户性质" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantCharacter==&quot;1&quot;">个人</span>
          <span v-if="scope.row.merchantCharacter==&quot;2&quot;">个体</span>
          <span v-if="scope.row.merchantCharacter==&quot;3&quot;">企业</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantType" label="商户类型" width="160" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.merchantType==&quot;1&quot;">批发商</span>
          <span v-if="scope.row.merchantType==&quot;2&quot;">零售商</span>
        </template>
      </el-table-column>
      <el-table-column prop="onlinePay" label="在线支付状态" width="160" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.onlinePay==&quot;1&quot;">已开通</span>
          <span v-if="scope.row.onlinePay==&quot;0&quot;">未开通</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="160" align="center">
        <template slot-scope="scope">{{ unix2CurrentTime(scope.row.updateTime) }}</template>
      </el-table-column>
      <el-table-column prop="onlinePay" label="操作" width="200" fixed="right" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.onlinePay=='1'">
            <el-button size="mini" type="warning" @click="closeFun(scope.$index, scope.row )">关闭</el-button>
          </div>
          <div v-if="scope.row.onlinePay=='0'">
            <el-button
              size="mini"
              type="primary"
              @click="getDetailsFun(scope.$index, scope.row )"
            >开通</el-button>
          </div>
        </template>
      </el-table-column>-->
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
  </div>
</template>
<script>

export default {
  data() {
    return {
      tableData: [],
      listQuery: {
        pageNum: 1, // 页码
        pageSize: 10 // 每页数量
      },
      listLoading: false
    }
  }
}
</script>

