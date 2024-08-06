<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../../axiosConfig'
import type { interacciones } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'
import WideTable from '../../components/tablas/WideTable.vue'

const columns = [
  { title: 'Fecha', field: 'fecha_int' },
  { title: 'Cliente', field: 'nombre_cliente' },
  { title: 'Tipo de Interacción', field: 'tipo_interaccion' },
  { title: 'Detalle', field: 'detalle_int' },
]

const interaccionList = ref<interacciones[]>([])
const router = useRouter()

onMounted(async () => {
  await fetchInteracciones()
})

async function fetchInteracciones() {
  try {
    const response = await apiClient.get('/interacciones')
    const clientesResponse = await apiClient.get('/clientes')
    const tiposInteraccionResponse = await apiClient.get('/tipointeraccion')
    
    const clientes = clientesResponse.data
    const tiposInteraccion = tiposInteraccionResponse.data
    
    interaccionList.value = response.data.map((interaccion: interacciones) => ({
      ...interaccion,
      nombre_cliente: clientes.find(cliente => cliente.codcli_cli === interaccion.codcli_int)?.nombre_cli || 'Desconocido',
      tipo_interaccion: tiposInteraccion.find(tipo => tipo.codtin_tin === interaccion.codtin_int)?.descripcion_tin || 'Desconocido',
      fecha_int: formatDate(interaccion.fecha_int), // Formatea la fecha
    }))
  } catch (error) {
    console.error('Error fetching interacciones:', error)
    addAlert(3, 'Error cargando interacciones')
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}

function handleEditInteraccion(interaccion: interacciones) {
  router.push({ name: 'CrearInteraccion', params: { id: interaccion.codint_int } })
}

function openCreateInteraccion() {
  router.push({ name: 'CrearInteraccion' })
}
</script>

<template>
  <button
    type="button"
    class="mt-1 mb-5 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    @click="openCreateInteraccion"
  >
    Crear Nueva Interacción
  </button>
  <div class="p-6 bg-white rounded-md shadow-md">
    <div class="mb-4">
      <label class="text-gray-700 " for="descripcion">Interacciones</label>
    </div>

    <WideTable
      :columns="columns"
      :tabledata="interaccionList"
      label="Interacciones"
      default-image="/path/to/default-image.jpg"
      :editable="true"
      @edit="handleEditInteraccion"
    />
  </div>
</template>
