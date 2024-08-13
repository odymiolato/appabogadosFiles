<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { abogados, audiencias, vehiculos } from '../../class/all.class'
import { asignaciones_vehiculos } from '../../class/all.class'

import ModalReutilizable from '../../components/ModalReutilizable.vue'
import apiClient from '../../axiosConfig'
import { addAlert } from '../../stores/alerts'

const asignacion = ref<asignaciones_vehiculos>(new asignaciones_vehiculos())
const showModalVehiculos = ref(false)
const showModalAbogados = ref(false)
const showModalAudiencia = ref(false)

const vehiculoSelected = ref<{ codigo: string; nombre: string }>({ codigo: '', nombre: '' })
const abogadoSelected = ref<{ codigo: string; nombre: string }>({ codigo: '', nombre: '' })
const audienciaSelected = ref<{ codigo: string; nombre: string }>({ codigo: '', nombre: '' })

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id)
    await fetchAsignacion(route.params.id as string)
})

async function fetchAsignacion(id: string) {
  try {
    const response = await apiClient.get(`/asignaciones/${id}`)
    asignacion.value = response.data

    const abogado = await apiClient.get(`/abogados/${asignacion.value.codabo_asv}`)
    abogadoSelected.value = { codigo: String(abogado.data.codabogado_est), nombre: abogado.data.descripcion_est }

    const vehiculo = await apiClient.get(`/vehiculos/${asignacion.value.codveh_asv}`)
    vehiculoSelected.value = { codigo: String(vehiculo.data.codvehiculo_mod), nombre: vehiculo.data.nombre_mod }

    const audiencia = await apiClient.get(`/audiencias/${asignacion.value.codaud_asv}`)
    audienciaSelected.value = { codigo: String(audiencia.data.codvehiculo_mod), nombre: audiencia.data.fecha_aud }

    addAlert(1, 'Asignacion cargada correctamente.')
  }
  catch (error) {
    console.error('Error fetching asignacion:', error)
    addAlert(3, 'Error al obtener la asignacion.')
  }
}

async function saveVehiculo() {
  try {
    asignacion.value.codabo_asv = Number(abogadoSelected.value.codigo)
    asignacion.value.codveh_asv = Number(vehiculoSelected.value.codigo)
    asignacion.value.codaud_asv = Number(audienciaSelected.value.codigo)
    if (route.params.id) {
      await apiClient.patch(`/asignarvehiculos/${route.params.id}`, asignacion.value)
      addAlert(2, 'El vehiculo se actualizó correctamente.')
    }
    else {
      await apiClient.post('/asignarvehiculos', asignacion.value)
      addAlert(2, 'El Vehiculo se asigno correctamente.')
    }
    router.push({ name: 'AsignacionVehiculo' })
  }
  catch (error) {
    console.error('Error saving asignacion:', error)
    addAlert(3, 'Error al asignar el vehiculo.')
  }
}

function goBack() {
  router.push({ name: 'Asignacion Vehiculo' })
}

function handlevehiculoSelected(vehiculo: vehiculos) {
  vehiculoSelected.value = { codigo: String(vehiculo.codveh_veh), nombre: vehiculo.placa_veh }
}

function handleabogadoSelected(abogado: abogados) {
  abogadoSelected.value = { codigo: String(abogado.codabo_abo), nombre: abogado.nombre_abo }
}

function handleaudienciaSelected(audiencia: audiencias) {
  audienciaSelected.value = { codigo: String(audiencia.codaud_aud), nombre: audiencia.descri_aud }
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
        <label class="text-gray-700" for="nombre">Año del Vehiculo</label>
        <input
          id="anio" v-model="asignacion.fecha_asv"
          type="date"
          maxlength="4"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="abogado">abogado</label>
        <div class="flex gap-2 justify-center items-center">
          <input
            id="abogado-codigo" v-model="abogadoSelected.codigo"
            type="text"
            disabled
            class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <input
            id="abogado-nombre" v-model="abogadoSelected.nombre"
            type="text"
            disabled
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <button
            class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="showModalAbogados = true"
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
        <label class="text-gray-700" for="abogado">audiencias</label>
        <div class="flex gap-2 justify-center items-center">
          <input
            id="abogado-codigo" v-model="audienciaSelected.codigo"
            type="text"
            disabled
            class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <input
            id="abogado-nombre" v-model="audienciaSelected.nombre"
            type="text"
            disabled
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <button
            class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="showModalAudiencia = true"
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
        <label class="text-gray-700" for="vehiculos">vehiculos</label>
        <div class="flex gap-2 justify-center items-center">
          <input
            id="vehiculo-codigo" v-model="vehiculoSelected.codigo"
            type="text"
            disabled
            class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <input
            id="vehiculo-nombre" v-model="vehiculoSelected.nombre"
            type="text"
            disabled
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly
          >
          <button
            type="button"
            class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="showModalVehiculos = true"
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
        v-model:showModal="showModalVehiculos"
        modal-title="Vehiculos"
        endpoint="/vehiculos"
        code-field="codveh_veh"
        name-field="placa_veh"
        @selected="handlevehiculoSelected"
      />

      <ModalReutilizable
        v-model:showModal="showModalAbogados"
        modal-title="Abogados"
        endpoint="/abogados"
        code-field="codabo_abo"
        name-field="nombre_abo"
        @selected="handleabogadoSelected"
      />
      <ModalReutilizable
        v-model:showModal="showModalAudiencia"
        modal-title="Audiencias"
        endpoint="/audiencias"
        code-field="codaud_aud"
        name-field="descri_aud"
        @selected="handleaudienciaSelected"
      />
    </div>
  </div>
</template>
