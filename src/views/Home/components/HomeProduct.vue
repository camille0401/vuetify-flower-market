<template>
  <div class="home-product py-10">
    <HomePanel v-for="cate in goodsProduct" :key="cate.id" :title="cate.cname"
      :sub-title="$t('global.homeProductSubTitle')">
      <template #main>
        <div class="box" :class="{ loaded: goodsProduct.length > 0 }">
          <RouterLink class="cover" :to="`/category/1/${cate.id}`" aria-label="查看分类">
            <img v-img-lazy="cate.picture" :alt="cate.cname" class="category-image" />
            <div class="label">
              <span>{{ cate.cname }}</span>
              <v-icon icon="mdi mdi-chevron-right"></v-icon>
            </div>
          </RouterLink>

          <ul class="goods-list">
            <li v-for="goods in cate.goods.slice(0, 8)" :key="goods.id" class="goods-item">
              <FSGoodsItem :goods="goods" :img-height="imgHeight" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import HomePanel from './HomePanel.vue'
import FSGoodsItem from '@/components/FSGoodsItem.vue'
import { getHomeGoodsAPI } from '@/apis/home'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const imgHeight = computed(() => mdAndDown.value ? '180px' : '200px')
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
  --grid-gap: clamp(12px, 1.5vw, 20px);
  --cover-width: clamp(240px, 25vw, 280px);
  --goods-aspect: 3/4;

  .box {
    display: flex;
    gap: var(--grid-gap);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    &.loaded {
      opacity: 1;
      transform: none;
    }

    .cover {
      width: var(--cover-width);
      flex-shrink: 0;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px) scale(1.02);

        .label {
          opacity: 0.95;
          transform: scale(1.05);
        }
      }

      .category-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        aspect-ratio: var(--goods-aspect);
        transition: transform 0.4s ease;
      }

      .label {
        position: absolute;
        left: 0;
        bottom: 20px; // 从底部上移留出呼吸空间
        width: 100%;
        padding: 14px 16px;
        opacity: 0.9;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        background: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(4px);

        // 文字部分
        span {
          color: #fff;
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
        }

        // 箭头图标
        .v-icon {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.8em;
          opacity: 1;
        }
      }


    }

    .goods-list {
      flex: 1;
      display: grid;
      gap: var(--grid-gap);
      grid-template-columns: repeat(4, 1fr); // 固定 4 列
      grid-auto-rows: 1fr;

      .goods-item {
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          z-index: 2;
        }
      }
    }

  }
}

@media (max-width: 1200px) {
  .home-product {
    --cover-width: 100%;
    --goods-aspect: 16/9;

    .box {
      flex-direction: column;
      height: auto;

      .cover {
        height: 400px;
      }

      .goods-list {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media (max-width: 768px) {
  .home-product .box .goods-list {
    grid-template-columns: repeat(2, 1fr);
  }

  // 响应式调整
  @media (max-width: 768px) {
    .label {
      bottom: 12px;
      padding: 10px 12px;

      span {
        font-size: 1.1rem;
      }

      .v-icon {
        font-size: 1.4em;
      }
    }
  }
}

@media (max-width: 480px) {
  .home-product {
    --grid-gap: 10px;

    .box {
      .cover {
        height: 240px;

        .label span {
          font-size: 1.1rem;
        }
      }

      .goods-list {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
