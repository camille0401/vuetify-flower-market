<template>
  <v-card class="fs-order-card-mobile mb-2">
    <!-- 订单头部 -->
    <v-card-title class="d-flex justify-space-between align-center px-3 py-2">
      <div class="text-subtitle-2 font-weight-medium">
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
      <div v-for="item in order.itemsDtos" :key="item.id" class="d-flex align-center py-4 item-order">
        <div style="width: 120px; height: 120px;" class="mr-2 rounded-lg">
          <v-img :src="item.goodsPic" width="120" height="120" cover aspect-ratio="1" />
        </div>
        <div class="flex-grow-1">
          <div class="text-body-2 font-weight-medium">
            {{ item.goodsName }}
          </div>
          <div class="text-caption text-grey">
            {{ item.goodsCnname }}
          </div>
          <div class="mt-1 text-caption">
            {{ $t('order.detail.price') }}：
            {{ $t('global.moneyTemplate', { money: item.price.toFixed(2) }) }}
            {{ $t('global.countTemplate', { count: item.quantity }) }}
          </div>
        </div>
      </div>
    </v-card-text>

    <!-- 订单总价 -->
    <v-card-text class="px-3 pt-2 pb-0">
      <div class="text-right font-weight-medium text-body-2">
        {{ $t('order.detail.final') }}
        <span class="text-error text-h6 ml-1">
          {{ $t('global.moneyTemplate', { money: order.totalAmount.toFixed(2) }) }}
        </span>
      </div>
    </v-card-text>

    <!-- 操作按钮 -->
    <v-card-actions class="d-flex justify-end px-3 pt-2 pb-2 flex-wrap gap-2">
      <template v-if="order.status === 0">
        <v-btn color="error" variant="text" size="small" prepend-icon="mdi-close" @click="$emit('cancel', order.id)">
          {{ $t('member.order.itemCancelBtn') }}
        </v-btn>
      </template>

      <v-btn variant="text" size="small" prepend-icon="mdi-information-outline" @click="$emit('view-detail', order.id)">
        {{ $t('member.order.itemDetailBtn') }}
      </v-btn>
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
    required: true
  },
  orderTabs: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['cancel', 'pay', 'confirm', 'view-detail'])

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

  .v-img {
    border-radius: 8px;
  }

  .item-order {

    &:not(:last-child) {
      border-bottom: 1px solid #eaeaea;
    }
  }

}
</style>
