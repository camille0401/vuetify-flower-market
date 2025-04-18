<template>
  <v-dialog :model-value="modelValue" :max-width="maxWidth" :persistent="persistent"
    @update:model-value="handleDialogChange" role="dialog">
    <v-card>
      <!-- 标题区 -->
      <v-card-title class="d-flex align-center bg-primary">
        <v-icon :icon="titleIcon" class="mr-2" />
        <span class="text-h6">{{ title }}</span>
      </v-card-title>

      <!-- 内容区 -->
      <v-card-text class="pa-6">
        <div class="d-flex align-start">
          <v-icon v-if="contentIcon" :icon="contentIcon" :color="contentIconColor" class="mr-4" size="32" />
          <div class="flex-grow-1">
            <div v-if="content" class="text-body-1 mb-2">{{ content }}</div>
            <slot name="content">
              <!-- 默认插槽备用内容 -->
              <div v-if="$slots.default" class="text-caption text-grey">
                <slot />
              </div>
            </slot>
          </div>
        </div>
      </v-card-text>

      <!-- 操作按钮区 -->
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn :color="cancelColor" variant="text" @click="handleCancel" :loading="cancelLoading"
          :disabled="confirmLoading">
          {{ cancelText }}
        </v-btn>
        <v-btn :color="confirmColor" @click="handleConfirm" :loading="confirmLoading" :disabled="cancelLoading">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // 控制对话框显示
  modelValue: {
    type: Boolean,
    default: false
  },
  // 对话框标题
  title: {
    type: String,
    default: '请确认操作'
  },
  // 主要提示内容（简单文本）
  content: {
    type: String,
    default: ''
  },
  // 标题区图标
  titleIcon: {
    type: String,
    default: 'mdi-alert-circle-outline'
  },
  // 内容区图标
  contentIcon: {
    type: String,
    default: 'mdi-alert'
  },
  // 内容图标颜色
  contentIconColor: {
    type: String,
    default: 'warning'
  },
  // 确认按钮文字
  confirmText: {
    type: String,
    default: '确认'
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认按钮颜色
  confirmColor: {
    type: String,
    default: 'primary'
  },
  // 取消按钮颜色
  cancelColor: {
    type: String,
    default: 'grey'
  },
  // 是否禁用点击外部关闭
  persistent: {
    type: Boolean,
    default: false
  },
  // 最大宽度
  maxWidth: {
    type: [Number, String],
    default: 400
  },
  // 确认按钮加载状态
  confirmLoading: {
    type: Boolean,
    default: false
  },
  // 取消按钮加载状态
  cancelLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue',
  'confirm',
  'cancel',
  'close'
])

// 处理对话框显示状态变化
const handleDialogChange = (value) => {
  if (!value) {
    emit('close')
    emit('update:modelValue', false)
  }
}

// 确认操作
const handleConfirm = () => {
  emit('confirm')
}

// 取消操作
const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.confirmation-dialog {
  .v-card-title {
    color: white;
    padding: 16px;
  }

  .v-card-actions {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  .content-icon {
    margin-top: 2px;
  }
}
</style>
