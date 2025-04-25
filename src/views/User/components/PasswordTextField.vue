<template>
  <v-text-field class="mb-2" v-model="formData.password" :rules="PasswordRules"
    :type="showPassword ? 'text' : 'password'" density="comfortable" variant="outlined"
    :label="$t('global.login.validation.passwordLabel')" prepend-inner-icon="mdi-lock-outline">
  </v-text-field>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';  // 引入 vue-i18n

// 获取 i18n 实例
const { t } = useI18n();

const props = defineProps({
  modelValue: { type: Object, required: true },
  showPassword: { type: Boolean, required: false }
});

const emit = defineEmits();

const formData = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// const showPassword = ref(false)

const PasswordRules = ref([
  v => !!v || t('global.login.validation.passwordRequired'),
])


</script>
