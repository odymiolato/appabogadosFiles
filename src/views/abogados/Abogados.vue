<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../../axiosConfig'
import type { abogados, asignaciones_vehiculos, especialidades } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'
import WideTable from '../../components/tablas/WideTable.vue'

const columns = [
  { title: 'Nombre', field: 'nombre_abo' },
  { title: 'Telefono', field: 'telefo_abo' },
  { title: 'Cedula', field: 'cedula_abo' },
  { title: 'Especialidad', field: 'descri_tip' },
  { title: 'Correo', field: 'email_abo' },
  { title: 'Fecha de nacimiento', field: 'fecnac_abo' },
  { title: 'Fecha de inicio', field: 'fecini_abo' },
  { title: 'Direccion', field: 'direcc_abo' },
]

const abogadosList = ref<abogados[]>([])
const router = useRouter()

onMounted(async () => {
  await fetchAbogados()
})

async function fetchAbogados() {
  try {
    const response = await apiClient.get('/abogados')
    const especialidadesResponse = await apiClient.get('/especialidades')

    const especialidades = especialidadesResponse.data

    abogadosList.value = response.data.map((abogado: abogados) => {
      return {
        ...abogado,
        descri_tip: especialidades?.find((especialidad: especialidades) => especialidad.tipesp_tip === abogado.tipo_especialidad_abo)?.descri_tip || 'Desconocido',
        fecnac_abo: formatDate(abogado.fecnac_abo),
        fecini_abo: formatDate(abogado.fecini_abo),
      }
    })
  }
  catch (error) {
    console.error('Error fetching Abogado:', error)
    addAlert(3, 'Error cargando Abogado')
  }
}

function handleEditAsignacion(asignacion: asignaciones_vehiculos) {
  router.push({ name: 'CrearAsignacion', params: { id: asignacion.codveh_asv } })
}

function openCreateAsignacion() {
  router.push({ name: 'CrearAsignacion' })
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}

</script>

<template>
  <button
    type="button"
    class="mt-1 mb-5 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    @click="openCreateAsignacion"
  >
    Crear Nueva Asignacion
  </button>
  <div class="p-6 bg-white rounded-md shadow-md">
    <div class="mb-4">
      <label class="text-gray-700 " for="descripcion">vehiculos</label>
    </div>

    <WideTable
      :columns="columns"
      :tabledata="abogadosList"
      label="Asignar Vehiculos"
      default-image="/path/to/default-image.jpg"
      :editable="true"
      @edit="handleEditAsignacion"
    />
  </div>
</template>
