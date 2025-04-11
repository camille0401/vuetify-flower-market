<template>
  <div class="fs-member-page">
    <div class="container pb-10">
      <v-card elevation="2" rounded="lg">
        <!-- 面包屑导航 -->
        <v-card-title class="px-6 pt-6">
          <v-breadcrumbs :items="breadcrumbs" divider="›" class="px-0">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right" size="small" />
            </template>
          </v-breadcrumbs>
        </v-card-title>

        <v-card-text class="px-6 pb-6">
          <div class="member-content">
            <v-row>
              <!-- 左侧菜单 -->
              <v-col cols="12" md="3" class="pr-md-4">
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-avatar color="primary-lighten-4" size="48">
                        <v-icon v-if="!userStore.userInfo?.avatar" icon="mdi-account-circle" size="32" />
                        <v-img v-else :src="userStore.userInfo.avatar" />
                      </v-avatar>
                    </template>
                    <v-list-item-title class="font-weight-medium">
                      {{ userStore.userInfo?.nickName || '会员用户' }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ userStore.userInfo?.email || '欢迎回来' }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                <v-divider class="my-2" />
                <v-list nav density="comfortable">
                  <v-list-item v-for="(item, i) in menuItems" :key="i" :value="item.path" :to="item.path"
                    :active="isActive(item.path)" color="primary" rounded="xl" class="my-1">
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon" size="20" />
                    </template>
                    <v-list-item-title v-text="item.text" />
                  </v-list-item>
                </v-list>
                <!-- <v-card flat rounded="lg" class="mb-4">
                </v-card> -->
              </v-col>

              <!-- 右侧内容区 -->
              <v-col cols="12" md="9" class="pl-md-4">
                <RouterView />
                <!-- <v-card flat rounded="lg" min-height="500">
                </v-card> -->
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()

// 面包屑导航
const breadcrumbs = computed(() => [
  {
    title: '首页',
    disabled: false,
    href: '/',
    prependIcon: 'mdi-home'
  },
  {
    title: '会员中心',
    disabled: true
  }
])

// 菜单项
const menuItems = [
  { text: '个人信息', icon: 'mdi-account-cog', path: '/member/info' },
  { text: '收货地址', icon: 'mdi-map-marker-multiple', path: '/member/address' },
  { text: '我的订单', icon: 'mdi-clipboard-list', path: '/member/order' },
  { text: '我的收藏', icon: 'mdi-heart', path: '/member/favorite' },
  { text: '账户安全', icon: 'mdi-shield-lock', path: '/member/security' }
]

// 检查当前路由是否激活
const isActive = (path) => {
  return route.path.startsWith(path)
}
</script>

<style lang="scss" scoped>
.fs-member-page {

  .member-content {
    .v-list-item {
      transition: all 0.3s ease;

      &--active {
        background-color: rgba(var(--v-theme-primary), 0.1);
        border-left: 3px solid var(--v-theme-primary);
      }
    }

    .v-avatar {
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @media (max-width: 960px) {
    .member-content {
      .v-col {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
    }
  }
}
</style>
