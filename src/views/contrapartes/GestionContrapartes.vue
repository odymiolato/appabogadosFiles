<script setup lang="ts">
import { ref } from 'vue'
import Inputs from '../../../components/Inputs.vue';
import PaginationTable from '../../../components/tablas/PaginationTable.vue'
import Buttons from '../../../components/Buttons.vue'

</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Gestion de Contraparte
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <!-- <h2 class="text-lg font-semibold text-gray-700 capitalize">Configuración de Contrapartes</h2> -->

      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <!-- <div>
            <label class="text-gray-700" for="codcon_con">Código de Contraparte</label>
            <input id="codcon_con" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          </div> -->

          <div>
            <label class="text-gray-700" for="nombre_con">Nombre</label>
            <input id="nombre_con" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="direcc_con">Dirección</label>
            <input id="direcc_con" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="telefo_con">Teléfono</label>
            <input id="telefo_con" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <!-- <div>
            <label class="text-gray-700" for="tipdoc_con">Tipo de Documento</label>
            <input id="tipdoc_con" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div> -->

          <div>
            <label class="text-gray-700" for="doc_con">Documento</label>
            <input id="doc_con" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>

          <div>
            <label class="text-gray-700" for="email_con">Correo Electrónico</label>
            <input id="email_con" type="email"
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
