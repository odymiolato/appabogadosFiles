<script setup lang="ts">
import { ref, watch } from 'vue'
import { format, parseISO } from 'date-fns'
import { clientes } from '../../class/all.class'

const props = defineProps({
  cliente: {
    type: Object as () => clientes | null,
    default: null,
  },
})

const emit = defineEmits(['save'])

const cliente = ref<clientes>(props.cliente ? { ...props.cliente } : new clientes())

watch(() => props.cliente, (newCliente) => {
  cliente.value = newCliente
    ? {
        ...newCliente,
        fecnac_cli: newCliente.fecnac_cli ? format(parseISO(newCliente.fecnac_cli), 'yyyy-MM-dd') : '',
      }
    : new clientes()
})

function saveCliente() {
  // Convierte la fecha al formato esperado por el servidor
  if (cliente.value.fecnac_cli)
    cliente.value.fecnac_cli = format(new Date(cliente.value.fecnac_cli), 'yyyy-MM-dd')

  emit('save', cliente.value)
}
</script>

<template>
  <div>
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
