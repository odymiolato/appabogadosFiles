<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  InputType: { type: String, default: 'text' },
  InputClass: { type: String, default: '' },
  InputPlace: { type: String, default: '' },
  InputValue: { type: String, default: '' },
})
</script>

<template>
  <input :type="InputType" :value="InputValue" :class="`input ${InputClass}`" :placeholder="InputPlace">
</template>

<style scoped>
.input {
    border: 1px solid var(--clr-accent);
    width: 15em;
    height: 2.5em;
    padding-left: 0.8em;
    outline: none;
    overflow: hidden;
    background-color: #f3f3f3;
    border-radius: 10px;
    transition: all 0.5s;
}

.input:hover,
.input:focus {
    border: 1px solid var(--clr-accent);
    box-shadow: 0 0 7px 0 var(--clr-accent);
    background-color: white;
}
</style>
