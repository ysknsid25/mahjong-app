<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="white" icon class="mr-2" v-bind="attrs" v-on="on">
        <v-icon>far fa-envelope</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title> リリース情報を公開する </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                item-text="label"
                item-value="value"
                :items="notifyType"
                label="種別"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field label="タイトル"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field label="URL"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile color="secondary" dark width="100" @click="dialog = false"
          >送信</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Subscriber",
  data: () => ({
    dialog: false,
    notifyType: [
      {
        label: "リリース情報",
        value: "0",
      },
      {
        label: "障害情報",
        value: "1",
      },
    ],
  }),
};
</script>