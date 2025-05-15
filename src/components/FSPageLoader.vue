<template>
  <div>
    <template v-if="loading">
      <!-- 骨架屏或加载动画 -->
      <slot name="loading">
        <div class="d-flex align-center justify-center py-10">
          <v-progress-circular indeterminate size="48" color="primary" />
        </div>
      </slot>
    </template>

    <template v-else-if="error">
      <!-- 错误提示 + 重试按钮 -->
      <slot name="error">
        <v-container class="text-center py-10">
          <v-img :src="errorImg" max-width="300" class="mx-auto mb-4" alt="加载失败" />
          <h2 class="text-h6 mb-2">页面加载失败</h2>
          <p class="text-body-2 mb-4">网络可能开了个小差，请检查连接或稍后重试。</p>
          <!-- <v-btn color="primary" variant="elevated" @click="reload" class="px-6">
            重试
          </v-btn> -->
        </v-container>
      </slot>
    </template>

    <template v-else>
      <!-- 成功状态：通过插槽传出数据 -->
      <slot :data="data" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import errorImg from '@/assets/images/error.svg'
const props = defineProps({
  fetch: {
    type: Function,
    required: true
  }
})

const data = ref(null)
const error = ref(null)
const loading = ref(true)

const load = async () => {
  loading.value = true
  error.value = null

  try {
    data.value = await props.fetch()
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const reload = () => {
  load()
}

onMounted(load)
</script>

<style lang="scss">
.error-fallback {
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-weight: 600;
  }

  p {
    color: #999;
  }
}
</style>
