<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useStore } from '@nanostores/vue'
import moment from 'moment'
import { $MonthIndex, ShowModal, UpdateMonthIndex } from '../stores/counter'
import labelcomponet from './label.vue'
import dropdown from './dropdown.vue'
import modal from './modalcontroller.vue'

const tempobj = ref<Array<any>>([])
const test = useStore($MonthIndex)
const nameMonth = ref<string>('')
const meses: Array<string> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

async function fetchData(date: string) {
  try {
    const response = await axios.get(`http://192.168.1.189:3000/calendar/${date}`)
    tempobj.value = response.data
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}

function changeMonth(index: number) {
  UpdateMonthIndex(index)
  fetchData(ReturnDate((index + 1).toString()))
}

function nextMonth() {
  if (test.value.index < 11)
    changeMonth(test.value.index + 1)
}

function previousMonth() {
  if (test.value.index > 0)
    changeMonth(test.value.index - 1)
}

function ReturnDate(month: string) {
  const date = new Date()
  const year: string = date.getFullYear().toString()
  return `${year + ((month.length === 1) ? `0${month}` : month)}01`
}

onMounted(() => {
  fetchData(ReturnDate((test.value.index + 1).toString()))
  nameMonth.value = meses[test.value.index]
})

watch(test, (newVal) => {
  nameMonth.value = meses[newVal.index]
  fetchData(ReturnDate((test.value.index + 1).toString()))
})
</script>

<template>
  <div id="app-calendar">
    <div id="toolbar" class="flex" style="justify-content: space-between;">
      <div class="flex">
        <labelcomponet labeltext="" />
      </div>
      <div class="flex btn-cal">
        <div style="user-select: none; display: flex; justify-content: center; width: 30px">
          <button
            v-if="test.index !== 0" style="font-size: 20px; margin-right: 15px;"
            class="btn-arrow" @click="previousMonth()"
          >
            {{ '<' }}
          </button>
        </div>
        <div style="display: flex; justify-content: center; width: 100px">
          <labelcomponet style="font-size: 20px; margin-top: 5px;" :labeltext="nameMonth" />
        </div>
        <div style="user-select: none; display: flex; justify-content: center; width: 30px">
          <button
            v-if="test.index !== 11" style="font-size: 20px; margin-left: 15px;" class="btn-arrow"
            @click="nextMonth()"
          >
            {{ '>' }}
          </button>
        </div>
      </div>
      <div class="flex">
        <dropdown labeltext="Meses" :event="meses" />
        <button class="btn-add-event" @click="ShowModal(true)">
          Agregar Evento
        </button>
      </div>
    </div>
    <div id="weekdays" class="grid cols-7">
      <span class="col">lunes</span>
      <span class="col">martes</span>
      <span class="col">miércoles</span>
      <span class="col">jueves</span>
      <span class="col">viernes</span>
      <span class="col">sábado</span>
      <span class="col">domingo</span>
    </div>
    <div id="days" class="grid same-height-rows cols-7">
      <span
        v-for="(obj, index) in tempobj" :key="index"
        :class="((index < 5 || (index > 34 && obj.day !== 31))) ? 'col col-previous' : 'col'"
      >
        <var
          :class="((moment(obj.date).format('MMM Do YY') === moment(new Date().setDate(new Date().getDate() - 1)).format('MMM Do YY')) && (index > 4 && index < 37)) ? 'indicator' : ''"
        >{{
          obj?.day }}</var>
        <ul class="items">
          <li v-for="temp in obj?.event" :key="temp.id" :style="`background:${temp.color};`">{{
                                                                                               temp?.Titulo }}
            <span>
              <div class="tooltip-header">
                <h3>{{ temp?.Titulo }}</h3>
              </div>
              <div class="tooltip-body">
                <div class="description">
                  <p>
                    {{ temp?.Descripcion }}
                  </p>
                </div>
                <div class="dates">
                  <div>
                    <labelcomponet labelclass="label-date" labeltext="Fecha de Inicio:" />
                    <labelcomponet
                      labelclass=""
                      :labeltext="moment(new Date()).format('DD/MM/yyyy')"
                    />

                  </div>
                  <div>
                    <labelcomponet labelclass="label-date" labeltext="Fecha de fin:" />
                    <labelcomponet
                      labelclass=""
                      :labeltext="moment(new Date()).format('DD/MM/yyyy')"
                    />
                  </div>
                </div>
              </div>
            </span>
          </li>
        </ul>
      </span>
    </div>
  </div>
  <modal />
</template>

<style scoped>
* {
    box-sizing: border-box;
    border: none;
    margin: 0;
    outline: none;
    padding: 0;
    max-width: 100%;
}

html {
    font-family: sans-serif;
}

.btn-arrow {
    background-color: hsl(0, 0%, 90%);
}

.btn-add-event {
    background-color: #0369a1;
    display: inline-flex;
    justify-content: center;
    padding: 11px;
    margin-left: 8px;
    width: 150px;
    min-width: 120px;
    border-radius: 6px;
    color: #fff;
    font-weight: bold;
}

.btn-add-event:hover {
    background-color: #0ea5e9;
}

.btn-add-event:active {
    transform: scale(0.9);
}

.btn-arrow:hover {
    transform: scale(1.5);
}

.btn-arrow:active {
    transform: scale(1);
}

:where(ol, ul) {
    & li {
        text-wrap: pretty;
    }

    &.items {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        color: #fff;

        &>li {
            display: flex;
            position: relative;
            justify-items: right;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 3px;
            border-radius: 5px;
            text-align: left;

            &>span {
                color: #000;
                visibility: hidden;
                background-color: hsl(0, 0%, 98%);
                border-radius: 10px;
                box-shadow: 0 0 4px 0 #000;
                translate: 100% -100%;
                padding: 10px;
                position: absolute;
                width: 250px;
                z-index: 10;

                &>.tooltip-header {
                    margin-bottom: 5px;
                }

                &>.tooltip-body {
                    display: flex;
                    flex-direction: column;
                    row-gap: 10px;

                    &>.description {
                        height: 65px;
                        max-height: 65px;
                        overflow: auto;
                        scrollbar-color: grey #fff;
                        scrollbar-width: thin;
                    }

                    &>.dates div {
                        display: grid;
                        grid-template-columns: 1fr 1fr;

                        &>.label-date {
                            font-weight: 900;
                        }
                    }
                }
            }
        }

        &>li:hover {
            &>span {
                visibility: visible;
            }
        }
    }
}

#app-calendar {
    background-color: hsl(0, 0%, 90%);
    border-radius: 16pt;
    display: flex;
    flex-direction: column;
    gap: 0.0625rem;
    min-height: 100dvh;
    inset: 0;
    margin: auto;
    outline: solid 1px hsla(0, 0%, 0%, 0.3);
    overflow: hidden;
    position: relative;
    width: 100%;

    &>#toolbar {
        padding: 1rem;
    }

    &>#weekdays {
        gap: 0.0625rem;
        flex: 1 1 0%;

        &>.col {
            overflow: clip;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    &>#days {
        gap: 0.0625rem;
        flex: 1 1 100%;
    }

    & .col {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: hsl(0, 0%, 98%);
        padding: 1rem;

        &>.indicator {
            background-color: rgb(144, 41, 228);
            color: #fff;
            border-radius: 50%;
            display: inline-grid;
            place-content: center center;
            width: 30px;
            height: 30px;
            /* padding: 10px 10px 10px 10px; */
        }

        &>.items {
            flex: 1;
        }
    }

    & .col-previous {
        background-color: hsl(0, 0%, 95%);
    }
}

.grid {
    display: grid;
    width: 100%;

    &.same-height-rows {
        grid-auto-rows: 1fr;
    }
}

.cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
}

.flex {
    display: flex;

    &.col {
        flex-direction: column;
    }
}
</style>
