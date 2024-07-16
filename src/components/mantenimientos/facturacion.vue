<!-- src/views/SomeView.vue -->
<script setup>
import { ref } from 'vue'
import ModalBuscar from './modal.vue'

const isModalOpen = ref(false)
const modalTitle = ref('')
const currentEndpoint = ref('')

const nombre = ref('')

function openModal(type) {
  if (type === 'users') {
    modalTitle.value = 'Usuarios'
    currentEndpoint.value = 'https://tu-api.com/users'
  }
  else if (type === 'products') {
    modalTitle.value = 'Productos'
    currentEndpoint.value = 'https://tu-api.com/products'
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function handleSelect(item) {
  nombre.value = item.name
  // Llenar otros campos si es necesario
}
</script>

<template>
  <div>
    <label for="nombre">Nombre:</label>
    <input id="nombre" v-model="nombre" class="border p-2 rounded mr-2">
    <button @click="openModal('users')">
      Buscar Usuarios
    </button>

    <ModalBuscar
      :is-open="isModalOpen"
      :title="modalTitle"
      :api-endpoint="currentEndpoint"
      @close="closeModal"
      @select="handleSelect"
    />
  </div>
</template>
