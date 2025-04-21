<template>
  <!-- 日付選択 -->
  <v-card class="mb-6" elevation="2">
    <v-toolbar color="primary" :title="$t('order.checkout.deliveryDateDialog.formTitle')" density="compact">
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-date-picker v-model="selectedDate" width="100%" locale="ja" event-color="primary" :min="minDate" :max="maxDate"
        :allowed-dates="allowedDates" :events="dateEvents" @update:modelValue="onDateSelected" :first-day-of-week="0">
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
    <v-card-actions class="px-0">
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
import { ref, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { isHolidayAt } from 'japanese-holidays'

// 日本語設定
dayjs.locale('ja')

const emit = defineEmits(['close', 'selected'])

const toast = useToast()

// 日付選択
const selectedDate = ref(null)
const currentMonth = ref(dayjs())
const minDate = dayjs().format('YYYY-MM-DD') // 今日以降
const maxDate = dayjs().add(1, 'month').endOf('month').format('YYYY-MM-DD') // 1ヶ月後まで

// 時間帯選択
const selectedTime = ref(null)
const timeSlots = [
  { label: '午前中 (9:00-12:00)', value: 'morning', available: true },
  { label: '12:00-14:00', value: 'noon', available: true },
  { label: '14:00-17:00', value: 'afternoon', available: true },
  { label: '17:00-20:00', value: 'evening', available: false },
  { label: '19:00-21:00', value: 'night', available: true }
]

// 許可される日付の条件
const allowedDates = (date) => {
  const d = dayjs(date)
  // 日本の祝日チェック
  const holidayInfo = isHolidayAt(d.toDate())
  // 土日祝は配達不可
  const isWeekend = d.day() === 0 || d.day() === 6 // 日曜(0) or 土曜(6)
  const isHoliday = !!holidayInfo

  return !isWeekend
}

// カレンダーに表示するイベント
const dateEvents = computed(() => {
  return (date) => {
    return allowedDates(date) ? 'available' : undefined
  }
})

// 利用可能な時間帯
const availableTimeSlots = computed(() => {
  if (!selectedDate.value) return []

  // 特別な時間帯制限がないのでそのまま返す
  return timeSlots
})

// 選択完了チェック
const isSelectionComplete = computed(() => {
  return selectedDate.value
})

// 表示用の選択日付
const selectedDateDisplay = computed(() => {
  if (!selectedDate.value) return ''
  return dayjs(selectedDate.value).format('YYYY年M月D日 (ddd)')
})

// 表示用の選択時間
const selectedTimeDisplay = computed(() => {
  if (!selectedTime.value) return ''
  return timeSlots.find(slot => slot.value === selectedTime.value)?.label || ''
})

// 日付選択時の処理
const onDateSelected = (date) => {
  currentMonth.value = dayjs(date)
  selectedTime.value = null
}

// 曜日の略称を取得 (日, 月, 火, etc.)
const getWeekdayAbbr = (date) => {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  return weekdays[dayjs(date).day()]
}

// 選択確定
const confirmSelection = () => {
  if (!isSelectionComplete.value) return

  // toast.success(`配達日時が確定しました: ${selectedDateDisplay.value} ${selectedTimeDisplay.value}`)
  // ここでAPI呼び出しや親コンポーネントへのイベント発行
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
