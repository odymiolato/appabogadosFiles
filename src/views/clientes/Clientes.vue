<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import WideTable from '../../components/tablas/WideTable.vue'
import apiClient from '../../axiosConfig'
import type { clientes } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'

const columns = [
  { title: 'Nombre', field: 'nombre_cli' },
  { title: 'Apellido', field: 'apellido_cli' },
  { title: 'Teléfono', field: 'telefono_cli' },
  { title: 'Correo Electrónico', field: 'email_cli' },
  { title: 'Cedula', field: 'numdoc_cli' },
  { title: 'Fecha Nacimiento', field: 'fecnac_cli' },
]

const clienteList = ref<clientes[]>([])
const router = useRouter()

onMounted(async () => {
  await fetchClientes()
})

async function fetchClientes() {
  try {
    const response = await apiClient.get('/clientes')
    clienteList.value = response.data.map((cliente: clientes) => ({
      ...cliente,
      fecnac_cli: formatDate(String(cliente.fecnac_cli)),
    }))
  }
  catch (error) {
    console.error('Error fetching clientes:', error)
    addAlert(3, 'Error cargando clientes')
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${day}/${month}/${year}`
}

function handleEditCliente(cliente: clientes) {
  router.push({ name: 'CrearCliente', params: { id: cliente.codcli_cli } })
}

function openCreateCliente() {
  router.push({ name: 'CrearCliente' })
}
</script>

<template>
  <button type="button"
    class="mt-1 mb-5 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    @click="openCreateCliente">
    Crear Nuevo Cliente
  </button>
  <div class="p-6 bg-white rounded-md shadow-md">
    <div class="mb-4">
      <label class="text-gray-700 " for="descripcion">Clientes</label>
    </div>

    <WideTable :columns="columns" :tabledata="clienteList" label="Clientes" default-image="/path/to/default-image.jpg"
      :editable="true" @edit="handleEditCliente" />
  </div>
</template>
