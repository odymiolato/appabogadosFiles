<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { useStore } from '@nanostores/vue'
import { $MonthIndex, UpdateMonthIndex } from '../stores/counter'

const props = defineProps({
  labalItemNoselected: { type: String, default: '' },
  labeltext: { type: String, default: 'text example' },
  value: { type: Number, default: 1 },
  event: { type: Array<any>, default: [] },
  StyleDropDown: { type: String, default: '' },
})

const store = useStore($MonthIndex)
const NameSelectd = ref<string>(props.event[store.value.index])

watch(store, (newVal) => {
  console.log(newVal)
  NameSelectd.value = props.event[newVal.index]
})

function CloseDropDowun(index: number) {
  document.querySelector('details')?.removeAttribute('open')
  UpdateMonthIndex(index)
}
</script>

<template>
  <details>
    <summary :style="StyleDropDown">
      {{ (NameSelectd !== '') ? NameSelectd : labalItemNoselected }}
      <span>></span>
    </summary>
    <div class="dropmenu">
      <ul class="data">
        <li v-for="(item, index) in event" @click="CloseDropDowun(index)">
          {{ item }}
        </li>
      </ul>
    </div>
  </details>
  <link rel="stylesheet" href="https://api.fontshare.com/css?f[]=satoshi&display=swap">
</template>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    max-width: 100%;
}

html {
    font-family: "satoshi", sans-serif;
}

body {
    display: grid;
    place-content: center center;
    height: 100dvh;
}

details {
    display: inline-flex;
    position: relative;
    user-select: none;
    z-index: 10;

    &>summary {
        background-color: #0369a1;
        display: inline-flex;
        justify-content: center;
        padding: 10px;
        width: 150px;
        min-width: 120px;
        border-radius: 6px;
        color: #fff;
        font-weight: bold;

        &>span {
            padding: 0 10px;
            transform: rotate(90deg);
            position: absolute;
            inset: auto 0 auto auto;
        }
    }

    &>.dropmenu {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        overflow: clip;
        margin: 3px 0 0 0;
        background: #e8e4e3;
        padding: 0.4rem;
        inset: 100% 0 0 0;
        position: absolute;
        min-height: max-content;
        height: max-content;
        max-height: calc(clamp(16dvh, 25dvh, 32dvh) + 1rem);
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 0 4px 0 #8c8989;

        &>.data {
            display: flex;
            flex-direction: column;
            overflow-x: clip;
            overflow-y: auto;
            min-width: max-content;
            list-style: none;
            background: #fff;
            padding: 10px;
            border-radius: 10px;

            &>li {
                padding: 10px 0 5px 10px;
                border-bottom: 0.5px solid #e8e4e3;
                cursor: pointer;
                border-radius: 10px;
            }

            &>li:hover {
                background-color: #e8e4e3;
            }
        }
    }
}

/* Hide scrollbar for Chrome, Safari and Opera */
.data::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.data {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>
