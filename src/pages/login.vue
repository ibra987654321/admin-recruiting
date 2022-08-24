<template>
  <div class="d-flex align-center mx-auto rounded-xl">
    <v-responsive min-width="400px" >
      <v-card elevation="2" class="" height="100%" rounded="lg">
        <v-card-text>
          <h1 class="my-8 text-center">Admin Recruiting 👋</h1>
        </v-card-text>
        <v-card-text class="d-flex flex-column justify-space-around">
          <v-form>
            <v-text-field
                v-model="form.username"
                label="Логин"
                outlined
                type="text"
            ></v-text-field>
            <v-text-field
                id="password"
                v-model="form.password"
                label="Пароль"
                type="password"
                outlined
            ></v-text-field>
          </v-form>
          <v-btn class="rounded-lg my-10" large width="100%" color="primary" @click="submit">Войти</v-btn>
        </v-card-text>
      </v-card>
    </v-responsive>
  </div>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    form: {
      username: '',
      password:'',
    }
  }),
  methods: {
    submit() {
      this.$store.dispatch('login', this.form)
    }
  }
}
</script>

<style scoped>

</style>
