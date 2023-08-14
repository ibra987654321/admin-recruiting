<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="info"
          v-bind="attrs"
          v-on="on"
          class="mt-3"
      >Пригласить</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="primary"
            dark
        ><h3 class="text-h5">Приглашение кандидата</h3></v-toolbar>
        <v-card-text class="pt-8">
          <v-row>
            <v-col cols="12">
              <v-datetime-picker
                  v-model="date"
                  label="Дата"
                  date-format="dd-MM-yyyy"
                  time-format="HH:mm:ss"
                  :dialog-width="Number(400)"
                  :time-picker-props="dateTimeOptions"
                  :text-field-props="textFieldProps"
                  :aria-errormessage="dateErrors"
                  @blur="$v.date.touch()"
                  @change="$v.date.touch()"
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
            </v-col>
            <v-col>
              <v-text-field
                v-model="location"
                outlined
                dense
                label="Адрес"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="dialog = false"
          >Закрыть</v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="info"
              class="mt-3"
              @click="setInvite('Приглашен')"
          >Подтвердить</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import DateTimePicker from "@/components/dialogs/DateTimePicker";
import {required} from "vuelidate/lib/validators";
import moment from "moment";

export default {
  name: "setInviteCandidate",
  components: {
    DateTimePicker,
  },
  validations: {
    date: {required}
  },
  data:() => ({
    date: '',
    location: '',
    dialog: false,
    dateTimeOptions: {
      format: '24hr',
    },
    textFieldProps: {
      outlined: 'outlined',
      dense: 'dense',
      color: 'info',
      hideDetails: true,
    }
  }),
  mounted() {
    setTimeout(() => {
      const data = this.$store.state.detailData
      this.date = data.invitationDate
    }, 300)
  },
  computed: {
    dateErrors () {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      !this.$v.date.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
  },
  methods: {
    async setInvite(e) {
      if (this.date === '') {
        this.$store.commit('setSnackbars', 'Выберите дату')
        return;
      }
      const data = {
        "status": 'Пригласить',
        "invitationDate": moment(this.date.toISOString()).format().slice(0, 19),
        "gender": null,
        "invitationLocation": this.location
      }
      await this.$store.dispatch('putStatusCandidate', data)
      this.dialog = false
    },
  }
}
</script>

<style scoped>

</style>
