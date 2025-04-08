<template>
  <div class="fs-category-page">
    <div class="container ">
      <!-- 面包屑 -->
      <v-breadcrumbs color="primary" v-if="route.params.type === '1'">
        <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
        <v-breadcrumbs-item :disabled="true">{{ categoryData.cname }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-breadcrumbs color="primary" v-else>
        <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
        <v-breadcrumbs-item :to="`/category/1/${categoryData.id}`">{{ categoryData.cname }}</v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
        <v-breadcrumbs-item :disabled="true">{{ subCategoryData.cname }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-card class="mx-auto pa-4 mb-4">
        <v-card-item>
          <div class="category-type-box">
            <div class="title">分类</div>
            <ul class="list">
              <li v-for="sub in subCategoryList" :key="sub.id">
                <RouterLink active-class="active" :to="`/category/2/${sub.id}`">{{ sub.cname }}</RouterLink>
              </li>
            </ul>
          </div>
        </v-card-item>
        <v-card-item>
          <v-divider color="#000000"></v-divider>
        </v-card-item>
        <v-card-item>
          <v-tabs color="primary" :model-value="reqData.orderBy" @update:modelValue="tabChange">
            <v-tab value="">综合</v-tab>
            <v-tab value="publishTime">最新商品</v-tab>
            <v-tab value="orderNum">最高人气</v-tab>
            <v-tab value="evaluateNum">评论最多</v-tab>
          </v-tabs>
          <div v-if="goodsList.length > 0" class="category-goods-list mt-10 mb-10">
            <FSGoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
          </div>
          <div v-else class="empty-box">
            <FSEmptyPannel title="暂无数据"></FSEmptyPannel>
          </div>
        </v-card-item>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { getCategoryAPI, getCategoryGoodsAPI } from "@/apis/category"
import { onMounted, onUnmounted, ref } from "vue"
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router"
import FSGoodsItem from "@/components/FSGoodsItem.vue"
import FSEmptyPannel from "@/components/FSEmptyPannel.vue"

const route = useRoute()

// 获取分类导航数据
const categoryData = ref({})
const subCategoryData = ref({})
const subCategoryList = ref([])
const getCategoryData = async (id = route.params.id) => {
  const res = await getCategoryAPI(id);
  if (route.params.type === '2') {
    categoryData.value = sessionStorage.getItem("categoryData") ? JSON.parse(sessionStorage.getItem("categoryData")) : {}
    subCategoryData.value = res?.category || {}
  } else {
    categoryData.value = res?.category || {}
    sessionStorage.setItem("categoryData", JSON.stringify(res?.category || {}))
  }
  subCategoryList.value = res?.subCategorys || []
}

onMounted(() => getCategoryData())


const goodsList = ref([])
const reqData = ref({
  typeId: route.params.id,
  orderBy: '',
})

const getCategoryGoodsData = async (id = route.params.id) => {
  reqData.value.typeId = id;
  const res = await getCategoryGoodsAPI(reqData.value)
  goodsList.value = res?.goods || [];
}
onMounted(() => getCategoryGoodsData())

onBeforeRouteUpdate((to) => {
  getCategoryData(to.params.id)
  getCategoryGoodsData(to.params.id)
})

// 切换排序
const tabChange = () => {
  console.log('排序方式变更:', reqData.value.orderBy);

};

onUnmounted(() => sessionStorage.removeItem("categoryData"))



</script>

<style lang="scss" scoped>
.fs-category-page {
  .bread-container {
    padding: 25px 0;
    color: #666;
  }

  .category-type-box {
    display: flex;
    align-items: center;
    column-gap: 20px;

    .title {
      min-width: max-content;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      font-weight: bold;
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      li {
        display: flex;
        align-items: center;

        a {
          display: flex;
          align-items: center;
          color: #737373;
          font-size: 14px;
          font-weight: lighter;
          line-height: 30px;

          &:hover {
            color: $fs-base-color-dark;
          }

          &.active {
            color: $fs-base-color-dark;
          }

        }

        &:not(:last-child) {
          a::after {
            content: "|";
            display: inline-block;
            width: 28px;
            text-align: center;
            color: #7e7e80;
          }
        }
      }

    }
  }

  .category-goods-list {
    display: grid;
    grid-template-columns: repeat(5, calc((100% - 40px) / 5));
    gap: 10px;
    width: 100%;
    padding: 0 10px;
  }

  .sub-container {
    padding: 20px 0;
    // background-color: #fff;



    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }


  }
}
</style>
