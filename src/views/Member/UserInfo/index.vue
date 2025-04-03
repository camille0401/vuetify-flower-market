<template>
  <v-card class="mx-auto pa-4" rounded="l" elevation="4">
    <v-card-item>
      <v-card-title>
        个人信息
      </v-card-title>
    </v-card-item>
    <v-card-item>
      <v-divider></v-divider>
    </v-card-item>
    <v-card-item>
      <div class="content-box">
        <v-avatar v-if="userStore.userInfo?.avatar" color="info" size="100">
          <v-img alt="John" :src="userStore.userInfo?.avatar"></v-img>
        </v-avatar>
        <v-avatar v-else color="primary" size="100">
          <v-icon icon="mdi-account-circle" size="80"></v-icon>
        </v-avatar>
        <div class="form-group">
          <v-form ref="userinfoFormRef">
            <v-text-field v-model="userInfoForm.userName" color="primary" label="User name"
              variant="underlined"></v-text-field>

            <v-select v-model="userInfoForm.gender" color="primary" label="Gender" variant="underlined"
              :items="[{ title: '男', value: 0 }, { title: '女', value: 1 }]">

            </v-select>

            <v-text-field v-model="userInfoForm.birthday" color="primary" label="Birthday"
              variant="underlined"></v-text-field>

            <!-- <v-date-picker ></v-date-picker> -->

            <v-text-field v-model="userInfoForm.phone" color="primary" label="Phone"
              variant="underlined"></v-text-field>

            <v-text-field v-model="userInfoForm.email" color="primary" label="Email"
              variant="underlined"></v-text-field>

            <v-btn color="primary" size="x-large" type="submit" variant="elevated" block>submit</v-btn>
          </v-form>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup>
// import { getLikeListAPI } from '@/apis/user'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
// import GoodsItem from '@/views/Home/components/GoodsItem.vue'

const userStore = useUserStore()

const userinfoFormRef = ref(null);
const userInfoForm = ref({
  avatar: "",
  userName: "",
  gender: 1,
  birthday: "",
  phone: "",
  email: "",

})

const form = ref()

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
]

const nameRules = ref([
  v => !!v || 'Name is required',
  v => (v && v.length <= 10) || 'Name must be 10 characters or less',
])
const EmailRules = ref([
  value => {
    if (value) return true

    return 'E-mail is required.'
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  },
])

</script>


<style scoped lang="scss">
.content-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  row-gap: 20px;
  margin: 40px;
}

.form-group {
  width: 100%;

  .dyn-label {
    display: flex;
    justify-content: space-between;
    width: 48px;
    font-size: 12px;
    vertical-align: top;
    font-weight: normal;
    line-height: 36px;
    margin-right: 20px;
  }

  :deep(.el-form-item) {
    margin-bottom: 40px;
  }

  :deep(.el-input__wrapper) {
    background-color: #F7F9FA;
    box-shadow: none;
    color: #232628;
  }

}
</style>
