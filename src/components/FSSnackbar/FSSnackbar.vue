<template>
  <v-snackbar :timeout="2000" :color="color" :variant="variant" v-model="snackbar" :location="location">{{ message }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar = false">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  color: {
    type: String,
  },
  variant: {
    type: String || undefined,
    default: "flat",
  },
  message: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: "top"
  }
})

// 信息提示状态 因为Props接受的数据是只读
const snackbar = ref()

const show = () => {
  // 调用即显示 所以不需要传递snackbar参数
  snackbar.value = true
}
//将show方法暴露出去
defineExpose({
  show,
})
</script>
