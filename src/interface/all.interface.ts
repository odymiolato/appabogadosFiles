import Alerts from "../components/Alerts.vue"

export interface menu {
    modules: Array<modulo>
}

interface modulo {
    name: string,
    isActive: boolean,
    icon: string,
    form: [
        {
            name: string,
            path: string,
            icon: string
        }
    ]
}

export interface Alerts {
    index:number;
    type: number;
    message: string;
}

export interface ContextMenuInstance {
    showMenu: (event: MouseEvent) => void;
    hideMenu: () => void;
  }

  export interface diccionSelected{
    direccion_dir:string,
    nombre_ciu:string,
    nombre_pro:string
  }