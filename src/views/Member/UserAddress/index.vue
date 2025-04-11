<template>
  <v-card class="mx-auto pa-4" rounded="l" elevation="0" style="height: 100%;">
    <v-card-title>
      <v-btn color="primary" @click="openCreateDialog"><v-icon class="mr-2">mdi-pen-plus</v-icon>添加地址</v-btn>
    </v-card-title>

    <v-divider class="ma-4"></v-divider>

    <v-card-text>
      <!-- 地址表格 -->
      <v-data-table :headers="headers" :items="addressStore.addressList" hide-default-footer>
        <template v-slot:item.isDefault="{ item }">
          <v-switch :model-value="item.isDefault" color="primary" :true-value="1" :false-value="0" hide-details
            @update:modelValue="toggleDefault(item.id, $event)"></v-switch>
        </template>
        <!-- 操作列 -->
        <template #item.actions="{ item }">
          <v-btn size="x-small" icon color="primary" @click="openEditDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn size="x-small" icon color="error" class="ml-2" @click="openDeleteDialog(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>

  </v-card>
  <!-- 编辑对话框 -->
  <v-dialog v-model="editDialog" max-width="600">
    <AddressForm :initial-data="selectedAddress" @submit="handleSubmit" @close="editDialog = false" />
  </v-dialog>

  <!-- 删除确认对话框 -->
  <v-dialog v-model="deleteDialog" max-width="500">
    <v-card>
      <v-card-title class="d-flex align-center bg-primary">
        <v-icon color="background" class="mr-2">mdi-alert-circle</v-icon>
        确认删除？
      </v-card-title>
      <v-card-text> 确定要删除这个地址吗？此操作不可撤销。 </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="deleteDialog = false">取消</v-btn>
        <v-btn color="error" @click="confirmDelete"> 确认删除 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import AddressForm from './components/AddressForm.vue'
import { onMounted, ref } from 'vue'
import { useAddressStore } from '@/stores/address'
import { useAddressForm } from '@/composables/useAddressForm'


// 表格列配置
const headers = [
  { title: '收货人', key: 'recipient', sortable: false },
  { title: '联系方式', key: 'phone', sortable: false },
  { title: '详细地址', key: 'address', value: (item) => `${item.prefecture} ${item.city} ${item.address}`, sortable: false },
  { title: '默认地址', key: 'isDefault', sortable: false },
  { title: '操作', key: 'actions', sortable: false }
]

const addressStore = useAddressStore()

const { editDialog, selectedId, selectedAddress,
  openCreateDialog, openEditDialog, handleSubmit } = useAddressForm();

// 组件状态
const deleteDialog = ref(false)


// 生命周期钩子
onMounted(() => {
  addressStore.fetchAddresses()
})

// 删除操作
const openDeleteDialog = (id) => {
  selectedId.value = id
  deleteDialog.value = true
}

const confirmDelete = async () => {
  try {
    await addressStore.deleteAddress(selectedId.value)
    deleteDialog.value = false
  } catch (err) {
    console.error('删除失败:', err)
  }
}

// 切换默认地址
const toggleDefault = async (id, newValue) => {
  try {
    await addressStore.updateDefaultStatus(id, newValue)
  } catch (err) {
    console.error('状态更新失败:', err)
  }
}



</script>

<style lang="scss" scoped>
.member-add-actions {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
</style>
