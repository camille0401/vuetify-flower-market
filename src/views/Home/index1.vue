<template>
  <div class="fs-home-page pb-10">
    <HomeNav />
    <div class='container home-content'>
      <HomeCategory />
      <HomeBanner />

    </div>
  </div>
</template>

<script setup name='Home'>
import { defineAsyncComponent, onMounted } from 'vue';
import HomeNav from './components/HomeNav.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeBanner from './components/HomeBanner.vue';
import { getHomeGoodsTypeAPI, getHomeGoodsAPI } from '@/apis/test';

const getData = async () => {
  const res = await getHomeGoodsTypeAPI();
  console.log(res)
}

onMounted(() => getData())

const getData1 = async () => {
  const res = await getHomeGoodsAPI();
  console.log(res)
}

onMounted(() => getData1())

</script>

<style scoped lang="scss"></style>
