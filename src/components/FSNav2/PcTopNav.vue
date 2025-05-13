<template>
  <v-container color="background" class="d-flex justify-space-between align-center">
    <RouterLink to="/" class="text-h5 font-weight-bold">
      <span>Flower Market</span>
    </RouterLink>

    <div class="d-flex align-center ga-2">
      <!-- 是否登录 -->
      <template v-if="userStore?.token">
        <div class="px-4 ga-1 font-weight-bold">
          <span>{{ $t('global.nav.user.welcome') }} {{ userStore?.userInfo?.nickName }}</span>
        </div>
        <RouterLink v-if="userStore?.token" class="nav-item px-4 ga-1" to="" @click="$emit('logout')">
          <v-icon icon="mdi-logout"></v-icon>
          <span> {{ $t('global.nav.user.logout') }}</span>
        </RouterLink>
      </template>
      <template v-else>
        <v-btn class="px-4 ga-1" variant="text" active-color="primary" to="/user/login">
          <span>{{ $t('global.nav.user.login') }}</span>
        </v-btn>
        <v-btn class="px-4 ga-1" variant="text" active-color="primary" to="/user/register">
          <span>{{ $t('global.nav.user.register') }}</span>
        </v-btn>
      </template>

      <RouterLink to="/member/order" class="nav-item px-4 ga-1">
        <v-icon icon="mdi-shopping-search"></v-icon>
        <span>{{ $t('global.nav.user.search') }}</span>
      </RouterLink>

      <RouterLink to="/member/order" class="nav-item px-4 ga-1">
        <v-icon icon="mdi-flower-poppy"></v-icon>
        <span>{{ $t('global.nav.user.myOrder') }}</span>
      </RouterLink>

      <RouterLink to="/member/info" class="nav-item px-4 ga-1">
        <v-icon icon="mdi-account"></v-icon>
        <span>{{ $t('global.nav.user.myAccount') }}</span>
      </RouterLink>

      <RouterLink to="/cartlist" class="nav-item px-4 ga-1">
        <CartIcon />
        <span>{{ $t('global.nav.user.cart') }}</span>
      </RouterLink>

    </div>

  </v-container>
</template>

<script setup>
import CartIcon from '@/components/FSNav2/CartIcon.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const emit = defineEmits(['logout'])


</script>

<style scoped lang="scss">
.cate-item {
  &:hover {
    color: rgb(var(--v-theme-primary));
  }
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  text-decoration: none;
  position: relative;

  span {
    display: block;
    text-transform: uppercase;
    white-space: nowrap;
    position: absolute;
    bottom: -14px;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0;
    font-size: 12px;
    line-height: 1em;
    opacity: 0;
    transition: opacity .2s ease-in;
  }

  &:hover {
    color: rgb(var(--v-theme-primary));

    span {
      opacity: 1;
    }
  }


}
</style>
