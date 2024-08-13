<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { modulos, modulo_programa, programas } from '../../class/all.class'
import { addAlert } from '../../stores/alerts'

const modulo = ref<modulos>(new modulos())
const selectedPrograms = ref<modulo_programa[]>([])

const availablePrograms = ref<programas[]>([])

/*@ts-ignore*/
const URL: string = import.meta.env.VITE_PATH_API

async function getProgramas() {
    try {
        const response = await fetch(`${URL}programas`, {
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


function updateProgramOption(programId: number, value: boolean) {
    const program = selectedPrograms.value.find(p => p.codpro_mop === programId)
    if (program) {
        program.acceso = value
    } else {
        const newProgram = new modulo_programa()
        newProgram.codpro_mop = programId
        newProgram.acceso = value
        selectedPrograms.value.push(newProgram)
    }
}

async function saveModule() {
    if (modulo.value.nombre_mod.trim() === '' || selectedPrograms.value.length === 0) {
        addAlert(4, 'Por favor, complete todos los campos requeridos.')
        return
    }

    try {
        const response = await fetch(`${URL}modulos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                modulo: modulo.value,
                programas: selectedPrograms.value,
            }),
        })

        if (response.ok) {
            addAlert(2, 'Módulo registrado exitosamente.')
            modulo.value = new modulos()
            selectedPrograms.value = []
            let temp = [...availablePrograms.value]
            availablePrograms.value = []
            availablePrograms.value = temp
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
    getProgramas();
})
</script>

<template>
    <div class="container mx-auto mt-4">
        <h3 class="text-3xl font-medium text-gray-700">Registro de Módulos</h3>
        <div class="mt-4 p-6 bg-white rounded-md shadow-md">
            <h3>Información del Módulo</h3>
            <div class="grid grid-cols-1 gap-6 mt-4">
                <div>
                    <label class="text-gray-700" for="name">Nombre del Módulo</label>
                    <input id="name" v-model="modulo.nombre_mod" type="text"
                        class="w-full mt-2 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500"
                        placeholder="Nombre del módulo" />
                </div>

                <!-- programas -->
                <div>
                    <label class="text-gray-700" for="programs">Seleccione los Programas</label>
                    <div class="my-6 overflow-hidden bg-white rounded-md shadow max-h-[289px] overflow-y-auto">
                        <table class="w-full text-left border-collapse">
                            <thead class="border-b top-0 sticky z-20">
                                <tr>
                                    <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                                        Nombre
                                    </th>
                                    <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                                        Acceso
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
                                            @change="(e: any) => updateProgramOption(value.codpro_pro, e.target.checked)">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
</template>
