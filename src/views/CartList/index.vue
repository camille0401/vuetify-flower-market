<template>
  <div class="fs-cart-page">
    <v-container class="mx-auto pb-10">
      <v-sheet color="#FFFFFF" class="pa-4">
        <!-- 购物车标题 -->
        <div class="d-flex align-center mb-6">
          <h2 class="text-h5 font-weight-bold">{{ $t('cartlist.title') }}</h2>
          <v-chip class="ml-4" color="primary" small>
            {{ $t('cartlist.totalItems', { count: cartStore.cartAllCount }) }}
          </v-chip>
        </div>

        <!-- 购物车表格（仅桌面端显示） -->
        <div class="cart-table" v-if="!mobile">
          <v-table class="elevation-1">
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
                  <p class="text-body-1">{{ $t('global.moneyTemplate', { money: cart.price }) }}</p>
                </td>
                <td class="text-center">
                  <FSBoundedNumInput v-model="cart.count" :min="1" :max="cart.inventory" :debounce="500" :data="cart"
                    @change="handleCountChange" @out-of-range="handleOutOfRange" @store-count="handleCountStore"
                    class="mx-auto" />
                </td>
                <td class="text-center">
                  <p class="text-body-1 font-weight-bold text-error">
                    {{ $t('global.moneyTemplate', { money: calcGoodsTotalPrice(cart.price, cart.count) }) }}
                  </p>
                </td>
                <td class="text-center">
                  <v-btn icon size="small" variant="text" color="error" @click="handleDelCart(cart.goodsId)">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </td>
              </tr>

              <!-- 空状态 -->
              <tr v-if="cartStore.cartList.length === 0">
                <td colspan="6" class="py-10">
                  <v-empty-state :title="$t('cartlist.empty')">
                    <template #actions>
                      <v-btn color="primary" prepend-icon="mdi-shopping" @click="toHomePage">
                        {{ $t('cartlist.goShopping') }}
                      </v-btn>
                    </template>
                  </v-empty-state>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <!-- 移动端 -->
        <div class="cart-card" v-else>
          <v-card class="cart-item mb-4" flat v-for="cart in cartStore.cartList" :key="cart.goodsId">
            <v-card-text class="d-flex align-center">
              <div style="width: 64px; height: 64px;" class="mr-4 rounded-lg">
                <v-img :src="cart.picture" width="64" height="64" cover class="rounded" />
              </div>
              <div class="flex-grow-1 d-flex flex-column ga-1">
                <div class="text-body-2 font-weight-medium">
                  {{ cart.name }}
                </div>
                <div class="text-caption text-grey">
                  {{ $t('cartlist.table.itemsInventory', { inventory: cart.inventory }) }}
                </div>
                <div class="text-caption">
                  {{ $t('order.detail.price') }}：
                  {{ $t('global.moneyTemplate', { money: cart.price }) }}
                </div>
                <!-- 商品数量 -->
                <div class="d-flex align-center">
                  <div class="mr-2 text-caption text-grey">{{ $t('cartlist.table.quantity') }}</div>
                  <FSBoundedNumInput style="max-width: max-content;" v-model="cart.count" :min="1" :max="cart.inventory"
                    :debounce="500" :data="cart" @change="handleCountChange" @out-of-range="handleOutOfRange"
                    @store-count="handleCountStore" density="compact" />
                </div>
                <!-- 商品小计 -->
                <div class="d-flex align-center">
                  <div class="mr-2 text-caption text-grey">{{ $t('cartlist.table.subtotal') }}</div>
                  <div class="font-weight-bold text-error">
                    {{ $t('global.moneyTemplate', {
                      money: calcGoodsTotalPrice(cart.price, cart.count)
                    }) }}
                  </div>
                </div>
                <!-- 删除 & 勾选 -->
                <div class="d-flex justify-end align-center">
                  <v-btn icon size="small" variant="text" color="error" @click="handleDelCart(cart.goodsId)">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                  <v-checkbox color="primary" hide-details :model-value="cart.selected === 1"
                    @update:model-value="(e) => handleSingleChange(e, cart.goodsId)" />
                </div>

              </div>
            </v-card-text>
          </v-card>
          <!-- 空状态 -->
          <v-card v-if="cartStore.cartList.length === 0" class="cart-item" flat>
            <v-card-text>
              <v-empty-state :title="$t('cartlist.empty')">
                <template #actions>
                  <v-btn color="primary" prepend-icon="mdi-shopping" @click="toHomePage">
                    {{ $t('cartlist.goShopping') }}
                  </v-btn>
                </template>
              </v-empty-state>
            </v-card-text>
          </v-card>
        </div>

        <!-- 结算栏 -->
        <div class="checkout-bar mt-6" v-if="cartStore.cartList.length > 0">
          <v-checkbox color="primary" hide-details :model-value="cartStore.cartIsAll"
            @update:model-value="handleAllChange" class="mr-4">
            <template v-slot:label>
              <span class="text-body-1">{{ $t('cartlist.allSelect') }}</span>
            </template>
          </v-checkbox>

          <v-btn :variant="mobile ? 'outlined' : 'text'" color="error" prepend-icon="mdi-delete-outline"
            :disabled="cartStore.cartSelectedCount === 0" @click="handleDelAllCart">
            {{ $t('cartlist.deleteSelected') }}
          </v-btn>

          <v-spacer></v-spacer>

          <div class="d-flex align-center mr-6">
            <span class="text-body-1 mr-2">
              {{ $t('cartlist.selectedInfo', { count: cartStore.cartSelectedCount }) }}
            </span>
            <span class="text-h6 font-weight-bold text-error">
              {{ $t('global.moneyTemplate', { money: cartStore.cartSelectedPrice }) }}
            </span>
          </div>

          <v-btn color="primary" size="large" :disabled="cartStore.cartSelectedCount === 0" @click="toCreateOrderPage">
            {{ $t('cartlist.checkout') }}
          </v-btn>
        </div>

      </v-sheet>


    </v-container>
  </div>
</template>

<script setup>
import Big from 'big.js'
import FSBoundedNumInput from '@/components/FSBoundedNumInput.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useCartCount } from "@/composables/useCartCount"
import { useOrderDraft } from '@/composables/useOrderDraft'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

const { mobile, smAndDown } = useDisplay() // 使用Vuetify官方断点检测
const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

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
  .cart-table {
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;

    .v-btn {
      height: 48px;
      min-width: 120px;
    }

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;

      .v-btn {
        width: 100%;
      }

      .text-h6 {
        font-size: 1.125rem; // 18px
      }
    }
  }

  .cart-item {
    transition: box-shadow 0.3s ease;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    background-color: #f0f0f0; // 默认或通用灰
  }


  @media (min-width: 600px) and (max-width: 960px) {
    .v-img {
      border-radius: 8px;
    }

    .fs-cart-info {
      padding-left: 16px;
    }
  }

  .v-img {
    object-fit: cover;
    border-radius: 8px;
  }

  .text-error {
    font-size: 16px;
  }
}
</style>
