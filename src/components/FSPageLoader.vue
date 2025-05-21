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
          <v-img v-if="mobile" :src="errorMobile" max-width="50%" cover class="mx-auto mb-4"
            :alt="$t('pageLoader.errorImgAlt')" />
          <v-img v-else :src="errorPc" max-width="300" class="mx-auto mb-4" :alt="$t('pageLoader.errorImgAlt')" />
          <h2 class="text-h6 mb-2">{{ $t('pageLoader.errorTitle') }}</h2>
          <p class="text-body-2 mb-4">{{ $t('pageLoader.errorDescription') }}</p>
          <!-- <v-btn color="primary" variant="elevated" @click="reload" class="px-6">
          {{$t('pageLoader.errorRetry')}}}
          </v-btn> -->
        </v-container>
      </slot>
    </template>

    <template v-else>
      <!-- 成功状态：通过插槽传出数据 -->
      <slot :data="data"></slot>
    </template>
  </div>
</template>

<script setup>
import errorPc from '@/assets/svgs/error.svg'
import errorMobile from '@/assets/svgs/error-mobile.svg'
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const props = defineProps({
  fetch: {
    type: Function,
    required: true
  }
})

const data = ref(null)
const error = ref(null)
const loading = ref(false)

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
