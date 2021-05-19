<template>
  <v-card class="mt-4 mx-auto" max-width="400">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
        show-labels
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">{{ dataTitle }}</div>
      <div class="subheading font-weight-light grey--text"></div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="caption grey--text font-weight-light"
        >last registration 26 minutes ago</span
      >
    </v-card-text>
  </v-card>
</template>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
<script>
export default {
  name: "DashBoard",
  data: () => ({
    dataTitle: "直近10局の順位",
    labels: ["1", "2", "3", "3", "3", "2", "1", "1", "2", "3", "4"],
    value: [1, 2, 3, 3, 2, 1, 1, 2, 3, 4],
  }),
};
</script>
