<template>
  <v-app-bar color="background">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-app-bar-title class="font-weight-bold">
      <RouterLink to="/">
        <span>Flower Market</span>
      </RouterLink>
    </v-app-bar-title>

    <v-btn icon="mdi-shopping-search"></v-btn>
    <v-btn icon="mdi-cart" to="/cartlist">
      <v-badge :content="cartStore.cartList.length || 0" color="error">
        <v-icon icon="mdi-cart"></v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()


</script>
