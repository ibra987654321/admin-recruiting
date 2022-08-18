<template>
  <v-list disabled>
    <v-subheader>{{$props.title}}</v-subheader>
    <v-list-item-group
        color="primary"
    >
      <v-list-item
          v-for="(item, i) in $props.data"
          :key="i"
      >
        <v-list-item-icon>
<!--          <v-icon v-text="item.icon"></v-icon>-->
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.knowledge"></v-list-item-title>
          <v-list-item-title v-text="item.level"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "ListGroup",
  props: {
    title: String,
    data: Array
  }
}
</script>

<style scoped>

</style>
