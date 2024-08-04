<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const position = ref({ x: 0, y: 0 });

function showMenu(event: MouseEvent) {
    position.value = { x: event.clientX, y: event.clientY };
    visible.value = true;
}

function hideMenu() {
    visible.value = false;
}

function menuAction(action: string) {
    hideMenu();
    emit('action', action);
}

const emit = defineEmits<{
    (e: 'action', action: string): void;
}>();

defineExpose({
    showMenu,
    hideMenu,
});
</script>

<template>
    <div v-if="visible" :style="{ top: `${position.y}px`, left: `${position.x}px` }"
        class=" /* 6px */ context-menu absolute bg-white border border-gray-300 rounded-[10px] shadow-lg z-50">
        <ul class="list-none p-2">
            <li @click="menuAction('descargar')" class="px-4 py-2 font-medium hover:bg-gray-300 text-black cursor-pointer rounded-md">
                Descargar
            </li>
            <li @click="menuAction('eliminar')" class="px-4 py-2 font-medium hover:bg-gray-300 text-black cursor-pointer rounded-md">
                Eliminar
            </li>
            <li @click="menuAction('cancelar')" class="px-4 py-2 font-medium hover:bg-gray-300 text-black cursor-pointer rounded-md">
                Cancelar
            </li>
        </ul>
    </div>
</template>

<style scoped>
</style>