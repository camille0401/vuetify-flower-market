<template>
  <v-card class="home-panel mb-8" elevation="0">
    <div class="panel-header">
      <v-card-title class="text-h4 font-weight-black text-primary-darken-2">
        {{ title }}
        <span class="subtitle text-body-1 ml-3 text-grey-darken-1">{{ subTitle }}</span>
      </v-card-title>
      <v-divider class="my-4 border-opacity-50" />
    </div>
    <v-card-text class="panel-content">
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

<style scoped lang="scss">
.home-panel {
  .panel-header {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, rgb(var(--v-theme-primary)), transparent);
    }
  }

  .panel-content {
    padding-top: 0;
  }
}
</style>
