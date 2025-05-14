<template>
  <!-- 日付選択 -->
  <v-card :class="mobile ? 'rounded-0' : 'rounded-lg elevation-2'">
    <v-toolbar color="primary" :title="$t('order.checkout.deliveryDateDialog.formTitle')" density="compact">
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-date-picker v-model="selectedDate" width="100%" event-color="primary" :min="minDate" :max="maxDate"
        :density="mobile && 'comfortable'" :allowed-dates="allowedDates" :events="dateEvents"
        @update:modelValue="onDateSelected" :first-day-of-week="0">
      </v-date-picker>

      <!-- 選択内容表示 -->
      <div v-if="isSelectionComplete" elevation="2" class="mb-4">
        <div class="selected-info">
          <v-icon color="primary" class="mr-2">mdi-calendar-check</v-icon>
          <span>{{ selectedDateDisplay }}</span>
          <!-- <v-icon color="primary" class="mx-2">mdi-clock-outline</v-icon>
          <span>{{ selectedTimeDisplay }}</span> -->
        </div>
      </div>
    </v-card-text>

    <!-- 確認ボタン -->
    <v-card-actions class="bg-grey-lighten-4" :class="mobile ? 'position-sticky bottom-0' : ''">
      <v-spacer />
      <v-btn variant="text" @click="$emit('close')">{{ $t('order.checkout.deliveryDateDialog.cancelBtn') }}</v-btn>
      <v-btn color="primary" type="submit" prepend-icon="mdi-lock-reset" @click="confirmSelection">
        {{ $t('order.checkout.deliveryDateDialog.saveBtn') }}
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- 時間帯選択 -->
  <!-- <v-card v-if="selectedDate" elevation="2" class="mb-4">
      <v-card-text>
        <h4 class="text-subtitle-1 mb-4">配達時間帯を選択</h4>

        <v-chip-group v-model="selectedTime" mandatory column>
          <v-chip v-for="timeSlot in availableTimeSlots" :key="timeSlot.value" :value="timeSlot.value" filter
            variant="outlined" :disabled="!timeSlot.available" size="small">
            {{ timeSlot.label }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card> -->

</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// import { isHolidayAt } from 'japanese-holidays'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
// 设置中文语言
const { t, d, locale } = useI18n()
dayjs.locale(locale.value)

console.log('当前语言：', locale.value)

const emit = defineEmits(['close', 'selected'])

const toast = useToast()

// 日付選択
const selectedDate = ref(null)
const currentMonth = ref(dayjs())
const minDate = dayjs().format('YYYY-MM-DD')
const maxDate = dayjs().add(12, 'month').endOf('month').format('YYYY-MM-DD')

// 時間帯選択
const selectedTime = ref(null)
const timeSlots = computed(() => [
  { label: t('order.checkout.deliveryDateDialog.timeSlots.morning'), value: 'morning', available: true },
  { label: t('order.checkout.deliveryDateDialog.timeSlots.noon'), value: 'noon', available: true },
  { label: t('order.checkout.deliveryDateDialog.timeSlots.afternoon'), value: 'afternoon', available: true },
  { label: t('order.checkout.deliveryDateDialog.timeSlots.evening'), value: 'evening', available: false },
  { label: t('order.checkout.deliveryDateDialog.timeSlots.night'), value: 'night', available: true }
])

// 許可される日付の条件
const allowedDates = (date) => {
  const d = dayjs(date)
  const isWeekend = d.day() === 0 || d.day() === 6
  // const isHoliday = !!isHolidayAt(d.toDate())
  // return !isWeekend && !isHoliday
  return !isWeekend
}

// カレンダーに表示するイベント
const dateEvents = computed(() => {
  return (date) => allowedDates(date) ? 'available' : undefined
})

// 選択完了チェック
const isSelectionComplete = computed(() => !!selectedDate.value)

// 表示用の選択日付（i18n 対応）
const selectedDateDisplay = computed(() => {
  if (!selectedDate.value) return ''
  return d(new Date(selectedDate.value), {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// 表示用の選択時間
const selectedTimeDisplay = computed(() => {
  if (!selectedTime.value) return ''
  return timeSlots.value.find(slot => slot.value === selectedTime.value)?.label || ''
})

// 日付選択時の処理
const onDateSelected = (date) => {
  currentMonth.value = dayjs(date)
  selectedTime.value = null
}

// 選択確定
const confirmSelection = () => {
  if (!isSelectionComplete.value) return
  emit('selected', selectedDate.value)
  emit('close')
}



</script>

<style scoped>
.delivery-date-picker {
  max-width: 600px;
  margin: 0 auto;
}

/* 日付セルのスタイル */
:deep(.v-date-picker-month__day) {
  height: 64px;
}

.date-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.date-number {
  font-size: 1rem;
  font-weight: bold;
}

.date-weekday {
  font-size: 0.75rem;
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.6);
}

/* 利用可能日のスタイル */
:deep(.v-date-picker-month__day--available .v-btn) {
  background-color: rgba(25, 118, 210, 0.1);
}

:deep(.v-date-picker-month__day--available.v-date-picker-month__day--selected .v-btn) {
  background-color: rgb(25, 118, 210);
  color: white;
}

/* 選択情報表示 */
.selected-info {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #333;
}

.v-chip-group {
  gap: 8px;
}
</style>
