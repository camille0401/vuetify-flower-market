<template>
  <v-table class="cart-table elevation-1" v-if="list.length > 0">
    <thead>
      <tr>
        <th width="60" class="pl-4">
          <!-- <v-checkbox color="primary" hide-details :model-value="cartStore.cartIsAll"
                    @update:model-value="handleAllChange"></v-checkbox> -->
        </th>
        <th width="400">{{ $t('cartlist.table.product') }}</th>
        <th width="180" class="text-center">{{ $t('cartlist.table.price') }}</th>
        <th width="200" class="text-center">{{ $t('cartlist.table.quantity') }}</th>
        <th width="180" class="text-center">{{ $t('cartlist.table.subtotal') }}</th>
        <th width="120" class="text-center">{{ $t('cartlist.table.actions') }}</th>
      </tr>
    </thead>

    <!-- 商品列表 -->
    <tbody>
      <tr v-for="cart in list" :key="cart.goodsId">
        <td class="pl-4">
          <v-checkbox color="primary" hide-details :model-value="cart.selected === 1 ? true : false"
            @update:model-value="(e) => $emit('updateSelected', e, cart.goodsId)"></v-checkbox>
        </td>
        <td>
          <div class="d-flex align-center">
            <RouterLink :to="`/detail/${cart.goodsId}`" class="mr-4">
              <v-img :src="cart.picture" width="80" height="80" cover class="rounded-lg"></v-img>
            </RouterLink>
            <div>
              <p class="text-body-1 font-weight-medium mb-1">
                {{ cart.name }}
              </p>
              <p class="text-caption text-grey">
                {{ $t('cartlist.table.itemsInventory', { inventory: cart.stock }) }}
              </p>
            </div>
          </div>
        </td>
        <td class="text-center">
          <p class="text-body-1">{{ $t('global.moneyTemplate', { money: cart.price }) }}</p>
        </td>
        <td class="text-center">
          <FSBoundedNumInput :min="1" :max="cart.stock" v-model="cart.count" :debounce="500" :data="cart"
            @change="handleCountChange" @out-of-range="handleOutOfRange" @store-count="$emit('storeCount', cart)"
            class="mx-auto" />
        </td>
        <td class="text-center">
          <p class="text-body-1 font-weight-bold text-error">
            {{ $t('global.moneyTemplate', { money: calcGoodsTotalPrice(cart.price, cart.count) }) }}
          </p>
        </td>
        <td class="text-center">
          <v-btn icon size="small" variant="text" color="error" @click="$emit('deleteItem', cart.goodsId)">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
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
.cart-table {

  :deep(.v-table__wrapper) {
    border-radius: 8px;
  }

  tr:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
}
</style>
