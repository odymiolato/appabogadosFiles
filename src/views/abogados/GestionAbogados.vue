<script setup lang="ts">
import Dropdown2 from '../../components/dropdown2.vue';

let status = [{ name: 'Inactivo' }, { name: 'Activo' },]

</script>

<template>
  <div class="mt-4">
    <h3 class="text-3xl font-medium text-gray-700">
      Gestion de Abogados
    </h3>
    <div class="mt-4 p-6 bg-white rounded-md shadow-md">
      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="nombre_abo">Nombre</label>
            <input id="nombre_abo" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="direcc_abo">Dirección</label>
            <input id="direcc_abo" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="telefo_abo">Teléfono</label>
            <input id="telefo_abo" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="celula_abo">Cédula</label>
            <input id="celula_abo" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Especialidad</label>
            <div class="flex gap-2">
              <input id="fecnac_abo" type="text"
                class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
              <input id="fecnac_abo" type="text"
                class="w-[50%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">

              <button
                class="p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>

            </div>
          </div>
          <div>
            <label class="text-gray-700" for="fecnac_abo">Fecha de Nacimiento</label>
            <input id="fecnac_abo" type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="email_abo">Correo Electrónico</label>
            <input id="email_abo" type="email"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="fecini_abo">Fecha de Inicio</label>
            <input id="fecini_abo" type="date"
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
