<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { format } from 'date-fns'
import Modal from '../../components/Modal.vue'
import type { clientes } from '../../class/all.class'
import WideTable from '../../components/tablas/WideTable.vue'
import apiClient from '../../axiosConfig'
import CrearClientes from './CrearClientes.vue'

const columns = [
  { title: 'Nombre', field: 'nombre_cli' },
  { title: 'Apellido', field: 'apellido_cli' },
  { title: 'Teléfono', field: 'telefono_cli' },
  { title: 'Correo Electrónico', field: 'email_cli' },
  { title: 'Cedula', field: 'numdoc_cli' },
  { title: 'Fecha Nacimiento', field: 'fecnac_cli' },
]

const showModal = ref(false)
const selectedCliente = ref<clientes | null>(null)
const clienteList = ref<clientes[]>([])

onMounted(async () => {
  await fetchClientes()
})

async function fetchClientes() {
  try {
    const response = await apiClient.get('/clientes')
    clienteList.value = response.data.map((cliente: clientes) => ({
      ...cliente,
      fecnac_cli: format(new Date(cliente.fecnac_cli), 'dd/MM/yyyy'), // Formatea la fecha
    }))
  }
  catch (error) {
    console.error('Error fetching clientes:', error)
  }
}

function handleClose() {
  showModal.value = false
}

async function handleSaveCliente(cliente: clientes) {
  try {
    if (selectedCliente.value) {
      // Editar cliente existente
      console.log('editando cliente:', cliente)
      await apiClient.patch(`/clientes/${selectedCliente.value.codcli_cli}`, cliente)
    }
    else {
      // Crear nuevo cliente
      console.log(cliente)
      await apiClient.post('/clientes', cliente)
    }
    await fetchClientes()
    showModal.value = false
  }
  catch (error) {
    console.error('Error saving cliente:', error)
  }
}

function handleEditCliente(cliente: clientes) {
  selectedCliente.value = { ...cliente }
  showModal.value = true
}

function openCreateModal() {
  selectedCliente.value = null
  showModal.value = true
}
</script>

<template>
  <div class="p-6 bg-white rounded-md shadow-md">
    <button
      type="button"
      class="mt-1 mb-5 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      @click="openCreateModal"
    >
      Crear Nuevo Cliente
    </button>

    <WideTable
      :columns="columns"
      :tabledata="clienteList"
      label="Clientes"
      default-image="/path/to/default-image.jpg"
      :editable="true"
      @edit="handleEditCliente"
    />

    <Modal
      v-if="showModal"
      class="flex justify-center items-center"
      title="Crear/Editar Cliente"
      :btn-visible="false"
      @close="handleClose"
    >
      <template #body>
        <CrearClientes :cliente="selectedCliente" @save="handleSaveCliente" />
      </template>
    </Modal>
  </div>
</template>
