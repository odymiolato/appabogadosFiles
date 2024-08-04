<script setup lang="ts">
import { ref } from 'vue'
import { tipos_expedientes } from '../../class/all.class';
import { addAlert } from '../../stores/alerts';

const tipo = ref<tipos_expedientes>(new tipos_expedientes());
/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API

function clearPage() {
  tipo.value = new tipos_expedientes();
}

function validate(): boolean {
  if (tipo.value.descri_tip === '') {
    addAlert(1, 'Debe de completar el campo');
    return false
  }
  return true
}

async function saveTipoExpediente() {
  if (!validate()) {
    return false
  }
  try {
    const response = await fetch(`${URL}tiposexpedientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tipo.value)
    });

    if (response.ok) {
      if (await response.json()) {
        addAlert(2, 'Tipo de expdiente registrado satisfactoriamente.')
        clearPage()
      }
    } else {
      addAlert(3, response.statusText)
      console.error(response.statusText);
    }

  } catch (error) {
    console.error(error);
    addAlert(3, 'Problemas al realizar la peticion, favor comunicar al administrador.')
  }
}

</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Tipos de Expedientes
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">

      <div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="descri_tip">Nombre</label>
            <input id="descri_tip" type="text" v-model="tipo.descri_tip"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button type="button" @click="saveTipoExpediente"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
