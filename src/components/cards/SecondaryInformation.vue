<template>
  <v-timeline dense >
    <v-timeline-item
        color="info"
        small
    >
<!--      <v-card class="elevation-2">-->
        <v-expansion-panels popout>
          <v-expansion-panel
          >
            <v-expansion-panel-header>Образование</v-expansion-panel-header>
            <v-expansion-panel-content v-if="data.education">
              {{data.education}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
<!--      </v-card>-->
    </v-timeline-item>
    <v-timeline-item
        color="info"
        small
    >
      <!--      <v-card class="elevation-2">-->
      <v-expansion-panels popout>
        <v-expansion-panel
        >
          <v-expansion-panel-header>Опыт работы</v-expansion-panel-header>
          <v-expansion-panel-content v-if="data.experience.name !== 'Нет опыта'">
            <itemList label="Позиция" :text="data.experience.position"/>
            <itemList label="Начало" :text="data.experience.startDate"/>
            <itemList label="Завершение" :text="data.experience.endDate"/>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-else>
            {{data.experience.name}}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!--      </v-card>-->
    </v-timeline-item>
    <v-timeline-item
        color="info"
        small
    >
      <!--      <v-card class="elevation-2">-->
      <v-expansion-panels popout>
        <v-expansion-panel
        >
          <v-expansion-panel-header>Навыки</v-expansion-panel-header>
          <v-expansion-panel-content v-if="data.questionnaire !== []">
            <ListGroup
                v-for="(item,idx ) in data.questionnaire"
                :key="idx"
                :data="item.questionnaireAnswers"
                :title="item.name"
            />
          </v-expansion-panel-content>
          <v-expansion-panel-content v-else>
            Не выбрал
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!--      </v-card>-->
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import itemList from "@/components/lists/itemList";
import ListGroup from "@/components/lists/ListGroup";
export default {
  name: "SecondaryInformation",
  props: {
  },
  components: {
    ListGroup,
    itemList
  },
  computed: {
    data() {
      return this.$store.state.candidate.secondaryData
    }
  }
}
</script>

<style scoped>
</style>
