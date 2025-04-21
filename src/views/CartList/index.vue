<template>
  <div class="fs-cart-page">
    <div class="container pb-10">
      <v-card elevation="2" rounded="lg">
        <v-card-text class="pa-6">
          <!-- 购物车标题 -->
          <div class="d-flex align-center mb-6">
            <v-icon color="primary" size="large" class="mr-2">mdi-cart</v-icon>
            <h2 class="text-h5 font-weight-bold">{{ $t('cartlist.title') }}</h2>
            <v-chip class="ml-4" color="primary" small>
              {{ $t('cartlist.totalItems', { count: cartStore.cartAllCount }) }}
            </v-chip>
          </div>

          <!-- 购物车表格 -->
          <div class="cart-table">
            <v-table class="elevation-1">
              <thead>
                <tr>
                  <th width="60" class="pl-4">
                    <v-checkbox color="primary" hide-details :model-value="cartStore.cartIsAll"
                      @update:model-value="handleAllChange"></v-checkbox>
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
                <tr v-for="cart in cartStore.cartList" :key="cart.goodsId">
                  <td class="pl-4">
                    <v-checkbox color="primary" hide-details :model-value="cart.selected === 1 ? true : false"
                      @update:model-value="(e) => handleSingleChange(e, cart.goodsId)"></v-checkbox>
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
                          {{ $t('cartlist.table.itemsInventory', { inventory: cart.inventory }) }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">
                    <p class="text-body-1">¥{{ cart.price }}</p>
                  </td>
                  <td class="text-center">
                    <FSBoundedNumInput v-model="cart.count" :min="1" :max="cart.inventory" :debounce="500" :data="cart"
                      @change="handleCountChange" @out-of-range="handleOutOfRange" @store-count="handleCountStore"
                      class="mx-auto" />
                  </td>
                  <td class="text-center">
                    <p class="text-body-1 font-weight-bold text-error">
                      ¥{{ calcGoodsTotalPrice(cart.price, cart.count) }}
                    </p>
                  </td>
                  <td class="text-center">
                    <v-btn icon size="small" variant="text" color="error" @click="handleDelCart(cart.goodsId)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>

                <!-- 空状态 -->
                <tr v-if="cartStore.cartList.length === 0">
                  <td colspan="6" class="py-10">
                    <FSEmptyPanel :title="$t('cartlist.empty')">
                      <template #actions>
                        <v-btn color="primary" prepend-icon="mdi-shopping" @click="toHomePage">
                          {{ $t('cartlist.goShopping') }}
                        </v-btn>
                      </template>
                    </FSEmptyPanel>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>

          <!-- 结算栏 -->
          <div class="checkout-bar mt-6" v-if="cartStore.cartList.length > 0">
            <div class="d-flex align-center">
              <v-checkbox color="primary" hide-details :model-value="cartStore.cartIsAll"
                @update:model-value="handleAllChange" class="mr-4">
                <template v-slot:label>
                  <span class="text-body-1">{{ $t('cartlist.allSelect') }}</span>
                </template>
              </v-checkbox>

              <v-btn variant="text" color="error" prepend-icon="mdi-delete-outline"
                :disabled="cartStore.cartSelectedCount === 0" @click="handleDelAllCart">
                {{ $t('cartlist.deleteSelected') }}
              </v-btn>

              <v-spacer></v-spacer>

              <div class="d-flex align-center mr-6">
                <span class="text-body-1 mr-2">
                  {{ $t('cartlist.selectedInfo', { count: cartStore.cartSelectedCount }) }}
                </span>
                <span class="text-h6 font-weight-bold text-error">
                  ¥{{ cartStore.cartSelectedPrice }}
                </span>
              </div>

              <v-btn color="primary" size="large" :disabled="cartStore.cartSelectedCount === 0"
                @click="toCreateOrderPage">
                {{ $t('cartlist.checkout') }}
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import Big from 'big.js'
import FSEmptyPanel from '@/components/FSEmptyPanel.vue'
import FSBoundedNumInput from '@/components/FSBoundedNumInput.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useOrderStore } from '@/stores/order'
import { useCartCount } from "@/composables/useCartCount"
import { useOrderDraft } from '@/composables/useOrderDraft'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const { handleCountChange, handleOutOfRange } = useCartCount()
const { saveDraft } = useOrderDraft()


// 计算商品总价
const calcGoodsTotalPrice = (price, count) => {
  return new Big(price).times(count).toString()
}

// 单个选择切换
const handleSingleChange = (selected, goodsId) => {
  console.log(selected)
  cartStore.singleCheck(goodsId, selected)
}

// 全选/取消全选
const handleAllChange = (selected) => {
  console.log(selected)
  cartStore.allCheck(selected)
}

// 删除单个商品
const handleDelCart = (goodsId) => {
  cartStore.delCart(goodsId)
  toast.success(t('cartlist.toast.delMessage'))

}

// 删除选中商品
const handleDelAllCart = () => {
  const goodsIds = cartStore.cartList
    .filter(item => item.selected)
    .map(item => item.goodsId)

  if (goodsIds.length > 0) {
    cartStore.delAllCart(goodsIds)
    toast.success(t('cartlist.toast.delSelectedMessage', { count: goodsIds.length }))
  }
}

// 数量变更存储
const handleCountStore = (goods) => {
  cartStore.countChange(goods)
}

// 去结算
const toCreateOrderPage = () => {
  // 生成订单，存储到orderStore
  const goodsList = cartStore.cartList.filter(item => item.selected).map(item => {
    return {
      id: item.id,
      goodsId: item.goodsId,
      name: item.name,
      // attrsText: item.
      picture: item.picture,
      price: item.price,
      goodsCount: item.count,
      totalAmount: calcGoodsTotalPrice(item.price, item.count),
      totalPayAmount: calcGoodsTotalPrice(item.price, item.count),
    }
  })
  const summary = {
    goodsCount: cartStore.cartSelectedCount,
    postFee: '', //运费
    totalAmount: cartStore.cartSelectedPrice,
    totalPayAmount: cartStore.cartSelectedPrice
  }
  saveDraft({ goodsList, summary })
  if (!userStore.token) {
    toast.warning(t('cartlist.toast.loginMessge'))
    router.push({
      path: '/user/login',
      query: { redirect: '/order/checkout' }
    })
  } else {
    router.push({ path: '/order/checkout' })
  }

}

// 返回首页
const toHomePage = () => {
  router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
.fs-cart-page {
  W .cart-table {
    border-radius: 8px;
    overflow: hidden;

    :deep(.v-table__wrapper) {
      border-radius: 8px;
    }

    tr:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }

  .checkout-bar {
    background-color: #fafafa;
    border-radius: 8px;
    padding: 16px 24px;

    .v-btn {
      height: 48px;
      min-width: 120px;
    }
  }

  @media (max-width: 960px) {
    .cart-table {
      overflow-x: auto;

      table {
        min-width: 800px;
      }
    }

    .checkout-bar {
      flex-direction: column;
      gap: 16px;
      align-items: flex-end;

      .v-btn {
        width: 100%;
      }
    }
  }
}
</style>
