<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Alerts from './Alerts.vue';
import { $alerts_list, addAlert, removeAlert } from '../stores/alerts'
import { useStore } from '@nanostores/vue';
import { watchEffect } from 'vue';
let list_alerts = useStore($alerts_list);


watchEffect(() => { 
  list_alerts.value.forEach((item, index) => {
    setTimeout(() => {
      removeAlert(index);
    }, 2500 * (index + 1));
  });
});



addAlert(1, '');
addAlert(2, '');
addAlert(3, '');
addAlert(4, '');

console.info(list_alerts.value);

</script>

<template>
  <div class="flex h-screen bg-gray-200 font-roboto  ">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
  <div class="w-[405px] fixed top-0 right-0 mt-20 mr-3 z-30">
    <ul class="flex flex-col gap-5">
      <li v-for="item in list_alerts">
        <Alerts :typeAlert="item.type" ClassAlert="" />
      </li>
    </ul>
  </div>

</template>
