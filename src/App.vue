<script setup>
import FSNav from '@/components/FSNav2/index.vue'
import FSFooter from './components/FSFooter.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useRoute } from 'vue-router'
import { useInviteCode } from '@/composables/useInviteCode'
import { useGlobalLoading } from '@/composables/useGlobalLoading'

const categoryStore = useCategoryStore()
const { globalLoading } = useGlobalLoading()

onMounted(() => categoryStore.getCategory())

onMounted(() => {
  const route = useRoute()
  const inviteCode = route.query.inviteCode
  const { setInviteCode } = useInviteCode()

  if (inviteCode) {
    setInviteCode(inviteCode)
  }
})
</script>

<template>
  <v-app theme="milkTeaLight">
    <FSNav />
    <v-main>
      <!-- 全局 Loading 遮罩 -->
      <v-overlay :model-value="globalLoading" class="d-flex align-center justify-center" persistent>
        <v-progress-circular indeterminate size="64" color="primary" />
      </v-overlay>
      <router-view v-slot="{ Component }">
        <v-fade-transition hide-on-leave>
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
    <FSFooter />
  </v-app>
</template>
