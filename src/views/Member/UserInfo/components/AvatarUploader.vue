<template>
  <v-card>
    <v-card-title class="d-flex align-center bg-primary">
      <v-icon icon="mdi-account-circle" class="mr-2" />
      <span>更换头像</span>
    </v-card-title>

    <v-card-text class="pa-4">
      <!-- 上传区域 -->
      <div class="upload-area" @click="triggerFileInput">
        <v-icon v-if="!previewImage" icon="mdi-cloud-upload" size="64" color="primary" />
        <img v-else :src="previewImage" class="preview-image" alt="头像预览" />
        <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleFileChange" />
        <div class="upload-hint mt-4">
          {{ previewImage ? '点击更换图片' : '点击上传头像' }}
          <div class="text-caption text-grey mt-1">
            支持 JPG/PNG 格式，大小不超过 2MB
          </div>
        </div>
      </div>

      <!-- 裁剪控制区域 -->
      <div v-if="previewImage" class="crop-controls mt-6">
        <v-slider v-model="zoom" label="缩放" min="0.5" max="3" step="0.1" thumb-label class="mb-4" />
        <div class="d-flex justify-center gap-4">
          <v-btn variant="outlined" @click="rotate(-90)">
            <v-icon icon="mdi-rotate-left" class="mr-2" />
            左旋转
          </v-btn>
          <v-btn variant="outlined" @click="rotate(90)">
            <v-icon icon="mdi-rotate-right" class="mr-2" />
            右旋转
          </v-btn>
          <v-btn variant="outlined" color="error" @click="reset">
            <v-icon icon="mdi-restore" class="mr-2" />
            重置
          </v-btn>
        </div>
      </div>
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-4">
      <v-spacer />
      <v-btn variant="text" @click="$emit('close')">取消</v-btn>
      <v-btn color="primary" :loading="uploading" :disabled="!previewImage" @click="handleUpload">
        确认上传
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useToast } from 'vue-toastification'
// import Cropper from 'cropperjs'
// import 'cropperjs/dist/cropper.css'

const props = defineProps({
  currentAvatar: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'uploaded'])

const toast = useToast()
const fileInput = ref(null)
const previewImage = ref('')
const cropper = ref(null)
const zoom = ref(1)
const rotation = ref(0)
const uploading = ref(false)

// 初始化时显示当前头像
previewImage.value = props.currentAvatar

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value.click()
}

// 处理文件选择
const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  // 检查文件类型和大小
  if (!file.type.match('image.*')) {
    toast.error('请选择图片文件')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    toast.error('图片大小不能超过2MB')
    return
  }

  // 创建预览
  const reader = new FileReader()
  reader.onload = (event) => {
    previewImage.value = event.target.result
    initCropper()
  }
  reader.readAsDataURL(file)
}

// 初始化图片裁剪器
const initCropper = () => {
  nextTick(() => {
    const imageElement = document.querySelector('.preview-image')
    if (imageElement && !cropper.value) {
      cropper.value = new Cropper(imageElement, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 0.8,
        responsive: true,
        rotatable: true
      })
    }
  })
}

// 旋转图片
const rotate = (degrees) => {
  if (cropper.value) {
    rotation.value += degrees
    cropper.value.rotate(degrees)
  }
}

// 重置所有修改
const reset = () => {
  if (cropper.value) {
    cropper.value.reset()
    zoom.value = 1
    rotation.value = 0
  }
}

// 缩放图片
watch(zoom, (newVal) => {
  if (cropper.value) {
    cropper.value.scale(newVal)
  }
})

// 处理上传
const handleUpload = async () => {
  if (!cropper.value) return

  uploading.value = true
  try {
    // 获取裁剪后的图片
    const canvas = cropper.value.getCroppedCanvas({
      width: 300,
      height: 300,
      minWidth: 256,
      minHeight: 256,
      maxWidth: 1024,
      maxHeight: 1024,
      fillColor: '#fff',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    })

    // 转换为Blob对象
    canvas.toBlob(async (blob) => {
      try {
        // 这里替换为实际的上传逻辑
        // const avatarUrl = await uploadAvatar(blob)
        // 模拟上传延迟
        await new Promise(resolve => setTimeout(resolve, 1000))
        const avatarUrl = URL.createObjectURL(blob)

        emit('uploaded', avatarUrl)
        emit('close')
        toast.success('头像上传成功')
      } catch (error) {
        toast.error('头像上传失败')
      } finally {
        uploading.value = false
      }
    }, 'image/jpeg', 0.9)
  } catch (error) {
    uploading.value = false
    toast.error('头像处理失败')
  }
}
</script>

<style lang="scss" scoped>
.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  border: 2px dashed rgba(var(--v-theme-primary), 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--v-theme-primary);
    background-color: rgba(var(--v-theme-primary), 0.05);
  }

  .preview-image {
    max-width: 100%;
    max-height: 300px;
    display: block;
  }

  .upload-hint {
    text-align: center;
    color: var(--v-theme-primary);
  }
}

.crop-controls {
  .v-slider {
    max-width: 400px;
    margin: 0 auto;
  }
}

.v-card-title {
  color: white;
  padding: 16px;
}
</style>
