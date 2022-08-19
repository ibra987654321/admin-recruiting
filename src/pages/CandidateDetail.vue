<template>
  <v-row>
    <v-col cols="4">
      <ProfileCard/>
    </v-col>
    <v-col cols="8">
      <div>
        <v-row>
          <v-col cols="12">
             <DetailedInformation/>
          </v-col>
          <v-col cols="12">
            <SecondaryInformation/>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <v-col cols="12">
      <VideoResult/>
    </v-col>
    <v-col cols="12">
      <TestResult/>
    </v-col>
  </v-row>
</template>

<script>
import ProfileCard from "@/components/cards/ProfileCard";
import SecondaryInformation from "@/components/cards/SecondaryInformation";
import DetailedInformation from "@/components/cards/DetailedInformation";
import VideoResult from "@/pages/VideoResult";
import TestResult from "@/pages/TestResult";
export default {
  name: "CandidateDetail",
  components: {
    ProfileCard,
    SecondaryInformation,
    DetailedInformation,
    VideoResult,
    TestResult,
  },
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch('getCandidateDetail', id)
  }
}
</script>

<style scoped>

</style>
