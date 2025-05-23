<template>
  <v-card class="fs-order-card" outlined>
    <!-- 订单头部 -->
    <v-card-title class="d-flex align-center justify-space-between pa-4">
      <div class="d-flex flex-column flex-md-row gap-2 align-center">
        <span class="text-body-1 font-weight-medium mr-2">
          {{ $t('order.detail.orderNo') }} {{ order.orderNo }}</span>
        <span class="text-caption text-grey">
          {{ $t('order.detail.createdAt') }} {{ formatTime(order.createdAt) }}</span>
      </div>
      <v-chip :color="statusConfig.color" :prepend-icon="statusConfig.icon" size="small" variant="flat">
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
      <transition-group name="fade" tag="tbody">
        <tr v-for="item in visibleItems" :key="item.id">
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
      </transition-group>
      <tr v-if="hasMoreItems">
        <td colspan="4" class="text-center py-2">
          <v-btn @click="toggleExpand" variant="text" size="small" color="primary">
            {{ isExpanded ? $t('global.expandText') : $t('global.hasMoreText') }}
            <v-icon end>{{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </td>
      </tr>
    </v-table>

    <!-- 订单底部 -->
    <v-divider />
    <v-card-actions class="d-flex flex-column flex-md-row justify-space-between align-center pa-4">
      <div class="order-total mb-2 mb-md-0">
        {{ $t('order.detail.final') }}<span class="text-error text-h6">
          {{ $t('global.moneyTemplate', { money: order.totalAmount.toFixed(2) }) }}
        </span>
      </div>
      <v-spacer />
      <div class="d-flex flex-wrap gap-2 justify-end">
        <v-btn v-if="order.status === 0" color="error" variant="text" prepend-icon="mdi-close"
          @click="$emit('cancel', order.id)">
          {{ $t('member.order.itemCancelBtn') }}
        </v-btn>
        <v-btn variant="text" prepend-icon="mdi-information-outline" @click="$emit('view-detail', order.id)">
          {{ $t('member.order.itemDetailBtn') }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useExpandableList } from '@/composables/useExpandableList'

const props = defineProps({
  order: {
    type: Object,
    required: true,
    default: () => ({})
  },
  orderTabs: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['cancel', 'pay', 'confirm', 'view-detail'])

const { t } = useI18n()
const { isExpanded, visibleItems, hasMoreItems, toggleExpand } = useExpandableList(props.order.itemsDtos, 1)


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
  border-radius: 16px;
  padding: 0;
  border: 1px solid #eaeaea;
  background-color: #f0f0f0; // 默认或通用灰
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0.5rem 1rem;
  transition: 0.3s cubic-bezier(0, 0, 0.5, 1);

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 2px 4px 12px;
    transform: scale3d(1.01, 1.01, 1.01) translateZ(0px);
  }
}

.order-items-table {
  th {
    // background-color: #fafafa;
    color: #666;
    border-bottom: 1px solid #eaeaea;
    font-size: 0.85rem;
  }

  td {
    font-size: 0.85rem;
    padding: 10px 6px;
  }

  v-img {
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
