<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <div align="center">
            <v-card v-show="!doCalcurate && !doDispHistory" max-width="500">
              <v-card-title>
                <v-icon color="indigo" class="mr-2">fas fa-table</v-icon>
                得点状況
                <v-spacer></v-spacer>
                <v-btn icon color="indigo" @click="saveBattleResult"
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
                    <v-col @change="changeHonba">
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
                      <v-select :items="horasha" label="和了者" />
                    </v-col>
                    <v-col>
                      <v-select :items="shiharaiNin" label="支払人" />
                    </v-col>
                  </v-row>
                  <v-divider class="mt-6 mb-8"></v-divider>
                  <v-row justify="center" dense>
                    <v-col>
                      <v-text-field
                        v-model="editItem.firstScore"
                        :label="editItem.firstName"
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
                          @click="reach(editItem, '1')"
                          >立直</v-btn
                        >
                      </div>
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
                  </v-row>
                  <v-row justify="center" dense>
                    <v-col>
                      <v-text-field
                        v-model="editItem.secondScore"
                        :label="editItem.secondName"
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
                          @click="reach(editItem, '2')"
                          >立直</v-btn
                        >
                      </div>
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
                  </v-row>
                  <v-row justify="center" dense>
                    <v-col>
                      <v-text-field
                        v-model="editItem.thirdScore"
                        :label="editItem.thirdName"
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
                          @click="reach(editItem, '3')"
                          >立直</v-btn
                        >
                      </div>
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
                  </v-row>
                  <v-row justify="center" dense>
                    <v-col>
                      <v-text-field
                        v-model="editItem.fourthScore"
                        :label="editItem.fourthName"
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
                          @click="reach(editItem, '4')"
                          >立直</v-btn
                        >
                      </div>
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
                <v-btn
                  text
                  color="indigo"
                  dark
                  @click="liquidation(editItem, calcuVar)"
                  >清算</v-btn
                >
              </v-card-actions>
            </v-card>
          </div>
          <TokutenKeisan
            :editItem="editItem"
            v-if="doCalcurate && !doDispHistory"
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
</template>
<script>
import * as MAHJAN_FUNC from "../constants/mahjong";
import TokutenKeisan from "../components/taikyokuroom/TokutenKeisan";
import HoraHistoy from "../components/taikyokuroom/HoraHistory";

export default {
  name: "RecordScore",
  props: ["editItem"],
  components: {
    TokutenKeisan,
    HoraHistoy,
  },
  data: () => ({
    doCalcurate: false,
    doDispHistory: false,
    tokuten: 0,
    reachBou: 0,
    ba: 0,
    baItems: MAHJAN_FUNC.BA_VALUES,
    kyoku: "1",
    kyokuItems: MAHJAN_FUNC.KYOKU_VALUES,
    honba: "",
    honbaItems: MAHJAN_FUNC.HONBA_VALUES,
    horasha: [],
    shiharaiNin: [],
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
  beforeUpdate: function () {
    const menber = [
      this.editItem.firstName,
      this.editItem.secondName,
      this.editItem.thirdName,
      this.editItem.fourthName,
    ];
    this.horasha = menber;
    this.shiharaiNin = [...menber, "All"];
  },
  methods: {
    changeHonba(honba) {
      this.honba = honba;
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
      item.firstScore += MAHJAN_FUNC.liquidationMain(
        plusMinus.eastPlus,
        plusMinus.eastMinus
      );
      plusMinus.eastPlus = 0;
      plusMinus.eastMinus = 0;
      item.secondScore += MAHJAN_FUNC.liquidationMain(
        plusMinus.southPlus,
        plusMinus.southMinus
      );
      plusMinus.southPlus = 0;
      plusMinus.southMinus = 0;
      item.thirdScore += MAHJAN_FUNC.liquidationMain(
        plusMinus.westPlus,
        plusMinus.westMinus
      );
      plusMinus.westPlus = 0;
      plusMinus.westMinus = 0;
      item.fourthScore += MAHJAN_FUNC.liquidationMain(
        plusMinus.northPlus,
        plusMinus.northMinus
      );
      plusMinus.northPlus = 0;
      plusMinus.northMinus = 0;
      this.reachBou = 0;
    },
    saveBattleResult() {
      //清算結果を親に渡す
    },
    exitRoom() {
      this.$emit("close-from-taikyokusitu");
      //this.roomTable = true;
      //this.editItem = Object.assign({}, this.defaultItem);
    },
    reverseDoCalcurate() {
      this.doCalcurate = !this.doCalcurate;
    },
    reverseDoDispHistory() {
      this.doDispHistory = !this.doDispHistory;
    },
  },
};
</script>