<template>
  <div class="fs-flower-goods-page">
    <div class="container pb-10" v-if="detailData">
      <v-card elevation="2" rounded="lg">
        <!-- 面包屑导航 -->
        <v-card-title class="px-6 pt-6 pb-4">
          <v-breadcrumbs :items="breadcrumbItems" class="px-0">
            <template v-slot:divider>
              <v-icon size="small">mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-card-title>

        <v-card-text class="px-6 pb-6">
          <!-- 商品信息 -->
          <div class="info-container">
            <div class="goods-info">
              <!-- 图片预览区 -->
              <div class="media">
                <ImageView class="product-gallery" :image-list="detailData.mainPictures || []" />
              </div>

              <!-- 商品规格 -->
              <div class="spec">
                <v-card flat color="background" class="h-100">
                  <v-card-title class="text-h5 font-weight-bold">
                    {{ detailData.cname }}
                  </v-card-title>
                  <v-card-subtitle class="text-subtitle-1 text-grey-darken-1 mt-2">
                    {{ detailData.describes }}
                  </v-card-subtitle>

                  <v-divider class="my-4" />

                  <v-card-text class="d-flex flex-column ga-6">
                    <!-- 价格信息 -->
                    <div class="price-section">
                      <div class="d-flex align-center mb-2">
                        <span class="text-body-1 mr-2">{{ $t('detail.product.price') }}：</span>
                        <span class="text-h5 text-primary font-weight-bold">
                          {{ detailData.price || '0' }}
                        </span>
                      </div>
                      <div class="d-flex align-center">
                        <span class="text-body-1 mr-2">{{ $t('detail.product.total') }}：</span>
                        <span class="text-h5 text-error font-weight-bold">
                          {{ allPrice }}
                        </span>
                      </div>
                    </div>

                    <!-- 数量选择 -->
                    <div class="quantity-section">
                      <div class="d-flex align-center mb-4">
                        <label class="text-body-1 mr-4">{{ $t('detail.product.quantity') }}：</label>
                        <FSBoundedNumInput v-model="count" :min="1" :max="detailData.inventory" :debounce="300"
                          @change="handleCountChange" @out-of-range="handleOutOfRange" />
                      </div>
                      <div class="stock-info">
                        <span class="text-caption text-grey mr-4">
                          {{ $t('detail.product.stock') }}：{{ detailData.inventory || '0' }}
                        </span>
                        <span class="text-caption text-grey">
                          {{ $t('detail.product.sold') }}：{{ detailData.salesCount || '0' }}
                        </span>
                      </div>
                    </div>

                    <!-- 操作按钮 -->
                    <div class="action-buttons">
                      <v-btn color="primary-darken-1" size="x-large" class="mr-4" prepend-icon="mdi-cart-plus"
                        @click="handleAddCart" :loading="addingToCart">
                        {{ $t('detail.product.addToCart') }}
                      </v-btn>
                      <v-btn color="error" size="x-large" @click="handleBuyNow">
                        {{ $t('detail.product.buyNow') }}
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>

            <!-- 商品详情 -->
            <div class="goods-detail-section mt-8">
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
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- 加载状态 -->
    <div v-else class="loading-container">
      <v-progress-circular indeterminate size="64" color="primary" />
    </div>
  </div>
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
import { useCartCount } from '@/composables/useCartCount'
import { useOrderStore } from '@/stores/order'

const { t } = useI18n()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const { handleCountChange, handleOutOfRange } = useCartCount()

const detailData = ref(null)
const count = ref(1)
const addingToCart = ref(false)
const activeTab = ref('details')


// 面包屑导航
const breadcrumbItems = computed(() => [
  { title: t('detail.common.home'), disabled: false, href: '/' },
  { title: detailData.value?.cname || t('detail.product.productList'), disabled: true }
])

const calcGoodsTotalPrice = (price, count) => {
  return new Big(price).times(count).toString()
}

const allPrice = computed(() => calcGoodsTotalPrice(detailData.value?.price || 0, count.value))

const fetchDetailData = async (id = route.params.id) => {
  try {
    const res = await getDetailAPI(id)
    detailData.value = res
  } catch (error) {
    console.error(t('detail.product.failedToLoad'), error)
    // toast.error(t('detail.product.failedToLoad'))
  }
}

const checkQuantity = () => {
  if (count.value <= 0) {
    toast.warning(t('detail.product.pleaseSelectQuantity'))
    return false
  }
  return true
}

const handleAddCart = async () => {
  if (!checkQuantity()) return

  addingToCart.value = true
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
    addingToCart.value = false
  }
}

const handleBuyNow = () => {
  if (!checkQuantity()) return

  orderStore.setGoodsList([{
    id: detailData.value.id,
    goodsId: detailData.value.id,
    name: detailData.value.name,
    picture: detailData.value?.mainPictures?.[0],
    price: detailData.value.price,
    goodsCount: count.value,
    totalAmount: calcGoodsTotalPrice(detailData.value.price, count.value),
    totalPayAmount: calcGoodsTotalPrice(detailData.value.price, count.value),
  }])
  orderStore.setSummary({
    goodsCount: count.value,
    postFee: '',
    totalAmount: calcGoodsTotalPrice(detailData.value.price, count.value),
    totalPayAmount: calcGoodsTotalPrice(detailData.value.price, count.value)
  })
  router.push({ path: '/order/create' })
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

  .goods-info {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin-bottom: 40px;

    @media (max-width: 960px) {
      flex-direction: column;
    }

    .media {
      width: 400px;

      .product-gallery {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .spec {
      width: 500px;
    }
  }

  .price-section {
    .text-h5::before {
      content: '¥';
      font-size: 0.8em;
    }
  }

  .quantity-section .stock-info {
    margin-top: 8px;
  }

  .action-buttons {
    display: flex;
    gap: 16px;

    @media (max-width: 600px) {
      flex-direction: column;
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
