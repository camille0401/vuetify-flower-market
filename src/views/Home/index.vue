<template>
  <section class="fs-home-page pb-10">
    <!-- 首页横幅 -->
    <v-container class="mx-auto position-relative pa-0">
      <div class="home-banner">
        <v-img width="100%" height="100%" aspect-ratio="16/9" cover :src="bannerImg"></v-img>
      </div>

      <!-- 分类骨架屏 -->
      <Suspense>
        <template #default>
          <HomeCategory v-show="!mobile" />
        </template>
        <template #fallback>
          <v-skeleton-loader v-show="!mobile" type="article" height="500px" class="my-6" color="rgba(0, 0, 0, 0.4)" />
        </template>
      </Suspense>

      <!-- 商品骨架屏 -->
      <Suspense>
        <template #default>
          <HomeProduct />
        </template>
        <template #fallback>
          <v-skeleton-loader type="image, text" height="400px" class="my-6" />
        </template>
      </Suspense>
    </v-container>
  </section>
</template>

<script setup>
import { defineAsyncComponent, Suspense } from 'vue';
import { useDisplay } from 'vuetify';
import bannerImg from '@/assets/images/login-bg.jpg';

const { mobile } = useDisplay();

const HomeCategory = defineAsyncComponent(() => import('./components/HomeCategory.vue'));
const HomeProduct = defineAsyncComponent(() => import('./components/HomeProduct.vue'));
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
