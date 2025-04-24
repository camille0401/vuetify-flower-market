<template>
  <div class="fs-home-page pb-10">
    <div class='container home-content'>
      <div class="home-banner">
        <img src="@/assets/images/login-bg.jpg" width="100%" height="500" alt="">
      </div>
      <!-- 分类骨架屏 -->
      <Suspense>
        <template #default>
          <HomeCategory />
        </template>
        <template #fallback>
          <v-skeleton-loader type="article" height="500px" class="my-6" color="rgba(0, 0, 0, 0.4)" />
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
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, Suspense } from 'vue';

const HomeCategory = defineAsyncComponent(() => import('./components/HomeCategory.vue'));
const HomeProduct = defineAsyncComponent(() => import('./components/HomeProduct.vue'));

</script>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  // position: absolute;
  // left: 0;
  // top: 0;
}

.category-skeleton {
  width: 250px;
  height: 500px;
  position: relative;
  z-index: 99;
}
</style>
