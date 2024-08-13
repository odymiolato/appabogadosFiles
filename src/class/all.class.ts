export class ciudades {
  codciu_ciu: number
  nombre_ciu: string
  codpro_ciu: number
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codciu_ciu = 0
    this.nombre_ciu = ''
    this.codpro_ciu = 0
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class asignaciones_vehiculos {
  codasig_asv: number
  codveh_asv: number
  codabo_asv: number
  codaud_asv: number
  fecha_asv: Date
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codasig_asv = 0
    this.codveh_asv = 0
    this.codabo_asv = 0
    this.codaud_asv = 0
    this.fecha_asv = new Date()
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class codigos_postales {
  codigo_postal_cdp: string
  codciu_cdp: number
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codigo_postal_cdp = ''
    this.codciu_cdp = 0
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class origen_direcciones {
  codorigen_ori: string
  descricion_ori: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codorigen_ori = ''
    this.descricion_ori = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class super_auditoria {
  id_aud: number
  tabla: string
  tipo_operacion: string
  campo_afectado: string
  fecha_operacion: Date
  usuario: number
  datos_antes: string
  datos_despues: string
  constructor() {
    this.id_aud = 0
    this.tabla = ''
    this.tipo_operacion = ''
    this.campo_afectado = ''
    this.fecha_operacion = new Date()
    this.usuario = 0
    this.datos_antes = ''
    this.datos_despues = ''
  }
}
export class direcciones {
  codperte_dir: number
  codorigen_dir: string
  direccion_dir: string
  codciu_dir: number
  codigo_postal_dir: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codperte_dir = 0
    this.codorigen_dir = ''
    this.direccion_dir = ''
    this.codciu_dir = 0
    this.codigo_postal_dir = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class tipo_interaccion {
  codtin_tin: number
  descripcion_tin: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codtin_tin = 0
    this.descripcion_tin = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class interacciones {
  codint_int: number
  codcli_int: number
  fecha_int: Date
  codtin_int: number
  detalle_int: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codint_int = 0
    this.codcli_int = 0
    this.fecha_int = new Date()
    this.codtin_int = 0
    this.detalle_int = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class TipoEvento {
  TipoEventoID: number
  Descripcion: string
  color: string
  constructor() {
    this.TipoEventoID = 0
    this.Descripcion = ''
    this.color = ''
  }
}
export class Eventos {
  EventoID: number
  Titulo: string
  Descripcion: string
  FechaInicio: Date
  FechaFin: Date
  hora: Date
  Lugar: string
  TipoEventoID: number
  constructor() {
    this.EventoID = 0
    this.Titulo = ''
    this.Descripcion = ''
    this.FechaInicio = new Date()
    this.FechaFin = new Date()
    this.hora = new Date()
    this.Lugar = ''
    this.TipoEventoID = 0
  }
}
export class perfiles {
  codperf_perf: number
  nombre_perf: string
  descripcion_perf: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codperf_perf = 0
    this.nombre_perf = ''
    this.descripcion_perf = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class modulos {
  codmod_mod: number
  nombre_mod: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codmod_mod = 0
    this.nombre_mod = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}

export class perfil_programas {
  codperf_ppr: number;
  codmod_ppr: number;
  codpro_ppr: number;
  insertar_ppr: boolean;
  eliminar_ppr: boolean;
  modificar_ppr: boolean;
  constructor() {
    this.codperf_ppr = 0;
    this.codmod_ppr = 0;
    this.codpro_ppr = 0;
    this.insertar_ppr = false;
    this.eliminar_ppr = false;
    this.modificar_ppr = false;
  }
}

export class programas {
  codpro_pro: number;
  tippro_tpr: number;
  name_pro: string;
  path_pro: string;
  constructor() {
    this.codpro_pro = 0;
    this.tippro_tpr = 0;
    this.name_pro = "";
    this.path_pro = "";
  }
}

export class modulo_programa {
  codmod_mop: number;
  codpro_mop: number;
  acceso: boolean;
  constructor() {
    this.codmod_mop = 0;
    this.codpro_mop = 0;
    this.acceso = false;
  }
}

export class usuarios {
  codusr_usr: number | null;
  nombre_usr: string;
  codperf_usr: number | null;
  contrasena_usr: string;
  usercrea: number | null;
  usermod: number | null;
  fechcrea: Date | null;
  fechmod: Date | null;

  constructor() {
    this.codusr_usr = null;
    this.nombre_usr = '';
    this.codperf_usr = null;
    this.contrasena_usr = '';
    this.usercrea = null;
    this.usermod = null;
    this.fechcrea = new Date();
    this.fechmod = new Date();
  }
}

export class abogados {
  codabo_abo: number
  nombre_abo: string
  direcc_abo: string
  telefo_abo: string
  cedula_abo: string
  tipo_especialidad_abo: number
  estado_abo: string
  fecnac_abo: Date
  email_abo: string
  fecini_abo: Date
  usercre: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codabo_abo = 0
    this.nombre_abo = ''
    this.direcc_abo = ''
    this.telefo_abo = ''
    this.cedula_abo = ''
    this.tipo_especialidad_abo = 0
    this.estado_abo = ''
    this.fecnac_abo = new Date()
    this.email_abo = ''
    this.fecini_abo = new Date()
    this.usercre = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class audiencias {
  codaud_aud: number
  fecha_aud: Date
  numexp_aud: number
  codtri_aud: number
  estado_aud: string
  hora_aud: Date
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codaud_aud = 0
    this.fecha_aud = new Date()
    this.numexp_aud = 0
    this.codtri_aud = 0
    this.estado_aud = ''
    this.hora_aud = new Date()
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class usertoken {
  UserID: number
  token: string
  createdDate: Date
  expiredDate: Date
  expired: boolean
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.UserID = 0
    this.token = ''
    this.createdDate = new Date()
    this.expiredDate = new Date()
    this.expired = false
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class contrapartes {
  codcon_con: number
  nombre_con: string
  direcc_con: string
  telefo_con: string
  tipdoc_con: number
  doc_con: string
  email_con: string
  estatu_con: string
  usercrea: string
  usermod: string
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codcon_con = 0
    this.nombre_con = ''
    this.direcc_con = ''
    this.telefo_con = ''
    this.tipdoc_con = 0
    this.doc_con = ''
    this.email_con = ''
    this.estatu_con = ''
    this.usercrea = ''
    this.usermod = ''
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class movimientos_h {
  codmov_movh: number
  comentario_movh: string
  fecha_movh: Date | null | undefined
  total_movh: number
  estado_movh: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codmov_movh = 0
    this.comentario_movh = ''
    this.fecha_movh = null
    this.total_movh = 0
    this.estado_movh = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class movimientos_d {
  codhmov_movd: number
  tipmov_movd: number
  numexp_movd: number
  monto_movd: number
  constructor() {
    this.codhmov_movd = 0
    this.tipmov_movd = 0
    this.numexp_movd = 0
    this.monto_movd = 0
  }
}
export class seguimientos {
  codseg_seg: number
  numexp_seg: number
  fecha_seg: Date
  detalle_seg: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codseg_seg = 0
    this.numexp_seg = 0
    this.fecha_seg = new Date()
    this.detalle_seg = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class extenciones_documentos {
  extens_ext: string
  descri_ext: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.extens_ext = ''
    this.descri_ext = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class especialidades {
  tipesp_tip: number
  descri_tip: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.tipesp_tip = 0
    this.descri_tip = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}

export class expedientes {
  codexp_exp: number
  descri_exp: string
  fecini_exp: Date | null
  estatu_exp: string
  fecfin_exp: Date | null
  tipexp_exp: number
  balhon_exp: number
  balgasop_exp: number
  balgasju_exp: number
  balpagter_exp: number
  ubi_exp: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codexp_exp = 0
    this.descri_exp = ''
    this.fecini_exp = null
    this.estatu_exp = ''
    this.fecfin_exp = null
    this.tipexp_exp = 0
    this.balhon_exp = 0
    this.balgasop_exp = 0
    this.balgasju_exp = 0
    this.balpagter_exp = 0
    this.ubi_exp = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class tipos_expedientes {
  tipexp_tip: number
  descri_tip: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.tipexp_tip = 0
    this.descri_tip = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class tipos_gastos {
  tipgas_tga: string
  descri_tga: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.tipgas_tga = ''
    this.descri_tga = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class tipo_movimientos {
  tipmov_tmo: number
  descri_tmo: string
  origen_tmo: string
  estado_tmo: string
  tipgas_tmo: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.tipmov_tmo = 0
    this.descri_tmo = ''
    this.origen_tmo = ''
    this.estado_tmo = ''
    this.tipgas_tmo = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class tribunales {
  codtri_tri: number
  descri_tri: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codtri_tri = 0
    this.descri_tri = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class notas {
  codnot_not: number
  numexp_not: number
  coduser_not: number
  nota_not: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codnot_not = 0
    this.numexp_not = 0
    this.coduser_not = 0
    this.nota_not = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class clientes {
  codcli_cli: number
  nombre_cli: string
  apellido_cli: string
  fecnac_cli: Date
  numdoc_cli: string
  email_cli: string
  telefono_cli: string
  fecini_cli: Date
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codcli_cli = 0
    this.nombre_cli = ''
    this.apellido_cli = ''
    this.fecnac_cli = new Date()
    this.numdoc_cli = ''
    this.email_cli = ''
    this.telefono_cli = ''
    this.fecini_cli = new Date()
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class vehiculos_marcas {
  codmarca_mar: number
  nombre_mar: string
  constructor() {
    this.codmarca_mar = 0
    this.nombre_mar = ''
  }
}
export class vehiculos_modelos {
  codmodelo_mod: number
  nombre_mod: string
  codmarca_mod: number
  constructor() {
    this.codmodelo_mod = 0
    this.nombre_mod = ''
    this.codmarca_mod = 0
  }
}
export class paises {
  codpais_pais: number
  nombre_pais: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codpais_pais = 0
    this.nombre_pais = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class vehiculos_estados {
  codestado_est: string
  descripcion_est: string
  constructor() {
    this.codestado_est = ''
    this.descripcion_est = ''
  }
}
export class vehiculos {
  codveh_veh: number
  codmodelo_veh: number
  anio_veh: number
  placa_veh: string
  codestado_veh: string
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codveh_veh = 0
    this.codmodelo_veh = 0
    this.anio_veh = 0
    this.placa_veh = ''
    this.codestado_veh = ''
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}
export class provincias {
  codpro_pro: number
  nombre_pro: string
  codpais_pro: number
  usercrea: number
  usermod: number
  fechcrea: Date
  fechmod: Date
  constructor() {
    this.codpro_pro = 0
    this.nombre_pro = ''
    this.codpais_pro = 0
    this.usercrea = 0
    this.usermod = 0
    this.fechcrea = new Date()
    this.fechmod = new Date()
  }
}

export class ExpedienteDetalle {
  abogados: { id: number; name: string }[]
  clientes: { id: number; name: string }[]
  contrapartes: { id: number; name: string }[]
  tribunales: { id: number; name: string }[]

  constructor(
    abogados: { id: number; name: string }[],
    clientes: { id: number; name: string }[],
    contrapartes: { id: number; name: string }[],
    tribunales: { id: number; name: string }[],
  ) {
    this.abogados = abogados
    this.clientes = clientes
    this.contrapartes = contrapartes
    this.tribunales = tribunales
  }
}

export class login {
  Name: string;
  Password: string;

  constructor() {
    this.Name = '';
    this.Password = '';
  }
}

export class Modules {
  Name: string;
  TypePrograms: {
    Name: string;
    Programs: {
      name_pro: string;
      path_pro: string;
    }[];
  }[];

  constructor() {
    this.Name = "";
    this.TypePrograms = [
      {
        Name: "",
        Programs: []
      }
    ];
  }
}

export class movimientos {
  codmov_movh: number;
  descri_tmo: string;
  fecha_movh: Date | null;
  Debito: number;
  Credito: number;
  constructor() {
    this.codmov_movh = 0;
    this.descri_tmo = '';
    this.fecha_movh = null;
    this.Debito = 0;
    this.Credito = 0;
  }
}

export class BalanceMovimientos {
  tipgas_tmo: string
  Debito: number
  Credito: number
  constructor() {
    this.tipgas_tmo = ''
    this.Debito = 0
    this.Credito = 0
  }
}
