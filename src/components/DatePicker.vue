<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

// Definir las propiedades del componente
const props = defineProps<{
  label: string
}>()

const datepickerId = 'datepicker'

const selectedDate = ref('')
const showCalendar = ref(false)
const currentDate = ref(new Date())
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const firstDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value, 1).getDay())
const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())
const blankDays = computed(() => Array(firstDayOfMonth.value).fill(null))

function hideCalendar() {
  setTimeout(() => {
    showCalendar.value = false
  }, 200)
}

function prevMonth() {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1)
}

function nextMonth() {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1)
}

function selectDate(date: number) {
  selectedDate.value = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
  showCalendar.value = false
}

function getDateClass(date: number) {
  const today = new Date()
  const selected = new Date(selectedDate.value)
  const dateObj = new Date(currentYear.value, currentMonth.value, date)

  if (dateObj.toDateString() === today.toDateString())
    return 'bg-blue-500 text-white'

  if (dateObj.toDateString() === selected.toDateString())
    return 'bg-blue-300 text-white'

  return ''
}
</script>

<template>
  <div class="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
    <label :for="datepickerId" class="mb-2 text-lg font-semibold text-gray-700">{{ label }}</label>
    <input
      :id="datepickerId"
      v-model="selectedDate"
      type="text"
      class="w-full p-2 border border-gray-300 rounded-lg"
      placeholder="YYYY-MM-DD"
      readonly
      @focus="showCalendar = true"
      @blur="hideCalendar"
    >
    <div v-if="showCalendar" class="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-md" @mousedown.prevent>
      <div class="flex justify-between items-center p-2 bg-gray-200">
        <button class="px-2 py-1 text-gray-700 hover:bg-gray-300 rounded" @click="prevMonth">
          Prev
        </button>
        <span>{{ months[currentMonth] }} {{ currentYear }}</span>
        <button class="px-2 py-1 text-gray-700 hover:bg-gray-300 rounded" @click="nextMonth">
          Next
        </button>
      </div>
      <div class="grid grid-cols-7 gap-1 p-2">
        <span v-for="day in days" :key="day" class="text-center text-gray-700">{{ day }}</span>
        <span
          v-for="blank in blankDays"
          :key="`blank-${blank}`"
          class="text-center text-gray-400"
        >-</span>
        <span
          v-for="date in daysInMonth"
          :key="date"
          :class="getDateClass(date)"
          class="cursor-pointer text-center py-1 rounded hover:bg-gray-200"
          @click="selectDate(date)"
        >
          {{ date }}
        </span>
      </div>
    </div>
  </div>
</template>
