<template>
  <v-navigation-drawer v-model="drawerValue" temporary location="left" color="grey-darken-4" class="drawer-menu">
    <v-list density="compact" color="primary">
      <template v-if="userStore?.token">
        <v-list-item prepend-icon="mdi-account" :title="userStore.userInfo?.nickName" />
        <v-divider />
        <v-list-item :title="$t('global.nav.user.memberCenter')" to="/member/info" link />
        <v-list-item :title="$t('global.nav.user.myOrder')" to="/member/order" link />
        <v-list-item :title="$t('global.nav.user.logout')" @click="$emit('logout')" />
      </template>
      <template v-else>
        <v-list-item :title="$t('global.nav.user.helpCenter')" link />
        <v-list-item :title="$t('global.nav.user.aboutUs')" link />
        <v-list-item>
          <v-list-item-title>
            {{ $t('global.nav.contact.phone') }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'logout'])

const drawerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.drawer-menu {
  width: 250px;
}
</style>
