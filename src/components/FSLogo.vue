<template>
  <h1 class="logo">
    <RouterLink class="text-primary-darken-1" to="/">
      <span>Flower Market</span>
    </RouterLink>
  </h1>
</template>

<style lang="scss" scoped>
.logo {
  width: 250px;
  min-width: max-content;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    font-size: 25px;
    line-height: 60px;
    font-weight: 700;
    // text-indent: -9999px;
    // background: url('@/assets/images/logo.png') no-repeat center / contain;
  }
}
</style>
