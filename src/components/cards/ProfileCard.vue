<template>
  <v-card
      max-width="375"
  >
    <v-img
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        height="180px"
        dark
    >
      <v-row >
        <v-col cols="12">
          <v-card-title class="white--text pl-12 pt-8">
            <div class="text-h4 ">
              {{data.name}} <br> {{data.surname}}
              <br>
              <div class="d-flex align-center justify-md-space-between">
                <p class="subtitle-1 mb-0">{{data.gender}}</p>
                <v-chip-group
                    active-class="deep-purple accent-4 white--text"
                    column
                    class="ml-5"
                >
                  <v-chip color="primary">{{ data.status }}</v-chip>
                </v-chip-group>
              </div>

            </div>
          </v-card-title>
        </v-col>

      </v-row>
    </v-img>

    <v-list two-line>
      <itemList
          icon="mdi-phone"
          :text="data.phoneNumber"
          label="Телефон номер"
      />
      <v-divider inset></v-divider>

      <itemList
        icon="mdi-email"
        :text="data.email"
        label="Личная почта"
      />
      <v-divider inset></v-divider>

      <itemList
        icon="mdi-calendar"
        :text="data.birthday"
        label="Дата рождения"
      />

      <v-divider inset></v-divider>

      <itemList
          icon="mdi-flag"
          :text="data.citizenship"
          label="Гражданство"
      />
      <v-divider inset></v-divider>

      <itemList
          icon="mdi-map-marker"
          :text="data.address"
          label="Место проживания"
      />

    </v-list>
  </v-card>
</template>

<script>
import itemList from "@/components/lists/itemList";
export default {
  name: "ProfileCard",
  components: {
    itemList
  },
  computed: {
    data() {
      return this.$store.state.candidate.profileData
    },
    gender() {
      return this.$store.state.candidate.profileData.gender
    }
  },
  watch: {
    '$store.state.candidate.profileData.gender'() {
      return this.$store.state.candidate.profileData.gender
    }
  }
}
</script>

<style scoped>
.font-size {
  font-size: 28px;
}
</style>
