<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { modulos, modulo_programa, programas, perfil_programas, perfiles } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'
import Modal from '../../components/Modal.vue';
import Inputs from '../../components/Inputs.vue';


const perfil = ref<perfiles>(new perfiles())
const selectedPrograms = ref<perfil_programas[]>([])

const availablePrograms = ref<programas[]>([])

/*@ts-ignore*/
const URL: string = import.meta.env.VITE_PATH_API
const showModal = ref<boolean>(false);
const ModuloSelected = ref({ codmod_mod: '', nombre_mod: '' });
const Modulos = ref<modulos[]>([])
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

const filteredModulos = computed(() => {
    if (searchTerm.value === '') {
        return Modulos.value;
    }
    return Modulos.value.filter(item => String(item.codmod_mod).toLowerCase().includes(searchTerm.value.toLowerCase()) || item.nombre_mod.toLowerCase().includes(searchTerm.value.toLowerCase()));
});


function searchModulos(value: any) {
    searchTerm.value = value;
}

function setModulo(obj: modulos) {
    if (ModuloSelected !== undefined) {
        ModuloSelected.value.codmod_mod = String(obj.codmod_mod);
        ModuloSelected.value.nombre_mod = obj.nombre_mod;
        getProgramByModules(obj.codmod_mod)
    }

    handleAccept();
}

async function getModulos() {
    try {
        const response = await fetch(`${URL}modulos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            Modulos.value = await response.json()
        } else {
            console.error('Error en la respuesta del servidor:', response.statusText)
            addAlert(3, 'Problemas al cargar los modulos.')
        }
    } catch (error) {
        console.error('Error en la solicitud:', error)
        addAlert(3, 'Comuníquese con los administradores.')
    }
}

async function getProgramByModules(codmod: number) {
    try {
        const response = await fetch(`${URL}modulos/programas/${codmod}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            availablePrograms.value = await response.json()
        } else {
            console.error('Error en la respuesta del servidor:', response.statusText)
            addAlert(3, 'Problemas al cargar los programas.')
        }
    } catch (error) {
        console.error('Error en la solicitud:', error)
        addAlert(3, 'Comuníquese con los administradores.')
    }
}


function updateProgramOption(programId: number, key: keyof perfil_programas, value: boolean) {
    const program: any = selectedPrograms.value.find(p => p.codpro_ppr === programId)
    if (program) {
        program[key] = value
    } else {
        const newProgram: any = new perfil_programas()
        newProgram.codpro_mop = programId
        newProgram[key] = value
        selectedPrograms.value.push(newProgram)
    }
}

async function saveModule() {
    if (perfil.value.nombre_perf.trim() === '' || selectedPrograms.value.length === 0) {
        addAlert(3, 'Por favor, complete todos los campos requeridos.')
        return
    }

    try {
        const response = await fetch(`${URL}modulos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                perfil: perfil.value,
                programas: selectedPrograms.value,
            }),
        })

        if (response.ok) {
            addAlert(2, 'Módulo registrado exitosamente.')
            perfil.value = new perfiles()
            selectedPrograms.value = []
        } else {
            console.error('Error en la respuesta del servidor:', response.statusText)
            addAlert(3, 'Problemas al registrar el módulo.')
        }
    } catch (error) {
        console.error('Error en la solicitud:', error)
        addAlert(3, 'Comuníquese con los administradores.')
    }
}

onMounted(() => {
    getModulos()
})
</script>

<template>
    <div class="container mx-auto mt-4">
        <h3 class="text-3xl font-medium text-gray-700">Registro de Perfiles</h3>
        <div class="mt-4 p-6 bg-white rounded-md shadow-md">
            <h3>Información del Perfil</h3>
            <div class="grid grid-cols-1 gap-6 mt-4">
                <div>
                    <label class="text-gray-700" for="name">Nombre del Perfil</label>
                    <input id="name" v-model="perfil.nombre_perf" type="text"
                        class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                        placeholder="Nombre del perfil" />
                </div>

                <!-- programas -->

                <div>
                    <h3>Modulo</h3>
                    <div class="flex gap-2 justify-center items-center">
                        <input id="fecnac_abo" type="text" disabled
                            class="w-[20%] mt-2  border-gray-200  rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                            v-model="ModuloSelected.codmod_mod" readonly>

                        <input id="fecnac_abo" type="text"
                            class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                            v-model="ModuloSelected.nombre_mod" readonly disabled>

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
                    <label class="text-gray-700" for="programs">Seleccione los Programas</label>
                    <div
                        class="my-6 overflow-hidden bg-white rounded-md shadow h-[289px] max-h-[289px] overflow-y-auto">
                        <table v-if="availablePrograms.length > 0" class="w-full text-left border-collapse">
                            <thead class="border-b top-0 sticky z-20">
                                <tr>
                                    <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                                        Nombre
                                    </th>
                                    <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                                        Insertar
                                    </th>
                                    <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                                        Eliminar
                                    </th>
                                    <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                                        Modificar
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr v-for="(value) in availablePrograms" :key="value.codpro_pro"
                                    class="hover:bg-gray-200 cursor-pointer">
                                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                        {{ value.name_pro }}
                                    </td>
                                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                        <input type="checkbox" class="w-5 h-5 text-sky-600 rounded-md focus:ring-sky-500"
                                            @change="(e: any) => updateProgramOption(value.codpro_pro, 'insertar_ppr', e.target.checked)">
                                    </td>
                                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                        <input type="checkbox" class="w-5 h-5 text-sky-600 rounded-md focus:ring-sky-500"
                                            @change="(e: any) => updateProgramOption(value.codpro_pro, 'eliminar_ppr', e.target.checked)">
                                    </td>
                                    <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                        <input type="checkbox" class="w-5 h-5 text-sky-600 rounded-md focus:ring-sky-500"
                                            @change="(e: any) => updateProgramOption(value.codpro_pro, 'modificar_ppr', e.target.checked)">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="availablePrograms.length <= 0 && ModuloSelected.codmod_mod === ''"
                            class="w-full h-full flex justify-center items-center font-medium text-lg">
                            <h2>Para mostrar los programas, debes seleccionar un módulo.</h2>
                        </div>
                        <div v-if="availablePrograms.length <= 0 && ModuloSelected.codmod_mod !== ''"
                            class="w-full h-full flex justify-center items-center font-medium text-lg">
                            <h2>El módulo seleccionado no contiene programas.</h2>
                        </div>
                    </div>
                </div>
                <!-- programas -->

            </div>

            <div class="flex justify-end mt-6">
                <button
                    class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    @click="saveModule">
                    Guardar
                </button>
            </div>
        </div>
    </div>

    <Modal class="flex justify-center items-center" v-if="showModal" title="Especialidades" @close="handleClose"
        @accept="handleAccept" @decline="handleDecline" :btnVisible="false">
        <template #body>
            <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchModulos" />
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
                                    <tr v-for="(value) in filteredModulos" class="hover:bg-gray-200 cursor-pointer"
                                        @click="setModulo(value)">
                                        <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                            {{ value.codmod_mod }}
                                        </td>
                                        <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                            {{ value.nombre_mod }}
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
