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
            <a href="javascript:void(0)" @click="logout_dialog = true">退出登录</a>
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
  <v-dialog v-model="logout_dialog" max-width="500">
    <v-card>
      <v-card-title class="d-flex align-center text-h6 bg-primary">
        <v-icon color="background" class="mr-2">mdi-alert-circle</v-icon>
        确定要退出当前登录账号吗？
      </v-card-title>
      <v-card-text> 退出后将需要重新登录才能访问受保护内容 </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="logout_dialog = false">取消</v-btn>
        <v-btn color="error" @click="confirmLogout"> 确认退出 </v-btn>
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

const logout_dialog = ref(false)

const confirmLogout = () => {
  logout_dialog.value = false;
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
