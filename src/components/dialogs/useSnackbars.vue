<template>
  <div class="text-center">
    <v-snackbar
        v-model="$store.state.snackbars.snackbar"
        :multi-line="$store.state.snackbars.multiLine"
    >
      {{ $store.state.snackbars.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="$store.state.snackbars.snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "useSnacbars"
}
</script>

<style scoped>

</style>
