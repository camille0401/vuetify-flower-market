<template>
  <div class="app-container">
    <slot />
  </div>
</template>

<script setup>
// 无需 props，纯布局容器
</script>

<style scoped lang="scss">
.app-container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  border: 1px solid red;

  @media (max-width: 768px) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (max-width: 480px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
