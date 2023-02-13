<template>
  <tableInTable
      :show-child="false"
      :data-table="data"
      :param-in-table="head"
      :filters="filters"
      :video-param="params"
  />
</template>

<script>
import tableInTable from "@/components/tables/TableInTable";

export default {
  name: "TestResult",
  components: {
    tableInTable
  },
  data:() => ({
    data: [],
    head: {
      title: 'Результаты тестов',
      headers: [
        { text: 'Вопрос', value: 'question' },
        { text: 'Ответ', value: 'answer' },
        { text: 'Корректность', value: 'correct' },
      ],
      editedItem: {
        id: '',
        comment: '',
      },
      showToEdit: [
        { value: 'comment', label: 'Комментарии', type: 'textarea', col: '12' },
      ],
      actions: {
        postDispatch: 'postVideoComment'
      }
    },
    params: {
      delete: false
    },
    filters: {
      date: 'datetime',
      checkbox: ['correct']
    }
  }),
  mounted() {
    setTimeout(() => {
      this.data = this.$store.state.detailData.tests
    }, 300)
  },
}
</script>

<style scoped>

</style>
