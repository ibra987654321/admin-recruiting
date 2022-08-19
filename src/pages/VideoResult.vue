<template>
  <div>
    <tableInTable
      :show-child="false"
      :data-table="data"
      :param-in-table="head"
      :filters="filters"
      :video-param="params"
    />
  </div>
</template>

<script>
import tableInTable from "@/components/tables/TableInTable";
export default {
  name: "VideoResult",
  components: {
    tableInTable
  },
  data:() => ({
    head: {
      title: 'Видео ответы',
      headers: [
        { text: '№', value: 'position' },
        { text: 'Вопрос', value: 'question' },
        { text: 'Время отправки ', value: 'uploadedTime' },
        { text: 'Комментарии', value: 'comment' },
        { text: 'Оставить коммент', value: 'actions' },
        { text: 'Действие ', value: 'download' },
      ],
      editedItem: {
        id: '',
        comment: '',
      },
      showToEdit: [
        { value: 'comment', label: 'Комментарии', type: 'textarea', col: '12' },
      ],
      actions: {
        postDispatch: 'postVideoComment',
        deleteDispatch: 'deleteVideo'
      }
    },
    params: {
      delete: false
    },
    filters: {
      date: 'uploadedTime'
    }
  }),
  computed: {
    data() {
      return this.$store.state.candidate.videoResultData
    }
  }
}
</script>

<style scoped>

</style>
