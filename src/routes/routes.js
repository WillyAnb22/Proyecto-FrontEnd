import ficha from "./../components/ficha.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {path: "/", component: ficha}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})