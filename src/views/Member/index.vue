<!-- 会员中心 -->

<template>
  <div class="fs-member-page">
    <div class="container pb-10">
      <v-card elevation="2" rounded="lg">
        <v-card-title>
          <!-- 面包屑 -->
          <v-breadcrumbs class="text-subtitle-2">
            <v-breadcrumbs-item :to="{ path: '/' }">
              <v-icon size="18" class="me-1">mdi-home</v-icon> 首页
            </v-breadcrumbs-item>
            <v-breadcrumbs-divider divider="mdi-chevron-right" />
            <v-breadcrumbs-item disabled>会员中心</v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-card-title>

        <v-card-text>
          <div class="pa-4">
            <v-row style="min-height: 500px;">
              <!-- 左侧菜单 -->
              <v-col cols="12" md="3">
                <v-list>
                  <v-list-item :title="userStore.userInfo?.nickName" :subtitle="userStore.userInfo?.email">
                    <template v-slot:prepend>
                      <v-avatar color="grey-lighten-3" size="40">
                        <v-icon icon="mdi-account" v-if="!userStore.userInfo?.avatar" />
                        <v-img v-else :src="userStore.userInfo.avatar" />
                      </v-avatar>
                    </template>
                  </v-list-item>
                </v-list>

                <v-divider class="my-2" />

                <v-list nav density="compact">
                  <v-list-item v-for="(item, i) in items" :key="i" :to="item.path" :active="item.path === $route.path"
                    color="primary" rounded="lg">
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon" />
                    </template>
                    <v-list-item-title v-text="item.text" />
                  </v-list-item>
                </v-list>
              </v-col>

              <!-- 右侧内容 -->
              <v-col cols="12" md="9">
                <RouterView />
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()

const items = [
  { text: '个人信息', icon: 'mdi-account', path: '/member/info' },
  { text: '收货地址', icon: 'mdi-map-marker', path: '/member/address' },
  { text: '我的订单', icon: 'mdi-flag', path: '/member/order' },
]
</script>
