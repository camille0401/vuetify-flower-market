<template>
  <FSPageLoader :fetch="fetchHomeData">
    <template #default="{ data }">
      <section class="fs-home-page pb-10">
        <!-- 首页横幅 -->
        <v-container class="mx-auto position-relative pa-0">
          <div class="home-banner">
            <v-img width="100%" height="100%" aspect-ratio="16/9" cover :src="bannerImg"></v-img>
          </div>
          <HomeCategory v-if="!mobile" />
          <HomeProduct :goodsProduct="data?.products ?? []" />
        </v-container>
      </section>
    </template>
  </FSPageLoader>
</template>

<script setup>
import FSPageLoader from '@/components/FSPageLoader.vue'
import bannerImg from '@/assets/images/login-bg.jpg'
import HomeCategory from './components/HomeCategory.vue'
import HomeProduct from './components/HomeProduct.vue'
import { useDisplay } from 'vuetify'
import { getHomeGoodsAPI } from '@/apis/home'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
const { mobile } = useDisplay();

const fetchHomeData = async () => {
  const [_, productRes] = await Promise.all([
    categoryStore.getCategory(),
    getHomeGoodsAPI()
  ])

  return {
    products: productRes,
  }
}

</script>

<style scoped lang="scss">
.home-banner {
  width: 100%;
  height: 500px;

  /* 响应式调整 */
  @media (max-width: 960px) {
    height: 350px;
  }
}

.category-skeleton {
  width: 250px;
  height: 500px;
  position: relative;
  z-index: 99;
}

.my-6 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
