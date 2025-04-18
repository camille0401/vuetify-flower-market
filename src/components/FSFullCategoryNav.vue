<template>
  <v-sheet color="primary" class="category-nav-bar">
    <div class="container category-nav-container">
      <!-- 所有分类按钮 -->
      <v-btn class="all-categories-btn" color="primary-darken-1" variant="flat" height="64" min-width="250" rounded="0"
        :to="{ path: '/allCategories' }" active-class="active-category">
        <span class="text-h6 font-weight-bold">{{ $t('global.allCategoriesText') }}</span>
        <v-icon end>mdi-menu-down</v-icon>
      </v-btn>

      <!-- 分类导航列表 -->
      <div class="category-links">
        <v-btn v-for="category in categoryStore.categoryList" :key="category.id" class="category-link" variant="text"
          :to="`/category/1/${category.id}`" active-class="active-category">
          {{ category.cname }}
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>


<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

onMounted(() => {
  if (!categoryStore.categoryList.length) {
    categoryStore.getCategory()
  }
})
</script>


<style lang="scss" scoped>
.category-nav-bar {
  height: 64px;
  display: flex;
  align-items: center;
  background-color: rgb(var(--v-theme-primary));
}

.category-nav-container {
  display: flex;
  align-items: center;
  height: 100%;

  .all-categories-btn {
    color: white;
    transition: all 0.3s ease;

    &:hover,
    &.active-category {
      background-color: rgb(var(--v-theme-primary-darken-2)) !important;
    }
  }

  .category-links {
    display: flex;
    flex: 1;
    height: 100%;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .category-link {
      color: white;
      height: 100%;
      min-width: 120px;
      font-size: 0.9375rem;
      font-weight: 500;
      text-transform: none;
      white-space: nowrap;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
      }

      &.active-category {
        background-color: rgba(255, 255, 255, 0.2) !important;
        box-shadow: inset 0 -4px 0 white;
      }
    }
  }
}

@media (max-width: 960px) {
  .category-nav-container {
    .all-categories-btn {
      min-width: 180px;
    }

    .category-link {
      min-width: 100px;
      font-size: 0.875rem;
      padding: 0 12px;
    }
  }
}

@media (max-width: 600px) {
  .category-nav-container {
    .all-categories-btn {
      min-width: 64px;

      span {
        display: none;
      }
    }
  }
}
</style>
