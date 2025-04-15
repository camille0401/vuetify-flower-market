import { useToast } from 'vue-toastification'

// 错误处理组合式函数
export const useErrorHandler = () => {
  const toast = useToast()

  const handleError = (error, defaultMessage = '操作失败') => {
    const message = error.response?.data?.message || defaultMessage
    toast.error(message)
    // console.error(error)
  }

  return { handleError }
}
