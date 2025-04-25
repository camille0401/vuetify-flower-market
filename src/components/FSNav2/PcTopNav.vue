<template>
  <v-app-bar color="background">
    <template v-slot:prepend>
      <!-- <div class="d-flex align-center ga-2 pl-4">
        <v-btn v-for="cate in categoryStore.categoryList" :key="cate.id" variant="text" :to="`/category/1/${cate.id}`"
          class="cate-item">
          {{ cate.cname }}
        </v-btn>
      </div> -->
      <v-app-bar-title class="pl-4">
        <RouterLink class="text-h5 font-weight-bold	" to="/">
          <span>Flower Market</span>
        </RouterLink>
      </v-app-bar-title>
    </template>
    <v-app-bar-title>
      <div class="d-flex align-center ga-2 pl-4">
        <v-btn v-for="cate in categoryStore.categoryList" :key="cate.id" variant="text" :to="`/category/1/${cate.id}`"
          class="cate-item">
          {{ cate.cname }}
        </v-btn>
      </div>
    </v-app-bar-title>

    <template v-slot:append>
      <div class="d-flex align-center ga-2 pr-4">

        <RouterLink to="/member/order" class="nav-item px-4 ga-1 ">
          <v-icon icon="mdi mdi-shopping-search"></v-icon>
          <span>搜索</span>
        </RouterLink>

        <RouterLink to="/member/order" class="nav-item px-4 ga-1 ">
          <v-icon icon="mdi mdi-flower-poppy"></v-icon>
          <span>我的订单</span>
        </RouterLink>

        <RouterLink to="/member/info" class="nav-item px-4 ga-1 ">
          <v-icon icon="mdi mdi-account"></v-icon>
          <span>我的账户</span>
        </RouterLink>

        <RouterLink to="/cartlist" class="nav-item px-4 ga-1 ">
          <v-icon icon="mdi mdi-cart"></v-icon>
          <span>购物车</span>
        </RouterLink>

        <RouterLink v-if="userStore?.token" to="/cartlist" class="nav-item px-4 ga-1 ">
          <v-icon icon="mdi mdi-logout"></v-icon>
          <span>退出</span>
        </RouterLink>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useCategoryStore } from '@/stores/category'

const userStore = useUserStore()
const categoryStore = useCategoryStore()
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
