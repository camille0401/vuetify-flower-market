<template>
  <div v-show="categoryStore.categoryList.length" class="home-category">
    <v-sheet color="rgba(0, 0, 0, 0.7)" style="height: 100%;">
      <ul class="menu">
        <!-- 遍历主分类 -->
        <li v-for="category in categoryStore.categoryList" :key="category.id">
          <RouterLink class="main-menu" :to="`/category/1/${category.id}`">
            {{ category.cname }}
          </RouterLink>
          <!-- 子分类 -->
          <div v-if="category.children.length" class="sub-menu">
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

<style scoped lang="scss">
.home-category {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 500px;
  z-index: 99;

  .menu {
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    li {
      padding: 10px 20px;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
      transition: background 0.3s ease;

      .main-menu {
        font-size: 16px;
        line-height: 50px;
        color: rgb(var(--v-theme-on-primary));
      }

      .sub-menu {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        a {
          font-size: 14px;
          line-height: 24px;
          color: rgb(var(--v-theme-on-primary));
        }
      }

      a:hover {
        color: rgb(var(--v-theme-primary-darken-1));
      }
    }
  }

  @media (max-width: 600px) {
    .menu {
      width: 100%;
      /* 在小屏设备上调整菜单宽度 */
    }
  }
}
</style>
