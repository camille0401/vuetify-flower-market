<template>
  <section class="fs-order-detail-page">
    <v-container class="mx-auto pb-10">
      <!-- 成功提示卡片 -->
      <v-sheet color="surface" class="pa-4 mb-4" elevation="2">
        <v-alert :type="statusConfig.type" variant="tonal" :title="statusConfig.title" :text="statusConfig.description"
          class="mb-4 responsive-alert">
          <template #prepend>
            <v-icon :color="statusConfig.type" :icon="statusConfig.icon" size="40" />
          </template>
          <v-spacer />
          <template #append>
            <div class="text-caption text-grey-darken-1">
              <div>{{ $t('order.detail.orderNo') }} {{ orderDetail.orderNo }}</div>
              <div>{{ $t('order.detail.createdAt') }} {{ formatTime(orderDetail.orderPaymentsDto?.createdAt) }}</div>
              <div v-if="orderDetail.status === 4">
                {{ $t('order.detail.cancelTime') }} {{ formatTime(orderDetail.orderPaymentsDto?.updatedAt) }}
              </div>
            </div>
          </template>
        </v-alert>

        <!-- 配送信息 -->
        <div class="delivery-info">
          <h3 class="text-h6 mb-4 font-weight-bold">
            <v-icon icon="mdi-truck-delivery" class="mr-2" />{{ $t('order.detail.delivery') }}
          </h3>
          <v-divider class="mb-4" />
          <v-row dense>
            <v-col cols="12" md="12">
              <div class="info-item">
                <div class="text-caption text-grey">{{ $t('order.detail.recipient') }}</div>
                <div class="text-body-1">{{ orderDetail.memberAddress?.recipient }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="12">
              <div class="info-item">
                <div class="text-caption text-grey">{{ $t('order.detail.phone') }}</div>
                <div class="text-body-1">{{ orderDetail.memberAddress?.phone }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="12">
              <div class="info-item">
                <div class="text-caption text-grey">{{ $t('order.detail.address') }}</div>
                <div class="text-body-1">{{ fullAddress }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="12">
              <div class="info-item">
                <div class="text-caption text-grey">{{ $t('order.detail.expectedTime') }}</div>
                <div class="text-body-1 text-primary">{{ selectedDateDisplay }}</div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-sheet>

      <!-- 订单详情卡片 -->
      <v-card elevation="2" rounded="0" class="mb-4">
        <v-card-title class="text-h6 font-weight-bold">
          <v-icon icon="mdi-receipt-text" class="mr-2" />{{ $t('order.detail.title') }}
        </v-card-title>
        <v-divider />

        <v-card-text class="pa-4">
          <v-table class="order-table">
            <thead>
              <tr>
                <th class="text-left">{{ $t('order.detail.goodsInfo') }}</th>
                <th class="text-center">{{ $t('order.detail.price') }}</th>
                <th class="text-center">{{ $t('order.detail.quantity') }}</th>
                <th class="text-center">{{ $t('order.detail.subtotal') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!orderDetail.itemsDtos?.length">
                <td colspan="4" class="text-center">{{ $t('order.detail.emptyGoods') }}</td>
              </tr>
              <tr v-for="item in orderDetail.itemsDtos" :key="item.id">
                <td>
                  <div class="d-flex align-center">
                    <div class="mr-4 rounded-lg" style="width: 80px; height: 80px;">
                      <v-img :src="item.goodsPic" width="80" height="80" cover />
                    </div>
                    <div>
                      <div class="text-body-1 font-weight-medium">{{ item.goodsName }}</div>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  {{ $t('global.moneyTemplate', { money: item.price }) }}
                </td>
                <td class="text-center">{{ 'X' + item.quantity }}</td>
                <td class="text-center text-error">
                  {{ $t('global.moneyTemplate', { money: (item.price * item.quantity).toFixed(2) }) }}
                </td>

              </tr>
            </tbody>
          </v-table>

          <v-divider class="my-4" />

          <div class="total-summary">
            <div class="d-flex justify-end">
              <div class="total-grid">
                <div class="total-item">
                  <span>{{ $t('order.detail.total') }}</span>
                  <span>{{ $t('global.moneyTemplate', { money: orderDetail.totalAmount }) }}</span>
                </div>
                <!-- <div class="total-item">
                  <span>运费：</span>
                  <span>¥0.00</span>
                </div> -->
                <div class="total-item">
                  <span>{{ $t('order.detail.payType') }}</span>
                  <span class="text-info">线下付款单</span>
                </div>
                <v-divider class="my-2" />
                <div class="total-item grand-total">
                  <span>{{ $t('order.detail.final') }}</span>
                  <span class="text-error text-h6">
                    {{ $t('global.moneyTemplate', { money: orderDetail.totalAmount }) }}
                  </span>

                </div>
              </div>
            </div>
          </div>
          <v-divider class="my-4" />
          <div class="action-buttons">
            <v-btn class="flex-grow-1" color="primary" variant="outlined" size="large" prepend-icon="mdi-arrow-right"
              to="/">
              {{ $t('order.detail.backToShop') }}
            </v-btn>
            <v-btn class="flex-grow-1" color="primary" size="large" prepend-icon="mdi-text-box-check"
              to="/member/order">
              {{ $t('order.detail.viewOrders') }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderDetailAPI } from '@/apis/order'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import 'dayjs/locale/zh-cn'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const route = useRoute()
const orderDetail = ref({})
const loading = ref(true)

// 订单状态配置
const ORDER_STATUS_CONFIG = {
  0: { // 待发货
    type: 'info',
    icon: 'mdi-truck-delivery-outline',
    get title() { return t('order.detail.status.confirm.title') },
    get description() { return t('order.detail.status.confirm.desc') }
  },
  1: { // 待签收
    type: 'warning',
    icon: 'mdi-credit-card-clock-outline',
    get title() { return t('order.detail.status.waitPay.title') },
    get description() { return t('order.detail.status.waitPay.desc') }
  },
  2: { // 待支付
    type: 'success',
    icon: 'mdi-check-circle-outline',
    get title() { return t('order.detail.status.success.title') },
    get description() { return t('order.detail.status.success.desc') }
  },
  3: { // 已完成
    type: 'success',
    icon: 'mdi-package-variant-closed',
    get title() { return t('order.detail.status.complete.title') },
    get description() { return t('order.detail.status.complete.desc') }
  },
  4: { // 已取消
    type: 'error',
    icon: 'mdi-close-circle-outline',
    get title() { return t('order.detail.status.cancel.title') },
    get description() { return t('order.detail.status.cancel.desc') }
  },
  5: { // 退款/售后
    type: 'success',
    icon: 'mdi-cash-refund',
    get title() { return t('order.detail.status.refund.title') },
    get description() { return t('order.detail.status.refund.desc') }
  }
}

// 计算属性
const statusConfig = computed(() => {
  const status = orderDetail.value?.status ?? -1
  return ORDER_STATUS_CONFIG[status] || {
    type: 'info',
    icon: 'mdi-help-circle-outline',
    get title() { return t('order.detail.status.default.title') },
    get description() { return t('order.detail.status.default.desc') }
  }
})

const selectedDateDisplay = computed(() => {
  if (!orderDetail.value?.deliveryTime) return t('order.detail.deliveryTimeFailedMessage')
  // 设置 dayjs 当前语言
  const currentLocale = locale.value === 'zh-CN' ? 'zh-cn' : locale.value
  dayjs.locale(currentLocale)
  const formatString = currentLocale === 'ja' ? 'YYYY年M月D日 (ddd)' : 'YYYY年M月D日 dddd'
  return dayjs(orderDetail.value.deliveryTime).format(formatString)
})

const fullAddress = computed(() => {
  const addr = orderDetail.value.memberAddress || {}
  return `${addr.prefecture}${addr.city}${addr.address}`
})

// 时间格式化
const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

// 获取订单详情
const fetchOrderDetail = async () => {
  try {
    const res = await getOrderDetailAPI(route.params.id)
    orderDetail.value = res || {}
  } catch (error) {
    console.error('获取订单详情失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchOrderDetail())
</script>

<style lang="scss" scoped>
.fs-order-detail-page {
  .order-table {
    :deep(thead tr th) {
      font-weight: 600;
      background-color: rgba(0, 0, 0, 0.02);
    }

    :deep(tbody tr:hover) {
      background-color: rgba(0, 0, 0, 0.01);
    }

    :deep(td),
    :deep(th) {
      padding: 12px 8px;
    }
  }

  .total-grid {
    width: 100%;

    .total-item {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;

      &.grand-total {
        padding-top: 12px;
        border-top: 1px dashed rgba(0, 0, 0, 0.2);
        font-weight: 500;
      }
    }
  }

  .action-buttons {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  .info-item {
    padding: 8px 12px;
    border-left: 2px solid rgba(var(--v-theme-primary-darken-1), 0.2);
  }

  /* 新增状态图标动画 */
  .status-icon {
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  /* 响应式调整 */
  @media (max-width: 600px) {
    .order-table {

      th,
      td {
        font-size: 14px;
      }

      td>.d-flex {
        flex-direction: column;
        align-items: flex-start !important;

        .v-img {
          margin-bottom: 6px;
        }
      }
    }

    .action-buttons {
      grid-template-columns: 1fr;
    }

    .responsive-alert {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
  }

}
</style>
