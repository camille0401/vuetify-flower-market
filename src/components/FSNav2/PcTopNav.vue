<template>
  <v-container color="background" class="d-flex justify-space-between align-center">

    <RouterLink to="/" class="text-h5 font-weight-bold">
      <span>Flower Market</span>
    </RouterLink>

    <div class="d-flex align-center justify-center ga-2 pl-4">
      <v-btn to="/allCategories" active-color="primary-darken-1" variant="text">所有分类</v-btn>
      <v-btn v-for="cate in categoryStore.categoryList" :key="cate.id" active-color="primary-darken-1" variant="text"
        :to="`/category/1/${cate.id}`" class="cate-item">
        {{ cate.cname }}
      </v-btn>
    </div>

    <div class="d-flex align-center ga-2 pr-4">
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
        <!-- <v-icon icon="mdi-cart"></v-icon> -->
        <CartIcon />
        <span>{{ $t('global.nav.user.cart') }}</span>
      </RouterLink>

      <RouterLink v-if="userStore?.token" class="nav-item px-4 ga-1" to="" @click="$emit('logout')">
        <v-icon icon="mdi-logout"></v-icon>
        <span> {{ $t('global.nav.user.logout') }}</span>
      </RouterLink>
    </div>
  </v-container>
</template>

<script setup>
import CartIcon from '@/views/CartList/components/CartIcon.vue'
import { useUserStore } from '@/stores/user'
import { useCategoryStore } from '@/stores/category'

const userStore = useUserStore()
const categoryStore = useCategoryStore()

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
