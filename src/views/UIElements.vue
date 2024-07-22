<script lang="ts" setup>
import { ref } from 'vue'
import Files from '../components/files.vue'
import Inputs from '../components/Inputs.vue'
import Buttons from '../components/Buttons.vue'
import Alerts from '../components/Alerts.vue'

import Modal from '../components/Modal.vue' // Asegúrate de ajustar la ruta si es necesario

const showModal = ref(false)

function handleAccept() {
  console.log('Accepted')
  showModal.value = false
}

function handleDecline() {
  console.log('Declined')
  showModal.value = false
}

function handleClose() {
  showModal.value = false
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      UI Elements
    </h3>

    <!-- Alerts -->
    <div class="mt-4">
      <h4 class="text-gray-600">
        Alerts
      </h4>
      <div class="mt-4">
        <div class="px-4 py-4 overflow-x-auto bg-white rounded-md whitespace-nowrap">
          <Alerts :type-alert="1" />
          <Alerts :type-alert="2" />
          <Alerts :type-alert="3" />
          <Alerts :type-alert="4" />
        </div>
      </div>
    </div>

    <!-- Inputs -->
    <div class="mt-8">
      <h4 class="text-gray-600">
        Inputs
      </h4>

      <div class="mt-4">
        <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
          <Inputs typeinput="Radio" labeltext="Radio" />
          <Inputs typeinput="Checkbox" labeltext="Checkbox" />
          <Inputs typeinput="email" />
          <Inputs typeinput="text" />
          <Inputs typeinput="Search" />
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-8">
      <h4 class="text-gray-600">
        Buttons
      </h4>

      <div class="mt-4">
        <div class="flex px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
          <Buttons />
        </div>
      </div>
    </div>

    <!-- Paginations -->
    <div class="mt-8">
      <h4 class="text-gray-600">
        Paginations
      </h4>

      <div class="mt-4">
        <div class="flex px-4 py-4 overflow-x-auto bg-white rounded-md">
          <div class="flex mr-4 rounded">
            <a
              href="#"
              class="px-3 py-2 ml-0 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-indigo-500 hover:text-white"
            ><span>Previous</span></a>
            <a
              href="#"
              class="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
            ><span>1</span></a>
            <a
              href="#"
              class="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
            ><span>2</span></a>
            <a
              href="#"
              class="px-3 py-2 leading-tight text-indigo-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
            ><span>3</span></a>
            <a
              href="#"
              class="px-3 py-2 leading-tight text-indigo-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white"
            ><span>Next</span></a>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <Files path="http://localhost/appabogadosFiles/" />
    </div>

    <!-- Modal Button -->
    <div class="mt-8">
      <button
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
        @click="showModal = true"
      >
        Toggle modal
      </button>
    </div>

    <!-- Modal Component -->
    <Modal v-if="showModal" class="flex justify-center items-center" title="Modal Title" @close="handleClose" @accept="handleAccept" @decline="handleDecline">
      <template #body>
        <p class="text-base leading-relaxed text-gray-500">
          Custom modal body content.
        </p>
      </template>
    </Modal>
  </div>
</template>
