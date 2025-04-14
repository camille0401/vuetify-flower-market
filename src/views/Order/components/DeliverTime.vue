<template>
  <div class="delivery-date-picker">
    <h3 class="text-h6 mb-4">配達日時を選択</h3>

    <!-- 日付選択 -->
    <v-card class="mb-6" elevation="2">
      <v-date-input v-model="selectedDate" :min="minDate" :max="maxDate" :allowed-dates="allowedDates" locale="ja"
        color="primary" :first-day-of-week="0" :label="'配達日を選択'" :config="datePickerConfig">
        <template #header="{ header }">
          <div class="d-flex justify-space-between align-center px-4 py-2">
            <v-btn icon @click="header.prev" size="small">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <div class="text-h6">{{ header.displayValue }}</div>
            <v-btn icon @click="header.next" size="small">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </template>

        <template #day="{ date }">
          <div class="date-cell">
            <div class="date-number">{{ dayjs(date).date() }}</div>
            <div class="date-weekday">{{ getWeekdayAbbr(date) }}</div>
            <div v-if="isHoliday(date)" class="date-holiday">祝</div>
          </div>
        </template>
      </v-date-input>
    </v-card>

    <!-- 時間帯選択 -->
    <v-card v-if="selectedDate" elevation="2" class="mb-4">
      <v-card-text>
        <h4 class="text-subtitle-1 mb-4">配達時間帯を選択</h4>

        <v-chip-group v-model="selectedTime" mandatory column>
          <v-chip v-for="timeSlot in availableTimeSlots" :key="timeSlot.value" :value="timeSlot.value" filter
            variant="outlined" :disabled="!timeSlot.available" size="small">
            {{ timeSlot.label }}
            <v-tooltip v-if="timeSlot.description" activator="parent" location="top">
              {{ timeSlot.description }}
            </v-tooltip>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>

    <!-- 選択内容確認 -->
    <v-card v-if="isSelectionComplete" elevation="2" class="mb-4 pa-4">
      <div class="selected-summary">
        <div class="d-flex align-center mb-2">
          <v-icon color="primary" class="mr-2">mdi-calendar</v-icon>
          <span class="font-weight-bold">配達日:</span>
          <span class="ml-2">{{ selectedDateDisplay }}</span>
        </div>
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-clock-outline</v-icon>
          <span class="font-weight-bold">時間帯:</span>
          <span class="ml-2">{{ selectedTimeDisplay }}</span>
        </div>
      </div>
    </v-card>

    <!-- 確認ボタン -->
    <div class="text-right">
      <v-btn color="primary" size="large" :disabled="!isSelectionComplete" @click="confirmSelection"
        prepend-icon="mdi-check">
        選択を確定
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import isJapaneseHoliday from 'japanese-holidays'

// 日本語設定
dayjs.locale('ja')

const toast = useToast()

// 日付選択
const selectedDate = ref(null)
const minDate = dayjs().format('YYYY-MM-DD') // 今日以降
const maxDate = dayjs().add(2, 'month').endOf('month').format('YYYY-MM-DD') // 2ヶ月後まで

// 時間帯選択
const selectedTime = ref(null)
const timeSlots = [
  {
    label: '午前中 (9:00-12:00)',
    value: 'morning',
    available: true,
    description: '午前中の配達です'
  },
  {
    label: '12:00-14:00',
    value: 'noon',
    available: true,
    description: '昼間の配達です'
  },
  {
    label: '14:00-17:00',
    value: 'afternoon',
    available: true,
    description: '午後の配達です'
  },
  {
    label: '17:00-20:00',
    value: 'evening',
    available: false,
    description: '繁忙期のみ対応'
  },
  {
    label: '19:00-21:00',
    value: 'night',
    available: true,
    description: '夜間の配達です'
  }
]

// DatePicker 設定
const datePickerConfig = {
  monthChange: (month) => {
    // 月が変更された時の処理
    console.log('Month changed to:', month)
  }
}

// 祝日チェック
const isHoliday = (date) => {
  return !!isJapaneseHoliday(new Date(date))
}

// 許可される日付の条件
const allowedDates = (date) => {
  const d = dayjs(date)
  // 日本の祝日チェック
  const isHoliday = isJapaneseHoliday(new Date(date))
  // 土日祝は配達不可
  const isWeekend = d.day() === 0 || d.day() === 6 // 日曜(0) or 土曜(6)

  // 水曜日も配達不可とする例
  const isWednesday = d.day() === 3

  return !isWeekend && !isHoliday && !isWednesday
}

// 利用可能な時間帯
const availableTimeSlots = computed(() => {
  if (!selectedDate.value) return []

  // 特別な時間帯制限がないのでそのまま返す
  return timeSlots
})

// 選択完了チェック
const isSelectionComplete = computed(() => {
  return selectedDate.value && selectedTime.value
})

// 表示用の選択日付
const selectedDateDisplay = computed(() => {
  if (!selectedDate.value) return ''
  const d = dayjs(selectedDate.value)
  return d.format('YYYY年M月D日 (ddd)') + (isHoliday(selectedDate.value) ? ' 祝日' : '')
})

// 表示用の選択時間
const selectedTimeDisplay = computed(() => {
  if (!selectedTime.value) return ''
  const slot = timeSlots.find(slot => slot.value === selectedTime.value)
  return slot ? slot.label : ''
})

// 曜日の略称を取得 (日, 月, 火, etc.)
const getWeekdayAbbr = (date) => {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  return weekdays[dayjs(date).day()]
}

// 選択確定
const confirmSelection = () => {
  if (!isSelectionComplete.value) return

  toast.success(`配達日時が確定しました: ${selectedDateDisplay.value} ${selectedTimeDisplay.value}`)

  // ここでAPI呼び出しや親コンポーネントへのイベント発行
  // emit('selected', {
  //   date: selectedDate.value,
  //   time: selectedTime.value,
  //   datetime: formatForApi(selectedDate.value, selectedTime.value)
  // })
}

// API送信用フォーマット
const formatForApi = (date, timeSlot) => {
  const dateStr = dayjs(date).format('YYYY-MM-DD')
  // 時間帯に応じた実際の時間を生成
  let timeRange = ''
  switch (timeSlot) {
    case 'morning': timeRange = '09:00-12:00'; break
    case 'noon': timeRange = '12:00-14:00'; break
    case 'afternoon': timeRange = '14:00-17:00'; break
    case 'evening': timeRange = '17:00-20:00'; break
    case 'night': timeRange = '19:00-21:00'; break
  }
  return { date: dateStr, time_slot: timeSlot, time_range: timeRange }
}
// 月の最初の利用可能日を見つける
const findFirstAvailableDate = (startDate) => {
  let d = dayjs(startDate)
  const endDate = dayjs(maxDate)

  // 今日から最大2ヶ月後まで検索
  while (d.isBefore(endDate)) {
    if (allowedDates(d)) {
      return d
    }
    d = d.add(1, 'day')
  }
  return null
}

// 初期選択 (最初の利用可能日)
watch(() => selectedDate.value, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    // 選択が解除された場合、最初の利用可能日を再設定
    const firstAvailable = findFirstAvailableDate(dayjs())
    if (firstAvailable) {
      selectedDate.value = firstAvailable.format('YYYY-MM-DD')
    }
  }
}, { immediate: true })

</script>

<style scoped>
.delivery-date-picker {
  max-width: 600px;
  margin: 0 auto;
}

/* 日付セルのスタイル */
.date-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 4px;
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

.date-holiday {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 0.6rem;
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 選択内容サマリー */
.selected-summary {
  font-size: 1.1rem;
}

/* チップグループのスタイル */
.v-chip-group {
  gap: 8px;
}

/* 無効な日付のスタイル */
:deep(.v-date-picker__day--disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 選択された日付のスタイル */
:deep(.v-date-picker__day--selected) {
  background-color: rgb(var(--v-theme-primary));
  color: white;
}

/* 祝日のスタイル */
:deep(.v-date-picker__day--holiday) {
  color: #f44336;
}
</style>
