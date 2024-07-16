<script setup lang="ts">
import { ref } from 'vue'
import Inputs from '../../../components/Inputs.vue'
import PaginationTable from '../../../components/tablas/PaginationTable.vue'
import Buttons from '../../../components/Buttons.vue'
import dropdown from '../../../components/dropdown.vue'
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

function openModal(type:any) {
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

function handleSelect(item:any) {
  nombre.value = item.name
  // Llenar otros campos si es necesario
}

const paginationtablecolumns = [
  {
    name: 'Cliente',
    field: 'cliente',
    hasImage: true,
  },
  {
    name: 'Tipo de interaccion',
    field: 'tipointeraccion',

  },
  {
    name: 'Fecha',
    field: 'fecha',

  },
  {
    name: 'Detalles de Interaccion',
    field: 'detalleinteracion',

  },

]

const paginationtabledata = [
  {
    nombre: {
      text: 'Maria',
      image: '',
    },
    tipointeraccion: 'Deposicion',
    fecha: '24-07-2003',
    detalleinteracion: 'Confeso el asesinato',
  },
]
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Interacciones con Clientes
    </h3>

    <div class="flex">
      <Inputs typeinput="text" labeltext="clientes" />
      <button class="" @click="openModal('users')">
        Buscar clientes
      </button>

      <ModalBuscar
        :is-open="isModalOpen"
        :title="modalTitle"
        :api-endpoint="currentEndpoint"
        @close="closeModal"
        @select="handleSelect"
      />
    </div>
    <Dropdown labeltext="dropdown 1" :event="events" labal-item-noselected="Tipo De Interaccion" />
    <DatePicker label="Fecha de Interaccion" />
    <Inputs typeinput="text" labeltext="Detalles de interaccion" />
    <Buttons -buttonstext="Registrar" />
    <Buttons -buttonstext="Cancelar" />

    <PaginationTable default-image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" :columns="paginationtablecolumns" :tabledata="paginationtabledata" />
  </div>
</template>
