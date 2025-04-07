<template>
  <nav class="fs-app-topnav">
    <v-toolbar color="grey-darken-4" title="">
      <div class="container nav-box">
        <template v-if="userStore?.userInfo?.token">
          <v-btn color="error" to="/member/info">
            {{ userStore?.userInfo?.account }}
          </v-btn>
          <v-btn color="error" to="/member/order">
            我的订单
          </v-btn>
          <v-btn color="error" to="/member/home">
            会员中心
          </v-btn>
          <!-- 退出登录 -->
          <v-dialog v-model="logout_dialog" max-width="500" transition="scale-transition">
            <template #activator="{ props }">
              <v-btn v-bind="props" color="error" variant="text">
                <v-icon start>mdi-logout</v-icon>
                logout
              </v-btn>
            </template>

            <v-card>
              <v-card-text>
                <div class="text-body-1">
                  确定要退出当前登录账号吗？
                </div>
                <div class="text-caption text-medium-emphasis mt-2">
                  退出后将需要重新登录才能访问受保护内容
                </div>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn variant="text" @click="logout_dialog = false">
                  取消
                </v-btn>
                <v-btn color="error" variant="tonal" @click="confirmLogout">
                  确认退出
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- <v-btn prepend-icon="mdi-logout">
            logout
          </v-btn> -->
        </template>
        <template v-else>
          <v-btn color="error" to="/login" prepend-icon="mdi-login">
            Login
          </v-btn>
          <v-btn color="error">
            帮助中心
          </v-btn>
          <v-btn color="error">
            关于我们
          </v-btn>
        </template>
        <v-btn color="error" prepend-icon="mdi-phone">4009-939-002</v-btn>
      </div>
    </v-toolbar>
  </nav>
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
  router.push('/login')
}

</script>

<style lang="scss" scoped>
.fs-app-topnav {
  background: #333333;

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

        // span {
        //   font-size: 16px;
        //   margin-right: 4px;
        // }

        &:hover {
          color: $fs-base-color-dark;
        }
      }

      ~li {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>
