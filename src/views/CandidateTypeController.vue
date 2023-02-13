<template>
<div>
  <CRUDTable
      :filters="filters"
      title="Вакансии"
      :headers="candidateType.headers"
      :show-table-in-table="false"
      :show-to-edit="candidateType.showToEdit"
      :edited-items="candidateType.editedItem"
      get-dispatch="getCandidateTypes"
      post-dispatch="postCandidateType"
      put-dispatch="putCandidateType"
      delete-dispatch="deleteCandidateType"
  />
</div>
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
export default {
  name: "CandidateTypeController",
  components: {
    CRUDTable,
  },
  data:() => ({
    filters: {
      checkbox: ['internal', 'active']
    },
    candidateType: {
      headers: [
        { text: 'Наименование', value: 'candidateType' },
        { text: 'Внутренний', value: 'internal' },
        { text: 'Город', value: 'city' },
        { text: 'Активные', value: 'active' },
        { text: 'Действия ', value: 'actions' },
      ],
      editedItem: {
        candidateType: '',
        internal: Boolean,
        active: Boolean,
        city: '',
        teamTypeId: Number
      },
      showToEdit: [
        { value: 'candidateType', label: 'Наименование', type: 'input', col: '12' },
        { value: 'city', label: 'Город', type: 'input', col: '6' },
        { value: 'internal', label: 'Внутренний', type: 'checkbox', col: '6' },
        { value: 'active', label: 'Активные', type: 'checkbox', col: '6' },
      ],
    },
    selectData: []
  }),
  mounted() {
    this.$store.dispatch('getGroup').then(r => {
      const data =  {
        value: 'teamTypeId',
        label: 'Группы',
        type: 'select-add',
        params:{ text: 'name', value: 'id'},
        data: r,
        edit: 'Добавить',
        col: '6'
      }
      this.candidateType.showToEdit.push(data)
    })
  },
}
</script>

<style scoped>

</style>
