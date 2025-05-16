<template>
  <div style="height: 100%;">
    <section class="login-section">
      <v-container class="fill-height d-flex align-center">
        <v-row class="w-100" align="center" justify="center" justify-lg="end">
          <v-col cols="12" sm="8" md="7" lg="5">
            <transition name="fade-slide">
              <router-view />
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>



<script setup>


</script>

<style scoped lang="scss">
.login-section {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/login-bg.jpg") center/cover no-repeat;
  padding: 60px 0; // 给上下适度空间

  @media (max-width: 768px) {
    padding: 30px 0; // 小屏缩小上下间距
  }

  .v-container {
    position: relative;
    z-index: 2;

    .fade-slide-enter-active {
      transition: all 0.4s ease;
    }

    .fade-slide-enter-from {
      opacity: 0;
      transform: translateY(10px);
    }
  }
}
</style>
