<script setup lang="ts">
import { ref } from 'vue'
import { especialidades } from '../../class/all.class';
import { addAlert } from '../../stores/alerts'

let especialidad = ref<especialidades>(new especialidades());

/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

function ClearPage() {
  especialidad.value = new especialidades();
}

function validate(): boolean {
  if (especialidad.value.descri_tip === '') {
    return false;
  }
  return true;
}

async function saveEspecialidad() {
  if (!validate()) {
    return;
  }
  try {
    const response = await fetch(URL + 'especialidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(especialidad.value),
    });

    if (response.ok) {
      if(await response.json()){
        addAlert(2,'La especialidad se registro correctamente.');
        ClearPage();
      }
    } else {
      console.error('Error en la respuesta:', response.statusText);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}


</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Especialidades
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="tipesp_tip">Nombre</label>
            <input id="tipesp_tip" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="especialidad.descri_tip">
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button type="button"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="saveEspecialidad()">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
