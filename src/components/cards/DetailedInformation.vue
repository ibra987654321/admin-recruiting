<template>
  <v-card
      class="mx-auto "
  >
    <v-card-title class="text-wrap">{{ data.candidateType.candidateType }}</v-card-title>

    <v-card-text>
      <div>
        <div>
          {{ data.candidateType.city }}
        </div>
        <div>
          {{ data.candidateType.department.name }}
        </div>
        <div>
          {{ data.schedule }}
        </div>
      </div>
      <setsDialog/>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Комментарии</v-card-title>

    <v-card-text>
      <v-dialog
          v-model="dialog"
          max-width="800px"
      >
        <template  v-slot:activator="{ on, attrs }">
          <v-btn
              color="info"
              dark
              small
              outlined
              class="mb-2"
              v-bind="attrs"
              v-on="on"
          >
            Добавить
          </v-btn>
        </template>
        <useDialogContent
            :show="false"
            :show-child-table="false"
            title="Изменить"
            :edit-block="showToEdit"
            :edited-item="editedItem"
            @save="save($event)"
            @close="dialog = false"
        />
      </v-dialog>
      <div v-if="data.comment === null">Нет комментариев</div>
      <div v-else>{{ data.comment }}</div>
    </v-card-text>

    <v-divider class=""></v-divider>

    <v-card-text>
      <div>
        Дата регистрации
        <v-chip
          outlined
          color="info"
        >
          {{ data.registrationDate}}
        </v-chip>
      </div>
      <div class="mt-3">
        Дата приглашения
        <v-chip
          outlined
          color="info"
        >
          {{data.invitationDate === null ? 'Еще не приглашен' : data.invitationDate}}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import useDialogContent from "@/components/dialogs/useDialogContent";
import setsDialog from "@/components/dialogs/SetsDialog";
export default {
  name: "DetailedInformation",
  components: {
    useDialogContent,
    setsDialog,
  },
  data: () => ({
    dialog: false,
    editedItem: {
      comment: '',
    },
    showToEdit: [
      { value: 'comment', label: 'Комментарий', type: 'textarea-rules', col: '12', rules: 300 },
    ],
  }),
  computed: {
    data() {
      return this.$store.state.candidate.detailedData
    }
  },
  methods: {
    async save(e) {
      await this.$store.dispatch('putCommentCandidate', e.comment)
          .then(() => {
            this.$store.state.candidate.detailedData.comment = e.comment
            this.dialog = false
          })
          .catch(e => this.$store.commit('setSnackbars', 'Что то пошло не так'))

    }
  }
}
</script>

<style scoped>

</style>
