<template>
  <v-card color="surface">
    <v-toolbar color="primary" density="compact">
      <v-spacer />
      <v-btn icon @click="handleClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <div v-if="detailLoading" class="d-flex justify-center align-center">
        <v-progress-circular indeterminate size="64" color="primary" />
      </div>
      <DetailCard v-else :detailData="detailData" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import DetailCard from './DetailCard.vue'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getDetailAPI } from '@/apis/detail'


const props = defineProps({
  goodsId: {
    type: Number,
  }
})

const emit = defineEmits(['close'])

const { t } = useI18n()

const detailData = ref(null)
const detailLoading = ref(true)

// 关闭
const handleClose = () => {
  emit('close')
}

const fetchDetailData = async () => {
  try {
    const res = await getDetailAPI(props.goodsId)
    detailData.value = res
  } catch (error) {
    console.error(t('detail.product.failedToLoad'), error)
  } finally {
    detailLoading.value = false
  }
}

onMounted(() => fetchDetailData())

</script>
