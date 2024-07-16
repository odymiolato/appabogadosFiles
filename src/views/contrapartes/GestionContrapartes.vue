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
    Gestion de Contraparte
  </h3>

  <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
            <h2 class="text-lg font-semibold text-gray-700 capitalize">Configuración de Contrapartes</h2>

            <form>
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label class="text-gray-700" for="codcon_con">Código de Contraparte</label>
                        <input id="codcon_con" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="nombre_con">Nombre</label>
                        <input id="nombre_con" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="direcc_con">Dirección</label>
                        <input id="direcc_con" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="telefo_con">Teléfono</label>
                        <input id="telefo_con" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="tipdoc_con">Tipo de Documento</label>
                        <input id="tipdoc_con" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="doc_con">Documento</label>
                        <input id="doc_con" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="email_con">Correo Electrónico</label>
                        <input id="email_con" type="email" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="estatu_con">Estado</label>
                        <input id="estatu_con" type="text" value="A" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="usercrea">Usuario Creador</label>
                        <input id="usercrea" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="usermod">Usuario Modificador</label>
                        <input id="usermod" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="fechcrea">Fecha de Creación</label>
                        <input id="fechcrea" type="date" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="fechmod">Fecha de Modificación</label>
                        <input id="fechmod" type="date" class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    </div>
                </div>

                <div class="flex justify-end mt-4">
                    <button class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
