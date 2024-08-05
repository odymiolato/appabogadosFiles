<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { clientes } from '../../class/all.class'
import apiClient from '../../axiosConfig'
import { addAlert } from '../../stores/alerts'

const route = useRoute()
const router = useRouter()

const cliente = ref<clientes>(new clientes())

onMounted(async () => {
  if (route.params.id)
    await fetchCliente(route.params.id as string)
})

async function fetchCliente(id: string) {
  try {
    const response = await apiClient.get(`/clientes/${id}`)
    cliente.value = {
      ...response.data,
      fecnac_cli: formatDate(response.data.fecnac_cli) // Formatea la fecha
    }
    addAlert(1, 'Cliente cargado correctamente.')
  }
  catch (error) {
    console.error('Error fetching cliente:', error)
    addAlert(3, 'Error al obtener el cliente.')
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

async function saveCliente() {
  try {
    if (route.params.id) {
      // Editar cliente existente
      await apiClient.patch(`/clientes/${route.params.id}`, cliente.value)
      addAlert(2, 'El cliente se actualizó correctamente.')
    }
    else {
      // Crear nuevo cliente
      await apiClient.post('/clientes', cliente.value)
      addAlert(2, 'El cliente se registró correctamente.')
    }
    router.push({ name: 'Clientes' })
  }
  catch (error) {
    console.error('Error saving cliente:', error)
    addAlert(3, 'Error al registrar el cliente.')
  }
}

function goBack() {
  router.push({ name: 'Clientes' })
}
</script>

<template>
  <div class="p-6 bg-white rounded-md shadow-md">
    <div class="flex items-center mb-4 cursor-pointer" @click="goBack">
      <img src="../../assets/img/returnArrow.svg" alt="Back" class="w-6 h-6 mr-2 ">
      <span class="text-gray-700">Volver</span>
    </div>
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <label class="text-gray-700" for="nombre">Nombre</label>
        <input
          id="nombre" v-model="cliente.nombre_cli"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
      <div>
        <label class="text-gray-700" for="apellido">Apellido</label>
        <input
          id="apellido" v-model="cliente.apellido_cli"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="telefono">Teléfono</label>
        <input
          id="telefono" v-model="cliente.telefono_cli"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="email">Correo Electrónico</label>
        <input
          id="email" v-model="cliente.email_cli"
          type="email"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
      <div>
        <label class="text-gray-700" for="numdoc">Cedula</label>
        <input
          id="numdoc" v-model="cliente.numdoc_cli"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
      <div>
        <label class="text-gray-700" for="fecnac_cli">Fecha de nacimiento</label>
        <input
          id="fecnac_cli" v-model="cliente.fecnac_cli"
          type="date"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
    </div>

    <div class="mt-4">
      <button
        type="button"
        class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        @click="saveCliente"
      >
        Guardar
      </button>
    </div>
  </div>
</template>
