<template>
  <nav class="fs-app-topnav">
    <v-sheet color="grey-darken-4" :elevation="2">
      <ul class="container">
        <template v-if="userStore?.token">
          <li>
            <RouterLink to="/member/info">
              <v-icon class="mr-1">mdi-account</v-icon>
              Welcome&nbsp;{{ userStore?.userInfo?.nickName }}
            </RouterLink>
          </li>
          <li>
            <a href="javascript:void(0)" @click="logoutDialog = true">退出登录</a>
          </li>
          <li>
            <RouterLink to="/member/order">我的订单</RouterLink>
          </li>
          <li>
            <RouterLink to="/member/info">会员中心</RouterLink>
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/user/login">请先登录</RouterLink>
          </li>
          <li><a href="javascript:void(0)">帮助中心</a></li>
          <li><a href="javascript:void(0)">关于我们</a></li>
        </template>
        <li>
          <a href="javascript:void(0)"><v-icon class="mr-1">mdi-phone</v-icon>&nbsp;XXXXXXX</a>
        </li>
      </ul>

    </v-sheet>
  </nav>
  <!-- 确认退出对话框 -->
  <v-dialog v-model="logoutDialog" max-width="400">
    <v-card>
      <v-card-title class="d-flex align-center bg-primary">
        <v-icon icon="mdi-logout" class="mr-2" />
        <span class="text-h6">确认退出</span>
      </v-card-title>

      <v-card-text class="pa-4">
        确定要退出当前账号吗？退出后将需要重新登录才能访问会员内容。
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="text" @click="logoutDialog = false">取消</v-btn>
        <v-btn color="error" @click="handleLogout">确认退出</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logoutDialog = ref(false)

const confirmLogout = () => {
  logoutDialog.value = false;
  userStore.clearUserInfo()
  // 2.跳转到登录页
  router.push('/user/login')
}

</script>

<style lang="scss" scoped>
.fs-app-topnav {

  .v-btn {
    text-transform: none;
  }

  .nav-box {
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  ul {
    display: flex;
    height: 55px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        display: flex;
        align-items: center;
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        font-size: 12px;

        &:hover {
          color: $fs-primary-color;
        }
      }

      ~li {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>
