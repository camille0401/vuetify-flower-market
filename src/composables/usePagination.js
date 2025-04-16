// composables/usePagination.js

import { computed, ref } from 'vue'

export const usePagination = (initial = { page: 1, pageSize: 10 }) => {
  const pagination = ref({ ...initial, total: 0 })

  const totalPages = computed(() => Math.ceil(pagination.value.total / pagination.value.pageSize))

  const handlePageChange = (page) => {
    pagination.value.page = page
  }

  return { pagination, totalPages, handlePageChange }
}
