<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  to: string
  name: string
  imagen: string
  label: string
}

const props = defineProps<Props>()

const activeClass = ref(
  'duration-700  bg-sky-500 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'duration-700  border-sky-900 text-white transition duration-700 hover:bg-sky-500 hover:bg-opacity-25 hover:text-gray-100 hover:duration-200',
)
const iconPath = ref<string>('')
async function loadImage() {
  try {
    const module = await import(`../../assets/img/${props.imagen}.svg`)
    iconPath.value = module.default as string
  }
  catch (error) {

  }
}

onMounted(() => {
  loadImage()
})
</script>

<template>
  <router-link
    :class="[$route.name === name ? activeClass : inactiveClass]"
    :to="to"
    class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
  >
    <img :src="iconPath" class="w-5 h-5">
    <span class="mx-4">{{ label }}</span>
  </router-link>
</template>
