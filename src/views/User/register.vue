<template>
  <!-- 注册 -->
  <div class="form-box">
    <h1 class="text-h5 text-center">{{ $t('global.register.createAccount') }}</h1>
    <p class="text-subtitle-2 text-center mb-10" style="color: #757575;">{{ $t('global.register.welcome') }}</p>
    <v-form ref="registerFormRef" @submit.prevent="doRegister">
      <EmailTextField v-model="registerForm" />
      <PasswordTextField v-model="registerForm" :showPassword="showPassword" />
      <PasswordCheckTextField v-model="registerForm" :showPassword="showPassword" />
      <v-checkbox v-model="showPassword" color="primary" :label="$t('global.register.showPassword')"
        hide-details></v-checkbox>
      <br>
      <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
        {{ $t('global.register.createAccount') }}
      </v-btn>
    </v-form>
    <p class="p">{{ $t('global.register.alreadyHaveAccount') }} <span class="span" @click="toLogin">{{
      $t('global.register.toLogin') }}</span> </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from "vue-toastification"
import { useI18n } from 'vue-i18n' // Import useI18n to access translations
import EmailTextField from './components/EmailTextField.vue'
import PasswordTextField from './components/PasswordTextField.vue'
import PasswordCheckTextField from './components/PasswordCheckTextField.vue'
import SocialButtons from './components/SocialButtons.vue'

// Initialize i18n
const { t } = useI18n();  // Use `t` for translation

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

// 注册
const showPassword = ref(false)
const registerFormRef = ref()
const registerForm = ref({
  username: "",
  password: "",
  checkPassword: ""
})

const toLogin = () => {
  router.push("/user/login")
  registerFormRef.value.reset()
}

const doRegister = async () => {
  // 验证表单有效性
  const { valid } = await registerFormRef.value.validate()

  if (valid) {
    const { username, password } = registerForm.value
    const nickname = username.split("@")[0]
    try {
      // 发送注册请求
      await userStore.register({ username, nickname, password })

      // 提示用户注册成功
      toast.success(t('global.register.successMessage'), {
        timeout: 2000
      });

      // 跳转到登录页
      router.push("/user/login")

      // 登录成功后清空表单
      registerFormRef.value.reset()

    } catch (error) {
      // 捕获并处理错误，显示登录失败提示
      toast.error(t('global.register.failureMessage'), {
        timeout: 2000
      })
    }
  } else {
    // 如果表单无效，提示用户
    toast.error(t('global.register.invalidFormMessage'), {
      timeout: 2000
    })
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  margin-right: 20px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  .forget {
    min-height: 56px;
  }

  .span {
    margin-left: 5px;
    font-size: 14px;
    color: $fs-primary-color;
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
