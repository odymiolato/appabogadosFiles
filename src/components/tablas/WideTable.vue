<script setup lang="ts">
interface Column {
  title: string
  field: string
  hasImage?: boolean
}

interface DataRow {
  [key: string]: any
}

interface Props {
  columns: Column[]
  tabledata: DataRow[]
  label: string
  defaultImage: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="mt-8">
    <h4 class="text-gray-600">
      {{ label }}
    </h4>
    <div class="flex flex-col mt-6">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th v-for="col in columns" :key="col.field" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                  {{ col.title }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(row, rowIndex) in props.tabledata" :key="rowIndex">
                <td v-for="col in columns" :key="col.field" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div v-if="col.hasImage" class="flex items-center">
                    <img
                      v-if="row[col.field].image"
                      :src="row[col.field].image"
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
                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-gray-900">
                        {{ row[col.field].text }}
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="text-sm leading-5 text-gray-900">
                      {{ row[col.field] }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
