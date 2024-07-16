<script setup lang="ts">
import { ref } from 'vue'
import Inputs from '../../../components/Inputs.vue'
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

function openModal(type) {
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

function handleSelect(item) {
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
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Gestion de Clientes
    </h3>

    <Buttons -buttonstext="Añadir Cliente" />
    <Buttons -buttonstext="Modificar" />

    <!-- esto lo debo poner en un modal -->
    <Inputs typeinput="text" labeltext="nombre" />
    <Inputs typeinput="text" labeltext="contacto" />
    <Buttons -buttonstext="Guardar" />
    <Buttons -buttonstext="Cancelar" />

    <PaginationTable default-image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" :columns="paginationtablecolumns" :tabledata="paginationtabledata" />
  </div>
</template>
