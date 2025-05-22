import { ref, computed } from 'vue';

export function useExpandableList(list, defaultVisibleCount = 1) {
  const isExpanded = ref(false);

  const visibleItems = computed(() => {
    return isExpanded.value ? list : list.slice(0, defaultVisibleCount);
  });

  const hasMoreItems = computed(() => {
    return list.length > defaultVisibleCount;
  });

  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
  };

  return {
    isExpanded,
    visibleItems,
    hasMoreItems,
    toggleExpand,
  };
}
