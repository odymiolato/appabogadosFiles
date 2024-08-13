<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Label from '../components/label.vue'
import Inputs from '../components/Inputs.vue'
import Files from '../components/files.vue'

import { useTableData } from '../composables/useTableData'
import { expedientes, tipos_expedientes } from '../class/all.class'

class movimientos {
  codmov_movh: number;
  descri_tmo: string;
  fecha_movh: Date | null;
  Debito: number;
  Credito: number;
  constructor() {
    this.codmov_movh = 0;
    this.descri_tmo = '';
    this.fecha_movh = null;
    this.Debito = 0;
    this.Credito = 0;
  }
}

const tap = ref<number>(1)
const tiposexpedientesLits = ref<tipos_expedientes[]>([])
const ExpedientesLits = ref<expedientes[]>([])
const ExpedienteSelected = ref<expedientes>(new expedientes)
const MovimientosList = ref<movimientos[]>([]);
const Debito = ref<number>(0)
const Credito = ref<number>(0)
/* @ts-expect-error */
const URL: string = import.meta.env.VITE_PATH_API


const {
  simpleTableData,
} = useTableData()

function ChageTaps(value: number) {
  tap.value = value
}

async function GetTipoExpediente() {
  try {
    const response = await fetch(`${URL}tiposexpedientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los tipos de expedientes');
    }

    tiposexpedientesLits.value = await response.json();
    GetTipoExpedienteById(tiposexpedientesLits.value[0].tipexp_tip)
  } catch (error) {
    console.error(error);
  }
}

async function GetTipoExpedienteById(id: number) {
  try {
    const response = await fetch(`${URL}expedientes/tipoexpediente/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el tipo de expediente');
    }

    ExpedientesLits.value = await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function GetMovimientosById(id: number) {
  try {
    const response = await fetch(`${URL}expedientes/movimientos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los movimientos');
    }

    MovimientosList.value = await response.json();
    CalculateTotals();
  } catch (error) {
    console.error(error);
  }
}

function CalculateTotals() {
  if (!ExpedienteSelected) {
    Debito.value = 0
    Credito.value = 0
    return;
  }

  MovimientosList.value.forEach((item) => {
    Debito.value += item.Debito
    Credito.value += item.Credito
  })

}

function SelectExpediente(selected: expedientes) {
  ExpedienteSelected.value = selected
  GetMovimientosById(selected.codexp_exp)

}

onMounted(() => {
  GetTipoExpediente()
})
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Control de Expedintes
    </h3>

    <div class="mt-4">
      <div class="grid grid-cols-2 -mx-6">
        <div class="w-full  px-6 mt-6">
          <div class="flex items-center bg-white rounded-md shadow-sm h-[180px] max-h-[180px]">
            <div class="w-full bg-white rounded-md shadow  overflow-auto h-[180px] max-h-[180px]">
              <table class="w-full text-left border-collapse">
                <thead class="top-0 sticky">
                  <tr>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Codigo
                    </th>
                    <th
                      class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Departamento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(i, index) in tiposexpedientesLits" :key="index" class="hover:bg-gray-200"
                    @click="GetTipoExpedienteById(i.tipexp_tip)">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ i.tipexp_tip }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ i.descri_tip }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="w-full px-6 mt-6">
          <div class="flex flex-col px-5 py-6 gap-3 bg-white rounded-md shadow-sm h-[180px]">
            <div>
              <Label labeltext="Numero de Expediente:  " labelclass="font-bold" />

              <Label :labeltext="String(ExpedienteSelected.codexp_exp)" labelclass="" />
            </div>
            <div>
              <Label labeltext="Fecha Inicio:   " labelclass="font-bold" />
              <Label :labeltext="String(ExpedienteSelected.fecini_exp)" labelclass="" />
            </div>
            <div>
              <Label labeltext="Fecha Fin:   " labelclass="font-bold" />
              <Label
                :labeltext="String((ExpedienteSelected.fecfin_exp !== null) ? ExpedienteSelected.fecfin_exp : 'Este espediente no se ha finalizado.')"
                labelclass="" />
            </div>
          </div>
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
              Expedientes
            </div>
          </li>
          <li>
            <div
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 2) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`"
              @click="ChageTaps(2)">
              Documentos
            </div>
          </li>
          <li>
            <div div
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 3) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`"
              @click="ChageTaps(3)">
              Movimientos
            </div>
          </li>
          <li>
            <div div
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 4) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`"
              @click="ChageTaps(4)">
              Seguimiento
            </div>
          </li>
        </ul>
        <div
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+(tap === 1) ? '' : 'hidden'}`">
          <Inputs typeinput="search" labeltext="Buscar" />
          <div class="my-6 rounded-md shadow bg-white h-[17.9em] max-h-[17.9em] overflow-auto">
            <table class="w-full text-left border-collapse">
              <thead class="sticky top-0">
                <tr>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Numero Expediente
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Descripción
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Fecha Inicio
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Fecha Fin
                  </th>

                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in ExpedientesLits" :key="index" class="hover:bg-gray-200"
                  @click="SelectExpediente(i)">
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ i.codexp_exp }}
                  </td>
                  <td class="px-6 py-4 text-gray-500 border-b">
                    {{ i.descri_exp }}
                  </td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ i.fecini_exp }}
                  </td>
                  <td class="px-6 py-4 text-gray-500 border-b">
                    {{ (i.fecfin_exp !== null) ? i.fecfin_exp : 'Este espediente no se ha finalizado.' }}
                  </td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ (i.estatu_exp === 'A') ? 'Activo' : 'Inactivo' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+(tap === 2) ? '' : 'hidden'}`">
          <Files v-if="ExpedienteSelected.ubi_exp !== ''" :path="ExpedienteSelected.ubi_exp" />
          <Files v-if="ExpedienteSelected.ubi_exp === ''" path="" />
        </div>

        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full  ${+(tap === 3) ? '' : 'hidden'}`">
          <!-- <Inputs typeinput="search" labeltext="Buscar" /> -->
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
                        tipo
                      </th>
                      <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Fecha
                      </th>
                      <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Debito
                      </th>
                      <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Credito
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(i, index) in MovimientosList" :key="index" class="hover:bg-gray-200">
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ i.codmov_movh }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 border-b">
                        {{ i.descri_tmo }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ i.fecha_movh }}
                      </td>
                      <td class="px-6 py-4 text-gray-500 border-b">
                        {{ i.Debito }}
                      </td>
                      <td class="px-6 py-4 text-lg text-gray-700 border-b">
                        {{ i.Credito }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="flex flex-row gap-5">
              <div class="flex-[60%] flex flex-col gap-4 py-5">
                <div class="class-form-total p-6 rounded-md shadow">
                  <h2 class="text-xl tesxt-lg font-semibold text-gray-700 capitalize">
                    Totales de los Movimientos
                  </h2>

                  <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <h3 class="font-bold" for="username">
                        Honorarios
                      </h3>
                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center"
                        for="username">
                        <Strong>Ingresos:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>

                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center "
                        for="username">
                        <Strong>Gastos:</Strong>
                        <input
                          class="text-end w-48 mt-2 font-normal border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>

                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center"
                        for="username">
                        <Strong>Total:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>
                    </div>

                    <div>
                      <h3 class="font-bold" for="username">
                        Judiciales
                      </h3>
                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center"
                        for="username">
                        <Strong>Ingresos:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>

                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center "
                        for="username">
                        <Strong>Gastos:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>

                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center"
                        for="username">
                        <Strong>Total:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>
                    </div>

                    <div>
                      <h3 class="font-bold" for="username">
                        Operacionales
                      </h3>
                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center"
                        for="username">
                        <Strong>Ingresos:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>

                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center "
                        for="username">
                        <Strong>Gastos:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>

                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center"
                        for="username">
                        <Strong>Total:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>
                    </div>

                    <div>
                      <h3 class="font-bold" for="username">
                        Terceros
                      </h3>
                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center"
                        for="username">
                        <Strong>Ingresos:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>

                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center "
                        for="username">
                        <Strong>Gastos:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>

                      <label class="text-gray-500 font-light text-base grid grid-cols-[100px,1fr] items-center"
                        for="username">
                        <Strong>Total:</Strong>
                        <input
                          class="text-end w-48 mt-2 border-gray-200 font-normal rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                          type="text" value="1500.00" readonly>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-[40%]">
                <div class="flex-[60%] flex flex-col gap-4 py-5 h-full">
                  <div class="class-form-total p-6 rounded-md shadow h-full">
                    <h2 class="text-xl tesxt-lg font-semibold text-gray-700 capitalize">
                      Balance Generales
                    </h2>
                    <div class="grid grid-cols-[100px,1fr] items-center mt-3 gap-3">
                      <label class="">Creditos:</label>
                      <Inputs typeinput="text" inputClass="text-end" :Value="String(Credito)" :is-readonly="true" />

                      <label class="">Debitos:</label>
                      <Inputs typeinput="text" inputClass="text-end" :Value="String(Debito)" :is-readonly="true" />

                      <label class="">Balace:</label>
                      <Inputs typeinput="text" inputClass="text-end" :Value="String((Credito - Debito))" :is-readonly="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+(tap === 4) ? '' : 'hidden'}`">
          <Inputs typeinput="search" labeltext="Buscar" />
          <div class="my-6 rounded-md shadow bg-white h-[17.9em] max-h-[17.9em] overflow-auto">
            <table class="w-full text-left border-collapse">
              <thead class="sticky top-0">
                <tr>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Codigo
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Fecha
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Usuario
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(i, index) in simpleTableData" :key="index" class="hover:bg-gray-200">
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ i.city }}
                  </td>
                  <td class="px-6 py-4 text-gray-500 border-b">
                    {{ i.totalOrders }}
                  </td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ i.city }}
                  </td>
                </tr>
                <tr v-for="(i, index) in simpleTableData" :key="index" class="hover:bg-gray-200">
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ i.city }}
                  </td>
                  <td class="px-6 py-4 text-gray-500 border-b">
                    {{ i.totalOrders }}
                  </td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ i.city }}
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

<style scoped></style>
