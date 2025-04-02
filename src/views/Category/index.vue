<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <v-breadcrumbs bg-color="primary">
          <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
          <v-breadcrumbs-item :disabled="true">{{ categoryData.name }}</v-breadcrumbs-item>
        </v-breadcrumbs>
      </div>
      <!-- 轮播图 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="category in categoryData.children" :key="category.id">
            <RouterLink :to="`/category/sub/${category.id}`">
              <img v-img-lazy="category.picture" />
              <p>{{ category.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <FSGoodsItem v-for="goods in item.goods" :goods="goods" :key="goods.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="Category">
import FSGoodsItem from '@/components/FSGoodsItem.vue'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getCategoryAPI } from '@/apis/category'

const route = useRoute();
const categoryData = ref({})
const getCategoryData = async (id = route.params.id) => {
  const res = await getCategoryAPI(id)
  categoryData.value = res?.result || {}
}
onMounted(() => getCategoryData())
onBeforeRouteUpdate((to) => {
  getCategoryData(to.params.id)
})

</script>
<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .bread-container {
    padding: 25px 0;
  }

  .home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    position: relative;

    img {
      width: 100%;
      height: 500px;
    }
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          display: block;
          text-align: center;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $fs-base-color-dark;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      // display: flex;
      // justify-content: space-around;
      display: grid;
      grid-template-columns: repeat(5, calc((100% - 30px) / 5));
      gap: 10px;
      width: 100%;
      padding: 0 0 30px;
    }
  }


}
</style>
