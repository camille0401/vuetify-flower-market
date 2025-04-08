<template>
  <v-sheet color="primary">
    <div class="fs-full-category-nav-box">
      <div class="container">
        <v-sheet color="secondary">
          <RouterLink to="/allCategories" class="left-box" active-class="active">
            <span>所有分类</span>
          </RouterLink>
        </v-sheet>
        <ul class="right-box">
          <li>
            <RouterLink to="/">首页</RouterLink>
          </li>
          <li v-for="category in categoryStore.categoryList" :key="category.id">
            <RouterLink active-class="active" :to="`/category/1/${category.id}`">{{ category.cname }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore();
</script>

<style lang="scss" scoped>
// category
.fs-full-category-nav-box {
  width: 100%;

  .container {
    display: flex;

    .left-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      font-size: 18px;
      line-height: 52px;
      font-weight: bold;
      text-align: center;
      color: #fff;

      &.active {
        color: #ffffff;
      }
    }

    .right-box {
      width: calc(100% - 250px);
      height: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      // color: #ffffff;
      z-index: 998;
      flex-shrink: 0;
      padding-left: 20px;


      a {
        display: inline-block;
        font-size: 16px;
        line-height: 32px;
        color: inherit;
        padding: 10px 25px;

        &:hover {
          background-color: $fs-hover-color;
        }
      }

      .active {
        background-color: $fs-hover-color;
      }

    }


  }
}
</style>
