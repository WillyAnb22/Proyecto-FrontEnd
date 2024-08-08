import {defineStore} from "pinia"
import { ref } from "vue"
import axios from "axios"
import { Notify } from 'quasar'
import { useQuasar } from 'quasar'

const $q = useQuasar()


export const useFichaStore = defineStore("ficha", ()=>{
    let token = ref("")
    const listarFichas = async ()=>{
        try {
            let r = await axios.get("http://localhost:4500/api/Fichas/listar")
            console.log(r);
            return r
          } catch (error) {
            console.log(error);
            return error
          }
    }

    const guardarFicha = async(cod, nom)=>{
        try {
            let r = await axios.post("http://localhost:4500/api/Fichas",{
                codigo:cod,
                nombre:nom
            })
            console.log(r);
            Notify.create({
                color: "positive",
                message: "Registro exitoso",
                icon: "error",
                timeout: 2500,
              });
            return r
          } catch (error) {
            console.log({error});
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
              });
            
            return error
          }
    }

    return{
        listarFichas, token, guardarFicha
    }

})