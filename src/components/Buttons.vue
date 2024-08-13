<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  Buttonstext: { type: String, default: 'button name' },
})
</script>

<template>
  <button
    class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-sky-700 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-500">
    {{ Buttonstext }}
  </button>
</template>
