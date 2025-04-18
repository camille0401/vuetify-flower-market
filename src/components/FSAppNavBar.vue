<template>
  <nav class="fs-app-topnav">
    <v-sheet color="grey-darken-4" :elevation="2">
      <ul class="container">
        <template v-if="userStore?.token">
          <li>
            <RouterLink to="/member/info">
              <v-icon class="mr-1">mdi-account</v-icon>
              {{ $t('global.nav.user.welcome') }} {{ userStore?.userInfo?.nickName }}
            </RouterLink>
          </li>
          <li>
            <a href="javascript:void(0)" @click="logoutDialog = true">{{ $t('global.nav.user.logout') }}</a>
          </li>
          <li>
            <RouterLink to="/member/order">{{ $t('global.nav.user.myOrder') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/member/info">{{ $t('global.nav.user.memberCenter') }}</RouterLink>
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/user/login">{{ $t('global.nav.user.login') }}</RouterLink>
          </li>
          <li><a href="javascript:void(0)">{{ $t('global.nav.user.helpCenter') }}</a></li>
          <li><a href="javascript:void(0)">{{ $t('global.nav.user.aboutUs') }}</a></li>
        </template>
        <li>
          <a href="javascript:void(0)"><v-icon class="mr-1">mdi-phone</v-icon>&nbsp;{{ $t('global.nav.contact.phone')
          }}</a>
        </li>
      </ul>
    </v-sheet>
  </nav>

  <!-- 确认退出对话框 -->
  <FSConfirmationDialog v-model="logoutDialog" :title="$t('global.nav.confirm.title')"
    :content="$t('global.nav.confirm.content')" titleIcon="mdi-logout" contentIcon=""
    :confirm-text="$t('global.nav.confirm.confirmText')" @confirm="confirmLogout" />
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import FSConfirmationDialog from '@/components/FSConfirmationDialog.vue'

const userStore = useUserStore()
const router = useRouter()

const logoutDialog = ref(false)

const confirmLogout = () => {
  logoutDialog.value = false;
  userStore.logout()
  router.push('/user/login')
}
</script>

<style lang="scss" scoped>
.fs-app-topnav {
  background-color: #333;
  /* 深色背景 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .v-btn {
    text-transform: none;
    font-size: 14px;
    /* 调整按钮文字大小 */
  }

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 55px;
    list-style: none;

    li {
      position: relative;
      display: flex;
      align-items: center;

      a {
        color: #cdcdcd;
        font-size: 14px;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: rgb(var(--v-theme-primary-darken-1));
        }
      }

      &~li {
        a {
          &::before {
            content: "|";
            display: inline-block;
            color: #666;
            margin: 0 15px;
          }

        }
      }
    }
  }

  /* 添加响应式调整 */
  @media (max-width: 768px) {
    ul {
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
    }

    li {
      padding: 10px 0;
      border-left: none;
    }
  }
}
</style>
