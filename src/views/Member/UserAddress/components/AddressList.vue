<template>
  <v-card>
    <v-toolbar color="primary" :title="$t('member.address.swapDialog.formTitle')" density="compact">
      <v-btn icon @click="handleClose">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-empty-state v-if="list.length === 0" :title="$t('member.address.swapDialog.emptyTip')"></v-empty-state>
      <div v-else class="addressWrapper">
        <div v-for="(item, i) in list" :key="item.id" class="text item" :class="{ active: item.id === selectedId }"
          @click="handleSwitch(item, i)">
          <ul>
            <li>
              <span>{{ $t('member.address.swapDialog.list.recipient') }}</span>
              {{ item.recipient }}
              <v-chip v-if="item.isDefault" class="ml-4" color="red">
                {{ $t('member.address.swapDialog.list.defaultChip') }}</v-chip>
            </li>
            <li><span>{{ $t('member.address.swapDialog.list.phone') }}</span>{{ item.phone }}</li>
            <li>
              <span>{{ $t('member.address.swapDialog.list.address') }}</span>
              {{ item.prefecture + item.city + item.address }}
            </li>
          </ul>

        </div>
      </div>
    </v-card-text>
    <v-card-actions class="pa-4 bg-grey-lighten-4">
      <v-spacer />
      <v-btn @click="handleClose">{{ $t('member.address.swapDialog.common.cancel') }}</v-btn>
      <v-btn color="primary" variant="flat" prepend-icon="mdi-home-switch" :disabled="list.length === 0"
        @click="handleSubmit">
        {{ $t('member.address.swapDialog.common.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  activeAddress: {
    type: Object,
    default: () => ({})
  }
})


const emit = defineEmits(["close", "switch-address"])

const selectedId = ref(props.activeAddress?.id ?? '')
const selectedRow = ref(props.activeAddress)

const handleSwitch = (item, index) => {
  selectedId.value = item.id;
  selectedRow.value = item;
}
// 关闭
const handleClose = () => {
  emit('close')
}


const handleSubmit = () => {
  emit('switch-address', selectedRow.value)
}
</script>

<style lang="scss" scoped>
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: var(--v-theme-primary) #f5f5f5;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(var(--v-theme-primary), 0.3);
    border-radius: 4px;
  }

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;


      >ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }

      &.active,
      &:hover {
        border-color: var(--v-theme-primary);
        background-color: rgba(var(--v-theme-primary), 0.05); // 提供 hover 高亮色
      }
    }

  }
}
</style>
