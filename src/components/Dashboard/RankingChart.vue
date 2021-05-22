<template>
  <div>
    <div align="center">
      <v-progress-circular
        v-if="loading"
        :size="50"
        color="secondary"
        dark
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card height="30em" v-if="!loading">
      <v-card-title class="text-h5">
        <v-icon color="secondary" dark class="mr-2">fas fa-trophy</v-icon>
        {{ title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <LineChart
          :label="hanrei"
          :labels="labels"
          :datas="scoreList"
        ></LineChart>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import LineChart from "./chart/LineChart";
import { rankChartLabels } from "../../constants/label";
export default {
  name: "RankingChart",
  components: {
    LineChart,
  },
  data: () => ({
    loading: false,
    title: "直近10局の順位",
    hanrei: "順位",
    labels: rankChartLabels,
    scoreList: [1, 1, 2, 3, 1, 4, 2, 3, 1, 3],
  }),
};
</script>