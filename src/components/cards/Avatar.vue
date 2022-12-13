<template>
      <v-menu
          bottom
          min-width="200px"
          rounded
          offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
              icon
              x-large
              v-on="on"
          >
            <v-avatar
                color="primary"
                size="48"
            >
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                  color="primary"
              >
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.email }}</h3>
              <h5>{{ user.role }}</h5>
              <p class="text-caption mt-1">
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                  depressed
                  rounded
                  text
                  @click="logout"
              >
                Выход
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
</template>

<script>
import decodeJWT from "@/helpers/parserJWT";
import {getToken, removeToken} from "@/helpers/helpers";
export default {
  name: "Avatar",
  data: () => ({
    user: {
      initials: 'JD',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
      role: '',
    },
  }),
  mounted() {
    const data = decodeJWT(getToken())
    this.user.email = data.sub
    this.user.initials = data.sub.slice(0, 2)
    this.user.role = data.roles.slice(20, 50)

  },
  methods: {
    async logout() {
      await removeToken()
      await this.$router.push({name: 'login'})
      this.$store.commit('setSnackbars', 'Вы вышли из системы')
    }
  }
}
</script>

<style scoped>

</style>
