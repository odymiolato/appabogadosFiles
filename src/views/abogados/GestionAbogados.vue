<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Modal from '../../components/Modal.vue'
import Inputs from '../../components/Inputs.vue'
import type { ciudades, especialidades, provincias } from '../../class/all.class'
import { abogados, direcciones } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'

// import Dropdown from '../../components/dropdown2.vue';

const showModal = ref(false)
const Abogado = ref<abogados>(new abogados())
const Direccion = ref<direcciones>(new direcciones())
const TypeModal = ref<number>(0)
const ShowCities = ref<boolean>(false)
/* @ts-expect-error */
const URL: string = import.meta.env.VITE_PATH_API

function handleAccept() {
  console.log('Accepted')
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

const searchTerm = ref('')

const especialidadesList = ref<especialidades[]>([])
const provinciasList = ref<provincias[]>([])
const ciudadesList = ref<ciudades[]>([])

async function GetEspecialidades() {
  try {
    const response = await fetch(`${URL}especialidades`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok)
      especialidadesList.value = await response.json()
    else
      addAlert(3, 'problemas con la solicitud de las Provincias')
  }
  catch (error) {
    console.error(error)
    addAlert(3, 'Comunicarce con los administradores.')
  }
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

async function getCiudades() {
  try {
    const response = await fetch(`${URL}ciudades/provincia/${provinciaSelected.value.codpro_pro}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      ciudadesList.value = await response.json()
      console.log(ciudadesList.value)
    }
    else {
      addAlert(3, 'problemas con la solicitud de las ciudades')
    }
  }
  catch (error) {
    console.error(error)
    addAlert(3, 'Comunicarce con los administradores.')
  }
}

const filteredEspecialidades = computed(() => {
  if (searchTerm.value === '')
    return especialidadesList.value

  return especialidadesList.value.filter(item => String(item.tipesp_tip).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.descri_tip.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

function searchEspecilidades(value: any) {
  searchTerm.value = value
}

const filteredProvincias = computed(() => {
  if (searchTerm.value === '')
    return provinciasList.value

  return provinciasList.value.filter(item => String(item.codpro_pro).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.nombre_pro.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

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

const especialidadSelected = ref({ tipesp_tip: '', descri_tip: '' })
const provinciaSelected = ref({ codpro_pro: '', nombre_pro: '' })
const ciuadadSelected = ref({ codciu_ciu: '', nombre_ciu: '' })

function setEspecialidad(obj: especialidades) {
  if (especialidadSelected.value !== undefined) {
    especialidadSelected.value.tipesp_tip = String(obj.tipesp_tip)
    especialidadSelected.value.descri_tip = obj.descri_tip
  }
  handleAccept()
}

function setProvincia(obj: provincias) {
  if (provinciaSelected.value !== undefined) {
    provinciaSelected.value.codpro_pro = String(obj.codpro_pro)
    provinciaSelected.value.nombre_pro = obj.nombre_pro
    getCiudades()
    ShowCities.value = true
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

async function saveAbogado() {
  // Asegúrate de que los valores numéricos estén correctamente parseados
  Abogado.value.tipo_espcialidad_abo = Number.parseInt(especialidadSelected.value.tipesp_tip)
  Abogado.value.estado_abo = 'A'

  Direccion.value.codciu_dir = Number.parseInt(provinciaSelected.value.codpro_pro)
  Direccion.value.codciu_dir = Number.parseInt(ciuadadSelected.value.codciu_ciu)

  const requestBody = { information: Abogado.value, direccion: Direccion.value }

  console.info('Datos enviados:', requestBody)

  try {
    const response = await fetch(`${URL}abogados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (response.ok) {
      console.info('Abogado registrado exitosamente')
      addAlert(2, 'Abogado registrado exitosamente.')
    }
    else {
      console.error('Error en la respuesta del servidor:', response.statusText)
      addAlert(3, 'Problemas al registrar el abogado.')
    }
  }
  catch (error) {
    console.error('Error en la solicitud:', error)
    addAlert(3, 'Comunicarce con los administradores.')
  }
}

onMounted(() => {
  GetEspecialidades()
  getProvincias()
})
</script>

<template>
  <div class="mt-4">
    <h3 class="text-3xl font-medium text-gray-700">
      Gestion de Abogados
    </h3>
    <div class="mt-4 p-6 bg-white rounded-md shadow-md">
      <h3>
        Informacion General
      </h3>
      <div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="nombre_abo">Nombre</label>
            <input
              id="nombre_abo" v-model="Abogado.nombre_abo"
              type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>

          <div>
            <label class="text-gray-700" for="telefo_abo">Teléfono</label>
            <input
              id="telefo_abo" v-model="Abogado.telefo_abo"
              type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>

          <div>
            <label class="text-gray-700" for="celula_abo">Cédula</label>
            <input
              id="celula_abo" v-model="Abogado.celula_abo"
              type="text"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>

          <div class="">
            <label class="text-gray-700" for="tipo_espcialidad_abo">Especialidad</label>
            <div class="flex gap-2 justify-center items-center">
              <input
                id="fecnac_abo" v-model="especialidadSelected.tipesp_tip" type="text"
                disabled
                class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500" readonly
              >

              <input
                id="fecnac_abo" v-model="especialidadSelected.descri_tip"
                type="text"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500" readonly
              >

              <button
                type="button" class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                @click="presentModal(1)"
              >
                <svg
                  class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </div>
          </div>
          <div>
            <label class="text-gray-700" for="fecnac_abo">Fecha de Nacimiento</label>
            <input
              id="fecnac_abo" v-model="Abogado.fecnac_abo"
              type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>

          <div>
            <label class="text-gray-700" for="email_abo">Correo Electrónico</label>
            <input
              id="email_abo" v-model="Abogado.email_abo"
              type="email"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>

          <div>
            <label class="text-gray-700" for="fecini_abo">Fecha de Inicio</label>
            <input
              id="fecini_abo" v-model="Abogado.fecini_abo"
              type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>
        </div>

        <h3 class="mt-5">
          Informacion de ubicacion
        </h3>

        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
            <div>
              <label class="text-gray-700" for="email_abo">Dirección</label>
              <input
                id="email_abo" v-model="Direccion.direccion_dir"
                type="email"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
              >
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="">
                <label class="text-gray-700" for="tipo_espcialidad_abo">Provincias</label>
                <div class="flex gap-2 justify-center items-center">
                  <input
                    id="fecnac_abo" v-model="provinciaSelected.codpro_pro" type="text"
                    disabled
                    class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500" readonly
                  >

                  <input
                    id="fecnac_abo" v-model="provinciaSelected.nombre_pro"
                    type="text"
                    class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500" readonly disabled
                  >

                  <button
                    type="button" class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    @click="presentModal(2)"
                  >
                    <svg
                      class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                  <!-- <Dropdown labalItemNoselected="Codigo Postal" /> -->
                </div>
              </div>
              <div v-show="ShowCities" class="">
                <label class="text-gray-700" for="tipo_espcialidad_abo">Ciudad</label>
                <div class="flex gap-2 justify-center items-center">
                  <input
                    id="fecnac_abo" v-model="ciuadadSelected.codciu_ciu" type="text"
                    disabled
                    class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500" readonly
                  >

                  <input
                    id="fecnac_abo" v-model="ciuadadSelected.nombre_ciu"
                    type="text"
                    class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500" readonly disabled
                  >

                  <button
                    type="button" class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    @click="presentModal(3)"
                  >
                    <svg
                      class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                  <!-- <Dropdown labalItemNoselected="Codigo Postal" /> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            type="button" class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="saveAbogado()"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>

  <Modal
    v-if="showModal" class="flex justify-center items-center" title="Especialidades" :btn-visible="false"
    @close="handleClose" @accept="handleAccept" @decline="handleDecline"
  >
    <template #body>
      <div v-if="TypeModal === 1">
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
                    <tr
                      v-for="(value) in filteredEspecialidades" class="hover:bg-gray-200 cursor-pointer"
                      @click="setEspecialidad(value)"
                    >
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
      </div>

      <div v-if="TypeModal === 2">
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
                    <tr
                      v-for="(value) in filteredProvincias" class="hover:bg-gray-200 cursor-pointer"
                      @click="setProvincia(value)"
                    >
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codpro_pro }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.nombre_pro }}
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
      </div>

      <div v-if="TypeModal === 3">
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
                    <tr
                      v-for="(value) in filteredCiudades" class="hover:bg-gray-200 cursor-pointer"
                      @click="setCiudad(value)"
                    >
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codciu_ciu }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.nombre_ciu }}
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
