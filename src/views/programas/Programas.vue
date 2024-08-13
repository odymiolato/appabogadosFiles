<script setup lang="ts">
import { ref, computed } from 'vue'
import { programas } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'

const programa = ref<programas>(new programas())
/*@ts-ignore*/
const URL: string = import.meta.env.VITE_PATH_API


const types = ref([
    { value: 1, name: 'Mantenimiento' },
    { value: 2, name: 'Proceso' },
])

const isDropdownOpen = ref(false)


const getSelectedTypeName = computed(() => {
    const selectedType = types.value.find(type => type.value === programa.value.tippro_tpr)
    return selectedType ? selectedType.name : 'Seleccione un tipo'
})

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
}


function selectType(typeValue: number) {
    programa.value.tippro_tpr = typeValue
    toggleDropdown()
}


async function saveProgram() {

    if (programa.value.name_pro.trim() === '' || programa.value.path_pro.trim() === '' || programa.value.tippro_tpr === 0) {
        addAlert(3, 'Por favor, complete todos los campos requeridos.')
        return
    }

    try {
        const response = await fetch(`${URL}programas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(programa.value
            ),
        })

        if (response.ok) {
            addAlert(2, 'Programa registrado exitosamente.')
            programa.value = new programas()
        } else {
            console.error('Error en la respuesta del servidor:', response.statusText)
            addAlert(3, 'Problemas al registrar el programa.')
        }
    } catch (error) {
        console.error('Error en la solicitud:', error)
        addAlert(3, 'Comuníquese con los administradores.')
    }
}
</script>

<template>
    <div class="container mx-auto mt-4">
        <h3 class="text-3xl font-medium text-gray-700">Registro de Programas</h3>
        <div class="mt-4 p-6 bg-white rounded-md shadow-md">
            <h3>Información del Programa</h3>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="text-gray-700" for="name">Nombre del Programa</label>
                    <input id="name" v-model="programa.name_pro" type="text"
                        class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                        placeholder="Nombre del programa" />
                </div>

                <div>
                    <label class="text-gray-700" for="path">Ruta del Programa</label>
                    <input id="path" v-model="programa.path_pro" type="text"
                        class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                        placeholder="Ruta del programa" />
                </div>

                <div class="relative">
                    <button id="dropdownDefaultButton" @click="toggleDropdown"
                        class="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                        type="button">
                        {{ getSelectedTypeName }}
                        <svg class="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>


                    <div v-if="isDropdownOpen" id="dropdown"
                        class="mt-2 z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="p-2 text-sm text-black" aria-labelledby="dropdownDefaultButton">
                            <li v-for="type in types" :key="type.value">
                                <a href="#" @click.prevent="selectType(type.value)"
                                    class="block px-4 py-2 rounded-lg hover:bg-gray-100">
                                    {{ type.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="flex justify-end mt-6">
                <button
                    class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    @click="saveProgram">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>