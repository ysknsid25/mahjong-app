<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-btn text icon :href="tweetUrl" target="_blank">
              <v-icon color="#1DA1F2">fab fa-twitter-square</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn color="white" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img alt="user" v-bind:src="userInfo.imgPath" />
            </v-avatar>
            <p class="ml-3">{{ userInfo.name }}</p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">History</div>

          <v-timeline align-top dense>
            <v-timeline-item
              v-for="history in histories"
              :key="history.time"
              :color="history.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ history.title }}</strong> @{{ history.time }}
                </div>
                <div>{{ history.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Profile",

  data: () => ({
    userInfo: {
      name: "Daniel Kanemitsu",
      userId: "cabbage-5337431_1280",
      imgPath:
        "https://cdn.pixabay.com/photo/2020/06/24/19/12/" +
        "cabbage-5337431_1280" +
        ".jpg",
    },
    histories: [
      {
        title: "1st",
        time: "2021/05/19 10:20",
        message: "Taro, Shiori, Yuki",
        color: "indigo",
      },
      {
        title: "2nd",
        time: "2021/05/18 23:20",
        message: "Taro, Jiro, Monta",
        color: "red",
      },
      {
        title: "1st",
        time: "2021/05/17 18:20",
        message: "Sena, Yuko, Yuki",
        color: "indigo",
      },
      {
        title: "1st",
        time: "2021/05/17 18:20",
        message: "Sena, Yuko, Yuki",
        color: "indigo",
      },
    ],
    tweetUrl: "",
  }),

  mounted: function () {
    this.createTweetUrl();
  },

  methods: {
    createTweetUrl() {
      const twitterUtl = "https://twitter.com/intent/tweet?";
      const url = encodeURIComponent(location.href);
      const tweet = "テストtweetだお";
      const hashTags = "麻雀成績管理";
      this.tweetUrl =
        twitterUtl + "text=" + tweet + "&hashtags=" + hashTags + "&url=" + url;
    },
  },
};
</script>
