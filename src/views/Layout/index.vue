<template>
  <div>
    <LayoutHeaderFixed />
    <FSFullCategoryNav />
    <RouterView />
  </div>
</template>

<script setup>
import LayoutHeaderFixed from './components/LayoutHeaderFixed.vue';
import FSFullCategoryNav from '@/components/FSFullCategoryNav.vue';

</script>

<style lang="scss" scoped></style>
