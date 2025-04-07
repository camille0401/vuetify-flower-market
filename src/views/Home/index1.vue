<template>
  <div class="fs-home-page pb-10">
    <div class='container home-content'>
      <HomeCategory />
      <div class="home-banner">
        <img src="@/assets/images/login-bg.jpg" width="100%" height="500" alt="">
      </div>
      <HomeProduct />

    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeProduct from './components/HomeProduct.vue';

</script>

<style scoped lang="scss">
.home-banner {
  width: 1200px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
