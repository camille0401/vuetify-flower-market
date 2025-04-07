<template>
  <div class="addressWrapper">
    <div class="text item" :class="{ active: item.id === activeAddress.id }" v-for="item in list" :key="item.id"
      @click="switchAddress(item)">
      <ul>
        <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    default: [],
  },
  activeAddress: {
    type: Object,
    default: {}
  }
})
defineEmits(["switchAddress"])
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

      &.active,
      &:hover {
        border-color: $fs-base-color-light;
        background: light($fs-base-color-light, 50%);
      }

      >ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
