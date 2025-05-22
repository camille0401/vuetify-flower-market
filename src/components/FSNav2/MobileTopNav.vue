<template>
  <v-app-bar color="background">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-app-bar-title class="font-weight-bold">
      <RouterLink to="/">
        <span>Flower Market</span>
      </RouterLink>
    </v-app-bar-title>

    <!-- <v-btn icon="mdi-shopping-search"></v-btn> -->
    <v-btn v-if="userStore.token" variant="text" active-color="primary" size="small" to="/user/login">
      <span>{{ $t('nav.user.login') }}</span>
    </v-btn>
    <!-- <v-btn variant="text" active-color="primary" size="small" to="/user/register">
      <span>{{ $t('nav.user.register') }}</span>
    </v-btn> -->
    <v-btn icon="mdi-cart" to="/cartlist" size="small" class="mr-2">
      <v-badge :content="cartStore.cartList.length || 0" color="error" class="cart-badge"
        :class="bageFlag && 'animate'">
        <v-icon icon="mdi-cart"></v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const cartStore = useCartStore()
const userStore = useUserStore()
const bageFlag = ref(false)

watch(
  () => cartStore.cartList.length,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      // 添加动画类
      bageFlag.value = true
      // 动画持续时间结束后移除类名
      setTimeout(() => {
        bageFlag.value = false
      }, 300) // 与 SCSS 中动画时长一致
    }
  }
)
</script>
