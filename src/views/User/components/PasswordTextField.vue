<template>
  <v-text-field v-model="formData.password" :rules="PasswordRules" :type="showPassword ? 'text' : 'password'"
    variant="outlined" label="Password" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
    :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
    @click:append-inner="showPassword = !showPassword">
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

const PasswordRules = ref([
  v => !!v || 'Passrord is required',
])


</script>
