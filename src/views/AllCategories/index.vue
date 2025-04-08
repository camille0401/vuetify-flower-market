<template>
  <div class="fs-all-categories-page">
    <div class="container content m-top-20">
      <v-sheet color="#fff">
        <v-breadcrumbs color="primary">
          <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
          <v-breadcrumbs-item :disabled="true">全部商品导购</v-breadcrumbs-item>
        </v-breadcrumbs>
        <div class="strain-box mt-4">
          <RouterLink v-for="item in categoryStore.categoryList" :key="item.id" :to="`/category/1/${item.id}`">{{ item.cname }}</RouterLink>
        </div>
        <div class="menu-box m-bottom-20" v-for="category in categoryStore.categoryList" :key="category.id">
          <h3 class="strain-name"><v-icon start>mdi-flower-poppy</v-icon><span>{{category.cname}}</span></h3>
          <ul class="list-box ">
            <li class="item-menu">
              <h4 class="title">分类</h4>
              <div class="list">
                <RouterLink v-for="child in category.children" :key="child.id" :to="`/category/2/${child.id}`">
                  {{ child.cname }}
                </RouterLink>
              </div>
            </li>
          </ul>
        </div>

      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

</script>

<style lang="scss" scoped>
.fs-all-categories-page {

  .content {
    padding: 20px;
  }

  // 种类
  .strain-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    gap: 20px 20px;
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
      color: $fs-hover-color;

      &:hover {
        background-color: $fs-hover-color;
        border: none;
        color: #fff;
        transition: all 0.3s linear;
      }

      .active {
        background-color: $fs-hover-color;
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
          color: $fs-hover-color;
        }

      }
    }
  }


}
</style>
