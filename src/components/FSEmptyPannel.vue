<template>
  <div class="fs-empty-box">
    <v-empty-state :title="title" :text="text">
      <!-- 按钮区域 -->
      <slot name="actions"></slot>
    </v-empty-state>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: "暂无数据",
  },
  text: {
    type: String,
    default: "",
  }
})

</script>
<style lang="scss" scoped>
.fs-empty-box {
  text-align: center;
  padding: 120px 0;
}
</style>
