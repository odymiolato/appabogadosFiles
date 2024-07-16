<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import MenuItem from './SideBar/MenuItem.vue'
import MenuDesplegable from './SideBar/MenuDesplegable.vue'

const { isOpen } = useSidebar()
const activeClass = ref(
  'duration-700  bg-sky-500 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'duration-700  border-sky-900 text-white transition duration-700 hover:bg-sky-500 hover:bg-opacity-25 hover:text-gray-100 hover:duration-200',
)
const IsActive = ref(false)
function changeStatus(valor: boolean) {
  IsActive.value = valor
}
</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-52 overflow-y-auto transition duration-300 transform bg-sky-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img src="/public/img/cumplimiento.png" alt="" class="w-20 ml-[-1]">
          <span class=" text-2xl font-semibold text-white">LexiLink</span>
        </div>
      </div>

      <nav class="mt-10">
        <MenuItem to="/dashboard" name="Dashboard" label="Dashboard" imagen="dashboard" />
        <MenuItem to="/expediente" name="Expediente" label="Expedientes" imagen="dashboard" />

        <MenuItem to="/ui-elements" name="UIElements" label="Elements" imagen="elements" />

        <MenuItem to="/eventos" name="Eventos" label="Eventos" imagen="elements" />

        <MenuItem to="/tables" name="Tables" label="Tables" imagen="tables" />

        <MenuItem to="/forms" name="Forms" label="Forms" imagen="forms" />

        <MenuItem to="/cards" name="Cards" label="Cards" imagen="cards" />

        <MenuItem to="/modal" name="Modal" label="Modal" imagen="modal" />

        <MenuItem to="/blank" name="Blank" label="Blank" imagen="blank" />

        <MenuDesplegable class="transition duration-700" label="Revisar" imagen="maintenance" :is-active="IsActive" @change-status="changeStatus">
          <MenuItem to="/expedientes" name="Expendientes" label="Expendientes" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/asignacionexpediente" name="AsignacionExpediente" label="Asignacion de Expedientes" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/audiencia" name="Audiencia" label="Gestion de Audiencias" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/gestioncliente" name="GestionCliente" label="Gestion Clientes" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/interaccioncliente" name="InteraccionCliente" label="Interacciones con CLientes" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/gestiondocumento" name="GestionDocumento" label="Gestion de documentos" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/facturacionfinanza" name="FacturacionFinanza" label="Facturacion y Finanzas" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/gestionpago" name="GestionPago" label="Gestion de Pagos" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/usuariopermiso" name="UsuarioPermiso" label="Usuarios y Permisos" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
          <MenuItem to="/" name="" label="" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />

          <MenuItem to="/facturacion" name="Facturacion" label="Facturacion" imagen="dashboard" :class="IsActive ? 'opacity-100' : 'opacity-0'" />
        </MenuDesplegable>
      </nav>
    </div>
  </div>
</template>
