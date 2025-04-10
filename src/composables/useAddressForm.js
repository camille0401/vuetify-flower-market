// 打开添加地址弹框
import { ref } from 'vue'
import { useAddressStore } from '@/stores/address'

export const useAddressForm = () => {
  const addressStore = useAddressStore()

  const editDialog = ref(false)
  const selectedId = ref(null)
  const selectedAddress = ref(null)

  // 表单处理
  const openCreateDialog = () => {
    selectedAddress.value = null
    editDialog.value = true
  }

  const openEditDialog = (address) => {
    selectedAddress.value = { ...address }
    editDialog.value = true
  }

  const handleSubmit = async (formData) => {
    try {
      if (formData.id) {
        await addressStore.updateAddress(formData)
      } else {
        await addressStore.createAddress(formData)
      }
      editDialog.value = false
    } catch (err) {
      console.error('保存失败:', err)
    }
  }

  return {
    editDialog,
    selectedId,
    selectedAddress,
    openCreateDialog,
    openEditDialog,
    handleSubmit
  }
}
