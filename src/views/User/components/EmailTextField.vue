<template>
  <v-text-field class="mb-2" v-model="formData.username" :rules="EmailRules" density="comfortable" variant="outlined"
    :label="$t('global.login.validation.emailLabel')" prepend-inner-icon="mdi-email-outline">
  </v-text-field>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';  // 引入 vue-i18n


// 获取 i18n 实例
const { t } = useI18n();

// 获取父组件传递的 modelValue，并通过 emit 更新它
const props = defineProps({
  modelValue: { type: Object, required: true }
});
const emit = defineEmits();

// 双向绑定 modelValue
const formData = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// 定义验证规则
const EmailRules = ref([
  value => !!value || t('global.login.validation.emailRequired'),  // 使用 i18n 提示消息
  value => /.+@.+\..+/.test(value) || t('global.login.validation.emailValid')  // 使用 i18n 提示消息
]);

</script>

<style scoped>
/* 可根据需要增加样式 */
</style>
