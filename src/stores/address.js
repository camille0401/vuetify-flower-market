import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAddressAPI,
  insertAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
  updateDefaultAddressAPI
} from '@/apis/address'
import { useToast } from 'vue-toastification'

export const useAddressStore = defineStore(
  'address',
  () => {
    const toast = useToast()

    const addressList = ref([])

    const clearAddress = () => {
      addressList.value = []
    }

    // 获取地址列表
    const fetchAddresses = async () => {
      try {
        const res = await getAddressAPI()
        addressList.value = res || []
      } catch (err) {
        throw err
      } finally {
      }
    }

    // 新增地址
    const createAddress = async (address) => {
      try {
        await insertAddressAPI(address)
        toast.success('添加地址成功')
        fetchAddresses()
      } catch (err) {
        toast.error('添加地址失败')
        throw err
      } finally {
      }
    }

    // 更新地址
    const updateAddress = async (address) => {
      try {
        await updateAddressAPI(address)
        toast.success('更新地址成功')
        fetchAddresses()
      } catch (err) {
        toast.error('更新地址失败')
        throw err
      } finally {
      }
    }

    // 切换默认地址
    const updateDefaultStatus = async (id, isDefault) => {
      try {
        await updateDefaultAddressAPI({ id, isDefault })
        fetchAddresses()
      } catch (err) {
        throw err
      } finally {
      }
    }

    // 删除地址
    const deleteAddress = async (id) => {
      try {
        await deleteAddressAPI(id)
        toast.success('删除地址成功')
        fetchAddresses()
      } catch (err) {
        toast.error('删除地址失败')
        throw err
      } finally {
      }
    }
    return {
      addressList,
      clearAddress,
      fetchAddresses,
      createAddress,
      updateAddress,
      deleteAddress,
      updateDefaultStatus
    }
  },
  {
    persist: true
  }
)
