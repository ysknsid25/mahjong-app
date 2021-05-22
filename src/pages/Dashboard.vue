<template>
  <v-container>
    <v-row dense justify="center">
      <v-col xs="12" md="12">
        <TotalDataTable></TotalDataTable>
      </v-col>
      <v-col xs="12" md="6">
        <StyleChart></StyleChart>
      </v-col>
      <v-col xs="12" md="6">
        <RankingChart></RankingChart>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import TotalDataTable from "../components/Dashboard/TotalDataTable";
import StyleChart from "../components/Dashboard/StyleChart";
import RankingChart from "../components/Dashboard/RankingChart";
export default {
  name: "Feedback",
  components: {
    TotalDataTable,
    StyleChart,
    RankingChart,
  },
  data: () => ({}),
};
</script>