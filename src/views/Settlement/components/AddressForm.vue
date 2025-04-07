<template>
  <!-- <el-form ref="formRef" style="max-width: 600px" label-width="auto">
    <el-form-item prop="receiver" label="收货人:" required>
      <el-input v-model="addressForm.receiver" />
    </el-form-item>
    <el-form-item prop="contact" label="联系方式:" required>
      <el-input v-model="addressForm.contact" />
    </el-form-item>
    <el-form-item label="所在地区" required>
      <el-row style="width: 100%;" justify="space-between">
        <el-col :span="8">
          <el-form-item prop="prov">
            <el-select v-model="addressForm.prov" placeholder="Activity zone1">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="city">
            <el-select v-model="addressForm.city" placeholder="Activity zone2">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="region">
            <el-select v-model="addressForm.region" placeholder="Activity zone3">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item prop="address" label="详细地址:" required>
      <el-input v-model="addressForm.address" />
    </el-form-item>
  </el-form> -->
  <div style="width: 600px">
    <v-form ref="addressForm">
      <v-text-field v-model="addressForm.receiver" color="primary" label="收货人" variant="outlined"
        class="mb-2"></v-text-field>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const addressForm = ref({
  receiver: "",
  contact: "",
  prov: "",
  city: "",
  region: "",
  address: "",
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
