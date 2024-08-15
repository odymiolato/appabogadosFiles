<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import WideTable from '../../components/tablas/WideTable.vue'
import apiClient from '../../axiosConfig'
import type { tipos_documentos } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'

const columns = [
  { title: 'Nombre', field: 'nombre_tdoc' },
  { title: 'Descripción', field: 'descri_tdoc' },
]

const TiposDocumentosList = ref<tipos_documentos[]>([])
const router = useRouter()

onMounted(async () => {
  await fetchClientes()
})

async function fetchClientes() {
  try {
    const response = await apiClient.get('/tiposdocumentos')
    TiposDocumentosList.value = response.data.map((tipo: tipos_documentos) => ({
      ...tipo
    }))
  }
  catch (error) {
    console.error('Error fetching tipos documentos:', error)
    addAlert(3, 'Error cargando los tipos documentos')
  }
}

function handleEditTiposDocumentos(tipo: tipos_documentos) {
  router.push({ name: 'Tipos Documentos crear', params: { id: tipo.codtdoc_tdoc } })
}

function openCreateTiposDocumentos() {
  router.push({ name: 'Tipos Documentos crear' })
}
</script>

<template>
  <button type="button"
    class="mt-1 mb-5 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    @click="openCreateTiposDocumentos">
    Nuevo Tipo de Documentos
  </button>
  <div class="p-6 bg-white rounded-md shadow-md">
    <div class="mb-4">
      <label class="text-gray-700 " for="descripcion">Tipo Documentos</label>
    </div>

    <WideTable :columns="columns" :tabledata="TiposDocumentosList" default-image="/path/to/default-image.jpg"
      :editable="true" @edit="handleEditTiposDocumentos" />
  </div>
</template>
