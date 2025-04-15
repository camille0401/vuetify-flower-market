<template>
  <v-card class="fs-order-card" :class="`status-${order.status}`" elevation="2" outlined>
    <!-- 订单头部 -->
    <v-card-title class="d-flex align-center justify-space-between pa-4">
      <div class="d-flex flex-column flex-md-row gap-2 align-center">
        <span class="text-body-1 font-weight-medium mr-2">订单号: {{ order.orderNo }}</span>
        <span class="text-caption text-grey">下单时间: {{ formatTime(order.createdAt) }}</span>
      </div>
      <v-chip :color="statusConfig.color" :prepend-icon="statusConfig.icon" size="small">
        {{ statusConfig.text }}
      </v-chip>
    </v-card-title>

    <!-- 商品列表 -->
    <v-table density="compact" class="order-items-table bg-transparent px-2">
      <thead>
        <tr>
          <th class="text-left">商品信息</th>
          <th class="text-center">单价</th>
          <th class="text-center">数量</th>
          <th class="text-center">小计</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.itemsDtos" :key="item.id">
          <td>
            <div class="d-flex align-center py-2">
              <div style="width: 80px; height: 80px;" class="mr-4 rounded-lg">
                <v-img :src="item.goodsPic" width="80" height="80" cover />
              </div>
              <div>
                <div class="text-body-1 font-weight-medium">{{ item.goodsName }}</div>
                <div v-if="item.specs" class="text-caption text-grey">{{ item.goodsCnname }}</div>
              </div>
            </div>
          </td>
          <td class="text-center">¥{{ item.price.toFixed(2) }}</td>
          <td class="text-center">×{{ item.quantity }}</td>
          <td class="text-center text-error">¥{{ (item.price * item.quantity).toFixed(2) }}</td>
        </tr>
      </tbody>
    </v-table>

    <!-- 订单底部 -->
    <v-divider />
    <v-card-actions class="d-flex flex-column flex-md-row justify-space-between align-center pa-4">
      <div class="order-total mb-2 mb-md-0">
        实付款: <span class="text-error text-h6">¥{{ order.totalAmount.toFixed(2) }}</span>
      </div>

      <div class="d-flex flex-wrap gap-2 justify-end">
        <template v-if="order.status === 0">
          <v-btn color="error" variant="text" prepend-icon="mdi-close" @click="$emit('cancel', order.id)">
            取消订单
          </v-btn>
        </template>

        <!-- <template v-if="order.status === 'shipped'">
          <v-btn color="primary" variant="outlined" prepend-icon="mdi-check" @click="$emit('confirm', order.id)">
            确认收货
          </v-btn>
        </template> -->

        <v-btn variant="text" prepend-icon="mdi-information-outline" @click="$emit('view-detail', order.id)">
          订单详情
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  order: {
    type: Object,
    required: true,
    validator: (value) => {
      return [
        'id',
        'status',
        'createdAt',
        'items',
        'totalAmount'
      ].every(key => key in value)
    }
  }
})

const emit = defineEmits(['cancel', 'pay', 'confirm', 'view-detail'])

// 订单状态配置
const statusConfigMap = {
  0: {
    text: '待发货',
    color: 'info',
    icon: 'mdi-truck-delivery-outline'
  },
  1: {
    text: '待支付',
    color: 'warning',
    icon: 'mdi-credit-card-clock-outline'
  },
  2: {
    text: '已支付',
    color: 'primary',
    icon: 'mdi-package-variant-closed'
  },
  3: {
    text: '已完成',
    color: 'success',
    icon: 'mdi-check-circle-outline'
  },
  4: {
    text: '已取消',
    color: 'error',
    icon: 'mdi-close-circle-outline'
  },
  5: {
    text: '退款/售后',
    color: 'deep-purple',
    icon: 'mdi-cash-refund'
  }
}

// 当前订单状态配置
const statusConfig = computed(() =>
  statusConfigMap[props.order.status] || statusConfigMap.unpaid
)

// 时间格式化
const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}
</script>

<style lang="scss" scoped>
.fs-order-card {
  // 基础样式
  transition: box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;

  // 状态背景色
  &.status-0 {
    background-color: rgba(var(--v-theme-info), 0.08);
  }

  // 待发货
  &.status-1 {
    background-color: rgba(var(--v-theme-warning), 0.08);
  }

  // 待支付
  &.status-2 {
    background-color: rgba(var(--v-theme-primary), 0.08);
  }

  // 已支付
  &.status-3 {
    background-color: rgba(var(--v-theme-success), 0.08);
  }

  // 已完成
  &.status-4 {
    background-color: rgba(var(--v-theme-error), 0.08);
  }

  // 已取消
  &.status-5 {
    background-color: rgba(var(--v-theme-deep-purple), 0.08);
  }

  // 退款/售后

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

}

.order-items-table {
  th {
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.02);
  }

  tr:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.order-total {
  font-size: 1.1rem;
  font-weight: 500;
}

@media (max-width: 960px) {
  .order-items-table {

    th,
    td {
      padding: 8px 4px;
    }


  }
}
</style>
