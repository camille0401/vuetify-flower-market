<template>
  <el-form ref="noteFormRef" style="max-width: 600px" label-width="auto">
    <el-form-item prop="note">
      <el-input v-model="noteFormRef.note" type="textarea" :rows="2" placeholder="备注" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';

const noteFormRef = ref({
  note: "",
})
</script>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
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
