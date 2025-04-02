<template>
  <div class="fs-sub-category-page">
    <div class="container ">
      <!-- 面包屑 -->
      <div class="bread-container">
        <v-breadcrumbs bg-color="primary">
          <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
          <v-breadcrumbs-item :to="{ path: `/category/${categoryFilterData.parentId}` }">{{
            categoryFilterData.parentName }}</v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
          <v-breadcrumbs-item :disabled="true">{{ categoryFilterData.name }}</v-breadcrumbs-item>
        </v-breadcrumbs>
      </div>
      <div class="sub-container">
        <v-tabs color="success" v-model="reqData.sortField" @update:modelValue="tabChange">
          <v-tab value="publishTime">最新商品</v-tab>
          <v-tab value="orderNum">最高人气</v-tab>
          <v-tab value="evaluateNum">评论最多</v-tab>
        </v-tabs>
        <!-- <v-infinite-scroll :key="reqData.sortField" @load="onLoad">
          <template v-slot:default>
            <div class="listss">
              <FSGoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
            </div>
          </template>
<template v-slot:loading>
            <v-progress-circular color="primary" indeterminate />
          </template>
<template v-slot:empty>
            <v-alert type="warning">没有更多数据了!</v-alert>
          </template>
</v-infinite-scroll> -->
        <v-tabs-window v-model="reqData.sortField">
          <v-tabs-window-item value="publishTime">
            <v-infinite-scroll @load="onLoad">
              <template v-slot:default>
                <div class="listss">
                  <FSGoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
                </div>
              </template>
              <template v-slot:loading>
                <v-progress-circular color="primary" indeterminate />
              </template>
              <template v-slot:empty>
                <v-alert type="warning">没有更多数据了!</v-alert>
              </template>
            </v-infinite-scroll>
          </v-tabs-window-item>
          <v-tabs-window-item value="orderNum">
            <v-infinite-scroll @load="onLoad">
              <template v-slot:default>
                <div class="listss">
                  <FSGoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
                </div>
              </template>
              <template v-slot:loading>
                <v-progress-circular color="primary" indeterminate />
              </template>
              <template v-slot:empty>
                <v-alert type="warning">没有更多数据了!</v-alert>
              </template>
            </v-infinite-scroll>
          </v-tabs-window-item>
          <v-tabs-window-item value="evaluateNum">
            <v-infinite-scroll @load="onLoad">
              <template v-slot:default>
                <div class="listss">
                  <FSGoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
                </div>
              </template>
              <template v-slot:loading>
                <v-progress-circular color="primary" indeterminate />
              </template>
              <template v-slot:empty>
                <v-alert type="warning">没有更多数据了!</v-alert>
              </template>
            </v-infinite-scroll>
          </v-tabs-window-item>
        </v-tabs-window>

      </div>
    </div>
  </div>
</template>

<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category"
import { onMounted, ref, watch, nextTick } from "vue"
import { useRoute } from "vue-router"
import FSGoodsItem from "@/components/FSGoodsItem.vue"

const route = useRoute();

// 获取分类导航数据
const categoryFilterData = ref({});
const getCategoryFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryFilterData.value = res?.result || {}
}
onMounted(() => getCategoryFilterData())

// 获取商品列表
const goodsList = ref([])
const loading = ref(false)
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})

// const getGoodsList = async () => {
//   const res = await getSubCategoryAPI(reqData.value)
//   goodsList.value = res?.result?.items || []
// }
// onMounted(() => getGoodsList())

// 无限滚动加载
const onLoad = async ({ done }) => {
  if (loading.value) return; // 防止重复请求

  loading.value = true;
  try {
    const res = await getSubCategoryAPI(reqData.value);

    if (res?.result?.items?.length) {
      goodsList.value = [...goodsList.value, ...res.result.items];
      reqData.value.page++;
      done(); // 继续监听加载
    } else {
      done('empty'); // 没有更多数据，停止监听
    }
  } catch (error) {
    console.error('加载数据出错:', error);
    done('error'); // 触发错误状态
  } finally {
    loading.value = false;
  }
};


// 切换排序
const tabChange = () => {
  console.log('排序方式变更:', reqData.value.sortField);
  resetList();
};


// // 监听排序字段变化
// watch(() => reqData.value.sortField, () => {
//   resetList()
// })

// 重置列表并重新加载
const resetList = async () => {
  goodsList.value = [];
  reqData.value.page = 1;
  loading.value = false;

  // await nextTick(); // 等待 Vue 视图更新

  // // 强制触发 `onLoad`
  // onLoad({ done: () => { } });
};


</script>

<style lang="scss" scoped>
.fs-sub-category-page {
  .bread-container {
    padding: 25px 0;
    color: #666;
  }

  .sub-container {
    padding: 20px 0;
    background-color: #fff;

    .listss {
      display: grid;
      grid-template-columns: repeat(5, calc((100% - 40px) / 5));
      gap: 10px;
      width: 100%;
      padding: 0 10px;
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }


  }
}
</style>
