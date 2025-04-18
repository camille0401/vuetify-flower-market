<template>
  <header class="fs-app-header">
    <div class="container header-box">
      <FSLogo />

      <div class="search">
        <v-text-field v-model="searchQuery" :label="$t('global.header.label')" type="text" variant="outlined"
          color="primary" prepend-inner-icon="mdi-magnify" clearable hide-details />
        <v-btn color="primary" size="x-large" @click="onSearch">
          {{ $t('global.header.searchBtn') }}
        </v-btn>
      </div>

      <CartIcon />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import FSLogo from '@/components/FSLogo.vue';
import CartIcon from '@/views/CartList/components/CartIcon.vue';

const { t } = useI18n();
const searchQuery = ref('');

const loaded = ref(false);
const loading = ref(false);

const onClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
};

const onSearch = () => {
  console.log('Search:', searchQuery.value);
};
</script>

<style scoped lang="scss">
.fs-app-header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--v-theme-secondary-lighten-1);
  background-color: var(--v-theme-background);

  .header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .search {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    padding: 0 20px;

    .v-text-field {
      flex: 1;
      border-radius: 8px;
      background-color: var(--v-theme-surface);

      input {
        color: var(--v-theme-on-surface);
        font-weight: 500;
      }

      .v-label {
        color: var(--v-theme-secondary-darken-1);
      }

      .v-field {
        border-radius: 8px;
      }
    }

    .v-btn {
      border-radius: 8px;
      color: var(--v-theme-on-primary);
      background-color: var(--v-theme-primary);
      text-transform: none;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--v-theme-primary-darken-1);
      }
    }
  }
}
</style>
