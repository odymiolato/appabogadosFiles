<script setup lang="ts">
import { ref } from 'vue'
import { vehiculos_estados } from '../../class/all.class'
import apiClient from '../../axiosConfig'
import { addAlert } from '../../stores/alerts'

const VehiculoEstado = ref<vehiculos_estados>(new vehiculos_estados())

async function saveVehiculoEstado() {
  try {
    await apiClient.post('/vehiculos-estados', VehiculoEstado.value)
    VehiculoEstado.value.descripcion_est = ''
    addAlert(2, 'El estado de vehiculo se registró correctamente.')
  }
  catch (error) {
    console.error('Error saving vehiculos_estados:', error)
    addAlert(3, 'Error al registrar el estado de vehiculo.')
  }
}
</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700" for="descripcion">
    Estados de los Vehículos
  </h3>
  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-700" for="descripcion">Descripción</label>
          <input
            id="descripcion" v-model="VehiculoEstado.descripcion_est"
            type="text"
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
          >
        </div>
      </div>

      <div class="mt-4">
        <button
          type="button"
          class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          @click="saveVehiculoEstado"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>
