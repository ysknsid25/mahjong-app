<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title> FeedBack </v-card-title>
      <v-card-subtitle>
        よろしければFeedBackをお送りください。
      </v-card-subtitle>
      <v-card-text>
        <v-textarea outlined value=""></v-textarea>
        <div align="right">
          <v-btn tile outlined color="secondary" dark width="100">送信</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Feedback",
  data: () => ({}),
};
</script>