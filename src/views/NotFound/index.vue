<template>
  <section class="fs-404-page">
    <v-empty-state :image="PageNotFound" size="200" text-width="250">
      <template v-slot:media>
        <v-img class="mb-8"></v-img>
      </template>

      <template v-slot:title>
        <div class="text-h6 text-high-emphasis">Empty in drafts</div>
      </template>

      <template v-slot:text>
        <div class="text-body-1">Save a draft message and it will show up here</div>
      </template>
      <template v-slot:actions>
        <v-btn color="primary" to="/" icon="mdi-home"></v-btn>

      </template>
    </v-empty-state>
  </section>
</template>

<script setup>
import PageNotFound from '@/assets/svgs/page-not-found.svg'
</script>

<style lang="scss" scoped>
.fs-404-page {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
