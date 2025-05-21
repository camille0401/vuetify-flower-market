<template>
  <v-row no-gutters>
    <v-col cols="12" md="5" class="d-flex justify-center img-box bg-white">
      <v-img :src="activeImg" max-width="100%" max-height="100%" cover alt="商品图片" />
    </v-col>
    <v-col cols="12" md="7" class="d-flex flex-column ga-6 pt-4 pt-md-0 pl-md-6">
      <p class="text-h5">{{ detailData?.name }}</p>
      <div class="small-img-box">
        <v-slide-group>
          <v-slide-group-item v-for="(img, n) in detailData?.mainPictures ?? []" :key="n"
            v-slot="{ isSelected, toggle }">
            <v-sheet class="mr-2" @click="toggle">
              <img :class="isSelected ? 'active' : ''" width="68px" height="68px" :src="img"
                @click="handleOnSmallImg(n)" />
            </v-sheet>
          </v-slide-group-item>
        </v-slide-group>
      </div>
      <p class="text-h5 text-error font-weight-bold">{{ $t('global.moneyTemplate', {
        money: detailData.price || '0'
      }) }}</p>
      <div class="number-box">
        <FSBoundedNumInput v-model="count" :min="1" :max="detailData.inventory" :debounce="300"
          @change="handleCountChange" @out-of-range="handleOutOfRange" />
      </div>
      <div class="d-flex">
        <span class="text-caption text-grey mr-2">
          {{ $t('detail.product.stock') }}：{{ detailData.inventory || '0' }}
        </span>
        <span class="text-caption text-grey">
          {{ $t('detail.product.sold') }}：{{ detailData.salesCount || '0' }}
        </span>
      </div>
      <div class="action-buttons">
        <v-btn class="flex-grow-1" color="primary-darken-1" size="large" rounded="0" prepend-icon="mdi-cart-plus"
          :loading="addingToCartLoading" @click="handleAddCart">
          {{ $t('detail.product.addToCart') }}
        </v-btn>
        <v-btn class="flex-grow-1" color="error" size="large" rounded="0" @click="handleBuyNow">
          {{ $t('detail.product.buyNow') }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import FSBoundedNumInput from '@/components/FSBoundedNumInput.vue'
import Big from 'big.js'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useCartCount } from '@/composables/useCartCount'
import { useOrderDraft } from '@/composables/useOrderDraft'
import { useDebounceFn } from '@vueuse/core'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const { saveDraft } = useOrderDraft()


const props = defineProps({
  detailData: {
    type: Object,
    default: {}
  }
})

const { handleCountChange, handleOutOfRange } = useCartCount()

const addingToCartLoading = ref(false)
const activeImgIndex = ref(0)
const count = ref(1)


const activeImg = computed(() => {
  if (!props.detailData?.mainPictures) return ""
  return props.detailData?.mainPictures[activeImgIndex.value]
})


const calcGoodsTotalPrice = (price, count) => {
  return new Big(price).times(count).toString()
}


const handleOnSmallImg = (ind) => {
  activeImgIndex.value = ind
}

const checkQuantity = () => {
  if (count.value <= 0) {
    toast.warning(t('detail.product.pleaseSelectQuantity'))
    return false
  }
  return true
}

const addToCart = async () => {
  addingToCartLoading.value = true
  try {
    await cartStore.addCart({
      ...props.detailData,
      count: count.value,
      selected: 1,
      picture: props.detailData.mainPictures?.[0],
      goodsId: props.detailData.id
    })
    toast.success(t('detail.product.addedToCart'))
  } catch (error) {
    console.error('添加到购物车失败:', error)
  } finally {
    addingToCartLoading.value = false
  }
}

const debouncedAddCart = useDebounceFn(addToCart, 500)

const handleAddCart = async () => {
  if (!checkQuantity()) return
  if (addingToCartLoading.value) return // 防止重复点击
  debouncedAddCart()
}

const handleBuyNow = () => {
  if (!checkQuantity()) return
  const goodsList = [{
    id: props.detailData.id,
    goodsId: props.detailData.id,
    name: props.detailData.name,
    picture: props.detailData.mainPictures?.[0],
    price: props.detailData.price,
    goodsCount: count.value,
    totalAmount: calcGoodsTotalPrice(props.detailData.price, count.value),
    totalPayAmount: calcGoodsTotalPrice(props.detailData.price, count.value),
  }]
  const summary = {
    goodsCount: count.value,
    postFee: '',
    totalAmount: calcGoodsTotalPrice(props.detailData.price, count.value),
    totalPayAmount: calcGoodsTotalPrice(props.detailData.price, count.value)
  }
  saveDraft({ goodsList, summary })
  if (!userStore.token) {
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
.img-box {
  border: 0.01rem solid rgb(204, 204, 204);
  max-width: 100%;
  max-height: 500px;
}

.number-box {
  max-width: 100%;
  width: 200px;
}

.action-buttons {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);

  // 📱 小屏幕优化
  @media screen and (max-width: 768px) {
    gap: 8px;
  }
}
</style>
