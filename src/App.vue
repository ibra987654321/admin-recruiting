<template>
  <v-app id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <useSnackbars/>
  </v-app>
</template>

<script>

import mainLayout from "@/layout/MainLayout";
import emptyLayout from "@/layout/EmptyLayout";
import useSnackbars from "@/components/dialogs/useSnackbars";

export default {
  name: 'App',
  components: {
    mainLayout,
    emptyLayout,
    useSnackbars
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
};
</script>

<style>
#app, .v-application .grey.lighten-3 {
  background-color: #f5f5f9 !important;
}
</style>
