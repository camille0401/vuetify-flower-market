// 打开添加地址弹框
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export const useCartCount = () => {
  const toast = useToast()
  // 数字输入框
  const errorMessage = ref('')

  const handleCountChange = (value) => {
    console.log('有效值变化:', value)
    errorMessage.value = ''
  }

  const handleOutOfRange = ({ value, min, max }) => {
    errorMessage.value = `值 ${value} 超出允许范围 (${min}-${max})`
  }

  return {
    errorMessage,
    handleCountChange,
    handleOutOfRange
  }
}
