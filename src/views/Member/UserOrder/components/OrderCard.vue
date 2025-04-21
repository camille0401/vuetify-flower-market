<template>
  <v-card class="fs-order-card" :class="`status-${order.status}`" elevation="2" outlined>
    <!-- 订单头部 -->
    <v-card-title class="d-flex align-center justify-space-between pa-4">
      <div class="d-flex flex-column flex-md-row gap-2 align-center">
        <span class="text-body-1 font-weight-medium mr-2">
          {{ $t('order.detail.orderNo') }} {{ order.orderNo }}</span>
        <span class="text-caption text-grey">
          {{ $t('order.detail.createdAt') }} {{ formatTime(order.createdAt) }}</span>
      </div>
      <v-chip :color="statusConfig.color" :prepend-icon="statusConfig.icon" size="small">
        {{ statusConfig.text }}
      </v-chip>
    </v-card-title>

    <!-- 商品列表 -->
    <v-table density="compact" class="order-items-table bg-transparent px-2">
      <thead>
        <tr>
          <th class="text-left">{{ $t('order.detail.goodsInfo') }}</th>
          <th class="text-center">{{ $t('order.detail.price') }}</th>
          <th class="text-center">{{ $t('order.detail.quantity') }}</th>
          <th class="text-center">{{ $t('order.detail.subtotal') }}</th>
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
          <td class="text-center">
            {{ $t('global.moneyTemplate', { money: item.price.toFixed(2) }) }}
          </td>
          <td class="text-center">
            {{ $t('global.countTemplate', { count: item.quantity }) }}
          </td>
          <td class="text-center text-error">
            {{ $t('global.moneyTemplate', { money: (item.price * item.quantity).toFixed(2) }) }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- 订单底部 -->
    <v-divider />
    <v-card-actions class="d-flex flex-column flex-md-row justify-space-between align-center pa-4">
      <div class="order-total mb-2 mb-md-0">
        {{ $t('order.detail.final') }}<span class="text-error text-h6">
          {{ $t('global.moneyTemplate', { money: order.totalAmount.toFixed(2) }) }}
        </span>
      </div>

      <div class="d-flex flex-wrap gap-2 justify-end">
        <template v-if="order.status === 0">
          <v-btn color="error" variant="text" prepend-icon="mdi-close" @click="$emit('cancel', order.id)">
            {{ $t('member.order.itemCancelBtn') }}
          </v-btn>
        </template>

        <!-- <template v-if="order.status === 'shipped'">
          <v-btn color="primary" variant="outlined" prepend-icon="mdi-check" @click="$emit('confirm', order.id)">
            确认收货
          </v-btn>
        </template> -->

        <v-btn variant="text" prepend-icon="mdi-information-outline" @click="$emit('view-detail', order.id)">
          {{ $t('member.order.itemDetailBtn') }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
  },
  orderTabs: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['cancel', 'pay', 'confirm', 'view-detail'])

// 构建状态配置映射
const statusConfigMap = computed(() => {
  const map = {}
  props.orderTabs.forEach(tab => {
    map[tab.value] = {
      text: t(tab.label), // 使用 i18n key
      color: tab.color || 'info',
      icon: tab.icon || 'mdi-alert-circle-outline'
    }
  })
  return map
})

const defaultStatus = {
  text: t('member.order.status.unknown'),
  color: 'grey',
  icon: 'mdi-alert-circle-outline'
}

// 当前订单状态配置
const statusConfig = computed(() =>
  statusConfigMap.value[props.order.status] || defaultStatus
)

// 时间格式化
const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}
</script>

<style lang="scss" scoped>
.fs-order-card {
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  &.status-0 {
    background-color: rgba(var(--v-theme-info), 0.05);
  }

  &.status-1 {
    background-color: rgba(var(--v-theme-warning), 0.05);
  }

  &.status-2 {
    background-color: rgba(var(--v-theme-primary), 0.05);
  }

  &.status-3 {
    background-color: rgba(var(--v-theme-success), 0.05);
  }

  &.status-4 {
    background-color: rgba(var(--v-theme-error), 0.05);
  }

  &.status-5 {
    background-color: rgba(var(--v-theme-deep-purple), 0.05);
  }
}

.order-items-table {
  th {
    font-weight: 600;
    font-size: 0.875rem;
    background-color: #f9f9f9;
    color: #555;
    border-bottom: 1px solid #eee;
  }

  td {
    font-size: 0.875rem;
    vertical-align: middle;
    padding: 12px 8px;
  }

  tr:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  v-img {
    border-radius: 8px;
    object-fit: cover;
  }
}

.order-total {
  font-size: 1rem;
  font-weight: 500;

  .text-error {
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: 4px;
  }
}

.v-card-actions {
  flex-wrap: wrap;

  .v-btn {
    min-width: 120px;
    margin: 4px 0;
  }
}

@media (max-width: 960px) {

  .order-items-table th,
  .order-items-table td {
    padding: 6px 4px;
    font-size: 0.8rem;
  }

  .fs-order-card {
    border-radius: 8px;
  }

  .v-card-title {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 4px;
  }
}
</style>
