<template>
  <div class="fs-category-page">
    <!-- nav -->
    <FSFullCategoryNav />

    <!-- content -->
    <div class="container content m-top-20">
      <!-- breadcrumb -->
      <div class="bread-box">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>玫瑰花</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- menu -->
      <ul class="menu-box m-bottom-20">
        <li class="item-menu">
          <h2 class="title">花材</h2>
          <div class="list">
            <a href="javascript:void(0);">玫瑰 </a>
            <a href="javascript:void(0);">红玫瑰 </a>
            <a href="javascript:void(0);">粉玫瑰 </a>
            <a href="javascript:void(0);">白玫瑰 </a>
            <a href="javascript:void(0);">紫玫瑰 </a>
            <a href="javascript:void(0);">蓝玫瑰 </a>
            <a href="javascript:void(0);">香槟玫瑰 </a>
            <a href="javascript:void(0);">黄玫瑰 </a>
          </div>
        </li>
        <li class="item-menu">
          <h2 class="title">颜色</h2>
          <div class="list">
            <a href="javascript:void(0);" class="color-a">
              <i class="c-red"></i>
              红色
            </a>
            <a href="javascript:void(0);" class="color-a">
              <i class="c-pink"></i>
              粉色
            </a>
            <a href="javascript:void(0);" class="color-a">
              <i class="c-white"></i>
              白色
            </a>
            <a href="javascript:void(0);" class="color-a">
              <i class="c-champagne"></i>
              香槟色
            </a>
            <a href="javascript:void(0);" class="color-a">
              <i class="c-yellow"></i>
              黄色
            </a>
            <a href="javascript:void(0);" class="color-a">
              <i class="c-purple"></i>
              紫色
            </a>
            <a href="javascript:void(0);" class="color-a">
              <i class="c-blue"></i>
              蓝色
            </a>
          </div>
        </li>
        <li class="item-menu">
          <h2 class="title">价格</h2>
          <div class="list">
            <a href="javascript:void(0);">特价鲜花</a>
            <a href="javascript:void(0);">150元以下</a>
            <a href="javascript:void(0);">150-250元</a>
          </div>
        </li>
      </ul>
      <!-- goods -->
      <div class="goods-box">
        <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
          <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
          <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
          <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
        </el-tabs>
        <div class="listss" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
          <!-- 商品列表-->
          <FSGoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FSFullCategoryNav from "@/components/FSFullCategoryNav.vue";
import FSGoodsItem from "@/components/FSGoodsItem.vue";
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore();
const route = useRoute();

// 获取分类导航数据
const categoryFilterData = ref({});
const getCategoryFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryFilterData.value = res?.result || {}
}
onMounted(() => getCategoryFilterData())

// 获取商品列表
const goodsList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodsList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value = res?.result?.items || []
}
onMounted(() => getGoodsList())

// tab切换回调
const tabChange = () => {
  reqData.value.page = 1;
  console.log(reqData.value)
  getGoodsList();
}

// 页面滚动加载数据
const disabled = ref(false)
const load = async () => {
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value);
  goodsList.value = [...goodsList.value].concat(res?.result?.items || []);
  if (reqData.value.page > res?.result?.pages) {
    // stop
    disabled.value = true;
    return;
  }
}


</script>

<style lang="scss" scoped>
.fs-category-page {
  $c-red: #a40000;
  $c-pink: #feabae;
  $c-white: #fff;
  $c-champagne: #fcc280;
  $c-yellow: #f1c323;
  $c-purple: #d37bfc;
  $c-blue: #5b37f7;

  .content {
    background: $c-white;
    padding: 20px;
  }

  .bread-box {
    padding: 25px 0;
  }

  .menu-box {
    width: 100%;

    .title {
      height: 40px;
      background: #f2f2f2 none repeat scroll 0% 0%;
      padding-left: 20px;
      color: #7E7E80;
      font-size: 16px;
      line-height: 40px;
      font-weight: bold;
    }

    .list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding-left: 20px;
      margin: 10px 0;

      a {
        display: flex;
        align-items: center;
        color: #737373;
        font-size: 12px;
        font-weight: lighter;
        line-height: 30px;

        &:not(:last-child)::after {
          content: "|";
          display: inline-block;
          width: 28px;
          text-align: center;
          color: #7e7e80;
        }

        &:hover {
          color: $fs-base-color-dark;
        }

        &.color-a {
          i {
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 5px;
            border: 2px solid transparent;
            border-radius: 50%;

            &.c-red {
              border-color: $c-red;
              background-color: $c-red;
            }

            &.c-pink {
              border-color: $c-pink;
              background-color: $c-pink;
            }

            &.c-white {
              border-color: #cecece;
              background-color: $c-white;
            }

            &.c-champagne {
              border-color: $c-champagne;
              background-color: $c-champagne;
            }

            &.c-yellow {
              border-color: $c-yellow;
              background-color: $c-yellow;
            }

            &.c-purple {
              border-color: $c-purple;
              background-color: $c-purple;
            }

            &.c-blue {
              border-color: $c-blue;
              background-color: $c-blue;
            }

          }

        }
      }
    }
  }

  .goods-box {
    padding: 20px 10px;
    background-color: #fff;

    .listss {
      // display: flex;
      // flex-wrap: wrap;
      display: grid;
      grid-template-columns: repeat(4, calc((100% - 30px) / 4));
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
