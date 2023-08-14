<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="warning"
          v-bind="attrs"
          v-on="on"
          class="mt-3 ml-3"
      >{{archive ? 'Разархивировать' : 'Архивировать'}}</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-title>
          <div class="mx-auto">
            Вы уверены что хотите {{archive ? 'вернуть из архива' : 'добавить в архив'}}?
          </div>
        </v-card-title>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="dialog = false"
          >Закрыть</v-btn>
          <v-spacer></v-spacer>
          <v-btn
              v-if="archive"
              color="info"
              class="mt-3"
              @click="setArchive(false)"
          >Подтвердить</v-btn>
          <v-btn
              v-else
              color="info"
              class="mt-3"
              @click="setArchive()"
          >Подтвердить</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: {
    archive: Boolean
  },
  name: "setArchive",
  data: () => ({
    dialog: false,
  }),
  methods: {
    setArchive(archive = true) {
      const data = {
        isArchive: archive
      }
      this.$store.dispatch('setCandidateToArchive', data).then(() => {
        this.dialog = false
        window.location.reload()
      })
    }
  }
}
</script>

<style scoped>

</style>
