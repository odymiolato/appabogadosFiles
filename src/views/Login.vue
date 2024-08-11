<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Buttons from '../components/Buttons.vue';
import { login } from '../class/all.class';

const Login: login = new login()
const loader = ref<boolean>(false)
const EmptyUsername = ref<boolean>(false)
const EmptyPassword = ref<boolean>(false)
const IncorrectUsername = ref<boolean>(false)
const IncorrectPassword = ref<boolean>(false)
/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API;

const router = useRouter();

function validate(): boolean {
  if (Login.Name === '') {
    EmptyUsername.value = true
    return false
  } else {
    EmptyUsername.value = false
  }

  if (Login.Password === '') {
    EmptyPassword.value = true
    return false
  } else {
    EmptyPassword.value = false
  }
  return true
}

async function FN_login() {
  if (!validate()) {
    return
  }

  loader.value = true

  try {
    const response = await fetch(`${URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Login),
    });

    const data = await response.json();
    console.info(data)

    if (response.ok && data.STATUS) {
      localStorage.setItem('access_token', data.access_token);
      router.push('/dashboard');
    } else {
      if (data.CODSTATUS === 2) {
        IncorrectUsername.value = true;
      } else if (data.CODSTATUS === 3) {
        IncorrectPassword.value = true;
      }
    }
  } catch (error) {
    console.error('Error en la solicitud de login:', error);
  } finally {
    loader.value = false;
  }
}
</script>
<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img src="/public/img/cumplimiento.png" alt="" class="w-10">
        <span class="text-2xl font-semibold text-gray-700">LexiLink</span>
      </div>

      <form class="mt-4" @submit.prevent="FN_login">
        <label class="block">
          <span class="text-sm text-gray-700">Usuario</span>
          <input v-model="Login.Name" type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          <p v-if="EmptyUsername" class="text-red-500 font-medium">Por favor, ingrese un nombre de usuario.</p>
          <p v-if="IncorrectUsername" class="text-red-500 font-medium">El nombre de usuario ingresado no existe.</p>
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Contraseña</span>
          <input v-model="Login.Password" type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
          <p v-if="EmptyPassword" class="text-red-500 font-medium">Por favor, ingrese una contraseña.</p>
          <p v-if="IncorrectPassword" class="text-red-500 font-medium">La contraseña ingresada es incorrecta.</p>
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
          <Buttons v-if="!loader" type="submit" class="w-full" Buttonstext="Inicia Session" />
          <button disabled v-if="loader"
            class="w-full px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-sky-700 rounded-md">
            Iniciando Session...
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
