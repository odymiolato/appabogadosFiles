<script setup lang="ts">
import { ref } from 'vue'
import Inputs from '../../components/Inputs.vue'
import PaginationTable from '../../components/tablas/PaginationTable.vue'
import ModalBuscar from '../../components/mantenimientos/modal.vue'
import Buttons from '../../components/Buttons.vue'
import DatePicker from '../../components/DatePicker.vue'

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

function openModal(type: string) {
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
    name: 'Expediente',
    field: 'expediente',
    hasImage: false,
  },
  {
    name: 'Fecha de Audiencia',
    field: 'fechaAudiencia',

  },
  {
    name: 'Detalles de Audiencia',
    field: 'detalleAudiencia',
  },
]

const paginationtabledata = [
  {
    expediente: 'Maria',
    fechaAudiencia: 'Electronics',
    detalleAudiencia: '$999',

  },
]
</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
      Gestion de Audiencias
    </h3>
    <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
            <!-- <h2 class="text-lg font-semibold text-gray-700 capitalize">Configuración de Audiencias</h2> -->

            <form>
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label class="text-gray-700" for="codaud_aud">Código de Audiencia</label>
                        <input id="codaud_aud" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="fecha_aud">Fecha</label>
                        <input id="fecha_aud" type="date" class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="numexp_aud">Número de Expediente</label>
                        <input id="numexp_aud" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="codtri_aud">Código del Tribunal</label>
                        <input id="codtri_aud" type="text" class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="estado_aud">Estado</label>
                        <input id="estado_aud" type="text" value="A" class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
                    </div>

                    <div>
                        <label class="text-gray-700" for="hora_aud">Hora</label>
                        <input id="hora_aud" type="time" class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
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
  <!-- <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Gestion de Audiencias
    </h3>

    <Dropdown labeltext="dropdown 1" :event="events" labal-item-noselected="expediente" />
    <div class="flex">
      <Inputs typeinput="text" labeltext="abogado" />
      <button class="" @click="openModal('users')">
        Buscar expediente
      </button>

      <ModalBuscar :is-open="isModalOpen" :title="modalTitle" :api-endpoint="currentEndpoint" @close="closeModal"
        @select="handleSelect" />
    </div>

    <DatePicker label="Fecha de Audiencia" />
    <Inputs typeinput="text" labeltext="detalle audiencia" />

    <Buttons -buttonstext="Asignar" />
    <Buttons -buttonstext="Cancelar" />

    <PaginationTable
      default-image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
      :columns="paginationtablecolumns" :tabledata="paginationtabledata" />
  </div> -->
</template>
