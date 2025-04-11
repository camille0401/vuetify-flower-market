<template>
  <div class="fs-layout-nav">
    <div class="container category-box">
      <RouterLink to="/allCategories" class="left-box">
        <span>所有分类</span>
      </RouterLink>
      <div class="right-box">
        <FSCategoryNav />
      </div>
    </div>
  </div>
</template>

<script setup>
import FSCategoryNav from "@/components/FSCategoryNav.vue";
</script>

<style lang="scss" scoped>
.fs-layout-nav {
  .category-box {
    display: flex;
    // background: $fs-primary-color;

    .left-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      border-radius: 12px 12px 0 0;
      background: $fs-primary-color;
      font-size: 18px;
      line-height: 52px;
      font-weight: bold;
      text-align: center;
      color: #fff;

    }

    .right-box {
      width: calc(100% - 250px);
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
  }
}
</style>
