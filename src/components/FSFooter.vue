<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4">
    <!-- <div class="d-flex ga-3">
      <v-btn v-for="icon in icons" :key="icon" :icon="icon" density="comfortable" variant="text"></v-btn>
    </div> -->

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <div class="font-weight-regular">
      {{ $t('nav.contact.title') + $t('nav.contact.phone') }}
    </div>
    <div class="font-weight-regular text-grey">
      {{ $t('nav.contact.subtitle') }}
    </div>
    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Flower Market</strong>
    </div>


  </v-footer>
</template>
<script setup>
const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]
</script>
