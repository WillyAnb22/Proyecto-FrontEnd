import { defineStore } from "pinia"
import axios from "axios"
// import { ref } from "vue"

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
    async function postCrearUsuario(email, name) {
        try {
            let r = await axios.post(`http://localhost:4000/usuarios/crear`, {
                email,
                nombre: name
            })
            console.log(r);
            return r
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async function putModificarUsuario(email, name, id) {
        try {
            let r = axios.put(`http://localhost:4000/usuarios/modificar/${id}`, {
                email,
                nombre: name
            })
            console.log(r);
            return r
        } catch (error) {
            
        }
    }
    async function putActivarUsuario(id) {
        try {
            let r = await axios.put(`http://localhost:4000/usuarios/activar/${id}`)
            return r
        } catch (error) {
            console.log(error);
        }
    }
    async function putDesactivarUsuario(id) {
        try {
            let r = await axios.put(`http://localhost:4000/usuarios/desactivar/${id}`)
            return r
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getListarUsuarios, postCrearUsuario, putActivarUsuario, putDesactivarUsuario, putModificarUsuario
    }
}, {
    persist: true
})