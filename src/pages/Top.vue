<template>
  <v-app>
    <v-app-bar color="white" outlined flat app clipped-left>
      <v-app-bar-nav-icon>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/mahjong-app-65bc3.appspot.com/o/app%2Ffavicon.ico?alt=media&token=1d4930ca-59f4-44d4-9822-5ac0682adc1e"
          max-height="30"
          max-width="30"
        ></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Ma<font color="#B71C1C">hja</font>nager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!$vuetify.breakpoint.xs"
        tile
        color="secondary"
        dark
        outlined
        width="130"
        class="mr-2"
      >
        Sign in
        <v-icon class="ml-2">fas fa-sign-in-alt</v-icon>
      </v-btn>
      <v-btn tile color="green darken-4" dark outlined width="130"
        >Release Note</v-btn
      >
    </v-app-bar>
    <v-container class="mt-4">
      <v-row justify="center">
        <v-col cols="12"></v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <div align="center">
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/mahjong-app-65bc3.appspot.com/o/app%2Ficon-256x256.png?alt=media&token=0f65f55c-f94f-42ab-9a63-e493ebeb96ee"
              max-height="256"
              max-width="256"
            ></v-img>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <div align="center">
            <h1 class="text-h1">Ma<font color="#B71C1C">hja</font>nager</h1>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6" xs="12">
          <div align="center">Mahjan × Manager</div>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="$vuetify.breakpoint.xs">
        <v-col cols="12">
          <div align="center">
            <v-btn color="secondary" dark tile outlined width="300">
              Sign in
              <v-icon class="ml-2">fas fa-sign-in-alt</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <div align="center">
            <v-btn icon tile outlined color="#1DA1F2" width="300">
              <v-icon class="mr-4">fab fa-twitter</v-icon>
              Sign UP with Twitter
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <div align="center">
            <v-btn icon color="secondary" dark tile outlined width="300">
              <v-icon class="mr-4">fas fa-user-plus</v-icon>
              Sign UP AS Anonymous
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: "Top",
  data: () => ({}),
};
</script>