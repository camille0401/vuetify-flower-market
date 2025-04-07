<!-- 会员中心 -->

<template>
  <div class="fs-member-page" style="padding-bottom: 40px">
    <FSFullCategoryNav />
    <div class="container">
      <!-- 面包屑 -->
      <div class="bread-box">
        <v-breadcrumbs>
          <v-breadcrumbs-item :to="{ path: '/' }">首页</v-breadcrumbs-item>
          <v-breadcrumbs-divider divider=">"></v-breadcrumbs-divider>
          <v-breadcrumbs-item :disabled="true">会员中心</v-breadcrumbs-item>
        </v-breadcrumbs>
      </div>
      <v-row>
        <v-col cols="3">
          <v-card class="mx-auto" rounded="l" elevation="4">
            <v-list>
              <v-list-item :prepend-avatar="userStore.userInfo?.avatar" subtitle="john@google.com" title="John Leider">
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i" :value="item" :to="item.path" color="primary">
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9">
          <RouterView />
          <!-- <v-card class="mx-auto pa-4" rounded="l">
          </v-card> -->
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script setup>
import FSFullCategoryNav from '@/components/FSFullCategoryNav.vue';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const items = [
  { text: '个人信息', icon: 'mdi-account', path: '/member/info' },
  { text: '收货地址', icon: 'mdi-map-marker', path: '/member/address' },
  { text: '我的订单', icon: 'mdi-flag', path: '/member/order' },
]
</script>
