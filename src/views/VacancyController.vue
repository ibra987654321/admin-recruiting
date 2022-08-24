<template>
  <v-row>
    <v-col cols="12" >
      <DepartmentController/>
    </v-col>
  </v-row>
</template>

<script>
import DepartmentController from "@/pages/DepartmentController";
export default {
  name: "VacancyController",
  components: {
    DepartmentController
  }
}
</script>

<style scoped>

</style>
