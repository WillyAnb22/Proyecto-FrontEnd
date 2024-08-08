import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

let validar = ref(true)

export const useUsuarioStore = defineStore("usuario", () => {
    async function getListarUsuarios() {
        try {
            let r = await axios.get("http://localhost:4000/usuarios/listarTodos")
            console.log(r);
            return r
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async function postCrearUsuario(email, name, password) {
        try {
            let r = await axios.post(`http://localhost:4000/usuarios/crear`, {
                email,
                nombre: name,
                password
            })
            validar.value = true
            return { r, validar }
        } catch (error) {
            validar.value = false
            console.log(error);
            return { error, validar }
        }
    }

    async function putModificarUsuario(email, name, password, id) {
        try {
            let r = await axios.put(`http://localhost:4000/usuarios/modificar/${id}`, {
                email,
                password,
                nombre: name
            })
            validar.value = true
            return { r, validar }
        } catch (error) {
            validar.value = false
            console.log(error);
            return { error, validar }
        }
    }
    async function putActivarUsuario(id) {
        try {
            let r = await axios.put(`http://localhost:4000/usuarios/activar/${id}`)
            return r
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async function putDesactivarUsuario(id) {
        try {
            let r = await axios.put(`http://localhost:4000/usuarios/desactivar/${id}`)
            return r
        } catch (error) {
            console.log(error);
            return error
        }
    }
    return {
        getListarUsuarios, postCrearUsuario, putActivarUsuario, putDesactivarUsuario, putModificarUsuario
    }
}, {
    persist: true
})