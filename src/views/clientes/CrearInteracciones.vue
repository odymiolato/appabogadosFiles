<script setup lang="ts">
import { ref, watch } from 'vue'
import { interacciones } from '../../class/all.class'

const props = defineProps({
  interaccion: {
    type: Object as () => interacciones | null,
    default: null,
  },
})

const emit = defineEmits(['save'])

const interaccion = ref<interacciones>(props.interaccion ? { ...props.interaccion } : new interacciones())

watch(() => props.interaccion, (newinteraccion) => {
  interaccion.value = newinteraccion ? { ...newinteraccion } : new interacciones()
})

function saveinteraccion() {
  console.log('interaccion a guardar:', interaccion.value)
  emit('save', interaccion.value)
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <label class="text-gray-700" for="nombre">Nombre</label>
        <input
          id="nombre" v-model="interaccion.nombre_cli"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
      <div>
        <label class="text-gray-700" for="apellido">Apellido</label>
        <input
          id="apellido" v-model="interaccion.apellido_cli"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="telefono">Teléfono</label>
        <input
          id="telefono" v-model="interaccion.telefono_cli"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>

      <div>
        <label class="text-gray-700" for="email">Correo Electrónico</label>
        <input
          id="email" v-model="interaccion.email_cli"
          type="email"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
      <div>
        <label class="text-gray-700" for="numdoc">Cedula</label>
        <input
          id="numdoc" v-model="interaccion.numdoc_cli"
          type="text"
          class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
        >
      </div>
    </div>

    <div class="mt-4">
      <button
        type="button"
        class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        @click="saveinteraccion"
      >
        Guardar
      </button>
    </div>
  </div>
</template>
