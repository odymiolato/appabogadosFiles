<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { addAlert } from '../../stores/alerts'
import type { abogados, expedientes, tribunales } from '../../class/all.class'
import { AudienciaDetalle, audiencias } from '../../class/all.class'
import ModalReutilizable from '../../components/ModalReutilizable.vue'

const AudienciaHeader = ref<audiencias>(new audiencias())
const Abogados = ref<abogados[]>([])
const AbogadosList = ref<{ id: number; name: string }[]>([])

const showModalTribunal = ref(false)
const showModalExpediente = ref(false)
const showModalAbogado = ref(false)

/* @ts-expect-error */

const URL: string = import.meta.env.VITE_PATH_API
const ExpedienteSelected = ref({ codexp_exp: '', descri_exp: '' })
const AbogadoSelected = ref({ codabo_abo: '', nombre_abo: '' })
const TribunalSelected = ref({ codtri_tri: '', descri_tri: '' })

function validate(): boolean {
  if (AbogadosList.value.length <= 0)
    return false

  if (TribunalSelected.value === undefined || TribunalSelected.value.codtri_tri === '' || TribunalSelected.value.descri_tri === '')
    return false

  if (ExpedienteSelected.value === undefined || ExpedienteSelected.value.codexp_exp === '' || ExpedienteSelected.value.descri_exp === '')
    return false

  return true
}

async function getAbogados() {
  try {
    const response = await fetch(`${URL}abogados`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      Abogados.value = await response.json()
    }
    else {
      addAlert(3, 'Error en la respuesta.')
      console.error('Error en la respuesta:', response.statusText)
    }
  }
  catch (error) {
    addAlert(3, JSON.stringify(error))
    console.log('Error en la solicitud.')
  }
}

function addAbogado(id: number, name: string) {
  try {
    if (AbogadoSelected.value.codabo_abo === '') {
      addAlert(1, 'Debes de selecionar un Abogado.')
      return
    }

    if (AbogadosList.value.find(item => item.id === id)) {
      addAlert(1, 'Este abogado ya esta asignado a la audiencia')
      return
    }
    AbogadosList.value.push({ id, name })
    addAlert(1, 'Abogadado agregado la lista.')
    AbogadoSelected.value = { codabo_abo: '', nombre_abo: '' }
  }
  catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

function selectAbogado(obj: any) {
  try {
    AbogadoSelected.value.codabo_abo = String(obj.id)
    AbogadoSelected.value.nombre_abo = obj.name
  }
  catch (error) {
    console.error(error)
  }
}

function removeAbogado(id: string = '') {
  try {
    if (id === '') {
      addAlert(1, 'Debe de selecionar un Abogado.')
      return
    }
    AbogadosList.value = AbogadosList.value.filter(item => item.id !== Number.parseInt(id))
    addAlert(1, 'Abogado eliminado de la lista.')
    AbogadoSelected.value = { codabo_abo: '', nombre_abo: '' }
  }
  catch (error) {
    console.error(error)
  }
}

async function saveAudiencia() {
  try {
    if (!validate())
      return

    AudienciaHeader.value.codtri_aud = Number(TribunalSelected.value.codtri_tri)
    AudienciaHeader.value.numexp_aud = Number(ExpedienteSelected.value.codexp_exp)

    const audiencia = {
      header: AudienciaHeader.value,
      detail: new AudienciaDetalle(
        AbogadosList.value,
      ),
    }

    const response = await fetch(`${URL}audiencias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(audiencia),

    })

    if (response.ok) {
      if (await response.json())
        addAlert(2, 'Audiencia registrada')
      else
        addAlert(3, '')
    }
    else {
      addAlert(3, response.statusText)
      console.error(response.statusText)
    }
  }
  catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

onMounted(() => {
  getAbogados()
})

function handleTribunalSelected(tribunal: tribunales) {
  TribunalSelected.value = { codtri_tri: String(tribunal.codtri_tri), descri_tri: tribunal.descri_tri }
}

function handleExpedienteSelected(expediente: expedientes) {
  ExpedienteSelected.value = { codexp_exp: String(expediente.codexp_exp), descri_exp: expediente.descri_exp }
}

function handleAbogadoSelected(abogado: abogados) {
  AbogadoSelected.value = { codabo_abo: String(abogado.codabo_abo), nombre_abo: abogado.nombre_abo }
}
</script>

<template>
  <h3 class="text-3xl font-medium text-gray-700">
    Gestionar audiencias
  </h3>

  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <div>
        <!-- aqui estan todos los inputs de audiencia -->

        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div class="col-span-2">
            <label class="text-gray-700" for="motivo_exp">Descripción</label>
            <input
              id="motivo_exp" v-model="AudienciaHeader.descri_aud"
              type="text"
              class="w-full h-[5em] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>

          <div>
            <label class="text-gray-700" for="fecini_abo">Fecha de la audiencias</label>
            <input
              id="fecini_abo" v-model="AudienciaHeader.fecha_aud"
              type="date"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>
          <div>
            <label class="text-gray-700" for="hora_aud">Hora de la audiencia</label>
            <input
              id="hora_aud" v-model="AudienciaHeader.hora_aud"
              type="time"
              class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
            >
          </div>

          <div>
            <label class="text-gray-700" for="tipo-interaccion">Expediente</label>
            <div class="flex gap-2 justify-center items-center">
              <input
                id="tipo-interaccion-codigo" v-model="ExpedienteSelected.codexp_exp"
                type="text"
                disabled
                class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                readonly
              >
              <input
                id="tipo-interaccion-nombre" v-model="ExpedienteSelected.descri_exp"
                type="text"
                disabled
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                readonly
              >
              <button
                type="button"
                class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                @click="showModalExpediente = true"
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
            <label class="text-gray-700" for="tipo-interaccion">Tribunal</label>
            <div class="flex gap-2 justify-center items-center">
              <input
                id="tipo-interaccion-codigo" v-model="TribunalSelected.codtri_tri"
                type="text"
                disabled
                class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                readonly
              >
              <input
                id="tipo-interaccion-nombre" v-model="TribunalSelected.descri_tri"
                type="text"
                disabled
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                readonly
              >
              <button
                type="button"
                class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                @click="showModalTribunal = true"
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

          <div class="flex justify-end mt-4 col-start-2">
            <button
              type="button" class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              @click="saveAudiencia"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 pb-6 bg-white rounded-md shadow-md ">
      <div class="flex flex-col mt-8 ">
        <div class="pt-3">
          <div>
            <!-- esto son los abogados -->
            <div class="flex">
              <div>
                <label class="text-gray-700" for="tipo-interaccion">Abogado</label>
                <div class="flex gap-2 justify-center items-center">
                  <input
                    id="tipo-interaccion-codigo" v-model="AbogadoSelected.codabo_abo"
                    type="text"
                    disabled
                    class="w-[20%] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                    readonly
                  >
                  <input
                    id="tipo-interaccion-nombre" v-model="AbogadoSelected.nombre_abo"
                    type="text"
                    disabled
                    class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                    readonly
                  >
                  <button
                    type="button"
                    class="mt-1 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    @click="showModalAbogado = true"
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

                  <button
                    class="flex mt-1 p-3  text-sm font-medium text-white bg-green-500 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
                    @click="addAbogado(parseInt(AbogadoSelected.codabo_abo), AbogadoSelected.nombre_abo)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="ml-2">Agregar</span>
                  </button>

                  <button
                    class="flex mt-1 p-3  text-sm font-medium text-white bg-red-500 rounded-lg border hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
                    @click="removeAbogado(AbogadoSelected.codabo_abo)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span class="ml-2">Eliminar</span>
                  </button>
                </div>
              </div>
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
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                      >
                        Codigo
                      </th>
                      <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                      >
                        nombre
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(value, index) in AbogadosList" :key="index" class="hover:bg-gray-200"
                      @dblclick="selectAbogado(value)"
                    >
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
    <ModalReutilizable
      v-model:showModal="showModalTribunal"
      modal-title="Tribunales"
      endpoint="/tribunales"
      code-field="codtri_tri"
      name-field="descri_tri"
      @selected="handleTribunalSelected"
    />
    <ModalReutilizable
      v-model:showModal="showModalExpediente"
      modal-title="Expedientes"
      endpoint="/expedientes"
      code-field="codexp_exp"
      name-field="descri_exp"
      @selected="handleExpedienteSelected"
    />
    <ModalReutilizable
      v-model:showModal="showModalAbogado"
      modal-title="Abogados"
      endpoint="/abogados"
      code-field="codabo_abo"
      name-field="nombre_abo"
      @selected="handleAbogadoSelected"
    />
  </div>
</template>
