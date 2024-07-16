<script setup lang="ts">
import { ref } from 'vue'
import Inputs from '../../../components/Inputs.vue';
import PaginationTable from '../../../components/tablas/PaginationTable.vue'
import Buttons from '../../../components/Buttons.vue'

const events = ref([
  { index: 1, item: 'ejemplo' },
  { index: 2, item: 'ejemplo 2' },
])
const columns = ref([
  { key: 'city', label: 'City' },
  { key: 'totalOrders', label: 'Total orders' },
])

const tableData = ref([
  { city: 'New York', totalOrders: 150 },
  { city: 'Los Angeles', totalOrders: 200 },
  // Agrega más datos aquí
])

const isModalOpen = ref(false)
const modalTitle = ref('')
const currentEndpoint = ref('')

const nombre = ref('')

function openModal(type: any) {
  if (type === 'users') {
    modalTitle.value = 'Usuarios'
    currentEndpoint.value = 'https://tu-api.com/users'
  }
  else if (type === 'products') {
    modalTitle.value = 'Productos'
    currentEndpoint.value = 'https://tu-api.com/products'
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function handleSelect(item: any) {
  nombre.value = item.name
  // Llenar otros campos si es necesario
}

const paginationtablecolumns = [
  {
    name: 'Nombre',
    field: 'nombre',
    hasImage: true,
  },
  {
    name: 'Contacto del Cliente',
    field: 'contacto',

  },

]

const paginationtabledata = [
  {
    nombre: {
      text: 'Maria',
      image: '',
    },
    contacto: '2345789234576',

  },
]
</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Gestion de Clientes
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="nombre_cli">Nombre</label>
            <input id="nombre_cli" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="apellido_cli">Apellido</label>
            <input id="apellido_cli" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="fecnac_cli">Fecha de Nacimiento</label>
            <input id="fecnac_cli" type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="numdoc_cli">Número de Documento</label>
            <input id="numdoc_cli" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="email_cli">Email</label>
            <input id="email_cli" type="email"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="telefono_cli">Teléfono</label>
            <input id="telefono_cli" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="fecini_cli">Fecha de Inicio</label>
            <input id="fecini_cli" type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
