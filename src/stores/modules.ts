import { atom } from 'nanostores';
import { menu } from '../interface/all.interface';

let Menu: menu = { 
    modules: [
        { name: 'dashboard', isActive: false, icon: '', form: [{ name: '', path: '', icon: '' }] },
        { name: 'Clientes', isActive: false, icon: '', form: [{ name: '', path: '', icon: '' }] },
        { name: 'Expedientes', isActive: false, icon: '', form: [{ name: '', path: '', icon: '' }] },
        { name: 'Vehiculos', isActive: false, icon: '', form: [{ name: '', path: '', icon: '' }] },
    ], 
};

export const $value = atom(Menu);

export function isActive(obj: any) {
    $value.set(obj);
}

