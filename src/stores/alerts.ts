// stores/alerts.ts
import { atom } from 'nanostores';
import { Alerts } from '../interface/all.interface';

export let $alerts_list = atom<Alerts[]>([]);

export function addAlert(type: number, message: string) {
  const currentAlerts = $alerts_list.get();
  const newAlert: Alerts = {
    index: currentAlerts.length > 0 ? currentAlerts[currentAlerts.length - 1].index + 1 : 0,
    type,
    message,
  };
  $alerts_list.set([...currentAlerts, newAlert]);
}

export function removeAlert(indexAlert: number) {
  $alerts_list.set($alerts_list.get().filter(alert => alert.index !== indexAlert));
}
