<script setup lang="ts">
import { ref } from 'vue'
import { tribunales } from '../../class/all.class';
import { addAlert } from '../../stores/alerts';

const Tribuna = ref<tribunales>(new tribunales());

/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

function clearPage() {
  Tribuna.value = new tribunales();
}

async function saveTribunal() {
  try {
    const response = await fetch(URL + "tribunales", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Tribuna.value)
    });

    if (response.ok) {
      if (await response.json()) {
        addAlert(2, 'Tribunal registrado satisfactoriamente.');
        clearPage();
      } else {
        addAlert(3, ' Problemas al registrar el Tribunal.');
      }
    } else {
      console.error("Error en la peticion: " + response.statusText)
      addAlert(3, 'Error en la peticion');
      return;
    }
  } catch (error) {
    console.error(error);
    addAlert(3, 'Error al hacer la llamada.')
  }
}

</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Tribunales
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="descri_tga">Nombre</label>
            <input id="descri_tga" type="text" maxlength="50"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Tribuna.descri_tri">
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button type="button"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="saveTribunal()">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
