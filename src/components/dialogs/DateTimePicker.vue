<template>
  <v-datetime-picker
      v-model="$store.state.candidate.invitationDate"
      label="Дата приглашение"
      date-format="dd-MM-yyyy"
      time-format="HH:mm:ss"
      :dialog-width="Number(400)"
      :time-picker-props="dateTimeOptions"
      :text-field-props="textFieldProps"
  >
    <template slot="dateIcon">
      Дата
    </template>
    <template slot="timeIcon">
      Вермя
    </template>
    <template
        slot="actions"
        slot-scope="{ parent }"
    >
      <v-btn
          color="error lighten-1"
          @click.native="parent.clearHandler"
      >
        Отмена
      </v-btn>
      <v-btn
          color="success darken-1"
          @click="parent.okHandler"
      >
        Готово
      </v-btn>
    </template>
  </v-datetime-picker>
</template>

<script>
export default {
  name: "DateTimePicker",
  props: {
    error: Array
  },
  data:() => ({
    dateTimeOptions: {
      format: '24hr',
    },
    textFieldProps: {
      outlined: 'outlined',
      dense: 'dense',
      color: 'info',
      hideDetails: true,
      // errorMessages: this.$props.error
    }
  }),
}
</script>

<style scoped>

</style>
