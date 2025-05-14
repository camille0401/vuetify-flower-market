<template>
  <div class="fs-section-title mb-4">
    <div class="fs-title-content">
      <p class="title">{{ title }}</p>
      <p v-if="subTitle" class="sub-title">{{ subTitle }}</p>
    </div>
    <slot name="action"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    default: '',
  }
})
</script>

<style scoped lang="scss">
.fs-section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .fs-title-content {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .title {
      font-weight: bold;
      font-size: 24px;
      margin: 0;
    }

    .sub-title {
      font-size: 16px;
      color: #666;
      margin: 0;
    }
  }

  ::v-deep(button),
  ::v-deep(.v-btn) {
    font-size: 16px;
  }

  @media (max-width: 960px) {
    .fs-title-content {
      .title {
        font-size: 20px;
      }

      .sub-title {
        font-size: 14px;
      }
    }

    ::v-deep(button),
    ::v-deep(.v-btn) {
      font-size: 15px;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .fs-title-content {
      .title {
        font-size: 18px;
      }

      .sub-title {
        font-size: 13px;
      }
    }

    ::v-deep(button),
    ::v-deep(.v-btn) {
      font-size: 14px;
    }
  }
}
</style>
