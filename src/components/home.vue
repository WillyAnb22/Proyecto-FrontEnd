<template>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-with">
        <q-toolbar class="custom-toolbar-title">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-toolbar-title>
            <q-avatar>
              <img
                src="https://www1.funcionpublica.gov.co/documents/28587425/42384076/logoSena.png/b8131ab9-4c1f-4ef9-8dd4-569d6b7169b6?t=1701956509586"
              />
            </q-avatar>
            ASISTENCIA/FICHA
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <div class="q-pa-md q-gutter-sm column">
          <q-btn to="/ficha" label="Fichas" color="green" class="full-width q-mb-sm" />
          <q-btn to="/bitacora" label="Bitacoras" color="green" class="full-width q-mb-sm" />
          <q-btn to="/aprendiz" label="Aprendices" color="green" class="full-width q-mb-sm" />
          <q-btn to="/usuario" label="Usuarios" color="green" class="full-width q-mb-sm" />
        </div>
      </q-drawer>
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const leftDrawerOpen = ref(false);
  
      return {
        leftDrawerOpen,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        },
      };
    },
  };
  </script>
  
  <style>
  .custom-toolbar-title {
    background-color: green;
    padding: 10px;
    border-radius: 5px;
  }
  .custom-toolbar-title q-avatar {
    margin-right: 10px;
  }
  .full-width {
    width: 100%;
  }
  </style>
  