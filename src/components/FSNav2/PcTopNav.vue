<template>
  <v-container color="background" class="d-flex justify-space-between align-center">
    <FSLogo />
    <div class="d-flex align-center ga-2">
      <!-- 是否登录 -->
      <template v-if="userStore?.token">
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn class="px-4 font-weight-bold" v-bind="props" variant="text">
              {{ $t('nav.user.welcome') + userStore?.userInfo?.nickName }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item :title="$t('nav.user.logout')" @click="$emit('logout')">
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <v-btn class="px-4 ga-1" variant="text" active-color="primary" @click="$emit('logout')">
          <span>{{ $t('nav.user.logout') }}</span>
        </v-btn> -->
      </template>
      <template v-else>
        <v-btn class="px-4 ga-1" variant="text" active-color="primary" to="/user/login">
          <span>{{ $t('nav.user.login') }}</span>
        </v-btn>
        <v-btn class="px-4 ga-1" variant="text" active-color="primary" to="/user/register">
          <span>{{ $t('nav.user.register') }}</span>
        </v-btn>
      </template>

      <!-- <RouterLink to="/member/order" class="nav-item px-4 ga-1">
        <v-icon icon="mdi-shopping-search"></v-icon>
        <span>{{ $t('nav.user.search') }}</span>
      </RouterLink> -->

      <RouterLink to="/member/order" class="nav-item px-4 ga-1">
        <v-icon icon="mdi-flower-poppy"></v-icon>
        <span>{{ $t('nav.user.myOrder') }}</span>
      </RouterLink>

      <RouterLink to="/member/info" class="nav-item px-4 ga-1">
        <v-icon icon="mdi-account"></v-icon>
        <span>{{ $t('nav.user.myAccount') }}</span>
      </RouterLink>

      <RouterLink to="/cartlist" class="nav-item px-4 ga-1">
        <CartIcon />
        <span>{{ $t('nav.user.cart') }}</span>
      </RouterLink>

    </div>

  </v-container>
</template>

<script setup>
import FSLogo from '@/components/FSLogo.vue'
import CartIcon from '@/components/FSNav2/CartIcon.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const emit = defineEmits(['logout'])


</script>

<style scoped lang="scss">
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
