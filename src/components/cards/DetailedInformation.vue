<template>
  <v-card
      class="mx-auto "
  >
    <v-card-title class="text-wrap">{{ data.candidateType.candidateType }}</v-card-title>

    <v-card-text>
      <div>
        {{ data.candidateType.city }}
      </div>
      <div>
        {{ data.candidateType.department.name }}
      </div>
      <div>
        {{ data.schedule }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Комментарии</v-card-title>

    <v-card-text>
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
        Дата приглашение
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
export default {
  name: "DetailedInformation",
  computed: {
    data() {
      return this.$store.state.candidate.detailedData
    }
  }
}
</script>

<style scoped>

</style>
