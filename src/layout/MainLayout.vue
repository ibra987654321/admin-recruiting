<template>
<div>
  <v-app-bar
      app
      color="white"
      flat
  >
    <v-container class="py-0 fill-height">

      <v-btn
          v-for="(link, idx) in links"
          :key="idx"
          :to="link.to"
          text
      >
        {{ link.label }}
      </v-btn>
<!--      <v-btn @click="drawer = !drawer">-->
<!--        <v-icon>mdi-pan</v-icon>-->
<!--      </v-btn>-->
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
        <v-select
            v-model="select"
            :items="$store.state.candidateType"
            label="Типы кандидатов"
            item-text="candidateType"
            item-value="id"
            dense
            hide-details
            outlined
        ></v-select>
      </v-responsive>
    </v-container>
  </v-app-bar>

  <v-main class="grey lighten-3">
    <v-container :fluid="drawer">
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
              >
                <v-list-item-content>
                  <v-list-item-title>
                    List Item {{ n }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item
                  link
                  color="grey lighten-4"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    Refresh
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet
              class="px-4 py-4"
              min-height="70vh"
              rounded="lg"
          >
            <router-view/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</div>
</template>

<script>
export default {
  name: "MainLayout",
  data: () => ({
    drawer: false,
    select: 7,
    links: [
      {label:'Вакансии', to: '/vacancy'},
      {label:'Вопросы', to: '/'},
      {label:'Навыки', to: '/'},
      {label:'Сообщения', to: '/message'},
      {label:'Кандидаты', to: '/candidate'},
    ],
  }),
  created() {
    this.$store.dispatch('getCandidateTypes')
    this.$store.state.candidateType_id = this.select
  },
  watch: {
    select(val) {
      this.$store.state.candidateType_id = val
      this.$store.dispatch('getQuestionsTest')
    }
  }
}
</script>

<style scoped>
.v-sheet.v-list, .v-sheet {
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);
}
</style>
