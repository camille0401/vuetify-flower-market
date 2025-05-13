<template>
  <div class="fs-member-page">
    <v-container class="mx-auto pb-10">
      <v-sheet v-if="!mobile" color="#FFF" class="mb-4" elevation="2">
        <!-- 面包屑导航 -->
        <v-breadcrumbs :items="breadcrumbs" class="text-body-2">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right" size="small" />
          </template>
        </v-breadcrumbs>
      </v-sheet>
      <v-row>
        <!-- 左侧菜单 -->
        <v-col cols="12" md="3" v-if="!mobile">
          <v-card flat rounded="0" elevation="2" min-height="500">
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-avatar color="primary-lighten-4" size="50">
                      <v-img :src="defaultAvatar" size="50" alt="默认的用户头像" cover />
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

            </v-card-text>
          </v-card>
        </v-col>

        <!-- 右侧内容区 -->
        <v-col cols="12" md="12" lg="9">
          <v-card flat rounded="0" elevation="2" min-height="500" height="100%">
            <RouterView />
          </v-card>
        </v-col>
      </v-row>
      <div class="member-content">
      </div>
    </v-container>
  </div>
</template>

<script setup>
import defaultAvatar from '@/assets/images/default-avatar.png'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()

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
  { text: t('global.nav.user.myAccount'), icon: 'mdi-account-cog', path: '/member/info' },
  { text: t('global.nav.user.myAddress'), icon: 'mdi-map-marker-multiple', path: '/member/address' },
  { text: t('global.nav.user.myOrder'), icon: 'mdi-clipboard-list', path: '/member/order' },
  // { text: '我的收藏', icon: 'mdi-heart', path: '/member/favorite' },
  // { text: '账户安全', icon: 'mdi-shield-lock', path: '/member/security' }
]

// 检查当前路由是否激活
const isActive = (path) => {
  return route.path.startsWith(path)
}
</script>

<style lang="scss" scoped>
.fs-member-page {

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

  @media (max-width: 960px) {
    .v-col {
      padding-left: 12px !important;
      padding-right: 12px !important;
    }
  }
}
</style>
