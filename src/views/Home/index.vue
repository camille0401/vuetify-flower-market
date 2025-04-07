<template>
  <div class="fs-home-page pb-10">
    <div class='container home-content'>
      <HomeCategory />
      <HomeBanner />
      <HomeNew />
      <HomeHot />
      <HomeProduct />
    </div>
  </div>
</template>

<script setup name='Home'>
import { defineAsyncComponent, onMounted } from 'vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeBanner from './components/HomeBanner.vue';

// const HomeNav = defineAsyncComponent(() => import('./components/HomeNav.vue'));
// const HomeBanner = defineAsyncComponent(() => import('./components/HomeBanner.vue'));
// const HomeCategory = defineAsyncComponent(() => import('./components/HomeCategory.vue'));
const HomeNew = defineAsyncComponent(() => import('./components/HomeNew.vue'));
const HomeHot = defineAsyncComponent(() => import('./components/HomeHot.vue'));
const HomeProduct = defineAsyncComponent(() => import('./components/HomeProduct.vue'));


</script>

<style scoped lang="scss"></style>
