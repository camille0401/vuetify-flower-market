<template>
  <v-text-field v-model="formData.account" :rules="AccountRules" variant="outlined" label="Email"
    prepend-inner-icon="mdi-email-outline" class="mb-2">
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

const EmailRules = ref([
  value => {
    if (value) return true

    return 'E-mail is required.'
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  },
])
const AccountRules = ref([v => !!v || 'Email is required'])

</script>
