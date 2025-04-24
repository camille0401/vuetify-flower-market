<template>
  <v-sheet color="grey-darken-4">
    <v-container class="mx-auto">
      <div class="d-flex justify-end align-center nav-box">
        <template v-if="userStore?.token">
          <RouterLink to="/member/info" class="nav-item">
            <v-icon class="mr-1">mdi-account</v-icon>
            {{ $t('global.nav.user.welcome') }} {{ userStore?.userInfo?.nickName }}
          </RouterLink>
          <a href="javascript:void(0)" class="nav-item" @click="$emit('logout')">
            {{ $t('global.nav.user.logout') }}
          </a>
          <RouterLink to="/member/order" class="nav-item">
            {{ $t('global.nav.user.myOrder') }}
          </RouterLink>
          <RouterLink to="/member/info" class="nav-item">
            {{ $t('global.nav.user.memberCenter') }}
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/user/login" class="nav-item">
            {{ $t('global.nav.user.login') }}
          </RouterLink>
        </template>
        <a href="javascript:void(0)" class="nav-item">{{ $t('global.nav.user.helpCenter') }}</a>
        <a href="javascript:void(0)" class="nav-item">{{ $t('global.nav.user.aboutUs') }}</a>
        <a href="javascript:void(0)" class="nav-item">
          <v-icon class="mr-1">mdi-phone</v-icon>
          {{ $t('global.nav.contact.phone') }}
        </a>
      </div>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.nav-box {}

.nav-item {
  color: #cdcdcd;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: rgb(var(--v-theme-primary-darken-1));
  }

  &+.nav-item::before {
    content: "|";
    display: inline-block;
    color: #666;
    margin: 0 15px;
  }
}
</style>
