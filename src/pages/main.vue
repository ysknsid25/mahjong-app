<template>
  <v-app>
    <NavigationDrawer></NavigationDrawer>
    <v-container class="mt-6">
      <RecordScore></RecordScore>
      <v-divider></v-divider>
      <Profile></Profile>
      <v-divider></v-divider>
      <Dashboard></Dashboard>
      <v-divider></v-divider>
      <Feedback></Feedback>
    </v-container>
  </v-app>
</template>
<script>
import NavigationDrawer from "../components/navigation/NavigationDrawer";
import RecordScore from "./RecordScore";
import Profile from "./Profile";
import Feedback from "./Feedback";
import Dashboard from "./Dashboard";

export default {
  name: "Main",

  components: {
    NavigationDrawer,
    RecordScore,
    Profile,
    Feedback,
    Dashboard,
  },

  data: () => ({
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