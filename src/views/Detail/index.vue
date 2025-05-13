<template>
  <section class="fs-flower-goods-page">
    <!-- 加载状态 -->
    <v-container class="mx-auto pb-10">
      <div v-if="detailLoading" class="loading-container">
        <v-progress-circular indeterminate size="64" color="primary" />
      </div>
      <v-sheet v-else color="#FFF">
        <!-- 面包屑导航 -->
        <v-breadcrumbs :items="breadcrumbItems" class="text-body-2">
          <template v-slot:divider>
            <v-icon size="small">mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>

        <v-row justify="center" no-gutters class="pa-4 mb-4 ">
          <v-col cols="12" md="6">
            <div class="media">
              <!-- <ImageView class="product-gallery" :image-list="detailData?.mainPictures || []" /> -->
              <v-img :aspect-ratio="1" class="bg-white" :src="activeImg" width="100%" cover></v-img>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="bg-white pb-4">
            <v-sheet class="d-flex flex-column ga-6 px-4">
              <p class="text-h5 my-2">{{ detailData.cname }}</p>
              <!-- <p class="text-subtitle-1 text-grey-darken-1">{{ detailData.describes }}</p> -->
              <div class="small-img-box">
                <v-slide-group show-arrows>
                  <v-slide-group-item v-for="(img, n) in detailData?.mainPictures ?? []" :key="n"
                    v-slot="{ isSelected, toggle }">
                    <v-sheet class="mr-2" @click="toggle">
                      <img :class="isSelected ? 'active' : ''" width="68px" height="68px" :src="img"
                        @click="handleOnSmallImg(n)" />
                    </v-sheet>
                  </v-slide-group-item>
                </v-slide-group>
              </div>
              <v-row class="align-center" no-gutters>
                <v-col cols="12" class="mr-2 mb-2">
                  <span class="text-body-1 mr-2">{{ $t('detail.product.price') }}：</span>
                  <span class="text-h5 text-primary font-weight-bold">
                    {{ $t('global.moneyTemplate', { money: detailData.price || '0' }) }}
                  </span>
                </v-col>
                <v-col cols="12">
                  <span class="text-body-1 mr-2">{{ $t('detail.product.total') }}：</span>
                  <span class="text-h5 text-error font-weight-bold">
                    {{ $t('global.moneyTemplate', { money: allPrice }) }}
                  </span>
                </v-col>
              </v-row>

              <!-- 数量选择 -->
              <!-- <div class="d-flex align-center">
                <label class="text-body-1 mr-2">{{ $t('detail.product.quantity') }}：</label>
                <FSBoundedNumInput v-model="count" :min="1" :max="detailData.inventory" :debounce="300"
                  @change="handleCountChange" @out-of-range="handleOutOfRange" />
              </div> -->

              <v-row class="align-center" no-gutters>
                <v-col cols="auto" class="mr-2">
                  <label class="text-body-1">{{ $t('detail.product.quantity') }}：</label>
                </v-col>
                <v-col cols="auto">
                  <FSBoundedNumInput v-model="count" :min="1" :max="detailData.inventory" :debounce="300"
                    @change="handleCountChange" @out-of-range="handleOutOfRange" />
                </v-col>
              </v-row>


              <div class="d-flex">
                <span class="text-caption text-grey mr-2">
                  {{ $t('detail.product.stock') }}：{{ detailData.inventory || '0' }}
                </span>
                <span class="text-caption text-grey">
                  {{ $t('detail.product.sold') }}：{{ detailData.salesCount || '0' }}
                </span>
              </div>
              <v-row class="g-2 g-sm-0">
                <v-col cols="12" sm="6">
                  <v-btn color="primary-darken-1" size="x-large" block prepend-icon="mdi-cart-plus"
                    :loading="addingToCartLoading" @click="handleAddCart">
                    {{ $t('detail.product.addToCart') }}
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn color="error" size="x-large" block @click="handleBuyNow">
                    {{ $t('detail.product.buyNow') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>

          </v-col>
        </v-row>

        <!-- 商品详情 -->
        <div class="goods-detail-section">
          <v-tabs v-model="activeTab" color="primary" grow>
            <v-tab value="details">{{ $t('detail.product.details') }}</v-tab>
            <v-tab value="specs">{{ $t('detail.product.specs') }}</v-tab>
            <v-tab value="reviews">{{ $t('detail.product.reviews') }}</v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="mt-4">
            <v-window-item value="details">
              <div class="detail-images">
                <img v-for="(img, index) in detailData.detailPictures" :src="img" :key="index"
                  :alt="`${$t('detail.product.detailImage')} ${index + 1}`" class="detail-image" />
              </div>
            </v-window-item>

            <v-window-item value="specs">
              <div class="specs-content pa-4">
                <p>{{ $t('detail.product.specContent') }}</p>
              </div>
            </v-window-item>

            <v-window-item value="reviews">
              <div class="reviews-content pa-4">
                <p>{{ $t('detail.product.reviewContent') }}</p>
              </div>
            </v-window-item>
          </v-window>
        </div>
      </v-sheet>
    </v-container>
  </section>
</template>

<script setup>
import ImageView from './components/ImageView.vue'
import FSBoundedNumInput from '@/components/FSBoundedNumInput.vue'
import Big from 'big.js'
import { ref, computed, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { getDetailAPI } from '@/apis/detail'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useCartCount } from '@/composables/useCartCount'
import { useOrderDraft } from '@/composables/useOrderDraft'
import { useDebounceFn } from '@vueuse/core'

const { t } = useI18n()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const { handleCountChange, handleOutOfRange } = useCartCount()
const { saveDraft } = useOrderDraft()


const detailData = ref(null)
const count = ref(1)
const addingToCartLoading = ref(false)
const activeTab = ref('details')
const detailLoading = ref(true)
const activeImgIndex = ref(0)


// 面包屑导航
const breadcrumbItems = computed(() => [
  { title: t('detail.common.home'), disabled: false, href: '/' },
  { title: detailData.value?.cname || t('detail.product.productList'), disabled: true }
])

const calcGoodsTotalPrice = (price, count) => {
  return new Big(price).times(count).toString()
}

const allPrice = computed(() => calcGoodsTotalPrice(detailData.value?.price || 0, count.value))

const activeImg = computed(() => {
  if (!detailData.value?.mainPictures) return ""
  return detailData.value?.mainPictures[activeImgIndex.value]
})

const handleOnSmallImg = (ind) => {
  activeImgIndex.value = ind
}

const fetchDetailData = async (id = route.params.id) => {
  try {
    const res = await getDetailAPI(id)
    detailData.value = res
  } catch (error) {
    console.error(t('detail.product.failedToLoad'), error)
  } finally {
    detailLoading.value = false
  }
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
      ...detailData.value,
      count: count.value,
      selected: 1,
      picture: detailData.value?.mainPictures?.[0],
      goodsId: detailData.value?.id
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
    id: detailData.value.id,
    goodsId: detailData.value.id,
    name: detailData.value.name,
    picture: detailData.value?.mainPictures?.[0],
    price: detailData.value.price,
    goodsCount: count.value,
    totalAmount: calcGoodsTotalPrice(detailData.value.price, count.value),
    totalPayAmount: calcGoodsTotalPrice(detailData.value.price, count.value),
  }]
  const summary = {
    goodsCount: count.value,
    postFee: '',
    totalAmount: calcGoodsTotalPrice(detailData.value.price, count.value),
    totalPayAmount: calcGoodsTotalPrice(detailData.value.price, count.value)
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

onMounted(() => fetchDetailData())
onBeforeRouteUpdate((to) => {
  count.value = 1
  fetchDetailData(to.params.id)
})
</script>

<style lang="scss" scoped>
.fs-flower-goods-page {
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }

  .media {
    border: 1px solid rgba(0, 0, 0, .2);
  }

  .small-img-box {
    width: 100%;
    min-height: 68px;

    img {
      border: 1px solid rgba(0, 0, 0, .2);
      transition: border-color .5s ease-in;

      &:hover,
      &.active {
        border-color: rgb(var(--v-theme-primary));
      }
    }


  }

  .goods-detail-section {
    .detail-images .detail-image {
      width: 100%;
      margin-bottom: 16px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }


  }
}
</style>
