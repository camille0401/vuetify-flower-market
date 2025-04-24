<!-- 忘记密码 -->
<template>
  <div class="forgot-form-box pa-8">
    <h1 class="text-h5 text-center">{{ $t('global.forgotPassword.title') }}</h1>
    <p class="text-subtitle-2 text-center mb-10" style="color: #757575;">{{ $t('global.forgotPassword.subtitle') }}</p>
    <v-form ref="forgotFormRef" validate-on="blur" @submit.prevent="doRestPassword">
      <EmailTextField v-model="forgotForm" />
      <EmailVerificationCode :email="forgotForm.username" v-model="forgotForm.code" :type="1" />
      <PasswordTextField v-model="forgotForm" :showPassword="showPassword" />
      <!-- <PasswordCheckTextField v-model="forgotForm" :showPassword="showPassword" /> -->
      <v-checkbox v-model="showPassword" color="primary" :label="$t('global.register.showPassword')"
        hide-details></v-checkbox>
      <br>

      <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
        {{ $t('global.forgotPassword.resetPassword') }}
      </v-btn>
    </v-form>
    <p class="p">
      {{ $t('global.forgotPassword.backToLogin') }}
      <span class="span" @click="toLogin">{{ $t('global.forgotPassword.login') }}</span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from "vue-toastification"
import { useI18n } from 'vue-i18n' // Import useI18n to access translations
import { forgetPwdAPI } from '@/apis/user'
import EmailTextField from './components/EmailTextField.vue'
import PasswordTextField from './components/PasswordTextField.vue'
import PasswordCheckTextField from './components/PasswordCheckTextField.vue'
import EmailVerificationCode from './components/EmailVerificationCode.vue'

// Initialize i18n
const { t } = useI18n();  // Use `t` for translation

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

// 注册
const loading = ref(false)
const showPassword = ref(false)
const forgotFormRef = ref()
const forgotForm = ref({
  username: "",
  password: "",
  checkPassword: "",
  code: ""
})

const toLogin = () => {
  router.push("/user/login")
  forgotFormRef.value.reset()
}

const doRestPassword = async () => {
  // 验证表单有效性
  const { valid } = await forgotFormRef.value.validate()
  if (!valid) {
    toast.error(t('global.register.invalidFormMessage'), {
      timeout: 2000
    })
    return;
  }

  loading.value = true;
  const { username, password, code } = forgotForm.value
  const nickname = username.split("@")[0]
  try {
    // 发送重置密码请求
    await forgetPwdAPI({ username, nickname, password, code })

    // 提示用户密码重置成功
    toast.success(t('global.forgotPassword.successMessage'), {
      timeout: 2000
    });

    // 跳转到登录页
    router.push("/user/login")

    // 登录成功后清空表单
    forgotFormRef.value.reset()

  } catch (error) {
    // 捕获并处理错误，显示登录失败提示
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.forgot-form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .span {
    margin-left: 5px;
    font-size: 14px;
    color: rgb(var(--v-theme-primary));
    font-weight: 500;
    cursor: pointer;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }
}
</style>
