<template>
  <v-card>
    <v-card-title>
      <v-icon color="indigo" class="mr-2">fas fa-check</v-icon>
      聴牌した人を選んでください
    </v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col sm="2" md="2">
          <v-checkbox
            id="tenpai0"
            v-model="tenpaiSelected"
            color="red darken-3"
            :label="tontyaWho"
            :value="tontyaWho"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col sm="2" md="2">
          <v-checkbox
            id="tenpai1"
            v-model="tenpaiSelected"
            color="red darken-3"
            :label="nantyaWho"
            :value="nantyaWho"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col sm="2" md="2">
          <v-checkbox
            id="tenpai2"
            v-model="tenpaiSelected"
            color="red darken-3"
            :label="syatyaWho"
            :value="syatyaWho"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col sm="2" md="2">
          <v-checkbox
            id="tenpai3"
            v-model="tenpaiSelected"
            color="red darken-3"
            :label="petyaWho"
            :value="petyaWho"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="doCount">OK</v-btn>
      <v-btn color="blue darken-1" text @click="$emit('close-from-Tenpai', [])"
        >Cancel</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "Tenpai",
  props: ["tontyaWho", "nantyaWho", "syatyaWho", "petyaWho"],

  data: () => ({
    tontyaWho: "",
    nantyaWho: "",
    syatyaWho: "",
    petyaWho: "",
    tenpaiSelected: [],
  }),

  methods: {
    doCount() {
      const TOTAL_TENPAI_VAL = 3000;
      const MEMBER = [
        this.tontyaWho,
        this.nantyaWho,
        this.syatyaWho,
        this.petyaWho,
      ];
      var getTenpaiVal = 0;
      var lostTenpaiVal = 0;
      var howManyTenpais = 0;

      var retTenpaiArr = [];
      howManyTenpais = this.tenpaiSelected.length;

      //全員聴牌・全員ノーテンの場合は0
      if (howManyTenpais === 0 || howManyTenpais === 4) {
        this.$emit("close-from-Tenpai", []);
        return;
      }

      //聴牌の人がいる
      //獲得できる聴牌料
      getTenpaiVal = TOTAL_TENPAI_VAL / howManyTenpais;

      //ノーテン者が支払う聴牌料
      lostTenpaiVal = TOTAL_TENPAI_VAL / (4 - howManyTenpais);

      for (let i = 0; i < 4; i++) {
        var plus = 0;
        var minus = 0;

        if (this.tenpaiSelected.includes(MEMBER[i])) {
          plus = getTenpaiVal;
        } else {
          minus = lostTenpaiVal;
        }

        retTenpaiArr.push({ plusVal: plus, minusVal: minus });
      }

      //選択値をクリア
      this.tenpaiSelected = [];

      this.$emit("close-from-Tenpai", retTenpaiArr);
    },
  },
};
</script>