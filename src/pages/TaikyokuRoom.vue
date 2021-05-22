<template>
  <div>
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
          <v-text-field v-model="calcuVar.eastPlus" label="＋"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="calcuVar.eastMinus" label="-"></v-text-field>
        </v-col>
        <v-col>
          <div align="center">
            <v-btn rounded small color="red" dark @click="reach(roomItem, '1')"
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
          <v-text-field v-model="calcuVar.southPlus" label="＋"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="calcuVar.southMinus" label="-"></v-text-field>
        </v-col>
        <v-col>
          <div align="center">
            <v-btn rounded small color="red" dark @click="reach(roomItem, '2')"
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
          <v-text-field v-model="calcuVar.westPlus" label="＋"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="calcuVar.westMinus" label="-"></v-text-field>
        </v-col>
        <v-col>
          <div align="center">
            <v-btn rounded small color="red" dark @click="reach(roomItem, '3')"
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
          <v-text-field v-model="calcuVar.northPlus" label="＋"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="calcuVar.northMinus" label="-"></v-text-field>
        </v-col>
        <v-col>
          <div align="center">
            <v-btn rounded small color="red" dark @click="reach(roomItem, '4')"
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
            <v-btn text block color="blue darken-1" @click="saveBattleResult"
              >Save</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import HanKeisan from "../components/HanKeisan";
import HuKeisan from "../components/HuKeisan";
import Tenpai from "../components/Tenpai";
import * as MAHJAN_FUNC from "../constants/mahjong";

export default {
  name: "RecordScore",
  components: {
    HanKeisan,
    HuKeisan,
    Tenpai,
  },
  data: () => ({
    playingRoom: false,
    huKeisanDialog: false,
    hanKeisanDialog: false,
    tenpaiDialog: false,
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
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
    tokuten: 0,
    reachBou: 0,
    honba: "",
    oyako: "0",
    agari: "0",
    ba: 0,
    hu: 20,
    han: "1",
    kyoku: "1",
    oyakoItems: MAHJAN_FUNC.OYAKO_VALUES,
    agariItems: MAHJAN_FUNC.AGARI_VALUES,
    huItems: MAHJAN_FUNC.HU_VALUES,
    hanItems: MAHJAN_FUNC.HAN_VALUES,
    honbaItems: MAHJAN_FUNC.HONBA_VALUES,
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
    baItems: MAHJAN_FUNC.BA_VALUES,
    kyokuItems: MAHJAN_FUNC.KYOKU_VALUES,
  }),
  methods: {
    refreshHuCalcResult(huVal) {
      this.hu = huVal;
      this.huKeisanDialog = false;
    },

    refreshHanCalcResult(hanVal) {
      this.setHanVal(hanVal);
      this.hanKeisanDialog = false;
    },

    //子コンポーネントから返ってきた翻の値をコンボにセットする
    setHanVal(hanVal) {
      if (hanVal < 5) {
        this.han = hanVal;
      } else if (hanVal == 5) {
        this.han = "5";
      } else if (hanVal == 6 || hanVal == 7) {
        this.han = "6";
      } else if (hanVal == 8 || hanVal == 9 || hanVal == 10) {
        this.han = "7";
      } else if (hanVal == 11 || hanVal == 12) {
        this.han = "8";
      } else if (hanVal >= 13) {
        this.han = "9";
      }
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
      this.setHanVal(Number(han.value));
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

    calculateTokuten() {
      const obj_han = this.han;
      const obj_hu = new String(this.hu);
      const obj_agari = new String(this.agari);
      this.tokuten = MAHJAN_FUNC.getTokuten(
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
    },
  },
};
</script>