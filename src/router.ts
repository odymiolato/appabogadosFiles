import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Tables.vue'
import UIElements from './views/UIElements.vue'
import Login from './views/Login.vue'
import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'
import Calendar from './components/calendar.vue'
import Expediente from './views/expDepToAbo.vue'
import Expedientes from './views/expediente/Expedientes.vue'


import Audiencia from './views/componentes a revisar/Audiencia.vue'

import GestionAbogados from './views/abogados/GestionAbogados.vue'
import GestionContraparte from './views/contrapartes/GestionContrapartes.vue'
import Especialidades from './views/especialidades/especialidades.vue'
import TipoMovimientos from './views/tipo_movimientos/TipoMovimientos.vue'
import Tribunales from './views/tribunales/Tribunales.vue'
import TiposGastos from './views/tipos_gastos/TiposGastos.vue'
import Paises from './views/paises/paises.vue'
import Provincias from './views/provincias/provincias.vue'
import Ciudades from './views/ciudades/ciudades.vue'
import OrigenDireccion from './views/origen_direccion/OrigenDireccion.vue'

import InteraccionCliente from './views/interacciones/InteraccionCliente.vue'
import Clientes from './views/clientes/Clientes.vue'
import TipoInteraccion from './views/tipo_interaccion/TipoInteraccion.vue'
import TiposExpedientes from './views/tipos_expedientes/TiposExpedientes.vue'
import Movimientos from './views/movimientos/Movimientos.vue'

import CrearClientes from './views/clientes/CrearClientes.vue'
import CrearInteracciones from './views/interacciones/CrearInteracciones.vue'
import VehiculosModelos from './views/vehiculos_modelos/VehiculosModelos.vue'
import VehiculosEstado from './views/vehiculos_estado/VehiculosEstado.vue'
import VehiculosMarcas from './views/vehiculos_marcas/VehiculosMarcas.vue'
import Vehiculos from './views/vehiculos/Vehiculos.vue'
import CrearVehiculos from './views/vehiculos/CrearVehiculos.vue'
import Asignacion from './views/asignacion_vehiculos/Asignacion.vue'
import CrearAsignacion from './views/asignacion_vehiculos/CrearAsignacion.vue'
import Programas from './views/programas/Programas.vue'
import Modulos from './views/modulos/Modulos.vue'
import Perfil from './views/perfil/Perfil.vue'
import Users from './views/users/Users.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/errors',
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import('./views/404/404page.vue'),
        // meta: {
        //   title: "Repositorio - 404",
        meta: { layout: 'empty' },
        //   requiresAuth: false,
        // },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { layout: 'empty' },
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables,
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: Calendar,
  },
  {
    path: '/expediente',
    name: 'Expediente',
    component: Expediente,
  },
  {
    path: '/expedientes',
    name: 'Expedientes',
    component: Expedientes,
  },
  {
    path: '/audiencia',
    name: 'Audiencia',
    component: Audiencia,
  },

  {
    path: '/gestionabogados',
    name: 'GestionAbogados',
    component: GestionAbogados,
  },
  {
    path: '/gestioncontraparte',
    name: 'GestionContraparte',
    component: GestionContraparte,
  },
  {
    path: '/especialidades',
    name: 'Especialidades',
    component: Especialidades,
  },
  {
    path: '/tipomovimientos',
    name: 'TipoMovimientos',
    component: TipoMovimientos,
  },
  {
    path: '/tribunales',
    name: 'Tribunales',
    component: Tribunales,
  },
  {
    path: '/tiposgastos',
    name: 'TiposGastos',
    component: TiposGastos,
  },
  {
    path: '/paises',
    name: 'Paises',
    component: Paises,
  },
  {
    path: '/provincias',
    name: 'Provincias',
    component: Provincias,
  },
  {
    path: '/ciudades',
    name: 'Ciudades',
    component: Ciudades,
  },
  {
    path: '/origendireccion',
    name: 'Origen Direccion',
    component: OrigenDireccion,
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes,
  },
  {
    path: '/interaccionescliente',
    name: 'InteraccionesCliente',
    component: InteraccionCliente,
  },
  {
    path: '/tipointeraccion',
    name: 'TipoInteraccion',
    component: TipoInteraccion,
  },
  {
    path: '/tipoexpediente',
    name: 'TipoExpediente',
    component: TiposExpedientes,
  },
  {
    path: '/movimientos',
    name: 'Movimientos',
    component: Movimientos,
  },
  {
    path: '/vehiculos',
    name: 'Vehiculos',
    component: Vehiculos,
  },
  {
    path: '/asignacionvehiculo',
    name: 'AsignacionVehiculo',
    component: Asignacion,
  },
  {
    path: '/vehiculosmodelos',
    name: 'VehiculosModelos',
    component: VehiculosModelos,
  },
  {
    path: '/vehiculosestado',
    name: 'VehiculosEstado',
    component: VehiculosEstado,
  },
  {
    path: '/vehiculosmarca',
    name: 'VehiculosMarca',
    component: VehiculosMarcas,
  },
  {
    path: '/crearcliente/:id?',
    name: 'CrearCliente',
    component: CrearClientes,
    props: true,
  },
  {
    path: '/crear-interaccion/:id?',
    name: 'CrearInteraccion',
    component: CrearInteracciones,
    props: true,
  },
  {
    path: '/crear-vehiculo/:id?',
    name: 'CrearVehiculo',
    component: CrearVehiculos,
    props: true,
  },
  {
    path: '/crear-asignacion/:id?',
    name: 'CrearAsignacion',
    component: CrearAsignacion,
    props: true,
  },
  {
    path: '/programas',
    name: 'Programas', 
    component: Programas,
  },
  {
    path: '/modulos',
    name: 'Modulos',
    component: Modulos,
  },
  {
    path: '/perfiles',
    name: 'Perfiles',
    component: Perfil,
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Users,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
