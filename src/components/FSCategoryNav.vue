<template>
  <ul class="fs-category-nav-list">
    <li v-if="showHome">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li class="home" v-for="category in categoryStore.categoryList" :key="category.id">
      <RouterLink active-class="active" :to="`/category/${category.id}`">{{ category.name }}</RouterLink>
    </li>
  </ul>
</template>

<script setup name="LayoutHeaderUI">
import { useCategoryStore } from '@/stores/category'
import { computed } from 'vue'

const props = defineProps({
  position: {
    type: String,
    default: ""
  }
})

const showHome = computed(() => props.position === 'category' || props.position === 'fixed' ? true : false);

const categoryStore = useCategoryStore()
</script>

<style lang="scss" scoped>
$--active-color: $fs-base-color-dark;

.fs-category-nav-list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  z-index: 998;
  flex-shrink: 0;
  padding: 10px 0 10px 20px;

  li {
    margin-right: 20px;
    text-align: center;

    a {
      font-size: 1.6rem;
      line-height: 32px;
      height: 32px;
      display: inline-block;
      color: inherit;

      &:hover {
        color: $--active-color;
        border-bottom: 1px solid $--active-color;
      }
    }

    .active {
      color: $--active-color;
      border-bottom: 1px solid $--active-color;
    }
  }
}
</style>
