<script setup lang="ts">
import { callWithErrorHandling, computed, onMounted, ref } from 'vue'
import Modal from '../../components/Modal.vue'
import Inputs from '../../components/Inputs.vue'
import { expedientes, movimientos_h, tipo_movimientos } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'

class TableMovimientos {
  codexp: number;
  tipmov: number;
  nombreMov: string;
  monto: number

  constructor(codexp: number, tipmov: number, nombreMov: string, monto: number) {
    this.codexp = codexp;
    this.tipmov = tipmov;
    this.nombreMov = nombreMov;
    this.monto = monto
  }
}

const showModal = ref(false)
const MovimientoHeader = ref<movimientos_h>(new movimientos_h)
const TypeModal = ref<number>(0)
/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API
const TittleModal: Array<string> = ['Expedientes', 'Tipos de Movimientos'];
const ExpedientesList = ref<expedientes[]>([])
const TipoMovimientosList = ref<tipo_movimientos[]>([])
const searchTermExpedientes = ref('')
const searchTermTipoMovimientos = ref('')
const ExpedienteSelected = ref({ codexp_exp: '', descri_exp: '' })
const TipoMovimientoSelected = ref({ tipmov_tmo: '', descri_tmo: '' })
const Amont = ref<number>(0)
const TableMovList = ref<TableMovimientos[]>([])

const filteredExpedientes = computed(() => {
  if (searchTermExpedientes.value === '')
    return ExpedientesList.value

  return ExpedientesList.value.filter(item => String(item.codexp_exp).toLowerCase().includes(searchTermExpedientes.value.toLowerCase()) || item.descri_exp.toLowerCase().includes(searchTermExpedientes.value.toLowerCase()))
})

const filteredTipoMivimientos = computed(() => {
  if (searchTermTipoMovimientos.value === '')
    return TipoMovimientosList.value

  return TipoMovimientosList.value.filter(item => String(item.tipmov_tmo).toLowerCase().includes(searchTermTipoMovimientos.value.toLowerCase()) || item.descri_tmo.toLowerCase().includes(searchTermTipoMovimientos.value.toLowerCase()))
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

async function getExpedientes() {
  try {
    const response = await fetch(`${URL}expedientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok)
      ExpedientesList.value = await response.json()
    else
      addAlert(3, 'problemas con la solicitud de los Expedientes')
  }
  catch (error) {
    console.error(error)
    addAlert(3, 'Comunicarce con los administradores.')
  }
}
async function getTiposMovimientos() {
  try {
    const response = await fetch(`${URL}tipomovimientos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok)
      TipoMovimientosList.value = await response.json()
    else
      addAlert(3, 'problemas con la solicitud de los Tipos de movimientos')
  }
  catch (error) {
    console.error(error)
    addAlert(3, 'Comunicarce con los administradores.')
  }
}

function searchExpedientes(value: any) {
  searchTermExpedientes.value = value
}

function searchTipoMovimientos(value: any) {
  searchTermTipoMovimientos.value = value
}

function setExpediente(obj: expedientes) {
  if (ExpedienteSelected.value !== undefined) {
    ExpedienteSelected.value.codexp_exp = String(obj.codexp_exp)
    ExpedienteSelected.value.descri_exp = obj.descri_exp
  }
  handleAccept()
}

function setTipoMovimiento(obj: tipo_movimientos) {
  if (TipoMovimientoSelected.value !== undefined) {
    TipoMovimientoSelected.value.tipmov_tmo = String(obj.tipmov_tmo)
    TipoMovimientoSelected.value.descri_tmo = obj.descri_tmo
  }
  handleAccept()
}
function calculateAmont() {
  try {
    TableMovList.value.forEach((item) => {
      MovimientoHeader.value.total_movh += item.monto
    })

  } catch (error) {
    console.error(error)
    addAlert(3, JSON.stringify(error))
  }
}

function addMovimiento(codexp: string = '', tipmov: string = '', nombreMov: string = '', monto: number = 0) {
  try {
    if (codexp === '') {
      addAlert(1, 'Debe de seleccionar un Expediente.')
      return
    }

    if (tipmov === '') {
      addAlert(1, 'Debe de selecionar un tipo de movimiento.')
      return
    }

    if (monto <= 0) {
      addAlert(1, 'Debe de ingresar un monto mayor de 0.')
      return
    }

    const temp = new TableMovimientos(parseInt(codexp), parseInt(tipmov), nombreMov, monto)
    TableMovList.value.push(temp)
    ExpedienteSelected.value = { codexp_exp: '', descri_exp: '' }
    TipoMovimientoSelected.value = { tipmov_tmo: '', descri_tmo: '' }
    Amont.value = 0;
    calculateAmont()
    addAlert(2, 'Se ha agregado un elemento a la lista.')
  } catch (error) {
    console.error(error)
    addAlert(3, JSON.stringify(error))
  }
}

function selectMovimiento(obj: TableMovimientos) {
  try {
    ExpedienteSelected.value.codexp_exp = String(obj.codexp)
    TipoMovimientoSelected.value.tipmov_tmo = String(obj.tipmov)
    TipoMovimientoSelected.value.descri_tmo = obj.nombreMov
    Amont.value = obj.monto
    addAlert(1, 'Se ha seleccionado un elemento de la lista.')
  } catch (error) {
    console.error(error)
    addAlert(3, JSON.stringify(error))
  }
}

function removeMovimiento(codexp: number) {
  try {
    if (ExpedienteSelected.value.codexp_exp === '') {
      addAlert(1, 'Debe de seleccionar un expediente.')
      return
    }
    TableMovList.value = TableMovList.value.filter(item => item.codexp !== codexp)
    ExpedienteSelected.value = { codexp_exp: '', descri_exp: '' }
    TipoMovimientoSelected.value = { tipmov_tmo: '', descri_tmo: '' }
    Amont.value = 0;
    addAlert(2, 'Elemento Eliminado de la lista.')
  } catch (error) {
    console.error(error)
    addAlert(3, JSON.stringify(error))
  }
}


async function saveMovimiento() {
  try {
    let Movimiento: { header: movimientos_h, details: TableMovimientos[] } = { header: MovimientoHeader.value, details: TableMovList.value }

    const response = await fetch(`${URL}movimientos`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Movimiento)
    })
  } catch (error) {
    console.error(error)
    addAlert(3, JSON.stringify(error))
  }
}

onMounted(() => {
  getExpedientes()
  getTiposMovimientos()
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
              <input id="telefo_abo" v-model="MovimientoHeader.comentario_movh" type="text"
                class="w-full h-[6em] mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" for="celula_abo">Fecha</label>
              <input id="celula_abo" v-model="MovimientoHeader.fecha_movh" type="date"
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
            </div>

            <div>
              <label class="text-gray-700" for="email_abo">Total</label>
              <input id="email_abo" v-model="MovimientoHeader.total_movh" type="number" disabled
                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
            </div>
          </div>

        </div>

        <!-- <div class="flex justify-end mt-4">
          <button type="button"
            class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            @click="true">
            Guardar
          </button>
        </div> -->
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
                  readonly v-model="ExpedienteSelected.codexp_exp">

                <input id="fecnac_abo" type="text"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  readonly disabled v-model="ExpedienteSelected.descri_exp">

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
            <!-- block one -->

            <!-- block two -->
            <div class="flex-[50%]">
              <label class="text-gray-700" for="tipo_espcialidad_abo">Tipo de Movimiento</label>
              <div class="flex gap-2 justify-center items-center">
                <input id="fecnac_abo" type="text" disabled
                  class="w-[20%] mt-2 border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  readonly v-model="TipoMovimientoSelected.tipmov_tmo">

                <input id="fecnac_abo" type="text"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                  readonly disabled v-model="TipoMovimientoSelected.descri_tmo">

                <button @click="presentModal(2)" type="button"
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
              <label class="text-gray-700" for="tipo_espcialidad_abo">Monto</label>
              <div>
                <input id="fecnac_abo" type="number" v-model="Amont"
                  class="w-full mt-2 border-gray-200 text-right rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
              </div>
            </div>
            <!-- block tree -->

          </div>
          <div class="flex flex-row gap-1 flex-[10%] items-end">
            <button
              @click="addMovimiento(ExpedienteSelected.codexp_exp, TipoMovimientoSelected.tipmov_tmo, TipoMovimientoSelected.descri_tmo, Amont)"
              class="flex mt-1 p-3  text-sm font-medium text-white bg-green-500 rounded-lg border hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span class="ml-2">Agregar</span>
            </button>

            <button @click="removeMovimiento(parseInt(ExpedienteSelected.codexp_exp))"
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
                      Codigo Expediente
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Tipo Movimiento
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Nombre Movimiento
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, index) in TableMovList" :key="index" class="hover:bg-gray-200"
                    @dblclick="selectMovimiento(value)">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ value.codexp }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ value.tipmov }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ value.nombreMov }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ value.monto }}
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
    <div class="flex justify-end mt-4">
      <button type="button"
        class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        @click="saveMovimiento()">
        Guardar
      </button>
    </div>
  </div>

  <Modal v-if="showModal" class="flex justify-center items-center" :title="TittleModal[TypeModal - 1]"
    :btn-visible="false" @close="handleClose" @accept="handleAccept" @decline="handleDecline">
    <template #body>
      <div v-if="TypeModal === 1">
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTermExpedientes" @update="searchExpedientes" />
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
                    <tr v-for="(value) in filteredExpedientes" class="hover:bg-gray-200 cursor-pointer"
                      @click="setExpediente(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.codexp_exp }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.descri_exp }}
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
        <Inputs typeinput="search" labeltext="Buscar" :Value="searchTermTipoMovimientos"
          @update="searchTipoMovimientos" />
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
                    <tr v-for="(value) in filteredTipoMivimientos" class="hover:bg-gray-200 cursor-pointer"
                      @click="setTipoMovimiento(value)">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.tipmov_tmo }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ value.descri_tmo }}
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
