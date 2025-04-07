<template>
  <div>
    <!-- <LayoutNav /> -->
    <LayoutHeaderFixed />
    <FSFullCategoryNav />
    <RouterView />
    <!-- <LayoutNav /> -->
    <!-- <LayoutFooter /> -->
  </div>
</template>

<script setup>
// import LayoutFooter from './components/LayoutFooter.vue';
// import LayoutNav from './components/LayoutNav.vue';
import LayoutHeaderFixed from './components/LayoutHeaderFixed.vue';
import FSFullCategoryNav from '@/components/FSFullCategoryNav.vue';

</script>

<style lang="scss" scoped></style>
