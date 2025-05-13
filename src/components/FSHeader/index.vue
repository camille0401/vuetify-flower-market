<template>
  <header class="fs-app-header">
    <v-container class="mx-auto">
      <v-row align="center" justify="space-between" class="py-4">
        <!-- Logo -->
        <v-col cols="12" md="auto">
          <Logo />
        </v-col>

        <!-- 搜索区域 -->
        <v-col cols="12" md="8">
          <div class="search">
            <v-text-field v-model="searchQuery" :label="$t('global.header.label')" type="text" variant="outlined"
              color="primary" prepend-inner-icon="mdi-magnify" clearable hide-details />
            <v-btn color="primary" size="x-large" @click="onSearch">
              {{ $t('global.header.searchBtn') }}
            </v-btn>
          </div>
        </v-col>

        <!-- 购物车图标，隐藏在小屏 -->
        <v-col cols="12" md="auto" class="d-none d-md-none d-lg-flex">
          <CartIcon />
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import Logo from './Logo.vue';
import CartIcon from '@/components/FSNav2/CartIcon.vue';

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

  .v-row {

    /* Ensure responsive design on mobile */
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
    }
  }

  .search {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;

    /* Stack search items on small screens */
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
      padding: 0;
      width: 100%;
      /* Ensure the search field takes full width on small screens */
    }

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

      @media (max-width: 768px) {
        width: 100%;
        /* Ensure input takes full width on small screens */
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

      @media (max-width: 768px) {
        width: 100%;
        /* Make button full width on small screens */
      }
    }
  }
}
</style>
