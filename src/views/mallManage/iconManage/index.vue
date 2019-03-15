<template>
  <div v-loading.body="listLoading" style="padding:30px;" class="mall-floor">
    <div
      v-for="(items, index) in tableData"
      :key="index"
      class="grid-content bg-purple"
      @click="lookFloor(items.code)"
    >
      <div class="head_pic">
        <img :src="imageUrl+items.logo">
      </div>
      {{ items.name }}
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/mall'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      listLoading: false,
      total: 0,
      tableData: [],
      signName: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 获取列表
     */
    getList() {
      this.listLoading = true
      this.signName = this.$route.name
      getList().then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    lookFloor(code) {
      var signName = this.signName
      if (signName === 'bannerManage') {
        this.$router.push({
          path: '/mallBanner/index',
          query: {
            mallCode: code
          }
        })
      } else if (signName === 'activeManage') {
        this.$router.push({
          path: '/mallActive/index',
          query: {
            mallCode: code
          }
        })
      } else if (signName === 'floorManage') {
        this.$router.push({
          path: '/floorMes/index',
          query: {
            mallCode: code
          }
        })
      } else if (signName === 'classManage') {
        this.$router.push({
          path: '/classifyManage/index',
          query: {
            mallCode: code
          }
        })
      }
    }
  }
}
</script>
