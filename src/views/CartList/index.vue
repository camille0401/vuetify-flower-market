<template>
  <section class="fs-cartlist-page">
    <v-container class="mx-auto pb-10">
      <v-sheet color="surface" class="pa-4" elevation="2">
        <FSTitlePanel :title="$t('cartlist.title')" />

        <!-- 移动端 -->
        <template v-if="mobile">
          <MobileCard v-for="cart in cartStore.cartList" :key="cart.goodsId" :cart="cart" @storeCount="handleCountStore"
            @updateSelected="handleSingleChange" @deleteItem="handleDelCart" />
        </template>
        <!-- 购物车表格（仅桌面端显示） -->
        <template v-else>
          <PcTable :list="cartStore.cartList" @storeCount="handleCountStore" @updateSelected="handleSingleChange"
            @deleteItem="handleDelCart" />
        </template>

        <!-- 空状态 -->
        <v-empty-state v-if="cartStore.cartList.length === 0" :title="$t('cartlist.empty')"
          :text="$t('cartlist.emptySubtitle')">
          <template #media>
            <v-img :src="EmptyCart" alt="Empty Cart" max-width="80%" max-height="80" class="mx-auto mb-2"
              aspect-ratio="1" />
          </template>
          <template #actions>
            <v-btn color="primary" prepend-icon="mdi-shopping" to="/">
              {{ $t('cartlist.goShopping') }}
            </v-btn>
          </template>
        </v-empty-state>

        <!-- 结算栏 -->
        <div v-else class="checkout-bar mt-4">
          <v-checkbox color="primary" hide-details :model-value="cartStore.cartIsAll"
            @update:model-value="handleAllChange" class="mr-4">
            <template v-slot:label>
              <span class="text-body-1">{{ $t('cartlist.allSelect') }}</span>
            </template>
          </v-checkbox>

          <v-btn variant="outlined" color="error" prepend-icon="mdi-trash-can" size="large"
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
  </section>
</template>

<script setup>
import EmptyCart from '@/assets/svgs/empty-cart.svg'
import FSTitlePanel from '@/components/FSTitlePanel/index.vue'
import MobileCard from './components/MobileCard.vue'
import PcTable from './components/PcTable.vue'
import Big from 'big.js'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useOrderDraft } from '@/composables/useOrderDraft'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay() // 使用Vuetify官方断点检测
const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const { saveDraft } = useOrderDraft()

// 计算商品总价
const calcGoodsTotalPrice = (price, count) => {
  return new Big(price).times(count).toString()
}

// 单个选择切换
const handleSingleChange = (selected, goodsId) => {
  // console.log(selected)
  cartStore.singleCheck(goodsId, selected)
}

// 全选/取消全选
const handleAllChange = (selected) => {
  // console.log(selected)
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

</script>

<style lang="scss" scoped>
.fs-cartlist-page {
  .checkout-bar {
    background-color: #fafafa;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;

      .text-h6 {
        font-size: 1.125rem; // 18px
      }
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
