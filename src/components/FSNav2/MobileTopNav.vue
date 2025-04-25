<template>
  <v-app-bar color="background">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-app-bar-title class=" font-weight-bold">Flower Market</v-app-bar-title>
    <v-spacer />

    <v-btn icon="mdi-shopping-search"></v-btn>
    <v-btn icon="mdi-cart" to="/cartlist"></v-btn>
  </v-app-bar>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import CartIcon from '@/views/CartList/components/CartIcon.vue'

const userStore = useUserStore()
const router = useRouter()

const goLogin = () => {
  router.push('/user/login')
}
</script>
