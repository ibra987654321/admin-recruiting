<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon color="info">
        {{ $props.icon }}
      </v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ $props.text }}</v-list-item-title>
      <v-list-item-subtitle>{{ $props.label }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    label: String
  }
}
</script>

<style scoped>

</style>
