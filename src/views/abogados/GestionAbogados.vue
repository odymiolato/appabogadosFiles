<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import Modal from '../../components/Modal.vue';
import Inputs from '../../components/Inputs.vue';
import { abogados, especialidades } from '../../class/all.class';

const showModal = ref(false);
const Abogado = ref<abogados>(new abogados());
/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

const handleAccept = () => {
  console.log('Accepted');
  showModal.value = false;
};

const handleDecline = () => {
  console.log('Declined');
  showModal.value = false;
};

const handleClose = () => {
  showModal.value = false;
};

let searchTerm = ref('');

const especialidadesList = ref<especialidades[]>([]);

async function GetEspecialidades() {
  try {

  } catch (error) {
    console.error(error);
  }
  const response = await fetch(URL + 'especialidades', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    especialidadesList.value = await response.json();
  }
}

const filteredEspecialidades = computed(() => {
  if (searchTerm.value === '') {
    return especialidadesList.value;
  }
  return especialidadesList.value.filter(item => String(item.tipesp_tip).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.descri_tip.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

function searchEspecilidades(value: any) {
  console.log("value", value);
  searchTerm.value = value;
}

const especialidadSelected = ref({ tipesp_tip: '', descri_tip: '' });

function setEspecialidad(obj: especialidades) {
  if (especialidadSelected !== undefined) {
    especialidadSelected.value.tipesp_tip = String(obj.tipesp_tip);
    especialidadSelected.value.descri_tip = obj.descri_tip;
  }
  handleAccept();
}

async function saveAbogado(){
  console.info(Abogado.value);
}

onMounted(() => {
  GetEspecialidades();
});
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
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Abogado.nombre_abo">
          </div>

          <div>
            <label class="text-gray-700" for="direcc_abo">Dirección</label>
            <input id="direcc_abo" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Abogado.direcc_abo">
          </div>

          <div>
            <label class="text-gray-700" for="telefo_abo">Teléfono</label>
            <input id="telefo_abo" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Abogado.telefo_abo">
          </div>

          <div>
            <label class="text-gray-700" for="celula_abo">Cédula</label>
            <input id="celula_abo" type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Abogado.celula_abo">
          </div>

          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Especialidad</label>
            <div class="flex gap-2 justify-center items-center">
              <input id="fecnac_abo" type="text" disabled
                class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="especialidadSelected.tipesp_tip" readonly>

              <input id="fecnac_abo" type="text"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="especialidadSelected.descri_tip" readonly>

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
            <label class="text-gray-700" for="fecnac_abo">Fecha de Nacimiento</label>
            <input id="fecnac_abo" type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Abogado.fecnac_abo">
          </div>

          <div>
            <label class="text-gray-700" for="email_abo">Correo Electrónico</label>
            <input id="email_abo" type="email"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Abogado.email_abo">
          </div>

          <div>
            <label class="text-gray-700" for="fecini_abo">Fecha de Inicio</label>
            <input id="fecini_abo" type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              v-model="Abogado.fecini_abo">
          </div>

        </div>

        <div class="flex justify-end mt-4">
          <button type="button" @click="saveAbogado()"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>

  <Modal class="flex justify-center items-center" v-if="showModal" title="Especialidades" @close="handleClose"
    @accept="handleAccept" @decline="handleDecline" :btnVisible="false">
    <template #body>
      <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchEspecilidades" />
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
                  <tr v-for="(value) in filteredEspecialidades" class="hover:bg-gray-200 cursor-pointer"
                    @click="setEspecialidad(value)">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.tipesp_tip }}
                    </td>
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.descri_tip }}
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
<style scoped>
/* .rb-table {
  transform: scale(2);
  opacity: 0;
  cursor: pointer;
}

.row-rb:has(input:checked) {
  background-color: #000 !important;
} */
</style>