<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { vehiculos_estados, vehiculos_modelos } from '../../class/all.class'
import { vehiculos } from '../../class/all.class'

import ModalReutilizable from '../../components/ModalReutilizable.vue'
import apiClient from '../../axiosConfig'
import { addAlert } from '../../stores/alerts'

const vehiculo = ref<vehiculos>(new vehiculos())
const showModalModelos = ref(false)
const showModalEstados = ref(false)
const modeloSelected = ref<{ codigo: string, nombre: string }>({ codigo: '', nombre: '' })
const estadoSelected = ref<{ codigo: string, nombre: string }>({ codigo: '', nombre: '' })

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    await fetchVehiculo(route.params.id as string)
  }
})

async function fetchVehiculo(id: string) {
  try {
    const response = await apiClient.get(`/vehiculos/${id}`)
    vehiculo.value = response.data

    const estado = await apiClient.get(`/vehiculos-estados/${vehiculo.value.codestado_veh}`)
    estadoSelected.value = { codigo: String(estado.data.codestado_est), nombre: estado.data.descricion_est }

    const modelo = await apiClient.get(`/vehiculos-modelos/${vehiculo.value.codmodelo_veh}`)
    modeloSelected.value = { codigo: String(modelo.data.codmodelo_mod), nombre: modelo.data.nombre_mod }

    addAlert(1, 'Interacción cargada correctamente.')
  } catch (error) {
    console.error('Error fetching vehiculos:', error)
    addAlert(3, 'Error al obtener la interacción.')
  }
}

async function saveVehiculo() {
  try {
    vehiculo.value.codestado_veh = estadoSelected.value.codigo
    vehiculo.value.codmodelo_veh = Number(modeloSelected.value.codigo)
    if (route.params.id) {
      await apiClient.patch(`/vehiculos/${route.params.id}`, vehiculo.value)
      addAlert(2, 'La interacción se actualizó correctamente.')
    } else {
      await apiClient.post('/vehiculos', vehiculo.value)
      addAlert(2, 'La interacción se registró correctamente.')
    }
    router.push({ name: 'Vehiculos' })
  } catch (error) {
    console.error('Error saving vehiculos:', error)
    addAlert(3, 'Error al registrar la interacción.')
  }
}
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function goBack() {
  router.push({ name: 'Vehiculos' })
}

function handlemodeloSelected(modelo: vehiculos_modelos) {
  modeloSelected.value = { codigo: String(modelo.codmodelo_mod), nombre: modelo.nombre_mod}
}

function handleestadoSelected(estado: vehiculos_estados) {
  estadoSelected.value = { codigo: String(estado.codestado_est), nombre: estado.descripcion_est }
}
</script>

<template>
  <div class="p-6 bg-white rounded-md shadow-md">
    <div class="flex items-center mb-4 cursor-pointer" @click="goBack">
      <img src="../../assets/img/returnArrow.svg" alt="Back" class="w-6 h-6 mr-2">
      <span class="text-gray-700">Volver</span>
    </div>

    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <label class="text-gray-700" for="nombre">Placa del Vehiculo</label>
        <input
          id="placa" v-model="vehiculo.placa_veh"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
      <div>
        <label class="text-gray-700" for="nombre">Año del Vehiculo</label>
        <input
          id="anio" v-model="vehiculo.anio_veh"
          type="text"
          maxlength="4"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
      <div>
        <label class="text-gray-700" for="estado">Estado</label>
        <div class="flex gap-2 justify-center items-center">
          <input
            id="estado-codigo" v-model="estadoSelected.codigo"
            type="text"
            disabled
            class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <input
            id="estado-nombre" v-model="estadoSelected.nombre"
            type="text"
            disabled
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <button
            class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="showModalEstados = true"
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
      <div>
        <label class="text-gray-700" for="modelos">Modelos</label>
        <div class="flex gap-2 justify-center items-center">
          <input
            id="modelo-codigo" v-model="modeloSelected.codigo"
            type="text"
            disabled
            class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <input
            id="modelo-nombre" v-model="modeloSelected.nombre"
            type="text"
            disabled
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <button
            type="button"
            class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="showModalModelos = true"
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


      <div class="mt-4">
        <button
          type="button" class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          @click="saveVehiculo"
        >
          Guardar
        </button>
      </div>

      <ModalReutilizable
        v-model:showModal="showModalModelos"
        modal-title="Modelos de Vehiculos"
        endpoint="/vehiculos-modelos"
        code-field="codmodelo_mod"
        name-field="nombre_mod"
        @selected="handlemodeloSelected"
      />

      <ModalReutilizable
        v-model:showModal="showModalEstados"
        modal-title="Estados del Vehiculo"
        endpoint="/vehiculos-estados"
        code-field="codestado_est"
        name-field="descripcion_est"
        @selected="handleestadoSelected"
      />
    </div>
  </div>
</template>
