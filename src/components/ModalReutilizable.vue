<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import apiClient from '../axiosConfig'
import Inputs from './Inputs.vue'
import Modal from './Modal.vue'

const props = defineProps({
  modalTitle: String,
  endpoint: String,
  showModal: Boolean,
  codeField: String,
  nameField: String,
})

const emit = defineEmits(['update:showModal', 'selected'])

const searchTerm = ref('')
const dataList = ref([])

async function fetchData() {
  try {
    const response = await apiClient.get(props.endpoint)
    dataList.value = response.data
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}

const filteredData = computed(() => {
  if (searchTerm.value === '')
    return dataList.value

  return dataList.value.filter(item =>
    String(item[props.codeField]).toLowerCase().includes(searchTerm.value.toLowerCase())
    || item[props.nameField].toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

function searchData(value: string) {
  searchTerm.value = value
}

function setSelected(obj: any) {
  emit('selected', obj)
  emit('update:showModal', false)
}

function handleAccept() {
  emit('update:showModal', false)
}

function handleDecline() {
  emit('update:showModal', false)
}

function handleClose() {
  emit('update:showModal', false)
}

watch(() => props.showModal, (newVal) => {
  if (newVal)
    fetchData()
})
</script>

<template>
  <Modal
    v-if="showModal" class="flex justify-center items-center" :title="modalTitle" :btn-visible="false"
    @close="handleClose" @accept="handleAccept" @decline="handleDecline"
  >
    <template #body>
      <Inputs typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchData" />
      <div>
        <div class="mt-2">
          <div class="my-6 overflow-hidden bg-white rounded-md shadow max-h-[289px] overflow-y-auto">
            <table class="w-full text-left border-collapse">
              <thead class="border-b top-0 sticky z-20">
                <tr>
                  <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                    Código
                  </th>
                  <th class="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-sky-800">
                    Nombre
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value) in filteredData" :key="value[props.codeField]" class="hover:bg-gray-200 cursor-pointer"
                  @click="setSelected(value)"
                >
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ value[props.codeField] }}
                  </td>
                  <td class="px-6 py-4 text-lg text-gray-700 border-b">
                    {{ value[props.nameField] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>
