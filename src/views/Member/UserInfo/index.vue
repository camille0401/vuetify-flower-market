<template>
  <v-card class="pa-6" rounded="lg" flat>
    <v-card-title class="text-h5 font-weight-bold mb-6">个人信息</v-card-title>

    <v-card-text>
      <div class="profile-container">
        <!-- 头像上传区域 -->
        <div class="avatar-section">
          <v-avatar color="primary-lighten-4" size="160" class="mb-4">
            <v-img v-if="userStore.userInfo?.avatar" :src="userStore.userInfo.avatar" alt="用户头像" cover />
            <v-icon v-else size="80">mdi-account-circle</v-icon>
          </v-avatar>

          <!-- <v-btn color="primary" variant="tonal" prepend-icon="mdi-camera" @click="openAvatarDialog">
            更换头像
          </v-btn> -->
          <v-btn color="primary" variant="tonal" prepend-icon="mdi-pencil-circle" @click="openPasswordDialog">
            修改密码
          </v-btn>
        </div>

        <!-- 表单区域 -->
        <v-form ref="form" class="profile-form" @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.username" label="用户名" variant="outlined" readonly density="comfortable" />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="form.nickName" label="昵称" variant="outlined" density="comfortable"
                :rules="[rules.required]" />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="form.email" label="电子邮箱" variant="outlined" density="comfortable"
                :rules="[rules.required, rules.email]" />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="form.phone" label="手机号码" variant="outlined" density="comfortable"
                :rules="[rules.phone]" />
            </v-col>

            <v-col cols="12">
              <v-select v-model="form.gender" label="性别" variant="outlined" density="comfortable"
                :items="genderOptions" />
            </v-col>

            <v-col cols="12">
              <v-textarea v-model="form.bio" label="个人简介" variant="outlined" density="comfortable" rows="3"
                counter="200" />
            </v-col>
          </v-row>

          <v-card-actions class="px-0">
            <v-spacer />
            <v-btn color="primary" size="large" type="submit" :loading="submitting" prepend-icon="mdi-content-save">
              保存修改
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card-text>

    <!-- 头像上传对话框 -->
    <!-- <v-dialog v-model="avatarDialog" max-width="500">
      <AvatarUploader :current-avatar="form.avatar" @close="avatarDialog = false" @uploaded="handleAvatarUploaded" />
    </v-dialog> -->
    <!-- 修改密码对话框 -->
    <v-dialog v-model="passwordDialog" max-width="500">
      <EditPassword @close="passwordDialog = false" />
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
// import AvatarUploader from './components/AvatarUploader.vue'
import EditPassword from './components/EditPassword.vue'

const toast = useToast()
const userStore = useUserStore()
const formRef = ref(null)

// 表单数据
const form = reactive({
  username: '',
  nickName: '',
  email: '',
  phone: '',
  gender: '',
  bio: '',
  avatar: ''
})

// 表单状态
const submitting = ref(false)
const avatarDialog = ref(false)
const passwordDialog = ref(false)

// 表单验证规则
const rules = {
  required: value => !!value || '必填项',
  email: value => /.+@.+\..+/.test(value) || '请输入有效的邮箱地址',
  phone: value => !value || /^1[3-9]\d{9}$/.test(value) || '请输入有效的手机号'
}

// 性别选项
const genderOptions = [
  { title: '男', value: 'male' },
  { title: '女', value: 'female' },
  { title: '其他', value: 'other' }
]

// 初始化表单数据
watch(() => userStore.userInfo, (userInfo) => {
  if (userInfo) {
    Object.assign(form, {
      username: userInfo.username || '',
      nickName: userInfo.nickName || '',
      email: userInfo.email || '',
      phone: userInfo.phone || '',
      gender: userInfo.gender || '',
      bio: userInfo.bio || '',
      avatar: userInfo.avatar || ''
    })
  }
}, { immediate: true })

// 打开头像上传对话框
const openAvatarDialog = () => {
  avatarDialog.value = true
}

// 处理头像上传成功
const handleAvatarUploaded = (avatarUrl) => {
  form.avatar = avatarUrl
  avatarDialog.value = false
  toast.success('头像更新成功')
}

// 修改密码
const openPasswordDialog = () => {
  passwordDialog.value = true
}

// 提交表单
const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  submitting.value = true
  try {
    // 调用API更新用户信息
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
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media (min-width: 960px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.avatar-section {
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

.profile-form {
  flex: 1;
  min-width: 0;
}
</style>
