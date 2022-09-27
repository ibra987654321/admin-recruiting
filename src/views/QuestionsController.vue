<template>
  <div>
    <v-tabs
    v-model="tab"
    centered
    icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        <v-btn color="white" >Вопросы для тестов</v-btn>
      </v-tab>

      <v-tab href="#tab-2">
        <v-btn color="white" >Вопросы для видео</v-btn>
      </v-tab>
    </v-tabs>

    <v-tabs-items class="tab_content" v-model="tab">
      <v-tab-item
          value="tab-1"
      >
        <CRUDTable
            title="Вопросы для тестов"
            :headers="dataForTest.headers"
            :show-table-in-table="true"
            :show-to-edit="dataForTest.showToEdit"
            :edited-items="dataForTest.editedItem"
            get-dispatch="getQuestionsTest"
            post-dispatch="postQuestionsTest"
            put-dispatch="putQuestionsTest"
            delete-dispatch="deleteQuestionsTest"
            name-object="answers"
            :param-in-data="dataForTest.paramInData"
        />
      </v-tab-item>
      <v-tab-item
          value="tab-2"
      >
        <CRUDTable
            title="Вопросы для видео"
            :headers="dataForVideo.headers"
            :show-table-in-table="false"
            :show-to-edit="dataForVideo.showToEdit"
            :edited-items="dataForVideo.editedItem"
            get-dispatch="getQuestionsVideo"
            post-dispatch="postQuestionsVideo"
            put-dispatch="putQuestionsVideo"
            delete-dispatch="deleteQuestionsVideo"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>

</template>

<script>
import CRUDTable from "@/components/tables/CRUDTable";
  export default {
    name: 'Home',
    components: {
      CRUDTable
    },
    data:() => ({
      tab: null,
      dataForTest: {
        headers: [
          { text: '№', value: 'position' },
          { text: 'Текст вопроса', value: 'questionText' },
          { text: 'Тип вопроса', value: 'questionType' },
          { text: 'Действия ', value: 'actions' },
        ],
        editedItem: {
          id: '',
          questionText: '',
          questionType: 'TEST',
          seconds: Number,
          key: Boolean,
        },
        showToEdit: [
          { value: 'questionText', label: 'Текст', type: 'textarea', col: '12' },
          { value: 'key', label: 'Ключевой', type: 'checkbox', col: '12' },
        ],
        paramInData: {
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
            key: ''
          },
          showToEdit: [
            { value: 'content', label: 'Текст', type: 'textarea', col: '12' },
            { value: 'correct', label: 'Правильность', type: 'checkbox', col: '6' },
          ],
          actions: {
            putDispatch: 'putAnswer',
            deleteDispatch: 'deleteAnswer',
            postDispatch: 'postAnswer',
          }
        }
      },
      dataForVideo: {
        headers: [
          { text: '№', value: 'position' },
          { text: 'Текст вопроса', value: 'questionText' },
          { text: 'Тип вопроса', value: 'questionType' },
          { text: 'Действия ', value: 'actions' },
        ],
        editedItem: {
          id: '',
          questionText: '',
          questionType: 'VIDEO',
          milliseconds: Number,
        },
        showToEdit: [
          { value: 'questionText', label: 'Текст', type: 'textarea', col: '12' },
          { value: 'milliseconds', label: 'Секунды', type: 'input-number', col: '12' },
        ],
      }
    }),
  }
</script>
<style scoped>
.tab_content {

}
</style>
