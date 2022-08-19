<template>
<div>
  <v-app-bar
      app
      color="white"
      flat
  >
    <v-container class="py-0 fill-height">
      <v-menu
          transition="slide-y-transition"
          bottom
          v-for="(link, idx) in links"
          :key="idx"
          offset-y
          rounded="large"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              text
              v-bind="attrs"
              v-on="on"
              active-class="active"
          >
            {{ link.label }}
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
              v-for="(item, i) in link.child"
              :key="i"
              link
              :to="item.to"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
    selectList: '',
    select: 7,
    links: [
      {label:'Вакансии', child: [{label:'Отделение', to: '/vacancy'}]},
      {label:'Вопросы', child: [{label:'Список вопросов', to: '/'}]},
      {label:'Навыки', child: [{label:'Навыки', to: '/knowledge'}]},
      {label:'Сообщения', child: [{label:'Сообщения', to: '/message'}]},
      {label:'Кандидаты', child: [
          {label:'Хулиганы', to: '/candidate'},
          {label:'Тип кандидата ', to: '/candidateType'},
          {label:'Список кандидатов ', to: '/candidateList'}
        ]
      },
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
  },
  mounted() {
  }
}
</script>

<style scoped>
.v-sheet.v-list, .v-sheet {
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);
}
</style>
