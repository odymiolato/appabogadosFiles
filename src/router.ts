import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './utils/auth'

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
import Abogados from './views/abogados/Abogados.vue'
import CrearAudiencia from './views/audiencias/CrearAudiencia.vue'

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
    meta: { requiresAuth: true },
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
    meta: { requiresAuth: true },
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
    meta: { requiresAuth: true },
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables,
    meta: { requiresAuth: true },
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements,
    meta: { requiresAuth: true },
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
    meta: { requiresAuth: true },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
    meta: { requiresAuth: true },
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: Calendar,
    meta: { requiresAuth: true },
  },
  {
    path: '/expediente',
    name: 'Expediente',
    component: Expediente,
    meta: { requiresAuth: true },
  },
  {
    path: '/expedientes',
    name: 'Expedientes',
    component: Expedientes,
    meta: { requiresAuth: true },
  },
  {
    path: '/audiencia',
    name: 'Audiencia',
    component: Audiencia,
    meta: { requiresAuth: true },
  },
  {
    path: '/crearaudiencia',
    name: 'CrearAudiencia',
    component: CrearAudiencia,
  },

  {
    path: '/abogados',
    name: 'Abogados',
    component: Abogados,
  },
  {

    path: '/gestionabogados/:id?',
    name: 'GestionAbogados',
    component: GestionAbogados,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/gestioncontraparte',
    name: 'Gestion Contraparte',
    component: GestionContraparte,
    meta: { requiresAuth: true },
  },
  {
    path: '/especialidades',
    name: 'Especialidades',
    component: Especialidades,
    meta: { requiresAuth: true },
  },
  {
    path: '/tipomovimientos',
    name: 'Tipo Movimientos',
    component: TipoMovimientos,
    meta: { requiresAuth: true },
  },
  {
    path: '/tribunales',
    name: 'Tribunales',
    component: Tribunales,
    meta: { requiresAuth: true },
  },
  {
    path: '/tiposgastos',
    name: 'Tipos Gastos',
    component: TiposGastos,
    meta: { requiresAuth: true },
  },
  {
    path: '/paises',
    name: 'Paises',
    component: Paises,
    meta: { requiresAuth: true },
  },
  {
    path: '/provincias',
    name: 'Provincias',
    component: Provincias,
    meta: { requiresAuth: true },
  },
  {
    path: '/ciudades',
    name: 'Ciudades',
    component: Ciudades,
    meta: { requiresAuth: true },
  },
  {
    path: '/origendireccion',
    name: 'Origen Direccion',
    component: OrigenDireccion,
    meta: { requiresAuth: true },
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes,
    meta: { requiresAuth: true },
  },
  {
    path: '/interaccionescliente',
    name: 'Interacciones Cliente',
    component: InteraccionCliente,
    meta: { requiresAuth: true },
  },
  {
    path: '/tipointeraccion',
    name: 'Tipo Interaccion',
    component: TipoInteraccion,
    meta: { requiresAuth: true },
  },
  {
    path: '/tipoexpediente',
    name: 'Tipo Expediente',
    component: TiposExpedientes,
    meta: { requiresAuth: true },
  },
  {
    path: '/movimientos',
    name: 'Movimientos',
    component: Movimientos,
    meta: { requiresAuth: true },
  },
  {
    path: '/vehiculos',
    name: 'Vehiculos',
    component: Vehiculos,
    meta: { requiresAuth: true },
  },
  {
    path: '/asignacionvehiculo',
    name: 'Asignacion Vehiculo',
    component: Asignacion,
    meta: { requiresAuth: true },
  },
  {
    path: '/vehiculosmodelos',
    name: 'Vehiculos Modelos',
    component: VehiculosModelos,
    meta: { requiresAuth: true },
  },
  {
    path: '/vehiculosestado',
    name: 'Vehiculos Estado',
    component: VehiculosEstado,
    meta: { requiresAuth: true },
  },
  {
    path: '/vehiculosmarca',
    name: 'Vehiculos Marca',
    component: VehiculosMarcas,
    meta: { requiresAuth: true },
  },
  {
    path: '/crearcliente/:id?',
    name: 'CrearCliente',
    component: CrearClientes,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/crear-interaccion/:id?',
    name: 'CrearInteraccion',
    component: CrearInteracciones,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/crear-vehiculo/:id?',
    name: 'CrearVehiculo',
    component: CrearVehiculos,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/crear-asignacion/:id?',
    name: 'CrearAsignacion',
    component: CrearAsignacion,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/programas',
    name: 'Programas',
    component: Programas,
    meta: { requiresAuth: true },
  },
  {
    path: '/modulos',
    name: 'Modulos',
    component: Modulos,
    meta: { requiresAuth: true },
  },
  {
    path: '/perfiles',
    name: 'Perfiles',
    component: Perfil,
    meta: { requiresAuth: true },
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Users,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const status: boolean = await isAuthenticated()

  if (requiresAuth && !status)
    next('/')
  else
    next()
})

export default router
