<script setup lang="ts">
import { ref } from 'vue'
import { tipo_interaccion } from '../../class/all.class'
import apiClient from '../../axiosConfig'

const tipoInteraccion = ref<tipo_interaccion>(new tipo_interaccion())

async function saveTipoInteraccion() {
  try {
    await apiClient.post('/tipo-interaccion', tipoInteraccion.value)
  }
  catch (error) {
    console.error('Error saving tipo_interaccion:', error)
  }
}
</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700" for="descripcion">
    Tipo de Interacción
  </h3>
  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-700" for="descripcion">Descripción</label>
          <input
            id="descripcion" v-model="tipoInteraccion.descripcion_tin"
            type="text"
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
          >
        </div>
      </div>

      <div class="mt-4">
        <button
          type="button"
          class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          @click="saveTipoInteraccion"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>
