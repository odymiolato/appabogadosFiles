<template>
    <Modal
      v-if="mostrarModalEliminar"
      class="flex justify-center items-center"
      title="Confirmar Eliminación"
      :btn-visible="true"
      @close="cerrarModal"
    >
      <template #body>
        <p>¿Estás seguro de que deseas eliminar este registro?</p>
      </template>
      <template #footer>
        <button @click="confirmarEliminacion" class="btn btn-danger">Aceptar</button>
        <button @click="cerrarModal" class="btn btn-secondary">Cancelar</button>
      </template>
    </Modal>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import apiClient from '../axiosConfig'
  import Modal from './Modal.vue'
  
  const props = defineProps({
    mostrarModalEliminar: Boolean,
    endpoint: String,
    idRegistro: String, // ID del registro a eliminar
  })
  
  const emit = defineEmits(['update:mostrarModalEliminar', 'eliminado'])
  
  function confirmarEliminacion() {
    apiClient.delete(`${props.endpoint}/${props.idRegistro}`)
      .then(() => {
        emit('eliminado', props.idRegistro)
        emit('update:mostrarModalEliminar', false)
      })
      .catch((error) => {
        console.error('Error eliminando el registro:', error)
        // Aquí puedes manejar errores, por ejemplo, mostrar una notificación
      })
  }
  
  function cerrarModal() {
    emit('update:mostrarModalEliminar', false)
  }
  </script>
  