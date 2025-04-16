<template>
  <div class="form-box">
    <h1 class="text-h5 text-center">{{ $t('global.login.welcomeBack') }}</h1>
    <p class="text-subtitle-2	text-center mb-10" style="color: #757575;">{{ $t('global.login.seeYouAgain') }}</p>
    <v-form ref="loginFormRef" @submit.prevent="doLogin">
      <EmailTextField v-model="loginForm" />
      <PasswordTextField v-model="loginForm" :showPassword="showPassword" />
      <div class="d-flex justify-space-between">
        <v-checkbox v-model="showPassword" color="primary" :label="$t('global.login.showPassword')"
          hide-details></v-checkbox>
        <a href="javascript:void(0);" class="d-flex align-center span forget">{{ $t('global.login.forgotPassword')
        }}</a>
      </div>
      <br>
      <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
        {{ $t('global.login.login') }}
      </v-btn>
    </v-form>
    <p class="p">{{ $t('global.login.noAccount') }}<span class="span" @click="toRegister">{{
      $t('global.login.registerNow') }}</span> </p>
    <!-- <p class="p line">Or With</p> -->
    <!-- <SocialButtons /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n';  // Import useI18n to access translations
import { useToast } from "vue-toastification";
import EmailTextField from './components/EmailTextField.vue';
import PasswordTextField from './components/PasswordTextField.vue';
// import SocialButtons from './components/SocialButtons.vue';

// Initialize i18n
const { t } = useI18n();  // Use `t` for translation

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

// 登录
const showPassword = ref(false)
const loginFormRef = ref()
const loading = ref(false)
const loginForm = ref({
  username: "",
  password: ""
})

const doLogin = async () => {
  // 验证表单有效性
  const { valid } = await loginFormRef.value.validate()

  if (valid) {
    const { username, password } = loginForm.value

    try {
      // 发送登录请求
      await userStore.login({ username, password })

      // 提示用户登录成功
      toast.success(t('global.login.successMessage'), {
        timeout: 2000
      })

      // 跳转到首页
      router.replace({ path: '/' })

      // 登录成功后清空表单
      loginForm.value = { username: "", password: "" }

    } catch (error) {
      // 捕获并处理错误，显示注册失败提示
      toast.error(t('global.login.failureMessage'), {
        timeout: 2000
      })
    }
  } else {
    // 如果表单无效，提示用户
    toast.error(t('global.login.invalidFormMessage'), {
      timeout: 2000
    })
  }
}

const toRegister = () => {
  // 跳转到注册页面
  router.push("/user/register")

  // 重置表单
  loginFormRef.value.reset()
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
