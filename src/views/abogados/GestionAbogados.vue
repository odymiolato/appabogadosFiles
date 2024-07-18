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

          <div class="flex flex-col gap-1">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Especialidad</label>
            <Dropdown2 :items="status" labalItemNoselected="Especialidad" idDropDown="tipo_espcialidad_abo" />
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
