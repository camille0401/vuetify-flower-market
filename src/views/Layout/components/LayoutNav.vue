<template>
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
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
        <li>
          <a href="javascript:;">
            <span class="mdi mdi-phone"></span>4009-939-002
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
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

        span {
          font-size: 16px;
          margin-right: 4px;
        }

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
