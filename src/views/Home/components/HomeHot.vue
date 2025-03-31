<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <template #main>
      <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img v-img-lazy="item.picture" alt="hot-picture">
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>

<script setup name="HomeHot">
import HomePanel from './HomePanel.vue'
import { onMounted, ref } from 'vue'
import { getHotAPI } from '@/apis/home'

const hotList = ref([])
const getHot = async () => {
  const res = await getHotAPI()
  hotList.value = res?.result || []
}
onMounted(() => getHot())

</script>

<style lang="scss" scoped>
.goods-list {
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 30px)/4));
  gap: 10px;

  a {
    display: block;
    height: 406px;
    transition: all .5s;
    background-color: #FFFFFF;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 100%;
      height: 306px;
    }

    p {
      font-size: 20px;
      padding: 12px 12px 0;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
