<template>
  <div class="home-product mt-10">
    <HomePanel v-for="cate in goodsProduct" :key="cate.id" :title="cate.cname">
      <template #main>
        <div class="box">
          <RouterLink class="cover" :to="`/category/1/${cate.id}`" aria-label="查看分类">
            <img v-img-lazy="cate.picture" :alt="cate.cname" />
            <strong class="label">
              <span>{{ cate.cname }}</span>
            </strong>
          </RouterLink>

          <ul class="goods-list">
            <li v-for="goods in cate.goods.slice(0, 8)" :key="goods.id">
              <FSGoodsItem :goods="goods" imgHeight="210px" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import HomePanel from './HomePanel.vue'
import FSGoodsItem from '@/components/FSGoodsItem.vue'
import { getHomeGoodsAPI } from '@/apis/home'

const goodsProduct = ref([])

const getHomeGoods = async () => {
  try {
    const res = await getHomeGoodsAPI()
    goodsProduct.value = res || []
  } catch (error) {
    console.error('获取商品数据失败:', error)
    goodsProduct.value = []
  }
}

onMounted(() => {
  getHomeGoods()
})
</script>

<style scoped lang="scss">
.home-product {
  .box {
    display: flex;
    gap: 15px;
    height: 610px;

    .cover {
      position: relative;
      width: 240px;
      height: 100%;
      overflow: hidden;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);

        .label {
          opacity: 0.9;
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.03);
      }

      .label {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 66px;
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        font-size: 18px;
        font-weight: 500;
        opacity: 0.8;
        transition: opacity 0.3s ease;

        span {
          flex: 1;
          text-align: center;
          padding: 0 10px;
        }
      }
    }

    .goods-list {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 15px;

      li {
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .home-product .box {
    height: auto;
    flex-direction: column;

    .cover {
      width: 100%;
      height: 300px;
    }

    .goods-list {
      width: 100%;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 768px) {
  .home-product .box .goods-list {
    grid-template-columns: 1fr;
  }
}
</style>
