<template>
  <v-card class="mx-auto pa-4" rounded="l" elevation="0" style="height: 100%;">
    <v-card-title>
      个人信息
    </v-card-title>
    <v-divider class="ma-4"></v-divider>
    <v-card-item>
    </v-card-item>
    <v-card-text>
      <div class="content-box">
        <v-avatar v-if="userStore.userInfo?.avatar" color="info" size="100">
          <v-img alt="John" :src="userStore.userInfo?.avatar"></v-img>
        </v-avatar>
        <v-avatar v-else color="primary" size="100">
          <v-icon icon="mdi-account-circle" size="80"></v-icon>
        </v-avatar>
        <div class="form-group">
          <v-form ref="userinfoFormRef">
            <v-text-field v-model="userInfoForm.username" color="primary" label="User name"
              variant="underlined"></v-text-field>

            <v-text-field v-model="userInfoForm.nickName" color="primary" label="Nick name"
              variant="underlined"></v-text-field>

            <v-text-field v-model="userInfoForm.email" color="primary" label="Email"
              variant="underlined"></v-text-field>
            <!-- <v-select v-model="userInfoForm.gender" color="primary" label="Gender" variant="underlined"
                :items="[{ title: '男', value: 0 }, { title: '女', value: 1 }]">

              </v-select>

              <v-text-field v-model="userInfoForm.birthday" color="primary" label="Birthday"
                variant="underlined"></v-text-field> -->

            <!-- <v-date-picker ></v-date-picker> -->

            <!-- <v-text-field v-model="userInfoForm.phone" color="primary" label="Phone"
                variant="underlined"></v-text-field> -->

            <v-btn color="primary" size="x-large" variant="elevated" block @click="handleSubmit">submit</v-btn>
          </v-form>
        </div>
      </div>

    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

const toast = useToast()

const userStore = useUserStore()

const userinfoFormRef = ref(null);
const userInfoForm = ref({
  username: "",
  email: "",
  nickName: "",
  // avatar: "",
  // gender: 1,
  // birthday: "",
  // phone: "",

})

// 初始化表单数据
watchEffect(() => {
  if (userStore.userInfo) {
    userInfoForm.value = { ...userStore?.userInfo }
  }
})

const handleSubmit = () => {
  toast.warning("开发中")

}

</script>


<style scoped lang="scss">
.content-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  row-gap: 20px;
  margin: 40px;
}

.form-group {
  width: 100%;

  .dyn-label {
    display: flex;
    justify-content: space-between;
    width: 48px;
    font-size: 12px;
    vertical-align: top;
    font-weight: normal;
    line-height: 36px;
    margin-right: 20px;
  }

  :deep(.el-form-item) {
    margin-bottom: 40px;
  }

  :deep(.el-input__wrapper) {
    background-color: #F7F9FA;
    box-shadow: none;
    color: #232628;
  }

}
</style>
