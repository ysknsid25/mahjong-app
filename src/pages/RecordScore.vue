<template>
  <div>
    <div class="mt-10" v-show="roomTable">
      <v-data-table
        :headers="headers"
        :items="scores"
        :items-per-page="15"
        class="elevation-2"
        item-key="battleNo"
        :sort-by="['battleNo']"
        :sort-desc="[true]"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-spacer></v-spacer>
            <v-dialog v-model="newRoomDialog" max-width="500px">
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
                          @change="setMotiten(editedItem)"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field
                          v-model="firstName"
                          label="東家"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="secondName"
                          label="南家"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="thirdName"
                          label="西家"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="fourthName"
                          label="北家"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeNewRoomDialog(editedItem, calcuVar)"
                    >close</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="reset(editedItem)"
                    >Reset</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
    <TaikyokuRoom></TaikyokuRoom>
  </div>
</template>
<script>
import TaikyokuRoom from "./TaikyokuRoom";
export default {
  name: "RecordScore",
  components: {
    TaikyokuRoom,
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    roomTable: true,
    playingRoom: false,
    selectedMotiten: 0,
    menu: false,
    newRoomDialog: false,
    huKeisanDialog: false,
    hanKeisanDialog: false,
    tenpaiDialog: false,
    editedIndex: -1,
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",

    initMotiten: [25000, 30000],
    editedItem: {
      motiten: 25000,
      battleNo: 0,
      ymd: "",
      firstName: "",
      firstScore: 0,
      secondName: "",
      secondScore: 0,
      thirdName: "",
      thirdScore: 0,
      fourthName: "",
      fourthScore: 0,
    },
    roomItem: {
      motiten: 25000,
      battleNo: 0,
      ymd: "",
      firstName: "",
      firstScore: 0,
      secondName: "",
      secondScore: 0,
      thirdName: "",
      thirdScore: 0,
      fourthName: "",
      fourthScore: 0,
    },
    defaultItem: {
      motiten: 25000,
      battleNo: 0,
      ymd: "",
      firstName: "",
      firstScore: 0,
      secondName: "",
      secondScore: 0,
      thirdName: "",
      thirdScore: 0,
      fourthName: "",
      fourthScore: 0,
    },
    singleSelect: false,
    drawer: false,
    headers: [
      {
        text: "No",
        align: "start",
        value: "battleNo",
        sortable: false,
      },
      { text: "YMD", value: "ymd" },
      { text: "1th", value: "firstName", sortable: false },
      { text: "Score", value: "firstScore", sortable: false },
      { text: "2nd", value: "secondName", sortable: false },
      { text: "Score", value: "secondScore", sortable: false },
      { text: "3rd", value: "thirdName", sortable: false },
      { text: "Score", value: "thirdScore", sortable: false },
      { text: "4th", value: "fourthName", sortable: false },
      { text: "Score", value: "fourthScore", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    scores: [
      {
        battleNo: 1,
        ymd: "2020/05/20",
        firstName: "Tom",
        firstScore: 35000,
        secondName: "Meary",
        secondScore: 30000,
        thirdName: "Nick",
        thirdScore: 25000,
        fourthName: "Mike",
        fourthScore: 20000,
      },
      {
        battleNo: 2,
        ymd: "2020/05/22",
        firstName: "Meary",
        firstScore: 32000,
        secondName: "Michel",
        secondScore: 30000,
        thirdName: "Tom",
        thirdScore: 23000,
        fourthName: "Jody",
        fourthScore: 20000,
      },
      {
        battleNo: 3,
        ymd: "2020/05/23",
        firstName: "Jil",
        firstScore: 28000,
        secondName: "Tom",
        secondScore: 25000,
        thirdName: "Van",
        thirdScore: 25000,
        fourthName: "Sin",
        fourthScore: 22000,
      },
      {
        battleNo: 4,
        ymd: "2020/05/24",
        firstName: "Michel",
        firstScore: 40000,
        secondName: "Mike",
        secondScore: 30000,
        thirdName: "Nick",
        thirdScore: 15000,
        fourthName: "Coco",
        fourthScore: 10000,
      },
      {
        battleNo: 5,
        ymd: "2020/05/25",
        firstName: "Issei",
        firstScore: 34000,
        secondName: "Margaret",
        secondScore: 30000,
        thirdName: "Car",
        thirdScore: 25000,
        fourthName: "Sorate",
        fourthScore: 16000,
      },
      {
        battleNo: 6,
        ymd: "2020/05/26",
        firstName: "Daniel",
        firstScore: 44000,
        secondName: "Jim",
        secondScore: 30000,
        thirdName: "Tom",
        thirdScore: 20000,
        fourthName: "Nick",
        fourthScore: 6000,
      },
    ],

    tokuten: 0,
    reachRyou: 1000,
    reachBou: 0,
    honba: "",
    oyako: "0",
    agari: "0",
    ba: 0,
    hu: 20,
    han: "1",
    kyoku: "1",
    roomItemIndex: -1,
    oyakoItems: [
      { label: "親", value: "0" },
      { label: "子", value: "1" },
    ],
    agariItems: [
      { label: "ツモ", value: "0" },
      { label: "ロン・包", value: "1" },
    ],
    huItems: [0, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110],
    hanItems: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "満貫", value: "5" },
      { label: "跳満", value: "6" },
      { label: "倍満", value: "7" },
      { label: "三倍満", value: "8" },
      { label: "役満", value: "9" },
    ],
    honbaItems: ["", "1", "2", "3", "4", "5", "6", "7", "8"],
    calcuVar: {
      eastPlus: 0,
      eastMinus: 0,
      southPlus: 0,
      southMinus: 0,
      westPlus: 0,
      westMinus: 0,
      northPlus: 0,
      northMinus: 0,
    },
    baItems: [
      { label: "東", value: 0 },
      { label: "南", value: 1 },
      { label: "西", value: 2 },
      { label: "北", value: 3 },
    ],
    kyokuItems: ["1", "2", "3", "4"],
  }),

  methods: {
    editItem(item) {
      this.roomTable = false;
      this.roomItem = Object.assign({}, item);
      this.roomItemIndex = this.scores.indexOf(item);
      this.playingRoom = true;
    },

    exitRoom() {
      this.playingRoom = false;
      this.roomItem = Object.assign({}, this.defaultItem);
      this.roomTable = true;
    },

    deleteItem(item) {
      const index = this.scores.indexOf(item);
      confirm("Are you sure you want to delete past Room?") &&
        this.scores.splice(index, 1);
    },

    setMotiten(item) {
      item.firstScore = this.selectedMotiten;
      item.secondScore = this.selectedMotiten;
      item.thirdScore = this.selectedMotiten;
      item.fourthScore = this.selectedMotiten;
    },

    reset(item) {
      if (confirm("入力値を初期化します。よろしいですか？")) {
        clear(item, this);
      }
    },

    save() {
      this.editedItem.ymd = this.date;
      this.editedItem.firstName = this.firstName;
      this.editedItem.secondName = this.secondName;
      this.editedItem.thirdName = this.thirdName;
      this.editedItem.fourthName = this.fourthName;
      this.editedItem.battleNo = getMaxBattleNo(this.scores) + 1;

      this.scores.push(this.editedItem);

      this.newRoomDialog = false;

      clear(this.editedItem, this);

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    saveBattleResult() {
      Object.assign(this.scores[this.roomItemIndex], this.roomItem);
      this.exitRoom();
    },

    closeNewRoomDialog(item) {
      if (confirm("保存せず終了しますか？")) {
        this.newRoomDialog = false;
        clear(item, this);
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
        });
      }
    },
  },
};

//新規ルーム作成画面の情報をクリアする
function clear(item, obj) {
  obj.date = new Date().toISOString().substr(0, 10);
  obj.selectedMotiten = 0;
  obj.firstName = "";
  obj.secondName = "";
  obj.thirdName = "";
  obj.fourthName = "";
}

//新規作成されたルームの最新番号を取得する
function getMaxBattleNo(scores) {
  var battleNoList = [];

  for (var key in scores) {
    battleNoList.push(scores[key].battleNo);
  }

  const aryMax = function (a, b) {
    return Math.max(a, b);
  };
  return battleNoList.reduce(aryMax);
}
</script>