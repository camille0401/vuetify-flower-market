<template>
  <v-number-input ref="inputRef" class="fs-number-input" v-model="internalValue" :min="props.min" :max="props.max"
    v-bind="$attrs" @update:model-value="handleInputChange" inset variant="outlined" hide-details controlVariant="split"
    density="compact">
    <template v-for="(_, slot) in $slots" #[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
  </v-number-input>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
  // 最小值
  min: {
    type: Number,
    default: -Infinity
  },
  // 最大值
  max: {
    type: Number,
    default: Infinity
  },
  // 防抖延迟时间（毫秒）
  debounce: {
    type: Number,
    default: 500
  },
  data: {
    type: Object,
    default: {},
  }
})

const emit = defineEmits(['update:model-value', 'change', 'out-of-range', 'store-count'])

const inputRef = ref(null)
const internalValue = ref(props.modelValue)

// 创建防抖函数
const debouncedEmit = useDebounceFn((value) => {
  const numValue = Number(value)

  // 检查是否超出范围
  if (numValue < props.min || numValue > props.max) {
    emit('out-of-range', { value: numValue, min: props.min, max: props.max })
    return
  }

  emit('update:model-value', numValue)
  emit('change', numValue)
  emit('store-count', props.data)
}, props.debounce)

// 处理输入变化
const handleInputChange = (value) => {
  internalValue.value = value
  debouncedEmit(value)
}

// 监听外部modelValue变化
watch(() => props.modelValue, (newVal) => {
  if (newVal !== internalValue.value) {
    internalValue.value = newVal
  }
})

// 暴露组件方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>

<style scoped>
.fs-number-input {
  min-width: 120px;
}
</style>
