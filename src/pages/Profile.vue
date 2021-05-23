<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <div height="300px">
          <v-card-title class="secondary white--text">
            <v-avatar size="56">
              <img alt="user" v-bind:src="userInfo.imgPath" />
            </v-avatar>
            <p class="ml-3 mt-3">{{ userInfo.name }}</p>
            <v-spacer></v-spacer>
            <NameRegistCard :initUserName="userInfo.name"></NameRegistCard>
          </v-card-title>
        </div>

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
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import NameRegistCard from "../components/NameRegistCard";
export default {
  name: "Profile",
  components: {
    NameRegistCard,
  },
  data: () => ({
    loading: false,
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
        title: "logined",
        time: "2021/05/18 23:20",
        message: "",
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
        time: "2021/05/17 18:19",
        message: "Sena, Yuko, Yuki",
        color: "indigo",
      },
    ],
  }),

  methods: {},
};
</script>
