<template>
  <div class="home-category" v-show="categoryStore.categoryList.length">
    <v-sheet color="rgba(0, 0, 0, 0.7)">
      <ul class="menu">
        <li v-for="category in categoryStore.categoryList" :key="category.id">
          <RouterLink class="main-menu" :to="`/category/1/${category.id}`">{{ category.cname }}</RouterLink>
          <div class="sub-menu">
            <RouterLink v-for="child in category.children" :key="child.id" :to="`/category/2/${child.id}`">
              {{ child.cname }}
            </RouterLink>
          </div>
        </li>
      </ul>
    </v-sheet>
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
      padding: 10px 20px;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.2);

      a {
        margin-right: 4px;
        color: #fff;
      }

      &:hover {
        background: rgb(var(--v-theme-primary-darken-1));
        transition: all .2s linear;

        a {
          color: #fff;
        }
      }

      .main-menu {
        font-size: 16px;
        line-height: 50px;
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
