<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from 'vue'
import Inputs from './Inputs.vue'
import Buttons from './Buttons.vue'
import Alerts from './Alerts.vue'
import ContextMenu from './ContextMenu.vue'
import { addAlert } from '../stores/alerts'
import { ContextMenuInstance } from '../interface/all.interface'

const props = defineProps({
  path: { type: String, default: '' },
});

const URL: string = 'http://localhost/appabogadosFiles/'
const files = ref<Array<any>>([])
const filesCopy = ref<Array<any>>([])
const searchTerm = ref('')
const selectedFile = ref<any>(null)
const contextMenuRef = ref<ContextMenuInstance | null>(null)

const filteredFiles = computed(() => {
  if (searchTerm.value === '') return files.value
  return files.value.filter((item) =>
    item.filename.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

function searchFiles(value: any) {
  searchTerm.value = value
}

async function GetFiles() {
  const response = await fetch(`${URL}getFiles.php`, {
    method: 'POST',
    body: JSON.stringify({ URL: props.path }),
  });

  const values = await response.json()
  files.value = values
  filesCopy.value = values
}

function setFile() {
  const input: any = document.getElementById('input-setfile')
  if (input) {
    input.addEventListener('change', async () => {
      setTimeout(async () => {
        const file = input.files[0]
        if (!file) {
          console.error('No file selected.')
          return;
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('URL', props.path)

        try {
          const response = await fetch(`${URL}saveFile.php`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) throw new Error('Network response was not ok')

          GetFiles();
        } catch (error) {
          console.error('Error:', error)
        }
      }, 512);
    });

    input.click();
  }
}

function downloadFile(file: any) {
  try {
    const link = document.createElement('a')
    link.href = file.path
    link.target = '_blank'
    link.download = file.filename
    link.click()
  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

async function deleteFile(file: any) {
  try {
    const response = await fetch(`${URL}deleteFile.php`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ URL: String(file.path) })
    })

    if (response.ok) {
      const valueobj = await response.json()
      switch (valueobj?.status) {
        case 0:
          addAlert(4, valueobj?.message)
          break;
        case 1:
          addAlert(2, valueobj?.message)
          GetFiles()
          break;
        case 2:
          addAlert(3, valueobj?.message)
          break;
        case 'error':
          addAlert(3, valueobj?.message)
          break;

        default:
          break;
      }
    } else {
      addAlert(3, response.statusText)
      console.error(response.statusText)
    }
  } catch (error) {
    addAlert(3, JSON.stringify(error))
    console.error(error)
  }
}

function onRightClick(event: MouseEvent, item: any) {
  event.preventDefault()
  selectedFile.value = item
  if (contextMenuRef.value) {
    contextMenuRef.value.showMenu(event)
  }
}

function handleAction(action: string) {
  if (!selectedFile.value) {
    return
  }

  switch (action) {
    case 'descargar':
      downloadFile(selectedFile.value)
      break
    case 'eliminar':
      deleteFile(selectedFile.value)
      break
    case 'cancelar':

      break
    default:
      break
  }
}

onMounted(() => {
  GetFiles()
});
</script>


<template>
  <div @click="contextMenuRef?.hideMenu()">
    <Alerts ClassAlert="hidden" />
  </div>
  <div class="mt-4 flex flex-col px-4 py-4 bg-white rounded-md">
    <div class="flex bg-white mb-4 w-full h-10 gap-5">
      <Inputs id="input-search" typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchFiles" />
      <input id="input-setfile" type="file" accept=".pdf, .doc, .docx, .xlsx, .png, .jpg" hidden>
      <Buttons Buttonstext="Agregar Documento" @click="setFile()" />
    </div>
    <div id="file"
      class="flex bg-gray-200 overflow-y-auto overflow-x-hidden w-full px-4 py-4 rounded-md h-[18em] max-h-[18em] flex-wrap">
      <div v-for="item in filteredFiles" @contextmenu.prevent="onRightClick($event, item)" :key="item.filename"
        class="file-item text-center w-20 px-2 py-2 ml-2 cursor-pointer hover:bg-gray-300 rounded-md relative">
        <a target="_blank" :href="item?.path"><img :src="item.image" alt=""></a>
        <label class="block w-full text-ellipsis whitespace-nowrap overflow-clip truncate text-sm">
          {{ item.filename }}
        </label>
        <span class="tooltip bg-gray-300">{{ `${item.filename}.${item.extension}` }}</span>
      </div>
      <div v-if="files.length <= 0" class="flex w-full justify-center items-center border-solid font-bold text-2xl">
        <h3>No hay archivos.</h3>
      </div>
    </div>
    <!-- Añadir el componente ContextMenu -->
    <ContextMenu ref="contextMenuRef" @action="handleAction" />
  </div>
</template>


<style scoped>
#file {
  &>div {
    &>span {
      position: absolute;
      visibility: hidden;
      text-align: center;
      color: #000;
      font-weight: bold;
      padding: 6px 10px 6px 10px;
      border-radius: 10px;
      box-shadow: 0 0 6px 0 #8d8d8d;
      font-size: 13px;
      translate: 39% -188%;
      z-index: 10;
    }
  }

  &>div:hover {
    &>span {
      visibility: visible;
    }
  }
}
</style>
