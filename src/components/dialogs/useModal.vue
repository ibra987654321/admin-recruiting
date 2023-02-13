<template>
  <div>
    <v-btn color="error" @click="dialogDelete = true">{{btnTitle}}</v-btn>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Вы уверены ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "useModal",
  props: {
    btnTitle: String,
    data: Object,
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data:() => ({
    dialogDelete: false,
  }),
  methods: {
    async deleteItemConfirm() {
      await this.$emit('ok')
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
    }
  }
}
</script>

<style scoped>

</style>
