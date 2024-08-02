<template>
    <div class="todo">
        <div class="q-pa-md">
            <q-table title="Fichas" :rows="rows" :columns="columns" row-key="name">
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn label="📝" color="black" @click="icon = true" />
                        <q-btn v-if="props.row.estado == 0" @click="activar(props.row._id)">✅</q-btn>
                        <q-btn v-else @click="desactivar(props.row._id)">❌</q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-estado1="props">
                    <q-td :props="props">
                        <p style="color:green" v-if="props.row.estado == 1">Activo</p>
                        <p style="color:red" v-else>Inactivo</p>
                    </q-td>
                </template>
            </q-table>
        </div>
        <div class="q-pa-md q-gutter-sm">
            <q-btn label="Crear ficha" color="black" @click="icon = true" />
        </div>
        <div class="q-pa-md q-gutter-sm">
            <q-dialog v-model="icon" persistent>
                <q-card>
                    <q-card-section class="row items-center q-pb-none">
                        <div class="text-h6">Editar Ficha</div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>

                    <q-card-section>
                        <div class="q-pa-md" style="max-width: 400px">
                            <q-form @submit="onSubmit()" @reset="onReset()" class="q-gutter-md">
                                <q-input filled v-model="code" label="Código *" hint="Código de la ficha" lazy-rules
                                    :rules="[val => val && val.length > 0 || 'Por favor, dígite el código de la ficha']" />
                                <q-input filled v-model="name" label="Nombre *" hint="Nombre de la ficha" lazy-rules
                                    :rules="[val => val && val.length > 0 || 'Por favor, dígite el nombre de la ficha']" />
                                <div>
                                    <q-btn label="Guardar" type="submit" color="primary" />
                                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                                </div>
                            </q-form>
                        </div>
                    </q-card-section>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { onBeforeMount, ref } from 'vue'
import { useFichaStore } from './../stores/fichas.js';

let useFicha = useFichaStore()
let $q = useQuasar()
let code = ref("")
let name = ref("")
let icon = ref(false)
let rows = ref([]);
let columns = ref([
    { name: 'nombre1', required: true, label: 'Nombre del programa', align: 'center', field: "nombre", sortable: true },
    { name: 'codigo1', align: 'center', label: 'Número de ficha', field: 'codigo' },
    { name: 'estado1', align: 'center', label: 'Estado', field: 'estado' },
    { name: 'opciones', align: 'center', label: 'Opciones' }
]);

onBeforeMount(() => {
    traer()
})

async function traer() {
    let res = await useFicha.getListarFichas()
    rows.value = res.data.fichas
}

async function activar(id) {
    let res = await useFicha.putActivarFichas(id)
    traer()
}

async function desactivar(id) {
    let res = await useFicha.putDesactivarFichas(id)
    traer()
}

function onSubmit() {
    if (!name.value && !code.value) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Falta llenar datos'
        })

    } else {
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Actualización exitosa'
        })
        onReset()
        icon.value = false
    }
}

function onReset() {
    name.value = null
    code.value = null
}
</script>
<style scoped></style>