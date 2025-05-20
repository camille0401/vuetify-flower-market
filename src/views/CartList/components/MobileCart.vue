<template>
  <v-card class="cart-item mb-4" flat v-for="cart in list" :key="cart.goodsId">
    <v-card-text class="pa-3">
      <v-row>
        <v-col cols="4">
          <v-img :src="cart.picture" aspect-ratio="1" />
        </v-col>
        <v-col cols="8" class="d-flex align-center">
          <div class="d-flex flex-column ga-1 ga-sm-4	">
            <div class="font-weight-medium line-clamp-2">
              {{ cart.name }}
            </div>
            <div class="text-grey">
              {{ $t('cartlist.table.itemsInventory', { inventory: cart.stock }) }}
            </div>
            <div class="d-flex align-center flex-wrap">
              <div class="text-grey-darken-1 mr-2">
                {{ $t('order.detail.price') }}
              </div>
              <div class="font-weight-bold text-primary">
                {{ $t('global.moneyTemplate', { money: cart.price }) }}
              </div>
            </div>
            <!-- 商品数量 -->
            <div class="d-flex align-center">
              <div class="mr-2  text-grey" style="min-width: max-content;">
                {{ $t('cartlist.table.quantity') }}
              </div>
              <div style="min-width: 100px;">
                <FSBoundedNumInput density="compact" :min="1" :max="cart.stock" v-model="cart.count" :debounce="500"
                  :data="cart" @change="handleCountChange" @out-of-range="handleOutOfRange"
                  @store-count="$emit('storeCount', cart)" />
              </div>
            </div>
            <!-- 商品小计 -->
            <div class="d-flex align-center">
              <div class="mr-2 text-grey">{{ $t('cartlist.table.subtotal') }}</div>
              <div class="font-weight-bold text-error">
                {{ $t('global.moneyTemplate', {
                  money: calcGoodsTotalPrice(cart.price, cart.count)
                }) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <!-- 删除 & 勾选 -->
      <div class="d-flex justify-space-between align-center pa-2">
        <v-checkbox color="primary" hide-details density="compact" :model-value="cart.selected === 1"
          @update:model-value="(e) => $emit('updateSelected', e, cart.goodsId)" class="mr-4" />
        <v-btn icon variant="text" color="error" @click.stop="$emit('deleteItem', cart.goodsId)">
          <v-icon size="20">mdi-trash-can</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import FSBoundedNumInput from '@/components/FSBoundedNumInput.vue'
import Big from 'big.js'
import { useCartCount } from "@/composables/useCartCount"

const { handleCountChange, handleOutOfRange } = useCartCount()

defineProps({
  list: {
    type: Array,
    default: [],
  }
})

defineEmits(['storeCount', 'updateSelected', 'deleteItem'])

// 计算商品总价
const calcGoodsTotalPrice = (price, count) => {
  return new Big(price).times(count).toString()
}

</script>

<style lang="scss" scoped>
/* 移动端卡片容器 */
.cart-item {
  transition: box-shadow 0.3s ease;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  background-color: #f0f0f0; // 默认或通用灰
}
</style>
