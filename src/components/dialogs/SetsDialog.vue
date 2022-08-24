<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="info"
          v-bind="attrs"
          v-on="on"
          small
          class="mt-3"
          outlined
      >Изменить</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="primary"
            dark
        ><h3 class="text-h5">Изменить данные кандидата</h3></v-toolbar>
        <v-card-text class="pt-8">
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="gender"
                :items="['Мужчина', 'Женщина']"
                outlined
                dense
                label="Пол"
                hide-details
              >
              </v-select>
            </v-col>
            <v-col cols="12">
              <DateTimePicker/>
            </v-col>
            <v-col cols="12">
              <v-select
                  v-model="$store.state.candidate.status"
                  :items="['Приглашен', 'Отклонен']"
                  outlined
                  dense
                  label="Статус приглашения"
                  hide-details
              >
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="dialog.value = false"
          >Закрыть</v-btn>
<!--          <v-btn-->
<!--              text-->
<!--              @click="save"-->
<!--          >Сохранить</v-btn>-->
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import DateTimePicker from "@/components/dialogs/DateTimePicker";
import {required} from "vuelidate/lib/validators"
export default {
  name: "SetsDialog",
  components: {
    DateTimePicker,
  },
  validations() {
    return {
      gender : {required},
      date: {required}
    }
  },
  watch: {
    '$store.state.candidate.invitationDate'(e) {
      this.$store.dispatch('putInvitationDateCandidate', e.toISOString())
    },
    '$store.state.candidate.status'(e) {
      this.$store.dispatch('putStatusCandidate', e)
          .then(() => {
            this.$store.state.candidate.detailedData.status = e
          })
    },
    // '$store.state.candidate.gender'(e) {
    //   this.$store.dispatch('putGenderCandidate', e)
    //       .then(() => {
    //         this.$store.state.candidate.detailedData.gender = e
    //       })
    // },
  },
  computed: {
    genderErrors () {
      const errors = []
      if (!this.$v.gender.$dirty) return errors
      !this.$v.gender.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    dateErrors () {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      !this.$v.date.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    gender: {
      get() {
        return this.$store.state.candidate.profileData.gender
      },
      set(e) {
        this.$store.dispatch('putGenderCandidate', e)
        this.$store.state.candidate.profileData.gender = e
      }
    },
    date: {
      get() {
        return this.$store.state.candidate.detailedData.invitationDate
      },
      set(e) {
        if (e !== null) {
          this.$store.state.candidate.detailedData.invitationDate = e.toISOString().slice(0, 10)
        }
      }
    },
  },
  methods: {
    // save() {
    //   if (this.$v.$invalid) {
    //     console.log('not')
    //     this.$v.$touch();
    //     return;
    //   }
    //   console.log('yes')
    //
    // }
  }
}
</script>

<style scoped>

</style>
