<template>
  <v-card class="cart-item mb-4" flat>
    <v-card-text class="pa-4">
      <div class="d-flex align-center ga-4">
        <v-checkbox color="primary" hide-details density="compact" :model-value="cart.selected === 1"
          @update:model-value="(e) => $emit('updateSelected', e, cart.goodsId)" />
        <RouterLink class="cart-img" :to="`/detail/${cart.goodsId}`">
          <v-img :src="cart.picture" aspect-ratio="1" />
        </RouterLink>
        <div class="d-flex flex-column ga-1 flex-grow-1 min-width-0">
          <p class="text-body-1 font-weight-medium line-clamp-2">
            {{ cart.name }}
          </p>
          <div class="text-grey">
            {{ $t('cartlist.table.itemsInventory', { inventory: cart.stock }) }}
          </div>
          <div class="d-flex align-center justify-space-between flex-wrap">
            <div class="text-body-1 font-weight-medium text-error">
              {{ $t('global.moneyTemplate', { money: cart.price }) }}
            </div>
            <div class="text-h6 font-weight-medium text-error">
              {{ $t('global.moneyTemplate', { money: calcGoodsTotalPrice(cart.price, cart.count) }) }}
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between pa-4">
      <v-btn variant="text" @click="$emit('deleteItem', cart.goodsId)">
        {{ $t('global.deleteBtn') }}
      </v-btn>
      <div style="min-width: 100px;">
        <FSBoundedNumInput density="compact" :min="1" :max="cart.stock" v-model="cart.count" :debounce="500"
          :data="cart" @change="handleCountChange" @out-of-range="handleOutOfRange"
          @store-count="$emit('storeCount', cart)" />
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import FSBoundedNumInput from '@/components/FSBoundedNumInput.vue'
import Big from 'big.js'
import { useCartCount } from "@/composables/useCartCount"

const { handleCountChange, handleOutOfRange } = useCartCount()

defineProps({
  cart: {
    type: Object,
    default: () => ({}),
  },
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

  .cart-img {
    width: 5rem;
    height: 5rem;
    background: #ffffff;
    border: 0.01rem solid rgb(220, 220, 220);
    overflow: hidden;
  }
}
</style>
