<template>
  <v-navigation-drawer v-model="drawerValue" temporary location="left" color="grey-darken-4">
    <v-list>
      <v-list-subheader class="text-primary text-h6">分类</v-list-subheader>
      <v-list :items="items" color="primary"></v-list>
      <v-divider></v-divider>
      <v-list-item title="我的订单">
        <template v-slot:prepend>
          <v-icon icon="mdi-flower-poppy"></v-icon>
        </template>
      </v-list-item>
      <v-list-item title="我的账户">
        <template v-slot:prepend>
          <v-icon icon="mdi-account"></v-icon>
        </template>
      </v-list-item>
      <v-list-item title="购物车">
        <template v-slot:prepend>
          <v-icon icon="mdi-cart"></v-icon>
        </template>
      </v-list-item>
      <v-list-item title="退出账户" @click="handleLogout">
        <template v-slot:prepend>
          <v-icon icon="mdi-logout"></v-icon>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="text-no-wrap text-break" title="售后客服热线：400-670-1853">
        <template v-slot:prepend>
          <v-icon icon="mdi-phone"></v-icon>
        </template>
        <template v-slot:subtitle>
          <div v-html="'(周一至周五 9:00-18:00 国定假日休息)'"></div>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const items = [
  {
    title: 'Item #1',
    value: 1,
  },
  {
    title: 'Item #2',
    value: 2,
  },
  {
    title: 'Item #3',
    value: 3,
  },
]

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'logout'])

const drawerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const userStore = useUserStore()

const handleLogout = () => {
  emit('logout')
}
</script>

<style scoped lang="scss">
.drawer-menu {
  width: 3000px;
}
</style>
