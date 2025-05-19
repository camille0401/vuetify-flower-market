<template>
  <v-card :class="mobile ? 'rounded-0' : 'rounded-lg elevation-2'">
    <v-toolbar color="primary" :title="$t('member.user.editPwdDialog.password.title')" density="compact">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text class="pt-6">
      <v-form ref="form">
        <!-- <v-text-field v-model="currentPassword" :type="showCurrentPassword ? 'text' : 'password'"
          :label="$t('member.user.editPwdDialog.password.current')" variant="outlined" density="comfortable"
          :rules="[rules.required]" :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showCurrentPassword = !showCurrentPassword" /> -->

        <v-text-field v-model="newPassword" :type="showNewPassword ? 'text' : 'password'"
          :label="$t('member.user.editPwdDialog.password.new')" variant="outlined" density="comfortable"
          :rules="[rules.required, rules.minLength]" :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showNewPassword = !showNewPassword" />

        <v-text-field v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
          :label="$t('member.user.editPwdDialog.password.confirm')" variant="outlined" density="comfortable"
          :rules="[rules.required, rules.passwordMatch]"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showConfirmPassword = !showConfirmPassword" />

        <!-- <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
          {{ errorMessage }}
        </v-alert> -->

      </v-form>
    </v-card-text>
    <v-card-actions class="bg-grey-lighten-4" :class="mobile ? 'position-sticky bottom-0' : ''">
      <v-spacer />
      <v-btn variant="text" @click="close">{{ $t('member.user.editPwdDialog.common.cancel') }}</v-btn>
      <v-btn color="primary" :loading="submitting" prepend-icon="mdi-lock-reset" @click="handleSubmit">
        {{ $t('member.user.editPwdDialog.common.confirm') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { encrypt } from '@/utils/rsaEncrypt'

const { mobile } = useDisplay()
const { t } = useI18n()
const router = useRouter()
const emit = defineEmits(['close'])
const toast = useToast()
const userStore = useUserStore()

const form = ref(null)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const submitting = ref(false)
const errorMessage = ref('')

// 校验规则
const rules = {
  required: value => !!value || t('member.user.editPwdDialog.validation.required'),
  minLength: value => value.length >= 6 || t('member.user.editPwdDialog.validation.passwordLength'),
  passwordMatch: () => newPassword.value === confirmPassword.value || t('member.user.editPwdDialog.validation.passwordMismatch')
}

// 关闭并重置表单
const close = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  errorMessage.value = ''
  form.value?.resetValidation()
}

// 提交表单
const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  submitting.value = true
  errorMessage.value = ''

  try {
    const res = await userStore.changePassword({
      username: userStore.userInfo.username,
      password: encrypt(newPassword.value)
    })
    // console.log(res)
    await userStore.logout() // 清除 token
    router.replace('/user/login') // 跳转登录页
    toast.success(t('member.user.editPwdDialog.password.updateSuccess'))
    close()
  } catch (error) {
    errorMessage.value = error.message || t('member.user.editPwdDialog.password.updateFailed')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.v-text-field {
  margin-bottom: 16px;
}
</style>
