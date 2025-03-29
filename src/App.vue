<script setup>
import FSAppNavBar from './components/FSAppNavBar.vue';
import FSHeader from './components/FSHeader.vue';
</script>

<template>
  <v-app theme="light">
    <FSAppNavBar />
    <FSHeader />
    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition hide-on-leave>
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>
