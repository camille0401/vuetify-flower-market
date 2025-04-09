<template>
  <div class="home-panel mb-10">
    <v-sheet>
      <div class="head ">
        <h3>
          {{ title }}<small>{{ subTitle }}送 · 让你怦然心动的人</small>
        </h3>
      </div>
    </v-sheet>
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
    padding: 20px 0;
    margin: 20px auto;
    text-align: left;

    h3 {
      height: 35px;
      line-height: 35px;
      font-size: 30px;
      font-weight: normal;
      color: #333;

      small {
        font-size: 16px;
        color: #757575;
        margin-left: 20px;
      }
    }
  }
}
</style>
