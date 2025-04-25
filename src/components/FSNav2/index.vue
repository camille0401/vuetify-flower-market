<template>
  <nav class="fs-app-topnav">
    <MobileTopNav v-if="mobile" @toggle-drawer="drawer = !drawer" @logout="logoutDialog = true" />
    <PcTopNav v-else @logout="logoutDialog = true" />

    <DrawerMenu v-if="mobile" v-model="drawer" @logout="logoutDialog = true" />
    <FSConfirmationDialog v-model="logoutDialog" :title="$t('global.nav.confirm.title')"
      :content="$t('global.nav.confirm.content')" titleIcon="mdi-logout" contentIcon=""
      :confirm-text="$t('global.nav.confirm.confirmText')" @confirm="confirmLogout" />
  </nav>
</template>

<script setup>
import FSConfirmationDialog from '@/components/FSConfirmationDialog.vue'
import PcTopNav from './PcTopNav.vue'
import MobileTopNav from './MobileTopNav.vue'
import DrawerMenu from './DrawerMenu.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay() // 使用Vuetify官方断点检测
const userStore = useUserStore()
const router = useRouter()

const drawer = ref(false)
const logoutDialog = ref(false)

const confirmLogout = () => {
  logoutDialog.value = false;
  userStore.logout()
  router.push('/user/login')
}


</script>

<style lang="scss" scoped>
.fs-app-topnav {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
