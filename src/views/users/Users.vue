<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { addAlert } from '../../stores/alerts'
import { perfiles, usuarios } from '../../class/all.class'
import Modal from '../../components/Modal.vue';
import Inputs from '../../components/Inputs.vue';

const usuario = ref<usuarios>(new usuarios())
const confirmarContrasena = ref('')
const ColorFormatPassword = ref<string>('text-red-600')
const ColorBorderPassword = ref<string>('focus:border-red-600 focus:ring focus:ring-opacity-40 focus:ring-red-500')
const ColorBorderPasswordConfirm = ref<string>('focus:border-red-600 focus:ring focus:ring-opacity-40 focus:ring-red-500')

/* @ts-ignore */
const URL: string = import.meta.env.VITE_PATH_API
const passwordErrorText = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número.'

const passwordRules = {
    hasLowercase: (password: string) => /[a-z]/.test(password),
    hasUppercase: (password: string) => /[A-Z]/.test(password),
    hasNumber: (password: string) => /[0-9]/.test(password),
    minLength: (password: string) => password.length >= 8
}

const showModal = ref<boolean>(false);
const PerfilSelected = ref({ codperf_perf: '', nombre_perf: '' });
const Perfiles = ref<perfiles[]>([])
let searchTerm = ref('');

const handleAccept = () => {
    showModal.value = false;
};

const handleDecline = () => {
    showModal.value = false;
};

const handleClose = () => {
    showModal.value = false;
};

const filteredPerfiles = computed(() => {
    if (searchTerm.value === '') {
        return Perfiles.value;
    }
    return Perfiles.value.filter(item => String(item.codperf_perf).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.nombre_perf.toLowerCase().includes(searchTerm.value.toLowerCase()));
});


function searchPerfil(value: any) {
    searchTerm.value = value;
}

function setPerfil(obj: perfiles) {
    if (PerfilSelected !== undefined) {
        PerfilSelected.value.codperf_perf = String(obj.codperf_perf);
        PerfilSelected.value.nombre_perf = obj.nombre_perf;
    }

    handleAccept();
}

function validateFormat() {
    let password: string = usuario.value.contrasena_usr

    if (
        passwordRules.minLength(password) &&
        passwordRules.hasUppercase(password) &&
        passwordRules.hasLowercase(password) &&
        passwordRules.hasNumber(password)
    ) {
        ColorFormatPassword.value = 'text-green-600'
        ColorBorderPassword.value = 'focus:border-green-600 focus:ring focus:ring-opacity-40 focus:ring-green-500'
        return
    } else {
        ColorFormatPassword.value = 'text-red-600'
        ColorBorderPassword.value = 'focus:border-red-600 focus:ring focus:ring-opacity-40 focus:ring-red-500'
    }
}

function ConfirmPassword() {
    if (usuario.value.contrasena_usr === confirmarContrasena.value) {
        ColorBorderPasswordConfirm.value = 'focus:border-green-600 focus:ring focus:ring-opacity-40 focus:ring-green-500'
    } else {
        ColorBorderPasswordConfirm.value = 'focus:border-red-600 focus:ring focus:ring-opacity-40 focus:ring-red-500'
    }
}

async function getPerfil() {
    try {
        const response = await fetch(`${URL}perfiles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            Perfiles.value = await response.json()
        } else {
            console.error('Error en la respuesta del servidor:', response.statusText)
            addAlert(3, 'Problemas al cargar los perfiles.')
        }
    } catch (error) {
        console.error('Error en la solicitud:', error)
        addAlert(3, 'Comuníquese con los administradores.')
    }
}

async function saveUsuario() {
    const password = usuario.value.contrasena_usr

    if (usuario.value.nombre_usr === '') {
        addAlert(4, 'El nombre es requerido.')
        return
    }

    if (PerfilSelected.value.codperf_perf === '') {
        addAlert(4, 'El código de perfil es requerido.')
        return
    }

    if (password === '') {
        addAlert(4, 'La contraseña es requerida.')
        return
    }

    if (
        !passwordRules.minLength(password) ||
        !passwordRules.hasUppercase(password) ||
        !passwordRules.hasLowercase(password) ||
        !passwordRules.hasNumber(password)
    ) {
        addAlert(4, 'Debes completar la contraseña.')
        return
    }

    if (password !== confirmarContrasena.value) {
        addAlert(4, 'Debes completar la contraseña.')
        return
    }

    try {
        const response = await fetch(`${URL}usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario.value),
        })

        if (response.ok) {
            console.info('Usuario registrado exitosamente')
            addAlert(2, 'Usuario registrado exitosamente.')
        } else {
            console.error('Error en la respuesta del servidor:', response.statusText)
            addAlert(3, 'Problemas al registrar el usuario.')
        }
    } catch (error) {
        console.error('Error en la solicitud:', error)
        addAlert(3, 'Comunicarce con los administradores.')
    }
}

onMounted(() => {
    getPerfil()
})
</script>

<template>
    <div class="mt-4">
        <h3 class="text-3xl font-medium text-gray-700">
            Gestión de Usuarios
        </h3>
        <div class="mt-4 p-6 bg-white rounded-md shadow-md">
            <h3>
                Información General
            </h3>
            <div>
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label class="text-gray-700" for="nombre_usr">Nombre</label>
                        <input id="nombre_usr" v-model="usuario.nombre_usr" type="text"
                            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
                    </div>

                    <div>
                        <h3>Perfil</h3>
                        <div class="flex gap-2 justify-center items-center">
                            <input id="fecnac_abo" type="text" disabled
                                class="w-[20%] mt-2  border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                                v-model="PerfilSelected.codperf_perf" readonly>

                            <input id="fecnac_abo" type="text"
                                class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                                v-model="PerfilSelected.nombre_perf" readonly disabled>

                            <button @click="showModal = true" type="button"
                                class="mt-1 p-3  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>

                        </div>
                    </div>

                    <div>
                        <label class="text-gray-700" for="contrasena_usr">Contraseña</label>
                        <input id="contrasena_usr" v-model="usuario.contrasena_usr" type="password"
                            @input="validateFormat" class="w-full mt-2 border-gray-200 rounded-md "
                            :class="ColorBorderPassword">

                        <div>
                            <p class="font-medium" :class="ColorFormatPassword">
                                {{ passwordErrorText }}
                            </p>
                        </div>
                    </div>


                    <div>
                        <label class="text-gray-700" for="confirmar_contrasena">Confirme la Contraseña</label>
                        <input id="confirmar_contrasena" v-model="confirmarContrasena" type="password"
                            @input="ConfirmPassword" class="w-full mt-2 border-gray-200 rounded-md"
                            :class="ColorBorderPasswordConfirm">
                    </div>

                </div>

                <div class="flex justify-end mt-4">
                    <button type="button"
                        class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        @click="saveUsuario">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <Modal class="flex justify-center items-center" v-if="showModal" title="Especialidades" @close="handleClose"
        @accept="handleAccept" @decline="handleDecline" :btnVisible="false">
        <template #body>
            <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchPerfil" />
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
                                    <tr v-for="(value) in filteredPerfiles" class="hover:bg-gray-200 cursor-pointer"
                                        @click="setPerfil(value)">
                                        <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                            {{ value.codperf_perf }}
                                        </td>
                                        <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                            {{ value.nombre_perf }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>
