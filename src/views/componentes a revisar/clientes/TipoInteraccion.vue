<script setup lang="ts">
import { ref } from 'vue'
import { tipo_interaccion } from '../../class/all.class'

const emit = defineEmits(['close', 'save'])

const tipoInteraccion = ref<tipo_interaccion>(new tipo_interaccion())

function saveTipoInteraccion() {
  console.log('Tipo de interacción a guardar:', tipoInteraccion.value)
  emit('save', tipoInteraccion.value)
  emit('close')
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <label class="text-gray-700" for="descripcion">Descripción</label>
        <input
          id="descripcion" v-model="tipoInteraccion.descripcion_tin"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="usercrea">Usuario Creador</label>
        <input
          id="usercrea" v-model="tipoInteraccion.usercrea"
          type="number"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="usermod">Usuario Modificador</label>
        <input
          id="usermod" v-model="tipoInteraccion.usermod"
          type="number"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="fechcrea">Fecha Creación</label>
        <input
          id="fechcrea" v-model="tipoInteraccion.fechcrea"
          type="datetime-local"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="fechmod">Fecha Modificación</label>
        <input
          id="fechmod" v-model="tipoInteraccion.fechmod"
          type="datetime-local"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
    </div>

    <div class="mt-4">
      <button
        type="button"
        class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        @click="saveTipoInteraccion"
      >
        Guardar
      </button>
    </div>
  </div>
</template>
