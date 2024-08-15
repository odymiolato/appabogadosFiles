<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { tipos_documentos, tipos_expedientes } from '../../class/all.class';
import { addAlert } from '../../stores/alerts';
import Modal from '../../components/Modal.vue';
import Inputs from '../../components/Inputs.vue';

const tipo = ref<tipos_expedientes>(new tipos_expedientes());
/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API
const showModal = ref<boolean>(false);
const TiposDocumentos = ref<tipos_documentos[]>([]);
const TipoDocumentoSelected = ref({ codtdoc_tdoc: '', nombre_tdoc: '' });
const TipoDoscumentosList = ref<{ id: number; name: string }[]>([])
let searchTerm = ref('');

const handleAccept = () => {
  showModal.value = false;
};

const handleDecline = () => {
  showModal.value = false;
};

const handleClose = () => {
  showModal.value = false;
};




const filteredTipoDocumentos = computed(() => {
  if (searchTerm.value === '') {
    return TiposDocumentos.value;
  }
  return TiposDocumentos.value.filter(item => String(item.codtdoc_tdoc).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.nombre_tdoc.toLowerCase().includes(searchTerm.value.toLowerCase()));
});



function searchTipoDocumento(value: any) {
  searchTerm.value = value;
}

function setTipoDocumento(obj: tipos_documentos) {
  if (TipoDocumentoSelected !== undefined) {
    TipoDocumentoSelected.value.codtdoc_tdoc = String(obj.codtdoc_tdoc);
    TipoDocumentoSelected.value.nombre_tdoc = obj.nombre_tdoc;
  }
  handleAccept();
}

async function getTiposDocumentos() {
  try {
    const response = await fetch(URL + 'tiposdocumentos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      TiposDocumentos.value = await response.json();
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText);
    }

  } catch (error) {
    addAlert(3, 'Error en la solicitud.');
    console.log('Error en la solicitud.');
  }
}

function addTipoDocumento(id: number, name: string) {
  try {
    if (TipoDocumentoSelected.value.codtdoc_tdoc === '') {
      addAlert(1, 'Debes de selecionar un tipo.')
      return
    }

    if (TipoDoscumentosList.value.find(item => item.id === id)) {
      addAlert(1, 'Este tipo ya esta asignado a al tipo de expediente.')
      return
    }
    TipoDoscumentosList.value.push({ id, name })
    addAlert(2, 'Tipo agregado la lista.')
    TipoDocumentoSelected.value = { codtdoc_tdoc: '', nombre_tdoc: '' }
  }
  catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

function selectTipo(obj: any) {
  try {
    TipoDocumentoSelected.value.codtdoc_tdoc = String(obj.id)
    TipoDocumentoSelected.value.nombre_tdoc = obj.name
  }
  catch (error) {
    console.error(error)
  }
}

function removeTipo(id: string = '') {
  try {
    if (id === '') {
      addAlert(1, 'Debe de selecionar un Tipo.')
      return
    }
    TipoDoscumentosList.value = TipoDoscumentosList.value.filter(item => item.id !== Number.parseInt(id))
    addAlert(2, 'Tipo eliminado de la lista.')
    TipoDocumentoSelected.value = { codtdoc_tdoc: '', nombre_tdoc: '' }
  }
  catch (error) {
    console.error(error)
  }
}

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

onMounted(() => {
  getTiposDocumentos()
})

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

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div class="">
        <label class="text-gray-700" for="tipo_espcialidad_abo">Tipos de Documentos</label>
        <div class="flex gap-2 justify-center items-center">
          <input id="fecnac_abo" v-model="TipoDocumentoSelected.codtdoc_tdoc" type="text" disabled
            class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly>

          <input id="fecnac_abo" v-model="TipoDocumentoSelected.nombre_tdoc" type="text"
            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            readonly>

          <button type="button"
            class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300"
            @click="showModal = true">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span class="sr-only">Search</span>
          </button>

          <button
            class="flex mt-1 p-3  text-sm font-medium text-white bg-green-500 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
            @click="addTipoDocumento(parseInt(TipoDocumentoSelected.codtdoc_tdoc), TipoDocumentoSelected.nombre_tdoc)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span class="ml-2">Agregar</span>
          </button>

          <button
            class="flex mt-1 p-3  text-sm font-medium text-white bg-red-500 rounded-lg border hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
            @click="removeTipo(TipoDocumentoSelected.codtdoc_tdoc)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="ml-2">Eliminar</span>
          </button>
        </div>
        <div class="my-6 flex w-full flex-col">
          <div class="">
            <div class="rounded-md shadow bg-white h-[17.9em] max-h-[17.9em] overflow-auto">
              <table class="w-full text-left border-collapse">
                <thead class="sticky top-0">
                  <tr>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Codigo
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      nombre
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, index) in TipoDoscumentosList" :key="index" class="hover:bg-gray-200"
                    @dblclick="selectTipo(value)">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.id }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ value.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal class="flex justify-center items-center" v-if="showModal" title="Especialidades" @close="handleClose"
    @accept="handleAccept" @decline="handleDecline" :btnVisible="false">
    <template #body>
      <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchTipoDocumento" />
      <div>
        <div>
          <div class="mt-2">
            <div class="my-6 overflow-hidden bg-white rounded-md shadow max-h-[289px] overflow-y-auto">
              <table class="w-full text-left border-collapse">
                <thead class="border-b top-0 sticky z-20">
                  <tr>
                    <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                      Codigo
                    </th>
                    <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                      Nombre
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value) in filteredTipoDocumentos" class="hover:bg-gray-200 cursor-pointer"
                    @click="setTipoDocumento(value)">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.codtdoc_tdoc }}
                    </td>
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.descri_tdoc }}
                    </td>
                    <!-- <input type="radio" name="especialidad" :key="value.code"
                      class="absolute inset-0 m-auto bg-red-700 z-10 w-full h-full rb-table"> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>
