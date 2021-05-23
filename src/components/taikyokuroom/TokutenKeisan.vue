<template>
  <div align="center">
    <v-card max-width="400">
      <v-card-title>
        <v-icon color="indigo" class="mr-2">fas fa-calculator</v-icon>
        得点計算
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-dialog v-model="huKeisanDialog" max-width="800">
            <HuKeisan @close-from-Hukeisan="refreshHuCalcResult"></HuKeisan>
          </v-dialog>
          <v-dialog v-model="hanKeisanDialog" max-width="800">
            <HanKeisan @close-from-HanKeisan="refreshHanCalcResult"></HanKeisan>
          </v-dialog>
          <v-dialog v-model="tenpaiDialog" max-width="800">
            <Tenpai
              @close-from-Tenpai="refreshTenpaiCalcResult"
              :tontyaWho="editItem.firstName"
              :nantyaWho="editItem.secondName"
              :syatyaWho="editItem.thirdName"
              :petyaWho="editItem.fourthName"
            >
            </Tenpai>
          </v-dialog>
          <v-row justify="center">
            <v-col>
              <v-select
                v-model="oyako"
                item-text="label"
                item-value="value"
                :items="oyakoItems"
                label="親子"
              />
            </v-col>
            <v-col>
              <v-select
                v-model="agari"
                item-text="label"
                item-value="value"
                :items="agariItems"
                label="和了方法"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
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
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-btn
                tile
                outlined
                color="indigo"
                dark
                class="mr-2"
                @click="calcuHan()"
                >翻計算</v-btn
              >
              <v-btn tile outlined color="indigo" dark @click="calcuHu()"
                >符計算</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text color="indigo" dark @click="backTokutenTop">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="indigo" dark class="mr-2" @click="ryukyoku"
          >流局</v-btn
        >
        <v-btn text color="indigo" dark @click="calculateTokuten"
          >得点計算</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import HanKeisan from "./HanKeisan";
import HuKeisan from "./HuKeisan";
import Tenpai from "./Tenpai";
import * as MAHJAN_FUNC from "../../constants/mahjong";
export default {
  name: "TokutenKeisan",
  props: ["editItem"],
  components: {
    HanKeisan,
    HuKeisan,
    Tenpai,
  },
  data: () => ({
    huKeisanDialog: false,
    hanKeisanDialog: false,
    tenpaiDialog: false,
    oyako: "0",
    oyakoItems: MAHJAN_FUNC.OYAKO_VALUES,
    agari: "0",
    agariItems: MAHJAN_FUNC.AGARI_VALUES,
    hu: 20,
    han: "1",
    huItems: MAHJAN_FUNC.HU_VALUES,
    hanItems: MAHJAN_FUNC.HAN_VALUES,
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

    changeHu(hu) {
      this.hu = hu;
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
    },
    backTokutenTop() {
      this.$emit("back-tokuten-top");
    },
  },
};
</script>