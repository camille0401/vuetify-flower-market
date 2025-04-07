<template>
  <v-text-field v-model="formData.checkPassword" :rules="checkPasswordRules" :type="showPassword ? 'text' : 'password'"
    variant="outlined" label="Password" placeholder="Enter your password" prepend-inner-icon="mdi-lock-check-outline"
    :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
    @click:append-inner=" showPassword = !showPassword">
  </v-text-field>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: { type: Object, required: true }
});

const formData = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const showPassword = ref(false)

const checkPasswordRules = ref([
  v => !!v || 'Check Passrord is required',
  v => {
    if (v === formData.value.password) return true

    return '两次输入密码不一致'
  },
])


</script>
