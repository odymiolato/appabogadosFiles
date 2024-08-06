<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../../axiosConfig'
import type { vehiculos, vehiculos_modelos } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'
import WideTable from '../../components/tablas/WideTable.vue'

const columns = [
  { title: 'Placa', field: 'placa_veh' },
  { title: 'Año', field: 'anio_veh' },
  { title: 'Modelo', field: 'nombre_mod' },
  { title: 'Marca', field: 'nombre_mar' },
  { title: 'Estado', field: 'descripcion_est' },
]

const vehiculosList = ref<vehiculos[]>([])
const router = useRouter()

onMounted(async () => {
  await fetchVehiculos()
})

async function fetchVehiculos() {
  try {
    const response = await apiClient.get('/vehiculos')
    const modelosResponse = await apiClient.get('/vehiculos-modelos')
    const estadosResponse = await apiClient.get('/vehiculos-estados')
    const marcasResponse = await apiClient.get('/vehiculos-marcas')
    
    const modelos = modelosResponse.data
    const estados = estadosResponse.data
    const marcas = marcasResponse.data

    vehiculosList.value = response.data.map((vehiculo: vehiculos) => {
      const modelo = modelos.find(modelo => modelo.codmodelo_mod === vehiculo.codmodelo_veh)
      const marca = modelo ? marcas.find(marca => marca.codmarca_mar === modelo.codmarca_mod) : null
      return {
        ...vehiculo,
        nombre_mod: modelo?.nombre_mod || 'Desconocido',
        nombre_mar: marca?.nombre_mar || 'Desconocido',
        descripcion_est: estados.find(estado => estado.codestado_est === vehiculo.codestado_veh)?.descripcion_est || 'Desconocido',
      }
    })
  } catch (error) {
    console.error('Error fetching vehiculos:', error)
    addAlert(3, 'Error cargando vehiculos')
  }
}



function handleEditVehiculo(vehiculo: vehiculos) {
  router.push({ name: 'CrearVehiculo', params: { id: vehiculo.codveh_veh } })
}

function openCreateVehiculo() {
  router.push({ name: 'CrearVehiculo' })
}
</script>

<template>
  <button
    type="button"
    class="mt-1 mb-5 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    @click="openCreateVehiculo"
  >
    Crear Nuevo Vehiculo
  </button>
  <div class="p-6 bg-white rounded-md shadow-md">
    <div class="mb-4">
      <label class="text-gray-700 " for="descripcion">vehiculos</label>
    </div>

    <WideTable
      :columns="columns"
      :tabledata="vehiculosList"
      label="vehiculos"
      default-image="/path/to/default-image.jpg"
      :editable="true"
      @edit="handleEditVehiculo"
    />
  </div>
</template>
