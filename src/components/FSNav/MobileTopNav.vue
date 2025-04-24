<template>
  <v-app-bar color="grey-darken-4" density="compact">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <!-- <v-app-bar-title class="text-primary font-weight-bold">Flower Market</v-app-bar-title> -->
    <v-spacer />
    <v-btn v-if="!userStore.token" variant="text" @click="goLogin">
      {{ $t('global.nav.user.login') }}
    </v-btn>
    <CartIcon class="d-none d-md-none d-sm-flex" />
    <v-icon v-if="userStore.token" class="mr-2"></v-icon>
    <v-icon v-if="userStore.token" icon="mdi-logout" @click="$emit('logout')" />
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
