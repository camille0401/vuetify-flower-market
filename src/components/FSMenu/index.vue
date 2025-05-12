<template>
  <section class="fs-menu-bar">
    <v-container class="mx-auto pa-0 position-relative">
      <ul class="d-flex flex-wrap align-center ga-2">
        <li v-for="category in categoryStore.categoryList" :key="category.id">
          <v-btn class="category-btn px-4" variant="text" height="60" block :to="`/category/1/${category.id}`"
            active-class="active-category" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            {{ category.cname }}
          </v-btn>
        </li>
      </ul>
      <div class="menu-layer" v-show="showLayer">
        <ul class="d-flex flex-wrap align-center ga-2">
          <li v-for="category in categoryStore.categoryList" :key="category.id">
            <v-btn class="category-btn px-4" variant="text" height="60" block :to="`/category/1/${category.id}`"
              active-class="active-category">
              {{ category.cname }}
            </v-btn>
          </li>
        </ul>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

const showLayer = ref(false)

const onMouseEnter = () => {

  showLayer.value = true
}

const onMouseLeave = () => {

  showLayer.value = false
}

onMounted(() => {
  if (!categoryStore.categoryList.length) {
    categoryStore.getCategory()
  }
})
</script>


<style lang="scss" scoped>
.fs-menu-bar {
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 100;



  // 主菜单项
  .category-btn {
    font-weight: 500;
    letter-spacing: 0.5px;
    color: rgba(0, 0, 0, 0.85);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      color: rgb(var(--v-theme-primary));

      &::after {
        width: 24px;
      }
    }

    &.active-category {
      color: rgb(var(--v-theme-primary));
      font-weight: 600;

      &::after {
        width: 32px;
        background: rgb(var(--v-theme-primary));
      }
    }
  }

  // 下拉菜单层
  .menu-layer {
    position: absolute;
    top: calc(100% - 4px);
    left: 0;
    right: 0;
    background: #ffffff;
    z-index: 999;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    opacity: 1;
    // transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 16px 0;
    margin-top: 4px;

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 8px;
    }

    .category-btn {
      height: 48px;
      justify-content: flex-start;
      font-size: 0.925rem;

      &:hover {
        background: rgba(var(--v-theme-primary), 0.05);
      }
    }
  }

  // // 显示状态
  // li:hover .menu-layer {
  //   opacity: 1;
  //   transform: translateY(0);
  //   pointer-events: auto;
  //   transition-delay: 0.1s;
  // }
}
</style>
