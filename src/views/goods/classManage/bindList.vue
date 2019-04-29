<template>
  <div class="bodyCont">
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
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
  </div>
</template>
<script>
import { getbindList, delbind } from '@/api/goods'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      dialogShow: false,
      tableData: [],
      rowList: [],
      spanArr: [],
      position: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unbind(data) {
      delbind({
        platformCategoryCode: this.$route.query.categoryCode,
        mallCode: data.mallCode,
        mallCategoryCode: data.threeCategoryCode
      }).then(res => {
        console.log('s', res)
        this.getList()
      }).catch(e => {
        console.log(e)
      })
    },
    unix2CurrentTime,
    rowspan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (
            this.tableData[index].mallName ===
            this.tableData[index - 1].mallName
          ) {
            this.spanArr[this.position] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.position = index
          }
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 表格合并行
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    /**
     * 获取列表
     */
    getList() {
      var categoryCode = this.$route.query.categoryCode
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
        this.tableData = tableData
        this.listLoading = false
        this.rowspan()
      })
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

