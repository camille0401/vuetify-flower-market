<script setup>
// import FSAppNavBar from './components/FSAppNavBar.vue';
import FSNav from '@/components/FSNav2/index.vue'
// import FSHeader from './components/FSHeader.vue';
import FSHeader from '@/components/FSHeader/index.vue';
import FSFooter from './components/FSFooter.vue';
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategory())

</script>

<template>
  <v-app theme="milkTeaLight">
    <FSNav />
    <v-main>
      <!-- <FSHeader /> -->
      <router-view v-slot="{ Component }">
        <v-fade-transition hide-on-leave>
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
    <FSFooter />
  </v-app>
</template>
