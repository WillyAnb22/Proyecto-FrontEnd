import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

let validar = ref(true)
let loading = ref()

export const useAprendizStore = defineStore("ficha", () => {
    async function getListarAprendiz() {
        try {
            let r = await axios.get("http://localhost:4000/aprendices/listarTodo")
            return r
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async function postCrearAprendiz(ficha, cedula, nombre, telefono, email) {
        loading.value = true
        try {
            let r = await axios.post("http://localhost:4000/aprendices/crear", {
                ficha,
                cedula,
                nombre,
                telefono,
                email,
            })
            validar.value = true
            return { r, validar }
        } catch (error) {
            validar.value = false
            console.log(error);
            return { error, validar }
        } finally {
            loading.value = false
        }
    }
    async function putModificarAprendiz(ficha, cedula, nombre, telefono, email, id) {
        loading.value = true
        try {
            let r = await axios.put(`http://localhost:4000/aprendices/modificar/${id}`, {
                ficha,
                cedula,
                nombre,
                telefono,
                email
            })
            validar.value = true
            return { r, validar }
        } catch (error) {
            validar.value = false
            console.log(error);
            return { error, validar }
        } finally {
            loading.value = false
        }
    }
    async function putActivarAprendiz(id) {
        try {
            let r = await axios.put(`http://localhost:4000/aprendices/activar/${id}`)
            return r
        } catch (error) {
            console.log(error);
            return error
        }

    }
    async function putDesactivarAprendiz(id) {
        try {
            let r = await axios.put(`http://localhost:4000/aprendices/desactivar/${id}`)
            return r
        } catch (error) {
            console.log(error);
            return error
        }
    }
    return {
        getListarAprendiz, postCrearAprendiz, putActivarAprendiz, putDesactivarAprendiz, putModificarAprendiz
    }
}, {
    persist: true
})

