<template>
<div>
  <CRUDTable
      title="Тип кандидата"
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
import {required} from "vuelidate/lib/validators"
export default {
  name: "CandidateTypeController",
  components: {
    CRUDTable,
  },
  data:() => ({
    candidateType: {
      headers: [
        { text: '№', value: 'id' },
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
        teamType: '',
        departmentId: Number
      },
      showToEdit: [
        { value: 'candidateType', label: 'Наименование', type: 'input', col: '12' },
        { value: 'city', label: 'Город', type: 'input', col: '6' },
        { value: 'teamType', label: 'Тип группы', type: 'input', col: '6' },
        { value: 'internal', label: 'Внутренний', type: 'checkbox', col: '6' },
        { value: 'active', label: 'Активные', type: 'checkbox', col: '6' },
      ],
    },
    selectData: []
  }),
  mounted() {
    this.$store.dispatch('getDepartment').then(r => {
      const data =  {
        value: 'departmentId',
        label: 'Отделение',
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
