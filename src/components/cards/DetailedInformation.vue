<template>
  <v-card
      class="mx-auto "
      max-width="500"
  >
    <v-card-title>Специалист оперативного обслуживания</v-card-title>

    <v-card-text>
      <div>
        Бишкек
      </div>
      <div>
        Первая линия
      </div>
      <div>
        Вечерние
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Дата регистрации</v-card-title>

    <v-card-text>
      <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <div>Дата приглашение</div>
      <div>Комментарии</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DetailedInformation"
}
</script>

<style scoped>

</style>
