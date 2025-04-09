<template>
  <div class="fs-home-page pb-10">
    <div class='container home-content'>
      <div class="home-banner">
        <img src="@/assets/images/login-bg.jpg" width="100%" height="500" alt="">
      </div>
      <HomeCategory />
      <HomeProduct />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
// import HomeCategory from './components/HomeCategory.vue';

const HomeCategory = defineAsyncComponent(() => import('./components/HomeCategory.vue'));
const HomeProduct = defineAsyncComponent(() => import('./components/HomeProduct.vue'));

</script>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
