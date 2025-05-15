<template>
  <section>
    <LayoutHeaderFixed v-show="!mobile" />
    <FSMenu v-show="!mobile" />
    <RouterView />
  </section>
</template>

<script setup>
import LayoutHeaderFixed from './components/LayoutHeaderFixed.vue'
import FSMenu from '@/components/FSMenu/index.vue'
import { useDisplay } from "vuetify"

const { mobile } = useDisplay()


</script>
