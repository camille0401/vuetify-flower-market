<template>
  <v-card class="mb-10" elevation="0">
    <v-card-title class="text-h5 text-primary-darken-1 font-weight-bold">{{ title }}</v-card-title>
    <v-card-subtitle>{{ subTitle }}送 · 让你怦然心动的人</v-card-subtitle>
    <v-card-text>
      <slot name="main"></slot>
    </v-card-text>
  </v-card>
</template>

<script setup name="HomePanel">
import { defineProps } from "vue"

defineProps({
  title: {
    type: String,
  },
  subTitle: {
    type: String
  }
})

</script>

<style scoped lang='scss'></style>
