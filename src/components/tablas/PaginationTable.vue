<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

interface Column {
  name: string
  field: string
  hasImage?: boolean
}

interface Props {
  columns: Array<Column>
  tabledata: Array<Record<string, any>>
  label?: string
  defaultImage: string
}

const props = defineProps<Props>()

const paginatedData = ref<Array<Record<string, any>>>([])
const currentPage = ref(1)
const rowsPerPage = ref(5)
const totalRows = ref(0)

watch(
  () => [props.tabledata, currentPage.value, rowsPerPage.value],
  () => {
    totalRows.value = props.tabledata.length
    const start = (currentPage.value - 1) * rowsPerPage.value
    const end = start + rowsPerPage.value
    paginatedData.value = props.tabledata.slice(start, end)
  },
  { immediate: true },
)

function handlePrevPage() {
  if (currentPage.value > 1)
    currentPage.value -= 1
}

function handleNextPage() {
  if (currentPage.value * rowsPerPage.value < totalRows.value)
    currentPage.value += 1
}
</script>

<template>
  <div class="mt-8">
    <h4 class="text-gray-600">
      {{ label }}
    </h4>
    <div class="mt-6">
      <h2 class="text-xl font-semibold leading-tight text-gray-700">
        Users
      </h2>
      <div class="flex flex-col mt-3 sm:flex-row">
        <div class="flex">
          <div class="relative">
            <select
              v-model="rowsPerPage"
              class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="5">
                5
              </option>
              <option value="10">
                10
              </option>
              <option value="20">
                20
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div class="relative">
            <select
              class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="relative block mt-2 sm:mt-0">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
            </svg>
          </span>
          <input
            placeholder="Search"
            class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          >
        </div>
      </div>
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  v-for="column in props.columns"
                  :key="column.field"
                  class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                >
                  {{ column.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in paginatedData" :key="index">
                <td
                  v-for="column in props.columns"
                  :key="column.field"
                  class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                >
                  <div v-if="column.hasImage" class="flex items-center">
                    <img
                      v-if="row[column.field] && row[column.field].image"
                      :src="row[column.field].image"
                      alt="image"
                      class="w-10 h-10 rounded-full"
                      @error="(event: Event) => (event.target as HTMLImageElement).src = props.defaultImage"
                    >
                    <img
                      v-else
                      :src="props.defaultImage"
                      alt="default image"
                      class="w-10 h-10 rounded-full"
                    >
                    <p class="ml-3 text-gray-900 whitespace-nowrap">
                      {{ row[column.field] && row[column.field].text }}
                    </p>
                  </div>
                  <div v-else>
                    <p class="text-gray-900 whitespace-nowrap">
                      {{ row[column.field] }}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
            <span class="text-xs text-gray-900 xs:text-sm">
              Showing {{ (currentPage - 1) * rowsPerPage + 1 }} to {{ Math.min(currentPage * rowsPerPage, totalRows) }} of {{ totalRows }} Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
                :disabled="currentPage === 1"
                @click="handlePrevPage"
              >
                Prev
              </button>
              <button
                class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
                :disabled="currentPage * rowsPerPage >= totalRows"
                @click="handleNextPage"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
