<template>
  <v-text-field class="mb-4" v-model="formData.password" :rules="PasswordRules"
    :type="showPassword ? 'text' : 'password'" variant="outlined" label="Password" placeholder="Enter your password"
    prepend-inner-icon="mdi-lock-outline">
  </v-text-field>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  showPassword: { type: Boolean, required: false }
});

const formData = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// const showPassword = ref(false)

const PasswordRules = ref([
  v => !!v || 'Passrord is required',
])


</script>
