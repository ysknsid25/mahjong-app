<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :color="bellColor" dark icon v-bind="attrs" v-on="on" class="mr-2">
        <v-icon>fas fa-bell</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon color="secondary" dark class="mr-4">fas fa-bell</v-icon>
        お知らせ
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="loading" class="mt-4" align="center">
          <v-progress-circular
            v-if="loading"
            :size="30"
            color="secondary"
            dark
            indeterminate
          ></v-progress-circular>
        </div>
        <div v-if="!loading">
          <v-timeline align-top dense class="mt-4">
            <v-timeline-item
              v-for="notify in notifies"
              :key="notify.time"
              :color="notify.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ notify.type }}</strong> @{{ notify.time }}
                </div>
                <div>
                  <v-btn text href="notify.url"
                    ><font size="2">{{ notify.title }}</font></v-btn
                  >
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" href="https://">お知らせ一覧を表示</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Subscriber",
  data: () => ({
    isExistYetNotify: false,
    bellColor: "secondary",
    loading: false,
    dialog: false,
    notifies: [
      {
        type: "障害情報",
        title: "FireBaseの障害",
        time: "2021/05/19 10:20",
        url: "https://",
        color: "red",
      },
      {
        type: "リリース情報",
        title: "〇〇機能をリリースしました！",
        time: "2021/05/18 09:20",
        url: "https://",
        color: "indigo",
      },
      {
        type: "リリース情報",
        title: "ＵＩを変更しました",
        time: "2021/05/16 09:20",
        url: "https://",
        color: "indigo",
      },
      {
        type: "障害情報",
        title: "得点計算が正しく行われない",
        time: "2021/05/15 10:20",
        url: "https://",
        color: "red",
      },
    ],
  }),
  mounted: function () {
    if (this.isExistYetNotify) {
      this.bellColor = "red";
    }
  },
};
</script>