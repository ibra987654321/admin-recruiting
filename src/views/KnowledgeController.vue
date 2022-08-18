<template>
<div>
  <CRUDTable
      title="Создание навыков "
      :headers="dataForKnowledge.headers"
      :show-table-in-table="true"
      :show-child-table-in-table="true"
      :show-to-edit="dataForKnowledge.showToEdit"
      :edited-items="dataForKnowledge.editedItem"
      get-dispatch="getKnowledgeType"
      post-dispatch="postKnowledgeType"
      put-dispatch="putKnowledgeType"
      delete-dispatch="deleteKnowledgeType"
      name-object="knowledgeList"
      :param-in-data="dataForKnowledge.paramInData"
      :param-in-child-data="dataForKnowledge.paramInChildData"
  />
</div>
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
export default {
  name: "KnowledgeController",
  components: {
    CRUDTable
  },
  data: () => ({
    dataForKnowledge: {
      headers: [
        { text: '№', value: 'id' },
        { text: 'Название', value: 'name' },
        { text: 'Действия ', value: 'actions' },
      ],
      editedItem: {
        name: '',
      },
      showToEdit: [
        { value: 'name', label: 'Название', type: 'input', col: '12' },
      ],
      paramInData: {
        nameObject: 'knowledgeList',
        title: 'Навыки',
        headers: [
          { text: '№', value: 'id' },
          { text: 'Название', value: 'knowledgeName' },
          { text: 'Действия ', value: 'actions' },
        ],
        editedItem: {
          knowledgeName: '',
        },
        showToEdit: [
          { value: 'knowledgeName', label: 'Название', type: 'input', col: '12' },
        ],
        actions: {
          putDispatch: 'putKnowledge',
          deleteDispatch: 'deleteKnowledge',
          postDispatch: 'postKnowledge',
        }
      },
      paramInChildData: {
        nameObject: 'levels',
        title: 'Уровни',
        headers: [
          { text: '№', value: 'id' },
          { text: 'Название', value: 'name' },
          { text: 'Действия ', value: 'actions' },
        ],
        editedItem: {
          name: '',
        },
        showToEdit: [
          { value: 'name', label: 'Название', type: 'input', col: '12' },
        ],
        actions: {
          putDispatch: 'putLevel',
          deleteDispatch: 'deleteLevel',
          postDispatch: 'postLevel',
        }
      }
    },
  })
}
</script>

<style scoped>

</style>
