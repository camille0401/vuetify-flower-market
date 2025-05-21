<template>
  <section class="fs-flower-goods-page">
    <!-- 加载状态 -->
    <v-container class="mx-auto pb-10">
      <div v-if="detailLoading" class="loading-container">
        <v-progress-circular indeterminate size="64" color="primary" />
      </div>
      <v-sheet v-else color="surface" elevation="2">
        <!-- 面包屑导航 -->
        <v-breadcrumbs :items="breadcrumbItems" class="text-body-2">
          <template v-slot:divider>
            <v-icon size="small">mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <div class="pa-4 pt-0 mb-4">
          <DetailCard :detailData="detailData" />
        </div>
        <!-- 商品详情 -->
        <div class="goods-detail-section">
          <v-tabs v-model="activeTab" color="primary" grow>
            <v-tab value="details">{{ $t('detail.product.details') }}</v-tab>
            <!-- <v-tab value="specs">{{ $t('detail.product.specs') }}</v-tab>
            <v-tab value="reviews">{{ $t('detail.product.reviews') }}</v-tab> -->
          </v-tabs>

          <v-window v-model="activeTab" class="mt-4">
            <v-window-item value="details">
              <div class="detail-images">
                <v-img v-for="(img, index) in detailData.detailPictures" :src="img" :key="index"
                  :alt="`${$t('detail.product.detailImage')} ${index + 1}`" class="detail-image" />
              </div>
            </v-window-item>

            <!-- <v-window-item value="specs">
              <div class="specs-content text-center pa-10">
                <p>{{ $t('detail.product.specContent') }}</p>
              </div>
            </v-window-item>

            <v-window-item value="reviews">
              <div class="reviews-content text-center pa-10">
                <p>{{ $t('detail.product.reviewContent') }}</p>
              </div>
            </v-window-item> -->
          </v-window>
        </div>
      </v-sheet>
    </v-container>
  </section>
</template>

<script setup>
// import ImageView from './components/ImageView.vue'
import DetailCard from '@/components/FSGoodsItem/DetailCard.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getDetailAPI } from '@/apis/detail'

const { t } = useI18n()
const route = useRoute()


const detailData = ref(null)
const count = ref(1)
const activeTab = ref('details')
const detailLoading = ref(true)


// 面包屑导航
const breadcrumbItems = computed(() => [
  { title: t('detail.common.home'), disabled: false, href: '/' },
  { title: detailData.value?.cname || t('detail.product.productList'), disabled: true }
])


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

  .goods-detail-section {
    .detail-images .detail-image {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

  }

}
</style>
