<template>
  <div>
    <v-select
      v-model="$store.state.selectLogType"
      label="Разделы логов"
      outlined
      dense
      hide-details
      :items="$store.state.itemsLogType"
      item-text="text"
      item-value="value"
      @change="changeType()"
    ></v-select>
    <tableInTable
        title="Все действия"
        :param-in-table="params"
        :data-table="data"
        :filters="filters"
        :video-param="{}"
    />
  </div>

</template>

<script>
import tableInTable from "@/components/tables/TableInTable";
import {logsDto} from "@/models/logTypes.dto";
export default {
  name: "LogList",
  components: {
    tableInTable
  },
  data:() => ({
    data: [],
    params: {
      title: 'Все логи',
      headers: []
    },
    filters: {
      date: 'dateTime'
    }
  }),
  mounted() {
      this.changeType()
  },
  methods: {
    changeType() {
      this.$store.dispatch('getLogs')
          .then(r => this.data = r)
      this.params.headers = logsDto[this.$store.state.selectLogType].headers
    }
  }
}
</script>

<style scoped>

</style>
