<template>
  <div class="fs-sub-category-page">
    <div class="container ">
      <!-- 面包屑 -->
      <v-breadcrumbs color="primary">
        <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
        <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
        <v-breadcrumbs-item :disabled="true">{{ categoryData.cname }}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-card class="mx-auto pa-4 mb-4">
        <v-card-item>
          <div class="category-type-box">
            <div class="title">分类</div>
            <ul class="list">
              <li v-for="sub in subCategoryList" :key="sub.id">
                <RouterLink active-class="active" :to="`/category/sub/${sub.id}`">{{ sub.cname }}</RouterLink>
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
          <div v-if="goodsList.length > 0" class="category-goods-list mb-10">
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
import { useCategory } from "@/composables/useCategory"
import FSGoodsItem from "@/components/FSGoodsItem.vue"
import FSEmptyPannel from "@/components/FSEmptyPanel.vue"

const { categoryData,
  subCategoryList,
  goodsList } = useCategory;

console.log(categoryData)
// const route = useRoute();

// // 获取分类导航数据
// const categoryData = ref({});
// const subCategoryList = ref([])
// const getCategoryData = async (id = route.params.id) => {
//   const res = await getCategoryAPI(id)
//   categoryData.value = res?.category || {}
//   subCategoryList.value = res?.subCategorys || []
// }
// onMounted(() => getCategoryData())



// const goodsList = ref([])
// const reqData = ref({
//   typeId: route.params.id,
//   orderBy: '',
// })

// const getCategoryGoodsData = async (id = route.params.id) => {
//   reqData.value.typeId = id;
//   const res = await getCategoryGoodsAPI(reqData.value)
//   goodsList.value = res?.goods || [];
// }
// onMounted(() => getCategoryGoodsData())

// onBeforeRouteUpdate((to) => {
//   getCategoryData(to.params.id)
//   getCategoryGoodsData(to.params.id)
// })

// // 切换排序
// const tabChange = () => {
//   console.log('排序方式变更:', reqData.value.orderBy);

// };




</script>

<style lang="scss" scoped>
.fs-sub-category-page {
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
            color: $fs-primary-color;
          }

          &.active {
            color: $fs-primary-color;
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
