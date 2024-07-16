<script setup lang="ts">
import { ref } from 'vue'
import Buttons from '../../../components/Buttons.vue'
import Inputs from '../../../components/Inputs.vue'
import Dropdown from '../../../components/dropdown.vue'
import SimpleTable from '../../../components/tablas/SimpleTable.vue'

const events = ref([
  { index: 1, item: 'ejemplo' },
  { index: 2, item: 'ejemplo 2' },
])
const columns = ref([
  { key: 'nombre', label: 'Nombre' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'estado', label: 'Estado' },
  { key: 'fechainicio', label: 'Fecha de Inicio' },
  { key: 'fechacierre', label: 'Fecha de Cierre' },
])

const tableData = ref([
  { city: 'New York', totalOrders: 150 },
  { city: 'Los Angeles', totalOrders: 200 },
  // Agrega más datos aquí
])
</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Registrar Expedinte
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="codexp_exp">Código Expediente</label>
            <input id="codexp_exp" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="codabo_exp">Código Abogado</label>
            <input id="codabo_exp" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="motivo_exp">Motivo</label>
            <input id="motivo_exp" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="codcli_exp">Código Cliente</label>
            <input id="codcli_exp" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="fecini_exp">Fecha de Inicio</label>
            <input id="fecini_exp" type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="estatu_exp">Estatus</label>
            <input id="estatu_exp" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="tipexp_exp">Tipo de Expediente</label>
            <input id="tipexp_exp" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="codcon_exp">Código de Contraparte</label>
            <input id="codcon_exp" type="text"
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

  <!-- <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Expedientes
    </h3>
    <Buttons -buttonstext="Crear" />
    <Buttons -buttonstext="Actualizar" />
    <Buttons -buttonstext="Cerrar" />

    <Inputs typeinput="text" labeltext="nombre" />

    <Dropdown labeltext="dropdown 1" :event="events" labal-item-noselected="Tipo" />
    <Dropdown2 labeltext="dropdown 2" :items="events" labal-item-noselected="Estado" />
    <div class="flex flex-col gap-4" label="estado">
      <Inputs typeinput="Radio" labeltext="Pendiente" />
      <Inputs typeinput="Radio" labeltext="Proceso" />
      <Inputs typeinput="Radio" labeltext="Completado" />
    </div>

    <Buttons -buttonstext="Guardar" />
    <Buttons -buttonstext="Cancelar" />

    <SimpleTable :tabledata="tableData" :columns="columns" />
  </div> -->
</template>
