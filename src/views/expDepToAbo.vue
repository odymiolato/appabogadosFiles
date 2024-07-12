<script setup lang="ts">
import { ref } from 'vue'
import Label from '../components/label.vue';
import Inputs from '../components/Inputs.vue';

let tap = ref<number>(1);

import { useTableData } from '../composables/useTableData'

const {
  simpleTableData,
  paginatedTableData,
  wideTableData,
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
              class="inline-flex items-center px-4 py-3 text-white bg-sky-700  rounded-lg active w-full select-none"
              aria-current="page">
              <svg class="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              Expedientes
            </div>
          </li>
          <li>
            <div @click="ChageTaps(2)"
              class="text-gray-700 inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-white hover:bg-gray-100 w-full select-none">
              <svg class="w-4 h-4 me-2 text-gray-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 18 18">
                <path
                  d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              Documentos
            </div>
          </li>
          <li>
            <div div @click="ChageTaps(3)"
              class="text-gray-700 inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-white hover:bg-gray-100 w-full select-none">
              <svg class="w-4 h-4 me-2 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
              </svg>
              Movimientos
            </div>
          </li>
          <li>
            <div div @click="ChageTaps(4)"
              class="text-gray-700 inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-white hover:bg-gray-100 w-full select-none">
              <svg class="w-4 h-4 me-2 text-gray-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
                <path
                  d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
              </svg>
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
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full ${+ (tap === 2) ? '' : 'hidden'}`">
          <Inputs typeinput="search" labeltext="Buscar" />

          test 1
        </div>

        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full ${+ (tap === 3) ? '' : 'hidden'}`">
          test 2
        </div>

        <div id="tap-2"
          :class="`p-6 bg-white text-medium text-gray-500 rounded-lg w-full ${+ (tap === 4) ? '' : 'hidden'}`">
          test 3
        </div>

      </div>

    </div>
  </div>
</template>
