<template>
  <section class="fs-menu-bar">
    <v-container class="mx-auto py-0">
      <!-- 主菜单 -->
      <ul v-if="categoryStore.categoryList.length > 0" class="d-flex flex-wrap align-center ga-8">
        <!-- 所有分类按钮 -->
        <li>
          <v-btn class="px-4" width="250" height="60" block to="/allCategories" color="primary" rounded="0"
            active-color="primary-darken-1">
            <v-icon class="mr-2">mdi-view-list</v-icon>
            {{ $t('global.allCategoriesText') }}
          </v-btn>
        </li>

        <li v-for="category in categoryStore.categoryList" :key="category.id">
          <v-btn class="px-4" variant="text" height="60" block :to="`/category/1/${category.id}`"
            active-color="primary-darken-1">
            {{ category.cname }}
          </v-btn>
        </li>
      </ul>
      <!-- 折叠菜单过渡动画 -->
      <transition name="menu-layer">
        <div v-show="showLayer" class="menu-layer">
          <ul class="d-flex flex-wrap align-center ga-2">
            <li v-for="(category, index) in categoryStore.categoryList" :key="category.id"
              :class="{ appear: showLayer }" :style="{ transitionDelay: `${index * 50}ms` }">
              <v-btn class="px-4" variant="text" height="60" block :to="`/category/1/${category.id}`"
                active-class="active-category">
                {{ category.cname }}
              </v-btn>
            </li>
          </ul>
        </div>
      </transition>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
const showLayer = ref(false)

</script>

<style lang="scss" scoped>
.fs-menu-bar {
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  .v-container {
    position: relative;
  }

  .menu-layer {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background: #ffffff;
    z-index: 999;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    transform: translateZ(0);
    will-change: transform, opacity;

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 8px;
      padding: 12px 16px;
    }

    li {
      opacity: 0;
      transform: translateY(-8px);
      transition: all 0.3s ease;

      &.appear {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  // Vue transition classes (独立写法)
  .menu-layer-enter-active,
  .menu-layer-leave-active {
    transition: opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-layer-enter-from,
  .menu-layer-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }
}
</style>
