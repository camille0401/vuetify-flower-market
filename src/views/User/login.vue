<template>
  <div class="form-box">
    <h1 class="text-h5 text-center">Welcome Back</h1>
    <p class="text-subtitle-2	text-center mb-10" style="color: #757575;">Lovely to see you again!</p>
    <v-form ref="loginFormRef" @submit.prevent="doLogin">
      <EmailTextField v-model="loginForm" />
      <PasswordTextField v-model="loginForm" />
      <div class="d-flex justify-space-between">
        <v-checkbox v-model="showPassword" color="primary" label="Show Password" hide-details></v-checkbox>
        <a href="javascript:void(0);" class="d-flex align-center span forget">忘记密码?</a>
      </div>
      <br>
      <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
        登录
      </v-btn>
    </v-form>
    <p class="p">Don't have an account? <span class="span" @click="toRegister">去注册</span> </p>
    <!-- <p class="p line">Or With</p> -->
    <!-- <SocialButtons /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from "vue-toastification";
import EmailTextField from './components/EmailTextField.vue';
import PasswordTextField from './components/PasswordTextField.vue';
import SocialButtons from './components/SocialButtons.vue';

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
  const { valid } = await loginFormRef.value.validate()
  if (valid) {
    console.log(loginForm.value)
    const { username, password } = loginForm.value
    await userStore.login({ username, password })
    // 1. 提示用户
    toast.success("登录成功", {
      timeout: 2000
    });
    // 2. 跳转首页
    router.replace({ path: '/' })
  }
}

const toRegister = () => {
  router.push("/user/register")
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
    color: $fs-base-color-dark;
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
