<template>
  <div class="fs-full-category-nav-box">
    <div class="container">
      <RouterLink to="/allCategories" class="left-box" active-class="active">
        <span>所有分类</span>
      </RouterLink>
      <ul class="right-box">
        <li>
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li v-for="category in categoryStore.categoryList" :key="category.id">
          <RouterLink active-class="active" :to="`/category/${category.id}`">{{ category.name }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore();
</script>

<style lang="scss" scoped>
// category
.fs-full-category-nav-box {
  $--active-color: #cd1076;

  width: 100%;
  background: $fs-base-color-dark;

  .container {
    display: flex;

    .left-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      background: #cd1076;
      font-size: 18px;
      line-height: 52px;
      font-weight: bold;
      text-align: center;
      color: #fff;

      &.active {
        color: #ffffff;
        background-color: $--active-color;
      }
    }

    .right-box {
      width: calc(100% - 250px);
      height: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      color: #ffffff;
      z-index: 998;
      flex-shrink: 0;
      padding-left: 20px;


      a {
        display: inline-block;
        font-size: 1.6rem;
        line-height: 32px;
        color: inherit;
        padding: 10px 15px;

        &:hover {
          color: #ffffff;
          background-color: $--active-color;
        }
      }

      .active {
        color: #ffffff;
        background-color: $--active-color;
      }

    }


  }
}
</style>
