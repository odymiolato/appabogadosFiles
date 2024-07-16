<!-- src/components/ModalBuscar.vue -->
<script setup>
import { ref } from 'vue'

// import axios from 'axios'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  apiEndpoint: String,
})

const emits = defineEmits(['close', 'select'])

const items = ref([])

// async function fetchData() {
//   try {
//     const response = await axios.get(props.apiEndpoint)
//     items.value = response.data
//   }
//   catch (error) {
//     console.error('Error fetching data:', error)
//   }
// }

function selectItem(item) {
  emits('select', item)
  close()
}

function close() {
  emits('close')
}

// watch(() => props.apiEndpoint, fetchData)
// onMounted(fetchData)
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-4 rounded shadow-lg w-3/4 max-h-full overflow-auto">
      <h3 class="text-xl mb-4">
        Buscar {{ title }}
      </h3>
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">
              ID
            </th>
            <th class="border px-4 py-2">
              Nombre
            </th>
            <!-- Agrega más columnas si es necesario -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="cursor-pointer hover:bg-gray-200" @click="selectItem(item)">
            <td class="border px-4 py-2">
              {{ item.id }}
            </td>
            <td class="border px-4 py-2">
              {{ item.name }}
            </td>
            <!-- Agrega más columnas si es necesario -->
          </tr>
        </tbody>
      </table>
      <button class="mt-4 bg-red-500 text-white p-2 rounded" @click="close">
        Cerrar
      </button>
    </div>
  </div>
</template>

  <style scoped>
  /* Estilos del modal */
  .fixed {
    z-index: 50; /* Asegúrate de que esté encima de otros contenidos */
  }

  .bg-black {
    backdrop-filter: blur(5px); /* Añadir un efecto de desenfoque */
  }
  </style>
