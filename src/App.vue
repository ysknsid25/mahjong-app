<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              What to do?
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name">
            <v-list-item-icon>
              <v-icon>{{nav_list.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{nav_list.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="secondary" dark app clipped-left>
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Mahjang Score Manager</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <div class="mt-10">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="scores"
          :items-per-page="5"
          :single-select="singleSelect"
          class="elevation-1"
          item-key="battleNo"
          show-select
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Room History</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="newRoomDialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="likelyRed" dark class="mb-2" v-on="on">New Room</v-btn>
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
                            <v-date-picker no-title scrollable v-model="date" @input="menu = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                          <v-select
                            :items="initMotiten"
                            label="持ち点"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="editedItem.firstName" label="東家"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="editedItem.firstScore" label="点数"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="calcuVar.eastPlus" label="＋"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="calcuVar.eastMinus" label="-"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="editedItem.secondName" label="南家"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="editedItem.secondScore" label="点数"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="calcuVar.southPlus" label="＋"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="calcuVar.southMinus" label="-"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="editedItem.thirdName" label="西家"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="editedItem.thirdScore" label="点数"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="calcuVar.westPlus" label="＋"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="calcuVar.westMinus" label="-"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="editedItem.fourthName" label="北家"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="editedItem.fourthScore" label="点数"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="calcuVar.northPlus" label="＋"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="2" md="2">
                          <v-text-field v-model="calcuVar.northMinus" label="-"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeNewRoomDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="1" sm="1" md="4">
                          <v-text-field v-model="editedItem.battleNo" label="No"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="1" md="4">
                          <v-text-field v-model="editedItem.ymd" label="YMD"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="6" md="4">
                          <v-text-field v-model="editedItem.firstName" label="FirstName"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="6" md="4">
                          <v-text-field v-model="editedItem.firstScore" label="FirstScore"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="6" md="4">
                          <v-text-field v-model="editedItem.secondName" label="SecondName"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="6" md="4">
                          <v-text-field v-model="editedItem.secondScore" label="SecondScore"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="6" md="4">
                          <v-text-field v-model="editedItem.thirdName" label="ThirdName"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="6" md="4">
                          <v-text-field v-model="editedItem.thirdScore" label="ThirdScore"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="1" sm="6" md="4">
                          <v-text-field v-model="editedItem.fourthName" label="FourthName"></v-text-field>
                        </v-col>
                        <v-col cols="1" sm="6" md="4">
                          <v-text-field v-model="editedItem.fourthScore" label="FourthScore"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
          <template>
            <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
          </template>
        </v-data-table>
      </div>
    </v-content>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    newRoomDialog: false,
    dialog: false,
    editedIndex: -1,
    initMotiten:[25000, 30000],
    calcuVar: {

      eastPlus: 0,
      eastMinus: 0,
      southPlus: 0,
      southMinus: 0,
      westPlus: 0,
      westMinus: 0,
      northPlus: 0,
      northMinus: 0

    },
    editedItem: {
        motiten: 25000,
        battleNo: 0,
        ymd: '',
        firstName: '',
        firstScore: 0,
        secondName: '',
        secondScore: 0,
        thirdName: '',
        thirdScore: 0,
        fourthName: '',
        fourthScore: 0
    },
    defaultItem: {
        battleNo: 0,
        ymd: '',
        firstName: '',
        firstScore: 0,
        secondName: '',
        secondScore: 0,
        thirdName: '',
        thirdScore: 0,
        fourthName: '',
        fourthScore: 0
    },
    singleSelect: false,
    drawer: true,
    nav_lists:[
      {name: 'Manage Room', icon: 'mdi-folder-plus'},
      {name: 'Record Score', icon: 'mdi-brush'}
    ],
    headers: [
      {
        text: 'No',
        align: 'start',
        value: 'battleNo',
        sortable: false
      },
      { text: 'YMD', value: 'ymd'},
      { text: '1th', value: 'firstName', sortable: false},
      { text: 'Score', value: 'firstScore', sortable: false},
      { text: '2nd', value: 'secondName', sortable: false},
      { text: 'Score', value: 'secondScore', sortable: false},
      { text: '3rd', value: 'thirdName', sortable: false},
      { text: 'Score', value: 'thirdScore', sortable: false},
      { text: '4th', value: 'fourthName', sortable: false},
      { text: 'Score', value: 'fourthScore', sortable: false},
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    scores: [
      {
        battleNo: 1,
        ymd: '2020/05/20',
        firstName: 'Tom',
        firstScore: 35000,
        secondName: 'Meary',
        secondScore: 30000,
        thirdName: 'Nick',
        thirdScore: 25000,
        fourthName: 'Mike',
        fourthScore: 20000
      },
      {
        battleNo: 2,
        ymd: '2020/05/22',
        firstName: 'Meary',
        firstScore: 32000,
        secondName: 'Michel',
        secondScore: 30000,
        thirdName: 'Tom',
        thirdScore: 23000,
        fourthName: 'Jody',
        fourthScore: 20000
      },
      {
        battleNo: 3,
        ymd: '2020/05/23',
        firstName: 'Jil',
        firstScore: 28000,
        secondName: 'Tom',
        secondScore: 25000,
        thirdName: 'Van',
        thirdScore: 25000,
        fourthName: 'Sin',
        fourthScore: 22000
      },
      {
        battleNo: 4,
        ymd: '2020/05/24',
        firstName: 'Michel',
        firstScore: 40000,
        secondName: 'Mike',
        secondScore: 30000,
        thirdName: 'Nick',
        thirdScore: 15000,
        fourthName: 'Coco',
        fourthScore: 10000
      },
      {
        battleNo: 5,
        ymd: '2020/05/25',
        firstName: 'Issei',
        firstScore: 34000,
        secondName: 'Margaret',
        secondScore: 30000,
        thirdName: 'Car',
        thirdScore: 25000,
        fourthName: 'Sorate',
        fourthScore: 16000
      },
      {
        battleNo: 6,
        ymd: '2020/05/26',
        firstName: 'Daniel',
        firstScore: 44000,
        secondName: 'Jim',
        secondScore: 30000,
        thirdName: 'Tom',
        thirdScore: 20000,
        fourthName: 'Nick',
        fourthScore: 6000
      },
    ],
  }),

  methods: {

    editItem (item) {
      this.editedIndex = this.scores.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.scores.indexOf(item)
      confirm('Are you sure you want to delete past Room?') && this.scores.splice(index, 1)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {

        Object.assign(this.scores[this.editedIndex], this.editedItem)

      } else {

        this.scores.push(this.editedItem)
        
      }
      this.close()
    },

    closeNewRoomDialog(){

      this.newRoomDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })

    }

  }

};
</script>
