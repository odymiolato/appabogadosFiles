<script setup lang="ts">
import { ref } from 'vue'
import apiClient from '../axiosConfig'
import Modal from './Modal.vue'
import { add } from 'date-fns';
import { addAlert } from '../stores/alerts';

const props = defineProps({
  ShowModalDelete: Boolean,
  registro: String,
})

const emit = defineEmits(['update:ShowModalDelete','eliminar'])

function confirmarEliminacion() {
  
  emit('eliminar')
}

function cerrarModal() {
  emit('update:ShowModalDelete', false)
}

function handleDecline() {
  emit('update:ShowModalDelete', false)
}


</script>

<template>
    <Modal
      v-if="ShowModalDelete"
      class="flex justify-center items-center"
      title="Confirmar Eliminación"
      :btn-visible="true"
     @close="cerrarModal" @accept="confirmarEliminacion" @decline="handleDecline"
    >
      <template #body>
        <p>¿Estás seguro de que deseas eliminar el registro del {{props.registro}}?</p>
      </template>
    </Modal>
  </template>
  