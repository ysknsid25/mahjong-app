<template>
  <div>
    <v-row justify="center">
      <v-col cols="12">
        <v-data-table
          v-show="roomTable"
          :headers="headers"
          :items="scores"
          :items-per-page="5"
          class="elevation-2"
          item-key="battleNo"
          :sort-by="['battleNo']"
          :sort-desc="[true]"
          v-if="scores.length > 0"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>対局履歴</v-toolbar-title>
              <v-spacer></v-spacer>
              <MakeNewRoomDialog
                :maxBattleNo="scores[scores.length - 1]['battleNo']"
                @save-from-newroom="saveNewRoom"
              ></MakeNewRoomDialog>
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
        <div align="center" v-if="!scores.length > 0">
          <MakeNewRoomDialog
            :maxBattleNo="0"
            @save-from-newroom="saveNewRoom"
            class="ml-2"
          ></MakeNewRoomDialog>
        </div>
        <div v-show="!roomTable">
          <v-container>
            <v-row justify="center">
              <v-col cols="12">
                <div align="center">
                  <v-card
                    v-show="!doCalcurate && !doDispHistory"
                    max-width="500"
                  >
                    <v-card-title>
                      <v-icon color="indigo" class="mr-2">fas fa-table</v-icon>
                      得点状況
                      <v-spacer></v-spacer>
                      <v-btn icon color="indigo" @click="exitRoom"
                        ><v-icon>fas fa-sign-out-alt</v-icon></v-btn
                      >
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-container>
                        <v-row justify="center" dense>
                          <v-col cols="12"> </v-col>
                        </v-row>
                        <v-row justify="center" dense>
                          <v-col>
                            <v-select
                              v-model="ba"
                              item-text="label"
                              item-value="value"
                              :items="baItems"
                              label="場"
                            />
                          </v-col>
                          <v-col>
                            <v-select
                              v-model="kyoku"
                              :items="kyokuItems"
                              label="局"
                            />
                          </v-col>
                          <v-col>
                            <v-select
                              v-model="honba"
                              :items="honbaItems"
                              label="本場"
                            />
                          </v-col>
                          <v-col>
                            <div align="center">
                              <v-avatar size="40" class="indigo ml-4 mt-1">
                                <span class="white--text">{{ reachBou }}</span>
                              </v-avatar>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row justify="center" dense>
                          <v-col>
                            <v-select
                              v-model="oya"
                              :items="horashaList"
                              label="親"
                            />
                          </v-col>
                          <v-col>
                            <v-select
                              v-model="horasha"
                              :items="horashaList"
                              label="和了者"
                            />
                          </v-col>
                          <v-col>
                            <v-select
                              v-model="shiharaiNin"
                              :items="shiharaiNinList"
                              label="支払人"
                            />
                          </v-col>
                        </v-row>
                        <v-divider class="mt-6 mb-8"></v-divider>
                        <v-row
                          justify="center"
                          dense
                          v-for="label in calcVarLbArr"
                          :key="label"
                        >
                          <v-col>
                            <v-text-field
                              v-model="calcuVar[label]['score']"
                              :label="calcuVar[label]['name']"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <div align="center">
                              <v-btn
                                rounded
                                small
                                color="indigo"
                                dark
                                class="mt-4"
                                @click="reach(label)"
                                >立直</v-btn
                              >
                            </div>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="calcuVar[label]['plus']"
                              label="＋"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="calcuVar[label]['minus']"
                              label="-"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn icon color="indigo" @click="reverseDoCalcurate">
                        <v-icon>fas fa-calculator</v-icon>
                      </v-btn>
                      <v-btn icon color="indigo" @click="reverseDoDispHistory">
                        <v-icon>fas fa-history</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn text color="indigo" dark @click="liquidation"
                        >清算</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </div>
                <TokutenKeisan
                  :editItem="calcuVar"
                  v-if="doCalcurate && !doDispHistory"
                  @back-tokuten-top-seisan="deployTokutenResult"
                  @back-tokuten-top-tenpai="deployTokutenTenpai"
                  @back-tokuten-top="reverseDoCalcurate"
                ></TokutenKeisan>
                <HoraHistoy
                  :histories="horaHistories"
                  v-if="!doCalcurate && doDispHistory"
                  @close-from-HoraHistory="reverseDoDispHistory"
                ></HoraHistoy>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import MakeNewRoomDialog from "../components/MakeNewRoomDialog";
import * as MAHJAN_FUNC from "../constants/mahjong";
import TokutenKeisan from "../components/taikyokuroom/TokutenKeisan";
import HoraHistoy from "../components/taikyokuroom/HoraHistory";

export default {
  name: "RecordScore",
  components: {
    MakeNewRoomDialog,
    TokutenKeisan,
    HoraHistoy,
  },
  data: () => ({
    roomTable: true,
    headers: [
      {
        text: "No",
        align: "center",
        value: "battleNo",
        sortable: false,
      },
      { text: "Actions", align: "center", value: "actions", sortable: false },
      { text: "YMD", align: "center", value: "ymd", sortable: false },
      {
        text: "東家(Your)",
        align: "center",
        value: "firstScore",
        sortable: false,
      },
      { text: "南家", align: "center", value: "secondScore", sortable: false },
      { text: "西家", align: "center", value: "thirdScore", sortable: false },
      { text: "北家", align: "center", value: "fourthScore", sortable: false },
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

    doCalcurate: false,
    doDispHistory: false,
    tokuten: 0,
    reachBou: 0,
    ba: "東",
    baItems: MAHJAN_FUNC.BA_VALUES,
    kyoku: "1",
    kyokuItems: MAHJAN_FUNC.KYOKU_VALUES,
    honba: "",
    honbaItems: MAHJAN_FUNC.HONBA_VALUES,
    oya: "",
    horasha: "",
    shiharaiNin: "",
    horashaList: [],
    shiharaiNinList: [],
    calcVarLbArr: ["first", "second", "third", "fourth"],
    calcuVar: {
      first: { name: "", score: 0, plus: 0, minus: 0 },
      second: { name: "", score: 0, plus: 0, minus: 0 },
      third: { name: "", score: 0, plus: 0, minus: 0 },
      fourth: { name: "", score: 0, plus: 0, minus: 0 },
    },
    tokutenInfoList: [],
    horaHistories: [
      {
        id: "1",
        time: "東1局",
        fromTo: "Taro -> Yuki",
        yaku: "役記録なし",
      },
      {
        id: "2",
        time: "東2局",
        fromTo: "All -> You",
        yaku: "立直, ツモ, 平和",
      },
      {
        id: "3",
        time: "南2局1本場",
        fromTo: "Yuki -> You",
        yaku: "役牌, ドラ1",
      },
      {
        id: "4",
        time: "東2局",
        fromTo: "You -> Yuki",
        yaku: "四暗刻",
      },
    ],
  }),

  methods: {
    saveNewRoom(val) {
      this.roomTable = false;
      this.scores.push(val);
    },
    editItem(item) {
      this.roomTable = false;
      this.initTaikyoku(item);
      this.playingRoom = true;
    },
    initTaikyoku(item) {
      this.ba = "東";
      this.kyoku = "1";
      this.honba = "";
      const menber = [
        item.firstName,
        item.secondName,
        item.thirdName,
        item.fourthName,
      ];
      this.oya = item.firstName;
      this.horasha = item.firstName;
      this.shiharaiNin = "All";
      this.horashaList = menber;
      this.shiharaiNinList = ["All", ...menber];
      this.calcuVar.first.name = item.firstName;
      this.calcuVar.first.score = item.firstScore;
      this.calcuVar.second.name = item.secondName;
      this.calcuVar.second.score = item.secondScore;
      this.calcuVar.third.name = item.thirdName;
      this.calcuVar.third.score = item.thirdScore;
      this.calcuVar.fourth.name = item.fourthName;
      this.calcuVar.fourth.score = item.fourthScore;
    },

    deleteItem() {
      /*
      const index = this.scores.indexOf(item);
      confirm("Are you sure you want to delete past Room?") &&
        this.scores.splice(index, 1);
        */
    },
    reach(who) {
      const reachRyou = 1000;
      this.reachBou += 1;
      this.calcuVar[who].score -= reachRyou;
    },
    liquidation() {
      if (this.isSamePerson()) {
        alert("和了者と支払人が同一人物です。");
      } else {
        this.subtraction();
        this.reachBou = 0;
      }
    },
    subtraction() {
      this.calcVarLbArr.map((label) => {
        this.calcuVar[label]["score"] += MAHJAN_FUNC.liquidationMain(
          this.calcuVar[label]["plus"],
          this.calcuVar[label]["minus"]
        );
        this.calcuVar[label]["plus"] = 0;
        this.calcuVar[label]["minus"] = 0;
      });
    },
    exitRoom() {
      this.playingRoom = false;
      //登録処理
      this.roomTable = true;
    },
    reverseDoCalcurate() {
      if (this.isSamePerson()) {
        alert("和了者と支払人が同一人物です。");
      } else {
        this.doCalcurate = !this.doCalcurate;
      }
    },
    reverseDoDispHistory() {
      this.doDispHistory = !this.doDispHistory;
    },
    //ノーテン罰符の計算
    deployTokutenTenpai(retTenpaiArr) {
      retTenpaiArr.map((tenpaiInfo) => {
        this.calcuVar[tenpaiInfo.name].plus = tenpaiInfo["plusVal"];
        this.calcuVar[tenpaiInfo.name].minus = tenpaiInfo["minusVal"];
      });
      this.reverseDoCalcurate();
      //this.subtraction();
    },
    isSamePerson() {
      return this.shiharaiNin === this.horasha;
    },
    makeHoraHistoryInfo(yakuInfo) {
      const nextNo = this.horaHistories.length + 1;
      const honba = this.honba === "" ? this.honba : this.honba + "本場";
      const time = this.ba + this.kyoku + "局" + honba;
      const fromTo = this.horasha + " -> " + this.shiharaiNin;
      return {
        id: nextNo,
        time: time,
        fromTo: fromTo,
        yaku: yakuInfo.join(","),
      };
    },
    deployTokutenResult(horaInfo) {
      const agari =
        this.shiharaiNin === "All" ? MAHJAN_FUNC.TUMO : MAHJAN_FUNC.RON;
      const basuu = this.honba === "" ? 0 : Number(this.honba);
      const oyako =
        this.oya === this.horasha ? MAHJAN_FUNC.OYA : MAHJAN_FUNC.KO;
      const isInvalidHuHan = MAHJAN_FUNC.isInvalidHuHan(
        horaInfo["hu"],
        horaInfo["han"],
        agari
      );
      if (typeof isInvalidHuHan !== "undefined") {
        alert(isInvalidHuHan);
        return;
      }
      if (horaInfo.yakuInfo.length > 0) {
        const horaHistoryInfo = this.makeHoraHistoryInfo(horaInfo.yakuInfo);
        this.horaHistories.push(horaHistoryInfo);
      }
      const tokuten = MAHJAN_FUNC.getTokuten(
        basuu,
        this.reachBou,
        horaInfo["hu"] + horaInfo["han"],
        horaInfo["han"],
        oyako,
        agari
      );
      console.log(JSON.stringify(tokuten));
      this.calcVarLbArr.map((label) => {
        const isHorasha = this.horasha === this.calcuVar[label].name;
        const isTumo = this.shiharaiNin === "All";
        const isOya = this.calcuVar[label].name === this.oya;
        const isHojusya = this.shiharaiNin === this.calcuVar[label].name;
        //自摸は上がった人以外全員が支払人だけど、ロンは特定の１人だけが支払人
        if (isHorasha && isTumo && isOya) {
          this.calcuVar[label].plus =
            tokuten.tumoKoShiharai * 3 + tokuten.kyotaku;
        } else if (isHorasha && isTumo && !isOya) {
          this.calcuVar[label].plus =
            tokuten.tumoOyaShiharai +
            tokuten.tumoKoShiharai * 2 +
            tokuten.kyotaku;
        } else if (isHorasha && !isTumo && isOya) {
          this.calcuVar[label].plus = tokuten.koShiharai + tokuten.kyotaku;
        } else if (isHorasha && !isTumo && !isOya) {
          this.calcuVar[label].plus = tokuten.oyaShiharai + tokuten.kyotaku;
        } else if (!isHorasha && isTumo && isOya) {
          this.calcuVar[label].minus = tokuten.tumoOyaShiharai;
        } else if (!isHorasha && isTumo && !isOya) {
          this.calcuVar[label].minus = tokuten.tumoKoShiharai;
        } else if (!isHorasha && !isTumo && isOya && isHojusya) {
          this.calcuVar[label].minus = tokuten.oyaShiharai;
        } else if (!isHorasha && !isTumo && !isOya && isHojusya) {
          this.calcuVar[label].minus = tokuten.koShiharai;
        }
      });
      this.doCalcurate = !this.doCalcurate;
    },
  },
};
</script>