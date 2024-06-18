<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <h2>Agregar Evento</h2>
            <form @submit.prevent="addEvent">
                <div class="form-group">
                    <label for="titulo">Título:</label>
                    <input type="text" id="titulo" v-model="evento.Titulo" required />
                </div>
                <div class="form-group">
                    <label for="descripcion">Descripción:</label>
                    <textarea id="descripcion" v-model="evento.Descripcion"></textarea>
                </div>
                <div class="form-group">
                    <label for="fechaInicio">Fecha de Inicio:</label>
                    <input type="date" id="fechaInicio" v-model="evento.FechaInicio" required />
                </div>
                <div class="form-group">
                    <label for="fechaFin">Fecha de Fin:</label>
                    <input type="date" id="fechaFin" v-model="evento.FechaFin" required />
                </div>
                <div class="form-group">
                    <label for="lugar">Lugar:</label>
                    <input type="text" id="lugar" v-model="evento.Lugar" />
                </div>
                <div class="form-group">
                    <dropdown idDropDown="idDropDown-tipevent" labalItemNoselected="Tipo de Eventos"
                        :items="listTipEvent" StyleDropDown="width: 100dvw;" />
                </div>
                <button type="submit" class="submit-button">Guardar</button>
                <button type="button" class="close-modal-button" @click="closeModal">Cerrar</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { UpdateMonthIndex, $ShowModal, ShowModal } from '../stores/counter';
import { $value } from '../stores/dropdown';
import dropdown from './dropdown2.vue';
import axios from 'axios';




let store = useStore($ShowModal);
let valuetipevent = useStore($value);
const listTipEvent = ref<Array<{ id: Number, name: String }>>([]);
let showModal = ref<boolean>(false);
const evento = ref({
    Titulo: '',
    Descripcion: '',
    FechaInicio: '',
    FechaFin: '',
    Lugar: '',
    TipoEventoID: 1
});

// async function saveEvent() {
//     try {
//         await axios.post('http://192.168.1.189:3000/eventos', JSON.stringify(evento.value), {
//             headers: {
//                 "Content-type": "application/json"
//             }
//         });
//     } catch (error) {
//         console.error(JSON.stringify(error))
//     }
// }


async function GetTipEvent() {
    try {
        const response = await axios.get('http://192.168.1.189:3000/tiposeventos');
        const temp: Array<any> = response.data;
        temp.forEach((element) => {
            let tempobj = { id: 0, name: '' };
            tempobj.id = element?.TipoEventoID;
            tempobj.name = element?.Descripcion;
            listTipEvent.value.push(tempobj);
        });
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

const addEvent = () => {
    // console.log('Evento a agregar:', evento.value);
    axios.post('http://192.168.1.189:3000/eventos', JSON.stringify(evento.value), {
        headers: {
            "Content-type": "application/json"
        }
    });
    closeModal();
    resetEvento();
    UpdateMonthIndex(new Date().getMonth());
};

const closeModal = () => {
    ShowModal(false);
};

const resetEvento = () => {
    evento.value = {
        Titulo: '',
        Descripcion: '',
        FechaInicio: '',
        FechaFin: '',
        Lugar: '',
        TipoEventoID: 1
    };
};

watch(store, (newVal) => {
    showModal.value = newVal;
});

watch(valuetipevent, (newVal) => {
    evento.value.TipoEventoID = newVal.id;
});

onMounted(() => {
    GetTipEvent();
})
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(7px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-color: rgb(229 231 235);
    border-radius: 0.357rem;

    &> :focus {
        border: 1px solid rgba(159, 2, 190, 0.4);
        box-shadow: 0 0 1px 0 rgb(14 165 233 / 0.4) !important;
    }
}



.submit-button,
.close-modal-button {
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.submit-button {
    background-color: #28a745;
    color: white;
    margin-right: 10px;
}

.close-modal-button {
    background-color: #dc3545;
    color: white;
}
</style>
