<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { tipo_movimientos, tipos_gastos } from '../../class/all.class';
import { addAlert } from '../../stores/alerts';
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

const tipo = ref<tipo_movimientos>(new tipo_movimientos());
const TiposGastosList = ref<Array<tipos_gastos>>([]);
const TipoGatosSelected = ref<{ tipgas_tga: string, descri_tga: string }>({ tipgas_tga: '', descri_tga: '' });
let searchTerm = ref('');
const origen = ref<string>('D');
/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

function clearPage() {
  tipo.value = new tipo_movimientos();
  TipoGatosSelected.value = { tipgas_tga: '', descri_tga: '' };
}

function validate(): boolean {
  if (tipo.value.descri_tmo === '') {
    addAlert(1, "Debe de llenar todos los campos.");
    return false;
  }
  return true;
}

async function getTipoGastos() {
  try {
    const response = await fetch(URL + 'tiposgastos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      TiposGastosList.value = await response.json();
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText);
    }

  } catch (error) {
    addAlert(3, 'Error en la solicitud.');
    console.log('Error en la solicitud.');
  }
}

const filteredTiposGastos = computed(() => {
  if (searchTerm.value === '') {
    return TiposGastosList.value;
  }
  return TiposGastosList.value.filter(item => item.tipgas_tga.toLowerCase().includes(searchTerm.value.toLowerCase()) || item.descri_tga.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

function searchTiposGastos(value: any) {
  searchTerm.value = value;
}

function setTipoGasto(obj: tipos_gastos) {
  if (TipoGatosSelected !== undefined) {
    TipoGatosSelected.value.tipgas_tga = obj.tipgas_tga;
    TipoGatosSelected.value.descri_tga = obj.descri_tga;
  }
  handleAccept();
}

async function saveTipoMoviento() {
  try {
    if (!validate()) {
      return;
    }

    tipo.value.tipgas_tmo = TipoGatosSelected.value.tipgas_tga;
    tipo.value.origen_tmo = origen.value

    const response = await fetch(URL + 'tipomovimientos', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tipo.value)

    });

    if (response.ok) {
      if (await response.json()) {
        addAlert(2, "Tipo de Movimiento resgistrado satisfactoriamente.")
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

onMounted(() => {
  getTipoGastos();
});

</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Tipos de Movimiento
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="descri_tmo">Nombre</label>
            <input id="descri_tmo" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="tipo.descri_tmo">
          </div>

          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Tipo de Gasto</label>
            <div class="flex gap-2 justify-center items-center">
              <input id="fecnac_abo" type="text"
                class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="TipoGatosSelected.tipgas_tga" readonly disabled>

              <input id="fecnac_abo" type="text"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="TipoGatosSelected.descri_tga" readonly disabled>

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

          <div>
            <label class="text-gray-700" for="tipo_especialidad_abo">Origen</label>
            <div class="mt-3 flex flex-row gap-3 items-end">
              <label class="flex flex-row items-center">
                <input type="radio" class="w-5 h-5 text-sky-600 focus:ring-sky-500" name="radio" value="D"
                  v-model="origen" checked>
                <span class="ml-2 text-gray-700">Débito</span>
              </label>
              <label class="flex flex-row items-center">
                <input type="radio" class="w-5 h-5 text-sky-600 focus:ring-sky-500" name="radio" value="C"
                  v-model="origen">
                <span class="ml-2 text-gray-700">Crédito</span>
              </label>
            </div>
          </div>

        </div>

        <div class="flex justify-end mt-4">
          <button
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="saveTipoMoviento">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
  <Modal class="flex justify-center items-center" v-if="showModal" title="Especialidades" @close="handleClose"
    @accept="handleAccept" @decline="handleDecline" :btnVisible="false">
    <template #body>
      <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchTiposGastos" />
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
                  <tr v-for="(value) in filteredTiposGastos" class="hover:bg-gray-200 cursor-pointer"
                    @click="setTipoGasto(value)">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.tipgas_tga }}
                    </td>
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.descri_tga }}
                    </td>
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
