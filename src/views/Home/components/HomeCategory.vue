<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="category in categoryStore.categoryList" :key="category.id">
        <p class="main-menu">
          <RouterLink :to="`/category/1/${category.id}`">{{ category.cname }}</RouterLink>
        </p>
        <div class="sub-menu">
          <RouterLink v-for="child in category.children" :key="child.id" :to="`/category/2/${child.id}`">
            {{ child.cname }}
          </RouterLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
</script>

<style scoped lang='scss'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 99;

  .menu {
    height: 500px;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    li {
      // padding-left: 40px;
      // height: 55px;
      // line-height: 55px;
      padding: 10px 20px;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.2);

      a {
        margin-right: 4px;
        color: #fff;

        // &:first-child {
        //     font-size: 1.6rem;
        // }
      }

      &:hover {
        background: $fs-base-color-light;
        transition: all .2s linear;

        a {
          color: #fff;
        }
      }

      .main-menu {
        a {
          font-size: 16px;
          line-height: 50px;
        }
      }

      .sub-menu {
        display: flex;
        flex-wrap: wrap;

        a {
          font-size: 14px;
          padding: 0 5px;
          padding-left: 0;
          line-height: 24px;
        }

      }
    }
  }
}
</style>
