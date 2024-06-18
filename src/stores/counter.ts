import { atom } from 'nanostores';

export const $MonthIndex = atom({ index: new Date().getMonth() });

export function UpdateMonthIndex(index: number = new Date().getMonth()) {
  $MonthIndex.set({ index });
}

export const $ShowModal = atom(false);

export function ShowModal(status: boolean = false) {
  $ShowModal.set(status);
}