<template>
  <div class="fs-login-page">
    <section class="login-section">
      <div class="container">
        <div class="form-box" v-show="isLogin">
          <h1>Welcome Back</h1>
          <v-form ref="loginFormRef" @submit.prevent="doLogin">
            <EmailTextField v-model="loginForm" />
            <PasswordTextField v-model="loginForm" />
            <div class="d-flex justify-space-between">
              <v-checkbox label="Remember me"></v-checkbox>
              <a href="javascript:void(0);" class="d-flex align-center span forget">忘记密码?</a>
            </div>
            <br>
            <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
              Sign In
            </v-btn>
          </v-form>
          <p class="p">Don't have an account? <span class="span" @click="showRegister">Sign Up</span> </p>
          <!-- <p class="p line">Or With</p> -->
          <!-- <SocialButtons /> -->
        </div>
        <!-- 注册 -->
        <div class="form-box" v-show="!isLogin">
          <h1>Create Account</h1>
          <v-form ref="registerFormRef" @submit.prevent="doRegister">
            <EmailTextField v-model="registerForm" />
            <PasswordTextField v-model="registerForm" />
            <PasswordCheckTextField v-model="registerForm" />
            <br>
            <v-btn :loading="loading" color="primary" size="x-large" type="submit" variant="elevated" block>
              Sign Up
            </v-btn>
          </v-form>
          <p class="p">Already have an acount <span class="span" @click="showLogin">Sign In</span> </p>
          <!-- <p class="p line">Or With</p> -->
          <!-- <SocialButtons /> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from "vue-toastification";
import EmailTextField from './components/EmailTextField.vue';
import PasswordTextField from './components/PasswordTextField.vue';
import PasswordCheckTextField from './components/PasswordCheckTextField.vue';
import SocialButtons from './components/SocialButtons.vue';

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

// login-register-animation
const isLogin = ref(true)
// go-register-btn
const showRegister = () => {
  isLogin.value = false;
  loginFormRef.value.reset()
}
// go-login-btn
const showLogin = () => {
  isLogin.value = true;
  registerFormRef.value.reset()
}

// 登录
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

// 注册
const registerFormRef = ref()
const registerForm = ref({
  username: "1231@qq.com",
  password: "",
  checkPassword: ""
})
const doRegister = async () => {
  const { valid } = await registerFormRef.value.validate()
  if (valid) {
    const { username, password } = registerForm.value
    const nickname = username.split("@")[0]
    const res = await userStore.register({ username, nickname, password })
    console.log(res)
    if (res) {
      toast.success("注册成功,请登录", {
        timeout: 2000
      });
      showLogin.value = true;
    }
  }

}

// 密码框


</script>

<style scoped lang='scss'>
.fs-login-page {
  background: #ffffff;
  background-position: center;
  background-size: cover;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20vh;

  p {
    font-size: 14px;
    color: #FFF;
  }
}


.login-section {
  width: 100%;
  background: url("@/assets/images/login-bg.jpg");
  background-position: center;
  background-size: cover;
  padding: 50px;

  .container {
    display: flex;
    justify-content: flex-end;
  }

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

    h1 {
      font-size: 3rem;
      color: #151717;
      margin: 0 0 20px;
      letter-spacing: 2px;
      font-weight: bold;
      text-align: center;
    }

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

}

.login-footer {
  padding: 0 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
