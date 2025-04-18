<template>
  <v-card class="mx-auto pa-4" rounded="l" elevation="0" style="height: 100%;">
    <v-card-title class="d-flex justify-space-between align-center">
      <p class="text-h5 font-weight-bold">{{ $t('member.address.title') }}</p>
      <v-btn color="primary" @click="openCreateDialog">
        <v-icon class="mr-2">mdi-pen-plus</v-icon>{{ $t('member.address.add') }}
      </v-btn>
    </v-card-title>

    <v-divider class="ma-4" />

    <v-card-text>
      <v-data-table :headers="headers" :items="addressStore.addressList" item-value="id" hide-default-footer>
        <!-- 默认地址开关 -->
        <template #item.isDefault="{ item }">
          <v-switch :model-value="item.isDefault" color="primary" :true-value="1" :false-value="0" hide-details
            @update:modelValue="toggleDefault(item.id, $event)" />
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

  <!-- 编辑或新增地址对话框 -->
  <v-dialog v-model="editDialog" max-width="600">
    <AddressForm :initial-data="selectedAddress" @submit="handleSubmit" @close="editDialog = false" />
  </v-dialog>

  <!-- 删除确认框 -->
  <FSConfirmationDialog v-model="deleteDialog" :title="$t('member.address.confirmDeleteTitle')"
    :content="$t('member.address.confirmDeleteContent')" title-icon="mdi-alert-circle-outline" confirm-color="error"
    :confirm-text="$t('member.address.common.confirmDelete')" @confirm="confirmDelete" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AddressForm from './components/AddressForm.vue'
import FSConfirmationDialog from '@/components/FSConfirmationDialog.vue'
import { useAddressStore } from '@/stores/address'
import { useAddressForm } from '@/composables/useAddressForm'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const addressStore = useAddressStore()

const {
  editDialog,
  selectedId,
  selectedAddress,
  openCreateDialog,
  openEditDialog,
  handleSubmit
} = useAddressForm()

const deleteDialog = ref(false)

const headers = [
  { title: t('member.address.columns.recipient'), key: 'recipient', sortable: false },
  { title: t('member.address.columns.phone'), key: 'phone', sortable: false },
  {
    title: t('member.address.columns.fullAddress'),
    key: 'address',
    sortable: false,
    value: (item) => `${item.prefecture} ${item.city} ${item.address}`
  },
  { title: t('member.address.columns.default'), key: 'isDefault', sortable: false },
  { title: t('member.address.columns.actions'), key: 'actions', sortable: false }
]

onMounted(() => {
  addressStore.fetchAddresses()
})

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

const toggleDefault = async (id, newValue) => {
  try {
    await addressStore.updateDefaultStatus(id, newValue)
  } catch (err) {
    console.error('切换默认地址失败:', err)
  }
}
</script>

<style scoped lang="scss"></style>
