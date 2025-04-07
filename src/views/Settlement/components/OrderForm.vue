<template>
  <el-form ref="orderFormRef" style="max-width: 600px" label-width="auto">
    <el-form-item prop="order" label="订购人:" required>
      <el-input v-model="orderFormRef.order" />
    </el-form-item>
    <el-form-item prop="orderPhone" label="联系方式:" required>
      <el-input v-model="orderFormRef.orderPhone" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';

const orderFormRef = ref({
  order: "",
  orderPhone: "",
})
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  background-color: #F7F9FA;
  box-shadow: none;
  color: #232628;
}

:deep(.el-select__wrapper) {
  background-color: #F7F9FA;
  box-shadow: none;
  color: #232628;
}
</style>
