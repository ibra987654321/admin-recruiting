<template>
  <div>
    <h3>{{head.title}}</h3>
    <v-expansion-panels>
      <v-expansion-panel
          v-for="(item,i) in essays"
          :key="i"
      >
        <v-expansion-panel-header>
          <div class="d-flex justify-space-between">
            {{item.question}}
            <v-chip
                outlined
                color="info"
            >{{item.sent | date}}</v-chip>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="d-flex flex-column">
            <p>Ответ</p>
            <div class="essay py-4 px-4">
              {{item.essay}}
            </div>
            <div class="d-flex">
              <v-dialog
                  v-model="dialog"
                  max-width="800px"
              >
                <template  v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="info"
                      dark
                      max-width="200"
                      small
                      outlined
                      class="mb-2 mt-4 mr-4"
                      v-bind="attrs"
                      v-on="on"
                  >
                    Оставить комментарий
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Комментарий</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                        >
                          <v-textarea
                              outlined
                              v-model="head.editedItem.comment"
                              label="Комментарий"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        dark
                        color="secondary"
                        @click="close"
                    >
                      Отмена
                    </v-btn>
                    <v-btn
                        dark
                        color="success"
                        @click="save(item.id)"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <div v-if="item.comment" class="essay py-3 px-3 mt-4 mb-2">
                {{item.comment}}
              </div>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import tableInTable from "@/components/tables/TableInTable";
import useDialogContent from "@/components/dialogs/useDialogContent";
export default {
  props: {
    essays: Array,
  },
  name: "EssayResult",
  components: {
    tableInTable,
    useDialogContent
  },
  data:() => ({
    dialog: false,
    head: {
      title: 'Текст ответы',
      editedItem: {
        comment: '',
      },
    },
    params: {
      delete: false
    },
    filters: {
      date: 'uploadedTime'
    }
  }),
  computed: {
    data() {
      return this.$store.state.candidate.essaysResultData
    }
  },
  methods: {
    save(id) {
      const data = this.$store.state.candidate.essaysResultData.filter(r => r.id === id)
      data[0].comment = this.head.editedItem.comment
      this.$store.dispatch('postEssayComment', data[0])
          .then(() => this.close())
    },
    close() {
      this.head.editedItem.comment = ''
      this.dialog = false
    },
  }
}
</script>

<style scoped>
.essay {
  border: 1px solid gray;
  border-radius: 8px;
}
</style>
