<template>
  <section class="category-nav-bar" elevation="0">
    <v-container class="mx-auto">
      <v-row align="center" justify="start" class="g-2">
        <!-- 所有分类按钮 -->
        <v-col cols="12" sm="4" md="3" lg="2">
          <v-btn class="all-categories-btn" color="primary-darken-1" variant="flat" height="48" block rounded
            :to="{ path: '/allCategories' }" active-class="active-category">
            <v-icon start>mdi-menu</v-icon>
            <span class="font-weight-medium">{{ $t('global.allCategoriesText') }}</span>
          </v-btn>
        </v-col>

        <!-- 分类按钮 -->
        <v-col v-for="category in categoryStore.categoryList" :key="category.id" cols="6" sm="4" md="3" lg="2">
          <v-btn class="category-btn" variant="tonal" color="primary" height="40" block rounded
            :to="`/category/1/${category.id}`" active-class="active-category">
            {{ category.cname }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
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
  // background-color: #fff0f5; // 浅粉背景
  // border-radius: 12px;
  // padding: 12px 0;

  .all-categories-btn {
    // background-color: #f48fb1 !important;
    // color: white !important;
    // font-weight: 500;

    &:hover,
    &.active-category {
      background-color: rgba(var(--v-theme-primary-darken-2, 0.3)) !important;
    }
  }

  .category-btn {
    text-transform: none;
    font-weight: 500;
    color: #880e4f !important;
    background-color: rgba(244, 143, 177, 0.15); // 粉色调柔和背景

    &.active-category {
      background-color: #f06292 !important;
      color: white !important;
      box-shadow: inset 0 -3px 0 white !important;
    }
  }
}
</style>
