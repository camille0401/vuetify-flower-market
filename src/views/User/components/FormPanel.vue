<template>
  <div class="form-panel pa-8">
    <h1 class="text-h5 text-center text-high-emphasis">{{ title }}</h1>
    <p class="text-subtitle-2 text-center mb-10" style="color: #757575;">
      {{ subTitle }}
    </p>
    <slot name="main"></slot>
    <p class="my-1 text-body-2 text-high-emphasis	font-weight-medium text-center">
      {{ footTitle }}
      <span class="ml-1 text-primary cursor-pointer" @click="$emit('on-foot-btn')">
        {{ footBtnText }}
      </span>
    </p>
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
  },
  subTitle: {
    type: String
  },
  footTitle: {
    type: String,
  },
  footBtnText: {
    type: String,
  }
})

</script>

<style lang="scss" scoped>
.form-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
</style>
