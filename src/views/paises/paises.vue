<script setup lang="ts">
import { ref } from 'vue'
import { paises } from '../../class/all.class';
import { addAlert } from '../../stores/alerts'

let pais = ref<paises>(new paises());

/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

function ClearPage() {
  pais.value = new paises();
}

function validate(): boolean {
  if (pais.value.nombre_pais === '') {
    return false;
  }
  return true;
}

async function savePais() {
  if (!validate()) {
    return;
  }
  try {
    const response = await fetch(URL + 'paises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pais.value),
    });

    if (response.ok) {
      if (await response.json()) {
        addAlert(2, 'El pais se registro correctamente.');
        ClearPage();
      }
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    addAlert(3, 'Error en la solicitud.');
  }
}


</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Paises
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="tipesp_tip">Nombre</label>
            <input id="tipesp_tip" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="pais.nombre_pais">
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button type="button"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="savePais()">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
