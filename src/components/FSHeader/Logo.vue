<template>
  <h1 class="logo">
    <RouterLink class="text-primary-darken-1" to="/">
      <span>Flower Market</span>
    </RouterLink>
  </h1>
</template>

<style lang="scss" scoped>
.logo {
  width: 100%;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 25px;
    line-height: 60px;
    font-weight: 700;

    /* Optional: Logo as background image */
    // background: url('@/assets/images/logo.png') no-repeat center / contain;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
}
</style>
