<template>
  <v-navigation-drawer v-model="drawerValue" temporary location="left" color="grey-darken-4">
    <v-list nav density="comfortable" color="primary">

      <v-list density="comfortable" nav>
        <v-list-item :title="$t('global.allCategoriesText')" link to="/allCategories"></v-list-item>
        <!-- 一级菜单 -->
        <v-list-group v-for="(category, index) in categoryStore.categoryList" :key="index" :value="category.id">
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title>{{ category.cname }}</v-list-item-title>
            </v-list-item>
          </template>

          <!-- 二级菜单 -->
          <v-list-item link v-for="(subItem, i) in category.children" :key="i" :active="activeItem === subItem.id"
            @click="setActive(subItem.id)" :to="`/category/2/${subItem.id}`">
            <v-list-item-content>
              <v-list-item-title>{{ subItem.cname }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-divider class="mb-4"></v-divider>
      <template v-if="userStore.token">
        <v-list-subheader class="text-primary text-h6">
          {{ $t('global.nav.user.welcome') }} {{ userStore?.userInfo?.nickName }}
        </v-list-subheader>
        <v-list-item :title="$t('global.nav.user.myAccount')" link to="/member/info">
          <template v-slot:prepend>
            <v-icon icon="mdi-account"></v-icon>
          </template>
        </v-list-item>
        <v-list-item :title="$t('global.nav.user.myOrder')" link to="/member/order">
          <template v-slot:prepend>
            <v-icon icon="mdi-flower-poppy"></v-icon>
          </template>
        </v-list-item>
        <v-list-item :title="$t('global.nav.user.myAddress')" link to="/member/address">
          <template v-slot:prepend>
            <v-icon icon="mdi-map-marker-multiple"></v-icon>
          </template>
        </v-list-item>
        <v-list-item :title="$t('global.nav.user.cart')" link to="/cartlist">
          <template v-slot:prepend>
            <v-icon icon="mdi-cart"></v-icon>
          </template>
        </v-list-item>
        <v-list-item :title="$t('global.nav.user.logout')" @click="handleLogout">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout"></v-icon>
          </template>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item :title="$t('global.nav.user.login')" to="/user/login">
          <template v-slot:prepend>
            <v-icon icon="mdi-login"></v-icon>
          </template>
        </v-list-item>
        <v-list-item :title="$t('global.nav.user.register')" to="/user/register">
          <template v-slot:prepend>
            <v-icon icon="mdi-account-plus"></v-icon>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
const userStore = useUserStore()

// 当前激活的子项名称
const activeItem = ref('')
// 设置激活项
const setActive = (id) => {
  activeItem.value = id
}
const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue', 'logout'])

const drawerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})


const handleLogout = () => {
  emit('logout')
}


// onBeforeMount(() => {
//   activeItem.value = ''
// })
</script>

<style scoped lang="scss">
.drawer-menu {
  width: 3000px;
}
</style>
