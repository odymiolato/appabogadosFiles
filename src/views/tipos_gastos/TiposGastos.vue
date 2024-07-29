<script setup lang="ts">
import { ref } from 'vue'
import { tipos_gastos } from '../../class/all.class';
import { addAlert } from '../../stores/alerts';

const tipo = ref<tipos_gastos>(new tipos_gastos());
/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

function clearPage(): void {
  tipo.value = new tipos_gastos();
}

function validar(): boolean {
  if (tipo.value.descri_tga === '' || tipo.value.tipgas_tga === '') {
    addAlert(1, "Debe de llenar todos los campos.");
    return false;
  }
  return true;
}

async function saveTipoGasto(): Promise<void> {
  try {
    if (!validar()) {
      return;
    }

    const response = await fetch(URL + 'tiposgastos', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tipo.value)

    });

    if (response.ok) {
      if (await response.json()) {
        addAlert(2, "Tipo de Gasta resgistrado satisfactoriamente.")
        clearPage()
      }
    } else {
      addAlert(3, "Problemas con la peticion.")
    }

  } catch (error) {
    console.log(error);
    addAlert(3, "Problemas al reaizar la peticion.");
  }
}

</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Tipos de Gatos
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <!-- <h2 class="text-lg font-semibold text-gray-700 capitalize">Configuración de Tipos de Gastos</h2> -->

      <div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="descri_tga">Codigo</label>
            <input id="descri_tga" type="text" maxlength="1" 
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500 uppercase"
              v-model="tipo.tipgas_tga">
          </div>
          <div>
            <label class="text-gray-700" for="descri_tga">Nombre</label>
            <input id="descri_tga" type="text" maxlength="50"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="tipo.descri_tga">
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button type="button" @click="saveTipoGasto()"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
