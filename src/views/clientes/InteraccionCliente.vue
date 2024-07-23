<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Modal from '../../components/Modal.vue'
import type { interacciones } from '../../class/all.class'
import WideTable from '../../components/tablas/WideTable.vue'

import apiClient from '../../axiosConfig'
import CrearInteracciones from './CrearInteracciones.vue'

const columns = [
  { title: 'Fecha', field: 'fecha_int' },
  { title: 'Cliente', field: 'nombre_cliente' }, // Esto asume que el nombre del cliente será mostrado
  { title: 'Tipo de Interacción', field: 'tipo_interaccion' }, // Esto asume que el tipo de interacción será mostrado
  { title: 'Detalle', field: 'detalle_int' },
]

const showModal = ref(false)
const selectedinteraccion = ref<interacciones | null>(null)
const interaccionList = ref<interacciones[]>([])

onMounted(async () => {
  await fetchinteracciones()
})

async function fetchinteracciones() {
  try {
    const response = await apiClient.get('/interacciones')
    const clientesResponse = await apiClient.get('/clientes')
    const tiposInteraccionResponse = await apiClient.get('/tipo-interaccion')

    const clientes = clientesResponse.data
    const tiposInteraccion = tiposInteraccionResponse.data

    // Mapea las interacciones con los nombres de clientes y tipos de interacción
    interaccionList.value = response.data.map((interaccion: interacciones) => ({
      ...interaccion,
      nombre_cliente: clientes.find(cliente => cliente.codcli_cli === interaccion.codcli_int)?.nombre_cli || 'Desconocido',
      tipo_interaccion: tiposInteraccion.find(tipo => tipo.codtin_tin === interaccion.codtin_int)?.descripcion_tin || 'Desconocido',
    }))
  }
  catch (error) {
    console.error('Error fetching interacciones:', error)
  }
}

function handleClose() {
  showModal.value = false
}

async function handleSaveinteraccion(interaccion: interacciones) {
  try {
    console.log(interaccion)
    if (selectedinteraccion.value) {
      // Editar interaccion existente
      await apiClient.patch(`/interacciones/${interaccion.codint_int}`, interaccion)
    }
    else {
      // Crear nueva interaccion
      await apiClient.post('/interacciones', interaccion)
    }
    await fetchinteracciones()
    showModal.value = false
  }
  catch (error) {
    console.error('Error saving interaccion:', error)
  }
}

function handleEditinteraccion(interaccion: interacciones) {
  selectedinteraccion.value = { ...interaccion }
  showModal.value = true
}

function openCreateModal() {
  selectedinteraccion.value = null
  showModal.value = true
}
</script>

<template>
  <div>
    <button
      type="button"
      class="mt-1 mb-5 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      @click="openCreateModal"
    >
      Crear Nueva Interacción
    </button>

    <WideTable
      :columns="columns"
      :tabledata="interaccionList"
      label="interacciones"
      default-image="/path/to/default-image.jpg"
      :editable="true"
      @edit="handleEditinteraccion"
    />

    <Modal
      v-if="showModal"
      class="flex justify-center items-center"
      title="Crear/Editar interaccion"
      :btn-visible="false"
      @close="handleClose"
    >
      <template #body>
        <CrearInteracciones :interaccion="selectedinteraccion" @save="handleSaveinteraccion" />
      </template>
    </Modal>
  </div>
</template>
