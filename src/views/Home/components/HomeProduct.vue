<template>
  <div class="home-product">
    <HomePanel :title="cate.cname" v-for="cate in goodsProduct" :key="cate.id">
      <template #main>
        <div class="box">
          <ul class="goods-list">
            <li v-for="goods in cate.goods" :key="goods.id">
              <GoodsItem :goods="goods" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script setup name="HomeProduct">
import HomePanel from './HomePanel.vue'
import GoodsItem from '@/components/FSGoodsItem.vue'
import { getHomeGoodsAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

const goodsProduct = ref([])
const getHomeGoods = async () => {
  const res = await getHomeGoodsAPI()
  goodsProduct.value = res.slice(0, 8) || []
}
onMounted(() => getHomeGoods())

</script>

<style scoped lang='scss'>
.home-product {
  margin-top: 20px;

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
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
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
            width: 76px;
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
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, calc((100% - 30px) / 4));
      gap: 10px;

      li {
        width: 100%;
        // height: 300px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
