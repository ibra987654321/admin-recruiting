<template>
  <v-app id="app" >
    <div @mousemove="onMouseMove">
      <component :is="layout">
        <router-view/>
      </component>
    </div>
    <useSnackbars/>
  </v-app>
</template>

<script>

import mainLayout from "@/layout/MainLayout";
import emptyLayout from "@/layout/EmptyLayout";
import useSnackbars from "@/components/dialogs/useSnackbars";
import {removeToken} from "@/helpers/helpers";
import router from "@/router";

export default {
  name: 'App',
  components: {
    mainLayout,
    emptyLayout,
    useSnackbars
  },
  data:() => ({
    mouseWait: null,
  }),
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  methods: {
    onMouseMove() {
      this.runTiming()
    },
    runTiming() {
      // Всегда очищаем предыдущий таймер
      // при вызове метода.
      clearTimeout(this.mouseWait);

      // Запускаем новый отсчет.
      this.mouseWait = setTimeout(() => {
        this.hideControls();
      }, 900000);
    },
    hideControls() {
      removeToken()
      router.push({ name: 'login' })
    },
  }
};
</script>

<style>
#app, .v-application .grey.lighten-3 {
  background-color: #f5f5f9 !important;
}
</style>
