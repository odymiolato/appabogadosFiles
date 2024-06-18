import { atom } from 'nanostores';

export const $value = atom({ id: 1, name: '' });

export function Updatevalue(obj: any) {
  $value.set(obj);
}

