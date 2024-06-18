<template>
    <label :class="labelclass">{{ labeltext }}</label>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    labeltext: { type: String, default: 'label text' },
    labelclass: { type: String, default: '' }
});
</script>

<style scoped></style>
