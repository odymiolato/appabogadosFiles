<script setup lang="ts">
import { ref } from 'vue'
import { vehiculos_marcas, vehiculos_modelos } from '../../class/all.class'
import apiClient from '../../axiosConfig'
import { addAlert } from '../../stores/alerts'
import ModalReutilizable from '../../components/ModalReutilizable.vue'

const VehiculoModelo = ref<vehiculos_modelos>(new vehiculos_modelos())
const marcaSelected = ref<{ codigo: string, nombre: string }>({ codigo: '', nombre: '' })
const showModalVehiculoMarca = ref(false)

async function saveVehiculoModelo() {
  try {
    VehiculoModelo.value.codmarca_mod=Number( marcaSelected.value.codigo)
    await apiClient.post('/vehiculos-modelos', VehiculoModelo.value)
    VehiculoModelo.value.nombre_mod = ''
    addAlert(2, 'El modelo se registró correctamente.')
  }
  catch (error) {
    console.error('Error saving vehiculos_modelos:', error)
    addAlert(3, 'Error al registrar el modelo.')
  }
}

function handleMarcaSelected(vehiculosmarca: vehiculos_marcas) {
  marcaSelected.value = { codigo: String(vehiculosmarca.codmarca_mar), nombre: vehiculosmarca.nombre_mar }
}

</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700" for="descripcion">
    Modelos de los Vehículos
  </h3>
  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-700" for="descripcion">Descripción</label>
          <input
            id="descripcion" v-model="VehiculoModelo.nombre_mod"
            type="text"
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
          >
        </div>
        <div>
        <label class="text-gray-700" for="vehiculos-marcas">Marca del Modelo</label>
        <div class="flex gap-2 justify-center items-center">
          <input
            id="vehiculos-marcas-codigo" v-model="marcaSelected.codigo"
            type="text"
            disabled
            class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <input
            id="vehiculos-marcas-nombre" v-model="marcaSelected.nombre"
            type="text"
            disabled
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <button
            type="button"
            class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="showModalVehiculoMarca = true"
          >
            <svg
              class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      </div>

      <div class="mt-4">
        <button
          type="button"
          class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          @click="saveVehiculoModelo"
        >
          Guardar
        </button>
      </div>
      
      <ModalReutilizable
        v-model:showModal="showModalVehiculoMarca"
        modal-title="Marcas de los Vehiculos"
        endpoint="/vehiculos-marcas"
        code-field="codmarca_mar"
        name-field="nombre_mar"
        @selected="handleMarcaSelected"
      />
    </div>
  </div>
</template>
