<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../../axiosConfig';
import type { abogados, ciudades,direcciones, provincias,especialidades  } from '../../class/all.class';
import WideTable from '../../components/tablas/WideTable.vue';
import { addAlert } from '../../stores/alerts';
import Modal from '../../components/Modal.vue';

import { diccionSelected } from '../../interface/all.interface';


const columns = [
  { title: 'Nombre', field: 'nombre_abo' },
  { title: 'Telefono', field: 'telefo_abo' },
  { title: 'Cedula', field: 'cedula_abo' },
  { title: 'Especialidad', field: 'descri_tip' },
  { title: 'Correo', field: 'email_abo' },
  { title: 'Fecha de nacimiento', field: 'fecnac_abo' },
  { title: 'Fecha de inicio', field: 'fecini_abo' },
  { title: 'Direccion', field: 'direcc_abo', isButton: true, buttonTitle: 'direccion' },
];
const columnsDirecciones = [
  { title: 'Direccion', field: 'direccion_dir' },
  { title: 'Ciudad', field: 'nombre_ciu' },
  { title: 'Provincia', field: 'nombre_pro' },
];
function handleClose() {
  ShowModal.value = false;
}

const ShowModal = ref(false);
const abogadosList = ref<abogados[]>([]);
const direccionSelected = ref<diccionSelected[]>([]);
const router = useRouter();

onMounted(async () => {
  await fetchAbogados();
});

async function fetchAbogados() {
  try {
    const response = await apiClient.get('/abogados');
    const especialidadesResponse = await apiClient.get('/especialidades');

    const especialidades = especialidadesResponse.data;

    abogadosList.value = response.data.map((abogado: abogados) => {
      return {
        ...abogado,
        descri_tip:
          especialidades?.find(
            (especialidad: especialidades) =>
              especialidad.tipesp_tip === abogado.tipo_especialidad_abo
          )?.descri_tip || 'Desconocido',
        fecnac_abo: formatDate(abogado.fecnac_abo),
        fecini_abo: formatDate(abogado.fecini_abo),
      };
    });
  } catch (error) {
    console.error('Error fetching Abogado:', error);
    addAlert(3, 'Error cargando Abogado');
  }
}

function handleEditAbogado(abogado: abogados) {
  router.push({ name: 'GestionAbogados', params: { id: abogado.codabo_abo } });
}

function handleDeleteAbogado(abogado: abogados) {
  // Lógica para eliminar el abogado
}

async function handleViewLocations(abogado: abogados) {
  await searchDirecciones(abogado.codabo_abo);
  ShowModal.value = true; // Mostrar el modal solo después de que los datos se han cargado
}

async function searchDirecciones(id: number) {
  try {
    const response = await apiClient.get(`/direcciones/${id}`);
    const direccion: direcciones = response.data;

    const ciudad: ciudades = (
      await apiClient.get(`/ciudades/${direccion.codciu_dir}`)
    ).data;
    const provincia: provincias = (
      await apiClient.get(`/provincias/${ciudad.codpro_ciu}`)
    ).data;

    direccionSelected.value = [
      {
        direccion_dir: direccion.direccion_dir,
        nombre_ciu: ciudad.nombre_ciu,
        nombre_pro: provincia.nombre_pro,
      },
    ];

    console.log(columnsDirecciones);
    console.log(direccionSelected);
  } catch (error) {
    console.error('Error fetching Direcciones:', error);
    addAlert(3, 'Error cargando Direcciones');
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}
</script>

<template>
  
  <button
    type="button"
    class="mt-1 mb-5 p-3 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    @click="() => router.push({ name: 'GestionAbogados' })"
  >
    Crear Nuevo Abogado
  </button>
  <div class="p-6 bg-white rounded-md shadow-md">
    <WideTable
      :columns="columns"
      :tabledata="abogadosList"
      label="Abogados"
      :editable="true"
      :eliminable="true"
      @edit="handleEditAbogado"
      @delete="handleDeleteAbogado"
      @buttonClick="handleViewLocations"
    />
  </div>

  <Modal
    v-if="ShowModal"
    class="flex justify-center items-center"
    title="Direcciones del abogado"
    :btn-visible="false"
    @close="handleClose"
  >
    <template #body>
      <WideTable
        :columns="columnsDirecciones"
        :tabledata="direccionSelected"
        :editable="false"
        :eliminable="false"
      />
    </template>
  </Modal>
</template>
