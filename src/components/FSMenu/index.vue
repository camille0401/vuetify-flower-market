<template>
  <section class="fs-menu-bar">
    <v-container class="mx-auto py-0">
      <!-- 主菜单 -->
      <ul v-if="categoryStore.categoryList.length > 0" class="d-flex flex-wrap align-center">
        <!-- 所有分类按钮 -->
        <li @mouseenter="setHoverCategory('all', categoryStore.categoryList)">
          <v-btn class="px-8" width="250" height="60" block to="/allCategories" color="primary" rounded="0"
            active-color="primary-darken-1">
            <v-icon class="mr-2">mdi-view-list</v-icon>
            {{ $t('global.allCategoriesText') }}
          </v-btn>
        </li>

        <li v-for="category in categoryStore.categoryList" :key="category.id"
          @mouseenter="setHoverCategory('item', category)">
          <v-btn class="px-8" variant="text" rounded="0" height="60" block :to="`/category/1/${category.id}`"
            active-color="primary-darken-1">
            {{ category.cname }}
          </v-btn>
        </li>
      </ul>
      <!-- 折叠菜单过渡动画 -->
      <transition name="menu-layer">
        <div v-show="showLayer && hoverCategory" class="menu-layer px-4 py-2">
          <ul v-if="hoverType === 'item'" class="d-flex flex-row ga-4">
            <li v-for="sub in hoverCategory?.children" :key="sub.id">
              <v-btn class="px-4" variant="text" rounded="0" :to="`/category/2/${sub.id}`"
                active-color="primary-darken-1">
                {{ sub.cname }}
              </v-btn>
            </li>
          </ul>
          <ul v-else class="d-flex flex-column ga-2">
            <li v-for="category in hoverCategory" :key="category.id">
              <v-btn class="px-4" variant="text" rounded="0" :to="`/category/1/${category.id}`" color="primary"
                active-color="primary-darken-1">
                {{ category.cname }}
              </v-btn>
              <ul class="d-flex flex-row ga-2 px-4">
                <li v-for="sub in category?.children" :key="sub.id">
                  <v-btn class="px-4" variant="text" rounded="0" block :to="`/category/2/${sub.id}`"
                    active-color="primary-darken-1">
                    {{ sub.cname }}
                  </v-btn>
                </li>
              </ul>
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
const menuHover = ref(false)
const hoverCategory = ref(null)
const hoverType = ref('')

const onMouseEnter = () => {
  menuHover.value = true
  showLayer.value = true
}

const onMouseLeave = () => {
  menuHover.value = false
  hoverCategory.value = null
  setTimeout(() => {
    if (!menuHover.value) showLayer.value = false
  }, 200)
}

const setHoverCategory = (type, category) => {
  hoverType.value = type
  hoverCategory.value = category
}

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
    top: calc(100%);
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 100px;
    background: #ffffff;
    z-index: 999;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    transform: translateZ(0);
    will-change: transform;
  }

  // Vue transition classes (独立写法)
  .menu-layer-enter-active {
    animation: fadeInUp 300ms ease-out forwards;
  }

  .menu-layer-leave-active {
    animation: fadeOutDown 200ms ease-in forwards;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(-10px) scale(0.98);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fadeOutDown {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    100% {
      opacity: 0;
      transform: translateY(-10px) scale(0.98);
    }
  }

}
</style>
