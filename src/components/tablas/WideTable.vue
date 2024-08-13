<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  columns: Array,
  tabledata: Array,
  label: String,
  editable: Boolean,
  eliminable: Boolean,
});

const emit = defineEmits(['edit', 'delete', 'buttonClick']);

function handleButtonClick(row, col) {
  emit('buttonClick', row, col);
}

function editCliente(cliente) {
  emit('edit', cliente);
}

function deleteCliente(cliente) {
  emit('delete', cliente);
}
</script>

<template>
  <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
    <div class="pb-4">
      <label class="text-gray-700  " for="descripcion">{{ label }}</label>
    </div>
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.field" class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
            {{ col.title }}
          </th>
          <th v-if="editable || eliminable" class="text-center px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tabledata" :key="index">
          <td v-for="col in columns" :key="col.field" class="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div v-if="col.isButton">
              <button
                class="text-blue-500 hover:underline"
                @click="handleButtonClick(row, col)"
              >
                {{ col.buttonTitle }}
              </button>
            </div>
            <div v-else>
              <div class="ml-3 text-gray-900 whitespace-nowrap">
                {{ row[col.field] }}
              </div>
            </div>
          </td>
          <td v-if="editable || eliminable" class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
            <button
              v-if="editable"
              class="text-indigo-600 hover:text-indigo-900 mr-3"
              @click="editCliente(row)"
            >
              Editar
            </button>
            <button
              v-if="eliminable"
              class="text-red-600 hover:text-red-900"
              @click="deleteCliente(row)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
