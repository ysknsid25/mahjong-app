<template>
  <div>
    <v-row justify="center">
      <v-col cols="12">
        <v-data-table
          v-show="roomTable"
          :headers="headers"
          :items="scores"
          :items-per-page="15"
          class="elevation-2"
          item-key="battleNo"
          :sort-by="['battleNo']"
          :sort-desc="[true]"
          v-if="scores.length > 0"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
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
        <TaikyokuRoom
          v-show="!roomTable"
          :editItem="toTaikyokuRoomItem"
          @close-from-taikyokusitu="roomTable = true"
        ></TaikyokuRoom>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import TaikyokuRoom from "./TaikyokuRoom";
import MakeNewRoomDialog from "../components/MakeNewRoomDialog";
export default {
  name: "RecordScore",
  components: {
    TaikyokuRoom,
    MakeNewRoomDialog,
  },
  data: () => ({
    roomTable: true,
    toTaikyokuRoomItem: "",
    headers: [
      {
        text: "No",
        align: "start",
        value: "battleNo",
        sortable: false,
      },
      { text: "Actions", value: "actions", sortable: false },
      { text: "YMD", value: "ymd" },
      { text: "東家(Your)", value: "firstScore", sortable: false },
      { text: "南家", value: "secondScore", sortable: false },
      { text: "西家", value: "thirdScore", sortable: false },
      { text: "北家", value: "fourthScore", sortable: false },
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
  }),

  methods: {
    saveNewRoom(val) {
      this.roomTable = false;
      this.scores.push(val);
    },
    editItem(item) {
      this.roomTable = false;
      this.toTaikyokuRoomItem = item;
      this.playingRoom = true;
    },
    deleteItem(item) {
      const index = this.scores.indexOf(item);
      confirm("Are you sure you want to delete past Room?") &&
        this.scores.splice(index, 1);
    },
  },
};
</script>