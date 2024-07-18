<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import Label from '../label.vue';

const props = defineProps({
  label: { type: String, default: '' },
  imagen: { type: String, default: '' }
});

let classIsActive: string = "border-l-4 duration-700 border-gray-100";
let classInActive: string = "border-sky-900 text-white ";

const isActive = ref<boolean>(false);
const imagenLocal = ref<string>(props.imagen);
const thisComponent = ref<HTMLDetailsElement | null>(null);

async function loadImage() {
  try {
    const module = await import(`../../assets/img/${props.imagen}.svg`);
    imagenLocal.value = module.default as string;
  } catch (error) {
    console.error('Error loading image:', error);
  }
}

onMounted(() => {
  loadImage();
  if (thisComponent.value) {
    thisComponent.value.addEventListener('toggle', () => {
      isActive.value = thisComponent.value?.open || false;
    });
  }
});
</script>

<template>
  <details :class="isActive ? classIsActive : classInActive" ref="thisComponent"
    class="duration-300 list-none items-center px-6 py-2 mt-4 hover:bg-sky-500 hover:bg-opacity-25 hover:text-gray-100 hover:duration-200">
    <summary class="flex items-center">
      <img :src="imagenLocal" class="w-5 h-5">
      <a href="#" class="pl-4 text-white pointer-events-none select-none">{{ label }}</a>
      <img src="../../assets/img/arrow.svg" class="h-6 w-5 select-none"
        :class="isActive ? 'origin-center rotate-90 transition duration-500' : 'duration-500'">
    </summary>
    <ul>
      <slot />
    </ul>
  </details>
</template>
