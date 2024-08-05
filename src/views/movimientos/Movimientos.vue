<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Modal from '../../components/Modal.vue'
import Inputs from '../../components/Inputs.vue'
import { contrapartes, ciudades, provincias } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'

const ClientesList = ref<{ id: number, name: string }[]>([]);
const showModal = ref(false)
const Contraparte = ref<contrapartes>(new contrapartes())
const TypeModal = ref<number>(0)
/* @ts-expect-error */
const URL: string = import.meta.env.VITE_PATH_API
const searchTerm = ref('')
const provinciasList = ref<provincias[]>([])
const ciudadesList = ref<ciudades[]>([])
const provinciaSelected = ref({ codpro_pro: '', nombre_pro: '' })
const ciuadadSelected = ref({ codciu_ciu: '', nombre_ciu: '' })


const filteredProvincias = computed(() => {
  if (searchTerm.value === '')
    return provinciasList.value

  return provinciasList.value.filter(item => String(item.codpro_pro).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.nombre_pro.toLowerCase().includes(searchTerm.value.toLowerCase()))
})


function handleAccept() {
  showModal.value = false
}

function presentModal(type: number) {
  showModal.value = true
  TypeModal.value = type
}

function handleDecline() {
  console.log('Declined')
  showModal.value = false
}

function handleClose() {
  showModal.value = false
}



async function getProvincias() {
  try {
    const response = await fetch(`${URL}provincias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok)
      provinciasList.value = await response.json()
    else
      addAlert(3, 'problemas con la solicitud de las Provincias')
  }
  catch (error) {
    console.error(error)
    addAlert(3, 'Comunicarce con los administradores.')
  }
}


function searchProvincias(value: any) {
  searchTerm.value = value
}

const filteredCiudades = computed(() => {
  if (searchTerm.value === '')
    return ciudadesList.value

  return ciudadesList.value.filter(item => String(item.codciu_ciu).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.nombre_ciu.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

function searchCiudades(value: any) {
  searchTerm.value = value
}

function setProvincia(obj: provincias) {
  if (provinciaSelected.value !== undefined) {
    provinciaSelected.value.codpro_pro = String(obj.codpro_pro)
    provinciaSelected.value.nombre_pro = obj.nombre_pro
  }
  handleAccept()
}

function setCiudad(obj: ciudades) {
  if (ciuadadSelected.value !== undefined) {
    ciuadadSelected.value.codciu_ciu = String(obj.codciu_ciu)
    ciuadadSelected.value.nombre_ciu = obj.nombre_ciu
  }
  handleAccept()
}

onMounted(() => {
  getProvincias()
})
</script>

<template>
  <div class="mt-4">
    <h3 class="text-3xl font-medium text-gray-700">
      Movimientos de Expedientes
    </h3>
    <div class="mt-4 p-6 bg-white rounded-md shadow-md">
      <div>
        <div class="flex flex-col gap-6 mt-4 sm:grid-cols-2">
          <div class="flex w-full">
            <div class="w-full">
              <label class="text-gray-700" for="telefo_abo">Comentario</label>
              <input id="telefo_abo" v-model="Contraparte.telefo_con" type="text"
                class="w-full h-[6em] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" for="celula_abo">Fecha</label>
              <input id="celula_abo" v-model="Contraparte.doc_con" type="date"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
            </div>

            <div>
              <label class="text-gray-700" for="email_abo">Total</label>
              <input id="email_abo" v-model="Contraparte.email_con" type="number" disabled
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
            </div>
          </div>

        </div>

        <div class="flex justify-end mt-4">
          <button type="button"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="true">
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- begin detalle -->
    <div class="mt-4 p-6 bg-white rounded-md shadow-md">
      <div class="">

        <div class="flex flex-row gap-3 w-full">
          <div class="flex flex-row gap-3 w-full">
            <!-- block one -->
            <div class="flex-[50%]">
              <label class="text-gray-700" for="tipo_espcialidad_abo">Expediente</label>
              <div class="flex gap-2 justify-center items-center">
                <input id="fecnac_abo" type="text" disabled
                  class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  readonly>

                <input id="fecnac_abo" type="text"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  readonly disabled>

                <button @click="presentModal(3)" type="button"
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
            <!-- block one -->

            <!-- block two -->
            <div class="flex-[50%]">
              <label class="text-gray-700" for="tipo_espcialidad_abo">Tipo de Expediente</label>
              <div class="flex gap-2 justify-center items-center">
                <input id="fecnac_abo" type="text" disabled
                  class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  readonly>

                <input id="fecnac_abo" type="text"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  readonly disabled>

                <button @click="presentModal(3)" type="button"
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
            <!-- block two -->

            <!-- block tree -->
            <div class="flex flex-col">
              <label class="text-gray-700" for="tipo_espcialidad_abo">Tipo de Expediente</label>
              <div>
                <input id="fecnac_abo" type="number"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
              </div>
            </div>
            <!-- block tree -->

          </div>
          <div class="flex flex-row gap-1 flex-[10%] items-end">
            <button @click="true"
              class="flex mt-1 p-3  text-sm font-medium text-white bg-green-500 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span class="ml-2">Agregar</span>
            </button>

            <button @click="true"
              class="flex mt-1 p-3  text-sm font-medium text-white bg-red-500 rounded-lg border hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="ml-2">Eliminar</span>
            </button>
          </div>
        </div>
        <!-- end -->


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
                      Nombre
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, index) in ClientesList" :key="index" class="hover:bg-gray-200" @dblclick="true">
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
    <!-- end detalle -->
  </div>

  <Modal v-if="showModal" class="flex justify-center items-center" title="Especialidades" :btn-visible="false"
    @close="handleClose" @accept="handleAccept" @decline="handleDecline">
    <template #body>
      <div v-if="TypeModal === 1">
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchProvincias" />
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
                    <tr v-for="(value) in filteredProvincias" class="hover:bg-gray-200 cursor-pointer"
                      @click="setProvincia(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codpro_pro }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.nombre_pro }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="TypeModal === 2">
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchCiudades" />
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
                    <tr v-for="(value) in filteredCiudades" class="hover:bg-gray-200 cursor-pointer"
                      @click="setCiudad(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codciu_ciu }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.nombre_ciu }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style scoped></style>
