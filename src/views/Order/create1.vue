<template>
  <div class="fs-settlement-page">
    <div class="container pb-10">
      <!-- 主卡片区域 -->
      <v-card elevation="2" rounded="lg" class="mb-6">
        <v-card-text class="pa-6">
          <v-alert title="提交订单成功" text="我们将尽快为您发货，收货期间请保持手机畅通" type="success" variant="tonal"></v-alert>

          <!-- 配送信息 -->
          <div class="delivery-info mt-6">
            <h3 class="text-h6 mb-4">配送信息</h3>
            <v-divider class="mb-4"></v-divider>
            <div class="info-flex">
              <div class="info-item">
                <span class="info-label">收货人：</span>
                <span class="info-value">{{ orderDetail.memberAddress?.recipient }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">联系电话：</span>
                <span class="info-value">{{ orderDetail.memberAddress?.phone }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">配送地址：</span>
                <span class="info-value">{{ fullAddress }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">预计送达：</span>
                <span class="info-value">{{ selectedDateDisplay }}</span>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- 订单信息卡片 -->
      <v-card elevation="2" rounded="lg" class="mb-6">
        <v-card-title class="text-h6">订单信息</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="order-summary">
            <div class="order-item" v-for="item in orderDetail.itemsDtos" :key="item.id">
              <img :src="item.goodsPic" width="80" height="80" class="mr-4" />
              <div class="item-details">
                <h4 class="text-subtitle-1">{{ item.goodsName }}</h4>
                <!-- <p class="text-caption text-grey">{{ item.spec }}</p> -->
              </div>
              <div class="item-price">
                <span class="text-body-1">{{ item.price }}</span>
                <span class="text-caption text-grey">x{{ item.quantity }}</span>
              </div>
            </div>
          </div>

          <v-divider class="my-4"></v-divider>

          <div class="order-total">
            <div class="total-row">
              <span>商品总价：</span>
              <span>{{ orderDetail.totalAmount }}</span>
            </div>
            <!-- <div class="total-row">
              <span>运费：</span>
              <span>¥{{ orderSummary.shippingFee }}</span>
            </div> -->
            <!-- <div class="total-row">
              <span>优惠折扣：</span>
              <span>-¥{{ orderSummary.discount }}</span>
            </div> -->
            <div class="total-row grand-total">
              <span>实付款：</span>
              <span class="text-error text-h6">{{ orderDetail.totalAmount }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- 订单操作 -->
      <div class="action-buttons d-flex justify-space-between">
        <v-btn variant="outlined" color="primary" size="large" prepend-icon="mdi-arrow-left" to="/">
          继续购物
        </v-btn>
        <v-btn color="primary" size="large" prepend-icon="mdi-text-box-outline" to="/member/order">
          查看订单
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useRoute } from 'vue-router'
import { getOrderDetailAPI } from '@/apis/order'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

// 日本語設定
dayjs.locale('ja')

const route = useRoute()
// const orderStore = useOrderStore()

// page 状态
const address = ref({}); //订单地址
const deliverTime = ref('');//配送日期
const goodsList = ref([]) //商品信息
const summary = ref({}) //合计信息

const orderDetail = ref({}) //订单详情

// 表示用の選択日付
const selectedDateDisplay = computed(() => {
  if (!orderDetail.value?.deliveryTime) return ''
  return dayjs(orderDetail.value.deliveryTime).format('YYYY年M月D日 (ddd)')
})

// 地址
const fullAddress = computed(() => {
  if (!orderDetail.value?.memberAddress) return ''
  const { prefecture, city, address } = orderDetail.value.memberAddress
  return `${prefecture}${city}${address}`
})

// 查询详情
const fetchOrderDetail = async () => {
  try {
    const res = await getOrderDetailAPI(10)
    orderDetail.value = res || {}
  } catch (err) {
    throw err
  } finally {
  }
}

onMounted(() => fetchOrderDetail())
</script>

<style lang="scss" scoped>
.fs-settlement-page {
  padding-top: 24px;
}

.delivery-info {
  .info-flex {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  .info-item {
    display: flex;
    margin-bottom: 8px;
  }

  .info-label {
    font-weight: bold;
    min-width: 80px;
    color: rgba(0, 0, 0, 0.6);
  }

  .info-value {
    flex: 1;
  }
}

.order-summary {
  .order-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }

  .item-details {
    flex: 1;
    padding-right: 16px;
  }

  .item-price {
    text-align: right;
    min-width: 100px;
  }
}

.order-total {
  .total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 4px 0;
  }

  .grand-total {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }
}

.action-buttons {
  margin-top: 24px;
}

@media (max-width: 600px) {
  .delivery-info .info-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    gap: 12px;

    .v-btn {
      width: 100%;
    }
  }
}
</style>
