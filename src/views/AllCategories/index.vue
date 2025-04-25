<template>
  <div class="fs-all-categories-page">
    <v-container class="mx-auto pb-10">
      <v-card elevation="2" rounded="lg">
        <v-card-title class="text-h6 px-6 pt-6 pb-4">
          <v-breadcrumbs :items="breadcrumbs" class="px-0">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-card-title>

        <v-card-text class="px-6 pb-6">
          <!-- 顶部分类快速导航 -->
          <div class="strain-box mt-4">
            <v-btn v-for="item in categoryStore.categoryList" :key="item.id" :to="`/category/1/${item.id}`"
              color="primary-darken-2" variant="outlined" height="50" class="category-link">
              {{ item.cname }}</v-btn>
          </div>

          <!-- 详细分类列表 -->
          <div class="menu-box mb-8" v-for="category in categoryStore.categoryList" :key="category.id">
            <h3 class="strain-name">
              <v-icon start color="primary" size="20">mdi-flower-poppy</v-icon>
              <span>{{ category.cname }}</span>
            </h3>

            <v-card flat class="mt-2">
              <ul class="list-box">
                <li class="item-menu">
                  <h4 class="title pa-3">{{ $t('allCategories.title') }}</h4>
                  <div class="list pa-3">
                    <v-btn v-for="child in category.children" :key="child.id" :to="`/category/2/${child.id}`"
                      variant="text">
                      {{ child.cname }}</v-btn>
                  </div>
                </li>
              </ul>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/category'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const categoryStore = useCategoryStore()

const breadcrumbs = [
  {
    title: t('allCategories.breadcrumbsHome'),
    disabled: false,
    href: '/',
  },
  {
    title: t('allCategories.breadcrumbsAllCate'),
    disabled: true,
  }
]

</script>

<style lang="scss" scoped>
.fs-all-categories-page {

  // 顶部分类快速导航
  .strain-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 24px;

    .category-link {
      text-transform: none; // 取消默认大写
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;

      &:hover {
        background-color: rgb(var(--v-theme-primary-lighten-5)) !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  // 详细分类区块
  .menu-box {
    .strain-name {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 600;
      color: rgb(var(--v-theme-primary-darken-1));
      margin-bottom: 8px;
    }
  }

  // 子分类列表
  .list-box {
    .title {
      background: #f8f9fa;
      color: #6c757d;
      font-size: 15px;
      font-weight: 600;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 0;

      .subcategory-link {
        padding: 0 12px;
        color: #495057;
        font-size: 14px;
        font-weight: 400;
        line-height: 32px;
        text-decoration: none;
        transition: color 0.2s ease;
        position: relative;

        &:not(:last-child)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 16px;
          background-color: #dee2e6;
        }

        &:hover {
          color: rgb(var(--v-theme-primary-darken-1));
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .fs-all-categories-page {
    padding: 0 16px;

    .strain-name {
      font-size: 16px;
    }

    .strain-box {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
    }

    .list-box .list {
      .subcategory-link {
        padding: 0 8px;
        font-size: 13px;
        line-height: 28px;

        &:not(:last-child)::after {
          height: 14px;
        }
      }
    }
  }
}
</style>
