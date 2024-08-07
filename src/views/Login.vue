<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Buttons from '../components/Buttons.vue';

const router = useRouter()
const email = ref('administrador')
const password = ref('adminadmin')

function login() {
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img src="/public/img/cumplimiento.png" alt="" class="w-10">
        <span class="text-2xl font-semibold text-gray-700">LexiLink</span>
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">Usuario</span>
          <input v-model="email" type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Contraseña</span>
          <input v-model="password" type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
        </label>

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox"
                class="text-sky-700 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
              <span class="mx-2 text-sm text-gray-600">Recuerdame</span>
            </label>
          </div>
        </div>

        <div class="mt-6">
          <Buttons type="submit" class="w-full" Buttonstext="Inicia Session" />
        </div>
      </form>
    </div>
  </div>
</template>
