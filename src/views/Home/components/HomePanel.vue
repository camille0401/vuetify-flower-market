<template>
  <div class="home-panel mb-4">
    <div class="head">
      <h3>
        {{ title }}<small>{{ subTitle }}</small>
      </h3>
    </div>
    <slot name="main"></slot>
  </div>
</template>

<script setup name="HomePanel">
import { defineProps } from "vue"

defineProps({
  title: {
    type: String,
  },
  subTitle: {
    type: String
  }
})

</script>

<style scoped lang='scss'>
.home-panel {
  .head {
    display: flex;
    align-items: flex-end;
    padding: 20px 0;
    margin: 20px auto;
    background: rgba(255, 51, 153, .05);

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #333;

      small {
        font-size: 16px;
        color: $fs-base-color-dark;
        margin-left: 20px;
      }
    }
  }
}
</style>
