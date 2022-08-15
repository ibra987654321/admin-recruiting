<template>
  <CRUDTable
      title="Вопросы для тестов"
      :headers="headers"
      :show-to-edit="showToEdit"
      :edited-items="editedItem"
      get-dispatch="getQuestionsTest"
      post-dispatch="postQuestionsTest"
      delete-dispatch="deleteQuestionsTest"
  />
</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
  export default {
    name: 'Home',
    components: {
      CRUDTable
    },
    data:() => ({
      headers: [
        { text: 'Текст вопроса', value: 'questionText' },
        { text: 'Тип вопроса', value: 'questionType' },
        { text: 'Действия ', value: 'actions' },
      ],
      editedItem: {
        questionText: '',
        questionType: Number,
      },
      showToEdit: [
        { value: 'questionText', label: 'Текст', type: 'textarea', col: '12' },
      ],
    }),
    provide: {
      tableInData: {
        nameObject: 'answers',
        title: 'Ответы',
        headers: [
          { text: 'Текст ответа', value: 'content' },
          { text: 'Правильность', value: 'correct' },
          { text: 'Действия ', value: 'actions' },
        ],
        editedItem: {
          content: '',
          correct: '',
        },
        showToEdit: [
          { value: 'content', label: 'Текст', type: 'textarea', col: '12' },
          { value: 'correct', label: 'Правильность', type: 'checkbox', col: '12' },
        ],
        actions: {
          getDispatch: 'String',
          putDispatch: 'String',
          deleteDispatch: 'String',
          postDispatch: 'String',
        }
      }
    },
  }
</script>
