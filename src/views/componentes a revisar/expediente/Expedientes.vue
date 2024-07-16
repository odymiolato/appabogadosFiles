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
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Expedientes
    </h3>
    <Buttons -buttonstext="Crear" />
    <Buttons -buttonstext="Actualizar" />
    <Buttons -buttonstext="Cerrar" />

    <Inputs typeinput="text" labeltext="nombre" />

    <Dropdown labeltext="dropdown 1" :event="events" labal-item-noselected="Tipo" />
    <!-- <Dropdown2 labeltext="dropdown 2" :items="events" labal-item-noselected="Estado" /> -->
    <div label="estado">
      <Inputs typeinput="Radio" labeltext="Pendiente" />
      <Inputs typeinput="Radio" labeltext="Proceso" />
      <Inputs typeinput="Radio" labeltext="Completado" />
    </div>

    <Buttons -buttonstext="Guardar" />
    <Buttons -buttonstext="Cancelar" />

    <SimpleTable :tabledata="tableData" :columns="columns" />
  </div>
</template>
