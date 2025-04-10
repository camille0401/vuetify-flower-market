<template>
  <ul class="fs-category-nav-list">
    <li v-if="showHome">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li class="home" v-for="category in categoryStore.categoryList" :key="category.id">
      <RouterLink active-class="active" :to="`/category/1/${category.id}`">{{ category.cname }}</RouterLink>
    </li>
  </ul>
</template>

<script setup name="LayoutHeaderUI">
import { computed } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
const props = defineProps({
  position: {
    type: String,
    default: ""
  }
})

const showHome = computed(() => props.position === 'category' || props.position === 'fixed' ? true : false);
</script>

<style lang="scss" scoped>
$--active-color: $fs-primary-color;

.fs-category-nav-list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  width: 100%;
  flex-shrink: 0;
  padding: 10px 0 10px 20px;

  li {
    text-align: center;
    padding: 0 10px;

    a {
      font-size: 16px;
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
