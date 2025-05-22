<template>
  <v-card class="fs-order-card-mobile mb-2">
    <!-- 订单头部 -->
    <v-card-title class="d-flex justify-space-between align-center px-3 py-2">
      <div class="text-subtitle-1 text-break font-weight-medium">
        {{ $t('order.detail.orderNo') }} {{ order.orderNo }}
      </div>
      <v-chip :color="statusConfig.color" :prepend-icon="statusConfig.icon" size="x-small" variant="flat">
        {{ statusConfig.text }}
      </v-chip>
    </v-card-title>

    <!-- 时间 -->
    <v-card-subtitle class="px-3 py-0 text-caption text-grey">
      {{ $t('order.detail.createdAt') }} {{ formatTime(order.createdAt) }}
    </v-card-subtitle>

    <!-- 商品简要信息（只显示第一件）-->
    <v-card-text class="px-3 pt-2 pb-0">
      <transition-group name="fade">
        <div v-for="item in visibleItems" :key="item.id" class="d-flex align-center py-4 item-order">
          <div style="width: 120px; height: 120px;" class="mr-2 rounded-lg">
            <v-img :src="item.goodsPic" width="120" height="120" cover aspect-ratio="1" />
          </div>
          <div class="flex-grow-1">
            <div class="text-body-1 font-weight-medium">
              {{ item.goodsName }}
            </div>
            <div class="mt-1">
              {{ $t('order.detail.price') }}：
              {{ $t('global.moneyTemplate', { money: item.price.toFixed(2) }) }}
              {{ $t('global.countTemplate', { count: item.quantity }) }}
            </div>
          </div>
        </div>
      </transition-group>
      <div v-if="hasMoreItems" class="text-center py-2">
        <v-btn @click="toggleExpand" variant="text" size="small" color="primary">
          {{ isExpanded ? '收起' : '查看更多' }}
          <v-icon end>{{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </div>
    </v-card-text>

    <v-divider />
    <!-- 操作按钮 -->
    <v-card-actions class="d-flex flex-column flex-sm-row justify-space-between align-end px-3">
      <div class="d-flex align-center font-weight-500">
        <span class="text-body-2">{{ $t('order.detail.final') }}</span>
        <span class="text-error text-h6 ml-1">
          {{ $t('global.moneyTemplate', { money: order.totalAmount.toFixed(2) }) }}
        </span>
      </div>
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
    required: true
  },
  orderTabs: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['cancel', 'pay', 'confirm', 'view-detail'])

const { t } = useI18n()
const { isExpanded, visibleItems, hasMoreItems, toggleExpand } = useExpandableList(props.order.itemsDtos, 1)

const statusConfigMap = computed(() => {
  const map = {}
  props.orderTabs.forEach(tab => {
    map[tab.value] = {
      text: t(tab.label),
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

const statusConfig = computed(() => statusConfigMap.value[props.order.status] || defaultStatus)

const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}
</script>

<style scoped lang="scss">
.fs-order-card-mobile {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  background-color: #f0f0f0; // 默认或通用灰

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .item-order {
    &:not(:first-child) {
      border-top: 1px solid rgba(var(--v-theme-surface-variant), 0.2);
    }
  }
}
</style>
