<template>
  <v-text-field class="mb-2" v-model="formData.username" :rules="EmailRules" variant="outlined" label="Email"
    prepend-inner-icon="mdi-email-outline">
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
