<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

interface Props {
  imagen: string
  isActive: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['changeStatus'])
const iconPath = ref<string>('')
const isHidden = ref(!props.isActive)
const isSlotVisible = ref(false)

async function loadImage() {
  try {
    const module = await import(`../../assets/img/${props.imagen}.svg`)
    iconPath.value = module.default as string
  }
  catch (error) {

  }
}
function changeValue() {
  emits('changeStatus', !props.isActive)
}
watch(() => props.isActive, (newVal) => {
  if (newVal) {
    isHidden.value = false
    setTimeout(() => {
      isSlotVisible.value = true
    }, 700) // Duración de la transición de max-height
  }
  else {
    isSlotVisible.value = false
  }
})
function handleTransitionEnd(event: TransitionEvent) {
  if (event.propertyName === 'max-height' && event.target === event.currentTarget) {
    isSlotVisible.value = props.isActive
    if (!props.isActive)
      isHidden.value = true
  }
}
onMounted(() => {
  loadImage()
})
</script>

<template>
  <li
    :class="props.isActive ? `list-none items-center px-6 py-2 mt-4 duration-300  border-l-4` : 'duration-300  list-none items-center px-6 py-2 mt-4 border-sky-900 text-white hover:bg-sky-500 hover:bg-opacity-25 hover:text-gray-100 hover:duration-200'"
  >
    <div class="flex items-center " @click="changeValue">
      <img :src="iconPath" class="w-5 h-5">
      <a href="#" class="pl-4 text-white">Mantenimientos</a>
      <img src="../../assets/img/arrow.svg" class="h-6 w-5" :class="isActive ? 'origin-center rotate-90 transition duration-500' : 'duration-500'">
    </div>
    <ul
      class="transition-all duration-700 overflow-hidden"
      :class="[
        props.isActive ? 'max-h-screen' : 'max-h-0',
        isHidden ? 'hidden' : '',
      ]"
      style="transition-property: max-height;"
      @transitionend="handleTransitionEnd"
    >
      <div :class="[isSlotVisible ? 'opacity-100' : 'opacity-0']" class="transition-opacity duration-500">
        <slot />
      </div>
    </ul>
  </li>
</template>
