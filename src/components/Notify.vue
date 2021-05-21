<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="white" icon v-bind="attrs" v-on="on">
        <v-icon>fas fa-bell</v-icon>
      </v-btn>
      <v-btn color="red" icon v-bind="attrs" v-on="on">
        <v-icon>fas fa-bell</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-icon class="mr-4">fas fa-bell</v-icon>
        お知らせ
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
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
                  ><v-icon small class="mr-2">fas fa-external-link-alt</v-icon
                  >{{ notify.title }}</v-btn
                >
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
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
  data() {
    return {
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
    };
  },
};
</script>