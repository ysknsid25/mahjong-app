<template>
  <div>
    <v-dialog persistent v-model="newRoomDialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn tile outlined color="red" dark class="mb-2" v-on="on"
          >New Room</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <v-icon color="secondary" dark class="mr-4"
            >fas fa-folder-plus</v-icon
          >
          New Room
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Date"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    scrollable
                    v-model="date"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="initMotiten"
                  label="持ち点"
                  v-model="selectedMotiten"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-text-field v-model="firstName" label="東家"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="secondName" label="南家"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="thirdName" label="西家"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="fourthName" label="北家"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mr-2"
            color="secondary"
            dark
            text
            @click="closeNewRoomDialog()"
            >close</v-btn
          >
          <v-btn class="mr-2" color="secondary" dark text @click="reset()"
            >Reset</v-btn
          >
          <v-btn color="secondary" dark text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import * as MAHJAN_FUNC from "../constants/mahjong";
export default {
  name: "MakeNewRoomDialog",
  props: ["maxBattleNo"],
  data: () => ({
    newRoomDialog: false,
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    initMotiten: MAHJAN_FUNC.DEF_MOTITEN,
    selectedMotiten: 0,
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
  }),
  methods: {
    closeNewRoomDialog() {
      if (confirm("保存せず終了しますか？")) {
        this.newRoomDialog = false;
        this.clear();
      }
    },
    reset() {
      if (confirm("入力値を初期化します。よろしいですか？")) {
        this.clear();
      }
    },
    clear() {
      this.date = new Date().toISOString().substr(0, 10);
      this.selectedMotiten = 0;
      this.firstName = "";
      this.secondName = "";
      this.thirdName = "";
      this.fourthName = "";
    },

    save() {
      const retVal = {
        battleNo: this.maxBattleNo + 1,
        ymd: this.date,
        firstName: this.firstName,
        firstScore: this.selectedMotiten,
        secondName: this.secondName,
        secondScore: this.selectedMotiten,
        thirdName: this.thirdName,
        thirdScore: this.selectedMotiten,
        fourthName: this.fourthName,
        fourthScore: this.selectedMotiten,
      };
      this.newRoomDialog = false;
      this.clear();
      this.$emit("save-from-newroom", retVal);
    },
  },
};
</script>