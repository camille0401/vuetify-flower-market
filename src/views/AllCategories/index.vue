<template>
  <div class="fs-all-categories-page">
    <!-- nav -->
    <FSFullCategoryNav />
    <!-- content -->
    <div class="container content m-top-20">
      <!-- breadcrumb -->
      <div class="bread-box">
        <v-breadcrumbs bg-color="primary">
          <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
          <v-breadcrumbs-item :disabled="true">全部商品导购</v-breadcrumbs-item>
        </v-breadcrumbs>
      </div>
      <!-- 种类 -->
      <div class="strain-box">
        <RouterLink v-for="item in categoryStore.categoryList" :key="item.id" to="">{{ item.cname }}</RouterLink>
      </div>
      <!-- menu -->
      <div class="menu-box m-bottom-20">
        <h3 class="strain-name"> <i class="iconfont icon-meiguihua"></i> <span>玫瑰花</span></h3>
        <ul class="list-box ">
          <li class="item-menu">
            <h4 class="title">花材</h4>
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
            <h4 class="title">颜色</h4>
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
            <h4 class="title">价格</h4>
            <div class="list">
              <a href="javascript:void(0);">特价鲜花</a>
              <a href="javascript:void(0);">150元以下</a>
              <a href="javascript:void(0);">150-250元</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="menu-box m-bottom-20">
        <h3 class="strain-name"> <i class="iconfont icon-juhua"></i> <span>波斯菊</span></h3>
        <ul class="list-box ">
          <li class="item-menu">
            <h4 class="title">花材</h4>
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
            <h4 class="title">颜色</h4>
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
            <h4 class="title">价格</h4>
            <div class="list">
              <a href="javascript:void(0);">特价鲜花</a>
              <a href="javascript:void(0);">150元以下</a>
              <a href="javascript:void(0);">150-250元</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="menu-box m-bottom-20">
        <h3 class="strain-name"> <i class="iconfont icon-yujinxiang"></i> <span>郁金香</span></h3>
        <ul class="list-box ">
          <li class="item-menu">
            <h4 class="title">花材</h4>
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
            <h4 class="title">颜色</h4>
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
            <h4 class="title">价格</h4>
            <div class="list">
              <a href="javascript:void(0);">特价鲜花</a>
              <a href="javascript:void(0);">150元以下</a>
              <a href="javascript:void(0);">150-250元</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import FSFullCategoryNav from '@/components/FSFullCategoryNav.vue';
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

</script>

<style lang="scss" scoped>
.fs-all-categories-page {
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

  // 种类
  .strain-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    gap: 10px 10px;
    width: 100%;
    margin-bottom: 20px;

    a {
      height: 50px;
      background: #f2f2f2;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      font-size: 14px;
      text-align: center;
      line-height: 50px;
      color: $fs-base-color-dark;

      &:hover {
        background-color: $fs-base-color-dark;
        border: none;
        color: #fff;
        transition: all 0.3s linear;
      }

      .active {
        background-color: $fs-base-color-dark;
        border: none;
        color: #fff;
        transition: all 0.3s linear;
      }
    }
  }

  .menu-box {
    .strain-name {
      display: flex;
      align-items: center;
      column-gap: 4px;
      font-size: 16px;
      line-height: 50px;
      color: $fs-base-color-dark;
      font-weight: 600;
      letter-spacing: 1px;

      i {
        font-size: 20px;
      }
    }
  }

  .list-box {
    width: 100%;

    .title {
      height: 40px;
      background: #f2f2f2;
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


}
</style>
