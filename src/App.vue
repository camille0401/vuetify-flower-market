<script setup>
import FSNav from '@/components/FSNav2/index.vue'
import FSFooter from './components/FSFooter.vue'
import { onMounted, watch } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useRoute } from 'vue-router'
import { useInviteCode } from '@/composables/useInviteCode'
import { useGlobalLoading } from '@/composables/useGlobalLoading'

const categoryStore = useCategoryStore()
const { globalLoading } = useGlobalLoading()
const route = useRoute()
const { setInviteCode } = useInviteCode()

onMounted(() => categoryStore.getCategory())

// onMounted(() => {
//   const inviteCode = route.query.inviteCode
//   const { setInviteCode } = useInviteCode()

//   if (inviteCode) {
//     console.log(inviteCode)
//     setInviteCode(inviteCode)
//   }
// })


watch(() => route.query.inviteCode, (newCode) => {
  if (newCode) {
    setInviteCode(newCode)
    // console.log('邀请码更新:', newCode)
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
