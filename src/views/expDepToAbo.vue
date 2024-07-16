<script setup lang="ts">
import { ref } from 'vue'
import Label from '../components/label.vue';
import Inputs from '../components/Inputs.vue';
import Files from '../components/files.vue';

let tap = ref<number>(1);

import { useTableData } from '../composables/useTableData'

const {
  simpleTableData
} = useTableData()

function ChageTaps(value: number) {
  tap.value = value;
}

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
                  <tr v-for="(i, index) in simpleTableData" :key="index" class="hover:bg-gray-200">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                      {{ i.city }}
                    </td>
                    <td class="px-6 py-4 text-gray-500 border-b">
                      {{ i.totalOrders }}
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
              <Label labeltext="1500" labelclass="" />
            </div>
            <div>
              <Label labeltext="Fecha:   " labelclass="font-bold" />
              <Label labeltext="10/10/2024" labelclass="" />
            </div>
            <div>
              <Label labeltext="Cliente:   " labelclass="font-bold" />
              <Label labeltext="Joselito Perla Negra" labelclass="" />
            </div>
            <div>
              <Label labeltext="Contraparte:  " labelclass="font-bold" />
              <Label labeltext="Joselito Perla Negra" labelclass="" />
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
            <div @click="ChageTaps(1)"
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 1) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`">
              Expedientes
            </div>
          </li>
          <li>
            <div @click="ChageTaps(2)"
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 2) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`">
              Documentos
            </div>
          </li>
          <li>
            <div div @click="ChageTaps(3)"
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 3) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`">
              Movimientos
            </div>
          </li>
          <li>
            <div div @click="ChageTaps(4)"
              :class="`inline-flex justify-center items-center px-4 py-3 rounded-lg active w-full select-none cursor-pointer ${(tap === 4) ? 'text-white bg-sky-700 ' : 'hover:text-gray-900 bg-white hover:bg-gray-100 w-full text-gray-700'}`">
              Seguimiento
            </div>
          </li>
        </ul>
        <div
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+ (tap === 1) ? '' : 'hidden'}`">
          <Inputs typeinput="search" labeltext="Buscar" />
          <div class="my-6 rounded-md shadow bg-white h-[17.9em] max-h-[17.9em] overflow-auto">
            <table class="w-full text-left border-collapse">
              <thead class="sticky top-0">
                <tr>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Cliente
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Numero Expediente
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Fecha
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Estado
                  </th>
                  <th
                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                    Contraparte
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
        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+ (tap === 2) ? '' : 'hidden'}`">
          <Files  path = '/abogadosfiles/exp01'/>
        </div>

        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full  ${+ (tap === 3) ? '' : 'hidden'}`">
          <Inputs typeinput="search" labeltext="Buscar" />
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
            <div class="flex flex-row gap-5">
              <div class="flex-[60%] flex flex-col gap-4 py-5">
                <div class="class-form-total p-6 rounded-md shadow">
                  <h2 class="text-xl tesxt-lg font-semibold text-gray-700 capitalize">
                    Totales de los Movimientos
                  </h2>

                  <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <h3 class="font-bold" for="username">Honorarios</h3>
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
                      <h3 class="font-bold" for="username">Judiciales</h3>
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
                      <h3 class="font-bold" for="username">Operacionales</h3>
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
                      <h3 class="font-bold" for="username">Terceros</h3>
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
                <div class="flex-[60%] flex flex-col gap-4 py-5">
                  <div class="class-form-total p-6 rounded-md shadow ">
                    <h2 class="text-xl tesxt-lg font-semibold text-gray-700 capitalize">
                      Balance Generales
                    </h2>
                    <div class="grid grid-cols-[100px,1fr] items-center mt-3 gap-3">
                      <label class="">Creditos:</label>
                      <Inputs typeinput="text" :isReadonly="true" />

                      <label class="">Debitos:</label>
                      <Inputs typeinput="text" :isReadonly="true" />

                      <label class="">Balace:</label>
                      <Inputs typeinput="text" :isReadonly="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full h-[27em] max-h-[27em] ${+ (tap === 4) ? '' : 'hidden'}`">
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