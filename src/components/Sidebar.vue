<script setup lang="ts">
import { ref } from 'vue'
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
      class="inset-y-0 left-0 z-30  transition-transform relative overflow-hidden w-max bg-sky-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img src="/public/img/cumplimiento.png" alt="" class="w-20 ml-[-1]">
          <span class=" text-2xl font-semibold text-white">LexiLink</span>
        </div>
      </div>

      <nav class="mt-10">
        <MenuItem to="/dashboard" name="Dashboard" label="Dashboard" imagen="dashboard" />

        <MenuDesplegable class="transition-all duration-1000" label="Expediente" imagen="dashboard">
          <MenuDesplegable label="Mantenimientos" imagen="dashboard">
            <MenuItem to="/gestionabogados" name="GestionAbogados" label="Abogados" imagen="dashboard" />
            <MenuItem to="/tribunales" name="Tribunales" label="Tribunales" imagen="dashboard" />
            <MenuItem to="/tiposgastos" name="TiposGastos" label="Tipos Gastos" imagen="dashboard" />
            <MenuItem to="/gestioncontraparte" name="GestionContraparte" label="Contrapartes" imagen="dashboard" />
            <MenuItem to="/especialidades" name="Especialidades" label="Especialidades" imagen="dashboard" />
            <MenuItem to="/tipomovimientos" name="TipoMovimientos" label="Tipo Movimientos" imagen="dashboard" />
          </MenuDesplegable>

          <MenuDesplegable label="Porcesos" imagen="dashboard">
            <MenuItem to="/expedientes" name="Expendientes" label="Expendientes" imagen="dashboard" />
            <MenuItem to="/expediente" name="Expediente" label="Control de Expedientes" imagen="dashboard" />
            <MenuItem to="/audiencia" name="Audiencia" label="Gestion de Audiencias" imagen="dashboard" />
          </MenuDesplegable>
        </MenuDesplegable>

        <MenuDesplegable class="transition duration-500" label="Clientes" imagen="dashboard">
          <MenuItem to="/clientes" name="Clientes" label="Clientes" imagen="dashboard" />
          <MenuItem to="/interaccionescliente" name="InteraccionesCliente" label="Interaccion Clientes" imagen="dashboard" />
          <MenuItem to="/tipointeraccion" name="TipoInteraccion" label="Tipo de Interacciones" imagen="dashboard" />

          <MenuDesplegable label="Mantenimientos" imagen="dashboard">
            hola
          </MenuDesplegable>

          <MenuDesplegable label="Gestion de Clientes" imagen="dashboard">
            hola
          </MenuDesplegable>
        </MenuDesplegable>
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
