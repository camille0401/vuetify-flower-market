<template>
  <div class="app-header-sticky" :class="{ show: y > 98 }">
    <v-sheet color="background" elevation="4">
      <v-container class="mx-auto ">
        <v-row align="center" class="py-4">
          <!-- 左侧 Logo -->
          <v-col cols="12" sm="4" md="3" class="d-flex align-center">
            <Logo />
          </v-col>

          <!-- 右侧分类导航 -->
          <v-col cols="12" sm="8" md="9" class="d-flex justify-end align-center right-box">
            <FSCategoryNav position="fixed" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>


<script setup name="LayoutHeaderFixed">
import Logo from "@/components/FSHeader/Logo.vue"
import FSCategoryNav from "@/components/FSCategoryNav.vue"
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)

</script>
<style scoped lang='scss'>
.app-header-sticky {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100px;
  // background-color: #FFF;
  // border-bottom: 1px solid #e4e4e4;
  // box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s linear;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transform: none;
    opacity: 1;
  }

  .header-sticky-box {
    display: flex;
    align-items: center;


  }

  .right-box {
    gap: 8px;

    @media (max-width: 600px) {
      justify-content: center;
      margin-top: 8px;
    }
  }

}
</style>
