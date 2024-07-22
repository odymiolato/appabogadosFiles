<!-- WideTable.vue -->
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  columns: Array,
  tabledata: Array,
  label: String,
  defaultImage: String,
  editable: Boolean,
})

const emit = defineEmits(['edit'])

function editCliente(cliente) {
  emit('edit', cliente)
}
</script>

<template>
  <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.field" class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
            {{ col.title }}
          </th>
          <th v-if="editable" class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tabledata" :key="index">
          <td v-for="col in columns" :key="col.field" class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div v-if="col.hasImage" class="flex items-center">
              <img
                v-if="row[col.field].image"
                :src="row[col.field].image"
                alt="image"
                class="w-10 h-10 rounded-full"
                @error="(event: Event) => (event.target as HTMLImageElement).src = defaultImage"
              >
              <img
                v-else
                :src="defaultImage"
                alt="default image"
                class="w-10 h-10 rounded-full"
              >
              <div class="ml-4">
                <div class="ml-3 text-gray-900 whitespace-nowrap">
                  {{ row[col.field].text }}
                </div>
              </div>
            </div>
            <div v-else>
              <div class="ml-3 text-gray-900 whitespace-nowrap">
                {{ row[col.field] }}
              </div>
            </div>
          </td>
          <td v-if="editable" class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <button
              class="text-blue-600 hover:underline "
              @click="editCliente(row)"
            >
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
