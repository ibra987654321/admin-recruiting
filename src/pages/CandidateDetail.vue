<template>
  <v-row>
    <v-col cols="5">
      <ProfileCard/>
    </v-col>
    <v-col>
      <div>
        <v-row>
          <v-col cols="12">
            <SecondaryInformation/>
          </v-col>
          <v-col cols="12">
             <DetailedInformation/>
          </v-col>
        </v-row>
      </div>

    </v-col>
  </v-row>
</template>

<script>
import ProfileCard from "@/components/cards/ProfileCard";
import SecondaryInformation from "@/components/cards/SecondaryInformation";
import DetailedInformation from "@/components/cards/DetailedInformation";
export default {
  name: "CandidateDetail",
  components: {
    ProfileCard,
    SecondaryInformation,
    DetailedInformation
  },
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch('getCandidateDetail', id)
  }
}
</script>

<style scoped>

</style>
