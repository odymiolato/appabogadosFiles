<script setup lang="ts">
import { ref } from 'vue'
import { origen_direcciones } from '../../class/all.class';
import { addAlert } from '../../stores/alerts'

let origen = ref<origen_direcciones>(new origen_direcciones());

/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

function ClearPage() {
  origen.value = new origen_direcciones();
}

function validate(): boolean {
  if (origen.value.descricion_ori === '' || origen.value.codorigen_ori === '') {
    return false;
  }
  return true;
}

async function saveOrigen() {
  if (!validate()) {
    return;
  }
  try {
    const response = await fetch(URL + 'origendirecciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(origen.value),
    });

    if (response.ok) {
      if (await response.json()) {
        addAlert(2, 'El origen se registro correctamente.');
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

function handleInputUpperCase(event: Event) {
  const input = event.target as HTMLInputElement
  input.value = input.value.toUpperCase().replace(/\d/g, '')
  origen.value.codorigen_ori = input.value
}


</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Origen Direccion
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="tipesp_tip">Nombre</label>
            <input id="tipesp_tip" type="text"
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            v-model="origen.descricion_ori">
          </div>
          <div>
            <label class="text-gray-700" for="tipesp_tip">Codigo</label>
            <input 
              id="tipesp_tip" 
              @input="handleInputUpperCase"
              type="text"
              maxlength="1"
              class="block w-10 mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500 "
              v-model="origen.codorigen_ori">
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button type="button"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="saveOrigen()">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
