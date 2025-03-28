<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore?.userInfo?.token">
          <li>
            <RouterLink to="/member/info">
              <i class="iconfont icon-user"></i>
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
        <li><a href="javascript:;"><i class="iconfont icon-icon-test1"></i>&nbsp;4009-939-002</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
