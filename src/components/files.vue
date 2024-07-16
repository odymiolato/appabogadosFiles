<template>
    <div class="">
        <Alerts ClassAlert="hidden" />
    </div>
    <div class="mt-4 flex flex-col px-4 py-4 bg-white rounded-md">
        <div class="flex bg-white mb-4 w-full h-10 gap-5">
            <Inputs id="input-search" typeinput="search" labeltext="Buscar" :Value="searchTerm" @update="searchFiles" />
            <input id="input-setfile" type="file" accept=".pdf, .doc, .docx, .xlsx, .png, .jpg" hidden>
            <Buttons Buttonstext='Agregar Documento' @click="setFile()" />
        </div>
        <div id="file"
            class="flex bg-gray-200 overflow-y-auto overflow-x-hidden w-full px-4 py-4 rounded-md h-[18em] max-h-[18em] flex-wrap">
            <div class="file-item text-center w-20 px-2 py-2 ml-2 cursor-pointer hover:bg-gray-300 rounded-md relative"
                v-for="item in filteredFiles">
                <a target="_blank" :href="item?.path"><img :src="item.image" alt=""></a>
                <label class="block w-full text-ellipsis whitespace-nowrap overflow-clip truncate text-sm">
                    {{ item.filename }}
                </label>
                <span class="tooltip bg-gray-300">{{ item.filename + "." + item.extension }}</span>
            </div>
            <div v-if="files.length <= 0"
                class="flex w-full justify-center items-center border-solid font-bold text-2xl">
                <h3>No hay archivos.</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, computed } from 'vue';
import Inputs from './Inputs.vue';
import Buttons from './Buttons.vue';
import Alerts from './Alerts.vue';

const props = defineProps({
    path: { type: String, default: '' }
});

const URL: string = "http://localhost:8081/appabogadosFiles/";

let files = ref<Array<any>>([]);
let filesCopy = ref<Array<any>>([]);
let searchTerm = ref('');

const filteredFiles = computed(() => {
    if (searchTerm.value === '') {
        return files.value;
    }

    return files.value.filter(item =>
        item.filename.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

function searchFiles(value: any) {
    console.log("value", value);
    searchTerm.value = value;
}

async function GetFiles() {
    const response = await fetch(URL + 'getFiles.php', {
        method: "POST",
        body: JSON.stringify({ URL: props.path })
    });

    const values = await response.json();
    files.value = values;
    filesCopy.value = values;
}

function setFile() {
    const input: any = document.getElementById("input-setfile");
    if (input) {
        input.addEventListener('change', async () => {
            setTimeout(async () => {
                const file = input.files[0];
                if (!file) {
                    console.error("No file selected.");
                    return;
                }

                const formData = new FormData();
                formData.append('file', file);
                formData.append('URL', props.path);

                try {
                    const response = await fetch(URL + 'saveFile.php', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    GetFiles();
                } catch (error) {
                    console.error('Error:', error);
                }
            }, 512);
        });

        input.click();
    }
}


onMounted(() => {
    console.log(GetFiles());
});
</script>

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
