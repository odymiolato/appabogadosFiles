<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { paises, provincias } from '../../class/all.class';
import { addAlert } from '../../stores/alerts'
import Modal from '../../components/Modal.vue';
import Inputs from '../../components/Inputs.vue';


const showModal = ref<boolean>(false);

const handleAccept = () => {
  showModal.value = false;
};

const handleDecline = () => {
  showModal.value = false;
};

const handleClose = () => {
  showModal.value = false;
};

let Provincia = ref<provincias>(new provincias());
const Paises = ref<paises[]>([]);

/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

function ClearPage() {
  Provincia.value = new provincias();
  paisSelected.value = { codpais_pais: '', nombre_pais: '' }
}

function validate(): boolean {
  if (Provincia.value.nombre_pro === '') {
    return false;
  }
  return true;
}

async function getPaises() {
  try {
    const response = await fetch(URL + 'paises', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      Paises.value = await response.json();
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText);
    }

  } catch (error) {
    addAlert(3, 'Error en la solicitud.');
    console.log('Error en la solicitud.');
  }
}

let searchTerm = ref('');

const filteredPaises = computed(() => {
  if (searchTerm.value === '') {
    return Paises.value;
  }
  return Paises.value.filter(item => String(item.codpais_pais).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.nombre_pais.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const paisSelected = ref({ codpais_pais: '', nombre_pais: '' });

function searchPaises(value: any) {
  searchTerm.value = value;
}

function setPais(obj: paises) {
  if (paisSelected !== undefined) {
    paisSelected.value.codpais_pais = String(obj.codpais_pais);
    paisSelected.value.nombre_pais = obj.nombre_pais;
  }
  handleAccept();
}

async function saveProvincia() {
  if (!validate()) {
    return;
  }
  Provincia.value.codpais_pro = parseInt(paisSelected.value.codpais_pais);
  try {
    const response = await fetch(URL + 'provincias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Provincia.value),
    });

    if (response.ok) {
      if (await response.json()) {
        addAlert(2, 'La Provincia se registro correctamente.');
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
onMounted(() => {
  getPaises();
});

</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Provincia
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="tipesp_tip">Nombre</label>
            <input id="tipesp_tip" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Provincia.nombre_pro">
          </div>

          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Pais</label>
            <div class="flex gap-2 justify-center items-center">
              <input id="fecnac_abo" type="text" disabled
                class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="paisSelected.codpais_pais" readonly>

              <input id="fecnac_abo" type="text"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="paisSelected.nombre_pais" readonly>

              <button @click="showModal = true" type="button"
                class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>

            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button type="button"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="saveProvincia()">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>


  <Modal class="flex justify-center items-center" v-if="showModal" title="Especialidades" @close="handleClose"
    @accept="handleAccept" @decline="handleDecline" :btnVisible="false">
    <template #body>
      <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchPaises" />
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
                  <tr v-for="(value) in filteredPaises" class="hover:bg-gray-200 cursor-pointer"
                    @click="setPais(value)">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.codpais_pais }}
                    </td>
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.nombre_pais }}
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
