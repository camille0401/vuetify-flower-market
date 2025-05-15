<template>
  <div class="app-header-sticky bg-background elevation-2" :class="{ show: y > 98 }">
    <v-container class="mx-auto">
      <v-row align="center">
        <v-col cols="3">
          <FSLogo />
        </v-col>
        <v-col cols="9" class="d-flex justify-end flex-wrap align-center">
          <v-btn class="px-4" variant="text" to="/allCategories" active-color="primary-darken-1">
            {{ $t('global.allCategoriesText') }}
          </v-btn>
          <v-btn class="px-4" variant="text" v-for="category in categoryStore.categoryList" :key="category.id"
            :to="`/category/1/${category.id}`" active-color=" primary-darken-1">
            {{ category.cname }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script setup>
import FSLogo from '@/components/FSLogo.vue'
import { useScroll } from '@vueuse/core'
import { useCategoryStore } from '@/stores/category'

const { y } = useScroll(window)
const categoryStore = useCategoryStore()

</script>
<style scoped lang='scss'>
.app-header-sticky {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.3s linear;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transform: none;
    opacity: 1;
  }

  .right-box {
    gap: 8px;

    @media (max-width: 600px) {
      justify-content: center;
      margin-top: 8px;
    }
  }

}
</style>
