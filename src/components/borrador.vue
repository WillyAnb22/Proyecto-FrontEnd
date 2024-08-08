<template>
    <div style="margin: 10px;">
      <div style="display:flex; justify-content: end;">
        <q-btn @click="fixed = true" color="primary">Agregar Ficha</q-btn>
      </div>
      <q-table
        title="Fichas"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
      <template v-slot:body-cell-opciones="props">
        <q-td :props="props">
          <q-btn @click="abrirModal()" color="primary">📝</q-btn>
          <q-btn @click="activar(props.row._id)" v-if="props.row.estado==0">✅</q-btn>
          <q-btn @click="activar(props.row._id)" v-else>❌</q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-estado1="props">
        <q-td :props="props">
          <p style="color:green" v-if="props.row.estado==1">Activo</p>
          <p style="color:red" v-else>Inactivo</p>
        </q-td>
      </template>
    </q-table>
       <q-dialog v-model="fixed" :backdrop-filter="'blur(4px) saturate(150%)'" transition-show="rotate" transition-hide="rotate" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ b==true?"Editar Ficha":"Guardar Ficha" }}</div>
          </q-card-section>
  
          <q-separator />
  
          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input filled v-model="num" label="Nombre De La Ficha" :dense="dense" />
             <q-input filled v-model="cod" label="Codigo De La Ficha" :dense="dense" />
          </q-card-section>
  
          <q-separator />
  
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup @click="b=false" />
            <q-btn flat label="Guardar" color="primary" @click="crearFicha()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
    </div>
  </template>
  
  <script setup>
  import axios from "axios"
  import { onBeforeMount, ref } from "vue";
  import { Notify } from 'quasar'
  import { useQuasar } from 'quasar'
  import {useFichaStore} from "./stores/fichas.js"
  
  const useFicha = useFichaStore()
  
  const $q = useQuasar()
  let r = ref("")
  let fixed = ref(false)
  let num = ref("")
  let cod = ref("")
  let error =ref("")
  let b = ref(false)
  
  const rows = ref([
   
  ])
  
  onBeforeMount(()=>{
    traer()
  })
  
  function abrirModal(){
    fixed.value = true
    b.value=true
  }
  
  function validar(){
    console.log("hola");
    if (num.value==""){
      //error= "Por favor digite el nombre de la ficha"
          $q.notify({
            type: 'negative',
            message: "Por favor digite el nombre de la ficha"
          })
        
    }else if (cod.value==""){
      //error= "Por favor digite el nombre de la ficha"
          $q.notify({
            type: 'negative',
            message: "Por favor digite el numero de la ficha"
          })
        
    }
  }
  
  async function traer(){
    let res = await useFicha.listarFichas()
    rows.value = res.data
  }
  
  async function activar(id){
    console.log(id);
    try {
      let r = await axios.put(`http://localhost:4500/api/Fichas/activarDesactivar/${id}`)
      traer()
    } catch (error) {
      console.log(error);
    }
  }
  
  async function crearFicha(){
   console.log(b.value);
    if (b.value==true){
      console.log("estoy editando...");
    }else{
      let res = await useFicha.guardarFicha(cod.value, num.value)
      await traer()
      fixed.value=false
    }
  }
  
  const columns = ref([
    {
      name: 'nombre1', required: true, label: 'Nombre del programa',
      align: 'center',
      field: "nombre",
      sortable: true
    },
    { name: 'codigo1', align: 'center', label: 'Numero de ficha', field: 'codigo', sortable: true },
    { name: 'estado1', align: 'center', label: 'Estado', field: 'estado', sortable: true },
    { name: 'opciones', label: 'Opciones', align: 'center' },
    
  ])
  
  
  
  
  
  
  </script>
  
  <style scoped>
  
  </style>