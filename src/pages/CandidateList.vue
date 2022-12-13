<template>
  <div>
    <v-card>
      <v-tabs
          v-model="tab"
          centered
          icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Успешно завершившие
        </v-tab>

        <v-tab href="#tab-2">
          Не сдавшие тест
        </v-tab>

        <v-tab href="#tab-3">
          Не завершившие
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <CRUDTable
              title="Успешно завершившие"
              :filters="filter"
              :headers="dataForCandidateList.headers"
              :get-dispatch="'getCandidateList'"
          />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <CRUDTable
              title="Не сдавшие тест"
              :filters="filter"
              :headers="dataForCandidateList.headers"
              :get-dispatch="'getFailedCandidates'"
          />
        </v-tab-item>
        <v-tab-item value="tab-3">
          <CRUDTable
              title="Не завершившие"
              :filters="filter"
              :headers="dataForCandidateList.headers"
              :get-dispatch="'getCandidatesOnVideoByType'"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
import {getTabs, removeTabs, setTabs} from "@/helpers/helpers";
export default {
  name: "CandidateList",
  components: {
    CRUDTable
  },
  data:() => ({
    tab: null,
    dataForCandidateList: {
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Дата регистрации', value: 'registration_Date' },
        { text: 'Действия ', value: 'detail' },
      ],
    },
    filter: {
      date: 'registration_Date'
    }
  }),
  watch: {
    tab(v) {
      setTabs(v)
    }
  },
  mounted() {
    if (getTabs() !== null) {
      this.tab = getTabs()
    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === 'candidateList' && to.name === 'CandidateDetail') {
      next()
    } else {
      next()
      removeTabs()
    }
  },
}
</script>

<style scoped>

</style>
