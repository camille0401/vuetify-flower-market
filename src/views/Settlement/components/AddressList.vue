<template>
  <!-- <div class="addressWrapper">
    <div class="text item" :class="{ active: item.id === activeAddress.id }" v-for="item in list" :key="item.id"
      @click="switchAddress(item)">
      <ul>
        <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
      </ul>
    </div>
  </div> -->
  <v-card>
    <v-card-title class="d-flex align-center bg-primary">
      <span class="text-white">切换地址</span>
      <v-spacer />
      <v-btn icon @click="handleClose" variant="text">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div class="addressWrapper">
        <div v-for="(item, i) in list" :key="item.id" class="text item" :class="{ active: item.id === selectedId }"
          @click="handleSwitch(item, i)">
          <ul>
            <li><span>收<i />货<i />人：</span>{{ item.recipient }} </li>
            <li><span>联系方式：</span>{{ item.phone }}</li>
            <li><span>收货地址：</span>{{ item.prefecture + item.city + item.address }}</li>
          </ul>
        </div>
      </div>

    </v-card-text>

  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  activeId: {
    type: String,
    default: ""
  }
})


const emit = defineEmits(["close", "switchAddress"])

const selectedId = ref(props.activeId)


// 关闭
const handleClose = () => {
  emit('close')
}

const handleSwitch = (item, index) => {
  selectedId.value = item.id;

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
        border-color: $fs-primary-color;
        background: light($fs-primary-color, 50%);
      }
    }

  }
}
</style>
