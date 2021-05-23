<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-card-title>
          <v-icon color="indigo" class="mr-2">fas fa-history</v-icon>
          和了履歴
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div align="center" v-if="loading">
            <v-progress-circular
              v-if="loading"
              :size="50"
              color="secondary"
              dark
              indeterminate
            ></v-progress-circular>
          </div>
          <div v-if="!loading">
            <v-timeline align-top dense class="ml-8 mb-2">
              <v-timeline-item
                v-for="history in histories"
                :key="history.id"
                color="indigo"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>{{ history.time }}</strong> @{{ history.fromTo }}
                  </div>
                  <div>{{ history.yaku }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text color="indigo" dark @click="backTokutenTop">Back</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HoraHistory",
  props: ["histories"],
  data: () => ({
    loading: false,
  }),

  methods: {
    backTokutenTop() {
      this.$emit("close-from-HoraHistory");
    },
  },
};
</script>
