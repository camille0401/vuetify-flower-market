<template>
  <h1 class="logo">
    <RouterLink to="/">
      <span>FLOWER MARKET</span>
    </RouterLink>
  </h1>
</template>

<style lang="scss" scoped>
.logo {
  width: 250px;
  min-width: max-content;

  a {
    display: flex;
    width: 100%;
    height: 100px;
    font-size: 25px;
    line-height: 60px;
    color: $fs-base-color-dark;
    align-items: center;
    font-weight: 700;
    // text-indent: -9999px;
    // background: url('@/assets/images/logo.png') no-repeat center / contain;
  }
}
</style>
