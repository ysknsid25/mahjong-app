<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> What to do? </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name">
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="secondary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Mahjang Score Manager</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <div class="mt-10" v-show="roomTable">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="scores"
          :items-per-page="5"
          :single-select="singleSelect"
          class="elevation-1"
          item-key="battleNo"
          :sort-by="['battleNo']"
          :sort-desc="[true]"
          show-select
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Room History</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="newRoomDialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="likelyRed" dark class="mb-2" v-on="on"
                    >New Room</v-btn
                  >
                </template>
                <v-card>
                  <v-card-text>
                    <v-container id="newRoomdialog">
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
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
                        <v-col cols="12" sm="4" md="4">
                          <v-select
                            :items="initMotiten"
                            label="持ち点"
                            v-model="selectedMotiten"
                            @change="setMotiten(editedItem)"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field
                            v-model="firstName"
                            label="東家"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field
                            v-model="secondName"
                            label="南家"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field
                            v-model="thirdName"
                            label="西家"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field
                            v-model="fourthName"
                            label="北家"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
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
          <template>
            <v-switch
              v-model="singleSelect"
              label="Single select"
              class="pa-3"
            ></v-switch>
          </template>
        </v-data-table>
      </div>
      <!-- 得点計算コンポーネント -->
      <div v-show="playingRoom">
        <v-dialog v-model="huKeisanDialog" max-width="800">
          <HuKeisan @close-from-Hukeisan="refreshHuCalcResult"></HuKeisan>
        </v-dialog>
        <v-dialog v-model="hanKeisanDialog" max-width="800">
          <HanKeisan @close-from-HanKeisan="refreshHanCalcResult"></HanKeisan>
        </v-dialog>
        <v-dialog v-model="tenpaiDialog" max-width="800">
          <Tenpai
            @close-from-Tenpai="refreshTenpaiCalcResult"
            :tontyaWho="roomItem.firstName"
            :nantyaWho="roomItem.secondName"
            :syatyaWho="roomItem.thirdName"
            :petyaWho="roomItem.fourthName"
          >
          </Tenpai>
        </v-dialog>
        <v-container>
          <v-row justify="center">
            <v-col offset="2"></v-col>
            <v-col>
              <v-select
                v-model="oyako"
                item-text="label"
                item-value="value"
                :items="oyakoItems"
                label="親子"
                @change="changeOyako"
              />
            </v-col>
            <v-col>
              <v-select
                v-model="agari"
                item-text="label"
                item-value="value"
                :items="agariItems"
                label="和了方法"
                @change="changeAgari"
              />
            </v-col>
            <v-col offset="2"></v-col>
          </v-row>
          <v-row justify="center">
            <v-col offset="2"></v-col>
            <v-col>
              <v-select
                v-model="han"
                item-text="label"
                item-value="value"
                :items="hanItems"
                label="翻"
                @change="changeHan"
              />
            </v-col>
            <v-col>
              <v-select
                v-model="hu"
                :items="huItems"
                label="符"
                @change="changeHu"
              />
            </v-col>
            <v-col offset="2"></v-col>
          </v-row>
          <v-row justify="center">
            <v-col offset="2"></v-col>
            <v-col>
              <v-select item-value="Daniel" label="和了者" />
            </v-col>
            <v-col>
              <v-select item-value="全員" label="支払人" />
            </v-col>
            <v-col offset="2"></v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <div align="center">
                <v-btn
                  tile
                  color="indigo"
                  dark
                  outlined
                  class="mr-2"
                  width="100"
                  @click="calcuHan(roomItem)"
                  >翻計算</v-btn
                >
                <v-btn
                  tile
                  color="indigo"
                  dark
                  outlined
                  width="100"
                  @click="calcuHu(roomItem)"
                  >符計算</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <div align="center">
                <v-btn
                  tile
                  color="indigo"
                  dark
                  class="mr-2"
                  width="100"
                  @click="ryukyoku"
                  >流局</v-btn
                >
                <v-btn
                  tile
                  color="indigo"
                  dark
                  width="100"
                  @click="calculateTokuten"
                  >得点計算</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6" sm="4" md="4" class="font-weight-thin headline">
              <div align="center">
                {{ tokuten }}
              </div>
            </v-col>
          </v-row>
          <!-- 得点状況コンポーネント -->
          <v-divider></v-divider>
          <v-row justify="center">
            <v-col>
              <v-select
                v-model="ba"
                item-text="label"
                item-value="value"
                :items="baItems"
                label="場"
                @change="changeOyako"
              />
            </v-col>
            <v-col>
              <v-select v-model="kyoku" :items="kyokuItems" label="局" />
            </v-col>
            <v-col @change="changeHonba">
              <v-select v-model="honba" :items="honbaItems" label="本場" />
            </v-col>
            <v-col>
              <div align="center">
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                  justify="center"
                  align-content="center"
                >
                  リーチ
                  <v-avatar right class="green darken-4">
                    {{ reachBou }}
                  </v-avatar>
                </v-chip>
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="roomItem.firstName"
                readonly
                label="東家"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="roomItem.firstScore"
                label="点数"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="calcuVar.eastPlus"
                label="＋"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="calcuVar.eastMinus"
                label="-"
              ></v-text-field>
            </v-col>
            <v-col>
              <div align="center">
                <v-btn
                  rounded
                  small
                  color="red"
                  dark
                  @click="reach(roomItem, '1')"
                  >リーチ</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="roomItem.secondName"
                readonly
                label="南家"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="roomItem.secondScore"
                label="点数"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="calcuVar.southPlus"
                label="＋"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="calcuVar.southMinus"
                label="-"
              ></v-text-field>
            </v-col>
            <v-col>
              <div align="center">
                <v-btn
                  rounded
                  small
                  color="red"
                  dark
                  @click="reach(roomItem, '2')"
                  >リーチ</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="roomItem.thirdName"
                readonly
                label="西家"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="roomItem.thirdScore"
                label="点数"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="calcuVar.westPlus"
                label="＋"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="calcuVar.westMinus"
                label="-"
              ></v-text-field>
            </v-col>
            <v-col>
              <div align="center">
                <v-btn
                  rounded
                  small
                  color="red"
                  dark
                  @click="reach(roomItem, '3')"
                  >リーチ</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="roomItem.fourthName"
                readonly
                label="北家"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="roomItem.fourthScore"
                label="点数"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="calcuVar.northPlus"
                label="＋"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="calcuVar.northMinus"
                label="-"
              ></v-text-field>
            </v-col>
            <v-col>
              <div align="center">
                <v-btn
                  rounded
                  small
                  color="red"
                  dark
                  @click="reach(roomItem, '4')"
                  >リーチ</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div align="center">
                <v-btn
                  tile
                  color="red"
                  dark
                  width="100"
                  outlined
                  @click="liquidation(roomItem, calcuVar)"
                  >清算</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div align="center">
                <v-btn text block color="blue darken-1" @click="exitRoom"
                  >Exit</v-btn
                >
              </div>
            </v-col>
            <v-col>
              <div align="center">
                <v-btn
                  text
                  block
                  color="blue darken-1"
                  @click="saveBattleResult"
                  >Save</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-content>
    <!-- プロフィールコンポーネント -->
    <v-divider></v-divider>
    <Profile></Profile>
    <!-- ダッシュボード -->
    <v-divider></v-divider>
    <DashBoard></DashBoard>
  </v-app>
</template>

<script>
import HanKeisan from "./components/HanKeisan";
import HuKeisan from "./components/HuKeisan";
import Tenpai from "./components/Tenpai";
import Profile from "./components/Profile";
import DashBoard from "./components/DashBoard";

export default {
  name: "App",

  components: {
    HanKeisan,
    HuKeisan,
    Tenpai,
    Profile,
    DashBoard,
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
    nav_lists: [
      { name: "Manage Room", icon: "mdi-folder-plus" },
      { name: "Record Score", icon: "mdi-brush" },
    ],
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

    // makeShiharaiWho(doContainAll){

    //   this.shiharaiItemsFrom = [

    //     {label: this.roomItem.firstName, value: 0},
    //     {label: this.roomItem.secondName, value: 1},
    //     {label: this.roomItem.thirdName, value: 2},
    //     {label: this.roomItem.fourthName, value: 3}

    //   ]

    //   this.shiharaiItemsTo = [

    //     {label: this.roomItem.firstName, value: 0},
    //     {label: this.roomItem.secondName, value: 1},
    //     {label: this.roomItem.thirdName, value: 2},
    //     {label: this.roomItem.fourthName, value: 3}

    //   ]

    //   if(doContainAll){

    //     this.shiharaiItemsFrom.unshift({label: 'ALL', value: 4})

    //   }

    // },

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

    changeHonba(honba) {
      this.honba = honba;
    },

    changeHu(hu) {
      this.hu = hu;
    },

    changeOyako(oyako) {
      this.oyako = oyako.value;
    },

    changeAgari(agari) {
      this.agari = agari;
    },

    changeHan(han) {
      setHanVal(Number(han.value), this);
    },

    ryukyoku() {
      this.tenpaiDialog = true;
    },

    calcuHan() {
      this.hanKeisanDialog = true;
    },

    calcuHu() {
      this.huKeisanDialog = true;
    },

    clearScreen() {
      this.tokuten = 0;
      this.oyako = "0";
      this.agari = "0";
      this.honba = "";
      this.hu = 20;
      this.han = "1";
      this.reachBou = 0;
      this.calcuVar.eastPlus = 0;
      this.calcuVar.eastMinus = 0;
      this.calcuVar.southPlus = 0;
      this.calcuVar.southMinus = 0;
      this.calcuVar.westPlus = 0;
      this.calcuVar.westMinus = 0;
      this.calcuVar.northPlus = 0;
      this.calcuVar.northMinus = 0;
    },

    refreshHanCalcResult(hanVal) {
      setHanVal(hanVal, this);
      this.hanKeisanDialog = false;
    },

    refreshTenpaiCalcResult(tenpaiValArr) {
      if (tenpaiValArr.length > 0) {
        this.calcuVar.eastPlus = tenpaiValArr[0].plusVal;
        this.calcuVar.eastMinus = tenpaiValArr[0].minusVal;
        this.calcuVar.southPlus = tenpaiValArr[1].plusVal;
        this.calcuVar.southMinus = tenpaiValArr[1].minusVal;
        this.calcuVar.westPlus = tenpaiValArr[2].plusVal;
        this.calcuVar.westMinus = tenpaiValArr[2].minusVal;
        this.calcuVar.northPlus = tenpaiValArr[3].plusVal;
        this.calcuVar.northMinus = tenpaiValArr[3].minusVal;
      }

      this.tenpaiDialog = false;
    },

    refreshHuCalcResult(huVal) {
      this.hu = huVal;
      this.huKeisanDialog = false;
    },

    calculateTokuten() {
      var obj_han = this.han;
      var obj_hu = new String(this.hu);
      var obj_agari = new String(this.agari);
      this.tokuten = getTokuten(
        this.honba,
        this.reachBou,
        obj_hu + obj_han,
        obj_han,
        this.oyako,
        obj_agari
      );
      this.reachBou = 0;
    },

    reach(item, who) {
      const reachRyou = 1000;
      this.reachBou += 1;

      if (who === "1") {
        item.firstScore -= reachRyou;
      } else if (who === "2") {
        item.secondScore -= reachRyou;
      } else if (who === "3") {
        item.thirdScore -= reachRyou;
      } else {
        item.fourthScore -= reachRyou;
      }
    },

    liquidation(item, plusMinus) {
      item.firstScore += liquidationMain(
        plusMinus.eastPlus,
        plusMinus.eastMinus
      );
      plusMinus.eastPlus = 0;
      plusMinus.eastMinus = 0;
      item.secondScore += liquidationMain(
        plusMinus.southPlus,
        plusMinus.southMinus
      );
      plusMinus.southPlus = 0;
      plusMinus.southMinus = 0;
      item.thirdScore += liquidationMain(
        plusMinus.westPlus,
        plusMinus.westMinus
      );
      plusMinus.westPlus = 0;
      plusMinus.westMinus = 0;
      item.fourthScore += liquidationMain(
        plusMinus.northPlus,
        plusMinus.northMinus
      );
      plusMinus.northPlus = 0;
      plusMinus.northMinus = 0;
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

//子コンポーネントから返ってきた翻の値をコンボにセットする
function setHanVal(hanVal, obj) {
  if (hanVal < 5) {
    obj.han = hanVal;
  } else if (hanVal == 5) {
    obj.han = "5";
  } else if (hanVal == 6 || hanVal == 7) {
    obj.han = "6";
  } else if (hanVal == 8 || hanVal == 9 || hanVal == 10) {
    obj.han = "7";
  } else if (hanVal == 11 || hanVal == 12) {
    obj.han = "8";
  } else if (hanVal >= 13) {
    obj.han = "9";
  }

  //elseの場合は、当初入力されている値をそのままセットする。
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

//親子定数
const OYA = "0";
const KO = "1";

//上がり定数
const TUMO = "0";
const RON = "1";

//各人の計算処理
function liquidationMain(plus, minus) {
  return plus - minus;
}

/**
 * 得点を取得する
 * tokutenKey: 符+翻+自摸orロン(自摸:0, ロン:1)
 * oyako: 0:親, 1:子
 * manganIjouKey: 0: 満貫未満, 1:跳満, 2:倍満, 3:三倍満, 4:役満
 * agari: 0:自摸, 1:ロン・包
 */
function getTokuten(basuu, reachBou, tokutenKey, manganIjouKey, oyako, agari) {
  var obj_tokutenKey = new String(tokutenKey);
  var obj_agari = new String(agari);
  var tokutenkeyManganMiman = obj_tokutenKey + obj_agari;
  var tokutenKeyHanemanIjou = manganIjouKey + oyako + agari;

  const BA_RYOU = 300;
  const MANGAN_MIMAN = "5";

  var totalBaRyou = 0;
  var reachRyou = reachBou * 1000;

  var tokuten = 0;

  if (basuu > 0) {
    totalBaRyou = BA_RYOU * basuu;
  }

  if (manganIjouKey < MANGAN_MIMAN) {
    tokuten = getTokutenManganMiman(
      tokutenkeyManganMiman,
      oyako,
      totalBaRyou,
      agari
    );
  } else {
    tokuten = getTokutenHanemanIjou(
      tokutenKeyHanemanIjou,
      oyako,
      totalBaRyou,
      agari
    );
  }

  if (reachRyou > 0) {
    tokuten = tokuten + " , リーチ料:" + reachRyou;
  }

  return tokuten;
}

//満貫未満の場合の得点を算出する
function getTokutenManganMiman(key, oyako, totalBaRyou, agari) {
  var tokuten = "";
  var baryouWhenTumo = 0;

  const KONOMANGAN_RON = "8000";
  const KONOMANGAN_TUMO = "2000,4000";
  const OYANOMANGAN_RON = "12000";
  const OYANOMANGAN_TUMO = "4000";

  var konoTokutenMap = new Map([
    ["2020", "400,700"],
    ["2030", "700,1300"],
    ["2040", "1300,2600"],
    ["2521", "1600"],
    ["2531", "3200"],
    ["2541", "6400"],
    ["2530", "800,1600"],
    ["2540", "1600,3200"],
    ["3011", "1000"],
    ["3021", "2000"],
    ["3031", "3900"],
    ["3041", "7700"],
    ["3010", "300,500"],
    ["3020", "500,1000"],
    ["3030", "1000,2000"],
    ["3040", "2000,3900"],
    ["4011", "1300"],
    ["4021", "2600"],
    ["4031", "5200"],
    ["4041", KONOMANGAN_RON],
    ["4010", "400,700"],
    ["4020", "700,1300"],
    ["4030", "1300,2600"],
    ["4040", KONOMANGAN_TUMO],
    ["5011", "1600"],
    ["5021", "3200"],
    ["5031", "6400"],
    ["5041", KONOMANGAN_RON],
    ["5010", "400,800"],
    ["5020", "800,1600"],
    ["5030", "1600,3200"],
    ["5040", KONOMANGAN_TUMO],
    ["6011", "2000"],
    ["6021", "3900"],
    ["6031", "7700"],
    ["6041", KONOMANGAN_RON],
    ["6010", "500,1000"],
    ["6020", "1000,2000"],
    ["6030", "2000,3900"],
    ["6040", KONOMANGAN_TUMO],
    ["7011", "2300"],
    ["7021", "4500"],
    ["7031", KONOMANGAN_RON],
    ["7041", KONOMANGAN_RON],
    ["7010", "600,1200"],
    ["7020", "1200,2300"],
    ["7030", KONOMANGAN_TUMO],
    ["7040", KONOMANGAN_TUMO],
    ["8011", "2600"],
    ["8021", "5200"],
    ["8031", KONOMANGAN_RON],
    ["8041", KONOMANGAN_RON],
    ["8010", "700,1300"],
    ["8020", "1300,2600"],
    ["8030", KONOMANGAN_TUMO],
    ["8040", KONOMANGAN_TUMO],
    ["9011", "2900"],
    ["9021", "5800"],
    ["9031", KONOMANGAN_RON],
    ["9041", KONOMANGAN_RON],
    ["9010", "800,1500"],
    ["9020", "1500,2900"],
    ["9030", KONOMANGAN_TUMO],
    ["9040", KONOMANGAN_TUMO],
    ["10011", "3200"],
    ["10021", "6400"],
    ["10031", KONOMANGAN_RON],
    ["10041", KONOMANGAN_RON],
    ["10010", "800,1600"],
    ["10020", "1600,3200"],
    ["10030", KONOMANGAN_TUMO],
    ["10040", KONOMANGAN_TUMO],
    ["11011", "3600"],
    ["11021", "7100"],
    ["11031", KONOMANGAN_RON],
    ["11041", KONOMANGAN_RON],
    ["11010", "900,1800"],
    ["11020", "1800,3600"],
    ["11030", KONOMANGAN_TUMO],
    ["11040", KONOMANGAN_TUMO],
  ]);

  var oyanoTokutenMap = new Map([
    ["2020", "700"],
    ["2030", "1300"],
    ["2040", "2600"],
    ["2521", "2400"],
    ["2531", "4800"],
    ["2541", "9600"],
    ["2530", "1600"],
    ["2540", "3200"],
    ["3011", "1500"],
    ["3021", "2900"],
    ["3031", "5800"],
    ["3041", "11600"],
    ["3010", "500"],
    ["3020", "1000"],
    ["3030", "2000"],
    ["3040", "3900"],
    ["4011", "2000"],
    ["4021", "3900"],
    ["4031", "7700"],
    ["4041", OYANOMANGAN_RON],
    ["4010", "700"],
    ["4020", "1300"],
    ["4030", "2600"],
    ["4040", OYANOMANGAN_TUMO],
    ["5011", "2400"],
    ["5021", "4800"],
    ["5031", "9600"],
    ["5041", OYANOMANGAN_RON],
    ["5010", "800"],
    ["5020", "1600"],
    ["5030", "3200"],
    ["5040", OYANOMANGAN_TUMO],
    ["6011", "2900"],
    ["6021", "5800"],
    ["6031", "11600"],
    ["6041", OYANOMANGAN_RON],
    ["6010", "1000"],
    ["6020", "2000"],
    ["6030", "3900"],
    ["6040", OYANOMANGAN_TUMO],
    ["7011", "3400"],
    ["7021", "6800"],
    ["7031", OYANOMANGAN_RON],
    ["7041", OYANOMANGAN_RON],
    ["7010", "1200"],
    ["7020", "2300"],
    ["7030", OYANOMANGAN_TUMO],
    ["7040", OYANOMANGAN_TUMO],
    ["8011", "3900"],
    ["8021", "7700"],
    ["8031", OYANOMANGAN_RON],
    ["8041", OYANOMANGAN_RON],
    ["8010", "1300"],
    ["8020", "2600"],
    ["8030", OYANOMANGAN_TUMO],
    ["8040", OYANOMANGAN_TUMO],
    ["9011", "4400"],
    ["9021", "8700"],
    ["9031", OYANOMANGAN_RON],
    ["9041", OYANOMANGAN_RON],
    ["9010", "1500"],
    ["9020", "2900"],
    ["9030", OYANOMANGAN_TUMO],
    ["9040", OYANOMANGAN_TUMO],
    ["10011", "4800"],
    ["10021", "9600"],
    ["10031", OYANOMANGAN_RON],
    ["10041", OYANOMANGAN_RON],
    ["10010", "1600"],
    ["10020", "3200"],
    ["10030", OYANOMANGAN_TUMO],
    ["10040", OYANOMANGAN_TUMO],
    ["11011", "5300"],
    ["11021", "10600"],
    ["11031", OYANOMANGAN_RON],
    ["11041", OYANOMANGAN_RON],
    ["11010", "1800"],
    ["11020", "3600"],
    ["11030", OYANOMANGAN_TUMO],
    ["11040", OYANOMANGAN_TUMO],
  ]);

  if (totalBaRyou > 0) {
    baryouWhenTumo = totalBaRyou / 3;
  }

  if (oyako == KO && agari == TUMO) {
    tokuten = addBaryou(konoTokutenMap.get(key), baryouWhenTumo);
  } else if (oyako == KO && agari == RON) {
    tokuten = +konoTokutenMap.get(key) + totalBaRyou;
  } else if (oyako == OYA && agari == TUMO) {
    tokuten = +oyanoTokutenMap.get(key) + baryouWhenTumo;
  } else if (oyako == OYA && agari == RON) {
    tokuten = +oyanoTokutenMap.get(key) + totalBaRyou;
  }

  return tokuten;
}

/**
 * 跳満以上の得点を計算する
 */
function getTokutenHanemanIjou(key, oyako, totalBaRyou, agari) {
  var tokuten = 0;
  var baryouWhenTumo = 0;
  var hanemanIjouMap = new Map([
    ["501", "12000"],
    ["500", "4000"],
    ["511", "8000"],
    ["510", "2000,4000"],
    ["601", "16000"],
    ["600", "6000"],
    ["611", "12000"],
    ["610", "3000,6000"],
    ["701", "24000"],
    ["700", "8000"],
    ["711", "16000"],
    ["710", "4000,8000"],
    ["801", "32000"],
    ["800", "12000"],
    ["811", "24000"],
    ["810", "6000,12000"],
    ["901", "48000"],
    ["900", "16000"],
    ["911", "32000"],
    ["910", "8000,16000"],
  ]);

  tokuten = hanemanIjouMap.get(key);

  if (totalBaRyou > 0) {
    baryouWhenTumo = totalBaRyou / 3;
  }

  if (oyako == KO && agari == TUMO) {
    tokuten = addBaryou(tokuten, baryouWhenTumo);
  } else if (agari == TUMO) {
    tokuten = +tokuten + baryouWhenTumo;
  } else {
    tokuten = +tokuten + totalBaRyou;
  }

  return tokuten;
}

//自摸時の場料を加えた得点を返します。
function addBaryou(tokuten, baryou) {
  var tokutenArr = tokuten.split(",");
  var konoTokuten = new String(+tokutenArr[0] + baryou);
  var oyanoTokuten = new String(+tokutenArr[1] + baryou);

  return konoTokuten + "," + oyanoTokuten;
}
</script>
