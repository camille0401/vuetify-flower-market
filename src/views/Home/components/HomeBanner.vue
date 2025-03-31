<template>
  <div class="home-banner">
    <v-carousel height="500" show-arrows="hover" cycle interval="3000" hide-delimiter-background hide-delimiters>
      <v-carousel-item v-for="slide in bannerList" :key="slide.id" :src="slide.imgUrl" cover></v-carousel-item>

      <!-- <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item> -->
    </v-carousel>
  </div>
</template>

<script setup name="HomeBanner">
import { onMounted, ref } from "vue"
import { getBannerAPI } from "@/apis/home"

const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI()
  bannerList.value = res?.result || []
}
onMounted(() => getBanner())

</script>

<style scoped lang='scss'>
.home-banner {
  width: 1200px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

}
</style>
