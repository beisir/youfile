<template>
  <div class="new-t" style="padding:30px;">
    <div class="block">
      <el-row class="order-row">
        <el-col :span="24" class="order-col">
          <div v-if="formInline.orderStatus=='unpaid'">订单状态：待付款</div>
          <div v-if="formInline.orderStatus=='paid'">订单状态：已付款</div>
          <div v-if="formInline.orderStatus=='delivered'">订单状态：已发货/待收货</div>
          <div v-if="formInline.orderStatus=='canceled'">订单状态：订单已取消/订单关闭</div>
          <div v-if="formInline.orderStatus=='finish'">订单状态：已完成</div>
        </el-col>
        <el-col :span="6" class="o-font">
          <div>订单编号：{{ formInline.orderNumber }}</div>
        </el-col>
        <el-col :span="6">
          <div>
            订单属性：
            <span v-if="formInline.orderCategory=='1'">批发订单</span>
            <span v-if="formInline.orderCategory=='2'">小云店订单</span>
            <span v-if="formInline.orderCategory=='3'">零售订单</span>
            <span v-if="formInline.orderCategory=='4'">门店订单</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            配送方式：
            <span v-if="formInline.logisticsMode=='0'">没有物流</span>
            <span v-if="formInline.logisticsMode=='1'">门店自提</span>
            <span v-if="formInline.logisticsMode=='2'">物流配送</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="order-row1">
        <div class="order-t">收货人信息</div>
        <el-col :span="6">
          <div>
            收货人姓名：
            <span>{{ consigneeInfo.userName }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            联系电话：
            <span>{{ consigneeInfo.userPhone }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            收货地址：
            <span>{{ consigneeInfo.detailAddress }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="order-row1">
        <div class="order-t">订单信息</div>
        <el-col :span="6">
          <div>
            店铺名称：
            <span>周大福珠宝店</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            店铺ID：
            <span>{{ formInline.storeId }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            商户编号：
            <span>{{ formInline.receiveMerchantNumber }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            创建时间：
            <span v-if="createDateShow">{{ unix2CurrentTime(formInline.createDate) }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            支付时间：
            <span v-if="payDateShow">{{ unix2CurrentTime(formInline.payDate) }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            发货时间：
            <span v-if="deliverDateShow">{{ unix2CurrentTime(formInline.deliverDate) }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            完成时间：
            <span v-if="finishDateShow">{{ unix2CurrentTime(formInline.finishDate) }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            买家昵称：
            <span>李小妮</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            用户编号：
            <span>{{ formInline.customerUserNo }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            买家留言：
            <span>{{ formInline.userMemo }}</span>
          </div>
        </el-col>
      </el-row>
      <el-table
        v-loading.body="listLoading"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="50" label="" align="center"/>
        <el-table-column prop="mainImgUrl" label="周大福珠宝" align="center">
          <template slot-scope="scope">
            <img :src="imageUrl+scope.row.mainImgUrl" width="40" height="40">
          </template>
        </el-table-column>
        <el-table-column width="250" >
          <template slot-scope="scope">
            <div>{{ scope.row.goodsName }}</div>
            <div>商品ID：<span>{{ scope.row.goodsId }}</span></div>
            <div><span>{{ scope.row.goodsDesc }}</span></div>
          </template>
        </el-table-column>
        <el-table-column prop="sellPrice" label="商品价格" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.sellPrice }}
          </template>
        </el-table-column>
        <el-table-column prop="num" label="数量" align="center"/>
        <el-table-column prop="amount" label="金额小计" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column label="优惠" align="center"/>
        <el-table-column prop="stockNum" label="订单总金额" align="center">
          <template>
            ￥{{ formInline.payAmount }}
          </template>
        </el-table-column>
      </el-table>
      <el-row class="all-m">
        共<span>7</span>件商品 | 实付金额：<span>￥{{ formInline.payAmount }}</span>
      </el-row>
      <el-row class="order-row1">
        <div class="order-t">支付信息</div>
        <el-col :span="24">
          <div>
            支付方式
            <span v-if="formInline.offline_pay=='offline_pay'">线下方式</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            支付方用户编号：
            <span>{{ formInline.customerUserNo }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            收款方商户编号：
            <span>{{ formInline.receiveMerchantNumber }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            支付凭证：
            <img v-if="showImg" :src="payVoucher" style="width:400px;height:auto">
          </div>
        </el-col>
      </el-row>
      <el-row class="order-row1">
        <div class="order-t">物流信息</div>
        <el-col :span="24">
          <div>
            物流方式：
            <span v-if="formInline.logisticsMode=='0'">没有物流</span>
            <span v-if="formInline.logisticsMode=='1'">门店自提</span>
            <span v-if="formInline.logisticsMode=='2'">物流配送</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            物流公司名称：
            <span>{{ formInline.expressCompany }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            运单号：
            <span>{{ formInline.expressNumber }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            收货地址：
            <span>{{ consigneeInfo.detailAddress }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="order-row1">
        <div class="order-t">发票信息</div>
        <el-col :span="24">
          <div>
            发票类型：
            <span>postageinfo</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            发票抬头：
            <span>3254354</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            纳税人识别号：
            <span>3254354</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="order-row1">
        <div class="order-t">备注信息</div>
        <el-col :span="24">
          <div>
            备注信息：
            <span>北京</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getOrderDetails } from '@/api/order'
import { unix2CurrentTime } from '@/utils'
export default {
  data() {
    return {
      imageUrl: this.Const.imageUrl,
      payVoucherShow: true,
      payDateShow: false,
      createDateShow: false,
      deliverDateShow: false,
      finishDateShow: false,
      showImg: false,
      consigneeInfo: {},
      postageType: '',
      payVoucher: '',
      tableData: [],
      formInline: {},
      formLabelWidth: '150px',
      listLoading: false
    }
  },
  created() {
    this.getOrderDetails()
  },
  methods: {
    unix2CurrentTime,
    /**
     * 查看详情
     */
    getOrderDetails() {
      this.listLoading = true
      const orderNumber = this.$route.query.orderNumber
      getOrderDetails(orderNumber).then(response => {
        this.listLoading = false
        this.formInline = response.data
        const createDateShow = response.data.createDate
        const payDateShow = response.data.payDate
        const deliverDateShow = response.data.deliverDate
        const finishDateShow = response.data.finishDate
        if (createDateShow) {
          this.createDateShow = true
        }
        if (payDateShow) {
          this.payDateShow = true
        }
        if (deliverDateShow) {
          this.deliverDateShow = true
        }
        if (finishDateShow) {
          this.finishDateShow = true
        }
        this.consigneeInfo = response.data.consigneeInfo
        const orderDetailVOList = response.data.orderDetailVOList
        var newData = []
        for (var i = 0; i < orderDetailVOList.length; i++) {
          newData.push(JSON.parse(orderDetailVOList[i].goodsSnapshot))
        }
        for (var j = 0; j < newData.length; j++) {
          orderDetailVOList[j].mainImgUrl = newData[j].mainImgUrl
        }
        this.tableData = orderDetailVOList
        console.log(orderDetailVOList)
        this.postageType = response.data.postageinfo.postageType
        if (response.data.payVoucher) {
          this.payVoucher = this.imageUrl + '/' + response.data.payVoucher
          this.showImg = true
        }
      })
    }
  }
}
</script>
<style>
.block{
  margin-top: 0;
}
.pay-img img {
  width: 400px;
  height: auto;
}
.order-row {
  padding: 30px;
  font-size: 18px;
  border-bottom: 1px solid #F5F5F5;
  padding-bottom: 20px;
}
.order-row .el-col-6{
  padding:10px 0;
}
.order-col {
  font-size: 24px;
  padding-bottom: 20px;
  color: #DD1B34;
  font-weight: bold
}
.o-font{
  color: #DD1B34;
}
.order-row1 {
  padding: 10px 0;
  margin: 0 30px;
  margin-top: 10px
}
.order-row1 .el-col-6,
.order-row1 .el-col-12,
.order-row1 .el-col-24 {
  color: #999;
  font-size: 16px;
  height: unset;
  padding: 10px 0;
}
.order-row1 span {
  color: #000;
}
.order-row .el-col-12 {
  height: unset;
}
.order-row1 > .order-t {
  border-bottom: 1px dotted #f2f2f2;
  font-size: 18px;
  color: #000;
  padding-bottom: 10px;
}
.new-t .el-table th{
  background: #FCFCFC;
  font-size: 18px;
  border-top: 1px solid #F2F2F2;
  font-weight: normal;
  color: #000;
}
.all-m{
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #F2F2F2;
  text-align: right;
  font-size: 16px;
  padding-right: 40px
}
.all-m span{
  color: #E02840;
}
.all-m span:last-child{
  font-size: 30px;
}
</style>

