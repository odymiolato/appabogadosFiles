<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { clientes, tipo_interaccion } from '../../class/all.class'
import { interacciones } from '../../class/all.class'

import ModalReutilizable from '../../components/ModalReutilizable.vue'
import apiClient from '../../axiosConfig'
import { addAlert } from '../../stores/alerts'

const interaccion = ref<interacciones>(new interacciones())
const showModalTipoInteraccion = ref(false)
const showModalClientes = ref(false)
const interaccionSelected = ref<{ codigo: string, nombre: string }>({ codigo: '', nombre: '' })
const clienteSelected = ref<{ codigo: string, nombre: string }>({ codigo: '', nombre: '' })

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    await fetchInteraccion(route.params.id as string)
  }
})

async function fetchInteraccion(id: string) {
  try {
    const response = await apiClient.get(`/interacciones/${id}`)
    interaccion.value = response.data
    /* @ts-ignore */
    interaccion.value.fecha_int = (formatDate(String(interaccion.value.fecha_int)))
    const cliente = await apiClient.get(`/clientes/${interaccion.value.codcli_int}`)
    clienteSelected.value = { codigo: String(cliente.data.codcli_cli), nombre: cliente.data.nombre_cli }
    const tipointeraccion = await apiClient.get(`/tipointeraccion/${interaccion.value.codtin_int}`)
    interaccionSelected.value = { codigo: String(tipointeraccion.data.codtin_tin), nombre: tipointeraccion.data.descripcion_tin }
    addAlert(1, 'Interacción cargada correctamente.')
  } catch (error) {
    console.error('Error fetching interacciones:', error)
    addAlert(3, 'Error al obtener la interacción.')
  }
}

async function saveInteraccion() {
  try {
    interaccion.value.codcli_int = Number(clienteSelected.value.codigo)
    interaccion.value.codtin_int = Number(interaccionSelected.value.codigo)
    if (route.params.id) {
      await apiClient.patch(`/interacciones/${route.params.id}`, interaccion.value)
      addAlert(2, 'La interacción se actualizó correctamente.')
    } else {
      await apiClient.post('/interacciones', interaccion.value)
      addAlert(2, 'La interacción se registró correctamente.')
    }
    router.push({ name: 'InteraccionesCliente' })
  } catch (error) {
    console.error('Error saving interacciones:', error)
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
  router.push({ name: 'Interacciones Cliente' })
}

function handleInteraccionSelected(tipointeraccion: tipo_interaccion) {
  interaccionSelected.value = { codigo: String(tipointeraccion.codtin_tin), nombre: tipointeraccion.descripcion_tin }
}

function handleClienteSelected(cliente: clientes) {
  clienteSelected.value = { codigo: String(cliente.codcli_cli), nombre: cliente.nombre_cli }
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
        <label class="text-gray-700" for="nombre">Detalle Interaccion</label>
        <input id="nombre" v-model="interaccion.detalle_int" type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
      </div>
      <div>
        <label class="text-gray-700" for="cliente">Cliente</label>
        <div class="flex gap-2 justify-center items-center">
          <input id="cliente-codigo" v-model="clienteSelected.codigo" type="text" disabled
            class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly>
          <input id="cliente-nombre" v-model="clienteSelected.nombre" type="text" disabled
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly>
          <button
            class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="showModalClientes = true">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      <div>
        <label class="text-gray-700" for="tipo-interaccion">Tipo Interacción</label>
        <div class="flex gap-2 justify-center items-center">
          <input id="tipo-interaccion-codigo" v-model="interaccionSelected.codigo" type="text" disabled
            class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly>
          <input id="tipo-interaccion-nombre" v-model="interaccionSelected.nombre" type="text" disabled
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly>
          <button type="button"
            class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            @click="showModalTipoInteraccion = true">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>

      <div>
        <label class="text-gray-700" for="fecini_abo">Fecha de Inicio</label>
        <input id="fecini_abo" v-model="interaccion.fecha_int" type="date"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
      </div>
      <div class="mt-4">
        <button type="button"
          class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          @click="saveInteraccion">
          Guardar
        </button>
      </div>

      <ModalReutilizable v-model:showModal="showModalTipoInteraccion" modal-title="Tipo Interacción"
        endpoint="/tipointeraccion" code-field="codtin_tin" name-field="descripcion_tin"
        @selected="handleInteraccionSelected" />

      <ModalReutilizable v-model:showModal="showModalClientes" modal-title="Cliente" endpoint="/clientes"
        code-field="codcli_cli" name-field="nombre_cli" @selected="handleClienteSelected" />
    </div>
  </div>
</template>
