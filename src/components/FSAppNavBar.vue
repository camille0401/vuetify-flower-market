<!-- <template>
  <nav class="fs-app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore?.userInfo?.token">
          <li>
            <RouterLink to="/member/info">
              <v-icon>mdi-magnify</v-icon>
              {{ userStore?.userInfo?.account }}
            </RouterLink>
          </li>
          <li>
            <el-popconfirm @confirm="confirmLogout" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li>
            <RouterLink to="/member/order">我的订单</RouterLink>
          </li>
          <li>
            <RouterLink to="/member/home">会员中心</RouterLink>
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/login">请先登录</RouterLink>
          </li>
          <li><a href="javascript:void(0);">帮助中心</a></li>
          <li><a href="javascript:void(0);">关于我们</a></li>
        </template>
        <li>
          <a href="javascript:void(0);">
            <v-icon class="mr-1">mdi-phone</v-icon>4009-939-002
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template> -->
<template>
  <nav class="fs-app-topnav">
    <v-toolbar color="grey-darken-4" title="">
      <div class="container nav-box">
        <template v-if="userStore?.userInfo?.token">
          <v-btn to="/member/info">
            {{ userStore?.userInfo?.account }}
          </v-btn>
          <v-btn to="/member/order">
            我的订单
          </v-btn>
          <v-btn to="/member/home">
            会员中心
          </v-btn>
          <v-btn prepend-icon="mdi-logout">
            logout
          </v-btn>
        </template>
        <template v-else>
          <v-btn to="/login" prepend-icon="mdi-login">
            Login
          </v-btn>
          <v-btn>
            帮助中心
          </v-btn>
          <v-btn>
            关于我们
          </v-btn>
        </template>
        <v-btn prepend-icon="mdi-phone">4009-939-002</v-btn>
      </div>
    </v-toolbar>
  </nav>
</template>

<script setup>
import FSCartIcon from './FSCartIcon.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const confirmLogout = () => {
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
