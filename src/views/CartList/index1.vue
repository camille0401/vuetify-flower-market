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

                  <v-card-text class="d-flex flex-column ga-6	">
                    <!-- 价格信息 -->
                    <div class="price-section">
                      <div class="d-flex align-center mb-2">
                        <span class="text-body-1 mr-2">单价：</span>
                        <span class="text-h5 text-primary font-weight-bold">
                          {{ detailData.price || '0' }}
                        </span>
                      </div>
                      <div class="d-flex align-center">
                        <span class="text-body-1 mr-2">总计：</span>
                        <span class="text-h5 text-error font-weight-bold">
                          {{ allPrice }}
                        </span>
                      </div>
                    </div>
                    <!-- 数量选择 -->
                    <div class="quantity-section">
                      <div class="d-flex align-center mb-4">
                        <label class="text-body-1 mr-4">数量：</label>
                        <FSBoundedNumInput v-model="count" :min="1" :max="detailData.inventory" :debounce="500"
                          @change="handleCountChange" @out-of-range="handleOutOfRange" />
                      </div>
                      <div class="stock-info">
                        <span class="text-caption text-grey mr-4">
                          库存：{{ detailData.inventory || '0' }}件
                        </span>
                        <span class="text-caption text-grey">
                          已售：{{ detailData.salesCount || '0' }}件
                        </span>
                      </div>
                    </div>
                    <!-- 操作按钮 -->
                    <div class="action-buttons">
                      <v-btn color="primary-darken-1" size="x-large" class="mr-4" prepend-icon="mdi-cart-plus"
                        @click="handleAddCart" :loading="addingToCart">
                        加入购物车
                      </v-btn>
                      <v-btn color="error" size="x-large" to="/settlement" @click="handleBuyNow">
                        立即购买
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>

            <!-- 商品详情 -->
            <div class="goods-detail-section mt-8">
              <v-tabs v-model="activeTab" color="primary" grow>
                <v-tab value="details">商品详情</v-tab>
                <v-tab value="specs">规格参数</v-tab>
                <v-tab value="reviews">用户评价</v-tab>
              </v-tabs>

              <v-window v-model="activeTab" class="mt-4">
                <v-window-item value="details">
                  <div class="detail-images">
                    <img v-for="(img, index) in detailData.detailPictures" :src="img" :key="index"
                      :alt="`商品详情图 ${index + 1}`" class="detail-image">
                  </div>
                </v-window-item>

                <v-window-item value="specs">
                  <div class="specs-content pa-4">
                    <p>规格参数内容待补充</p>
                  </div>
                </v-window-item>

                <v-window-item value="reviews">
                  <div class="reviews-content pa-4">
                    <p>用户评价内容待补充</p>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useToast } from 'vue-toastification'
import { getDetailAPI } from '@/apis/detail'
import { useCartStore } from '@/stores/cart'
import { useCartCount } from "@/composables/useCartCount"
import ImageView from './components/ImageView.vue'
import FSBoundedNumInput from '@/components/FSBoundedNumInput.vue'

const toast = useToast()
const route = useRoute()
const cartStore = useCartStore()
const { handleCountChange, handleOutOfRange } = useCartCount()

// 数据状态
const detailData = ref(null)
const count = ref(1)
const addingToCart = ref(false)
const activeTab = ref('details')

// 计算属性
const allPrice = computed(() => (detailData.value?.price || 0) * count.value)
const breadcrumbItems = computed(() => [
  { title: '首页', disabled: false, href: '/' },
  { title: detailData.value?.cname || '商品详情', disabled: true }
])

// 获取商品详情
const fetchDetailData = async (id = route.params.id) => {
  try {
    const res = await getDetailAPI(id)
    detailData.value = res || {}
  } catch (error) {
    console.error('获取商品详情失败:', error)
    toast.error('获取商品详情失败，请稍后重试')
  }
}

// 添加到购物车
const handleAddCart = async () => {
  if (count.value <= 0) {
    toast.warning('请选择正确的商品数量')
    return
  }

  addingToCart.value = true
  try {
    await cartStore.addCart({
      ...detailData.value,
      count: count.value,
      selected: true,
      picture: detailData.value?.mainPictures?.[0],
      goodsId: detailData.value?.id
    })
    toast.success('已添加到购物车')
  } catch (error) {
    console.error('添加到购物车失败:', error)
    toast.error('添加到购物车失败，请稍后重试')
  } finally {
    addingToCart.value = false
  }
}

// 立即购买
const handleBuyNow = () => {
  if (count.value <= 0) {
    toast.warning('请选择正确的商品数量')
    return
  }
  // 这里可以添加直接购买的逻辑
}

// 生命周期钩子
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

  // 商品信息区域
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
      min-width: 0;

      .product-gallery {
        border-radius: 8px;
        // overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .spec {
      width: 500px;
      min-width: 0;
    }
  }

  // 价格区域
  .price-section {
    .text-h5 {
      &::before {
        content: "¥";
        font-size: 0.8em;
      }
    }
  }

  // 数量选择区域
  .quantity-section {
    .stock-info {
      margin-top: 8px;
    }
  }

  // 操作按钮区域
  .action-buttons {
    display: flex;
    gap: 16px;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  // 商品详情区域
  .goods-detail-section {
    .detail-images {
      .detail-image {
        width: 100%;
        margin-bottom: 16px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
