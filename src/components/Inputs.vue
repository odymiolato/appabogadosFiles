<template>
  <label v-if="typeinput === 'Radio'">
    <input type="radio" class="w-5 h-5 text-sky-600 focus:ring-sky-500" name="radio"><span class="ml-2 text-gray-700">{{ labeltext }}</span>
  </label>

  <label v-if="typeinput === 'Checkbox'">
    <input type="checkbox" class="w-5 h-5 text-sky-600 rounded-md focus:ring-sky-500" name="radio"><span class="ml-2 text-gray-700">{{ labeltext }}</span>
  </label>

  <label v-if="typeinput === 'email'" class="block">
    <input type="email" placeholder="Email" class="block w-full mt-1 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
  </label>

  <label v-if="typeinput === 'text'" class="block">
    <input type="text" placeholder="Text" :readonly="isReadonly" class="block w-full mt-1 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
  </label>
  
  <label v-if="typeinput === 'file'" class="block">
    <input type="file" placeholder="Text" class="block w-full mt-1 border-gray-200 rounded-md focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500">
  </label>

  <div v-if="typeinput === 'Search' || typeinput === 'search'" class="relative mx-4 lg:mx-0">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <input class="w-32 pl-10 pr-4 border-gray-200 rounded-md sm:w-64 focus:border-sky-600 focus:ring focus:ring-opacity-40 focus:ring-sky-500" type="text" :placeholder="labeltext">
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const emits = defineEmits(["update"]);

const props = defineProps({
  labeltext: { type: String, default: 'text' },
  typeinput: { type: String, default: 'text' },
  inputClass: { type: String, default: '' },
  isReadonly: { type: Boolean, default: false },
})

const set_value = ($event: any) => {
  let value = $event.target.value;
  emits("update", value);
}
</script>
