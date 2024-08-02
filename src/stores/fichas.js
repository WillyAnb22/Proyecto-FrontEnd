import { defineStore } from "pinia"
import axios from "axios"
// import { ref } from "vue"

export const useFichaStore = defineStore("ficha", () => {
    async function getListarFichas() {
        try {
            let r = await axios.get("http://localhost:4000/fichas/listarTodo")
            console.log(r);
            return r
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async function postCrearFichas(code, name) {
        try {
            let r = await axios.post(`http://localhost:4000/fichas/crear`, {
                codigo: code,
                nombre: name
            })
            console.log(r);
            return r
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async function putModificarFichas(code, name, id) {
        try {
            let r = axios.put(`http://localhost:4000/fichas/modificar/${id}`, {
                codigo: code,
                nombre: name
            })
            console.log(r);
            return r
        } catch (error) {
            
        }
    }
    async function putActivarFichas(id) {
        try {
            let r = await axios.put(`http://localhost:4000/fichas/activar/${id}`)
            return r
        } catch (error) {
            console.log(error);
        }
    }
    async function putDesactivarFichas(id) {
        try {
            let r = await axios.put(`http://localhost:4000/fichas/desactivar/${id}`)
            return r
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getListarFichas, postCrearFichas, putActivarFichas, putDesactivarFichas, putModificarFichas
    }
}, {
    persist: true
})