<template>
  <div class="home-product mt-10">
    <HomePanel :title="cate.cname" v-for="cate in goodsProduct" :key="cate.id">
      <template #main>
        <div class="box">
          <RouterLink class="cover" :to="`/category/1/${cate.id}`">
            <img v-img-lazy="cate.picture" />
            <strong class="label">
              <span>{{ cate.cname }}</span>
              <!-- <span>{{ cate.saleInfo }}</span> -->
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="goods in cate.goods.slice(0, 8)" :key="goods.id">
              <FSGoodsItem :goods="goods" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script setup name="HomeProduct">
import HomePanel from './HomePanel.vue'
import FSGoodsItem from '@/components/FSGoodsItem.vue'
import { getHomeGoodsAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

const goodsProduct = ref([])
const getHomeGoods = async () => {
  const res = await getHomeGoodsAPI()
  goodsProduct.value = res || []
}
onMounted(() => getHomeGoods())

</script>

<style scoped lang='scss'>
.home-product {
  // margin-top: 40px;

  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $fs-base-color-light;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    height: 610px;
    display: flex;
    column-gap: 10px;

    .cover {
      width: 240px;
      height: 100%;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 100%;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      display: grid;
      grid-template-columns: repeat(4, calc((100% - 30px) / 4));
      // grid-template-columns: repeat(4, 240px);
      grid-template-rows: repeat(2, calc((100% - 10px) / 2));
      gap: 10px;
      width: calc(100% - 250px);
      height: 100%;
      overflow: hidden;

      li {
        width: 100%;
      }
    }
  }
}
</style>
