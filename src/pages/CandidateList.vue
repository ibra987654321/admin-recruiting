<template>
<div>
  <CRUDTable
      title="Список кандидатов"
      :headers="dataForCandidateList.headers"
      get-dispatch="getCandidateList"
  />
</div>
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
export default {
  name: "CandidateList",
  components: {
    CRUDTable
  },
  data:() => ({
    dataForCandidateList: {
      headers: [
        { text: 'Имя', value: 'name' },
        { text: 'Дата регистрации', value: 'registration_Date' },
        { text: 'Действия ', value: 'detail' },
      ],
    }
  })
}
</script>

<style scoped>

</style>
