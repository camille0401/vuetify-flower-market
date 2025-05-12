<template>
  <div>
    <LayoutHeaderFixed v-show="!mobile" />
    <!-- <FSFullCategoryNav /> -->
    <!-- <FSMenu /> -->
    <RouterView />
  </div>
</template>

<script setup>
import LayoutHeaderFixed from './components/LayoutHeaderFixed.vue'
import FSFullCategoryNav from '@/components/FSFullCategoryNav.vue'
import FSMenu from '@/components/FSMenu/index.vue'
import { useDisplay } from "vuetify"

const { mobile } = useDisplay()


</script>
