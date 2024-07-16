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
import Expedientes from './views/componentes a revisar/expediente/Expedientes.vue'
import AsignacionExpediente from './views/componentes a revisar/expediente/AsignacionExpediente.vue'
import Audiencia from './views/componentes a revisar/Audiencia.vue'
import GestionCliente from './views/componentes a revisar/clientes/GestionCliente.vue'
import InteraccionCliente from './views/componentes a revisar/clientes/InteraccionCliente.vue'
import GestionDocumento from './views/componentes a revisar/GestionDocumento.vue'
import FacturacionFinanza from './views/componentes a revisar/FacturacionFinanza.vue'
import GestionPago from './views/componentes a revisar/GestionPago.vue'
import UsuarioPermiso from './views/componentes a revisar/UsuariosPermiso.vue'

import Facturacion from './components/mantenimientos/facturacion.vue'

const routes: RouteRecordRaw[] = [
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
  // estas son las rutas que yo cree
  {
    path: '/expedientes',
    name: 'Expedientes',
    component: Expedientes,
  },
  {
    path: '/asignacionexpediente',
    name: 'AsignacionExpediente',
    component: AsignacionExpediente,
  },
  {
    path: '/audiencia',
    name: 'Audiencia',
    component: Audiencia,
  },
  {
    path: '/gestioncliente',
    name: 'GestionCliente',
    component: GestionCliente,
  },
  {
    path: '/interaccioncliente',
    name: 'InteraccionCliente',
    component: InteraccionCliente,
  },
  {
    path: '/gestiondocumento',
    name: 'Gestiondocumento',
    component: GestionDocumento,
  },
  {
    path: '/facturacionfinanza',
    name: 'FacturacionFinanza',
    component: FacturacionFinanza,
  },
  {
    path: '/gestionpago',
    name: 'GestionPago',
    component: GestionPago,
  },
  {
    path: '/usuariopermiso',
    name: 'UsuarioPermiso',
    component: UsuarioPermiso,
  },
  // esta ruta es para probar cosas no va
  {
    path: '/facturacion',
    name: 'Facturacion',
    component: Facturacion,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router