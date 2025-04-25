<template>
  <div>
    <!-- <LayoutHeaderFixed v-show="!mobile" /> -->
    <!-- <FSFullCategoryNav /> -->
    <RouterView />
  </div>
</template>

<script setup>
import LayoutHeaderFixed from './components/LayoutHeaderFixed.vue';
import FSFullCategoryNav from '@/components/FSFullCategoryNav.vue';
import { useDisplay } from "vuetify"

const { mobile } = useDisplay()
</script>

<style lang="scss" scoped></style>
