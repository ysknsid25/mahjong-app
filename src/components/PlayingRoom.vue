<template>
    <v-content>
        <v-row justify="center">
            <v-col cols="1" sm="1" md="1" @change="changeOyako">
                <v-select
                v-model="oyako"
                item-text="label"
                item-value="value"
                :items="oyakoItems"
                label="親子"
                />
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-select
                v-model="agari"
                item-text="label"
                item-value="value"
                :items="agariItems"
                label="和了方法"
                />
            </v-col>
            <v-col cols="1" sm="1" md="1" @change="changeHonba">
                <v-select
                v-model="honba"
                :items="honbaItems"
                label="本場"
                />
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                >
                リーチ
                <v-avatar
                    right
                    class="green darken-4"
                >
                    {{reachBou}}
                </v-avatar>
                </v-chip>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="1" sm="1" md="1" @change="changeHan">
                <v-select
                v-model="han"
                item-text="label"
                item-value="value"
                :items="hanItems"
                label="翻"
                />
            </v-col>
            <v-col cols="1" sm="1" md="1" @change="changeHu">
                <v-select
                v-model="hu"
                :items="huItems"
                label="符"
                />
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-btn depressed small @click="calculateTokuten">計算</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="4" sm="1" md="1" class="font-weight-thin headline">
                {{tokuten}}
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center">
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="editedItem.firstName" readOnly label="東家"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="editedItem.firstScore" label="点数"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="calcuVar.eastPlus" label="＋"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="calcuVar.eastMinus" label="-"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-btn rounded small color="red" dark @click="reach(editedItem, '1')">リーチ</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="editedItem.secondName" readOnly label="南家"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="editedItem.secondScore" label="点数"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="calcuVar.southPlus" label="＋"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="calcuVar.southMinus" label="-"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-btn rounded small color="red" dark @click="reach(editedItem, '2')">リーチ</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="editedItem.thirdName" readOnly label="西家"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="editedItem.thirdScore" label="点数"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="calcuVar.westPlus" label="＋"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="calcuVar.westMinus" label="-"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-btn rounded small color="red" dark @click="reach(editedItem, '3')">リーチ</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="editedItem.fourthName" readOnly label="北家"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="editedItem.fourthScore" label="点数"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="calcuVar.northPlus" label="＋"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-text-field v-model="calcuVar.northMinus" label="-"></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
                <v-btn rounded small color="red" dark @click="reach(editedItem, '4')">リーチ</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="1" sm="1" md="1">
                <v-btn depressed small @click="liquidation(editedItem, calcuVar)">清算</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col>
            <v-btn color="blue darken-1" text @click="$emit('close-from-child', {name: 'yoshida', message:'親に送ります'})">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>   
            </v-col>             
        </v-row>
    </v-content>
</template>
<script>
  export default {
    name: 'PlayingRoom',
    // props: ['editedItem'],

    data: () => ({

        tokuten:0,
        reachRyou: 1000,
        reachBou: 0,
        honba:'',
        oyako:'0',
        agari:'0',
        hu:'1',
        han:'20',
        oyakoItems:[
            { label: '親'   , value: '0'  },
            { label: '子'   , value: '1'  }
        ],
        agariItems:[
            { label: 'ツモ'   , value: '0'  },
            { label: 'ロン・包'   , value: '1'  }
        ],
        huItems:['', '20', '25', '30', '40', '50', '60', '70', '80', '90', '100', '110'],
        hanItems:[

            { label: '1'   , value: '1'  },
            { label: '2'   , value: '2'  },
            { label: '3'   , value: '3'  },
            { label: '4'   , value: '4'  },
            { label: '満貫'   , value: '5'  },
            { label: '跳満'   , value: '6'  },
            { label: '倍満'   , value: '7'  },
            { label: '三倍満'   , value: '8'  },
            { label: '役満'   , value: '9'  },

        ],
        honbaItems:['','1','2','3','4','5','6','7','8'],
        calcuVar: {

            eastPlus: 0,
            eastMinus: 0,
            southPlus: 0,
            southMinus: 0,
            westPlus: 0,
            westMinus: 0,
            northPlus: 0,
            northMinus: 0

        }

    }),

    methods:{

        changeHonba(honba){

        this.honba = honba

        },

        changeHu(hu){

        this.hu = hu

        },

        changeOyako(oyako){

        this.oyako = oyako.value

        },

        changeAgari(agari){

        this.agari = agari.value

        },

        changeHan(han){

        this.han = han.value

        },

        calculateTokuten(){

            var obj_han = new String(this.han)
            var obj_hu = new String(this.hu)
            var obj_agari = new String(this.agari)
            this.tokuten = getTokuten(this.honba, this.reachBou, obj_hu + obj_han, obj_han, this.oyako, obj_agari)
            this.reachBou = 0;

        },

        reach(item, who){

            const reachRyou = 1000
            this.reachBou += 1

            if(who === '1'){

                item.firstScore -= reachRyou

            }else if(who === '2'){

                item.secondScore -= reachRyou

            }else if(who === '3'){

                item.thirdScore -= reachRyou

            }else{

                item.fourthScore -= reachRyou

            }

        },

        liquidation(item, plusMinus){

            item.firstScore += liquidationMain(plusMinus.eastPlus, plusMinus.eastMinus)
            plusMinus.eastPlus = 0
            plusMinus.eastMinus = 0
            item.secondScore += liquidationMain(plusMinus.southPlus, plusMinus.southMinus)
            plusMinus.southPlus = 0
            plusMinus.southMinus = 0
            item.thirdScore += liquidationMain(plusMinus.westPlus, plusMinus.westMinus)
            plusMinus.westPlus = 0
            plusMinus.westMinus = 0
            item.fourthScore += liquidationMain(plusMinus.northPlus, plusMinus.northMinus)
            plusMinus.northPlus = 0
            plusMinus.northMinus = 0
        },

    }

}



</script>