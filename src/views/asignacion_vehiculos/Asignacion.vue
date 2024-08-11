<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../../axiosConfig'
import type { abogados, asignaciones_vehiculos, vehiculos } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'
import WideTable from '../../components/tablas/WideTable.vue'

const columns = [
  { title: 'Placa', field: 'placa_veh' },
  { title: 'Codigo del abogado', field: 'codabo_abo' },
  { title: 'Nombre', field: 'nombre_abo' },
  { title: 'Codigo audiencia', field: 'codaud_asv' },
  { title: 'Fecha asignada', field: 'fecha_asv' },
]

const asignacionesList = ref<asignaciones_vehiculos[]>([])
const router = useRouter()

onMounted(async () => {
  await fetchAsignarVehiculos()
})

async function fetchAsignarVehiculos() {
  try {
    const response = await apiClient.get('/asignarvehiculos')
    const vehiculosResponse = await apiClient.get('/vehiculos')
    const abogadosResponse = await apiClient.get('/abogados')

    const vehiculos = vehiculosResponse.data
    const abogados = abogadosResponse.data

    asignacionesList.value = response.data.map((asignacion: asignaciones_vehiculos) => {
      return {
        ...asignacion,
        nombre_abo: abogados?.find((abogado:abogados) => abogado.codabo_abo === asignacion.codabo_asv)?.nombre_abo || 'Desconocido',
        placa_veh: vehiculos?.find((vehiculo:vehiculos) => vehiculo.codveh_veh === asignacion.codveh_asv)?.placa_veh || 'Desconocido',
      }
    })
  }
  catch (error) {
    console.error('Error fetching Asignacion:', error)
    addAlert(3, 'Error cargando Asignacion')
  }
}

function handleEditAsignacion(asignacion: asignaciones_vehiculos) {
  router.push({ name: 'CrearAsignacion', params: { id: asignacion.codveh_asv } })
}

function openCreateAsignacion() {
  router.push({ name: 'CrearAsignacion' })
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
      <label class="text-gray-700 " for="descripcion">Asignar vehiculos</label>
    </div>

    <WideTable
      :columns="columns"
      :tabledata="asignacionesList"
      label="Asignar Vehiculos"
      default-image="/path/to/default-image.jpg"
      :editable="true"
      @edit="handleEditAsignacion"
    />
  </div>
</template>
