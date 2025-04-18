<template>
  <v-card>
    <v-toolbar color="primary" title="切换地址" density="compact">
      <v-btn icon @click="handleClose">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <div class="addressWrapper">
        <div v-for="(item, i) in list" :key="item.id" class="text item" :class="{ active: item.id === selectedId }"
          @click="handleSwitch(item, i)">
          <ul>
            <li><span>收<i />货<i />人：</span>{{ item.recipient }}
              <v-chip v-if="item.isDefault" class="ml-4" color="red">默认</v-chip>
            </li>
            <li><span>联系方式：</span>{{ item.phone }}</li>
            <li><span>收货地址：</span>{{ item.prefecture + item.city + item.address }}</li>
          </ul>

        </div>
      </div>
    </v-card-text>
    <v-card-actions class="pa-4 bg-grey-lighten-4">
      <v-spacer />
      <v-btn @click="handleClose">取消</v-btn>
      <v-btn color="primary" variant="flat" @click="handleSubmit">
        切换地址
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  activeAddress: {
    type: Object,
    default: {}
  }
})


const emit = defineEmits(["close", "switch-address"])

const selectedId = ref(props.activeAddress.id)
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
        border-color: rgb(var(--v-theme-primary));
        background: light(rgb(var(--v-theme-primary)), 50%);
      }
    }

  }
}
</style>
