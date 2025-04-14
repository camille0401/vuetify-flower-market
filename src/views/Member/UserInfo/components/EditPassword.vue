<template>
  <v-card>
    <v-toolbar color="primary" title="修改密码" density="compact">
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text class="pt-6">
      <v-form ref="form" @submit.prevent="handleSubmit">
        <v-text-field v-model="currentPassword" :type="showCurrentPassword ? 'text' : 'password'" label="当前密码"
          variant="outlined" density="comfortable" :rules="[rules.required]"
          :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showCurrentPassword = !showCurrentPassword" />

        <v-text-field v-model="newPassword" :type="showNewPassword ? 'text' : 'password'" label="新密码" variant="outlined"
          density="comfortable" :rules="[rules.required, rules.minLength]"
          :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showNewPassword = !showNewPassword" />

        <v-text-field v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" label="确认新密码"
          variant="outlined" density="comfortable" :rules="[rules.required, rules.passwordMatch]"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showConfirmPassword = !showConfirmPassword" />

        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
          {{ errorMessage }}
        </v-alert>

        <v-card-actions class="px-0">
          <v-spacer />
          <v-btn variant="text" @click="$emit('close')">取消</v-btn>
          <v-btn color="primary" type="submit" :loading="submitting" prepend-icon="mdi-lock-reset">
            确认修改
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['close'])
const toast = useToast()
const userStore = useUserStore()

// Form data
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// UI state
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const form = ref(null)

// Validation rules
const rules = {
  required: value => !!value || '必填项',
  minLength: value => value.length >= 6 || '密码至少需要6个字符',
  passwordMatch: () => newPassword.value === confirmPassword.value || '两次输入的密码不一致'
}

// Close dialog
const close = () => {
  emit('close')
  resetForm()
}

// Reset form
const resetForm = () => {
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  errorMessage.value = ''
  form.value?.resetValidation()
}

// Handle form submission
const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  submitting.value = true
  errorMessage.value = ''

  try {
    await userStore.changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    })

    toast.success('密码修改成功')
    close()
  } catch (error) {
    errorMessage.value = error.message || '密码修改失败，请重试'
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
