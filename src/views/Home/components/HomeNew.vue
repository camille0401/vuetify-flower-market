<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #main>
      <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img v-img-lazy="item.picture" alt="new-picture" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>

<script setup name="HomeNew">
import HomePanel from './HomePanel.vue'
import { onMounted, ref } from 'vue'
import { getNewAPI } from '@/apis/home'

const newList = ref([])
const getNew = async () => {
  const res = await getNewAPI()
  newList.value = res?.result || []
}
onMounted(() => getNew())

</script>

<style lang="scss" scoped>
.goods-list {
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 30px)/4));
  gap: 10px;

  a {
    display: block;
    height: 406px;
    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 100%;
      height: 306px;
    }

    p {
      font-size: 18px;
      padding: 12px 12px 0;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }

}
</style>
