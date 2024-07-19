<script setup lang="ts">
interface Column {
  key: string
  label: string
}

interface Props {
  tabledata: Array<Record<string, any>>
  columns: Array<Column>
  label?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>
    <div class="mt-2">
      <div class="my-6 overflow-hidden bg-white rounded-md shadow">
        <table class="w-full text-left border-collapse">
          <thead class="border-b">
            <tr>
              <th
                v-for="(column, index) in columns"
                :key="index"
                class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in tabledata"
              :key="rowIndex"
              class="hover:bg-gray-200"
            >
              <td
                v-for="(column, colIndex) in columns"
                :key="colIndex"
                class="px-6 py-4 text-lg text-gray-700 border-b"
              >
                {{ row[column.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tu estilo aquí */
</style>
