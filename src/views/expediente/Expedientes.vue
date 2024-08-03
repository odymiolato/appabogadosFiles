<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import Inputs from '../../components/Inputs.vue'
import Modal from '../../components/Modal.vue';
import { useTableData } from '../../composables/useTableData'
import { addAlert } from '../../stores/alerts';
import { abogados, clientes, contrapartes, tipos_expedientes, tribunales } from '../../class/all.class';
import { weekdays } from 'moment';

const tap = ref<number>(1)
const showModal = ref<boolean>(false)
const TipoExpedientes = ref<tipos_expedientes[]>([])
const Abogados = ref<abogados[]>([])
const Clientes = ref<clientes[]>([])
const Contrapartes = ref<contrapartes[]>([])
const Tribunales = ref<tribunales[]>([])
const AbogadosList = ref<{ id: Number, name: String }[]>([]);
const ClientesList = ref<{ id: Number, name: String }[]>([]);
const ContrapartesList = ref<{ id: Number, name: String }[]>([]);
const TribunalesList = ref<{ id: Number, name: String }[]>([]);
const TypeModalTittle = ref<Array<string>>(['Tipo de Expediente','Abogados','Clientes','Contrapartes','Tribunales'])
/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API
const TipoExpedienteSelected = ref({ tipexp_tip: '', descri_tip: '' })
const AbogadoSelected = ref({ codabo_abo: '', nombre_abo: '' })
const ClienteSelected = ref({ codcli_cli: '', nombre_cli: '' })
const ContraparteSelected = ref({ codcon_con: '', nombre_con: '' })
const TribunalSelected = ref({ codtri_tri: '', descri_tri: '' })
const TypeModal = ref<number>(0)
let searchTermTipoExpediente = ref('')
let searchTermAbogado = ref('')
let searchTermCliente = ref('')
let searchTermContraparte = ref('')
let searchTermTribunal = ref('')

const handleAccept = () => {
  showModal.value = false
}

const handleDecline = () => {
  showModal.value = false
}

const handleClose = () => {
  showModal.value = false
}

const {
  simpleTableData,
} = useTableData()

const filteredTipoExpediente = computed(() => {
  if (searchTermTipoExpediente.value === '') {
    return TipoExpedientes.value
  }
  return TipoExpedientes.value.filter(item => String(item.tipexp_tip).toLowerCase().includes(searchTermTipoExpediente.value.toLowerCase()) || item.descri_tip.toLowerCase().includes(searchTermTipoExpediente.value.toLowerCase()))
})

const filteredAbogado = computed(() => {
  if (searchTermAbogado.value === '') {
    return Abogados.value
  }
  return Abogados.value.filter(item => String(item.codabo_abo).toLowerCase().includes(searchTermAbogado.value.toLowerCase()) || item.nombre_abo.toLowerCase().includes(searchTermAbogado.value.toLowerCase()))
})

const filteredCliente = computed(() => {
  if (searchTermCliente.value === '') {
    return Clientes.value
  }
  return Clientes.value.filter(item => String(item.codcli_cli).toLowerCase().includes(searchTermCliente.value.toLowerCase()) || `${item.nombre_cli} ${item.apellido_cli}`.toLowerCase().includes(searchTermCliente.value.toLowerCase()))
})

const filteredContraparte = computed(() => {
  if (searchTermContraparte.value === '') {
    return Contrapartes.value
  }
  return Contrapartes.value.filter(item => String(item.codcon_con).toLowerCase().includes(searchTermContraparte.value.toLowerCase()) || item.nombre_con.toLowerCase().includes(searchTermContraparte.value.toLowerCase()))
})

const filteredTribunal = computed(() => {
  if (searchTermTribunal.value === '') {
    return Tribunales.value
  }
  return Tribunales.value.filter(item => String(item.codtri_tri).toLowerCase().includes(searchTermTribunal.value.toLowerCase()) || item.descri_tri.toLowerCase().includes(searchTermTribunal.value.toLowerCase()))
})

function ChageTaps(value: number) {
  tap.value = value
}

function ClearPage() {
  // Provincia.value = new provincias();
  // paisSelected.value = { codpais_pais: '', nombre_pais: '' }
}

function validate(): boolean {
  // if (Provincia.value.nombre_pro === '') {
  //   return false;
  // }
  return true
}

async function getTipoExpedientes() {
  try {
    const response = await fetch(URL + 'tiposexpedientes', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      TipoExpedientes.value = await response.json()
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText)
    }

  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.log('Error en la solicitud.')
  }
}
async function getAbogados() {
  try {
    const response = await fetch(URL + 'abogados', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      Abogados.value = await response.json()
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText)
    }

  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.log('Error en la solicitud.')
  }
}
async function getClientes() {
  try {
    const response = await fetch(URL + 'clientes', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      Clientes.value = await response.json()
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText)
    }

  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.log('Error en la solicitud.')
  }
}
async function getContrapartes() {
  try {
    const response = await fetch(URL + 'contrapartes', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      Contrapartes.value = await response.json()
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText)
    }

  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.log('Error en la solicitud.')
  }
}
async function getTribunales() {
  try {
    const response = await fetch(URL + 'tribunales', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      Tribunales.value = await response.json()
    } else {
      addAlert(3, 'Error en la respuesta.');
      console.error('Error en la respuesta:', response.statusText)
    }

  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.log('Error en la solicitud.')
  }
}

function searchTipoExpediente(value: any) {
  searchTermTipoExpediente.value = value;
}
function searchAbogado(value: any) {
  searchTermAbogado.value = value;
}
function searchCliente(value: any) {
  searchTermCliente.value = value;
}
function searchContraparte(value: any) {
  searchTermContraparte.value = value;
}
function searchTribunal(value: any) {
  searchTermTribunal.value = value;
}

function setTipoExpediente(obj: tipos_expedientes) {
  if (TipoExpedienteSelected !== undefined) {
    TipoExpedienteSelected.value.tipexp_tip = String(obj.tipexp_tip)
    TipoExpedienteSelected.value.descri_tip = obj.descri_tip
  }
  handleAccept();
}

function setAbogado(obj: abogados) {
  if (AbogadoSelected !== undefined) {
    AbogadoSelected.value.codabo_abo = String(obj.codabo_abo)
    AbogadoSelected.value.nombre_abo = obj.nombre_abo
  }
  handleAccept();
}

function setCliente(obj: clientes) {
  if (ClienteSelected !== undefined) {
    ClienteSelected.value.codcli_cli = String(obj.codcli_cli)
    ClienteSelected.value.nombre_cli = `${obj.nombre_cli} ${obj.apellido_cli}`
  }
  handleAccept();
}

function setContraparte(obj: contrapartes) {
  if (ContraparteSelected !== undefined) {
    ContraparteSelected.value.codcon_con = String(obj.codcon_con);
    ContraparteSelected.value.nombre_con = obj.nombre_con;
  }
  handleAccept();
}

function setTribunal(obj: tribunales) {
  if (TribunalSelected !== undefined) {
    TribunalSelected.value.codtri_tri = String(obj.codtri_tri);
    TribunalSelected.value.descri_tri = obj.descri_tri;
  }
  handleAccept();
}

function presentModal(type: number) {
  showModal.value = true
  TypeModal.value = type
}

function addAbogado(id: number, name: string) {
  try {
    if (AbogadosList.value.find(item => item.id === id)) {
      addAlert(1, 'Este abogado ya esta asignado a al expediente')
      return;
    }
    AbogadosList.value.push({ id: id, name: name })
    addAlert(1, 'Abogadado agregado la lista.')
    AbogadoSelected.value = { codabo_abo: '', nombre_abo: '' }
  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

function addCliente(id: number, name: string) {
  try {
    if (ClientesList.value.find(item => item.id === id)) {
      addAlert(1, 'Este cliente ya esta asignado al expediente')
      return;
    }
    ClientesList.value.push({ id: id, name: name })
    addAlert(1, 'Cliente agregado a la lista.')
    ClienteSelected.value = { codcli_cli: '', nombre_cli: '' }
  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

function addContraparte(id: number, name: string) {
  try {
    if (ContrapartesList.value.find(item => item.id === id)) {
      addAlert(1, 'Esta contraparte ya esta asignada al expediente')
      return;
    }
    ContrapartesList.value.push({ id: id, name: name })
    addAlert(1, 'Contraparte agregada a la lista.')
    ContraparteSelected.value = { codcon_con: '', nombre_con: '' }
  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

function addTribunal(id: number, name: string) {
  try {
    if (TribunalesList.value.find(item => item.id === id)) {
      addAlert(1, 'Este tribunal ya esta asignado al expediente.')
      return;
    }
    TribunalesList.value.push({ id: id, name: name })
    addAlert(1, 'Tribunal agregado a la lista.')
    TribunalSelected.value = { codtri_tri: '', descri_tri: '' }
  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

function selectAbogado(obj: any) {
  try {
    AbogadoSelected.value.codabo_abo = String(obj.id)
    AbogadoSelected.value.nombre_abo = obj.name
  } catch (error) {
    console.error(error)
  }
}

function selectCliente(obj: any) {
  try {
    ClienteSelected.value.codcli_cli = String(obj.id)
    ClienteSelected.value.nombre_cli = obj.name
  } catch (error) {
    console.error(error)
  }
}

function selectContraparte(obj: any) {
  try {
    ContraparteSelected.value.codcon_con = String(obj.id)
    ContraparteSelected.value.nombre_con = obj.name
  } catch (error) {
    console.error(error)
  }
}

function selectTribunal(obj: any) {
  try {
    TribunalSelected.value.codtri_tri = String(obj.id)
    TribunalSelected.value.descri_tri = obj.name
  } catch (error) {
    console.error(error)
  }
}


onMounted(() => {
  getTipoExpedientes()
  getAbogados()
  getClientes()
  getContrapartes()
  getTribunales()
})
</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Registrar Expedinte
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div>
        <div class="flex flex-col gap-6 mt-4 sm:grid-cols-2">
          <div>
            <div class="">
              <label class="text-gray-700" for="motivo_exp">Motivo</label>
              <input id="motivo_exp" type="text"
                class="w-full h-[5em] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
            </div>
          </div>
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <!-- esto son los tipos de expediente -->
            <div class="">
              <label class="text-gray-700" for="tipo_espcialidad_abo">Tipo de Expediente</label>
              <div class="flex gap-2 justify-center items-center">
                <input id="fecnac_abo" type="text" disabled
                  class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  v-model="TipoExpedienteSelected.tipexp_tip" readonly>

                <input id="fecnac_abo" type="text"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  v-model="TipoExpedienteSelected.descri_tip" readonly>

                <button @click="presentModal(1)" type="button"
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
            <!-- end -->

            <div>
              <label class="text-gray-700" for="fecini_exp">Fecha de Inicio</label>
              <input id="fecini_exp" type="date"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8" />
    <div class="flex flex-col mt-8 ">
      <div class="md:flex">
        <ul
          class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          <li>
            <div
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 1) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`"
              @click="ChageTaps(1)">
              Abogados
            </div>
          </li>
          <li>
            <div
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 2) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`"
              @click="ChageTaps(2)">
              Clientes
            </div>
          </li>
          <li>
            <div div
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 3) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`"
              @click="ChageTaps(3)">
              Contrapartes
            </div>
          </li>
          <li>
            <div div
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 4) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`"
              @click="ChageTaps(4)">
              Tribunales
            </div>
          </li>
        </ul>
        <div
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+(tap === 1) ? '' : 'hidden'}`">
          <!-- esto son los tipos de expediente -->
          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Abogado</label>
            <div class="flex gap-2 justify-center items-center">
              <input id="fecnac_abo" type="text" disabled
                class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="AbogadoSelected.codabo_abo" readonly>

              <input id="fecnac_abo" type="text"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="AbogadoSelected.nombre_abo" readonly>

              <button @click="presentModal(2)" type="button"
                class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>

              <button @click="addAbogado(parseInt(AbogadoSelected.codabo_abo), AbogadoSelected.nombre_abo)"
                class="flex mt-1 p-3  text-sm font-medium text-white bg-green-500 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span class="ml-2">Agregar</span>
              </button>

              <button
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
                        nombre
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, index) in AbogadosList" :key="index" class="hover:bg-gray-200" @dblclick="selectAbogado(value)">
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
        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+(tap === 2) ? '' : 'hidden'}`">
          <!-- esto son los tipos de expediente -->
          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Cliente</label>
            <div class="flex gap-2 justify-center items-center">
              <input id="fecnac_abo" type="text" disabled
                class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="ClienteSelected.codcli_cli" readonly>

              <input id="fecnac_abo" type="text"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="ClienteSelected.nombre_cli" readonly>

              <button @click="presentModal(3)" type="button"
                class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>

              <button @click="addCliente(parseInt(ClienteSelected.codcli_cli), ClienteSelected.nombre_cli)"
                class="flex mt-1 p-3  text-sm font-medium text-white bg-green-500 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span class="ml-2">Agregar</span>
              </button>

              <button
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
                    <tr v-for="(value, index) in ClientesList" :key="index" class="hover:bg-gray-200" @dblclick="selectCliente(value)">
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

        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full  ${+(tap === 3) ? '' : 'hidden'}`">
          <!-- esto son los tipos de expediente -->
          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Contraparte</label>
            <div class="flex gap-2 justify-center items-center">
              <input id="fecnac_abo" type="text" disabled
                class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="ContraparteSelected.codcon_con" readonly>

              <input id="fecnac_abo" type="text"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="ContraparteSelected.nombre_con" readonly>

              <button @click="presentModal(4)" type="button"
                class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>

              <button @click="addContraparte(parseInt(ContraparteSelected.codcon_con), ContraparteSelected.nombre_con)"
                class="flex mt-1 p-3  text-sm font-medium text-white bg-green-500 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span class="ml-2">Agregar</span>
              </button>

              <button
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
                    <tr v-for="(value, index) in ContrapartesList" :key="index" class="hover:bg-gray-200" @dblclick="selectContraparte(value)">
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
        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+(tap === 4) ? '' : 'hidden'}`">
          <!-- esto son los tipos de expediente -->
          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Tribunal</label>
            <div class="flex gap-2 justify-center items-center">
              <input id="fecnac_abo" type="text" disabled
                class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="TribunalSelected.codtri_tri" readonly>

              <input id="fecnac_abo" type="text"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                v-model="TribunalSelected.descri_tri" readonly>

              <button @click="presentModal(5)" type="button"
                class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>

              <button @click="addTribunal(parseInt(TribunalSelected.codtri_tri), TribunalSelected.descri_tri)"
                class="flex mt-1 p-3  text-sm font-medium text-white bg-green-500 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span class="ml-2">Agregar</span>
              </button>

              <button
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
                    <tr v-for="(value, index) in TribunalesList" :key="index" class="hover:bg-gray-200" @dblclick="selectTribunal(value)">
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
  </div>

  <Modal class="flex justify-center items-center" v-if="showModal" :title="TypeModalTittle[TypeModal - 1]" @close="handleClose"
    @accept="handleAccept" @decline="handleDecline" :btnVisible="false">
    <template #body>
      <div v-if="TypeModal === 1">
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTermTipoExpediente"
          @update="searchTipoExpediente" />
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
                    <tr v-for="(value) in filteredTipoExpediente" class="hover:bg-gray-200 cursor-pointer"
                      @click="setTipoExpediente(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.tipexp_tip }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.descri_tip }}
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
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTermAbogado" @update="searchAbogado" />
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
                    <tr v-for="(value) in filteredAbogado" class="hover:bg-gray-200 cursor-pointer"
                      @click="setAbogado(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codabo_abo }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.nombre_abo }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="TypeModal === 3">
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTermCliente" @update="searchCliente" />
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
                    <tr v-for="(value) in filteredCliente" class="hover:bg-gray-200 cursor-pointer"
                      @click="setCliente(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codcli_cli }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ `${value.nombre_cli} ${value.apellido_cli} ` }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="TypeModal === 4">
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTermContraparte" @update="searchContraparte" />
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
                    <tr v-for="(value) in filteredContraparte" class="hover:bg-gray-200 cursor-pointer"
                      @click="setContraparte(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codcon_con }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.nombre_con }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="TypeModal === 5">
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTermTribunal" @update="searchTribunal" />
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
                    <tr v-for="(value) in filteredTribunal" class="hover:bg-gray-200 cursor-pointer"
                      @click="setTribunal(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codtri_tri }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.descri_tri }}
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
