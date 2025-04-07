<template>
  <div class="fs-login-page">
    <section class="login-section">
      <div class="container">
        <!-- 登录 -->
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
          <p class="p line">Or With</p>
          <SocialButtons />
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
          <p class="p line">Or With</p>
          <SocialButtons />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import $snackbar from '@/components/FSSnackbar';
import EmailTextField from './components/EmailTextField.vue';
import PasswordTextField from './components/PasswordTextField.vue';
import PasswordCheckTextField from './components/PasswordCheckTextField.vue';
import SocialButtons from './components/SocialButtons.vue';
const $toast = useToast();
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
  account: "",
  password: ""
})
const doLogin = async () => {
  // $toast.open({
  //   message: '登录成功',
  //   type: 'info',
  //   position: 'top'
  // })

  const { valid } = await loginFormRef.value.validate()
  console.log(valid)
  if (valid) {
    console.log(loginForm.value)
    const { account, password } = loginForm.value
    userStore.login({ account, password })
    // 1. 提示用户
    $snackbar.show({
      color: "success",
      message: "登录成功"
    })
    // 2. 跳转首页
    router.replace({ path: '/' })
  }
}

// 注册
const registerFormRef = ref()
const registerForm = ref({
  account: "",
  password: "",
  checkPassword: ""
})
const doRegister = async () => {
  // $toast.open({
  //   message: '登录成功',
  //   type: 'info',
  //   position: 'top'
  // })

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

  .toHome {
    --line: #e84393;
    --color: #e84393;
    text-decoration: none;
    color: var(--color);
    position: relative;

    span {
      background-image: linear-gradient(0deg, var(--line) 0%, var(--line) 100%);
      background-position: 100% 100%;
      background-repeat: no-repeat;
      background-size: var(--background-size, 100%) 1px;
      transition: background-size .2s linear var(--background-delay, .15s);
      font-size: 16px;
      line-height: 20px;
      transform: translateZ(0);
    }

    svg {
      vertical-align: top;
      display: inline;
      line-height: 1;
      width: 13px;
      height: 20px;
      position: relative;
      left: -2px;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1px;
      stroke: var(--line);
      stroke-dasharray: 7.95 30;
      stroke-dashoffset: var(--stroke-dashoffset, 46);
      transition: stroke-dashoffset var(--stroke-duration, .15s) var(--stroke-easing, linear) var(--stroke-delay, 0s);
    }

    &:hover {
      --background-size: 0%;
      --background-delay: 0s;
      --stroke-dashoffset: 26;
      --stroke-duration: .3s;
      --stroke-easing: cubic-bezier(.3, 1.5, .5, 1);
      --stroke-delay: .195s;
    }
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
