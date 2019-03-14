<template>
  <div class="new-t" style="padding:30px;">
    <div class="block">
      <el-row class="order-row">
        <el-col :span="24" class="order-col">
          <div v-if="formInline.orderStatus=='unpaid'">订单状态：待付款</div>
          <div v-if="formInline.orderStatus=='wait_deliver'">订单状态：待发货</div>
          <div v-if="formInline.orderStatus=='paid'">订单状态：已付款</div>
          <div v-if="formInline.orderStatus=='delivered'">订单状态：已发货/待收货</div>
          <div v-if="formInline.orderStatus=='canceled'">订单状态：订单已取消/订单关闭<span class="cancelReason">原因：{{ formInline.cancelReason }}</span></div>
          <div v-if="formInline.orderStatus=='finish'">订单状态：已完成</div>
        </el-col>
        <el-col :span="6" class="o-font">
          <div>订单编号：{{ formInline.orderNumber }}</div>
        </el-col>
        <el-col :span="6">
          <div>
            订单属性：
            <span v-if="formInline.orderCategory=='1'">进货单</span>
            <span v-if="formInline.orderCategory=='2'">云产品订单</span>
            <span v-if="formInline.orderCategory=='3'">商品订单</span>
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
        <div v-if="formInline.logisticsMode=='2'" class="order-t">收货人信息</div>
        <div v-if="formInline.logisticsMode=='1'" class="order-t">取货人信息</div>
        <el-col :span="6">
          <div v-if="formInline.logisticsMode=='2'">
            收货人姓名：
            <span v-if="consigneeInfoShow">{{ consigneeInfo.userName }}</span>
          </div>
          <div v-if="formInline.logisticsMode=='1'">
            取货人电话：
            <span>{{ formInline.pickerPhone }}</span>
          </div>
        </el-col>
        <el-col v-if="formInline.logisticsMode=='2'" :span="6">
          <div>
            联系电话：
            <span v-if="consigneeInfoShow">{{ consigneeInfo.userPhone }}</span>
          </div>
        </el-col>
        <el-col v-if="formInline.logisticsMode=='2'" :span="12">
          <div>
            收货地址：
            <span
              v-if="consigneeInfoShow"
            >{{ consigneeInfo.city }}{{ consigneeInfo.province }}{{ consigneeInfo.county }}{{ consigneeInfo.detailAddress }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="order-row1">
        <div class="order-t">订单信息</div>
        <el-col :span="6">
          <div>
            店铺名称：
            <span>{{ storeName }}</span>
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
            <span>{{ customerUserNickName }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            买家留言：
            <span>{{ formInline.userMemo }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            用户编号：
            <span>{{ formInline.customerUserNo }}</span>
          </div>
        </el-col>
      </el-row>
      <div class="table-c">
        <el-row class="row-img">
          <div>
            <img :src="storeIcon">
            <span>{{ storeName }}</span>
          </div>
        </el-row>
        <el-table
          v-loading.body="listLoading"
          :data="tableData"
          :span-method="objectSpanMethod"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="index" width="45" label align="center"/>
          <el-table-column prop="mainImgUrl" width="85" label align="left">
            <template slot-scope="scope">
              <img :src="imageUrl+scope.row.mainImgUrl" width="70" height="70">
            </template>
          </el-table-column>
          <el-table-column width="350">
            <template slot-scope="scope">
              <div>{{ scope.row.goodsName }}</div>
              <div class="g-srtle">
                <span>商品ID：</span>
                {{ scope.row.goodsId }}
              </div>
              <div class="g-srtle">{{ scope.row.goodsDesc }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sellPrice" label="商品价格" align="center">
            <template slot-scope="scope">￥{{ scope.row.sellPrice }}</template>
          </el-table-column>
          <el-table-column prop="num" label="数量" align="center"/>
          <el-table-column prop="amount" label="金额小计" align="center">
            <template slot-scope="scope">￥{{ scope.row.amount }}</template>
          </el-table-column>
          <el-table-column label="优惠" align="center"/>
          <el-table-column prop="payAmount" width="180" label="订单总金额" align="center">
            <template slot-scope="scope">
              <span class="t-payAmount">￥{{ scope.row.payAmount }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row class="all-m">
        共
        <span>{{ formInline.num }}</span>件商品 | 实付金额：
        <span>￥{{ formInline.payAmount }}</span>
      </el-row>
      <el-row class="order-row1">
        <div class="order-t">支付信息</div>
        <el-col :span="24">
          <div>
            支付方式：
            <span v-if="formInline.payType=='offline'">其他支付方式</span>
            <span v-if="formInline.payType=='online'">在线支付</span>
          </div>
        </el-col>
        <el-col v-if="formInline.payType=='online'" :span="24">
          <div>
            支付交易号：
            <span>{{ formInline.paymentNumber }}</span>
          </div>
        </el-col>
        <el-col v-if="formInline.payType=='offline'" :span="24">
          <div>
            支付凭证：
            <img
              v-if="showImg"
              :src="payVoucher"
              style="width:400px;height:auto;vertical-align: top"
            >
          </div>
        </el-col>
      </el-row>
      <el-row v-if="formInline.logisticsMode=='2'" class="order-row1">
        <div class="order-t">物流信息</div>
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
      </el-row>
      <el-row v-if="formInline.logisticsMode=='1'" class="order-row1">
        <div class="order-t">自提信息</div>
        <el-col :span="24">
          <div>
            取货码：
            <span>{{ formInline.claimGoodsNum }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="receiptInfoShow" class="order-row1">
        <div class="order-t">发票信息</div>
        <el-col :span="24">
          <div v-if="receiptInfo.invoiceType=='个人'">
            发票类型：
            <span>{{ receiptInfo.invoiceType }}{{ receiptInfo.receiptInfo }}</span>
          </div>
        </el-col>
        <el-col v-if="receiptInfo.invoiceType!='个人'" :span="24">
          <div>
            发票类型：
            <span>{{ receiptInfo.invoiceType }}{{ receiptInfo.invoiceCategory }}</span>
          </div>
        </el-col>
        <el-col v-if="receiptInfo.invoiceType!='个人'" :span="24">
          <div>
            发票抬头：
            <span>{{ receiptInfo.invoiceTitle }}</span>
          </div>
        </el-col>
        <el-col v-if="receiptInfo.invoiceType!='个人'" :span="24">
          <div>
            纳税人识别号：
            <span>{{ receiptInfo.identificationNumber }}</span>
          </div>
        </el-col>
        <el-col v-if="receiptInfo.invoiceType!='个人'" :span="24">
          <div>
            注册地址：
            <span>{{ receiptInfo.registeredAddress }}</span>
          </div>
        </el-col>
        <el-col v-if="receiptInfo.invoiceType!='个人'" :span="24">
          <div>
            注册电话：
            <span>{{ receiptInfo.registererMobile }}</span>
          </div>
        </el-col>
        <el-col v-if="receiptInfo.invoiceType!='个人'" :span="24">
          <div>
            开户银行：
            <span>{{ receiptInfo.depositBank }}</span>
          </div>
        </el-col>
        <el-col v-if="receiptInfo.invoiceType!='个人'" :span="24">
          <div>
            开户账号：
            <span>{{ receiptInfo.depositBankNumber }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getOrderDetails } from '@/api/order'
import { unix2CurrentTime } from '@/utils'
import storeIcon from '@/assets/img/icon.png'
// import Londing from from './components/Loading'
export default {
  // components:{
  //   Loading
  // },
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
      tableIndex: '',
      customerUserNickName: '',
      storeName: '',
      formInline: {},
      storeIcon: storeIcon,
      formLabelWidth: '150px',
      listLoading: false,
      receiptInfoShow: false,
      receiptInfo: {},
      consigneeInfoShow: false
    }
  },
  created() {
    this.getOrderDetails()
  },
  methods: {
    unix2CurrentTime,
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 7) {
        if (rowIndex % this.tableIndex === 0) {
          return {
            rowspan: this.tableIndex,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    /**
     * 查看详情
     */
    getOrderDetails() {
      this.listLoading = true
      const orderNumber = this.$route.query.orderNumber
      getOrderDetails(orderNumber).then(response => {
        this.listLoading = false
        this.formInline = response.data.orderRespVO
        this.customerUserNickName = response.data.customerUserNickName
        this.storeName = response.data.storeName
        const createDateShow = response.data.orderRespVO.createDate
        const payDateShow = response.data.orderRespVO.payDate
        const deliverDateShow = response.data.orderRespVO.deliverDate
        const finishDateShow = response.data.orderRespVO.finishDate
        const receiptInfo = response.data.orderRespVO.receiptInfo
        if (receiptInfo) {
          this.receiptInfo = receiptInfo
          this.receiptInfoShow = true
        }
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
        const consigneeInfo = response.data.orderRespVO.consigneeInfo
        if (consigneeInfo) {
          this.consigneeInfo = consigneeInfo
          this.consigneeInfoShow = true
        }
        const orderDetailVOList = response.data.orderRespVO.orderDetailVOList
        var newData = []
        for (var i = 0; i < orderDetailVOList.length; i++) {
          if (orderDetailVOList[i].goodsSnapshot) {
            newData.push(JSON.parse(orderDetailVOList[i].goodsSnapshot))
          }
        }
        for (var j = 0; j < newData.length; j++) {
          orderDetailVOList[j].mainImgUrl = newData[j].mainImgUrl
          orderDetailVOList[j].payAmount = response.data.orderRespVO.payAmount
        }
        this.tableData = orderDetailVOList
        this.tableIndex = orderDetailVOList.length
        if (response.data.orderRespVO.postageinfo) {
          this.postageType = response.data.orderRespVO.postageinfo.postageType
        }
        if (response.data.orderRespVO.payVoucher) {
          this.payVoucher =
            this.imageUrl + '/' + response.data.orderRespVO.payVoucher
          this.showImg = true
        }
      })
    }
  }
}
</script>
<style>
.block {
  margin-top: 0;
}
.pay-img img {
  width: 400px;
  height: auto;
}
.order-row {
  padding: 30px;
  font-size: 18px;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 20px;
}
.order-row .el-col-6 {
  padding: 10px 0;
}
.order-col {
  font-size: 24px;
  padding-bottom: 20px;
  color: #dd1b34;
  font-weight: bold;
}
.o-font {
  color: #dd1b34;
}
.order-row1 {
  padding: 10px 0;
  margin: 0 30px;
  margin-top: 10px;
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
.new-t .el-table th {
  background: #fcfcfc;
  font-size: 16px;
  border-top: 1px solid #f2f2f2;
  font-weight: normal;
  color: #000;
}
.all-m {
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #f2f2f2;
  text-align: right;
  font-size: 16px;
  padding-right: 40px;
}
.all-m span {
  color: #e02840;
}
.all-m span:last-child {
  font-size: 30px;
}
.new-t .el-table th {
  z-index: 99;
}
.new-t .el-table th>.cell{
  min-width: 80px;
  padding: 0;
}
.new-t .el-table td div {
  color: #000;
  font-size: 16px;
}
.new-t .el-table td div span {
  color: #999;
}
.row-img {
  position: relative;
}
.row-img div {
  position: absolute;
  background: #fcfcfc;
  z-index: 999;
  left: 15px;
  color: #000;
  font-size: 18px;
  bottom: -35px;
}
.row-img img {
  width: 25px;
  height: auto;
  margin-right: 3px;
  vertical-align: middle;
  margin-top: -1px;
}
.table-c {
  padding: 0 30px;
  margin-top: 20px;
  position: relative;
}
.new-t .el-table td div span.t-payAmount {
  font-size: 20px;
  font-weight: normal;
  color: #000;
}
.new-t .el-table td .g-srtle {
  font-size: 14px;
}

.new-t .el-table td:last-child{
  border-left: 1px solid #f2f2f2;
}
.new-t .el-table tr:nth-child(n+2) td:last-child{
  border-left: 0;
}
.cancelReason{
  font-size: 18px;
  color: #666;
  font-weight: normal;
  margin-left: 20px;
}
</style>

