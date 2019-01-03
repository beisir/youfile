<template>
  <div v-loading.body="listLoading" style="padding:30px;" class="mall-floor">
    <div v-for="(items, index) in tableData" :key="index" class="grid-content bg-purple" @click="lookFloor(items.code)">
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
      tableData: []
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
      getList().then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    lookFloor(code) {
      this.$router.push({
        path: '/mallBanner/index',
        query: {
          mallCode: code
        }
      })
    }
  }
}
</script>
<style>
.mall-floor .bg-purple {
  background: -webkit-linear-gradient(#FCC16A, #FF7800);
  background: -o-linear-gradient(#FCC16A, #FF7800);
  background: -moz-linear-gradient(#FCC16A, #FF7800);
  background: linear-gradient(#FCC16A, #FF7800);
  padding-top: 30px;
  box-shadow: #ddd 10px 10px 30px 5px;
  width: 180px;
  height: 220px;
  color: #fff;
  margin: 0 auto;
  text-align: center;
  float: left;
  margin-left: 20px;margin-right: 30px
}
.mall-floor .bg-purple:nth-child(2){
  background: -webkit-linear-gradient(#FF698C, #FF1445);
  background: -o-linear-gradient(#FF698C, #FF1445);
  background: -moz-linear-gradient(#FF698C, #FF1445);
  background: linear-gradient(#FF698C, #FF1445);
}
.mall-floor .bg-purple:nth-child(3){
  background: -webkit-linear-gradient(#2ED7AC, #2FA77A);
  background: -o-linear-gradient(#2ED7AC, #2FA77A);
  background: -moz-linear-gradient(#2ED7AC, #2FA77A);
  background: linear-gradient(#2ED7AC, #2FA77A);
}
.mall-floor .head_pic {
  width: 70px;
  height: 70px;
  margin: 0 auto 60px;
  background: #fff;
  padding: 10px;
  border-radius: 100%;
}
.mall-floor .head_pic img {
  width: 90%;
  height: 90%;
}
.mall-floor .bg-purple:hover {
  box-shadow: 6px 6px 10px #ddd;
}
</style>

