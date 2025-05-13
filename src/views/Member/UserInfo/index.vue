<template>
  <v-card class="pa-6" rounded="lg" flat style="height: 100%;">
    <v-card-title class="text-h5 font-weight-bold mb-6">
      {{ $t('member.user.profile.title') }}
    </v-card-title>

    <v-card-text>
      <div class="profile">
        <!-- 左：头像区域 -->
        <div class="profile__avatar">
          <v-avatar color="primary-lighten-4" size="160" class="mb-4">
            <v-img :src="defaultAvatar" size="160" alt="默认的用户头像" cover />
          </v-avatar>

          <v-btn color="primary" variant="tonal" prepend-icon="mdi-pencil-circle" @click="openPasswordDialog">
            {{ $t('member.user.profile.changePasswordBtn') }}
          </v-btn>
        </div>

        <!-- 右：表单区域 -->
        <v-form ref="formRef" class="profile__form">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field v-model="form.username" :label="$t('member.user.profile.username')" variant="outlined"
                readonly density="comfortable" />
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field v-model="form.nickname" :label="$t('member.user.profile.nickname')" variant="outlined"
                readonly density="comfortable" :rules="[rules.required]" />
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field v-model="form.email" :label="$t('member.user.profile.email')" variant="outlined" readonly
                density="comfortable" :rules="[rules.required, rules.email]" />
            </v-col>

          </v-row>
        </v-form>
      </div>
    </v-card-text>

    <!-- <v-card-actions class="px-0">
      <v-spacer />
      <v-btn color="primary" size="large" :loading="submitting" prepend-icon="mdi-content-save" @click="handleSubmit">
        {{ $t('member.user.common.saveBtn') }}
      </v-btn>
    </v-card-actions> -->
    <!-- 修改密码对话框 -->
    <v-dialog v-model="passwordDialog" max-width="600" :fullscreen="mobile" persistent>
      <EditPassword @close="passwordDialog = false" />
    </v-dialog>
  </v-card>
</template>

<script setup>
import EditPassword from './components/EditPassword.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'
import { ref, reactive, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import { useDisplay } from "vuetify"

const { mobile } = useDisplay()
const toast = useToast()
const userStore = useUserStore()
const formRef = ref(null)

const form = reactive({
  username: '',
  nickname: '',
  email: '',
})

const submitting = ref(false)
const passwordDialog = ref(false)

const rules = {
  required: value => !!value || '必填项',
  email: value => /.+@.+\..+/.test(value) || '请输入有效的邮箱地址',
}

watch(() => userStore.userInfo, (userInfo) => {
  if (userInfo) {
    Object.assign(form, {
      username: userInfo.username || '',
      nickname: userInfo.nickName || '',
      email: userInfo.email || '',
    })
  }
}, { immediate: true })

const openPasswordDialog = () => {
  passwordDialog.value = true
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true
  try {
    await userStore.updateUserInfo(form)
    toast.success('个人信息更新成功')
  } catch (error) {
    toast.error(error.message || '更新失败')
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;

  @media (min-width: 960px) {
    flex-direction: row;
    align-items: flex-start;
  }

  &__avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    min-width: 200px;

    .v-avatar {
      border: 3px solid rgba(var(--v-theme-primary), 0.1);
      transition: all 0.3s ease;

      &:hover {
        border-color: rgba(var(--v-theme-primary), 0.3);
        transform: scale(1.05);
      }
    }
  }

  &__form {
    flex: 1;
    min-width: 0;
  }
}
</style>
